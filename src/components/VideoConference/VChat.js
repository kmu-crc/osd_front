import React, { Component } from 'react';
import io from 'socket.io-client'
import Video from './video'
import Videos from './videos'
import host from "config";

class VChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 새로운 offer가 생길 때마다 stream을 update하는 것을 방지하기 위해 localstream 변수로 관리
      localStream: null,
      //메인 화면에서 remote stream 객체를 고정하기 위해 사용
      remoteStream: null,
      //모든 remote stream 객체들을 유지
      remoteStreams: [],
      //모든 peer connection을 유지
      peerConnections: {},
      //선택된 video(확대 할 video)를 null로 초기화
      selectedVideo: null,
      //webRTC 제공 STUN서버 이용
      pc_config: {
        "iceServers": [
          {
            urls: 'stun:stun.l.google.com:19302'
          }
        ]
      },
      //sdp 제약조건
      sdpConstraints: {
        'mandatory': {
          'OfferToReceiveAudio': true,
          'OfferToReceiveVideo': true
        }
      },
      thumbnails: [],
    }

    //ngrok을 통해 localhost를 공용 IP로 배포(수시로 바뀜, ngrok의 경우 12시간 유효)
    this.serviceIP = `${host}/webrtcPeer`;
    console.log("------", this.serviceIP, "------");
    //socket 초기화
    this.socket = null

  }

  componentDidMount = () => {
    // return;
    // console.log(this.props);
    this.socket = io.connect(
      // ngrok 서버를 통해 socket 연결이 됨
      this.serviceIP,
      {
        // path: '/webrtc/socket.io',
        query: { /* DesignId */'roomNum': this.props.id, }
      }
    )
    //peer의 화면이 띄어짐
    //peer가 연결 성공 event를 서버로부터 수신받으면
    this.socket.on('connection-success', data => {
      //getLocalStream method 호출을 통해 자신의 stream 가져오기
      console.log('socket on > connection-success', data)
      this.getLocalStream()
      //연결 성공 log 출력
      // console.log(data.success)
    })
    //peer가 연결 해제 event를 서버로부터 수신받으면
    this.socket.on('peer-disconnected', data => {
      //연결 해제 log 출력
      // console.log('socket on > peer-disconnected', data)
      const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== data.socketID)
      this.setState(prevState => {
        // 연결 해제된 peer가 selected video라면 다른 remote video를 selected video로 선택
        const selectedVideo = prevState.selectedVideo && prevState.selectedVideo.id === data.socketID && remoteStreams.length ? { selectedVideo: remoteStreams[0] } : null
        return {
          remoteStreams,
          ...selectedVideo,
        }
      }
      )
    })
    //online-peer event를 서버로부터 수신받으면
    this.socket.on('online-peer', socketID => {
      console.log('socket on > online-peer', socketID)
      //연결된 모든 peer에 대한 정보 출력해주기
      // console.log('connected peers ...', socketID)
      // 새로운 pc 생성
      this.createPeerConnection(socketID, pc => {
        if (pc)
          // offer 생성해주기 
          pc.createOffer(this.state.sdpConstraints)
            .then(sdp => {
              // pc의 sdp 정보를 local description으로 설정해주기
              pc.setLocalDescription(sdp)
              // offer(pc의 sdp 정보)를 다른 peer에게 전송해주기                 
              this.sendToPeer('offer', sdp, {
                local: this.socket.id,
                remote: socketID
              })
            })
      })
    })
    //offer event를 서버로부터 수신받으면
    this.socket.on('offer', data => {
      // console.log('socket on > offer', data)
      this.createPeerConnection(data.socketID, pc => {
        //수신받은 다른 peer의 localstream을 stream에 추가
        pc.addStream(this.state.localStream)
        //pc의 remote description에 전송받은 offer(sdp 정보)를 remote description으로 설정해주기
        console.log(data.sdp);
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
          // answer 생성해주기
          pc.createAnswer(this.state.sdpConstraints)
            .then(sdp => {
              //pc의 sdp 정보를 local description으로 설정해주기
              pc.setLocalDescription(sdp)
              //pc로부터 생성된 answer(pc의 sdp 정보)를 offer 요청 pc(peer)에게 전송해주기
              this.sendToPeer('answer', sdp, {
                local: this.socket.id,
                remote: data.socketID
              })
            })
        })
      })
    })
    //answer event를 서버로부터 수신받으면
    this.socket.on('answer', data => {
      // console.log('socket on > answer', data)
      // remote의 peer connection 가져오기
      const pc = this.state.peerConnections[data.socketID]
      // console.log(data.sdp)
      // 다른 pc(peer)로부터 전송받은 answer를 remote description으로 설정해주기 
      const rst = new RTCSessionDescription(data.sdp);
      console.log(rst)
      pc.setRemoteDescription(
        rst
        // new RTCSessionDescription(data.sdp)
      ).then(() => {
      }).catch(err => console.error(err));
    })
    //candidate event를 서버로부터 수신받으면
    this.socket.on('candidate', (data) => {
      // console.log('socket on > candidate', data)
      // remote의 peer connection 가져오기
      console.log(data.thumbnail);
      const pc = this.state.peerConnections[data.socketID]
      const list = [...this.state.thumbnails];
      if (list.length === 0 || list.find(item => item.key === data.socketID) == null) {
        list.push({ key: data.socketID, value: data.thumbnail });
      }
      this.setState({ thumbnails: list });
      console.log(list);
      // candidate 정보에 추가해주기
      if (pc)
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    })

  }

  getLocalStream = () => {
    //연결 성공시
    const success = (stream) => {
      window.localStream = stream
      //localStream을 연결 성공된 stream으로 설정
      this.setState({
        localStream: stream
      })
      //whoisOnline method 호출
      this.whoisOnline()
    }
    //연결 실패시 
    const failure = (e) => {
      //error log 출력
      // console.log('getUserMedia Error: ', e)
    }
    //audio, video 제약 조건(화상회의 옵션)
    const constraints = {
      //일단 audio는 false로...
      audio: true,
      video: true,
      options: {
        mirror: true,
      }
    }
    //screenshare 버튼 클릭시 
    var screenshare = document.getElementById("screenshare")
    //local video 클릭시
    var localvideo = document.getElementById("localvideo")


    //default => local video
    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)

    //screenshare 버튼 클릭시 displaymedia 가져오기
    if (screenshare) {
      screenshare.onclick = function () {
        navigator.mediaDevices.getDisplayMedia(constraints)
          .then(success)
          .catch(failure)
      }
    }
    //localvideo 버튼 클릭시 usermedia 가져오기
    if (localvideo) {
      localvideo.onclick = function () {
        navigator.mediaDevices.getUserMedia(constraints)
          .then(success)
          .catch(failure)
      }
    }
  }
  whoisOnline = () => {
    //서버에 자신(local peer)의 정보를 전송
    this.sendToPeer('onlinePeers', null, { local: this.socket.id })
  }
  //sendToPeer method(socketID와 payload를 서버에 전송)
  sendToPeer = (messageType, payload, socketID) => {
    this.socket.emit(messageType, {
      socketID,
      payload
    })
  }
  createPeerConnection = (socketID, callback) => {
    // console.log("socket on : create peer connection", socketID);
    try {
      let pc = new RTCPeerConnection(this.state.pc_config)
      // peerConnection 객체에 pc 추가하기
      const peerConnections = { ...this.state.peerConnections, [socketID]: pc }
      this.setState({
        peerConnections
      })


      pc.onicecandidate = (e) => {
        //candidate 정보가 존재한다면
        if (e.candidate) {
          this.sendToPeer('candidate', e.candidate, {
            //local,remote정보 전송
            local: this.socket.id,
            remote: socketID
          })
        }
      }
      pc.oniceconnectionstatechange = (e) => {
      }
      pc.ontrack = (e) => {
        let _remoteStream = null
        let remoteStreams = this.state.remoteStreams
        let remoteVideo = {}
        //stream이 remoteStreams에 존재하는지 체크
        const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)
        //존재한다면 track에 add
        if (rVideos.length) {
          _remoteStream = rVideos[0].stream
          _remoteStream.addTrack(e.track, _remoteStream)
          remoteVideo = {
            ...rVideos[0],
            stream: _remoteStream,
          }
          remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
            return _remoteVideo.id === remoteVideo.id && remoteVideo || _remoteVideo
          })
        } else {
          //존재하지 않는다면 new stream 생성하고 track에 add하기
          _remoteStream = new MediaStream()
          _remoteStream.addTrack(e.track, _remoteStream)
          remoteVideo = {
            id: socketID,
            name: socketID,
            stream: _remoteStream,
          }
          remoteStreams = [...this.state.remoteStreams, remoteVideo]
        }

        this.setState(prevState => {
          // stream이 있다면 유지, 없을시 최신의 stream(가장 최신 참여자) 사용
          const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: _remoteStream }
          // 현재 선택된 비디오 얻기             
          let selectedVideo = prevState.remoteStreams.filter(stream => stream.id === prevState.selectedVideo.id)
          // 비디오가 리스트에 있다면 유지, 없다면 새로운 video stream으로 세팅
          selectedVideo = selectedVideo.length ? {} : { selectedVideo: remoteVideo }
          return {
            // selectedVideo: remoteVideo,
            ...selectedVideo,
            // remoteStream: e.streams[0],
            ...remoteStream,
            remoteStreams,
          }
        })
      }
      pc.close = () => {
        // alert('GONE')
      }


      if (this.state.localStream)
        this.state.localStream.getTracks().forEach(track => {
          pc.addTrack(track, this.state.localStream)
        })

      // pc를 return
      callback(pc)
    } catch (e) {
      //pc를 못불러 왔을때는 error 메세지 출력하기
      // console.log('PC가 생성되지 않았습니다', e)
      // return
      callback(null)
    }
  }

  //video switch method
  switchVideo = (_video) => {
    // console.log(_video)
    this.setState({
      selectedVideo: _video
    })
  }

  //frontend(peer상에서 보이는 화면)
  render() {

    if (this.state.disconnected) {
      this.socket.close()
      this.state.localStream.getTracks().forEach(track => track.stop())
      return (<div>You have successfully Disconnected</div>)
    }
    // console.log(this.state.localStream)
    return (
      //local video 
      // 크기조정
      <div>
        <div style={{
          zIndex: 101,
          position: 'absolute',
          left: 0,
          top: 100,
        }}>
          <Video
            videoStyles={{
              width: 281,
              height: 216,
            }}
            frameStyle={{
              width: 281,
              margin: 5,
              borderradius: 50,
              backgroundColor: 'black',
            }}
            showMuteControls={true}
            videoStream={this.state.localStream}
            autoPlay muted>
          </Video>
        </div>



        //remote video(selected)

        <Video
          videoStyles={{
            zIndex: 1,
            position: 'fixed',
            bottom: 0,
            minWidth: '100%',
            minHeight: '100%',
            backgroundColor: 'white'
          }}
          videoStream={this.state.selectedVideo && this.state.selectedVideo.stream}
          autoPlay>
        </Video>
        <br />
        {/* <div
          style={{
            zIndex: 3,
            top: 10,
            position: 'absolute',
          }}>
          <i
            onClick={(e) => { this.setState({ disconnected: true }) }}
            style={{ cursor: 'pointer', paddingLeft: 15, color: 'red' }}
            className='material-icons'>
            화상회의 퇴장</i> 
        </div> */}

        {/*
        // chat box
        // chat box 크기조정
        <div className="chatbox">
          <Chat id={this.props.id} mem={this.props.userInfo}/>
          <div style={{ position: 'fixed', bottom: 174 }}> 
        </div>
        </div>
        <br />
        */}
        <div>
          //video 리스트들 출력(remote video들..)
          <Videos
            thumbnails={this.state.thumbnails}
            switchVideo={this.switchVideo}
            remoteStreams={this.state.remoteStreams}
          />
        </div>
        <br />
      </div>
    )
  }
}
export default VChat;
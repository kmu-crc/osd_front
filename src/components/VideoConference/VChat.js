import React, { Component } from 'react';
import styled from "styled-components";
import Video from './video'
import Videos from './videos'
import host from "config";
import io from 'socket.io-client'
/*
요구사항
 로컬 카메라 영상을 가져오고, 출력한다.
 로컬 공유화면 영상을 가져오고 출력한다. 같은탭만 공유됨...
 로컬 영상 송신

기능 테스트 및 보완
  - 로컬 카메라영상 (좌측하단에 위치)
  - 로컬 공유영상 (좌측하단에 위치)
*/


/* video style */
const local_camera_video_style = {
  zIndex: 1,
  position: 'fixed',
  bottom: 0,
  backgroundColor: 'white',
  // minWidth: '158px',
  // minHeight: '153px',
  width: '153px',
  height: '153px',
}
const local_share_video_style = {
  zIndex: 1,
  position: 'fixed',
  bottom: 0,
  left: "153px",
  // top: "558px",
  // left: "15px",
  backgroundColor: 'white',
  minWidth: '158px',
  minHeight: '153px',
  width: '153px',
  height: '153px',
}
const selected_video_style = {
  zIndex: 0,
  position: 'fixed',
  bottom: 0,
  minWidth: '100%',
  minHeight: '100%',
  backgroundColor: 'black'
};
const remote_video_style = {
  zIndex: 1,
  // position: 'fixed',
  bottom: 0,
  backgroundColor: 'white',
  // minWidth: '158px',
  // minHeight: '153px',
  width: '53px',
  height: '53px',
}
const RemoteVideosContainer = styled.div`
`;
const BarContainer = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  min-width: 100%;
  min-height: 5%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .share-btn {
    margin-top: 13px;
    width: 103px;
    height: 35px;
    background-color: rgba(112, 112, 112, 0.5);
    // opacity: 0.5;
    border-radius: 36px;
    border: 1px solid #707070;
    margin: auto;
    display: flex;
    .btn-txt {
      margin: auto;
      width: max-content;
      text-align: center;
      font: Medium 13px/19px Noto Sans CJK KR;
      // letter-spacing: 0px;
      color: #FFFFFF
    }
  }
`;
const constraint = {
  basic: {
    audio: false,
    video: true,
    options: { mirror: true, }
  }
};
const SOCKETSERVER = `${host}/webrtcPeer`;
class VChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 우선옮겨두고 코드 고치면서 바뀔 변수들.
      remoteStreams: [],
      remoteStream: null,
      peerConnections: {},
      thumbnails: [],

      // stream
      selectedVideo: null, // 큰 화면 영상
      localStream: null, // 로컬 카메라
      localShare: null, // 로컬 공유영상

      //webRTC STUN server
      pc_config: {
        "iceServers": [{
          urls: 'stun:stun.l.google.com:19302'
        }]
      },
      //sdp constraint
      sdpContraints: {
        'mandatory': {
          'OfferToReceiveAudio': true,
          'OfferToReceiveVideo': true
        }
      },

      // state
      closed: false,

    }
    this.socket = null;
    this.resize_window = this.resize_window.bind(this);
    this.set_local_stream = this.set_local_stream.bind(this);
    this.set_share_screen = this.set_share_screen.bind(this);
    this.socket_connection_setting = this.socket_connection_setting.bind(this);

    this.switchVideo = this.switchVideo.bind(this);
    this.whoisOnline = this.whoisOnline.bind(this);
    this.createPeerConnection = this.createPeerConnection.bind(this);
  }

  // previous functions //
  whoisOnline() {
    // console.log('whoisonline');
    this.sendToPeer('onlinePeers', null, { local: this.socket.id });
  }
  sendToPeer(messageType, payload, socketID) {
    this.socket.emit(messageType, { socketID, payload });
  }
  createPeerConnection(socketID, callback) {
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

  // 
  resize_window(event) {
    if (event) {
      event.preventDefault();
      // 
    }
    // console.log('resized');
    window.resizeTo(1290, 768);
  }
  set_local_stream() {
    navigator.mediaDevices.getUserMedia(constraint.basic)
      .then((stream) => {
        // window.localStream = stream
        this.setState({
          localStream: stream
        })
      })
      .then(() => {
        // this.
      })
      .catch((e) => {
        //error log 출력
        // console.log('getUserMedia Error: ', e)
      })

  }
  set_share_screen() {
    navigator.mediaDevices.getDisplayMedia(constraint.basic)
      .then(stream => { this.setState({ localShare: stream }) })
      .catch(e => console.error(e))

  }
  socket_connection_setting() {
    try {
      this.socket = io.connect(
        SOCKETSERVER, {
        // path: '/webrtc/socket.io',
        query: { /* DesignId */'roomNum': this.props.id, }
      });

      if (this.socket == null)
        throw "failed connect to socket-server";

      this.socket.on('connection-success', data => {
        // console.log(`successed connection:`, data);
        this.whoisOnline();
      });
      this.socket.on('peer-disconnected', data => {
        // console.log(`peer disconnected:`, data);
        // const remoteStreams =
        // this.state.remoteStreams
        // .filter(stream => stream.id !== data.socketID);
        // this.setState(prevState => {
        //   const selectedVideo =
        //     prevState.selectedVideo &&
        //       prevState.selectedVideo.id === data.socketID &&
        //       remoteStreams.length
        //       ? { selectedVideo: remoteStreams[0] }
        //       : null
        //   return {
        //     remoteStreams,
        //     ...selectedVideo,
        //   }
        // }
        // )
      });
      this.socket.on('online-peer', data => {
        this.createPeerConnection(data, pc => {
          // if (pc == null) return;
          if (pc) {
            pc.createOffer(this.state.sdpContraints)
              .then(sdp => {
                pc.setLocalDescription(sdp);
                this.sendToPeer('offer', sdp, {
                  local: this.socket.id, remote: data
                })
              })
          }
        })
      });
      this.socket.on('offer', data => {
        this.createPeerConnection(data.socketID, pc => {
          if (pc == null) return;
          pc.addStream(this.state.localStream)
          pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
            pc.createAnswer(this.state.sdpConstraints)
              .then(sdp => {
                pc.setLocalDescription(sdp)
                this.sendToPeer('answer', sdp, {
                  local: this.socket.id,
                  remote: data.socketID
                })
              })
          })
        })
      });
      this.socket.on('answer', data => {
        const pc = this.state.peerConnections[data.socketID]
        const rst = new RTCSessionDescription(data.sdp);
        // console.log(rst)
        pc.setRemoteDescription(rst)
          // .then(() => { })
          .catch(err => console.error(err));
      });
      this.socket.on('candidate', (data) => {
        // console.log(data);
        const pc = this.state.peerConnections[data.socketID]
        const list = [...this.state.thumbnails];
        if (list.length === 0 || list.find(item => item.key === data.socketID) == null) {
          list.push({ key: data.socketID, value: data.thumbnail });
        }
        this.setState({ thumbnails: list });
        // console.log(list);
        if (pc)
          pc.addIceCandidate(
            new RTCIceCandidate(data.candidate))
      });
    } catch (e) {
      alert(e + '');
    }
  }
  switchVideo(video) {
    this.setState({
      selectedVideo: video
    })
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
    this.state.localStream
      .getTracks()
      .forEach(track => track.stop());
  }
  componentDidMount() {
    window.addEventListener('resize', (event) => this.resize_window(event));
    this.resize_window(null);
    this.set_local_stream();
    this.socket_connection_setting();
  }

  render() {
    console.log('remote-streams', this.state.remoteStreams)
    return (<React.Fragment>

      {/* top bar - buttons */}
      <BarContainer>
        <div
          className="share-btn"
          onClick={() => this.set_share_screen()}>
          <span className="btn-txt">
            화면공유
          </span>
        </div>
      </BarContainer>

      {/* selected video */}
      <Video
        videoStyles={selected_video_style}
        videoStream={this.state.selectedVideo}
      // autoPlay
      />

      {/* local camera video */}
      <Video
        onClick={() => this.setState({ selectedVideo: this.state.localStream })}
        videoStyles={local_camera_video_style}
        videoStream={this.state.localStream}
        autoPlay
      />
      {/* local share video */}
      <Video
        onClick={() => this.setState({ selectedVideo: this.state.localShare })}
        videoStyles={local_share_video_style}
        videoStream={this.state.localShare}
        autoPlay
      />

      {/*  */}
      <div style={{ marginLeft: "auto", width: "500px" }}>
        {this.state.remoteStreams
          && this.state.remoteStreams.length > 0
          ?
          this.state.remoteStreams.map((stream, idx) => {
            // const track = stream.getTracks().filter(track => track.kind === 'video')

            return <Video
              key={idx}
              videoStream={stream.stream}
              videoStyles={remote_video_style}
            />
          })
          : null}
      </div>
      {/* <Videos */}
      {/* thumbnails={this.state.thumbnails} */}
      {/* switchVideo={this.switchVideo} */}
      {/* remoteStreams={this.state.remoteStreams} */}
      {/* /> */}
    </React.Fragment>)
  }
}

export default VChat;


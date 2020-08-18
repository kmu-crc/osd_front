import React, { Component } from 'react';
// css
import styled from "styled-components";
import ScrollContainer from 'react-indiana-drag-scroll'
// func
import Video from "./video";
import host, { geturl } from "config";
import io from 'socket.io-client'
const VideoChatContainer = styled.div`
  // *{border: 1px solid red;}
  width: ${props => props.w}px; 
  height:${props => props.h}px;
`;
const ButtonBarContainer = styled.div`
  z-index: 300;
  margin-top: 13px;
  padding-left: 25px;
  padding-right: 16px;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: rows;
  justify-content: space-between; 
  background-color: transparent;

  .btn {
    cursor: pointer;
    text-align: center;

    &.chat {
      width: 51px;
      background: transparent;
    }
    &.share {
      width: 103px;
      height: 35px;
      border-radius: 36px;
      background: rgba(125, 125, 125, 0.5);
      padding: 8px 25px;
    }
    &.exit {
      width: 64px;
      height: 32px;
      border-radius: 32px;
      background: rgba(255, 0, 0, 1.0);
      padding: 6px 12px;
    }    
  }
  .txt {
    color: rgba(255, 255, 255, 1.0);
    width: max-content;
  }
`;
const BigVideoScreen = styled.div`
  z-index: 200;
  background-color: black;
  color: white;
  text-algin: center;
  display: flex;
  width: 100%;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
  }
  .txt {
    margin: auto;
    font-size: 2rem;
  }
`;
const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 16px;
  left: 15px;
  width: 1249px; //100%;
  background-color: transparent;

  .me {

  }
  .others {
    position: relative;
    margin-left: 10px;
    width: 980px;
    .member-count {
      margin-left: auto;
      margin-top: 30px;
      width: 72px;
      height: 26px;
      border-radius: 36px;
      background-color: rgba(125, 125, 125, 0.5);
      text-align: center;
      color: white;
      font-familiy: Noto Sans KR;
      font-weight: 300;
      font-size: 11px;
      line-height: 15px;
      padding: 5px 7px;
    }
    .inner {
      width: 100%;
      overflow: hidden;
      position: absolute;
      display: flex;
      flex-direction: row;
      height: 77px;
      bottom: 0px;
      .peer {
        transform: translate(0, 10px);
        margin-right: 14px;
      }
    }
  }
`;


// position: absolute;
// bottom: 0px;
// left: 284px;
// display: flex;
// overflow-x: auto;
// overflow-y: hidden;
// flex-direction: row;
// background-color: white;
// width: 980px;
// .peer {
//   width: max-content;
//   display: flex;
// }
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

      // ...
      selected: "me",
      screen: "nick_name",

      peers: [
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수", thumbnail: null },]
    }
    this.socket = null;
    this.resize_window = this.resize_window.bind(this);
    this.set_local_stream = this.set_local_stream.bind(this);
    this.set_share_screen = this.set_share_screen.bind(this);
    this.socket_connection_setting = this.socket_connection_setting.bind(this);

    this.switchVideo = this.switchVideo.bind(this);
    this.whoisOnline = this.whoisOnline.bind(this);
    this.createPeerConnection = this.createPeerConnection.bind(this);

    this.videoselected = this.videoselected.bind(this);
    ;
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
      pc.oniceconnectionstatechange = (e) => { }
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
    console.log(this.props);
    window.addEventListener('resize', (event) => this.resize_window(event));
    this.resize_window(null);
    this.set_local_stream();
    this.socket_connection_setting();
  }
  videoselected(stream) {
    if (stream && this.video) {
      console.log(stream, this.video.srcObject);
      this.video.srcObject = stream;
    }
  }

  render() {
    return (<VideoChatContainer w={window.innerWidth} h={window.innerHeight}>
      {/* top */}
      <ButtonBarContainer>
        <div className='btn chat' onClick={() => {
          const url = geturl() + `/chat/${this.props.design.uid}`;
          const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`;
          window.open(url, "chat", options);
        }}>
          <span className='txt'>채팅</span>
        </div>
        <div className='btn share' onClick={() =>
          this.set_share_screen()}>
          <span className='txt'>화면공유</span>
        </div>
        <div className='btn exit' onClick={() => {
          window.open('', '_self').close();
        }}>
          <span className='txt'>나가기</span>
        </div>

      </ButtonBarContainer>

      {/* middle*/}
      <BigVideoScreen>
        <video
          id={"big-screen"}
          autoPlay
          ref={(ref) => { this.video = ref }}
        />
      </BigVideoScreen>

      {/* bottom*/}
      <VideosContainer>
        <div className="me"
        >
          <Video
            onClick={() => {
              this.setState({
                selectedVideo: this.state.localStream,
                selected: "me"
              });
              this.videoselected(this.state.localStream);
            }}
            id={this.props.userInfo.uid}
            autoPlay
            control={true}
            screen={"camera"}
            stream={this.state.localStream}
            itsMe={true}
            nick_name={this.props.userInfo.nick_name || "안녕 나는 김철수"} />
          {/* {this.state.localShare ? */}
          <Video
            onClick={() => {
              this.setState({
                selectedVideo: this.state.localShare,
                selected: "me"
              });
              this.videoselected(this.state.localShare);
            }}
            id={this.props.userInfo.uid}
            autoPlay
            control={false}
            screen={"camera"}
            stream={this.state.localShare}
            itsMe={true}
            nick_name={this.props.userInfo.nick_name || "안녕 나는 김철수"} />
          {/* : null} */}
        </div>

        <div className="others">
          <div className="member-count">
            참여자&nbsp;
            {("?") || "-"}
            /
            {(this.props.design
              && this.props.design.member
              && this.props.design.member.length) || "-"}
          </div>
          <ScrollContainer vertical={false} className="inner scroll-container">
            {this.state.peers &&
              this.state.peers.length > 0 &&
              this.state.peers.map((peer, idx) =>
                <div
                  className="peer"
                  key={idx + peer.nick_name}
                  onClick={() => this.setState({ selected: idx })}>

                  <Video
                    {...peer}
                    itsMe={false}
                    selected={idx === this.state.selected} />
                </div>
              )}
          </ScrollContainer>
        </div>
      </VideosContainer>


    </VideoChatContainer >)
  }
}

export default VChat;


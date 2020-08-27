import React, { Component } from 'react'
// css
import styled from "styled-components"
import ScrollContainer from 'react-indiana-drag-scroll'
// func
import host, { geturl } from "config"
import io from 'socket.io-client'
import Peer from 'peerjs'
// 
import who from 'source/video-chat-empty-thumbnail.svg'
import icon_cam_on from 'source/video-chat-icon-camera-on.svg'
import icon_cam_off from 'source/video-chat-icon-camera-off.svg'
import icon_mic_on from 'source/video-chat-icon-mic-on.svg'
import icon_mic_off from 'source/video-chat-icon-mic-off.svg'
// 
function isOpen(ws) { return ws.readyState === ws.OPEN }

// styled components
const VideoChatContainer = styled.div`
  // *{border: 1px solid red}
  background-color: black;
  width: 100%;//${props => props.w}px;
  height: 100%;//${props => props.h}px;
`
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
`
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
`
const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 16px;
  left: 15px;
  width: 1249px; //100%
  background-color: transparent;

  .me {

    .share {
      width: 120px;
      height: 93px;
    }
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
`
// constants
const constraint = { basic: { audio: false, video: true, options: { mirror: false, } } }
// 
const Me = styled.div`
  width: 259px;
  height: 146px;
  position: relative;
  display: flex;
  border: 1px solid #707070;
  video {
    width: 259px;
    margin: 0;
    padding: 0;
    object-fit: cover;
  }

  .txt {
    z-index: 403;
    margin: auto;
    width: max-content;
    font-size: 20px;
    font-family: Noto Sans KR;
    font-weight: 500;
    text-align: center;
    line-height: 29px;
    color: #FFFFFF;
  }
  .control {
    z-index: 402;
    color: white;
    position: absolute;
    left: 24px;
    bottom: 19px;
    width: max-content;
    display: flex;
    flex-direction: row;

    .mic{
      margin-left: 18px;
      width: 15px;
      height: 20px;
      background-repeat: no-repeat;
      background-image: url(${icon_mic_on});
      &.off{
        background-image: url(${icon_mic_off});
      }
    }
    .cam{
      width: 24px;
      height: 15px;
      background-repeat: no-repeat;
      background-image: url(${icon_cam_on});
      &.off{
        background-image: url(${icon_cam_off});
      }
    }
  }
  .thumbnail {
    z-index: 401;
    position: absolute;
    right: 11px;
    bottom: 10px;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    border: 1px solid #EFEFEF;
    background-color: #EFEFEF;
    background-image: url(${props => props.thumbnail || who});
    background-size: cover;
  }
`
const MeMini = styled.div`
  z-index: 400;
  width: 120px;
  height: 60;
  position: absolute;
  right: 10px;
  bottom: 10px;
  video {
    width: 100%;
    margin: 0;
    padding: 0;
    object-fit: cover;
  }
`
const VideoContainer = styled.div`
  color: white;
  position: relative;
`
// MY VIDEO component class
class MyVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // screen: 'camera', // "camera", "share", "nick-name"
      mic: false, cam: true, // option(it's me only)
    }
    this.video = React.createRef()
  }
  componentDidMount() {
    if (this.props.stream) {
      this.video.srcObject = this.props.stream
      this.props.stream.addEventListener('inactive', e => {
        e.preventDefault()
        this.props.close && this.props.close()
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.stream != prevProps.stream) {
      this.video.srcObject = this.props.stream
      if (this.props.stream.active == false) {
        this.props.close && this.props.close()
      }
    }
  }

  render() {
    return (<VideoContainer>
      {this.props.screen === "camera"
        ?
        <Me thumbnail={this.props.thumbnail}>
          <video
            onClick={() => this.props.onClick && this.props.onClick()}
            id={this.props.uid}
            // muted={this.props.muted}
            autoPlay
            ref={(ref) => { this.video = ref }}
          />

          {this.props.control ?
            <div className="control">
              <div
                className={`cam ${this.state.cam ? "" : "off"}`}
                onClick={() => this.setState({ cam: !this.state.cam })} />
              <div
                className={`mic ${this.state.mic ? "" : "off"}`}
                onClick={() => this.setState({ mic: !this.state.mic })} />
            </div>
            : null}

          <div className="thumbnail" />

        </Me>
        :
        this.props.screen === "share"
          ?
          <MeMini>
            <video
              onClick={() => this.props.onClick && this.props.onClick()}
              autoPlay
              id={this.props.uid}
              ref={(ref) => { this.video = ref }}
              className="mini" />
          </MeMini>
          :
          <Me>
            <div className="txt">{this.props.nick_name}</div>
          </Me>}
    </VideoContainer>)
  }
}
// 
const NotMe = styled.div`
  width: 120px;
  height: 67px;
  background-color: black;
  border: 2px solid #707070;
  position: relative;
  display: flex;

  .camera {
    width: 120px;
    margin: 0;
    padding: 0;
    object-fit: cover;
  }
  .share{
    width: 60px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    object-fit: cover;
  }
  &.selected {
    border: 2px solid #FF0000;
  }
  .txt {
    margin: auto;
    width: max-content;
    font-size: 12px;
    font-family: Noto Sans KR;
    font-weight: 500;
    text-align: center;
    line-height: 18px;
    color: #FFFFFF;
    cursor: default;
  }
  .thumbnail {
    position: absolute;
    transform: translate(45px, -10px);
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 1px solid #EFEFEF;
    background-position: center center;
    background-image: url(${props => props.thumbnail || who});
    background-color: #EFEFEF;
    background-size: cover;
  }
`
// MEMBER VIDEO LIST component class
class OthersVideo extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    // screen: 'camera', // "camera", "share", "nick-name"
    // }
    this.video = React.createRef()
    this.videoShare = React.createRef()
  }
  componentDidMount() {
    if (this.props.stream) {
      this.video.srcObject = this.props.stream
    }
    if (this.props.share) {
      this.videoShare.srcObject = this.props.share
      if (this.props.share.active == false) {
        this.props.close && this.props.close()
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.video && (this.props.stream != prevProps.stream)) {
      this.video.srcObject = this.props.stream
    }
    if (this.videoShare && this.props.share_active && (this.props.share != prevProps.share)) {
      this.videoShare.srcObject = this.props.share
    }
  }

  render() {
    const css = this.props.selected ? "selected" : ""

    return (<VideoContainer>
      <NotMe thumbnail={this.props.thumbnail} className={css}>
        <div className="thumbnail" />
        {this.props.stream
          ?
          <video
            className="camera"
            onClick={() => this.props.onClickVideo && this.props.onClickVideo()}
            // muted={this.props.muted}
            autoPlay
            ref={(ref) => { this.video = ref }}
          /> : null}
        {this.props.share_active
          ?
          <video
            className="share"
            onClick={() => this.props.onClickShare && this.props.onClickShare()}
            autoPlay
            ref={(ref) => { this.videoShare = ref }}
          /> : null}

        {!this.props.stream && !this.props.share
          ?
          <div className="txt">
            {this.props.nick_name &&
              this.props.nick_name.slice(0, 13)}</div>
          : null}
      </NotMe>
    </VideoContainer>)
  }
}
// 
class VChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // stream
      selectedVideo: null, // 큰 화면 영상
      localStream: null, // 로컬 카메라
      localShare: null, // 로컬 공유영상
      // ...
      selected: "me",
      screen: "nick_name",
      // 
      peers: [],
      connected: 1,
    }
    this.peer = new Peer()
    // camera
    this.myPeer = new Peer(this.props.userInfo.uid)
    // this.peers = []
    this.socket = null
    // share
    this.myPeer2 = new Peer('share-' + this.props.userInfo.uid)
    this.socket2 = null
    // this.peers2 = []
    // functions
    this.resize_window = this.resize_window.bind(this)
    this.socket_connection_setting = this.socket_connection_setting.bind(this)
    this.set_member_default = this.set_member_default.bind(this)
    this.switchVideo = this.switchVideo.bind(this)
    this.videoselected = this.videoselected.bind(this)
  }
  resize_window(event) {
    if (event) {
      event.preventDefault()
      // 
    }
    // console.log('resized')
    window.resizeTo(1290, 768)
  }
  socket_connection_setting() {

  }
  switchVideo(video) {
    this.setState({
      selectedVideo: video
    })
  }
  videoselected(stream) {
    if (stream && this.video) {
      this.video.srcObject = stream
    }
  }
  async set_member_default() {
    if (this.props.design == null ||
      this.props.design.member == null ||
      this.props.design.member.length < 2)
      return

    const peers = this.props.design.member
      .filter(mem => this.props.userInfo.uid != mem.user_id)
      .map(mem => ({
        user_id: mem.user_id, nick_name: mem.nick_name,
        thumbnail: mem.thumbnail.s_img,
        stream: null, share: null,
        share_active: false,
      }))

    await this.setState({ peers: peers })
  }
  componentDidMount() {
    window.addEventListener('resize', (event) => this.resize_window(event))
    this.resize_window(null)
    this.set_member_default()

    //                           // 
    // STREAM SOCKETS INITIATION //
    //                           // 
    try {
      this.socket = io.connect(host + '/webRTC-camera')
      this.socket2 = io.connect(host + '/webRTC-share')

      if (this.socket == null)
        throw "failed connect to socket-server"

    } catch (e) {
      alert('소켓서버연결에 실패하였습니다.\n 창이 닫힙니다.\ndetail:' + e)
      window.open('', '_blank').close()
    }

    //                    // 
    //   CAMERA STREAM    // 
    //                    // 
    navigator.mediaDevices.getUserMedia(constraint.basic)
      .then(stream => {
        window.localStream = stream
        this.setState({
          localStream: stream
        })
      })
      .catch((e) => {
        console.error('getUserMedia Error: ', e)
      })

    this.socket.on('user-connected', userId => {
      // console.log('user-connected: ', userId)
      const stream = this.state.localStream
      if (!stream)
        return;
      const call = this.myPeer.call(userId, stream)
      call.on('stream', userVideoStream => {
        // console.log('user-connected: call: ', call)
        const peers = [...this.state.peers]
        peers.map(peer => {
          if (peer.user_id == userId) {
            peer.stream = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
      // this.peers.push(call)
    })
    this.socket.on('user-disconnected', userId => {
      // console.log('user-disconnected: ', userId)
      const peers = [...this.state.peers]
      let idx = peers.findIndex(peer => peer.user_id == userId)
      if (idx > -1) {
        peers[idx].stream = null
      }
      this.setState({ peers: peers })
      // idx = this.peers.findIndex(user => user.peer === userId)
      if (idx > -1) {
        // this.peers[idx].close()
        // this.peers.splice(idx, 1)
      }
    })
    this.myPeer.on('open', id => {
      this.socket.emit('join-room', this.props.design.uid, id)
      // console.log('open', id)
    })
    this.myPeer.on('call', call => {
      const stream = this.state.localStream;
      if (stream == null)
        return;
      // console.log('call: ', call)
      call.answer(stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.map(peer => {
          if (peer.user_id == call.peer) {
            peer.stream = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
    })


    //                     // 
    // SCREEN SHARE STREAM // 
    //                     //
    this.sharebtn &&
      this.sharebtn.addEventListener('click', () => {
        navigator.mediaDevices.getDisplayMedia(constraint.basic)
          .then(stream => {
            window.localStream = stream
            this.setState({
              localShare: stream
            })
            const userId = 'share-' + this.props.userInfo.uid
            this.socket2.emit('update-share', this.props.design.uid, userId)
          })
          .catch((e) => {
            console.error('getUserMedia Error: ', e)
          })
      })
    this.socket2.on("exit-share", userId => {
      const peers = [...this.state.peers]
      peers.map(peer => {
        if (peer.user_id == userId.replace('share-', '')) {
          peer.share_active = false
          peer.share = this.state.localStream
        }
      })
      this.setState({ peers: peers })
    })
    this.socket2.on('update-share', userId => {
      const stream = this.state.localShare || this.state.localStream
      const call = this.myPeer2.call(userId, stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.map(peer => {
          if (peer.user_id == userId.replace('share-', '')) {
            peer.share_active = true
            peer.share = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
    })
    this.socket2.on('user-connected', userId => {
      const stream = this.state.localShare || this.state.localStream
      console.log(stream)
      const call = this.myPeer2.call(userId, stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.map(peer => {
          if (peer.user_id == userId.replace('share-', '')) {
            peer.share_active = false
            peer.share = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
    })
    this.socket2.on('user-disconnected', userId => {
      const peers = [...this.state.peers]
      let idx = peers.findIndex(peer => peer.user_id == userId.replace('share-', ''))
      if (idx > -1) {
        peers[idx].share = null
      }
      this.setState({ peers: peers })
    })
    this.myPeer2.on('open', id => {
      this.socket2.emit('join-room', this.props.design.uid, id)
    })
    this.myPeer2.on('call', call => {
      const stream = this.state.localShare || this.state.localStream
      console.log(stream)
      call.answer(stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.map(peer => {
          if (peer.user_id == call.peer.replace('share-', '')) {
            peer.share_active = true
            peer.share = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
    })
  }

  componentWillUnmount() {
    this.socket &&
      this.socket.close()

    this.state.localStream &&
      this.state.localStream
        .getTracks()
        .forEach(track => track.stop())

    this.state.localShare &&
      this.state.localShare
        .getTracks()
        .forEach(track => track.stop())
  }

  render() {
    // console.log("check: ",
    //   this.state,
    //   this.myPeer, this.peers, this.socket,
    //   this.myPeer2, this.socket2, this.peers2);

    return (<VideoChatContainer w={window.innerWidth} h={window.innerHeight}>
      {/* top */}
      <ButtonBarContainer>
        <div className='btn chat' onClick={() => {
          const url = geturl() + `/chat/${this.props.design.uid}`
          const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`
          window.open(url, "chat", options)
        }}>
          <span className='txt'>채팅</span>
        </div>
        <div
          ref={(ref) => this.sharebtn = ref}
          className='btn share'
        >
          <span className='txt'>화면공유</span>
        </div>
        <div className='btn exit' onClick={() => {
          window.open('', '_self').close()
        }}>
          <span className='txt'>나가기</span>
        </div>

      </ButtonBarContainer>

      {/* middle*/}
      <BigVideoScreen>
        <video
          id={"big-screen"}
          autoPlay
          ref={(ref) => this.video = ref}
        />
      </BigVideoScreen>

      {/* bottom*/}
      <VideosContainer>
        <div className="me">
          <MyVideo
            onClick={() => {
              this.setState({
                selectedVideo: this.state.localStream,
                selected: "me"
              })
              this.videoselected(this.state.localStream)
            }}
            id={this.props.userInfo.uid}
            autoPlay
            control={true}
            screen={"camera"}
            stream={this.state.localStream}
            thumbnail={this.props.userInfo.thumbnail.s_img}
            nick_name={this.props.userInfo.nick_name || "안녕 나는 김철수"} />
          {this.state.localShare ?
            <MyVideo
              onClick={() => {
                this.setState({
                  selectedVideo: this.state.localShare,
                  selected: "me"
                })
                this.videoselected(this.state.localShare)
              }}
              close={() => {
                this.setState({ localShare: null });
                this.socket2.emit("exit-share", this.props.design.uid, 'share-' + this.props.userInfo.uid);
              }}
              id={this.props.userInfo.uid}
              autoPlay
              control={false}
              screen={"share"}
              stream={this.state.localShare}
              nick_name={this.props.userInfo.nick_name || "안녕 나는 김철수"} />
            : null}
        </div>

        <div className="others">
          <div className="member-count">
            참여자&nbsp;
            {this.state.connected}
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

                  <OthersVideo
                    onClickVideo={() => {
                      this.setState({
                        selectedVideo: peer.stream,
                        selected: peer.nick_name
                      })
                      this.videoselected(peer.stream)
                    }}
                    onClickShare={() => {
                      this.setState({
                        selectedVideo: peer.share,
                        selected: peer.nick_name
                      })
                      this.videoselected(peer.share)
                    }}
                    {...peer}
                    itsMe={false}
                    // screen={"camera"}
                    share_active={peer.share_active}
                    share={peer.share}
                    stream={peer.stream}
                    close={() => {
                      const peers = [...this.state.peers]
                      let idx = peers.findIndex(_peer => _peer.user_id === peer.user_id)
                      if (idx > -1) {
                        peers[idx].share = null
                      }
                      this.setState({ peers: peers })
                    }}
                    selected={idx === this.state.selected} />
                </div>
              )}
          </ScrollContainer>
        </div>
      </VideosContainer>


    </VideoChatContainer >)
  }
}

export default VChat

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
// function isOpen(ws) { return ws.readyState === ws.OPEN }

// styled components
const VideoChatContainer = styled.div`
  background-color: black;
  width: ${props => props.w}px;
  height: ${props => props.h}px;
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
const ScreenContainer = styled.div`
  z-index: 200;
  background-color: black;
  color: white;
  text-algin: center;
  display: flex;
  width: 100%;
  height: 82%; //100%;
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  bottom: 10px;
  left: 5px;
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
      bottom: 0px;
      .peer {
        // border: 1px solid white;
        // width: 175px;
        // height: 105px;
        margin-right: 14px;
      }
    }
  }
`
// constants
const constraint = {
  basic: {
    audio: true, video: {
      width: { ideal: 1280 },
      height: { ideal: 1024 },
      facingMode: "environment"
    }, options: { mirror: false, }
  },
  share: { audio: false, video: true, options: { mirror: false } }
}
// 
const Me = styled.div`
  // width: 259px;
  // height: 146px;
  width: 198px;
  height: 110px;
  position: relative;
  display: flex;
  border: 1px solid #707070;
  background-color: black;

  video {
    // width: 99%;
    // width: 257px;
    width: 192px;
    margin: 0;
    padding: 1;
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
    background
  }
`
const MeMini = styled.div`
  z-index: 400;
  width: 120px;
  height: 60;
  // position: absolute;
  // right: 10px;
  // bottom: 10px;
  video {
    width: 120px;
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
      mic: false, cam: true, // option(it's me only)
    }
    this.video = React.createRef()
  }
  init = () => {
    const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'audio')
    if (stream[0]) {
      stream[0].enabled = false
    }
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
      this.init()
      if (this.props.stream.active == false) {
        this.props.close && this.props.close()
      }
    }
  }
  mutemic = () => {
    const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'audio')
    if (stream) {
      stream[0].enabled = !this.state.mic
    }
    this.setState({ mic: !this.state.mic })
  }
  mutecamera = () => {
    const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'video')
    if (stream) {
      stream[0].enabled = !this.state.cam
    }
    this.setState({ cam: !this.state.cam })
    this.props.mutecam && this.props.mutecam()
  }

  render() {
    return (<VideoContainer>
      {this.props.screen === "camera"
        ?
        <Me thumbnail={this.props.thumbnail}>
          {/* {this.state.cam ? */}
          <video
            hidden={this.state.cam === false}
            onClick={() => this.props.onClick && this.props.onClick()}
            id={this.props.uid}
            autoPlay
            muted
            ref={(ref) => { this.video = ref }}
          />
          {this.state.cam === false && <div className="txt">{this.props.nick_name}</div>}

          {this.props.control ?
            <div className="control">
              <div
                className={`cam ${this.state.cam ? "" : "off"}`}
                onClick={() => {
                  this.mutecamera()
                }} />
              <div
                className={`mic ${this.state.mic ? "" : "off"}`}
                onClick={() => {
                  this.mutemic()
                }} />
            </div>
            : null}

          <div className="thumbnail" />

        </Me>
        : null}

      {this.props.screen === "share"
        ?
        <MeMini>
          <video
            onClick={() => this.props.onClick && this.props.onClick()}
            autoPlay
            id={this.props.uid}
            ref={(ref) => { this.video = ref }}
            className="mini" />
        </MeMini>
        : null}

    </VideoContainer>)
  }
}
// 
const NotMe = styled.div`
  // width: 120px;
  // height: 67px;
  // background-color: black;
  border: ${props => props.online ? "2px solid green" : "2px solid #707070"};
  position: relative;
  display: flex;
  flex-direction: column;

  .camera {
    border: 1px solid green;
    width: 116px;
    margin: 0;
    padding: 0;
    // object-fit: cover;
  }
  .share{
    border: 1px solid yellow;
    width: 60px;
    // position: absolute;
    // right: 10px;
    // bottom: 10px;
    // object-fit: cover;
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
    background-image: url(${ props => props.thumbnail || who});
    background-color: #EFEFEF;
    background-size: cover;
  }
`
// MEMBER VIDEO LIST component class
const Others = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  .thumbnail {
    border: 1px solid red;
    position: absolute;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background-image: url(${props => props.thumbnail});
    background-size: cover;
    background-position: center center;
    background-color: white;

  }
  .share {
    border: 1px solid green;

  }
  .camera {
    border: 1px solid blue;

  }
`
class OthersVideo extends Component {
  constructor(props) {
    super(props)
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
    if (this.video && (this.props.stream !== prevProps.stream)) {
      this.video.srcObject = this.props.stream
    }
    if (this.videoShare && (this.props.share !== prevProps.share)) {
      this.videoShare.srcObject = this.props.share
    }
  }

  render() {
    // const css = this.props.selected ? "selected" : ""

    return (<VideoContainer>
      <Others thumbnail={this.props.thumbnail}>

        <div className="thumbnail"></div>

        <div className="share">share</div>
        <div className="camera">camera</div>
      </Others>
      {/* <NotMe thumbnail={this.props.thumbnail} className={css} online={this.props.stream}>
        <div className="thumbnail" />

        {this.props.share ?
          <video
            className="share"
            onClick={() => this.props.onClickShare && this.props.onClickShare()}
            autoPlay
            ref={(ref) => { this.videoShare = ref }}
          />
          : null}

        {this.props.stream ?
          <video
            hidden={this.props.mute}
            className="camera"
            onClick={() => this.props.onClickVideo && this.props.onClickVideo()}
            autoPlay
            ref={(ref) => { this.video = ref }}
          />
          : null}

        {(this.props.stream && this.props.mute) || (this.props.stream == null && this.props.share == false) ?
          <div className="txt">
            {this.props.nick_name &&
              this.props.nick_name.slice(0, 13)}</div>
          : null}



      </NotMe> */}
    </VideoContainer >)
  }
}
// 
function isOpen(ws) { return ws.readyState === ws.OPEN }
class VChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // stream
      selectedVideo: null, // 큰 화면 영상
      localStream: null, // 로컬 카메라
      localShare: null, // 로컬 공유영상
      // ...
      selected: this.props.userInfo.uid,
      screen: "nick_name",
      // 
      share: [],
      mute: [],
      peers: [],
      connected: 1,
      //
      refresh: 1,
    }
    // camera
    this.myPeer = new Peer(this.props.userInfo.uid)
    this.socket = null
    // share
    this.myPeer2 = new Peer('share-' + this.props.userInfo.uid)
    this.socket2 = null
    // functions
    this.resize_window = this.resize_window.bind(this)
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
        thumbnail: (mem && mem.thumbnail && mem.thumbnail.s_img) || who,
        stream: null, share: null,
      }))

    await this.setState({ peers: peers })
  }
  componentDidMount() {
    console.log(this.props);
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
        throw Error("failed connect to socket-server")

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
        peers.forEach(peer => {
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
      if (this.state.selected == userId) {
        this.setState({
          selectedVideo: this.state.localStream,
          selected: "me"
        })
        this.videoselected(this.state.localStream)
      }
    })
    this.myPeer.on('open', id => {
      if (isOpen(this.socket))
        this.socket.emit('join-room', this.props.design.uid, id)
      // console.log('open', id)
    })
    this.myPeer.on('call', call => {
      const stream = this.state.localStream;
      if (stream == null)
        return;
      call.answer(stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.forEach(peer => {
          if (peer.user_id == call.peer) {
            peer.stream = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
    })
    this.socket.on("mute", mute => {
      this.setState({ mute: mute })
    })

    //                     // 
    // SCREEN SHARE STREAM // 
    //                     //
    this.sharebtn &&
      this.sharebtn.addEventListener('click', () => {
        navigator.mediaDevices.getDisplayMedia(constraint.share)
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
    this.socket2.on("share-list", share => {
      this.setState({ share: share });
    })
    this.socket2.on("exit-share", userId => {
    })
    this.socket2.on('update-share', userId => {
      const stream = this.state.localShare || this.state.localStream
      const call = this.myPeer2.call(userId, stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.forEach(peer => {
          if (peer.user_id == userId.replace('share-', '')) {
            peer.share = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
    })
    this.socket2.on('user-connected', userId => {
      const stream = this.state.localShare || this.state.localStream
      // console.log(stream)
      const call = this.myPeer2.call(userId, stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.forEach(peer => {
          if (peer.user_id == userId.replace('share-', '')) {
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
      call.answer(stream)
      call.on('stream', userVideoStream => {
        const peers = [...this.state.peers]
        peers.forEach(peer => {
          if (peer.user_id == call.peer.replace('share-', '')) {
            peer.share = userVideoStream
          }
        })
        this.setState({ peers: peers })
      })
    })
  }
  muteVideo = () => {
    if (isOpen(this.socket))
      this.socket.emit("mute", this.props.design.uid, this.props.userInfo.uid)
  }
  clickedVideo = (obj) => {
    this.setState({
      selectedVideo: obj.stream,
      selected: obj.user_id
    })
    this.videoselected(obj.stream)
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
    // const connected = this.state.peers && this.state.peers.length > 0 && this.state.peers.filter(peer => peer.stream != null)
    const nickName = this.props.userInfo.nickName || "디자인 맴버"

    return (
      this.state.refresh &&
      <VideoChatContainer w={window.innerWidth} h={window.innerHeight}>

        {/* top */}
        <ButtonBarContainer>
          <div className='btn chat' onClick={() => {
            const url = geturl() + `/chat/${this.props.design.uid} `
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
        <ScreenContainer>
          {/* contain={this.state.selectedVideo.get}> */}
          <video
            muted
            autoPlay
            ref={(ref) => this.video = ref}
          />
        </ScreenContainer>




        {/* bottom*/}
        <VideosContainer>
          <div className="me">
            {this.state.localShare ?
              <MyVideo
                onClick={() => this.clickedVideo({ stream: this.state.localShare, user_id: "me" })}
                close={() => {
                  this.setState({ localShare: null, refresh: this.state.refresh++ % 100 });
                  this.socket2.emit("exit-share", this.props.design.uid, 'share-' + this.props.userInfo.uid);
                }}
                id={this.props.userInfo.uid}
                autoPlay
                control={false}
                screen={"share"}
                stream={this.state.localShare}
                nick_name={nickName} />
              : null}

            <MyVideo
              onClick={() => this.clickedVideo({ stream: this.state.localStream, user_id: "me" })}
              mutecam={this.muteVideo}
              id={this.props.userInfo.uid}
              autoPlay
              control={true}
              screen={"camera"}
              stream={this.state.localStream}
              thumbnail={(this.props.userInfo && this.props.userInfo.thumbnail && this.props.userInfo.thumbnail.s_img) || who}
              nick_name={nickName} />

          </div>

          <div className="others">
            {/* <div className="member-count">
              참여자&nbsp;
            {(connected && connected.length + 1) || "-"}
            /
            {(this.props.design
                && this.props.design.member
                && this.props.design.member.length) || "-"}
            </div> */}

            <ScrollContainer vertical={false} className="inner scroll-container">

              {this.state.peers &&
                this.state.peers.length > 0 &&

                this.state.peers.map((peer, idx) => {

                  return (<div className="peer" key={idx + peer.nick_name}>

                    <OthersVideo
                      onClickVideo={() => this.clickedVideo(peer)}
                      onClickShare={() => this.clickedVideo(peer)}

                      {...peer}
                      itsMe={false}
                      share={this.state.share.findIndex(ele => ele.room === this.props.design.uid && ele.user === 'share-' + peer.user_id) > -1 && peer.share}
                      stream={peer.stream}
                      mute={this.state.mute.findIndex(ele => ele.room === this.props.design.uid && ele.user === peer.user_id) > -1}
                      close={() => {
                        const peers = [...this.state.peers]
                        let idx = peers.findIndex(_peer => _peer.user_id === peer.user_id)
                        if (idx > -1) {
                          peers[idx].share = null
                        }
                        this.setState({ peers: peers })
                      }}
                      selected={peer.user_id == this.state.selected} />
                  </div>)
                }
                )}
            </ScrollContainer>
          </div>
        </VideosContainer>





      </VideoChatContainer >)
  }
}

export default VChat

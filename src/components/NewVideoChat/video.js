import React, { Component } from 'react';
import styled from 'styled-components';
import who from 'source/video-chat-empty-thumbnail.svg';
import icon_cam_on from 'source/video-chat-icon-camera-on.svg';
import icon_cam_off from 'source/video-chat-icon-camera-off.svg';
import icon_mic_on from 'source/video-chat-icon-mic-on.svg';
import icon_mic_off from 'source/video-chat-icon-mic-off.svg';

const Me = styled.div`
  width: 259px;
  height: 146px;
  background-color: green;
  position: relative;
  display: flex;
  border: 1px solid #707070;
  
  video {
    width: 259px;
    margin: 0;
    padding: 0;
  }
  .txt {
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
`;
const NotMe = styled.div`
  width: 120px;
  height: 67px;
  background-color: black;
  border: 1px solid #707070;
  position: relative;
  display: flex;

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
    background-color: #EFEFEF;
    background-image: url(${props => props.thumbnail || who});
    background-size: cover;    
  }
`;
const VideoContainer = styled.div`
  color: white;
`;
class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // screen: 'camera', // "camera", "share", "nick-name"
      mic: false, cam: true, // option(it's me only)
    }
  }
  componentDidMount() {
    if (this.props.stream) {
      this.video.srcObject = this.props.stream;
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.stream != prevProps.stream) {
      this.video.srcObject = this.props.stream;
    }
  }

  render() {
    return (<VideoContainer>
      {this.props.itsMe
        ? <Me thumbnail={null}>
          {(this.props.screen === "camera")
            ?
            <video
              onClick={() => this.props.onClick && this.props.onClick()}
              id={this.props.uid}
              // muted={this.props.muted}
              autoPlay
              ref={(ref) => { this.video = ref }}
            />
            :
            (this.props.screen === "share")
              ?
              <video className="mini" />
              : <div className="txt">{this.props.nick_name}</div>}

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

        : <NotMe thumbnail={null} className={this.props.selected ? "selected" : ""}>
          <div className="thumbnail" />
          <div className="txt">{this.props.nick_name}</div>
        </NotMe>}

    </VideoContainer>)
  }
}

export default Video;


// <div
//   style={{ ...this.props.frameStyle }}
// >
//   <video
//     onClick={() => this.props.onClick && this.props.onClick()}
//     id={this.props.id}
//     muted={this.props.muted}
//     autoPlay
//     style={{ ...this.props.videoStyles }}
//     ref={(ref) => { this.video = ref }}
//   ></video>
//   {muteControls}
// </div>
// const muteControls = this.props.showMuteControls && (
//   <div>
//     <i onClick={this.mutemic}
//       style={{ cursor: 'pointer', padding: 5, fontSize: 20, color: this.state.mic && 'white' || 'red' }}
//       className='material-icons'>
//       {this.state.mic && 'mic' || 'mic_off'}
//     </i>
//     <i onClick={this.mutecamera}
//       style={{ cursor: 'pointer', padding: 5, fontSize: 20, color: this.state.camera && 'white' || 'red' }}
//       className='material-icons'>
//       {this.state.camera && 'videocam' || 'videocam_off'}
//     </i>
//   </div>
// )
// componentDidMount() {
//   if (this.props.videoStream) {
//     this.video.srcObject = this.props.videoStream
//   }
// }
// componentDidUpdate(prevProps) {
//   // if (prevProps.videoStream !== this.props.videoStream) {
//   // this.video.srcObject = this.props.videoStream
//   // }
// }
//  componentWillReceiveProps(nextProps) {
//  console.log(nextProps.videoStream)
//  if (nextProps.videoStream && nextProps.videoStream !== this.props.videoStream) {
//  this.video.srcObject = nextProps.videoStream
//  }
//  }

// mutemic = (e) => {
//   const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'audio')
//   this.setState(prevState => {
//     if (stream) stream[0].enabled = !prevState.mic
//     return { mic: !prevState.mic }
//   })
// }

// mutecamera = (e) => {
//   const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'video')
//   this.setState(prevState => {
//     if (stream) stream[0].enabled = !prevState.camera
//     return { camera: !prevState.camera }
//   })
// }

// screenshare 버튼 클릭시 displaymedia 가져오기
// screenshare = (e) => {
//   const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'video')
//   this.setState(prevState => {
//     if (stream) stream[0].enabled = !prevState.camera
//     return { camera: !prevState.camera }
//   })
// }

// localvideo 버튼 클릭시 usermedia 가져오기
// localvideo = (e) => {
//   const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'video')
//   this.setState(prevState => {
//     if (stream) stream[0].enabled = !prevState.camera
//     return { camera: !prevState.camera }
//   })
// }
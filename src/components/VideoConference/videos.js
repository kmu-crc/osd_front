import React, { Component } from 'react'
import Video from './video'

class Videos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rVideos: [],
      remoteStreams: []
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.remoteStreams);
    if (this.props.remoteStreams !== nextProps.remoteStreams) {
      let _rVideos = nextProps.remoteStreams.map((rVideo, index) => {
        const _videoTrack = rVideo.stream.getTracks().filter(track => track.kind === 'video')
        // console.log(this.props.thumbnails, rVideo);
        // const thumbnail = this.props.thumbnails.filter(item => item.key === rVideo.id);
        // console.log(thumbnail);
        console.log(this.props.thumbnails,rVideo);
        let thumbnail=null;
        this.props.thumbnails.map((item,index)=>{
          if(item.key===rVideo.id){
            thumbnail=item.value;
          }
        })
        console.log(thumbnail);
        let video = _videoTrack && (
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
               backgroundImage:`url(${thumbnail})`, 
              borderRadius: "50%", width: "50px", height: "50px", border: "2px solid white", backgroundColor: "white", top: "50px", left: "70%"
            }}>
            </div>
            <Video
              videoStream={rVideo.stream}
              frameStyle={{ width: 120, height: 120, float: 'left', padding: '0 3px' }}
              videoStyles={{
                cursor: 'pointer',
                objectFit: 'cover',
                borderRadius: 3,
                width: '100%',
              }}
              autoplay
            />
          </div>
        ) || <div style={{ width: "120px" }}>empty</div>

        return (
          <div
            id={rVideo.name}
            onClick={() => this.props.switchVideo(rVideo)}
            style={{ display: 'inline-block' }}
            key={index}
          >
            {video}
          </div>
        )
      })
      this.setState({
        remoteStreams: nextProps.remoteStreams,
        rVideos: _rVideos
      })
    }
  }
  render() {
    return (
      <div
        style={{
          zIndex: 3,
          position: 'fixed',
          padding: '6px 3px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          maxHeight: 120,
          top: 'auto',
          right: 10,
          left: 10,
          bottom: 10,
          overflowX: 'scroll',
          whiteSpace: 'nowrap'
        }}
      >
        {this.state.rVideos}
      </div>
    )
  }

}
export default Videos
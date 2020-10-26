import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import clipboardCopy from 'clipboard-copy';
import * as appPropTypes from './appPropTypes';
import { withRoomContext } from '../RoomContext';
import * as requestActions from '../redux/requestActions';
//  import { Appear } from './transitions';
import Me from './Me';
import ChatInput from './ChatInput';
import Peers from './Peers';
//  import Stats from './Stats';
import Notifications from './Notifications';
//  import NetworkThrottle from './NetworkThrottle';
import styled from "styled-components";
import host, { geturl } from "config"

const VideoChatContainer = styled.div`
  position: relative;
  // background-color: black;
  width: 100%; // ${props => props.w}px;
	height: 100%; // 768px; // ${props => props.h}px;
	*{
		border: 1px solid red;
	}
`;
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
`;
const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  // position: fixed;
  position: absolute;
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
`;

const RoomContainer = styled.div`
	position: relative;
	width: 100%;
	height: ${props => props.h}px;
	background-color: black;
	z-index: 101;
`;
const TopContainer = styled.div`
  z-index: 101;
	width: 100%;
	height: 36px;
	min-height: 36px;
	// border: 1px solid red;
	background-color: transparent; 
  position: fixed; 
	top: 0px;
	display: flex;
  flex-direction: rows;
  justify-content: space-between;
  background-color: transparent;

	margin-top: 13px;
  padding-left: 25px;
	padding-right: 16px;
	
	z-index: 300;

  .btn {
    cursor: pointer;
    text-align: center;

    &.chat {
			width: max-content;
      height: 35px;
      border-radius: 36px;
      background: rgba(125, 125, 125, 0.5);
      padding: 8px 25px;
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
const MiddleContainer = styled.div`
  z-index: 100;
	width: 100%;
	height: 100%;
	min-height: 250px;
	color: white;
	background-image: url(${props => props.bg.l_img});
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	position: relative;
	margin: auto;
	.pannel {
		z-index: 100;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		opacity: .9;
	}
	video {
		position: relative;
		z-index: 103;
		width: 100%;
		height: 100%;
		object-fit: fill;
	}
`;
const BottomContainer = styled.div`
	z-index: 101;
	width: 100%;
	height: 260px;
	min-height: 260px;
	// border: 1px solid red;
  // background-color: transparent;
	background-color: rgba(54, 69, 79, 0.25);
	position: absolute; 
	bottom: 0px; 
	display: flex;
	flex-direction: row;

	.me {
		width: 260px;
		height: 260px;
		// border:1px solid white;
	}
	.peers {
		display: flex;
		flex-direction: column;
		width: 100%;
		// border:1px solid skyblue;

		.count {
			width: max-content;
			margin-left: auto;	
			margin-top: 1rem;
			margin-right: 1rem;
		}
		.v-scroll {

		}
	}
`;

class Room extends React.Component {
	constructor(props) {
		super(props);
		this.state = { h: window.innerHeight, share: false, }
	}
	render() {
		const {
			roomClient,
			room,
			me,
			amActiveSpeaker,
			onRoomLinkCopy
		} = this.props;
		console.log("Room:", this.props);

		return (// <React.Fragment>
			<RoomContainer h={this.state.h || window.innerHeight}>

				<Notifications />

				<TopContainer>
					<div className='btn chat' onClick={() => {
						const url = geturl() + `/chat/${this.props.design.uid} `
						const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`
						window.open(url, "chat", options)
					}}>
						<span className='txt'>채팅</span>
					</div>
					<div ref={(ref) => this.sharebtn = ref} className='btn share'>
						<span className='txt'>화면공유</span>
					</div>
					<div className='btn exit' onClick={() => { window.open('', '_self').close() }}>
						<span className='txt'>나가기</span>
					</div>
				</TopContainer>


				<MiddleContainer bg={this.props.design.img}>
					<div className="pannel"></div>
					<video
						muted
						autoPlay
						ref={(ref) => this.video = ref} />
				</MiddleContainer>


				<BottomContainer>
					<div className="me">
						<Me
							userInfo={this.props.userInfo}
							share={this.state.share}
							sharebtn={this.sharebtn}
							clicked={(stream) => this.clickedview(stream)}
							thumbnail={this.props.userInfo.thumbnail} />
					</div>
					<div className="peers">
						{/* <div className="count"><p>1/1</p></div> */}
						<div>
							<Peers
								clicked={(stream) => this.clickedview(stream)}
								member={this.props.design.member} />
						</div>
					</div>
				</BottomContainer>


			</RoomContainer>

			// 	<ButtonBarContainer>
			// 	</ButtonBarContainer>

			// 	<ScreenContainer>
			// 		{/* <video /> */}
			// 	</ScreenContainer>
			// 	<VideosContainer>
			// 		{/* <Me /> */}
			// 		{/* <div style={{ width: "25%", height: "25%" }}> */}
			// 		{/* <Peers member={this.props.design.member} /> */}
			// 		{/* </div> */}
			// 		{/* <div style={{ width: "25%", height: "25%" }}> */}
			// 		{/* <ChatInput /> */}
			// 		{/* </div> */}
			// 	</VideosContainer>

			// 	<ReactTooltip
			// 		type='light'
			// 		effect='solid'
			// 		delayShow={100}
			// 		delayHide={100}
			// 		delayUpdate={50}
			// 	/>
			// </VideoChatContainer>
			//</React.Fragment>
		);
	}
	clickedview = (stream) => {
		if (this.video && stream) {
			this.video.srcObject = stream;
		}
	}
	componentDidMount() {
		// join
		const { roomClient } = this.props;
		roomClient.join();

		// window size
		this.setState({ h: window.innerHeight });
		window.addEventListener("resize", () => {
			this.setState({ h: window.innerHeight });
		})
	}
	componentWillUnmount() {
		window.removeEventListener("resize");
	}
}

// Room.propTypes =
// {
// 	// roomClient: PropTypes.any.isRequired,
// 	// room: appPropTypes.Room.isRequired,
// 	// me: appPropTypes.Me.isRequired,
// 	// amActiveSpeaker: PropTypes.bool.isRequired,
// 	// onRoomLinkCopy: PropTypes.func.isRequired
// };

export default Room;

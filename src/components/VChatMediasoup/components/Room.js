import React from 'react';
import { connect } from 'react-redux';
import Me from './Me';
import Peers from './Peers';
import styled from "styled-components";
import { geturl } from "config"
import nobg from "source/hero1920.png";
import ScrollContainer from 'react-indiana-drag-scroll';
// import Notifications from './Notifications';

const RoomDiv = styled.div`
	position: relative;
	width: 100%;
	height: ${props => props.h}px;
`;
const MenuBarContainer = styled.div`
	width: 100%;
	height: 45px;
  position: relative; 
	display: flex;
  flex-direction: rows;
  justify-content: space-between;
  background-color: #707070; // transparent;
	padding: 5px 25px;
	
	z-index: 150;

  .btn {
    cursor: pointer;
    text-align: center;
		&.peer {
			position: absolute;
			right: 10%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
    &.chat {
			width: max-content;
      height: 35px;
      border-radius: 36px;
      background: rgba(244, 0, 0, 0.8);
      padding: 8px 25px;
    }
    &.share {
      width: max-content;
      height: 35px;
      border-radius: 36px;
      background: rgba(125, 125, 255, 0.5);
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
const ContentContainer = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${props => props.bg || nobg});
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
	z-index: 100;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	.panel {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 101;
		background-color: rgba(0, 0, 0, .5);
	}

`;
const RightVerticalScroll = styled.div`
	z-index: 110;
	background-color: black;
	color: white;
	padding: 5px;
	width: 260px;
`;
const MiddleDynamicGrid = styled.div`
	z-index: 110;
	background-color: rgba(255,255,255, 0.5);
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.container {
		// height: max-content;
		width: max-content;
		// overflow: auto;
		justify-items: center;
		align-items: center;
		margin: auto;
		display: grid;
		grid-template-rows: repeat(${props => props.grid.row || 1}, 252px);
		grid-template-columns: repeat(${props => props.grid.col || 1}, 252px);
		gap: 10px 10px;
	}
`;
const BigScreenContainer = styled.div`
	width: 100%;
	height: 100%;
	min-height: 250px;
	color: white;

	display: ${props => props.visible ? "block" : "none"};
	position: relative;
	// margin: auto;

	z-index: 120;

	video {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: contain;
		// object-fit: cover;
	}
`;
const PeersContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(54, 69, 79, 0.25);
	display: flex;
	flex-direction: column;

	.me {
		width: 250px;
		height: 250px;
		// border:1px solid white;
	}
	.peers {
		display: flex;
		flex-direction: row;
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
		this.state = {
			h: window.innerHeight,
			shareState: "off", mode: "grid"/* :non-clicked, "scroll":clicked*/, hidepeer: false,
		};
	};

	render() {
		const { design, peers /*, roomClient, room, me, onRoomLinkCopy */ } = this.props;
		const bg = (design && design.img && design.img.l_img) || nobg;
		const { mode, hidepeer } = this.state;

		const grid = [
			/* 0*/{ row: 1, col: 1 },
			/* 1*/{ row: 1, col: 2 },
			/* 2*/{ row: 2, col: 2 },
			/* 3*/{ row: 2, col: 2 },
			/* 4*/{ row: 2, col: 3 },
		];

		const total = 1 + peers.length || 0;
		const idx = total > 4 ? 4 : total - 1;

		return (<RoomDiv h={this.state.h || window.innerHeight}>
			{/* notifications */}
			{/* <Notifications /> */}

			{/* menubar */}
			<MenuBarContainer >
				<div className='btn chat' onClick={() => {
					const url = geturl() + `/chat/${this.props.design.uid} `
					const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`
					window.open(url, "chat", options)
				}}>
					<span className='txt'>채팅</span>
				</div>

				<div className='btn share' ref={ref => this.sharebtn = ref}>
					<span className='txt'>
						{this.state.shareState === "on" ? "화면공유 종료" : "화면공유"}
					</span>
				</div>

				<div className='btn exit' onClick={() => { window.open('', '_self').close() }}>
					<span className='txt'>나가기</span>
				</div>

				{mode === "scroll"
					? <div className={`btn peer ${hidepeer}`} onClick={() => this.setState({ hidepeer: !hidepeer })}>
						<span className="txt">{!hidepeer ? "숨기기" : "보이기"}</span>
					</div>
					: null}
			</MenuBarContainer>

			<ContentContainer bg={bg}>
				<div className="panel" />

				{/* <div>영상부분</div> */}
				{/* middle */}
				<BigScreenContainer
					visible={(this.video && this.video.srcObject) ? true : false}>
					<video
						muted autoPlay loop="loop"
						ref={ref => this.video = ref} />

				</BigScreenContainer>

				{/*  */}
				{mode === "scroll" && !hidepeer
					? <RightVerticalScroll>
						<ScrollContainer vertical={true} horizontal={false} className="inner scroll-container">
							<Me
								needReload={() => {
									this.video.srcObject = null;
									this.setState({ mode: "grid" });
								}}
								userInfo={this.props.userInfo}
								sharebtn={this.sharebtn}
								shareState={this.state.shareState}
								share={(shareState) => this.setState({ shareState: shareState })}
								clicked={stream => this.clickedview(stream)}
								thumbnail={this.props.userInfo.thumbnail}
							/>
							<Peers
								clicked={(stream) => this.clickedview(stream)}
								member={this.props.design.member} />
						</ScrollContainer>
					</RightVerticalScroll> : null}

				{mode === "grid"
					? <MiddleDynamicGrid grid={grid[idx]}>
						<div className="container">
							<Me
								needReload={() => {
									this.video.srcObject = null;
									this.setState({ mode: "grid" });
								}}
								userInfo={this.props.userInfo}
								sharebtn={this.sharebtn}
								shareState={this.state.shareState}
								share={(shareState) => this.setState({ shareState: shareState })}
								clicked={stream => this.clickedview(stream)}
								thumbnail={this.props.userInfo.thumbnail}
							/>
							<Peers
								clicked={(stream) => this.clickedview(stream)}
								member={this.props.design.member} />
						</div>
					</MiddleDynamicGrid> : null}
			</ContentContainer>
		</RoomDiv>);
	};

	clickedview = (stream) => {
		if (this.video && stream) {
			stream.addEventListener('inactive', () => {
				this.video.style.display = "none";
				this.video.srcObject = null;
				this.setState({ mode: "grid" });
			});
			stream.addEventListener('active', () => {
				this.video.style.display = "block";
			})
			this.video.srcObject = stream;
			this.setState({ mode: "scroll" });
		}
	};

	componentDidMount() {
		// join
		const { roomClient } = this.props;
		roomClient.join();

		// window size
		this.setState({ h: window.innerHeight });
		window.addEventListener("resize", () => {
			this.setState({ h: window.innerHeight });
		});
	};
	componentWillUnmount() {
		window.removeEventListener("resize");
	};
}
const mapStateToProps = (state) => {
	const peersArray = Object.values(state.peers);
	return {
		peers: peersArray,
		activeSpeakerId: state.room.activeSpeakerId
	};
};

const RoomContainer = connect(
	mapStateToProps,
	null,
)(Room);
export default RoomContainer;

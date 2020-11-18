import React from 'react';
import { connect } from 'react-redux';
import Me from './Me';
import Peers from './Peers';
import styled from "styled-components";
import { geturl } from "config"
import nobg from "source/hero1920.png";
import ScrollContainer from 'react-indiana-drag-scroll';
import { SearchMemberRequest } from "redux/modules/search";
import SearchMember from "components/Commons/SearchDesignMember";
import { Modal } from 'semantic-ui-react';
// import Notifications from './Notifications';
import Cross from "components/Commons/Cross";

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
		&.start {
			position: absolute;
			left: 20%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
		&.stop {
			position: absolute;
			left: 30%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
		&.invite {
			position: absolute;
			left: 10%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
		&.return {
			position: absolute;
			right: 20%;
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
	padding: 5px 5px 5px 0px; // top, bottom, left, right
	width: 260px;
	display: ${props => props.hidden ? "none" : "flex"};

	z-index: 110;
	background-color: rgba(255,255,255, 0.5);
	flex-direction: column;
	justify-content: flex-start;

  .hand {
		cursor: grab;
	}
	overflow-x: hidden;
	overflow-y: scroll;
	:hover {
	  ::-webkit-scrollbar {
	  	width: 5px;
	  }
	}
	::-webkit-scrollbar {
    position: absolute;
		width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 112, 112, 1) !important;
	}
`;
const MiddleDynamicGrid = styled.div`
	z-index: 110;
	background-color: rgba(255,255,255, 0.5);
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
  .hand {
		cursor: grab;
	}
	.container {
		overflow-x: hidden;
		overflow-y: scroll;
		:hover {
			::-webkit-scrollbar {
				width: 5px;
			}
		}
		::-webkit-scrollbar {
			position: absolute;
			width: 3px;
		}
		::-webkit-scrollbar-thumb {
			background: rgba(255, 112, 112, 1) !important;
		}
		// height: max-content;
		padding: 10px;
		justify-items: center;
		align-items: center;
		margin: auto;
		margin-bottom: 50px;
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
const InviteModal = styled(Modal)`
  margin-top: 50px !important;
  margin-bottom: 50px !important;
	height: 400px;
	width: 100%;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #000000;
  border: 1px solid #EFEFEF;
  border-radius: 10px;
  opacity: 1;
  ::-webkit-scrollbar {
    position: absolute;
    width: 3.9px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(112, 112, 112, 0.45) !important;
	}
	.close-box {
		cursor: pointer;
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 500;
	}
	.search-bar{
		z-index: 499;
	}
`;

/*디버깅용 주석
공유플래그: on || off
- 공유하면 on
- 
화면모드플래그

숨김플래그
초대모달플래그

*/
let mediaRecorder;
let chunks = [];
class Room extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			h: window.innerHeight,

			shareState: "off",
			mode: "grid",// || "scroll",
			hidepeer: false,
			invite: false,

		};
	};

	render() {
		const { design, peers, me, roomClient, consumers, /*  room, onRoomLinkCopy */ } = this.props;
		const bg = (design && design.img && design.img.l_img) || nobg;
		const { h, mode, hidepeer, invite } = this.state;

		const grid = [
			/* 0*/{ row: 1, col: 1 },
			/* 1*/{ row: 1, col: 2 },
			/* 2*/{ row: 2, col: 2 },
			/* 3*/{ row: 2, col: 2 },
			/* 4*/{ row: 2, col: window.innerWidth > window.innerHeight ? 4 : 3 },
		];

		// const DUMMY = () => <div style={{ position: "relative", width: "250px", height: "250px", border: "1px solid white", backgroundColor: "black", color: "white", fontSize: "3em", textAlign: "center" }}>DUMMY</div>
		const total = 1 + (peers.length || 0);
		const idx = total > grid.length - 1 ? grid.length - 1 : total - 1;

		const myvideo = me.find(track => track && ["front", "back", "share"].includes(track.type));
		// const myaudio = null;//me.find(track => track && track.kind === "audio");
		const shareState = myvideo && myvideo.type === "share";
		console.log("formix", this.props.design);
		return (<RoomDiv h={h || window.innerHeight}>
			{/* notifications */}
			{/* <Notifications /> */}

			{/* menubar */}
			<MenuBarContainer>
				<div className='btn chat' onClick={() => {
					const url = geturl() + `/chat/${this.props.design.uid} `
					const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`
					window.open(url, "chat", options)
				}}>
					<span className='txt'>채팅</span>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div className="btn start" onClick={() => {
						const actx = new AudioContext();
						const dest = actx.createMediaStreamDestination();
						let _stream = new MediaStream();
						const myaudio = me.find(obj => obj && obj.track && obj.track.kind === "audio").track;
						_stream.addTrack(myaudio);
						actx.createMediaStreamSource(_stream).connect(dest);
						peers.map(peer => {
							console.log('record:', peer);
							const consumerAry = peer.consumers.map(id => consumers[id]);
							const audioConsumer = consumerAry.find(cnsmr => cnsmr.track.kind === "audio").track;
							actx.createMediaStreamSource(new MediaStream([audioConsumer])).connect(dest);
						});
						const mixedtrack = dest.stream.getTracks()[0];
						const stream = new MediaStream([mixedtrack]);
						mediaRecorder = new MediaRecorder(stream);
						mediaRecorder.start();
						mediaRecorder.onstop = (e) => {
							var blob = new Blob(chunks, { 'type': 'audio/ogg; codes=opus' });
							var url = URL.createObjectURL(blob);
							var a = document.createElement('a');
							document.body.appendChild(a);
							a.style = 'display:none';
							a.href = url;
							a.download = 'filename.ogg';//'화상회의-' + new Date().formatUTC("yyyyMMdd_HHmmss") + '.ogg';
							a.click();
							window.URL.revokeObjectURL(url);
							chunks = [];
						}
						mediaRecorder.ondataavailable = e => {
							chunks.push(e.data);
						}
					}}>
						<span className="txt"><i className="play icon" /></span>
					</div>
					<div className="btn pause" onClick={() => {
						1 ? mediaRecorder.pause() : mediaRecorder.resume();
					}}><span className="txt"><i className="pause icon" /></span></div>
					<div className="btn stop" onClick={() => {
						mediaRecorder && mediaRecorder.stop();
					}}><span className="txt"><i className="stop icon" /></span></div>
				</div>
				{/* <div className="btn chat invite" onClick={() => {
					// this.setState({ invite: true });
				}}>
					<span className="txt">초대</span>
				</div> */}
				<div className='btn share' //ref={ref => this.sharebtn = ref}
					onClick={async () => {
						if (shareState ||
							await roomClient.enableShare() === "cancelled") {
							roomClient.disableShare();
							roomClient.checkEnabledWebcam();
							return;
						}
					}}>
					<span className='txt'>
						{shareState ? "화면공유 종료" : "화면공유"}
					</span>
				</div>

				<div className='btn exit' onClick={() => { window.open('', '_self').close() }}>
					<span className='txt'>나가기</span>
				</div>
				{mode === "scroll" ?
					<div className="btn return" onClick={() => {
						this.setState({ mode: "grid" });
						this.video.srcObject = null;
					}}>
						<span className="txt">큰 화면 취소</span></div> : null}
				{mode === "scroll"
					? <div className={`btn peer ${hidepeer}`} onClick={() => this.setState({ hidepeer: !hidepeer })}>
						<span className="txt">{!hidepeer ? "숨기기" : "보이기"}</span>
					</div>
					: null}
			</MenuBarContainer>

			<ContentContainer bg={bg}>

				{/* modal */}
				{/* invite modal */}
				{/* <InviteModal open={invite} onClose={() => this.setState({ invite: false })}>
					<div className="close-box" onClick={() => this.setState({ invite: false })} >
						<Cross angle={45} color={"#707070"} weight={3} width={35} height={35} />
					</div>
					<div className="title-box">
						<span className="title">손님초대</span>
						<span className="memo">(디자인 맴버가 아닌 오픈소스사이트 사용자를 회의에 초대합니다.)</span>
					</div>
					<hr />
					<div className="search-bar">
						<SearchMember {...this.props} />
					</div>
					<hr />
					<div>
						<div>초대</div>
						<div>취소</div>
					</div>
				</InviteModal> */}

				<div className="panel" />

				{/* <div>영상부분</div> */}
				{/* middle */}
				<BigScreenContainer
					visible={(this.video && this.video.srcObject) ? true : false}>

					<video muted autoPlay loop="loop" ref={ref => this.video = ref} />

				</BigScreenContainer>


				{mode === "scroll"
					? <RightVerticalScroll hidden={hidepeer}>
						{/* <ScrollContainer vertical={true} horizontal={false} className="hand scroll-container"> */}
						<div className="container">
							<Me
								needReload={() => {
									this.video.srcObject = null;
									this.setState({ mode: "grid" });
								}}
								userInfo={this.props.userInfo}
								// sharebtn={this.sharebtn}
								// shareState={shareState}
								// share={(shareState) => this.setState({ shareState: shareState })}
								clicked={stream => this.clickedview(stream)}
								thumbnail={this.props.userInfo.thumbnail}
							/>

							<Peers
								clicked={(stream) => this.clickedview(stream)}
								member={this.props.design.member} />

						</div>
						{/* </ScrollContainer> */}
					</RightVerticalScroll> : null}

				{mode === "grid"
					? <MiddleDynamicGrid grid={grid[idx]}>
						{/* <ScrollContainer vertical={true} horizontal={false} className="hand scroll-container"> */}
						<div className="container">
							<Me
								needReload={() => {
									this.video.srcObject = null;
									this.setState({ mode: "grid" });
								}}
								userInfo={this.props.userInfo}
								// sharebtn={this.sharebtn}
								// shareState={shareState}
								// share={(shareState) => this.setState({ shareState: shareState })}
								clicked={stream => this.clickedview(stream)}
								thumbnail={this.props.userInfo.thumbnail}
							/>
							<Peers
								clicked={(stream) => this.clickedview(stream)}
								member={this.props.design.member} />
						</div>
						{/* </ScrollContainer> */}
					</MiddleDynamicGrid>
					: null}
			</ContentContainer>
		</RoomDiv >);
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
};


const mapStateToProps = (state) => {
	const peersArray = Object.values(state.peers);
	const me = Object.values(state.producers);
	return {
		peers: peersArray,
		activeSpeakerId: state.room.activeSpeakerId,
		me: me,
		consumers: state.consumers,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		SearchMemberRequest: (id, data, token) => (dispatch(SearchMemberRequest(id, data, token)))
	};
};

const RoomContainer = connect(mapStateToProps, mapDispatchToProps)(Room);
export default RoomContainer;

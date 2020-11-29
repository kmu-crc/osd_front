import React from 'react';
import { connect } from 'react-redux';
import Me from './Me';
import Peers from './Peers';
import styled from "styled-components";
import { geturl } from "config"
import nobg from "source/hero1920.png";
import Cross from "components/Commons/Cross";
import { confirm } from "components/Commons/Confirm/Confirm";
import { Modal } from 'semantic-ui-react';
import SearchMember from "./SearchMember";
// import ScrollContainer from 'react-indiana-drag-scroll';
// import { SearchMemberRequest } from "redux/modules/search";
// import SearchMember from "components/Commons/SearchDesignMember";
// import SearchMemberContainer from "containers/Commons/SearchMemberContainer";
// import Notifications from './Notifications';
import { InvitedUserRequest } from "redux/modules/design";


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


let mediaRecorder;
let chunks = [];

// for video recording
// const media_source = new MediaSource();
// media_source.addEventListener('sourceopen', handle_source_open, false);

let media_recorder;
let recorded_blobs;
// let source_buffer;

const canvas = document.createElement('canvas');
const video = document.querySelector('video');
// let video = null;

// const record_button = ...
// const play_button = ...
// const download_button = ...
// record_button.onclick = toggle_recording;
// play_button.onclick = play;
// download_button.onclick = download;

// main();

let buttontext = "start recording";
const stream = canvas.captureStream();


//handle_source_open = e => {
//	const opt = 'video/webm; codes="vp8"';
//	source_buffer = media_source.addSourceBuffer(opt);
//};

const handle_data_available = e => {
	if (e.data && e.data.size > 0)
		recorded_blobs.push(e.data);
};

const handle_stop = e => {
	// const blob = new Blob(recorded_blobs, { type: 'video/webm' });
	// video.src = window.URL.createObjectURL(blob);
};

const toggle_recording = (track, peers, consumers) => {
	if (buttontext === "start recording") {
		start_recording(track, peers, consumers);
	} else {
		stop_recording();
		buttontext = "start recording";
	}
};

const start_recording = (track, peers, consumers) => {
	let options = [
		{ mimeType: 'video/webm' },
		{ mimeType: 'video/webm,codesc=vp9' },
		{ mimeType: 'video/vp8' },
	];
	recorded_blobs = [];
	let idx = 0;
	let _ = null;
	if (peers == null || peers.length === 0) {
		alert('peers is empty');
		return;
	}
	peers.map(peer => {
		const consumerAry = peer.consumers.map(id => consumers[id]);
		const consumer = consumerAry.find(cnsmr => cnsmr.track.kind === "video").track;
		_ = new MediaStream([consumer]);
	});

	// let _ = new MediaStream([track]);

	// _.addTrack(track);
	while (idx < options.length) {
		try {
			media_recorder = new MediaRecorder(_, options[idx]);
			alert('set with ' + options[idx]);
			break;
		} catch (e) {
			console.error(e);
			idx++;
		}
	}
	buttontext = "stop recording";
	media_recorder.onstop = handle_stop;
	media_recorder.ondataavailable = handle_data_available;
	media_recorder.start(100);
};

const stop_recording = () => {
	media_recorder.stop();
};

const download = () => {
	if (recorded_blobs.length === 0) {
		alert("empty");
		return;
	}

	const blob = new Blob(recorded_blobs, { type: 'video/webm' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = 'recorded.webm';
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 500);
};



class Room extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			h: window.innerHeight,

			shareState: "off",
			mode: "grid", // || "scroll",
			hidepeer: false,
			invite: false,

			isRecording: false,
			isPaused: false,

			selected: null,
		};
	};

	render() {
		const { design, peers, me, roomClient, consumers, /*  room, onRoomLinkCopy */ } = this.props;
		const bg = (design && design.img && design.img.l_img) || nobg;
		const { h, mode, hidepeer, invite, isRecording, isPaused } = this.state;

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
		const shareState = myvideo && myvideo.type === "share";
		// const myaudio = null; //me.find(track => track && track.kind === "audio");

		console.log(this.props);
		return (<RoomDiv h={h || window.innerHeight}>
			{/* notifications */}
			{/* <Notifications /> */}

			{/* menubar */}
			<MenuBarContainer>

				{/* recording */}

				{/*  */}
				<div className='btn start' style={{ display: "flex", }}>
					<div onClick={() => toggle_recording(myvideo && myvideo.track, peers, consumers)}>
						<span className="txt">{buttontext}</span>
					</div>
					<div onClick={() => download()}>
						<span><i className="icon download " /></span>
					</div>
				</div>


				{/* chat */}
				<div className='btn chat' onClick={() => this.openChatWin()}>
					<span className='txt'>채팅</span>
				</div>

				{/* invite */}
				<div className="btn chat invite" onClick={() => {
					this.setState({ invite: true });
				}}>
					<span className="txt">초대</span>
				</div>

				{/* share */}
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

				{/* exit */}
				<div className='btn exit' onClick={() => { window.open('', '_self').close() }}>
					<span className='txt'>나가기</span>
				</div>

				{/* layout */}
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
				<InviteModal open={invite} onClose={() => this.setState({ invite: false })}>
					<div className="close-box" onClick={() => this.setState({ invite: false })} >
						<Cross angle={45} color={"#707070"} weight={3} width={35} height={35} />
					</div>
					<div className="title-box">
						<span className="title">손님초대</span>
						<span className="memo">(디자인 맴버가 아닌 오픈소스사이트 사용자를 회의에 초대합니다.)</span>
					</div>
					<hr />
					<div className="search-bar">
						<SearchMember
							id={this.props.userInfo.uid}
							token={this.props.token}
							selected={mems => {
								this.setState({ selected: mems });
							}} />
						{/* <SearchMemberContainer inputWidth={100} marginLeft={0} id="searchRect" addMemberItem={(item) => { console.log(item) }} /> */}
						{/* <SearchMemberContainer {...this.props} /> */}
					</div>
					<hr />
					<div>
						<div onClick={() => {
							this.state.selected &&
								this.state.selected.map(mem => {
									try {
										InvitedUserRequest(this.props.userInfo.uid, this.props.token, { to_user_id: mem })
									} catch (e) {
										alert(e);
									}
								});
							this.setState({ selected: null });
						}}>초대</div>
						<div onClick={() => {
							this.setState({ invite: false, selected: null });
						}}>취소</div>
					</div>
				</InviteModal>

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
		</RoomDiv>);
	};

	openChatWin = () => {
		const url = geturl() + `/chat/${this.props.design.uid}`;
		const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`;
		window.open(url, "chat", options);
	};

	pasueRecording = () => {
		mediaRecorder && mediaRecorder.pause();
		this.setState({ isPaused: true });
	}
	stopRecording = () => {
		mediaRecorder && mediaRecorder.stop();
		this.setState({ isRecording: false });
	}
	resumeRecording = () => {
		mediaRecorder && mediaRecorder.resume();
		this.setState({ isPaused: false });
	}
	recording = async (me, peers, consumers) => {


		return;
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
		mediaRecorder.onstop = async (e) => {
			const answer = await confirm("현시점에서 녹화를 종료됩니다. 파일로 저장을 원하신다면 (저장)를 클릭해주시기 바랍니다. (취소)를 클릭할 시 녹화된 내용은 사라집니다.", "저장", "취소");
			if (answer === false) {
				chunks = [];
				return;
			}
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

		this.setState({ isRecording: true });
	}

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
// const mapDispatchToProps = (dispatch) => {
// return {
// };
// };

const RoomContainer = connect(mapStateToProps, null)(Room);
export default RoomContainer;

// class MultiStreamsMixer {
// 	constructor(aryMediaStreams, elementClass) {
// 		var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';
// 		(function (that) {
// 			if (typeof window !== 'undefined') {
// 				return;
// 			}
// 			if (typeof global === 'undefined') {
// 				return;
// 			}
// 			global.navigator = {
// 				userAgent: browserFakeUserAgent,
// 				getUserMedia: function () { }
// 			};
// 			if (!global.console) {
// 				global.console = {};
// 			}
// 			if (typeof global.console.log === 'undefined' || typeof global.console.error === 'undefined') {
// 				global.console.error = global.console.log = global.console.log || function () {
// 					console.log(arguments);
// 				};
// 			}
// 			if (typeof document === 'undefined') {
// 				/*global document:true */
// 				that.document = {
// 					documentElement: {
// 						appendChild: function () {
// 							return '';
// 						}
// 					}
// 				};
// 				document.createElement = document.captureStream = document.mozCaptureStream = function () {
// 					var obj = {
// 						getContext: function () {
// 							return obj;
// 						},
// 						play: function () { },
// 						pause: function () { },
// 						drawImage: function () { },
// 						toDataURL: function () {
// 							return '';
// 						},
// 						style: {}
// 					};
// 					return obj;
// 				};

// 				that.HTMLVideoElement = function () { };
// 			}

// 			if (typeof location === 'undefined') {
// 				/*global location:true */
// 				that.location = {
// 					protocol: 'file:',
// 					href: '',
// 					hash: ''
// 				};
// 			}

// 			if (typeof screen === 'undefined') {
// 				/*global screen:true */
// 				that.screen = {
// 					width: 0,
// 					height: 0
// 				};
// 			}

// 			if (typeof URL === 'undefined') {
// 				/*global screen:true */
// 				that.URL = {
// 					createObjectURL: function () {
// 						return '';
// 					},
// 					revokeObjectURL: function () {
// 						return '';
// 					}
// 				};
// 			}

// 			/*global window:true */
// 			that.window = global;
// 		})(typeof global !== 'undefined' ? global : null);

// 		elementClass = elementClass || 'multi-streams-mixer';

// 		var videos = [];
// 		var isStopDrawingFrames = false;

// 		var canvas = document.createElement('canvas');
// 		var context = canvas.getContext('2d');
// 		canvas.style.opacity = 0;
// 		canvas.style.position = 'absolute';
// 		canvas.style.zIndex = -1;
// 		canvas.style.top = '-1000em';
// 		canvas.style.left = '-1000em';
// 		canvas.className = elementClass;
// 		(document.body || document.documentElement).appendChild(canvas);

// 		this.disableLogs = false;
// 		this.frameInterval = 10;

// 		this.width = 360;
// 		this.height = 240;

// 		this.useGainNode = true;
// 		this.AudioContext = window.AudioContext;
// 		this.URL = window.URL;
// 		this.MediaStream = window.MediaStream;
// 		this.Storage = {};

// 		/*global MediaStream:true */
// 		if (typeof this.MediaStream !== 'undefined') {
// 			// override "stop" method for all browsers
// 			if (typeof this.MediaStream.prototype.stop === 'undefined') {
// 				this.MediaStream.prototype.stop = function () {
// 					this.getTracks().forEach(function (track) {
// 						track.stop();
// 					});
// 				};
// 			}
// 		}

// 		Storage.AudioContext = this.AudioContext;
// 	}
// 	setSrcObject(stream, element) {
// 	};
// 	startDrawingFrames() {
// 	};
// 	drawVideosToCanvas() {
// 	};
// 	drawImage(video, idx) {
// 	};
// 	getMixedStream() {
// 	};
// 	getMixedVideoStream() {
// 	};
// 	getMixedAudioStream() {
// 	};
// 	getVideo(stream) {
// 	};
// 	appendStreams(streams) {
// 	};
// 	releaseStreams() {
// 	};
// 	resetVideoStreams(streams) {
// 	};
// }



// {isRecording
// 	? <div className="btn start">
// 		<div style={{ display: "flex", flexDirection: "row" }}>
// 			{/* pause / resume */}
// 			{isPaused
// 				? <div onClick={() => this.resumeRecording()}>
// 					<span className="txt">
// 						<i className="icon play" /></span>
// 				</div>
// 				: <div onClick={() => this.pasueRecording()}>
// 					<span className="txt">
// 						<i className="icon pause" /></span>
// 				</div>}
// 			{/* stop */}
// 			<div onClick={() => this.stopRecording()}>
// 				<span className="txt">
// 					<i className="icon stop" /></span>
// 			</div>
// 		</div>
// 	</div>
// 	: <div className="btn start" onClick={() => this.recording(me, peers, consumers)}>
// 		<span className="txt">
// 			<i className="record icon" />
// 		</span>
// 	</div>}
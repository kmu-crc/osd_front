import React from 'react';
import { connect } from 'react-redux';
import Me from './Me';
import Peers from './Peers';
import styled from "styled-components";
import { geturl } from "config"
import nobg from "source/hero1920.png";
import Cross from "components/Commons/Cross";
import { alert } from "components/Commons/Alert/Alert";
import { Modal } from 'semantic-ui-react';
import SearchMember from "./SearchMember";
import { InvitedUserRequest, CancelInvitedUserRequest } from "redux/modules/design";
import { confirm } from "components/Commons/Confirm/Confirm";
import classnames from 'classnames';
// import ScrollContainer from 'react-indiana-drag-scroll';
// import { SearchMemberRequest } from "redux/modules/search";
// import SearchMember from "components/Commons/SearchDesignMember";
// import SearchMemberContainer from "containers/Commons/SearchMemberContainer";
// import Notifications from './Notifications';
// import noimg from "source/noimg.png";

// import RecordRTC from 'recordrtc';
const VIDEO_SIZE = 128;
const GAP = 8;
class Mixer {
	constructor() {
		this.canvas = null;
		this.video = null;
		this.context = null;
		this.default = { x: 0, y: 0, w: window.screen.width, h: window.screen.height };
		this.videos = null;
		this.audios = null;
		this.blob = null;
		this.acts = null;
		this.dest = null;
		this.shared = null;
		this.videoStream = null;
		this.mediaRecorder = null;
		this.chunks = null;
		this.intervalId = null;
		this.post = null;
		this.tempfiles = null;
	}

	// 캔버스 엘레먼트 생성
	create = () => {
		this.canvas = document.createElement("canvas");
		this.canvas.width = 1024;//1920;
		this.canvas.height = 768;//1080;
		this.video = document.createElement("video");
		this.context = this.canvas.getContext("2d");
		this.videos = [];
		this.audios = [];
		this.actx = new AudioContext();
		this.dest = this.actx.createMediaStreamDestination();
		this.pos = [
			/*0*/ { x: 0, y: 0, w: this.canvas.width - ((VIDEO_SIZE + GAP) * 2), h: this.canvas.height },
			/*1*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2), y: 0, w: VIDEO_SIZE, h: VIDEO_SIZE },
			/*2*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2) + VIDEO_SIZE + GAP, y: 0, w: VIDEO_SIZE, h: VIDEO_SIZE },
			/*3*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2), y: VIDEO_SIZE + GAP, w: VIDEO_SIZE, h: VIDEO_SIZE },
			/*4*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2) + VIDEO_SIZE + GAP, y: VIDEO_SIZE + GAP, w: VIDEO_SIZE, h: VIDEO_SIZE },
			/*5*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2), y: (VIDEO_SIZE + GAP) * 2, w: VIDEO_SIZE, h: VIDEO_SIZE },
			/*6*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2) + VIDEO_SIZE + GAP, y: (VIDEO_SIZE + GAP) * 2, w: VIDEO_SIZE, h: VIDEO_SIZE },
			/*7*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2), y: (VIDEO_SIZE + GAP) * 3, w: VIDEO_SIZE, h: VIDEO_SIZE },
			/*8*/ { x: this.canvas.width - ((VIDEO_SIZE + GAP) * 2) + VIDEO_SIZE + GAP, y: (VIDEO_SIZE + GAP) * 3, w: VIDEO_SIZE, h: VIDEO_SIZE },
		];
		this.tempfiles = [];
	}

	init = () => {
		this.create();

		const videos = document.querySelectorAll('video');
		var ary_videos = Array.prototype.slice.call(videos); // converts NodeList to Array

		ary_videos && ary_videos.length > 0 && ary_videos.map(video => {
			this.videos.push(video);
		});

		const audios = document.querySelectorAll('audio');
		var ary_audios = Array.prototype.slice.call(audios);
		ary_audios && ary_audios.length > 0 && ary_audios.map(audio => {
			this.audios.push(audio);
		});

		// console.log(this.videos);

		// peers && peers.length && peers.map(peer => {
		// 	const consumerAry = peer.consumers.map(id => consumers[id]);
		// 	// audio
		// 	// actx.createMediaStreamSource(_stream).connect(dest);
		// 	// const peeraudio = consumerAry.find(cnsmr => cnsmr.track.kind === "audio").track;
		// 	// const peeraudiostream = peeraudio ? new MediaStream([peeraudio]):null;
		// 	// peeraudiostream && this.audios.push(peeraudiostream);
		// 	// actx.createMediaStreamSource(new MediaStream([peeraudio])).connect(dest);
		// 	// });
		// 	// const mixedtrack = dest.stream.getTracks()[0];
		// 	// const stream = new MediaStream([mixedt
		// });
	}
	set_pinned_id = (id) => {
		this.pinned = id;
	}
	get_pinned_id = () => {
		return String(this.pinned);
	}
	get_shared_id = () => {
		return this.shared;
	}
	addvideo = (video) => {
		if (!video) return;
		this.videos.push(video);
	}
	addaudio = (audio) => {
		if (!audio) return;
		this.audios.push(audio);
	}
	drawImage = (v, x, y, w, h) => {
		if (v.srcObject) {
			this.context.drawImage(v, x, y, w, h);
		} else {
			this.context.fillStyle = "#36454F";
			this.context.fillRect(x, y, w, h);
		}
	}

	// 드로우함수(좌표크기영상) // 
	determine = v => {
		// pinned-video, video-762.is-me, video-73.hidden //
		const pinned = this.get_pinned_id();
		if (pinned === v.id) {
			if (v.srcObject) {
				return 0;
			}
		} else {
			if (pinned == null && v.id.indexOf(".is-me") > -1) {
				return 0;
			}

		}
	}
	// 각 스트림마다 캔버스에 그리기(드로우함수호출)
	draw = () => {
		// console.log(this.videos);
		this.context.fillStyle = "#FFF";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.videos &&
			this.videos.length &&
			this.videos.map((v, i) => {
				const { x, y, w, h } = this.pos[i];
				this.drawImage(v, x, y, w, h);
			});
		// const pinned = this.videos.filter(v => v.id === "video-" + this.get_pinned_id());
		// // console.log(pinned, this.get_pinned_id());
		// if (pinned.length) {
		// 	const { x, y, w, h } = this.pos[0];
		// 	this.drawImage(pinned[0], x, y, w, h);
		// }
		// this.videos &&
		// 	this.videos.length &&
		// 	this.videos.filter(v => v.id !== "video-" + this.get_pinned_id() || v.id !== "pinned_video")
		// 		.map((video, idx) => {
		// 			// if (idx === 0)
		// 			// return;
		// 			// 		// // 자기영상빼기
		// 			// 		// if (video.id.indexOf(".is-me") != -1) {
		// 			// 		// 	return;
		// 			// 		// }

		// 			// 		// draw
		// 			// 		let posIndex = 0;
		// 			// 		if (video.id.indexOf("pinned") == -1) {
		// 			// 			posIndex = idx - 1;
		// 			// 		}
		// 			const { x, y, w, h } = this.pos[idx + 1];
		// 			this.drawImage(video, x, y, w, h);
		// 		});
	}
	write_temp_file = (key, data) => {
		return new Promise(resolve => {
			// console.log(key, data);
			window.localStorage.setItem(key, data);
			resolve(true);
		});
	}
	// 
	remove_temp_file = () => {
		if (this.tempfiles && this.tempfiles.length) {
			this.tempfiles.map(file => window.localStorage.removeItem(file));
			this.tempfiles = [];
		}
	}
	// 레코딩시작
	start = async () => {




		if (this.audios.length === 0 && this.videos.length === 0) {
			await alert("녹화할 수 없습니다.");
			return false;
		}
		// standby
		this.remove_temp_file();

		// start
		// const _ = (this.videos.filter(v => v.srcObject)).map(v => v.srcObject);
		// // console.log(_);
		// // return;
		// this.videoStream = RecordRTC(_, { type: "video" });
		// this.videoStream.startRecording();


		await alert('녹화를 시작합니다');

		this.videoStream = this.canvas.captureStream(30);
		this.audios && this.audios.length > 0 && this.audios.map(audio => {
			this.videoStream.addTrack(audio.srcObject.getAudioTracks()[0]);
		});

		var opt = {
			audioBitsPerSecond: 128 * 1000,
			videoBitsPerSecond: 2500 * 1000,
			mimeType: 'video/webm'// 'video/mp4' not supported
		};
		this.mediaRecorder = new MediaRecorder(this.videoStream, opt);
		this.chunks = [];

		this.mediaRecorder.ondataavailable = async (e) => {
			// console.log("ondataavailable");
			if (e.data && e.data.size > 0) {
				await this.chunks.push(e.data);
			}
		};
		this.mediaRecorder.onstop = async (e) => {
			// console.log("onstop");
			clearInterval(this.intervalId);
			const answer = await confirm("녹화를 종료시켰습니다. 파일로 저장을 원하신다면 (저장)를 클릭해주시기 바랍니다. \n(취소)를 클릭할 시 녹화된 내용은 사라집니다.", "저장", "취소");
			if (answer === false) {
				this.chunks = [];
				return;
			}
			this.download();
		};
		this.mediaRecorder.start();
		this.intervalId = setInterval(this.draw, 1000 / 24);
	}
	// 레코딩종료
	stop = () => {
		if (this.mediaRecorder) {
			this.mediaRecorder.stop();
			// this.mediaRecorder = null;
		}
		// this.videoStream.stopRecording(() => {
		// 	const blob = this.videoStream.getBlob();
		// // 	console.log(blob);
		// 	RecordRTC.invokeSaveAsDialog(this.videoStream.getBlob(), "test.webm");
		// });
	}
	// 레코딩 블롭 다운로드
	download = () => {
		// if (this.blob.length === 0) {
		// 	alert("empty");
		// 	return;
		// }
		// this.blob = new Blob(this.chunks, { 'type': 'video/mp4' });
		// // this.chunks = [];
		// let videoURL = URL.createObjectURL(this.blob);
		// this.video.src = videoURL;

		// let huge = [];
		// this.tempfiles.map(file => {
		// huge.push(window.localStorage.getItem(file));
		// });
		// console.log("huge:", huge);

		const blob = new Blob(this.chunks, { type: 'video/webm' });
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
	}
	// 레코딩중지
	pause = () => {
		this.mediaRecorder && this.mediaRecorder.pause();
	}
	// 레코딩재개
	resume = () => {
		this.mediaRecorder && this.mediaRecorder.resume();
	}
};




const RoomDiv = styled.div`
	position: relative;
	width: 100%;
	height: ${props => props.h}px;
	// *{border:1px solid white;}
`;
const MenuBarContainer = styled.div`
  width: 100%;
  height: max-content;
  padding:16px 17px;
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  background-color: #707070; // transparent;
  z-index: 150;
  .flex{display:flex;height:max-content;width:400px;}
  .flex-end{justify-content:flex-end;}
  .btn {
    cursor: pointer;
		&.peer {
			position: absolute;
			top:81px;
			width: max-content;
			padding: 8px 25px;
			background: rgba(100,100,100, 0.75);
			z-index:888;
		}
		&.hidepeer{
			right: 247px;
		}
		&.showpeer{
			right: 5px;
		}
		&.start {
			width:100px;
			height:44px;
			box-shadow: 8px 8px 8px #0000002B;
			display:flex;
			align-items:center;
			justify-content:center;
			color:white;
			font-size:22px;
			font-family:Spoqa Han Sans Neo;
			background-color:black;
			margin-left:50px;
		}
		&.stop {
			width:100px;
			height:44px;
			box-shadow: 8px 8px 8px #0000002B;
			display:flex;
			align-items:center;
			justify-content:center;
			color:white;
			font-size:22px;
			font-family:Spoqa Han Sans Neo;
			background-color:black;
			margin-left:50px;
			opacity:0.75;
		}
		&.invite {
			margin-left:50px;
		}
		&.return {
			width:150px;
			height:44px;
			box-shadow: 8px 8px 8px #0000002B;
			display:flex;
			align-items:center;
			justify-content:center;
			color:white;
			font-size:22px;
			font-family:Spoqa Han Sans Neo;
			background-color:black;
			margin-right:50px;
		}
    &.chat {
		width:100px;
		height:44px;
		box-shadow: 8px 8px 8px #0000002B;
		display:flex;
		align-items:center;
		justify-content:center;
		color:white;
		font-size:22px;
		font-family:Spoqa Han Sans Neo;
		background-color:red;
    }
    &.share {
		width:100px;
		height:44px;
		box-shadow: 8px 8px 8px #0000002B;
		display:flex;
		align-items:center;
		justify-content:center;
		color:white;
		font-size:22px;
		font-family:Spoqa Han Sans Neo;
		background-color:#7E1E9B;
    }
    &.exit {
		width:100px;
		height:44px;
		box-shadow: 8px 8px 8px #0000002B;
		display:flex;
		align-items:center;
		justify-content:center;
		color:white;
		font-size:22px;
		font-family:Spoqa Han Sans Neo;
		background-color:red;
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
	z-index: 100;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
  	
	.panel {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 101;
		background-color: #58585854;
		display:flex;
		justify-content:center;
		align-items:center;
		// background-image: url(${props => props.bg || nobg});
		// background-size: contain;
		// background-position: center center;
		// background-repeat: no-repeat;
		.logo{
			height:270px;
			object-fit:contain;
		}
	}

`;
const RightVerticalScroll = styled.div`
	padding: 5px 10px 5px 15px;
	min-width: 242px;
	display: ${props => props.hidden ? "none" : "flex"};

	z-index: 110;
	background-color: rgba(0,0,0, 0.3);
	flex-direction: column;
	align-items: center;

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
	// background-color: rgba(255,255,255, 0.5);
	width: 100%;
	display: flex;
	margin-bottom:38px;
	// flex-direction: column;
	// justify-content: center;
  .hand {
		cursor: grab;
	}
	.container {
		background-color:#5656561A;
		width:max-content;
		min-height:238px;
		overflow-x: hidden;
		overflow-y: auto;
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
		display: flex;
		grid-template-rows: repeat(${props => props.grid.row || 1}, 252px);
		grid-template-columns: repeat(${props => props.grid.col || 1}, 252px);
		gap: 10px 10px;
	}
`;
const BigScreenContainer = styled.div`
	min-width: 750px; // ${props => props.scroll ? "max-content" : "100%"};
	width: 100%;
	height: 100%;
	min-height: ${VIDEO_SIZE}px;
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
		transform: ${props => props.flip ? "scaleX(-1)" : "scaleX(1)"};
	}
`;
const PeersContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(54, 69, 79, 0.25);
	display: flex;
	flex-direction: column;

	.me {
		width: VIDEO_SIZEpx;
		height: VIDEO_SIZEpx;
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
	// height: 400px;
	width: 100%;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #000000;
  border: 1px solid #EFEFEF;
  border-radius: 10px;
	opacity: 1;
	padding: 25px;

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


let mixer = new Mixer();

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
			pinned: null,
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

		// const DUMMY = () => <div style={{ position: "relative", width: "VIDEO_SIZEpx", height: "VIDEO_SIZEpx", border: "1px solid white", backgroundColor: "black", color: "white", fontSize: "3em", textAlign: "center" }}>DUMMY</div>
		const total = 1 + (peers.length || 0);
		const idx = total > grid.length - 1 ? grid.length - 1 : total - 1;
		const myvideo = me.find(track => track && ["front", "back", "share"].includes(track.type));
		const shareState = myvideo && myvideo.type === "share";
		// const myaudio = null; //me.find(track => track && track.kind === "audio");

		// console.log("Room.js", this.props.peers);// this.video && this.video.srcObject && this.video.srcObject.getTracks());
		// console.log(this.state.pinned, this.props.userInfo.uid, myvideo && myvideo.type);
		const areyouselectedsharepeer = () => {
			let clicked = false;
			this.props.peersVids.find(peer => {
				if (peer && (peer.appData && peer.appData.peerId === this.state.pinned) &&
					(peer.appData && peer.appData.share))
					clicked = true;
			});
			return clicked;
		}
		// console.log(areyouselectedsharepeer());
		// console.log(
		// this.props.peersVids &&
		// this.props.peersVids.find(peer => peer.id === this.state.pinned && peer.appData && peer.appData.share)
		// );
		return (<RoomDiv h={h || window.innerHeight}>
			{/* notifications */}
			{/* <Notifications /> */}

			{/* modal */}
			{/* invite modal */}
			<InviteModal open={invite} onClose={() => this.setState({ invite: false })}>

				<h2>화상회의 초대</h2>

				<span style={{ width: "max-content", marginLeft: "auto", marginRight: "10px" }}>(디자인 맴버가 아닌 오픈소스사이트 사용자를 회의에 초대합니다.)</span>

				<div className="close-box" onClick={() => this.setState({ invite: false })} >
					<Cross angle={45} color={"#707070"} weight={3} width={35} height={35} />
				</div>

				<hr />

				<div className="search-bar">
					<SearchMember
						id={this.props.userInfo.uid}
						token={this.props.token}
						members={design && design.member || []}
						selected={mems => {
							this.setState({ selected: mems });
						}} />
				</div>

				<hr />

				<div className="button-bar" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
					<div style={{ cursor: "default", marginRight: "25px", color: "red", fontSize: "1.5rem", fontWeight: "500", width: "max-content" }}
						onClick={() => {
							this.state.selected &&
								this.state.selected.length > 0 &&
								this.state.selected.map(async mem => {
									// alert(mem.uid); return;
									try {
										InvitedUserRequest(design.uid, this.props.token, mem.uid) //{ to_user_id: mem.uid })
									} catch (e) {
										await alert(e + '와 같은 이유로 초대에 실패하였습니다. 관리자에게 문의해주시기 바랍니다.');
									}
								});
							this.setState({ selected: null, invite: false });
						}}>초대</div>
					<div
						style={{ cursor: "default", marginRight: "15px", color: "#707070", fontSize: "1.5rem", fontWeight: "500", width: "max-content" }}
						onClick={() => {
							this.setState({ invite: false, selected: null });
						}}>취소</div>
				</div>
			</InviteModal>

			{/* menubar */}
			<MenuBarContainer>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div>
						{/* chat */}
						<div className='btn chat' onClick={() => this.openChatWin()}>
							<span className='txt'>채팅</span>
						</div>
					</div>

					<div>
						{/* invite */}
						<div className="btn chat invite" onClick={() => { this.setState({ invite: true }); }}>
							<span className="txt">초대</span>
						</div>
					</div>

					<div>
						{/* recording */}
						{isRecording
							? <div className="btn start">
								<div style={{ display: "flex", flexDirection: "row" }}>
									{/* pause / resume */}
									{isPaused
										? <div onClick={() => this.resumeRecording()}>
											<span className="txt">
												<i className="icon play" /></span>
										</div>
										: <div onClick={() => this.pasueRecording()}>
											<span className="txt">
												<i className="icon pause" /></span>
										</div>}
									{/* stop */}
									<div onClick={() => this.stopRecording()}>
										<span className="txt">
											<i className="icon stop" /></span>
									</div>

								</div>
							</div>
							:
							<div style={{ display: "flex", flexDirection: "row" }}>
								<div className="btn start" onClick={() => this.recording()} // me, peers, consumers)}
								>
									<span className="txt">
										<i className="record icon" />
									</span>
								</div>
							</div>}
					</div>
				</div>

				<div>
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
				</div>

				<div style={{ display: "flex", flexDirection: "row" }}>
					<div>
						{/* layout */}
						{mode === "scroll" ?
							<div className="btn return" onClick={() => {
								this.setState({ mode: "grid" });
								this.video.srcObject = null;
								mixer && mixer.set_pinned_id(null);
							}}>
								<span className="txt">큰 화면 취소</span></div> : null}
						{mode === "scroll"
							? <div className={`btn peer ${hidepeer}`} onClick={() => this.setState({ hidepeer: !hidepeer })}>
								<span className="txt">{!hidepeer ? "숨기기" : "보이기"}</span>
							</div>
							: null}
					</div>
					<div>
						{/* exit */}
						<div className='btn exit' onClick={() => {
							if (peers.length === 0) {
								CancelInvitedUserRequest(this.props.design.uid, this.props.token)
							}
							window.open('', '_self').close();
						}}>
							<span className='txt'>나가기</span>
						</div>
					</div>
				</div>
			</MenuBarContainer>

			{/* contents */}
			<ContentContainer bg={bg}>

				<div className="panel" />

				{/* middle */}
				<BigScreenContainer
					scroll={mode === "scroll" ? true : false}
					visible={(this.video && this.video.srcObject) ? true : false}
					flip={
						(this.state.pinned === this.props.userInfo.uid) && (myvideo && myvideo.type === "front")
						||
						this.props.peersVids &&
						this.props.peersVids.find(
							peer => peer &&
								peer.appData.peerId == String(this.state.pinned) &&
								peer.appData.share == null)
						// this.props.peersVids &&
						// this.props.peersVids.find(peer => peer.id === this.state.pinned && peer.appData && peer.appData.share)
						// (this.props.peersVids.find(peer => peer.id === this.state.pinned && peer.appData && peer.appData.share).length)
					}
				>
					{/* {peersVids.} */}
					<video id="pinned-video" muted autoPlay loop="loop" ref={ref => this.video = ref} />

				</BigScreenContainer>


				{mode === "scroll"
					? <RightVerticalScroll hidden={hidepeer}>
						<div className="container">
							<Me
								needReload={() => {
									this.video.srcObject = null;
									mixer && mixer.set_pinned_id(null);
									this.setState({ mode: "grid" });
								}}
								userInfo={this.props.userInfo}
								clicked={(me, stream) => this.clickedview(me, stream)}
								thumbnail={this.props.userInfo.thumbnail}
							/>

							<Peers
								clicked={(peer, stream) => this.clickedview(peer, stream)}
								member={this.props.design.member} />

						</div>
					</RightVerticalScroll> : null}

				{mode === "grid"
					? <MiddleDynamicGrid grid={grid[idx]}>
						<div className="container">
							<Me
								needReload={() => {
									this.video.srcObject = null;
									mixer && mixer.set_pinned_id(null);
									this.setState({ mode: "grid" });
								}}
								userInfo={this.props.userInfo}
								clicked={(me, stream) => this.clickedview(me, stream)}
								thumbnail={this.props.userInfo.thumbnail}
							/>
							<Peers
								clicked={(peer, stream) => this.clickedview(peer, stream)}
								member={this.props.design.member} />
						</div>
					</MiddleDynamicGrid>
					: null}
			</ContentContainer>


		</RoomDiv >);
	};

	openChatWin = () => {
		const url = geturl() + `/chat/${this.props.design.uid}`;
		const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`;
		window.open(url, "chat", options);
	};

	pasueRecording = () => {
		mixer.mediaRecorder && mixer.mediaRecorder.pause();
		this.setState({ isPaused: true });
	}
	stopRecording = () => {
		this.setState({ isRecording: false });
		mixer.mediaRecorder && mixer.mediaRecorder.stop();
		// mixer.stop();
	}
	resumeRecording = () => {
		mixer.mediaRecorder && mixer.mediaRecorder.resume();
		this.setState({ isPaused: false });
	}

	download = async () => {
		if (mixer && mixer.mediaRecorder) {
			mixer.download();
			mixer = null;
		}
		else {
			await alert("녹화된 영상이 없습니다.");
		}
	}

	recording = async () => {
		mixer = new Mixer();
		await mixer.init();
		if (mixer.start() === false) {
			return;
		}
		this.setState({ isRecording: true });
	}

	clickedview = async (peer, stream) => {

		mixer && mixer.set_pinned_id(peer.id);
		await this.setState({ pinned: peer.id });

		if (this.video && stream) {
			stream.addEventListener('inactive', () => {
				this.video.style.display = "none";
				this.video.srcObject = null;
				mixer && mixer.set_pinned_id(null);
				this.setState({ mode: "grid", pinned: null });
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
	const me = Object.values(state.producers);
	const peersArray = Object.values(state.peers);
	const peers = Object.values(state.consumers).filter(consumers => consumers.track.kind === 'video');

	return {
		peersVids: peers,
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













// let mediaRecorder;
// let chunks = [];

// for video recording
// const media_source = new MediaSource();
// media_source.addEventListener('sourceopen', handle_source_open, false);

// let media_recorder;
// let source_buffer;

// const canvas = document.createElement('canvas');
// const video = document.querySelector('video');
// let video = null;

// const record_button = ...
// const play_button = ...
// const download_button = ...
// record_button.onclick = toggle_recording;
// play_button.onclick = play;
// download_button.onclick = download;

// main();

// let buttontext = "start recording";
// const stream = canvas.captureStream();

//handle_source_open = e => {
//	const opt = 'video/webm; codes="vp8"';
//	source_buffer = media_source.addSourceBuffer(opt);
//};

// const handle_data_available = e => {
// if (e.data && e.data.size > 0)
// recorded_blobs.push(e.data);
// };

// const handle_stop = e => {
// const blob = new Blob(recorded_blobs, { type: 'video/webm' });
// video.src = window.URL.createObjectURL(blob);
// };

// const toggle_recording = () => { // track, peers, consumers) => {
// if (buttontext === "start recording") {
// start_recording(); // track, peers, consumers);
// buttontext = "stop recording";
// } else {
// stop_recording();
// buttontext = "start recording";
// }
// };

// const start_recording = () => { // (track, peers, consumers) => {
// const options = [
// 	{ mimeType: 'video/webm' },
// 	{ mimeType: 'video/webm,codesc=vp9' },
// 	{ mimeType: 'video/vp8' },
// ];
// recorded_blobs = [];
// let idx = 0;
// let _ = null;
// if (peers == null || peers.length === 0) {
// 	alert('peers is empty');
// 	return;
// }
// peers.map(peer => {
// 	const consumerAry = peer.consumers.map(id => consumers[id]);
// 	const consumer = consumerAry.find(cnsmr => cnsmr.track.kind === "video").track;
// 	_ = new MediaStream([consumer]);
// });

// // let _ = new MediaStream([track]);

// // _.addTrack(track);
// while (idx < options.length) {
// 	try {
// 		media_recorder = new MediaRecorder(_, options[idx]);
// 		alert('set with ' + options[idx]);
// 		break;
// 	} catch (e) {
// 		console.error(e);
// 		idx++;
// 	}
// }
// media_recorder.onstop = handle_stop;
// media_recorder.ondataavailable = handle_data_available;
// media_recorder.start(100);
// };

// const stop_recording = () => {
// media_recorder.stop();
// };

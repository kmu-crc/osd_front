import { VIDEO_SIZE, GAP } from "./Room.style"
import { confirm } from "components/Commons/Confirm/Confirm"

export default class Mixer {
    constructor() {
        this.canvas = null
        this.video = null
        this.context = null
        this.default = { x: 0, y: 0, w: window.screen.width, h: window.screen.height }
        this.videos = null
        this.audios = null
        this.blob = null
        this.acts = null
        this.dest = null
        this.shared = null
        this.videoStream = null
        this.mediaRecorder = null
        this.chunks = null
        this.intervalId = null
        this.post = null
        this.tempfiles = null
    }

    // 캔버스 엘레먼트 생성
    create = () => {
        this.canvas = document.createElement("canvas")
        this.canvas.width = 1024
        this.canvas.height = 768
        this.video = document.createElement("video")
        this.context = this.canvas.getContext("2d")
        this.videos = []
        this.audios = []
        this.actx = new AudioContext()
        this.dest = this.actx.createMediaStreamDestination()
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
        ]
        this.tempfiles = []
    }

    init = () => {
        this.create()

        const videos = document.querySelectorAll('video')
        var ary_videos = Array.prototype.slice.call(videos) // converts NodeList to Array

        ary_videos && ary_videos.length > 0 && ary_videos.map(video => {
            this.videos.push(video);
        })

        const audios = document.querySelectorAll('audio')
        var ary_audios = Array.prototype.slice.call(audios)
        ary_audios && ary_audios.length > 0 && ary_audios.map(audio => {
            this.audios.push(audio)
        })

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
    get_pinned_id = () => String(this.pinned)

    get_shared_id = () => this.shared

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
}
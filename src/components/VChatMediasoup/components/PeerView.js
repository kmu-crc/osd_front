import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import Spinner from 'react-spinner';
import clipboardCopy from 'clipboard-copy';
import hark from 'hark';
import Logger from '../Logger';
import * as appPropTypes from './appPropTypes';
import EditableInput from './EditableInput';
import styled from "styled-components";
const PeerWidth = 215;
const logger = new Logger('PeerView');

const DivPeerView = styled.div`
  video {
		z-index: 400;
	  // border: 1px solid white;
	  width: ${PeerWidth}px;
	  height: ${PeerWidth}px;
		object-fit: cover;
		z-index: 500;

		-moz-transform: scaleX(-1);
		-webkit-transform: scaleX(-1);
		transform: scaleX(-1);

		// &.is-me {
		// }

		&.share {
			-moz-transform: scaleX(1);
			-webkit-transform: scaleX(1);
			transform: scaleX(1);
		}

		&.hidden {
			display: none;
		}

	}

	.peerName {
		width: ${PeerWidth}px;
		height: ${PeerWidth}px;
		margin: auto;
		background-color: #36454f;
		display: flex;
		justify-content: center;

		p {
			text-align: center;
			margin: auto;
			width: ${PeerWidth}px;

			word-wrap: break-word;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden
			
			color: white;
			font-size: 20px;
		}
	}
	.volume-container {
		position: absolute;
		// top: 0;
		bottom: 3rem;
		right: 2px;
		width: 10px;
		height: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		pointer-events: none;

		.bar {
			width: 3px;
			border-radius: 6px;
			opacity: 0.6;

			&.level0  { height: 0;    background-color: #FFFF00;} //, 0.65); }
			&.level1  { height: 10%;  background-color: #FFFF00;} //, 0.65); }
			&.level2  { height: 20%;  background-color: #FFFF00;} //, 0.65); }
			&.level3  { height: 30%;  background-color: #FFA500;} //, 0.65); }
			&.level4  { height: 40%;  background-color: #FFA500;} //, 0.65); }
			&.level5  { height: 50%;  background-color: #FFA500;} //, 0.65); }
			&.level6  { height: 60%;  background-color: #FF0000;} //, 0.65); }
			&.level7  { height: 70%;  background-color: #FF0000;} //, 0.65); }
			&.level8  { height: 80%;  background-color: #000000;} //, 0.65); }
			&.level9  { height: 90%;  background-color: #000000;} //, 0.65); }
			&.level10 { height: 100%; background-color: #000000;} //, 0.65); }
		}
	}
`;

export default class PeerView extends React.Component {
	constructor(props) {
		super(props);

		this.state =
		{
			audioVolume: 0, // Integer from 0 to 10.,
			showInfo: window.SHOW_INFO || false,
			videoResolutionWidth: null,
			videoResolutionHeight: null,
			videoCanPlay: false,
			videoElemPaused: false,
			maxSpatialLayer: null
		};

		// Latest received video track.
		// @type {MediaStreamTrack}
		this._audioTrack = null;

		// Latest received video track.
		// @type {MediaStreamTrack}
		this._videoTrack = null;

		// Hark instance.
		// @type {Object}
		this._hark = null;

		// Periodic timer for reading video resolution.
		this._videoResolutionPeriodicTimer = null;

		// requestAnimationFrame for face detection.
		// this._faceDetectionRequestAnimationFrame = null;
	}

	render() {
		const {
			isMe,
			peer,
			share,
			audioProducerId,
			videoProducerId,
			audioConsumerId,
			videoConsumerId,
			videoRtpParameters,
			consumerSpatialLayers,
			consumerTemporalLayers,
			consumerCurrentSpatialLayer,
			consumerCurrentTemporalLayer,
			consumerPreferredSpatialLayer,
			consumerPreferredTemporalLayer,
			consumerPriority,
			audioMuted,
			videoVisible,
			videoMultiLayer,
			audioCodec,
			videoCodec,
			audioScore,
			videoScore,
			onChangeDisplayName,
			onChangeMaxSendingSpatialLayer,
			onChangeVideoPreferredLayers,
			onChangeVideoPriority,
			onRequestKeyFrame,
			onStatsClick,
			nick_name
		} = this.props;

		const {
			audioVolume,
			showInfo,
			videoResolutionWidth,
			videoResolutionHeight,
			videoCanPlay,
			videoElemPaused,
			maxSpatialLayer
		} = this.state;

		return (<DivPeerView>
			{!videoVisible ?
				<div className="peerName">
					<p>{nick_name}</p>
				</div> : null}

			<video
				id={`video-${peer.id}`}
				ref='videoElem'
				autoPlay
				playsInline
				muted
				controls={false}
				className={classnames({
					'share': share,
					'is-me': isMe,
					hidden: !videoVisible || !videoCanPlay,
					// 	'network-error': (
					// 		videoVisible && videoMultiLayer && consumerCurrentSpatialLayer === null
					// 	)
				})}
			/>

			<audio
				id={`audio-${peer.id}`}
				ref='audioElem'
				autoPlay
				playsInline
				muted={isMe || audioMuted}
				controls={false}
			/>

			<div className='volume-container'>
				<div className={`bar level${audioVolume}`} />
			</div>

			{/* {videoVisible && videoScore < 5 ?
				<div className='spinner-container'>
					<Spinner />
				</div>
				: null} */}

		</DivPeerView>);
	}

	componentDidMount() {
		const { audioTrack, videoTrack } = this.props;

		this._setTracks(audioTrack, videoTrack);

	}

	componentWillUnmount() {
		if (this._hark)
			this._hark.stop();

		clearInterval(this._videoResolutionPeriodicTimer);

		const { videoElem } = this.refs;

		if (videoElem) {
			videoElem.oncanplay = null;
			videoElem.onplay = null;
			videoElem.onpause = null;
		}
	}

	componentWillUpdate() {
		const {
			isMe,
			audioTrack,
			videoTrack,
			videoRtpParameters
		} = this.props;

		const { maxSpatialLayer } = this.state;

		if (isMe && videoRtpParameters && maxSpatialLayer === null) {
			this.setState({
				maxSpatialLayer: videoRtpParameters.encodings.length - 1
			});
		}
		else if (isMe && !videoRtpParameters && maxSpatialLayer !== null) {
			this.setState({ maxSpatialLayer: null });
		}

		this._setTracks(audioTrack, videoTrack);
	}

	_setTracks(audioTrack, videoTrack) {

		if (this._audioTrack === audioTrack && this._videoTrack === videoTrack)
			return;

		this._audioTrack = audioTrack;
		this._videoTrack = videoTrack;

		if (this._hark)
			this._hark.stop();

		this._stopVideoResolution();

		const { audioElem, videoElem } = this.refs;

		if (audioTrack) {
			const stream = new MediaStream;

			stream.addTrack(audioTrack);
			audioElem.srcObject = stream;

			audioElem.play()
				.catch((error) => logger.warn('audioElem.play() failed:%o', error));

			this._runHark(stream);
		}
		else {
			audioElem.srcObject = null;
		}

		if (videoTrack) {
			const stream = new MediaStream;

			stream.addTrack(videoTrack);
			videoElem.srcObject = stream;

			videoElem.oncanplay = () => this.setState({ videoCanPlay: true });

			videoElem.onplay = () => {
				this.setState({ videoElemPaused: false });

				audioElem.play()
					.catch((error) => logger.warn('audioElem.play() failed:%o', error));
			};

			videoElem.onpause = () => this.setState({ videoElemPaused: true });

			videoElem.play()
				.catch((error) => logger.warn('videoElem.play() failed:%o', error));

			this._startVideoResolution();


		}
		else {
			videoElem.srcObject = null;
		}
	}

	_runHark(stream) {
		if (!stream.getAudioTracks()[0])
			throw new Error('_runHark() | given stream has no audio track');

		this._hark = hark(stream, { play: false });

		// eslint-disable-next-line no-unused-vars
		this._hark.on('volume_change', (dBs, threshold) => {
			// The exact formula to convert from dBs (-100..0) to linear (0..1) is:
			//   Math.pow(10, dBs / 20)
			// However it does not produce a visually useful output, so let exagerate
			// it a bit. Also, let convert it from 0..1 to 0..10 and avoid value 1 to
			// minimize component renderings.
			let audioVolume = Math.round(Math.pow(10, dBs / 85) * 10);

			if (audioVolume === 1)
				audioVolume = 0;

			if (audioVolume !== this.state.audioVolume)
				this.setState({ audioVolume });
		});
	}

	_startVideoResolution() {
		this._videoResolutionPeriodicTimer = setInterval(() => {
			const { videoResolutionWidth, videoResolutionHeight } = this.state;
			const { videoElem } = this.refs;

			if (
				videoElem.videoWidth !== videoResolutionWidth ||
				videoElem.videoHeight !== videoResolutionHeight
			) {
				this.setState(
					{
						videoResolutionWidth: videoElem.videoWidth,
						videoResolutionHeight: videoElem.videoHeight
					});
			}
		}, 500);
	}

	_stopVideoResolution() {
		clearInterval(this._videoResolutionPeriodicTimer);

		this.setState(
			{
				videoResolutionWidth: null,
				videoResolutionHeight: null
			});
	}

	_printProducerScore(id, score) {
		const scores = Array.isArray(score) ? score : [score];

		return (
			<React.Fragment key={id}>
				<p>streams:</p>

				{
					scores
						.sort((a, b) => {
							if (a.rid)
								return (a.rid > b.rid ? 1 : -1);
							else
								return (a.ssrc > b.ssrc ? 1 : -1);
						})
						.map(({ ssrc, rid, score }, idx) => ( // eslint-disable-line no-shadow
							<p key={idx} className='indent'>
								{/* <Choose>
									<When condition={rid !== undefined}>
										{`rid:${rid}, ssrc:${ssrc}, score:${score}`}
									</When>

									<Otherwise>
										{`ssrc:${ssrc}, score:${score}`}
									</Otherwise>
								</Choose> */}
							</p>
						))
				}
			</React.Fragment>
		);
	}

	_printConsumerScore(id, score) {
		return (
			<p key={id}>
				{`score:${score.score}, producerScore:${score.producerScore}, producerScores:[${score.producerScores}]`}
			</p>
		);
	}
}

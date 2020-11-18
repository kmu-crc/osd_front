import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { withRoomContext } from '../RoomContext';
import * as stateActions from '../redux/stateActions';
import PeerView from './PeerView';
import styled from 'styled-components';
import classnames from 'classnames';
import * as cookiesManager from '../cookiesManager';
import * as utils from "../utils";

// ICONS
import icon_mic_black_on from 'resources/images/icon_mic_black_on.svg';
import icon_mic_white_off from 'resources/images/icon_mic_white_off.svg';
import icon_mic_white_unsupported from 'resources/images/icon_mic_white_unsupported.svg';
import icon_webcam_black_on from 'resources/images/icon_webcam_black_on.svg';
import icon_webcam_white_on from 'resources/images/icon_webcam_white_on.svg';
import icon_webcam_white_unsupported from 'resources/images/icon_webcam_white_unsupported.svg';
import icon_change_webcam_black from 'resources/images/icon_change_webcam_black.svg';
import icon_change_webcam_white_unsupported from 'resources/images/icon_change_webcam_white_unsupported.svg';
import icon_share_black_on from 'resources/images/icon_share_black_on.svg';
import icon_share_white_on from 'resources/images/icon_share_white_on.svg';
import icon_share_white_unsupported from 'resources/images/icon_share_white_unsupported.svg';

const DivME = styled.div`
	width: 250px;
	height: 250px;
	position: relative;
	border: 1px solid transparent;
	cursor: default;
`;
const Thumbnail = styled.div`
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	border-radius: 100%;
	width: 50px;
	height: 50px;
	background-color: white;
	background-size: cover;
	background-position: center center;
	background-Image: url(${props => props.img});
`;
const Control = styled.div`
	position: absolute;
	z-index: 10;
	bottom: 1rem;
	left: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	pointer-events: none;

	.button {
		flex: 0 0 auto;
		margin: 4px;
		margin-left: 0;
		border-radius: 2px;
		pointer-events: auto;
		background-position: center;
		background-size: 60%;
		background-repeat: no-repeat;
		background-color: rgba(128,128,128,0.5);
		cursor: pointer;
		transition-property: opacity, background-color;
		transition-duration: 0.15s;
		z-index: 500;

		width: 32px;
		height: 32px;
		opacity: 0.95;

		&:hover {
			opacity: 1;
			background-color: rgba(200,0,0, 0.9);
		}

		&.unsupported {
			pointer-events: none;
		}

		&.disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		&.on {
			background-color: rgba(#fff, 0.85);
		}

		&.mic {
			&.on {
				background-image: url(${icon_mic_black_on});
			}

			&.off {
				background-image: url(${icon_mic_white_off});
				background-color: rgba(#d42241, 0.7);
			}

			&.unsupported {
				background-image: url(${icon_mic_white_unsupported});
			}
		}

		&.webcam {
			&.on {
				background-image: url(${icon_webcam_black_on});
			}

			&.off {
				background-image: url(${icon_webcam_white_on});
			}

			&.unsupported {
				background-image: url(${icon_webcam_white_unsupported});
			}
		}

		&.change-webcam {
			&.on {
				background-image: url(${icon_change_webcam_black});
			}

			&.unsupported {
				background-image: url(${icon_change_webcam_white_unsupported});
			}
		}

		&.share {
			&.on {
				background-image: url(${icon_share_black_on});
			}

			&.off {
				background-image: url(${icon_share_white_on});
			}

			&.unsupported {
				background-image: url(${icon_share_white_unsupported});
			}
		}
	}
`;

class Me extends React.Component {
	constructor(props) {
		super(props);

		this._mounted = false;
		this._rootNode = null;
	}

	render() {
		const {
			roomClient,
			connected,
			me,
			audioProducer,
			videoProducer,
			faceDetection,
			onSetStatsPeerId
		} = this.props;

		let micState;

		if (!me.canSendMic)
			micState = 'unsupported';
		else if (!audioProducer)
			micState = 'unsupported';
		else if (!audioProducer.paused)
			micState = 'on';
		else
			micState = 'off';

		let webcamState;

		if (!me.canSendWebcam)
			webcamState = 'unsupported';
		else if (videoProducer && videoProducer.type !== 'share')
			webcamState = 'on';
		else
			webcamState = 'off';

		let changeWebcamState;

		if (Boolean(videoProducer) && videoProducer.type !== 'share' && me.canChangeWebcam)
			changeWebcamState = 'on';
		else
			changeWebcamState = 'unsupported';

		const videoVisible = Boolean(videoProducer) && !videoProducer.paused;

		return (
			<DivME
				// style
				// data-tip={tip}
				// data-tip-disable={!tip}
				// onClick={()=>alert('divme')}
				// ref
				ref={(node) => (this._rootNode = node)}
			>

				{connected ?
					<Control>
						<div
							className={`button mic ${micState}`}
							onClick={() => {
								micState === 'on'
									? roomClient.muteMic()
									: roomClient.unmuteMic();
							}} />

						<div
							className={`button webcam ${webcamState} ${me.webcamInProgress || me.shareInProgress ? "disabled" : ""}`}
							onClick={() => {
								if (videoProducer && videoProducer.type === "share") {
									roomClient.disableShare();
									roomClient.checkEnabledWebcam();
									return;
								}
								if (webcamState === 'on') {
									cookiesManager.setDevices({ webcamEnabled: false });
									roomClient.disableWebcam();
									return
								}
								else {
									cookiesManager.setDevices({ webcamEnabled: true });
									roomClient.enableWebcam();
									return;
								}
							}}
						/>
						{utils.isMobileDevice() ?
							<div
								className={classnames('button', 'change-webcam', changeWebcamState, {
									disabled: me.webcamInProgress || me.shareInProgress
								})}
								onClick={() => roomClient.changeWebcam()}
							/> : null}

					</Control> : null}

				<Thumbnail img={this.props.thumbnail.s_img} />

				<div
					onClick={() => {
						if (videoProducer && videoProducer.track) {
							const stream = new MediaStream;
							stream.addTrack(videoProducer.track);
							this.props.clicked(stream);
						}
					}}
				>

					<PeerView
						isMe
						peer={me}
						audioProducerId={audioProducer ? audioProducer.id : null}
						videoProducerId={videoProducer ? videoProducer.id : null}
						audioRtpParameters={audioProducer ? audioProducer.rtpParameters : null}
						videoRtpParameters={videoProducer ? videoProducer.rtpParameters : null}
						audioTrack={audioProducer ? audioProducer.track : null}
						videoTrack={videoProducer ? videoProducer.track : null}
						videoVisible={videoVisible}
						audioCodec={audioProducer ? audioProducer.codec : null}
						videoCodec={videoProducer ? videoProducer.codec : null}
						audioScore={audioProducer ? audioProducer.score : null}
						videoScore={videoProducer ? videoProducer.score : null}
						faceDetection={faceDetection}
						onChangeDisplayName={(displayName) => { roomClient.changeDisplayName(displayName); }}
						onChangeMaxSendingSpatialLayer={(spatialLayer) => { roomClient.setMaxSendingSpatialLayer(spatialLayer); }}
						// onStatsClick={onSetStatsPeerId}
						nick_name={this.props.userInfo.nickName}
					/>
				</div>

				{/* <ReactTooltip
					type='light'
					effect='solid'
					delayShow={100}
					delayHide={100}
					delayUpdate={50}
				/> */}
			</DivME >
		);
	}

	componentDidMount() {
		this._mounted = true;

		setTimeout(() => {
			if (!this._mounted || this.props.me.displayNameSet)
				return;

			ReactTooltip.show(this._rootNode);
		}, 4000);

	}
	componentWillUnmount() {
		this._mounted = false;
	}
	componentDidUpdate(prevProps) {

		// const { videoProducer, } = this.props;

		// if (videoProducer && videoProducer.type === "share") {
		// 	videoProducer.track.onended = () => {
		// 		this.props.share && this.props.share("off");
		// 	}
		// }
		// if (prevProps.sharebtn != this.props.sharebtn && this.props.sharebtn != null) {
		// 	this.props.sharebtn.addEventListener('click', async () => {
		// 		console.log(this.props);
		// 		if (this.props.me.shareInProgress || this.props.me.webcamInProgress) {
		// 			return;
		// 		}
		// 		const { shareState } = this.props;
		// 		if (shareState === "on") {
		// 			this.props.roomClient.disableShare();
		// 			this.props.share && this.props.share("off");
		// 		}
		// 		else {
		// 			if (await this.props.roomClient.enableShare() === "cancelled") {
		// 				this.props.roomClient.disableShare();
		// 				this.props.roomClient.checkEnabledWebcam();
		// 				this.props.share && this.props.share("off");
		// 			} else {
		// 				this.props.share && this.props.share("on");
		// 			}
		// 		}
		// 	})
		// }

		if (!prevProps.me.displayNameSet && this.props.me.displayNameSet) {
			ReactTooltip.hide(this._rootNode);
		}
	}
}

// Me.propTypes =
// {
// 	roomClient: PropTypes.any.isRequired,
// 	connected: PropTypes.bool.isRequired,
// 	me: appPropTypes.Me.isRequired,
// 	audioProducer: appPropTypes.Producer,
// 	videoProducer: appPropTypes.Producer,
// 	faceDetection: PropTypes.bool.isRequired,
// 	onSetStatsPeerId: PropTypes.func.isRequired
// };

const mapStateToProps = (state) => {
	const producersArray = Object.values(state.producers);
	const audioProducer = producersArray.find((producer) => producer.track.kind === 'audio');
	const videoProducer = producersArray.find((producer) => producer.track.kind === 'video');

	return {
		connected: state.room.state === 'connected',
		me: state.me,
		audioProducer: audioProducer,
		videoProducer: videoProducer,
		// faceDetection: state.room.faceDetection
	};
};

// const mapDispatchToProps = (dispatch) => ({
// 	// onSetStatsPeerId: (peerId) => dispatch(stateActions.setRoomStatsPeerId(peerId))
// });

const MeContainer = withRoomContext(connect(mapStateToProps, null /*mapDispatchToProps*/)(Me));

export default MeContainer;

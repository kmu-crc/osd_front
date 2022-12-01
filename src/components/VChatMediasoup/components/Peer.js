import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as appPropTypes from './appPropTypes'
import { withRoomContext } from '../RoomContext'
import * as stateActions from '../redux/stateActions'
import PeerView from './PeerView'
import styled from "styled-components"
import who from "source/thumbnail.png"
import icon_remote_mic_white_off from 'resources/images/icon_remote_mic_white_off.svg'
import icon_remote_webcam_white_off from 'resources/images/icon_remote_webcam_white_off.svg'
const PeerWidth = 215;

const DivPeer = styled.div`
	width: ${PeerWidth}px;
	height: ${PeerWidth}px;
	position: relative;
	display: flex;

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

	.indicators {
		position: absolute;
		z-index: 10;
		top: 0;
		right: 0;
		width: 150px;
		display: flex;
		flex-direction:; row;
		justify-content: flex-end;
		align-items: center;

		.icon {
			flex: 0 0 auto;
			margin: 4px;
			margin-left: 0;
			width: 32px;
			height: 32px;
			background-position: center;
			background-size: 75%;
			background-repeat: no-repeat;
			transition-property: opacity;
			transition-duration: 0.15s;
			&.mic-off {
				background-image: url(${icon_remote_mic_white_off});
			}

			&.webcam-off {
				background-image: url(${icon_remote_webcam_white_off});
			}
		}	
	}
`
const Thumbnail = styled.div`
	position: absolute;
	right: 10px;
	bottom: 8px;
	border-radius: 100%;
	width: 47px;
	height: 47px;
	background-color: white;
	background-size: cover;
	background-position: center center;
	background-Image: url(${props => props.img});
	z-index: 500;
`

const Peer = (props) => {
	const {
		roomClient,
		peer,
		audioConsumer,
		videoConsumer,
		audioMuted,
		// faceDetection,
		// onSetStatsPeerId,
		info,
	} = props;

	const audioEnabled = (
		Boolean(audioConsumer) &&
		!audioConsumer.locallyPaused &&
		!audioConsumer.remotelyPaused
	);

	const videoVisible = (
		Boolean(videoConsumer) &&
		!videoConsumer.locallyPaused &&
		!videoConsumer.remotelyPaused
	);

	return (
		<DivPeer>

			<Thumbnail img={(info && info.thumbnail && info.thumbnail.s_img) || who}></Thumbnail>

			<div className='indicators'>
				{!audioEnabled && <div className='icon mic-off' />}
				{!videoConsumer && <div className='icon webcam-off' />}
			</div>

			<div
				onClick={() => {
					if (videoConsumer && videoConsumer.track) {
						const stream = new MediaStream()
						stream.addTrack(videoConsumer.track)
						props.clicked(peer, stream)
					}
				}}>

				<PeerView
					peer={peer}
					share={(videoConsumer && videoConsumer.appData && videoConsumer.appData.share) || false}
					audioConsumerId={audioConsumer ? audioConsumer.id : null}
					videoConsumerId={videoConsumer ? videoConsumer.id : null}
					audioRtpParameters={audioConsumer ? audioConsumer.rtpParameters : null}
					videoRtpParameters={videoConsumer ? videoConsumer.rtpParameters : null}
					consumerSpatialLayers={videoConsumer ? videoConsumer.spatialLayers : null}
					consumerTemporalLayers={videoConsumer ? videoConsumer.temporalLayers : null}
					consumerCurrentSpatialLayer={videoConsumer ? videoConsumer.currentSpatialLayer : null}
					consumerCurrentTemporalLayer={videoConsumer ? videoConsumer.currentTemporalLayer : null}
					consumerPreferredSpatialLayer={videoConsumer ? videoConsumer.preferredSpatialLayer : null}
					consumerPreferredTemporalLayer={videoConsumer ? videoConsumer.preferredTemporalLayer : null}
					consumerPriority={videoConsumer ? videoConsumer.priority : null}
					audioTrack={audioConsumer ? audioConsumer.track : null}
					videoTrack={videoConsumer ? videoConsumer.track : null}
					audioMuted={audioMuted}
					audioEnabled={audioEnabled}
					videoVisible={videoVisible}
					videoMultiLayer={videoConsumer && videoConsumer.type !== 'simple'}
					audioCodec={audioConsumer ? audioConsumer.codec : null}
					videoCodec={videoConsumer ? videoConsumer.codec : null}
					audioScore={audioConsumer ? audioConsumer.score : null}
					videoScore={videoConsumer ? videoConsumer.score : null}
					onChangeVideoPreferredLayers={(spatialLayer, temporalLayer) => { roomClient.setConsumerPreferredLayers(videoConsumer.id, spatialLayer, temporalLayer) }}
					onChangeVideoPriority={(priority) => { roomClient.setConsumerPriority(videoConsumer.id, priority) }}
					onRequestKeyFrame={() => { roomClient.requestConsumerKeyFrame(videoConsumer.id) }}
					nick_name={(info && info.nick_name) || ("[초대]" + peer.displayName)}
				// onStatsClick={onSetStatsPeerId}
				// faceDetection={faceDetection}
				/>
			</div>

		</DivPeer>
	)
}

Peer.propTypes = {
	audioMuted: PropTypes.bool,
	roomClient: PropTypes.any.isRequired,
	peer: appPropTypes.Peer.isRequired,
	audioConsumer: appPropTypes.Consumer,
	videoConsumer: appPropTypes.Consumer,
	onSetStatsPeerId: PropTypes.func.isRequired,
	// faceDetection: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, { id }) => {
	const me = state.me
	const peer = state.peers[id]
	const consumersArray = peer.consumers
		.map((consumerId) => state.consumers[consumerId])
	const audioConsumer =
		consumersArray.find((consumer) => consumer.track.kind === 'audio')
	const videoConsumer =
		consumersArray.find((consumer) => consumer.track.kind === 'video')
	return {
		peer,
		audioConsumer,
		videoConsumer,
		audioMuted: me.audioMuted,
		faceDetection: state.room.faceDetection
	}
}

const mapDispatchToProps = (dispatch) => ({
	onSetStatsPeerId: (peerId) => dispatch(stateActions.setRoomStatsPeerId(peerId))
})

const PeerContainer = withRoomContext(connect(mapStateToProps, mapDispatchToProps)(Peer))

export default PeerContainer

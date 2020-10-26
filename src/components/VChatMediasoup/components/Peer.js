import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appPropTypes from './appPropTypes';
import { withRoomContext } from '../RoomContext';
import * as stateActions from '../redux/stateActions';
import PeerView from './PeerView';
import styled from "styled-components";

import who from "source/thumbnail.png";

const DivPeer = styled.div`
	width: 250px;
	height: 250px;
	position: relative;
	padding: 0.15rem;
	display: flex;

	.peerName {
		width: 250px;
		height: 250px;
		margin: auto;
		background-color: #36454f;
		p {
			width: 200px;
			color: white;
			font-size: 1.75rem;
		}
	}
`;
const Thumbnail = styled.div`
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	// border: 1px solid white;
	border-radius: 100%;
	width: 50px;
	height: 50px;
	background-size: cover;
	background-position: center center;
	background-Image: url(${props => props.img});
`;

const Peer = (props) => {
	const {
		roomClient,
		peer,
		audioConsumer,
		videoConsumer,
		audioMuted,
		faceDetection,
		onSetStatsPeerId,
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
			{videoConsumer ?
				<div
					onClick={() => {
						if (videoConsumer && videoConsumer.track) {
							const stream = new MediaStream;
							stream.addTrack(videoConsumer.track)
							props.clicked(stream);
						}
					}}>

					<PeerView
						peer={peer}
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
						videoVisible={videoVisible}
						videoMultiLayer={videoConsumer && videoConsumer.type !== 'simple'}
						audioCodec={audioConsumer ? audioConsumer.codec : null}
						videoCodec={videoConsumer ? videoConsumer.codec : null}
						audioScore={audioConsumer ? audioConsumer.score : null}
						videoScore={videoConsumer ? videoConsumer.score : null}
						faceDetection={faceDetection}
						onChangeVideoPreferredLayers={(spatialLayer, temporalLayer) => { roomClient.setConsumerPreferredLayers(videoConsumer.id, spatialLayer, temporalLayer); }}
						onChangeVideoPriority={(priority) => { roomClient.setConsumerPriority(videoConsumer.id, priority); }}
						onRequestKeyFrame={() => { roomClient.requestConsumerKeyFrame(videoConsumer.id); }}
						onStatsClick={onSetStatsPeerId}
					/>
				</div>
				: <div className="peerName">
					<p>{info.nick_name}</p>
				</div>}
		</DivPeer>
	);
};

Peer.propTypes =
{
	roomClient: PropTypes.any.isRequired,
	peer: appPropTypes.Peer.isRequired,
	audioConsumer: appPropTypes.Consumer,
	videoConsumer: appPropTypes.Consumer,
	audioMuted: PropTypes.bool,
	faceDetection: PropTypes.bool.isRequired,
	onSetStatsPeerId: PropTypes.func.isRequired
};

const mapStateToProps = (state, { id }) => {
	const me = state.me;
	const peer = state.peers[id];
	const consumersArray = peer.consumers
		.map((consumerId) => state.consumers[consumerId]);
	const audioConsumer =
		consumersArray.find((consumer) => consumer.track.kind === 'audio');
	const videoConsumer =
		consumersArray.find((consumer) => consumer.track.kind === 'video');

	return {
		peer,
		audioConsumer,
		videoConsumer,
		audioMuted: me.audioMuted,
		faceDetection: state.room.faceDetection
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetStatsPeerId: (peerId) => dispatch(stateActions.setRoomStatsPeerId(peerId))
	};
};

const PeerContainer = withRoomContext(connect(
	mapStateToProps,
	mapDispatchToProps
)(Peer));

export default PeerContainer;

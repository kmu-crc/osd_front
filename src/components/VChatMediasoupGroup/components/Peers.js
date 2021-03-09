import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appPropTypes from './appPropTypes';
import Peer from './Peer';
import styled from 'styled-components';

const DivPeers = styled.div`
	display: flex;
	flex-direction: row;
	.peer{
		margin: 0;
		width: 250px;
		height: 250px;
		border: 1px solid transparent;
		&.active {
			border: 1px solid white;
		}
	}
`;
const DivPeer = styled.div`
	margin: 0;
	width: 250px;
	height: 250px;
	border: 1px solid transparent;
	&.active {
		border: 1px solid white;
	}
	cursor: default;
`;

const Peers = ({ clicked, member, peers, activeSpeakerId }) => (peers.map((peer) =>
	<React.Fragment>
		<DivPeer
			className={`${peer.id === activeSpeakerId ? 'active' : ""}`}
			key={peer.id}>
			<Peer
				clicked={clicked}
				info={member.find(mem => mem.user_id === parseInt(peer.id, 10))}
				id={peer.id} />
		</DivPeer>
	</React.Fragment>
));

Peers.propTypes =
{
	peers: PropTypes.arrayOf(appPropTypes.Peer).isRequired,
	activeSpeakerId: PropTypes.string
};

const mapStateToProps = (state) => {
	const peersArray = Object.values(state.peers);

	return {
		peers: peersArray,
		activeSpeakerId: state.room.activeSpeakerId
	};
};

const PeersContainer = connect(
	mapStateToProps,
	null,
	null,
	{
		areStatesEqual: (next, prev) => {
			return (
				prev.peers === next.peers &&
				prev.room.activeSpeakerId === next.room.activeSpeakerId
			);
		}
	}
)(Peers);

export default PeersContainer;

// let protooPort = 4443;
// if (window.location.hostname === 'test.mediasoup.org')
// protooPort = 4444;

export function getProtooUrl({ roomId, peerId }) {
	// const hostname = window.location.hostname;
	// return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`;
	//return `wss://3.34.97.96:4443/?roomId=${roomId}&peerId=${peerId}`;
	// return `wss://203.246.113.131:${protooPort}/?roomId=${roomId}&peerId=${peerId}`;
	return `wss://mediasoup.opensrcdesign.com/?roomId=${roomId}&peerId=${peerId}`;
}

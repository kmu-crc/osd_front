let protooPort = 4443;

if (window.location.hostname === 'test.mediasoup.org')
	protooPort = 4444;

export function getProtooUrl({ roomId, peerId })
{
	// const hostname = window.location.hostname;

	// return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`;
	// return `wss://mediasoup.opensrcdesign.com:4443/?roomId=${roomId}&peerId=${peerId}`;
	return `wss://203.246.113.131:4443/?roomId=${roomId}&peerId=${peerId}`;
}

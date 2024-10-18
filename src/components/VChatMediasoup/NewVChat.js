import domready from 'domready';
import UrlParse from 'url-parse';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware as applyReduxMiddleware,
  createStore as createReduxStore
} from 'redux';
import thunk from 'redux-thunk';
import Logger from './Logger';
import * as utils from './utils';
import deviceInfo from './deviceInfo';
import RoomClient from './RoomClient';
import RoomContext from './RoomContext';
import * as stateActions from './redux/stateActions';
import reducers from './redux/reducers';
import Room from './components/Room';
import RoomMobile from './components/RoomMobile';
import { isMobile } from 'constant';

const logger = new Logger();
const reduxMiddlewares = [thunk];

let roomClient;
const store = createReduxStore(
  reducers,
  undefined,
  applyReduxMiddleware(...reduxMiddlewares)
);

window.STORE = store;
RoomClient.init({ store });

async function run(props) {
  logger.debug('run() [environment:%s]', process.env.NODE_ENV);

  const urlParser = new UrlParse(window.location.href, true);
  const peerId = props.userInfo.uid; //randomString({ length: 8 }).toLowerCase();
  let roomId = props.design.uid; // urlParser.query.roomId;
  let displayName = props.userInfo.nickName; // urlParser.query.displayName || (cookiesManager.getUser() || {}).displayName;
  const handler = urlParser.query.handler;
  const useSimulcast = urlParser.query.simulcast !== 'false';
  const useSharingSimulcast = urlParser.query.sharingSimulcast !== 'false';
  const forceTcp = urlParser.query.forceTcp === 'true';
  const produce = urlParser.query.produce !== 'false';
  const consume = urlParser.query.consume !== 'false';
  const forceH264 = urlParser.query.forceH264 === 'true';
  const forceVP9 = urlParser.query.forceVP9 === 'true';
  const svc = urlParser.query.svc;
  const datachannel = urlParser.query.datachannel !== 'false';
  const externalVideo = urlParser.query.externalVideo === 'true';

  // Get the effective/shareable Room URL.
  const roomUrlParser = new UrlParse(window.location.href, true);

  for (const key of Object.keys(roomUrlParser.query)) {
    // Don't keep some custom params.
    switch (key) {
      case 'roomId':
      case 'handler':
      case 'simulcast':
      case 'sharingSimulcast':
      case 'produce':
      case 'consume':
      case 'forceH264':
      case 'forceVP9':
      case 'forceTcp':
      case 'svc':
      case 'datachannel':
        break;
      default:
        delete roomUrlParser.query[key];
    }
  }
  delete roomUrlParser.hash;

  const roomUrl = roomUrlParser.toString();

  let displayNameSet;

  // If displayName was provided via URL or Cookie, we are done.
  if (displayName) {
    displayNameSet = true;
  }
  // Otherwise pick a random name and mark as "not set".
  else {
    displayNameSet = false;
    displayName = "디자인 유저";
  }

  // Get current device info.
  const device = deviceInfo();

  store.dispatch(
    stateActions.setRoomUrl(roomUrl));

  // store.dispatch(
  // stateActions.setRoomFaceDetection(faceDetection));

  store.dispatch(
    stateActions.setMe({ peerId, displayName, displayNameSet, device }));

  roomClient = new RoomClient({
    roomId,
    peerId,
    displayName,
    device,
    handlerName: handler,
    useSimulcast,
    useSharingSimulcast,
    forceTcp,
    produce,
    consume,
    forceH264,
    forceVP9,
    svc,
    datachannel,
    externalVideo
  });
  // NOTE: For debugging.
  window.CLIENT = roomClient; // eslint-disable-line require-atomic-updates
  window.CC = roomClient; // eslint-disable-line require-atomic-updates
  // console.log("roomClient:", roomClient);

  render(
    <Provider store={store}>
      <RoomContext.Provider value={roomClient}>
        {isMobile()
          ? <RoomMobile {...props} roomClient={roomClient} />
          : <Room {...props} roomClient={roomClient} />
        }
      </RoomContext.Provider>
    </Provider>,
    document.getElementById('mediasoup-demo-app-container')
  );
}
const TIMEOUT_SECOND = 1000;

export default class NewVChat extends React.Component {
  componentDidMount() {
    domready(async () => {
      window.document.title = "[화상회의]" + this.props.design.title;
      await utils.initialize();
      // setTimeout(() => {
      await run(this.props);
      // }, 1 * TIMEOUT_SECOND);
      setInterval(() => {
        if (window.CLIENT._sendTransport) {
          window.PC1 = window.CLIENT._sendTransport._handler._pc;
          window.DP = window.CLIENT._chatDataProducer;
        }
        else {
          delete window.PC1;
          delete window.DP;
        }

        if (window.CLIENT._recvTransport)
          window.PC2 = window.CLIENT._recvTransport._handler._pc;
        else
          delete window.PC2;
      }, 2 * TIMEOUT_SECOND); // 2000);      
    })
  }

  render() {
    return (
      <React.Fragment>
        <div hidden id='mediasoup-demo-app-media-query-detector'></div>
        <div id='mediasoup-demo-app-container'></div>
      </React.Fragment>
    )
  }
}



// NOTE: Debugging stuff.
window.__sendSdps = function () {
  logger.warn('>>> send transport local SDP offer:');
  logger.warn(roomClient._sendTransport._handler._pc.localDescription.sdp);
  logger.warn('>>> send transport remote SDP answer:');
  logger.warn(roomClient._sendTransport._handler._pc.remoteDescription.sdp);
};
window.__recvSdps = function () {
  logger.warn('>>> recv transport remote SDP offer:');
  logger.warn(roomClient._recvTransport._handler._pc.remoteDescription.sdp);
  logger.warn('>>> recv transport local SDP answer:');
  logger.warn(roomClient._recvTransport._handler._pc.localDescription.sdp);
};

let dataChannelTestInterval = null;
window.__startDataChannelTest = function () {
  let number = 0;

  const buffer = new ArrayBuffer(32);
  const view = new DataView(buffer);

  dataChannelTestInterval = window.setInterval(() => {
    if (window.DP) {
      view.setUint32(0, number++);
      roomClient.sendChatMessage(buffer);
    }
  }, 100);
};
window.__stopDataChannelTest = function () {
  window.clearInterval(dataChannelTestInterval);

  const buffer = new ArrayBuffer(32);
  const view = new DataView(buffer);

  if (window.DP) {
    view.setUint32(0, Math.pow(2, 32) - 1);
    window.DP.send(buffer);
  }
};
window.__testSctp = async function ({ timeout = 100, bot = false } = {}) {
  let dp;

  if (!bot) {
    await window.CLIENT.enableChatDataProducer();
    dp = window.CLIENT._chatDataProducer;
  }
  else {
    await window.CLIENT.enableBotDataProducer();
    dp = window.CLIENT._botDataProducer;
  }

  logger.warn('<<< testSctp: DataProducer created [bot:%s, streamId:%d, readyState:%s]',
    bot ? 'true' : 'false',
    dp.sctpStreamParameters.streamId,
    dp.readyState);

  function send() {
    dp.send(`I am streamId ${dp.sctpStreamParameters.streamId}`);
  }

  if (dp.readyState === 'open') {
    send();
  }
  else {
    dp.on('open', () => {
      logger.warn('<<< testSctp: DataChannel open [streamId:%d]',
        dp.sctpStreamParameters.streamId);
      send();
    });
  }
  setTimeout(() => window.__testSctp({ timeout, bot }), timeout);
};

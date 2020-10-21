import React, { Component } from 'react';
import deviceInfo from "./libDeviceInfo";
// import RoomClient from "./RoomClient";
// import reducers from "./redux/reducers";
// import {
  // applyMiddleware as applyReduxMiddleware,
  // createStore as createReduxStore
// } from 'redux';
// import thunk from 'redux-thunk';
// const reduxMiddlewares = [thunk];

export default class NewVChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.design.uid,
      peerId: this.props.userInfo.uid,
      displayName: this.props.userInfo.nickName,
      handler: null,
      useSimulcast: false,
      useSharingSimulcast: false,
      forceTcp: true,
      produce: false,
      consume: false,
      forceH264: true,
      forceVP9: true,
      svc: null,
      datachannel: false,
      // info: true,
      // externalVideo = urlParser.query.externalVideo === 'true';
      // throttleSecret = urlParser.query.throttleSecret;
    };
    this.RoomClient = null;
    this.store = null;
  }
  componentDidMount() {
    console.log(this.state, this.props.design.member);
    const device = deviceInfo();
    console.log(device);
    // this.store = createReduxStore(
    //   reducers, undefined,
    //   applyReduxMiddleware(...reduxMiddlewares)
    // )
    // this.RoomClient.init({ store: this.store });

  }
  render() {
    return (<div>

    </div>)
  }
};
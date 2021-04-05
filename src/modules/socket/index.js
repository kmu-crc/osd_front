import socketIOClient from "socket.io-client";
import host from "config";

let Socket = socketIOClient(host, { transports: ['websocket', 'polling', 'flashsocket'] });

export default Socket

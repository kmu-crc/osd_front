import socketIOClient from "socket.io-client";
import host from "config";
const wspath = host;
let Socket = socketIOClient(wspath,
    { transports: ['websocket', 'polling', 'flashsocket'] }
);
export default Socket;
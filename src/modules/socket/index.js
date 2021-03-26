import socketIOClient from "socket.io-client";
import host from "config";

let Socket = null;//socketIOClient(host, { transports: ['websocket', 'polling', 'flashsocket'] })

export default Socket

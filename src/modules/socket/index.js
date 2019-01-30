import socketIOClient from "socket.io-client";
import host from "config";

let Socket = socketIOClient(host);

export default Socket;

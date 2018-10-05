import socketIOClient from "socket.io-client";

let Socket = socketIOClient("http://localhost:8080");

export default Socket;

import socketIOClient from "socket.io-client";

let Socket = socketIOClient(process.env.REACT_APP_API_URL);

export default Socket;

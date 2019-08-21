import socketIOClient from "socket.io-client";
import host from "config";
console.log("host:",host);
let Socket = socketIOClient(host)

export default Socket

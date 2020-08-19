import io from "socket.io-client";
import host from "config";
// console.log("socket host:", host);
let Socket = io(host);
// + '/opendesign', { path: '/webrtc/socket.io' });//io.connect();//null//socketIOClient(host)
// let Socket = null;
export default Socket

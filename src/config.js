let host = null;
const build = true;
if(build) {
  host = "http://ec2-13-124-212-254.ap-northeast-2.compute.amazonaws.com";
} else {
  host = "http://localhost:3000";
}

export default host;

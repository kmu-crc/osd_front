let host = null;
if(process.env.REACT_APP_BUILD) {
  host = "ec2-13-124-212-254.ap-northeast-2.compute.amazonaws.com";
} else {
  host = "http://localhost:8080";
}

export default host;

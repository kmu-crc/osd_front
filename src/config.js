let host = 'http://market.opensrcdesign.com/api/';
var frontend = window.location.href.split("/")[0] + "//" + window.location.href.split("/")[2];

if (process.env.REACT_APP_TYPE === "local") {
    host = process.env.REACT_APP_LOCAL_URL;
} else if (process.env.REACT_APP_TYPE === "aws") {
    host = process.env.REACT_APP_AWS_URL;
} else if (process.env.REACT_APP_TYPE === "aws_dev") {
    host = process.env.REACT_APP_DEV_URL;
} else;

console.log("HOST:", host, "FRONT:", frontend);
export const geturl = () => { return frontend; };
export default host;

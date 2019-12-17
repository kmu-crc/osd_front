let host = 'http://203.246.113.131:5000';
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
export const token_name = "market";
export default host;
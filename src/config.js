let host = process.env.REACT_APP_AWS_URL;

if( process.env.REACT_APP_AWS_URL === "true" ||
	process.env.REACT_APP_AWS_URL === true) {
	host = process.env.REACT_APP_AWS_URL;
} else if(process.env.REACT_APP_LOCAL_URL=== "true" || process.env.REACT_APP_LOCAL_URL === true) {
	host = process.env.REACT_APP_LOCAL_URL;
}else;
// testing //
export default host;

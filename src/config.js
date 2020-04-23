let host = process.env.REACT_APP_AWS_URL;
if (process.env.REACT_APP_BUILD === "true" || process.env.REACT_APP_BUILD === true) {
	host = process.env.REACT_APP_AWS_URL;
} else if (process.env.REACT_APP_DEV === "true" || process.env.REACT_APP_DEV === true) {
	host = process.env.REACT_APP_DEV_URL;
} else if (process.env.REACT_APP_LOCAL === "true" || process.env.REACT_APP_LOCAL === true) {
	host = process.env.REACT_APP_LOCAL_URL;
} else;
console.log('backend:', process.env, host);
// testing //
export default host;
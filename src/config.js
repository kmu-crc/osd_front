let host = process.env.REACT_APP_API_URL;
if(process.env.REACT_APP_BUILD === "true" || process.env.REACT_APP_BUILD === true) {
	host = process.env.REACT_APP_API_URL;
} else if(process.env.REACT_APP_DEV === "true" || process.env.REACT_APP_DEV === true) {
	host = process.env.REACT_APP_DEV_API_URL;
} else if(process.env.REACT_APP_LOCAL === "true" || process.env.REACT_APP_LOCAL === true) {
	host = process.env.REACT_APP_LOCAL_API_URL;
}else;
// testing //
export default host;

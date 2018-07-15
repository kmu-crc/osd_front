let host = null;
if(process.env.REACT_APP_BUILD === "true") {
  host = process.env.REACT_APP_API_URL;
} else {
  host = process.env.REACT_APP_DEV_API_URL;
}

export default host;

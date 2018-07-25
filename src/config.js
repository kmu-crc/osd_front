let host = null;
if(process.env.REACT_APP_BUILD === "true") {
  host = process.env.REACT_APP_API_URL;
} else if(process.env.REACT_APP_DEV) {
  host = process.env.REACT_APP_DEV_API_URL;
} else if(process.env.REACT_APP_LOCAL) {
  host = process.env.REACT_APP_LOCAL_API_URL;
}

export default host;

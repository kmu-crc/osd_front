let host = null;
if(process.env.REACT_APP_BUILD === "true") {
  host = process.env.REACT_APP_API_URL;
} else {
  host = "http://localhost:8080";
}

export default host;

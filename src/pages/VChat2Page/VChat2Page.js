import React, { Component } from "react";

class VChat2Page extends Component {
  componentDidMount() {
    window.addEventListener("message", (e) => {
      e.data === "CLOSE" && window.close();
      if (e.data?.type === "TITLE") {
        console.log({ e });
        window.document.title = "[화상회의]" + e.data.title;
      }
    });
  }
  render() {
    return (
      <iframe
        id="ifr"
        style={{ width: "100%", height: "100%" }}
        src={"https://localhost:8080/" + window.location.search}
      />
    );
  }
}

export default VChat2Page;

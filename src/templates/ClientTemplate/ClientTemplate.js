import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
import Footer from "components/Commons/Footer";

class ClientTemplate extends Component {
  componentDidMount() {
    console.log("isActive", this.props.isActive);
  }
  onClose = e => {
    if (this.props.isActive !== "INIT") {
      this.props.SetActive("INIT");
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* // <div style={{ position: "relative" , paddingBottom: "33px", paddingTop: "60px"}} onClick={this.onClose}> */}
        <HeaderContainer active={this.props.isActive} />
        {/* {this.props.children} */}
        {/* <Footer /> */}
        {/* // </div> */}
      </React.Fragment>
    );
  }
}

export default ClientTemplate;

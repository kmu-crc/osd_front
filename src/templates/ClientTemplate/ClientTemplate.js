import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
import Footer from "components/Commons/Footer";
import styled from "styled-components";

const ContentBox=styled.div`
  display:flex;
  justify-content:center;
`

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
      <div style={{ position: "relative" , paddingBottom: "33px", paddingTop: "60px"}} onClick={this.onClose}>
        <HeaderContainer active={this.props.isActive} />
        <ContentBox>{this.props.children}</ContentBox>
        {/* {this.props.children} */}
        <Footer />
      </div>
    );
  }
}

export default ClientTemplate;

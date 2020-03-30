import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
// import Footer from "components/Commons/Footer";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 30px;
  margin-left: 65px;
  background: #FFFFFF;
  @media only screen and (max-width: 767px) and (min-width: 320px){
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
  }
  @media only screen and (min-width: 992px){
  }
  @media only screen and (max-width: 1919px) and (min-width: 1200px){
    width: 1790px;
  }
  @media only screen and (min-width: 1920px){
    width: 1790px;
    margin-left: auto;
    margin-right: auto;
  }
`
class ClientTemplate extends Component {
  onClose = e => {
    if (this.props.isActive !== "INIT") {
      this.props.SetActive("INIT");
    }
  }

  render() {
    return (<Container>
      <HeaderContainer active={this.props.isActive} />
      <div style={{ width: "1790px", position: "relative", }} onClick={this.onClose}>
        {this.props.children}
        {/* <Footer /> */}
      </div>
    </Container>);
  }
}

export default ClientTemplate;

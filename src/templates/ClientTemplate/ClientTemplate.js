import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
import styled from "styled-components";
import Notice from "components/Commons/Header/Notice";
import Footer from "components/Commons/Footer/Footer"

const Container = styled.div`
  margin-top: 30px;
  margin-left: 65px;
  background: #FFFFFF;
  padding-bottom:30px;
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
  .children-wrapper {
    width: 1790px;
    position: relative;
  }
`
class ClientTemplate extends Component {
  render() {
    return (
      <div>
        <Notice />
        <Container>
          <HeaderContainer active={this.props.isActive} />
          <div className="children-wrapper">
            {this.props.children}
            {/* <Footer /> */}
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ClientTemplate;

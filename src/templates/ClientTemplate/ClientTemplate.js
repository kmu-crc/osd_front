import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
import styled from "styled-components";
import Notice from "components/Commons/Header/Notice";
import Footer from "components/Commons/Footer/Footer"

const Container = styled.div`
  // margin-left: 65px;
  margin: auto;
  background: #FFFFFF;
  padding-bottom:30px;
  @media only screen and (max-width: 1366px){
    width: 100%;
    .children-wrapper{
      width:100%;
    }
  }
  @media only screen and (min-width: 1366px){
    width: 1366px;
    margin-left: auto;
    margin-right: auto;
    .children-wrapper{
      width:100%;
    }
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

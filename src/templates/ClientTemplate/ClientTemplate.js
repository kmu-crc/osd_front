import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
import BottomMenuContainer from "containers/Commons/BottomMenuContainer";
import styled from "styled-components";
import Notice from "components/Commons/Header/Notice";
import Footer from "components/Commons/Footer/Footer"
const Templete = styled.div`
  height:100%;
`
const Container = styled.div`
  margin: auto;
  background: #ffffff;
  padding-bottom:60px;
  padding-top:${props=>props.isMobile==true?"45px":"0px"};
  .children-wrapper{
    width:100%;
    overflow-y:auto;
  }
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
    const innerHeight = window.innerHeight;
    return (
      <React.Fragment>
        <Notice />
        <HeaderContainer active={this.props.isActive} />
        <Container isMobile={window.innerWidth>=500?false:true}>
          <div className="children-wrapper">
            {this.props.children}
          </div>
          {
          window.innerWidth>=500?
          null
          :
          <BottomMenuContainer/>
          }
        </Container>
        { window.innerWidth<500?
          null
          :
          <Footer/>
          }
      </React.Fragment>
    );
  }
}

export default ClientTemplate;
{/* <Notice />
<Container>
  <HeaderContainer active={this.props.isActive} />
  <div className="children-wrapper">
    {this.props.children}
  </div>
</Container>
{
  window.innerWidth>=500?
  <Footer />
  :
  <BottomMenuContainer/>
} */}
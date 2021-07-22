import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
import BottomMenuContainer from "containers/Commons/BottomMenuContainer";
import styled, { keyframes } from "styled-components";
import Notice from "components/Commons/Header/Notice";
import Footer from "components/Commons/Footer/Footer"

import market_style from "market_style";
import Logo from "source/OWD_2x.png";

const Container = styled.div`
  margin: auto;
  background: #ffffff;
  padding-bottom:60px;
  padding-top:${props=>props.isMobile==true?"50px":"0px"};
  overflow:hidden;

  .children-wrapper{
    width:100%;
    height:100%;
    // overflow-y:auto;
  }
  .mobileWidth{
    width:100%;
  }
  .mobile-wrapper{
    width:${window.innerWidth}px;
    // width:375px;
    overflow-x:hidden;
  }
  .main-mobile-wrapper{
    width:100%;
    overflow-x:hidden;
  }
  .marginAuto{
    margin:0px auto;
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
  @media only screen and (min-width: 500px) and (max-width:1000px){
    .children-wrapper{
      padding-top:20px;
    }
  }

`
const fadein = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:0.5;
  }
`;
const Back = styled.div`
  display:${props=>props.visible==true?"block":"none"};
  z-index:998;
  position:fixed;
  width:${window.innerWidth}px;
  height:${window.innerHeight}px;
  opacity:0.5;
  background:transparent linear-gradient(180deg, #707070 0%, #383838 100%) 0% 0% no-repeat padding-box;  
  animation-name: ${fadein};
  animation-duration:1s;
  animation-direction:alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;

`
const slide = keyframes`
  0% {
    left:-249px;
  }
  100% {
    left:0px;
  }
`;
const Menu = styled.div`
    display:${props=>props.visible==true?"block":"none"};
    z-index:998;
    position:fixed;
    width:249px;
    height:${window.innerHeight}px;
    box-shadow: 5px 0px 5px #0000001A;
    background-color:white;
    .logo{
      width:100%;
      padding:35px 29px 15px 20px;
      .img{
        background-image:url(${Logo});
        width:100%;
        height:200px;
      }
    }
    .menu_list{
      width:100%;
      padding:0px 19px 0px 10px;
      .header{
        font-size:${market_style.font.size.normal3};
        font-weight:800;
        color:#c1c1c1;
        margin-bottom:30px;
        margin-left:10px;
      }
      .menu{
        width:100%;
        height:42px;
        border:1px solid #E9E9E9;
        border-radius:10px;
        box-shadow: 2px 2px 5px #00000029;
        padding:10px 20px;
        display:flex;
        align-items:center;
        font-size:${market_style.font.size.small1};
        font-weight:500;
        color:black;
        margin-bottom:15px;
      }
      .footer{
        margin-top:20px;
        margin-left:10px;
        .text_{

          color:#707070;
          font-size:${market_style.font.size.mini2};
          font-weight:300;
        }
      }
    }

    // ani
      animation-name: ${slide};
      animation-duration:1s;
      animation-direction:${props=>props.visible == true?"alternate":"reverse"};
      animation-fill-mode: forwards;
      animation-timing-function: ease-out;  
`
class ClientTemplate extends Component {
  constructor(props){
    super(props);
    this.state = {
      popmenu:false,
    }
    this.onClickMenu = this.onClickMenu.bind(this);
  }
  onClickMenu=()=>{
    this.setState({popmenu:!this.state.popmenu});
  }
  render() {
    const innerHeight = window.innerHeight;
    console.log(window.location.pathname);
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?null
          :
          <React.Fragment>
              <Back visible={this.state.popmenu} onClick={()=>this.onClickMenu()}/>
              <Menu visible={this.state.popmenu}>
                <div className="logo">
                  <div className="img"/>
                </div>
                <div className="menu_list">
                  <div className="header">메뉴 바로가기</div>
                  <div className="menu" onClick={()=>window.location.href="/designer"}>디자이너</div>
                  <div className="menu" onClick={()=>window.location.href="/maker"}>메이커</div>
                  <div className="menu" onClick={()=>window.location.href="/product"}>아이템</div>
                  <div className="menu" onClick={()=>window.location.href="/request/designer"}>게시판</div>
                  <div className="footer">
                    <div className="text_" onClick={()=>window.location.href="/footerPara"}>이용약관</div>
                    <div className="text_" onClick={()=>window.location.href="/footerPrivacy"}>개인정보보호정책</div>
                  </div>
                </div>
              </Menu>
          </React.Fragment>
        }

        <React.Fragment>
        <Notice />
        <HeaderContainer active={this.props.isActive} />
        <Container id="allWrapper" 
        isSmall={window.innerWidth>=500&&window.innerWidth<700?true:false}
        isMobile={window.innerWidth>=500?false:window.location.pathname=="/message"?false:window.location.pathname=="/"?false:true}>
          {
          window.innerWidth>=500?
          <div className="children-wrapper">
          {this.props.children}
          </div>
          :
          window.location.pathname=="/"?
          <React.Fragment>
            <div id="mobileWrap" className="main-mobile-wrapper">
              {this.props.children}
            </div>
            <BottomMenuContainer onClickMenu={this.onClickMenu}/>
          </React.Fragment>
          :
          <React.Fragment>
          <div id="mobileWrap"  className="mobile-wrapper marginAuto">
            {this.props.children}
          </div>
          <BottomMenuContainer onClickMenu={this.onClickMenu}/>
          </React.Fragment>
          }
        </Container>
        { window.innerWidth<500?
          null
          :
          <React.Fragment>
            <Footer/>
          </React.Fragment>
          }
          </React.Fragment>
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
import React, { Component } from 'react'
import HeaderContainer from "containers/Header/HeaderContainer"
import Footer from "components/Header/Footer"
import styled, { keyframes } from "styled-components";
import NavigationContainer from "containers/Nav/NavigationContainer";
import SignInContainer from "containers/Registration/SignInContainer";
import { isMobile, MOBILE_WIDTH, } from "constant";
import cookie from 'react-cookies';
import MobileSlideMenu, { Back } from "components/Mobile/MobileSlideMenu";

const OpenAni = keyframes`
  0% {
    left:-100px;
  }
  100% {
    left:0px;
  }
`;
const CloseAni = keyframes`
  0% {
    left:0px;
  }
  100% {
    left:-100px;
  }
`;
const NavigationAni = styled.div`
  position:fixed;
  height: 100%;
  z-index:902;
  animation-name: ${props => props.sidemenu == true ? OpenAni : CloseAni};
  animation-duration:1s;
  animation-direction:alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
`;
const ClientToLeftAni = keyframes`
  0% { 
    margin-left: 100px;
  }
  100% {
    margin-left: 0px;
  }
`;
const ClientToRightAni = keyframes`
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 100px;
  }
`;
const ClientAni = styled.div`
  animation-name: ${props => props.sidemenu == true ? ClientToRightAni : ClientToLeftAni};
  animation-duration:1s;
  animation-direction:alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
`;
const Client = styled.div`
  position:absolute;
  top: 0px;
  bottom: 0px;
  width:100%;
  overflow-y: overlay;
  overflow-x: overlay;
  ${window.location.pathname == "/" ?
    null :
    `
    padding-top:90px;
    `
  }

  .wrap_children {
    min-width: ${props => window.location.pathname == "/" ?
    props.hidemenu == true ? "900px" : "1000px" : "1000px"
  };
    max-width: 1920px;
    width: 100%;
    // margin-left: auto;
    // margin-right: auto;
  }
  @media only screen and (min-width : 0px) and (max-width : 1920px) {
    // display:flex;
    // justify-content:flex-start;
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width : 1920px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

// MOBILE

const MobileWrapper = styled.div`
  z-index: 100;
  // width: ${MOBILE_WIDTH}px;
  width:100%;
  position: relative;
  margin-left:auto;
  margin-right:auto;
`;
const MobileClient = styled.div`
// width: ${MOBILE_WIDTH}px;
  width:100%;
  height: ${window.innerHeight - 39}px;
  position:relative;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */ 
`;

class ClientTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: false,
      whensmall: 256 * 2,
      larger: false,
      hidemenu: false,
      prevScroll: 0,
      screenWidth: window.innerWidth,
      sidemenu: true,
      login: null,
    }
    this.onClickFoldingSideMenu = this.onClickFoldingSideMenu.bind(this);
  }
  componentDidMount() {
    const sidemenu = cookie.load("side-menu");
    if (sidemenu === undefined) {
      cookie.save("side-menu", "true");
      this.setState({ sidemenu: true });
    } else {
      this.setState({ sidemenu: sidemenu === "true" });
    }
    window.addEventListener("resize", this.handleResize, false);
  }
  onClose = e => {
    if (this.props.isActive !== "INIT") {
      this.props.SetActive("INIT");
    }
  }
  checkIsOutScroll = (obj) => {
    this.setState({ scroll: true });
    setTimeout(() => { this.setState({ scroll: false }) }, 50);
  }
  checkScrollUp = (obj) => {
    const currentScrollPos = obj.scrollTop;
    const prevScrollPos = this.state.prevScroll;
    const { hidemenu, whensmall } = this.state;
    if (window.location.pathname === "/message") {
      this.setState({ larger: true });
      this.setState({ hidemenu: false });
      return;
    }
    if (hidemenu === false) {
      if (currentScrollPos > 25) {
        this.setState({ larger: true });
      }
      else {
        this.setState({ larger: false });
      }
      if (currentScrollPos > whensmall) {
        if (prevScrollPos < currentScrollPos) { // console.log("hide")
          this.setState({ hidemenu: true });
        }
      }
    } else {
      if (prevScrollPos > currentScrollPos) { // console.log("show")
        this.setState({ hidemenu: false });
      }
    }
    this.setState({ prevScroll: currentScrollPos });
  }
  handleScroll = (e) => {
    const obj = e.target;
    this.checkScrollUp(obj);
    this.checkIsOutScroll(obj);
  }
  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  }
  onClickFoldingSideMenu = async () => {
    await this.setState({ sidemenu: this.state.sidemenu === true ? false : true });
    await cookie.save("side-menu", this.state.sidemenu ? "true" : "false", { path: "/" });
  }
  gotoSignInPage = () => {
    window.location.href = "/signin";
  }
  render() {

    const { scroll, larger /*, hidemenu*/ } = this.state;
    const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ");
    const larger_style = (larger ? "larger " : "");
    const { hideheader } = this.props;
    return (isMobile()
      ? <MobileWrapper>
        {/* <Back visible={this.state.sidemenu} /> */}

        {/* navi */}
        <MobileSlideMenu setSideMenu={(visible) => this.setState({ sidemenu: visible })} />

        {/* header */}
        {hideheader ? null
          : <HeaderContainer
            onClickLogin={this.gotoSignInPage}
            isLogin={this.state.login}
          />}

        {/* client */}
        <MobileClient>
          {this.props.children}
        </MobileClient>

        <Footer />

      </MobileWrapper>

      : <Wrapper>

        {this.state.login ?
          <SignInContainer
            onCloseLogin={() => this.setState({ login: null })}
            loginOpen={this.state.login} />
          : null}

        <HeaderContainer
          onClickLogin={() => this.setState({ login: this.state.login == null ? true : !this.state.login })}
          isLogin={this.state.login}
          sidemenu={this.state.sidemenu}
          onClickMenu={() => {
            this.state.login && this.state.sidemenu ?
              this.setState({ sidemenu: this.state.sidemenu }) :
              this.setState({ sidemenu: !this.state.sidemenu })
          }} />

        <NavigationAni sidemenu={this.state.sidemenu}>
          <NavigationContainer
            onClickFolding={this.onClickFoldingSideMenu}
            sidemenu={this.state.sidemenu}
            userInfo={this.props.userInfo}
          />
        </NavigationAni>

        <Client
          hidemenu={this.state.sidemenu}
          active={this.props.isActive}
          className={`${scroll_style} ${/*hidemenu_style*/""} ${larger_style}`}
          onScroll={this.handleScroll}>

          <ClientAni sidemenu={this.state.sidemenu}>
            <div className="wrap_children">
              {React.cloneElement(this.props.children, { menu: this.state.sidemenu })}
              {/* {this.props.children} */}
            </div>
          </ClientAni>
        </Client>

        <Footer />

      </Wrapper>
    );
  };
};

export default ClientTemplate;

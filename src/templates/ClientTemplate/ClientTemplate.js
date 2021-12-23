import React, { Component } from 'react'
import HeaderContainer from "containers/Header/HeaderContainer"
import Footer from "components/Header/Footer"
import styled, { keyframes } from "styled-components";
import NavigationContainer from "containers/Nav/NavigationContainer";
import SignInContainer from "containers/Registration/SignInContainer";
import { isMobile, MOBILE_WIDTH, } from "constant";
import cookie from 'react-cookies';
import MobileSlideMenu, { Back } from "components/Mobile/MobileSlideMenu";


const MENU_WIDTH = 100;

// A to A
// B to B
// A to B
// B to A
const ANI_CLIENT_AtoA = keyframes`
  0%{ margin-left: 0px; } 
  100%{ margin-left: 0px; }
`;
const ANI_CLIENT_BtoB = keyframes`
  0%{ margin-left: ${MENU_WIDTH}px; } 
  100%{ margin-left: ${MENU_WIDTH}px; }
`;
const ANI_CLIENT_AtoB = keyframes`
  0%{ margin-left: 0px; } 
  100%{ margin-left: ${MENU_WIDTH}px; }
`;
const ANI_CLIENT_BtoA = keyframes`
  0%{ margin-left: ${MENU_WIDTH}px; } 
  100%{ margin-left: 0px; }
`;
const ANI_MENU_AtoA = keyframes`
  0%{ left: ${-1 * MENU_WIDTH}px; } 
  100%{ left: ${-1 * MENU_WIDTH}px; } 
`;
const ANI_MENU_BtoB = keyframes`
  0%{ left: 0px; } 
  100%{ left: 0px; } 
`;
const ANI_MENU_AtoB = keyframes`
  0%{ left: ${-1 * MENU_WIDTH}px; } 
  100%{ left: 0px; } 
`;
const ANI_MENU_BtoA = keyframes`
  0%{ left: 0px; } 
  100%{ left: ${-1 * MENU_WIDTH}px; } 
`;
const NavigationAni = styled.div`
  position: fixed;
  height: 100%;
  z-index: 902;
  animation-name: ${props => props.ani};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
`;
const ClientToLeftAni = keyframes`
  0% { margin-left: ${MENU_WIDTH}px; }
  100% { margin-left: 0px; }
`;
const ClientToRightAni = keyframes`
  0% { margin-left: 0px; }
  100% { margin-left: ${MENU_WIDTH}px; }
`;
const DefaultPositionClient = keyframes`
  // 0%{ margin-left: 0px; }
  // 100%{ margin-left: 0px; }
  0%{ margin-left: ${MENU_WIDTH}px; }
  100%{ margin-left: ${MENU_WIDTH}px; }
`;
const ClientAni = styled.div`
  animation-name: ${props => props.ani};
  animation-duration: 1s;
  animation-direction: alternate;
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
    padding-top: 90px;
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
      sidemenu: null,
      login: null,
    }
    this.onClickFoldingSideMenu = this.onClickFoldingSideMenu.bind(this);
  }
  componentDidMount() {
    const sidemenu = cookie.load("side-menu");
    if (sidemenu === undefined || sidemenu === null) {
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
    await this.setState({ sidemenu: !this.state.sidemenu });
    await cookie.save("side-menu", this.state.sidemenu ? "true" : "false", { path: "/" });
  }
  gotoSignInPage = () => {
    window.location.href = "/signin";
  }

  foldingDirection = (prev, now) => {
    let aniMenu = ANI_MENU_BtoB;
    let aniClient = ANI_CLIENT_BtoB;
    if (prev == null && now == true) {
      aniMenu = ANI_MENU_BtoB;
      aniClient = ANI_CLIENT_BtoB;
    } else if (prev == true && now == true) {
      aniMenu = ANI_MENU_BtoB;
      aniClient = ANI_CLIENT_BtoB;
    } else if (prev == false && now == true) {
      aniMenu = ANI_MENU_AtoB;
      aniClient = ANI_CLIENT_AtoB;
    } else if (prev == true && now == false) {
      aniMenu = ANI_MENU_BtoA;
      aniClient = ANI_CLIENT_BtoA;
    } else {
      aniMenu = ANI_MENU_AtoA;
      aniClient = ANI_CLIENT_AtoA;
    }
    this.setState({ aniMenu: aniMenu, aniClient: aniClient });
  }
  componentDidUpdate(_, state) {
    if (this.state.sidemenu !== state.sidemenu) {
      this.foldingDirection(state.sidemenu, this.state.sidemenu);
    }
  }

  render() {

    const { scroll, larger, aniMenu = ANI_MENU_BtoB, aniClient = ANI_CLIENT_BtoB, /*, hidemenu*/ } = this.state;
    const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ");
    const larger_style = (larger ? "larger " : "");
    const { hideheader } = this.props;


    return (
      isMobile()

        ? <MobileWrapper>
          {/* NAVIGATION */}
          <MobileSlideMenu setSideMenu={(visible) => this.setState({ sidemenu: visible })} />

          {/* HEADER */}
          {hideheader ? null
            : <HeaderContainer
              onClickLogin={this.gotoSignInPage}
              isLogin={this.state.login}
            />}

          {/* CLIENT */}
          <MobileClient>
            {this.props.children}
          </MobileClient>

          <Footer />

        </MobileWrapper>

        : <Wrapper>

          {this.state.login ?
            <SignInContainer
              loginOpen={this.state.login}
              onCloseLogin={() => this.setState({ login: null, })} />
            : null}

          <HeaderContainer
            isLogin={this.state.login}
            onClickLogin={() => this.setState({ login: this.state.login == null ? true : !this.state.login, })}
          />

          <NavigationAni ani={aniMenu}>
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

            <ClientAni ani={aniClient}>
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


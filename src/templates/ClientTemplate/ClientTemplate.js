import React, { Component } from 'react'
import HeaderContainer from "containers/Header/HeaderContainer"
import Footer from "components/Header/Footer"
import styled, { keyframes } from "styled-components";
import NavigationContainer from "containers/Nav/NavigationContainer";
import SignInContainer from "containers/Registration/SignInContainer";
// import MenuContext from "Global/Context/GlobalContext"

// mobile
// import { Dimmer, } from 'semantic-ui-react'
import { MOBILE_WIDTH, SLIDE_MENU_WIDTH } from "constant";
import cookie from 'react-cookies';

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

// mobile
const fadein = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:0.5;
  }
`;
const Back = styled.div`
  display:${props => props.visible == true ? "block" : "none"};
  z-index: 100;
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
const MobileWrapper = styled.div`
  z-index: 8888;
  width: ${MOBILE_WIDTH}px;
  position: relative;
`;
const MobileOpenAni = keyframes`
  0% {
    left: ${-1 * SLIDE_MENU_WIDTH}px;
  }
  100% {
    left: 0px;
  }
`;
const MobileCloseAni = keyframes`
  0% {
    left: 0px;
  }
  100% {
    left: ${-1 * SLIDE_MENU_WIDTH}px;
  }
`;
const MobileNavigationAni = styled.div`
  position: fixed;
  height: 100%;
  z-index: 902;
  animation-name: ${props => props.sidemenu ? MobileOpenAni : MobileCloseAni};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
`;
const MobileClient = styled.div`
  height: ${window.innerHeight - 39}px;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */ 
`;

const isMobile = () => MOBILE_WIDTH >= window.innerWidth;

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
      sidemenu: cookie.load("side-menu"),
      login: null,
    }
    this.onClickFoldingSideMenu = this.onClickFoldingSideMenu.bind(this);
  }
  componentDidMount() {
    const sidemenu = cookie.load("side-menu");
    if (sidemenu === undefined) {
      cookie.save("side-menu", "open");
      this.setState({ sidemenu: "open" });
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
    // const sidemenu = await cookie.load("side-menu");
    await this.setState({ sidemenu: this.state.sidemenu === "open" ? "close" : "open" });
    await cookie.save("side-menu", this.state.sidemenu, { path: "/" });
  }

  render() {

    const { scroll, larger /*, hidemenu*/ } = this.state;
    const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ");
    const larger_style = (larger ? "larger " : "");
    // const hidemenu_style = (hidemenu ? "hidemenu " : "");

    return (<React.Fragment>
      {isMobile()

        ? <MobileWrapper>

          {<Back visible={this.state.sidemenu === "open"} />}

          {/* login */}


          {/* navi */}
          <MobileNavigationAni sidemenu={this.state.sidemenu === "open"} >
            <div style={{ position: "absolute", height: "100%", width: "160px", }}>
              <NavigationContainer
                mobile={true}
                sidemenu={this.state.sidemenu === "open"}
                onClickFolding={this.onClickFoldingSideMenu}
              />
            </div>
          </MobileNavigationAni>

          {/* header */}
          <HeaderContainer
            onClickLogin={() => alert("아직임!")}
            isLogin={this.state.login}
          // this.setState({ login: this.state.login == null ? true : !this.state.login })}
          // sidemenu={this.state.sidemenu}
          // onClickMenu={() => {
          //  this.state.login && this.state.sidemenu ?
          //    this.setState({ sidemenu: this.state.sidemenu }) :
          //    this.setState({ sidemenu: !this.state.sidemenu })
          //}}
          />

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
                {this.props.children}
              </div>
            </ClientAni>
          </Client>

          <Footer />

        </Wrapper>
      }
    </React.Fragment >);
  }
}

export default ClientTemplate;

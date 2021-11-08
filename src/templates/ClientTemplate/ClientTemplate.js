import React, { Component } from 'react'
import HeaderContainer from "containers/Header/HeaderContainer"
import Footer from "components/Header/Footer"
import styled, { keyframes } from "styled-components";
import NavigationContainer from "containers/Nav/NavigationContainer";
import SignInContainer from "containers/Registration/SignInContainer";
// import MenuContext from "Global/Context/GlobalContext"

// mobile
import { Dimmer, } from 'semantic-ui-react'

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
const MOBILE_WIDTH = 360;
const MobileWrapper = styled.div`
  z-index: 8888;
  width: ${MOBILE_WIDTH}px;
  border: 1px dashed blue;
  position: relative;
`;
const MobileOpenAni = keyframes`
  0% {
    left: -100px;
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
    left: -100px;
  }
`;
const MobileNavigationAni = styled.div`
  position: fixed;
  height: 100%;
  z-index: 902;
  animation-name: ${props => props.sidemenu == true ? MobileOpenAni : MobileCloseAni};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
`;
const MobileClient = styled.div`
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
      sidemenu: isMobile() ? false : true,
      login: null,
    }
    this.onClickFoldingSideMenu = this.onClickFoldingSideMenu.bind(this);
  }
  componentDidMount() {
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
  }

  render() {

    const { scroll, hidemenu, larger } = this.state;
    const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ");
    const larger_style = (larger ? "larger " : "");
    // const hidemenu_style = (hidemenu ? "hidemenu " : "");

    console.log(this.props);

    // Todo: sidemenu 쿠키에서 가져오도록 변경할 것!

    return (<React.Fragment>

      {isMobile()

        ? <MobileWrapper>

          {/* login */}
          {/* not yet */}

          {/* navi */}
          <MobileNavigationAni sidemenu={this.state.sidemenu} >
            <div style={{ position: "absolute", height: "100%", width: "160px", }}>
              <NavigationContainer
                mobile={true}
                sidemenu={this.state.sidemenu}
                onClickFolding={this.onClickFoldingSideMenu}
              />
            </div>
          </MobileNavigationAni>

          {/* header */}
          <HeaderContainer
            // this.setState({ login: this.state.login == null ? true : !this.state.login })}
            onClickLogin={() => alert("아직임!")}
            isLogin={this.state.login}
            sidemenu={this.state.sidemenu}
            onClickMenu={() => {
              this.state.login && this.state.sidemenu ?
                this.setState({ sidemenu: this.state.sidemenu }) :
                this.setState({ sidemenu: !this.state.sidemenu })
            }}
          />

          {/* client */}
          <MobileClient>
            {/* {this.props.children} */}
          </MobileClient>

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
        </Wrapper>
      }
      <Footer />
    </React.Fragment >);
  }
}

export default ClientTemplate;

//   onClickFoldingSideMenu = async () => {
//     await this.setState({ sidemenu: !this.state.sidemenu });
//   }
//   render() {
//     const { scroll, hidemenu, larger } = this.state;
//     const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ");
//     const hidemenu_style = (hidemenu ? "hidemenu " : "");
//     const larger_style = (larger ? "larger " : "");

//     return (<Wrapper>
//       <div style={{ width: "100%", minWidth: "1000px" }}>
//         {this.state.login == true ?
//           <SignInContainer onCloseLogin={() => this.setState({ login: null })} loginOpen={this.state.login} />
//           : null}

//         <HeaderContainer onClickLogin={() => this.setState({ login: this.state.login == null ? true : !this.state.login })}
//           isLogin={this.state.login} sidemenu={this.state.login == null || this.state.login == true ? this.state.sidemenu : false}
//           onClickMenu={() => {
//             this.state.login == true && this.state.sidemenu == true ?
//               this.setState({ sidemenu: this.state.sidemenu }) :
//               this.setState({ sidemenu: !this.state.sidemenu })
//           }} />

//         <NavigationAni sidemenu={this.state.login == null ? window.location.pathname.indexOf("/signup") == -1 ? this.state.sidemenu : false : false} >
//           <NavigationContainer onClickFolding={this.onClickFoldingSideMenu} userInfo={this.props.userInfo} />
{/* <Navigation onClickLogin={() => this.setState({ login: this.state.login == null ? true : !this.state.login })} userInfo={this.props.userInfo} /> */ }



//         <div style={{width:"100%",minWidth:"500px"}}>
//         {
//           this.state.login == true?
//           <SignInContainer onCloseLogin={()=>this.setState({login:null})} loginOpen={this.state.login}/>
//           :null
//         }

//         <HeaderContainer onClickLogin={()=>this.setState({login:this.state.login==null?true:!this.state.login})}
//                          isLogin={this.state.login} sidemenu={this.state.login==null||this.state.login==true?this.state.sidemenu:false} 
//                          onClickMenu={()=>{
//                            this.state.login==true&&this.state.sidemenu==true?
//                            this.setState({sidemenu:this.state.sidemenu}):
//                            this.setState({sidemenu:!this.state.sidemenu})
//                          }}/>
//         <NavigationAni sidemenu={this.state.login==null?window.location.pathname.indexOf("/signup")==-1?this.state.sidemenu:false:false} >
//         <NavigationContainer onClickFolding={this.onClickFoldingSideMenu}  userInfo={this.props.userInfo}/>

//         </NavigationAni>
//         <Client active={this.props.isActive} className={`${scroll_style}${hidemenu_style}${larger_style}`} onScroll={this.handleScroll}>
//           <div className="wrap_children">
//           {this.props.children}
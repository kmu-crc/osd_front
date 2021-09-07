import React, { Component } from 'react'
import HeaderContainer from "containers/Header/HeaderContainer"
import Footer from "components/Header/Footer"
import styled, { keyframes } from "styled-components";
import MenuContext from "Global/Context/GlobalContext"
import Navigation from "components/Nav/Navigation";
import SignInContainer from "containers/Registration/SignInContainer";

// const ContentContainer = styled.div`
//   position: absolute;
//   // top: 55px;
//   left: 0px;
//   right: 0px;
//   bottom: 0px;
//   overflow-y: overlay;
//   overflow-x: overlay;
//   &.hidemenu {
//     top: 0px;
//   }
//   -webkit-transition: all 0.45s;
//   -moz-transition: all 0.45s;
//   -ms-transition: all 0.45s;
//   -o-transition: all 0.45s;
//   transition: all 0.45s;

//   // @media only screen and (min-width : 780px) and (max-width:1440px) {
//   //   overflow-y: overlay;
//   // overflow-x: overlay;
//   // }
//   // @media only screen and (min-width : 360px) and (max-width:780px) {
//   //   overflow-y: overlay;
//   //   overflow-x: overlay;
//   // }
// `
// const ChildrenContainer = styled.div`
//   margin-left: auto;
//   margin-right: auto;
  
//   width:${props => props.screenWidth > 1920 ? 1920 : props.screenWidth}px;
//   // @media only screen and (max-width: 1920px) {
//   //   width:${window.innerWidth}px;
//   // }
//   // @media only screen and (min-width: 1920px) {
//   //   width:1920px;
//   // }
// `;
const Open_ani = keyframes`
  0% {
    left:-100px;
  }
  100% {
    left:0px;
  }
`;
const Close_ani = keyframes`
  0% {
    left:0px;
  }
  100% {
    left:-100px;
  }
`;
const NavigationAni = styled.div`
  position:fixed;
  z-index:902;
  animation-name: ${props=>props.sidemenu==true?Open_ani:Close_ani};
  animation-duration:1s;
  animation-direction:alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
`
const Client = styled.div`
  position:absolute;
  width:100%;
  top: 0px;
  bottom: 0px;
  display:flex;
  justify-content:center;
  overflow-y: overlay;
  overflow-x: overlay;
  &.hidemenu {
    top: 0px;
  }
  .wrap_children{
    max-width:1920px;
    width:100%;
  }
  // .wrap_children{
  //   max-width:${window.location.pathname=="/"?"100%":"1920px"};
  //   width:100%;
  // }
  // @media only screen and (min-width : 1920px) {
  // }
  //  @media only screen and (min-width : 500px) and (max-width:1920px) {
     
  //   width:100%;
  //   .wrap_children{
  //     max-width:100%;
  //   }
  //  }
`
class ClientTemplate extends Component {
  constructor(props){
    super(props);
    this.state = {
      scroll: false,
      whensmall: 256 * 2,
      larger: false,
      hidemenu: false,
      prevScroll: 0,
      screenWidth: window.innerWidth,
      sidemenu:true,
      login:null,
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false)
  }
  onClose = e => {
    if (this.props.isActive !== "INIT") {
      this.props.SetActive("INIT")
    }
  }
  checkIsOutScroll = (obj) => {
    this.setState({ scroll: true })
    setTimeout(() => { this.setState({ scroll: false }) }, 50)
  }
  checkScrollUp = (obj) => {
    const currentScrollPos = obj.scrollTop
    const prevScrollPos = this.state.prevScroll
    const { hidemenu, whensmall } = this.state
    if (window.location.pathname === "/message") {
      this.setState({ larger: true })
      this.setState({ hidemenu: false })
      return
    }
    if (hidemenu === false) {
      if (currentScrollPos > 25) {
        this.setState({ larger: true })
      }
      else {
        this.setState({ larger: false })
      }
      if (currentScrollPos > whensmall) {
        if (prevScrollPos < currentScrollPos) { // console.log("hide")
          this.setState({ hidemenu: true })
        }
      }
    } else {
      if (prevScrollPos > currentScrollPos) { // console.log("show")
        this.setState({ hidemenu: false })
      }
    }
    this.setState({ prevScroll: currentScrollPos })
  }
  handleScroll = (e) => {
    console.log("sroll")
    const obj = e.target
    this.checkScrollUp(obj)
    this.checkIsOutScroll(obj)
  }
  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth })
  }
  render() {
    const { scroll, hidemenu, larger } = this.state
    const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ")
    const hidemenu_style = (hidemenu ? "hidemenu " : "")
    const larger_style = (larger ? "larger " : "")
    console.log(this.props);
    return (
      <React.Fragment>
        
        {
          this.state.login == true?
          <SignInContainer onCloseLogin={()=>this.setState({login:null})} loginOpen={this.state.login}/>
          :null
        }
        
        <HeaderContainer isLogin={this.state.login} sidemenu={this.state.login==null||this.state.login==true?this.state.sidemenu:false} 
                         onClickMenu={()=>{
                           this.state.login==true&&this.state.sidemenu==true?
                           this.setState({sidemenu:this.state.sidemenu}):
                           this.setState({sidemenu:!this.state.sidemenu})
                         }}/>
        <NavigationAni sidemenu={this.state.login==null?window.location.pathname.indexOf("/signup")==-1?this.state.sidemenu:false:false} >
        <Navigation onClickLogin={()=>this.setState({login:this.state.login==null?true:!this.state.login})} userInfo={this.props.userInfo}/>
        </NavigationAni>
        <Client active={this.props.isActive} className={`${scroll_style}${hidemenu_style}${larger_style}`} onScroll={this.handleScroll}>
          <div className="wrap_children">
          {this.props.children}
          </div>
        </Client>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default ClientTemplate;


// <MenuContext.Provider value={{ hidemenu, larger }}>
//   <HeaderContainer />
//   <ContentContainer active={this.props.isActive} className={`${scroll_style}${hidemenu_style}${larger_style}`} onScroll={this.handleScroll}>
//     <ChildrenContainer screenWidth={this.state.screenWidth}>
//       {this.props.children}
//     </ChildrenContainer>
//     <Footer />
//   </ContentContainer>
// </MenuContext.Provider>
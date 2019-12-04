import React, { Component } from 'react'
import HeaderContainer from "containers/Header/HeaderContainer"
import Footer from "components/Header/Footer"
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

const ContentContainer = styled.div`
  position: absolute;
  top: 55px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: overlay;
  overflow-x: hidden;
  &.hidemenu {
    top: 0px;
  }
  -webkit-transition: all 0.45s;
  -moz-transition: all 0.45s;
  -ms-transition: all 0.45s;
  -o-transition: all 0.45s;
  transition: all 0.45s;

  // @media only screen and (min-width : 780px) and (max-width:1440px) {
  //   overflow-y: overlay;
  // overflow-x: overlay;
  // }
  // @media only screen and (min-width : 360px) and (max-width:780px) {
  //   overflow-y: overlay;
  //   overflow-x: overlay;
  // }
`
const ChildrenContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  
  width:${props=>props.screenWidth>1920?1920:props.screenWidth}px;
  // @media only screen and (max-width: 1920px) {
  //   width:${window.innerWidth}px;
  // }
  // @media only screen and (min-width: 1920px) {
  //   width:1920px;
  // }
`;

class ClientTemplate extends Component {
  state = { scroll: false, whensmall: 256 * 2, larger: false, hidemenu: false, prevScroll: 0,screenWidth: window.innerWidth }
  componentDidMount() {
    console.log("isActive", this.props.isActive);
    window.addEventListener("resize", this.handleResize, false);
  }
  onClose = e => {
    if (this.props.isActive !== "INIT") {
      this.props.SetActive("INIT")
    }
  }
  checkIsOutScroll = (obj) => {
    this.setState({ scroll: true })
    setTimeout(() => { this.setState({ scroll: false }) }, 100)
  }
  checkScrollUp = (obj) => {
    const currentScrollPos = obj.scrollTop
    const prevScrollPos = this.state.prevScroll
    const { hidemenu, whensmall } = this.state
    if (window.location.pathname === "/message") {
      this.setState({ larger: true });
      this.setState({ hidemenu: false });
      return;
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
    const obj = e.target
    this.checkScrollUp(obj)
    this.checkIsOutScroll(obj)
  }
  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth })
  };
  render() {
    const { scroll, hidemenu, larger } = this.state
    const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ")
    const hidemenu_style = (hidemenu ? "hidemenu " : "")
    const larger_style = (larger ? "larger " : "");

    return (
      <MenuContext.Provider value={{ hidemenu, larger }}>
        <HeaderContainer />
        <ContentContainer active={this.props.isActive} className={`${scroll_style}${hidemenu_style}${larger_style}`} onScroll={this.handleScroll}>
          <ChildrenContainer screenWidth={this.state.screenWidth}>
            {this.props.children}
          </ChildrenContainer>
          <Footer />
        </ContentContainer>
      </MenuContext.Provider>
    )
  }
}

export default ClientTemplate;
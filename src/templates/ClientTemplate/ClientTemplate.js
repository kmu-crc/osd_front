import React, { Component } from 'react'
import HeaderContainer from "containers/Header/HeaderContainer"
import Footer from "components/Header/Footer"
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

const ContentContainer = styled.div`
    top: 55px;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y:overlay;
    overflow-x: hidden;
    &.hidemenu {
        top: 0px;
    }
    -webkit-transition: all 0.45s;
    -moz-transition: all 0.45s;
    -ms-transition: all 0.45s;
    -o-transition: all 0.45s;
    transition: all 0.45s;

    // -ms-overflow-style: none;
    // &::-webkit-scrollbar{
    //   display:none !important;
    // }

`
const BodyContainer = styled.div`
    width:1920px;
    margin:0 auto;
`

class ClientTemplate extends Component {
  componentDidMount() {
    console.log("isActive", this.props.isActive)
  }
  onClose = e => {
    if (this.props.isActive !== "INIT") {
      this.props.SetActive("INIT")
    }
  }
  state = { scroll: false, whensmall: 256, larger: false, hidemenu: false, prevScroll: 0 }
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
      if (currentScrollPos > whensmall * 2) {
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
  render() {
    const { scroll, hidemenu, larger } = this.state
    const scroll_style = (scroll ? "partial-scroll-on " : "partical-scroll-none ")
    const hidemenu_style = (hidemenu ? "hidemenu " : "")
    const larger_style = (larger ? "larger " : "");

    const autoMarginValue = window.innerWidth/2*-1;
    return (
    
      <MenuContext.Provider value={{ hidemenu, larger }}>
      <HeaderContainer />
      <ContentContainer active={this.props.isActive} className={`${scroll_style}${hidemenu_style}${larger_style}`} onScroll={this.handleScroll}>

        <BodyContainer>
          {this.props.children}
          <Footer />
        </BodyContainer>

      </ContentContainer>
    </MenuContext.Provider>
    )
  }
}
//margin:"0 auto",
export default ClientTemplate
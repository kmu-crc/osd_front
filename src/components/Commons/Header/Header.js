import React, { Component } from 'react'
import styled from 'styled-components'

import MenuContext from "Global/Context/GlobalContext"

// import SearchForm from "components/Commons/SearchForm"
// import Notification from "components/Commons/Notification"
// import Alarm from "components/Commons/Alarm"
import SignNav from "components/Commons/SignNav/SignNav"

import logo from "source/logo.png"
import zoom from "source/zoom.svg"
import alarm from "source/alarm.png"

// CSS
// const Head = styled.header``
// const MenuItem = styled.span``
const Menu = styled.div`
    z-index: 900;
    justify-content: space-between;
    height: 55px;
    background-color: #FFF;
    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 20px;
    color: #707070;
    width: 100%;
    position: fixed;
    display: flex;

    &.hidemenu{
        top: -55px;
        opacity: 0;
    }
    -webkit-transition: all 0.45s;
    -moz-transition: all 0.45s;
    -ms-transition: all 0.45s;
    -o-transition: all 0.45s;
    transition: all 0.45s;
`

class Header extends Component {
    static contextType = MenuContext
    render() {
        return (
            <Menu className={(this.context ? " hidemenu" : "")}>
                <ul className={"menu"} style={{ minWidth: "523px", margin: "0px", padding: "0px", listStyle: "none", display: "flex", lineHeight: "29px", verticalAlign: "top" }} >
                    <li style={{ minWidth: "55px", height: "55px", marginLeft: "10px" }}>
                        <a href="/"><img alt="logo" style={{ width: "55px", height: "55px" }} src={logo} /></a></li>
                    <li style={{ minWidth: "55px", height: "29px", marginLeft: "50px", marginTop: "11px" }}>
                        <a style={(window.location.pathname === '/design') ? { color: "red" } : { color: "#707070" }} href="/design">디자인</a></li>
                    <li style={{ minWidth: "37px", height: "29px", marginLeft: "50px", marginTop: "11px" }}>
                        <a style={(window.location.pathname === '/group') ? { color: "red" } : { color: "#707070" }} href="/group">그룹</a></li>
                    <li style={{ minWidth: "74px", height: "29px", marginLeft: "50px", marginTop: "11px" }}>
                        <a style={(window.location.pathname === '/designer') ? { color: "red" } : { color: "#707070" }} href="/designer">디자이너</a></li>
                </ul>
                <ul style={{ margin: "0px", padding: "0px", listStyle: "none", display: "flex", lineHeight: "29px", verticalAlign: "top" }} >
                    <li style={{ minWidth: "327px", height: "36px", marginRight: "47px", marginTop: "9px", border: "none" }}>
                        <input style={{ margin: "0 0", background: `url(${zoom})`, backgroundSize: "21.49px 21.49px", borderRadius: "20px", border: "1.5px solid #707070", backgroundRepeat: "no-repeat", backgroundPosition: "right 12.7px top 4px", textIndent: "10px", width: "327px", height: "36px" }} /></li>
                    <li style={{ width: "34px", height: "34px", marginRight: "47px", marginTop: "10px" }}>
                        <div style={{ background: `url(${alarm})`, width: "34px", height: "34px", backgroundSize: "100% 100%", opacity: ".5", backgroundRepeat: "no-repeat", backgroundPosition: "center center", border: "none" }} /></li>
                    <li style={{ minWidth: "97px", height: "29px", marginRight: "50px", marginTop: "11px" }}>
                        <div style={{ width: "100%", height: "100%", borderBottom: "1.5px solid red", color: "red" }}>디자인 등록</div></li>
                    <li style={{ minWidth: "55px", height: "29px", marginRight: "17px", marginTop: "11px" }}><SignNav /></li>
                </ul>
            </Menu>
        )
    }
}

export default Header

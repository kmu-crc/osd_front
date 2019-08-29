import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

// import Notification from "components/Commons/Notification"
// import Message from "components/Header/Message"
import logo from "source/logo.png"
import AlarmContainer from "containers/Header/AlarmContainer"
import SearchForm from "components/Header/SearchForm"
import SignNav from "components/Header/SignNav"
import Socket from "modules/Socket"

class Message extends Component {
    gotoMessagePage() {
        window.location.href = '/message'
    }
    render() {
        return (<div style={{ cursor: "pointer" }} onClick={this.gotoMessagePage}>
            {this.props.countMsg > 0 && <div style={{ zIndex: "998", position: "absolute", marginLeft: "29px", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "red" }} />}
            <i style={{ zIndex: "997", opacity: ".9", fontSize: "34px" }} className="material-icons">email</i>
        </div>)
    }
}
// CSS
const Menu = styled.div`
    z-index: 900;
    justify-content: space-between;
    height: 55px;
    background-color: #FFFFFF;
    font-family: Noto Sans KR;
    font-weight: 500;
    font-size: 20px;
    color: #707070;
    width: 100%;
    position: fixed;
    display: flex;
    &.hidemenu {
        top: -55px;
        opacity: 0;
    }
    -webkit-transition: all 0.45s;
    -moz-transition: all 0.45s;
    -ms-transition: all 0.45s;
    -o-transition: all 0.45s;
    transition: all 0.45s;
`
const DesignCreateBtn = styled.div`
    width: 100%;
    height: 100%;
    color: red;
    border-bottom: 1.5px solid red;
    cursor: pointer;
`
class Header extends Component {
    state = { noti: {}, }
    static contextType = MenuContext
    gotoCreateDesignPage() {
        window.location.href = "/createDesign"
    }
    componentDidMount() {
        if (this.props.valid) {
            try {
                Socket.emit("INIT", this.props.userInfo.uid)
                Socket.on("getNoti", noti => {
                    this.setState({ noti: noti })
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
    render() {
        return (
            <Menu className={(this.context.hidemenu ? " hidemenu" : "")}>
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
                    <li style={{ minWidth: "327px", height: "36px", marginRight: "50px", marginTop: "9px", border: "none" }}>
                        <SearchForm visible={window.location.href.search('/search') > -1 ? 0 : 1} /></li>
                    <li style={{ width: "34px", height: "34px", marginRight: "50px", marginTop: "10px" }}>
                        <Message /></li>
                    <li style={{ width: "34px", height: "34px", marginRight: "50px", marginTop: "10px" }}>
                        <AlarmContainer {...this.props} /></li>
                    <li style={{ minWidth: "97px", lineHeight: "29px", height: "29px", marginRight: "50px", marginTop: "11px" }}>
                        <DesignCreateBtn onClick={this.gotoCreateDesignPage}>디자인 등록</DesignCreateBtn></li>
                    <li style={{ minWidth: "55px", height: "29px", marginRight: "17px", marginTop: "11px" }}>
                        <SignNav {...this.props} /></li> {/* <SignNavContainer /> */}
                </ul>
            </Menu>
        )
    }
}

export default Header

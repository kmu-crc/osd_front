import React, { Component } from 'react'
import styled from 'styled-components'
import logo from "source/logo.png"
import SignNav from "components/Commons/SignNav/SignNav"
import SearchForm from "components/Commons/SearchForm"
import Notification from "components/Commons/Notification"
import Alarm from "components/Commons/Alarm"

// css
const Head = styled.header`
    margin: 0 auto;
    padding: 0px;
    width: 100%;
    height: 70px;
    position: fixed;
    z-index: 100;
    color: #707070;
    background-color: #FFFFFF;
    font-size: 20px;
    font-family: "Noto Sans KR";
`
const Menu = styled.div`
    height: 70px;
    border: 1px solid red;
    margin: 0 auto;
    padding: 0 auto;
    width: 100%;
    display: flex;
`
const MenuItem = styled.span`
    position:relative;
    height: 29px;
    font-family: "Noto Sans KR";
    top: 11px;
    border: 1px solid red;
    margin-right: 50px;
    a {
        font-size: 20px;
        font-weight: normal;
        color: #707070;
        &:hover {color: #E72327;}
    }
    a.active{color: #FF0000;}
    &.special_btn > a{
        color: #FF0000 !important;
        padding: 0 auto;
        border-bottom: 1.5px solid red;
    }
    &.left { margin-right: 50px;}
    &.first { top: 0px; margin-left: 10px; height:55px; }
    &.right { margin-left: auto;}
`
// &.toRight{ }
const Logo = styled.div`
    height: 55px;
    width: 55px;
    background-image: url(${logo});
    background-size: cover;
`

class Header extends Component {

    render() {
        return (
            <Head>
                <Notification count={0} />
                <Menu>
                    <MenuItem className="first"><a href="/"><Logo /></a></MenuItem>
                    <MenuItem className="left"><a href="/design">디자인</a></MenuItem>
                    <MenuItem className="left"><a href="/group">그룹</a></MenuItem>
                    <MenuItem className="left"><a href="/designer">디자이너</a></MenuItem>
                    <MenuItem className="right"><SearchForm /></MenuItem>
                    <MenuItem className=""><Alarm alarms={{ count: 1 }} /></MenuItem>
                    <MenuItem className=" special_btn"><a href="/createDesign">디자인등록</a></MenuItem>
                    <MenuItem className=" last"><SignNav nickname={"jinna"} /></MenuItem>
                </Menu>
            </Head>
        )
    }
}

export default Header

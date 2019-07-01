import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from "source/logo.png"
import SignNav from "components/Commons/SignNav/SignNav"
import SearchForm from "components/Commons/SearchForm"
import Notification from "components/Commons/Notification"
import Alarm from "components/Commons/Alarm"

// css
const Head = styled.header`
    margin: 0 auto;
    width: 100%;
    top: 0px;
    position: fixed;
    z-index: 100;
    color: #707070;
    background-color: #FFFFFF;
    justify-content: space-between;
    font-size: 20px;
    font-family: "Noto Sans KR";
`
const Menu = styled.ul`
    margin: 0 auto;
    height: 70px;
    width: 100%;
    display: flex;
    list-style: none;
    vertical-align: middle;
    &.toleft{
       align: left; 
    }
`
const MenuItem = styled.li`
    margin-right: 50px;
    height: 29px;
    font-family: "Noto Sans KR";
    a {
        font-size: 15px;
        font-weight: normal;
        color: #707070;
        &:hover {
            color: #E72327;
        }
    }
    a.active{
        color: #FF0000;
    }
    &.special_btn > a{
        color: #FF0000 !important;
        border-bottom: 1px solid red;
    }
    &.left_menu {
    }
    &.right_menu {
    }
`
const Logo = styled.div`
    height: 55px;
    width: 55px;
    padding: 0 0 0 0;
    margin: 0 auto;
    position: relative;
    background-image: url(${logo});
    background-size: cover;
`


class Header extends Component {
    render() {
        return (
            <Head>
                <Notification count={0} />
                <Menu>
                    <div style={{ display: "flex", alignContent: "flex-start" }}>
                        <MenuItem><a href="/"><Logo /></a></MenuItem>
                        <MenuItem><a href="/design">디자인</a></MenuItem>
                        <MenuItem><a href="/group">그룹</a></MenuItem>
                        <MenuItem><a href="/designer">디자이너</a></MenuItem>
                    </div>
                    <div style={{ display: "flex", alignContent: "flex-end" }}>
                        <MenuItem><SearchForm /></MenuItem>
                        <MenuItem><Alarm alarms={{ count: 2, ary: [{ id: 0, content: "0test" }, { id: 1, content: "1test" }] }} /></MenuItem>
                        <MenuItem className="special_btn"><a href="/createDesign">디자인등록</a></MenuItem>
                        <MenuItem><SignNav nickname={"진아진아진아"} /></MenuItem>
                    </div>
                </Menu>
            </Head>
        )
    }
}

export default Header

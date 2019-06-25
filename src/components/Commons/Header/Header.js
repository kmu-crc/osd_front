import React, { Component } from 'react'
import styled from 'styled-components'
import logo from "source/logo.png"
import ContentBox from "components/Commons/ContentBox"

// css
const Head = styled.header`
    width: 100%;
    height: 55px;
    top: 0px;
    position: fixed;
    z-index: 100;
    color: #707070;
    background-color:#FFFFFF;
    justify-content: space-between;
    a {
        font-weight: normal;
        color: #707070;
        &:hover {
            color: #E72327;
        }
    }
    font-size: 20px;
    font-family: "Noto Sans KR";
`
const Content = styled(ContentBox)`
    position: absolute;
`
const Logo = styled.a`
    height: 55px;
    width: 55px;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    background-image: url(${logo});
    background-size: cover;
`
class Header extends Component {
    render() {
        return (
            <Head>
                <Content>
                    <Logo />
                    <a href="/design">디자인</a>
                    <a href="/group">그룹</a>
                    <a href="/designer">디자이너</a>
                    <a href="/createDesign">디자인등록</a>
                    <a href="/search">검색</a>
                </Content>
            </Head>
        )
    }
}

export default Header
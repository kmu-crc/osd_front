import React, { Component } from 'react'
import styled from 'styled-components'
import logo from "source/logo.png"
import ContentBox from "components/Commons/ContentBox"

// todo:
class Alarm extends Component {
    state = {}
    render() {
        const { alarms } = this.props
        return (alarms ? <div>alarm</div> : <div>_alarm</div>)
    }
}
// todo: 
class Notification extends Component {
    state = {}
    render() {
        return (<div>a</div>)
    }
}
// todo: 
class Sign extends Component {
    state = {}
    render() {
        return (<div>a</div>)
    }
}
// css
const Head = styled.header`
    width: 100%;
    top: 0px;
    position: fixed;
    z-index: 100;
    color: #707070;
    background-color:#FFFFFF;
    justify-content: space-between;
    font-size: 20px;
    font-family: "Noto Sans KR";
    a {
        font-weight: normal;
        color: #707070;
        &:hover {
            color: #E72327;
        }
    }
`
const Content = styled(ContentBox)`
    position: absolute;
`
const Menu = styled.ul`
    height: 70px;
    width: 100%;
    display: flex;
    list-style: none;
`
// justify-content: space-between;
// align-items: center;
const MenuItem = styled.li`
    padding: 0 0 0 0;
    margin-right: 50px;
    height: 29px;
    a.active{
        color: #FF0000;
    }
    &.special_btn{
        color: #FF0000 !important;
        text-decoration: underline;
    }
`
const Logo = styled.a`
    height: 55px;
    width: 55px;
    top: 0px;
    left: 10px;
    padding: 0 0 0 0;
    position: absolute;
    background-image: url(${logo});
    background-size: cover;
`
class Header extends Component {
    render() {
        return (
            <Head>
                <Content>
                    <Menu>
                        <MenuItem>
                            <Logo href="/" />
                        </MenuItem>
                        <MenuItem>
                            <a href="/design">디자인</a>
                        </MenuItem>
                        <MenuItem>
                            <a href="/group">그룹</a>
                        </MenuItem>
                        <MenuItem>
                            <a href="/designer">디자이너</a>
                        </MenuItem>
                        <MenuItem>
                            <input style={{ width: "100px" }} />
                        </MenuItem>
                        <MenuItem>
                            <Alarm alarms={{ count: 1, ary: [{ id: 1, content: "test" }] }} />
                        </MenuItem>
                        <MenuItem className="special_btn">
                            <a href="/createDesign">디자인등록</a>
                        </MenuItem>
                    </Menu>
                </Content>
            </Head>
        )
    }
}

export default Header

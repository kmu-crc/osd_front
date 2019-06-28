import React, { Component } from 'react'
import styled from 'styled-components'
import logo from "source/logo.png"
// import ContentBox from "components/Commons/ContentBox"
import { Input, Icon } from 'semantic-ui-react'

// todo:
class Alarm extends Component {
    state = {}
    render() {
        const { alarms } = this.props
        return (alarms ? <div><Icon name='alarm' /></div> : <div>_alarm</div>)
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
const SearchContainer = styled.div`
    width: 327px;
    height: 36px;
    margin: 0 auto;
    border: 1.5px solid #707070;
    border-radius: 20px;
    box-shadow: 0px 0px #888888;
    justfy-content: space-between;
    padding-left: 12.7px;
    input {
        focus:0;
        border: none;
    }
    .search-icon {
        paddding-top: 6.11px;
        width: 21.49px;
        height: 21.49px;
    }
    `
// right: 12.7px;
class Search extends Component {
    state = {}
    _search = () => { }
    _handleKeyDown = (e) => {

        if (e.key === 'Enter') {
            console.log('Enter')
        }
    }
    render() {
        return (<SearchContainer onKeyDown={this._handleKeyDown}>
            <input type="text" placeholder="Search..." />
            <Icon onClick={this._search} className="search-icon" name="search" />
        </SearchContainer>)
    }
}
// todo: 
const SignComponent = styled.div`
    font-size: 15px;
    img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 0px;
        background-color: #D6D6D6;
    }
`
class Sign extends Component {
    state = {}
    render() {
        return (
            <SignComponent>
                <img />
                {this.props.nickname}
            </SignComponent>
        )
    }
}

// css
// width: 100%;
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
`
// const Content = styled(ContentBox)`
// position: absolute;
// `
// display: flex;

const Menu = styled.ul`
    height: 70px;
    width: 100%;
    display: block;
    list-style: none;
    &.toleft{
       align: left; 
    }
`
// justify-content: space-between;
// align-items: center;
const MenuItem = styled.li`
    padding: 0 0 0 0;
    margin-right: 50px;
    height: 29px;
    display: inline-block;
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
                {/* <Content> */}
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
                        <Search />
                    </MenuItem>
                    <MenuItem>
                        <Alarm alarms={{ count: 1, ary: [{ id: 1, content: "test" }] }} />
                    </MenuItem>
                    <MenuItem className="special_btn">
                        <a href="/createDesign">디자인등록</a>
                    </MenuItem>
                    <MenuItem>
                        <Sign nickname={"진아진아진아"} />
                    </MenuItem>
                </Menu>
                {/* </Content> */}
            </Head>
        )
    }
}

export default Header

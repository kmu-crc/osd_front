import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "source/logo.png";
import { SetSession } from "modules/Sessions";
import { Grid, Icon } from 'semantic-ui-react'

// css styling
const Head = styled.header`
  width: 100%;
  height: 60px;
  color: white;
  background-color: #191919;
`

const HeaderGrid = styled(Grid) `
  height: 100%;
`

const Logo = styled.a`
  height: 50px;
  position: absolute;
  display:block;
  top: 0;
  img{
    height: 100%;
  }
`

const Button = styled.button`
  color: white;
`

const Nav = styled.ul`
  width: 400px;
  margin: 0 auto;
  height: 100%;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const NavUserInterface = styled.div`
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &::after{
    display: block;
    content: "";
    clear: both;
  }
`
const NavItem = styled.div`
  text-align: right;
  margin-left: 20px;
`

class Header extends Component {
  handleSignOut = () => {
    this.props.SignOutRequest();
    SetSession("opendesign_token", null).then(data => {
      console.log("setsession", data);
      window.location.reload();
    }
    );
    console.log(this.props)
  }
  render() {
    const LoginNav = () => {
      return (
        <NavUserInterface>
          <NavItem><a href="/mypage">{this.props.userInfo.nickName}</a></NavItem>
          <NavItem><button onClick={this.handleSignOut}>SignOut</button></NavItem>
        </NavUserInterface>
      )
    }

    const LogOutNav = () => {
      return (
        <NavUserInterface>
          <NavItem><a href="/signin">SignIn</a></NavItem>
          <NavItem><a href="/signup">SignUp</a></NavItem>
        </NavUserInterface>
      )
    }
    return (
      <Head>
        <HeaderGrid padded={true}>
          <Grid.Column width={3}>
            <Logo href="/">
              <img src={logo} alt="logo" />
            </Logo>
          </Grid.Column>
          <Grid.Column width={10}>
            <Nav>
              <li><a href="/design">디자인</a></li>
              <li><a href="/group">그룹</a></li>
              <li><a href="/designer">디자이너</a></li>
              <li><a href="/createdesign"><Button className="red">디자인 등록</Button></a></li>
            </Nav>
          </Grid.Column>
          <Grid.Column width={3}>
            <NavUserInterface>
              <NavItem><a href="/"><Icon name="search" /></a></NavItem>
              {this.props.valid
                ? <LoginNav />
                : <LogOutNav />
              }
            </NavUserInterface>
          </Grid.Column>
        </HeaderGrid>
      </Head>
    );
  }
}

export default Header;

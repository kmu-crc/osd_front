import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "source/logo.png";
import { SetSession } from "modules/Sessions";
import { Grid } from 'semantic-ui-react'

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

const Logo = styled.img`
  height: 50px;
  position: absolute;
  top: 0;
  left: 2rem;
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
const NavUserInterface = styled.ul`
  color: white;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: right;
  li{
    text-align: right;
  }
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
          <li><a href="/mypage">{this.props.userInfo.nickName}</a></li>
          <li><button onClick={this.handleSignOut}>SignOut</button></li>
        </NavUserInterface>
      )
    }

    const LogOutNav = () => {
      return (
        <NavUserInterface>
          <li><a href="/signin">SignIn</a></li>
          <li><a href="/signup">SignUp</a></li>
        </NavUserInterface>
      )
    }
    return (
      <Head>
        <HeaderGrid padded={true}>
          <Grid.Column width={3}>
            <NavLink to="/">
              <Logo src={logo} />
            </NavLink>
          </Grid.Column>
          <Grid.Column width={10}>
            <Nav>
              <li><a href="/design">디자인</a></li>
              <li><a href="/group">그룹</a></li>
              <li><a href="/designer">디자이너</a></li>
              <li><a href="/createdesign"><Button className="red">디자인 등록</Button></a></li>
            </Nav>
          </Grid.Column>
          <Grid.Column width={3} textAlign="right">
            {this.props.valid
              ? <LoginNav />
              : <LogOutNav />
            }
          </Grid.Column>
        </HeaderGrid>
      </Head>
    );
  }
}

export default Header;

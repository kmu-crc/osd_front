import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../../logo.png";
import { SetSession } from "../../modules/Sessions";
import { Container, Row, Columns } from "../Grid";

// css styling
const Head = styled.header`
  width: 100%;
  height: 60px;
  background-color: #191919;
`

const Logo = styled.img`
  height: 50px;
`
const NavContainer = Container.extend`
  height: 100%;
`

const NavColumns = Columns.extend`
  height: 100%;
`

const NavRow = Row.extend`
  height: 100%;
`

const Button = styled.button`
  color: white;
`

const Nav = styled.ul`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const NavUserInterface = styled.ul`
  color: white;
  li{
    float: right;
  }
`

class Header extends Component {
  handleSignOut = () => {
    this.props.SignOutRequest();
    SetSession("opendesign_token", null).then( data => {
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
          <li><NavLink to="/signin">kwonjounghun</NavLink></li>
          <li><button onClick={this.handleSignOut}>SignUp</button></li>
        </NavUserInterface>
      )
    }

    const LogOutNav = () => {
      return (
        <NavUserInterface>
          <li><NavLink to="/signin">SignIn</NavLink></li>
          <li><NavLink to="/signup">SignUp</NavLink></li>
        </NavUserInterface>
      )
    }
    return (
      <Head>
        <NavContainer container={true}>
          <NavRow>
            <NavColumns xs={2} sm={4} width={4}>
              <NavLink to="/">
                <Logo src={logo} />
              </NavLink>
            </NavColumns>
            <NavColumns xs={8} sm={5} width={4}>
              <Nav>
                <li><NavLink to="/design">디자인</NavLink></li>
                <li><NavLink to="/group">그룹</NavLink></li>
                <li><NavLink to="/designer">디자이너</NavLink></li>
                <li><Button className="red"><NavLink to="/createdesign">디자인 등록</NavLink></Button></li>
              </Nav>
            </NavColumns>
            <Columns xs={2} sm={3} width={4}>
              <NavUserInterface>
                {this.props.valid
                  ? <LoginNav />
                  : <LogOutNav />
                }
              </NavUserInterface>

            </Columns>
          </NavRow>
        </NavContainer>
      </Head>
    );
  }
}

export default Header;

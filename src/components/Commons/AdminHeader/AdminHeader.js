import React, { Component } from "react";
import styled from "styled-components";
import logo from "source/logo.png";
import { SetSession } from "modules/Sessions";
import { Icon } from "semantic-ui-react";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";


// css styling
const Head = styled.header`
  width: 100%;
  height: 60px;
  top: 0;
  position: fixed;
  z-index: 100;
  color: ${StyleGuide.color.geyScale.scale9};
  background-color: #fff;
  box-shadow: 0 1px 1px 1px #e1e4e6;
  a {
    font-weight: normal;
    &:hover {
      color: ${StyleGuide.color.main.basic};
    }
  }
`;

const Content = styled(ContentBox)`
  position: relative;
`;

const MainMenu = styled.ul`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-left: 100px;
  list-style: none;
`;

const MenuItem = styled.li`
  float: left;
  a {
    line-height: 60px;
  }
  a.active {
    color: ${StyleGuide.color.main.basic};
  }
`;

const SubMenu = styled.div`
  display: block;
  position: absolute;
  width: 300px;
  height: 100%;
  right: 0;
  top: 0;
  line-height: 60px;
  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;

const SubMenuGroup = styled.div`
  .submenu-item {
    & > a,
    & > button {
      margin: 0 1rem;
    }
  }
`;

const SubMenuItem = styled.div`
  float: left;
  position: relative;
  & > input {
    display: block;
    border: 1px solid #e9e9e9;
    border-radius: 2em;
    padding: 0.5em 1em;
    position: absolute;
    top: 50%;
    /* right: 2vw; */
    transform: translate(-100%, -50%);
    -ms-transform: translate(-100%, -50%);
    @media only screen and (max-width: 1200px) {
      display: none;
    }
  }
  & a {
    line-height: 60px;
  }

  & > button {
    position: relative;
    padding: 0;
    border: 0;
    background-color: transparent;
    outline: 0;
  }
`;

const Logo = styled.a`
  height: 60px;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 60px;
  background-image: url(${logo});
  background-position: 50% 500%;
  background-size: 70px;
`;

const UserInterface = styled.div`
  width: 155px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;
const UserItem = styled.div`
  text-align: right;
  & .logOutNavLink {
    margin: 0 0.5rem;
  }
`;

const UserBtn = styled.button`
  color: ${StyleGuide.color.geyScale.scale9};
  text-align: right;
  vertical-align: top;
  /* margin-left: 20px; */
  width: 100%;
  padding: 0;
  height: 60px;
  line-height: 60px;
  padding-left: 55px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  border: 0;
  .userIcon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    display: block;
    width: 25px;
    height: 25px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 50%;
  }
  &.active {
    background-color: ${StyleGuide.color.geyScale.scale3};
  }
`;

const UserMenuDimm = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  top: 0;
  left: 0;
  background: 0 0;
`;

const UserMenu = styled.ul`
  display: block;
  position: absolute;
  pointer-events: auto;
  top: 60px;
  right: 0;
  z-index: 1000;
  width: 150px;
  background-color: ${StyleGuide.color.geyScale.scale0};
  border: 1px solid ${StyleGuide.color.geyScale.scale2};
  box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
`;

const UserMenuItem = styled.li`
  text-align: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale2};
  box-sizing: border-box;
  line-height: 50px;
  &:hover {
    background-color: ${StyleGuide.color.geyScale.scale2};
  }
  a {
    line-height: 50px;
    display: block;
    width: 100%;
    height: 100%;
    &:hover {
      color: ${StyleGuide.color.geyScale.scale9};
    }
  }
`;

const LogOutBtn = styled.button`
  background-color: transparent;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: ${StyleGuide.color.geyScale.scale9};
`;

class AdminHeader extends Component {
  state = {
    profile: false,
    active: false,
    keyword: null,
    noti: {}
  };

  componentDidMount() {
  }

  handleSignOut = async () => {
    SetSession(null).then(data => {
      console.log("setsession", data);
      this.props.AdminSignOutRequest();
      this.props.history.push("/adminSignIn");
    });
  };

  onActive = e => {
    const event = e;
    event.stopPropagation();
    let target = event.currentTarget;
    let active = this.props.isActive;
    if (active === "INIT" || active !== "MENU") {
      active = "MENU";
    } else if (active === "MENU") {
      active = "INIT";
    }
    console.log("onactive", active);
    this.props.SetActive(active, target);
  };

  saveKeyWord = e => {
    const target = e.target;
    const word = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!word.match(regExp)) {
      alert("특수문자는 사용할 수 없습니다.");
      target.value = "";
      return;
    } else {
      this.setState({
        keyword: word
      });
    }
  };

  submitEnter = e => {
    if (e.keyCode === 13) {
      document.getElementById("searchLink").click();
    }
  };

  render() {
    const LoginNav = () => {
      return (
        <UserInterface>
          <UserItem>
            <UserBtn onClick={this.onActive} className={`openMenu ${this.props.active === "MENU" && "active"}`}>
              <div className="userIcon" style={{ backgroundImage: `url(${logo})` }} onError={this.noneImage} />
            </UserBtn>
            <UserMenuDimm style={{ display: `${this.props.active === "MENU" ? "block" : "none"}` }}>
              <Content>
                <UserMenu>
                  <UserMenuItem>
                    <LogOutBtn onClick={this.handleSignOut}> <Icon name="log out" /> 로그아웃 </LogOutBtn>
                  </UserMenuItem>
                </UserMenu>
              </Content>
            </UserMenuDimm>
          </UserItem>
        </UserInterface>
      )
    }

    const LogOutNav = () => {
      return (
        <UserInterface>
          <UserItem>
            <a href="/adminSignin" className="logOutNavLink">로그인</a>
          </UserItem>
        </UserInterface>
      )
    }

    return (
      <Head>
        <Content>
          <MainMenu>
            <Logo href="/" />
            <MenuItem>
              <a href="/noticeManager">공지사항</a>
            </MenuItem>
            <MenuItem>
              <a href="/hotdesignManager">인기아이템</a>
            </MenuItem>
            <MenuItem>
              <a href="/hotgroupManager">인기그룹</a>
            </MenuItem>
            <MenuItem>
              <a href="/designManager">아이템</a>
            </MenuItem>
            <MenuItem>
              <a href="/groupManager">그룹</a>
            </MenuItem>
            <MenuItem>
              <a href="/designerManager">디자이너</a>
            </MenuItem>
          </MainMenu>
          <SubMenu>
            <SubMenuGroup>
              {/* {this.props.admin_valid && (
                <div>
                  <SubMenuItem className="submenu-item">
                    {/* <Alram noti={this.state.noti} valid={this.props.valid} socket={Socket} /> * /}
                  </SubMenuItem>
            <SubMenuItem className="submenu-item">
              <Icon name="envelope" />
            </SubMenuItem>
                </div>
              )} */}
            </SubMenuGroup>
            <SubMenuItem>
              {this.props.admin_valid ? <LoginNav /> : <LogOutNav />}
            </SubMenuItem>
          </SubMenu>
        </Content >
      </Head >
    );
  }
}

export default AdminHeader;

import React, { Component } from "react";
import styled from "styled-components";
import MenuContext from "Global/Context/GlobalContext";

import SearchForm from "components/Header/SearchForm";
import Socket from "modules/Socket";

import {
  LoginText,
  CreateDesign,
  DeleteDesign,
  CreateDesigner,
  CreateGroup,
} from "constant";
import mobilelogored from "resources/images/mobile_logo.svg";
import mobilelogoblue from "resources/images/mobile_header_log_blue.svg";
// import mobilesearch from "resources/images/mobile_search_icon.svg";
import { isOpen } from "constant";

const MobileHeaderMenu = styled.ul`
  z-index: 8888;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: ${window.innerWidth}px;
  padding: 0px;
  margin: 0px;
`;
const MenuElement = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;

  &.logo {
    border: none;
    margin: 6px 11px 7px 8px;
    width: 61px;
    height: 25px;
    img {
      border: none;
      object-fit: cover;
    }
  }

  &.search {
    margin: 9px 5px 8px 0px;
    width: 199px;
  }

  &.login-button {
    margin: 9px 8px 9px 0px;
    width: 67px;
    height: 21px;
    border-radius: 10px;
    border: red;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
      font-weight: 500;
      color: white;
      text-align: center;
      line-height: 14px;
      font-size: 10px;
    }
  }

  &.create-design-button {
    margin: 9px 8px 9px 0px;
    width: 67px;
    height: 21px;
    border-radius: 10px;
    border: red;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
      font-weight: 500;
      color: white;
      text-align: center;
      line-height: 14px;
      font-size: 10px;
    }
  }
  &.create-group-button {
    background-color: #1e9b79;
  }
  &.create-designer-button {
    margin: 9px 8px 9px 0px;
    width: 67px;
    height: 21px;
    border-radius: 10px;
    border: red;
    background-color: #39280b;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
      font-weight: 500;
      color: white;
      text-align: center;
      line-height: 14px;
      font-size: 10px;
    }
  }
`;

// const isOpen = ws => ws.readyState === ws.OPEN;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarm: {},
      selectCate: -1,
      screenWidth: window.innerWidth,
    };
  }
  static contextType = MenuContext;
  componentDidMount() {
    if (isOpen(Socket) && this.props.valid) {
      try {
        if (isOpen(Socket)) Socket.emit("INIT", this.props.userInfo.uid);
        Socket.on("getNoti", (alarm) => {
          this.setState({ alarm: alarm });
          // console.log(alarm)
          if (alarm.count) {
          }
        });
        Socket.on("disconnect", () => { });
      } catch (err) {
        console.error(err);
      }
    }
    window.addEventListener("resize", this.handleResize, false);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.userInfo != null &&
      nextProps.userInfo != null &&
      this.props.userInfo.uid != null &&
      nextProps.userInfo.uid != null
    ) {
      if (this.props.userInfo.uid !== nextProps.userInfo.uid) {
        window.history.go(0);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }
  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  render() {
    // console.log(window.location.href.toLowerCase(), window.location.href.toLowerCase().indexOf("/aboutIntro"));

    const pathname = window.location.pathname.toLowerCase();
    // href.toLowerCase();
    console.log({ pathname });

    return (
      <MobileHeaderMenu>
        {/* 로그 */}
        <a href="/">
          <MenuElement className="logo">
            {/* const location = window.location.pathname.toLowerCase().split("/"); */}
            {window.location.pathname.toLowerCase() === "/design" ||
              window.location.pathname.toLowerCase() === "/createdesign" ? (
              <img src={mobilelogoblue} />
            ) : (
              <img src={mobilelogored} />
            )}
          </MenuElement>
        </a>

        {/* 검색 */}
        <MenuElement className="search">
          <SearchForm
            {...this.props}
            // formWidth={170}
            searchCategory={this.state.selectCate}
            visible={1}
          />
        </MenuElement>
        {/* 로그인 / 디자인 등록 */}
        {this.props.userInfo == null ? ( //유저정보o
          <a onClick={() => this.props.onClickLogin()}>
            <MenuElement className="login-button">
              <p className="text">{LoginText}</p>
            </MenuElement>
          </a>
        ) : window.location.href.toLowerCase().indexOf("designModify") != -1 ? (
          <a onClick={() => alert("delete design")}>
            <MenuElement className="create-design-button">
              <p className="text">{LoginText}</p>
            </MenuElement>
          </a>
        ) : pathname.indexOf("createdesign") != -1 ? (
          <a onClick={() => alert("delete design")}>
            <MenuElement className="create-design-button">
              <p className="text">{DeleteDesign}</p>
            </MenuElement>
          </a>
        ) : window.location.href.toLowerCase().indexOf("aboutintro") != -1 ? (
          <MenuElement className="create-designer-button">
            <a onClick={() => (window.location.href = "/createdesigner")}>
              <p className="text">{CreateDesigner}</p>
            </a>
          </MenuElement>
        ) : pathname === "/group" || pathname === "/group/" ? (
          <a onClick={() => (window.location.href = "/creategroup")}>
            <MenuElement className="create-design-button create-group-button ">
              <p className="text">{CreateGroup}</p>
            </MenuElement>
          </a>
        ) : (
          <a onClick={() => (window.location.href = "/createdesign")}>
            <MenuElement className="create-design-button">
              <p className="text">{CreateDesign}</p>
            </MenuElement>
          </a>
        )}
        {/* {this.props.userInfo

                ?
                window.location.href.toLowerCase().indexOf("/createdesign") >0
                    ? <a onClick={() => alert("delete design")}>
                        <MenuElement className="create-design-button">
                            <p className="text">
                                {DeleteDesign}
                            </p>
                        </MenuElement>
                    </a>
                    : 
                    window.location.href.toLowerCase().indexOf("/aboutIntro") >0
                    ?<a onClick={() => window.location.href = "/createdesigner"}>
                        <MenuElement className="create-designer-button">
                            <p className="text">
                                {CreateDesigner}
                            </p>
                        </MenuElement>
                    </a>
                    :
                    <a onClick={() => window.location.href = "/createdesign"}>
                        <MenuElement className="create-design-button">
                            <p className="text">
                                {CreateDesign}
                            </p>
                        </MenuElement>
                    </a>

                : <a onClick={() => this.props.onClickLogin()}>
                    <MenuElement className="login-button">
                        <p className="text">
                            {LoginText}
                        </p>
                    </MenuElement>
                </a>} */}
      </MobileHeaderMenu>
    );
  }
}

export default Header;

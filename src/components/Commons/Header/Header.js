import React, { Component } from "react";
import styled from "styled-components";
import Zoom from "source/baseline_search_black_48dp.png";
// import logo from "source/logo.png";
// import ContentBox from "components/Commons/ContentBox";
// import Socket from "modules/socket";
// import StyleGuide from "StyleGuide";
// import Button from "components/Commons/Button";
// import { SetSession } from "modules/Sessions";
// import host from "config";
// import Alarm from "./Alarm";
// import Notice from "./Notice";
// import NumberFormat from "modules/NumberFormat";

const LogoWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: Noto Sans KR;
  width: 200px;
  .over {
    border: 1px solid red;
    background: #F00;
    height: 43px;
    .text {
      width: max-content;
      height: 29px;
      line-height: 29px;
      margin-left: 8px;
      margin-top: 5px;
      color: #FFF;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0px;
    }
  }
  .under {
    height: 32px;
    .text {
      width: 180px;
      margin-top: 6px;
      margin-left: 10px;
      color: #F00;
      font-weight: 500;
      font-size: 15px;
      text-align: center;
      line-height: 22px;
      letter-spacing: 24px;
    }
  }
`;
const Logo = () => <React.Fragment>
  <LogoWrapper>
    <div className="over">
      <div className="text">Opensource Design</div>
    </div>
    <div className="under">
      <div className="text">MARKET</div>
    </div>
  </LogoWrapper>
</React.Fragment>

const HeaderContainer = styled.ul`
  display: flex;
  flex-direction: row;
`;
const HeaderItem = styled.li`
  margin-left: 50px;
  margin-top: 7px; 
  width: max-content;
  min-width: max-content;
  height: 29px;
  text-align: left;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #000000;
  opacity: 1;
  cursor: default;
  &.first {
    margin-left: 0px;
    margin-top: 0px;
  }
  &.left {
    margin-left: auto;
  }
  &.cart {
    margin-left: 35px;
    margin-right: 12px;
    .red-circle {
      position: absolute;
      font-size: 8px;
      margin-left: 20px;
      line-height: 12px;
      text-align: center;
      color: #FFF;
      width: 15px;
      height: 15px;
      background: #F00;
      border-radius: 50%;
    }
  }
  &.search {
    margin-top: 0px;
    width: 554px;
    min-width: 554px;
    height: 43px;
    background: #E9E9E9;
    border-radius: 21px;
    position: relative;
    .search-icon-wrapper {
      .input-style {
        width: 100%;
        height: 43px;
        padding-left: 14px;
        padding-right: 45px;
        border: none;
        background: transparent;
      }
      .search-icon {
        position: absolute;
        top: 4px;
        right: 14px;
        width: 35px;
        height: 35px;
        opacity: .3;
      }
    }
  }

`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, }
  }
  render() {
    return (
      <HeaderContainer>
        <HeaderItem className="first">
          <Logo /></HeaderItem>
        <HeaderItem>디자이너</HeaderItem>
        <HeaderItem>메이커</HeaderItem>
        <HeaderItem>아이템</HeaderItem>
        <HeaderItem>게시판</HeaderItem>
        <HeaderItem className="left search">
          <div className="search-icon-wrapper">
            <input className="input-style" />
            <img alt="icon" src={Zoom} className="search-icon" /></div>
        </HeaderItem>
        <HeaderItem>로그인</HeaderItem>
        <HeaderItem className="cart">
          <div className="red-circle">
            <div style={{ width: "4", height: "12px" }}>1</div></div>
          <i style={{ width: "29px", height: "29px" }} className="cart icon" />
        </HeaderItem>
      </HeaderContainer>
    )
  };
}

export default Header;

// CSS STYLE //
// const Head = styled.header`
//   width: 100%;
//   height: 60px;
//   top: 0;
//   position: fixed;
//   z-index: 100;
//   color: ${StyleGuide.color.geyScale.scale9};
//   background-color: #fff;
//   box-shadow: 0 1px 1px 1px #e1e4e6;
//   a {
//     font-weight: normal;
//     &:hover {
//       color: ${StyleGuide.color.main.basic};
//     }
//   }
// `;
// const Content = styled(ContentBox)`
//   // position: relative;
// `;
// const Menu = styled.div`
//   display: flex;
//   flex-direction: row;
// `;
// const MenuWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;
// const MenuItem = styled.div`
//   width: max-content;
//   padding: 0px 10px;
//   a {
//     line-height: 60px;
//   }
//   a.active {
//     color: ${StyleGuide.color.main.basic};
//   }
// `;
// const SubMenuItem = styled.div`
//   float: left;
//   position: relative;
//   & > input {
//     display: block;
//     border: 1px solid #e9e9e9;
//     border-radius: 2em;
//     padding: 0.5em 1em;
//     position: absolute;
//     top: 50%;
//     /* right: 2vw; */
//     transform: translate(-100%, -50%);
//     -ms-transform: translate(-100%, -50%);
//     @media only screen and (max-width: 1200px) {
//       display: none;
//     }
//   }
//   & a {
//     line-height: 60px;
//   }
//   & > button {
//     position: relative;
//     padding: 0;
//     border: 0;
//     background-color: transparent;
//     outline: 0;
//   }
// `;
// const Logo = styled.a`
//   width: 60px;
//   height: 60px;
//   display: block;
//   background-image: url(${logo});
//   background-size: cover;
//   background-position: 50%;
// `;
// const UserInterface = styled.div`
//   width: max-content;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   &::after {
//     display: block;
//     content: "";
//     clear: both;
//   }
// `;
// const UserItem = styled.div`
//   text-align: right;
//   & .logOutNavLink {
//     margin: 0 5px;
//   }
// `;
// const UserBtn = styled.button`
//   color: ${StyleGuide.color.geyScale.scale9};
//   text-align: right;
//   vertical-align: top;
//   /* margin-left: 20px; */
//   width: 100%;
//   padding: 0;
//   height: 60px;
//   line-height: 60px;
//   padding-left: 55px;
//   padding-right: 20px;
//   box-sizing: border-box;
//   background-color: transparent;
//   position: relative;
//   border: 0;
//   .userIcon {
//     position: absolute;
//     top: 50%;
//     left: 20px;
//     transform: translateY(-50%);
//     display: block;
//     width: 25px;
//     height: 25px;
//     background-position: center;
//     background-size: cover;
//     overflow: hidden;
//     border-radius: 50%;
//   }
//   &.active {
//     background-color: ${StyleGuide.color.geyScale.scale3};
//   }
// `;
// const UserMenuDimm = styled.div`
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   pointer-events: none;
//   top: 0;
//   left: 0;
//   background: 0 0;
// `;
// const UserMenu = styled.ul`
//   display: block;
//   position: absolute;
//   pointer-events: auto;
//   top: 60px;
//   right: 0;
//   z-index: 1000;
//   width: 150px;
//   background-color: ${StyleGuide.color.geyScale.scale0};
//   border: 1px solid ${StyleGuide.color.geyScale.scale2};
//   box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
// `;
// const UserMenuItem = styled.li`
//   text-align: center;
//   width: 100%;
//   height: 50px;
//   border-bottom: 1px solid ${StyleGuide.color.geyScale.scale2};
//   box-sizing: border-box;
//   line-height: 50px;
//   &:hover {
//     background-color: ${StyleGuide.color.geyScale.scale2};
//   }
//   a {
//     line-height: 50px;
//     display: block;
//     width: 100%;
//     height: 100%;
//     &:hover {
//       color: ${StyleGuide.color.geyScale.scale9};
//     }
//   }
// `;
// const LogOutBtn = styled.button`
//   background-color: transparent;
//   border: 0;
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   color: ${StyleGuide.color.geyScale.scale9};
// `;
// const AlarmLabel = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   margin-top: -30px;
//   margin-left: 10px;
//   color: white;
//   background-color: red;
//   border-radius: 15px;
//   line-height: 30px;
//   text-align: center;
//   font-size: 16px;
//   vertical-align: middle;
//   padding-top: 2px;
//   transform: scale(0.6);
//   -ms-transform: scale(0.6);
//   transform-origin: 0 0;
//   -ms-transform-origin: 0 0;
// `;

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { profile: false, active: false, keyword: null, noti: {}, notification: [], msg: null };
//   };
//   _getNotification = () => {
//     return fetch(`${host}/common/notice`, { headers: { "Content-Type": "application/json" }, method: "get" })
//       .then((response) => { return response.json() })
//       .then((data) => {
//         if (data) {
//           this.setState({ notification: data })
//         }
//       })//.catch(err => console.log(err))
//   };
//   componentDidMount() {
//     if (this.props.valid) {
//       try {
//         Socket.emit("INIT", this.props.userInfo.uid)
//         Socket.on("getNoti", noti => {
//           this.setState({ noti: noti })
//         })
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     this._getNotification()
//   };
//   handleSignOut = async () => {
//     SetSession("opendesign_token", null).then(data => {
//       this.props.SignOutRequest()
//       this.setState({ profile: false, active: false, keyword: null, noti: {}, msg: null })
//       this.props.history.push("/")
//     })
//   };
//   onActive = e => {
//     const event = e;
//     event.stopPropagation();
//     let target = event.currentTarget;
//     let active = this.props.isActive;
//     if (active === "INIT" || active !== "MENU") {
//       active = "MENU";
//     } else if (active === "MENU") {
//       active = "INIT";
//     }
//     // console.log("onactive", active);
//     this.props.SetActive(active, target);
//   };
//   saveKeyWord = e => {
//     const target = e.target;
//     const word = target.value;
//     let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
//     if (!word.match(regExp)) {
//       alert("특수문자는 사용할 수 없습니다.");
//       target.value = "";
//       return;
//     } else {
//       this.setState({
//         keyword: word
//       });
//     }
//   };
//   submitEnter = e => {
//     if (e.keyCode === 13) {
//       document.getElementById("searchLink").click();
//     }
//   };
//   limitNickName = str => {
//     if (str.length < 6) {
//       return str;
//     }
//     else {
//       return str.slice(0, 5) + "...";
//     }
//   };
// 
// 
//   render() {
//     const LoginNav = () => {
//       return (
//         <UserInterface>
//           <UserItem>
//             <UserBtn onClick={this.onActive} className={`openMenu ${this.props.active === "MENU" && "active"}`}>
//               <div className="userIcon" style={{ backgroundImage: `url(${this.props.userInfo.thumbnail && this.props.userInfo.thumbnail.s_img}), url(${logo})` }} onError={this.noneImage} />
//               {this.limitNickName(this.props.userInfo.nickName)}
//             </UserBtn>
// 
//             <UserMenuDimm style={{ display: `${this.props.active === "MENU" ? "block" : "none"}` }}>
//               <Content>
//                 <UserMenu>
//                   {/* <UserMenuItem>
//                     <a href="/cart"><Icon name="cart" />장바구니</a>
//                   </UserMenuItem> */}
//                   <UserMenuItem>
//                     <a href="/myPage"><Icon name="user" />마이페이지</a>
//                   </UserMenuItem>
//                   {/* <UserMenuItem>
//                     <a href="/message"><Icon name="envelope" />메시지함</a>
//                   </UserMenuItem> */}
//                   <UserMenuItem>
//                     <LogOutBtn onClick={this.handleSignOut}><Icon name="log out" />로그아웃</LogOutBtn>
//                   </UserMenuItem>
//                 </UserMenu>
//               </Content>
//             </UserMenuDimm>
//           </UserItem>
//         </UserInterface>
//       );
//     };
// 
//    const LogOutNav = () => {
//       return (
//         <UserInterface>
//           <UserItem>
//             <a href="/signin" className="logOutNavLink">로그인</a>
//           </UserItem>
// 
//           <UserItem>
//             <a href="/signup" className="logOutNavLink">회원가입</a>
//           </UserItem>
// 
//           <UserItem>
//             <a href="/cart" className="logOutNavLink">장바구니</a>
//           </UserItem>
// 
//         </UserInterface>
//       );
//     };
// 
//     const item_menu_bold = this.props.location.pathname === "/product" || this.props.match.path.indexOf("/productDetail/") === 0 || this.props.match.path.indexOf("/productDetail") !== -1 ? "active" : "";
//     const designer_menu_bold = this.props.location.pathname === "/designer" || this.props.match.path.indexOf("/designerDetail") === 0 || this.props.match.path.indexOf("/designerDetail") !== -1 ? "active" : "";
//     const maker_menu_bold = this.props.location.pathname === "/maker" || this.props.match.path.indexOf("/makerDetail") !== -1 ? "active" : "";
//     const request_menu_bold = this.props.location.pathname === "/request" || this.props.match.path.indexOf("/requestDetail") !== -1 ? "active" : "";
//     const { valid } = this.props;
// 
//     return (
//       <Head>
//         <Notice notice={this.state.notification} />
// 
//         <Content>
//           <MenuWrapper>
// 
//             <Menu>
//               <Logo href="/" />
//               <MenuItem><a href="/designer" className={designer_menu_bold}>디자이너</a></MenuItem>
//               <MenuItem><a href="/maker" className={maker_menu_bold}>메이커</a></MenuItem>
//               <MenuItem><a href="/product" className={item_menu_bold}>아이템</a></MenuItem>
//               <MenuItem><a href="/request" className={request_menu_bold}>의뢰</a></MenuItem>
//             </Menu>
// 
//             <Menu>
//               <MenuItem className="submenu-item">
//                 <input onChange={this.saveKeyWord} onKeyDown={this.submitEnter} />&nbsp;
//                 <a href={`/search/null/null/${this.state.keyword}`} id="searchLink">
//                   <Icon name="search" /></a>
//               </MenuItem>
//             </Menu>
// 
//             <Menu>
//               {valid ? (
//                 <React.Fragment>
//                   <SubMenuItem className="submenu-item">
//                     <Alarm history={this.props.history} token={this.props.token} open={this.openAlarmHandler} close={this.onAlarmHandler} noti={this.state.noti} valid={this.props.valid} uid={this.props.userInfo.uid} socket={Socket} />
//                   </SubMenuItem>
// 
//                   <MenuItem className="submenu-item">
//                     <a href="/message"><Icon name="envelope" />{this.state.noti.countMsg > 0 && (<AlarmLabel>{NumberFormat(this.state.noti.countMsg)}</AlarmLabel>)}</a>
//                   </MenuItem>
// 
//                   <MenuItem className="submenu-item">
//                     <a href="/cart"><Icon name="cart" /></a>
//                   </MenuItem>
//                 </React.Fragment>
//               ) : null}
// 
//               <SubMenuItem>
//                 {this.props.valid ? <LoginNav /> : <LogOutNav />}
//               </SubMenuItem>
// 
//             </Menu>
//           </MenuWrapper>
// 
//         </Content>
//       </Head>)
//   };
// }
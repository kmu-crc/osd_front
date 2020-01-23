import React, { Component } from "react";
import styled from "styled-components";
import Zoom from "source/baseline_search_black_48dp.png";
import Socket from "modules/socket";
import host from "config";
import { Link } from "react-router-dom";
import NoFace from "source/thumbnail.png";
import TextFormat from "modules/TextFormat";
import { SetSession } from "modules/Sessions";

// import ContentBox from "components/Commons/ContentBox";
// import StyleGuide from "StyleGuide";
// import Button from "components/Commons/Button";
// import Alarm from "./Alarm";
// import Notice from "./Notice";
// import NumberFormat from "modules/NumberFormat";

const LogoWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: Noto Sans KR;
  width: 200px;
  height: 74px;
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
  height: 74px;
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
  .active {
    color: #F00;
  }
`;
const RedCircle = styled.div`
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
`;
const UserMenu = styled.div`
  z-index: 999;
  position: absolute;
  height: 125px;
  width: 175px;
  padding-top:10px;
  pointer-events: auto;
  margin-top: 45px;
  border-radius: 15px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  border-radius: 10px;
  color: #707070;
  font-size: 20px;
  font-weight: 500;
  .item {
    margin-top:5px;
    cursor: pointer;
    width: 100%;
    line-height: 30px;
    text-align: center;
    &:hover {
        color:#FF0000;
    } 
  }
`;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, alarms: {}, active: false };
    this.getNews = this.getNews.bind(this);
    this.submitEnter = this.submitEnter.bind(this);
    this.saveKeyword = this.saveKeyword.bind(this);
  }
  componentDidMount() {
    if (this.props.valid) {
      try {
        Socket.emit("INIT", this.props.userInfo.uid)
        Socket.on("getNoti", alarms => {
          this.setState({ alarms: alarms });
        });
      } catch (err) {
        console.log(err);
      }
    }
    this.getNews();
  };
  getNews = () => {
    const url = `${host}/common/notice`;
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    }).then(res => res.json())
      .then(data => this.setState({ news: data }))
      .catch(err => alert(`공지사항을 가져올 수 없습니다.\n${err}`));
  };
  submitEnter = e => {
    if (e.keyCode === 13) {
      const dom = document.getElementById("searchLink");
      dom && dom.click();
    }
  };
  saveKeyword = e => {
    const target = e.target;
    const word = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!word.match(regExp)) {
      alert("특수문자는 사용할 수 없습니다.");
      target.value = this.state.keyword;
    } else {
      this.setState({ keyword: word });
    }
  };
  logout = () => {
    SetSession("opendesign_token", null)
      .then(data => {
        // console.log("data:", data)
        this.props.SignOutRequest()
        this.setState({ sign_modal: false, user_popup: null })
        window.location.reload()
      })
    this.setState({ user_popup: null })
  }
  render() {
    const location = window.location.pathname;
    const { valid, userInfo } = this.props;
    const face = (userInfo && userInfo.thumbnail && userInfo.thumbnail.s_img) || NoFace;
    // console.log(this.props);
    return (<HeaderContainer>
      <HeaderItem className="first">
        <Link to={`/`}><Logo /></Link>
      </HeaderItem>
      <HeaderItem>
        <Link
          to={`/designer`}
          className={location === "/designer" || location.indexOf("/designerDetail") !== -1 ? "active" : ""}>
          디자이너</Link>
      </HeaderItem>
      <HeaderItem>
        <Link to={`/maker`}
          className={location === "/maker" || location.indexOf("/makerDetail") !== -1 ? "active" : ""}>
          메이커</Link>
      </HeaderItem>
      <HeaderItem>
        <Link to={`/product`}
          className={location === "/product" || location.indexOf("/productDetail") !== -1 ? "active" : ""}>
          아이템</Link>
      </HeaderItem>
      <HeaderItem>
        <Link to={`/request`}
          className={location === "/request" || location.indexOf("/requestDetail") !== -1 ? "active" : ""}>
          게시판</Link>
      </HeaderItem>
      <HeaderItem className="left search">
        <div className="search-icon-wrapper">
          <input className="input-style" onChange={this.saveKeyword} onKeyDown={this.submitEnter} />
          <Link to={`/search/null/null/${this.state.keyword}`} id="searchLink">
            <img alt="icon" src={Zoom} className="search-icon" />
          </Link>
        </div>
      </HeaderItem>
      <HeaderItem>
        {valid && userInfo
          ? (<div onClick={() => this.setState({ active: !this.state.active })} style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}>
            <div style={{ width: "35px", height: "35px", borderRadius: "35px", background: "#EEE", backgroundImage: `url(${face})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ width: "max-content", height: "35px", marginLeft: "15px", }}><TextFormat txt={userInfo.nickName} chars={6} /></div>
            {this.state.active ?
              <UserMenu>
                <Link to={`/mypage`}>
                  <div className="item">mypage</div>
                </Link>
                <div onClick={this.logout} className="item">logout</div>
              </UserMenu>
              : null}
          </div>)
          : (<Link to={`/signin`}>로그인</Link>)}
      </HeaderItem>
      <HeaderItem className="cart">
        <Link to={'/cart'}>
          <RedCircle>
            <div style={{ width: "4", height: "12px" }}>1</div>
          </RedCircle>
          <i style={{ width: "29px", height: "29px" }} className="cart icon" />
        </Link>
      </HeaderItem>
    </HeaderContainer >)
  };
};

export default Header;

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

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
  // profile: false, 
  // active: false, 
  // keyword: null, 
  // noti: {}, 
  // notification: [], 
  // msg: null };
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


//   render() {
//     const LoginNav = () => {
//       return (
//         <UserInterface>
//           <UserItem>
//             <UserBtn onClick={this.onActive} 
//     className={`openMenu ${this.props.active === "MENU" && "active"}`}>
//               <div className="userIcon" 
//     style={{ backgroundImage: `url(${this.props.userInfo.thumbnail && 
// this.props.userInfo.thumbnail.s_img}), url(${logo})` }} 
//onError={this.noneImage} />
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
// const { valid } = this.props;
// 
//     return (
//       <Head>
//         <Notice notice={this.state.notification} />
// 
//         <Content>
//           <MenuWrapper>
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
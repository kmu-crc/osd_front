import React, { Component } from "react";
import styled from "styled-components";
import Zoom from "source/baseline_search_black_48dp.png";
import Socket from "modules/socket";
import host from "config";
import { Link } from "react-router-dom";
import NoFace from "source/thumbnail.png";
import TextFormat from "modules/TextFormat";
import { SetSession } from "modules/Sessions";
import { Icon } from "semantic-ui-react";

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
  .margin_left{
    margin-left:100px;
  }
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
    margin-top: 5px;
    width: 354px;
    min-width: 300px;
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

const LoginBox = styled.div`
  display:flex;
  .iconBox{
    width:35px;
    height35px;
    margin-right:30px;
    cursor:pointer;
  }
`
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, alarms: {}, active: false };
    this.getNews = this.getNews.bind(this);
    this.submitEnter = this.submitEnter.bind(this);
    this.saveKeyword = this.saveKeyword.bind(this);
    this.onClickMessageIcon = this.onClickMessageIcon.bind(this);
  }
  componentDidMount() {
    if (this.props.valid) {
      try {
        Socket.emit("INIT", this.props.userInfo.uid)
        Socket.on("getNoti", alarms => {
          // console.log("alarm@@@@@@@@@@@@@@@@@@@");
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
        this.props.SignOutRequest();
        this.setState({ sign_modal: false, user_popup: null });
        window.location.reload();
      })
    this.setState({ user_popup: null })
  }
  onClickMessageIcon() {
    window.location.href = "/message";
  }
  render() {
    const location = window.location.pathname;
    const { valid, userInfo } = this.props;
    const face = (userInfo && userInfo.thumbnail && userInfo.thumbnail.s_img) || NoFace;
    console.log(valid);
    return (<HeaderContainer>
      {/*  */}
      <HeaderItem className="first">
        <Link to={`/`}><Logo /></Link>
      </HeaderItem>
      {/*  */}
      <HeaderItem>
        <Link
          to={`/designer`}
          className={location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1 ? "active" : ""}>
          디자이너</Link>
      </HeaderItem>
      {/*  */}
      <HeaderItem>
        <Link to={`/maker`}
          className={location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1 ? "active" : ""}>
          메이커</Link>
      </HeaderItem>
      {/*  */}
      <HeaderItem>
        <Link to={`/product`}
          className={location.indexOf("/product") !== -1 || location.indexOf("/productDetail") !== -1 ? "active" : ""}>
          아이템</Link>
      </HeaderItem>
      {/*  */}
      {
        (location.indexOf("/requestDesigner") !== -1 || location.indexOf("/requestToDesigner")!== -1||location.indexOf("/ModifyrequestToDesigner")!== -1||
        location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) &&
        <HeaderItem>
        <Link to={`/requestDesigner`}
          className={location.indexOf("/requestDesigner") !== -1 || location.indexOf("/requestDetail") !== -1 ? "active margin_left" : "margin_left"}>
          디자이너 게시판
        </Link>
        </HeaderItem>
      }
      {
        (location.indexOf("/requestMaker") !== -1 || location.indexOf("/requestToMaker")!== -1||location.indexOf("/ModifyrequestToMaker")!== -1||
        location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) &&
        <HeaderItem>
        <Link to={`/requestMaker`}
          className={location.indexOf("/requestMaker") !== -1 || location.indexOf("/requestDetail") !== -1 ? "active margin_left" : "margin_left"}>
          메이커 게시판
        </Link>
        </HeaderItem>
      }
      {
        (location.indexOf("/requestItem") !== -1 || location.indexOf("/createProduct")!== -1||location.indexOf("/productModify")!== -1||
        location.indexOf("/productDetail") !== -1 || location.indexOf("/product") !== -1) &&
        <HeaderItem>
        <Link to={`/requestItem`}
          className={location.indexOf("/requestItem") !== -1 ? "active margin_left" : "margin_left"}>
          아이템 게시판
        </Link>
        </HeaderItem>
      }
      
      {/*  */}
      {location.indexOf("/search") !== -1 ? null :
        <HeaderItem className="left search">
          <div className="search-icon-wrapper">
            <input className="input-style" onChange={this.saveKeyword} onKeyDown={this.submitEnter} />
            <Link to={`/search/null/null/${this.state.keyword}`} id="searchLink">
              <img alt="icon" src={Zoom} className="search-icon" />
            </Link>
          </div>
        </HeaderItem>}
      {/*  */}
      <HeaderItem className={`${location.indexOf("/search") !== -1 ? "left" : ""}`}>
        {valid && userInfo
          ? (
            <LoginBox>

            <div className="iconBox"><Icon className="grey alarm" size="large"/></div>
            <div className="iconBox" onClick={this.onClickMessageIcon}><Icon className="grey envelope" size="large"/></div>
            <div onClick={() => this.setState({ active: !this.state.active })} style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}>
            <div style={{ width: "35px", height: "35px", borderRadius: "35px", background: "#EEE", backgroundImage: `url(${face})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ width: "max-content", height: "35px", marginLeft: "15px", }}><TextFormat txt={userInfo.nickName} chars={6} /></div>
            {this.state.active ?
              <UserMenu>
                <Link to={`/mypage`}>
                  <div className="item">마이페이지</div>
                </Link>
                <div onClick={this.logout} className="item">로그아웃</div>
              </UserMenu>
              : null}
          </div>
          </LoginBox>

          )
          : (<Link to={`/signin`}>로그인</Link>)}
      </HeaderItem>
      {/* <HeaderItem className="cart">
        <Link to={'/cart'}>
          {this.props.cart ?
            <RedCircle>
              <div style={{ width: "4", height: "12px" }}>{this.props.cart.count}</div>
            </RedCircle>
            : null}
          <i style={{ width: "29px", height: "29px" }} className="cart icon" />
        </Link>
      </HeaderItem> */}
    </HeaderContainer >)
  };
};

export default Header;

import React, { Component } from "react";
import styled from "styled-components";
import Zoom from "source/baseline_search_black_48dp.png";
import host from "config";
import { Link } from "react-router-dom";
import NoFace from "source/thumbnail.png";
import TextFormat from "modules/TextFormat";
import { SetSession } from "modules/Sessions";
import { Icon } from "semantic-ui-react";
import AlarmContainer from "containers/Commons/AlarmContainer";
import { alert } from "components/Commons/Alert/Alert";
import MarketLogo from "source/market_logo.png";
import DownloadIcon from "source/download.png";
import MessageIcon from "source/message.svg";

import market_style from "market_style";
const HeaderContainer = styled.div`
  padding:19px 30px 11px 30px;
  width:100%;
  max-width:1366px;
  height:81px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin:0 auto;
  // flex-wrap:wrap;
  .marketLogo{
    min-width:51px;
    min-height:51px;
    max-width:51px;
    max-height:51px;
    object-fit:contain;
    margin-right:25px;
    
  }
  .pointer{cursor:pointer;}
  .tabMenu{
    height:100%;
    display:flex;
    align-items:center;
    .tabText{
      width:max-content;
      font-size:${market_style.font.size.small2};
    }
    .red{
      color:red;
    }
    .tab_margin{
      margin-right:34px;
    }
  }
  .searchMenu{
    width:375px;
    position:relative;
    .searchIcon{
      min-width:25px;
      min-height:25px;
      max-width:25px;
      max-height:25px;
      padding:4px;
      position:absolute;
      right:0px;
    }
  }
  .loginMenu{
    display:flex;
    align-items:center;
    .login{
      font-size:${market_style.font.size.small2};
      color:red;
    }
  }
  .logOutMenu{
    display:flex;
    align-items:center;
    .myInfo{
        max-width:71px;
        width:max-content;
        font-size:${market_style.font.size.mini3};
        color:#4F4F4F;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .myThumbnail{
      min-width:33px;
      min-height:33px;
      max-width:33px;
      max-height:33px;
      border-radius:50%;
      object-fit:cover;
    }
    .createItemBtn{
      min-width:100px;
      min-height:33px;
      max-width:100px;
      max-height:33px;
      padding:6px 9px 7px 9px;
      display:flex;
      align-items:center;
      justify-content:center;
      background-color:#FF0000;
      border-radius:18px;
      .createItemIcon{
        min-width:17px;
        min-height:17px;
        max-width:17px;
        max-width:17px;
        margin-right:2px;
      }
      .createItemText{
        font-size:${market_style.font.size.mini1};
        color:white;
      }
    }
    .message{
      min-width:29px;
      min-height:29px;
      max-width:29px;
      max-height:29px;
    }

    .marginRight1{
      margin-right:10px;
    }
    .marginRight2{
      margin-right:15px;
    }
  }
  @media only screen and (min-width: 700px) and (max-width:1000px){
    justify-content:center;
    flex-wrap:wrap;

   .searchMenu{
      min-width:200px;
   }
  }
  @media only screen and (min-width: 500px) and (max-width:800px){
    justify-content:center;
    flex-wrap:wrap;

   .searchMenu{
    max-width:100px;
   }
  }

`
const SearchText = styled.input`
  width:100%;
  background-color:white;
  color:#707070;
  border:none;
  outline:none;
  border-bottom:1px solid #707070;
  padding:4px 0px 4px 6px;
`
// const HeaderContainer = styled.ul`
//     width:100%;
//     max-width:1366px;
//     height:45px;
//     padding:0px 30px 0px 30px;
//     display: flex;
//     justify-content:center;
//     align-items:center;
//     .betweenMenu{
//       width:100%;
//       max-width:1366px;
//       display:flex;
//       justify-content:space-between;
//       .left_menu{
//         display:flex;
//         align-items:center;
//         justify-content:flex-start;
//         width:max-content;
//         z-index:9;
//       }

//       .right_menu{
//         display:flex;
//         align-items:center;
//         justify-content:flex-end;
//         width:max-content;
//         z-index:13;
//         position:relative;
//       }
//     }
//     .center_menu{
//       position:absolute;
//       display:flex;
//       align-items:center;
//       justify-content:center;
//       width:100%;
//       max-width:1366px;
//     }

// @media only screen and (min-width: 500px) and (max-width:1000px){
//   height:70px;
//   flex-wrap:wrap;
//   .betweenMenu{
//     margin-top:5px;
//   }
//   .center_menu{
//     position:static;
//     margin-bottom:10px;
//   }
// }
// `;

// const HeaderItem = styled.li`
//   min-width:max-content;
//   height:100%;
//   font-size: ${market_style.font.size.small1};
//   font-family:Noto Sans KR, Medium;
//   font-weight:500;
//   margin-right:15px;
//   display:flex;
//   align-items:center;
//   .logo_box{
//     width:35px;
//     height:35px;
//     background-image:url(${MarketLogo});
//     background-size:contain;
//     cursor:pointer;
//     margin-right:5px;
//   }
//   .non_margin{
//     margin:0px;
//   }
//   .margin_left{
//     margin-left:100px;
//   }
//   &.first {
//     width:max-content;
//     height:max-content;
//   }
//   &.search {
//     width: 300px;
//     height: 25px;
//     background: #E9E9E9;
//     border-radius: 15px;
//     position: relative;
//     z-index:9;
//     .search-icon-wrapper {
//       width:100%;
//       .input-style {
//         width: 100%;
//         height: 100%;
//         padding-left: 14px;
//         padding-right: 40px;
//         border: none;
//         outline:none;
//         background: transparent;
//       }
//       .search-icon {
//         position: absolute;
//         top: 2px;
//         right: 10px;
//         width: 20px;
//         height: 20px;
//         opacity: .9;
//       }
//     }
//   }
//   .hover{
//     color:#707070;
//   }
//   .active {
//     color: #F00;
//   }
//   @media only screen and (min-width: 500px) and (max-width:1000px){
//     margin-right:10px;
//     margin-top:5px;
//     &.search {
//       width:100%;
//     }
//   }
// `;

const UserMenu = styled.div`
  height: max-content;
  width: 155px;
  border-radius: 15px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  color: #707070;
  font-size: ${market_style.font.size.small3};
  font-weight: 500;
  overflow:hidden;
  position: absolute;
  top:70px;
  right:30px;
  z-index:13;
  .item {
    border:1px solid #EFEFEF;
    padding:10px;
    cursor: pointer;
    width: 100%;
    line-height: 30px;
    text-align: center;
    &:hover {
        color:#FF0000;
    } 
  }
`;

// const LoginBox = styled.div`
//   display:flex;
//   align-items:center;
//   position:relative;
//   .addItem{
//     width:100px;
//     background-color:red;
//     margin-right:20px;
//     padding:1px 0px 3px 0px;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     ._text{
//       font-size: ${market_style.font.size.mini2};
//       font-family:Noto Sans KR;
//       font-weight:500;
//       color:white;
//       cursor:pointer;
//     }
//   }
//   .login_text{
//     min-width:max-content;
//     height:max-content;
//     font-size: ${market_style.font.size.small1};
//     font-family:Noto Sans KR, Medium;
//     font-weight:500;
//     margin-left:20px;
//     color:red;
//   }
//   .iconBox{
//     width:35px;
//     height35px;
//     margin-right:20px;
//     cursor:pointer;
//   }
//   @media only screen and (min-width: 500px) and (max-width:1000px){
//     .addItem{
//       width:50px;
//       ._text{
//         text-align:center;
//       }
//     }
//     .userNickname{
//       display:none;
//     }
//     .iconBox {
//       margin-right:10px;
//     }
//   }
// `
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, alarms: {}, active: false, keyword: "" };
    this.getNews = this.getNews.bind(this);
    this.submitEnter = this.submitEnter.bind(this);
    this.saveKeyword = this.saveKeyword.bind(this);
    this.onClickMessageIcon = this.onClickMessageIcon.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickEvent = this.onClickEvent.bind(this);
  }
  componentDidMount() {
    this.getNews();
    window.addEventListener("click", this.onClickEvent, true);
  }
  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.signed) {
        window.location.reload();
      }
    }
    return true;
  }
  onClickEvent(event) {
    if (event.target.id !== "popmenu") this.setState({ active: false });
  }
  searchlist = () => {

  }
  onClickSearch = async (event) => {
    const location = window.location.pathname;

    const designerActive = (location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const makerActive = (location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const itemActive = (location.indexOf("/product") !== -1 || (location.indexOf("/createproduct") !== -1) || (location.indexOf("/productModify") !== -1) || location.indexOf("/productDetail") !== -1) && (location.indexOf(`/request`) === -1)
    let searchtype = designerActive ? "designer" : makerActive ? "maker" : itemActive ? "item" : null;
    console.log(this.state.keyword);
    let countItem = -1;
    let countMaker = -1;
    let countDesigner = -1;
    await this.props.GetItemSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
      .then((data) => { console.log(data); countItem = data.searchCount == null ? -1 : data.searchCount; });
    await this.props.GetMakerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
      .then((data) => { console.log(data); countMaker = data.searchCount == null ? -1 : data.searchCount; });
    await this.props.GetDesignerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
      .then((data) => { console.log(data); countDesigner = data.searchCount == null ? -1 : data.searchCount; });
    if (makerActive) {
      searchtype = countMaker > 0 ? "maker" :
        countDesigner > 0 ? "designer" :
          countItem > 0 ? "item" :
            "item";
    } else if (itemActive) {
      searchtype = countItem > 0 ? "item" :
        countDesigner > 0 ? "designer" :
          countMaker > 0 ? "maker" :
            "item";
    } else {
      searchtype = countDesigner > 0 ? "designer" :
        countMaker > 0 ? "maker" :
          countItem > 0 ? "item" :
            "item";
    }
    console.log(searchtype);

    window.location.href = `/search/${searchtype}/update/${this.state.keyword}`;
  }
  getNews = () => {
    const url = `${host}/common/notice`;
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    }).then(res => res.json())
      .then(data => this.setState({ news: data }))
      .catch(async err => await alert(`공지사항을 가져올 수 없습니다.\n${err}`));
  };
  submitEnter = e => {
    if (e.keyCode === 13) {
      const dom = document.getElementById("searchbox");
      dom && dom.click();
    }
  };
  saveKeyword = async e => {
    const target = e.target;
    const word = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!word.match(regExp)) {
      await alert("특수문자는 사용할 수 없습니다.");
      target.value = this.state.keyword;
    } else {
      this.setState({ keyword: word });
    }
  };
  logout = () => {
    SetSession("market", null)
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

    let designerActive = (location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    let makerActive = (location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    let itemActive = (location.indexOf("/product") !== -1 || (location.indexOf("/createproduct") !== -1) || (location.indexOf("/productModify") !== -1) || location.indexOf("/productDetail") !== -1) && (location.indexOf(`/request`) === -1)
    let requestActive = (location.indexOf("/request") !== -1)
    const searchtype = designerActive ? "designer" : makerActive ? "maker" : itemActive ? "item" : null;


    if(location.indexOf("/requestToDesigner/")!==-1&&location.indexOf("/requestToDesigner/null")==-1){
      designerActive = true;
      makerActive=false;
      itemActive=false;
      requestActive=false;
    }
    if(location.indexOf("/requestToMaker/")!==-1&&location.indexOf("/requestToMaker/null")==-1){
      designerActive = false;
      makerActive=true;
      itemActive=false;
      requestActive=false;
    }

    const pattern_eng = /[a-zA-Z]/;
    return (
      <React.Fragment>
          <HeaderContainer>
            <div className="tabMenu">
              <img className="marketLogo pointer" src={MarketLogo} 
                   onClick={() => window.location.href = "/"}/>
              <Link id="designer" to="/designer" className={`tabText tab_margin pointer ${designerActive? "red":""}`}>디자이너</Link>
              <Link id="maker" to="/maker" className={`tabText tab_margin pointer ${makerActive? "red":""}`}>메이커</Link>
              <Link id="product" to="/product" className={`tabText tab_margin pointer ${itemActive? "red":""}`}>아이템</Link>
              <Link id="request" to="/request/designer" className={`tabText tab_margin pointer ${requestActive? "red":""}`}>게시판</Link>
            </div>
            <div className="searchMenu">
              <SearchText onChange={this.saveKeyword} onKeyDown={this.submitEnter} placeholder={window.innerWidth<700?"":"새로운 아이디어를 찾아보세요!"}/>
              <Link to={`/search/${searchtype}/update/${this.state.keyword}`} id="searchLink">
                <img src={Zoom} className="searchIcon"/>
              </Link>
            </div>
            {
              valid&&userInfo?
              <div className="logOutMenu">
              <div className="alarm marginRight1">
                <AlarmContainer/>
              </div>
              <img onClick={this.onClickMessageIcon} className="message marginRight2" src={MessageIcon}/>
              <div onClick={() => { window.location.href = "/createProduct" }} className="createItemBtn marginRight2">
                <img className="createItemIcon" src={DownloadIcon}/>
                <div  className="createItemText">아이템등록</div>
              </div>
              <div onClick={async () => await this.setState({ active: !this.state.active })} className="pointer myInfo marginRight1">{userInfo.nickName}</div>
              <img onClick={async () => await this.setState({ active: !this.state.active })} className="myThumbnail pointer" src={face||NoFace}/>
              {this.state.active ?
              <UserMenu id="popmenu">
                <Link to={`/myPage`}>
                  <div className="item" id="popmenu">내 정보</div>
                </Link>
                <div onClick={this.logout} className="item" id="popmenu">로그아웃</div>
              </UserMenu>
              : null}
              </div>
              :
              <div className="loginMenu">
                <Link className="login" to={`/signin`}>로그인</Link>
              </div>
            }
          </HeaderContainer>
      </React.Fragment>
      // <HeaderContainer>
      //   <div className="betweenMenu">
      //     <div className="left_menu">
      //       <HeaderItem>
      //         <div className="logo_box"
      //           onClick={() => window.location.href = "/"} />
      //       </HeaderItem>
      //       {/*  */}
      //       <HeaderItem>
      //         <Link id="designer"
      //           to="/designer"
      //           className={designerActive ? "active" : ""}>
      //           디자이너</Link>
      //       </HeaderItem>
      //       {/*  */}
      //       <HeaderItem>
      //         <Link id="maker"
      //           to="/maker"
      //           className={makerActive ? "active" : ""}>
      //           메이커</Link>
      //       </HeaderItem>
      //       <HeaderItem>
      //         <Link id="product"
      //           to="/product"
      //           className={itemActive ? "active" : ""}>
      //           아이템</Link>
      //       </HeaderItem>
      //       <HeaderItem>
      //         <Link id="request"
      //           to="/request/designer"
      //           className={requestActive ? "active" : ""}>
      //           게시판
      //     </Link>
      //       </HeaderItem>
      //     </div>

      //     <div className="right_menu">
      //       {valid && userInfo
      //         ? (<LoginBox>
      //           <div className="iconBox" >
      //             <AlarmContainer />
      //           </div>

      //           <div className="iconBox" onClick={this.onClickMessageIcon}>
      //             <Icon className="grey envelope" size="large" />
      //           </div>
      //           <div className="addItem" onClick={() => { window.location.href = "/createProduct" }}><div className="_text">아이템 등록</div></div>
      //           <div onClick={async () => await this.setState({ active: !this.state.active })} style={{ display: "flex", alignItems: "center", flexDirection: "row", cursor: "pointer" }}>
      //             <div style={{ width: "23px", height: "23px", borderRadius: "35px", background: "#EEE", backgroundImage: `url(${face})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      //             <div className="userNickname" style={{
      //               width: "max-content", marginLeft: "5px", fontFamily: market_style.font.family,
      //               fontSize: market_style.font.size.small1
      //             }}>
      //               <TextFormat txt={userInfo.nickName} chars={pattern_eng.test(userInfo.nickName) ? 6 : 3} />
      //             </div>
      //             {this.state.active ?
      //               <UserMenu id="popmenu">
      //                 <Link to={`/myPage`}>
      //                   <div className="item" id="popmenu">내 정보</div>
      //                 </Link>
      //                 <div onClick={this.logout} className="item" id="popmenu">로그아웃</div>
      //               </UserMenu>
      //               : null}
      //           </div>
      //         </LoginBox>)
      //         : (<LoginBox>
      //           <div className="login_text"><Link to={`/signin`}>로그인</Link></div>
      //         </LoginBox>)}
      //     </div>
      //   </div>
      //   <div className="center_menu">
      //     {location.indexOf("/search") !== -1 ? null :
      //       <HeaderItem className="search">
      //         <div className="search-icon-wrapper">
      //           <input className="input-style" onChange={this.saveKeyword} onKeyDown={this.submitEnter} />
      //           <Link to={`/search/${searchtype}/update/${this.state.keyword}`} id="searchLink">
      //             <img alt="icon" src={Zoom} id="searchbox" className="search-icon" onClick={this.onClickSearch} />
      //           </Link>
      //         </div>
      //       </HeaderItem>}
      //   </div>
      // </HeaderContainer >
      )
  };
};

export default Header;

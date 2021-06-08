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
import market_style from "market_style";
import mini_logo from "source/newlogo_small.png"
import profile_mobile from "source/profile_mobile.svg"
const BottomMenuContainer = styled.div`
  width:100%;
  height:60px;
  background-color:white;
  position:fixed;
  will-change: transform;
  bottom:0px;
  z-index:998;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:10px 50px;
  .icon_wrapper{
    width:max-content;
    height:max-content;
  }
  .face{
    width:36px;
    height:36px;
    border-radius:50%;
    background-color:#e9e9e9;
    background-image: url(${props=>props.face});
    background-size:cover;
  }

  .homeButton{
    width:50px;
    height:50px;
    background-image: url(${mini_logo});
    background-size:cover;
  }
  .addItemButton{
    cursor:pointer;
    width:132px;
    height:30px;
    border-radius:30px 0px 30px 0px;
    background: transparent linear-gradient(287deg, #FF6969 0%, #FF3131 100%) 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 3px #00000029;
    display:flex;
    align-items:center;
    justify-content:center;
    .text{
      color:white;
      font-family:${market_style.font.size.small1};
      font-weight:500;
    }
  }
`
const ProfileIcon = styled.div`
  min-width:21px;
  min-height:28px;
  background-image:url(${profile_mobile});
  background-size:cover;
`
class Header_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, alarms: {}, active: false, keyword:""};
    this.getNews = this.getNews.bind(this);
    this.submitEnter = this.submitEnter.bind(this);
    this.saveKeyword = this.saveKeyword.bind(this);
    this.onClickMessageIcon = this.onClickMessageIcon.bind(this);
    this.onClickSearch=this.onClickSearch.bind(this);
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
  onClickEvent(event){
    if(event.target.id !== "popmenu")this.setState({active:false});
  }
  searchlist=()=>{
    
  }
  onClickSearch=async(event)=>{
    const location = window.location.pathname;

    const designerActive = (location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const makerActive = (location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const itemActive = (location.indexOf("/product") !== -1 || (location.indexOf("/createproduct") !== -1)|| (location.indexOf("/productModify") !== -1)|| location.indexOf("/productDetail") !== -1) && (location.indexOf(`/request`) === -1)
    let searchtype = designerActive ? "designer" : makerActive ? "maker" : itemActive ? "item" : null;
    console.log(this.state.keyword);
    let countItem =-1;
    let countMaker=-1;
    let countDesigner=-1;
    await this.props.GetItemSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
    .then((data)=>{console.log(data);countItem=data.searchCount==null?-1:data.searchCount;});
    await this.props.GetMakerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
    .then((data)=>{console.log(data);countMaker=data.searchCount==null?-1:data.searchCount;});
    await this.props.GetDesignerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
    .then((data)=>{console.log(data);countDesigner=data.searchCount==null?-1:data.searchCount;});
    if(makerActive){
      searchtype=countMaker>0?"maker":
      countDesigner>0?"designer":
      countItem>0?"item":
      "item";
    }else if(itemActive){
      searchtype=countItem>0?"item":
      countDesigner>0?"designer":
      countMaker>0?"maker":
      "item";
    }else{
        searchtype=countDesigner>0?"designer":
        countMaker>0?"maker":
        countItem>0?"item":
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
    const isHome = window.location.pathname == "/"?true:false;
    return (
      <React.Fragment>
        <BottomMenuContainer face={this.props.userInfo&&this.props.userInfo.thumbnail&&this.props.userInfo.thumbnail.s_img}>
            <div className="icon_wrapper" onClick={()=>this.props.onClickMenu()}>
              <Icon className="grey list" size="big"/> 
            </div>
            { 
            isHome?
            <div onClick={()=>{window.location.href="/createProduct"}} className="addItemButton">
            <div className="text">아이템 등록하기</div>
            </div>
            :
            <div className="homeButton" onClick={()=>window.location.href="/"}/>
            }
            {
              this.props.token==null?
              <ProfileIcon onClick={()=>window.location.href="/signin"}/>
              :
              <div onClick={()=>{window.location.href="/myPage"}} className="face"></div>
            }
        </BottomMenuContainer>
      </React.Fragment>
    )
  };
};

export default Header_mobile;

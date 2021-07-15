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
const HeaderContainer = styled.div`
  position: fixed;
  z-index:997;
  width:100%;
  height:45px;
  display:flex;
  align-items:center;
  padding:10px 15px;
  animation: ${props=>props.headerOn==true?"fadein":"fadeout"} 1s;
  animation-fill-mode: forwards;
    .search_wrapper{
    width:${props=>props.width==null?"310px":props.width};
    height:100%;
    position:relative;
    .search{
      position:absolute;
      top:2px;
      right:5px;
      width:20px;
      height:20px;
      opacity: .9;
    }
  }
  .icon_wrapper{
    width:30px;
    height:25px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:20px;
  }

  @keyframes fadein {
    from {
      background-color:rgba( 255, 255, 255, 0 );
    }
    to {
      background-color:rgba( 255, 255, 255, 1 );
    }
  }
  @keyframes fadeout {
    from {
      background-color:rgba( 255, 255, 255, 1 );
    }
    to {
      background-color:rgba( 255, 255, 255, 0 );
    }
  }


`
const InputText = styled.input.attrs({ type: "text" })`
  width:100%;
  height:25px;
  border-radius:22px;
  background-color:${props=>props.isMain==false?'#eaeaea':'white'};
  box-shadow: 2px 2px 5px #00000029;
  outline:none;
  border:0px;
  padding:0px 30px 0px 10px;
  font-weight:300;
`;
class Header_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, alarms: {}, active: false, keyword:"",headerOn:false};
    this.getNews = this.getNews.bind(this);
    this.submitEnter = this.submitEnter.bind(this);
    this.saveKeyword = this.saveKeyword.bind(this);
    this.onClickMessageIcon = this.onClickMessageIcon.bind(this);
    this.onClickSearch=this.onClickSearch.bind(this);
    this.onClickEvent = this.onClickEvent.bind(this);
    this.handleScroll=this.handleScroll.bind(this);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
  componentDidMount() {
    this.getNews();
    window.addEventListener("click", this.onClickEvent, true);
    window.addEventListener("scroll", this.handleScroll, true);
  }
  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.signed) {
        window.location.reload();
      }
    }
    return true;
  }
  handleScroll(){
    this.setState({headerOn:window.scrollY>50?true:false})
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
    const location = window.location.pathname;
    const { valid, userInfo } = this.props;
    const face = (userInfo && userInfo.thumbnail && userInfo.thumbnail.s_img) || NoFace;

    // active variables
    const designerActive = (location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const makerActive = (location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const itemActive = (location.indexOf("/product") !== -1 || (location.indexOf("/createproduct") !== -1)|| (location.indexOf("/productModify") !== -1)|| location.indexOf("/productDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const requestActive = (location.indexOf("/request") !== -1)
    const searchtype = designerActive ? "designer" : makerActive ? "maker" : itemActive ? "item" : null;

    const pattern_eng= /[a-zA-Z]/;
    console.log(window.location.pathname.includes("/search/"));
    return (
        <HeaderContainer headerOn={this.state.headerOn} className="red" id="headerWrapper" onScroll={()=>{console.log("?")}} isMain={window.location.pathname=='/'?true:false} width={userInfo==null?"100%":"310px"}>
          <div className="search_wrapper">
            {
              window.location.pathname.includes("/search/")==true
              ||window.location.pathname.includes("/signup")==true
              ||window.location.pathname.includes("/signin")==true
              ||window.location.pathname.includes("/resetPW")==true?
              null
              :
              <React.Fragment>
                  <InputText isMain={window.location.pathname=='/'?true:false} onChange={this.saveKeyword} onKeyDown={this.submitEnter}/>
                  <Link to={`/search/${searchtype}/update/${this.state.keyword}`} id="searchLink">
                    <img alt="icon" src={Zoom} id="searchBox" className="search" onClick={this.onClickSearch}/>
                  </Link>
              </React.Fragment>
            }
          </div>
          {
            userInfo == null?
            null
            :
            <React.Fragment>
              <div className="icon_wrapper" ><AlarmContainer /></div>
              <div className="icon_wrapper" onClick={this.onClickMessageIcon}><Icon className="grey envelope" size="large" /></div>
            </React.Fragment>
          }
        </HeaderContainer>
    )
  };
};

export default Header_mobile;

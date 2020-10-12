import React, { Component } from "react";
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import ScrollItemListContainer from "containers/Products/ScrollProductListContainer";
import ScrollMakerListContainer from "containers/Maker/ScrollMakerListContainer";
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer";
import { alert } from "components/Commons/Alert/Alert";
// import { Grid } from "semantic-ui-react";
// import { confirm } from "components/Commons/Confirm/Confirm";
// css styling

const Wrapper = styled.div`
  width: 107%;
  margin-bottom: 50px;
  & ul {
    margin-top: 30px;
  }
  display: flex;
  .left{
    margin-left: auto;
    margin-right: 25px;
  }
`;

const Content = styled(ContentBox)`
@media only screen and (max-width: 991px) and (min-width: 768px){
  & .ui.grid>.row{
    margin-left: 6.25% !important;
  }
  }
`;

//const MenuContainer = styled(Grid)`
//  font-size: 1.2rem;
//  & .sorting {
//    text-align: right;
//  }
//  & .ui.default.dropdown:not(.button)>.text,
//  & .ui.dropdown:not(.button)>.default.text {
//    color: inherit;
//  }
//  &.ui.grid > .row {
//    padding-top: 2rem;
//    padding-bottom: 2rem;
//  }
//`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
  // border-top: 1px solid rgba(0,0,0,0.2);
`;

const Title = styled.div`
  width: 100%;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  & input {
    font-size: ${StyleGuide.font.size.heading1};
    line-height: 50px;
    border:none;
    border-bottom: 2px solid #EFEFEF;
    text-align: left;
    vertical-align: middle;
    background-color: transparent;
    color: ${StyleGuide.color.geyScale.scale7};
    padding: 10px;
    padding-left: 20px;
    outline:none;
    &::placeholder {
      color: ${StyleGuide.color.geyScale.scale3};
    }
  }
  & .searchBtn {
    background: transparent;
    border: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &:focus {
      outline: 0;
    }
  }
  & .searchBtn .icon {
    font-size: ${StyleGuide.font.size.heading2};
    color: ${StyleGuide.color.gey.basic};
  }
`;

const MenuWrap = styled.div`
  background-color: white;
  margin-bottom: 30px;
  // border-top: 1px solid rgba(0,0,0,0.2);
  // box-shadow: 0 2px 2px 2px ${StyleGuide.color.geyScale.scale3};
`;

const type = [
  { key: "item", value: "item", text: "아이템" },
  { key: "designer", value: "designer", text: "디자이너" },
  { key: "maker", value: "maker", text: "메이커" }
];

class SearchList extends Component {
  state = {
    rendering: true,
    keyword: ""
  }

  async componentDidMount() {
    if (this.props.keyword && this.props.keyword !== "null") {
      document.getElementById("searchInput").value = await this.props.keyword;
      this.setState({
        keyword: this.props.keyword
      });
    }
    document.getElementById("searchInput").focus();
  }

  changeState = async () => { // 리렌더링을 위한 state값 변경
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }

  getSearchValue = async(e) => {
    const target = e.target;
    const value = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!value.match(regExp)) {
      await alert("특수문자는 사용할 수 없습니다.");
      target.value = "";
      return;
    } else {
      this.setState({
        keyword: value
      });
    }
  }

  submitEnter = async(e) => {
    if (e.keyCode === 13) {
      this.onSearchSubmit(this.state.keyword);
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
  
      window.location.href = `/search/${searchtype}/null/${this.state.keyword}`;
  
    }
  }

  onSearchSubmit = async(data) => {
    if (this.state.keyword == null || this.state.keyword === "") {
      await alert("키워드를 입력해주세요");
    } else {
      this.props.history.replace(`/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`);
      this.changeState();
    }
  }

  typeChange = (e, { value }) => {
    this.props.history.replace(`/search/${value}/${this.props.sort}/${this.props.keyword}`);
    this.changeState();
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/search/${this.props.type}/${value}/${this.props.keyword}`);
    this.changeState();
  }

  render() {
    const typetext =
      this.props.type && this.props.type === "designer" ? "디자이너"
        : this.props.type && this.props.type === "maker" ? "메이커"
          : "아이템"
    return (
      <div>
        <ImgWrapper>
          <Title>
            <input id="searchInput"
              placeholder="검색어를 입력하세요"
              onChange={this.getSearchValue}
              onKeyDown={this.submitEnter}
            />
            <button onClick={this.onSearchSubmit} className="searchBtn">
              <i aria-hidden="true" size="huge" className="search icon"></i>
            </button>
          </Title>
        </ImgWrapper>
        <MenuWrap>
          <Content>
            <Wrapper>
              <div style={{ fontSize: "20px" }}>
                <Dropdown
                  placeholder={typetext}
                  options={type}
                  onChange={this.typeChange} />
              </div>

              <div className="left">
                <Sorting
                  handleClick={this.sortChange}
                  placeholder={this.props.sort} />
              </div>
            </Wrapper>
          </Content>
        </MenuWrap>
        <Content>
          {this.state.rendering &&
            <Wrapper>
              {this.props.type === "designer" ? <ScrollDesignerListContainer sort={this.props.sort} keyword={this.props.keyword} /> : null}
              {this.props.type === "maker" ? <ScrollMakerListContainer sort={this.props.sort} keyword={this.props.keyword} /> : null}
              {this.props.type === "item" ? <ScrollItemListContainer sort={this.props.sort} keyword={this.props.keyword} /> : null}
            </Wrapper>
          }
        </Content>
      </div>
    )
  }
}

export default SearchList;

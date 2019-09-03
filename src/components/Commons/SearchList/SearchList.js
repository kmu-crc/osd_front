import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer";
import ScrollGroupListContainer from "containers/Groups/ScrollGroupListContainer";
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer";

// css styling

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  & ul {
    margin-top: 30px;
  }
`;

const Content = styled(ContentBox)`
@media only screen and (max-width: 991px) and (min-width: 768px){
  & .ui.grid>.row{
    margin-left: 6.25% !important;
  }
  }
`;

const MenuContainer = styled(Grid)`
  font-size: 1.2rem;
  & .sorting {
    text-align: right;
  }
  & .ui.default.dropdown:not(.button)>.text,
  & .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  &.ui.grid > .row {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
  border-top: 1px solid rgba(0,0,0,0.2);
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
    border: none;
    text-align: left;
    vertical-align: middle;
    background-color: transparent;
    color: ${StyleGuide.color.geyScale.scale7};
    padding: 10px;
    padding-left: 20px;
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
  border-top: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 2px 2px 2px ${StyleGuide.color.geyScale.scale3};
`;

const type = [
  { key: "design", value: "design", text: "디자인" },
  { key: "group", value: "group", text: "그룹" },
  { key: "designer", value: "designer", text: "디자이너" }
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
    await this.setState({
      rendering: false
    });
    await this.setState({
      rendering: true
    });
  }

  getSearchValue = (e) => {
    const target = e.target;
    const value = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!value.match(regExp)) {
      alert("특수문자는 사용할 수 없습니다.");
      target.value = "";
      return;
    } else {
      this.setState({
        keyword: value
      });
    }
  }

  submitEnter = (e) => {
    if (e.keyCode === 13) {
      this.onSearchSubmit(this.state.keyword);
    }
  }

  onSearchSubmit = (data) => {
    if (this.state.keyword === null || this.state.keyword === "") {
      alert("키워드를 입력해주세요");
    } else {
      this.props.history.replace(`/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`);
      this.changeState();
    }
  }

  typeChange = (e, { value }) => {
    this.props.history.replace(`/search/${value}/${this.props.sort}/${this.props.keyword}`);
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/search/${this.props.type}/${value}/${this.props.keyword}`);
    this.changeState();
  }

  render(){
    return(
      <div>
        <ImgWrapper>
          <Title>
            <input id="searchInput"
                   placeholder="검색어를 입력하세요"
                   onChange={this.getSearchValue}
                   onKeyDown={this.submitEnter}
                   maxLength = "100"
                   />
            <button onClick={this.onSearchSubmit} className="searchBtn">
              <i aria-hidden="true" size="huge" className="search icon"></i>
            </button>
          </Title>
        </ImgWrapper>
        <MenuWrap>
          <Content>
            <Wrapper>
              <MenuContainer devided="vertically" padded={true} columns={2}>
                <Grid.Row>
                  <Grid.Column widescreen={8} largeScreen={8} computer={8} tablet={8} mobile={8}>
                    <Dropdown placeholder={this.props.type && this.props.type === "designer"
                                          ? "디자이너"
                                          : this.props.type && this.props.type === "group"
                                          ? "그룹"
                                          : "디자인"}
                              options={type}
                              onChange={this.typeChange}/>
                  </Grid.Column>
                  {/* <CategoryContainer widescreen={8} largeScreen={8} computer={8} tablet={10} mobile={11} handleCate1={this.cate1Change} handleCate2={this.cate2Change} cate1={this.props.cate1} cate2={this.props.cate2}/> */}
                  <Sorting widescreen={8} largeScreen={8} computer={8} tablet={8} mobile={8} handleClick={this.sortChange} placeholder={this.props.sort}/>
                </Grid.Row>
              </MenuContainer>
            </Wrapper>
          </Content>
        </MenuWrap>
        <Content>
          {this.state.rendering &&
          <Wrapper>
            {this.props.type === "designer"
            ? <ScrollDesignerListContainer sort={this.props.sort} keyword={this.props.keyword}/>
            : this.props.type === "group"
            ? <ScrollGroupListContainer sort={this.props.sort} keyword={this.props.keyword}/>
            : <ScrollDesignListContainer sort={this.props.sort} keyword={this.props.keyword}/>
            }
          </Wrapper>
          }
        </Content>
      </div>
    )
  }
}

export default SearchList;

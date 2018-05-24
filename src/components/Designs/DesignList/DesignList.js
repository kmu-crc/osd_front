import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Segment, Image, Loader } from "semantic-ui-react";
import Category from "components/Commons/Category";
import Sorting from "components/Commons/Sorting";
import ContentList from "components/Commons/ContentList";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 1rem 8rem 5rem;
  min-width: 660px;
  & ul {
    margin-top: 30px;
  }
  // 로딩 인디케이터
  & .ui.centered.inline.loader.active, .ui.centered.inline.loader.visible {
    margin-left: -29px;
    margin-top: -29px;
    left: 50%;
    top: 50%;
    position: absolute;
  }
`;

const MenuContainer = styled(Grid)`
  font-size: 13px;
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


class DesignList extends Component {
  state = {
    page: 0
  }

  componentWillMount(){
    this.props.GetDesignListRequest(this.state.page, this.props.sort, this.props.cate1, this.props.cate2);
  }

  sortChange = (e, {value}) => {
    let url = "/design";
    this.props.history.replace(`${url}/${value}`);
  }

  touchBottom = (e) => {
    // console.log(document.body.scrollHeight) // 문서 전체의 길이
    // console.log(document.body.offsetHeight) // 보이는 창의 길이
    // console.log(window.scrollY); // 스크롤의 시작 높이 (위에 가려진 컨텐츠 길이와 같음)
    if (window.scrollY + document.body.offsetHeight === document.body.scrollHeight) {
      console.log("bottom");
      // this.props.GetDesignListRequest(this.state.page+1, this.props.sort, this.props.cate1, this.props.cate2)
      // .then(()=>{
      //   this.setState({
      //     page: this.state.page + 1
      //   });
      // });
    }
  }

  render(){
    let list = this.props.DesignList;
    return(
      <Wrapper onWheel={this.touchBottom}>
        <MenuContainer devided="vertically" padded={true} columns={2}>
          <Grid.Row stretched={false}>
            <Category computer={8} tablet={10} mobile={12}/>
            <Sorting computer={8} tablet={6} mobile={4} handleChange={this.sortChange}/>
          </Grid.Row>
        </MenuContainer>
        <ContentList data={list} user={this.props.userInfo} type="design" columns={5}/>
        <Loader inline="centered" size="huge"/>
      </Wrapper>
    );
  }
}

export default DesignList;

import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Loader, Dimmer } from "semantic-ui-react";
import Category from "components/Commons/Category";
import Sorting from "components/Commons/Sorting";
import ContentList from "components/Commons/ContentList";
import InfiniteScroll from 'react-infinite-scroller';

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
    hasMore: true,
    loading: false,
  };

  shouldComponentUpdate(nextProps){
    if (JSON.stringify(nextProps.DesignList) === JSON.stringify(this.props.DesignList)) {
      return false;
    } else {
      console.log("et");
      return true;
    }
  }

  sortChange = (e, {value}) => {
    this.props.history.replace(`/design/${value}/${this.props.cate1}/${this.props.cate2}`);
    //this.props.GetDesignListRequest(0, value, this.props.cate1, this.props.cate2);
  }

  cate1Change = (e, {value}) => {
    this.props.history.replace(`/design/${this.props.sort}/${value}/${null}`);
    this.props.GetDesignListRequest(0, this.props.sort, value, null);
  }

  cate2Change = (e, {value}) => {
    this.props.history.replace(`/design/${this.props.sort}/${this.props.cate1}/${value}`);
    this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, value);
  }

  getLoadData = (page) => {
      this.props.GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2)
      .then(() => {
        this.setState({
          hasMore: this.props.DesignList.length === 0? false : true
        });
      });
  }

  render(){
    console.log("렌더링됨");
    let listAll = this.props.DesignListAdded;
    console.log(listAll);
    let item = [];
    listAll.length !== 0 && listAll.map((list, i)=> 
      item.push(<ContentList key={i} data={list} user={this.props.userInfo} type="design" columns={5}/>)
    );

    return(
      <Wrapper>
        <MenuContainer devided="vertically" padded={true} columns={2}>
          <Grid.Row stretched={false}>
            <Category computer={8} tablet={10} mobile={12} handleCate1={this.cate1Change} handleCate2={this.cate2Change}/>
            <Sorting computer={8} tablet={6} mobile={4} handleChange={this.sortChange}/>
          </Grid.Row>
        </MenuContainer>
        <InfiniteScroll threshold={700} pageStart={-1} loadMore={this.getLoadData} 
                        hasMore={this.state.hasMore}
                        loader={ <Loader active={this.state.loading? true : false} inline="centered" size="huge" key={0}/> }>
          {item}
        </InfiniteScroll>
      </Wrapper>
    );
  }
}

export default DesignList;

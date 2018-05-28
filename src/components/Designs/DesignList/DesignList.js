import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Loader } from "semantic-ui-react";
import Category from "components/Commons/Category";
import Sorting from "components/Commons/Sorting";
import ScrollListContainer from "containers/Commons/ScrollList";

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

const MenuContainer = styled(Grid) `
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
    rendering: true
  }

  changeState = () => {
    this.setState({
      rendering: false
    });
    setTimeout(()=>{
      this.setState({
        rendering: true
      });
    }, 200);
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/design/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.props.GetDesignListRequest(0, value, this.props.cate1, this.props.cate2);
    this.changeState();
  }

  cate1Change = (e, { value }) => {
    this.props.history.replace(`/design/${this.props.sort}/${value}/${null}`);
    this.props.GetDesignListRequest(0, this.props.sort, value, null);
    this.changeState();
  }

  cate2Change = (e, { value }) => {
    this.props.history.replace(`/design/${this.props.sort}/${this.props.cate1}/${value}`);
    this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, value);
    this.changeState();
  }

  render() {
    console.log("렌더링됨");
    const {sort, cate1, cate2} = this.props;

    return (
      <Wrapper>
        <MenuContainer devided="vertically" padded={true} columns={2}>
          <Grid.Row stretched={false}>
            <Category computer={8} tablet={10} mobile={12} handleCate1={this.cate1Change} handleCate2={this.cate2Change} />
            <Sorting computer={8} tablet={6} mobile={4} handleChange={this.sortChange} />
          </Grid.Row>
        </MenuContainer>
      {this.state.rendering && <ScrollListContainer sort={sort} cate1={cate1} cate2={cate2}/>}
      </Wrapper>
    );
  }
}

export default DesignList;

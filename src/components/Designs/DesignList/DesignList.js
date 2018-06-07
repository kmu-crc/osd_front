import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 5rem;
  & ul {
    margin-top: 30px;
  }
  // 로딩 인디케이터
  & .ui.centered.inline.loader.active, .ui.centered.inline.loader.visible {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
    setTimeout(() => {
      this.setState({
        rendering: true
      });
    }, 200);
  }

  shouldComponentUpdate(){
    return false;
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/design/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.props.GetDesignListRequest(0, value, this.props.cate1, this.props.cate2);
    this.changeState();
  }

  cate1Change = (value) => {
    this.props.history.replace(`/design/${this.props.sort}/${value}/${null}`);
    this.props.GetDesignListRequest(0, this.props.sort, value, null);
    this.changeState();
  }

  cate2Change = (value) => {
    this.props.history.replace(`/design/${this.props.sort}/${this.props.cate1}/${value}`);
    this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, value);
    this.changeState();
  }

  render() {
    const { sort, cate1, cate2 } = this.props;
    return (
      <ContentBox>
        <Wrapper>
          <MenuContainer devided="vertically" padded={true}>
            <Grid.Row>
              <CategoryContainer widescreen={8} largeScreen={8} computer={8} tablet={10} mobile={11} handleCate1={this.cate1Change} handleCate2={this.cate2Change}/>
              <Sorting widescreen={8} largeScreen={8} computer={8} tablet={5} mobile={4} handleChange={this.sortChange} />
            </Grid.Row>
          </MenuContainer>
          {this.state.rendering && <ScrollDesignListContainer sort={sort} cate1={cate1} cate2={cate2} />}
        </Wrapper>
      </ContentBox>
    );
  }
}

export default DesignList;

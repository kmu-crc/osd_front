import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Category from "components/Commons/Category";
import Sorting from "components/Commons/Sorting";
import ContentList from "components/Commons/ContentList";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 1rem 3rem 5rem;
  min-width: 660px;
  & ul {
    margin-top: 30px;
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
`;


class DesignerList extends Component {
  render(){
    let list = this.props.DesignerList;
    return(
      <Wrapper>
        <MenuContainer devided="vertically" padded={true} columns={2}>
          <Grid.Row stretched={false}>
            <Category computer={8} tablet={10} mobile={12}/>
            <Sorting computer={8} tablet={6} mobile={4}/>
          </Grid.Row>
        </MenuContainer>
        <ContentList data={list} type="designer"/>
      </Wrapper>
    );
  }
}

export default DesignerList;

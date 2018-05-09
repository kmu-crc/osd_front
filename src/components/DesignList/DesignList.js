import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Category from "../commons/Category";
import Sorting from "../commons/Sorting";
import ContentList from "../commons/ContentList";

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
`;


class DesignList extends Component {
  render(){
    let list = this.props.DesignList;
    return(
      <div>
        {list != null && list.length > 0 ?
        <Wrapper>
          <MenuContainer devided="vertically" padded={true} columns={2}>
            <Grid.Row stretched={false}>
              <Category computer={8} tablet={10} mobile={12}/>
              <Sorting computer={8} tablet={6} mobile={4}/>
            </Grid.Row>
          </MenuContainer>
          <ContentList data={list} type="design"/>
        </Wrapper>
        :
        <p>등록된 디자인이 없습니다.</p>
        }
      </div>
    );
  }
}

export default DesignList;

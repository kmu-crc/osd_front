import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { Container, Columns, Row } from "../Grid/index";
import { Grid } from "semantic-ui-react";
import Sorting from "../commons/Sorting";
import ContentList from "../commons/ContentList";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 1rem 3rem 5rem;
  min-width: 660px;
`;

const MenuContainer = styled(Grid)`
  font-size: 13px;
  & .sorting {
    text-align: right;
  }
  & .addGroup button{
    padding: 5px 18px;
    font-size: 14px;
    border: 1px solid rgba(25,25,25,0.2);
    font-weight: 400;
    background-color: #fff;
    border-radius: 5px;
  }
  & .addGroup button:hover {
    background-color: #f2f2f2;
  }
`;


class GroupList extends Component {
  render(){
    let list = this.props.GroupList;
    return(
      <Wrapper>
        <MenuContainer devided="vertically" padded={true} columns={2}>
          <Grid.Row stretched={false}>
            <Grid.Column className="addGroup">
              <Link to="/createGroup"><button>새 그룹 추가 +</button></Link>
            </Grid.Column>
            <Sorting/>
          </Grid.Row>
        </MenuContainer>
        <ContentList data={list} type="group"/>
      </Wrapper>
    );
  }
}

export default GroupList;

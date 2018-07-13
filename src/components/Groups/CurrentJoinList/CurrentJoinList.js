import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import DesignInGroupContainer from "containers/Groups/DesignInGroupContainer";
import GroupInGroupContainer from "containers/Groups/GroupInGroupContainer";

// css styling
const TabContainer = styled(Grid.Column)`
  background-color: white;
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  & .columns {
    padding: 0 20px;
  } 
  & .ui.default.dropdown:not(.button)>.text, .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
`;

const Head = styled(Grid)`
  border-bottom: 1px solid rgba(0,0,0,0.25);
  &.ui.grid > .row {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  &.ui.grid > .row > .column.sorting {
    line-height: 2.5;
  }
  & ul {
    line-height: 38px;
  }
  & li {
    float: left;
    width: 120px;
    text-align: center;
    cursor: pointer;
  }
  & li:hover {
    font-weight: 500;
  }
  & li.onSelected {
    color: red;
    position: relative;
  }
`;

const MiniContentBox = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  @media only screen and (max-width: 767px) and (min-width: 320px){
    padding: 0 20px;
    width: 320px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    width: 450px;
  }
  @media only screen and (min-width: 992px){
    width: 440px;
  }
  @media only screen and (max-width: 1919px) and (min-width: 1200px){
    width: 760px;
  }
  @media only screen and (min-width: 1920px){
    width: 1100px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    .ui.grid > .row{
      margin-left: 6.25% !important;
    }
  }
  @media only screen and (max-width: 1919px) and (min-width: 1200px){
    .ui.grid > .row{
      margin-left: 6.25% !important;
    }
  }
`;

class CurrentJoinList extends Component {
  componentWillUnmount() {
    this.props.DesignInGroupClear([]);
  }

  typeChange = (e) => {
    const type = e.target.id;
    const url = `/groupDetail/${this.props.id}/${type}/${this.props.sort}`;
    this.props.history.replace(url);
  }

  sortChange = (e, {value}) => {
    const type = this.props.type;
    const url = `/groupDetail/${this.props.id}`;
    this.props.history.replace(`${url}/${type}/${value}`);
  }

  render(){
    return(
      <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
        <Head devided="vertically" padded={true} columns={2}>
          <Grid.Row>
            <Grid.Column as="ul">
              <li id="design"
                  className={this.props.type === "design" || this.props.type === null || this.props.type === "null" ? "onSelected" : ""}
                  onClick={this.typeChange}>디자인</li>
              <li id="group"
                  className={this.props.type === "group"? "onSelected" : ""}
                  onClick={this.typeChange}>그룹</li>
              <div className="clear"></div>
            </Grid.Column>
            <Sorting computer={8} tablet={8} mobile={8} handleChange={this.sortChange}/>
          </Grid.Row>
        </Head>
        <MiniContentBox>
          <Route path="/groupDetail/:id/:type?/:sort?"
                component={this.props.type === "group"? GroupInGroupContainer : DesignInGroupContainer}/>
        </MiniContentBox>
      </TabContainer>
    );
  }
}

export default CurrentJoinList;

import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import WaitingDesignContainer from "containers/Groups/WaitingDesignContainer";
import WaitingGroupContainer from "containers/Groups/WaitingGroupContainer";
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";

// css styling
const TabContainer = styled(Grid.Column)`
  background-color: white;
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
  & ul {
    line-height: 38px;
  }
  & li {
    float: left;
    padding: 0 1.4rem;
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

const ContentBox = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 767px) and (min-width: 320px){
    width: 470px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    width: 450px;
  }
  @media only screen and (min-width: 992px){
    width: 705px;
  }
  @media only screen and (max-width: 1399px) and (min-width: 1200px){
    width: 855px;
  }
  @media only screen and (max-width: 1699px) and (min-width: 1400px){
    width: 900px;
  }
  @media only screen and (max-width: 1919px) and (min-width: 1700px){
    width: 1210px;
  }
  @media only screen and (min-width: 1920px){
    width: 1368px;
  }
`;

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ModifyJoinList extends Component {
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
      <TabContainer mobile={16} tablet={12} computer={12}>
        <Head devided="vertically" padded={true} columns={2}>
          <Grid.Row>
            <Grid.Column as="ul" widescreen={10} largeScreen={10} computer={10} tablet={10} mobile={10}>
              <li id="design" 
                  className={this.props.type === "design" || this.props.type === null || this.props.type === "null" ? "onSelected" : ""}
                  onClick={this.typeChange}>가입한 디자인</li>
              <li id="group" 
                  className={this.props.type === "group"? "onSelected" : ""}
                  onClick={this.typeChange}>가입한 그룹</li>
              <li id="waitingDesign" 
                  className={this.props.type === "waitingDesign"? "onSelected" : ""}
                  onClick={this.typeChange}>가입 신청한 디자인</li>
              <li id="waitingGroup" 
                  className={this.props.type === "waitingGroup"? "onSelected" : ""}
                  onClick={this.typeChange}>가입 신청한 그룹</li>
              <div className="clear"></div>
            </Grid.Column>
            <Sorting widescreen={6} largeScreen={6} computer={6} tablet={6} mobile={6} 
                     handleChange={this.sortChange}/>
          </Grid.Row>
        </Head>
        <ContentBox>
          <ListContainer devided="vertically" padded={true} as="ul">
            <Route path="/groupDetail/:id/:type?/:sort?" 
                   component={this.props.type === "waitingGroup" ? WaitingGroupContainer
                              : this.props.type === "waitingDesign" ? WaitingDesignContainer
                              : this.props.type === "group" ? EditGroupListContainer
                              : EditDesignListContainer
                              }
            />
        </ListContainer>
        </ContentBox>
      </TabContainer>
    );
  }
}

export default ModifyJoinList;

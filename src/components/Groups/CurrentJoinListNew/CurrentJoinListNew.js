import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import DesignInGroupContainer from "containers/Groups/DesignInGroupContainer";
import GroupInGroupContainer from "containers/Groups/GroupInGroupContainer";
import StyleGuide from 'StyleGuide';

// css styling
const TabContainer = styled.div`
  width: 100%;
  & .ui.default.dropdown:not(.button)>.text, .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  & > p {
    text-align: center;
  }
`;

const Head = styled(Grid)`
  &.ui.grid > .row {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    margin: 0;
  }
  &.ui.grid > .row > .column.sorting {
    line-height: 2.5;
  }
`;

class CurrentJoinListNew extends Component {
  componentDidMount() {
    this.props.GetGroupCountRequest(this.props.id);
  }

  componentWillUnmount() {
    this.props.DesignInGroupClear([]);
    this.props.GroupInGroupClear([]);
  }

  sortChange = (e, {value}) => {
    const url = `/groupDetail/${this.props.id}`;
    this.props.history.replace(`${url}/${value}`);
  }

  render(){
    return(
      <TabContainer>
        <Head devided="vertically" padded={true}>
          <Grid.Row>
            <Grid.Column largescreen={8} computer={8} tablet={8} mobile={8}></Grid.Column>
            <Sorting largescreen={8} computer={8} tablet={8} mobile={8} handleChange={this.sortChange}/>
          </Grid.Row>
        </Head>
        {this.props.Count.design === 0 && this.props.Count.group === 0 &&
        <p>가입된 컨텐츠가 없습니다.</p>
        }
        <GroupInGroupContainer id={this.props.id} sort={this.props.sort} count={this.props.Count.group}/>
        <DesignInGroupContainer id={this.props.id} sort={this.props.sort} count={this.props.Count.design}/>
      </TabContainer>
    );
  }
}

export default CurrentJoinListNew;

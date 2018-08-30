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

const GroupBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

const DesignBox = styled.div`
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
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
        <GroupBox>
          <div className="boxTitle">그룹 ({this.props.Count.group})</div>
          <GroupInGroupContainer id={this.props.id} sort={this.props.sort}/>
        </GroupBox>
        <DesignBox>
          <div className="boxTitle">디자인 ({this.props.Count.design})</div>
          <DesignInGroupContainer id={this.props.id} sort={this.props.sort}/>
        </DesignBox>
      </TabContainer>
    );
  }
}

export default CurrentJoinListNew;

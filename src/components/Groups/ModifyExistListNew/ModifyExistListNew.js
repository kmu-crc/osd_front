import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";
import StyleGuide from 'StyleGuide';

// css styling
const TabContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
`;

const Head = styled(Grid)`
  &.ui.grid > .row {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  &.ui.grid > .row > .column.sorting {
    line-height: 2.5;
  }
`;

class ModifyExistListNew extends Component {
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
        <EditGroupListContainer id={this.props.id} sort={this.props.sort}/>
        <EditDesignListContainer id={this.props.id} sort={this.props.sort}/>
      </TabContainer>
    );
  }
}

export default ModifyExistListNew;

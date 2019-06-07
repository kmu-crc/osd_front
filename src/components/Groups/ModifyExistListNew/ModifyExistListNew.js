import React, { Component } from 'react';
import styled from 'styled-components';
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";

// css styling
const TabContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
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

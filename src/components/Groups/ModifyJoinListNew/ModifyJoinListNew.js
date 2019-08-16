import React, { Component } from 'react';
import styled from 'styled-components';
import WaitingDesignContainer from "containers/Groups/WaitingDesignContainer";
import WaitingGroupContainer from "containers/Groups/WaitingGroupContainer";

// css styling
const TabContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
`;

class ModifyJoinListNew extends Component {
  componentWillUnmount() {
    this.props.DesignInGroupClear([]);
  }

  sortChange = (e, {value}) => {
    const url = `/groupDetail/${this.props.id}`;
    this.props.history.replace(`${url}/${value}`);
  }

  render(){
    return(
      <TabContainer>
        <WaitingGroupContainer id={this.props.id} sort={this.props.sort}/>
        <WaitingDesignContainer id={this.props.id} sort={this.props.sort}/>
      </TabContainer>
    );
  }
}

export default ModifyJoinListNew;

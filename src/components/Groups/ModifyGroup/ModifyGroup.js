import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Header } from "semantic-ui-react";
import ModifyGroupInfoContainer from "containers/Groups/ModifyGroupInfoContainer";

// css styling

class ModifyGroup extends Component {
  render(){
    return(
      <Container>
        <Header as="h1">그룹 정보 수정</Header>
        <ModifyGroupInfoContainer {...this.props}/>
      </Container>
    );
  }
}

export default ModifyGroup;

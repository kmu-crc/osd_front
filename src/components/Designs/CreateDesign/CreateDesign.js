import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import CreateDesignFormContainer from "containers/Designs/CreateDesignFormContainer";

class CreateDesign extends Component {
  render() {
    return (
      <Container>
        <Header as='h1'>디자인 등록</Header>
        <CreateDesignFormContainer />
      </Container>
    );
  }
}

export default CreateDesign;

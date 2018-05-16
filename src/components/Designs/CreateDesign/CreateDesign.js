import React, { Component } from "react";
import styled from "styled-components";
import { Container, Header, Button } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import CreateInfo from "components/Designs/CreateInfo";

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  padding: 40px;
  margin-bottom: 30px;
`

class CreateDesign extends Component {
  state = {
    useProject: true
  };

  onProjectActive = () => {
    this.setState({
      useProject: !(this.state.useProject)
    });
  }

  goFileTrue = () => {
    console.log("file upload");
  }

  render() {
    return (
      <Container>
        <Header as='h1'>디자인 등록</Header>
        <ValidateForm onSubmit={this.goFileTrue}>
          <CreateInfo />
          <Button type="submit">등록</Button>
        </ValidateForm>
      </Container>
    );
  }
}

export default CreateDesign;

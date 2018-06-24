import React, { Component } from "react";
import styled from "styled-components";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput } from "components/Commons/FormItem";
import { Button, Icon } from "semantic-ui-react";
import FormDataToJson from "modules/FormDataToJson";

const Board = styled.li`
  padding: 5px;
  width: 250px;
  float: left;
  box-sizing: border-box;
  background-color: #dbdada;
  border-radius: 3px;
  button {
    margin: 0 !important;
    margin-left: 1% !important;
    line-height: 1.21428571em !important;
    padding: 0.67857143em 1em !important;
    border: 1px solid #e0e1e2 !important;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  padding: 0.67857143em 1em;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  margin-top: 1rem;
`

const CloseBtn = styled(Button)`
  background-color: transparent !important;
  border: 0 !important;
  padding: 10px !important;
  margin-left: 10px !important;
`;

class CreateBoard extends Component {
  state = {
    active: false
  };
  formActive = async () => {
    await this.setState({ active: true });
    this.form._reactInternalFiber.child.child.stateNode.title.focus();
  };
  handleSubmit = data => {
    let formData = FormDataToJson(data);
    formData.order = this.props.order;
    console.log(formData);
    this.props
      .CreateDesignBoardRequest(formData, this.props.designId, this.props.token)
      .then(data => {
        this.props.GetDesignBoardRequest(this.props.designId);
      });
    this.setState({ active: false });
  };
  handelClose = () => {
    this.setState({ active: false });
  };
  render() {
    return (
      <Board>
        {this.state.active ? (
          <ValidateForm
            onSubmit={this.handleSubmit}
            ref={ref => (this.form = ref)}
          >
            <FormInput
              name="title"
              type="text"
              placeholder="새 보드 추가"
              onBlur={() => this.setState({ active: false })}
            />
            <ButtonWrap>
              <Button>생성</Button>
              <CloseBtn type="button" onClick={this.handelClose}>
                <Icon name="close" />
              </CloseBtn>
            </ButtonWrap>
          </ValidateForm>
        ) : (
          <Title onClick={this.formActive}>새 보드 추가 +</Title>
        )}
      </Board>
    );
  }
}

export default CreateBoard;

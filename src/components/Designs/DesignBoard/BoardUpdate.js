import React, { Component } from "react";
import ValidateForm from "components/Commons/ValidateForm";
import { Icon } from "semantic-ui-react";
import { FormInput } from "components/Commons/FormItem";
import Button from "components/Commons/Button";
import FormDataToJson from "modules/FormDataToJson";
import styled from "styled-components";

const Update = styled.div`
  padding: 10px 0;
  button {
    margin: 0 !important;
    margin-left: 1% !important;
    line-height: 1.21428571em !important;
    padding: 0.67857143em 1em !important;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 1rem;
`;

const CloseBtn = styled(Button)`
  background-color: transparent !important;
  border: 0 !important;
  padding: 10px !important;
  margin-left: 10px !important;
`;

class BoardUpdate extends Component {
  onSubmit = data => {
    let formData = FormDataToJson(data);
    this.props
      .onUpdate(this.props.board.uid, this.props.token, formData)
      .then(() => {
        this.props.getBoard(this.props.board.design_id);
        this.props.ModifyComplete();
      });
  };

  handelClose = () => {
    this.props.ModifyComplete();
  };

  render() {
    return (
      <Update>
        <ValidateForm onSubmit={this.onSubmit}>
          <FormInput
            name="title"
            type="text"
            value={this.props.value}
            placeholder="새 보드 추가"
          />
          <ButtonWrap>
            <Button type="submit">수정</Button>
            <CloseBtn type="button" onClick={this.handelClose}>
              <Icon name="close" />
            </CloseBtn>
          </ButtonWrap>
        </ValidateForm>
      </Update>
    );
  }
}

export default BoardUpdate;

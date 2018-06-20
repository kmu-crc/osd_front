import React, { Component } from "react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput } from "components/Commons/FormItem";
import Button from "components/Commons/Button";
import FormDataToJson from "modules/FormDataToJson";
import styled from "styled-components";

const Update = styled.div`
  input {
    width: 70% !important;
    float: left;
  }
  button {
    width: 29%;
    margin: 0 !important;
    margin-left: 1% !important;
    display: block !important;
    float: left;
    line-height: 1.21428571em !important;
    padding: 0.67857143em 1em !important;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

class BoardUpdate extends Component {
  onSubmit = data => {
    let formData = FormDataToJson(data);
    this.props.onUpdate(this.props.board.uid, this.props.token, formData).then(() => {
      this.props.getBoard(this.props.board.design_id);
      this.props.ModifyComplete();
    })
  };

  render() {
    return (
      <Update>
        <ValidateForm onSubmit={this.onSubmit}>
          <FormInput name="title" type="text" value={this.props.value} placeholder="새 보드 추가" />
          <Button type="submit">수정</Button>
        </ValidateForm>
      </Update>
    );
  }
}

export default BoardUpdate;

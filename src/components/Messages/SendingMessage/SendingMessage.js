import React, { Component } from 'react';
import styled from 'styled-components';
// import { Container, Header } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";

// css styling

class SendingMessage extends Component {
  onSubmitForm = async (data) => {
    if (this.props.toUser === null) {
      alert("받는 사람을 지정해주세요.");
      return;
    }
    this.props.SendMessageRequest(this.props.token, FormDataToJson(data), this.props.toUser);
  }

  render(){
    return(
      <div>
        <ValidateForm onSubmit={this.onSubmitForm} className="ui reply form">
          <FormField name="message" validates={["required"]} RenderComponent={FormTextArea} />
          <Button type="submit">
            보내기
          </Button>
        </ValidateForm>
      </div>
    );
  }
}

export default SendingMessage;

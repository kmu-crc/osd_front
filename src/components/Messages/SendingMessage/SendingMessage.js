import React, { Component } from 'react';
import styled from 'styled-components';
// import { Container, Header } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import { FormField } from "components/Commons/FormField";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
// css styling

class SendingMessage extends Component {
  state = {
    render: true
  }

  onSubmitForm = async (data) => {
    if (this.props.toUser === null) {
      await alert("받는 사람을 지정해주세요.","확인");
      return;
    }
    this.props.SendMessageRequest(this.props.token, FormDataToJson(data), this.props.toUser)
    .then(async data => {
      if (data.success === true) {

      }
      await this.setState({
        render: false
      });
      this.setState({
        render: true
      });
    })
  }

  render(){
    return(
      <div>
        {this.state.render &&
        <ValidateForm onSubmit={this.onSubmitForm} className="ui reply form">
          <FormField name="message" validates={["required"]} RenderComponent={FormTextArea} />
          <Button type="submit">
            보내기
          </Button>
        </ValidateForm>
        }
      </div>
    );
  }
}

export default SendingMessage;

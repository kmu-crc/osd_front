import React, { Component } from 'react';
import { Form, Input, TextArea, Icon } from "semantic-ui-react";
class ValidateForm extends React.Component {
  state = {
    submit: false
  }
  handelSubmit = (event) => {
    event.preventDefault();
    const target = event.target;
    let fromData = {};
    for (let data of Array.from(target.elements)) {
      if (data.name) {
        if (!data.attributes.status) {
          fromData = {};
          this.setState({ submit: false });
          data.focus();
          break;
        } else {
          fromData[data.name] = data.value;
          this.setState({ submit: true });
        }
      }
    }
    setTimeout(() => {
      if (this.state.submit) {
        this.props.onSubmit(fromData);
      }
    }, 100);
  }
  render() {
    return (
      <Form onSubmit={this.handelSubmit}>
        {this.props.children}
      </Form>
    );
  }
}

export default ValidateForm;

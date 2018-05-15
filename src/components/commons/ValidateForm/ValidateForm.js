import React, { Component } from 'react';
import { Form } from "semantic-ui-react";
class ValidateForm extends Component {
  state = {
    submit: false
  }
  handelSubmit = (event) => {
    event.preventDefault();
    const target = event.target;
    console.log(target);
    const formData = new FormData(target);
    for (let data of Array.from(target.elements)) {
      if (data.name) {
        if (!data.attributes.status) {
          this.setState({ submit: false });
          data.focus();
          break;
        } else {
          this.setState({ submit: true });
        }
      }
    }
    setTimeout(() => {
      if (this.state.submit) {
        this.props.onSubmit(formData);
      }
    }, 100);
  }
  render() {
    return (
      <Form onSubmit={this.handelSubmit} >
        {this.props.children}
      </Form>
    );
  }
}

export default ValidateForm;

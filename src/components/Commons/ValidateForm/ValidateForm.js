import React, { Component } from 'react';
import { Form } from "semantic-ui-react";
class ValidateForm extends Component {
  state = {
    submit: false
  }
  handelSubmit = async (event) => {
    event.preventDefault();
    // console.log("ignore", this.props.ignore)
    const target = event.target;
    const formData = new FormData(target);
    for (let data of Array.from(target.elements)) {
      if (data.name) {
        if (!data.attributes.status) {
          await this.setState({ submit: false });
          data.focus();
          break;
        } else {
          if (data.type === "checkbox") {
            console.log("checkbox value", data.value);
            data.value === "1" ? formData.set(data.name, 1) : formData.set(data.name, 0);
          } else if (data.type === "file") {
            data.files[0] == null && formData.delete(data.name);
          }
          await this.setState({ submit: true });
        }
      }
    }
    if (this.props.ignore) await this.setState({ submit: true })
    if (this.state.submit) {
      this.props.onSubmit(formData);
    }
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

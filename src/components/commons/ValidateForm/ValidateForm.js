import React, { Component } from 'react';
import { Form } from "semantic-ui-react";
class ValidateForm extends Component {
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
          if(data.type === "file"){
            fromData[data.name] = data.files[0];
          } else if(data.type === "checkbox") {
            fromData[data.name] = data.checked;
          } else {
            fromData[data.name] = data.value;
          }

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
      <Form onSubmit={this.handelSubmit} >
        {this.props.children}
      </Form>
    );
  }
}

export default ValidateForm;

import React, { Component } from "react";

export class Controller extends Component {
  state = {
    controller: "INIT"
  };

  async componentDidMount(){
    if(this.props.type) await this.setState({controller: this.props.type})
  }

  render() {
    const { controller } = this.state;
    const { content } = this.props;
    return (
      <div>
        {controller === "INIT" ? (
          <div>controller</div>
        ) : controller === "FILE" ? (
          <div>file</div>
        ) : controller === "TEXT" ? (
          <div>text</div>
        ) : controller === "EMBED" ? (
          <div>Embed</div>
        ) : null}
      </div>
    );
  }
}

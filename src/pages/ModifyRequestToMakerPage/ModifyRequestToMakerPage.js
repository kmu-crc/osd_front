import React, { Component } from "react";
import ModifyRequestToMakerContainer from "containers/Maker/ModifyRequestToMakerContainer/ModifyRequestToMakerContainer";

class ModifyRequestToMakerPage extends Component {
  render() {
    return (<ModifyRequestToMakerContainer id={this.props.match.params.id} />);
  }
}

export default ModifyRequestToMakerPage;

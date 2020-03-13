import React, { Component } from "react";
import ModifyRequestToDesignerContainer from "containers/Request/ModifyRequestToDesignerContainer/ModifyRequestToDesignerContainer";

class ModifyRequestToDesignerPage extends Component {
  render() {
    return (<ModifyRequestToDesignerContainer id={this.props.match.params.id ? this.props.match.params.id : null} />);
  }
}

export default ModifyRequestToDesignerPage;

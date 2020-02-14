import React, { Component } from "react";
import ModifyRequestToDesignerContainer from "containers/Request/ModifyReqeustToDesignerContainer/RequestToDesignerContainer";

class ModifyRequestToDesignerPage extends Component {
  render() {
    return (<ModifyRequestToDesignerContainer id={this.props.match.params.id ? this.props.match.params.id : null} />);
  }
}

export default ModifyRequestToDesignerPage;

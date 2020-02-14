import React, { Component } from "react";
import ModifyDesignerContainer from "containers/Designer/ModifyDesignerContainer/ModifyDesignerContainer"

class ModifyDesignerPage extends Component {
  render() {
    return (<ModifyDesignerContainer id={this.props.match.params.id ? this.props.match.params.id : null}/>);
  }
}

export default ModifyDesignerPage;

import React, { Component } from "react";
import CreateDesignerContainer from "containers/Designer/CreateDesignerContainer/CreateDesignerContainer"

class CreateDesignerPage extends Component {
  render() {
    return (<CreateDesignerContainer
      keep={this.props.location.state && this.props.location.state.keep}
    />);
  }
}

export default CreateDesignerPage;

import React, { Component } from "react";
import ModifyDesign from "components/Designs/ModifyDesign";

class ModifyDesignPage extends Component {
  render() {
    return (<ModifyDesign id={this.props.match.params.id} history={this.props.history} />);
  }
}

export default ModifyDesignPage;

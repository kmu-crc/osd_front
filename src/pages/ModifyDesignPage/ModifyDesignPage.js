import React, { Component } from "react";
import ModifyDesignContainer from "containers/Designs/ModifyDesignInfoContainer/ModifyDesignInfoContainer";

class ModifyDesignPage extends Component {
  render() {
    console.log("thisModifyDesign", this.props);
    return (
      <ModifyDesignContainer id={this.props.match.params.id} />
    );
  }
}

export default ModifyDesignPage;

import React, { Component } from "react";
import ModifyItemFormContainer from "containers/Items/ModifyItemFormContainer";


class ModifyItem extends Component {
  render() {
    // console.log("props", this.props)
    return (
        <ModifyItemFormContainer
          history={this.props.history}
          id={this.props.id} />
    );
  }
}

export default ModifyItem;

import React, { Component } from "react";
import ModifyItem from "components/Items/ModifyItem";

class ModifyItemPage extends Component {
  render() {
    return (<ModifyItem id={this.props.match.params.id} history={this.props.history} />);
  }
}

export default ModifyItemPage;

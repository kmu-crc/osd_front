import React, { Component } from "react";
import ModifyProduct from "components/Products/ModifyProduct";

class ModifyProductPage extends Component {
  render() {
    return (<ModifyProduct id={this.props.match.params.id} history={this.props.history} />);
  }
}

export default ModifyProductPage;

import React, { Component } from "react";
import CreateItem from "components/Products/CreateItem";

class CreateProductPage extends Component {
  render() {
    return (<CreateItem
      keep={this.props.location.state && this.props.location.state.keep}
    />);
  }
}

export default CreateProductPage;

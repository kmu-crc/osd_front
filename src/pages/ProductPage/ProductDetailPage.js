import React, { Component } from "react";
import ProductDetailContainer from "containers/Products/ProductDetailContainer";

export class ProductDetailPage extends Component {
  render() {
    return (<ProductDetailContainer id={this.props.match.params.id} token={this.props.token}/>);
  }
}

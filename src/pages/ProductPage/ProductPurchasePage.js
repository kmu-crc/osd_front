import React, { Component } from "react";
import ProductPurchaseContainer from "containers/Products/ProductPurchaseContainer";

export class ProductPurchasePage extends Component {
  render() {
    return (<ProductPurchaseContainer 
      id={this.props.match.params.id}
      payment={this.props.match.params.payment}
      />);
  }
}

import React, { Component } from "react";
import ProductListContainer from "containers/Products/ProductListContainer";

class ProductListPage extends Component {
  render() {
    return (
      <ProductListContainer
        sort={this.props.match.params.sorting ? this.props.match.params.sorting : "update"}
        cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
        cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
        cate3={this.props.match.params.cate3 ? this.props.match.params.cate3 : null}
        history={this.props.history} />
    );
  }
}

export default ProductListPage;

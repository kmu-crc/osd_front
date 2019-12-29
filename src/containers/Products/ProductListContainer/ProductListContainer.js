import React, { Component } from "react";
import { connect } from "react-redux";

import { GetProductListRequest, GetProductTotalCountRequest } from "actions/Product";
import ProductList from "components/Products/ProductList";

class ProductListContainer extends Component {
  render() {
    return (
      <ProductList {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
    Count: state.ProductList.status.Count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetProductListRequest: (page, sort, cate1, cate2) => dispatch(GetProductListRequest(page, sort, cate1, cate2)),
    GetProductTotalCountRequest: (cate1, cate2) => dispatch(GetProductTotalCountRequest(cate1, cate2))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);

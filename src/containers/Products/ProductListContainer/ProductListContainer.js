import React, { Component } from "react";
import { connect } from "react-redux";
import { GetProductListRequest, GetProductTotalCountRequest } from "actions/Product";
import ProductList from "components/Products/ProductList";

class ProductListContainer extends Component {
  render() {
    return (<ProductList {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
    category3: state.CategoryAll.status.category3,
    Count: state.ProductList.status.Count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetProductListRequest: (page, sort, cate1, cate2, cate3) => dispatch(GetProductListRequest(page, sort, cate1, cate2, cate3)),
    GetProductTotalCountRequest: (cate1, cate2, cate3) => dispatch(GetProductTotalCountRequest(cate1, cate2, cate3))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);

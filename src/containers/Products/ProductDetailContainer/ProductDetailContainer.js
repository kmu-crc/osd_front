import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProductDetail from "components/Products/ProductDetail";
import {
  GetProductDetailRequest, GetProductCountRequest, GetLikeProductRequest,
  UpdateProductViewRequest, LikeProductRequest, UnlikeProductRequest,addCartRequest
} from "actions/Product";
import { DeleteProductRequest } from "actions/Products/DeleteProduct";

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.GetProductDetailRequest(this.props.id);
  }
  render() {
    return (<ProductDetail {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    ProductDetail: state.ProductDetail.status.ProductDetail,
    Count: state.ProductDetail.status.Count,
    like: state.ProductLike.status.like,
    userInfo: state.Authentication.status.userInfo,
    valid: state.Authentication.status.valid,
    token: state.Authentication.status.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetProductDetailRequest: (id, token) => dispatch(GetProductDetailRequest(id, token)),
    GetProductCountRequest: (id) => dispatch(GetProductCountRequest(id)),
    GetLikeProductRequest: (id, token) => dispatch(GetLikeProductRequest(id, token)),
    LikeProductRequest: (id, token) => dispatch(LikeProductRequest(id, token)),
    UpdateProductViewRequest: (id) => dispatch(UpdateProductViewRequest(id)),
    UnlikeProductRequest: (id, token) => dispatch(UnlikeProductRequest(id, token)),
    DeleteProductRequest: (id, token) => dispatch(DeleteProductRequest(id, token)),
    addCartRequest:(items,token)=>dispatch(addCartRequest(items,token)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer));

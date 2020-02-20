import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemDetail from "components/Items/ItemDetail";
import {
  // GetProductDetailRequest,
  GetProductCountRequest, GetLikeProductRequest,
  UpdateProductViewRequest, LikeProductRequest, UnlikeProductRequest, addCartRequest
} from "actions/Product";
import { GetItemDetailRequest } from "actions/Item";
import { DeleteProductRequest } from "actions/Products/DeleteProduct";

class ProductDetailContainer extends Component {
  componentDidMount() {
    this.props.GetItemDetailRequest(this.props.id, this.props.token);
  }
  render() {
    return (<ItemDetail item={this.props.ItemDetail} {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  ItemDetail: state.ItemDetail.status.ItemDetail,

  Count: state.ProductDetail.status.Count,
  like: state.ProductLike.status.like,
  userInfo: state.Authentication.status.userInfo,
  valid: state.Authentication.status.valid,
  token: state.Authentication.status.token,
});

const mapDispatchToProps = (dispatch) => ({
  GetItemDetailRequest: (id, token) => dispatch(GetItemDetailRequest(id, token)),
  GetProductCountRequest: (id) => dispatch(GetProductCountRequest(id)),
  GetLikeProductRequest: (id, token) => dispatch(GetLikeProductRequest(id, token)),
  LikeProductRequest: (id, token) => dispatch(LikeProductRequest(id, token)),
  UpdateProductViewRequest: (id) => dispatch(UpdateProductViewRequest(id)),
  UnlikeProductRequest: (id, token) => dispatch(UnlikeProductRequest(id, token)),
  DeleteProductRequest: (id, token) => dispatch(DeleteProductRequest(id, token)),
  addCartRequest: (items, token) => dispatch(addCartRequest(items, token)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer));

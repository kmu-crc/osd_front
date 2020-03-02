import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemDetail from "components/Items/ItemDetail";
import Loading from "components/Commons/Loading";
import {
  // GetProductDetailRequest,
  GetProductCountRequest, GetLikeProductRequest,
  UpdateProductViewRequest, LikeProductRequest, UnlikeProductRequest, addCartRequest
} from "actions/Product";
import { CreateItemPaymentRequest, /*GetItemPaymentRequest*/ } from "actions/Payment";
import { GetItemDetailRequest } from "actions/Item";
import { DeleteProductRequest } from "actions/Products/DeleteProduct";
import { GetMyPointRequest, } from "actions/Point";

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.Payment = this.Payment.bind(this);
  }
  componentDidMount() {
    this.props.GetItemDetailRequest(this.props.id, this.props.token)
      .then(this.props.GetLikeProductRequest(this.props.id, this.props.token))
      .then(
        this.props.userInfo ?
          this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token)
          : null);
  }
  Payment(item, option) {
    console.log(item, item.request_title, item.request_title);
    // user_id - token, item_id, payment_detail, payment_price //
    this.props.CreateItemPaymentRequest(
      { payment_title: item.title, payment_price: item.price },
      item["item-id"],
      this.props.token)
      .then(res => {
        if (res.data.success) {
          if (this.props.custom) {
            alert("구매가 완료되었습니다. [마이페이지] > [의뢰상품]에서 확인하실 수 있습니다.");
            window.location.href = `/myPage/`;
          } else {
            alert("구매가 완료되었습니다. 해당 상품의 리뷰를 작성해주세요.");
            window.location.href = `/productDetail/${item["item-id"]}`;
          }
        }
      })
  };
  BadAccess() {
    alert("잘못된 접근입니다.");
    window.location.href = `/product`;
  }
  ThisIsPrivateItem() {
    alert("비공개 아이템입니다.");
    window.location.href = `/product`;
  }
  render() {
    console.log(this.props);
    const yours = this.props.ItemDetail.members && this.props.ItemDetail.members.filter(mem => mem.user_id === this.props.userInfo && this.props.userInfo.uid);
    return this.props.ItemDetail ?
      this.props.ItemDetail.private === 1 && !yours ?
        this.ThisIsPrivateItem() :
        <ItemDetail purchase={this.Payment} item={this.props.ItemDetail} {...this.props} />
      : <Loading />
  }
}

const mapStateToProps = (state) => ({
  ItemDetail: state.ItemDetail.status.ItemDetail,
  Count: state.ProductDetail.status.Count,
  like: state.ProductLike.status.like,
  userInfo: state.Authentication.status.userInfo,
  valid: state.Authentication.status.valid,
  token: state.Authentication.status.token,
  Point: state.Point.status.Point,
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
  GetMyPointRequest: (id, token) => dispatch(GetMyPointRequest(id, token)),
  CreateItemPaymentRequest: (data, id, token) => dispatch(CreateItemPaymentRequest(data, id, token))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer));

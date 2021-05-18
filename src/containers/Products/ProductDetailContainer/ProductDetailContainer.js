import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemDetail from "components/Items/ItemDetail";
import ItemDetail_mobile from "mobileComponents/ItemDetail_mobile";

import Loading from "components/Commons/Loading";
import {
  GetProductCountRequest, GetLikeProductRequest,
  UpdateProductViewRequest, LikeProductRequest, UnlikeProductRequest, addCartRequest, GetDidYouBuyItRequest
} from "actions/Product";
import { CreateItemPaymentRequest,  /*GetItemPaymentRequest*/ } from "actions/Payment";
import { GetItemDetailRequest, ClearItemStepsRequest } from "actions/Item";
import { DeleteProductRequest } from "actions/Products/DeleteProduct";
import { GetMyPointRequest, } from "actions/Point";
import { alert } from "components/Commons/Alert/Alert";
import styled from "styled-components";
const Wrapper = styled.div`
  margin:20px 30px
`
const Mobile_wrapper = styled.div`
  margin:0px 10px;
`

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.Payment = this.Payment.bind(this);
  }
  componentDidMount() {
    // this.props.ClearItemStepsRequest();

    this.props.GetItemDetailRequest(this.props.id, this.props.token)
      .then(this.props.userInfo && this.props.GetDidYouBuyItRequest(this.props.id, this.props.userInfo.uid))
      .then(this.props.GetLikeProductRequest(this.props.id, this.props.token))
      .then(
        this.props.userInfo &&
        this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token));
  }
  Payment(item, option) {
    this.props.CreateItemPaymentRequest(
      { payment_title: item.title, payment_price: item.price },
      item.item_id,
      this.props.token)
      .then(async res => {
        if (res && res.data && res.data.success) {
          if (this.props.custom) {
            await alert("구입이 완료되었습니다. [내 정보] > [의뢰상품]에서 확인하실 수 있습니다.");
            window.location.href = `/myPage/`;
          } else {
            // alert("구입이 완료되었습니다. 해당 상품의 리뷰를 작성해주세요.");
            // window.location.href = `/productDetail/${item.item_id}`;
            await alert("구입이 완료되었습니다. [내 정보] > [구입 아이템]에서 확인하실 수 있습니다.");
            window.location.href = `/myPage/`;

          }
        }
      })
  };
  async BadAccess() {
    await alert("잘못된 접근입니다.");
    window.location.href = `/product`;
  }
  async ThisIsPrivateItem() {
    await alert("비공개 아이템입니다.");
    window.location.href = `/product`;
  }

  render() {
    console.log(this.props);
    const yours = this.props.ItemDetail.members && this.props.ItemDetail.members.filter(mem => mem.user_id === this.props.userInfo && this.props.userInfo.uid);
    return (
      this.props.ItemDetail ?
      this.props.ItemDetail.private === 1 && !yours ?
        this.ThisIsPrivateItem() :
        (
          window.innerWidth>=500?
          <Wrapper>
          <ItemDetail purchase={this.Payment} itemId={this.props.ItemDetail.item_id} item={this.props.ItemDetail} {...this.props} />
          </Wrapper>
          :
          <Mobile_wrapper>
          <ItemDetail_mobile purchase={this.Payment} itemId={this.props.ItemDetail.item_id} item={this.props.ItemDetail} {...this.props} />
          </Mobile_wrapper>
        )
      : <Loading />
      )
  }
}

const mapStateToProps = (state) => ({
  Steps: state.ItemSteps.ItemSteps,
  ItemDetail: state.ItemDetail.status.ItemDetail,
  Count: state.ProductDetail.status.Count,
  isbuy: state.ProductDetail.status.isbuy,
  like: state.ProductLike.status.like,
  userInfo: state.Authentication.status.userInfo,
  valid: state.Authentication.status.valid,
  token: state.Authentication.status.token,
  Point: state.Point.status.Point,
});

const mapDispatchToProps = (dispatch) => ({
  GetDidYouBuyItRequest: (item_id, user_id) => dispatch(GetDidYouBuyItRequest(item_id, user_id)),
  GetItemDetailRequest: (id, token) => dispatch(GetItemDetailRequest(id, token)),
  GetProductCountRequest: (id) => dispatch(GetProductCountRequest(id)),
  GetLikeProductRequest: (id, token) => dispatch(GetLikeProductRequest(id, token)),
  LikeProductRequest: (id, token) => dispatch(LikeProductRequest(id, token)),
  UpdateProductViewRequest: (id) => dispatch(UpdateProductViewRequest(id)),
  UnlikeProductRequest: (id, token) => dispatch(UnlikeProductRequest(id, token)),
  DeleteProductRequest: (id, token) => dispatch(DeleteProductRequest(id, token)),
  addCartRequest: (items, token) => dispatch(addCartRequest(items, token)),
  GetMyPointRequest: (id, token) => dispatch(GetMyPointRequest(id, token)),
  CreateItemPaymentRequest: (data, id, token) => dispatch(CreateItemPaymentRequest(data, id, token)),
  ClearItemStepsRequest: () => dispatch(ClearItemStepsRequest()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer));

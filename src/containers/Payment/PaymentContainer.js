import React, { Component } from "react";
import Payment from 'components/Payment/Payment';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetMyPointRequest, } from "actions/Point";
import { CreateItemPaymentRequest } from "actions/Item";

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.Payment = this.Payment.bind(this);
  }
  componentDidMount() {
    const { GetMyPointRequest, userInfo, token } = this.props;
    GetMyPointRequest(this.props.userInfo.uid, token);
  }
  Payment(item, option) {
    // user_id - token, item_id, payment_detail, payment_price //
    this.props.CreateItemPaymentRequest(
      { payment_detail: { ...option }, payment_price: option.total, request_id: item.request_id },
      item["item-id"] || "custom",
      this.props.token)
      .then(res => {
        if (res.data.success) {
          if (this.props.custom) {
            alert("구매가 완료되었습니다. [마이페이지] > [의뢰상품]에서 확인하실 수 있습니다.");
            window.location.href = `/myPage/`;
          } else {
            alert("구매가 완료되었습니다. 해당 상품의 리뷰를 작성해주세요.");
            window.location.href = `/productDetail/${this.props.item["item-id"]}`;
          }
        }
      })
  };
  BadAccess() {
    alert("잘못된 접근입니다.");
    window.location.href = `/product`;
  }

  render() {
    const { item } = this.props;
    if (item == null) {
      this.BadAccess();
    }
    return (<Payment purchase={this.Payment} {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  Point: state.Point.status.Point,
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyPointRequest: (id, token) => dispatch(GetMyPointRequest(id, token)),
  CreateItemPaymentRequest: (data, id, token) => dispatch(CreateItemPaymentRequest(data, id, token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentContainer));

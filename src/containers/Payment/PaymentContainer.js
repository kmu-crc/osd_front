import React, { Component } from "react";
import Payment from 'components/Payment/Payment';
import Payment_mobile from 'mobileComponents/Payment_mobile';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetMyPointRequest, } from "actions/Point";
import { CreateItemPaymentRequest } from "actions/Payment";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.Payment = this.Payment.bind(this);
  }
  componentDidMount() {
    const { GetMyPointRequest, token } = this.props;
    GetMyPointRequest(this.props.userInfo.uid, token);
  }
  Payment(item) {
    this.props.CreateItemPaymentRequest(
      { payment_title: item.title, payment_price: item.price, payment_item_type: item.type },
      item.item_id || "custom",
      this.props.token)
      .then(async res => {
        console.log(res.data.success);
        if (res.data.success) {
          if (this.props.custom) {
            await alert("구입이 완료되었습니다. [내 정보] > [의뢰상품]에서 확인하실 수 있습니다.");
            window.location.href = `/myPage/`;
          } else {
            await alert("구입이 완료되었습니다. [내 정보] > [구입 아이템]에서 확인하실 수 있습니다.");
            window.location.href = `/myPage/`;

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
    return (
    <React.Fragment>
      {
        window.innerWidth>=500?
        <Payment purchase={this.Payment} {...this.props} />
        :
        <Payment_mobile purchase={this.Payment} {...this.props} />
      }
    </React.Fragment>
    );
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

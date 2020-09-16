import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyRequestItemRequest, UpdatePaymentRequest } from "actions/Payment";
import Request from "components/Request/Request";
import ScrollList from "components/Commons/ScrollList";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
class MyRequestItemContainer extends Component {
  componentWillMount() {
    this.props.GetMyRequestItemRequest(this.props.token, 0);
  }
  getList = (page) =>
    this.props.GetMyRequestItemRequest(this.props.token, page);
  confirm = (id) => {
    this.props.UpdatePaymentRequest(id, this.props.token)
      .then(async res => {
        if (res.success) {
          await alert("구입이 완료되었습니다.");
          window.location.reload();
        }
      })
  }

  render() {
    console.log(this.props);
    return (
      <ScrollList
        getListRequest={this.getList}
        ListComponent={Request}
        confirm={this.confirm}
        type="item"
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded} />
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  dataList: state.Payment.status.MyRequestItem,
  dataListAdded: state.Payment.status.MyRequestItemAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyRequestItemRequest: (token, page) => dispatch(GetMyRequestItemRequest(token, page)),
  UpdatePaymentRequest: (id, token) => dispatch(UpdatePaymentRequest(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestItemContainer);

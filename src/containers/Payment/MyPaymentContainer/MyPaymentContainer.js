import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyPaymentRequest } from "actions/Payment";
import Item from "components/Items/Item";
import ScrollList from "components/Commons/ScrollList";

class MyPaymentContainer extends Component {
  componentWillMount() {
    this.props.GetMyPaymentRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMyPaymentRequest(this.props.token, page);


  render() {
    return (
      <ScrollList
        getListRequest={this.getList}
        ListComponent={Item}
        type="item"
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded} />
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  dataList: state.Payment.status.MyPayment,
  dataListAdded: state.Payment.status.MyPaymentAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyPaymentRequest: (token, page) => dispatch(GetMyPaymentRequest(token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPaymentContainer);

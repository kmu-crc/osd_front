import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyRequestItemRequest } from "actions/Payment";
import Item from "components/Items/Item";
import ScrollList from "components/Commons/ScrollList";

class MyRequestItemContainer extends Component {
  componentWillMount() {
    this.props.GetMyRequestItemRequest(this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMyRequestItemRequest(this.props.token, page);


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
  dataList: state.Payment.status.MyRequestItem,
  dataListAdded: state.Payment.status.MyRequestItemAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyRequestItemRequest: (token, page) => dispatch(GetMyRequestItemRequest(token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestItemContainer);

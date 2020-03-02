import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyUploadItemRequest } from "actions/Item";
import Item from "components/Items/Item";
import ScrollList from "components/Commons/ScrollList";

class UploadItemContainer extends Component {
  componentWillMount() {
    this.props.GetMyUploadItemRequest(this.props.id, this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMyUploadItemRequest(this.props.id, this.props.token, page);


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
  dataList: state.UploadItem.status.MyUploadItem,
  dataListAdded: state.UploadItem.status.MyUploadItemAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyUploadItemRequest: (id, token, page) => dispatch(GetMyUploadItemRequest(id, token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadItemContainer);

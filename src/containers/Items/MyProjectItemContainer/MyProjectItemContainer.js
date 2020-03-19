import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyProjectItemRequest } from "actions/Item";
import Item from "components/Items/Item";
import ScrollList from "components/Commons/ScrollList";

class MyProjectItemContainer extends Component {
  componentWillMount() {
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, 0);
  }

  getList = (page) =>
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, page);


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
  dataList: state.MyProjectItem.status.MyProjectItem,
  dataListAdded: state.MyProjectItem.status.MyProjectItemAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyProjectItemRequest: (id, token, page) => dispatch(GetMyProjectItemRequest(id, token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProjectItemContainer);

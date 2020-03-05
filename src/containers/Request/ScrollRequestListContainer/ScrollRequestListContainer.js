import React, { Component } from "react";
import { connect } from "react-redux";
import { GetRequestListRequest } from "actions/Request";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import RequestElement from "components/Request/RequestListElement";

class ScrollRequestListContainer extends Component {
  componentWillMount() {
    this.props.GetRequestListRequest(this.props.type, 0, this.props.cate1, this.props.cate2, this.props.sort, this.props.keyword);
  }
  getList = (page) =>
    this.props.GetRequestListRequest(this.props.type, page, this.props.cate1, this.props.cate2, this.props.sort, this.props.keyword);


  render() {
    return (
      <ScrollBoardList
        total={this.props.Count}
        dataList={this.props.dataList}
        getListRequest={this.getList}
        ListComponent={RequestElement}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.RequestList.status.List,
  Count: state.RequestList.status.Total,
});
const mapDispatchToProps = (dispatch) => ({
  GetRequestListRequest: (type, page, cate1, cate2, sort, keyword) =>
    dispatch(GetRequestListRequest(type, page, cate1, cate2, sort, keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollRequestListContainer);

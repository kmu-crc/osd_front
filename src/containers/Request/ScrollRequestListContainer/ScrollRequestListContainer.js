import React, { Component } from "react";
import { connect } from "react-redux";
import { GetRequestListRequest } from "actions/Request";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import RequestElement from "components/Request/RequestListElement";

class ScrollRequestListContainer extends Component {
  componentWillMount() {
    this.props.GetRequestListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }
  getList = (page) => {
    return this.props.GetRequestListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }

  render() {
    return (
      <ScrollBoardList getListRequest={this.getList} ListComponent={RequestElement} dataList={this.props.dataList} total={this.props.Count}
        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom" />
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.RequestList.status.List,
  Count: state.RequestList.status.Count,
});
const mapDispatchToProps = (dispatch) => ({
  GetRequestListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) =>
    dispatch(GetRequestListRequest(page, sort, categoryLevel1, categoryLevel2, keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollRequestListContainer);

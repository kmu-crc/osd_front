import React, { Component } from "react";
import { connect } from "react-redux";
import { GetRequestListRequest } from "actions/Request";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import RequestElement from "components/Request/RequestListElement";

class ScrollRequestListContainer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type || this.props.sort !== prevProps.sort || this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3 || this.props.keyword !== prevProps.keyword) {
      this.getList(0);
    }
  }
  componentWillMount() {
    this.getList(0);
  }
  getList = (page) => {
    return this.props.GetRequestListRequest(this.props.type, page, this.props.cate1, this.props.cate2, this.props.cate3, this.props.sort, this.props.keyword);
  }

  render() {
    console.log(this.props);
    return (
      <ScrollBoardList
        total={this.props.Total}
        dataList={this.props.dataList}
        getListRequest={this.getList}
        ListComponent={RequestElement}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.RequestList.status.List,
  dataListAdded: state.RequestList.status.ListAdded,
  Total: state.RequestList.status.Total,
});
const mapDispatchToProps = (dispatch) => ({
  GetRequestListRequest: (type, page, cate1, cate2, cate3, sort, keyword) =>
    dispatch(GetRequestListRequest(type, page, cate1, cate2, cate3, sort, keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollRequestListContainer);

import React, { Component } from "react";
import { connect } from "react-redux";
import { GetRequestListRequest } from "actions/Request";
import ScrollBoardList_mobile from "mobileComponents/ScrollBoardList_mobile";
import RequestListElement_mobile from "components/Request/RequestListElement_mobile";

class ScrollRequestListContainer_mobile extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type || this.props.sort !== prevProps.sort || this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3 || this.props.keyword !== prevProps.keyword) {
      this.getList(0);
    }
  }
  componentWillMount() {
    this.getList(0);
  }
  getList = (page) => {
    console.log(this.props.type, page, this.props.cate1, this.props.cate2, this.props.cate3, this.props.sort, this.props.keyword)
    return this.props.GetRequestListRequest(this.props.type, page, this.props.cate1, this.props.cate2, this.props.cate3, this.props.sort, this.props.keyword);
  }

  render() {
    return (
      <React.Fragment>
      <ScrollBoardList_mobile
        total={this.props.Count}
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded}
        getListRequest={this.getList}
        ListComponent={RequestListElement_mobile}
        type={this.props.type}
      />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  dataListAdded: state.RequestList.status.ListAdded,
  dataList: state.RequestList.status.List,
  Count: state.RequestList.status.Total,
});
const mapDispatchToProps = (dispatch) => ({
  GetRequestListRequest: (type, page, cate1, cate2, cate3, sort, keyword) =>
    dispatch(GetRequestListRequest(type, page, cate1, cate2, cate3, sort, keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollRequestListContainer_mobile);

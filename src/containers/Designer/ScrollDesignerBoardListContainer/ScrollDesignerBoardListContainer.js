import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerBoardListRequest } from "actions/Designer";
import ScrollBoardList from "components/Commons/ScrollBoardList";
import DesignerBoardElement from "components/Designers/DesignerBoardElement";

class ScrollDesignerBoardListContainer extends Component {
  componentWillMount() {
    this.props.GetDesignerBoardListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }
  getList = (page) => {
    return this.props.GetDesignerBoardListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }

  render() {
    return (
      <ScrollBoardList getListRequest={this.getList} ListComponent={DesignerBoardElement} dataList={this.props.dataList} total={this.props.Count}
        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom" />
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.DesignerBoardList.status.DesignerBoardList,
  Count: state.DesignerBoardList.status.Count,
});
const mapDispatchToProps = (dispatch) => ({
  GetDesignerBoardListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) =>
    dispatch(GetDesignerBoardListRequest(page, sort, categoryLevel1, categoryLevel2, keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerBoardListContainer);

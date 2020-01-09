import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignerBoardListRequest, GetDesignerBoardTotalCountRequest } from "actions/Designer";
import DesignerBoardList from "components/Designers/DesignerBoardList";

class DesignerBoardListContainer extends Component {
  render() {
    return (<DesignerBoardList {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerList: state.DesignerBoardList.status.DesignerBoardList,
    Count: state.DesignerBoardList.status.Count,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerBoardListRequest: (page, sort) => {
      return dispatch(GetDesignerBoardListRequest(page, sort))
    },
    GetDesignerBoardTotalCountRequest: (category1, category2) => {
      return dispatch(GetDesignerBoardTotalCountRequest(category1, category2))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerBoardListContainer);

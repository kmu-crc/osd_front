import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateDesignerBoardArticleRequest, GetDesignerBoardListRequest, GetDesignerBoardTotalCountRequest } from "actions/Designer";
import DesignerBoardList from "components/Designers/DesignerBoardList";

class DesignerBoardListContainer extends Component {
  render() {
    return (<DesignerBoardList {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerList: state.DesignerBoardList.status.DesignerBoardList,
    token: state.Authentication.status.token,
    Count: state.DesignerBoardList.status.Count,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDesignerBoardArticleRequest: (data, token) => dispatch(CreateDesignerBoardArticleRequest(data, token)),
    GetDesignerBoardListRequest: (page, sort) => dispatch(GetDesignerBoardListRequest(page, sort)),
    GetDesignerBoardTotalCountRequest: (category1, category2) => dispatch(GetDesignerBoardTotalCountRequest(category1, category2))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerBoardListContainer);

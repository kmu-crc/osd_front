import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateDesignerBoard from 'components/Designers/CreateDesignerBoard/CreateDesignerBoard';
import { CreateDesignerBoardArticleRequest } from "actions/Designer";

class CreateDesignerBoardContainer extends Component {
  render() {
    return (<CreateDesignerBoard {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
  CreateDesignerBoardArticleRequest: (data, token) => dispatch(CreateDesignerBoardArticleRequest(data, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateDesignerBoardContainer));

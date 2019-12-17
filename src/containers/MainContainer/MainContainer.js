import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "components/Main";

class MainContainer extends Component {
  render() {
    return (
      <Main {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

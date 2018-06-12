import React, { Component } from "react";
import JoinGroup from "components/Groups/JoinGroup";
import { connect } from "react-redux";
import { JoinGroupRequest } from "actions/Group";

class JoinGroupContainer extends Component {
  render() {
    return(
      <JoinGroup {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      JoinGroupRequest: (data) => {
        return dispatch(JoinGroupRequest(data));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroupContainer);

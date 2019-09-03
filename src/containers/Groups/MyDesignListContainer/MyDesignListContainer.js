import React, { Component } from "react";
import { connect } from "react-redux";
import MyDesignList from "components/Groups/JoinGroup/MyDesignList";
import { GetMyDesignListRequest, JoinGroupRequest } from "redux/modules/group";
import { withRouter } from "react-router-dom";

class MyDesignListContainer extends Component {
  render() {
    return (
      <MyDesignList {...this.props} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    designList: state.Group.status.MyDesignList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDesignListRequest: (token, id) => {
      return dispatch(GetMyDesignListRequest(token, id))
    },
    JoinGroupRequest: (data, token, id) => {
      return dispatch(JoinGroupRequest(data, token, id))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyDesignListContainer));

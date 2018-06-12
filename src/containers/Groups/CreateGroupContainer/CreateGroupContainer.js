import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CreateGroup from "components/Groups/CreateGroup";
import { CreateNewGroupRequest } from "actions/Group";

class CreateGroupContainer extends Component {
  render() {
    return(
      <div>
        <CreateGroup {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignInGroupRequest: (data, token) => {
        return dispatch(CreateNewGroupRequest(data, token))
      }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroupContainer));

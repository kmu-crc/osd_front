import React, { Component } from "react";
import JoinGroup from "components/Groups/JoinGroup";
import JoinGroup_mobile from "components/Groups/JoinGroup_mobile";
import { connect } from "react-redux";
import { JoinGroupRequest } from "redux/modules/group";

class JoinGroupContainer extends Component {
  render() {
    return(
      <React.Fragment>
        {
          window.innerWidth<500?
          <JoinGroup_mobile {...this.props} />
          :
          <JoinGroup {...this.props} />
        }
      </React.Fragment>
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

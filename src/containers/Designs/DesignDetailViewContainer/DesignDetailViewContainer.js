import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailViewRequest, ChangeToProjectRequest } from "actions/Design";
import DetailView from "components/Designs/DetailView";

class DesignDetailViewContainer extends Component {
  render() {
    return (
      <div>
        <DetailView {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailView: state.DesignDetailView.status.DesignDetailView,
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailViewRequest: (id) => {
      return dispatch(GetDesignDetailViewRequest(id))
    },
    ChangeToProjectRequest: (id, token) => {
      return dispatch(ChangeToProjectRequest(id, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailViewContainer);

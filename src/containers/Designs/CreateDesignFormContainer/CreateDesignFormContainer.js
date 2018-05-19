import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateDesignForm from "components/Designs/CreateDesignForm";
import { CreateDesignRequest } from "actions/Designs/CreateDesign";

class CreateDesignFormContainer extends Component {
  render() {
    return(
      <CreateDesignForm {...this.props}/>
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
    CreateDesignRequest: (data, token) => {
      return dispatch(CreateDesignRequest(data, token));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateDesignFormContainer));

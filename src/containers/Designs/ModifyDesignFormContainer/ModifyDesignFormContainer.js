import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignFormContent from "components/Designs/ModifyDesignFormContent";
import { GetDesignDetailRequest } from "actions/Design";

class ModifyDesignFormContainer extends Component {
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token);
  }

  render() {
    console.log("render");
    return(
      <ModifyDesignFormContent {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    DesignDetail: state.DesignDetail.status.DesignDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token))
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignFormContainer));

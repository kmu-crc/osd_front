import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignFile from "components/Designs/ModifyDesignFile";
import { GetDesignDetailRequest } from "actions/Design";

class ModifyDesignFileContainer extends Component {
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.match.params.id, this.props.token);
  }

  render() {
    return(
      <ModifyDesignFile {...this.props}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignFileContainer));

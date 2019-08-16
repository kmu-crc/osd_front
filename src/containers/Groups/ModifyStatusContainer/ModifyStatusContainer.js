import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModifyStatus from "components/Groups/ModifyStatus";

class ModifyStatusContainer extends Component {
  render() {
    console.log("Fn:", this.props)
    return (
      <ModifyStatus {...this.props} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyStatusContainer);

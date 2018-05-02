import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CheckTokenRequest } from "../../actions/Authentication";
import { SetSession, GetSession } from "../../modules/Sessions";

export default function CheckAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      if (this.props.token != null) {
        SetSession("opendesign_token", this.props.token);
      }
      GetSession("opendesign_token").then( token => {
        this.props.CheckTokenRequest(token);
      });
    }
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      token: state.Authentication.status.token,
      valid: state.Authentication.status.valid
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      CheckTokenRequest: (token) => {
        return dispatch(CheckTokenRequest(token));
      }
    };
  };
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
};

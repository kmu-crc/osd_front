import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CheckAdminTokenRequest } from "actions/Authentication";
import { SetSession, GetSession } from "modules/Sessions";

export default function RequiresAuthAdmin(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      if (this.props.admin_token != null) {
        SetSession(this.props.admin_token);
      }
      GetSession().then(token => {
        this.props.CheckAdminTokenRequest(token).then((data) => {
          if (data.type === "AUTH_CHECK_ADMIN_TOKEN_FAILURE") {
            SetSession(null);
            return this._checkAndRedirect();
          }
          return this._checkAndRedirect();
        });
      })
      .catch( data => {
        this._checkAndRedirect();
      });
    }

    _checkAndRedirect() {
      if (!this.props.admin_valid) {
        alert("관리자 로그인 후 이용이 가능합니다.");
        this.props.history.push("/adminSignIn");
      }
    }

    render() {
      return (
        <div className="authenticated">
          {this.props.admin_valid ? <Component {...this.props} /> : null}
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      admin_token: state.Authentication.status.admin_token,
      admin_valid: state.Authentication.status.admin_valid
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      CheckAdminTokenRequest: (token) => {
        return dispatch(CheckAdminTokenRequest(token));
      }
    };
  };
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
};

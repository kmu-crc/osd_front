import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CheckTokenRequest } from "redux/modules/auth"
import { SetSession, GetSession } from "modules/Sessions"

export default function RequiresAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      if (this.props.token != null) {
        SetSession("opendesign_token", this.props.token)
      }
      GetSession("opendesign_token").then( token => {
        this.props.CheckTokenRequest(token).then((data) => {
          if (data.type === "AUTH_CHECK_TOKEN_FAILURE") {
            // SetSession("opendesign_token", null)
            return this._checkAndRedirect()
          }
          return this._checkAndRedirect()
        })
      })
      .catch( data => {
        this._checkAndRedirect()
      })
    }

    _checkAndRedirect() {
      if (!this.props.valid) {
        alert("로그인 후 이용이 가능합니다.")
        this.props.history.push("/signin")
      }
    }

    render() {
      return (
        <div className="authenticated">
          {this.props.valid ? <Component {...this.props} /> : null}
        </div>
      )
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

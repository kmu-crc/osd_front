import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CheckTokenRequest } from "redux/modules/auth"
import { SetSession, GetSession } from "modules/Sessions"
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";

export default function RequiresAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      const { TokenName } = require("constant");
      // console.error(this.props.token, this.props.valid);
      if (this.props.token != null) {
        SetSession(TokenName, this.props.token)
      }
      GetSession(TokenName)
        .then(token => {
          this.props.CheckTokenRequest(token)
            .then((data) => {
              if (data.type === "AUTH_CHECK_TOKEN_FAILURE") {
                const { TokenName } = require("constant");
                SetSession(TokenName, null)
                return this._checkAndRedirect();
              }
              return this._checkAndRedirect();
            })
        })
        .catch(err => {
          console.error(err);
          this._checkAndRedirect();
        });
    }
    async _checkAndRedirect() {
      // console.error("valid:", this.props.valid);
      if (!this.props.valid) {
        // await alert("로그인 후 이용이 가능합니다.", "확인");
        // window.history.go(-1);
        // this.props.history.push(-1);
        this.props.history.push("/signin");
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

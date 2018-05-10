import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CheckTokenRequest } from "../../actions/Authentication";
import { SignOutRequest } from "../../actions/Registration";
import { SetSession, GetSession } from "../../modules/Sessions";
import { Dimmer, Loader } from 'semantic-ui-react'

export default function CheckAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    state = {
      valid: false
    }
    componentWillMount() {
      this.checkAuth();
    }
    componentDidUpdate(nextProps) {
      if (this.props.token !== nextProps.token) {
        this.checkAuth();
      }
    }

    checkAuth() {
      if (this.props.token != null) {
        SetSession("opendesign_token", this.props.token);
      }
      GetSession("opendesign_token").then(token => {
        this.props.CheckTokenRequest(token).then(data => {
          if (data.info) {
            if (!data.info.isDetail) {
              if(this.props.location.pathname === "/inserUserDetail"){
                this.setState({ valid: true });
              } else {
                this.props.history.push("/inserUserDetail");
              }
            } else {
              this.setState({ valid: true });
            }
          } else {
            this.setState({ valid: true });
          }
        });
      }).catch(data => {
        this.props.SignOutRequest();
        this.setState({ valid: true });
      });
    }

    render() {
      return this.state.valid
        ? <Component {...this.props} />
        : (
          <Dimmer active>
            <Loader />
          </Dimmer>
        );
    }
  }
  const mapStateToProps = (state) => {
    return {
      token: state.Authentication.status.token,
      valid: state.Authentication.status.valid,
      userInfo: state.Authentication.status.userInfo
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      CheckTokenRequest: (token) => {
        return dispatch(CheckTokenRequest(token));
      },
      SignOutRequest: () => {
        return dispatch(SignOutRequest());
      }
    };
  };
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
};

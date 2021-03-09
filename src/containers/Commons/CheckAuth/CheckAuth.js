import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { CheckTokenRequest, SetActive } from "redux/modules/auth"
import { SignOutRequest } from "redux/modules/account"
import { SetSession, GetSession } from "modules/Sessions"
import { Dimmer, Loader } from "semantic-ui-react"

export default function CheckAuth(Components) {
  class AuthenticatedComponent extends Component {
    state = {
      valid: false
    }
    componentWillMount() {
      this.checkAuth()
    }
    componentDidUpdate(nextProps) {
      if (this.props.token !== nextProps.token) {
        this.checkAuth()
      }
    }

    checkAuth() {
      if (this.props.token != null) {
        SetSession("opendesign_token", this.props.token);
      }
      GetSession("opendesign_token").then(token => {
        this.props.CheckTokenRequest(token).then(data => {
          // console.log(data);
          if (data && data.info) {
            if (!data.info.isDetail||data.info.thumbnail==null) {
              if (this.props.location.pathname === "/insertUserDetail") {
                this.setState({ valid: true })
              } else {
                this.props.history.push("/insertUserDetail")
              }
            }
            else {
              this.setState({ valid: true })
            }
          } 
          else {
            this.setState({ valid: true })
          }
          
        })
      }).catch(data => {
        this.props.SignOutRequest()
        this.setState({ valid: true })
      });
    }

    render() {
      return this.state.valid
        ? <Components {...this.props} />
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
      userInfo: state.Authentication.status.userInfo,
      isActive: state.Authentication.isActive
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      CheckTokenRequest: (token) => {
        return dispatch(CheckTokenRequest(token));
      },
      SignOutRequest: () => {
        return dispatch(SignOutRequest());
      },
      SetActive: (active) => {
        return dispatch(SetActive(active))
      }
    };
  };
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
};

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CheckTokenRequest } from "actions/Authentication";
import { SignOutRequest } from "actions/Registration";
import { SetSession, GetSession } from "modules/Sessions";
import { Dimmer, Loader } from "semantic-ui-react";
import { SetActive } from "actions/OpenDesign";
// import { Socket } from "socket.io-client";
import Socket from "modules/socket";

export default function CheckAuth(Components) {
  class AuthenticatedComponent extends Component {
    state = {
      valid: false
    }
    componentDidMount() {
      this.checkAuth();
    }
    componentDidUpdate(nextProps) {
      if (this.props.token !== nextProps.token) {
        this.checkAuth();
      }
    }

    checkAuth() {
      if (this.props.token != null) {
        SetSession("market", this.props.token);
      }
      GetSession("market").then((token) => {
        this.props.CheckTokenRequest(token).then(async data => {
          await this.setState({ valid: true });
          Socket.emit("live socket id",this.props.userInfo.uid)          // console.log(data);
          // if (data && data.info) {
          //   if (!data.info.isDetail) {
          //     if (this.props.location.pathname === "/inserUserDetail") {
          //       this.setState({ valid: true });
          //     } else {
          //       this.props.history.push("/inserUserDetail");
          //     }
          //   } else {
          //     this.setState({ valid: true });
          //   }
          // } else {
          //   this.setState({ valid: true });
          // }
        });
      }).catch(data => {
        this.props.SignOutRequest();
        this.setState({ valid: true });
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
      isActive: state.OpenDesign.isActive
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

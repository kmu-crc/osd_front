import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CheckAdminTokenRequest } from "actions/Authentication";
import { AdminSignOutRequest } from "actions/Registration";
import { SetSession, GetSession } from "modules/Sessions";
import { Dimmer, Loader } from "semantic-ui-react";
import { SetActive } from "actions/OpenDesign";

export default function CheckAuthAdmin(Components) {
  class AuthenticatedComponent extends Component {
    state = {
      valid: false
    }
    componentWillMount() {
      this.checkAuth();
    }
    componentDidUpdate(nextProps) {
      if (this.props.admin_token !== nextProps.admin_token) {
        this.checkAuth();
      }
    }

    checkAuth() {
      if (this.props.admin_token != null) {
        SetSession(this.props.admin_token);
      }
      GetSession().then(token => {
        this.props.CheckAdminTokenRequest(token).then(data => {
          // console.log("?",data);
          this.setState({ valid: true });
        });
      }).catch(data => {
        this.props.AdminSignOutRequest();
        this.setState({ valid: true });
      });
    }

    render() {
      return this.state.valid
        ? <Components {...this.props} />
        : (
          <Dimmer active>
            <Loader/>
          </Dimmer>
        );
    }
  }
  const mapStateToProps = (state) => {
    return {
      admin_token: state.Authentication.status.admin_token,
      admin_valid: state.Authentication.status.admin_valid,
      userInfo: state.Authentication.status.userInfo,
      isActive: state.OpenDesign.isActive
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      CheckAdminTokenRequest: (token) => {
        return dispatch(CheckAdminTokenRequest(token));
      },
      AdminSignOutRequest: () => {
        return dispatch(AdminSignOutRequest());
      },
      SetActive: (active) => {
        return dispatch(SetActive(active))
      }
    };
  };
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
};

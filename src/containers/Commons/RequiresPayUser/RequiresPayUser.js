import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CheckPayUserRequest } from "actions/Authentication";
import { SetSession, GetSession } from "modules/Sessions";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
export default function RequiresPayUser(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      console.log(this.props);
      if(this.props.userInfo==null||this.props.userInfo.uid==null)return;

      this.props.CheckPayUserRequest(this.props.userInfo.uid)
      .then(()=>{
        if(this.props.checkPayUser==true){
          return this._checkAndRedirect();
        }else{
          return this._checkAndRedirect();
        }
      });
      // if (this.props.token != null) {
        // this.props.CheckPayUserRequest(21);
      //   SetSession("market", this.props.token);
      // }
      // GetSession("market").then( token => {
      //   this.props.CheckTokenRequest(token).then((data) => {
      //     if (data&&data.type === "AUTH_CHECK_TOKEN_FAILURE") {
      //       // SetSession("market", null);
      //       return this._checkAndRedirect();
      //     }
      //     return this._checkAndRedirect();
      //   });
      // })
      // .catch( data => {
      //   this._checkAndRedirect();
      // });
    }

    async _checkAndRedirect() {
      if (!this.props.checkPayUser) {
        await alert("유료회원 결제 후 이용이 가능합니다.");
        this.props.history.push("/myPage");
      }
    }

    render() {
      return (
        <div className="authenticated">
          {this.props.valid ? <Component {...this.props} /> : null}
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      token: state.Authentication.status.token,
      valid: state.Authentication.status.valid,
      userInfo: state.Authentication.status.userInfo,
      checkPayUser: state.Authentication.checkStatus.checkPayUser,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      CheckPayUserRequest: (uid) => {
        return dispatch(CheckPayUserRequest(uid));
      }
    };
  };
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
};

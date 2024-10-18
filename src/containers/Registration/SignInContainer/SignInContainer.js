import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignInForm from "components/Registration/SignInForm";
import SignInFormMobile from "components/Registration/SignInForm/SignInFormMobile";
import { SignInRequest, SignOutRequest, CheckEmailRequest } from "redux/modules/auth";
import { FindPwRequest } from "redux/modules/account";
import styled, { keyframes } from "styled-components";
import new_logo_login_close from "source/new_logo_login_close.svg";
import { isMobile, STRING_ALREADY_LOGINED } from "constant";

const Wrapper = styled.div`
  width:100%;
  height:100%;
  position:fixed;
  z-index:880;
  opacity:0;
  animation-name: ${props => props.loginOpen == null ? null : props.loginOpen == true ? Open_ani : Close_ani};
  animation-duration:1s;
  animation-direction:alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
  .close_{
    width:60px;
    height:60px;
    background-image:url(${new_logo_login_close});
    background-size:cover;
    position:absolute;
    top:120px;
    right:30px;
    z-index:901;
    cursor:pointer;
  }
`
const Open_ani = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`;
const Close_ani = keyframes`
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
`;

class SignInContainer extends Component {

  componentDidUpdate() {
    const { userInfo, isLoggedIn } = this.props;
    if (userInfo || isLoggedIn) {
      alert(STRING_ALREADY_LOGINED)
      window.location.href = "/";
    }
  }

  render() {
    return (

      isMobile()

        ? <React.Fragment>
          <SignInFormMobile {...this.props} />
        </React.Fragment>

        : <React.Fragment>
          <Wrapper loginOpen={this.props.loginOpen}>
            <div className="close_" onClick={() => {
              this.props.onCloseLogin && this.props.onCloseLogin();
            }} />
            <SignInForm {...this.props} />
          </Wrapper>
        </React.Fragment>);
  }
}

const mapStateTopProps = (state) => ({
  CheckEmail: state.Authentication.checkStatus.checkEmail,
  status: state.Account.FindPw.status,
  valid: state.Authentication.status.valid,
  userInfo: state.Authentication.status.userInfo,
  isLoggedIn: state.Authentication.status.isLoggedIn
});
const mapDispatchToProps = (dispatch) => ({
  SignInRequest: (data) => { return dispatch(SignInRequest(data)) },
  SignOutRequest: () => { return dispatch(SignOutRequest()) },
  FindPwRequest: (data) => { return dispatch(FindPwRequest(data)) },
  CheckEmailRequest: (email) => { return dispatch(CheckEmailRequest(email)) }
});

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(SignInContainer));

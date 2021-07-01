import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SignUpForm from "components/Registration/SignUpForm";
import SignUpForm_mobile from "mobileComponents/SignUpForm_mobile";
import { SignUpRequest, FBSignUpRequest } from "actions/Registration";
import { CheckEmailRequest, CheckNickNameRequest, CheckFBUserRequest } from "actions/Authentication";
import styled from "styled-components";

const SignUpContent = styled.div`
    width: 100%;
    height:100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    margin-top:80px;
    padding:0px 20px;
`;

const SignUpCard = styled.div`
        width:806px;
        height:496px;
        display:flex;
        align-items:center;
        justify-content:center;
        max-width:100%;
        position: relative;
        z-index: 2;
        box-shadow: 3px 3px 5px #00000029;
        border: 0.5px solid #EAEAEA;
        border-radius: 20px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        margin:0px 20px;
        // position: relative;
        // z-index: 2;
        // box-shadow: 3px 3px 5px #00000029;
        // border: 0.5px solid #EAEAEA;
        // border-radius: 20px;
        // background: #FFFFFF 0% 0% no-repeat padding-box;
`;
class SignUpContainer extends Component {
  render() {
    return(
      <React.Fragment>
        {
          window.innerWidth>=500?
          <SignUpContent>
            <SignUpCard>
              <SignUpForm {...this.props}/>
            </SignUpCard>
          </SignUpContent>
          :
          <SignUpForm_mobile {...this.props}/>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CheckEmail: state.Authentication.checkStatus.checkEmail,
    CheckNickName: state.Authentication.checkStatus.checkNickName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      SignUpRequest: (data) => {
        return dispatch(SignUpRequest(data));
      },
      FBSignUpRequest: (data) => {
        return dispatch(FBSignUpRequest(data));
      },
      CheckEmailRequest: (email) => {
        return dispatch(CheckEmailRequest(email));
      },
      CheckNickNameRequest: (NickName) => {
        return dispatch(CheckNickNameRequest(NickName));
      },
      CheckFBUserRequest: (FB_user_id) => {
        return dispatch(CheckFBUserRequest(FB_user_id));
      }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpContainer));

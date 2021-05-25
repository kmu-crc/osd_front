import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignInForm from "components/Registration/SignInForm";
import SignInForm_mobile from "mobileComponents/SignInForm_mobile";
import { SignInRequest, FBSignInRequest } from "actions/Registration";
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
`;
class SignInContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <SignUpContent>
            <SignUpCard>
              <SignInForm {...this.props} />
            </SignUpCard>
          </SignUpContent>
          :
          <SignInForm_mobile {...this.props}/>
        }
      </React.Fragment>
      
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    SignInRequest: (data) => {
      return dispatch(SignInRequest(data));
    },
    FBSignInRequest: (data) => {
      return dispatch(FBSignInRequest(data));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));

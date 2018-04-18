import React, { Component } from "react";
import styled from "styled-components";
import ClientTemplate from "../../templates/ClientTemplate";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { SetSession } from "../../modules/Sessions";

const SignUpContent = styled.div`
  width: 100%;
  height:100vh;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const SignUpCard = styled.form`
  width: 600px;
  height: 400px;
  background-color: #fff;
`;

class SignInPage extends Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    let data = event.target
    let formData = {
      email: data.email.value,
      password: data.password.value
    }
    console.log("form", formData);
    this.props.SignInRequest(formData).then( data => {
      if(data.type === "AUTH_SIGNIN_IS_NOT_MEMBER"){
        alert("opendesign회원이 아닙니다.");
      } else if (data.type === "AUTH_SIGNIN_IS_NOT_PASSWORD") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        SetSession("opendesign_token", data.token).then(() => {
          this.props.history.push("/design");
        }).catch();
      }
    });
  }
  onClickFBSignUpbtn = (data) => {
    console.log(data)
    let formData = {
      FBUserId: data.userID
    }
    this.props.FBSignInRequest(formData).then( data => {
      if(data.type === "AUTH_FBSIGNIN_IS_NOT_MEMBER") {
        alert("opendesign회원이 아닙니다.");
      } else {
        SetSession("opendesign_token", data.token).then(() => {
          this.props.history.push("/design");
        }).catch();
      }
    });
  }
  render() {
    return (
      <ClientTemplate>
        <SignUpContent>
          <SignUpCard method="post" onSubmit={this.handleFormSubmit}>
            <label htmlFor="email">email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">passord</label>
            <input type="password" id="password" name="password" />
            <button type="submit">로그인 하기</button>

            <FacebookLogin
              appId="1846803492017708"
              fields="name,email"
              autoLoad={false}
              callback={this.onClickFBSignUpbtn}
              render={renderProps => (
                <button type="button" onClick={renderProps.onClick}>facebook 로그인</button>
              )} />
          </SignUpCard>
        </SignUpContent>
      </ClientTemplate>
    );
  }
}

export default SignInPage;

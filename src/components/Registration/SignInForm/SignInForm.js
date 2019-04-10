import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { FormField } from "components/Commons/FormField";
// import { FormInput } from "components/Commons/FormItem";
// import ValidateForm from "components/Commons/ValidateForm";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";

const BtnWrap = styled.div`
  margin-bottom: 1rem;
`;

const LoginBtn = styled(Button)`
  margin-bottom: 1rem;
`;

const Subinfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  color: rgba(0, 0, 0, 0.87);
  & .signUpBtn {
    text-decoration: underline;
  }
`;

const FindPwBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.92857143em;
  font-weight: 700;
  text-transform: none;
`;

class SignInForm extends Component {
  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  liveCheck = target => {
    FormControl(this.state[target]);
  };

  onSubmit = async e => {
    e.preventDefault();
    ValidationGroup(this.state, true)
      .then(data => {
        console.log("성공", data);
        this.props.SignInRequest(data).then(data => {
          if (data.type === "AUTH_SIGNIN_IS_NOT_MEMBER") {
            alert("opendesign회원이 아닙니다.");
          } else if (data.type === "AUTH_SIGNIN_IS_NOT_PASSWORD") {
            alert("비밀번호가 일치하지 않습니다.");
          } else {
            this.props.history.go(-1);
          }
        });
      })
      .catch(e => {
        console.log("실패", e);
      });
  };

  onClickFBSignInbtn = data => {
    console.log(data);
    let formData = {
      FB_user_id: data.userID
    };
    this.props.FBSignInRequest(formData).then(data => {
      if (data.type === "AUTH_FBSIGNIN_IS_NOT_MEMBER") {
        alert("opendesign회원이 아닙니다.");
      } else {
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Label>Email</Label>
        <FormInput
          name="email"
          placeholder="email을 입력해주세요."
          getValue={this.onChangeValue}
          validates={["Required", "IsEmail"]}
          onBlur={() => {
            this.liveCheck("email");
          }}
        />
        <Label>Password</Label>
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          getValue={this.onChangeValue}
          validates={["Required", "MinLength(2)", "NotBlank"]}
          onBlur={() => {
            this.liveCheck("password");
          }}
        />
        <Subinfo>
          <Link to="/resetPw">
            <FindPwBtn type="button">비밀번호 찾기</FindPwBtn>
          </Link>
          <Link to="/signup" className="signUpBtn">
            회원가입
          </Link>
        </Subinfo>
        <BtnWrap>
          <LoginBtn type="submit" round={true} fluid={true}>
            로그인
          </LoginBtn>
{/*
          <FacebookLogin
            appId="799483036860094"
            autoLoad={false}
            callback={this.onClickFBSignInbtn}
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                type="button"
                color="facebook"
                icon="facebook f"
                round={true}
                fluid={true}
              >
                FaceBook 로그인
              </Button>
            )}
          />
*/}
        </BtnWrap>
      </form>
    );
  }
}

export default SignInForm;

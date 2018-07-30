import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import { FormField } from "components/Commons/FormField";
// import { FormInput } from "components/Commons/FormItem";
// import ValidateForm from "components/Commons/ValidateForm";
import styled from "styled-components";
import FormDataToJson from "modules/FormDataToJson";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  & a:hover {
    color: #fff;
  }
  & > a {
    width: 48%;
    & > button {
      width: 100%;
    }
  }
`;

const LoginBtn = styled(Button)`
  width: 48%;
`;

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

class SignInForm extends Component {

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  liveCheck = (target) => {
    FormControl(this.state[target]);
  };

  onSubmit = async e => {
    e.preventDefault();
    ValidationGroup(this.state, true).then(data => {
      console.log("성공", data);
      this.props.SignInRequest(data).then(data => {
        if (data.type === "AUTH_SIGNIN_IS_NOT_MEMBER") {
          alert("opendesign회원이 아닙니다.");
        } else if (data.type === "AUTH_SIGNIN_IS_NOT_PASSWORD") {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          this.props.history.push("/design");
        }
      });
    }).catch(e => {
      console.log("실패", e);
    });
  };

  onClickFBSignInbtn = (data) => {
    console.log(data)
    let formData = {
      FB_user_id: data.userID
    }
    this.props.FBSignInRequest(formData).then(data => {
      if (data.type === "AUTH_FBSIGNIN_IS_NOT_MEMBER") {
        alert("opendesign회원이 아닙니다.");
      } else {
        this.props.history.push("/design");
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Label>Email</Label>
        <FormInput
          name="email"
          placeholder="email을 입력해주세요."
          getValue={this.onChangeValue}
          validates={["Required", "IsEmail"]}
          onBlur={()=>{this.liveCheck("email")}}
        />
        <Label>Password</Label>
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          getValue={this.onChangeValue}
          validates={["Required", "MinLength(2)", "NotBlank"]}
          onBlur={()=>{this.liveCheck("password")}}
        />
        <BtnWrap>
          <LoginBtn type="submit" round={true}>로그인</LoginBtn>
          <Link to="/signup"><LoginBtn round={true}>회원가입</LoginBtn></Link>
        </BtnWrap>
          <FacebookLogin
            appId="1846803492017708"
            autoLoad={false}
            callback={this.onClickFBSignInbtn}
            render={renderProps => (
              <Button onClick={renderProps.onClick} type="button" color="facebook" icon="facebook f" round={true} fluid={true}>FaceBook 로그인</Button>
            )}
          />
      </form>
    );
  }
}

export default SignInForm;

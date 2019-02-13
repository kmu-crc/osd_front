import React, { Component } from "react";
import { Form, Icon, Modal } from "semantic-ui-react";
import { OverlapField, FormField } from "components/Commons/FormField";
// import { FormInput } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import ValidateForm from "components/Commons/ValidateForm";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";

const SignUpBtn = styled(Button)`
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  margin-top: 30px;
`;

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

class SignUpForm extends Component {
  state = {
    SignUpData: {
      email: null,
      FB_user_id: null,
      nick_name: null
    },
    open: false,
    //isOnlyEmail: false,
    error: null
  };

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
  };

  close = () => this.setState({ open: false });

  handleSignUpFB = response => {
    this.setState({
      SignUpData: {
        email: response.email,
        FB_user_id: response.userID,
        nick_name: response.name
      }
    });
    this.props
      .CheckFBUserRequest({ FB_user_id: response.userID })
      .then(data => {
        if (data.checkFBUser) {
          if (response.email == null || !response.email) {
            return this.setState({ open: true });
          } else {
            this.handleSubmitFB(response);
          }
        } else {
          alert(data.error);
        }
      });
  };

  handleSubmitFB = data => {
    if (data.constructor && data.constructor.name === "FormData") {
      data = FormDataToJson(data);
    }
    this.setState({
      open: false,
      SignUpData: {
        ...this.state.SignUpData,
        email: data.email
      }
    });
    this.props.FBSignUpRequest(this.state.SignUpData).then(data => {
      if (data.type === "AUTH_FBSIGNUP_SUCCESS") {
        this.props.history.push("/design");
      }
    });
  };

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

  samePwCheck = () => {
    FormControl({
      value: [this.state.password.value, this.state.password2.value],
      target: this.state.password2.target,
      validates: this.state.password2.validates
    });
  }
  onSubmit = async e => {
    e.preventDefault();
    let formData = this.state;
    var reg_pw = /^.(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*<>?]).*$/;
    if(!reg_pw.test(formData.password.value)||formData.password.value.length < 6||formData.password.value.length > 15){
      alert("비밀번호는 6자~15자 이내로 영문, 숫자, 특수문자를 모두 조합하여 작성해 주십시오");
      return false;
    }
    
    if(formData.password.value !== formData.password2.value){
      alert("비밀번호 확인을 다시 해주십시오"); 
      return false;
    }
    delete formData.password2;
    ValidationGroup(formData, true).then(data => {
      console.log("성공", data);
      this.props.SignUpRequest(data).then(res => {
        if (res.type === "AUTH_SIGNUP_SUCCESS") {
          this.props.history.push("/design");
        } else {
          alert("다시 시도해주세요");
        }
      });
    }).catch(e => {
      console.log("실패", e);
    });
  };

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Label>Email</Label>
          <FormInput
            name="email"
            placeholder="email을 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "IsEmail", "CheckEmail"]}
            onBlur={()=>{this.liveCheck("email")}}
          />
          <Label>닉네임</Label>
          <FormInput
            name="nick_name"
            placeholder="닉네임을 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "NotSpecialCharacters", "CheckNickName"]}
            onBlur={()=>{this.liveCheck("nick_name")}}
          />
          <Label>Password</Label>
          <FormInput
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "NotBlank"]}
            onBlur={()=>{this.liveCheck("password")}}
          />
          <Label>Password 확인</Label>
          <FormInput
            name="password2"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요."
            getValue={this.onChangeValue}
            validates={["SamePassword"]}
            onBlur={this.samePwCheck}
          />
          <ButtonBox>
            <SignUpBtn type="submit" round={true} fluid={true}>
              회원가입
            </SignUpBtn>
            <FacebookLogin
              appId="799483036860094"
              autoLoad={false}
              fields="name,email"
              callback={this.handleSignUpFB}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  type="button"
                  color="facebook"
                  icon="facebook f"
                  round={true}
                  fluid={true}
                >
                  FaceBook 회원가입
                </Button>
              )}
            />
          </ButtonBox>
        </form>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <ValidateForm onSubmit={this.handleSubmitFB}>
              <FormField
                name="email"
                type="text"
                placeholder="E-Mail"
                label="email"
                validates={["required", "email", "checkEmail"]}
                RenderComponent={FormInput}
              />
              <Button
                type="button"
                negative
                content="닫기"
                onClick={this.close}
              />
              <Button
                type="submit"
                positive
                labelPosition="right"
                icon="checkmark"
                content="등록"
              />
            </ValidateForm>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SignUpForm;

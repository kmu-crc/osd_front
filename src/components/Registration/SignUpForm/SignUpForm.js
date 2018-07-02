import React, { Component } from "react";
import { Form, Icon, Modal } from "semantic-ui-react";
import { OverlapField, FormField } from "components/Commons/FormField";
import { FormInput } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import ValidateForm from "components/Commons/ValidateForm";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import styled from "styled-components";
import Button from "components/Commons/Button";

const SignUpBtn = styled(Button)`
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  margin-top: 30px;
`;

class SignUpForm extends Component {
  state = {
    SignUpData: {
      email: null,
      FB_user_id: null,
      nick_name: null
    },
    open: false,
    isOnlyEmail: false,
    error: null
  };

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
  };

  close = () => this.setState({ open: false });

  handleSubmit = data => {
    let formData = FormDataToJson(data);
    // password2는 회원가입에 직접적으로 필요한 속성이 아니기 때문에 전송시 삭제합니다.
    delete formData.password2;
    this.props.SignUpRequest(formData).then(res => {
      if (res.type === "AUTH_SIGNUP_SUCCESS") {
        this.props.history.push("/design");
      }
    });
  };
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

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state;
    return (
      <div>
        <ValidateForm onSubmit={this.handleSubmit}>
          <FormField
            name="email"
            type="text"
            placeholder="E-Mail"
            label="email"
            validates={["required", "email", "checkEmail"]}
            RenderComponent={FormInput}
          />
          <FormField
            name="nick_name"
            type="text"
            placeholder="닉네임을 입력해주세요"
            label="닉네임"
            validates={["required", "NotSpecialCharacters", "checkNickName"]}
            RenderComponent={FormInput}
          />
          <OverlapField
            name="password"
            type="password"
            placeholder="Password"
            label="password"
            validates={["required"]}
          />
          <ButtonBox>
            <SignUpBtn type="submit" round={true} fluid={true}>
              회원가입
            </SignUpBtn>
            <FacebookLogin
              appId="1846803492017708"
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
        </ValidateForm>
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

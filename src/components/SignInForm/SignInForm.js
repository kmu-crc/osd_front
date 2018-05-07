import React, { Component } from 'react';
import { InputField } from "../commons/FormField";
import ValidateForm from "../commons/ValidateForm";
import { Form, Button, Icon } from 'semantic-ui-react';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

class SignInForm extends Component {
  handleFormSubmit = (formData) => {
    this.props.SignInRequest(formData).then(data => {
      if (data.type === "AUTH_SIGNIN_IS_NOT_MEMBER") {
        alert("opendesign회원이 아닙니다.");
      } else if (data.type === "AUTH_SIGNIN_IS_NOT_PASSWORD") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        this.props.history.push("/design");
      }
    });
  }
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
      <ValidateForm onSubmit={this.handleFormSubmit}>
        <InputField name="email" type="text"
          placeholder="E-Mail" label="email" validates={["required", "email"]} />
        <InputField name="password" type="password"
          placeholder="Password" label="password" validates={["required"]} />
        <Form.Group>
          <Form.Field control={Button} type="submit">로그인</Form.Field>
          <FacebookLogin
            appId="1846803492017708"
            autoLoad={false}
            callback={this.onClickFBSignInbtn}
            render={renderProps => (
              <Button onClick={renderProps.onClick} type="button" color="facebook"><Icon disabled name='facebook f' />FaceBook 회원가입</Button>
            )}
          />
        </Form.Group>
      </ValidateForm>
    );
  }
}

export default SignInForm;

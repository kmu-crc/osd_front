import React, { Component } from 'react';
import { FormField } from "components/Commons/FormField";
import { FormInput } from "components/Commons/FormItem";
import ValidateForm from "components/Commons/ValidateForm";
import { Form, Button, Icon } from "semantic-ui-react";
import FormDataToJson from "modules/FormDataToJson"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

class SignInForm extends Component {
  handleFormSubmit = (data) => {
    // ValidateForm은 FormData를 반환한다 때문에 json형태로 api에 전달하려면 FormData를 일반 객체형태로 변환해주어야 한다.
    let formData = FormDataToJson(data);
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
      <FormField name="email" type="text"
          placeholder="E-Mail" label="email" validates={["required", "email"]} RenderComponent={FormInput} />
          <FormField name="password" type="password"
          placeholder="Password" label="password" validates={["required"]} RenderComponent={FormInput} />
        <Form.Group>
          <Form.Field control={Button} type="submit">로그인</Form.Field>
          <FacebookLogin
            appId="1846803492017708"
            autoLoad={false}
            callback={this.onClickFBSignInbtn}
            render={renderProps => (
              <Button onClick={renderProps.onClick} type="button" color="facebook"><Icon disabled name='facebook f' />FaceBook 로그인</Button>
            )}
          />
        </Form.Group>
      </ValidateForm>
    );
  }
}

export default SignInForm;

import React, { Component } from "react";
import { Form, Button, Icon, Modal, Input } from "semantic-ui-react";
import { InputField, OverlapField } from "../commons/FormField";
import FormDataToJson from "../../modules/FormDataToJson"
import ValidateForm from "../commons/ValidateForm";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

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
  }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
  }

  close = () => this.setState({ open: false })

  handleSubmit = (data) => {
    let formData = FormDataToJson(data);
    // password2는 회원가입에 직접적으로 필요한 속성이 아니기 때문에 전송시 삭제합니다.
    delete formData.password2;
    this.props.SignUpRequest(formData).then(res => {
      if (res.type === "AUTH_SIGNUP_SUCCESS") {
        this.props.history.push("/design");
      }
    })
  }
  handleSignUpFB = (response) => {
    this.setState({
      SignUpData: {
        email: response.email,
        FB_user_id: response.userID,
        nick_name: response.name
      }
    });
    this.props.CheckFBUserRequest({FB_user_id: response.userID}).then( data => {
      if(data.checkFBUser){
        if (response.email == null || !response.email) {
          return this.setState({ open: true })
        } else {
          this.handleSubmitFB();
        }
      } else {
        alert(data.error);
      }

    })
  }
  handleSubmitFB = (data) => {
    console.log(data);
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
    })
  }

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state
    return (
      <div>
        <ValidateForm onSubmit={this.handleSubmit}>
          <InputField name="email" type="text"
            placeholder="E-Mail" label="email" validates={["required", "email", "checkEmail"]} />
          <InputField name="nick_name" type="text"
            placeholder="닉네임을 입력해주세요" label="닉네임" validates={["required", "NotSpecialCharacters", "checkNickName"]} />
          <OverlapField name="password" type="password"
            placeholder="Password" label="password" validates={["required"]} />
          <Form.Group>
            <Form.Field control={Button} type="submit">회원가입</Form.Field>
            <FacebookLogin
              appId="1846803492017708"
              autoLoad={false}
              fields="name,email"
              callback={this.handleSignUpFB}
              render={renderProps => (
                <Button onClick={renderProps.onClick} type="button" color="facebook"><Icon disabled name='facebook f' />FaceBook 회원가입</Button>
              )}
            />
          </Form.Group>
        </ValidateForm>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
        >
          <ValidateForm onSubmit={this.handleSubmitFB}>
            <Modal.Header>
              Delete Your Account
          </Modal.Header>
            <Modal.Content>

              <InputField name="email" type="text"
                placeholder="E-Mail" label="email" validates={["required", "email", "checkEmail"]} />
            </Modal.Content>
            <Modal.Actions>
              <Button type="button" negative content='닫기' onClick={this.close} />
              <Button type="submit" positive labelPosition="right" icon='checkmark' content="등록" />
            </Modal.Actions>
          </ValidateForm>
        </Modal>
      </div>
    );
  }
}

export default SignUpForm;

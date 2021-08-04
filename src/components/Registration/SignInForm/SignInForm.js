import React, { Component } from "react";
import SignInModal from 'components/Header/SignNav/SignInModal'
import { SetSession } from 'modules/Sessions'

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signin_modal: true,
      email: "",
      password: "",
      findPW: false
    }
  }
  componentDidUpdate(prev) {
    console.log(prev, this.props)
  }
  signin = () => {
    this.closeModal()
    this.setState({ signin_modal: false })
    if (window.location.href.search("signup") > -1) {
      window.location.replace("/")
    } else {
      if (window.location.href.search("signin") !== -1) {
      } else {
      }
    }
  }
  closeModal = () => {
    this.setState({ signin_modal: false })
  }
  signout = () => {
    SetSession("opendesign_token", null)
      .then(data => {
        this.props.SignOutRequest()
        this.setState({ sign_modal: false })
        window.location.reload()
      })
    this.setState({ user_popup: null })
  }
  render() {
    return (
      <SignInModal open={this.state.signin_modal} CheckEmailRequest={this.props.CheckEmailRequest}
        FindPwRequest={this.props.FindPwRequest} signinrequest={this.props.SignInRequest} signin={this.signin} close={this.closeModal} />
    );
  }
}

export default SignInForm

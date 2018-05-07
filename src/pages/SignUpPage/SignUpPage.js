import React, { Component } from "react";
import styled from "styled-components";
import ClientTemplate from "../../templates/ClientTemplate";
import SignUpContainer from "../../containers/SignUpContainer";

const SignUpContent = styled.div`
  width: 100%;
  padding: 20px 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const SignUpCard = styled.form`
  width: 600px;
  padding: 50px 20px;
  background-color: #fff;
`;

const InsertDetail = styled.div`
  width: 600px;
  padding: 50px 20px;
  background-color: #fff;
`

const FromFilde = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

class SignUpPage extends Component {
  state = {
    useDetail: false,
    checkEmail: false
  }
  handleFormSubmit = (data) => {
    console.log(data);
    let formData = {
      email: data.email,
      password: data.password,
      nick_name: data.nick_name
    }
    // this.props.SignUpRequest(formData).then(data => {
    //   this.props.history.push("/design");
    // });
  }
  onClickFBSignUpbtn = (data) => {
    console.log(data);
    let formData = {
      email: null,
      nickName: null,
      FBUserId: null
    }
    if (data.email == null) {
      formData.email = prompt("email을 입력해 주세요.");
    } else {
      formData.email = data.email
      formData.nickName = data.name
      formData.FBUserId = data.userID
    }
    this.props.FBSignUpRequest(formData).then(data => {
      console.log("fbsignup: ", data);
      if (data.success === false) {
        alert(data.message);
      } else {
        this.props.history.push("/design");
      }
    });
  }
  handleDetailFormSubmit = (data) => {
    console.log("data");
  }

  handleEmailCheck = () => {
    this.props.CheckEmailRequest(this.email.value).then(data => {
      console.log(data);
      if (data.checkEmail) {
        alert("사용가능한 email입니다.");
        this.setState({ checkEmail: true });
      } else {
        alert(data.error);
        this.setState({ checkEmail: false });
      }
    });
  }
  render() {
    return (
      <ClientTemplate>
        <SignUpContent>
          <InsertDetail>
            <SignUpContainer method="post" onSubmit={this.handleFormSubmit} />
          </InsertDetail>
        </SignUpContent>
      </ClientTemplate>
    );
  }
}

export default SignUpPage;

import React, { Component } from "react";
import styled from "styled-components";
import ClientTemplate from "../../templates/ClientTemplate";
import SignUpContainer from "../../containers/SignUpContainer";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

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
  padding: 50px 20px;
  background-color: #fff;
`;

const InsertDetail = styled.form`
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
  handleFormSubmit = (event) => {
    console.log(event);
    // event.preventDefault();
    // let data = event.target
    // let formData = {
    //   email: data.email.value,
    //   password: data.password.value,
    //   nickName: data.nick_name.value
    // }
    // console.log("form", formData);
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
    const SignUpUser = () => {
      return (
        <div>
          <FromFilde>
            <label htmlFor="email">email</label>
            <input type="email" id="email" name="email" ref={ref => this.email = ref} />
            <button type="button" onClick={this.handleEmailCheck} >email 중복검사</button>
          </FromFilde>
          <FromFilde>
            <label htmlFor="password">passord</label>
            <input type="password" id="password" name="password" />
          </FromFilde>
          <FromFilde>
            <label htmlFor="nick_name">Nick Name</label>
            <input type="text" id="nick_name" name="nick_name" />
          </FromFilde>
          <button type="submit">회원가입 하기</button>
          <FacebookLogin
            appId="1846803492017708"
            fields="name,email"
            autoLoad={false}
            callback={this.onClickFBSignUpbtn}
            render={renderProps => (
              <button type="button" onClick={renderProps.onClick}>facebook 회원가입</button>
            )} />
        </div>
      )
    };
    return (
      <ClientTemplate>
        <SignUpContent>
          <SignUpContainer onSubmit={this.handleFormSubmit}/>
          {this.state.useDetail
            ? <InsertDetail method="post" onSubmit={this.handleDetailFormSubmit}>
              <FromFilde>
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" />
              </FromFilde>
              <FromFilde>
                <label htmlFor="password">passord</label>
                <input type="password" id="password" name="password" />
              </FromFilde>
              <FromFilde>
                <label htmlFor="nick_name">Nick Name</label>
                <input type="text" id="nick_name" name="nick_name" />
              </FromFilde>
            </InsertDetail>
            : <SignUpCard method="post" onSubmit={this.handleFormSubmit}>
              <SignUpUser />
            </SignUpCard>
          }
        </SignUpContent>
      </ClientTemplate>
    );
  }
}

export default SignUpPage;

import React, { Component } from "react";
import MobileSlideMenu, { Back } from "components/Mobile/MobileSlideMenu";
import styled from "styled-components";
import SearchForm from "components/Header/SearchForm";
import logo from "resources/images/mobile_signin_logo.svg";
import Loading from 'components/Commons/Loading';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FindPwRequest } from "redux/modules/account";
import cookie from "react-cookies";
import { SignInRequest, } from "redux/modules/auth";

const Wrapper = styled.div`
  width: 100wh;
  height: 100vh;
  background-color: rgba(0,0,0,0.63);
  display: flex;
  flex-direction: column;
  justify-content: space-start;
  .search-bar-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 9px;
  }
  .logo-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .login-wrapper {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .id-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .label {
        height: 22px;
        text-align: left;
        font-weight: medium;
        font-size: 15px;
        line-height: 22px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #FFFFFF;

        margin-right: 18px;
      } 
      input {
        width: 183px;
        height: 18px;
        border: none;
      }
    }
    .pw-wrapper { 
      margin-top: 17px;

      display: flex;
      flex-direction: row;
      justify-content: center;

      .label {
        height: 22px;
        text-align: left;
        font-weight: medium;
        font-size: 15px;
        line-height: 22px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #FFFFFF;

        margin-right: 10px;
      } 
      input {
        width: 183px;
        height: 18px;
        border: none;
      }
    }
    .save-wrapper {
      margin-top: 17px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .save {
        color: pink;
      }
      button {
        border: none;
        width: 72px;
        min-width:max-content;
        height: 18px;
        background-color: #7A7A7A;
        font-size: 8px;
        font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
        font-weight: 500;
        color: #FFFFFF;
        :first-child {
          margin-left: 30px;
        }
        :last-child {
          margin-left: 35px;
        }
    }
  }
    .login-wrapper { 
      display: flex;
      flex-direction: row;
      justify-content: center;
     button{
       border: none;
       margin-left: 30px;
      width: 185px;
      height: 30px;
      background-color: #7A7A7A;
      color: #FFFFFF;
      font-size: 15px;
      font-family: Spoqa Han Sans Neo-Bold, Spoqa Han Sans Neo;
      font-weight: 700;
 
      }
    }
    .signup-wrapper { 
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 18px;

      button{
        background: none;
        border: none;

        :first-child {
          margin-left: 35px;
          width: max-content;
          height: 19px;
          text-align: center;
          font-weight: medium;
          font-size: 13px;
          line-height: 19px;
          font-family: Noto Sans KR;
          letter-spacing: 0px;
          color: #FFFFFF;
        }
        :last-child {
          margin-left: 52px;
          width: max-content;
          height: 19px;
          text-align: center;
          font-weight: medium;
          font-size: 13px;
          line-height: 19px;
          font-family: Noto Sans KR;
          letter-spacing: 0px;
          color: #FFFFFF;
        }
      }
    }
  }
`;
const STRING_WRONG_EMAIL_FORMAT = "이메일 형식이 잘못되었습니다.";
const STRING_EMPTY_ID_PW = "이메일 또는 비밀번호를 입력해주세요.";
const STRING_FAILED_LOGIN = "로그인에 실패하였습니다.";
class SignInFormMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isSavedId: false,
      isSavedPassword: false,

    }
  }
  componentDidMount() {
    const email = cookie.load('saveid') || null;
    const password = cookie.load('savepassword') || null;
    if (email) {
      const emailInput = document.getElementById("email");
      emailInput.value = email;
      this.setState({ isSavedId: true });
    }
    if (password) {
      const passwordInput = document.getElementById("password");
      passwordInput.value = password;
      this.setState({ isSavedPassword: true });
    }
  }
  saveID = () => {
    const { isSavedId } = this.state;
    const email = document.getElementById("email").value || "";
    if (email === "" || email == null) {
      return;
    }
    if (isSavedId) {
      cookie.remove(('saveid'), { path: '/' });
    } else {
      cookie.save("saveid", email, { path: '/', });
    }
    this.setState({ isSavedId: !isSavedId });
  };
  saveIDPW = () => {
    const { isSavedPassword } = this.state;
    const email = document.getElementById("email").value || "";
    const password = document.getElementById("password").value || "";
    if (isSavedPassword) {
      cookie.remove(('saveid'), { path: '/' });
      cookie.remove(('savepassword'), { path: '/' });
    } else {
      cookie.save("saveid", email, { path: '/', });
      cookie.save(('savepassword'), password, { path: '/' });
    }
    this.setState({ isSavedId: !isSavedPassword, isSavedPassword: !isSavedPassword });
  };
  login = async (e) => {
    const id = document.getElementById("email").value || "";
    const pw = document.getElementById("password").value || "";
    console.log({ id, pw });
    if (id === "" || pw === "") {
      alert(STRING_EMPTY_ID_PW);
      pw === "" && document.getElementById("password").focus();
      id === "" && document.getElementById("email").focus();
      return;
    }
    if (!this.checkEmailFormat()) {
      alert(STRING_WRONG_EMAIL_FORMAT);
      return;
    }
    this.props.SignInRequest({ email: id, password: pw })
      .then(async (res) => {
        if (res.type === "opendesign/authentication/AUTH_SIGNIN_SUCCESS") {
          if (window.location.pathname === "/" || window.location.pathname === "signin" || window.location.pathname === "signup") {
            window.location.href = "/";
          } else {
            window.history.back();
          }
        }
        else {
          alert(STRING_FAILED_LOGIN);
          document.getElementById("email").focus();
        }
      })
  };
  handleBlurId = async (e) => {
    const id = document.getElementById("email").value || "";
    if (id !== "" && !this.checkEmailFormat()) {
      alert(STRING_WRONG_EMAIL_FORMAT);
      e.preventDefault();
    }
  }
  gotoSignUpPage = () => {
    window.location.href = "/signup";
  };
  gotoFindPWPage = () => {
    window.location.href = "/findpw";
  };
  handleIdEnter = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
      const pw = document.getElementById("password");
      pw && pw.focus();
    }
  };
  handlePwEnter = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
      this.login();
    }
  };
  checkEmailFormat = () => {
    const checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const email = document.getElementById("email").value || "";
    return checkedMail.test(email);
  }
  checkEmail = async () => {
    const email = document.getElementById("email").value || "";
    const data = { email: email };
    let returnvalue = true;
    await this.props.CheckEmailRequest(data).then(
      (res) => {
        if (res.checkEmail === false) {
          returnvalue = false;
        }
      }
    );
    return !returnvalue;
  }

  render() {
    const { loading } = this.state;

    return (<React.Fragment>

      {loading ? <Loading /> : null}

      <Back visible={this.state.sidemenu} />

      {/* navi */}
      <MobileSlideMenu setSideMenu={(v) => this.setState({ sidemenu: v })} />

      <Wrapper>

        {/* search bar */}
        <div className="search-bar-wrapper">
          <SearchForm formWidth={199} visible={1} transparent={true} />
        </div>

        {/* logo  */}
        <div className="logo-wrapper">
          <img src={logo} />
        </div>

        {/* login form */}
        <div className="login-wrapper">
          <div className="id-wrapper">
            <div className="label">ID</div>
            <div>
              <input
                id="email"
                type="text"
                onBlur={this.handleBlurId}
              // onKeyDown={this.handleIdEnter} 
              />
            </div>
          </div>

          <div className="pw-wrapper">
            <div className="label">PW</div>
            <div>
              <input
                id="password"
                type="password"
                onKeyDown={this.handlePwEnter} />
            </div>
          </div>

          <div className="save-wrapper">
            <button className={this.state.isSavedId ? "save" : ""} onClick={this.saveID}>아이디저장</button>
            <button className={this.state.isSavedPassword ? "save" : ""} onClick={this.saveIDPW}>로그인 상태 유지</button>
          </div>
          <div className="login-wrapper">
            <button onClick={this.login}>로그인</button>
          </div>
          <div className="signup-wrapper">
            <button onClick={this.gotoSignUpPage}>회원가입</button>
            <button onClick={this.gotoFindPWPage}>ID/PW찾기</button>
          </div>
        </div>
      </Wrapper>

    </React.Fragment>);
  }
}


const mapStateToProps = state => ({
  status: state.Account.FindPw.status,
  message: state.Account.status.message
});
const mapDispatchToProps = dispatch => ({
  FindPwRequest: data => dispatch(FindPwRequest(data)),
  SignInRequest: data => dispatch(SignInRequest(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInFormMobile));

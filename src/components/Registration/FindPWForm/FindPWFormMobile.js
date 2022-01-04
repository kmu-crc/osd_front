import React, { Component } from "react";
import MobileSlideMenu, { Back } from "components/Mobile/MobileSlideMenu";
import styled from "styled-components";
import SearchForm from "components/Header/SearchForm";
import Loading from 'components/Commons/Loading';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FindPwRequest } from "redux/modules/account";
// import cookie from "react-cookies";
import { CheckEmailRequest, } from "redux/modules/auth";

const Wrapper = styled.div`
  width: 100wh;
  height: 100vh;
  background-color: white; // rgba(0,0,0,0.63);
  display: flex;
  flex-direction: column;
  justify-content: space-start;
  // *{border: 1px solid red;}
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .search-bar-wrapper {
     margin-top: 9px;
  }
  .title-wrapper {
    margin-top: 33px;
    height: 22px;
    text-align: center;
    font-weight: medium;
    font-size: 1.25rem;
    line-height: 22px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
  }
  .text-wrapper {
    margin-top: 18px;
    height: 14px;
    text-align: center;
    font-weight: medium;
    font-size: 0.92rem;
    line-height: 14px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }
  .input-wrapper {
    margin-top: 15px;

    input { 
      width: 256px;
      background-color: rgb( 160, 160, 160);
      border: none; 
      outline: none;
      padding:5px 10px;
      :focus { 
        outline: none;
      }

      font-weight: medium;
      font-size: 1rem;
      line-height: 14px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #FFFFFF;
      ::placeholder {
        color: #FFFFFF;
      }
    }
  }
  .button-wrapper {
    margin-top: 94px;

    button { 
      background: none; 
      border: none; 
      outline: none;

      min-width: 124px;
      width: auto;
      height: 33px;
      background-color: #FFFFFF;
      border: 1px solid #707070;

      span {
        font-size: 1.25rem;
        font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
        font-weight: 500;
      }
    }
  }
`;
const STRING_WRONG_EMAIL_FORMAT = "이메일 형식이 잘못되었습니다.";
const STRING_EMPTY_ID_PW = "이메일을 입력해주세요.";
const STRING_SUCCESS_FINDPW = "변경된 비밀번호가 이메일에 전송되었습니다.\n\
입력한 이메일의 메일함을 확인해주세요.\n"
const STRING_MOVE_TO_SIGNIN = "로그인페이지로 이동합니다.";
const STRING_FAILED_FINDPW = "비밀번호찾기에 실패하였습니다. \
관리자에게 문의바랍니다.\n \
관리자이메일: opensrcdesign@gmail.com";
const STRING_UNREGISTERED_EMAIL = "등록되지 않은 이메일 주소입니다.";
const STRING_SERVER_ERROR = "요청에 실패하였습니다. 관리자에게 문의바랍니다.\n \
관리자이메일: opensrcdesign@gmail.com";

class SignInFormMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.status === "INIT" && this.props.status === "WAITING") {
      this.setState({ loading: true });
    }
    if (prevProps.status === "WAITING" && this.props.status === "SUCCESS") {
      alert(STRING_SUCCESS_FINDPW);
      alert(STRING_MOVE_TO_SIGNIN);
      window.location.href = "/signin";
    }
    if (prevProps.status === "WAITING" && this.props.status === "FAILURE") {
      alert(STRING_FAILED_FINDPW);
      this.setState({ loading: false });
    }
  }
  findpw = async (e) => {
    const id = document.getElementById("email").value || "";
    const check_email = await this.checkEmail();

    if (check_email === 0) {
      alert(STRING_UNREGISTERED_EMAIL);
      return;
    }
    else if (check_email === -1) {
      alert(STRING_SERVER_ERROR)
      return;
    }

    if (id == null || id.trim() === "") {
      alert(STRING_EMPTY_ID_PW);
      id.trim() === "" && document.getElementById("email").focus();
      return;
    }
    if (!this.checkEmailFormat()) {
      alert(STRING_WRONG_EMAIL_FORMAT);
      id.trim() === "" && document.getElementById("email").focus();
      return;
    }
    this.props.FindPwRequest({ email: id });
  };
  handleBlurId = async (e) => {
    const id = document.getElementById("email").value || "";
    if (id !== "" && !this.checkEmailFormat()) {
      alert(STRING_WRONG_EMAIL_FORMAT);
      e.preventDefault();
    }
  }
  handlePwEnter = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
      this.findpw();
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
    let result = -1;
    await this.props.CheckEmailRequest(data).then(
      (res) => {
        if (res.checkEmail === false) {
          result = 1;
        } else {
          result = 0;
        }
      }
    );
    return result;
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
        <div className="flex-center search-bar-wrapper">
          <SearchForm formWidth={199} visible={1} transparent={true} />
        </div>

        <div className="flex-center title-wrapper">비밀번호 찾기</div>

        <div className="flex-center text-wrapper">비밀번호를 재발급 하고자하는 아이디(메일)를 입력해 주세요. </div>

        <div className="flex-center input-wrapper">
          <input
            id="email"
            type="text"
            onBlur={this.handleBlurId}
            onKeyDown={this.handlePwEnter}
            placeholder="아이디(이메일주소)를 입력하세요"
          />
        </div>

        <div className="flex-center button-wrapper">
          <button onClick={this.findpw} >
            <span>비밀번호 발급</span>
          </button>
        </div>


      </Wrapper>

    </React.Fragment>);
  }
}


const mapStateToProps = state => ({
  status: state.Account.FindPw.status,
});
const mapDispatchToProps = dispatch => ({
  FindPwRequest: data => dispatch(FindPwRequest(data)),
  CheckEmailRequest: data => dispatch(CheckEmailRequest(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInFormMobile));

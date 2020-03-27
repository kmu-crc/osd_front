import React, { Component } from "react";
import { Modal, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl"
import SignUpModal from "./SignUpModal"
import StyleGuide from "StyleGuide"
import FooterPara from "components/Commons/FooterTerm/FooterPara";
// import {confirmAlert} from "react-confirm-alert";
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"

const MainBox = styled.div`
  *{
    font-family:Noto Sans KR,Medium;
    color:#060000;
  }

  width:933px;
  height:748px;
  padding:32px;
  display:flex;
  justify-content:center;
  align-items:center;

  .contentsBox{
    width:498px;
    height:100%;
    display:flex;
    flex-direction:column;

    .titleBox{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      .title{
        font-size:20px;
        font-weight:500;
      }
    }
    
    .row{
      *{
        font-size:15px;
      }
      display:flex;
      height:43px;
      margin-bottom:19px;
      .label{
        min-width:104px;
        font-weight:500;
        display:flex;
        align-items:center;
      }
      .red_text{
        color:red;
      }
    }
    .row2{
      *{
        font-family:Noto Sans KR,Light
      }
      width:100%;
      height:29px;
      display:flex;
      .label2{
        min-width:104px;
        height:100%;
        font-weight:200;
      }
      .content2{
        display:flex;
      }
      .red_text{
        color:red;
      }
    }
    .paddingTop{
      padding-top:5px;
    }
    .spaceBetween{
      justify-content:space-between;
    }

  }
`
const CustomButton = styled.div`
    width:${props => props.width}px;
    height:${props => props.height}px;
    border:1px solid ${props => props.borderColor};
    border-radius:${props => props.borderRadius}px;
    background-color:${props => props.bgColor};
    color:${props => props.fontColor};
    margin-top:26px;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:1;
    cursor:pointer;
    &:hover{
      opacity:0.7;
    }

  `
const CustomBox = styled.div`
  width:${props => props.width == null ? 100 : props.width}%;
  height:${props => props.height == null ? 100 : props.height}%;
  display:flex;
  margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
  margin-bottom:${props => props.marginBottom == null ? 0 : props.marginBottom}px;
  margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
  margin-right:${props => props.marginRight == null ? 0 : props.marginRight}px;
`
const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width:17px !important;
  height:17px !important;
  border:0.5px solid #707070;
  margin-right:11px;
`
const InputTextBox = styled.input`
  border:none;
  width:100%;
  height:100%;
  padding-left:20px;
  background-color:#E9E9E9;
  border-radius:21px;
  display:flex;
  justify-content:center;
  outline:none;
  
  color:#060000;
`

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "", password: "", passwordCheck: "", name: "", phone: "",
      checkAllOk: false, checkTerms: false, checkPersonalInfo_ess: false, checkPersonal_choice: false,
    }
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordCheck = this.onChangePasswordCheck.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckAllOk = this.onCheckAllOk.bind(this);
    this.onCheckTerms = this.onCheckTerms.bind(this);
    this.onCheckPersonalInfoEsscential = this.onCheckPersonalInfoEsscential.bind(this);
    this.onCheckPersonalInfoChoice = this.onCheckPersonalInfoChoice.bind(this);
  }
  async checkEmail() {
    const data = { email: this.state.email }
    let returnvalue = true;
    await this.props.CheckEmailRequest(data).then(
      (res) => {
        console.log(res, data);
        if (res.checkEmail === false) {
          returnvalue = false;
        }
      }
    );
    console.log("qwer", returnvalue);
    return returnvalue;
  }
  async checkNickname() {
    const data = { nick_name: this.state.name }
    let returnvalue = true;
    await this.props.CheckNickNameRequest(data).then(
      (res) => {
        console.log(res, data);
        if (res.checkNickName === false) {
          returnvalue = false;
        }
      }
    );
    console.log("qwer", returnvalue);
    return returnvalue;
  }
  onSubmit = async e => {

    e.persist();
    //유효성검사
    if (this.state.email === "") {
      alert("아이디를 입력해주세요");
    }
    else if (this.state.password === "") {
      alert("비밀번호를 입력해주세요");
    }
    else if (this.state.passwordCheck === "") {
      alert("비밀번호 확인을 입력해주세요");
    }
    else if (this.state.name === "") {
      alert("이름을 입력해주세요");
    }
    else if (this.state.phone === "") {
      alert("휴대폰 번호를 입력해주세요");
    }
    else if (await this.checkEmail() === false) {
      alert("중복된 아이디입니다.");
      return;
    }
    else if (await this.checkNickname() === false) {
      alert("중복된 닉네임입니다.");
      return;
    }
    //약관동의
    if (this.state.checkTerms === false || this.state.checkPersonalInfo_ess === false) {
      alert("필수 이용약관에 동의해주세요!");
      return;
    }
    // 
    if (window.confirm("회원가입을 하시겠습니까?") == false) {
      return;
    }
    e.preventDefault();
    const data = { email: this.state.email, password: this.state.password, nick_name: this.state.name, phone: this.state.phone };
    this.props.SignUpRequest(data).then(res => {
      if (res.type === "AUTH_SIGNUP_SUCCESS") {
        this.setState({ success: true });
        window.location.href = "/";
      } else {
        alert("다시 시도해주세요")
      }
    }).catch(e => {
      console.log("실패", e);
    });
  }
  onChangeID(event) {
    this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  onChangePasswordCheck(event) {
    this.setState({ passwordCheck: event.target.value });
  }
  onChangeName(event) {
    this.setState({ name: event.target.value });
  }
  onChangePhone(event) {
    this.setState({ phone: event.target.value });
  }
  onCheckAllOk(event) {
    const result = document.getElementById(event.target.id).checked;

    this.setState({
      checkAllOk: result, checkTerms: result, checkPersonalInfo_ess: result, checkPersonal_choice: result,
    })

  }
  onCheckTerms(event) {
    const result = document.getElementById(event.target.id).checked;
    this.setState({
      checkTerms: result,
    })
  }
  onCheckPersonalInfoEsscential(event) {
    const result = document.getElementById(event.target.id).checked;
    this.setState({
      checkPersonalInfo_ess: result,
    })
  }
  onCheckPersonalInfoChoice(event) {
    const result = document.getElementById(event.target.id).checked;
    this.setState({
      checkPersonal_choice: result,
    })
  }
  render() {
    console.log(this.state.agree)
    return (
      <React.Fragment>
        <MainBox>
          <div className="contentsBox">
            <div className="titleBox"><div className="title">회원 가입</div></div>
            <CustomBox height={8} />
            <div className="row">
              <div className="label"><div>아이디</div></div>
              <InputTextBox
                placeholder="아이디를 입력하세요."
                value={this.state.email}
                onChange={this.onChangeID} />
            </div>
            <div className="row">
              <div className="label"><div>비밀번호</div></div>
              <InputTextBox type="password"
                value={this.state.password}
                placeholder="비밀번호를 입력하세요."
                onChange={this.onChangePassword} />
            </div>
            <div className="row">
              <div className="label"><div>비밀번호 확인</div></div>
              <InputTextBox type="password"
                value={this.state.passwordCheck}
                placeholder="비밀번호를 한번 더 입력하세요."
                onChange={this.onChangePasswordCheck} />
            </div>
            <div className="row">
              <div className="label"><div>이름</div></div>
              <InputTextBox
                value={this.state.name}
                placeholder="이름을 입력하세요."
                onChange={this.onChangeName} />
            </div>
            <div className="row">
              <div className="label"><div>휴대폰</div></div>
              <InputTextBox
                value={this.state.phone}
                placeholder="휴대폰 번호를 입력하세요."
                onChange={this.onChangePhone} />
            </div>
            <CustomBox height={4} />
            <div className="row">
              <div className="label"><div className="red_text">이용약관</div></div>
              <div className="label"><CheckBox onChange={this.onCheckAllOk} checked={this.state.checkAllOk} id="allOk" />전체동의</div>
            </div>
            <div className="row2">
              <div className="label2" />
              <div className="content2"><CheckBox onChange={this.onCheckTerms} checked={this.state.checkTerms} id="terms" />이용약관 (필수)</div>
            </div>
            <div className="row2">
              <div className="label2" />
              <div className="content2"><CheckBox onChange={this.onCheckPersonalInfoEsscential} checked={this.state.checkPersonalInfo_ess} id="personalInfoEss" />개인정보 수집 및 이용 (필수)</div>
            </div>
            <div className="row2">
              <div className="label2" />
              <div className="content2"><CheckBox onChange={this.onCheckPersonalInfoChoice} checked={this.state.checkPersonal_choice} id="personalInfoChoice" />개인정보 수집 및 이용&nbsp;<div className="red_text">(선택)</div></div>
            </div>

            <CustomButton onClick={this.onSubmit}
              width={498}
              height={43}
              bgColor={"#FF0000"}
              borderRadius={21}
              fontColor={"white"}>가입</CustomButton>
          </div>
        </MainBox>
      </React.Fragment>
    )
  }
}
export default SignUpForm

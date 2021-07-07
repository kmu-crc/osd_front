import React, { Component } from "react";
// import { Modal, Icon } from "semantic-ui-react";
import styled from "styled-components";
// import Button from "components/Commons/Button";
// import { FormInput } from "components/Commons/FormItems";
// import { FormControl, ValidationGroup } from "modules/FormControl"
// import SignUpModal from "./SignUpModal"
// import StyleGuide from "StyleGuide"
// import FooterPara from "components/Commons/FooterTerm/FooterPara";
// import {confirmAlert} from "react-confirm-alert";
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";


const MainBox = styled.div`
  width:100%;
  padding:0px 10px;
  margin-top:70px;
  .wrapper{
    width:100%;
  }
  .header{
    width:100%;
    font-size:${market_style.font.size.normal3};
    font-weight:800;
    color:black;
    text-align:center;
    margin-bottom:26px;
  }
  .spaceBetween{justify-content:space-between;}
  .maxRow{width:100%;}
  .marginBottom1{margin-bottom:10px;}
  .marginBottom2{margin-bottom:50px;}
  .alignCenter{align-items:center;}
  .bold{font-weight:600;}
  .row{
    width:100%;
    margin-bottom:10px;
    display:flex;
    align-items:center;
  }
  .row2{
    width:100%;
    display:flex;
  }
  .label{
    min-width:102px;
    padding-left:10px;
    font-size:${market_style.font.size.small1};
    font-weight:500;
    color:black;
  }
  .marginRight{margin-right:30px;}
  .fontSmall{font-size:${market_style.font.size.mini2};}
  .red{color:#FF3838;}
  .flex{display:flex;align-items:center;}
  .content2{
    height:19px;
    display:flex;
    align-items:center;
    margin-bottom:5px;
  }
  
`
const InputText = styled.input`
  width:100%;
  max-width:270px;
  height:30px;
  background-color:#E9E9E9;
  border:none;
  border-radius:22px;
  outline:none;
  padding:5px 13px;
`
const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width:17px;
  height:17px;
  border:0.5px solid #707070;
  margin-right:11px;
`
const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"px"};
  height:${props=>props.height==null?"100%":props.height+"px"};
  color:${props=>props.color==null?"white":props.color};
  background-color:${props=>props.bgColor==null?"#FF3838":props.bgColor};
  border-radius:${props=>props.borderRadius==null?"0px":props.borderRadius+"px"};
  border:2px solid #FF3838;
  display:flex;
  align-items:center;
  justify-content:center;
`
const CustomButton = styled.div`
    width:${props => props.width==null?"100%":props.width}px;
    height:${props => props.height}px;
    border:1px solid ${props => props.borderColor};
    border-radius:${props => props.borderRadius}px;
    background-color:${props => props.bgColor};
    color:${props => props.fontColor};
    font-size:18px;
    margin-top:43px;
    display:flex;
    padding-top:2px;
    justify-content:center;
    align-items:center;
    opacity:1;
    cursor:pointer;
    font-size:${market_style.font.size.small1};
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
class SignUpForm_mobile extends Component {

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
      await alert("아이디를 입력해주세요");
    }
    else if (this.state.password === "") {
      await alert("비밀번호를 입력해주세요");
    }
    else if (this.state.passwordCheck === "") {
      await alert("비밀번호 확인을 입력해주세요");
    }
    else if (this.state.name === "") {
      await alert("이름을 입력해주세요");
    }
    else if (this.state.phone === "") {
      await alert("휴대폰 번호를 입력해주세요");
    }
    else if (await this.checkEmail() === false) {
      await alert("중복된 아이디입니다.");
      return;
    }
    else if (await this.checkNickname() === false) {
      await alert("중복된 닉네임입니다.");
      return;
    }
    //약관동의
    if (this.state.checkTerms === false || this.state.checkPersonalInfo_ess === false) {
      await alert("필수 이용약관에 동의해주세요!");
      return;
    }
    // 
    if (await confirm("회원가입을 하시겠습니까?") === false) {
      return;
    }
    e.preventDefault();
    const data = { email: this.state.email, password: this.state.password, nick_name: this.state.name, phone: this.state.phone };
    this.props.SignUpRequest(data).then(async res => {
      if (res.type === "AUTH_SIGNUP_SUCCESS") {
        this.setState({ success: true });
        window.location.href = "/";
      } else {
        await alert("다시 시도해주세요")
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
        <div className="wrapper">
          <div className="header">회원 가입</div>
            <div className="row">
              <div className="label"><div>아이디</div></div>
              <InputText
                fontSize={market_style.font.size.tiny1}
                placeholder="아이디를 입력하세요."
                value={this.state.email}
                onChange={this.onChangeID} />
            </div>
            <div className="row">
              <div className="label"><div>비밀번호</div></div>
              <InputText type="password"
                fontSize={market_style.font.size.tiny1}
                value={this.state.password}
                placeholder="비밀번호를 입력하세요."
                onChange={this.onChangePassword} />
            </div>
            <div className="row">
              <div className="label"><div>비밀번호 확인</div></div>
              <InputText type="password"
                fontSize={market_style.font.size.tiny1}
                value={this.state.passwordCheck}
                placeholder="비밀번호를 한번 더 입력하세요."
                onChange={this.onChangePasswordCheck} />
            </div>
            <div className="row">
              <div className="label"><div>이름</div></div>
              <InputText
                fontSize={market_style.font.size.tiny1}
                value={this.state.name}
                placeholder="이름을 입력하세요."
                onChange={this.onChangeName} />
            </div>
            <div className="row">
              <div className="label"><div>휴대폰 번호</div></div>
              <InputText
                fontSize={market_style.font.size.tiny1}
                value={this.state.phone}
                placeholder="휴대폰 번호를 입력하세요."
                onChange={this.onChangePhone} />
            </div>
            <CustomBox height={2} marginTop={14}/>
            <div className="row alignCenter">
              <div className="label"><div className="red">이용약관</div></div>
              <div className="bold"><CheckBox onChange={this.onCheckAllOk} checked={this.state.checkAllOk} id="allOk" />전체동의</div>
            </div>
            <div className="row2 alignCenter">
              <div className="label" />
              <div className="content2 font_small"><CheckBox onChange={this.onCheckTerms} checked={this.state.checkTerms} id="terms" />이용약관 (필수)</div>
            </div>
            <div className="row2 alignCenter">
              <div className="label" />
              <div className="content2 font_small"><CheckBox onChange={this.onCheckPersonalInfoEsscential} checked={this.state.checkPersonalInfo_ess} id="personalInfoEss" />개인정보 수집 및 이용 (필수)</div>
            </div>
            <div className="row2 alignCenter">
              <div className="label" />
              <div className="content2 font_small"><CheckBox onChange={this.onCheckPersonalInfoChoice} checked={this.state.checkPersonal_choice} id="personalInfoChoice" />개인정보 수집 및 이용&nbsp;<span className="red">(선택)</span></div>
            </div>
            <div className="row2">
            <CustomButton borderRadius={10} onClick={this.onSubmit}
              width={396}
              height={35}
              bgColor={"#FF3838"}
              fontColor={"white"}>가입하기</CustomButton>
            </div>
          </div>
        </MainBox>
      </React.Fragment>
    )
  }
}
export default SignUpForm_mobile

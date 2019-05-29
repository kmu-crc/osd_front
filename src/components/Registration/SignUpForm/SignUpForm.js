import React, { Component } from "react";
import { Modal, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl"
import SignUpModal from "./SignUpModal"
import StyleGuide from "StyleGuide"
import FooterPara from "components/Commons/FooterTerm/FooterPara";

const SignUpBtn = styled(Button)`
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  margin-top: 30px;
`;

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

const Labellink = styled.div`
  margin: 0 0 0.8rem 0;
  display: red;
  color: #E72327;
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

const CustomModal = styled(Modal)`
  padding: 20px;
  & .icon.close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${StyleGuide.color.geyScale.scale9};
    cursor: pointer;
  }
  & .ui.form textarea:not([rows]) {
    min-height: 2rem;
  }
`;

class SignUpForm extends Component {
  state = {
    SignUpData: { email: null, nick_name: null },
    agree: false, openTerm: false, error: null, success: false
  }

  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      console.log(obj, data.target.name, data)
      obj[data.target.name] = data
    }
    await this.setState(obj)
    console.log(this.state)
  }

  liveCheck = (target) => {
    FormControl(this.state[target])
  }

  samePwCheck = () => {
    FormControl({
      value: [this.state.password.value, this.state.password2.value],
      target: this.state.password2.target,
      validates: this.state.password2.validates
    })
  }
  onSubmit = async e => {
    e.preventDefault();
    let formData = this.state;
    var reg_pw = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*<>?])/;
    if (!reg_pw.test(formData.password.value) || formData.password.value.length < 6 || formData.password.value.length > 15) {
      alert("비밀번호는 6자~15자 이내로 영문, 숫자, 특수문자를 모두 조합하여 작성해 주십시오");
      return false;
    }

    if (formData.password.value !== formData.password2.value) {
      alert("비밀번호 확인을 다시 해주십시오");
      return false;
    }

    if (!this.state.agree) {
      alert("이용약관에 동의해주십시오");
      return false;
    }

    delete formData.password2;

    ValidationGroup(formData, true).then(data => {
      this.props.SignUpRequest(data).then(res => {
        if (res.type === "AUTH_SIGNUP_SUCCESS") {
          this.setState({ success: true });
        } else {
          alert("다시 시도해주세요")
        }
      })
    }).catch(e => {
      console.log("실패", e);
    })
  }
  openTermModal = () => { this.setState({ openTerm: true }) }
  checkAgree = async () => {
    let obj = this.refs.use_agreement
    obj.checked = true
    await this.setState({ openTerm: false, agree: true })
  }
  preventClick = () => {
    if (this.state.agree === false) {
      alert("`이용약관 보기`를 통해 동의하실 수 있습니다")
      this.refs.use_agreement.checked = false
    }
  }
  onCloseTerm = () => { this.setState({ openTerm: false }) }
  render() {
    console.log(this.state.agree)
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.success === true && <SignUpModal history={this.props.history} />}
          {/* {this.state.openTerm === true && <TermModal handleCheck={this.checkAgree}/>} */}
          <Label>Email</Label>
          <FormInput
            name="email"
            placeholder="email을 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "IsEmail", "CheckEmail"]}
            onBlur={() => { this.liveCheck("email") }}
          />
          <Label>닉네임</Label>
          <FormInput
            name="nick_name"
            maxLength="20"
            placeholder="닉네임을 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "NotSpecialCharacters", "CheckNickName"]}
            onBlur={() => { this.liveCheck("nick_name") }}
          />
          <Label>Password</Label>
          <FormInput
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "NotBlank"]}
            onBlur={() => { this.liveCheck("password") }}
          />
          <Label>Password 확인</Label>
          <FormInput
            name="password2"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요."
            getValue={this.onChangeValue}
            validates={["SamePassword"]}
            onBlur={this.samePwCheck}
          />
          <Label>이용약관 동의 확인</Label>
          <Labellink><div style={{ cursor: "pointer" }} onClick={this.openTermModal}>이용약관 보기</div></Labellink>
          <label><input disabled ref="use_agreement" value={this.state.agree} onClick={this.preventClick} type="checkbox" /> 이용약관에 동의함</label>
          <ButtonBox>
            <SignUpBtn type="submit" round={true} fluid={true}> 회원가입 </SignUpBtn>
          </ButtonBox>
        </form>
        {this.state.openTerm && (
          <CustomModal open={this.state.openTerm} onClose={this.onCloseTerm}>
            <Modal.Content>
              <Icon name="close" size="big" onClick={this.onCloseTerm} />
              <div style={{ overflowY: "scroll", overflowX: "hidden", height: "450px", width: "100%" }}>
                <FooterPara style={{ backgroundColor: "#EEE" }} />
              </div>
              <div style={{ paddingTop: "5px", display: "flex", justifyContent: "right" }}>
                <Button onClick={this.checkAgree}>동의</Button>
              </div>
            </Modal.Content>
          </CustomModal>
        )}
      </div>
    )
  }
}
export default SignUpForm

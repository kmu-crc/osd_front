import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import close from "source/close_white.png"

const CustomModal = styled(Modal)`
min-width: 1200px;
height: 900px;
border-radius: 35px; 
font-family: Noto Sans KR;
    .title {
        padding: 0 0;
        margin: 0 auto;
        margin-top: 44px;
        text-align: center;
        line-height: 37px;
        color: #FF0000;
        font-size: 25px;
        font-weight: 500;
        width: 450px;
        height: 37px;
    }
}
`
const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
input {
    margin-right: 21px;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ .checkmark {
    background-color: #F39621;
  }
  &:checked ~ .checkmark:after {
    display: block;
  }
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
  background-color: #eee;
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
}

&:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
`
class SignUpModal extends Component {
    state = { term_use: false, checked: false }
    agree = () => {
        this.setState({ checked: true })
    }
    sign = () => {
        let success = true
        this.props.signin(success)
    }
    onClose = () => { this.props.close() }
    render() {
        const { open } = this.props
        return (
            <CustomModal open={open} onClose={this.onClose}>
                <Modal.Content>
                    <div className="title">OPEN SOURCE DESIGN, OPEN DESIGN</div>
                    <form style={{ marginTop: "49px", marginLeft: "225px" }} onSubmit={this.signin}>
                        <div style={{
                            marginLeft: "0px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                            textAlign: "left", width: "56px", height: "29px"
                        }}>아이디</div>
                        <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                            <input style={{
                                outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070",
                                fontSize: "20px", fontWeight: "300", backgroundColor: "#EFEFEF"
                            }} placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." /></div>
                        <div style={{
                            marginTop: "53px", marginLeft: "7px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                            textAlign: "left", width: "74px", height: "29px"
                        }}>비밀번호</div>
                        <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                            <input style={{
                                outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px",
                                fontWeight: "300", backgroundColor: "#EFEFEF"
                            }} placeholder="비밀번호를 입력하세요." /></div>
                        <div style={{
                            marginTop: "16px", marginLeft: "7px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                            textAlign: "left", width: "115px", height: "29px"
                        }}>비밀번호 확인</div>
                        <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                            <input style={{
                                outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px",
                                fontWeight: "300", backgroundColor: "#EFEFEF"
                            }} placeholder="비밀번호를 입력하세요." /></div>
                        <div style={{
                            marginTop: "64px", marginLeft: "7px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                            textAlign: "left", width: "115px", height: "29px"
                        }}>닉네임</div>
                        <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                            <input style={{
                                outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px",
                                fontWeight: "300", backgroundColor: "#EFEFEF"
                            }} placeholder="" /></div>
                        <div style={{
                            marginTop: "64px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                            textAlign: "left", width: "115px", height: "29px"
                        }}>이용약관</div>
                        <div style={{ marginTop: "16px", width: "708px", height: "28px", padding: "0px", display: "flex" }}>
                            <CheckboxContainer >이용약관에 동의하시나요?<input type="checkbox" checked={this.state.checked} /><span className="checkmark" /></CheckboxContainer>
                            <div style={{ marginLeft: "21px", color: "#707070", fontSize: "17px", fontWeight: "300" }} onClick={this.agree}>이용약관 보기</div></div>
                        <div style={{
                            marginLeft: "653px", width: "74px", height: "29px", borderBottom: "1.5px solid red", cursor: "pointer",
                            color: "#FF0000", fontWeight: "500", fontSize: "20px", lineHeight: "29px", textAlign: "left"
                        }} onClick={this.sign}>회원가입</div>
                    </form>
                </Modal.Content>
            </CustomModal >
        )
    }
}


class SignUp extends Component {
    state = { is_signed: false, }
    render() {
        return (
            <div>
                {<SignUpModal open={!this.state.is_signed} close={this.closeModal} />}
            </div>
        )
    }
}

export default SignUp


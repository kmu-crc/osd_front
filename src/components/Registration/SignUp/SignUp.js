import React, { Component } from "react";

import { Modal } from "semantic-ui-react";
import styled from "styled-components";
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
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .label-text {
        margin-left: 49px; 
        width: 219px;
        height: 29px;
        font-size: 20px;
        font-weight: 500;
        color: #707070;
    }
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ .checkmark {
            background-color: #FF0000;
            border: 0.5px solid #EFEFEF;
        }
        &:checked ~ .checkmark:after {
            display: block;
        }
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 29px;
        width: 28px;
        background-color: #FFFFFF;
        box-shadow: inset 0px 0px 0px 0.5px #707070;
        &:after {
            content: "";
            position: absolute;
            display: none;
        }
    }
    &:hover input ~ .checkmark {
    }
    `
// background-color: #EFEFEF;
// box-shadow: inset 0px 0px 0px 0.5px #707070;

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            term_use: false, checked: false, open_term: false, success_signup: false,
            email: "", password: "", password2: "", nick_name: ""
        }
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangePassCheck = this.onChangePassCheck.bind(this);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChecked = this.onChecked.bind(this);
    }
    onChangeId(event) {
        this.setState({ email: event.target.value })
    }
    onChangePass(event) {
        this.setState({ password: event.target.value })
    }
    onChangePassCheck(event) {
        this.setState({ password2: event.target.value })
    }
    onChangeNickname(event) {
        this.setState({ nick_name: event.target.value })
    }
    onChecked(event)
    {
        this.setState({checked:!this.state.checked,open_term:false});
    }
    openterm = () => {
        this.setState({ open_term: true })
    }
    agree = () => {
        
        document.getElementById("agree").checked=true;
        this.setState({ open_term: false, checked: true })
    }
    sign = () => {
        // let success = true
        // this.props.signin(success)
        this.setState({ success_signup: true })
    }
    onClose = () => {
        window.history.go(-1)
        // this.props.close() 
    }
    tmp_goto_mydetail = () => {

    }
    async checkEmail()
    {
        const data = {email:this.state.email}
        let returnvalue = true;
        await this.props.CheckEmailRequest(data).then(
            (res)=>{
                console.log(res, data);
                if(res.checkEmail===false)
                {                   
                    returnvalue = false;
                }
            }
        );
        console.log("qwer",returnvalue);
        return returnvalue;
    }

    async checkNickname()
    {
        const data = {nick_name:this.state.nick_name}
        let returnvalue = true;
        await this.props.CheckEmailRequest(data).then(
            (res)=>{
                console.log(res, data);
                if(res.checkNickName===false)
                {                   
                    returnvalue = false;
                }
            }
        );
        console.log("qwer",returnvalue);
        return returnvalue;
    }
    onSubmit = async e => {
        
        e.preventDefault();
        let formData = { email: this.state.email, password: this.state.password, nick_name: this.state.nick_name };
        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;


        if(checkedMail.test(this.state.email)===false)
        {
            alert("이메일 형식이 올바르지 않습니다");
            return;
        }        
        else if(this.state.password !== this.state.password2)
        {
            alert("패스워드가 일치하지 않습니다");
            return;
        }
        else if(this.state.nick_name==null)
        {
            alert("닉네임을 입력해주세요!")
            return;
        }
        else if(this.state.checked === false)
        {
            alert("이용약관에 동의해주세요")
            return;
        }
        //닉네임 중복 체크
        if(await this.checkEmail()===false)
        {      
            alert("중복된 이메일입니다");      
            return;
        }
        if(await this.checkNickname()===false)
        {
            alert("중복된 닉네임입니다");
            return;
        }

        await this.setState({ loading: true });
        console.log("signupformdata", formData);
        this.props.SignUpRequest(formData)
            .then(res => {
                console.log(res);
                if (res) {
                    alert("회원 가입 되었습니다.");
                    this.setState({ success_signup: true ,loading:true});  
                    let href = window.location.href.substring(0, window.location.href.search("signup"))       
                    setTimeout(() => {
                        this.props.history.push(`/`);
                        window.location.href = href + 'insertUserDetail'
                    }, 2000);
         

                } else {
                    console.log("this!");
                    alert("다시 시도해주세요");
                    this.setState({
                        loading: false
                    });
                }
            })
            .catch(e => {
                console.log("실패", e);
                alert("다시 시도해주세요");
                this.setState({
                    loading: false
                });
            });
    };

    render() {
        const { open } = this.props

        
        //window.location.href = href + 'insertUserDetail'
        return (
            <>

                {this.state.success_signup ?(
                    <CustomModal open={this.state.success_signup} onClose={this.onClose} onClick={this.tmp_goto_mydetail}>
                        <div style={{ marginLeft: "54px", display: "flex" }}>
                            <div style={{ width: "259px", marginTop: "170px" }}><div style={{ marginTop: "14px", borderBottom: "2px solid red" }} /></div>
                            <div style={{ marginLeft: "46px", marginRight: "51px", marginTop: "158px" }}><div style={{ textAlign: "center", color: "red", fontSize: "27px", lineHeight: "45px", fontWeight: "700" }}>CONGRATULATIONS ON SIGNING UP!<br />회원 가입을 진심으로 축하드립니다!</div></div>
                            <div style={{ width: "259px", marginTop: "170px" }}><div style={{ marginTop: "14px", borderBottom: "2px solid red" }} /></div>
                        </div>
                        <div style={{ marginTop: "56px" }}><div style={{ color: "red", fontFamily: "Noto Sans KR", fontWeight: "500", fontSize: "20px", textAlign: "center", lineHeight: "29px" }}>오직 한 단계밖에 남지 않았습니다!</div></div>
                        <div style={{ marginTop: "205px" }}>
                            <div style={{
                                color: "#707070", fontFamily: "Noto Sans KR", fontWeight: "500",
                                fontSize: "20px", textAlign: "center", lineHeight: "45px"
                            }}>
                                더 편한 이용을 위해 회원님의 프로필을 더 작성해주세요!<br /> 마이페이지로 이동합니다<br /><br /><br /><br /> 이동 중...</div></div>

                    </CustomModal>)
                    
                    : 
                    
                    (
                        <CustomModal open={open} onClose={this.onClose}>
                            {this.state.open_term &&
                                <div style={{  position: "absolute", top: "0px", left: "850px", width: "542px", height: "900px", backgroundColor: "white" }}>
                                    <div style={{ marginTop: "44px", marginLeft: "46px", width: "450px", height: "754px", fontFamily: "Noto Sans KR", fontWeight: "300", fontSize: "20px", lineHeight: "35px", textAlign: "left", color: "#707070" }}>
                                        [차례]<br />
                                        제1장<br />
                                        총칙 제1조 목적 제2조 용어의 정의 제3조 약관의 명시, 효력 및 개정 제4조 관련법령과의 관계<br />
                                        제2장<br />
                                        이용계약 체결 제5조 회원가입 및 이용 계약의 성립 제6조 이용 신청의 승낙과 제한 제7조 개인정보의 보호 및 사용 제8조 회원 ID 부여 및 관리 제9조 회원정보의 변경 제10조 회원의 ID 및 비밀번호 관리의무 제11조 회원에 대한 통지<br />
                                        제3장<br />
                                        계약 당사자의 의무 제12조 회사의 의무 제13조 회원의 의무 제4장 서비스의 이용 제14조 서비스 제공 제15조 서비스의 변경 제16조 정보의 제공 및 광고의 게재 제17조 게시물의 관리 제18조 게시물의 저작권 제19조 권리의 귀속 제20조 계약 해지 제21조 서비스 이용제한 또는 중지 및 회원 탈퇴 제22조 손해배상 제23조 책임제한 제24조 재판권 및 준거법<br />
                                    </div>
                                    <div style={{
                                        width: "115px", height: "29px", marginTop: "25px", marginLeft: "381px", borderBottom: "1.5px solid red", cursor: "pointer",
                                        color: "#FF0000", fontWeight: "500", fontSize: "20px", lineHeight: "35px", textAlign: "left"
                                    }} onClick={this.agree}>동의하고 닫기</div>
                                </div>}
                            <Modal.Content >
                                <div className="title">OPEN SOURCE DESIGN</div>
                                <form style={{ marginTop: "49px", marginLeft: "225px" }} >
                                    <div style={{
                                        marginLeft: "0px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                                        textAlign: "left", width: "56px", height: "29px"
                                    }}>아이디</div>
                                    <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                                        <input onChange={this.onChangeId} style={{
                                            outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070",
                                            fontSize: "20px", fontWeight: "300", backgroundColor: "#EFEFEF"
                                        }} placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." /></div>
                                    <div style={{
                                        marginTop: "53px", marginLeft: "7px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                                        textAlign: "left", width: "74px", height: "29px"
                                    }}>비밀번호</div>
                                    <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                                        <input type="password" onChange={this.onChangePass} style={{
                                            outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px",
                                            fontWeight: "300", backgroundColor: "#EFEFEF"
                                        }} placeholder="비밀번호를 입력하세요." /></div>
                                    <div style={{
                                        marginTop: "16px", marginLeft: "7px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                                        textAlign: "left", width: "115px", height: "29px"
                                    }}>비밀번호 확인</div>
                                    <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                                        <input type="password" onChange={this.onChangePassCheck} style={{
                                            outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px",
                                            fontWeight: "300", backgroundColor: "#EFEFEF"
                                        }} placeholder="비밀번호를 입력하세요." /></div>
                                    <div style={{
                                        marginTop: "64px", marginLeft: "7px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                                        textAlign: "left", width: "115px", height: "29px"
                                    }}>닉네임</div>
                                    <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                                        <input onChange={this.onChangeNickname} style={{
                                            outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px",
                                            fontWeight: "300", backgroundColor: "#EFEFEF"
                                        }} placeholder="" /></div>
                                    <div style={{
                                        marginTop: "64px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px",
                                        textAlign: "left", width: "115px", height: "29px"
                                    }}>이용약관</div>
                                    <div style={{ marginTop: "16px", width: "708px", height: "29px", padding: "0px", display: "flex" }}>
                                        <CheckboxContainer><div className="label-text">이용약관에 동의하시나요?</div>
                                        {console.log(this.state.checked)}
                                        <input id="agree" style={{background: this.state.checked===true?"#FF0000  0% 0% no-repeat padding-box":"#FFFFFF 0% 0% no-repeat padding-box"}}onClick={this.onChecked} type="checkbox" value={this.state.checked} />
                                        <span className="checkmark" />
                                        </CheckboxContainer>
                                        <div style={{cursor:"pointer", marginLeft: "21px", marginTop: "3px", color: "#707070", fontSize: "17px", fontWeight: "300" }} onClick={this.openterm}>이용약관 보기</div>
                                        </div>
                                    <div style={{
                                        marginLeft: "634px", width: "74px", height: "29px", borderBottom: "1.5px solid red", cursor: "pointer",
                                        color: "#FF0000", fontWeight: "500", fontSize: "20px", lineHeight: "29px", textAlign: "left"
                                    }} onClick={this.onSubmit}>회원가입</div>
                                </form>
                            </Modal.Content>
                        </CustomModal >
                    )}

                    
            </>
        )
    }
}


class SignUp extends Component {
    state = { is_signed: false, }
    render() {
        return (
            <>
                {<SignUpModal {...this.props} open={!this.state.is_signed} close={this.closeModal} />}
            </>
        )
    }
}

export default SignUp
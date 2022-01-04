import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import iChecked from "source/checked.png"
import CheckBox2 from "components/Commons/CheckBox";
import opendesign_style from "opendesign_style";
import new_logo_warning_big from "source/new_logo_warning_big.svg";
import new_logo_question from "source/new_logo_question.png";
import SearchForm from "components/Header/SearchForm";

const Warning_Ani1 = keyframes`
  0% {
    opacity:0;
  }
  25% {
    opacity:1;
  }
  50% {
    opacity:0;
  }
  75% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
`;
const Warning_Ani2 = keyframes`
  0% {
    opacity:0;
  }
  25% {
    opacity:1;
  }
  50% {
    opacity:0;
  }
  75% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
`;
const Warning_Ani3 = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:0;
  }
`;
const Wrapper = styled.div`
    width:100%;
    height:100%;
    // background: #000000A1 0% 0% no-repeat padding-box;
    // z-index:890;
    display: flex;
    // align-items: center;
    // justify-content: center;
    flex-direction: column;
    // position: absolute;
    .search {
        margin-top: 9px;
        display: flex;
        justify-content: center;
    }
`;
const JoinCongraWrapper = styled.div`
    top: ${22 + 9}px;
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    background-color: #FFF;
    position: absolute;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;

    // animation-name: ${Warning_Ani3};
    // animation-duration:2s;
    // animation-direction:alternate;
    // animation-fill-mode: forwards;
    // animation-timing-function: ease-out;  
    .inner_wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .header {
        margin: auto;
        margin-top: 22px;
        margin-bottom: 25px;

        width: 276px;
        text-align: center;
        font-weight: medium;
        font-size: 20px;
        line-height: 28px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
    }
    .header2 {
        width: 334px;
        text-align: center;
        font-weight: medium;
        font-size: 20px;
        line-height: 28px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
    }

    .join_logo {
        width: 222px;
        height: 222px;
        background-image: url(${new_logo_question});
        background-size: cover;
        background-repeat: no-repeat;
        margin: auto;
    }

    .gomypage {
        font-size: 27px;
        color: #FFF;
        font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
        font-weight: 500;
    }

    button {
        margin: auto;
        cursor: pointer;
        min-width: 277px;
        width: auto;
        height: 51px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: red;

        &.later {
            border: 1px solid black;
            background-color: #FFF;
            font-size: 27px;
            color: #000;
            font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
            font-weight: 500;
        }
    }

    .marginBottom1{margin-bottom: 14px;}
    .marginBottom2{margin-bottom: 35px;}
    .marginBottom3{margin-bottom: 56px;}
    .marginBottom4{margin-bottom: 10px;}
`;
const TermWrapper = styled.div`
    top: ${22 + 9}px;
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    background-color: #FFF;
    position: absolute;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding: 43px;

    .header_ {
        width: 100%;
        height: 38px;
        text-align: center;
        font-weight: normal;
        font-size: 27px;
        line-height: 38px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
    }
    .term {
        width: 307px;
        text-align: left;
        font-weight: medium;
        font-size: 18px;
        line-height: 32px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
    }
    .row{width:100%;}
    .center{display:flex;justify-content:center;}
    .agree_button{
        width:187px;
        height:51px;
        display:flex;
        justify-content:center;
        align-items:center;
        border: 1px solid #000000;
        font-size:25px;
        cursor:pointer;
    }
    .marginBottom {
        margin-bottom: 31px;
    }
`;
const SignupWrapper = styled.div`
    background-color: white;
 
    .flex-center {
        display: flex;
        justify-content: center;
    }
    .wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        .in_wrapper {
            width: 300px;
        }
    }
    .search {
        margin-top: 9px;
    }
    .header {
        margin-top: 19px;
        margin-bottom: 37px;

        width: 100%;
        height: 39px;
        text-align: center;
        font-family: Noto Sans KR;
        font-size: 27px;
        line-height: 39px;
        font-weight: 500;
    }
    .label {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 5px;
    }
    .warning_text {
        margin-top: 7px;
        height: 11px;
        text-align: left;
        font-weight: medium;
        font-size: 8px;
        line-height: 11px;
        font-family: Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
    }
    .red { color: #F00; }
    .warning_text_ani{
        display:flex;
        width:100%;
        height:11px;
        margin-top:7px;
        font-size:8px;
        color:red;
        animation-name: ${Warning_Ani1};
        animation-duration:2s;
        animation-direction:alternate;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;  
    }
    .logo{
        width:51px;
        height:51px;
    }
    .warning_logo{
        position:absolute;
        top:0px;
        width:51px;
        height:51px;
        display:none;
    }
    .warning_logo_ani{
        position:absolute;
        display:block;
        top:0px;
        width:51px;
        height:51px;
        opacity:1;
        animation-name: ${Warning_Ani2};
        animation-duration:2s;
        animation-direction:alternate;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;    
    }
    .row{
        width:100%;
        display:flex;
        align-items:center;
    }
    .row2{
        width:100%;
        height:51px;
        display:flex;
        align-items:center;
    }
    .justityCenter{
        justify-content:center;
    }
    .checkbox_{
        width:30px !important;
        height:30px !important;
        border:1px solid #707070;
        background-color:white !important;
        margin-right:15px;
    }
    .container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        /* -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg); */
      } 
    .join_button{
        width:124px;
        height:51px;
        display:flex;
        justify-content:center;
        align-items:center;
        border: 1px solid #000000;
        font-size:25px;
        cursor:pointer;
    }
    .relative{position:relative;}
    .pointer{cursor:pointer;}
    .font_normal {
        height: 21px;
        text-align: left;
        font-weight: medium;
        font-family: 15px;
        line-height: 21px;
        font-family: Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
    }
    .font_small {
        height: 11px;
        text-align: left;
        font-weight: medium;
        font-size: 8px;
        line-height: 11px;
        font-family: Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
    }
    .marginTop1{margin-top:12px;}
    .marginTop2{margin-top:44px;}
    .marginTop3{margin-top:8px;}
    .marginTop4{margin-top:72px;}
    .marginLeft1{margin-left:28px;}
    .marginLeft2{margin-left:47px;}
`;
const InputText = styled.input`
    width: 300px;
    height: 30px;
    border: none;
    outline: none;
    background-color: #A5A5A5;
    color: white;
    padding: 5px 7px;
    ::placeholder{
        color: white;
    }
`;

export default class SignUpMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            term_use: false,
            checked: false,
            open_term: false,
            success_signup: false,
            email: "",
            password: "",
            password2: "",
            nick_name: "",
            warningType: -1,
            checkedNickname: false,
            error_repeat_nick: false,
            error_repeat_email: false,
            error_not_same_both: false,
        }
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangePassCheck = this.onChangePassCheck.bind(this);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onblurNickname = this.onblurNickname.bind(this);
        this.onblurID = this.onblurID.bind(this);
        this.onblurPassRe = this.onblurPassRe.bind(this);
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
        this.setState({ nick_name: event.target.value });
    }
    async onblurNickname(event) {
        const data = { nick_name: this.state.nick_name }
        if (this.state.nick_name.length == 0) return;
        let returnvalue = true;
        await this.props.CheckNickNameRequest(data).then(
            (res) => {
                console.log(res, data);
                if (res.checkNickName === false) {
                    returnvalue = false;
                }
            }
        );
        this.setState({
            checkedNickname: returnvalue,
            error_repeat_nick: !returnvalue,
        });
    }
    async onblurID(event) {
        const data = { email: this.state.email }
        if (this.state.email.length == 0) return;
        let returnvalue = true;
        await this.props.CheckEmailRequest(data).then(
            (res) => {
                console.log(res, data);
                if (res.checkEmail === false) {
                    returnvalue = false;
                }
            }
        );
        this.setState({
            checkedEmail: returnvalue,
            error_repeat_email: !returnvalue,
        });
    }
    async onblurPass(event) {
        const { password, password2 } = this.state;
        if (password2.length > 0) {
            await this.setState({ error_not_same_both: password !== password2 });
        }
    }
    async onblurPassRe(event) {
        const { password, password2 } = this.state;
        if (password.length > 0) {
            await this.setState({ error_not_same_both: password !== password2 });
        }
    }
    onChecked(event) {
        // !this.state.checked && alert("이용약관을 보시고 동의하셔야 합니다. '이용약관 보기'를 클릭하시기 바랍니다.") && this.setState({ checked: false });
        // this.state.checked && this.setState({ checked: false });
        this.setState({ checked: !this.state.checked, open_term: false });
    }
    openterm = () => {
        this.setState({ open_term: true })
    }
    agree = () => {
        document.getElementById("agree").checked = true;
        this.setState({ open_term: false, checked: true })
    }
    sign = () => {
        this.setState({ success_signup: true })
    }
    onClose = () => {
        window.location.href = "/";
    }
    tmp_goto_mydetail = () => {
        window.location.href = '/insertUserDetail'
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
        //console.log("qwer", returnvalue);
        return returnvalue;
    }

    async checkNickname() {
        const data = { nick_name: this.state.nick_name }
        let returnvalue = true;
        await this.props.CheckNickNameRequest(data).then(
            (res) => {
                console.log(res, data);
                if (res.checkNickName === false) {
                    returnvalue = false;
                }
            }
        );
        //console.log("qwer", returnvalue);
        return returnvalue;
    }
    onBack() {
        window.history.go(-1);
    }

    onSubmit = async e => {

        e.preventDefault();

        let warningMsg1 = document.getElementById("warning_nickname");
        let warningMsg2 = document.getElementById("warning_id");
        let warningMsg3 = document.getElementById("warning_password");
        let warningMsg4 = document.getElementById("warning_agree");
        let warningLogo = document.getElementById("warning_logo_big");

        let formData = { email: this.state.email, password: this.state.password, nick_name: this.state.nick_name };
        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (checkedMail.test(this.state.email) === false) {
            await this.setState({ warningType: 3 });
            // await alert("이메일 형식이 올바르지 않습니다","확인");

            warningMsg2.className = "warning_text_ani";
            warningLogo.className = "warning_logo_ani";
            setTimeout(() => {
                warningMsg2.className = "warning_text";
                warningLogo.className = "warning_logo";
                this.setState({ warningType: -1 })
            }, 2000);
            return;
        }
        else if (this.state.password === "") {
            await this.setState({ warningType: 5 });
            // await alert("패스워드를 입력해주세요!","확인");
            warningMsg3.className = "warning_text_ani";
            warningLogo.className = "warning_logo_ani";

            setTimeout(() => {
                warningMsg3.className = "warning_text";
                warningLogo.className = "warning_logo";
                this.setState({ warningType: -1 })
            }, 1000);
            return;
        }
        else if (this.state.password !== this.state.password2) {
            await this.setState({ warningType: 6 });
            // await alert("패스워드가 일치하지 않습니다","확인");
            warningMsg3.className = "warning_text_ani";
            warningLogo.className = "warning_logo_ani";

            setTimeout(() => {
                warningMsg3.className = "warning_text";
                warningLogo.className = "warning_logo";
                this.setState({ warningType: -1 })
            }, 1000);
            return;
        }
        else if (this.state.nick_name === "") {
            await this.setState({ warningType: 2 });
            // await alert("닉네임을 입력해주세요!","확인")
            warningMsg1.className = "warning_text_ani";
            warningLogo.className = "warning_logo_ani";

            setTimeout(() => {
                warningMsg1.className = "warning_text";
                warningLogo.className = "warning_logo";
                this.setState({ warningType: -1 })
            }, 1000);
            return;
        }
        else if (this.state.checked === false) {
            await this.setState({ warningType: 7 });
            // await alert("이용약관에 동의해주세요","확인")
            warningMsg4.className = "warning_text_ani";
            warningLogo.className = "warning_logo_ani";

            setTimeout(() => {
                warningMsg4.className = "warning_text";
                warningLogo.className = "warning_logo";
                this.setState({ warningType: -1 })
            }, 1000);
            return;
        }
        //닉네임 중복 체크
        if (await this.checkEmail() === false) {
            await this.setState({ warningType: 4 });
            // await alert("중복된 이메일입니다","확인");
            warningMsg2.className = "warning_text_ani";
            warningLogo.className = "warning_logo_ani";

            setTimeout(() => {
                warningMsg2.className = "warning_text";
                warningLogo.className = "warning_logo";
                this.setState({ warningType: -1 })
            }, 1000);
            return;
        }
        if (await this.checkNickname() === false) {
            await this.setState({ warningType: 1 });
            // await alert("중복된 닉네임입니다","확인");
            warningMsg1.className = "warning_text_ani";
            warningLogo.className = "warning_logo_ani";

            setTimeout(() => {
                warningMsg1.className = "warning_text";
                warningLogo.className = "warning_logo";
                this.setState({ warningType: -1 })
            }, 1000);
            return;
        }

        await this.setState({ loading: true });
        //console.log("signupformdata", formData);
        this.props.SignUpRequest(formData)
            .then(async res => {
                console.log(res);
                if (res) {
                    await alert("회원 가입 되었습니다.", "확인");
                    window.scrollTo(0, 0);
                    this.setState({ success_signup: true, loading: true });
                    let href = window.location.href.substring(0, window.location.href.search("signup"))
                    // setTimeout(() => {
                    //     this.props.history.push(`/`);
                    //     window.location.href = href + 'insertUserDetail'
                    // }, 2000);
                } else {
                    //console.log("this!");
                    await alert("다시 시도해주세요", "확인");
                    this.setState({
                        loading: false
                    });
                }
            })
            .catch(e => {
                //console.log("실패", e);
                alert("다시 시도해주세요");
                this.setState({
                    loading: false
                });
            });
    };

    render() {
        const { open_term, success_signup } = this.state;

        return (<Wrapper>
            <div className="search flex-center">
                <SearchForm formWidth={199} visible={1} transparent={false} />
            </div>
            {open_term
                ? <TermWrapper>
                    <div className="header_ marginBottom">이용약관</div>
                    <div className="row center">
                        <div className="term marginBottom">
                            [차례]
                            <br /><br />제1장<br /> 총칙 제1조 목적 제2조 용어의 정의 제3조 약관의 명시, 효력 및 개정 제4조 관련법령과의 관계
                            <br /><br />제2장<br /> 이용계약 체결 제5조 회원가입 및 이용 계약의 성립 제6조 이용 신청의 승낙과 제한 제7조 개인정보의 보호 및 사용 제8조 회원 ID 부여 및 관리 제9조 회원정보의 변경 제10조 회원의 ID 및 비밀번호 관리의무 제11조 회원에 대한 통지
                            <br /><br />제3장<br /> 계약 당사자의 의무 제12조 회사의 의무 제13조 회원의 의무
                            <br /><br />제4장<br /> 서비스의 이용 제14조 서비스 제공 제15조 서비스의 변경 제16조 정보의 제공 및 광고의 게재 제17조 게시물의 관리 제18조 게시물의 저작권 제19조 권리의 귀속 제20조 계약 해지 제21조 서비스 이용제한 또는 중지 및 회원 탈퇴 제22조 손해배상 제23조 책임제한 제24조 재판권 및 준거법
                        </div>
                    </div>
                    <div className="row center">
                        <div onClick={this.agree} className="agree_button">동의 후 닫기</div>
                    </div>
                </TermWrapper>
                : null}

            {success_signup
                ? <JoinCongraWrapper>
                    <div className="inner-wrapper" >
                        <div className="header marginBottom2">
                            {this.state.nick_name}님의 회원가입을 축하합니다!</div>
                        <div className="join_logo marginBottom1" />
                        <div className="header2 marginBottom3">
                            {this.state.nick_name}님은 어떤 분이신가요?<br />
                            마이페이지에서 프로필을 완성해 주세요!</div>
                        <button className="gomypage marginBottom4" onClick={this.tmp_goto_mydetail}>마이 페이지 이동하기</button>
                        <button className="later" onClick={this.onClose}>아니요, 다음에 할게요</button>
                    </div>
                </JoinCongraWrapper>
                : null}

            <SignupWrapper>
                <div className="wrapper">
                    <div className="in_wrapper">
                        <div className="header">반갑습니다!</div>

                        <div className="label">
                            <div className="font_normal">닉네임</div>
                            <div className="font_small">* 닉네임은 아이디가 아닙니다</div>
                        </div>
                        <InputText placeholder="닉네임을 입력하세요." onBlur={this.onblurNickname} onChange={this.onChangeNickname} />
                        <div id="warning_nickname" className={`${this.state.error_repeat_nick ? "red" : ""} warning_text`}>&nbsp;
                            {this.state.checkedNickname ? "사용 가능한 닉네임 입니다!" : ""}
                            {this.state.error_repeat_nick || this.state.warningType == 1 ? "중복된 닉네임입니다" : " "}
                            {this.state.warningType == 2 ? "닉네임을 입력해주세요" : " "}
                        </div>

                        <div className="label marginTop1">
                            <div className="font_normal">아이디</div>
                        </div>
                        <InputText placeholder="아이디(이메일주소)를 입력하세요." onBlur={this.onblurID} onChange={this.onChangeId} />
                        <div id="warning_id" className={`${this.state.error_repeat_email ? "red" : ""} warning_text`}>&nbsp;
                            {this.state.checkedEmail ? "사용 가능한 아이디(이메일주소)입니다!" : ""}
                            {this.state.warningType == 3 ? "이메일 형식이 올바르지 않습니다" : " "}
                            {this.state.error_repeat_email || this.state.warningType == 4 ? "중복된 이메일입니다" : " "}
                        </div>

                        <div className="label marginTop2">
                            <div className="font_normal">비밀번호</div>
                        </div>
                        <InputText type="password" placeholder="비밀번호를 입력하세요." onBlur={this.onblurPassRe} onChange={this.onChangePass} />

                        <div className="label marginTop1">
                            <div className="font_normal">비밀번호 확인</div>
                        </div>
                        <InputText type="password" placeholder="비밀번호를 입력하세요." onBlur={this.onblurPassRe} onChange={this.onChangePassCheck} />
                        <div id="warning_password" className={`${this.state.error_not_same_both ? "red" : ""} warning_text`}>&nbsp;
                            {this.state.warningType == 5 ? "패스워드를 입력해주세요!" : " "}
                            {this.state.error_not_same_both || this.state.warningType == 6 ? "패스워드가 일치하지 않습니다" : " "}
                        </div>
                        <div className="row marginTop3">
                            <label className="coontainer">
                            <input type="checkbox" className="checkbox_" id="agree" onChange={this.onChecked} checked={this.state.checked} value={this.state.checked} />
                            </label>
                            <div className="font_normal">이용약관에 동의해 주세요!</div>
                            <div className="font_small marginLeft1 pointer" onClick={this.openterm}>이용약관 보기</div>
                        </div>
                        <div id="warning_agree" className="warning_text marginLeft2">&nbsp;
                            {this.state.warningType == 7 ? "이용약관에 동의해주세요" : null}
                        </div>
                        <div className="row2 justityCenter marginTop4 relative">

                            <div className="join_button" onClick={this.onSubmit}>회원가입</div>
                            <div id="warning_logo_big" className="warning_logo">
                                <img src={new_logo_warning_big} className="logo" />
                            </div>

                        </div>
                    </div>
                </div>
            </SignupWrapper>

        </Wrapper>);
    }
};

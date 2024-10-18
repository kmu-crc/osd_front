import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
import iChecked from "source/checked.png"
import CheckBox2 from "components/Commons/CheckBox";
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import new_logo_warning_big from "source/new_logo_warning_big.svg";
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
    background: #000000A1 0% 0% no-repeat padding-box;
    display:flex;
    position:absolute;
    z-index:890;
    align-items:center;
    justify-content:center;
`
const Term = styled.div`
    width:100%;
    height:100%;
    // background: #000000A1 0% 0% no-repeat padding-box;
    display:flex;
    position:absolute;
    z-index:900;
    align-items:center;
    justify-content:center;
`
const JoinCongra = styled.div`
    width:100%;
    height:100%;
    background: #000000A1 0% 0% no-repeat padding-box;
    display:flex;
    position:absolute;
    z-index:890;
    align-items:center;
    justify-content:center;

    // animation-name: ${Warning_Ani3};
    // animation-duration:2s;
    // animation-direction:alternate;
    // animation-fill-mode: forwards;
    // animation-timing-function: ease-out;  
`
const Join_Modal = styled(Modal)`
    width:764px;
    height:764px;
    background-color:white;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:57px;
    .header{
        font-size:27px
        font-family:Noto Sans KR;
    }
    .join_logo{
        width:222px;
        height:222px;
        border-radius:50%;
        border:1px solid black;
        font-family:Righteous;
        font-weight:500;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:187px;
        padding-top:30px;
    }
    .button{
        width:271px;
        height:51px;
        display:flex;
        justify-content:center;
        align-items:center;
        border: 1px solid #000000;
        font-size:25px;
        cursor:pointer;

    }
    .marginBottom1{margin-bottom:31px;}
    .marginBottom2{margin-bottom:35px;}
    .marginBottom3{margin-bottom:17px;}
    .marginBottom4{margin-bottom:50px;}
`
const Term_Modal = styled(Modal)`
    width:764px !important;
    height:764px !important;
    max-width:764px !important;
    max-height:764px !important;
    background-color:white;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:43px;
    .header_{
        width:100%;
        text-align:center;
        font-family:Spoqa Han Sans Neo;
        font-size:27px;
        
    }
    .term{
        width:532px;
        height:532px;
        overflow-y:auto;
        font-family:Spoqa Han Sans Neo;
        font-size:17px;
        line-height:30px;
        padding:0px 61px;
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
    .marginBottom{margin-bottom:31px;}
`
const Signup_Modal = styled(Modal)`
    width:764px !important;
    height:764px !important;
    max-width:764px !important;
    max-height:764px !important;
    background-color:white;
    
    padding:59px;
    .wrapper{
        width:100%;
        display:flexl
        justify-content:center;
        .in_wrapper{
            width:300px;
        }
    }
    .header{
        width:100%;
        text-align:center;
        font-family:Noto Sans KR,Noto Sans KR;
        font-size:27px;
        margin-bottom:40px;
    }
    .label{
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:flex-end;
        margin-bottom:5px;
    }
    .warning_text{
        width:100%;
        height:11px;
        margin-top:7px;
        font-size:8px;
        // opacity:0;
    }
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
    .checkbox{
        width:30px !important;
        height:30px !important;
        border:1px solid #707070;
        background-color:white;
        margin-right:15px;
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
    .font_normal{font-size:15px;}
    .font_small{font-size:8px;}
    .marginTop1{margin-top:12px;}
    .marginTop2{margin-top:44px;}
    .marginTop3{margin-top:8px;}
    .marginTop4{margin-top:72px;}
    .marginLeft1{margin-left:28px;}
    .marginLeft2{margin-left:47px;}
    `
const InputText = styled.input`
    width:100%;
    height:30px;
    border:none;
    outline:none;
    background-color:#A5A5A5;
    color:white;
    padding:5px 7px;
    ::placeholder{
        color:white;
    }
`

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            term_use: false, checked: false, open_term: false, success_signup: false,
            email: "", password: "", password2: "", nick_name: "",
            warningType: -1,
        }
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangePassCheck = this.onChangePassCheck.bind(this);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onblurNickname = this.onblurNickname.bind(this);
        this.onblurID = this.onblurID.bind(this);
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
        let returnvalue = true;
        await this.props.CheckNickNameRequest(data).then(
            (res) => {
                console.log(res, data);
                if (res.checkNickName === false) {
                    returnvalue = false;
                }
            }
        );
        this.setState({ checkedNickname: returnvalue });
    }
    async onblurID(event) {
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
        this.setState({ checkedEmail: returnvalue });
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
        window.history.go(-1)
        // this.props.close() 
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
        const { open } = this.props
        return (
            <React.Fragment>



                {this.state.success_signup ?
                    <JoinCongra>
                        <Join_Modal open={true} >
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <div className="header marginBottom2">회원가입을 축하합니다!</div>
                                <div className="join_logo marginBottom1">?</div>
                                <div className="header marginBottom3">어떤 분이신가요?</div>
                                <div className="header marginBottom4">마이페이지에서 프로필을 완성해 주세요!</div>
                                <div className="button marginBottom4" onClick={this.tmp_goto_mydetail}>내 프로필 완성하기</div>
                                {/* <div className="button" onClick={this.onClose}>아니요. 다음에 할게요</div> */}
                            </div>
                        </Join_Modal>
                    </JoinCongra>
                    :
                    <React.Fragment>

                        <Wrapper>
                            <Signup_Modal open={true}>
                                <div className="wrapper">
                                    <div className="in_wrapper">
                                        <div className="header">반갑습니다!</div>

                                        <div className="label">
                                            <div className="font_normal">닉네임</div>
                                            <div className="font_small">* 닉네임은 아이디가 아닙니다</div>
                                        </div>
                                        <InputText placeholder="닉네임을 입력하세요." /*onBlur={this.onblurNickname}*/ onChange={this.onChangeNickname} />
                                        <div id="warning_nickname" className="warning_text">&nbsp;
                                            {this.state.warningType == 1 ? "중복된 닉네임입니다" : " "}
                                            {this.state.warningType == 2 ? "닉네임을 입력해주세요" : " "}
                                        </div>

                                        <div className="label marginTop1">
                                            <div className="font_normal">아이디</div>
                                        </div>
                                        <InputText placeholder="아이디(이메일주소)를 입력하세요." /*onBlur={this.onblurID}*/ onChange={this.onChangeId} />
                                        <div id="warning_id" className="warning_text">&nbsp;
                                            {this.state.warningType == 3 ? "이메일 형식이 올바르지 않습니다" : " "}
                                            {this.state.warningType == 4 ? "중복된 이메일입니다" : " "}
                                        </div>

                                        <div className="label marginTop2">
                                            <div className="font_normal">비밀번호</div>
                                        </div>
                                        <InputText type="password" placeholder="비밀번호를 입력하세요." onChange={this.onChangePass} />

                                        <div className="label marginTop1">
                                            <div className="font_normal">비밀번호 확인</div>
                                        </div>
                                        <InputText type="password" placeholder="비밀번호를 입력하세요." onChange={this.onChangePassCheck} />
                                        <div id="warning_password" className="warning_text">&nbsp;
                                            {this.state.warningType == 5 ? "패스워드를 입력해주세요!" : " "}
                                            {this.state.warningType == 6 ? "패스워드가 일치하지 않습니다" : " "}                            </div>
                                        <div className="row marginTop3">
                                            <input type="checkbox" className="checkbox" id="agree" onChange={this.onChecked} checked={this.state.checked} value={this.state.checked} />
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
                            </Signup_Modal>
                        </Wrapper>
                    </React.Fragment>
                }
                {
                    this.state.open_term == true ?
                        <Term>
                            <Term_Modal open={this.state.open_term}>
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
                            </Term_Modal>
                        </Term>
                        :
                        null
                }
            </React.Fragment>)
    }
}


class SignUp extends Component {
    state = { is_signed: false, }
    render() {
        return (
            <React.Fragment>
                {<SignUpModal {...this.props} open={!this.state.is_signed} close={this.closeModal} />}
            </React.Fragment>
        )
    }
}

export default SignUp

// const CustomModal = styled(Modal)`
//     min-width: 1200px;
//     height: 900px;
//     border-radius: 35px; 
//     font-family: Noto Sans KR;
//     .title {
//         padding: 0 0;
//         margin: 0 auto;
//         margin-top: 44px;
//         text-align: center;
//         line-height: 37px;
//         color: #FF0000;
//         font-size: 25px;
//         font-weight: 500;
//         width: 450px;
//         height: 37px;
//     }
//     .success_signup_Box{
//         margin-left:54px;
//         display:flex;
//     }
//     .Decoline{
//         width:259px;
//         margin-top:174px;
//         border-bottom:2px solid red;
//     }
//     .TextBox{
//         margin-left:46px;
//         margin-right:51px;
//         margin-top:158px;
//     }
//     .HeaderText{
//         font-size:27px;
//         font-weight:700;
//         color:red;
//         line-height:45px;
//         text-align:center;
//     }
//     .subText{
//         margin-top:56px;
//         font-size:20px;
//         font-weight:500;
//         font-family:Noto Sans KR;
//         color:red;
//         line-height:29px;
//         text-align:center;
//     }
//     .guideText{
//         margin-top:205px;
//         color:#707070;
//         font-size:20px;
//         font-weight:500;
//         font-family:Noto Sans KR;
//         text-align:center;
//         line-height:45px
//     }
//     .termBox{
//         width:542px;
//         height:900px;
//         position:absolute;
//         left:880px;
//         top:0px;
//         background-color:white;
//     }
//     .relativeBox{
//         width:100%;
//         height:100%;
//         position:relative;
//     }
//     .termText{
//         width:450px;
//         height:754px;
//         margin-top:44px;
//         margin-left:46px;
//         font-size:20px;
//         font-weight:300;
//         font-family:Noto Sans KR;
//         color:#707070
//         line-height:35px;
//         text-align:left;
//     }
//     .termOKBtn{
//         position:absolute;
//         right:35px;
//         bottom:140px;
//         font-size:20px;
//         font-weight:500;
//         font-family:Noto Sans KR;
//         color:#707070;
//         cursor:pointer;
//     }

// }
// @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
// and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//     min-width:100%;
//     .termBox{
//         width:100%;
//         left:0px;
//     }
//     .termText{
//         width:90%;
//     }
// }
// @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
// and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//     min-width:100%;
//     margin:0px;

//     .termBox{
//         width:100%; 
//         margin:0px;
//         z-index:900;
//         left:0px;
//     }
//     .termText{
//         margin:10px;
//         width:95%;
//         height:max-content;
//     }
//     .title{
//         width:100%;
//     }
// }

// `
// const SignUPBox = styled.form`
//     width:64%;
//     margin-top:49px;
//     margin-left:18%;
//     .itemBox{
//         margin-top:30px;
//         .normalBox{
//             display:flex;   
//             flex-wrap:wrap;
//             margin-top:16px;
//         }
//         .normalText{
//             margin-left:40px;
//             margin-top:3px;
//             font-size:17px;
//             font-weight:300;
//             color:#707070;
//             cursor:pointer;
//         }
//         .redBoldText{
//             margin-left:15px;
//             font-size:20px;
//             font-weight:500;
//             color:#FF0000;
//             line-height:29px;
//             text-align:left;
//             cursor:pointer;
//             text-decoration:underline;
//         }
//         .blackBoldText{            
//             margin-left:15px;
//             font-size:20px;
//             font-weight:500;
//             color:#707070;
//             line-height:29px;
//             text-align:left;
//             cursor:pointer;
//         }
//     }
//     .subItemBox{
//         display:flex;
//         margin-top:65px;
//         height:29px;
//     }
//     .titleLabel{
//         width:300px;
//         height:29px;
//         margin-left:0px;
//         font-size:20px;
//         font-weight:500;
//         color:#707070;
//         line-height:29px;
//         text-align:left;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//         min-width:100%;
//         padding:10px !important;
//         margin:0px;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//         min-width:100%;
//         height:max-content;
//         padding:10px !important;
//         margin:0px;
//         .title{
//             width:100%;
//         }
//         .termOkBtn{
//             bottom:0px;
//         }
//     }

// `
// const InputText = styled.input.attrs({ type: 'text' })`
//     width:100%;
//     height:48px;
//     margin-top:16px;
//     padding-left:20px;
//     font-size:20px;
//     font-weight:300;
//     color:#707070;
//     background-color:#EFEFEF;
//     outline:none;
//     border:none;
//     border-radius:15px;
//     @media only screen and (min-width : 780px) and (max-width:1440px) {
//         width:100%;
//     }
//     @media only screen and (min-width : 360px) and (max-width:780px) {
//         width:100%;
//     }
// `
// const InputPass = styled.input.attrs({ type: 'password' })`
//     width:100%;
//     height:48px;
//     margin-top:16px;
//     padding-left:20px;
//     font-size:20px;
//     font-weight:300;
//     color:#707070;
//     background-color:#EFEFEF;
//     outline:none;
//     border:none;
//     border-radius:15px;
//     @media only screen and (min-width : 780px) and (max-width:1440px) {
//         width:100%;
//     }
//     @media only screen and (min-width : 360px) and (max-width:780px) {
//         width:100%;
//     }
// `
// const CheckboxContainer = styled.label`
//     display: block;
//     align-items: center;
//     position: relative;
//     cursor: pointer;
//     -webkit-user-select: none;
//     -moz-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
//     .label-text {
//         margin-left: 15px; 
//         width: 219px;
//         height: 29px;
//         font-size: 20px;
//         font-weight: 500;
//         color: #707070;
//     }
//     input {
//         position: absolute;
//         opacity: 0;
//         cursor: pointer;
//         height: 0;
//         width: 0;
//         &:checked ~ .checkmark {
//             background:url(${iChecked}); 
//             background-size:contain;
//             background-position:center center;
//             background-repeat:no-repeat;
//             // background-color: #FF0000;
//              border: 0.5px solid #EFEFEF;
//         }
//         &:checked ~ .checkmark:after {
//              display: block;
//         }
//     }
//     .checkmark {
//         position: absolute;
//         top: 0;
//         left: 0;
//         height: 29px;
//         width: 28px;
//         background-color: #FFFFFF;
//         box-shadow: inset 0px 0px 0px 0.5px #707070;
//         &:after {
//             content: "";
//             position: absolute;
//             display: none;
//         }
//     }
//     &:hover input ~ .checkmark {
//     }
// `


{/* <CustomModal open={this.state.success_signup} onClose={this.onClose} onClick={this.tmp_goto_mydetail}>
<div className="success_signup_Box">
    <div className="Decoline" />
    <div className="TextBox">
        <div className="HeaderText">CONGRATULATIONS ON SIGNING UP!<br />회원 가입을 진심으로 축하드립니다!</div>
    </div>
    <div className="Decoline" />
</div>
<div className="subText">오직 한 단계밖에 남지 않았습니다!</div>
<div className="guideText">더 편한 이용을 위해 회원님의 프로필을 더 작성해주세요!<br /> 내 정보로 이동합니다<br /><br /><br /><br /> 이동 중...</div>
</CustomModal> */}


{/* <CustomModal open={open} onClose={this.onClose}>
                        {this.state.open_term &&
                            <div className="termBox">
                                <div className="relativeBox">
                                <div className="termText">
                                    [차례]<br />
                                    제1장<br />
                                    총칙 제1조 목적 제2조 용어의 정의 제3조 약관의 명시, 효력 및 개정 제4조 관련법령과의 관계<br />
                                    제2장<br />
                                    이용계약 체결 제5조 회원가입 및 이용 계약의 성립 제6조 이용 신청의 승낙과 제한 제7조 개인정보의 보호 및 사용 제8조 회원 ID 부여 및 관리 제9조 회원정보의 변경 제10조 회원의 ID 및 비밀번호 관리의무 제11조 회원에 대한 통지<br />
                                    제3장<br />
                                    계약 당사자의 의무 제12조 회사의 의무 제13조 회원의 의무 제4장 서비스의 이용 제14조 서비스 제공 제15조 서비스의 변경 제16조 정보의 제공 및 광고의 게재 제17조 게시물의 관리 제18조 게시물의 저작권 제19조 권리의 귀속 제20조 계약 해지 제21조 서비스 이용제한 또는 중지 및 회원 탈퇴 제22조 손해배상 제23조 책임제한 제24조 재판권 및 준거법<br />
                                </div>
                                <div className="termOKBtn" onClick={this.agree}>동의하고 닫기</div>
                                </div>
                            </div>
                            }
                        <Modal.Content >
                            <div className="title">OPEN SOURCE DESIGN</div>
                            <SignUPBox>
                                <div className="itemBox">
                                    <div className="titleLabel">아이디</div>

                                    <InputText placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." onChange={this.onChangeId} />
                                </div>

                                <div className="itemBox">
                                    <div className="titleLabel">비밀번호</div>
                                    <InputPass placeholder="비밀번호를 입력하세요." onChange={this.onChangePass} />
                                </div>

                                <div className="itemBox">
                                    <div className="titleLabel">비밀번호 확인</div>
                                    <InputPass placeholder="비밀번호를 입력하세요." onChange={this.onChangePassCheck} />
                                </div>

                                <div className="itemBox">
                                    <div className="titleLabel">닉네임</div>
                                    <InputText placeholder="닉네임을 입력하세요." onChange={this.onChangeNickname} />
                                </div>
                                <div className="itemBox">
                                    <div className="titleLabel">이용약관</div>
                                    <div className="normalBox">
                                        <CheckBox2 id="agree" onChange={this.onChecked} checked={this.state.checked} value={this.state.checked} />
                                        <CheckboxContainer>
                                            <div className="label-text">이용약관에 동의하시나요?</div>
                                        </CheckboxContainer>
                                        <div className="normalText" onClick={this.openterm}>이용약관 보기</div>
                                    </div>
                                    <div className="subItemBox" style={{justifyContent:"flex-end"}}>
                                    <div className="blackBoldText" onClick={this.onBack}>뒤로</div>
                                    <div className="redBoldText" onClick={this.onSubmit}>회원가입</div>
                                    </div>
                                </div>
                            </SignUPBox>
                        </Modal.Content>
                    </CustomModal > */}
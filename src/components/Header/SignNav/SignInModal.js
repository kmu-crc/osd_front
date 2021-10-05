import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from "styled-components";
import cookie from 'react-cookies';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ResetPwForm from "components/Registration/ResetPwForm";
import { FindPwRequest } from "redux/modules/account";
import { Modal } from 'semantic-ui-react';
import PxtoRem from "modules/PxtoRem";
import Loading from 'components/Commons/Loading';
// import { SetSession } from "modules/Sessions"
// import close from "source/close_white.png"
// import { confirm } from "components/Commons/Confirm/Confirm";
// import { Warning } from 'material-ui-icons';
// import { alert } from "components/Commons/Alert/Alert";
// import opendesign_style from "opendesign_style";
import new_logo_opendesign_shadow from "source/new_logo_opendesign_shadow.png";
import new_logo_opendesign_shadow_red from "source/new_logo_opendesign_shadow_red.png";
import new_logo_warning from "source/new_logo_warning.svg";

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
    border:1px solid rgba(255,255,255,0);
  }
  25% {
    border:1px solid rgba(255,255,255,1);
  }
  50% {
    border:1px solid rgba(255,255,255,0);
  }
  75% {
    border:1px solid rgba(255,255,255,1);
  }
  100% {
    border:1px solid rgba(255,255,255,0);
  }
`;
const Wrapper = styled.div`
    width:100%;
    height:100%;
    background-color:#000000A1;
    position:absolute;
    z-index:888;
    // display:flex;
    // justify-content:center;
    // align-items:center;
    // position:relative;
    // margin-top:90px;
    .content_{
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        position:relative;
    }
    .none_display{
        display:none;
    }
    .loginBox{
        width:396px;
        position:relative;
    }
    .logoBox{
        width:100%;
        height:182px;
    }
    .warning_text_ani{
        display:flex;
        animation-name: ${Warning_Ani2};
        animation-duration:1s;
        animation-direction:alternate;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;  
    }
    .warning_logo_ani{
        display:inline;
        animation-name: ${Warning_Ani1};
        animation-duration:1s;
        animation-direction:alternate;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;  
    }
    .warning_button_ani{
        display:inline;
        animation-name: ${Warning_Ani3};
        animation-duration:1s;
        animation-direction:alternate;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;  
    }
    .logoBox_warning{
        width:100%;
        height:182px;
        position:absolute;
        left:0;
        opacity:0;
    }
    .textBox{
        min-width:300px;
        height:30px;
        position:relative;
    }

    .warningText{
        min-width:300px;
        height:30px;
        position:absolute;
        display:flex;
        align-items:center;
        outline:none;
        padding:0px 5px;
        background-color:white;
        z-index:990;
        opacity:0;
    }
    .warningImg{
        width:25px;
        height:25px;
        object-fit:fit;
    }
    .row{width:100%;}
    .halfRow{width:50%;}
    .flexCenter{display:flex;align-items:center;}
    .label{min-width:96px;width:96px;font-size:15px;color:white;font-family:Noto Sans KR;}
    .save{cursor:pointer;margin-left:31px;min-width:max-content;font-size:15px;color:white;font-family:Noto Sans KR;}
    .save_now{color:#FA80A0;}
    .save_none{color:white}
    .grayButton{
        height:30px;
        background-color:#7A7A7A;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-size:15px;
        cursor:pointer;
    }
    .grayEdgeButton{
        height:30px;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-size:15px;
        cursor:pointer;
    }
    .borderAdd{
        border:1px solid white;
    }
    .marginTop1{margin-top:36px;}
    .marginTop2{margin-top:68px;}

    @media only screen and (min-width : 500px) and (max-width:1000px) {
        .label{
            margin-bottom:20px;
        }
        .flexCenter{
            flex-wrap:wrap;
        }
        .save{
            width:100%;
            margin-left:0px;
            display:flex;
            justify-content:flex-end;
        }
    }
`;
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
const ResetModal = styled(Modal)`
    width: 764px !important;
    height: 390px !important;
`;
const ModalContent = styled.div`
// *{border: 1px solid red;}
    // width: 764px;
    // height: 764px;
    background-color:white;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:59px;

    .wrapper{
        // width:300px;
    }
    .header{
        width:100%;
        text-align:center;
        font-family:Noto Sans KR,Noto Sans KR;
        font-size:27px;
        margin-bottom:40px;
    }
    .justityCenter{
        justify-content:center;
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
    .join_button{
        margin: auto;
        width: 200px;
        height:51px;
        display:flex;
        justify-content:center;
        align-items:center;
        border: 1px solid #000000;
        font-size: 25px;
        font-family:Noto Sans KR,Noto Sans KR;
        cursor:pointer;
    }
`;

class SignInModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            findPW: false,
            isSavedId: false,
            isSavedPassword: false,
            isWarning: false,
        }
        this.findIDPW = this.findIDPW.bind(this);
        this.handlesubmitEnter = this.handlesubmitEnter.bind(this);
        this.onCheckSaveID = this.onCheckSaveID.bind(this);
        this.onCheckSaveLogin = this.onCheckSaveLogin.bind(this);
    }

    componentDidMount() {
        const email = cookie.load('saveid') || null;
        const password = cookie.load('savepassword') || null;
        if (email) {
            this.setState({ email: email, isSavedId: true });
        }
        if (password) {
            this.setState({ password: password, isSavedPassword: true });
        }
    }
    signin = async (event) => {

        const { email, password } = this.state

        let warningMsg1 = document.getElementById("warning_logo");
        let warningMsg2 = document.getElementById("warning_text1");
        let warningMsg3 = document.getElementById("warning_text2");
        let warningMsg4 = document.getElementById("warning_text3");

        // ---------------- 예외처리
        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email === "") {
            // await alert("아이디를 입력해주세요", "확인");
            warningMsg1.className = "logoBox_warning warning_logo_ani";
            warningMsg2.className = "warningText warning_text_ani";
            warningMsg3.className = "warningText warning_text_ani";
            warningMsg4.className = "halfRow grayEdgeButton borderAdd warning_button_ani";

            setTimeout(() => {
                warningMsg1.className = "logoBox_warning warning_logo_ani";
                warningMsg2.className = "none_display";
                warningMsg3.className = "none_display";
                warningMsg4.className = "halfRow grayEdgeButton";
            }, 1000)
            return;
        }
        else if (checkedMail.test(this.state.email) === false) {
            // await alert("이메일 형식이 올바르지 않습니다", "확인");
            warningMsg1.className = "logoBox_warning warning_logo_ani";
            warningMsg2.className = "warningText warning_text_ani";
            warningMsg3.className = "warningText warning_text_ani";
            warningMsg4.className = "halfRow grayEdgeButton borderAdd warning_button_ani";

            setTimeout(() => {
                warningMsg1.className = "logoBox_warning warning_logo_ani";
                warningMsg2.className = "none_display";
                warningMsg3.className = "none_display";
                warningMsg4.className = "halfRow grayEdgeButton";

            }, 1000)
            return;
        }
        else if (password === "") {
            // await alert("비밀번호를 입력해주세요", "확인");
            warningMsg1.className = "logoBox_warning warning_logo_ani";
            warningMsg2.className = "warningText warning_text_ani";
            warningMsg3.className = "warningText warning_text_ani";
            warningMsg4.className = "halfRow grayEdgeButton borderAdd warning_button_ani";
            let warningMsg4 = document.getElementById("warning_text3");

            setTimeout(() => {
                warningMsg1.className = "logoBox_warning warning_logo_ani";
                warningMsg2.className = "none_display";
                warningMsg3.className = "none_display";
                warningMsg4.className = "halfRow grayEdgeButton";
            }, 1000)
            return;
        }
        // -----------------------
        if (this.state.saveID === true) {
            cookie.save("saveid", this.state.email, {
                path: '/',
            });
        }
        //로그인저장
        if (this.state.saveLogin === true) {
            cookie.save("saveid", this.state.email, {
                path: '/',
            });
            cookie.save("savepassword", this.state.password, {
                path: '/',
            });
        }


        this.props.signinrequest({ email: email, password: password })
            .then(async (res) => {
                //console.log("cap", res)
                if (res.type === "opendesign/authentication/AUTH_SIGNIN_SUCCESS") {
                    // alert('로그인에 성공하였습니다.') // SetSession("opendesign_token",res.token)
                    this.props.signin();
                    if (window.location.pathname === "/" || window.location.pathname === "signin" || window.location.pathname === "signup") {
                        window.location.href = "/";
                    } else {
                        window.history.back();
                    }
                }
                else {
                    // await alert('로그인에 실패하였습니다', "확인");
                    this.setState({ password: "" })
                    //this.onClose()
                    warningMsg1.className = "logoBox_warning warning_logo_ani";
                    warningMsg2.className = "warningText warning_text_ani";
                    warningMsg3.className = "warningText warning_text_ani";
                    warningMsg4.className = "halfRow grayEdgeButton borderAdd warning_button_ani";

                    setTimeout(() => {
                        warningMsg1.className = "logoBox_warning warning_logo_ani";
                        warningMsg2.className = "none_display";
                        warningMsg3.className = "none_display";
                        warningMsg4.className = "halfRow grayEdgeButton";
                    }, 1000)
                }
            })
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
        return !returnvalue;
    }
    findIDPW() {
        this.setState({ findPW: true });
    }
    onClose = () => { this.props.close() }
    handlesubmitEnter = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
            this.signin();
        }
    }
    handeEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }
    onCheckSaveID(event) {
        const { email, isSavedId } = this.state;
        if (email === "" || email == null) {
            return;
        }
        if (isSavedId) {
            cookie.remove(('saveid'), { path: '/' });
        } else {
            cookie.save("saveid", email, { path: '/', });
        }
        this.setState({ isSavedId: !isSavedId });
    }
    onCheckSaveLogin(event) {
        const { email, password, isSavedId, isSavedPassword } = this.state;
        // if (email === "" || email == null || password === "" || password == null) {
        //     return;
        // }
        if (isSavedPassword) {
            cookie.remove(('saveid'), { path: '/' });
            cookie.remove(('savepassword'), { path: '/' });
        } else {
            cookie.save("saveid", email, { path: '/', });
            cookie.save(('savepassword'), password, { path: '/' });
        }
        this.setState({ isSavedId: !isSavedPassword, isSavedPassword: !isSavedPassword });
    }
    onChangeValue = async data => {
        let obj = {};
        if (data.target) {
            obj[data.target.name] = data;
        }
        await this.setState(obj);
        console.log(this.state);
    };
    onSubmit = async e => {
        this.setState({ findPW: false, loading: true });
        const email = document.getElementById("reset-email").value;
        if (email.length === 0) {
            alert('이메일주소를 입력해주세요.');
            this.setState({ findPW: true, loading: false });
            return;
        }
        await this.props.FindPwRequest({ email: email })
        alert(`${email}(으)로 재발급된 비밀번호가 전송되었습니다.`);
        this.setState({ loading: false });
    };
    render() {
        const { open } = this.props
        const { loading, findPW, email, password, isSavedId, isSavedPassword, isWarning } = this.state;
        return (<React.Fragment>
            {loading ? <Loading /> : null}
            <Wrapper isWarning={isWarning}>
                <div className="content_">
                    <div className="loginBox">
                        <img src={new_logo_opendesign_shadow} className="logoBox" />
                        <img src={new_logo_opendesign_shadow_red} id="warning_logo" className="logoBox_warning" />
                        <div className="marginTop2">
                            <div className="row flexCenter ">
                                <div className="label">ID</div>
                                <div className="textBox ">
                                    <div id="warning_text1" className="none_display">
                                        <img src={new_logo_warning} className="warningImg" />
                                        <span>ID또는 비밀번호 오류입니다.</span>
                                    </div>
                                    <InputText onKeyDown={this.handlesubmitEnter} name='email' type='text' value={email || ""}
                                        onChange={this.handeEmailChange} placeholder="아이디(이메일주소)를 입력하세요" />
                                </div>
                                <a onClick={this.onCheckSaveID} className={`save ${isSavedId ? "save_now" : "save_none"}`}>아이디 저장</a>
                            </div>
                            <div className="row flexCenter marginTop1">
                                <div className="label">PW</div>
                                <div className="textBox ">
                                    <div id="warning_text2" className="none_display">
                                        <img src={new_logo_warning} className="warningImg" />
                                        ID또는 비밀번호 오류입니다.
                                    </div>
                                    <InputText onKeyDown={this.handlesubmitEnter} name='password' type='password' value={password || ""}
                                        onChange={this.handlePasswordChange} placeholder="비밀번호를 입력하세요." />
                                </div>
                                <a onClick={this.onCheckSaveLogin} className={`save ${isSavedPassword ? "save_now" : "save_none"}`}>로그인 상태유지</a>
                            </div>
                        </div>
                        <div className="row grayButton marginTop1" onClick={this.signin}>로그인</div>
                        <div className="row flexCenter marginTop1">
                            <div className="halfRow grayEdgeButton" onClick={this.onClose}><Link style={{ color: "white" }} to="/signup" onClick={this.onClose}>회원가입</Link></div>
                            <div id="warning_text3" className={`halfRow grayEdgeButton`} onClick={this.findIDPW}>비밀번호 찾기</div>
                        </div>
                    </div>
                </div>
            </Wrapper>

            {findPW
                ? <ResetModal open={findPW} onClose={() => this.setState({ findPW: false })}>
                    <ModalContent>
                        <div className="wrapper">
                            <div className="header">비밀번호 찾기</div>
                            <div className="font_normal">비밀번호를 재발급 하고자는 아이디(메일)를 입력해 주세요.</div>
                            <InputText className=" marginTop4 " id='reset-email' placeholder="아이디(이메일주소)를 입력하세요" />
                            <div className="row2 justityCenter marginTop4 relative">
                                <a onClick={this.onSubmit}> <div className="join_button" >비밀번호 발급</div></a>
                            </div>
                        </div>
                    </ModalContent>
                </ResetModal>
                : null}
        </React.Fragment>)
    }
}


const mapStateToProps = state => ({
    status: state.Account.FindPw.status,
    message: state.Account.status.message
});
const mapDispatchToProps = dispatch => ({
    FindPwRequest: data => dispatch(FindPwRequest(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInModal));

{/* <Wrapper>
<div className="loginBox">
     <img src={new_logo_opendesign_shadow} className="logoBox"/>
     <div className="marginTop2">
         <div className="row flexCenter ">
             <div className="label">ID</div>
             <InputText onKeyDown={this.handlesubmitEnter} name='email' type='text' value={email || ""}
              onChange={this.handeEmailChange} placeholder="아이디(이메일주소)를 입력하세요" />
         </div>
         <div className="row flexCenter marginTop1">
             <div className="label">PW</div>
                 <InputText onKeyDown={this.handlesubmitEnter} name='password' type='password' value={password || ""}
                 onChange={this.handlePasswordChange} placeholder="비밀번호를 입력하세요." />
         </div>
         <div className="row grayButton marginTop1" onClick={this.signin}>로그인</div>
         <div className="row flexCenter marginTop1">
             <div className="halfRow grayEdgeButton" onClick={this.onClose}>회원가입</div>
             <div className="halfRow grayEdgeButton" onClick={this.findIDPW}>비밀번호 찾기</div>
         </div>
         <div className="row flexCenter marginTop1">
             <div onClick={this.onCheckSaveID}  className={`halfRow ${this.state.saveID == true?"grayButton":"grayEdgeButton"}`}>아이디 저장</div>
             <div onClick={this.onCheckSaveLogin} className={`halfRow ${this.state.saveLogin == true?"grayButton":"grayEdgeButton"}`}>로그인 상태 유지</div>
         </div>
     </div>
</div>
</Wrapper> */}

// onSubmit = async e => {
//     const data = { email: this.state.email };

//     let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

//     if (this.state.email === "") {
//         await alert("아이디를 입력해주세요", "확인");
//         return;
//     }
//     else if (checkedMail.test(this.state.email) === false) {
//         await alert("올바른 양식이 아닙니다", "확인");
//         return;
//     }
//     else if (await this.checkEmail() === false) {
//         await alert("등록되지 않은 아이디입니다", "확인");
//         return;
//     }

//     e.preventDefault();
//     this.props.FindPwRequest(data);
//     this.setState({ loading: true });

//     await alert("해당 아이디로 메일 전송이 완료되었습니다", "확인");
//     this.props.close();
// };
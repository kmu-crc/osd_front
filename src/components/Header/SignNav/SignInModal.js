import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { SetSession } from "modules/Sessions"
// import close from "source/close_white.png"
// import { confirm } from "components/Commons/Confirm/Confirm";
import cookie from 'react-cookies';
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import new_logo_opendesign_shadow from "source/new_logo_opendesign_shadow.png";
const Wrapper = styled.div`
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.2);
    position:absolute;
    z-index:999;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    .loginBox{
        width:396px;
    }
    .logoBox{
        width:100%;
        height:182px;
    }
    .row{width:100%;}
    .halfRow{width:50%;}
    .flexCenter{display:flex;align-items:center;}
    .label{min-width:96px;width:96px;font-size:15px;font-family:Noto Sans KR;color:#000000;}
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
        border:1px solid #7A7A7A;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#7A7A7A;
        font-size:15px;
        cursor:pointer;
    }
    .marginTop1{margin-top:36px;}
    .marginTop2{margin-top:68px;}
`
const InputText = styled.input`
    width:100%;
    height:30px;
    outline:none;
    border:none;
    padding:0px 10px;
`

class SignInModal extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", findPW: false 
                    ,email: cookie.load('saveid') || ""
                    , password: cookie.load('savepassword') || ""
                    , saveID: cookie.load('saveid') != null ? cookie.load('savepassword') == null ? true: false : false
                    , saveLogin: cookie.load('savepassword') != null ? cookie.load('saveid') != null ? true : false : false,}
        this.findIDPW = this.findIDPW.bind(this);
        this.handlesubmitEnter = this.handlesubmitEnter.bind(this);
        this.onCheckSaveID = this.onCheckSaveID.bind(this);
        this.onCheckSaveLogin = this.onCheckSaveLogin.bind(this);

    }
    signin = async (event) => {

        const { email, password } = this.state

        
        // ---------------- 예외처리
        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email === "") {
            await alert("아이디를 입력해주세요", "확인");
            return;
        }
        else if (checkedMail.test(this.state.email) === false) {
            await alert("이메일 형식이 올바르지 않습니다", "확인");
            return;
        }
        else if (password === "") {
            await alert("비밀번호를 입력해주세요", "확인");
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
                    window.history.back();
                }
                else {
                    await alert('로그인에 실패하였습니다', "확인");
                    this.setState({ password: "" })
                    //this.onClose()
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
    onBack() {
        window.location.href = "/SignIn";
    }
    onSubmit = async e => {
        const data = { email: this.state.email };

        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (this.state.email === "") {
            await alert("아이디를 입력해주세요", "확인");
            return;
        }
        else if (checkedMail.test(this.state.email) === false) {
            await alert("올바른 양식이 아닙니다", "확인");
            return;
        }
        else if (await this.checkEmail() === false) {
            await alert("등록되지 않은 아이디입니다", "확인");
            return;
        }

        e.preventDefault();
        this.props.FindPwRequest(data);
        this.setState({ loading: true });

        await alert("해당 아이디로 메일 전송이 완료되었습니다", "확인");
        this.props.close();
    };
    onCheckSaveID(event) {
        const result = !this.state.saveID;
        if (result === false) {
          cookie.remove(('saveid'), { path: '/' });
        }
    
        this.setState({ saveID: result,saveLogin:!result });
      }
      onCheckSaveLogin(event) {
        const result = !this.state.saveLogin;
        if (result) {
          cookie.remove(('saveid'), { path: '/' });
          cookie.remove(('savepassword'), { path: '/' });
        }
        this.setState({ saveLogin: result,saveID:!result });
      }

    render() {
        const { open } = this.props
        const { email, password } = this.state
        return (
            <React.Fragment>
                <Wrapper>
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
                </Wrapper>
            </React.Fragment>
        )
    }
}


export default SignInModal


// {this.state.findPW === false ?
//     <CustomModal open={open} 
//         <Modal.Content>
//             <div className="title">OPEN SOURCE DESIGN</div>
//             <MainBox onSubmit={this.signin}>
//                 <div className="itemBox">
//                     <div className="titleLabel">아이디</div>
//                     <InputText onKeyDown={this.handlesubmitEnter} name='email' type='text' value={email || ""}
//                         onChange={this.handeEmailChange} placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." />
//                 </div>
//                 <div className="itemBox">
//                     <div className="titleLabel">비밀번호</div>
//                     <InputText onKeyDown={this.handlesubmitEnter} name='password' type='password' value={password || ""}
//                         onChange={this.handlePasswordChange} placeholder="비밀번호를 입력하세요." />
//                 </div>

//                 <div className="subItemBox" style={{ justifyContent: "flex-end" }}>
//                     <div className="redUnderlineText" onClick={this.signin}>로그인</div>
//                 </div>
//                 <div className="subItemBox">
//                     <div className="titleLabel" style={{ cursor: "pointer" }} onClick={this.findIDPW}>비밀번호 찾기</div>
//                 </div>
//                 <div className="subItemBox">
//                     <div className="titleLabel">아직 계정이 없으신가요?</div>
//                     <div className="titleLabel"><Link style={{ color: "#FF0000" }} to="/signup" onClick={this.onClose}>회원가입</Link>
//                     </div>
//                 </div>
//             </MainBox>
//         </Modal.Content>
//     </CustomModal>
//     :
//     <SmallCustomModal open={open} onClose={this.onClose}>
//         <Modal.Content>
//             <div className="title">OPEN SOURCE DESIGN</div>
//             <MainBox onSubmit={this.signin}>
//                 <div className="titleLabel">비밀번호 찾기</div>
//                 <div className="subLabel">비밀번호를 찾고자하는 아이디를 입력해주세요</div>
//                 <InputText name='email' value={email || ""} onChange={this.handeEmailChange} placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." />
//                 <div className="subItemBox" style={{ justifyContent: "flex-end" }}>
//                     <div className="blackBoldText" onClick={this.onBack}>뒤로</div>
//                     <div className="redUnderlineText" onClick={this.onSubmit}>전송</div>
//                 </div>
//             </MainBox>
//         </Modal.Content>
//     </SmallCustomModal>
// }

// const MainBox = styled.form`

//     width:64%;
//     margin-left:18%;
//     margin-top:107px;
//     .itemBox{
//         margin-top:30px;
//         .normalBox{
//             display:flex;            
//             margin-top:16px;
//         }
//         .normalText{
//             margin-left:21px;
//             margin-top:3px;
//             font-size:17px;
//             font-weight:300;
//             color:#707070;
//             cursor:pointer;
//         }
//         .redBoldText{
//             position:absolute;
//             right:250px;
//             font-size:20px;
//             font-weight:500;
//             color:#FF0000;
//             line-height:29px;
//             text-align:left;
//             cursor:pointer;
//             text-decoration:underline;
//         }

//     }
//     .subItemBox{
//         display:flex;
//         margin-top:65px;
//         height:29px;
//         .redUnderlineText{
//             font-size:20px;
//             font-weight:500;
//             color:#FF0000;
//             line-height:29px;
//             text-align:left;
//             cursor:pointer;
//             text-decoration:underline;
//             margin-left:15px;
//         }
//         .blackBoldText{
//             font-size:20px;
//             font-weight:500;
//             color:#707070;
//             line-height:29px;
//             text-align:left;
//             cursor:pointer;
//             margin-left:15px;
//         }
//     }
//     .titleLabel{
//         width:max-content;
//         height:29px;
//         margin-left:0px;
//         font-size:20px;
//         font-weight:500;
//         color:#707070;
//         line-height:29px;
//         text-align:left;
//     }
//     .subLabel{
//         width:500px;
//         height:29px;
//         margin-top:10px;
//         font-size:17px;
//         font-weight:200;
//         color:#707070;
//         line-height:29px;
//         text-align:left;
//     }

//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//         width:100%;
//         padding-bottom:70px;
//         margin:0px;

//         .subItemBox{
//             margin-top:10px;
//         }
//     }
// `
// const InputText = styled.input`
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
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//         min-width:90%;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//         min-width:100%;
//         height:max-content;
//         padding:10px !important;
//         .title{
//             width:100%;
//         }
//     }
// `
// const SmallCustomModal = styled(Modal)`
//     min-width: 1200px;
//     height: 700px;
//     border-radius: 35px; 
//     font-family: Noto Sans KR;
//     .title {
//         width: 450px;
//         height: 37px;
//         padding: 0 0;
//         margin: 0 auto;
//         margin-top: 144px;
//         font-size: 25px;
//         font-weight: 500;
//         color: #FF0000;
//         text-align: center;
//         line-height: 37px;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//         min-width:100%;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//         min-width:100%;
//         height:max-content;
//         .title{
//             width:100%;
//             margin-top:44px;
//         }
//     }
// `

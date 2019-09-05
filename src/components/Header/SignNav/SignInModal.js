import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { SetSession } from "modules/Sessions"
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
`
class SignInModal extends Component {
    constructor(props)
    {
        super(props);
        this.state = { email: "", password: "" ,findPW:false}
        this.findIDPW = this.findIDPW.bind(this);
    }
    signin = () => {

        const { email, password } = this.state
        
        // ---------------- 예외처리
        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email == "")
        {
            alert("아이디를 입력해주세요");
            return;
        }
        else if(checkedMail.test(this.state.email)==false)
        {
            alert("이메일 형식이 올바르지 않습니다");
            return;
        }
        else if(password=="")
        {
            alert("비밀번호를 입력해주세요");
            return;
        } 
        // -----------------------

        this.props.signinrequest({ email: email, password: password })
            .then(res => {
                console.log("cap", res)
                if (res.type === "opendesign/authentication/AUTH_SIGNIN_SUCCESS") {
                    // alert('로그인에 성공하였습니다.') // SetSession("opendesign_token",res.token)
                    this.props.signin()
                }
                else {
                    alert('로그인에 실패하였습니다')
                    this.onClose()
                }
            })
    }
    async checkEmail()
    {
        const data = {email:this.state.email}
        let returnvalue = true;
        await this.props.CheckEmailRequest(data).then(
            (res)=>{
                console.log(res, data);
                if(res.checkEmail==false)
                {                   
                    returnvalue = false;
                }
            }
        );
        console.log("qwer",returnvalue);
        return returnvalue;
    }
    findIDPW()
    {
        this.setState({findPW:true});
    }
    onClose = () => { this.props.close() }

    handeEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }
    onSubmit = async e => {
        const data = {email:this.state.email};

        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if(this.state.email == "")
        {
            alert("아이디를 입력해주세요!");
            return;
        }
        else if(checkedMail.test(this.state.email)==false)
        {
            alert("올바른 양식이 아닙니다!");
            return;
        }
        else if(await this.checkEmail()==true)
        {      
            alert("등록되지 않은 아이디입니다.");
            return;
        }

        e.preventDefault();
            this.props.FindPwRequest(data);
            this.setState({loading:true});

            alert("해당 아이디로 메일 전송이 완료되었습니다!");      
            this.props.close();      
      };
   
    render() {
        const { open } = this.props
        const { email, password } = this.state
        return (
            <React.Fragment>
                {this.state.findPW == false?
            <CustomModal open={open} onClose={this.onClose}>
                <Modal.Content>
                    <div className="title">OPEN SOURCE DESIGN, OPEN DESIGN</div>
                    <form style={{ marginTop: "136px", marginLeft: "225px" }} onSubmit={this.signin}>
                        <div style={{ marginLeft: "0px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px", textAlign: "left", width: "56px", height: "29px" }}>
                            아이디</div>
                        <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                            <input name='email' type='text' value={email || ""} onChange={this.handeEmailChange} style={{ outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px", fontWeight: "300", backgroundColor: "#EFEFEF" }} placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." />
                        </div>
                        <div style={{ marginTop: "53px", marginLeft: "7px", fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px", textAlign: "left", width: "74px", height: "29px" }}>
                            비밀번호</div>
                        {/* <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px" }}><input style={{ textIndent: "35px", width: "708px", height: "48px", border: "none", color: "#707070", fontSize: "20px", fontWeight: "300", borderRadius: "15px", backgroundColor: "#EFEFEF" }} placeholder="비밀번호를 입력하세요" /></div> */}
                        <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                            <input name='password' type='password' value={password || ""} onChange={this.handlePasswordChange} style={{ outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px", fontWeight: "300", backgroundColor: "#EFEFEF" }} placeholder="비밀번호를 입력하세요." />
                        </div>
                        <div style={{ marginTop: "65px", marginLeft: "653px", width: "56px", height: "29px", borderBottom: "1.5px solid red", cursor: "pointer", color: "#FF0000", fontWeight: "700", fontSize: "20px", lineHeight: "29px", textAlign: "left" }} onClick={this.signin}>
                            로그인</div>
                        <div style={{ marginTop: "65px", marginLeft: "7px", width: "178px", height: "29px" }} >
                            <div style={{cursor:"pointer" ,fontSize: "20px", fontWeight: "500", color: "#707070", lineHeight: "29px", textAlign: "left" }} onClick={this.findIDPW}>비밀번호 찾기</div></div>
                        <div style={{ marginTop: "65px", marginLeft: "7px", lineHeight: "35px", width: "203px", height: "64px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }}>
                            아직 계정이 없으신가요?<br /><Link style={{ color: "#FF0000" }} to="/signup" onClick={this.onClose}>회원가입</Link></div>
                    </form>
                </Modal.Content>
            </CustomModal>
            :
            //< ================  비밀번호 찾기 ===================== >
            <CustomModal style={{height:"700px"}} open={open} onClose={this.onClose}>
            <Modal.Content>
                <div className="title" style = {{marginTop:"100px"}} >OPEN SOURCE DESIGN, OPEN DESIGN</div>
                <form style={{ marginTop: "136px", marginLeft: "225px" }} onSubmit={this.signin}>
                    <div style={{ marginLeft: "0px", fontSize: "20px", fontWeight: "1000", color: "#707070", lineHeight: "29px", textAlign: "left", width: "200px", height: "29px" }}>비밀번호 찾기</div>
                    <div style={{ marginTop:"10px",marginLeft: "0px", fontSize: "17px", fontWeight: "200", color: "#707070", lineHeight: "29px", textAlign: "left", width: "500px", height: "29px" }}>
                        비밀번호를 찾고자하는 아이디를 입력해주세요</div>
                    <div style={{ marginTop: "16px", width: "708px", height: "48px", padding: "0px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                        <input name='email' type='text' value={email || ""} onChange={this.handeEmailChange} style={{ outline: "none", marginLeft: "35px", width: "638px", height: "48px", border: "none", color: "#707070", fontSize: "20px", fontWeight: "300", backgroundColor: "#EFEFEF" }} placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." />
                    </div>

                    <div style={{ marginTop: "65px", marginLeft: "653px", width: "41px", height: "29px", borderBottom: "1.5px solid red", cursor: "pointer", color: "#FF0000", fontWeight: "700", fontSize: "20px", lineHeight: "29px", textAlign: "left" }} onClick={this.onSubmit}>
                        전송</div>
                </form>
            </Modal.Content>
            </CustomModal>
                }
            </React.Fragment>
        )
    }
}


export default SignInModal
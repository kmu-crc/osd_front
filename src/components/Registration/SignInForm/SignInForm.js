import React, { Component } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
// import Button from "components/Commons/Button";
// import { FormInput } from "components/Commons/FormItems";
// import { FormControl, ValidationGroup } from "modules/FormControl";
import cookie from 'react-cookies';
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const MainBox = styled.div`
  *{
    font-family:Noto Sans KR,Medium;
    color:#060000;
  }
  width:max-content;
  height:max-content;
  display:flex;
  .contentsBox{
    width:396px;
    display:flex;
    flex-direction:column;
    .titleBox{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      .title{
        font-size:${market_style.font.size.normal1};
        font-weight:700;
        color:black;
      }
    }
    .row{
      display:flex;
      height:25px;
      margin-bottom:25px;
      .label{
        min-width:96px;
        font-weight:500;
        display:flex;
        align-items:center;
        font-size:${market_style.font.size.small1};
      }
      .red_text{
        color:red;
        cursor:pointer;
        font-size:${market_style.font.size.small1};
      }
      .vcenter{
        height:100%;
        align-items:center;
      }
      .alignRight{
        justify-content:flex-end;
      }
    }
    .margin_bottom1{
      margin-bottom:15px;
    }
    .margin_bottom2{
      margin-bottom:44px;
    }
    .spaceBetween{
      justify-content:space-between;
    }

  }
`
const InputTextBox = styled.input.attrs({ type: 'text' })`
  border:none;
  width:300px;
  height:25px;
  padding-left:20px;
  background-color:#E9E9E9;
  border-radius:21px;
  display:flex;
  justify-content:center;
  outline:none;
  font-size:${market_style.font.size.tiny2};
  color:#060000;
`
const InputPasswordBox = styled.input.attrs({ type: 'password' })`
  border:none;
  width:300px;
  height:100%;
  padding-left:20px;
  background-color:#E9E9E9;
  border-radius:21px;
  display:flex;
  justify-content:center;
  outline:none;
  font-size:${market_style.font.size.tiny2};
  color:#060000;
`
const CustomButton = styled.div`
  width:${props => props.width}px;
  height:${props => props.height}px;
  border:1px solid ${props => props.borderColor};
  border-radius:${props => props.borderRadius}px;
  background-color:${props => props.bgColor};
  color:${props => props.fontColor};
  display:flex;
  justify-content:center;
  align-items:center;
  opacity:1;
  cursor:pointer;
  &:hover{
    opacity:0.7;
  }

  `
const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width:17px;
  height:17px;
  border:0.5px solid #707070;
  margin-right:11px;
`
const CustomBox = styled.div`
  width:${props => props.width == null ? "max-content" : props.width}%;
  height:${props => props.height == null ? "max-content" : props.height}%;
  display:flex;
  align-items:center;
  font-size:${props=>props.fontSize == null? market_style.font.size.mini2:props.fontSize};
  margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
  margin-bottom:${props => props.marginBottom == null ? 0 : props.marginBottom}px;
  margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
  margin-right:${props => props.marginRight == null ? 0 : props.marginRight}px;
  font-size:${market_style.font.size.tiny1};
  font-weight:200;
`

class SignInForm extends Component {

  constructor(props) {
    super(props);
    // const { cookies } = props;
    this.state = { err:false, email: cookie.load('saveid') || "", password: cookie.load('savepassword') || "", saveID: cookie.load('saveid') != null ? true : false, saveLogin: cookie.load('savepassword') != null ? true : false, };
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckSaveID = this.onCheckSaveID.bind(this);
    this.onCheckSaveLogin = this.onCheckSaveLogin.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onKeyDownID = this.onKeyDownID.bind(this);
    this.onKeyDownPass = this.onKeyDownPass.bind(this);
  }

  onChangeID(event) {
    this.setState({ email: event.target.value });
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  onKeyDownID(event){
    if(event.keyCode == 13){
      if(this.state.err == false){
        this.onSubmit(event);
      }
    }
  }
  onKeyDownPass(event){
    if(event.keyCode == 13){
      if(this.state.err == false){
        this.onSubmit(event);
      }
    }
  }


  onSubmit = async e => {
    //아이디저장
    // const { cookies } = this.props;

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

    e.preventDefault();
    const senddata = { email: this.state.email, password: this.state.password };
    this.props.SignInRequest(senddata).then(async data => {
      console.log(data);
      if (data.type === "AUTH_SIGNIN_IS_NOT_MEMBER") {
        this.setState({err:true});
        await alert("opendesign회원이 아닙니다.");
        this.setState({err:false});
        return;
      } else if (data.type === "AUTH_SIGNIN_IS_NOT_PASSWORD") {
        this.setState({err:true});
        await alert("비밀번호가 일치하지 않습니다.");
        this.setState({err:false});
        return;
      } else {
        // alert(window.history.go(-1));
        window.history.go(-1)
        // window.location.reload();
      }
    })
      .then(() => {
        // alert(this.props.token);
        // console.log(this.props.token);
      })


  }

  onCheckSaveID(event) {
    const result = document.getElementById(event.target.id).checked;
    if (result === false) {
      cookie.remove(('saveid'), { path: '/' });
    }

    this.setState({ saveID: result });
  }
  onCheckSaveLogin(event) {
    const result = document.getElementById(event.target.id).checked;
    if (result) {
      cookie.remove(('saveid'), { path: '/' });
      cookie.remove(('savepassword'), { path: '/' });
    }
    this.setState({ saveLogin: result });
  }

  onClickSignUp(event) {
    window.location.href = "/signup";
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <MainBox>
            <div className="contentsBox">
              <div className="titleBox margin_bottom2"><div className="title">로그인</div></div>
              <div className="row">
                <div className="label"><div>아이디</div></div>
                <InputTextBox
                  placeholder="아이디를 입력하세요."
                  value={this.state.email}
                  onChange={this.onChangeID} 
                  onKeyDown = {this.onKeyDownID}/>
              </div>
              <div className="row">
                <div className="label" value={this.state.password}><div>비밀번호</div></div>
                <InputPasswordBox
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  value={this.state.password}
                  onChange={this.onChangePassword} 
                  onKeyDown = {this.onKeyDownPass}/>
              </div>
              <div className="row margin_bottom2">
                <div className="label" />
                <CustomBox fontSize={market_style.font.size.tiny2}><CheckBox checked={this.state.saveID} onChange={this.onCheckSaveID} id="saveID" />아이디 저장</CustomBox>
                <CustomBox fontSize={market_style.font.size.tiny2} marginLeft={50}><CheckBox checked={this.state.saveLogin} onChange={this.onCheckSaveLogin} id="saveLogin" />로그인 상태 유지</CustomBox>
              </div>
              <div className="row margin_bottom1">
                <CustomButton onClick={this.onSubmit} width={498} height={30}
                  bgColor={"#FF0000"} fontColor={"white"}>로그인</CustomButton>
              </div>
              <div className="row spaceBetween">
                <CustomButton onClick={this.onClickSignUp} width={198} height={30}
                  bgColor={"white"} borderColor={"red"} fontColor={"red"}>회원가입</CustomButton>
                <div className="label vcenter alignRight" onClick={()=>{window.location.href="/resetPW"}}><div className="red_text">비밀번호 찾기</div></div>
              </div>
            </div>

          </MainBox>
        </form>
      </React.Fragment>
    );
  }
}

export default SignInForm;
  // onClickFBSignInbtn = data => {
  //   console.log(data);
  //   let formData = {
  //     FB_user_id: data.userID
  //   };
  //   this.props.FBSignInRequest(formData).then(data => {
  //     if (data.type === "AUTH_FBSIGNIN_IS_NOT_MEMBER") {
  //       alert("opendesign회원이 아닙니다.");
  //     } else {
  //       this.props.history.push("/");
  //     }
  //   });
  // };

// onChangeValue = async data => {
//   let obj = {};
//   if (data.target) {
//     obj[data.target.name] = data;
//   }
//   await this.setState(obj);
//   console.log(this.state);
// };

// liveCheck = target => {
//   FormControl(this.state[target]);
// };

// onSubmit = async e => {
//   e.preventDefault();

  // e.preventDefault();
  // ValidationGroup(this.state, true)
  //   .then(data => {
  //     console.log("성공", data);
  //     this.props.SignInRequest(data).then(data => {
  //       if (data.type === "AUTH_SIGNIN_IS_NOT_MEMBER") {
  //         alert("opendesign회원이 아닙니다.");
  //       } else if (data.type === "AUTH_SIGNIN_IS_NOT_PASSWORD") {
  //         alert("비밀번호가 일치하지 않습니다.");
  //       } else {
  //         this.props.history.go(-1);
  //       }
  //     });
  //   })
  //   .catch(e => {
  //     console.log("실패", e);
  //   });
// };

      // <form onSubmit={this.onSubmit}>
      //   <Label>Email</Label>
      //   <FormInput
      //     name="email"
      //     placeholder="email을 입력해주세요."
      //     getValue={this.onChangeValue}
      //     validates={["Required", "IsEmail"]}
      //     onBlur={() => {
      //       this.liveCheck("email");
      //     }}
      //   />
      //   <Label>Password</Label>
      //   <FormInput
      //     name="password"
      //     type="password"
      //     placeholder="비밀번호를 입력해주세요."
      //     getValue={this.onChangeValue}
      //     validates={["Required", "MinLength(2)", "NotBlank"]}
      //     onBlur={() => {
      //       this.liveCheck("password");
      //     }}
      //   />
      //   <Subinfo>
      //     <Link to="/resetPw">
      //       <FindPwBtn type="button">비밀번호 찾기</FindPwBtn>
      //     </Link>
      //     <Link to="/signup" className="signUpBtn">
      //       회원가입
      //     </Link>
      //   </Subinfo>
      //   <BtnWrap>
      //     <LoginBtn type="submit" round={true} fluid={true}>
      //       로그인
      //     </LoginBtn>
      //   </BtnWrap>
      // </form>

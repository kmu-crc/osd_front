import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";

const MainBox = styled.div`
  *{
    font-family:Noto Sans KR,Medium;
    color:#060000;
  }

  width:933px;
  height:609px;
  padding:28px;
  display:flex;
  justify-content:center;
  align-items:center;

  .contentsBox{
    width:498px;
    height:100%;
    display:flex;
    flex-direction:column;

    .titleBox{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      .title{
        font-size:20px;
        font-weight:700;
      }
    }
    .row{
      *{
        font-size:16px;
      }
      display:flex;
      height:43px;
      margin-bottom:19px;
      .label{
        min-width:104px;
        font-weight:500;
        display:flex;
        align-items:center;
      }
      .red_text{
        color:red;
      }
    }
    .spaceBetween{
      justify-content:space-between;
    }

  }
`
const InputTextBox = styled.input.attrs({type:'text'})`
  border:none;
  width:100%;
  height:100%;
  padding-left:20px;
  background-color:#E9E9E9;
  border-radius:21px;
  display:flex;
  justify-content:center;
  outline:none;
  
  color:#060000;
`
const CustomButton = styled.div`
  width:${props=>props.width}px;
  height:${props=>props.height}px;
  border:1px solid ${props=>props.borderColor};
  border-radius:${props=>props.borderRadius}px;
  background-color:${props=>props.bgColor};
  color:${props=>props.fontColor};
  display:flex;
  justify-content:center;
  align-items:center;
  opacity:1;
  cursor:pointer;
  &:hover{
    opacity:0.7;
  }

  `
const CheckBox = styled.div`
  width:17px;
  height:17px;
  border:0.5px solid #707070;
  margin-right:11px;
`
const CustomBox = styled.div`
  width:${props=>props.width==null?100:props.width}%;
  height:${props=>props.height==null?100:props.height}%;
  display:flex;
  margin-top:${props=>props.marginTop == null?0:props.marginTop}px;
  margin-bottom:${props=>props.marginBottom == null?0:props.marginBottom}px;
  margin-left:${props=>props.marginLeft == null?0:props.marginLeft}px;
  margin-right:${props=>props.marginRight == null?0:props.marginRight}px;
`

class SignInForm extends Component {

  constructor(props){
    super(props);
    this.state={email:"",password:""};
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onChangeID(event){
    this.setState({email:event.target.value});
  }
  onChangePassword(event){
    this.setState({password:event.target.value});
  }

  onSubmit = async e => {
    e.preventDefault();
    const data = {email:this.state.email,password:this.state.password};
     this.props.SignInRequest(data).then(data => {
        if (data.type === "AUTH_SIGNIN_IS_NOT_MEMBER") {
          alert("opendesign회원이 아닙니다.");
        } else if (data.type === "AUTH_SIGNIN_IS_NOT_PASSWORD") {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          this.props.history.go(-1);
        }
      });
    
  }

  render() {
    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <MainBox>
              <div className="contentsBox">
                <div className="titleBox"><div className="title">로그인</div></div>
                  <CustomBox height={14.8}/>
                  <div className="row">
                    <div className="label"><div>아이디</div></div>
                    <InputTextBox 
                    placeholder="아이디를 입력하세요." 
                    value={this.state.email}
                    onChange={this.onChangeID}/>
                  </div> 
                  <div className="row">
                    <div className="label" value={this.state.password}><div>비밀번호</div></div>
                    <InputTextBox 
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    value={this.state.password}
                    onChange={this.onChangePassword}/>
                  </div>
                  <div className="row">
                    <div className="label"/>
                    <CustomBox width={29} ><CheckBox/>아이디 저장</CustomBox>
                    <CustomBox width={29}><CheckBox/>로그인 상태 유지</CustomBox>
                  </div>
                  <div className="row">
                  <CustomButton onClick={this.onSubmit}  width={498} height={43} 
                  bgColor={"#FF0000"} borderRadius={21} fontColor={"white"}>로그인</CustomButton>
                  </div>
                  <div className="row spaceBetween">
                    <CustomButton width={251} height={43} 
                    bgColor={"white"} borderRadius={21} borderColor={"red"} fontColor={"red"}>회원가입</CustomButton>
                    <div className="label red_text ">아이디/비밀번호 찾기</div>
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

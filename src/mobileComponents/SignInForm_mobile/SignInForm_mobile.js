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
  width:100%;
  max-width:360px;
  padding:0px 10px;
  margin-top:100px;
  .wrapper{
    width:100%;
  }
  .header{
    width:100%;
    font-size:${market_style.font.size.normal3};
    font-weight:800;
    color:#707070;
    text-align:center;
    margin-bottom:50px;
  }
  .spaceBetween{justify-content:space-between;}
  .maxRow{width:100%;}
  .marginBottom1{margin-bottom:10px;}
  .marginBottom2{margin-bottom:50px;}
  .row{
    width:100%;
    margin-bottom:20px;
    display:flex;
    align-items:center;
  }
  .label{
    width:85px;
    padding-left:10pxl
    font-size:${market_style.font.size.small1};
    font-weight:500;
    color:black;
  }
  .marginRight{margin-right:30px;}
  .fontSmall{font-size:${market_style.font.size.mini2};}
  .red{color:#FF3838;}
  .flex{display:flex;align-items:center;}
  
`
const InputText = styled.input`
  width:100%;
  max-width:270px;
  height:30px;
  background-color:#E9E9E9;
  border:none;
  border-radius:22px;
  outline:none;
  padding:5px 13px;
`
const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width:17px;
  height:17px;
  border:0.5px solid #707070;
  margin-right:11px;
`
const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"px"};
  height:${props=>props.height==null?"100%":props.height+"px"};
  color:${props=>props.color==null?"white":props.color};
  background-color:${props=>props.bgColor==null?"#FF3838":props.bgColor};
  border-radius:${props=>props.borderRadius==null?"0px":props.borderRadius+"px"};
  border:2px solid #FF3838;
  display:flex;
  align-items:center;
  justify-content:center;
`
class SignInForm_mobile extends Component {

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
        await alert("OpenDesignWorld회원이 아닙니다.");
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
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
        <MainBox>
          <div className="wrapper">
          <div className="header marginBottom2">로그인</div>
          <div className="row">
            <div className="label">아이디</div>
            <InputText  placeholder="아이디를 입력하세요."
                        value={this.state.email}
                        onChange={this.onChangeID} 
                        onKeyDown = {this.onKeyDownID}/>
          </div>
          <div className="row">
            <div className="label">비밀번호</div>
            <InputText placeholder="비밀번호를 입력하세요"
                       type="password"
                       value={this.state.password}
                       onChange={this.onChangePassword} 
                       onKeyDown = {this.onKeyDownPass}/>
          </div>
          <div className="row marginBottom2">
            <div className="label"/>
            <div className="marginRight fontSmall flex"><CheckBox checked={this.state.saveID} onChange={this.onCheckSaveID} id="saveID" />아이디 저장</div>
            <div className="fontSmall flex"><CheckBox checked={this.state.saveLogin} onChange={this.onCheckSaveLogin} id="saveLogin" />로그인 상태 유지</div>
          </div>
          <div className="maxRow marginBottom1">
            <RedButton onClick={this.onSubmit} height={35} bgColor="#FF3838" borderRadius={10}>로그인</RedButton>
          </div>
          <div className="maxRow spaceBetween flex">
            <RedButton onClick={this.onClickSignUp}  width={194} height={30} color="#FF3838" bgColor="white">회원 가입</RedButton>
            <div onClick={()=>{window.location.href="/resetPW"}} className="red fontSmall">비밀번호 찾기</div>
          </div>
          </div>
        </MainBox>
        </div>
        </form>
      </React.Fragment>
    );
  }
}

export default SignInForm_mobile;



{/* <form onSubmit={this.onSubmit}>
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
</form> */}
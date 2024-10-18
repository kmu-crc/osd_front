import React, { Component } from "react";
import showPw from "source/show_password.svg";
import styled from "styled-components";
import opendesign_style from "opendesign_style";

const SectionSecurityContainer = styled.section`
  padding-left:47px;
  .pw {
    display: flex;
    justify-content:flex-start;
    flex-direction:row;
    .text-label {
      min-width: 115px;
      height: 29px;
      font-size: 20px;
      line-height: 29px;
      font-weight: 500;
      color: #707070;
      margin-bottom:10px;
    }
    .input-box {
      margin-left: 60px;
      width: 505.5px;
      height: 56px;
      background-color: #EFEFEF;
      border-radius: 5px;
      font-size: 20px;
      line-height: 29px;
      font-weight: 500;
      color: #707070;
    }
    input {
      width: 95%;
      height: 29px;
      outline: none;
      border: none;
      margin-left: 12px;
      margin-top: 13px;
      color: #707070;
      line-height: 29px;
      background-color: #EFEFEF;
    }
    .showpw { 
      margin-left: 18px;
      margin-top: 18px;
    }
  }
  .pw-verify {
    margin-top: 55px;
    display: flex;
    justify-content:flex-start;
    flex-direction:row;
    .text-label {
      min-width: 115px;
      height: 29px;
      font-size: 20px;
      line-height: 29px;
      font-weight: 500;
      color: #707070;
      margin-bottom:10px;
    }
    .input-box {
      width: 505.5px;
      height: 56px;
      margin-left: 60px;
      background-color: #EFEFEF;
      border-radius: 5px;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
      line-height: 29px;
    }
    input {
      outline: none;
      border: none;
      margin-left: 12px;
      margin-top: 13px;
      width: 95%;
      height: 29px;
      line-height: 29px;
      color: #707070;
      background-color: #EFEFEF;
    }
  }

    @media only screen and (min-width : 780px) and (max-width:1440px) {
      .pw {
        flex-direction:column;
        .input-box{
          margin-left:0px;
        }
      }
      .pw-verify {
        flex-direction:column;
        .input-box{
          margin-left:0px;
        }
      }
    }
    @media only screen and (min-width : 360px) and (max-width:780px) {
      .pw {
        flex-direction:column;
        .input-box{
          margin-left:0px;
          width:80%;
        }
      }
      .pw-verify {
        flex-direction:column;
        .input-box{
          margin-left:0px;
          width:80%;
        }
      }
    }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
        padding:15px;
        display:flex;
        flex-direction:column;
        align-items:center;
        .pw{
          width:100%;
        }
        .pw-verify{
          width:100%;
        }
    }
`;
class SectionSecurity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "", passwordcheck: "", isSame: false, showPass: false,
    }
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCheckedPassword = this.onChangeCheckedPassword.bind(this);
    this.onClickShowPassword = this.onClickShowPassword.bind(this);
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
    this.props.updatePassword(event.target.value);
  }
  onChangeCheckedPassword(event) {
    this.setState({ passwordcheck: event.target.value })
    this.props.updatePasswordCheck(event.target.value);
  }
  onClickShowPassword() {
    this.setState({ showPass: !this.state.showPass });
  }
  render() {
    return (
      <SectionSecurityContainer id="security">
        {/* pw */}
        <div className="pw">


          <div className="text-label" >비밀번호</div>
          <div style={{display:"flex",flexDirection:"row"}}>
              <div className="input-box" >
                <input type={this.state.showPass === true ? "text" : "password"} maxLength="50" onChange={this.onChangePassword} value={this.state.password} placeholder="비밀번호를 입력하세요." />
              </div>
              <div onClick={this.onClickShowPassword} className="showpw" ><img alt="" src={showPw} /></div>
          </div>
          </div>
        {/* pw verify */}
        <div className="pw-verify">
          <div className="text-label" >비밀번호 확인</div>
          <div className="input-box">
            <input type="password" maxLength="50" onChange={this.onChangeCheckedPassword} value={this.state.passwordcheck} placeholder="비밀번호를 입력하세요." />
          </div>
        </div>
      </SectionSecurityContainer>
    );
  }
}
export default SectionSecurity;
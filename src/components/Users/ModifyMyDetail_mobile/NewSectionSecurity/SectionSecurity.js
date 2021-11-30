import React, { Component } from "react";
import styled from "styled-components";
import iShowPw from "source/visibility_off_black_24dp.png";

const Info = styled.div`
  width:100%;
  font-family:Spoqa Han Sans;
  .title{width:159px;font-size:15px;font-weight:800;}
  .exp_title{width:65px;font-size:15px;font-weight:800;}
  .row{width:100%;margin-top:15px;display:flex;justify-content:space-between;padding:0px 10px;}
  .row2{width:100%;margin-top:15px;display:flex;padding:0px 10px;}
  .checked{width:24px;height:24px;}
  .careerBox{margin-top:25px;}
  .password{
    position:relative;
    .showpw{
      position:absolute;
      width:22px;
      height:22px;
      top:0px;
      right:3px;
    }
  }
`
const IconDiv = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-image: url(${props => props.icon});
    background-position: center center;
    background-size: cover;

    cursor: pointer;
`;
const DropDown = styled.div`
    position: relative; 
        
    select {
      margin: 0px;
      padding: 0px;
      padding-left: 4px;
      font-size: 14px;
      width: 174px;
      height: 23px;
      background-color: #C9C9C9;
      border: none;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .select-arrow {
      position: absolute;
      top: 5px;
      right: 4px;
      width: 0px;
      height: 0px;
      pointer-events: none;
      border-style: solid;
      border-width: 14px 8px 0 8px;
      border-color: #000000 transparent transparent transparent;
    }
`
const Hrline = styled.div`
  width:${props=>props.width==null?"100%":props.width+"px"};
  border-top:2px solid #dcdcdc;
  margin-left:auto;
  margin-right:auto;
`
const InputText = styled.input`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    background-color:#c2c2c2;
    padding:0px 36px 0px 6px;
    border:none;
    outline:none;
`
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
      <Info>
        <div className="row">
          <div className="title">비밀번호</div>
          <div className="password">
            <InputText
              onChange={this.onChangePassword}
              type={this.state.showPass === true ? "text" : "password"}
              value={this.state.password}
              placeholder="비밀번호를 입력하세요."
              className="inputText"
              maxLength="50"
              width="174" height="22"/>
              <div onClick={this.onClickShowPassword} className="showpw" style={{ opacity: `${this.state.showPass === true ? "0.5" : "1"}` }}>
                <IconDiv width={24} height={24} icon={iShowPw} />
              </div>           
          </div>
        </div>
        <div className="row">
          <div className="title">비밀번호 확인</div>
          <InputText
            width="174" height="22"
            onChange={this.onChangeCheckedPassword}
            type={this.state.showPass === true ? "text" : "password"}
            value={this.state.passwordcheck}
            placeholder="비밀번호를 입력하세요."
            className="inputText"
            maxLength="50"
          />
        </div>
      </Info>
    );
  }
}
export default SectionSecurity;


{/* <Wrapper id="security" >
      <div className="section">
        <div className="label">비밀번호</div>
        <div className="content">
          <input
            onChange={this.onChangePassword}
            type={this.state.showPass === true ? "text" : "password"}
            value={this.state.password}
            placeholder="비밀번호를 입력하세요."
            className="inputText"
            maxLength="50"
          />
          <div onClick={this.onClickShowPassword} className="showpw" style={{ opacity: `${this.state.showPass === true ? "0.5" : "1"}` }}>
            <IconDiv width={40} height={40} icon={iShowPw} />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="label">비밀번호 확인</div>
        <div className="content">
          <input
            onChange={this.onChangeCheckedPassword}
            type={this.state.showPass === true ? "text" : "password"}
            value={this.state.passwordcheck}
            placeholder="비밀번호를 입력하세요."
            className="inputText"
            maxLength="50"
          />
        </div>
      </div>
    </Wrapper> */}
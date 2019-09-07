import React, { Component } from "react";
import { FormControl, ValidationGroup } from "modules/FormControl";
import SelectBox from "components/Commons/SelectBox"
import showPw from "source/show_password.svg";
import styled from "styled-components";

class SectionSecurity extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
          password:"",passwordcheck:"",isSame:false,showPass:false,
        }
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCheckedPassword = this.onChangeCheckedPassword.bind(this);
        this.onClickShowPassword = this.onClickShowPassword.bind(this);
    }

    onChangePassword(event)
    {
      this.setState({password:event.target.value});
      this.props.updatePassword(event.target.value);
    }
    onChangeCheckedPassword(event)
    {
      this.setState({passwordcheck:event.target.value})
      this.props.updatePasswordCheck(event.target.value);
    }
    onClickShowPassword()
    {
      this.setState({showPass:!this.state.showPass});
    }
    render()
    {
        return(
            <section id="security" style={{ paddingLeft: "95.5px" }} >
            {/* pw */}
            <div style={{ display: "flex" }}>
              <div style={{ width: "75px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>비밀번호</div>
              <div style={{
                marginLeft: "98px",
                width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px",
                fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
              }} >
                <input type={this.state.showPass==true?"text":"password"} maxLength="50" onChange = {this.onChangePassword} value={this.state.password}
                  style={{
                    outline: "none", border: "none",
                    marginLeft: "12px", marginTop: "13px",
                    width: "481.5px", height: "29px", lineHeight: "29px",
                    color: "#707070", backgroundColor: "#EFEFEF"
                  }} placeholder="비밀번호를 입력하세요." />
              </div>
              <div onClick={this.onClickShowPassword} style={{marginLeft:"18px", marginTop:"18px"}}><img src={showPw}/></div>
            </div>
            {/* pw verify */}
            <div style={{ marginTop: "55px", display: "flex" }}>
              <div style={{ width: "115px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>비밀번호 확인</div>
              <div style={{
                marginLeft: "60px",
                width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px",
                fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
              }} >
                <input type="password" onChange = {this.onChangeCheckedPassword} maxLength="50" value={this.state.passwordcheck}
                 style={{
                  outline: "none", border: "none",
                  marginLeft: "12px", marginTop: "13px",
                  width: "481.5px", height: "29px", lineHeight: "29px",
                  color: "#707070", backgroundColor: "#EFEFEF"
                }} placeholder="비밀번호를 입력하세요." />
              </div>
            </div>
          </section>
        );
    }
}
export default SectionSecurity;
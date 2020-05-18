import React, { Component } from "react";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
const BtnWrap = styled.div`
  margin-bottom: 1rem;
`;
const LoginBtn = styled(Button)`
  margin-bottom: 1rem;
`;
const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.92857143em;
  font-weight: 700;
  text-transform: none;
`;

const MainBox=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:600px;
  height:100%;
  max-width:1350px;
  min-width:100%;
  flex-direction:row;
  margin-left:auto;
  margin-right:auto;
  .main{
    width:100%;
    height:100%;
    margin-top:20px;
    margin-bottom:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
`

class AdminSignInForm extends Component {
  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };
  onSubmit = async e => {
    e.preventDefault();
    ValidationGroup(this.state, true)
      .then(data => {
        console.log("성공", data);
        this.props.AdminSignInRequest(data).then(data => {
          if (data.type === "AUTH_ADMIN_SIGNIN_IS_NOT_MEMBER") {
            alert("관리자가 아닙니다.");
          } else if (data.type === "AUTH_ADMIN_SIGNIN_IS_NOT_PASSWORD") {
            alert("비밀번호가 일치하지 않습니다.");
          } else {
            this.props.history.push("/");
          }
        });
      })
      .catch(e => {
        console.log("실패", e);
      });
  };

  render() {
    return (
      <MainBox>
        <div className="main">
        <h1>관리자 로그인</h1>
        <div style={{width:"350px",alignContent:"center"}}>
        <form onSubmit={this.onSubmit}>
          <Label>ADMIN ID</Label>
          <FormInput
            name="admin_id"
            placeholder="관리자의 ID를 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required"]}
            />
          <Label>ADMIN PW</Label>
          <FormInput
            name="password"
            type="password"
            placeholder="관리자의 비밀번호를 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "MinLength(2)", "NotBlank"]}
            />
          <BtnWrap>
            <LoginBtn type="submit" round={true} fluid={true}>
              로그인
            </LoginBtn>
          </BtnWrap>
        </form>
      </div>
      </div>
      </MainBox>
    );
  }
}

export default AdminSignInForm;

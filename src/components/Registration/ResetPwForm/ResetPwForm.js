import React, { Component } from "react";
import styled from "styled-components";
import PxtoRem from "modules/PxtoRem";
import { FormInput } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
import Button from "components/Commons/Button";
import ResetPwModal from "./ResetPwModal";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ResetFormCard = styled.div`
*{
  font-family:Noto Sans KR,Medium;
  color:#707070;
}
width:100%;
height:max-content;
padding:28px;
display:flex;
justify-content:center;
align-items:center;
.centering{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}
  .contentsBox{
    width:498px;
    height:100%;
    display:flex;
    flex-direction:column;

    .titleBox{
      width:100%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      .title{
        color:black;
        font-size:${market_style.font.size.normal3};
        font-weight:700;
      }
      .explain{
        width:100%;
        font-weight:300;
        margin-top:20px;
        margin-bottom: 10px;
      }
    }
    .row{
      *{
        font-size:${market_style.font.size.small2};
      }
      margin-bottom:13px;
      display:flex;
      .label{
        min-width:104px;
        font-weight:500;
        display:flex;
        align-items:center;
      }
      .red_text{
        color:red;
        cursor:pointer;
      }
    }
    .spaceBetween{
      justify-content:flex-end;
    }
  }
  

  `;

const ResetForm = styled.form`
  input{
    width: calc(100% - ${PxtoRem(100)});
    float: left
  }
  &::after{
    display: block;
    content: "";
    clear: both;
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
  font-weight:300;
`
const CustomButton = styled.div`
  width:${props => props.width}px;
  height:${props => props.height}px;
  border:1px solid ${props => props.borderColor};
  // border-radius:${props => props.borderRadius}px;
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
const SubmitBtn = styled(Button)`
  width: ${PxtoRem(90)};
  margin-left: ${PxtoRem(10)};
`

class ResetPwForm extends Component {

  state = {
    loading: false
  };

  async shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.status) !== JSON.stringify(nextProps.status)) {
      if (nextProps.status === "SUCCESS") {
        this.setState({ loading: false });
        this.props.history.push('./signin');
        console.log("this loading state success >> ", this.state.loading);
        await alert("임시비밀번호가 발급되었습니다. 로그인페이지로 이동합니다.");
        window.location.href="/signin";
      
      } else if (nextProps.status === "FAILURE") {
        this.setState({ loading: false });
        console.log("this loading state failure >> ", this.state.loading);
        await alert(nextProps.message);
      }
    }
    return true;
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
    e.preventDefault();
    ValidationGroup(this.state, true)
      .then(data => {
        
        this.props.FindPwRequest(data);
        this.setState({ loading: true });


      })
      .catch(e => {
        console.log("실패", e);
      });
  };
  render() {
    return (
      // <Bg>
        <ResetFormCard>
        <form className="centering" onSubmit={this.onSubmit}>

           <div className="contentsBox">
              <div className="titleBox">
              <div className="title">비밀번호 찾기</div>
              <div className="explain">비밀번호를 찾고자 하는 아이디를 입력해 주세요.</div>
          </div>
          <ResetForm onSubmit={this.onSubmit}>
            {this.state.loading === true ? <ResetPwModal /> : null}
            <div className="row">
            <div className="label" value={this.state.password}><div>e-mail</div></div>
            <InputTextBox
                  name="email"
                  placeholder="e-mail을 입력해주세요.(ex: abc@opendesign.com)"
                  value={this.state.email}
                  onChange={this.onChangeValue} />
            </div>
            <div className="row spaceBetween">
            <CustomButton onClick={this.onSubmit} width={150} height={30}
                  bgColor={"red"} borderRadius={21} borderColor={"red"} fontColor={"white"}>전송</CustomButton>
            </div>
          </ResetForm>
        </div>

        </form>
        </ResetFormCard>

      // </Bg>
    );
  }
}

export default ResetPwForm;

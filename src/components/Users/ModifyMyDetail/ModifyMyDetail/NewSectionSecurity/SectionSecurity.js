import React, { Component } from "react";
import styled from "styled-components";
import iShowPw from "source/modifymypage_showpw.svg";

const IconDiv = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-image: url(${props => props.icon});
    background-position: center center;
    background-size: cover;
    cursor: pointer;
`;
const Wrapper = styled.div`
  max-width: 1300px;
  border-bottom: 3px solid #707070;

  .section {
    :first-child {
      margin-top: 42px;
    }
    margin-bottom: 38px;

    display: flex;
    flex-direction: row;
    
    .label {
      margin-left: 42px;
      width: max-content;
      height: 33px;
      text-align: left;
      font-weight: bold;
      font-size: 22px;
      line-height: 33px;
      font-family: Spoqa Han Sans;
      letter-spacing: 0px;
      color: #777777;
      opacity: 1;
      min-width: 221px;
    }
    .content {
      display: flex;
      flex-direction: row;
      .showpw {
        margin-left: 24px;
        width: 40px;
        height: 40px;
        }
    }
  }
  .inputText {
    padding-left:20px;
    padding-top: 5px;
    // text-align: center;
    font-weight: 300;
    font-size: 15px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    border: none;
    outline: none;
    background-color: #C9C9C9;
    width: 700px;
    height: 40px;
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
    return (<Wrapper>
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
          {/* <div onClick={this.onClickShowPassword} className="showpw"> */}
          {/* <IconDiv width={40} height={40} icon={iShowPw} /> */}
          {/* </div> */}
        </div>
      </div>
    </Wrapper>);
  }
}
export default SectionSecurity;


{/* <SectionSecurityContainer id="security">
  <div className="pw">
    <div className="text-label" ></div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="input-box" >
        <input   />
      </div>
    </div>
  </div>
  <div className="pw-verify">
    <div className="text-label" ></div>
    <div className="input-box">
      <input/>
    </div>
  </div>
</SectionSecurityContainer> */}
// const SectionSecurityContainer = styled.section`
//   padding-left:47px;
//   .pw {
//     display: flex;
//     justify-content:flex-start;
//     flex-direction:row;
//     .text-label {
//       min-width: 115px;
//       height: 29px;
//       font-size: 20px;
//       line-height: 29px;
//       font-weight: 500;
//       color: #707070;
//       margin-bottom:10px;
//     }
//     .input-box {
//       margin-left: 60px;
//       width: 505.5px;
//       height: 56px;
//       background-color: #EFEFEF;
//       border-radius: 5px;
//       font-size: 20px;
//       line-height: 29px;
//       font-weight: 500;
//       color: #707070;
//     }
//     input {
//       width: 95%;
//       height: 29px;
//       outline: none;
//       border: none;
//       margin-left: 12px;
//       margin-top: 13px;
//       color: #707070;
//       line-height: 29px;
//       background-color: #EFEFEF;
//     }
//     .showpw { 
//       margin-left: 18px;
//       margin-top: 18px;
//     }
//   }
//   .pw-verify {
//     margin-top: 55px;
//     display: flex;
//     justify-content:flex-start;
//     flex-direction:row;
//     .text-label {
//       min-width: 115px;
//       height: 29px;
//       font-size: 20px;
//       line-height: 29px;
//       font-weight: 500;
//       color: #707070;
//       margin-bottom:10px;
//     }
//     .input-box {
//       width: 505.5px;
//       height: 56px;
//       margin-left: 60px;
//       background-color: #EFEFEF;
//       border-radius: 5px;
//       color: #707070;
//       font-size: 20px;
//       font-weight: 500;
//       line-height: 29px;
//     }
//     input {
//       outline: none;
//       border: none;
//       margin-left: 12px;
//       margin-top: 13px;
//       width: 95%;
//       height: 29px;
//       line-height: 29px;
//       color: #707070;
//       background-color: #EFEFEF;
//     }
//   }

//     @media only screen and (min-width : 780px) and (max-width:1440px) {
//       .pw {
//         flex-direction:column;
//         .input-box{
//           margin-left:0px;
//         }
//       }
//       .pw-verify {
//         flex-direction:column;
//         .input-box{
//           margin-left:0px;
//         }
//       }
//     }
//     @media only screen and (min-width : 360px) and (max-width:780px) {
//       .pw {
//         flex-direction:column;
//         .input-box{
//           margin-left:0px;
//           width:80%;
//         }
//       }
//       .pw-verify {
//         flex-direction:column;
//         .input-box{
//           margin-left:0px;
//           width:80%;
//         }
//       }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//         padding:15px;
//         display:flex;
//         flex-direction:column;
//         align-items:center;
//         .pw{
//           width:100%;
//         }
//         .pw-verify{
//           width:100%;
//         }
//     }
// `;
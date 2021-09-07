import React, { Component } from "react";
import styled from "styled-components";
// import opendesign_style from "opendesign_style";

const Wrapper = styled.div`
  max-width: 1300px;
  border-bottom: 3px solid #707070;
  
  .section {
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
    margin-top: 22px;
    margin-bottom: 40px;
  }
  .inputText {
    padding-left:20px;
    padding-top: 5px;
    font-weight: 300;
    font-size: 15px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    border: none;
    outline: none;
    background-color: #C9C9C9;
    width: 300px;
    height: 40px;
  }
  .inputTextareaBox {
    min-width: 260px;
    width: 750px;
    height: 244px;
    padding-left: 20px;
    padding-top: 10px;
    font-weight: 300;
    font-size: 15px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    line-height: 35px;
    outline: none;
    border: none;
    resize: none;
    background-color: #C9C9C9;
  }
`;
class SectionBasic extends Component {
  constructor(props) {
    super(props);
    this.state = { nick: true, nickname: "", introduce: "", }
    this.handleInputNickName = this.handleInputNickName.bind(this);
    this.handleInputIntroduce = this.handleInputIntroduce.bind(this);
    this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      //console.log("MYDETAIL", nextProps.MyDetail.nick_name);
      this.setState({
        nickname: nextProps.MyDetail.nick_name == null ? "" : nextProps.MyDetail.nick_name,
        introduce: nextProps.MyDetail.about_me == null ? "" : nextProps.MyDetail.about_me,
      });
      this.props.updateIntroduce(nextProps.MyDetail.about_me == null ? "" : nextProps.MyDetail.about_me);
      this.props.updateNickName(nextProps.MyDetail.nick_name == null ? "" : nextProps.MyDetail.nick_name);
      return true;
    }
    return true;
  }
  handleInputIntroduce(event) {
    this.setState({ introduce: event.target.value });
    this.props.updateIntroduce(event.target.value);
  }
  handleInputNickName(event) {
    this.setState({ nickname: event.target.value });
    this.props.updateNickName(event.target.value);
  }
  onKeyDownEnter(event) {
    if (event.key === "Enter") {
      document.getElementById("explainBox").focus();
    }
  }
  render() {
    return (<Wrapper>
      <div className="section">
        <div className="label">닉네임</div>
        <div className="content">
          <input
            type="text"
            maxLength="50"
            className="inputText"
            placeholder="닉네임을 입력하세요."
            value={this.state.nickname}
            onChange={this.handleInputNickName}
            onKeyDown={this.onKeyDownEnter}
          />
        </div>
      </div>

      <div className="section">
        <div className="label">자기소개</div>
        <div className="content">
          <textarea
            id="explainBox"
            maxLength="300"
            className="inputTextareaBox"
            placeholder="자기소개를 입력하세요."
            value={this.state.introduce}
            onChange={this.handleInputIntroduce}
          />
        </div>
      </div>

    </Wrapper>);
  }
}
export default SectionBasic;

// <ContentsBox>
// {/* nick */}
// <TitleBox>
//   <div className="title">닉네임</div>
//   
// </TitleBox>
// {/* introduction */}
// <ExplainBox>
//   <div className="title">자기소개</div>

// </ExplainBox>
// </ContentsBox>

// const ContentsBox = styled.div`
//   padding-left: 47px;
//   display:flex;
//   flex-direction:column;
//   .title{
//     min-width: 100px;
//     height: 29px;
//     text-align: left;
//     font-size: 20px;
//     font-weight: 500;
//     line-height: 29px;
//     color: #707070;
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//   padding:15px;
//     .title{
//         margin-bottom:10px;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//       padding:15px;
//       display:flex;
//       flex-direction:column;
//       align-items:center;
//       .title{
//         margin-bottom:10px;
//     }
//   }
// `
// const TitleBox = styled.div`
//   display:flex;
//   margin-top:96px;
//   justify-content:flex-start;
//   flex-direction:row;
//   .inputText{
//     width:505px;
//     height:56px;
//     margin-left:67px;
//     padding-left:22px;
//     padding-right:22px;
//     font-size:20px;
//     font-weight:300;
//     font-family:Noto Sans KR;
//     line-height:29px;
//     color:#707070;
//     border:none;
//     border-radius:5px;
//     outline:none;
//     background-color:#EFEFEF;
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     flex-direction:column;
//     .inputText{
//       margin-left:0px;
//     }

//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     flex-direction:column;
//     .inputText{
//       margin-left:0px;
//       width:100%;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//     flex-direction:column;
//     .inputText{
//       margin-left:0px;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//     flex-direction:column;
//     width:100%;
//     .inputText{
//       margin-left:0px;
//       width:100%;
//     }
//   }
// `
// const ExplainBox = styled.div`
//   margin-top: 103px;
//   display: flex;
//   justify-content:flex-start;
//   flex-direction:row;

//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     flex-direction:column;
//     .inputTextareaBox {
//       margin-left: 0px;
//     }
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     flex-direction:column;

//     .inputTextareaBox {
//       width:100%;
//       margin-left: 0px;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//   width:100%;
//   }
// `
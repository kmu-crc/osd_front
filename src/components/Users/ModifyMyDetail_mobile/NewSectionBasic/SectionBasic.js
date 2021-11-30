import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  .content{
    max-width:360px;
    width:100%;
  }
`
const Profile = styled.div`
  .header{
    width:100%;
    height:40px;
    display:flex;
    align-items:center;
    padding:0px 8px 0px 44px;
    justify-content:space-between;
    .nickname{width:200px;height:38px;font-family:Spoqa Han Sans;font-weight:800;font-size:26px;            
              display:flex;align-items:center;overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
    .button_wrap{display:flex;}
    .button{width:40px;height:26px;box-shadow: 0px 0px 5px 0px #ABABAB;
            display:flex;justify-content:center;align-items:center;font-weight:500;}
    .red{background-color:red;color:white;}
    .grey{background-color:#c2c2c2;color:black;}        
  }
  .main{

    width:100%;
    height:177px;
    background-color:#dcdcdc;
    padding:12px 8px 6px 12px;
    font-family:Spoqa Han Sans;
    .flex{display:flex;}
    .title{width:56px;height:22px;display:flex;align-items:center;
           font-size:15px;font-weight:700;color:#777777;margin-right:12px;}
  }
  .miniText{color:#777777; width:100%;height:11px;text-align:center; font-family:Spoqa Han Sans Neo;font-size:7px;font-size:8px;}

`
const Info = styled.div`
  width:100%;
  font-family:Spoqa Han Sans;
  .title{width:159px;font-size:15px;font-weight:800;}
  .exp_title{width:65px;font-size:15px;font-weight:800;}
  .row{width:100%;margin-top:15px;display:flex;justify-content:space-between;padding:0px 10px;}
  .row2{width:100%;margin-top:15px;display:flex;padding:0px 10px;}
  .checked{width:24px;height:24px;}
  .careerBox{margin-top:25px;}

`
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
    padding:0px 6px;
    border:none;
    outline:none;
`
const InputTextArea = styled.textarea`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    background-color:#c2c2c2;
    padding:6px;
    border:none;
    outline:none;
`



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
    return (
      <React.Fragment>
              <section style={{marginLeft:"12px"}}>
                <div className="flex"><div className="title">닉네임</div>
                <InputText 
                width="174" 
                height="22"
                type="text"
                maxLength="50"
                className="inputText"
                placeholder="닉네임을 입력하세요."
                value={this.state.nickname}
                onChange={this.handleInputNickName}
                onKeyDown={this.onKeyDownEnter}
                /></div>
                <div className="flex" style={{marginTop:"14px"}}><div className="title">자기소개</div>
                <InputTextArea 
                width="174" 
                height="98"
                id="explainBox"
                maxLength="300"
                className="inputTextareaBox"
                placeholder="자기소개를 입력하세요."
                value={this.state.introduce}
                onChange={this.handleInputIntroduce}
                />
                </div>
              </section>
      </React.Fragment>
    );
  }
}
export default SectionBasic;

            //   <Wrapper>
            //   <div className="section">
            //     <div className="label">닉네임</div>
            //     <div className="content">
            //       <input
            //         type="text"
            //         maxLength="50"
            //         className="inputText"
            //         placeholder="닉네임을 입력하세요."
            //         value={this.state.nickname}
            //         onChange={this.handleInputNickName}
            //         onKeyDown={this.onKeyDownEnter}
            //       />
            //     </div>
            //   </div>
  
            //   <div className="section">
            //     <div className="label">자기소개</div>
            //     <div className="content">
            //       <textarea
            //         id="explainBox"
            //         maxLength="300"
            //         className="inputTextareaBox"
            //         placeholder="자기소개를 입력하세요."
            //         value={this.state.introduce}
            //         onChange={this.handleInputIntroduce}
            //       />
            //     </div>
            //   </div>
            // </Wrapper>
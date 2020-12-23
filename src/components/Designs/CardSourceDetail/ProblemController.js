import React, { Component } from 'react';
import styled from 'styled-components';
// import ContentEditable from "./ContentEditable";
import { Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";


const ModalBox = styled(Modal)`
  width:938px;
  padding:57px 63px 57px 63px;
  .closeBox{
    width:100%;
    display:flex;
    padding:10px;
    justify-content:flex-end;
    position:absolute;
    top:0px;
    right:0px;
    .closeIcon{
      cursor:pointer;
      font-size:30px;
    }
  }
  .contentsBox{
    width:100%;
    margin-top:10px;
  }
  .selectBox{
    width:100%;
    display:flex;
    justify-content:flex-end;
    margin-top:20px;
    .selecticon{
      color:red;
      cursor:pointer;
      font-style:underline;
    }
  }
`
const ProblemBox = styled.div`
  width:100%;
  padding:20px;
  .reSelectBox{
    width:100%;
    display:flex;
    justify-content:flex-end;
    .reSelect{
      color:red;
      text-decoration:underline;
      cursor:pointer;
    }
  }
  .titleBox{
    width:100%;
    margin-bottom:8px;
    .title{
      font-size:17px;
      color:#707070;
      border-left:2px solid red;
      padding-left:5px;
    }
  }
  .boardBox{
    width:100%;
    background-color:#EFEFEF;
    padding:10px;
    margin-bottom:35px;
    .board{
      font-size:15px;
      color:#707070;
    }
  }
`
const Wrapper = styled.div`
  width:100%;
  height:max-content;
  .pagena{
    margin-top:66px;
  }
  .headline{
    font-family:Noto Sans CJK KR,Medium;
    font-size:20px;
    color:#707070;
    margin-bottom:18px;
  }
  .headerBox{
    width:100%;
    padding-top:12px;
    padding-bottom:12px;
    display:flex;
    background-color:#EFEFEF;
    .th{
      width:25%;
      padding-left:20px;
      padding-right:20px;
      font-size:17px;
      font-weight:500;
      color:#707070;
    }
  }
  .contentsBox{
    width:100%;
    padding-top:12px;
    padding-bottom:12px;
    display:flex;
    border-bottom:1px solid #D6D6D6;
    .td{
      width:25%;
      padding-left:20px;
      padding-right:20px;
      font-weight:300;
    }
    .cursor_pointer{
      cursor:pointer;
    }
  }
`;

class ProblemController extends Component {
  constructor(props) {
    super(props);
    this.state={
      show:false,selectNum:null,contents:null,contentsString:"",
    }
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal=this.handleCloseModal.bind(this);
    this.handleSelectProblem=this.handleSelectProblem.bind(this);
  }
  componentDidMount(){
    try {
      this.props.item.content &&
        this.setState({
          selectNum:JSON.parse(this.props.item.content).id,
          contents:JSON.parse(this.props.item.content)||""
          // url: JSON.parse(this.props.item.content).url || "",
          // description: JSON.parse(this.props.item.content).description || ""
        });
    } catch (_) {
      this.setState({ selectNum:null,contents:null});
    }
  }
  handleSelectProblem = async ()=>{
    let {item} = this.props;
    // item.content = {...this.state.contents};
    item.content= JSON.stringify({
      id: this.state.contents&&this.state.contents.id,
      problem_type: this.state.contents&&this.state.contents.problem_type,
      time: this.state.contents&&this.state.contents.time,
      name: this.state.contents&&this.state.contents.name,
      contents: this.state.contents&&this.state.contents.contents
      })
    await this.setState({selectNum:this.state.contents.id,show:false});
    await this.props.getValue(item);
    this.props.openModal(false);
  }
  handleShowModal=async(uid)=>{
    // this.props.UpdateAnswerRequest(this.props.token,{user_id:1028,problem_id:3,language_id:1,order:2,code:"#include<stdio.h>",result:true});
    await this.props.getProblemDetailRequest(uid).then(()=>{
      const result = `ID:${this.props.ProblemDetail&&this.props.ProblemDetail.id}</br>
      TYPE:${this.props.ProblemDetail&&this.props.ProblemDetail.problem_type}</br>
      TIME:${this.props.ProblemDetail&&this.props.ProblemDetail.time}</br>
      NAME:${this.props.ProblemDetail&&this.props.ProblemDetail.name}</br>
      CONTENTS:${this.props.ProblemDetail&&this.props.ProblemDetail.contents}`
      this.setState({show:true,contents:this.props.ProblemDetail});
    })
    
  }
  handleCloseModal=()=>{
    this.setState({show:false});
  }
  render() {
    const {ProblemList} = this.props;
    console.log(this.state);
    return (
      <React.Fragment>
      <ModalBox open={this.state.show}>
        <div className="closeBox"> <Cross onClick={this.handleCloseModal} angle={45} color={"#707070"} weight={1} width={33} height={33} /></div>
        <ProblemBox>
          <div className="titleBox"><div className="title">제목</div></div>
          <div className="boardBox"><div className="board">{this.state.contents&&this.state.contents.name}</div></div>
          <div className="titleBox"><div className="title">내용</div></div>
          <div className="boardBox"><div className="board">{this.state.contents&&this.state.contents.contents}</div></div>
          <div className="titleBox"><div className="title">조건</div></div>
          <div className="boardBox"><div className="board">
            제한시간:{this.state.contents&&this.state.contents.time} / 
            문제유형:{this.state.contents&&this.state.contents.problem_type}
          </div></div>
        </ProblemBox>
        <div className="selectBox"><div className="selecticon" onClick={this.handleSelectProblem}>선택</div></div>
      </ModalBox>
      <Wrapper>
      {this.props.open!=true?
        <React.Fragment>
        <ProblemBox>
          <div className="titleBox"><div className="title">제목</div></div>
          <div className="boardBox"><div className="board">{this.state.contents&&this.state.contents.name}</div></div>
          <div className="titleBox"><div className="title">내용</div></div>
          <div className="boardBox"><div className="board">{this.state.contents&&this.state.contents.contents}</div></div>
          <div className="titleBox"><div className="title">조건</div></div>
          <div className="boardBox"><div className="board">
            제한시간:{this.state.contents&&this.state.contents.time} / 
            문제유형:{this.state.contents&&this.state.contents.problem_type}
          </div></div>
          <div className="reSelectBox"><div onClick={()=>this.props.openModal(true)} className="reSelect">다시 선택하기</div></div>
        </ProblemBox>
        </React.Fragment>
        :
        <React.Fragment>
        <div className="headerBox">
          <div className="th">uid</div>
          <div className="th">name</div>
          <div className="th">type</div>
          <div className="th">time</div>
        </div>
      
          {ProblemList&&ProblemList.map((item,index)=>{
            return(
              <div className="contentsBox" key={index}>
                <div className="td">{item.id}</div>
                <div className="td cursor_pointer" onClick={()=>this.handleShowModal(item.id)}>{item.name}</div>
                <div className="td">{item.problem_type}</div>
                <div className="td">{item.time}</div>
              </div>
            );
          })}
          </React.Fragment>
  
        }
      </Wrapper>
      </React.Fragment>
    )
  }
}

export default ProblemController;
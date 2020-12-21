import React, { Component } from 'react';
import styled from 'styled-components';
// import ContentEditable from "./ContentEditable";
import { Modal } from "semantic-ui-react";
const ModalBox = styled(Modal)`
  padding:20px;
  .closeBox{
    width:100%;
    display:flex;
    justify-content:flex-end;
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
const Wrapper = styled.div`
  width:100%;
  height:max-content;
  border:1px solid black;
  .headerBox{
    width:100%;
    padding-top:10px;
    padding-bottom:10px;
    display:flex;
    .th{
      width:25%;
      padding-left:20px;
      padding-right:20px;
      font-weight:500;
    }
  }
  .contentsBox{
    width:100%;
    padding-top:10px;
    padding-bottom:10px;
    display:flex;
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
      <div className="closeBox"><div className="closeIcon" onClick={this.handleCloseModal}>x</div></div>
      <div className="contentsBox" dangerouslySetInnerHTML={{__html:
      `ID:${this.state.contents&&this.state.contents.id}</br>
      TYPE:${this.state.contents&&this.state.contents.problem_type}</br>
      TIME:${this.state.contents&&this.state.contents.time}</br>
      NAME:${this.state.contents&&this.state.contents.name}</br>
      CONTENTS:${this.state.contents&&this.state.contents.contents}`
      }}>
      {/* <div>ID:{this.props.ProblemDetail&&this.props.ProblemDetail.id}</div>
      <div>TYPE:{this.props.ProblemDetail&&this.props.ProblemDetail.problem_type}</div>
      <div>TIME:{this.props.ProblemDetail&&this.props.ProblemDetail.time}</div>
      <div>NAME:{this.props.ProblemDetail&&this.props.ProblemDetail.name}</div>
      <div>CONTENTS:{this.props.ProblemDetail&&this.props.ProblemDetail.contents}</div> */}
      </div>
      <div className="selectBox"><div className="selecticon" onClick={this.handleSelectProblem}>선택</div></div>
    </ModalBox>
    <Wrapper>
    {this.state.selectNum!=null?
      <React.Fragment>
        <div dangerouslySetInnerHTML={{__html:
              `ID:${this.state.contents&&this.state.contents.id}</br>
              TYPE:${this.state.contents&&this.state.contents.problem_type}</br>
              TIME:${this.state.contents&&this.state.contents.time}</br>
              NAME:${this.state.contents&&this.state.contents.name}</br>
              CONTENTS:${this.state.contents&&this.state.contents.contents}`
        }}></div>
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
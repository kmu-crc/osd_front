import React, { Component } from 'react';
import styled from 'styled-components';
// import ContentEditable from "./ContentEditable";
import { Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";
import { PdfViewer } from './PDFviewer';
import { alert } from "components/Commons/Alert/Alert";
import { Pagination } from 'semantic-ui-react';
import { Dropdown } from "semantic-ui-react";


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
    justify-content:center;
    margin-top:20px;
    .selecticon{
      color:red;
      cursor:pointer;
      font-style:underline;
      padding-right:10px;
      padding-left:10px;
    }
    .cancel{
      color:#707070;
      cursor:pointer;
      padding-right:10px;
      padding-left:10px;
    }
  }


`
const SelectBox = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  margin-top:20px;
  .selecticon{
    color:red;
    cursor:pointer;
    font-style:underline;
    font-weight:500;
    padding-right:10px;
    padding-left:10px;
  }
  .cancel{
    color:#707070;
    cursor:pointer;
    font-weight:500;
    padding-right:10px;
    padding-left:10px;
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
    .title_{
      font-size:15px;
      color:#707070;
      border-left:2px solid red;
      font-weight:500;
      padding-left:5px;
    }
  }
  .boardBox{
    width:100%;
    background-color:#EFEFEF;
    padding:18px 11px;
    margin-bottom:35px;
    .board{
      font-size:15px;
      color:#707070;
    }
  }
`
const CategoryDropDown = styled(Dropdown)`
// width:410px;
// height:56px;     
// border-radius:5px;
// font-size:20px;
// background-color:#EFEFEF !important;
// margin-right:30px;
margin-bottom:10px;
`
const Wrapper = styled.div`
  width:100%;
  height:max-content;
  .category_box{
    width:100%;
  }
  .pagena{
    margin-top:66px;
  }
  .headline{
    font-family:Noto Sans KR;
    font-weight: 700;
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
    .one{width:20%;}
    .two{width:70%;}
    .three{width:10%;}
    .th{
      padding-left:20px;
      padding-right:20px;
      font-size:17px;
      font-weight:500;
      color:#707070;
      display:flex;
      justify-content:center;
      text-align:center;
    }
  }
  .contentsBox{

    width:100%;
    padding-top:12px;
    padding-bottom:12px;
    display:flex;
    border-bottom:1px solid #D6D6D6;
    .one{width:20%;}
    .two{width:70%;}
    .three{width:10%;}
    .td{
      padding-left:20px;
      padding-right:20px;
      font-weight:300;
      display:flex;
      justify-content:center;
      text-align:center;
    }
    .cursor_pointer{
      cursor:pointer;
    }
    &:hover{
      background-color:#d6d6d6;
    }
  }
`;

class ProblemController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, selectNum: null, contents: null, contentsString: "",page:1,
    }
    // this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSelectProblem = this.handleSelectProblem.bind(this);
    this.handleAddProblem = this.handleAddProblem.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleChangeCategory=  this.handleChangeCategory.bind(this);
  }
  componentDidMount() {
    try {
      this.props.item.content &&
        this.setState({
          selectNum: JSON.parse(this.props.item.content).id,
          contents: JSON.parse(this.props.item.content) || ""
        });
    } catch (_) {
      this.setState({ selectNum: null, contents: null });
    }
  }
  selectPage=(e,{activePage})=>{
    this.setState({page:activePage});
    this.props.getProblemListRequest(activePage);
  }
  handleChangeCategory = async(event, { value })=>{
    await this.setState({page:1});
    if({value}.value==0){
      await this.props.getProblemListRequest(1);
    }else{
      await this.props.getProblemListFilterRequest({value}.value);
    }
  }
  handleSelectProblem = async (uid) => {
    await this.props.getProblemDetailRequest(uid).then(async() => {
      // let { item } = this.props;
      // const {ProblemDetail} = this.props;
      // item.content = JSON.stringify({
      //   id: ProblemDetail && ProblemDetail.id,
      //   problem_type: ProblemDetail && ProblemDetail.problem_type,
      //   time: ProblemDetail.contents && ProblemDetail.time,
      //   name: ProblemDetail.contents && ProblemDetail.name,
      //   contents: ProblemDetail.contents && ProblemDetail.contents
      // })
      await this.setState({ selectNum: uid, show: false });
    })

  }
  handleAddProblem = async (uid) =>{
    let { item } = this.props;
    const {ProblemDetail} = this.props;
    item.content = JSON.stringify({
      id: ProblemDetail && ProblemDetail.id,
      problem_type: ProblemDetail && ProblemDetail.problem_type,
      time: ProblemDetail.contents && ProblemDetail.time,
      name: ProblemDetail.contents && ProblemDetail.name,
      contents: ProblemDetail.contents && ProblemDetail.contents
    })
      await this.props.getValue(item);
      this.props.openModal(false);
  }
  // handleShowModal = async (uid) => {
  //   // this.props.UpdateAnswerRequest(this.props.token,{user_id:1028,problem_id:3,language_id:1,order:2,code:"#include<stdio.h>",result:true});
  //   await this.props.getProblemDetailRequest(uid).then(() => {
  //     const result = `ID:${this.props.ProblemDetail && this.props.ProblemDetail.id}</br>
  //     TYPE:${this.props.ProblemDetail && this.props.ProblemDetail.problem_type}</br>
  //     TIME:${this.props.ProblemDetail && this.props.ProblemDetail.time}</br>
  //     NAME:${this.props.ProblemDetail && this.props.ProblemDetail.name}</br>
  //     CONTENTS:${this.props.ProblemDetail && this.props.ProblemDetail.contents}`
  //     this.setState({ show: true, contents: this.props.ProblemDetail });
  //   })

  // }
  handleShowModal = async (uid) => {
    await this.props.getProblemDetailRequest(uid).then(() => {
      const result = `ID:${this.props.ProblemDetail && this.props.ProblemDetail.id}</br>
      TYPE:${this.props.ProblemDetail && this.props.ProblemDetail.problem_type}</br>
      TIME:${this.props.ProblemDetail && this.props.ProblemDetail.time}</br>
      NAME:${this.props.ProblemDetail && this.props.ProblemDetail.name}</br>
      CONTENTS:${this.props.ProblemDetail && this.props.ProblemDetail.contents}`
      this.setState({ show: true,selectNum: uid, contents: this.props.ProblemDetail });
    })
  }
  handleCloseModal = async () => {
    this.setState({show:false});
  }
  render() {
    const { ProblemList } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <ModalBox open={this.state.show}>
          <div className="closeBox"> <Cross onClick={this.handleCloseModal} angle={45} color={"#707070"} weight={1} width={33} height={33} /></div>
          <ProblemBox>
            <div className="boardBox">
              <div className="board">
                {this.state.contents &&
                  <PdfViewer pdf={this.state.contents.contents} />}
              </div>
            </div>
          </ProblemBox>
        </ModalBox>
        <Wrapper>
          {this.props.open != true ?
            <React.Fragment>
              <ProblemBox>
                <div className="titleBox"><div className="title_" >제목</div></div>
                <div className="boardBox"><div className="board">{this.state.contents && this.state.contents.name}</div></div>
                <div className="titleBox"><div className="title_" >내용</div></div>
                <div className="boardBox">
                  <div className="board">
                    {this.state.contents &&
                      <PdfViewer pdf={this.state.contents.contents} />}
                  </div>
                </div>
              </ProblemBox>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="category_box">
                      <CategoryDropDown
                      selection
                      defaultValue={0}
                      options={this.props.Category}
                      onChange={this.handleChangeCategory}
                      />
              </div>
              <div className="headerBox">
                <div className="th one">번호</div>
                <div className="th two">제목</div>
                <div className="th three">PDF</div>
              </div>

              {ProblemList &&
                ProblemList.length > 0 &&
                ProblemList.map((item, index) => {
                  return (
                    item.id == this.state.selectNum ?
                    <div className="contentsBox" style={{backgroundColor:"#FFE4E1"}} key={index} >
                      <div className="td one" >{30*(this.state.page-1)+index+1}</div>
                      <div className="td two cursor_pointer" onClick={() => this.handleSelectProblem(item.id)}>{item.name}</div>
                      <div className="td three cursor_pointer" onClick={() => this.handleShowModal(item.id)}>보기</div>
                    </div>
                    :
                    <div className="contentsBox"  key={index}>
                    <div className="td one" >{30*(this.state.page-1)+index+1}</div>
                    <div className="td two cursor_pointer"   onClick={() => this.handleSelectProblem(item.id)}>{item.name}</div>
                    <div className="td three cursor_pointer" onClick={() => this.handleShowModal(item.id)}>보기</div>
                  </div>
                  );
                })}
              <SelectBox>
              <Pagination 
              activePage={this.state.page} 
              // defaultActivePage={1} 
              totalPages={this.props.ProblemCount/30} 
              onPageChange={this.selectPage}/>
              </SelectBox>
              <SelectBox>
                <div className="selecticon" onClick={async () => {
                  this.state.selectNum == null? await alert("문제를 선택하세요", "확인"):this.handleAddProblem(this.state.selectNum)
                }}>등록</div>
                <div className="cancel" onClick={()=>{
                  this.setState({selectNum:null,contents:""});
                  this.props.onCloseModal();
                }}>취소</div>
              </SelectBox>
            </React.Fragment>

          }
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default ProblemController;
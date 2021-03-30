import React, { Component } from 'react';
import styled from 'styled-components';
// import market_style from "market_style";
import { Modal, Dropdown, Pagination } from "semantic-ui-react";
import host from "config";
import Cross from "components/Commons/Cross";
import { FileController, CodingAddContent } from "components/Commons/InputItem";
import { PdfViewer } from "components/Items/ItemDetail/PdfViewer";
import Loading from "components/Commons/Loading";
// FOR EDITOR
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import { confirm } from "components/Commons/Confirm/Confirm";

const Wrap = styled.div`
 
`;
const ModalBox = styled(Modal)`
  width:938px;
  height:max-content;
  padding:57px 63px 57px 63px;
  position:relative;
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
`;
const ListContainer = styled.div`
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
const CategoryDropDown = styled(Dropdown)`
  // width:410px;
  // height:56px;     
  // border-radius:5px;
  // font-size:20px;
  // background-color:#EFEFEF !important;
  // margin-right:30px;
  margin-bottom:10px;
`;
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
`;
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
`;
const Viewer = styled.div`
`;
const CodingContainer = styled.div`
.title {
  font-size: 20px;
  line-height: 29px;
  font-weight: 500;
  color: #707070;
  margin-top: 10px;
}

.language {
  margin-top: 38px;
  display: flex;
  flex-direction: row;
  item-align: center;

  .label {
    font: normal normal normal 18px/29px Noto Sans KR;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1; 
  }
  .combo-box {
    font: normal normal normal 17px/29px Noto Sans KR;
    color:#707070;
    margin-left: 20px;
  }
}
.coding-area {
  *{
    // font-family: monospace !important;
  }
  margin-top: 26px;
  .tab {
    display: flex;
    flex-direction: row;
    width: max-content;
    font: normal normal normal 18px/29px Noto Sans KR;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
    background-color:#EFEFEF;
    .blank{
      border:1px solid black;
      width:100%;
      height:100%;
    }
    .label {
      color:#707070;
      opacity:0.5;
      padding:10px;
      cursor: pointer;

      :hover {
        // background-color: #707070;
      }
      &.active {
        // background-color: #707070;
        opacity:1;
        background-color:white;
        border-top:1px solid #d6d6d6;
        border-left:1px solid #d6d6d6;
        border-right:1px solid #d6d6d6;
      }

    }
  }
  .editor {
    margin-top: 16px;
    width: 100%;
    height: 480px;
    overflow-y:auto;
    border:1px solid #efefef;
    background: #E9E9E9 0% 0% no-repeat padding-box;
    opacity: 1;
  }
}
.button-wrapper {
  margin: auto;
  margin-top: 34px;
  width: max-content;
  display: flex;
  flex-direction: row;

  .btn {
    cursor: pointer;
    font-weight: 700;
    width: max-content;
    height: 29px;
    opacity: 1;
    letter-spacing: 0px;
    font-size: 20px;
    line-height: 29px;
  }
  .submit {
    color: #FF0000;
  }
  .cancel {
    color: #707070;
    margin-left: 47.5px;
  }
}
`;
const SubmitResultModal = styled(Modal)`
    width: 873px;
    height: max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    opacity: 1;
    position: relative;
    padding: 60px 50px 37px 50px;
    margin: auto;
    font-family: Noto Sans KR;

    .close-box {
      width: max-content;
      cursor: pointer;
      position: absolute;
      top: 16px;
      right: 16px; 
    }

    .title {
      font-size: 20px;
      line-height: 29px;
      font-weight: 500;
      color: #707070;
    }
    .content_box{
      display:flex;
      margin-top:30px;
      .name{
        font-size: 20px;
        line-height: 29px;
        font-weight: 300;
        color: #707070;
      }
      .codeBox{
        margin-top:28px;
        border:1px solid #EFEFEF;
        width:100%;
        padding:20px;
      }
      .msg{
        font-size: 20px;
        line-height: 29px;
        font-weight: 500;
        color: #707070;
        margin-left:39px;
      }
      .font_green{
        color:green;
      }
      .font_red{
        color:red;
      }
    }
    .button-wrapper{
      display:flex;
      justify-content:center;
      margin-top:80px;
      .close{
        font-size:18px;
        color:red;
        font-weight:500;
        cursor:pointer;
      }
    }
`;
const ControllerWrap = styled.div`
  position: relative;
  width: 100%;
  &:hover {
    border: 1px dashed #E1E4E6;
    background-color: #F8FAFB;
    .editBtn {
      display: block;
    }
  }
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;
const FileName = styled.input` 
  width:100%;
  height:29px;
  display:flex;
  align-items:center;
  outline:none;
  border:0px;
  background-color:#efefef;
  font-size:15px;
`;
const UpBtn = styled.button`
 display: none;
 position: absolute;
 top: 0;
 left: 85%;
 transform: translate(-50%, 0%);
 border: 0;
 padding: 0;
 width: 45px;
 height: 45px;
 border-radius: 25px;
 line-height: 25px;
 box-sizing: border-box;
 font-size: 12px;
 background-color: blue;
 color: white;
 text-align: center;
 box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
 outline: 0;
 i.icon {
   margin: 0;
 }
 &:focus .subMenu {
   display: block;
 }
`;
const DownBtn = styled.button`
 display: none;
 position: absolute;
 top: 0;
 left: 90%;
 transform: translate(-50%, 0%);
 border: 0;
 padding: 0;
 width: 45px;
 height: 45px;
 border-radius: 25px;
 line-height: 25px;
 box-sizing: border-box;
 font-size: 12px;
 background-color: blue;
 color: white;
 text-align: center;
 box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
 outline: 0;
 i.icon {
   margin: 0;
 }
 &:focus .subMenu {
   display: block;
 }
`;
const DelBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 95%;
  transform: translate(-50%, 0%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: #E72327;
  color: white;
  text-align: center;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  outline: 0;
  i.icon {
    margin: 0;
  }
  &:focus .subMenu {
    display: block;
  }
`;
export class ProblemController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [], page: 1, total: 0, selectNum: null, submit: false, loading: false, tab: "code", coding: [], lang: null,
    };
    this.getCategory = this.getCategory.bind(this);
    this.getList = this.getList.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.handleSelectProblem = this.handleSelectProblem.bind(this);
    this.handleShowDetail = this.handleShowDetail.bind(this);
    this.IsJsonString = this.IsJsonString.bind(this);
    this.cancelSubmit = this.cancelSubmit.bind(this);
    this.moveCoding = this.moveCoding.bind(this);
    this.onAddCoding = this.onAddCoding.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onDeleteCoding = this.onDeleteCoding.bind(this);
    this.onChangeCodingFile = this.onChangeCodingFile.bind(this);
  }

  IsJsonString(str) {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    }
  }
  componentDidMount() {
    if (this.props.item.notyet) {
      this.getLanguage();
      this.getCategory();
      this.getList();
    }
  }
  getLanguage() {
    getProblemLanguageListRequest()
      .then(data => {
        console.log(data);
      });
    // this.setState({ lang: data.results }))
  }
  getCategory() {
    getProblemCategoryRequest() // {"count":3,"next":null,"previous":null,"results":[{"id":3,"category_name":"string"},{"id":2,"category_name":"C/C++"},{"id":1,"category_name":"문법"}]}
      .then(data => this.setState({ cate: data.results })) // 0: {id: 3, category_name: "string"} 1: {id: 2, category_name: "C/C++"} 2: {id: 1, category_name: "문법"} .catch(e => alert(e))
  }
  getList() {
    const { page } = this.state;
    getlistRequest(page)
      .then(data => this.setState({ list: data.results, total: data.count }))
      .catch((e) => this.setState({ list: [], loading: false, error: e }))
  }
  async handleChangeCategory(event, { value }) {
    await this.setState({ page: 1 });
    if ({ value }.value == 0) {
      this.getList();
    } else {
      await getProblemListFilterRequest({ value }.value);
    }
  }
  handleSelectProblem = async (id) => {
    // await getProblemDetailRequest(id).then(async () => {
    // let { item } = this.props;
    // const {ProblemDetail} = this.props;
    // item.content = JSON.stringify({
    //   id: ProblemDetail && ProblemDetail.id,
    //   problem_type: ProblemDetail && ProblemDetail.problem_type,
    //   time: ProblemDetail.contents && ProblemDetail.time,
    //   name: ProblemDetail.contents && ProblemDetail.name,
    //   contents: ProblemDetail.contents && ProblemDetail.contents
    // })
    await this.setState({ selectNum: id });
    // })
  };
  async selectPage(e, { activePage }) {
    await this.setState({ page: activePage });
    this.getList();
  };
  handleShowDetail = (id) => {
    getProblemDetailRequest(id).then(async (data) => {
      await this.setState({ detail: data });
      console.log(this.state.detail);
    })
  };
  handleAddProblem = async (id) => {
    getProblemDetailRequest(id).then(async (data) => {
      const { id, problem_type, time, name, contents } = data;
      const obj = { content: JSON.stringify({ id, problem_type, time, name, contents }) };
      this.props.getValue(obj);
      this.props.confirmed();
    })
  };
  onCancel() {
    // this.props.onCancel();
  };
  cancelSubmit() {
    this.setState({ submit: false });
  }
  submit() {
    if (this.state.coding.length <= 0) return;
    let datalist = [];
    const _item = this.props.item;
    const item_user = this.props.item.user_id;
    const arr = this.state.coding.map(async (item, index) => {

      return new Promise(async (resolve, reject) => {
        let data = { type: item.type, content: "", file_name: "", order: index };
        console.log("DEBUG", item);
        if (item.type == "TEXT") {
          data.file_name = item.name;
          data.code = item.content;
          resolve(data);
        } else {
          let charset = null;
          const formData = new FormData();
          await formData.append('source', item.file[0]);
          fetch(`${host}/upload/detect-encoding`, {
            header: { 'Content-Type': 'multipart/form-data' },
            method: "POST",
            body: formData,
          }).then(res => res.json())
            .then(encoding => {
              if (encoding) {
                charset = encoding.charset.encoding;
              }
              const fileReader = new FileReader();
              fileReader.onloadend = () => {
                const res = fileReader.result;
                data.file_name = item.file[0].name;
                data.code = res;
                resolve(data)
              }
              fileReader.readAsText(item.file[0], charset || "UTF-8");
            })
            .catch(err => {
              reject(err)
            });
        }
      }).then((data) => {
        datalist.push(data);
        console.log(datalist);
      })

    })
    Promise.all(arr)
      .then(() => {
        //정렬
        return datalist.sort((a, b) => {
          return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
        })
      }).then(async () => {
        const __ = JSON.stringify({
          user_id: this.props.userInfo.uid,
          problem_id: JSON.parse(_item.content).id,
          language_id: 1,//this.props.itemDetail.category_level3 || 1,
          answer: JSON.stringify(datalist),
          content_id: _item.uid,
        });
        await this.setState({ loading: true, });
        let ntry = 10;
        fetch(`${host}/item/problem/submit`, {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "x-access-token": this.props.token
          },
          method: "POST",
          body: JSON.stringify({
            user_id: this.props.userInfo.uid,
            problem_id: JSON.parse(_item.content).id,
            language_id: 1,//this.props.itemDetail.category_level3 || 1,
            answer: JSON.stringify(datalist),
            content_id: _item.uid,
          })
        }).then(res => res.json())
          .then(res => {

            if (res.success) {
              const check = () => {
                this.setState({ loading: true, });
                fetch(`${host}/item/problem/result-request2/${res.id}`, {
                  headers: { 'Content-Type': 'application/json' },
                  method: "GET",
                })
                  .then(res1 => res1.json())
                  .then(res1 => {
                    if (res1.result) {
                      this.setState({ result: res1 });
                      ntry = 0;
                      this.setState({ loading: false });
                    }
                  })
                  .catch(e => {
                    console.error(e);
                    return;
                  });
                if (ntry-- > 0)
                  setTimeout(check, 1500);
              };
              check();
            } else {
              alert('제출에 실패하였습니다.');
              this.setState({ loading: false });
              return;
            }
          })
          .catch(e => console.error(e));
        this.setState({ loading: false });
      });
    // }
  }
  // coding content
  async moveCoding(A, B) {
    await console.log(this.state.coding);
    if (!this.state.coding) {
      return;
    }
    const copy = [...this.state.coding];
    [copy[A], copy[B]] = [copy[B], copy[A]];
    console.log(A, B);

    copy.map((ele, index) => {

      if (ele.order !== index) {
        ele.order = index;
      }
      return ele;
    })
    await this.setState({ coding: copy });
    await console.log(this.state.coding);
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.coding);
    return;
  }
  async onAddCoding(data) {
    let copyContent = [...this.state.coding];
    let copyData = { ...data };
    copyData.initClick = true;
    for (let item of copyContent) {
      if ((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1, null);
      }
    }
    await console.log(this.state.coding);
    await copyContent.splice(copyData.order, 0, copyData);
    let newContent = copyContent.filter((item) => { return item !== null })
    newContent = await Promise.all(
      newContent.map(async (item, index) => {
        item.order = await index;
        delete item.target;
        if (item.type === "FILE") delete item.initClick;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    await console.log(newContent);

    await this.setState({ coding: newContent });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.coding);
  }
  async onChangeFileName(data, order) {
    let copyContent = [...this.state.coding];
    copyContent[order].name = data;
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.coding);
    console.log(this.state.coding);
    this.setState({ coding: copyContent });

  }
  async onChangeCode(data, order) {
    console.log("onChangeCode", data, order);
    let copyContent = [...this.state.coding];
    copyContent[order].content = data;
    console.log(this.state.coding, copyContent)
    this.setState({ coding: copyContent });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.coding);
  }

  async onDeleteCoding(order) {
    if (await confirm("선택하신 컨텐츠를 삭제하시겠습니까?", "예", "아니오") === false) {
      return;
    }
    let copyContent = [...this.state.coding];
    for (var i = 0; i < copyContent.length; i++) {
      if (copyContent[i].order === order) {
        copyContent.splice(i, 1);
      }
    }
    for (i = 0; i < copyContent.length; i++) {
      copyContent[i].order = i;
    }
    await this.setState({ coding: copyContent });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.coding);
  }
  async onChangeCodingFile(data) {
    // await this.setState({ loading: !this.state.loading });
    let copyContent = [...this.state.coding];
    delete data.initClick;
    delete data.target;
    await copyContent.splice(data.order, 1, data);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        return item;
      })
    );
    await this.setState({ coding: copyContent });
    // await this.setState({ loading: !this.state.loading });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.coding);
  }

  render() {
    const { item } = this.props;
    const { cate, total, page, list, tab, selectNum, detail, coding, submit, loading, result, lang, } = this.state;
    return (
      <Wrap>
        {/* modal */}
        {item.notyet
          ? <ModalBox open={true} closeOnDimmerClick={true}>
            {/* close */}
            <div className="closeBox">
              <Cross onClick={() => this.onCancel()} angle={45} color={"#707070"} weight={1} width={33} height={33} />
            </div>
            {detail
              ? /* detail */
              <React.Fragment>
                <h3>문제보기</h3>
                <div>
                  <ProblemBox>
                    <div className="boardBox">
                      <div className="board">
                        {detail.contents &&
                          <PdfViewer height={true} pdf={detail.contents} />}
                      </div>
                    </div>
                  </ProblemBox>
                </div>
                <SelectBox>
                  <div className="cancel" onClick={() => this.setState({ detail: null })}>뒤로</div>
                </SelectBox>
              </React.Fragment>
              : /* list */
              <React.Fragment>
                <h3>문제목록</h3>
                <ListContainer>
                  <div className="category_box">
                    {cate ?
                      <CategoryDropDown
                        selection
                        defaultValue={0}
                        options={cate}
                        onChange={this.handleChangeCategory}
                      />
                      : null}
                  </div>
                  <div className="headerBox">
                    <div className="th one">번호</div>
                    <div className="th two">제목</div>
                    <div className="th three">PDF</div>
                  </div>

                  {list && list.length > 0 &&
                    list.map((item, index) => {
                      return (<div className="contentsBox" style={{ backgroundColor: item.id == selectNum ? "#FFE4E1" : "" }} key={index} >
                        <div className="td one" >{30 * (page - 1) + index + 1}</div>
                        <div className="td two cursor_pointer" onClick={() => this.handleSelectProblem(item.id)}>{item.name}</div>
                        <div className="td three cursor_pointer" onClick={() => this.handleShowDetail(item.id)}>보기</div>
                      </div>);
                    })}
                  <SelectBox>
                    <Pagination
                      activePage={page}
                      // defaultActivePage={1} 
                      totalPages={total / 30}
                      onPageChange={this.selectPage} />
                  </SelectBox>
                  <SelectBox>
                    <div className="selecticon" onClick={async () => {
                      selectNum == null ? await alert("문제를 선택하세요", "확인") : this.handleAddProblem(selectNum)
                    }}>등록</div>
                    <div className="cancel" onClick={() => {
                      // this.setState({ selectNum: null, contents: "" });
                      this.props.onCancel();
                      // this.props.onCloseModal();
                    }}>취소</div>
                  </SelectBox>
                </ListContainer>
              </React.Fragment>}
          </ModalBox>
          : null}

        {result
          ? <SubmitResultModal open={result ? true : false} closeOnDimmerClick={true}>
            {/* close */}
            <div className="close-box">
              <Cross onClick={() => this.setState({ result: null })} angle={45} color={"#707070"} weight={1} width={33} height={33} />
            </div>

            {/*  */}
            <div className="title">문제</div>
            <div className="content_box">
              <div className="name">제출 언어: </div>
              <div className="msg">

                {result.problem_id ? result.problem_id : "-_-'"}
                {/* {this.props.DesignDetail ? this.props.DesignDetail.category_level3 === 1 ? "C/C++" : this.props.DesignDetail.category_level3 === 2 ? "Python" : "etc." : null} */}
              </div>
            </div>
            <div className="content_box">
              <div className="name">제출 결과 </div>
              {result.result === "S"
                ? <div className="msg font_green">성공</div>
                : result.result === "F" ? <div className="msg font_red">실패</div>
                  : result.result === "T" ? <div className="msg font_red">실패(시간초과)</div>
                    : result.result === "M" ? <div className="msg font_red">실패(메모리초과)</div>
                      : result.result === "C" ? <div className="msg font_red">실패(컴파일에러)</div>
                        : result.result === "R" ? <div className="msg font_red">실패(런타임에러)</div>
                          : result.result === "E" ? <div className="msg font_red">실패(서버에러)</div>
                            : result.result === "P" ? <div className="msg font_red">실패(문제에러)</div>
                              : <div className="msg font_red">실패</div>}
            </div>

            <div className="content_box"> <div className="msg">{result.message}</div> </div>

            <div className="button-wrapper">
              <div className="close"
                onClick={() => this.setState({ result: false, submit: true, loading: false })} >확인</div>
            </div>
          </SubmitResultModal>
          : null}

        {submit
          ? <ModalBox open={submit} onClose={() => this.setState({ submit: !submit })}>
            {/* close */}
            <div className="closeBox">
              <Cross onClick={() => this.onCancel()} angle={45} color={"#707070"} weight={1} width={33} height={33} />
            </div>
            {/*  */}
            {loading ? <Loading msg="문제를 제출 중입니다." /> : null}
            {/*  */}
            <CodingContainer>

              <div className="title">{item.name}</div>
              <div className="language">
                <div className="label">제출 언어</div>
                <div className="combo-box">
                  {this.props.itemDetail &&
                    this.props.itemDetail.category_level3 == 1 ? "C/C++" :
                    this.props.itemDetail.category_level3 == 2 ? "Python"
                      : null}
                </div>
              </div>
              <div className="coding-area">
                <div className="tab">
                  {item.user_id === (this.props.userInfo && this.props.userInfo.uid) ?
                    <div
                      onClick={() => this.setState({ tab: "code" })}
                      className={`label ${tab === "code" ? "active" : ""}`}
                    >코딩 영역</div>
                    : null}
                  <div
                    onClick={() => this.setState({ tab: "log" })}
                    className={`label ${tab === "log" ? "active" : ""}`}
                  >제출 내역</div>
                </div>
                <div className="blank" />

                <div className="editor">

                  {tab === "code"

                    ?
                    <React.Fragment>
                      {coding.map((item, index) => {
                        return (<ControllerWrap key={item + index}>
                          <div className="contentWrap">
                            {(item.type === "FILE")
                              ? <FileController
                                item={item}
                                name="source"
                                initClick={this.state.click}
                                getValue={this.onChangeFile}
                                extension=".cpp,.hpp,.h,.js"
                                setController={this.setController} />

                              : null}
                            {(item.type === "TEXT")
                              ?
                              <React.Fragment>
                                <FileName
                                  placeholder={"파일 이름을 입력하세요(ex:helloWorld.cpp)"}
                                  onChange={(e) => { this.onChangeFileName(e.target.value, item.order) }}
                                  value={this.state.coding && this.state.coding[item.order] && this.state.coding[item.order].name}
                                />
                                <AceEditor
                                  width={"100%"}
                                  height={"278px"}
                                  ref={ref => this.ace = ref}
                                  setOptions={{
                                    fontSize: "20px",
                                  }}
                                  value={this.state.coding && this.state.coding[item.order] && this.state.coding[item.order].content}
                                  mode= //"python"
                                  {this.props.DesignDetail &&
                                    (this.props.DesignDetail.category_level3 == 1 ||
                                      this.props.DesignDetail.category_level3 == 3)
                                    ? 'c_cpp'
                                    : this.props.DesignDetail &&
                                      this.props.DesignDetail.category_level3 == 2
                                      ? 'python'
                                      : ""}
                                  theme="github"
                                  // onChange={(data) => this.onChangeValue(data, item.order)}
                                  onChange={(data) => { this.onChangeCode(data, item.order) }}
                                  // onChange={console.log}
                                  name={`UNIQUE_ID_OF_DIV${index}`}
                                  editorProps={{ $blockScrolling: true }} />
                              </React.Fragment>
                              : null}
                          </div>
                          <DelBtn
                            type="button"
                            className="editBtn"
                            onClick={() => this.onDeleteCoding(item.order)}>
                            <i className="trash alternate icon large" />
                          </DelBtn>

                          {coding.length - 1 >= item.order && item.order !== 0 ?
                            <UpBtn
                              type="button"
                              className="editBtn"
                              onClick={() => this.moveCoding(item.order, item.order - 1)}>
                              <i className="angle up alternate icon large" />
                            </UpBtn> : null}

                          {coding.length - 1 !== item.order && item.order >= 0 ?
                            <DownBtn
                              type="button"
                              className="editBtn"
                              onClick={() => this.moveCoding(item.order, item.order + 1)}>
                              <i className="angle down alternate icon large" />
                            </DownBtn> : null}
                        </ControllerWrap>)
                      })}
                      <CodingAddContent
                        categoryType={this.props.DesignDetail && this.props.DesignDetail.category_level3}
                        getValue={this.onAddCoding}
                        order={coding.length} />
                    </React.Fragment>

                    :
                    <SubmitLogContainer
                      {...this.props}
                      user_id={item.user_id}
                      content_id={item.uid}
                    />}
                </div>
              </div>
            </CodingContainer>
            {/* buttons */}
            <SelectBox>
              <div className="selecticon" onClick={() => this.submit()}>제출</div>
              <div className="cancel" onClick={() => this.cancelSubmit()}>취소</div>
            </SelectBox>
          </ModalBox>
          : null}



        {/* viwer */}
        {!item.notyet
          ? <Viewer>
            <ProblemBox>
              <div className="boardBox">
                <div className="board">
                  {item.content && this.IsJsonString(item.content) &&
                    <PdfViewer height={true} pdf={JSON.parse(item.content).contents} />}
                </div>
              </div>
            </ProblemBox>
            <SelectBox>
              {(this.props.userInfo && this.props.userInfo.uid) === item.user_id &&
                <div className="selecticon" onClick={() => this.setState({ submit: !this.state.submit })}>답안 제출하기</div>
              }
            </SelectBox>
          </Viewer>
          : null}
      </Wrap>
    );
  }
}



const TableWrapper = styled.div`
  padding:10px;
`;
const NewTable = styled.table`
  width:100%;
  .header_result{
    padding:10px;
    width:70%;
    background-color:#efefef;
  }
  .header_time{
    padding:10px;
    width:20%;
    background-color:#efefef;
  }
  .header_code{
    padding:10px;
    width:10%;
    background-color:#efefef;
  }
  .result{
    padding:10px;
    background-color:white;
  }
  .time{
    padding:10px;
    background-color:white;
  }
  .code{
    padding:10px;
    background-color:white;
  }
`;
class SubmitLogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { MySubmitList: [] }
  }
  get_submit_list = (user, content) => {
    return new Promise((resolve, reject) => {
      const url = `${host}/item/problem/mySubmitList/${user}/${content}`;
      fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: "GET",
      })
        .then(res => res.json())
        .then(data => resolve(data && data.MySubmitList || []))
        .catch(er => reject(er));
    })
  }
  async componentDidMount() {
    this.setState({ loading: true });
    const { item, } = this.props;
    if (item.user_id) {
      const list = await this.get_submit_list(item.user_id, item.uid);
      await this.setState({ MySubmitList: list });
    } else {
      alert("잘못된 요청입니다.");
    }
    this.setState({ loading: false });
  }
  render() {
    const { loading, MySubmitList } = this.state;
    const data = MySubmitList && MySubmitList.length > 0 && MySubmitList.map((submit, index) => {

      const create_Date = submit && new Date(submit.create_date);
      const timecheck = create_Date == null ? null
        : create_Date.getFullYear().toString().substr(2, 2) + ":"
        + ((create_Date.getMonth() + 1) < 10 ? "0" + (create_Date.getMonth() + 1) : (create_Date.getMonth() + 1)) + ":"
        + (create_Date.getDate() < 10 ? "0" + create_Date.getDate() : create_Date.getDate()) + ":"
        + (create_Date.getHours() < 10 ? "0" + create_Date.getHours() : create_Date.getHours()) + ":"
        + (create_Date.getMinutes() < 10 ? "0" + create_Date.getMinutes() : create_Date.getMinutes());

      let result =
        submit.result === "S" ? "성공"
          : submit.result === "F" ? "실패"
            : submit.result === "T" ? "실패(시간초과)"
              : submit.result === "M" ? "실패(메모리초과)"
                : submit.result === "C" ? "실패(컴파일에러)"
                  : submit.result === "R" ? "실패(런타임에러)"
                    : submit.result === "E" ? "실패(서버에러)"
                      : submit.result === "P" ? "실패(문제에러)"
                        : "실패"
      result =
        submit.result === "S"
          ? result : result + ":<br/>" +
          (submit.message && submit.message.slice(0, 512)) +
          (submit.message && submit.message.lnegth > 512 ? "..." : "");
      // console.log(result, submit.message);

      const row = {
        "key": index,
        "result": result,
        // "message": submit.result == "S" ? "성공" : submit.message || "실패",
        // "time": submit.avg_time ? submit.avg_time + "초" : "",
        // "space": submit.avg_memory ? submit.avg_memory + "kb" : "",
        "submit_time": timecheck + "",
        "code": submit.answer || "",
      }
      return row;
    })

    return (MySubmitList && MySubmitList.length > 0 ?
      <TableWrapper>
        <NewTable>
          <th className="header_result">결과</th>
          <th className="header_time">제출시간</th>
          <th className="header_code">내 코드</th>
          {data.map((item, index) => {
            return (
              <tr>
                <td className="result">{item.result.replaceAll("<br/>", "\n")}</td>
                {/* dangerouslySetInnerHTML={{ __html: item.result }} /> */}
                <td className="time">{item.submit_time}</td>
                <td className="code">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=800,height=600,scrollbars=yes`;
                      localStorage.setItem("code", item.code);
                      const code = window.open("/codeview", "codeview", options);
                    }}>
                    소스보기 </div>
                </td>
              </tr>
            );
          })
          }
        </NewTable>
      </TableWrapper>
      :
      <div style={{ margin: "auto", marginTop: "25px", width: "max-content", fontFamily: "Noto Sans KR", fontSize: "1.25rem", textAlign: "center" }}>
        {loading
          ? "제출 이력을 가져오고 있습니다."
          : "제출 이력이 없습니다."}
      </div>
    )
  }
}
////////////////
//   PROBLEM  //
////////////////
const getlistRequest = (page) => {
  return new Promise((resolve, reject) => {
    const url = `${host}/item/problem/list/${page}`;
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
};
const getProblemDetailRequest = (uid) => {
  return new Promise((resolve, reject) => {
    const url = `${host}/item/problem/detail/${uid}`;
    fetch(`${url}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
};
const getProblemCategoryRequest = () => {
  return new Promise((resolve, reject) => {
    const url = `${host}/item/problem/category`;
    return fetch(`${url}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    }).then(res => res.json())
      .then(data => resolve(data.results))
      .catch(e => reject(e));
  });
};
const getProblemListFilterRequest = (category_id) => {
  return new Promise((resolve, reject) => {
    const url = `${host}/item/problem/list/${category_id}`;
    fetch(`${url}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
};
const getProblemLanguageListRequest = () => {
  return new Promise((resolve, reject) => {
    const url = `${host}/item/problem/language`;
    fetch(`${url}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => resolve(data.results))
      .catch(e => reject(e));
  });
};
// const updateAnswerRequest = (token, data) => {
//   return new Promise((resolve, reject) => {
//     const url = `${host}/item/problem/updateAnswer`
//     fetch(url, {
//       headers: { "x-access-token": token, "Content-Type": "application/json" },
//       method: "POST",
//       body: JSON.stringify(data)
//     })
//       .then(res => res.json())
//       .then(data => resolve(data))
//       .catch(e => reject(e));
//   });
// };
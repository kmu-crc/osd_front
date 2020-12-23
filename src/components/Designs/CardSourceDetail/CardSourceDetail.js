import React, { Component, Fragment } from "react";
// import update from "react-addons-update";
import styled from "styled-components";
import FileIcon from "components/Commons/FileIcon";
import Loading from "components/Commons/Loading";
import { FileUploadRequest } from "redux/modules/design";
import osdcss from "opendesign_style";
import FileController from "./FileController";
import TextController from "./TextControllerPlus";
import LinkController from "./LinkController";
import ProblemController from "./ProblemController";
import ProblemContainer from "containers/Designs/ProblemContainer"
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import { Modal, Dropdown } from "semantic-ui-react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import Cross from "components/Commons/Cross";

import host from "config";

// FOR EDITOR
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";

/*
  PROBLEM SUBMIT MODAL
*/
const ProblemBox = styled.div`
  width:100%;
  padding-top:20px;
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
const SubmitResultModal = styled(Modal)`
    width: 873px;
    height: 418px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    opacity: 1;
    position: relative;
    padding: 50px;
    margin: auto;
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

      margin-top: 10px;
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
      .msg{
        font-size: 20px;
        line-height: 29px;
        font-weight: 500;
        color: #707070;
      }
      .font_green{
        color:green;
      }
      .font_red{
        color:red;
      }
    }
`
const SubmitModalWrapper = styled(Modal)
  `
  *{
    // border: 1px solid black;
    font-family: Noto Sans KR;
  }
  width: 873px;
  height: 949px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  position: relative;
  padding: 50px;
  margin: auto;

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

    margin-top: 10px;
  }

  .language {
    margin-top: 38px;
    display: flex;
    flex-direction: row;
    item-align: center;

    .label {
      font: normal normal normal 20px/29px Noto Sans KR;
      letter-spacing: 0px;
      color: #707070;
      opacity: 1; 
    }
    .combo-box {
      font: normal normal normal 17px/29px Noto Sans KR;
      margin-left: 20px;
    }
  }
  .coding-area {
    *{
      font-family: monospace !important;
    }
    margin-top: 26px;
    .tab {
      display: flex;
      flex-direction: row;
      width: max-content;
      font: normal normal normal 20px/29px Noto Sans KR;
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
      width: 773px;
      height: 588px;
      border:1px solid #efefef;
      background: #E9E9E9 0% 0% no-repeat padding-box;
      // border-radius: 5px;
      opacity: 1;
    }
  }
  .button-wrapper {
    margin: auto;
    margin-top: 40px;
    width: max-content;
    display: flex;
    flex-direction: row;

    .btn {
      cursor: pointer;
      font-weight: 500;
      width: max-content;
      height: 29px;
      opacity: 1;
      letter-spacing: 0px;
      font-size: 20px;
      line-height: 29px;
    }
    .submit {
      margin-left: 47.5px;
      color: #FF0000;
      border-bottom: 1px solid #FF0000;
    }
    .cancel {
      color: #707070;
      border-bottom: 1px solid #707070;
    }
  }
`;
const LanguageDropDown = styled(Dropdown)`
  // top: 298px;
  // left: 672px;
  width: 198px;
  height: 37px;
  border: 2px solid #E9E9E9;
  border-radius: 5px;
  opacity: 1;
  font-size: 17px !important;
`;

const cloneObj = obj => JSON.parse(JSON.stringify(obj));
function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}
// CSS STYLED
const ControllerWrap = styled.div`
  position: relative;
  width: 100%;
  &:hover {
    border: 1px dashed ${osdcss.color.grayScale.scale3};
    background-color: ${osdcss.color.grayScale.scale0};
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
  background-color: ${osdcss.color.main.basic};
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
const LinkPreview = styled.div`
  text-align: center;
  .title {
    font-size: 0.9rem;
    color: #707070;
  }
  .url {
    font-size: 0.9rem;
    line-height: 0.9rem;
    padding: .5rem;
    color: #0645AD;
  }
  .description {
    font-size: 1.5rem;
    line-height: 2.5rem;
    font-weight: 300;
    color: #FF0000;
    padding: 0.5rem; 
  }
`;
const ViewContent = styled.div`
  position: relative;
  .imgContent {
    img {
      max-width: 100%;
      // width: 450px;
    }
    text-align: center;
    margin-bottom: 2rem;
    p {
      // text-align: right;
      font-size: 0.75rem;
      line-height: 0.9rem;
      font-family: Noto Sans KR;
      font-weight: 500;
      color: #707070;
    }
  }
  .LinkFileName {
    line-height: 70px;
    font-size: 20px;
  }
  .iconWrap {
    display: block;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    margin-bottom: 2rem;
  }
  .textWrap {
    margin-bottom: 2rem;
    word-break: break-all;
    line-height: 25px;
    color: inherit;
  }
  .linkWrap {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    font-family: Noto Sans KR;
  }
  & .goEdit {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
  }
  &:hover .goEdit {
    display: block;
  }
`;
const ButtonContainer = styled.div`
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
  .content-edit-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-edit-button {
    width: max-content;
    padding: 7px;
    padding-bottom: 1px;
    border: none;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
  .content-add-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-add-button {
    width: max-content;
    border: none;
    padding: 7px;
    padding-bottom: 1px;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
`;
const EditorBottonWrapper = styled.div`
    width: max-content;
    margin: auto;
    margin-top: 10px;
    padding: 15px;
    background: #FFFFFF;
    border-radius: 25px;
    z-index: 907;
    .submit {
      margin-left: 5px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #FF0000;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
    .cancel {
      margin-left: 10px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
`;

class CardSourceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      content: this.props.content || [],
      origin: this.props.origin || [],
      loading: false,
      submit: false, tab: "code",
      addProblem:false,
      selectProblem:null,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddValue = this.onAddValue.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.verifyorder = this.verifyorder.bind(this);

    this.ace = React.createRef();
  }
  componentDidMount() {
    if (this.props.uid !== "new") {
      this.props.GetDesignSourceRequest(this.props.uid)
        .then(async () => {
          console.log("componentdidmount", this.props.content);
          if (await this.verifyorder(this.props.content)) { }
          else {
            await this.setState({ content: this.props.content || [], origin: this.props.origin || [] });
          }
        })
    }
  }
  async verifyorder(content) {
    console.log("verify:", content);
    // check order
    let formData = { updateContent: [], newContent: [], deleteContent: [] }
    if (content && content.length > 0) {
      content.forEach((item, index) => {
        if (item.order !== index) {
          item.order = index;
          formData.updateContent.push(item);
        }
      });
    }

    if (formData.updateContent.length) {
      await this.props.upDateRequest(formData, this.props.uid, this.props.token)
        // .then(this.props.UpdateDesignTime(this.props.design_id, this.props.token))
        .then(() => {
          this.props.GetDesignSourceRequest(this.props.uid)
            .then(async () => {
              await this.setState({ content: this.props.content, origin: this.props.origin });
            })
        })
      await this.props.GetDesignDetailRequest(this.props.design_id, this.props.token);
      await this.props.GetCardDetailRequest(this.props.uid)
      return true;
    }
    return false;
  }
  async componentDidUpdate(prevProps) {
    if (this.props.hook === true && prevProps.hook === false) {
      this.props.handleResetHook && await this.props.handleResetHook();
      await this.onSubmit();
    }
    if (this.props.closed === true && prevProps.closed === false) {
      this.props.handleClosed &&
        this.props.handleClosed(
          this.props.uid
            ? this.state
            : this.state.content);
    }
  }
  async onChangeFile(data) {
    await this.setState({ loading: !this.state.loading });
    let copyContent = [...this.state.content];
    delete data.initClick;
    delete data.target;
    await copyContent.splice(data.order, 1, data);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        return item;
      })
    );
    await this.setState({ content: copyContent });
    await this.setState({ loading: !this.state.loading });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.content);
  }
  async onChangeValue(data, order) {
    console.log("onchangeValue", data);
    let copyContent = [...this.state.content];
    copyContent[order] = data;
    this.setState({ content: copyContent });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.content);
  }
  async onDelete(order) {
    if (await confirm("선택하신 컨텐츠를 삭제하시겠습니까?", "예", "아니오") === false) {
      return;
    }
    let copyContent = [...this.state.content];
    for (var i = 0; i < copyContent.length; i++) {
      if (copyContent[i].order === order) {
        copyContent.splice(i, 1);
      }
    }
    for (i = 0; i < copyContent.length; i++) {
      copyContent[i].order = i;
    }
    await this.setState({ content: copyContent });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.content);
  }
  async onAddValue(data) {
    let copyContent = [...this.state.content];
    let copyData = { ...data };
    copyData.initClick = true;
    for (let item of copyContent) {
      if ((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1, null);
      }
    }
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
    await this.setState({ content: newContent })
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.content);
  }
  async moveItem(A, B) {
    if (!this.state.content) {
      return;
    }
    const copy = [...this.state.content];
    // const copy = cloneObj(this.state.content);// [...this.state.content];
    // copy[0].test = "!!!";
    // this.state.content[0].test = "???";
    // await console.log("before:", copy, this.state.content);
    // var T = copy[A];
    // copy[A] = copy[B];
    // copy[B] = T;
    [copy[A], copy[B]] = [copy[B], copy[A]];
    // await console.log("after:", copy, this.state.content);
    copy.map((ele, index) => {
      if (ele.order !== index) {
        ele.order = index;
      }
      return ele;
    })
    await this.setState({ content: copy });
    this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.content);
    return;
  }
  async onSubmit(event) {

    let newContent = [...this.state.content];
    let oldContent = [...this.state.origin];
    // console.log(oldContent);
    // return;
    if (newContent === oldContent) {
      await alert("변경된 내용이 없습니다.", "확인");
      return;
    }
    if (event != null) {
      event.preventDefault();
    }

    let formData = { updateContent: [], newContent: [], deleteContent: [] }

    // get updatecontent
    //order
    newContent.forEach(item => {
      oldContent.forEach(old => {
        if (old.uid === item.uid) {
          if (old.order !== item.order) {
            formData.updateContent.push(newContent[old.order]);
            formData.updateContent.push(item);
          }
          if (old.content !== item.content) {
            formData.updateContent.push(item);
          }
        }
      })
    });

    // get newcontent
    newContent.forEach(item => {
      if (item.uid == null) {
        delete item.initClick;
        if (item.type === "TEXT") {
          item = {
            type: item.type,
            content: item.content,
            order: item.order,
            extension: item.extension,
            data_type: item.data_type,
            file_name: null
          };
        }
        formData.newContent.push(item);
      }
      // return item;
    })

    // get deletecontent
    oldContent.map(item => {
      const found = newContent.find(_item => _item.uid === item.uid);
      if (found == null) {
        formData.deleteContent.push(item);
      }
    })

    // edit
    await this.setState({ loading: true });

    if (formData && formData.newContent) {
      await Promise.all(
        formData.newContent.map(async content => {
          if (content.type === "FILE") {
            const s3path = await FileUploadRequest(content);
            content.content = s3path.path || null;
            content.data_type = content.file_type;
          }
        })
      );
    }
    if (this.props.uid !== "new") {
      console.log(formData);
      if (this.props.handleSubmit) {
        await this.props.handleSubmit(formData);
      }
      else {
        await this.props.upDateRequest(formData, this.props.uid, this.props.token)
          .then(this.props.UpdateDesignTime(this.props.design_id, this.props.token))
          .then(() => {
            this.props.GetDesignSourceRequest(this.props.uid)
              .then(async () => {
                await this.setState({ content: this.props.content, origin: this.props.origin });
              })
          })
        await this.props.GetDesignDetailRequest(this.props.design_id, this.props.token);
        await this.props.GetCardDetailRequest(this.props.uid);
      }
    } else { // new
      await this.props.upDateRequest(formData);
    }
    await this.setState({ edit: false, loading: false });
  }
  async onCancel() {
    if (this.props.uid !== "new") {
      await this.setState({ content: this.props.content, origin: this.props.origin, edit: false, loading: false });
      this.props.handleCancel && this.props.handleCancel();
    } else {
      this.props.handleCancel && this.props.handleCancel(this.state.content);
    }
  }
  changeMode() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const { edit, content, loading, submit, tab, item, result } = this.state;
    // console.log("content:", this.state.content);
    console.log("result:", this.state.content);
    return (<div>
      {loading ? <Loading /> : null}

      {submit ?
        <SubmitModalWrapper
          open={submit}
          onClose={() => this.setState({ submit: false })}
        >
          {loading ? <Loading msg="문제를 제출 중입니다." /> : null}

          {/* 
            avg_memory: "0"
            avg_time: "0"
            code: "zxcvxzcv"
            create_date: "2020-12-21T04:36:55.000Z"
            language_id: 1
            message: "main.c:1:1: error: expected ‘=’, ‘,’, ‘;’, ‘asm’ or ‘__attribute__’ at end of input↵ zxcvxzcv↵ ^~~~~~~~↵"
            order: null
            problem_id: 3
            result: "C"
            uid: 50
            user_id: 762
          */}
          {result ?
            <SubmitResultModal open={result ? true : false}>
              <div className="close-box" onClick={() => this.setState({ result: false,loading:false })} >
              <Cross angle={45} color={"#707070"} weight={2} width={25} height={25} />
              </div>
              <div className="title">문제</div>
              <div className="content_box">
                <div className="name">제출 언어</div><div className="msg">C/C++</div>
              </div>
              <div className="content_box">
                <div className="name">제출 결과</div><div className="msg font_green">성공</div>
              </div>
              <div className="content_box">
                <div className="name">내가 제출한 소스 보기∨</div>
              </div>
              <div className="content_box">
                <div className="msg">{result.result},{result.message}</div>
              </div>
              
            </SubmitResultModal> : null}

          <div className="close-box" onClick={() => this.setState({ submit: false })} >
            <Cross angle={45} color={"#707070"} weight={2} width={25} height={25} />
          </div>
          <div className="title">{item.name}</div>
          <div className="language">
            <div className="label">제출 언어</div>
            <div className="combo-box">
              <LanguageDropDown
                selection
                ref="dropdown"
                onChange={(e, c) => this.setState({ language_id: c.value })}
                options={[
                  { key: 'c', text: 'C/C++', value: 'c' },
                  { key: 'py', text: 'Python', value: 'py' }]}
                placeholder="언어를 선택하여 주세요."
              />
            </div>
          </div>
          <div className="coding-area">

            <div className="tab">
              <div
                onClick={() => this.setState({ tab: "code" })}
                className={`label ${tab === "code" ? "active" : ""}`}
              >코딩 영역</div>
              <div
                onClick={() => this.setState({ tab: "log" })}
                className={`label ${tab === "log" ? "active" : ""}`}
              >제출 내역</div>
            </div>
            <div className="blank"/>

            <div className="editor">
              {tab === "code"
                ?
                // <div style={{ width: "700px" }}>
                <AceEditor
                  width={"100%"}
                  height={"100%"}
                  ref={ref => this.ace = ref}
                  setOptions={{
                    fontSize: "20px",
                  }}
                  mode="python"
                  theme="github"
                  onChange={console.log}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{ $blockScrolling: true }} />
                // </div>
                : <div>log container</div>}
            </div>
          </div>

          <div className="button-wrapper">
            <div onClick={() =>
              this.setState({ submit: false })
            } className="btn cancel">취소</div>

            <div onClick={() => {
              if (this.ace.editor == null) {
                return;
              }
              const code = this.ace.editor.getValue();
              if (code.trim() === "") {
                alert("코드를 작성해주세요.");
                return;
              }
              this.setState({ loading: true, });
              let ntry = 5;
              fetch(`${host}/design/problem/submit`, {
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                  "x-access-token": this.props.token
                },
                method: "POST",
                body: JSON.stringify({
                  user_id: this.props.userInfo.uid,
                  // {"id":3,"problem_type":"C","time":100,"name":"Test Check Problem","contents":"Test Check"}
                  problem_id: item.id,
                  language_id: 1, //this.state.language_id || 1,
                  code: `${code}`
                })
              }).then(res => res.json())
                .then(res => {
                  console.log(res);
                  if (res.success) {
                    const check = () => {
                      this.setState({ loading: true, });
                      fetch(`${host}/design/problem/result-request/${res.id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        method: "GET",
                      })
                        .then(res1 => res1.json())
                        .then(res1 => {
                          console.log(res1);
                          if (res1.result) {
                            this.setState({ result: res1 });
                            ntry = 0;
                          }
                        })
                        .catch(e => { console.error(e); return; })
                      if (ntry--)
                        setTimeout(check, 1000);
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
            }} className="btn submit">제출</div>
          </div>
        </SubmitModalWrapper>

        // <SubmitModal open={submit} close={this.setState({ submit: false })} /> : null}
        : null
      }

      {/* <ButtonContainer>
        {edit === false && !this.props.edit && this.props.isTeam && (content && content.length > 0 ?
          (<div className="content-edit-wrapper">
            <button onClick={() => this.setState({ edit: !edit })} className="content-edit-button">컨텐츠 수정</button></div>) :
          (<div className="content-add-wrapper">
            <button onClick={() => this.setState({ edit: !edit })} className="content-add-button" >컨텐츠 추가</button></div>))}
      </ButtonContainer> */}

      {/* view mode */}
      {
        this.props.uid && (!edit && !this.props.edit) && content.length > 0 &&
        <ViewContent>
          {content.map((item, index) =>
            <div key={index + item}>
              {(item.type === "FILE" && item.data_type === "image") ?
                <div className="imgContent" >
                  <Zoom >
                    <img width="100%" src={item.content} alt="이미지" download={item.file_name} />
                  </Zoom>
                  <p>이미지를 클릭하시면 크게 보실 수 있습니다.</p>
                </div>

                : (item.type === "FILE" && item.data_type === "video") ?
                  <span >
                    <span className="LinkFileName">{item.file_name}</span>
                    <video
                      className="iconWrap"
                      width={`${window.innerWidth > 480 ? "640" : window.innerWidth - 55}`}
                      height={`${window.innerWidth > 480 ? "360" : (window.innerWidth - 55) * .55}`}
                      controls="controls">
                      <source src={item.content} type="video/mp4" download={item.file_name}></source></video>
                  </span>

                  : (item.type === "FILE" && item.data_type !== "image" && item.data_type !== "video") ?
                    <a className="iconWrap" href={item.content} download={item.file_name} >
                      <FileIcon type={item.data_type} extension={item.extension} />
                      <span className="LinkFileName">{item.file_name}</span>
                    </a>

                    : (item.type === "TEXT") ?
                      <div className="textWrap" dangerouslySetInnerHTML={{ __html: `${item.content}` }} />

                      : (item.type === "LINK") ?
                        <div className="linkWrap">
                          <LinkPreview>
                            <div className="description">{
                              IsJsonString(item.content)
                                ? JSON.parse(item.content).hasOwnProperty('description')
                                  ? "*" + JSON.parse(item.content).description : "" : ""}
                            </div>
                            <div className="url">
                              <a target="_blank" href={`${IsJsonString(item.content)
                                ? JSON.parse(item.content).hasOwnProperty('url')
                                  ? JSON.parse(item.content).url : "invalid" : "invalid"}`}>
                                ({IsJsonString(item.content)
                                  ? JSON.parse(item.content).hasOwnProperty('url')
                                    ? JSON.parse(item.content).url : "invalid" : "invalid"})
                              </a>
                            </div>
                          </LinkPreview>
                        </div>

                        : (item.type === "PROBLEM") ?
                          <div className="problemWrap">

                                  <ProblemBox>
                                    <div className="titleBox"><div className="title">제목</div></div>
                                    <div className="boardBox"><div className="board">{item.content&&JSON.parse(item.content).name}</div></div>
                                    <div className="titleBox"><div className="title">내용</div></div>
                                    <div className="boardBox"><div className="board">{item.content&&JSON.parse(item.content).contents}</div></div>
                                    <div className="titleBox"><div className="title">조건</div></div>
                                    <div className="boardBox"><div className="board">
                                      제한시간:{item.content&&JSON.parse(item.content).time} / 
                                      문제유형:{item.content&&JSON.parse(item.content).problem_type}
                                    </div></div>
                                  </ProblemBox>

                            <div
                              onClick={() => {
                                this.setState({ item: JSON.parse(item.content) });
                                this.setState({ submit: true });
                              }}
                              style={{ width: "max-content", margin: "auto", borderBottom: "1px solid red", cursor: "pointer" }}>
                              <p style={{ color: "red", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", fontWeight: "500" }}>답안 제출하기</p>
                            </div>

                          </div>

                          : <div>올바른 형식의 아이템이 아닙니다.</div>}
            </div>
          )}
        </ViewContent>
      }

      {/* edit mode */}
      {
        (edit || this.props.edit || (edit && this.props.uid !== "new")) ? (

          content && content.length > 0 ? (<Fragment>

            {content.map((item, index) => {

              return (<ControllerWrap key={item + index}>

                <div className="contentWrap">
                  {(item.type === "FILE")
                    ? <FileController item={item} name="source" initClick={this.state.click} getValue={this.onChangeFile} setController={this.setController} />
                    : null}

                  {(item.type === "TEXT")
                    ? <TextController item={item} initClick={this.state.click} getValue={(data) => this.onChangeValue(data, item.order)} />
                    : null}

                  {(item.type === "LINK")
                    ? <LinkController item={item} initClick={this.state.click} getValue={(data) => this.onChangeValue(data, item.order)} />
                    : null}

                  {(item.type === "PROBLEM")
                    ? <ProblemContainer open={this.state.addProblem} openModal={(data)=>this.setState({addProblem:data})} item={item} initClick={this.state.click} getValue={(data) => this.onChangeValue(data, item.order)} />
                    : null}

                </div>

                <DelBtn
                  type="button"
                  className="editBtn"
                  onClick={() => this.onDelete(item.order)}>
                  <i className="trash alternate icon large" />
                </DelBtn>

                {content.length - 1 >= item.order && item.order !== 0 ?
                  <UpBtn
                    type="button"
                    className="editBtn"
                    onClick={() => this.moveItem(item.order, item.order - 1)}>
                    <i className="angle up alternate icon large" />
                  </UpBtn> : null}

                {content.length - 1 !== item.order && item.order >= 0 ?
                  <DownBtn
                    type="button"
                    className="editBtn"
                    onClick={() => this.moveItem(item.order, item.order + 1)}>
                    <i className="angle down alternate icon large" />
                  </DownBtn> : null}
              </ControllerWrap>)
            })}
            <AddContent getValue={this.onAddValue} order={content.length} open={(data)=>this.setState({addProblem:data})}/>
          </Fragment>) : <AddContent getValue={this.onAddValue} order={0} open={(data)=>this.setState({addProblem:data})}/>
        ) : null
      }

      <ButtonContainer>
        {(this.props.edit && this.props.uid) &&
          <EditorBottonWrapper>
            <button onClick={this.onCancel} className="cancel" type="button">
              <i className="icon trash" />취소</button>
            <button onClick={this.onSubmit} className="submit" type="button">
              <i className="icon outline save" />저장</button>
          </EditorBottonWrapper>}
      </ButtonContainer>
    </div >);
  }
}

export default CardSourceDetail;


const ControllerWrap2 = styled.div`
  margin: 20px 0;
  position: relative;
  text-align: center;

  border: 1px dashed ${osdcss.color.grayScale.scale6};
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${osdcss.color.grayScale.scale6};
    }
  }
  &:hover {
       background - color: #FAFAFA;
    & .initWrap {
      & > ul {
       display: flex;
      }
      & > span {
        color: ${osdcss.color.grayScale.scale6};
      }
    }
  }
  .innerBox {
    display: flex;
    min-height: 45px;
    height:max-content;
    align-items: center;
    justify-content: center;
    list-style: none;
  }
`;
const NewController = styled.li`
  width: ${props => props.width};
  height: ${props => props.height};
  margin-left: 35px;
  margin-right:35px;
  line-height: 29px;
  color: #FF0000;
  padding-bottom: 1.5px;
  border-bottom: 1.5px solid #FF0000;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;

  @media only screen and (max-width: 480px) {
                                font - size: 16px;
    margin-left: 15px;
    width: max-content;
  }
`;

class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = { type: null, content: "", order: null };
  }
  addContent = async (type) => {
    if (type === "FILE") {
      await this.setState({ type, order: this.props.order, content: "", initClick: true });
      setTimeout(() => {
        this.setState({ initClick: false });
      }, 100);
    } else {
      await this.setState({ type, order: this.props.order, content: "" });
      this.returnData();
    }
  }

  returnData = async (data) => {
    if (data) {
      await this.setState({ type: null, order: this.props.order, content: "", initClick: false })
      this.props.getValue(data);
    } else {
      if (this.props.getValue) this.props.getValue(this.state);
    }
  }

  render() {
    return (
      <ControllerWrap2>
        <div className="innerBox" >
          <NewController
            onClick={() => this.addContent("FILE")}
            width="max-content" minWidth="116px" height="29px">
            파일 등록하기</NewController>
          <NewController
            onClick={() => this.addContent("TEXT")}
            width="max-content" minWidth="134px" height="29px">
            텍스트 입력하기</NewController>
          <NewController
            onClick={() => this.addContent("LINK")}
            width="max-content" minWidth="134px" height="29px">
            하이퍼링크 등록하기</NewController>
          <NewController
            onClick={() => {this.addContent("PROBLEM");this.props.open(true);}}
            width="max-content" minWidth="134px" height="29px">
            문제 등록하기</NewController>
        </div>

        {this.state.type === "FILE" &&
          <FileController item={this.state} getValue={this.returnData} />}

      </ControllerWrap2>
    );
  }
}


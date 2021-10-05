import React, { Component, Fragment } from "react";
import styled from "styled-components";
import FileIcon from "components/Commons/FileIcon";
import Loading from "components/Commons/Loading";
import { FileUploadRequest } from "redux/modules/design";
import osdcss from "opendesign_style";
import FileController from "./FileController";
import TextController from "./TextControllerPlus";
import LinkController from "./LinkController";
import ProblemContainer from "containers/Designs/ProblemContainer"
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import { Modal, Dropdown } from "semantic-ui-react";
import 'react-medium-image-zoom/dist/styles.css';
import Cross from "components/Commons/Cross";
import host from "config";
// import { geturl } from "config"
import { Encrypt } from "components/Commons/EncryptDecrypt";

// FOR EDITOR
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import { Worker } from '@react-pdf-viewer/core';
import { PdfViewer } from "./PDFviewer";

// FOR SUBMIT LIST
// import Table from "rc-table";
// import DateFormat from "modules/DateFormat";
// import { resolve } from "core-js/fn/promise";


/*
  PROBLEM SUBMIT MODAL
*/
const FontZoom = styled.div`
  width: 100%;
  .zoomRgn{
    opacity:0;
    zIndex: 900;
    width: 100%;
    height: 50px;
    borderRadius: 25%;
    display: flex;
    justify-content:flex-end;
    lineHeight: 3.5rem;
    position: fixed;
    right: 15px;
  }
  &:hover{
    .zoomRgn{
      display:flex;
      opacity:1;
    }
  }
`
const FileName = styled.input` 
  width:100%;
  height:29px;
  display:flex;
  align-items:center;
  outline:none;
  border:0px;
  background-color:#efefef;
  font-size:15px;
`
const ProblemBox = styled.div`
  width:100%;
  padding-top:20px;
  .titleBox{
    width:100%;
    margin-bottom:8px;
    .title{
      font-size:15px;
      color:#707070;
      border-left:2px solid red;
      padding-left:5px;
    }
  }
  .problemBox{
    width:100%;
    // background-color:#EFEFEF;
    padding:10px;
    margin-bottom:35px;
    .board{
      font-size:15px;
      color:#707070;
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
      max-width:100%;
      overflow:hidden;
      word-break:break-all;
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
`
const SubmitModalWrapper = styled(Modal)`
  width: 873px;
  height:max-content;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  position: relative;
  padding: 60px 50px;
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

// const cloneObj = obj => JSON.parse(JSON.stringify(obj));
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
        object-fit: scale-down;
        max-width:100%;
        // max-width: 100%;
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
  .mouse-on{
    :hover {
      color: #0000FF;
      opacity: .75;
    }
  }
`;
const ButtonContainer = styled.div`
  // margin-bottom: 35px;
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
      addProblem: false,
      selectProblem: null,
      fontsizer_pos_top: 0,
      fontratio: 1,
      mySource: false,
      coding: [],
      permission: null,
      item_uid: null,
      item_user: null,
      item: null,
      selectOrder: -1,
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
    this.onAddCoding = this.onAddCoding.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onDeleteCoding = this.onDeleteCoding.bind(this);
    this.moveCoding = this.moveCoding.bind(this);
    this.onChangeCodingFile = this.onChangeCodingFile.bind(this);
    this.onChangeFileName = this.onChangeFileName.bind(this);
    this.submitCode = this.submitCode.bind(this);

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
            this.props.content &&
              this.props.content.length > 0 &&
              this.props.content.forEach(async item => {
                if (item.type === "PROBLEM") {
                  const permission = await this.setPermission(item);
                  await this.setState({ permission: permission });
                }
              })
          }
        })
    }
    const node = window.document.getElementById("card-source-detail-root-node");
    if (node) {
      window.addEventListener("scroll", (e) => {
        // console.log(e.target.scrollTop);
        this.setState({ fontsizer_pos_top: e.target.scrollTop });
      }, true);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", null, true);
  }
  async verifyorder(content) {
    // console.log("verify:", content);
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
  ///////////
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

    console.log("DEBUG", newContent, oldContent);
    // get updatecontent
    //order
    newContent.forEach(item => {
      oldContent.forEach(old => {
        if (old.uid === item.uid) {
          // if (old.order !== item.order) {
          //   formData.updateContent.push(newContent[old.order]);
          //   formData.updateContent.push(item);
          // }
          if (old.content !== item.content) {
            formData.updateContent.push(item);
          }
        }
      })
    });
    oldContent.forEach((item, index) => {
      if (item.order != index) {
        formData.updateContent.push(item);
      }
    })

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
      // console.log(formData);
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
  replaceFontUnitToRem(string) {
    const fz = [...Array(28 + 1).keys()].map(a => a + 10);
    let newstring = `${string}`;
    fz.forEach((size, index) => {
      newstring = newstring
        .replace(new RegExp(`${size}pt`, "g"), `${(index + 1) * 10 * 0.0625}rem`)
        .replace(new RegExp(`${size}px`, "g"), `${(index + 1) * 10 * 0.0625}rem`)
        .replace(new RegExp(`${size} px`, "g"), `${(index + 1) * 10 * 0.0625}rem`)
        .replace(new RegExp(`${size} pt`, "g"), `${(index + 1) * 10 * 0.0625}rem`)
    });
    return newstring
  }
  setPermission(item) {
    if (this.props.userInfo == null) {
      this.setState({ permission: "" });
      return "";
    }
    if (this.props.userInfo.uid === item.user_id) {
      this.setState({ permission: "LOG SUBMIT" });
      return "LOG SUBMIT";
    }
    const url = `${host}/design/problem/checkGroupOwner`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify({
        design_id: this.props.DesignDetail.uid,
        user_id: this.props.userInfo.uid,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.success && res.owner) {
          this.setState({ permission: "LOG" });
          return "LOG";
        }
        this.setState({ permission: "" });
        return "";
      })
      .catch(e => {
        console.error(e);
        this.setState({ permission: "" });
        return "";

      })
    this.setState({ permission: "" });
    return "";
  }
  async submitCode(_item) {
    if (this.state.coding.length <= 0) return;
    let datalist = [];
    const arr = this.state.coding.map(async (item, index) => {

      return new Promise(async (resolve, reject) => {
        let data = { type: item.type, content: "", file_name: "", order: index };

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
        await this.setState({ loading: true, result: null });
        let ntry = 10;
        fetch(`${host}/design/problem/submit`, {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "x-access-token": this.props.token
          },
          method: "POST",
          body: JSON.stringify({
            user_id: this.props.userInfo.uid,
            problem_id: _item.id,
            language_id: this.props.DesignDetail.category_level3 || 1,
            answer: JSON.stringify(datalist),
            content_id: this.state.item_uid,
          })
        }).then(res => res.json())
          .then(res => {
            if (res.success) {
              this.props.UpdateDesignCardTime(this.state.item_uid, this.props.token)
                .then(() => this.props.GetCardDetailRequest(this.props.uid))
                .then(() => this.props.UpdateDesignTime(this.props.DesignDetail.uid, this.props.token))
                .then(() => this.props.GetDesignSourceRequest(this.props.DesignDetail.uid))
                .then(() => this.props.GetDesignDetailRequest(this.props.DesignDetail.uid));

              const check = () => {
                this.setState({ loading: true, });
                fetch(`${host}/design/problem/result-request2/${res.id}`, {
                  headers: { 'Content-Type': 'application/json' },
                  method: "GET",
                })
                  .then(res1 => res1.json())
                  .then(res1 => {
                    if (res1.result) {
                      this.setState({ result: res1 });
                      ntry = 0;
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
              if (ntry === 0 && this.state.result == null) {
                alert('제출결과를 가져오지 못하였습니다. 잠시후 제출내역을 확인해주세요.');
                this.setState({ loading: false });
              }
            } else {
              alert('제출에 실패하였습니다.\n' + res.message);
              this.setState({ loading: false });
              return;
            }
          })
          .catch(e => console.error(e));
        this.setState({ loading: false });

      });
  }

  // 
  getLastestSubmit(item) {
    const { permission } = this.state;
    console.log(permission);
  }


  render() {
    // console.log("codecode", this.props.code)
    const { edit, content, loading, submit, tab, item, result, coding, permission, item_uid, item_user } = this.state;
    // console.log("content:", content.find(item => item.type === "TEXT"));
    // console.log("result:", this.props, this.state)// && this.props.DesignDetail.category_level3 - 1);
    const fontoffset = 0.3;
    let __code = result && result.code && result.code.replaceAll("\n", "<br/>");
    __code = __code && __code.replaceAll("   ", "&emsp;");
    let datalist = [];
    const answer = result && JSON.parse(result.answer);
    console.log("result", this.state);
    return (<div id="card-source-detail-root-node" style={{ padding: "15px" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        {loading ? <Loading /> : null}

        {content.find(item => item.type === "TEXT") != null ?
          <div style={{
            zIndex: "900",
            width: "max-content",
            height: "50px",
            borderRadius: "25%",
            display: "flex",
            // background: "gray",
            // border: "1px solid red",
            lineHeight: "3.5rem",
            position: "fixed",
            right: 15,
            top: (200 + this.state.fontsizer_pos_top) + "px",
          }} >
            {/* {this.props.isEdit==false?
          <React.Fragment>
          <div style={{ cursor: "default", paddingTop: "3px", lineHeight: "1rem", fontSize: "1rem" }}>폰트<br />크기</div>

          <div style={{
            width: "35px", height: "35px", borderRadius: "100%", background: this.state.fontratio < 3 ? "black" : "#EFEFEF",
            textAlign: "center", color: "white", cursor: this.state.fontratio < 3 ? "pointer" : "not-allowed", fontSize: "3.5rem", lineHeight: "2rem"
          }}
            onClick={() => { this.state.fontratio < 3 && this.setState({ fontratio: this.state.fontratio + fontoffset }) }} >+</div>

          <div style={{
            width: "35px", height: "35px", borderRadius: "100%", background: this.state.fontratio > 1 ? "black" : "#EFEFEF",
            textAlign: "center", color: "white", cursor: this.state.fontratio > 1 ? "pointer" : "not-allowed", fontSize: "3.5rem", lineHeight: "2rem"
          }}
            onClick={() => { this.state.fontratio > 1 && this.setState({ fontratio: this.state.fontratio - fontoffset }) }} >-</div>
          </React.Fragment>
          :null
          } */}
          </div>
          : null}

        {submit ?
          <SubmitModalWrapper
            open={submit ? true : false}
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
                <div className="close-box" onClick={() => this.setState({ result: false, loading: false })} >
                  <Cross angle={45} color={"#707070"} weight={2} width={25} height={25} />
                </div>
                <div className="title">문제</div>
                <div className="content_box">
                  <div className="name">제출 언어: </div>
                  <div className="msg">
                    {this.props.DesignDetail ?
                      this.props.DesignDetail.category_level3 === 1 ?
                        "C/C++" :
                        this.props.DesignDetail.category_level3 === 2 ?
                          "Python" :
                          // this.props.DesignDetail.category_level3 === 3 ?
                          //   "C" : 
                          "etc." : null}
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
                <div className="content_box">
                  <div className="msg">{result.message}</div>
                </div>
                {/* <div className="content_box" style={{ display: "flex", flexDirection: "column" }}> */}

                {/* <div className="name" style={{ cursor: "pointer" }}
                    onClick={() => { this.setState({ mySource: !this.state.mySource }) }}
                  >{this.state.mySource == false ? "내가 제출한 소스보기∧" : "내가 제출한 소스보기∨"}</div>
                  {this.state.mySource == true ?
                    answer&&answer.length>0?answer.map((item,index)=>{
                      const file_name = item.file_name;
                      let replace1 = item.code.replaceAll("\n", "<br/>");
                      replace1 = replace1.replaceAll("/\n/g", "<br/>");
                      replace1 = replace1.replaceAll("   ", "&emsp;");
                      
                      return(
                        <div style={{marginTop:"20px"}}>
                          <h3>{file_name}</h3>
                          <div dangerouslySetInnerHTML={{ __html: replace1}}/>
                        </div>
                      );
                    }):null
                    : null
                  } */}
                {/* </div> */}
                <div className="button-wrapper">
                  <div className="close"
                    onClick={() => this.setState({
                      result: false,
                      submit: true,
                      loading: false
                    })} >확인</div>
                </div>
              </SubmitResultModal> : null}

            <div className="close-box" onClick={() => this.setState({ submit: false })} >
              <Cross angle={45} color={"#707070"} weight={2} width={25} height={25} />
            </div>
            <div className="title">{item.name}</div>
            <div className="language">
              <div className="label">제출 언어</div>
              <div className="combo-box">
                {/* <LanguageDropDown
                disabled
                selection
                ref="dropdown"
                options={[
                  { key: 'cpp', text: 'C++', value: 'cpp' },
                  { key: 'py', text: 'Python', value: 'py' },
                  { key: 'c', text: 'C', value: 'c' },
                ]}
                placeholder="언어를 선택하여 주세요."
                value={this.props.DesignDetail&&this.props.DesignDetail.category_level3==1?'c':
                this.props.DesignDetail&&this.props.DesignDetail.category_level3==2?'py'
                :null}
              /> */}
                {
                  this.props.DesignDetail && this.props.DesignDetail.category_level3 == 1 ? "C/C++" :
                    this.props.DesignDetail && this.props.DesignDetail.category_level3 == 2 ? "Python"
                      : null
                  // :"C"
                }

              </div>
            </div>
            <div className="coding-area">
              <div className="tab">
                {item_user === this.props.userInfo.uid ?
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
                    {
                      coding.map((item, index) => {
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
                      }
                      )}
                    <CodingContent
                      categoryType={this.props.DesignDetail && this.props.DesignDetail.category_level3}
                      getValue={this.onAddCoding}
                      order={coding.length} />
                  </React.Fragment>
                  // <AceEditor
                  //   width={"100%"}
                  //   height={"478px"}
                  //   ref={ref => this.ace = ref}
                  //   setOptions={{
                  //     fontSize: "20px",
                  //   }}
                  //   mode= //"python"
                  //   {this.props.DesignDetail &&
                  //     (this.props.DesignDetail.category_level3 == 1 ||
                  //       this.props.DesignDetail.category_level3 == 3)
                  //     ? 'c_cpp'
                  //     : this.props.DesignDetail &&
                  //       this.props.DesignDetail.category_level3 == 2
                  //       ? 'python'
                  //       : ""}
                  //   theme="github"
                  //   onChange={console.log}
                  //   name="UNIQUE_ID_OF_DIV"
                  //   editorProps={{ $blockScrolling: true }} />
                  :
                  <SubmitLogContainer
                    {...this.props}
                    // SetViewCode={this.props.SetViewCode}
                    user_id={this.state.item_user}
                    content_id={item_uid}
                  />}
              </div>
            </div>

            <div className="button-wrapper">
              <div onClick={() => this.submitCode(item)}
                className="btn submit">제출</div>
              <div onClick={() =>
                this.setState({ submit: false, item: null })
              } className="btn cancel">취소</div>

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

            {content.map((item, index) => {
              // console.log("content:");

              return <div key={index + item}>
                {(item.type === "FILE" && item.data_type === "image") ?
                  <div className="imgContent" onClick={() => {
                    const url = item.content;
                    const img = '<img id="image" src="' + url + '">';
                    const popup = window.open("", "_blank", "image-view");
                    popup.document.write(img);
                    const imgnode = popup.document.getElementById("image");
                    popup.resizeTo(
                    /* width */imgnode.naturalWidth > window.screen.width ? window.screen.width / 2 : imgnode.naturalWidth * 1.06,
                    /* height */imgnode.naturalHeight > window.screen.height ? window.screen.height / 2 : imgnode.naturalHeight * 1.06
                    );
                  }}>
                    {/* <Zoom > */}
                    <img src={item.content} alt="이미지" download={item.file_name} />
                    {/* </Zoom> */}
                    {/* <p>이미지를 클릭하시면 원본크기로 보실 수 있습니다.</p> */}
                  </div>

                  : (item.type === "FILE" && item.data_type === "video") ?
                    <span >
                      <span className="LinkFileName">{item.file_name}</span>
                      <video
                        key={item.content}
                        className="iconWrap"
                        width={`${window.innerWidth > 480 ? "640" : window.innerWidth - 55}`}
                        height={`${window.innerWidth > 480 ? "360" : (window.innerWidth - 55) * .55}`}
                        controls="controls">
                        <source src={item.content} type="video/mp4" download={item.file_name}></source></video>
                    </span>
                    : (item.type === "FILE" && item.extension === "pdf") ?
                      <React.Fragment>
                        <div style={{ display: "flex", flexDirection: "flex-end" }}>
                          <div style={{ cursor: "pointer", fontSize: "1.25rem", color: "#707070", marginLeft: "auto", border: "1px solid transparent", width: "max-content" }}>
                            <a onClick={() => window.open(`/pdfview/${Encrypt(item.content, "opendesign")}`, "_blank", null)}>
                              <i className="file pdf outline icon large" />새탭으로열기</a>
                          </div>
                          <div style={{ fontSize: "1.25rem", color: "#707070", marginLeft: "25px", border: "1px solid transparent", width: "max-content" }}>
                            <a href={item.content} ><i className="save icon large" />PDF다운로드</a>
                          </div>
                        </div>
                        <PdfViewer pdf={item.content} height={true} />
                      </React.Fragment>

                      : (item.type === "FILE" && item.data_type !== "image" && item.data_type !== "video") ?
                        <a className="iconWrap" href={item.content} download={item.file_name} >
                          <FileIcon type={item.data_type} extension={item.extension} />
                          <span className="LinkFileName">{item.file_name}</span>
                        </a>

                        : (item.type === "TEXT") ?
                          <React.Fragment>
                            {this.props.isEdit == false ?
                              <FontZoom>
                                <div className="zoomRgn">
                                  <div style={{ cursor: "default", paddingTop: "3px", lineHeight: "1rem", fontSize: "1rem" }}>폰트<br />크기</div>
                                  <div style={{
                                    width: "35px", height: "35px", borderRadius: "100%", background: this.state.fontratio < 3 ? "black" : "#EFEFEF",
                                    textAlign: "center", color: "white", cursor: this.state.fontratio < 3 ? "pointer" : "not-allowed", fontSize: "3.5rem", lineHeight: "2rem"
                                  }}
                                    onClick={() => { this.state.fontratio < 3 && this.setState({ fontratio: this.state.fontratio + fontoffset }) }} >+</div>

                                  <div style={{
                                    width: "35px", height: "35px", borderRadius: "100%", background: this.state.fontratio > 1 ? "black" : "#EFEFEF",
                                    textAlign: "center", color: "white", cursor: this.state.fontratio > 1 ? "pointer" : "not-allowed", fontSize: "3.5rem", lineHeight: "2rem"
                                  }}
                                    onClick={() => { this.state.fontratio > 1 && this.setState({ fontratio: this.state.fontratio - fontoffset }) }} >-</div>
                                </div>
                              </FontZoom>
                              : null
                            }
                            <div
                              style={{
                                fontSize: `${this.state.fontratio}rem`,
                                lineHeight: `${this.state.fontratio * 1.2}rem`
                              }}
                              dangerouslySetInnerHTML={{
                                __html: `${item.content == null ? "&nbsp;" :
                                  // this.replaceFontUnitToRem(item.content)
                                  item.content
                                    /*
                                    10px = 0.625rem
                                    12px = 0.75rem
                                    14px = 0.875rem
                                    16px = 1rem (base)
                                    18px = 1.125rem
                                    20px = 1.25rem
                                    24px = 1.5rem
                                    30px = 1.875rem
                                    32px = 2rem
                                    34px = 2.125rem
                                    36px = 2.25rem
                                    38px = 2.5rem
                                    40px = 2.875rem
                                    42px = 3rem
                                    44px = 3.125rem
                                    46px = 3.25rem
                                    48px = 3.5rem
                                    */

                                    // .replace("10px", `${this.state.fontratio * 0.625}rem`)
                                    // .replace("12px", `${this.state.fontratio * 0.75}rem`)
                                    // .replace("14px", `${this.state.fontratio * 0.875}rem`)
                                    // .replace("16px", `${this.state.fontratio * 1}rem`)
                                    // .replace("18px", `${this.state.fontratio * 1.125}rem`)
                                    // .replace("20px", `${this.state.fontratio * 1.25}rem`)
                                    // .replace("24px", `${this.state.fontratio * 1.5}rem`)
                                    // .replace("30px", `${this.state.fontratio * 1.875}rem`)
                                    // .replace("32px", `${this.state.fontratio * 2}rem`)
                                    // .replace("34px", `${this.state.fontratio * 2.125}rem`)
                                    // .replace("36px", `${this.state.fontratio * 2.25}rem`)
                                    // .replace("38px", `${this.state.fontratio * 2.5}rem`)
                                    // .replace("40px", `${this.state.fontratio * 2.875}rem`)
                                    // .replace("42px", `${this.state.fontratio * 3}rem`)
                                    // .replace("44px", `${this.state.fontratio * 3.125}rem`)
                                    // .replace("46px", `${this.state.fontratio * 3.25}rem`)
                                    // .replace("48px", `${this.state.fontratio * 3.5}rem`)

                                    // .replace("14px;", `${0.875 * this.state.fontratio}rem;`)
                                    // .replace("18px;", `${1.125 * this.state.fontratio}rem;`)
                                    // .replace("24px;", `${1.500 * this.state.fontratio}rem;`)
                                    // .replace("30px;", `${1.875 * this.state.fontratio}rem;`)
                                    // .replace("36px;", `${2.25 * this.state.fontratio}rem;`)
                                    // .replace("48px;", `${3.5 * this.state.fontratio}rem;`)

                                    .replace(/font-size:14px;/g, `font-size:${0.875 * this.state.fontratio}rem;`)
                                    .replace(/font-size:18px;/g, `font-size:${1.125 * this.state.fontratio}rem;`)
                                    .replace(/font-size:24px;/g, `font-size:${1.500 * this.state.fontratio}rem;`)
                                    .replace(/font-size:30px;/g, `font-size:${1.875 * this.state.fontratio}rem;`)
                                    .replace(/font-size:36px;/g, `font-size:${2.25 * this.state.fontratio}rem;`)
                                    .replace(/font-size:48px;/g, `font-size:${3.5 * this.state.fontratio}rem;`)
                                  }`
                              }} />
                          </React.Fragment>

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
                                  <div className="titleBox">
                                    <div className="title">제목</div>
                                  </div>
                                  <div className="problemBox">
                                    <div className="board">
                                      {item.content && JSON.parse(item.content).name}
                                    </div>
                                  </div>
                                  <div className="titleBox">
                                    <div className="title">
                                      내용</div>
                                  </div>
                                  <div className="problemBox">
                                    <div className="board">
                                      {/* {item.content && IsJsonString(item.content) && JSON.parse(item.content).cotents && */}
                                      {item.content &&
                                        <React.Fragment>
                                          <div style={{ display: "flex", flexDirection: "flex-end" }}>
                                            <div style={{ cursor: "pointer", fontSize: "1.25rem", color: "#707070", marginLeft: "auto", border: "1px solid transparent", width: "max-content" }}>
                                              <a onClick={() => window.open(window.open(`/pdfview/${Encrypt(JSON.parse(item.content).contents, "opendesign")}`, "_blank", null))}>
                                                <i className="file pdf outline icon large" />새탭으로열기</a>
                                            </div>
                                            <div style={{ fontSize: "1.25rem", color: "#707070", marginLeft: "25px", border: "1px solid transparent", width: "max-content" }}>
                                              <a href={JSON.parse(item.content).contents} ><i className="save icon large" />PDF다운로드</a>
                                            </div>
                                          </div>
                                          <PdfViewer pdf={JSON.parse(item.content).contents} height={true} />
                                        </React.Fragment>}
                                      {/* {item.content && JSON.parse(item.content).contents} */}
                                    </div>
                                  </div>
                                </ProblemBox>

                                {/* <div style={{ margin: "0px", marginBottom: "15px", marginTop: "15px", }}>
                                  <h3>최근에 제출한 코드</h3>
                                  {permission === "LOG SUBMIT" || permission === "LOG"
                                    ? <div>
                                      <span>{JSON.parse(item.content).id}</span>
                                    </div>
                                    : <div style={{ width: "100%", height: "250px", background: "#707070", }}>
                                      <span style={{ color: "white", width: "max-content", padding: "10px", display: "flex" }}>작성자만 볼 수 있습니다.</span>
                                    </div>}
                                </div> */}

                                <div
                                  onClick={async () => {
                                    // console.log("user_id", this.props.userInfo.uid, item.user_id);
                                    // if (this.props.userInfo && (this.props.userInfo.uid === item.user_id)) {
                                    if (permission === "LOG SUBMIT" || permission === "LOG") {
                                      this.setState({ item: JSON.parse(item.content), item_uid: item.uid, item_user: item.user_id, tab: item.user_id === this.props.userInfo.uid ? "code" : "log" });
                                      this.setState({ submit: true });
                                      this.setState({ coding: [] });
                                    } else {
                                      await alert("해당문제의 제출 권한이 없습니다.");
                                    }
                                  }}
                                  style={{
                                    width: "max-content",
                                    margin: "auto",
                                    cursor: "pointer"
                                  }}>


                                  <p
                                    style={{
                                      padding: "5px 13px",
                                      color: "white",
                                      borderRadius: "18px",
                                      backgroundColor:
                                        permission == "LOG" || permission === "LOG SUBMIT" ? "red" : "gray",
                                    }}>
                                    답안 제출하기
                                  </p>
                                </div>


                                {/* <div
                              onClick={() => {
                                this.setState({ item: JSON.parse(item.content) });
                                this.setState({ submit: true });
                              }}
                              style={{ width: "max-content", margin: "auto", borderBottom: "1px solid red", cursor: "pointer" }}>
                              <p style={{ color: "red", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", fontWeight: "500" }}>답안 제출하기</p>
                            </div> */}

                              </div>

                              : <div>올바른 형식의 아이템이 아닙니다.</div>}
              </div>
            })}
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
                      ? <FileController
                        item={item}
                        name="source"
                        initClick={this.state.click}
                        getValue={this.onChangeFile}
                        setController={this.setController} />
                      : null}

                    {(item.type === "TEXT")
                      ? item.initClick == true || this.state.selectOrder == item.order ?
                        <TextController
                          item={item}
                          initClick={this.state.click}
                          onBlurOrder={() => this.setState({ selectOrder: -1 })}
                          getValue={(data) => this.onChangeValue(data, item.order)} />
                        : <div dangerouslySetInnerHTML={{ __html: item.content || "&nbsp;" }} onClick={() => this.setState({ selectOrder: item.order })} />
                      : null}

                    {(item.type === "LINK")
                      ? <LinkController
                        item={item}
                        initClick={this.state.click}
                        getValue={(data) => this.onChangeValue(data, item.order)} />
                      : null}

                    {(item.type === "PROBLEM")
                      ? <ProblemContainer
                        open={this.state.addProblem}
                        openModal={async (show) => {
                          this.setState({ addProblem: show });
                          if (show === false && item.content === "") {
                            let copyContent = [...this.state.content];
                            for (var i = 0; i < copyContent.length; i++) {
                              if (copyContent[i].type === "PROBLEM" && copyContent[i].content === "") {
                                copyContent.splice(i, 1);
                              }
                            }
                            for (i = 0; i < copyContent.length; i++) {
                              copyContent[i].order = i;
                            }
                            await this.setState({ content: copyContent });
                            this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.content);
                            // console.log("csd:", item);
                          }
                        }}
                        item={item}
                        initClick={this.state.click}
                        getValue={(data) => {
                          if (data != null) {
                            this.onChangeValue(data, item.order)
                          }
                        }}
                      />
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
              <AddContent
                is_problem={this.props.is_problem || (this.props.DesignDetail && this.props.DesignDetail.is_problem)}
                getValue={this.onAddValue}
                order={content.length}
                open={(data) => this.setState({ addProblem: data })} />
            </Fragment>) :
              <AddContent
                is_problem={this.props.is_problem || (this.props.DesignDetail && this.props.DesignDetail.is_problem)}
                getValue={this.onAddValue}
                order={0}
                open={(data) => this.setState({ addProblem: data })} />
          ) : null
        }

        <ButtonContainer>
          {(this.props.edit && this.props.uid) &&
            <EditorBottonWrapper>
              <button onClick={this.onSubmit} className="submit" type="button">
                <i className="icon outline save" />저장</button>
              <button onClick={this.onCancel} className="cancel" type="button">
                <i className="icon trash" />취소</button>
            </EditorBottonWrapper>}
        </ButtonContainer>
      </Worker>
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
    // height:max-content;
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
  // border-bottom: 1.5px solid #FF0000;
  font-size: 16px;
  font-weight: 500;
  font-family: Noto Sans KR, Bold;
  text-align: center;
  cursor: pointer;

  @media only screen and (max-width: 480px) {
                            font - size: 16px;
    margin-left: 15px;
    width: max-content;
  }
`;
const TableWrapper = styled.div`
  padding:10px;
  
`
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
`
// const TableWrapper = styled.div`
//   padding:10px;
//   .rc-table-thead{
//     .rc-table-cell{
//       padding:10px 5px;
//       font-size:20px;
//     }  
//   }
//   .rc-table-tbody{
//     .rc-table-row{
//       .rc-table-cell{
//         padding:10px 5px;
//         background-color:#FAFAFA;
//         font-size:14px;
//       }
//     }
//   }

// `
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
          {this.props.is_problem ? <NewController
            onClick={() => { this.addContent("PROBLEM"); this.props.open(true); }}
            width="max-content" minWidth="134px" height="29px">
            문제 등록하기</NewController> : null}
        </div>

        {this.state.type === "FILE" &&
          <FileController item={this.state} getValue={this.returnData} />}

      </ControllerWrap2>
    );
  }
}

// 코딩 컨트롤러
class CodingContent extends Component {
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
      await this.setState({ type, order: this.props.order, content: "", name: `__main${this.props.order == 0 ? "" : this.props.order}.cpp` });
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
        </div>

        {this.state.type === "FILE" &&
          <FileController accept={this.props.categoryType == "1" ? ".c, .cpp, .h" : this.props.categoryType == "2" ? ".py" : null} item={this.state} getValue={this.returnData} />}

      </ControllerWrap2>
    );
  }
}




/*
문제 출제/ 제출 관련 코드 임시 저장공간
*/

class SubmitLogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { MySubmitList: [] }
  }
  get_submit_list = (user, content) => {
    return new Promise((resolve, reject) => {
      const url = `${host}/design/problem/mySubmitList/${user}/${content}`;
      // console.log(url);
      fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: "GET",
      })
        .then(res =>
          res.json())
        .then(async res => {
          // console.log(res)
          await this.setState({ MySubmitList: res && res.MySubmitList || [] });
          resolve(true);
        })
        .catch(er => reject(er));
    })
  }
  componentDidMount() {
    this.setState({ loading: true });
    const { user_id, content_id } = this.props;
    // console.log("submit log container : ", this.props);
    if (user_id) {
      this.get_submit_list(user_id, content_id);
    } else {
      alert("잘못된 요청입니다.")
    }
    this.setState({ loading: false });
  }
  render() {
    // console.log("-----------", this.props)
    const { loading, MySubmitList } = this.state;
    const AddButton = () => {
      return (
        <button>hi</button>
      );
    }
    const data = MySubmitList && MySubmitList.length > 0 && MySubmitList.map((submit, index) => {
      // console.log(submit);

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
    const columns = [
      { title: "결과", dataIndex: "result", key: "result", width: 650, },
      { title: "제출시간", dataIndex: "submit_time", key: "submit_time", width: 110, },
      {
        title: "내 코드", dataIndex: "coding", key: "coding", width: 100,
        render: (text, row, index) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=800,height=600,scrollbars=no`;
              localStorage.setItem("code", row.code);
              const code = window.open("/codeview", "codeview", options);
            }}>
            소스보기
          </div>
        )
      }
    ]

    // return (MySubmitList && MySubmitList.length > 0 ?
    //   <TableWrapper>
    //     <Table
    //       columns={
    //         columns
    //       }
    //       data={
    //         data
    //       }
    //       tableLayout="auto"
    //     />
    //   </TableWrapper>
    //   :
    //   <div style={{ margin: "auto", marginTop: "25px", width: "max-content", fontFamily: "Noto Sans KR", fontSize: "1.25rem", textAlign: "center" }}>
    //     {loading
    //       ? "제출 이력을 가져오고 있습니다."
    //       : "제출 이력이 없습니다."}
    //   </div>
    // )
    return (MySubmitList && MySubmitList.length > 0 ?
      <TableWrapper>
        <NewTable>
          <th className="header_result">결과</th>
          <th className="header_time">제출시간</th>
          <th className="header_code">내 코드</th>
          {
            data.map((item, index) => {
              return (
                <tr>
                  <td className="result" dangerouslySetInnerHTML={{ __html: item.result }} />
                  <td className="time">{item.submit_time}</td>
                  <td className="code">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=800,height=600,scrollbars=yes`;
                        localStorage.setItem("code", item.code);
                        const code = window.open("/codeview", "codeview", options);
                      }}>
                      소스보기
                    </div>
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
// //

// const mapDispatchToProps = (dispatch) => {
//   return {
//     SetViewCode: (code) => dispatch(SetViewCode(code))
//   }
// }
// connect(
//   // (state)=>{ }
//   null
//   ,
//   mapDispatchToProps
// )(SubmitLogContainer)
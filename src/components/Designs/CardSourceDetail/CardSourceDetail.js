import React, { Component, Fragment } from "react";
import update from "react-addons-update";
// import { Controller } from "./Controller";
import styled from "styled-components";
import FileIcon from "components/Commons/FileIcon";
import Loading from "components/Commons/Loading";
import { FileUploadRequest } from "redux/modules/design";

import osdcss from "opendesign_style";
import FileController from "./FileController";
// import TextController from "./TextControllerClassic";
import TextController from "./TextControllerPlus";
import EmbController from "./EmbController";

// css styling
const ControllerWrap = styled.div`
  position: relative;
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
 transform: translate(-50%, -50%);
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
 transform: translate(-50%, -50%);
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
  transform: translate(-50%, -50%);
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

const ViewContent = styled.div`
  position: relative;
  .imgContent{
    img{
      max-width: 100%;
    }
    text-align: center;
    margin-bottom: 2rem;
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
    this.state = { edit: false, content: this.props.content || [], origin: this.props.origin || [], loading: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddValue = this.onAddValue.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.moveUpItem = this.moveUpItem.bind(this);
    this.moveDownItem = this.moveDownItem.bind(this);
  }
  componentDidMount() {
    if (this.props.uid !== "new") {
      this.props.GetDesignSourceRequest(this.props.uid)
        .then(async () => {
          await this.setState({ content: this.props.content || [], origin: this.props.origin || [] });
        })
    }
  }
  async shouldComponentUpdate(nextProps) {
    if (nextProps.hook === true) {
      this.props.handleResetHook && await this.props.handleResetHook();
      await this.onSubmit();
    }
    if (this.props.closed === false && nextProps.closed === true) {
      this.props.handleClosed && this.props.handleClosed(this.state.content);
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
  }
  async onChangeValue(data, order) {
    this.setState({ content: update(this.state.content, { [order]: { content: { $set: data.content } } }) });
  }
  async onDelete(order) {
    if (window.confirm("선택하신 컨텐츠를 삭제하시겠습니까?") === false) {
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
  }
  async moveItem(data) {
    if (!this.state.content) {
      return;
    }
    let copyContent = [...this.state.content];
    let indexOld = -1;
    let indexNew = -1;
    for (var i = 0; i < copyContent.length; i++) {
      if (copyContent[i].order === data.old) {
        indexOld = i;
      }
      if (copyContent[i].order === data.new) {
        indexNew = i;
      }
    }
    let t = copyContent[indexOld];
    copyContent[indexOld] = copyContent[indexNew];
    copyContent[indexNew] = t;
    copyContent[indexNew].order = data.new;
    copyContent[indexOld].order = data.old;
    await this.setState({ content: copyContent });
  }
  async moveUpItem(order) {
    this.moveItem({ old: order, new: order - 1 });
  };
  async moveDownItem(order) {
    this.moveItem({ old: order, new: order + 1 });
  };

  async onSubmit(event) {
    let newContent = [...this.state.content];
    let oldContent = [...this.state.origin];
    if (newContent === oldContent) {
      alert("변경된 내용이 없습니다.")
      return;
    }
    if (event != null) event.preventDefault();

    let formData = { updateContent: [], newContent: [], deleteContent: [] }
    // get updatecontent
    //order
    for (var i = 0; i < newContent.length; i++) {
      if (newContent[i].order !== i) {
        newContent[i].order = i;
      }
    }
    for (i = 0; i < oldContent.length; i++) {
      if (oldContent[i].order !== i) {
        formData.updateContent.push(oldContent[i]);
      }
    }
    //content
    for (i = 0; i < newContent.length; i++) {
      if (newContent[i].uid == null) continue;
      let found = oldContent.filter(item => {
        return (item.uid === newContent[i].uid
          && ((item.content !== newContent[i].content))
        )
      });
      if (found.length > 0) {
        formData.updateContent.push(newContent[i]);
      }
    }

    // get newcontent
    newContent.map(item => {
      if (item.uid == null) {
        delete item.initClick;
        if (item.type === "TEXT") {
          item = { type: item.type, content: item.content, order: item.order, extension: item.extension, data_type: item.data_type, file_name: null };
        }
        console.log("item:", item);
        formData.newContent.push(item);
      }
    })
    // get deletecontent
    for (i = 0; i < oldContent.length; i++) {
      let found = newContent.filter(item => { return item.uid === oldContent[i].uid });
      if (found.length === 0) {
        formData.deleteContent.push(oldContent[i]);
      }
    }

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
      this.props.handleSubmit && await this.props.handleSubmit(event);
      await this.props.upDateRequest(formData, this.props.uid, this.props.token)
        .then(this.props.UpdateDesignTime(this.props.designId, this.props.token))
        .then(() => {
          this.props.GetDesignSourceRequest(this.props.uid)
            .then(async () => {
              await this.setState({ content: this.props.content, origin: this.props.origin });
            })
        })
      await this.props.GetCardDetailRequest(this.props.uid);
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
    const { edit, content, loading } = this.state;
    console.log("debug - CardSourceDetail:", this.state.loading, "loading");
    return (<div>
      {loading ? <Loading /> : null}
      {/* <ButtonContainer>
        {edit === false && !this.props.edit && this.props.isTeam && (content && content.length > 0 ?
          (<div className="content-edit-wrapper">
            <button onClick={() => this.setState({ edit: !edit })} className="content-edit-button">컨텐츠 수정</button></div>) :
          (<div className="content-add-wrapper">
            <button onClick={() => this.setState({ edit: !edit })} className="content-add-button" >컨텐츠 추가</button></div>))}
      </ButtonContainer> */}

      {/* view mode */}
      {this.props.uid && (!edit && !this.props.edit) && content.length > 0 &&
        <ViewContent>
          {content.map((item, index) => {
            if (item.type === "FILE" && item.data_type === "image")
              return <div className="imgContent" key={index}>
                <img key={index} src={item.content} alt="이미지" download={item.file_name} /></div>

            if (item.type === "FILE" && item.data_type === "video")
              return <span>
                <span className="LinkFileName">{item.file_name}</span>
                <video key={index} width="640" height="360" controls="controls" className="iconWrap" >
                  <source src={item.content} type="video/mp4" download={item.file_name}></source></video>
              </span>

            if (item.type === "FILE" && item.data_type !== "image" && item.data_type !== "video")
              return <a key={index} href={item.content} download={item.file_name} className="iconWrap">
                <FileIcon type={item.data_type} extension={item.extension} />
                <span className="LinkFileName">{item.file_name}</span>
              </a>

            if (item.type === "TEXT") {
              return <div className="textWrap" key={index} dangerouslySetInnerHTML={{ __html: `${item.content}` }} />
            }
          })}
        </ViewContent>}

      {/* edit mode */}
      {(edit || this.props.edit || (edit && this.props.uid !== "new")) ? (
        content && content.length > 0 ? (<Fragment>
          {content.map(item => {
            return (<ControllerWrap key={item.order}>
              <div className="contentWrap">
                {item.type === "FILE" ? (<FileController item={item} name="source" initClick={this.state.click} getValue={this.onChangeFile} setController={this.setController} />) : null}
                {item.type === "TEXT" ? (<TextController item={item} name={item.name} initClick={this.state.click} getValue={(data) => this.onChangeValue(data, item.order)} />) : null}
                {item.type === "EMBED" ? (<EmbController />) : null}
              </div>

              <DelBtn type="button" className="editBtn" onClick={() => this.onDelete(item.order)}><i className="trash alternate icon large" /></DelBtn>
              {content.length - 1 >= item.order && item.order !== 0 ? <UpBtn type="button" className="editBtn" onClick={() => this.moveUpItem(item.order)}><i className="angle up alternate icon large" /></UpBtn> : null}
              {content.length - 1 !== item.order && item.order >= 0 ? <DownBtn type="button" className="editBtn" onClick={() => this.moveDownItem(item.order)}><i className="angle down alternate icon large" /></DownBtn> : null}
            </ControllerWrap>)
          })}
          <AddContent getValue={this.onAddValue} order={content.length} />
        </Fragment>) : <AddContent getValue={this.onAddValue} order={0} />
      ) : null}

      <ButtonContainer >
        {(this.props.edit && this.props.uid) &&
          <EditorBottonWrapper>
            <button onClick={this.onSubmit} className="submit" type="button">
              <i className="icon outline save" />저장</button>
            <button onClick={this.onCancel} className="cancel" type="button">
              <i className="icon trash" />취소</button>
          </EditorBottonWrapper>}
      </ButtonContainer>
    </div>);
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
    background-color: #FAFAFA;
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
    height: 45px;
    align-items: center;
    justify-content: center;
    list-style: none;
  }
`;
const NewController = styled.li`
  width: ${props => props.width};
  height: ${props => props.height};
  margin-left: 75px;
  line-height: 29px;
  color: #FF0000;
  padding-bottom: 1.5px;
  border-bottom: 1.5px solid #FF0000;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;
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
          <NewController onClick={() => this.addContent("FILE")} width="max-content" minWidth="116px" height="29px">파일 등록하기</NewController>
          <NewController onClick={() => this.addContent("TEXT")} width="max-content" minWidth="134px" height="29px">텍스트 입력하기</NewController>
        </div>
        {this.state.type === "FILE" && <FileController item={this.state} getValue={this.returnData} />}
      </ControllerWrap2>
    );
  }
}


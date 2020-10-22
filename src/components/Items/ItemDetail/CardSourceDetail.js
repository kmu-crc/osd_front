import React, { Component } from "react";
import styled from "styled-components";
// import Button from "components/Commons/Button";
import FileIcon from "components/Commons/FileIcon";
import Loading from "components/Commons/Loading";
import { AddController, Controller } from "components/Commons/InputItem";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";

const ContentForm = async (data, oldData) => {
  let formData = {
    updateContent: [],
    newContent: [],
    deleteContent: []
  }
  formData.deleteContent = await [...data.deleteContent];
  await data.content.map(async item => {
    delete item.target;
    if (item.uid) {
      const oldItem = oldData.filter(oldItem => oldItem.uid === item.uid)[0];
      if (
        item.content !== oldItem.content ||
        item.order !== oldItem.order ||
        item.private !== oldItem.private) {
        await formData.updateContent.push(item);
      }
    } else {
      await formData.newContent.push(item);
    }
  });
  return formData;
}
const CardSrcWrap = styled.div`
  background-color: #fff;
  margin: auto;
  & form {
    margin: 20px 0;
  }
  & .ui.loader {
    top: auto;
    bottom: 70vh;
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
  .textWrap{
    margin-bottom: 2rem;
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
const Nodata = styled.div`
  text-align: center;
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
const PrivateContentWrapper = styled.div`
  padding: 25px 10px;
  margin-right:50px;
  margin-bottom:20px;
  margin-top:20px;
  border-radius: 15px;
  line-height: 35px;
  text-align: center;
  font-size: 25px;
  color: #707070;
  background-color: #EFEFEF;
`;
class CardSourceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      content: [...this.props.content] || [],
      deleteContent: [],
      loading: false
    };
  };
  componentDidMount() {
    this.setState({ content: this.props.content });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.content !== prevProps.content) {
      this.setState({ content: this.props.content });
      return true;
    }
    if (this.props.fromNewCardModal && (this.state.content !== prevState.content)) {
      this.props.fromNewCardModal(this.state.content);
    }
  };

  onAddValue = async data => {
    console.log("modify1");
    let copyContent = [...this.state.content];
    let copyData = { ...data };
    console.log("on add value:", copyData);
    copyData.initClick = true;
    for (let item of copyContent) {
      if ((item.content_type === "FILE" && item.fileUrl == null) && (item.content_type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1, null);
      }
    }
    await copyContent.splice(copyData.order, 0, copyData);

    // let newContent = [];
    //copyContent = copyContent.map((item, index) => {
    //  if(item != null){
    //    newContent.push(item);
    //  }
    //})
    let newContent = copyContent.filter((item) => { return item !== null })
    newContent = await Promise.all(
      newContent.map(async (item, index) => {
        item.order = await index;
        delete item.target;
        if (item.content_type === "FILE") delete item.initClick;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    await this.setState({ content: newContent });
    this.props.handlerModifyContent();

  //   let formData = await ContentForm(this.state, this.props.content);
  //   if (formData && (formData.newContent.length !== 0 && formData.updateContent.length !== 0 && formData.deleteContent.length !== 0)) {
  //     this.props.isModify(true);
  // }
  };
  onSubmit = async e => {
    console.log("modify1");
    e.preventDefault();
    let copyContent = [...this.state.content];
    for (let item of copyContent) {
      if ((item.content_type === "FILE" && item.fileUrl == null) && (item.content_type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1);
      }
    }
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        item.order = await index;
        return item;
      })
    );
    await this.setState({ content: copyContent });
    let formData = await ContentForm(this.state, this.props.content);
    await this.setState({ loading: true });
    await setTimeout(() => { }, 500);

    // PROJECT-TYPE
    if (this.props.submit) {
      if (this.props.isModify==true) {
        await alert("변경된 사항이 없습니다.");
        this.setState({loading:false});
        this.props.handleCloseEdit();
        return;
      } else{
        if(await confirm("수정된 내용을 저장합니다.","확인","취소")){
          this.props.submit(formData);
        }
      }
    }
    //BLOG-TYPE
    else {
      if (this.props.isModify==true) {
        await alert("변경된 사항이 없습니다.");
        this.setState({loading:false});
        this.props.handleCloseEdit();
        return;
      } else {
        if(await confirm("수정된 내용을 저장합니다.","확인","취소")){
        this.props.upDateRequest(formData, this.props.cardId, this.props.token)
          .then(async res => {
            if (res.data.success) {
              // await alert("아이템 컨텐츠를 수정하였습니다.");
              window.location.href = `/productDetail/${this.props.ItemDetail["item-id"]}`
            }
          })
        }
      }
    }
    await this.setState({ loading: false });
  };


  bindPrivate = contents => {
    console.log("modify1");
    let binded = [];
    for (let item of contents) {
      if (item.private) {
        const last = binded.length > 0 ? binded.length - 1 : 0;
        if (binded.length > 0 && binded[last].private) {
          binded[last].count++;
        } else {
          item.count = 1;
          binded.push(item);
        }
      } else {
        binded.push(item);
      }
    }
    return binded;
  };
  privateItem = async data => {
    console.log("modify1");
    let copyContent = JSON.parse(JSON.stringify(this.state.content || []));
    for (let item of copyContent) {
      if (item.order === data.order) {
        item.private = data.private === 0 ? 1 : 0;
      }
    }
    await this.setState({ content: copyContent });
    this.props.handlerModifyContent();
  };
  deleteItem = async index => {
    console.log("modify1");
    let copyContent = [...this.state.content];
    let copyDelete = [...this.state.deleteContent];
    if (copyContent[index].uid) {
      copyDelete.push(copyContent[index]);
    }
    await copyContent.splice(index, 1);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        delete item.target;
        item.order = await index;
        return item;
      })
    );
    await this.setState({ content: copyContent, deleteContent: copyDelete });
    this.props.handlerModifyContent();
  };
  onChangValue = async data => {
    console.log(this.props);
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
    this.props.handlerModifyContent();
  };

  render() {
    const { loading, content } = this.state;
    // console.log(this.props);
    /* {this.props.ItemDetail.public === "yes" ? "공개" : "비공개"} */

    return (
      <React.Fragment>
        {loading ? <Loading /> : null}

        <CardSrcWrap>
          {this.props.edit ? (
            <form onSubmit={this.onSubmit}>
              {content.length > 0 && content.map((item, index) =>
                <Controller
                  mode={this.props.mode}
                  name={`content${index}`} type={item.type}
                  order={index} maxOrder={content.length - 1}
                  key={index} item={item}
                  privateItem={this.privateItem}
                  deleteItem={this.deleteItem}
                  getValue={this.onChangValue}
                />)}

              <AddController
                mode={this.props.mode}
                name="addBasic" type="INIT"
                order={content.length > 0 ? content.length : 0}
                getValue={this.onAddValue} />

              <ButtonContainer>
                <EditorBottonWrapper>
                  <button onClick={this.onSubmit} className="submit" type="button">
                    <i className="icon outline save" />저장하기</button>
                  <button onClick={() => { this.setState({ content: this.props.content || "" }); this.props.handleCancel() }} className="cancel" type="button">
                    <i className="icon trash" />취소하기</button>
                </EditorBottonWrapper>
              </ButtonContainer>
            </form>
          ) : null}

          {!this.props.edit ?
            content.length > 0 ? (
              <ViewContent>
                {this.bindPrivate(content).map((item, index) =>
                  item.private === 1 && this.props.bought === false ?
                    <PrivateContentWrapper key={index}>
                      {item.count}개의 비공개 항목이 있습니다.<br />
                      이 항목{item.count > 1 ? "들" : ""}을 열람하시고 싶으시다면 이 아이템을 구매해주세요.
                      </PrivateContentWrapper> :
                    // <PrivateContent count={item.count} key={index} /> :
                    item.content_type === "FILE" && item.data_type === "image" ? (
                      <div className="imgContent" key={index}>
                        <img key={index} src={item.content} alt="이미지" download={item.file_name} />
                      </div>
                    ) : item.content_type === "FILE" && item.data_type === "video" ? (
                      <span>
                        <span className="LinkFileName">{item.file_name}</span>
                        <video key={index} width="640" height="360" controls="controls" className="iconWrap" >
                          <source src={item.content} type="video/mp4" download={item.file_name}></source>
                        </video>
                      </span>
                    ) : item.content_type === "FILE" && item.data_type !== "image" && item.data_type !== "video" ? (
                      <a key={index} href={item.content} download={item.file_name} className="iconWrap">
                        <FileIcon type={item.data_type} extension={item.extension} />
                        <span className="LinkFileName">{item.file_name}</span>
                      </a>
                    ) : item.content_type === "TEXT" ? (
                      <div
                        className="textWrap"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: `${item.content}` }}
                      />
                    ) : null
                )}
              </ViewContent>
            ) : (<Nodata>
              {/*{
                this.props.isTeam === 1 
                ? <Button round={true} color="Primary" size="small" onClick={this.props.openEdit}>업로드</Button>
                : <div>등록된 컨텐츠가 없습니다.</div>
              }*/}
            </Nodata>) : null}

        </CardSrcWrap>
      </React.Fragment>
    );
  }
}

export default CardSourceDetail;

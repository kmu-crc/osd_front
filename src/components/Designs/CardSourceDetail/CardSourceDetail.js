import React, { Component } from "react";
import styled from "styled-components";
import { Controller } from "./Controller";
import Button from "components/Commons/Button";
import AddController from "./AddController";
import ContentForm from "./ContentForm";
import FileIcon from "components/Commons/FileIcon";
import Loading from "components/Commons/Loading";

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

class CardSourceDetail extends Component {
  state = {
    edit: false,
    content: [],
    deleteContent: [],
    loading: false
  };

  componentDidMount() {
    this.props.GetDesignSourceRequest(this.props.uid);
  }

  async shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(this.props.editStatus) !==
      JSON.stringify(nextProps.editStatus)
    ) {
      if (nextProps.editStatus === "SUCCESS") {
        await this.setState({ edit: false });
        this.props.GetDesignSourceRequest(this.props.uid);
        await this.setState({loading: false});
        this.props.closeEdit();
      } else if(nextProps.editStatus === "FAILURE") {
        await this.setState({loading: false});
        this.props.closeEdit();
      }
    }
    if (
      JSON.stringify(this.props.status) !== JSON.stringify(nextProps.status)
    ) {
      if (nextProps.status === "SUCCESS") {
        this.setState({ content: nextProps.content });
      }
    }
    return true;
  }

  onChangValue = async data => {
    console.log(data, "1");
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
  };

  onAddValue = async data => {
    let copyContent = [...this.state.content];
    let copyData = { ...data };
    copyData.initClick = true;
    for (let item of copyContent) {
      if((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")){
        await copyContent.splice(item.order, 1, null);
      }
    }
    await copyContent.splice(copyData.order, 0, copyData);

    let newContent = [];
    copyContent = copyContent.map((item, index) => {
      if(item != null){
        newContent.push(item);
      }
    })
    newContent = await Promise.all(
      newContent.map(async (item, index) => {
        item.order = await index;
        delete item.target;
        if (item.type === "FILE") delete item.initClick;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    await this.setState({ content: newContent });
  };

  deleteItem = async index => {
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
  };

  onSubmit = async e => {
    e.preventDefault();
    let copyContent = [...this.state.content];
    for (let item of copyContent) {
      if((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")){
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
    await this.setState({content: copyContent});
    let formData = await ContentForm(this.state);
    await this.setState({loading: true});
    await setTimeout(() => {}, 500);
    
    this.props.upDateRequest(formData, this.props.uid, this.props.token)
      .then(this.props.UpdateDesignTime(this.props.design_id, this.props.token))
  }


  render() {
    const { edit, content } = this.state;
    return (
      <CardSrcWrap>

        {this.props.edit ? (
          <form onSubmit={this.onSubmit}>
            {content.length > 0 ? (
              <div>
                {content.map((item, index) => {
                  return (
                    <div key={index}>
                      <AddController
                        type="INIT"
                        order={index}
                        name={`add${index}`}
                        getValue={this.onAddValue}
                      />
                      <Controller
                        type={item.type}
                        item={item}
                        order={index}
                        deleteItem={this.deleteItem}
                        name={`content${index}`}
                        getValue={this.onChangValue}
                      />
                    </div>
                  );
                })}
                <AddController
                  type="INIT"
                  order={content.length}
                  name="addBasic"
                  getValue={this.onAddValue}
                />
              </div>
            ) : (
              <AddController
                type="INIT"
                order={0}
                name="addBasic"
                getValue={this.onAddValue}
              />
            )}
            <Button type="button" onClick={this.onSubmit}>
              저장
            </Button>
            {
              this.props.isCancel ? (
                  <Button type="button" onClick={this.props.onCancel}>취소</Button>) : (
                  <Button type="button" onClick={this.props.closeEdit}>취소</Button> )
            }
          </form>
        ) : content.length > 0 ? (
          <ViewContent>
            {/* {this.props.isTeam === 1 &&
              <Button round={true} size="small" className="goEdit"
                      onClick={() => this.setState({ edit: !this.state.edit })}>
                컨텐츠 수정
              </Button>
            } */}
            {content.map((item, index) => {
              return item.type === "FILE" && item.data_type === "image" ? (
                <div className="imgContent" key={index}>
                  <img key={index} src={item.content} alt="이미지" download={item.file_name} />
                </div>
              ) : item.type === "FILE" && item.data_type == "video" ? (
                <span>
                <span className="LinkFileName">{item.file_name}</span>
                <video key={index} width="640" height="360" controls="controls" className="iconWrap" >
                <source src={item.content} type="video/mp4" download={item.file_name}></source>
                </video>
                </span>
              ) : item.type === "FILE" && item.data_type !== "image" && item.data_type !== "video" ? (
                <a key={index} href={item.content} download={item.file_name} className="iconWrap">
                  <FileIcon type={item.data_type} extension={item.extension} />
                  <span className="LinkFileName">{item.file_name}</span>
                </a>
              ) : item.type === "TEXT" ? (
                <div
                  className="textWrap"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: `${item.content}` }}
                />
              ) : null;
            })}
          </ViewContent>
        ) : (
          <Nodata>
            {/* {this.props.isTeam === 1 ?
            <Button round={true} color="Primary" size="small" onClick={this.props.openEdit}>
              업로드
            </Button>
            :
            <div>등록된 컨텐츠가 없습니다.</div>
            } */}
            <div>{/*등록된 컨텐츠가 없습니다.*/}</div>
          </Nodata>
        )}
        {this.state.loading && <Loading/>}
      </CardSrcWrap>
    );
  }
}

export default CardSourceDetail;

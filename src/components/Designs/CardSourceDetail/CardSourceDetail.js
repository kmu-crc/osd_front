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
`;

const ViewContent = styled.div`
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

  shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(this.props.editStatus) !==
      JSON.stringify(nextProps.editStatus)
    ) {
      if (nextProps.editStatus === "SUCCESS") {
        this.setState({ edit: false });
        this.props.GetDesignSourceRequest(this.props.uid);
        this.setState({loading: false});
      } else if(nextProps.editStatus === "FAILURE") {
        this.setState({loading: false});
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
    let copyContent = [...this.state.content];
    delete data.initClick;
    await copyContent.splice(data.order, 1, data);

    await this.setState({ content: copyContent });
  };

  onAddValue = async data => {
    let copyContent = [...this.state.content];
    let copyData = { ...data };
    copyData.initClick = true;
    await copyContent.splice(copyData.order, 0, copyData);

    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        item.order = await index;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    console.log("copyContent", copyContent);
    await this.setState({ content: copyContent });
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
        item.order = await index;
        return item;
      })
    );
    await this.setState({ content: copyContent, deleteContent: copyDelete });
  };

  onSubmit = async e => {
    e.preventDefault();
    let copyContent = [...this.state.content];
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        item.order = await index;
        return item;
      })
    );
    await this.setState({content: copyContent})
    let formData = await ContentForm(this.state);
    console.log(formData);
    await setTimeout(() => {

    }, 500);
    await this.setState({loading: true});
    this.props.UpdateDesignSourceRequest(
      formData,
      this.props.uid,
      this.props.token
    );
  };

  render() {
    const { edit, content } = this.state;
    return (
      <CardSrcWrap>
        <button onClick={() => this.setState({ edit: !this.state.edit })}>
          컨텐츠 수정
        </button>
        {edit ? (
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
            <Button type="submit" round={true}>
              저장
            </Button>
          </form>
        ) : content.length > 0 ? (
          <ViewContent>
            {content.map((item, index) => {
              return item.type === "FILE" && item.data_type === "image" ? (
                <div className="imgContent">
                  <img key={index} src={item.content} alt="이미지" />
                </div>
              ) : item.type === "FILE" && item.data_type !== "image" ? (
                <a key={index} href={item.content} className="iconWrap">
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
          <div>컨텐츠 없음</div>
        )}
        {this.state.loading && <Loading/>}
      </CardSrcWrap>
    );
  }
}

export default CardSourceDetail;

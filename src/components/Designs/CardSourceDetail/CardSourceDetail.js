import React, { Component } from "react";
import styled from "styled-components";
import { Controller } from "./Controller";
import Button from "components/Commons/Button";
import AddController from "./AddController";
import ContentForm from "./ContentForm";

const CardSrcWrap = styled.div`
  width: 70%;
  background-color: #fff;
  margin: auto;
  & form {
    margin: 20px 0;
  }
`;

const ViewContent = styled.div`
  img {
    width: 100%;
  }
`;

class CardSourceDetail extends Component {
  state = {
    edit: true,
    content: [],
    deleteContent: []
  };

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
    if(copyContent[index].uid){
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

  onSubmit = async (e) => {
    e.preventDefault();
    let formData = await ContentForm(this.state);
    console.log(formData);
  }

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
            <Button type="submit" round={true}>저장</Button>
          </form>
        ) : content.length > 0 ? (
          <ViewContent>
            {content.map((item, index) => {
              return item.type === "FILE" ? (
                <img key={index} src={item.content} alt="이미지" />
              ) : item.type === "TEXT" ? (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: `${item.content}` }}
                />
              ) : null;
            })}
          </ViewContent>
        ) : (
          <div>컨텐츠 없음</div>
        )}
      </CardSrcWrap>
    );
  }
}

export default CardSourceDetail;

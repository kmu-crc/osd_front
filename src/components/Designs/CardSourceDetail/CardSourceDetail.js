import React, { Component } from "react";
import styled from "styled-components";
import { Controller } from "./Controller";
import Button from "components/Commons/Button";

const CardSrcWrap = styled.div`
  width: 70%;
  height: 600px;
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
    content: [
      {
        uid: 1,
        content: "<h1>하이하이</h1><p>dsfadsfasdfsadf</p>",
        order: 0,
        type: "TEXT",
        data_type: "TEXT",
        extension: "TEXT"
      },
      {
        uid: 2,
        content:
          "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/images/1530458646369.jpg",
        type: "FILE",
        order: 1,
        data_type: "image/jpg",
        extension: "jpg"
      },
      {
        uid: 3,
        content:
          "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/images/1530458646369.jpg",
        type: "FILE",
        order: 2,
        data_type: "application/vnd.amazon.ebook",
        extension: "azw"
      }
    ],
    newContent: [],
    deleteContent: [],
    editContent: []
  };

  onChangValue = async data => {
    console.log("detail",data);
    if(data.content){
      let copyContent = [...this.state.content];
      console.log("copyContent", copyContent);
      copyContent.splice(data.order, 0, data);
      await this.setState({content: copyContent});
      console.log("detail", this.state.content);
    }
  }

  render() {
    const { edit, content } = this.state;
    return (
      <CardSrcWrap>
        <button onClick={() => this.setState({ edit: !this.state.edit })}>
          컨텐츠 수정
        </button>
        {edit ? (
          <form>
            {content.length > 0 ? (
              content.map((item, index) => {
                return (
                  <div key={index}>
                    <Controller
                      type="INIT"
                      order={index}
                      name={`add${index}`}
                      getValue={this.onChangValue}
                    />
                    <Controller
                      type={item.type}
                      item={item}
                      order={index}
                      name={`content${index}`}
                      getValue={this.onChangValue}
                    />
                  </div>
                );
              })
            ) : (
              <Controller type="INIT" order={0} name="addBasic" />
            )}
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

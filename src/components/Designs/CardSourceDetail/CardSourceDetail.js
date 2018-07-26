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

class CardSourceDetail extends Component {
  state = {
    edit: false,
    content: [],
    newContent: [],
    deleteContent: [],
    editContent: [],
  };

  render() {
    const { edit, content } = this.state;
    return (
      <CardSrcWrap>
        <button onClick={()=>this.setState({edit: !this.state.edit})}>컨텐츠 수정</button>
        {edit
        ? <form>
            {content.length > 0
            ? content.map((item, index) => {
                return (
                  <div key={index}>
                    <Controller type="INIT" />
                    <Controller type={item.type} content={item.content} />
                  </div>
                );
              })
            : <Controller type="INIT" />
            }
          </form>
        : content.length > 0
        ? content.map((item, index) => {
            return <div key={index}>{item.uid}{item.content}</div>;
          })
        : <div>컨텐츠 없음</div>
        }
      </CardSrcWrap>
    );
  }
}

export default CardSourceDetail;

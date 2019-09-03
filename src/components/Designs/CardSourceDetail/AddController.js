import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import FileController from "./FileController";

const ControllerWrap = styled.div`
  // padding: 15px 0;
  margin: 20px 0;
  position: relative;
  text-align: center;

  border: 1px dashed ${StyleGuide.color.geyScale.scale6};
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${StyleGuide.color.geyScale.scale6};
    }
  }
  &:hover {
    background-color: #FAFAFA;
    & .initWrap {
      & > ul {
        display: flex;
      }
      & > span {
        color: ${StyleGuide.color.geyScale.scale6};
      }
    }
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

class AddController extends Component {
  state = {
    type: null,
    content: "",
    order: null
  }
  addContent = async (type) => {
    if (type === "FILE") {
      await this.setState({ type, order: this.props.order, content: "", initClick: true });
      // 처음 fileController가 동작하기 위해서는 initClick가 true여야 하지만 한번 동작한 후에는 false 바뀌어야
      // 최종적으로 저장을 눌렀을때 파일 선택창이 반복해서 뜨지않는다.
      // 조금 걱정되는것은 현재 타이머를 걸어 0.1초 뒤에 initClick를 false로 바꿔주게 해놨는데
      // 나중에 컴퓨터사양이 느리거나 인터넷이 느린곳에서 오작동할 우려가 있다....
      // 좀 더 지켜봐야할 것 같다.
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
      <ControllerWrap>
        <div style={{ height: "45px", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <NewController onClick={() => this.addContent("FILE")} width="116px" height="29px">파일 첨부하기</NewController>
          <NewController onClick={() => this.addContent("TEXT")} width="134px" height="29px">텍스트 첨부하기</NewController>
        </div>
        {this.state.type === "FILE" && <FileController item={this.state} getValue={this.returnData} />}
      </ControllerWrap>
    );
  }
}

export default AddController;

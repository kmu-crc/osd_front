import React, { Component } from "react";
import styled from "styled-components";
import { FileController } from "components/Commons/InputItem/FileController";
import market_style from "market_style";
const ControllerWrap = styled.div`
  // padding: 15px 0;
  margin: 20px 0;
  position: relative;
  text-align: center;

  border: 1px dashed #878D91;
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: #878D91;
    }
  }
  &:hover {
    background-color: #FAFAFA;
    & .initWrap {
      & > ul {
        display: flex;
      }
      & > span {
        color: #878D91;
      }
    }
  }
  .innerBox {
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: center;
    list-style: none;
    padding: 35px;
  }
`;
const NewController = styled.li`
  width: ${props => props.width};
  height: ${props => props.height};
  margin-left: 35px;
  margin-right: 35px;
  line-height: 29px;
  color: #FF0000;
  padding-bottom: 1.5px;
  border-bottom: 1.5px solid #FF0000;
  font-size: ${market_style.font.size.normal3};
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;
`;

export class AddController extends Component {
  state = {
    type: null,
    content: "",
    order: null,
    private: 0
  }
  addContent = async (type) => {
    if (type === "FILE") {
      await this.setState({ type, order: this.props.order, content: "", initClick: true, private: 0 });
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
      await this.setState({ type: null, order: this.props.order, content: "", initClick: false, private: 0 })
      this.props.getValue(data);
    } else {
      if (this.props.getValue) this.props.getValue(this.state);
    }
  }
  render() {
    return (
      <ControllerWrap>
        <div className="innerBox" >
          {this.props.onlytext ? null : <NewController onClick={() => this.addContent("FILE")} className="first" width="max-content" height="29px">파일 등록</NewController>}
          {this.props.onlyfile ? null : <NewController onClick={() => this.addContent("TEXT")} width="max-content" height="29px">텍스트 입력</NewController>}
        </div>
        {this.state.type === "FILE" && <FileController item={this.state} getValue={this.returnData} />}
      </ControllerWrap>
    );
  }
}

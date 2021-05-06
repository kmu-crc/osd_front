import React, { Component } from 'react';
import styled from 'styled-components';

import { FileController, } from "components/Commons/InputItem";

const ControllerWrap2 = styled.div`
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
      background - color: #FAFAFA;
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


export class CodingAddContent extends Component {
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
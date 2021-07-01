import React, { Component } from "react";
import styled from "styled-components";
import { FileController } from "components/Commons/InputItem/FileController";
import market_style from "market_style";
const ControllerWrap = styled.div`
  // padding: 15px 0;
  margin: 30px 0;
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
    padding: 6px 0px;
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
  font-size: ${market_style.font.size.small1};
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;
`;

const ControllerWrap_mobile = styled.div`
  width:100%;
  padding:10px;
  box-shadow: 1px 1px 5px #00000029;
  .innerBox {
  }
  .marginBottom{
    margin-bottom:10px;
  };
`;
const NewController_mobile = styled.li`
  width:100%;
  height:30px;
  color: #FF0000;
  font-size: ${market_style.font.size.small1};
  font-weight: 500;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:#F7F7F7;
  border-radius:10px;
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
      await this.setState({ type, order: this.props.order, content: "", initClick: false, private: 0 });
      // setTimeout(() => {
      //   this.setState({ initClick: false });
      // }, 100);
    }
    if (type === "TEXT") {
      await this.setState({ type, order: this.props.order, content: "" });
    }
    if (type === "PROBLEM") {
      await this.setState({ type, order: this.props.order, content: "", notyet: true });
    }
    this.returnData();
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
      <React.Fragment>
        {window.innerWidth >= 500 ?
          <ControllerWrap>
            <div className="innerBox" >
              {this.props.onlytext ? null : <NewController onClick={() => this.addContent("FILE")} className="first" width="max-content" height="29px">파일 등록</NewController>}
              {this.props.onlyfile ? null : <NewController onClick={() => this.addContent("TEXT")} width="max-content" height="29px">텍스트 입력</NewController>}
              {this.props.isProgramming ? <NewController onClick={() => this.addContent("PROBLEM")} widht="max-content" height="29px">문제 등록</NewController> : null}
            </div>
            {/* {this.state.type === "FILE" && <FileController item={this.state} getValue={this.returnData} />} */}
          </ControllerWrap>
          :
          <ControllerWrap_mobile>
            <div className="innerBox" >
              {this.props.onlytext ? null : <NewController_mobile onClick={() => this.addContent("FILE")} className="marginBottom" width="max-content" height="29px">파일 등록</NewController_mobile>}
              {this.props.onlyfile ? null : <NewController_mobile onClick={() => this.addContent("TEXT")} className="marginBottom" width="max-content" height="29px">텍스트 입력</NewController_mobile>}
              {this.props.isProgramming ? <NewController_mobile onClick={() => this.addContent("PROBLEM")} widht="max-content" height="29px">문제 등록</NewController_mobile> : null}
            </div>
            {/* {this.state.type === "FILE" && <FileController item={this.state} getValue={this.returnData} />} */}
          </ControllerWrap_mobile>
        }
      </React.Fragment>
    );
  }
}

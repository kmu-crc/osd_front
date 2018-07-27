import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Icon } from "semantic-ui-react";
import TextController from "./TextController.js";
import EmbController from "./EmbController";

// css styling
const ControllerWrap = styled.div`
  padding: 20px 0;
  position: relative;
  &:hover {
    border: 2px dashed ${StyleGuide.color.geyScale.scale6};
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

const ControllerMenu = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  justify-content: center;
  align-items: space-between;
  color: #fff;
  & li {
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: ${StyleGuide.color.geyScale.scale7};
  }
  & li:hover {
    background-color: ${StyleGuide.color.geyScale.scale8};
  }
`;

const Init = styled.span`
  padding-left: 20px;
  color: ${StyleGuide.color.geyScale.scale4};
`;

export class Controller extends Component {
  state = {
    controller: "INIT"
  };

  async componentDidMount(){
    if(this.props.type) await this.setState({controller: this.props.type})
  }

  setController = (type) => {
    this.setState({
      controller: type
    });
  }

  render() {
    const { controller } = this.state;
    const { content } = this.props;
    return (
      <ControllerWrap>
        {controller === "INIT" ? (
          <div className="initWrap">
            <Init>추가 +</Init>
            <ControllerMenu>
            <li onClick={()=>this.setController("FILE")}>
              <Icon name="upload" size="mini"/>
              FILE
            </li>
            <li onClick={()=>this.setController("TEXT")}>
              <i className="text height mini icon"/>
              TEXT
            </li>
            <li onClick={()=>this.setController("EMBED")}>
              <i className="angle left icon"/>
              <i className="angle right icon"/>
              EMBED
            </li>
          </ControllerMenu>
        </div>
        ) : controller === "FILE" ? (
          <div className="fileWrap">
            <input type="file" placeholder="파일을 등록해주세요"/>
            <button type="button" onClick={()=>this.setController("INIT")}>취소</button>
          </div>
        ) : controller === "TEXT" ? (
          <div className="textWrap">
            <TextController/>
            <button type="button" onClick={()=>this.setController("INIT")}>취소</button>
          </div>
        ) : controller === "EMBED" ? (
          <div className="embWrap">
            <EmbController/>
            <button type="button" onClick={()=>this.setController("INIT")}>취소</button>
          </div>
        ) : null}
      </ControllerWrap>
    );
  }
}

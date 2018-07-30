import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Icon } from "semantic-ui-react";

const ControllerWrap = styled.div`
  padding: 20px 0;
  margin: 15px 0;
  position: relative;
  border: 2px dashed white;
  img {
    width: 100%;
  }
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

const Init = styled.span`
  padding-left: 20px;
  color: ${StyleGuide.color.geyScale.scale4};
`;

const ControllerMenu = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  overflow: hidden;
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

class AddController extends Component {

  addContent = async (type) => {
    await this.setState({type, order:this.props.order, content: ""});
    this.returnData();
  }

  returnData = async () => {
    if(this.props.getValue) this.props.getValue(this.state);
  }
  render() {
    return (
      <ControllerWrap>
        <div className="initWrap">
          <Init>추가 +</Init>
          <ControllerMenu>
            <li onClick={() => this.addContent("FILE")}>
              <Icon name="upload"/>
              FILE
            </li>
            <li onClick={() => this.addContent("TEXT")}>
              <Icon name="font"/>
              TEXT
            </li>
            <li onClick={() => this.addContent("EMBED")}>
              <Icon name="code" />
              EMBED
            </li>
          </ControllerMenu>
        </div>
      </ControllerWrap>
    );
  }
}

export default AddController;

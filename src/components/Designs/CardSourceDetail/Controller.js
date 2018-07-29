import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Icon } from "semantic-ui-react";
import TextController from "./TextController.js";
import FileController from "./FileController";
import { FormFile } from "components/Commons/FormItems";
import FileIcon from "components/Commons/FileIcon";

// css styling
const ControllerWrap = styled.div`
  padding: 20px 0;
  position: relative;
  border: 2px dashed white;
  img{
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

const Init = styled.span`
  padding-left: 20px;
  color: ${StyleGuide.color.geyScale.scale4};
`;

export class Controller extends Component {
  state = {
    type: "INIT",
    order: 0,
    click: false
  };

  async componentDidMount() {
    if (this.props.type) await this.setState({ type: this.props.type, order: this.props.order });
  }

  setController = async type => {
    await this.setState({
      type: type,
      click: false
    });
  };

  InitClick = async () => {
    await this.setState({ click: true });
  }

  onChangeValue = async data => {
    console.log("onChange", data);
    await this.setState(data);
    this.returnDate();
  }

  returnDate = async (e) => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  }

  render() {
    const { type } = this.state;
    const { item, name } = this.props;
    return (
      <ControllerWrap>
        {type === "INIT" ? (
          <div className="initWrap" onClick={this.InitClick}>
            <Init>추가 +</Init>
            <ControllerMenu>
              <li onClick={() => this.setController("FILE")}>
                <Icon name="upload" size="mini" />
                FILE
              </li>
              <li onClick={() => this.setController("TEXT")}>
                <i className="text height mini icon" />
                TEXT
              </li>
              <li onClick={() => this.setController("EMBED")}>
                <i className="angle left icon" />
                <i className="angle right icon" />
                EMBED
              </li>
            </ControllerMenu>
          </div>
        ) : type === "FILE" ? (
          <div className="fileWrap">
            <FileController item={item} setController={this.setController} initClick={this.state.click} name="source" getValue={this.onChangeValue}/>
          </div>
        ) : type === "TEXT" ? (
          <div className="textWrap">
            <TextController item={item} name={name} setController={this.setController} initClick={this.state.click} />
          </div>
        ) : type === "EMBED" ? (
          <div className="embWrap">
            <textarea style={{ border: 0, width: "100%" }} />
            <button type="button" onClick={() => this.setController("INIT")}>
              취소
            </button>
          </div>
        ) : null}
      </ControllerWrap>
    );
  }
}

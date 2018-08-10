import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Icon } from "semantic-ui-react";
import TextController from "./TextController.js";
import FileController from "./FileController";
import { FormFile } from "components/Commons/FormItems";
import FileIcon from "components/Commons/FileIcon";
import EmbController from "./EmbController";

// css styling
const ControllerWrap = styled.div`
  position: relative;
  border: 2px dashed white;
  &:hover {
    .editBtn {
      display: block;
    }
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
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const EditBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: ${StyleGuide.color.sub.bule.basic};
  color: white;
  text-align: center;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  outline: 0;
  i.icon {
    margin: 0;
  }
  &:focus .subMenu {
    display: block;
  }
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  outline: 0;
  transform: translate(-20px, 140%);
  background-color: ${StyleGuide.color.geyScale.scale7};
  width: 9rem;
  border-radius: 3px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  &::before {
    display: block;
    content: "";
    top: -5px;
    left: 25px;
    position: absolute;
    transform: rotate(135deg);
    border-top: 7.5px solid transparent;
    border-right: 7.5px solid transparent;
    border-left: 7.5px solid ${StyleGuide.color.geyScale.scale7};
    border-bottom: 7.5px solid ${StyleGuide.color.geyScale.scale7};
    border-radius: 3px;
  }
  li {
    line-height: 30px;
    color: ${StyleGuide.color.geyScale.scale0};
    text-align: center;
  }
`;

export class Controller extends Component {
  state = {
    type: "INIT",
    order: 0,
    click: false
  };

  async componentDidMount() {
    if (this.props.type)
      await this.setState({ type: this.props.type, order: this.props.order });
  }

  InitClick = async () => {
    await this.setState({ click: true });
  };

  onChangeValue = async data => {
    let newObj = { ...data };
    console.log("newObj", newObj);
    await this.setState(data);
    this.returnDate();
  };

  deleteItem = async => {
    if (this.props.deleteItem) this.props.deleteItem(this.props.item.order);
  };

  returnDate = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  render() {
    const { item, name } = this.props;
    return (
      <ControllerWrap>
        <div className="contentWrap">
            {item.type === "FILE" ? (
              <FileController
                item={item}
                setController={this.setController}
                initClick={this.state.click}
                name="source"
                getValue={this.onChangeValue}
                deleteItem={this.deleteItem}
              />
            ) : item.type === "TEXT" ? (
              <TextController
                item={item}
                name={name}
                getValue={this.onChangeValue}
                initClick={this.state.click}
                deleteItem={this.deleteItem}
              />
            ) : item.type === "EMBED" ? (
              <EmbController />
            ) : null}
          </div>
          <EditBtn type="button" className="editBtn">
            <i className="pencil alternate icon" />
            <SubMenu className="subMenu">
              <li onClick={this.deleteItem}>삭제</li>
            </SubMenu>
          </EditBtn>
      </ControllerWrap>
    );
  }
}

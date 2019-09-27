import React, { Component } from "react";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import TextController from "./TextController";
import FileController from "./FileController";
import EmbController from "./EmbController";

// css styling
const ControllerWrap = styled.div`
  position: relative;
  &:hover {
    border: 1px dashed ${opendesign_style.color.grayScale.scale3};
    background-color: ${opendesign_style.color.grayScale.scale0};
    .editBtn {
      display: block;
    }
  }
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const DelBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: ${opendesign_style.color.main.basic};
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
    console.log("debug>onChangeValue", newObj);
    await this.setState(data);
    this.returnDate();
  };

  deleteItem = async => {
    if (this.props.deleteItem) {
      if (window.confirm("선택된 항목을 정말 삭제하시겠습니까?")) {
        this.props.deleteItem(this.props.item.order)
      }
    }
  };

  returnDate = async e => {
    console.log("debug>returnData");
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  render() {
    const { item, name } = this.props;
    return (
      <ControllerWrap>
        <div className="contentWrap">
          {item.type === "FILE" ? (
            <FileController item={item} name="source" initClick={this.state.click} getValue={this.onChangeValue} deleteItem={this.deleteItem} setController={this.setController} />
          ) : item.type === "TEXT" ? (
            <TextController item={item} name={name} initClick={this.state.click} getValue={this.onChangeValue} deleteItem={this.deleteItem} />
          ) : item.type === "EMBED" ? (<EmbController />) : null}
        </div>
        <DelBtn type="button" className="editBtn" onClick={this.deleteItem}>
          <i className="trash alternate icon large" />
        </DelBtn>
      </ControllerWrap>
    );
  }
}

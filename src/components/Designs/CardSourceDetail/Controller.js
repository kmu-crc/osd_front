import React, { Component } from "react";
import styled from "styled-components";
import osdcss from "opendesign_style";
import TextController from "./TextControllerClassic";
import FileController from "./FileController";
import EmbController from "./EmbController";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
// css styling
const ControllerWrap = styled.div`
  position: relative;
  &:hover {
    border: 1px dashed ${osdcss.color.grayScale.scale3};
    background-color: ${osdcss.color.grayScale.scale0};
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
const UpBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 90%;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: blue;
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
const DownBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 95%;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: blue;
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
const DelBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: ${osdcss.color.main.basic};
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
  constructor(props) {
    super(props);
    this.state = { type: "INIT", order: 0, click: false };
    this.InitClick = this.InitClick.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.moveDownItem = this.moveDownItem.bind(this);
    this.moveUpItem = this.moveUpItem.bind(this);
  }
  async shouldComponentUpdate(nextProps) {
    if (nextProps.content !== this.props.content)
      return true;
  }
  async componentDidMount() {
    if (this.props.type)
      await this.setState({ type: this.props.type, order: this.props.order });
  }
  async InitClick() {
    await this.setState({ click: true });
  };
  async onChangeValue(data) {
    let newObj = { ...this.props.item };
    await this.setState({ ...newObj, data });
    // this.returnDate();
    // returnDate = async e => {
    if (this.props.getValue)
      await this.props.getValue(this.state);
    // if (e && this.props.onBlur)
    // await this.props.onBlur();
    // };
    //console.log("updated:(changed):", this.props.item.content, this.state.content);
  };

  async deleteItem() {
    if (this.props.deleteItem) {
      if (await confirm("선택된 항목을 정말 삭제하시겠습니까?","예","아니오")) {
        this.props.deleteItem(this.props.item.order)
      }
    }
  };
  async moveUpItem() {
    if (this.props.moveUp) {
      this.props.moveUp({ old: this.props.item.order, new: this.props.item.order - 1 });
    }
  };
  async moveDownItem() {
    if (this.props.moveDown) {
      this.props.moveDown({ old: this.props.item.order, new: this.props.item.order + 1 });
    }
  };

  render() {
    const { item, name, maxOrder } = this.props;
    return (
      <ControllerWrap>
        <div className="contentWrap">
          {item.type === "FILE" ? (
            <FileController item={item} name="source" initClick={this.state.click} getValue={this.onChangeValue} deleteItem={this.deleteItem} setController={this.setController} />
          ) : item.type === "TEXT" ? (
            <TextController item={item} name={name} initClick={this.state.click} getValue={this.onChangeValue} deleteItem={this.deleteItem} />
          ) : item.type === "EMBED" ? (<EmbController />) : null}
        </div>
        <DelBtn type="button" className="editBtn" onClick={this.deleteItem}><i className="trash alternate icon large" /></DelBtn>
        {maxOrder - 1 >= item.order && item.order !== 0 ? <UpBtn type="button" className="editBtn" onClick={this.moveUpItem}><i className="angle up alternate icon large" /></UpBtn> : null}
        {maxOrder - 1 !== item.order && item.order >= 0 ? <DownBtn type="button" className="editBtn" onClick={this.moveDownItem}><i className="angle down alternate icon large" /></DownBtn> : null}
      </ControllerWrap>
    );
  }
}



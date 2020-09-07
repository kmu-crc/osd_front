import React, { Component } from "react";
import styled from "styled-components";
// import StyleGuide from "StyleGuide";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from "react-confirm-alert";
import { options } from "components/Commons/InputItem/AlertConfirm"
const StyleButton = styled.div`
  width:290px;
  height:70px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.reverse==null?"red":"white"};
  border:${props=>props.reverse==null?null:"1px solid red"};
  cursor:pointer;
  margin-right:30px;
  .text{
    color:${props=>props.reverse==null?"white":"red"};;
    font-family:Noto Sans CJK KR, Regular;
    font-size:25px;
  }
  &:hover{
      opacity:90%;
  }
`
export class RedButton extends Component {

    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
    }
    onClickButton(event) {
        if(this.props.onClick == null)return;
        if (this.props.isConfirm === false) {
            this.props.onClick(event);
        }
        else {
            confirmAlert(options(this.props.value + "하시겠습니까?", this.props.onClick, event));
        }
    }
    onClickOk(event) {
        this.props.onClick(event);
        this.setState({ open: false });
    }
    onClickCancel(event) {
        this.setState({ open: false });
    }

    render() {
        return (
            <React.Fragment>
                <StyleButton reverse={this.props.reverse} onClick={this.onClickButton}>
                    <div className="text">{this.props.value}</div>
                </StyleButton>
            </React.Fragment>
        );
    }
}
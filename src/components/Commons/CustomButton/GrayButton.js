import React, { Component } from "react";
import styled from "styled-components";
// import StyleGuide from "StyleGuide";
// import { Button, Confirm } from 'semantic-ui-react'
import { confirmAlert } from "react-confirm-alert";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import { options } from "components/Commons/InputItem/AlertConfirm"

const StyleButton = styled.div`
  width:290px;
  height:70px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  margin-right:30px;
  border:1px solid black;
  .text{
    color:black;
    font-family:Noto Sans CJK KR, Regular;
    font-size:25px;
  }
  &:hover{
      opacity:90%;
  }
`
export class GrayButton extends Component {

    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
    }
    onClickButton= async event=> {
        if (this.props.isConfirm === false) {
            this.props.onClick(event);
        }
        else {
            
            if (await confirm(this.props.text==null?this.props.value + "하시겠습니까?":this.props.text, "예", "아니오") === false) {
                return;
            }else{
                this.props.onClick(event);
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <StyleButton onClick={this.onClickButton}>
                    <div className="text">{this.props.value}</div>
                </StyleButton>
            </React.Fragment>
        );
    }
}
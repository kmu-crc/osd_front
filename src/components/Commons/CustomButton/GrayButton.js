import React, { Component } from "react";
import styled from "styled-components";
// import StyleGuide from "StyleGuide";
// import { Button, Confirm } from 'semantic-ui-react'
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";
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
    font-size: ${market_style.font.size.giant3};
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
            
            if (await confirm(this.props.text==null?this.props.value + "하시겠습니까?":this.props.text, this.props.okText==null?"예":this.props.okText,this.props.cancelText==null? "아니오":this.props.cancelText) === false) {
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
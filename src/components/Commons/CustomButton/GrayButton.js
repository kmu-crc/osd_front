import React, { Component } from "react";
import styled from "styled-components";
// import StyleGuide from "StyleGuide";
// import { Button, Confirm } from 'semantic-ui-react'
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";
const StyleButton = styled.div`
    width:${props=>props.width==null?"290px":props.width+"px"};
    height:${props=>props.height==null?"70px":props.height+"px"};
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  margin-right:20px;
  border:${props=>props.isWhite==null?"none":"1px solid #707070"};
  background-color:${props=>props.isWhite==null?"#707070":"white"};
  .text{
    color:${props=>props.isWhite==null?"white":"#707070"};
    font-weight:400;
    font-family:Noto Sans KR;
    font-size: ${props=>props.fontSize==null?market_style.font.size.giant2:props.fontSize+"px"};
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
                <StyleButton width={this.props.width} height={this.props.height} fontSize={this.props.fontSize} isWhite={this.props.isWhite} onClick={this.onClickButton}>
                    <div className="text">{this.props.value}</div>
                </StyleButton>
            </React.Fragment>
        );
    }
}
import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const Button = styled.div`
  width:290px;
  height:70px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:red;
  cursor:pointer;
  margin-right:30px;
  .text{
    color:white;
    font-family:Noto Sans KR;
    font-size:30px;
    font-weight:500;
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
    onClickButton(event){
        if(this.props.onClick!=null)
        {
            if(this.props.isConfirm===true&&window.confirm(this.props.value+"하시겠습니까?")==true){
                this.props.onClick(event);
            }else{
                this.props.onClick(event);
            }
        }
    }
    render() {
        return (
            <Button onClick={this.onClickButton}>
                <div className="text">{this.props.value}</div>
            </Button>
        );
    }
}
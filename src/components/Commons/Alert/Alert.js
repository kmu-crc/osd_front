import React from "react";
import { Modal } from "semantic-ui-react";
import styled from "styled-components"
import { confirmable, createConfirmation } from "react-confirm";

const ModalBox = styled(Modal)`
    *{
        // border:1px solid black;
        font-family: Noto Sans KR;
    }
    max-width: 500px;
    // height: 200px;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    
    padding: 20px;

    .titleBox{
        margin-bottom: 10px;

    }
    .messageBox{
        width: 100%;
        display:flex;
        align-items:center;
        padding:20px;
        .message{
            font-size:20px;
            font-weight:500;
            line-height:30px;
        }
    }
    .buttonBox{
        width: 100%;
        height:20%;
        margin-top:5px;
        display:flex;
        justify-content:flex-end;
    }
    animation:modalSlide 0.5s ease-out forwards;
    @keyframes modalSlide {
        from {
          transform: translateY(-10%);
          opacity: 0;
        }
      
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

`
const Button = styled.div`
    z-index:1200;
    width:max-content;
    height:100%;
    background-color:${props => props.color === "red" ? "red" : "gray"};
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:10px 30px 10px 30px;
    border-radius:5px;
    margin-left:10px;
    cursor:pointer;
    .text{
        font-family:Noto Sans KR;
        font-size:20px;
    }
`

class Alert extends React.Component {
    render() {
        const {
            proceedLabel, title, confirmation,
            show, proceed, //enableEscape = true
        } = this.props;

        return (
            <ModalBox
                open={show}
                onClose={() => proceed(false)}>

                {title ?
                    <div className="titleBox">
                        {title}</div>
                    : null}

                <div className="messageBox">
                    <div className="message">
                        {confirmation}
                    </div>
                </div>

                <div className="buttonBox">
                    <Button color="red" onClick={() => proceed(true)}>
                        <div className="text">{proceedLabel}</div>
                    </Button>
                </div>
            </ModalBox>
        );
    }
}
export function alert(confirmation, proceedLabel = "확인", options = {}) {
    return createConfirmation(confirmable(Alert))({
        confirmation, proceedLabel, ...options
    });
}
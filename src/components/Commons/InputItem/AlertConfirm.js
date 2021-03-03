import React from "react";
import styled from "styled-components";
import { Modal } from "semantic-ui-react"
import market_style from "market_style";

const ModalBox = styled(Modal)`
*{
    // border:1px solid black;
    font-family:Noto Sans KR;
}
    width:500px;
    height:200px;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius:20px;
    


    padding:20px;

    .messageBox{
        width:100%;
        height:80%;
        display:flex;
        align-items:center;
        .message{
            font-size: ${market_style.font.size.big2};
            font-weight:500;
            line-height:30px;
        }
    }
    .buttonBox{
        width:100%;
        height:20%;
        margin-top:5px;
        display:flex;
        justify-content:flex-end;
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
        font-size: ${market_style.font.size.normal3};
    }
`

export const options = (message, func, event) => {

    // const {open,setOpen}=useState(true);
    return (
        {
            message: message,
            childrenElement: () => <div />,
            customUI: ({ message, onClose }) => {
                return (
                    <ModalBox open={true}>
                        <div className="messageBox">
                            <div className="message">
                                {message}
                            </div>
                        </div>
                        <div className="buttonBox">
                            <Button color="gray" onClick={() => { onClose() }}><div className="text">취소하기</div></Button>
                            <Button color="red" onClick={async () => {
                                await func(event);
                                await onClose();
                            }}><div className="text">확인하기</div></Button>
                        </div>
                    </ModalBox>
                )
            },
            willUnmount: () => { }
        }
    );

}

export const optionsAlter = (message) => {

    return (
        {
            message: message,
            childrenElement: () => <div />,
            customUI: ({ message, onClose }) => {
                return (
                    <ModalBox className='custom-ui'>
                        <div className="messageBox">
                            <div className="message">
                                {message}
                            </div>
                        </div>
                        <div className="buttonBox">
                            <Button color="red" onClick={() => { onClose(); }}><div className="text">확인</div></Button>
                        </div>
                    </ModalBox>
                )
            },
            willUnmount: () => { }
        }
    );

}
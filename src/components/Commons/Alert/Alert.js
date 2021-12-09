import React from "react";
import { Modal } from "semantic-ui-react";
import styled from "styled-components"
import { confirmable, createConfirmation } from "react-confirm";

const ModalBox_mobile = styled(Modal)`
    min-width:265px;
    max-width:265px;
    min-height:152px;
    border-radius: 0px !important;
    padding: 18px;

    display:flex;
    flex-direction:column;
    justify-content:space-between;
    .wrapper{
        width:100%;
        min-height:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    }
    .titleBox{
        margin-bottom: 10px;
    }
    .messageBox{
        width: 100%;
        min-height:110px;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;

        .message{
            font-size:14px;
            font-weight:400;
            line-height:19px;           
            font-family:Spoqa Han Sans Neo;
        }
    }
    .buttonBox{
        width: 100%;
        height:20%;
        margin-top:5px;
        display:flex;
        justify-content:center;
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
const ModalBox = styled(Modal)`
    *{
        font-family: Noto Sans KR;
    }
    max-width: 654px;
    width:100%;
    height: 375px;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    
    padding: 20px;
    
    .titleBox{
        margin-bottom: 10px;

    }
    .messageBox{
        width: 100%;
        height:80%;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        .message{
            font-size:37px;
            font-weight:500;
            line-height:44px;
            font-family:Spoqa Han Sans Neo;
        }
    }
    .buttonBox{
        width: 100%;
        height:20%;
        margin-top:5px;
        display:flex;
        justify-content:center;
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
const Button_mobile = styled.div`
    z-index:1200;
    max-width:64px;
    width:100%;
    height:17px;
    background-color:${props => props.color === "red" ? "red" : "black"};
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:20px;
    margin-right:20px;
    cursor:pointer;
    box-shadow: 8px 8px 8px #4141411A;

    .text{
        font-family:Noto Sans KR;
        font-size:10px;
    }
`

const Button = styled.div`
    z-index:1200;
    max-width:158px;
    width:100%;
    height:41px;
    background-color:${props => props.color === "red" ? "red" : "black"};
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:10px 30px 10px 30px;
    margin-left:10px;
    cursor:pointer;
    box-shadow: 8px 8px 8px #4141411A;

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
            <React.Fragment>
                {
                    window.innerWidth<500?
                    <ModalBox_mobile
                    open={show}
                    onClose={() => proceed(false)}>
                    <div className="wrapper">    
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
                        <Button_mobile color="red" onClick={() => proceed(true)}>
                            <div className="text">{proceedLabel}</div>
                        </Button_mobile>
                    </div>
                    </div>
                    </ModalBox_mobile>
                    :
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
                }
            </React.Fragment>
        );
    }
}
export function alert(confirmation, proceedLabel = "확인", options = {}) {
    return createConfirmation(confirmable(Alert))({
        confirmation, proceedLabel, ...options
    });
}
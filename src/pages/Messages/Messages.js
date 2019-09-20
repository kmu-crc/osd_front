import React from 'react';
import styled from "styled-components";
import plusImg from "source/plus_cross_gray.png";


const Banner = styled.div`
    width: 100%;
    height: 48px;
    margin-top: 8px;
    background-color: #EFEFEF;
    .BannerText = { 
        width: 74px;
        height: 29px;
        display: inline-block;
        margin-top: 9px;
        margin-left: 65px;
        font-size: 20px;
        font-family: Noto Sans KR;
        font-weight: 500;
        text-align: center;
        color: #707070;
        line-height: 29px;
    }
`;

const MessageBox = styled.div`
    width: 1750px;
    height: 869px;
    margin: 26px 0px 27px 65px;
`;
const MessageAside = styled.div`
    display: inline-block;
    width: 445px;
    height: 100%;
    margin-right: 7px;
    overflow: hidden;
    border-radius: 25px 0 0 25px;
    background-color: #EFEFEF;
    .MessageAsideHeader{ 
        position: relative;
        height: 75px;
        overflow: hidden;
    }
    .MessageAsideHeaderTitle{ 
        position: absolute;
        width: 303px;
        height: 30px;
        left: 54px;
        top: 33px;
        line-height: 30px;
        font-size: 20px;
        font-family: Noto Sans KR;
        font-weight: 500;
        text-align: left;
        color: #707070;
    }
    .MessageAsideHeaderIcon{ 
        position: absolute;
        width: 51px;
        height: 51px;
        right: 20px;
        bottom: 0px;
        background: url(${props => props.img};
        background-size: cover;
        background-position: center center;
        opacity: 0.5;
    }
    .MessageAsideSection{ 
        height: 794px;
    }
`;

const MessageSection = styled.div`
    overflow: hidden;
    display: inline-block;
    width: 1298px;
    height: 100%;
    padding-left: 26px;
    padding-right: 23px;
    border-radius: 0px 25px 25px 0px;
    background-color: #EFEFEF;
    .MessageSectionBoard {
        height: 671.5px;
    }
    .MessageDivisionLine {
        border-top: 1px solid #707070;
    }
    .MessageSectionSend {
        overflow: hidden;
        position: relative;
        height: 197.5px;
    }
    .MessageSectionTextArea {
        position: absolute;
        width: 1091px;
        height: 147px;
        top: 24.5px;
        border: none;
        outline: none;
        resize: none;
        background-color: #EFEFEF;
        font-size: 18px;
        text-align: left;
        font-weight: 500;
        line-height: 27px;
        color: #707070;
    };
    .MessageSectionSendBtn {
        position: absolute;
        width: 117px;
        height: 170px;
        right: 0px;
        border-radius: 0px 0px 25px 0px;
        background-color: #FFFFFF;
        font-size: 18px;
        font-weight: 500;
        line-height: 170px;
        text-align: center;
    };
`;

class Messages extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Banner>
                    <div className="BannerText">메시지함</div>
                </Banner>

                <MessageBox>
                    <MessageAside>
                        <div className="MessageAsideHeader">
                            <div className="MessageAsideHeaderTitle">받은 메시지함</div>
                            <div className="MessageAsideHeaderIcon" img={plusImg}/>
                        </div>
                        <div className="MessageAsideSection" />
                    </MessageAside>

                    <MessageSection>
                        <div className="MessageSectionBoard" />
                        <div className="MessageDivisionLine" />
                        <div className="MessageSectionSend">
                            <input type="textarea" className={MessageSectionTextArea} />
                            <div className={MessageSectionSendBtn}>전송하기</div>
                        </div>
                    </MessageSection>
                </MessageBox>
            </React.Fragment>);
    }
}

export default Messages;

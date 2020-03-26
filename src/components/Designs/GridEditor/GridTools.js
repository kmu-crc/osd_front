import React from 'react';
import Cross from "components/Commons/Cross";
import DateFormat from "modules/DateFormat";
import styled from "styled-components";
import PxtoRem from "modules/PxtoRem";

const CreateStepContainer = styled.div`
    position: relative;
    display: flex;
    width: 200px;
    height: 77px;
    border-radius: 15px;
    background-clip: padding-box;
    margin-right: ${props => props.marginRight}px;
    border: 2px solid rgba(112,112,112, 0.5);
    cursor: pointer;
    .close-box{
        poistion: relative;
        margin-top: 22.5px;
        margin-left: 19.5px;
        margin-right: 15px;
    }
    .create-button{
        opacity: ${props => props.disabled}; 
        margin-top: 23px;
        height: 29px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size: 20px;
        text-align: left;
        line-height: 29px;
    }
`;
export const CreateStep = (props) => {
    return (<CreateStepContainer marginRight={props.marginRight} disabled={props.disabled ? 0.5 : 1.0} onClick={props.onClick}>
        <div className="close-box">
            <Cross angle={90} width={33} height={33} disabled={false} /></div>
        <div className="create-button">{props.step} 생성하기</div>
    </CreateStepContainer>)
}
export const CreateCard = (props) => {
    return (<div onClick={props.onClick}
        style={{
            width: "200px", height: "200px", marginRight: props.marginRight,
            borderRadius: "15px", backgroundClip: "padding-box", border: "2px solid rgba(112,112,112, 0.5)",
            cursor: "pointer"
        }}>
        <div style={{ position: "relative", marginTop: "38.58px", marginLeft: "66.59px" }}>
            <Cross angle={90} width={66.68} height={66.68} disabled={false} /></div>
        <div style={{ opacity: props.disabled ? "0.5" : "1.0", marginTop: "32.23px", height: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", textAlign: "center", lineHeight: "29px" }}>컨텐츠 등록하기</div>
    </div>)
}
export const TipDiv = (props) => {
    return (<div>
        <div style={{ color: "#FF0000" }}>TIP</div>
        <div style={{ color: "#707070", fontSize: "17px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{props.txt}</div>
    </div>)
}
const StepCardStyle = styled.div`
    position: relative;
    cursor: pointer;
    display: flex;
    width: 200px;
    height: 77px;
    border-radius: 15px;
    border: 2px solid #707070;
    margin-top: ${props => props.marginTop}px;
    margin-left: ${props => props.marginLeft}px;
    margin-right: ${props => props.marginRight}px;
    margin-bottom: ${props => props.marginBottom}px;
    background-clip: padding-box;
    background-color: white;
    overflow:hidden;
    .text-area{
        margin-top: 24px;
        margin-left: 12px;
        height: 29px;
        width: 178px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size: 20px;
        text-align: center;
        line-height: 29px;
    }
    :hover{
        .icon-area{
            display: block;
        }
    }
    .icon-area{
        opacity: 0.5;
        display: none;
        position: absolute;
        margin-left: 165px;
        margin-top: 25px;
    }
`;
export const StepCard = (props) => {
    return (<StepCardStyle marginTop={props.marginTop} marginLeft={props.marginLeft} marginRight={props.marginRight} marginBottom={props.marginBottom} onClick={props.onClick} id={props.id} uid={props.uid} title={props.title}>
        <div className="icon-area">{props.children}</div>
        <div className="text-area" id={props.id} uid={props.uid} title={props.title}>{props.title.slice(0, 10)} {props.title.length > 10 ? "..." : ""} </div>
    </StepCardStyle >)
}
const CardContainer = styled.div`
    position: relative;
    z-index: 700;
    cursor: pointer;
    width: ${PxtoRem(200)};
    height: ${PxtoRem(200)};
    border-radius: 15px;
    overflow:hidden;
    border: 2px solid rgba(112, 112, 112, 1);
    background-color: rgba(112, 112, 112, .15);
    margin-top:${props => props.marginTop};
    margin-left:${props => props.marginLeft};
    margin-right:${props => props.marginRight};
    margin-bottom:${props => props.marginBottom};
    background-clip: padding-box;
    background-size: cover;
    background-position: 50%;
    background-image: url(${props => props.first_img && props.first_img.m_img});
    :hover{
        .icon-area{
            display: block;
        }
    }
    .icon-area{
        color: ${props => props.first_img ? "white" : "black"};
        z-index: 720;
        opacity: 0.5;
        display: none;
        position: absolute;
        margin-left: 165px;
        margin-top: 25px;
    }
}}>
`;
const AuthorBox = styled.div`
  z-index: 702;
  background: rgba(234, 234, 234, 0.35);
  width: 170px;
  height: 63px;
  border-radius: 5px;
  font-family: Noto Sans KR;
  font-weight: 300;
  color: #707070;
  text-align: center;
  margin-top: 120px;
  margin-left: 13px;
  padding: 8px;
`;

export const ContentCard = (props) => {
    // const { card, marginTop, marginRight, marginBottom, marginLeft } = props;
    return (props.card
        ? <CardContainer uid={props.uid} id={props.id} onClick={props.onClick} marginTop={props.marginTop} marginLeft={props.marginLeft} marginRight={props.marginRight} marginBottom={props.marginBottom} first_img={props.card.first_img}>
            <div className="icon-area">{props.children}</div>
            {props.card.first_img ?
                <React.Fragment>
                    {/* <div style={{ zIndex: "701", cursor: "pointer", position: "absolute", width: "100%", height: "100%", background: "transparent linear-gradient(180deg, #000000 0%, #020202F7 16%, #FFFFFF26 100%)" }} /> */}
                    <div style={{ zIndex: "701", cursor: "pointer", position: "absolute", width: "100%", height: "100%", background: "transparent linear-gradient(-180deg, rgba(32,32,32, 0.5) 0%, rgba(255,255,255, 0) 50%)" }} />
                    <div style={{ zIndex: "702", position: "absolute", width: "165px", height: "74px", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500", color: "#FFFFFF", textAlign: "center", lineHeight: "40px", marginTop: "27px", marginLeft: "19px" }}>
                        {props.card.title.slice(0, 10)}
                    </div>
                    {/* <div style={{ zIndex: "702", background: "transparent linear-gradient(270deg, #00000000 0%, #FFFFFFA1 13%, #FFFFFF 52%, #FFFFFF94 82%, #80808000 100%)", position: "absolute", width: "195px", height: "53px", fontFamily: "Noto Sans KR", fontWeight: "300", color: "#707070", textAlign: "center", marginTop: "128px", marginLeft: "auto" }}> */}
                    {/* #EAEAEA */}
                    <AuthorBox>
                        <div style={{ fontSize: "17px", fontWeight: "400" }}>{props.card.nick_name.slice(0, 10)}</div>
                        <div style={{ fontSize: "15px", marginTop: "6px", fontWeight: "400" }}>{DateFormat(props.card.update_time)}</div>
                    </AuthorBox>
                </React.Fragment> :
                <React.Fragment>
                    <div style={{ zIndex: "702", position: "absolute", width: "165px", height: "74px", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500", color: "#707070", textAlign: "center", lineHeight: "40px", marginTop: "27px", marginLeft: "19px" }}>
                        {props.card.title && props.card.title.slice(0, 10)}
                    </div>
                    <div style={{ zIndex: "702", position: "absolute", width: "195px", height: "53px", fontFamily: "Noto Sans KR", fontWeight: "300", color: "#707070", textAlign: "center", marginTop: "128px", marginLeft: "auto" }}>
                        <div style={{ fontSize: "17px" }}>
                            {props.card.nick_name && props.card.nick_name.slice(0, 10)}
                        </div>
                        <div style={{ fontSize: "15px", marginTop: "6px" }}>
                            {DateFormat(props.card.update_time)}
                        </div>
                    </div>
                </React.Fragment>}
        </CardContainer>
        : <CardContainer />
    )
}

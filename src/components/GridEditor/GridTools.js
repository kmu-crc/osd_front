import React from 'react';
import Cross from "components/Commons/Cross";
import DateFormat from "modules/DateFormat";
import styled from "styled-components";
import PxtoRem from "modules/PxtoRem";
import { Icon } from 'semantic-ui-react'
import market_style from "market_style";

const CreateCardContainer = styled.div`
    width: 150px;
    height: 150px;
    margin-right: ${props => props.marginRight}px;
    border-radius: 15px; 
    background-clip: padding-box; 
    border: 2px solid rgba(112, 112, 112, 0.5);
    cursor: pointer;
    
    .cross-wrapper {
        width: max-content;
        position: relative;
        margin: auto;
        margin-top: 35px;
    }
    .text {
        width: 100%;
        padding: 5px;
        opacity: ${props => props.disabled ? "0.5" : "1.0"};
        margin-top: 10px;
        height: 29px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size:${market_style.font.size.small1};
        text-align: center;
        line-height: 15px;
    }
`;
const CreateStepContainer = styled.div`
    position: relative;
    display: flex;
    width: 150px;
    height: 40px;
    border-radius: 10px;
    background-clip: padding-box;
    margin-right: ${props => props.marginRight}px;
    border: 1px solid rgba(112,112,112, 0.5);
    cursor: pointer;
    .close-box{
        poistion: relative;
        margin-top: 9px;
        margin-left: 9px;
    }
    .create-button{
        opacity: ${props => props.disabled}; 
        margin-top: 2px;
        margin-left: 10px;
        height: 29px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size:${market_style.font.size.small1};
        text-align: left;
        line-height: 29px;
    }
`;
// export const CreateStep = (props) => {
//     return (<CreateStepContainer marginRight={props.marginRight} disabled={props.disabled ? 0.5 : 1.0} onClick={props.onClick}>
//         <div className="close-box">
//             <Cross angle={90} width={33} height={33} disabled={false} /></div>
//         <div className="create-button">{props.step} 생성</div>
//     </CreateStepContainer>)
// }
// export const CreateCard = (props) => {
//     return (<CreateCardContainer marginRight={props.marginRight} onClick={props.onClick} disabled={props.disabled}>
//         <div className="cross-wrapper" >
//             <Cross angle={90} width={66.68} height={66.68} disabled={false} /></div>
//         <div className="text">컨텐츠 등록</div>
//     </CreateCardContainer>)
// }
// export const TipDiv = (props) => {
//     return (<div>
//         <div style={{ color: "#FF0000" }}>TIP</div>
//         <div style={{ color: "#707070", fontSize: "17px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{props.txt}</div>
//     </div>)
// }
const StepCardStyle = styled.div`

    // width: 200px;
    // height: 77px;
    // border-radius: 15px;
    // border: 2px solid #707070;

    position: relative;
    cursor: pointer;
    display: flex;
    justify-content:center;
    align-items:center;
    width: 150px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #B7B7B7;

    margin-top: ${props => props.marginTop}px;
    margin-left: ${props => props.marginLeft}px;
    margin-right: ${props => props.marginRight}px;
    margin-bottom: ${props => props.marginBottom}px;

    background: #FFFFFF 0% 0% no-repeat padding-box; // background-clip: padding-box; // background-color: white;
    overflow:hidden;

    padding: 9px;

    .text-area{
        width: 100%;
        font-size:${market_style.font.size.small1}; //-> 15px;
        line-height: 22px;
        font-familiy: Noto Sans KR;
        text-align: center;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
const CardContainer = styled.div`
    position: relative;
    // z-index: 700;
    z-index:1;
    cursor: pointer;
    // width: ${PxtoRem(200)};
    // height: ${PxtoRem(200)};
    width: ${PxtoRem(150)};
    height: ${PxtoRem(150)};
    overflow:hidden;
    // border-radius: 15px;
    // border: 2px solid rgba(112, 112, 112, 1);
    // background-color: rgba(112, 112, 112, .15);
    background-color: #E9E9E9;
    border-radius: 10px;
    opacity: 1;
    margin-top:${props => props.marginTop};
    margin-left:${props => props.marginLeft};
    margin-right:${props => props.marginRight};
    margin-bottom:${props => props.marginBottom};
    background-clip: padding-box;
    background-size: cover;
    background-position: 50%;
    background-image: url(${props => props.thumbnail});
    :hover{
        .icon-area{
            display: block;
        }
    }
    .icon-area{
        color: ${props => props.thumbnail ? "white" : "black"};
        z-index: 720;
        opacity: 0.5;
        display: none;
        position: absolute;
        margin-left: 165px;
        margin-top: 25px;
    }
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
  margin-top: 110px;
//   margin-left: 13px;
  margin-left:13px;
  margin-bottom:12px;
  padding: 5px;
`;

export const CreateStep = (props) => {
    return (<CreateStepContainer marginRight={props.marginRight} disabled={props.disabled ? 0.5 : 1.0} onClick={props.onClick}>
        <div className="close-box">
            <Cross angle={90} width={20} height={20} disabled={false} /></div>
        <div className="create-button">{props.step} 생성하기</div>
    </CreateStepContainer>)
}
export const CreateCard = (props) => {
    return (<CreateCardContainer marginRight={props.marginRight} onClick={props.onClick} disabled={props.disabled}>
        <div className="cross-wrapper" >
            <Cross angle={90} width={20} height={20} disabled={false} /></div>
        <div className="text">컨텐츠 등록하기</div>
    </CreateCardContainer>)
}
export const TipDiv = (props) => {
    return (<div>
        <div style={{ color: "#FF0000" }}>TIP</div>
        <div style={{ color: "#707070", fontSize: market_style.font.size.small3, fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{props.txt}</div>
    </div>)
}
export const StepCard = (props) => {
    return (<StepCardStyle
        marginTop={props.marginTop} marginRight={props.marginRight} marginBottom={props.marginBottom} marginLeft={props.marginLeft}
        title={props.title}
        id={props.id} uid={props.uid}
        onClick={props.onClick}
    >
        <div className="icon-area">{props.children}</div>
        <div className="text-area" id={props.id} uid={props.uid} title={props.title}>{props.title.slice(0, 10)} {props.title.length > 10 ? "..." : ""} </div>
    </StepCardStyle >)
}
export const ContentCard = (props) => {
    console.log(props);
    // const { card, marginTop, marginRight, marginBottom, marginLeft } = props;
    return (props.card
        ? <CardContainer uid={props.uid} id={props.id} onClick={props.onClick} marginTop={props.marginTop} marginLeft={props.marginLeft} marginRight={props.marginRight} marginBottom={props.marginBottom} thumbnail={props.card.thumbnail}>
            <div className="icon-area">{props.children}</div>
            {props.card.thumbnail ?
                // <React.Fragment>
                //     {props.card.private == true ? <div style={{
                //         margin: "5px", border: "1px solid red", paddingLeft: "2px", paddingBottom: "2px",
                //         width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "white", display: "flex", position: "absolute", zIndex: "999",
                //         justifyContent: "center", alignItems: "center"
                //     }}>
                //         <Icon name="lock" size="small" color="red" />
                //     </div> : null}
                //     {/* <div style={{ zIndex: "701", cursor: "pointer", position: "absolute", width: "100%", height: "100%", background: "transparent linear-gradient(180deg, #000000 0%, #020202F7 16%, #FFFFFF26 100%)" }} /> */}
                //     <div style={{ zIndex: "701", cursor: "pointer", position: "absolute", width: "100%", height: "100%", background: "transparent linear-gradient(-180deg, rgba(32,32,32, 0.5) 0%, rgba(255,255,255, 0) 50%)" }} />
                //     <div style={{ zIndex: "702", position: "absolute", width: "165px", height: "74px", fontSize: market_style.font.size.small3, fontFamily: "Noto Sans KR", fontWeight: "700", color: "#707070", textAlign: "center", lineHeight: "22px", marginTop: "15px", marginLeft: "10px" }}>
                //         {props.card.title.slice(0, 10)}
                //     </div>
                //     {/* <div style={{ zIndex: "702", background: "transparent linear-gradient(270deg, #00000000 0%, #FFFFFFA1 13%, #FFFFFF 52%, #FFFFFF94 82%, #80808000 100%)", position: "absolute", width: "195px", height: "53px", fontFamily: "Noto Sans KR", fontWeight: "300", color: "#707070", textAlign: "center", marginTop: "128px", marginLeft: "auto" }}> */}
                //     {/* #EAEAEA */}
                //     <AuthorBox>
                //         <div style={{ fontSize: market_style.font.size.small3, fontWeight: "400" }}>{props.card.nick_name.slice(0, 10)}</div>
                //         <div style={{ fontSize: market_style.font.size.small1, marginTop: "6px", fontWeight: "400" }}>{DateFormat(props.card.update_time)}</div>
                //     </AuthorBox>
                // </React.Fragment> 
                <React.Fragment>
                    {props.card.private == true ? <div style={{
                        margin: "5px", border: "1px solid red", paddingLeft: "2px", paddingBottom: "2px",
                        width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "white", display: "flex", position: "absolute", zIndex: "999",
                        justifyContent: "center", alignItems: "center"
                    }}>
                        <Icon name="lock" size="small" color="red" />
                    </div> : null}
                    {/* <div style={{ zIndex: "701", cursor: "pointer", position: "absolute", width: "100%", height: "100%", background: "transparent linear-gradient(180deg, #000000 0%, #020202F7 16%, #FFFFFF26 100%)" }} /> */}
                    {/* <div style={{ zIndex: "701", cursor: "pointer", position: "absolute", width: "100%", height: "100%", background: "transparent linear-gradient(-180deg, rgba(32,32,32, 0.5) 0%, rgba(255,255,255, 0) 50%)" }} /> */}
                    <div 
                        style={{
                            zIndex: "702",
                            textShadow:" #FFF 1px 0 5px",
                            position: "absolute",
                            width: "130px",
                            height: "45px",
                            left: "9px",
                            fontSize: market_style.font.size.small3,
                            fontFamily: "Noto Sans KR",
                            fontWeight: "500",
                            color: "#707070",
                            textAlign: "center",
                            lineHeight: "40px",
                            marginTop: "15px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",}}>
                        {props.card.title.slice(0, 10)}
                    </div>
                    {/* <div style={{ zIndex: "702", background: "transparent linear-gradient(270deg, #00000000 0%, #FFFFFFA1 13%, #FFFFFF 52%, #FFFFFF94 82%, #80808000 100%)", position: "absolute", width: "195px", height: "53px", fontFamily: "Noto Sans KR", fontWeight: "300", color: "#707070", textAlign: "center", marginTop: "128px", marginLeft: "auto" }}> */}
                    {/* #EAEAEA */}
                    <div
                    style={{
                        background: "transparent linear-gradient(270deg, #00000000 0%, #FFFFFFA1 13%, #FFFFFF 52%, #FFFFFF94 82%, #80808000 100%)",
                        zIndex: "702",
                        position: "absolute",
                        top: "80px",
                        left: "9px",
                        width: "130px",
                        height: "53px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: "300",
                        color: "#707070",
                        textAlign: "center"}}
                    >
                    <div style={{ fontSize: market_style.font.size.small2 }}>
                            {props.card.nick_name.slice(0, 10)}
                        </div>
                        <div style={{ fontSize: market_style.font.size.small1, marginTop: "6px" }}>
                            {DateFormat(props.card.update_time)}
                        </div>
                    </div>
                </React.Fragment> 
                :
                <React.Fragment>
                    <div style={{
                        zIndex: "702",
                        position: "absolute",
                        width: "130px",
                        height: "45px",
                        left: "9px",
                        fontSize: market_style.font.size.small3,
                        fontFamily: "Noto Sans KR",
                        fontWeight: "500",
                        color: "#707070",
                        textAlign: "center",
                        lineHeight: "40px",
                        marginTop: "10px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}
                        title={props.card.title}
                    >
                        {props.card.title}
                        {/* .slice(0, 10)} */}
                    </div>
                    <div style={{
                        zIndex: "702",
                        position: "absolute",
                        top: "80px",
                        left: "9px",
                        width: "130px",
                        height: "53px",
                        fontFamily: "Noto Sans KR",
                        fontWeight: "300",
                        color: "#707070",
                        textAlign: "center",
                    }}
                        title={props.card.nick_name + "(" + DateFormat(props.card.update_time) + ")"}>
                        <div style={{ fontSize: market_style.font.size.small2 }}>
                            {props.card.nick_name.slice(0, 10)}
                        </div>
                        <div style={{ fontSize: market_style.font.size.small1, marginTop: "6px" }}>
                            {DateFormat(props.card.update_time)}
                        </div>
                    </div>
                </React.Fragment>}
        </CardContainer>
        : <CardContainer />
    )
}

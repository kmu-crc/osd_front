import React from 'react';
import Cross from "components/Commons/Cross";
import DateFormat from "modules/DateFormat";
import styled from "styled-components";

export const CreateStep = (props) => {
    return (<div onClick={props.onClick}
        style={{
            position: "relative",
            width: "200px", height: "77px", marginRight: props.marginRight, display: "flex",
            borderRadius: "15px", backgroundClip: "padding-box", border: "2px solid rgba(112,112,112, 0.5)",
            cursor: "pointer"
        }}>
        <div style={{ poistion: "relative", marginTop: "22.5px", marginLeft: "19.5px", marginRight: "15px" }}>
            <Cross angle={90} width={33} height={33} disabled={false} /></div>
        <div style={{ opacity: props.disabled ? "0.5" : "1.0", marginTop: "23px", height: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", textAlign: "left", lineHeight: "29px" }}>{props.step} 생성하기</div>
    </div>)
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
        <div style={{ opacity: props.disabled ? "0.5" : "1.0", marginTop: "32.23px", height: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", textAlign: "center", lineHeight: "29px" }}>{props.step}생성하기</div>
    </div>)
}
export const TipDiv = (props) => {
    return (<div>
        <div style={{ color: "#FF0000" }}>TIP</div>
        <div style={{ color: "#707070", fontSize: "17px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{props.txt}</div>
    </div>)
}
export const StepCard = (props) => {
    return (<div onClick={props.onClick}
        style={{
            cursor: "pointer",
            display: "flex",
            width: "200px", height: "77px",
            borderRadius: "15px", border: "2px solid #707070",
            marginTop: props.marginTop || "0px",
            marginLeft: props.marginLeft || "0px",
            marginRight: props.marginRight || "0px",
            marginBottom: props.marginBottom || "0px",
            backgroundClip: "padding-box"
        }}>
        <div style={{
            marginTop: "24px", marginLeft: "12px",
            height: "29px", width: "178px",
            color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px",
            textAlign: "center", lineHeight: "29px"
        }}> {props.title.slice(0, 10)} {props.title.length > 10 ? "..." : ""} </div>
    </div>)
}
const CardContainer = styled.div`
    position: relative;
    z-index: 700;
    cursor: pointer;
    width: 200px;
    height: 200px;
    border-radius: 15px;
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
}}>
`;
export const ContentCard = (props) => {
    // console.log("props", props)
    const { card, marginTop, marginRight, marginBottom, marginLeft } = props;
    return (
        card ?
            <CardContainer onClick={props.onClick} marginTop={marginTop} marginLeft={marginLeft} marginRight={marginRight} marginBottom={marginBottom} first_img={card.first_img}>
                {
                    card.first_img ?
                        <React.Fragment>
                            <div style={{ zIndex: "701", cursor: "pointer", position: "absolute", borderRadius: "15px", width: "100%", height: "100%", background: "transparent linear-gradient(180deg, #000000 0%, #020202F7 16%, #FFFFFF26 100%)" }} />
                            <div style={{ zIndex: "702", position: "absolute", width: "165px", height: "74px", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500", color: "#FFFFFF", textAlign: "center", lineHeight: "40px", marginTop: "27px", marginLeft: "19px" }}>
                                {card.title.slice(0, 10)}
                            </div>
                            <div style={{ zIndex: "702", background: "transparent linear-gradient(270deg, #00000000 0%, #FFFFFFA1 13%, #FFFFFF 52%, #FFFFFF94 82%, #80808000 100%)", position: "absolute", width: "195px", height: "53px", fontFamily: "Noto Sans KR", fontWeight: "300", color: "#707070", textAlign: "center", marginTop: "128px", marginLeft: "auto" }}>
                                <div style={{ fontSize: "17px" }}>
                                    {card.nick_name.slice(0, 10)}
                                </div>
                                <div style={{ fontSize: "15px", marginTop: "6px" }}>
                                    {DateFormat(card.update_time)}
                                </div>
                            </div>
                        </React.Fragment> :
                        <React.Fragment>
                            <div style={{ zIndex: "702", position: "absolute", width: "165px", height: "74px", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500", color: "#707070", textAlign: "center", lineHeight: "40px", marginTop: "27px", marginLeft: "19px" }}>
                                {card.title.slice(0, 10)}
                            </div>
                            <div style={{ zIndex: "702", position: "absolute", width: "195px", height: "53px", fontFamily: "Noto Sans KR", fontWeight: "300", color: "#707070", textAlign: "center", marginTop: "128px", marginLeft: "auto" }}>
                                <div style={{ fontSize: "17px" }}>
                                    {card.nick_name.slice(0, 10)}
                                </div>
                                <div style={{ fontSize: "15px", marginTop: "6px" }}>
                                    {DateFormat(card.update_time)}
                                </div>
                            </div>
                        </React.Fragment>}
            </CardContainer >
            : <React.Fragment><CardContainer /></React.Fragment>
    )
}
        /*
<div style={{ paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "10px", marginTop: "15px", borderRadius: "5px", width: "175px", backgroundColor: "rgba(12, 12, 12, 0.5)", opacity: props.disabled ? "0.5" : "1.0", height: "29px", color: "#FFF", fontFamily: "Noto Sans KR", fontSize: "20px", textAlign: "center", lineHeight: "29px" }} title={card.title||""}>{card.title && card.title.slice(0, 7)}{card.title && card.title.length > 8 ? "..." : ""}</div>
<div style={{ paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "10px", marginTop: "75px", borderRadius: "5px", width: "max-content", backgroundColor: "rgba(12, 12, 12, 0.5)", opacity: props.disabled ? "0.5" : "1.0", height: "29px", color: "#FFF", fontFamily: "Noto Sans KR", fontSize: "17px", textAlign: "center", lineHeight: "29px" }} title={card.nick_name}>{card.nick_name.slice(0, 12)}</div>
<div style={{ paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "10px", marginTop: "5px", borderRadius: "5px", width: "max-content", backgroundColor: "rgba(12, 12, 12, 0.5)", display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "5px", color: "#FFF" }}>
<div style={{ marginRight: "15px" }} ><i style={{ opacity: "0.5" }} className="comment icon" />{card.comment_count ? NumberFormat(card.comment_count) : 0}</div>
<div><i style={{ opacity: "0.5" }} className="clock icon" />{DateFormat(card.update_time)}</div>
</div>
*/

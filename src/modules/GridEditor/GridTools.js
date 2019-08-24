import React from 'react'
import Cross from "components/Commons/Cross"
export const CreateStep = (props) => {
    return (<div onClick={props.onClick}
        style={{
            marginRight: props.marginRight,
            cursor: "pointer",
            display: "flex",
            width: "200px", height: "77px",
            borderRadius: "15px", border: "2px solid rgba(112,112,112, 0.5)",
            backgroundClip: "padding-box"
        }}>
        <div style={{ marginTop: "22.5px", marginLeft: "19.5px", marginRight: "15px" }}><Cross angle={90} width={33} height={33} disabled={false} /></div>
        <div style={{ opacity: props.disabled ? "0.5" : "1.0", marginTop: "23px", height: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", textAlign: "left", lineHeight: "29px" }}>{props.step} 생성하기</div>
    </div>)
}
export const CreateCard = (props) => {
    return (<div onClick={props.onClick} style={{ marginRight: props.marginRight, cursor: "pointer", width: "200px", height: "200px", borderRadius: "15px", border: "2px solid rgba(112,112,112, 0.5)", backgroundClip: "padding-box" /* for IE9+, Firefox 4+, Opera, Chrome */ }}>
        <div style={{ marginTop: "38.58px", marginLeft: "66.59px" }}><Cross angle={90} width={66.68} height={66.68} disabled={false} /></div>
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
export const ContentCard = (props) => {
    // console.log("props", props, props.marginRight)
    return (<div onClick={props.onClick}
        style={{
            cursor: "pointer",
            width: "200px", height: "200px",
            backgroundColor: "rgba(112, 112, 112, 0.15)",
            borderRadius: "15px", border: "2px solid #707070",
            marginTop: props.marginTop || "0px",
            marginLeft: props.marginLeft || "0px",
            marginRight: props.marginRight || "0px",
            marginBottom: props.marginBottom || "0px",
            backgroundClip: "padding-box"
        }}>
        <div style={{ opacity: props.disabled ? "0.5" : "1.0", marginTop: "32.23px", height: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", textAlign: "center", lineHeight: "29px" }}>{props.title}</div>
    </div>)
}

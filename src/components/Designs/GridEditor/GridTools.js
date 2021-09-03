import React from 'react';
import DateFormat from "modules/DateFormat";
import styled from "styled-components";
import PxtoRem from "modules/PxtoRem";
import TextFormat from 'modules/TextFormat';
import new_logo_cross from "source/new_logo_cross.svg";
import new_logo_lock from "source/new_logo_lock.svg";

const CreateStepContainer = styled.div`
    position: relative;
    display: flex;
    align-items:center;
    width:250px;
    height:43px;
    background-color:#707070;
    display:flex;
    background-clip: padding-box;
    margin-right: ${props => props.marginRight}px;
    border: 2px solid rgba(112,112,112, 0.5);
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    .close-box{
        poistion: relative;
        // margin-top: 22.5px;
        margin-left: 19.5px;
        margin-right: 15px;
        display:flex;
        align-items:center;
    }
    .create-button{
        opacity: ${props => props.disabled}; 
        // margin-top: 23px;
        font-family: Noto Sans KR;
        font-size: 24px;
        font-weight:700;
        color:white;
        text-align: center;
        cursor:pointer;

    }
`;

const Cross =styled.img`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    object-fit:contain;
`
export const CreateStep = (props) => {
    return (<CreateStepContainer marginRight={props.marginRight} disabled={props.disabled ? 0.5 : 1.0} onClick={props.onClick}>
        <div className="close-box">
        <Cross width={19} height={19} src={new_logo_cross} disabled={false} /></div>
        <div className="create-button">{props.step} 생성하기</div>
    </CreateStepContainer>)
}
export const CreateCard = (props) => {
    return (<div onClick={props.onClick}
        style={{
            width: "250px", height: "250px", marginRight: props.marginRight,
            background: "white", border:"2px solid #A3A0A0",
            backgroundClip: "padding-box",boxShadow:" 8px 8px 8px #4141411A",
            cursor: "pointer", marginBottom: "10px",position:"relative"
        }}>
        <div style={{ width:"100%",display:"flex",justifyContent:"center",marginTop:"40px" }}>
            <Cross width={100} height={100} src={new_logo_cross} disabled={false} />
        </div>
        <div style={{ opacity: props.disabled ? "0.5" : "1.0", marginTop: "30px", height: "29px", color: "#cccccc", fontFamily: "Noto Sans KR", fontWeight:"700",fontSize: "24px", textAlign: "center" }}>컨텐츠 등록하기</div>
    </div>)
}
export const TipDiv = (props) => {
    return (<div>
        <div style={{ color: "#FF0000" }}>TIP</div>
        <div style={{ color: "#707070", fontSize: "17px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{props.txt}</div>
    </div>)
}
const StepCardStyle = styled.div`
    *{
        cursor: pointer;
    }
    position: relative;
    display: flex;
    align-items:center;
    // width: 200px;
    // height: 77px;
    // border-radius: 15px;
    // background-color: white;
    // border: 2px solid #707070;
    width:250px;
    height:43px;
    background-color:#707070;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:10px;
    margin-left: ${props => props.marginLeft}px;
    margin-right: ${props => props.marginRight}px;
    margin-bottom: ${props => props.marginBottom}px;
    background-clip: padding-box;
    overflow:hidden;
    .text-area{
        // margin-top: 24px;
        // margin-left: 12px;
        // height: 29px;
        width: 178px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size: 24px;
        font-weight:700;
        color:white;
        text-align: center;
        line-height: 29px;
        cursor:pointer;
    }
    :hover{
        .icon-area{
            display: ${props => props.editor === true ? "block" : "none"};
        }
    }
    .icon-area{
        opacity: 0.5;
        display: none;
        position: absolute;
        z-index:0;
        // border:3px solid black;
        margin-left: 165px;
        margin-top: 25px;
        cursor:${props => props.editor === true ? "move" : "default"};;
    }
`;
export const StepCard = (props) => {
    return (<StepCardStyle editor={props.editor} marginTop={props.marginTop} marginLeft={props.marginLeft} marginRight={props.marginRight} marginBottom={props.marginBottom} onClick={props.onClick} id={props.id} uid={props.uid} title={props.title}>
        <div className="icon-area">{props.children}</div>
        <div className="text-area" id={props.id} uid={props.uid} title={props.title}>
            <TextFormat txt={props.title} />
        </div>
    </StepCardStyle >)
}
const CardContainer = styled.div`

    // *{
    //     // border:1px solid black;
    //     cursor:pointer;
    // }

    position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index: 702;
    // width: ${PxtoRem(215)};
    // height: ${PxtoRem(215)};
    // overflow:hidden;
    // border-radius: 15px;
    // border: 2px solid rgba(112, 112, 112, 1);
    // background-color: rgba(112, 112, 112, .15);

    width:250px;
    height:250px;
    background-color:
    border:1px solid #A3A0A0;
    background-color:#CCCCCC;

    margin-top:${props => props.marginTop};
    margin-left:${props => props.marginLeft};
    margin-right:${props => props.marginRight};
    margin-bottom:${props => props.marginBottom};
    background-clip: padding-box;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    box-shadow: 8px 8px 8px #4141411A;

    :hover{
        .icon-area{
            display: ${props => props.editor === true ? "block" : "none"};
            cursor:${props => props.editor === true ? "move" : "default"};;
        }
    }
    .icon-area{
        position: absolute;
        width:110%;
        height:110%;
        color: ${props => props.first_img ? "white" : "black"};
        z-index: 2;
        opacity: 0.5;
        display: none;
        cursor:${props => props.editor === true ? "move" : "default"};
        border-radius:15px;
        background-color:gray;
        opacity:0.1;
        // margin-left: 165px;
        // margin-top: 25px;

    }
    .bound_box_{
        width:100%;
        height:100%;
        // border-radius:15px;
        overflow:hidden;
        cursor:pointer;
        position:absolute;
        z-index: 700;
        // background: #EFEFEF;
        border:1px solid #A3A0A0;
        background-color:#CCCCCC;
        background-image: url(${props => props.first_img && props.first_img.m_img});
        background-size: cover;
        background-position: center;
        .gradient {
            z-index: 701;
            cursor: pointer;
            // border-radius: 15px;
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent linear-gradient(-180deg, rgba(32,32,32, 0.5) 0%, rgba(255,255,255, 0) 50%);
        }
        .text {
            z-index: 702;
            position: absolute;
            width: 100%; 
            height: 74px;
            font-size: 20px; 
            font-family: Noto Sans KR;
            font-weight: 500;
            color: #FFFFFF; 
            text-align: center; 
            line-height: 40px; 
            margin-top: 27px;
        }
       }
`;
const AuthorBox = styled.div`
z-index: 702;
background: rgba(234, 234, 234, 0.35);
width: 100%;
height: 63px;
border-radius: 5px;
font-family: Noto Sans KR;
font-weight: 300;
color: #707070;
text-align: center;
margin-top: 120px;
//   margin-left: 13px;
padding: 8px;
`;

const LockContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 703;
    display: flex;

    .icon-wrapper {
        height:26px;
        display:flex;
        align-items:center;
        .icon{
            width:26px;
            height:26px;
            min-width:26px;
            min-height:26px;
            object-fit:contain;
        }
        .text{
            color:#707070;
            font: normal normal 300 15px/22px Spoqa Han Sans Neo;
        }
    }
`;
export const ContentCard = (props) => {
    // const { card, marginTop, marginRight, marginBottom, marginLeft } = props;
    return (props.card
        ?

        <CardContainer editor={props.editor} uid={props.uid} id={props.id} onClick={props.onClick} marginTop={props.marginTop} marginLeft={props.marginLeft} marginRight={props.marginRight} marginBottom={props.marginBottom} first_img={props.card.first_img}>

            {props.card.private === 1 ?
                <LockContainer>
                    <div className="icon-wrapper">
                        <img src={new_logo_lock} className="icon"/>
                        <div className="text">비공개</div>
                    </div>
                </LockContainer>
                : null}

            <div className="icon-area">{props.children}</div>
            {props.card.first_img ?
                <div id={`div_card_${props.uid}`} className="bound_box_">
                    <div className="gradient" />
                    <div className="text">
                        <TextFormat txt={props.card.title} />
                    </div>
                    {/* #EAEAEA */}
                    <AuthorBox>
                        <div style={{ fontSize: "18px", fontWeight: "400" }}>
                            <TextFormat txt={props.card.nick_name} /></div>
                        <div style={{ fontSize: "18px", marginTop: "6px", fontWeight: "400" }}>
                            {DateFormat(props.card.update_time)}</div>
                    </AuthorBox>
                </div>
                :
                <React.Fragment>
                    <div id={`div_card_${props.uid}`} className="bound_box_">
                        <div style={{  zIndex: "702", position: "absolute", width: "100%",paddingLeft:"20px",paddingRight:"20px", height: "74px", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500", color: "#707070", textAlign: "center", lineHeight: "40px", marginTop: "27px", }}>
                            <TextFormat txt={props.card.title || ""} />
                        </div>
                        <div style={{ zIndex: "702", position: "absolute", width: "100%", height: "53px", fontFamily: "Noto Sans KR", fontWeight: "300", color: "#707070", textAlign: "center", marginTop: "173px", marginLeft: "auto" }}>
                            <div style={{ fontSize: "17px" }}>
                                <TextFormat txt={props.card.nick_name || ""} />
                            </div>
                            <div style={{ fontSize: "15px", marginTop: "6px" }}>
                                {DateFormat(props.card.update_time)}
                            </div>
                        </div>
                    </div>
                    {/* // </div> */}
                </React.Fragment>
            }
        </CardContainer>
        : <CardContainer />
    )
}

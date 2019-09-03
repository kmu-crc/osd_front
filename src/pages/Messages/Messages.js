import React from'react';
import plusImg from "source/plus_cross_gray.png";


const Banner ={width:"100%",height:"48px",marginTop:"8px",backgroundColor:"#EFEFEF"};
const BannerText = {display:"inline-block",width:"74px",height:"29px",marginTop:"9px",marginLeft:"65px",
                    fontSize:"20px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",
                    textAlign:"center",lineHeight:"29px"};
const MessageBox = {width:"1750px",height:"869px",margin:"26px 0px 27px 65px"}


const MessageAside = {display:"inline-block",width:"445px",height:"100%",marginRight:"7px",overflow:"hidden",
                        borderRadius:"25px 0 0 25px",backgroundColor:"#EFEFEF",}
const MessageAsideHeader = {position:"relative",height:"75px",overflow:"hidden"}
const MessageAsideHeaderTitle={position:"absolute",width:"303px",height:"30px",left:"54px",top:"33px",
                            fontSize:"20px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",textAlign:"left",lineHeight:"30px"}
const MessageAsideHeaderIcon={position:"absolute",width:"51px",height:"51px",right:"20px",bottom:"0px",
                            background:`url(${plusImg})`,backgroundSize: "cover", backgroundPosition: "center center",opacity:"0.5"}
const MessageAsideSection = {height:"794px"}



const MessageSection = {overflow:"hidden",display:"inline-block",width:"1298px",height:"100%",paddingLeft:"26px",paddingRight:"23px",
                        borderRadius:"0px 25px 25px 0px",backgroundColor:"#EFEFEF"}
const MessageSectionBoard = {height:"671.5px"}
const MessageDivisionLine = {borderTop:"1px solid #707070"}
const MessageSectionSend={overflow:"hidden",position:"relative",height:"197.5px"}
const MessageSectionTextArea={position:"absolute",width:"1091px",height:"147px",top:"24.5px",
                            border:"none",outline:"none",resize:"none",backgroundColor:"#EFEFEF",
                            fontSize:"18px",textAlign:"left",fontWeight:"500",lineHeight:"27px",color:"#707070"};
const MessageSectionSendBtn={position:"absolute",width:"117px",height:"170px",right:"0px",
                            borderRadius:"0px 0px 25px 0px",backgroundColor:"#FFFFFF",
                            fontSize:"18px",fontWeight:"500",lineHeight:"170px",textAlign:"center"};

class Messages extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <React.Fragment>
                <div style={Banner}>
                    <div style={BannerText}>메시지함</div>
                </div>
                <div style={MessageBox}>
                    <div style={MessageAside}>
                        <div style={MessageAsideHeader}>
                            <div style={MessageAsideHeaderTitle}>받은 메세지함</div>
                            <div style={MessageAsideHeaderIcon}></div>
                        </div>
                        <div style={MessageAsideSection}>
                        </div>
                    </div>
                    <div style={MessageSection}>
                            <div style={MessageSectionBoard}></div>
                            <div style={MessageDivisionLine}></div>
                            <div style={MessageSectionSend}>
                                <input type="textarea" style={MessageSectionTextArea}/>
                                <div style={MessageSectionSendBtn}>전송하기</div>
                            </div>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default Messages;
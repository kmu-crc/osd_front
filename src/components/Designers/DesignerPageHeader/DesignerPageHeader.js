import React, { Component } from 'react';
import styled from 'styled-components';

//img
import noimg from "source/noimg.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import iEdit from 'source/sharp_edit_black_48dp.png';
import iMessage from 'source/email.png'
import IconView from "source/IconView"
//CSS

const BackgroundBox = {position:"relative",overFlow:"hidden",width:"1920px",height:"336px",marginTop:"36px",background:"#EFEFEF"}
const ProfileBox = {position:"absolute",width:"200px",height:"200px",top:"90px",left:"115px",borderRadius:"200px",background:"#D6D6D6"}
const Name = {position:"absolute",width:"200px",height:"29px",top:"41px",left:"115px",color:"#707070",fontFamily:"Noto Sans KR",fontSize:"20px",fontWeight:"500",textAlign:"center"}
const Title = {position:"absolute",width:"479px",height:"29px",top:"41px",left:"418px",color:"#FF0000",fontFamily:"Noto Sans KR",fontSize:"20px",fontWeight:"200",textAlign:"left"}
const ExplainBox01 ={position:"absolute",overflow:"hidden",width:"479px",height:"149px",top:"90px",left:"418px",
                    color:"#707070",fontSize:"20px",fontFamily:"Noto Sans KR",fontWeight:"200",textAlign:"left",lineHeight:"35px"} 
const ExplainBox02 ={position:"absolute",overflow:"hidden",width:"479px",height:"149px",top:"90px",left:"976px",
                    color:"#707070",fontSize:"20px",fontFamily:"Noto Sans KR",fontWeight:"200",textAlign:"left",lineHeight:"35px"} 
const SummaryIconBox = {position:"absolute",width:"479px",height:"22px",bottom:"50px",left:"418px"}
const Summary_View_Icon = {display:"inline-block",width:"17px",height:"12px"}
const Summary_View = {marginLeft:"5px",display:"inline-block",width:"54px",height:"21px"}
const Summary_ThumbUp_Icon = {display:"inline-block",width:"14px",height:"14px",opacity:"0.55",
                        background:`url(${iThumbUp})`,backgroundSize: "cover", backgroundPosition: "center center"}
const Summary_ThumbUp = {marginLeft:"5px",display:"inline-block",width:"54px",height:"21px",}
const Summary_Forked_Icon = {display:"inline-block",width:"15px",height:"15px",opacity:"0.55",
                        background:`url(${iForked})`,backgroundSize: "cover", backgroundPosition: "center center"}
const Summary_Forked = {marginLeft:"5px",display:"inline-block",width:"54px",height:"21px",}

const interestDesignerBox = {position:"absolute",width:"250px",height:"45px",top:"90px",right:"72px",textAlign:"right"}
const interestDesignerTitle = {display:"inline-block",width:"164px",height:"25px",
                                color:"#707070",fontFamily:"Noto Sans KR",fontSize:"17px",fontWeight:"200",textAlign:"right" }
const interestDesignerImg = {display:"inline-block",width:"45px",height:"40px",marginLeft:"15px",marginBottom:"-7px",
                            backgroundImage:`url(${iThumbUp})`,backgroundSize: "cover", backgroundPosition: "center center",opacity:"0.55"}

const sendMessageBox = {overflow:"hidden",position:"absolute",width:"250px",height:"45px",top:"168px",right:"72px",textAlign:"right"}
const sendMessagTitle = {display:"inline-block",width:"164px",height:"45px",
                                color:"#707070",fontFamily:"Noto Sans KR",fontSize:"17px",fontWeight:"200",textAlign:"right" }
const sendMessageImg = {display:"inline-block",width:"45px",height:"45px",marginLeft:"15px",marginBottom:"-15px",
                            backgroundImage:`url(${iMessage})`,backgroundSize: "cover", backgroundPosition: "center center"}

const UpdateTimeBox = {position:"absolute",width:"146px",height:"25px",top:"273px",right:"72px",
                        color:"#707070",fontFamily:"Noto Sans KR",fontSize:"17px",fontWeight:"200",textAlign:"right" }
                        
const defaultCount = {
    total_like: 1,
    total_group: 1,
    total_design: 1,
    total_view: 1,
}
let about_me = ["", ""];
let descriptionLengthCheck = "";

const TestExplain="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet";

class DesignerPageHeader extends Component {
    render() {
        const MypageInfo = this.props.DesignerDetail;

        const countInfo = MypageInfo.count || defaultCount;
        const thumbnailInfo = MypageInfo.profileImg ? MypageInfo.profileImg.m_img : noimg;

        if (MypageInfo.about_me !== undefined) {
            about_me[0] = MypageInfo.about_me.length < 199 ? MypageInfo.about_me : MypageInfo.about_me.slice(0, 199);
            descriptionLengthCheck = MypageInfo.about_me.length < 400 ? "" : " ...";
            about_me[1] = MypageInfo.about_me.length < 199 ? "" : MypageInfo.about_me.slice(200, 399) + descriptionLengthCheck;
        }

        return (
            <div style={BackgroundBox}>
                <div style = {Name}>진아진아진아</div>
                <div style = {ProfileBox}></div>
                <div style ={Title}>패션패션패션</div>
                <div style ={ExplainBox01}>{TestExplain}</div>
                <div style ={ExplainBox02}>{TestExplain}</div>
                <div style={SummaryIconBox}>
                    <div style={Summary_View_Icon}><IconView width="17px" height="13px" fill="#707070"/></div>
                    <div style = {Summary_View}>2200</div>
                    <div style = {Summary_ThumbUp_Icon}></div>
                    <div style = {Summary_ThumbUp}>2000</div>
                    <div style = {Summary_Forked_Icon}></div>
                    <div style = {Summary_Forked}>2000</div>
                </div>
                <div style={interestDesignerBox}>
                    <div style={interestDesignerTitle}>관심 디자이너 등록하기</div>
                    <div style = {interestDesignerImg}></div>
                </div>
                <div style={sendMessageBox}>
                    <div style={sendMessagTitle}>메세지 보내기</div>
                    <div style = {sendMessageImg}></div>
                </div>
                <div style={UpdateTimeBox}>최근 업데이트 3일 전</div>

            </div>
        );

    };
}
export default DesignerPageHeader;
import React, { Component } from 'react';
import styled from 'styled-components';

//img
import noimg from "source/noimg.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/baseline_thumb_up_black_48dp_2x.png"

import iEdit from 'source/sharp_edit_black_48dp.png';
import iMessage from 'source/email.png'
import IconView from "source/IconView"
//CSS

const BackgroundBox = {position:"relative",overFlow:"hidden",width:"1920px",height:"336px",marginTop:"36px",background:"#EFEFEF"}
const ProfileBox = styled.div`
    position:absolute;
    width:200px;
    height:200px;
    top:90px;
    left:115px;
    border-radius:200px;
    background:#D6D6D6;
    background-image: url(${props => props.img});
`
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

const interestDesignerBox = {position:"absolute",width:"250px",height:"45px",top:"90px",right:"45px",textAlign:"right", display:"flex"}
const interestDesignerTitle = {display:"inline-block",width:"164px",height:"25px",marginTop:"15px",
                                color:"#707070",fontFamily:"Noto Sans KR",fontSize:"17px",fontWeight:"200",textAlign:"right" }
const interestDesignerImg = {display:"inline-block",width:"45px",height:"40px",marginLeft:"15px",marginTop:"0px",
                            backgroundImage:`url(${iThumbUp})`,backgroundSize: "cover", backgroundPosition: "center center",opacity:"0.55"}

const interestDesignerImgLike = {display:"inline-block",width:"45px",height:"40px",marginLeft:"15px",marginBottom:"0px",
    backgroundImage:`url(${iThumbUp})`,backgroundSize: "cover", backgroundPosition: "center center",opacity:"1"}

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
    constructor(props)
    {
        super(props);
        this.state = { tmpLike: false, likeDialog: false, forkDialog: 0 };
        this.like = this.like.bind(this);
    }

    like() {
        if (this.state.tmpLike) { //dislike
            this.setState({ tmpLike: !this.state.tmpLike })
        } else {
            this.setState({ tmpLike: !this.state.tmpLike, likeDialog: true })
            // request like design
            setTimeout(() => { this.setState({ likeDialog: false }) }, 1500)
        }
    }
    render() {
        const MypageInfo = this.props.DesignerDetail;
        const countInfo = this.props.Count || defaultCount;
        const thumbnailInfo = MypageInfo.thumbnail ? MypageInfo.thumbnailUrl : noimg;
        if (MypageInfo.about_me !== undefined) {
            about_me[0] = MypageInfo.about_me.length < 199 ? MypageInfo.about_me : MypageInfo.about_me.slice(0, 199);
            descriptionLengthCheck = MypageInfo.about_me.length < 400 ? "" : " ...";
            about_me[1] = MypageInfo.about_me.length < 199 ? "" : MypageInfo.about_me.slice(200, 399) + descriptionLengthCheck;
        }
        return (
            <React.Fragment>

           <div style={BackgroundBox}>
                <div style = {Name}>{MypageInfo.nick_name}</div>
                <ProfileBox img={thumbnailInfo.s_img}/>
                <div style ={Title}>{MypageInfo.categoryName}</div>
                <div style ={ExplainBox01}>{about_me[0]}</div>
                <div style ={ExplainBox02}>{about_me[1]}</div>
                <div style={SummaryIconBox}>
                    <div style={Summary_View_Icon}><IconView width="17px" height="13px" fill="#707070"/></div>
                    <div style = {Summary_View}>{countInfo.total_view}</div>
                    <div style = {Summary_ThumbUp_Icon}></div>
                    <div style = {Summary_ThumbUp}>{countInfo.total_like}</div>
                    <div style = {Summary_Forked_Icon}></div>
                    <div style = {Summary_Forked}>{countInfo.total_group + countInfo.total_design}</div>
                </div>
                <div onClick = {this.props.userInfo==null? null:() => this.like() } style={interestDesignerBox}>
                    <div style={interestDesignerTitle}>관심 디자이너 {this.state.tmpLike ? "취소하기" : "등록하기"}</div>
                    {this.state.tmpLike == true ? <div style={interestDesignerImgLike}></div> : <div style={interestDesignerImg}></div>
                    }

                </div>
                <div style={sendMessageBox}>
                    <div style={sendMessagTitle}>메세지 보내기</div>
                    <div style = {sendMessageImg}></div>
                </div>
                <div style={UpdateTimeBox}>최근 업데이트 3일 전</div>

                 {this.state.likeDialog == false? null:
                 <div style={{position: "absolute", top: "47px", left: "763px", width: "396px", height: "138px",
                    background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #000000", borderRadius: "5px", opacity: "1"}}>
                        <div style={{ marginTop: "31.5px", marginLeft: "62.5px", width: "273px", height: "69px", fontFamily: "Noto Sans KR",
                        fontSize: "20px", lineHeight: "40px", textAlign: "center", fontWeight: "500", color: "#707070" }}>관심 디자이너로 등록되었습니다.<br />마이페이지에서 확인 가능합니다.
                        </div>
                 </div>}
            </div>
            </React.Fragment>
        );

    };
}
export default DesignerPageHeader;
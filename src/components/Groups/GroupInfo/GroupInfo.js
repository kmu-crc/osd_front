import React, { Component } from 'react'
import styled from 'styled-components';
import IconView from "source/IconView"
import iEdit from "source/edit.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import iINOUT from "source/inout.svg"
import thumbup from "source/baseline_thumb_up_black_48dp_2x.png"
import noimg from "source/noimg.png";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import { geturl } from 'config';
import JoinGroupContainer from "containers/Groups/JoinGroupContainer";
import TextFormat from 'modules/TextFormat';
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import { Icon } from 'semantic-ui-react'
import { GetPermissionCouldJoinVideoChatRequest } from "redux/modules/group";
import GroupNoticeContainer from "containers/Groups/GroupNoticeContainer";

import new_logo_view from "source/new_logo_view.svg";
import new_logo_favorite from "source/new_logo_favorite.svg";
import new_logo_share from "source/new_logo_share.svg";
import new_logo_note from "source/new_logo_note.svg";

const GroupSummary = styled.div`
    max-width:1466px;
    width:100%;
    height:315px;
    box-shadow: 8px 8px 8px #4141411A;
    border:1px solid #eaeaea;
    margin-top:27px;
    display:flex;
    .thumbnail{
        min-width:319px;
        width:319px;
        height:100%;
        object-fit:cover;
        border:1px solid #eaeaea;
    }
    .content_wrapper{
        width:100%;
        height:100%;
        padding:16px;
    }
    .ellipsis{
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
      }
    .header_box{
        width:100%;
        height:41px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:15px;
        .row{
            display:flex;
            align-items:center;
        }
        .title_wrapper{
            font-family:Noto Sans KR;
            font-size:30px;
            font-weight:Bold;
            display:flex;
            align-items:center;
        }
        ._title{
            width:100%;
            max-width:1000px;
            height:41px;
            line-height:41px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        .update_time{
            height:41px;
            display:flex;
            align-items:flex-start;
            font-family:Noto Sans KR;
            font-size:16px;
            font-weight:300;
        }
    }
    
    .content_box{
        width:100%;
        height:240px;
        display:flex;
        .mini_thumbnail{
            width:111px;
            height:111px;
            object-fit:cover;
        }
        .thumbnailBox{
            width:240px;
            height:240px;
            margin-left:20px;
        }
        .infoBox{
            width:850px;
            height:100%;
            display:flex;
            flex-direction:column;
            .explain{
                width:100%;
                height:150px;
            }
            .group_summary{width:100%;max-width:200px;font-size:16px;font-weight:500;}
            .explanationRegion{
                width:100%;
                height:120px;
                overflow-y:auto;
                padding-top:10px;
                padding-bottom:10px;
            }
        }
        .nick_name{
            width:100%;
            height:21px;
            font-family:Noto Sans KR;
            font-size:16px;
            font-weight:300;
            margin-bottom:10px;
        }
        .footerBox{
            width:100%;
            height:41px;
            display:flex;
            align-items:center;
            .asset_icon{
                max-width:29px;
                max-height:29px;
                object-fit:contain;
            }
            .asset_text{
                width:max-content;
                max-width:40px;
                margin-left:8px;
                margin-right:16px;
                font-family:SpoqaHanSans;
                font-size:19px;
                font-weight:400;
            }
        }

    }
    .flex{display:flex;align-items:center;}
    .button_{
        width:142px;
        height: 41px;
        display:flex;
        font-size:20px;
        font-family:Spoqa Han Sans Neo;
        font-weight:400;
        justify-content:center;
        align-items:center;
        color:white;
        box-shadow: 8px 8px 8px #0000002B;
        cursor:pointer;
    }

    .marginLeft{margin-left:27px;}
    .marginRight{margin-right:17px;}
    .bg_black{background-color:black;}
    .bg_green{background-color:#1E9B79;}
`

class GroupInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            w: window.innerWidth > 1920 ? 1920 : window.innerWidth,
            joinDialog: false,
            likeDialog: false,
            forkDialog: 0,
            manager: false,
            isSeeMore: false,

        };
        this.needLogin = this.needLogin.bind(this);
        this.like = this.like.bind(this);
        this.handleMoreViewDescription = this.handleMoreViewDescription.bind(this);
        this.gotoGroupModify = this.gotoGroupModify.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.gotoGroup = this.gotoGroup.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize = () => {
        this.setState({ w: window.innerWidth > 1920 ? 1920 : window.innerWidth });
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    async componentDidUpdate(prevProp) {
        if (prevProp.GroupDetail != this.props.GroupDetail && this.props.GroupDetail != null) {
            if (this.props.GroupDetail != null && this.props.token != null) {
                // console.log("group-detail", this.props.GroupDetail);
                const couldJoinVChat = await GetPermissionCouldJoinVideoChatRequest(this.props.token, this.props.GroupDetail.uid);
                // console.log("couldJoin:", couldJoinVChat);
                this.setState({ couldJoinVChat: couldJoinVChat });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }
    gotoGroup(id) {
        window.location.href = geturl() + `/groupDetail/${id}`
    }
    async needLogin() {
        await alert("로그인 해주세요.", "확인");
    }
    async like() {
        if (!this.props.userInfo) {
            this.needLogin();
            return;
        }
        if (this.props.like) { //dislike
            this.props.UnlikeGroupRequest(this.props.id, this.props.token)
                .then(() => { this.props.GetGroupDetailRequest(this.props.id) })
                .then(() => { this.props.GetLikeGroupRequest(this.props.id, this.props.token) })
        } else { // like
            await this.setState({ likeDialog: true })
            this.props.LikeGroupRequest(this.props.id, this.props.token)
                .then(() => { this.props.GetGroupDetailRequest(this.props.id) })
                .then(() => { this.props.GetLikeGroupRequest(this.props.id, this.props.token) })
            setTimeout(() => { this.setState({ likeDialog: false }) }, 2500);
        }
    }
    async handleMoreViewDescription(description) {
        await alert(description, "확인");
    }
    gotoGroupModify() {
        let href = window.location.href.substring(0, window.location.href.search("groupDetail"));
        window.location.href = href + 'modifygroup/' + this.props.GroupDetail.uid;
    }
    changeEditMode() {
        this.setState({ manager: !this.state.manager });
        this.props.handleSwitchMode();
        if (!this.state.manager === false) {
            window.location.reload();
        }
    }

    openVideoChat = () => {
        const url = geturl() + `/vchatg/${this.props.GroupDetail.uid}`
        const options =
            `toolbar=no,status=no,menubar=no,resizable=0,location=no,scrollbars=no,\\
        top=0,left=0,width=${window.screen.width},height=${window.screen.height - 100}`;
        this.vchatwindow = window.open(url, "vchat", options);
    }

    openChat = () => {
        const url = geturl() + `/chatg/${this.props.GroupDetail.uid}`;
        const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`;
        this.chatwindow = window.open(url, "chat", options);
    }


    render() {
        const { like, GroupDetail, userInfo } = this.props;
        const group_user_id = GroupDetail && GroupDetail.user_id;
        const user_id = userInfo && userInfo.uid;
        const isEditor = group_user_id === user_id;
        const { w, manager } = this.state;
        const { couldJoinVChat } = this.state;
        console.log(this.props);
        return (
            <React.Fragment>
                <GroupSummary>
                    <img src={(GroupDetail && GroupDetail.img && GroupDetail.img.l_img) ? GroupDetail.img.l_img : noimg} className="thumbnail"/>
                    <div className="content_wrapper">
                         <div className="header_box">
                             <div className="row">
                                 <div className="title_wrapper">
                                     <div className="_title ellipsis">{GroupDetail.title}</div>
                                     <div className="marginLeft"><JoinGroupContainer isIcon={false}/></div>
                                 </div>
                             </div>
                             <div className="update_time">최근 업데이트 {GroupDetail && DateFormat(GroupDetail.update_time)}</div>
                         </div>

                         <div className="content_box">
                             <div className="infoBox">
                                 
                                 {/* explain --- */}
                                 <div className="explain">
                                    <div className="flex">
                                        {GroupDetail.grand_parentTitle ?
                                                <React.Fragment>
                                                <div onClick={() => this.gotoGroup(GroupDetail.grand_parentId)}className="group_summary ellipsis">
                                                        {GroupDetail.grand_parentTitle}
                                                    
                                                </div>
                                                <Icon className="triangle right" size="large" color="grey" />
                                                </React.Fragment>
                                            : null}
                                        {GroupDetail.parentName ?
                                                <React.Fragment>
                                                <div onClick={() => this.gotoGroup(GroupDetail.parentId)} className="group_summary ellipsis">
                                                        {GroupDetail.parentName} 
                                                </div>
                                                <Icon className="triangle right" size="large" color="grey" />
                                                </React.Fragment>
                                        : null}
                                        <div className="group_summary ellipsis">{GroupDetail.title}</div>
                                    </div>
                                    <div className="explanationRegion">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: GroupDetail.explanation
                                                    ? GroupDetail.explanation.replace(/\n/g, "<br/>")
                                                    : null
                                        }} />
                                    </div>
                                  </div>
                                  {/* explain ---  */}

                                  
                                  <div className="nick_name">{`개설자 : ${GroupDetail.userName}`}</div>
                                  <div className="footerBox">
                                        <img src={new_logo_view} className="asset_icon"/>
                                        <div className="asset_text">{NumberFormat(GroupDetail.view || 0)}</div>
                                        <img src={new_logo_favorite} className="asset_icon"/>
                                        <div className="asset_text">{NumberFormat(GroupDetail.like || 0)}</div>
                                        <img src={new_logo_note} className="asset_icon"/>
                                        <div className="asset_text">{NumberFormat(GroupDetail.design || 0 + GroupDetail.group || 0)}</div>
                                        {/* <div className="button_ marginRight bg_green"></div> */}
                                        {GroupDetail.uid ? <GroupNoticeContainer loading={this.props.loading} id={GroupDetail.uid} /> : ""}
                                        <div className={`button_ ${like?"bg_green":"bg_black"}`} onClick={this.like}>{like?"관심그룹 취소":"관심그룹 등록"}</div>
                                  </div>
                             </div>
                             <div className="thumbnailBox">
                                    {this.props.GroupDetail&&this.props.GroupDetail.children&&
                                     this.props.GroupDetail.children.map((child, index) =>
                                    <img src={child && child.m_img}
                                        className={`mini_thumbnail ${index%2==0?"marginRight":null}`}
                                        id={`child-${index}`}
                                        key={index} />
                                    )}
                             </div>
                         </div>
                    </div>
                </GroupSummary>
            </React.Fragment>
        )
    }
};

export default GroupInfoComponent;
{/* {GroupDetail.grand_parentTitle ?
     <React.Fragment>
         <div onClick={() => this.gotoGroup(GroupDetail.grand_parentId)}
             className="parent-title">
             <div className="label"><TextFormat txt={GroupDetail.grand_parentTitle} /></div>
             <Icon className="triangle right" size="large" color="grey" />
         </div>
     </React.Fragment>
     : null}
 {GroupDetail.parentName ?
     <React.Fragment>
         <div
             onClick={() => this.gotoGroup(GroupDetail.parentId)}
             className="parent-title">
             <div className="label"><TextFormat txt={GroupDetail.parentName} /></div>
             <Icon className="triangle right" size="large" color="grey" />
         </div>
     </React.Fragment>
     : null}
 <div className="title"><TextFormat txt={GroupDetail.title} /></div> */}
// <React.Fragment>
// {this.state.likeDialog
//     ? <PopupBox>
//         <div className="message_label">
//             관심 그룹으로 등록되었습니다.<br />
//             내 정보에서 확인 가능합니다.
//             </div>
//     </PopupBox>
//     : null}
// <MainBox>
//     <div className="wrapper">
//         <OneSideBox>
//             <div className="flexBox">
//                 {GroupDetail.grand_parentTitle ?
//                     <React.Fragment>
//                         <div onClick={() => this.gotoGroup(GroupDetail.grand_parentId)}
//                             className="parent-title">
//                             <div className="label"><TextFormat txt={GroupDetail.grand_parentTitle} /></div>
//                             <Icon className="triangle right" size="large" color="grey" />
//                         </div>
//                     </React.Fragment>
//                     : null}
//                 {GroupDetail.parentName ?
//                     <React.Fragment>
//                         <div
//                             onClick={() => this.gotoGroup(GroupDetail.parentId)}
//                             className="parent-title">
//                             <div className="label"><TextFormat txt={GroupDetail.parentName} /></div>
//                             <Icon className="triangle right" size="large" color="grey" />
//                         </div>
//                     </React.Fragment>
//                     : null}
//                 <div className="title"><TextFormat txt={GroupDetail.title} /></div>
//             </div>
//             <Thumbnail imageURL={(GroupDetail && GroupDetail.img && GroupDetail.img.l_img) ? GroupDetail.img.l_img : noimg} />
//             <div className="count-box">
//                 <div className="icon-wrapper">
//                     <IconView width="22px" height="11px" fill="#000000" opacity="0.55" />
//                     <div className="label">{NumberFormat(GroupDetail.view || 0)}</div>
//                 </div>
//                 <div className="icon-wrapper">
//                     <img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} />
//                     <div className="label">{NumberFormat(GroupDetail.like || 0)}</div>
//                 </div>
//                 <div className="icon-wrapper">
//                     <img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55" }} />
//                     <div className="label">{NumberFormat(GroupDetail.design || 0 + GroupDetail.group || 0)}</div>
//                 </div>
//             </div>
//             <div className="mobileMode">
//                 <TextFormat txt={`개설자 : ${GroupDetail.userName}`} chars={15} />
//                 <div className="count-box">
//                     <div className="icon-wrapper">
//                         <IconView width="22px" height="11px" fill="#000000" opacity="0.55" />
//                         <div className="label">{NumberFormat(GroupDetail.view || 0)}</div>
//                     </div>
//                     <div className="icon-wrapper">
//                         <img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} />
//                         <div className="label">{NumberFormat(GroupDetail.like || 0)}</div>
//                     </div>
//                     <div className="icon-wrapper">
//                         <img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55" }} />
//                         <div className="label">{NumberFormat(GroupDetail.design || 0 + GroupDetail.group || 0)}</div>
//                     </div>
//                 </div>
//             </div>
//         </OneSideBox>
//         <TwoSideBox w={w - 450}>
//             <div className="explainBox wrapper">
//                 <div className={`creater ${!this.props.group_notice ? "down" : ""}`} >
//                     <TextFormat txt={`개설자 : ${GroupDetail.userName}`} />
//                 </div>

//                 <div className="explanationRegion">
//                     <p
//                         dangerouslySetInnerHTML={{
//                             __html: GroupDetail.explanation
//                                 ? GroupDetail.explanation.replace(/\n/g, "<br/>")
//                                 : null
//                         }} /></div>

//                 <div className="bottom">
//                     {GroupDetail.uid ? <GroupNoticeContainer loading={this.props.loading} id={GroupDetail.uid} /> : ""}
//                     <JoinGroupContainer />
//                 </div>

//             </div>
//         </TwoSideBox>
//         <ThreeSideBox>
//             <div>
//                 {isEditor
//                     ? <React.Fragment>
//                         <div className="join_label_">
//                             <JoinGroupContainer /></div>

//                         <div className="ButtonItem" onClick={this.gotoGroupModify}>
//                             <div className="button_text_label">그룹 정보 수정하기</div>
//                             <NormalIcon imageURL={iEdit} opacity={0.5} /></div>

//                         <div className="ButtonItem" onClick={this.changeEditMode}>

//                             <div className="button_text_label displayFlex">

//                                 {manager ? "관리모드 종료" : "그룹 관리하기"}</div>
//                             <NormalIcon imageURL={iINOUT} opacity={0.5} />
//                             {this.props.waitingDesign.length > 0 || this.props.waitingGroup.length > 0 ?
//                                 manager ? null : <NewAlarmLogo><div className="circle" /></NewAlarmLogo>
//                                 : null}
//                         </div>

//                     </React.Fragment>
//                     : <React.Fragment>
//                         <div className="join_label_">
//                             <JoinGroupContainer /></div>

//                         <div className="ButtonItem" onClick={this.like}>
//                             <div className="button_text_label">관심 그룹 {like ? "취소하기" : "등록하기"}</div>
//                             <NormalIcon opacity={like ? "1" : "0.45"} imageURL={thumbup} /></div>

//                     </React.Fragment>}
//             </div>
//             <div className="time_label">
//                 <div>최근 업데이트 {GroupDetail && DateFormat(GroupDetail.update_time)}</div>
//                 <div>등록 일자 {GroupDetail && new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').length - 1)}</div>
//             </div>

//         </ThreeSideBox>

//         {/*  */}
//         <MobileSeeMore isShow={this.state.isSeeMore}>
//             <div className="explain-box font_middle">{GroupDetail.explanation}</div>
//             <div className="_txt font_smallthan font_fit">최근 업데이트 {DateFormat(GroupDetail.update_time)}</div>
//             <div className="_txt font_smallthan font_fit">등록 일자
//                                     {GroupDetail && new Date(GroupDetail.create_time).toLocaleDateString('ko-KR')
//                     .substring(0, new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').length - 1)}
//             </div>
//             <div className="icon-box">
//                 <div className="icon-wrapper">
//                     <div className="icon-piece"><JoinGroupContainer isIcon={true} /></div>
//                 </div>

//                 {isEditor === true ?
//                     <div className="icon-wrapper">
//                         <div onClick={this.gotoGroupModify} className="icon-piece"><MiniIcon iconName={iEdit} /><div className="font_small">그룹수정</div></div>
//                     </div>
//                     :
//                     <div className="icon-wrapper" >
//                         <div className="icon-piece" onClick={this.like}><MiniIcon like_opacity={like ? 1 : 0.45} iconName={thumbup} /><div className="font_small">관심그룹</div></div>
//                     </div>
//                 }
//                 {isEditor === true ?
//                     <div className="icon-wrapper">
//                         <div onClick={this.changeEditMode} className="icon-piece"><Icon color="grey" className="exchange" size="big" /><div className="font_small">{manager ? "관리종료" : "그룹관리"}</div></div>
//                     </div>
//                     :
//                     null
//                 }
//             </div>
//         </MobileSeeMore>
//         <div className="seemore cursor_pointer" onClick={() => { this.setState({ isSeeMore: !this.state.isSeeMore }) }}>
//             <div className="txt">{this.state.isSeeMore === false ? "▼ 더보기" : "▲ 접기"}</div>
//         </div>
//     </div>
//     {couldJoinVChat ?
//         <ChatWrapper>
//             <div
//                 className="notice"
//                 title="그룹 멤버들과 화상회의를 시작합니다."
//                 onClick={this.openVideoChat}>
//                 {this.state.liveVC ? <span>ON</span> : null}
//                 <div className="video-chat-icon"> <i className="video icon"></i> </div>
//                 <div className="text"> {"화상회의"} </div>
//             </div>
//             <div
//                 className="notice"
//                 title="그룹 멤버들과 채팅을 시작합니다."
//                 onClick={this.openChat}>
//                 {this.state.msg_cnt > 0 ? <span>{this.state.msg_cnt}</span> : null}
//                 <div className="video-chat-icon"> <i className="talk big icon"></i> </div>
//                 <div className="text"> 채팅 </div>
//             </div>
//         </ChatWrapper>
//         : null}
// </MainBox>
// </React.Fragment >


// const NewAlarmLogo = styled.div`
//     width:10px;
//     height:100%;
//     display:flex;
//     margin-right:2px;
//     .circle{
//         background-color:red;
//         width:7px;
//         height:7px;
//         border-radius:50%;
//     }
// `;
// const Thumbnail = styled.div`
//     position:relative;
//     min-width: 170px;
//     min-height:170px;
//     max-width: 170px;
//     max-height:170px;
//     border-radius: 15px;
//     background-color: #D6D6D6;
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position: center center;
//     background-image: ${props => `url(${props.imageURL})`};
//     margin-top:20px;
//     @media only screen and (min-width : ${0}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         min-width: 100px;
//         min-height:100px;
//         max-width: 100px;
//         max-height:100px;
//         margin-right:20px;
//     }
// `;
// const MainBox = styled.div`
//     // *{border: 1px solid black;}
//     width:100%;
//     position:relative;
//     .wrapper{
//         width:100%;
//         height:100%;
//         background-color:#EFEFEF;
//         display:flex;
//         padding:20px;
//         .seemore{
//             margin-top:15px;
//             width:100%;
//             height:max-content;
//             background-color:#E6E6E6;
//             padding:3px;
//             border-radius:3px;
//             display:none;
//             .txt{
//                 width:max-content;
//                 height:max-content;
//                 color:#707070;
//             }
//         }
//     }      
//     .font_big{font-size:20px;}
//     .font_midBig{font-size:17px;}
//     .font_middle{font-size:16px;}
//     .font_smallthan{font-size:14px;}
//     .font_small{font-size:12px;}
//     .font_bold{font-weight:500;}
//     .font_fit{font-weight:300;}
//     .font_red{color:#FF0000;}
//     .flexBox{display:flex;}
//     .algin_right{text-align:right;}
//     .margin_top{margin-top:15px;}
//     .margin_bottom{margin-bottom:10px;}
//     .margin_bottom_small{margin-bottom:5px;}
//     .alignItem_end{align-items:flex-end;}
//     .line_height{line-height:20px;}
//     .position_relative{position:relative;}
//     .transparent_btn{
//         width: max-content;
//         margin-top:15px;
//         margin-left:-5px;
//         background:none;
//         border:none;
//         outline:none;
//         display:flex;
//     }
//     .cursor_pointer{
//         cursor:pointer;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.LargeMaxWidth}px){
//         width:1920px;
//     }
//     @media only screen and (min-width : ${0}px) and (max-width : ${1024}px) {
//         height:max-content;
//         margin-top: 90px;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width : ${1024}px) {
//         .wrapper{
//             flex-wrap:wrap
//         }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {

//         .wrapper{
//             flex-wrap:wrap
//             .seemore{
//                 display:flex;
//                 justify-content:center;
//                 align-items:center;
//             }
//         }
//     }
// `;
// const OneSideBox = styled.div`
//     width:200px;
//     height:100%;
//     .title{
//         display: block !important;
//         width:max-content !important;
//         height: 29px;
//         color: #707070;
//         font-size: 20px;
//         font-weight: 500;
//         text-align: left;
//         line-height: 29px;
//         cursor: pointer;
//     }
//     .parent-title{
//         display: flex !important;
//         align-items:center;
//         width:max-content !important;
//         height: 29px;
//         color: #707070;
//         font-size: 15px;
//         font-weight: 500;
//         text-align: left;
//         line-height: 29px;
//         cursor: pointer;
//         opacity:0.8
//     }
//     .mobileMode {
//         width:max-content;
//         display:none;
//         margin-top:20px;
//         font-weight:300;
//         color:#707070;
//         position:relative;
//         .count-box{
//             width:180px;
//             display:flex;
//             align-items:center;
//             text-align:left;
//             font-weight:500;
//             .icon-wrapper{
//                 display:flex;
//                 margin-right:10px;
//                 align-items:center;
//             }
//             .label{
//                 color:#707070;
//                 margin-left:3px;
//                 width:max-content;
//                 font-size:15px;
//             }
//         }
//     }
//     .count-box{
//         width:200px;
//         display:flex;
//         align-items:center;
//         text-align:left;
//         font-weight:500;
//         .icon-wrapper{
//             display:flex;
//             margin-right:20px;
//             align-items:center;
//         }
//         .label{
//             color:#707070;
//             margin-left:5px;
//             width:max-content;
//             font-size:15px;
//         }
//     }

//     @media only screen and (min-width : ${1024}px) 
//     and (max-width : ${opendesign_style.resolutions.LargeMinWidth}px) {
//         .parent-title{
//             .label{
//                 width:50px;
//                 white-space: nowrap; 
//                 overflow: hidden; 
//                 text-overflow: ellipsis; 
//             }
//         }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width : ${1024}px) {
//         .title{
//             min-width:165px !important;
//             white-space:nowrap;
//             overflow:hidden;
//             text-overflow:ellipsis;
//         }
//         .parent-title{
//             .label{
//                 width:50px;
//                 height:29px;
//                 white-space: nowrap; 
//                 overflow: hidden; 
//                 text-overflow: ellipsis; 
//             }
//         }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         width:100%;
//         display:flex;
//         flex-wrap:wrap;
//         .flexBox{
//             width:100%;
//             height:max-content;
//         }
//         .title{
//             max-width:165px !important;
//             white-space:nowrap;
//             overflow:hidden;
//             text-overflow:ellipsis;
//         }
//         .parent-title{
//             .label{
//                 width:50px;
//                 white-space: nowrap; 
//                 overflow: hidden; 
//                 text-overflow: ellipsis; 
//             }
//         }
//         .mobileMode{
//             display:flex;
//             flex-direction:column;
//             justify-content:space-between;
//         }
//     }
// `;
// const TwoSideBox = styled.div`
//     min-width: 165px;
//     max-height: 170px;

//     .countBox {}
//     .explainBox {
//         *{ color:#707070; }
//         width: ${props => props.w}px;
//         margin-top: 30px;
//         display: flex;
//         flex-direction: column;
//         justify-content:space-between;

//         .wrapper {
//             position: relative;
//         }
//         .bottom{
//             position: absolute; 
//             bottom: 20px;
//         }

//         .creater {
//             .down {
//               margin-top: 5px;
//             }
//             width: max-content;
//             height: 25px;
//             font-size: 17px;
//             font-weight: 500;
//             line-height: 25px;
//             text-align: left;
//             font-family: Noto Sans KR;
//         }
//         .explanationRegion{
//             width: 100%;
//             display: flex;
//             height: 90px;
//             font-size: 17px;
//             color: #707070;
//             line-height: 30px;
//             cursor: default;

//             p {
//                 width: 100%;
//                 overflow: auto;
//                 word-wrap: break-word;

//                 font-size: 20px;
//                 font-weight: 300;
//                 font-family: Noto Sans KR;
//                 line-height: 30px;
//                 color: #707070;

//                 :hover {
//                     background-color: #EAEAEA;
//                 }

//                 ::-webkit-scrollbar {
//                     position: absolute;
//                     width: 3px;
//                 }
//                 ::-webkit-scrollbar-thumb {
//                     background: #707070 !important;
//                 }
//             }

//             // .explain-text {
//             //     width: ${props => props.w}px;
//             //     height: 100%;
//             //     font-size: 20px;
//             //     font-weight: 200;
//             //     font-family: Noto Sans KR;
//             //     line-height: 30px;
//             //     color: #707070;
//             //     white-space: nowrap; 
//             //     overflow: hidden; 
//             //     text-overflow: ellipsis; 
//             //     white-space: normal; 
//             //     text-align: left; 
//             //     word-wrap: break-word; 
//             //     display: -webkit-box; 
//             //     -webkit-line-clamp: 3; 
//             //     -webkit-box-orient: vertical;
//             // }
//         }
//     }

//     @media only screen and (min-width : ${opendesign_style.resolutions.MediumMinWidth}px) 
//     and (max-width : ${1024}px) {
//         margin-bottom:50px;
//         width:260px;
//         .explainBox{
//             width:100%;
//             .explanationRegion{
//                 .explain-text{
//                     width:100%;
//                 }
//             }
//         }

//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         display:none;
//     }
// `;

// const ThreeSideBox = styled.div`
//     margin-left: auto;
//     display: flex;
//     flex-direction: column !important;
//     justify-content:space-between;
//     min-height:100%;
//     .join_label_{
//         width:100%;
//         text-align:right;
//         height: 40px;
//         margin-left: auto;
//         color: #FF0000;
//         font-size: 20px;
//         cursor: pointer
//     }
//     .ButtonItem {
//         .displayFlex{
//             display:flex;
//             justify-content:flex-end;
//         }
//         width: max-content;
//         height: 30px;
//         display: flex;
//         margin-top: 10px;
//         cursor: pointer;
//         .button_text_label{
//             width: 150px;
//             height: 20px;
//             margin-top: 10px;
//             font-size: 17px;
//             font-weight: 300;
//             font-family: Noto Sans KR;
//             text-align: right;
//             color: #707070
//         }
//     }
//     .time_label{
//         font-size:17px;
//         font-weight:300;
//         font-family:Noto Sans KR;
//         color:#707070;
//         letter-spacing:0;
//         text-align:right;
//         line-height:27px;
//         margin-top:46px;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         display:none;
//     }
// `;
// const MobileSeeMore = styled.div`
//     margin-top:15px;
//     display:${props => props.isShow === false ? "none" : "flex"};
//     flex-direction:column;
//     width:100%;
//     .explain-box{
//         margin-bottom:15px;
//         color:#707070;
//     }
//     .icon-box{
//         margin-top:30px;
//         width:100%;
//         height:60px;
//         display:flex;
//         .icon-wrapper{
//             width:20%;
//             min-width:50px;
//             height:100%;  
//         }
//         .icon-piece{
//             cursor:pointer;
//             display:flex;
//             flex-direction:column;
//             align-items:center;
//             justify-content:center;
//             width:95%;
//             height:95%;
//             border-radius:5px;
//             background-color:#DEDEDE;
//         }
//     }
// `;
// const MiniIcon = styled.div`
//     width: 30px; 
//     height: 30px; 
//     background: url(${props => props.iconName}); 
//     background-size: contain; 
//     background-position: center center; 
//     background-repeat: no-repeat;
//     opacity: ${props => props.like_opacity == null ? 1 : props.like_opacity};

// `;
// const PopupBox = styled.div`
//     position:absolute;
//     top:47px;
//     left:763px;
//     width:396px;
//     height:138px;
//     background:#FFFFFF 0% 0% no-repeat padding-box;
//     box-shadow:0px 3px 6px #000000;
//     border-radius:5px;
//     opacity:1;
//     z-index:500;
//     .message_label{
//         width:273px;
//         height:69px;
//         margin-top:31px;
//         margin-left:62px;
//         font-size:20px;
//         font-weight:500;
//         font-family:Noto Sans KR;
//         color:#707070
//         text-align:center;
//         line-height:40px;
//     }
// `;
// const NormalIcon = styled.div`
//     width: 35px;
//     height: 35px;
//     margin-left: 5px;
//     background-image: ${props => `url(${props.imageURL})`};
//     background-position: center center;
//     background-size: contain;
//     background-repeat: no-repeat;
//     opacity: ${props => props.opacity};
// `;
// const ChatWrapper = styled.div`
//     // width: 100%;
//     position: absolute;
//     display: flex;
//     width: max-content;
//     // top: 0px;
//     right: 0%;
//     margin-left: auto;
//     margin-right: 10px;
//     margin-top: 10px;
    
//     .notice {
//         position: relative;
//         cursor: pointer;
//         span {
//             position: absolute;
//             background-color: red;
//             width: 20px;
//             height: 20px;
//             border-radius: 50%;
//             z-index: 1;
//             color: white;
//             font-weight: 500;
//             text-align: center;
//             font-size: 10px;
//         };
    
//         .video-chat-icon {
//             opacity: 0.6;
//             background-size: cover;
//             width: 45px;
//             height: 45px;
//         };
    
//         i {
//             text-align: center;
//             line-height: 36px;
//             font-size: 36px;
//             color: gray;
//             z-index: 0;
//         };
//         .text {
//             text-align: center;
//             font-size: 12px;
//             color: #707070;
//         };
//     }
// `;
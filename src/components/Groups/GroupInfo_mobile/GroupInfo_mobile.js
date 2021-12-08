import React, { Component } from 'react'
import styled from 'styled-components';
import IconView from "source/IconView"
import iEdit from "source/edit.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import iINOUT from "source/inout.svg"
import thumbup from "source/thumbup_icon_black.png"
import noimg from "source/noimg.png";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import { geturl } from 'config';
import JoinGroupContainer from "containers/Groups/JoinGroupContainer";
import TextFormat from 'modules/TextFormat';
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import Icon from '@material-ui/core/Icon';
import { GetPermissionCouldJoinVideoChatRequest } from "redux/modules/group";
import GroupNoticeContainer from "containers/Groups/GroupNoticeContainer";
import GotoDetail from 'components/Commons/GotoDetail';

import new_logo_view from "source/new_logo_view.svg";
import new_logo_favorite from "source/new_logo_favorite.svg";
import iconLike from "source/mypage_icon_like.svg";
import new_logo_share from "source/new_logo_share.svg";
import new_logo_note from "source/new_logo_note.svg";

import new_logo_chat from "source/new_logo_chat.svg";
import new_logo_msg from "source/new_logo_msg.svg";

const Wrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    margin-top:10px;

    .content{
        width:360px;
    }

` 

const NameWrapper = styled.div`
    width:360px;
    height:38px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-left:44px;
    padding-right:10px;
    margin-bottom:5px;
    .name_{
        width:200px;
        height:38px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        font-family:Spoqa Han Sans;
        font-weight:700;
        font-size:26px;
        line-height:38px;
    }
    .date{
        width:120px;
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        .text{
            font-family:Spoqa Han Sans;
            font-weight:400;
            font-size:12px;
            color:#777777;
            text-align:right;
        }
    }
`
const NewAlarmLogo = styled.div`
    width:10px;
    height:100%;
    display:flex;
    margin-right:2px;
    .circle{
        background-color:red;
        width:7px;
        height:7px;
        border-radius:50%;
    }
`;
const InfoWrapper = styled.div`
    width:100%;
    height:177px;
    background-color:#E0E0E0;
    display:flex;
    justify-content:center;
    .infoBox{
        width:360px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        padding:12px 7px 12px 7px;
        .top{
            display:flex;
            height:134px;
            .thumbnail{
                width:85px;
                height:85px;
                min-width:85px;
                min-height:85px;

                border-radius:5%;
                background-color:white;
                background-image:url(${props=>props.url});
                background-size:cover;
                background-position:center;
                box-shadow: 8px 8px 6px #00000029;
                margin-right:10px;
            }
            .info{
                width:100%;
                height:85px;
                overflow-y:auto;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: normal;
                // display: -webkit-box;
                // -webkit-line-clamp: 5; /* 라인수 */	
                // -webkit-box-orient: vertical; 
                // word-wrap:break-word;

                font: normal normal normal 18px/24px Spoqa Han Sans;
                color:#777777;
            }
            .group_user{
                width:100%;
                height:30px;
                display:flex;
                align-items:center;
                justify-content:flex-end;
            }
        }
        .bottom{
            width:100%;
            height:44px;
            display:flex;
            justify-content:space-between;
            align-items:flex-end;
            .box{display:flex;}
            .alignRight{justify-content:flex-end;}
            .modi{font-family:Spoqa Han Sans Neo;font-size:15px;color:#4F4F4F;margin-right:5px;}
            .iconwrap{height:22px;display:flex;font-size:18px;margin-right:12px;}
        }

    }
`
class GroupInfo_mobile extends Component {
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
        const { w, couldJoinVChat, manager } = this.state;
        console.log(GroupDetail && GroupDetail.img && GroupDetail.img.l_img);
        return (
            <Wrapper>
                <div className="content">
                <NameWrapper>
                    <div className="name_" onClick={async()=>await alert(GroupDetail.title)}>
                        {GroupDetail.title}
                    </div>
                    <div className="date">
                        <div className="text">업데이트&nbsp; {GroupDetail && DateFormat(GroupDetail.update_time)}</div>
                        <div className="text">등록일자&nbsp;{GroupDetail && new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').length - 1)}</div>
                    </div>
                </NameWrapper>
                <InfoWrapper url={(GroupDetail && GroupDetail.img && GroupDetail.img.l_img) || noimg}>
                    <div className="infoBox">
                        <div className="top">
                            <div className="thumbnail"/>
                            <div>
                            <div className="info">{GroupDetail.explanation? GroupDetail.explanation.replace(/\n/g, "<br/>"): null}</div>
                            <div className="group_user">{`개설자 : ${GroupDetail.userName}`}</div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="box">
                                <div className="iconwrap">
                                    <Icon style={{ fontSize: "18px", color:"black",marginRight:"5px" }}>visibility</Icon>
                                    {NumberFormat(GroupDetail.view || 0)}
                                </div>
                                <div className="iconwrap">
                                    <Icon style={{ fontSize: "18px", color:"red",marginRight:"5px" }}>favorite_border</Icon>
                                    {NumberFormat(GroupDetail.like || 0)}
                                </div>
                                <div className="iconwrap">
                                    <Icon style={{ fontSize: "18px", color:"black",marginRight:"5px" }}>article</Icon>
                                    {NumberFormat(GroupDetail.design || 0 + GroupDetail.group || 0)}
                                </div>
                            </div>
                            <div className="box">
                                <div>
                                <div className="box alignRight" onClick={this.changeEditMode} >
                                {this.props.waitingDesign.length > 0 || this.props.waitingGroup.length > 0 ?
                                manager ? null : <NewAlarmLogo><div className="circle" /></NewAlarmLogo>: null}
                                <div className="modi"> {manager ? "관리모드 종료" : "그룹 관리하기"}</div>                            
                                <Icon style={{ fontSize: "18px", color:"black"}}>apps</Icon></div>
                                <div className="box alignRight"  onClick={this.gotoGroupModify}><div className="modi">그룹 정보 수정하기</div><Icon style={{ fontSize: "18px", color:"black"}}>create</Icon></div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </InfoWrapper>
                {GroupDetail.uid ? <GroupNoticeContainer loading={this.props.loading} id={GroupDetail.uid} /> : ""}
                </div>
            </Wrapper>
        );
    }
};

export default GroupInfo_mobile;



// <GroupSummary isEditor={isEditor}>
// <img src={(GroupDetail && GroupDetail.img && GroupDetail.img.l_img) || noimg} className="thumbnail" />
// <div className="content_wrapper">
//     <div className="header_box">
//         <div className="row">
//             <div className="title_wrapper">
//                 <div className="_title ellipsis">{GroupDetail.title}</div>
//             </div>
//         </div>
//         <div className="marginLeft"><JoinGroupContainer isIcon={false} /></div>

//         {/* <div className="update_time">최근 업데이트 {GroupDetail && DateFormat(GroupDetail.update_time)}</div> */}
//     </div>

//     <div className="content_box">
//         <div className="infoBox">

//             {/* explain --- */}
//             <div className="explain">
//                 <div className="flex">
//                     {GroupDetail.grand_parentTitle ?
//                         <React.Fragment>
//                             <div onClick={() => this.gotoGroup(GroupDetail.grand_parentId)} className="group_summary ellipsis">
//                                 {GroupDetail.grand_parentTitle}

//                             </div>
//                             <Icon className="triangle right" size="large" color="grey" />
//                         </React.Fragment>
//                         : null}
//                     {GroupDetail.parentName ?
//                         <React.Fragment>
//                             <div onClick={() => this.gotoGroup(GroupDetail.parentId)} className="group_summary ellipsis">
//                                 {GroupDetail.parentName}
//                             </div>
//                             <Icon className="triangle right" size="large" color="grey" />
//                         </React.Fragment>
//                         : null}
//                     <div className="group_summary ellipsis">{GroupDetail.title}</div>
//                 </div>
//                 <div className="explanationRegion">
//                     <p
//                         dangerouslySetInnerHTML={{
//                             __html: GroupDetail.explanation
//                                 ? GroupDetail.explanation.replace(/\n/g, "<br/>")
//                                 : null
//                         }} />
//                 </div>
//             </div>
//             {/* explain ---  */}

//             <div className="nick_name">
//                 <GotoDetail type="designer" id={GroupDetail.user_id}>
//                     {`개설자 : ${GroupDetail.userName}`}
//                 </GotoDetail>
//             </div>
//             <div className="footerBox">
//                 <img src={new_logo_view} className="asset_icon" />
//                 <div className="asset_text">{NumberFormat(GroupDetail.view || 0)}</div>
//                 {/* <img src={new_logo_favorite} className="asset_icon" /> */}
//                 <img src={iconLike} className="asset_icon" />
//                 <div className="asset_text">{NumberFormat(GroupDetail.like || 0)}</div>
//                 <img src={new_logo_note} className="asset_icon" />
//                 <div className="asset_text">{NumberFormat(GroupDetail.design || 0 + GroupDetail.group || 0)}</div>
//                 {/* <div className="button_ marginRight bg_green"></div> */}
//                 <div style={{ marginLeft: "38px" }}>
//                     {GroupDetail.uid ? <GroupNoticeContainer loading={this.props.loading} id={GroupDetail.uid} /> : ""}</div>
//             </div>
//         </div>
//         <div className="sideBox">
//             <div>
//                 {isEditor
//                     ? <React.Fragment>
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
//                         <div className="ButtonItem" onClick={this.like}>
//                             <div className="button_text_label">관심 그룹 {like ? "취소하기" : "등록하기"}</div>
//                             <NormalIcon opacity={like ? "1" : "0.45"} imageURL={thumbup} /></div>
//                     </React.Fragment>}
//             </div>
//             <div className="date_time">
//                 <div className="time_detail">최근 업데이트 {GroupDetail && DateFormat(GroupDetail.update_time)}</div>
//                 <div className="time_detail" style={{ marginTop: "8px" }}>등록 일자 {GroupDetail && new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').length - 1)}</div>
//             </div>
//         </div>
//     </div>
// </div>
// </GroupSummary>
// {couldJoinVChat ?
// <ChatWrapper>
//     <div className="row">
//         <div
//             title="그룹 멤버들과 화상회의를 시작합니다."
//             className="notice icon_wrap" onClick={this.openVideoChat}>
//             <img src={new_logo_msg} className="icon" />
//             <div className="icon_label">화상회의</div>
//         </div>
//         <div
//             title="디자인 멤버들과 채팅을 시작합니다."
//             className="notice icon_wrap" onClick={this.openChat}>
//             <img src={new_logo_chat} className="icon" />
//             <div className="icon_label">채팅</div>
//         </div>
//     </div>
// </ChatWrapper>
// : null}





// const NormalIcon = styled.div`
//     width: 22px;
//     height: 22px;
//     margin-left: 5px;
//     background-image: ${props => `url(${props.imageURL})`};
//     background-position: center center;
//     background-size: contain;
//     background-repeat: no-repeat;
//     opacity: ${props => props.opacity};
// `;
// const ChatWrapper = styled.div`
// margin-left: 38px;

// width:100%;
// max-width:1740px;
// height:100px;
// display:flex;
// justify-content:flex-end;
// align-items:flex-end;
// .row{
//   display:flex;
// }
// .icon_wrap{
//   margin-left:44px;
//   display:flex;
//   flex-direction:column;
//   align-items:center;
//   cursor:pointer;
// }
// .icon{
//   width:66px;
//   height:66px;
//   object-fit:contain;
// }
// .icon_black{
//     filter: invert(100%);
// }
// .icon_label{
//   font-size:17px;
//   font-family:Spoqa Han Sans Neo;
//   font-weight:Medium;
// }
// `;
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
// const GroupSummary = styled.div`
//   margin-top: 24px;
//   margin-left: 38px;
// //   margin-right: 38px;

//   max-width: 1740px;
//   min-width: ${props => props.isEditor ? 1124 : 1000}px;
//     height: 319px;
//     box-shadow: 8px 8px 8px #4141411A;
//     border: 1px solid #eaeaea;

//     display: flex;

//     .thumbnail {
//         width: 319px;
//         height: 319px;
//         object-fit: cover;
//         border: 1px solid #eaeaea;
//     }
//     .ButtonItem{
//         display:flex;
//         align-items:flex-end;
//         justify-content:flex-end;
//         font-size:15px;
//         font-family:Spoqa Han Sans Neo;
//         font-weight:Regular;
//         color:#707070;
//         cursor:pointer;
//     }
//     .content_wrapper{
//         width:100%;
//         // min-width: px;
//         height:100%;
//         padding:16px;
//     }
//     .ellipsis{
//         white-space: nowrap; 
//         overflow: hidden; 
//         text-overflow: ellipsis; 
//       }
//     .header_box{
//         width:100%;
//         height:41px;
//         display:flex;
//         align-items:center;
//         justify-content:space-between;
//         margin-bottom:15px;
//         margin-right: 38px;
//         .row{
//             display:flex;
//             align-items:center;
//         }
//         .title_wrapper{
//             font-family:Noto Sans KR;
//             font-size:30px;
//             font-weight:Bold;
//             display:flex;
//             align-items:center;
//         }
//         ._title{
//             width:100%;
//             max-width:1000px;
//             height:41px;
//             line-height:41px;
//             overflow:hidden;
//             text-overflow:ellipsis;
//             white-space:nowrap;
//         }

//     }
//     .date_time{
//         width:100%;
//         height:48px;
//         font-family:Noto Sans KR;
//         font-size:15px;
//         font-weight:300;
//         .time_detail{
//             text-align:right;
//         }
//     }
//     .content_box{
//         width:100%;
//         height:240px;
//         display:flex;
//         justify-content:space-between;
//         .mini_thumbnail{
//             width:111px;
//             height:111px;
//             object-fit:cover;
//         }
//         .thumbnailBox{
//             width:240px;
//             height:240px;
//             margin-left:20px;
//         }
//         .infoBox{
//             max-width:500px;
//             width:100%;
//             height:100%;
//             display:flex;
//             flex-direction:column;
//             .explain{
//                 width: 100%;
//                 // width: 250px;
//                 height: 150px;
//             }
//             .group_summary{
//                 width:100%;
//                 max-width:200px;
//                 font-size:16px;
//                 // font-weight:500;
//             }
//             .explanationRegion{
//                 width: 100%;
//                 height: 120px;
//                 overflow-y:auto;
//                 padding-top:10px;
//                 padding-bottom:10px;
//             }
//         }
//         .nick_name{
//             width:100%;
//             height:21px;
//             font-family:Noto Sans KR;
//             font-size:16px;
//             font-weight:300;
//             margin-bottom:10px;
//             cursor: pointer;
//         }
//         .footerBox{
//             width:100%;
//             height:41px;
//             display:flex;
//             align-items:center;
//             .asset_icon{
//                 max-width:29px;
//                 max-height:29px;
//                 object-fit:contain;
//             }
//             .asset_text{
//                 width:max-content;
//                 max-width:40px;
//                 margin-left:8px;
//                 margin-right:16px;
//                 font-family:Spoqa Han Sans;
//                 font-size:19px;
//                 font-weight:400;
//             }
//         }

//     }
//     .sideBox{
//         // margin-right: 38px;
//         min-width:200px;
//         padding-top:28px;
//         padding-bottom:18px;
//         display:flex;
//         flex-direction:column;
//         justify-content:space-between;
//     }
//     .flex{display:flex;align-items:center;}
//     .button_{
//         width:142px;
//         height: 41px;
//         display:flex;
//         font-size:20px;
//         font-family:Spoqa Han Sans Neo;
//         font-weight:400;
//         justify-content:center;
//         align-items:center;
//         color:white;
//         box-shadow: 8px 8px 8px #0000002B;
//         cursor:pointer;
//     }

//     .marginLeft{margin-left:27px;}
//     .marginRight{margin-right:17px;}
//     .bg_black{background-color:black;}
//     .bg_green{background-color:#1E9B79;}
    
//     // responsive
//     @media only screen and (min-width: 500px) and (max-width: 1300px) {
//         .thumbnail {
//             width: 100%;
//             min-width: 150px;
//             object-fit: cover;
//         }
//     }
//     @media only screen and (min-width: 1301px) and (max-width: 1920px) {
//      .content_box { .infoBox { max-width: 900px; } }
//     }
// `

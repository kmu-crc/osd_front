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
import { Icon } from 'semantic-ui-react'
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

    // *{border: 1px dashed red;}
`;
const GroupHeader = styled.div`
    width: 100%;
    max-width: 1740px;
    min-width: ${1000 - (38 - 2)}px;
    height: 319px;
    box-shadow: 8px 8px 8px #4141411A;
    border: 1px solid #eaeaea;
    display: flex;
    flex-direction: row;

    .ellipsis {
        display: -webkit-box;
        min-width: 300px;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .thumbnail {
        width: 319px;
        height: 319px;
        min-width: 319px !important;
        min-height: 319px !important;
        border: 1px solid #eaeaea;
        overflow: hidden;
        object-fit: cover;
    }
    
    .infoBox{
        padding: 12px 22px;
        width: 100%;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .design_name {
            max-width: 1000px;
            width: 100%;
            height: 42px;
            overflow: hidden; 
            text-overflow: ellipsis; 
            white-space: nowrap; 
            line-height:41px;
            color:black;
            font-size:31px;
            font-family:Noto Sans KR;
            font-weight:Bold;
            overflow: hidden; 
            text-overflow: ellipsis; 
            white-space: nowrap; 
            line-height:41px;
        }
        .row{
            width:100%;
            display:flex;
        }
        .detail_height{height:190px;}
        .column{flex-direction:column;}
        .red_label{font-size:14px;color:red;margin-top:12px;}
        .black_label{font-size:14px;color:black;margin-top:12px;}
        .pointer{cursor:pointer;}
        .left_box{
            width:145px;
            height:100%;
            margin-right:10px;  
        }
        .right_box{
            max-width: 900px;
            width:100%;
            height:100%;
        }
    }
    .bottom_box{
        margin-top: auto;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;


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
            font-family:Spoqa Han Sans;
            font-size:19px;
            font-weight:400;
        }
    }
    .menuBox{
        width:100%;
        max-width:180px;
        min-width:180px;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        padding:11px;
        .pointer{cursor:pointer;}
        .button_wrap{
            display:flex;
            align-items:center;
            justify-content:flex-end;
            margin-top:5px;
        }
        .fork_label{
            height:28px;
            font-family:Spoqa Han Sans Neo;
            font-weight:Bold;
            font-size:20px;
            color:red;
            text-align:right;
            line-height:28px;
        }
        .black_label{
            font-family:Spoqa Han Sans Neo;
            font-weight:Bold;
            font-size:14px;
            color:black;
        }
        .icon{
            width:24px;
            height:24px;
            object-fit:contain;
            margin-left:10px;
        }
        .ssl{
            width:20px;
            height:20px;
            object-fit:contain;
            margin-left:5px;
        }
        .date{
            text-align:right;
            margin-top:5px;
        }
    }
    .explanationRegion {
        width: 100%;
        height: 150px;
        padding-top: 5px;
        padding-bottom: 5px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .nick_name {
        margin-bottom: 10px;
        width: 100%;
        height: 21px;
        line-height: 21px;
        font-family: Noto Sans KR;
        font-size: 16px;
        font-weight: 300;
        cursor: pointer;
    }
    .parent-title {
        // border: 1px dashed blue;
        width: max-content; // 100%;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    // responsive

    .ButtonItem{
        display:flex;
        align-items:flex-end;
        justify-content:flex-end;
        font-size:15px;
        font-family:Spoqa Han Sans Neo;
        font-weight:Regular;
        color:#707070;
        cursor:pointer;
    }
    .date_time{
        width:100%;
        height:48px;
        font-family:Noto Sans KR;
        font-size:15px;
        font-weight:300;
        .time_detail{
            text-align:right;
        }
    }
    // responsive
    @media only screen and (min-width: 500px) and (max-width: 1150px) {
        .thumbnail {
            width: 100%;
            min-width: 250px !important;
            max-width:250px;
            object-fit: contain;
        }
    }
`;
const NormalIcon = styled.div`
    width: 22px;
    height: 22px;
    margin-left: 5px;
    background-image: ${props => `url(${props.imageURL})`};
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: ${props => props.opacity};
`;
const NewAlarmLogo = styled.div`
    width: 10px;
    height: 100%;
    display: flex;
    margin-right: 2px;
    .circle {
        background-color: red;
        width: 7px;
        height: 7px;
        border-radius: 50%;
    }
`;
const ChatWrapper = styled.div`
    margin-left: 38px;

    width:100%;
    max-width:1740px;
    height:100px;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    .row{
        display:flex;
    }
    .icon_wrap{
        margin-left:44px;
        display:flex;
        flex-direction:column;
        align-items:center;
        cursor:pointer;
    }
    .icon{
        width:66px;
        height:66px;
        object-fit:contain;
    }
    .icon_black{
        filter: invert(100%);
    }
    .icon_label{
        font-size:17px;
        font-family:Spoqa Han Sans Neo;
        font-weight:Medium;
    }
`;
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
    // async componentDidUpdate(prevProp) {
    // if (prevProp.GroupDetail != this.props.GroupDetail && this.props.GroupDetail != null) {
    // if (this.props.GroupDetail != null && this.props.token != null) {
    // const couldJoinVChat = await GetPermissionCouldJoinVideoChatRequest(this.props.token, this.props.GroupDetail.uid);
    // this.setState({ couldJoinVChat: couldJoinVChat });
    // }
    // }
    // }
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
        const thumbnail = (GroupDetail && GroupDetail.img && GroupDetail.img.l_img) || noimg;


        return (<Wrapper>
            <GroupHeader>
                <div className='thumbnail'>
                    <img className="thumbnail" src={thumbnail} />
                </div>
                <div className="infoBox">
                    <div className="design_name">
                        {GroupDetail.title}
                    </div>
                    <div className='black_label ellipsis'>
                        <div className="explanationRegion">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: GroupDetail.explanation
                                        ? GroupDetail.explanation.replace(/\n/g, "<br/>")
                                        : null
                                }} />
                            {/* {GroupDetail.explanation} */}
                        </div>

                    </div>
                    <div className="bottom_box">

                        <div className="nick_name">
                            <GotoDetail type="designer" id={GroupDetail.user_id}>
                                {`개설자 : ${GroupDetail.userName}`}
                            </GotoDetail>
                        </div>

                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
                            <img src={new_logo_view} className="asset_icon" />
                            <div className="asset_text">{NumberFormat(GroupDetail.view || 0)}</div>
                            <img src={iconLike} className="asset_icon" />
                            <div className="asset_text">{NumberFormat(GroupDetail.like || 0)}</div>
                            <img src={new_logo_note} className="asset_icon" />
                            <div className="asset_text">{NumberFormat(GroupDetail.design || 0 + GroupDetail.group || 0)}</div>
                            <div style={{ marginLeft: "38px" }}>
                                {GroupDetail.uid
                                    ? <GroupNoticeContainer loading={this.props.loading} id={GroupDetail.uid} />
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="menuBox">
                    <JoinGroupContainer isIcon={false} />
                    <div>
                        {isEditor
                            ? <React.Fragment>
                                <div className="ButtonItem" onClick={this.gotoGroupModify}>
                                    <div className="button_text_label">그룹 정보 수정하기</div>
                                    <NormalIcon imageURL={iEdit} opacity={0.5} /></div>
                                <div className="ButtonItem" onClick={this.changeEditMode}>
                                    <div className="button_text_label displayFlex">
                                        {manager ? "관리모드 종료" : "그룹 관리하기"}</div>
                                    <NormalIcon imageURL={iINOUT} opacity={0.5} />
                                    {this.props.waitingDesign.length > 0 || this.props.waitingGroup.length > 0 ?
                                        manager ? null : <NewAlarmLogo>
                                            <div className="circle" /></NewAlarmLogo>
                                        : null}
                                </div>
                            </React.Fragment>
                            : <React.Fragment>
                                <div className="ButtonItem" onClick={this.like}>
                                    <div className="button_text_label">관심 그룹 {like ? "취소하기" : "등록하기"}</div>
                                    <NormalIcon opacity={like ? "1" : "0.45"} imageURL={thumbup} /></div>
                            </React.Fragment>}
                    </div>
                    <div className="date_time">
                        <div className="time_detail">최근 업데이트 {GroupDetail && DateFormat(GroupDetail.update_time)}</div>
                        <div className="time_detail" style={{ marginTop: "8px" }}>등록 일자 {GroupDetail && new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(GroupDetail.create_time).toLocaleDateString('ko-KR').length - 1)}</div>
                    </div>
                </div>
            </GroupHeader>




            {couldJoinVChat ?
                <ChatWrapper>
                    <div className="row">
                        <div
                            title="그룹 멤버들과 화상회의를 시작합니다."
                            className="notice icon_wrap" onClick={this.openVideoChat}>
                            <img src={new_logo_msg} className="icon" />
                            <div className="icon_label">화상회의</div>
                        </div>
                        <div
                            title="디자인 멤버들과 채팅을 시작합니다."
                            className="notice icon_wrap" onClick={this.openChat}>
                            <img src={new_logo_chat} className="icon" />
                            <div className="icon_label">채팅</div>
                        </div>
                    </div>
                </ChatWrapper>
                : null}
        </Wrapper >);
    }
};

export default GroupInfoComponent;
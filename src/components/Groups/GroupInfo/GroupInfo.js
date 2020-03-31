import React, { Component } from 'react'
import styled from 'styled-components';

import IconView from "source/IconView"
import iEdit from "source/edit.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import iINOUT from "source/inout.svg"
import thumbup from "source/baseline_thumb_up_black_48dp_2x.png"
// import dots from "source/baseline_more_vert_black_48dp.png";
import noimg from "source/noimg.png";

import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import { geturl } from 'config';

import JoinGroupContainer from "containers/Groups/JoinGroupContainer";

const PopupBox = styled.div`
    position:absolute;
    top:47px;
    left:763px;
    width:396px;
    height:138px;
    background:#FFFFFF 0% 0% no-repeat padding-box;
    box-shadow:0px 3px 6px #000000;
    border-radius:5px;
    opacity:1;
    z-index:500;
    .message_label{
        width:273px;
        height:69px;
        margin-top:31px;
        margin-left:62px;
        font-size:20px;
        font-weight:500;
        font-family:Noto Sans KR;
        color:#707070
        text-align:center;
        line-height:40px;
    }
`;
const Header = styled.div`
    width: ${props => props.width}px;
    display: flex;
    @media only screen and (min-width : ${0}px) and (max-width : ${900}px) {
        margin-top: 50px;
    }
`;
const GroupTitleWrapper = styled.div`
    width: max-content;
    height: 30px;
    color: #707070;
    font-size: 20px;
    font-weight: 500;
    font-family: Noto Sans KR;
    text-align: left;
    line-height: 25px;
    margin-top: 15px;
    margin-left: 10px;
`;
const Arrow = styled.div`
    width: 12px;
    height: 14px;
    bacgkground: #707070;
    opacity: 0.55;
    border-left: 14px solid #707070;
    border-bottom: 6px solid transparent;
    border-top: 6px solid transparent;
    margin: 3px 3px;
`;
const ThumbnailBox = styled.div`
    width: 170px;
    min-width: 170px;
    height: 170px;
    // margin-top: 9px;
    border-radius: 15px;
    background-color: #D6D6D6;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-image: ${props => `url(${props.imageURL})`};
`;
const ExplainBox = styled.div`
    @media only screen and (min-width : ${0}px) and (max-width : ${630}px) {
        display: none;
    }
    position: relative;
    .board {
        margin-left: 35px;
        .creater {
            width: max-content;
            height: 30px;
            // margin-top: 5px;
            font-size: 17px;
            font-weight: 500;
            color: #707070;
            text-align: left;
            line-height: 29px;
        }
        .explanationRegion{
            display: flex;
            height: 90px;
            font-size: 17px;
            color: #707070;
            line-height: 30px;

            .explaination {
                width:${props => props.w}px;
                // min-width: 250px;
                // max-width: 1350px;
                height: 100%;
                font-size: 20px;
                font-weight: 200;
                font-family: Noto Sans KR;
                line-height: 30px;
                color: #707070;

                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis; 
                white-space: normal; 
                text-align: left; 
                word-wrap: break-word; 
                display: -webkit-box; 
                -webkit-line-clamp: 3; 
                -webkit-box-orient: vertical;
            }
        }
    }
    .CountView {
        width: 300px;
        height: 22px;
        position: absolute;
        display: flex;
        left: 231px;
        bottom: 0px;
        .countItem {
            height: 100%;
            display: flex;
            margin-right: 20px;
            .count_label {
                width: max-content;
                height: 100%
                margin-left:5px;
            }
        } 
    }
    }
`;
const ButtonRegion = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column !important;

    .ButtonItem {
        width: max-content;
        height: 30px;
        display: flex;
        margin-top: 10px;
        cursor: pointer;
        .button_text_label{
            width: 150px;
            height: 20px;
            margin-top: 10px;
            font-size: 17px;
            font-weight: 300;
            font-family: Noto Sans KR;
            text-align: right;
            color: #707070
        }
    }
    .time_label{
        font-size:17px;
        font-weight:300;
        font-family:Noto Sans KR;
        color:#707070;
        letter-spacing:0;
        text-align:right;
        line-height:27px;
        margin-top:46px;
    }
    .Join_label {
        width: 79px;
        height: 40px;
        margin-top: 15px;
        margin-left: auto;
        color: #FF0000;
        font-size: 20px;
        cursor: pointer
    }
    }
`;
const NormalIcon = styled.div`
    width: 35px;
    height: 35px;
    margin-left: 5px;
    background-image: ${props => `url(${props.imageURL})`};
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: ${props => props.opacity};
`;

class GroupInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { w: window.innerWidth > 1920 ? 1920 : window.innerWidth, joinDialog: false, likeDialog: false, forkDialog: 0, manager: false };
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
    needLogin() {
        alert("로그인을 해주세요.");
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
    handleMoreViewDescription(description) {
        alert(description);
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

    render() {
        const { like, GroupDetail, userInfo } = this.props;
        const group_user_id = GroupDetail && GroupDetail.user_id;
        const user_id = userInfo && userInfo.uid;
        const isEditor = group_user_id === user_id;
        const { w, manager } = this.state;

        console.log("::GROUPINFO::\n", this.props, this.state);

        return (
            <React.Fragment>
                {this.state.likeDialog ?
                    <PopupBox>
                        <div className="message_label">
                            관심 그룹으로 등록되었습니다.<br />
                        내 정보에서 확인 가능합니다.
                        </div>
                    </PopupBox>
                    : null}

                <Header width={w}>
                    {GroupDetail ? // case of detail exist
                        <div style={{ width: `${w}px`, height: "250px", backgroundColor: "#EFEFEF", display: "flex", flexDirection: "row" }}>
                            {/* left */}
                            <div>
                                {/* title */}
                                <div
                                    style={{ display: "flex", flexDirection: "row", }}>
                                    {GroupDetail.grand_parentTitle ?
                                        <React.Fragment>
                                            <div
                                                onClick={() => this.gotoGroup(GroupDetail.grand_parentId)}
                                                style={{
                                                    marginLeft: "15px",
                                                    marginRight: "15px",
                                                    marginTop: "15px",
                                                    curspor: "pointer",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                {GroupDetail.grand_parentTitle} <Arrow />
                                            </div>
                                        </React.Fragment>
                                        : null}
                                    {GroupDetail.parentName ?
                                        <React.Fragment>
                                            <div
                                                onClick={() => this.gotoGroup(GroupDetail.parentId)}
                                                style={{
                                                    marginLeft: "15px",
                                                    marginRight: "15px",
                                                    marginTop: "15px",
                                                    curspor: "pointer",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                {GroupDetail.parentName} <Arrow />
                                            </div>
                                        </React.Fragment>
                                        : null}
                                    <GroupTitleWrapper>{GroupDetail.title}</GroupTitleWrapper>

                                </div>

                                {/* thumbnail + detail + description */}
                                <div style={{ width: "max-content" }}>
                                    <div style={{ width: "max-content", marginTop: "15px", marginLeft: "25px", display: "flex", flexDirection: "row" }}>

                                        {/* thumbnail */}
                                        <ThumbnailBox
                                            imageURL={(GroupDetail && GroupDetail.img && GroupDetail.img.l_img) ? GroupDetail.img.l_img : noimg} />


                                        {/* detail + description  */}
                                        <ExplainBox w={w - 450}>
                                            <div className="board">
                                                {/*  */}
                                                <div className="creater">개설자 : {GroupDetail.userName && GroupDetail.userName.slice(0, 32)}</div>
                                                <div className="explanationRegion">
                                                    <p className="explaination">
                                                        {GroupDetail.explanation}
                                                    </p>
                                                </div>
                                                {/* count */}
                                                <div style={{ backgroundColor: "#EFEFEF", width: "200px", marginTop: "19px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                                        <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(GroupDetail.view || 0)}</div>
                                                    </div>
                                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                                        <div><img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(GroupDetail.like || 0)}</div>
                                                    </div>
                                                    <div style={{ display: "flex" }}>
                                                        <div style={{ marginTop: "5px" }}><img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55", marginTop: "10px" }} /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px', marginTop: "4px" }}>{NumberFormat(GroupDetail.design || 0 + GroupDetail.group || 0)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ExplainBox>


                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div style={{ marginLeft: "auto", marginRight: "15px" }}>
                                <ButtonRegion>
                                    {isEditor
                                        ? <React.Fragment>
                                            <div className="Join_label">
                                                <JoinGroupContainer /></div>

                                            <div className="ButtonItem" onClick={this.gotoGroupModify}>
                                                <div className="button_text_label">그룹 정보 수정하기</div>
                                                <NormalIcon imageURL={iEdit} opacity={0.5} /></div>

                                            <div className="ButtonItem" onClick={this.changeEditMode}>
                                                <div className="button_text_label">{manager ? "관리모드 종료" : "그룹 관리하기"}</div>
                                                <NormalIcon imageURL={iINOUT} opacity={0.5} /></div>

                                        </React.Fragment>
                                        : <React.Fragment>
                                            <div className="Join_label">
                                                <JoinGroupContainer /></div>

                                            <div className="ButtonItem" onClick={this.like}>
                                                <div className="button_text_label">관심 그룹 {like ? "취소하기" : "등록하기"}</div>
                                                <NormalIcon opacity={like ? "1" : "0.45"} imageURL={thumbup} /></div>

                                        </React.Fragment>}

                                    <div className="time_label">
                                        <div>최근 업데이트 {GroupDetail && DateFormat(GroupDetail.child_update_time)}</div>
                                        <div>{GroupDetail && DateFormat(GroupDetail.create_time)} 등록</div></div>

                                </ButtonRegion>
                            </div>
                        </div>
                        : // case of no GroupDetail 
                        <div >

                        </div>}
                </Header>
            </React.Fragment >)
    }
};

export default GroupInfoComponent;

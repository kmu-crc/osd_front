import React, { Component } from 'react'
import styled from 'styled-components';
import IconView from "source/IconView"
import iEdit from "source/edit.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import iINOUT from "source/inout.svg"
import thumbup from "source/baseline_thumb_up_black_48dp_2x.png"
// import { Modal } from "semantic-ui-react";

import JoinGroupContainer from "containers/Groups/JoinGroupContainer";
import dots from "source/baseline_more_vert_black_48dp.png";
import noimg from "source/noimg.png";
import DateFormat from "modules/DateFormat";
import TextFormat from "modules/TextFormat";
import NumberFormat from "modules/NumberFormat";

// import Cross from "components/Commons/Cross"
import { geturl } from 'config';


const Arrow = styled.div`
    width: 12px;
    height: 14px;
    bacgkground: #707070;
    opacity: 0.55;
    border-left: 14px solid #707070;
    border-bottom: 6px solid transparent;
    border-top: 6px solid transparent;
    margin:22px 3px;
`;

const LoadingBox = styled.div`
    width:100%;
    display:flex;
    margin-left:65px;
    opacity:0.5;
    .titleBox{
        width:197px;
        height:25px;
        margin-top:15px;
        background-color:#707070;
        border-radius:15px;
    }
    .thumbnailBox{
        width:170px;
        height:170px;
        margin-left:14px;
        margin-top:9px;
        background-color:#D6D6D6;
        border-radius:15px;
    }
    .InfoBox{
        margin-left:51px;
            .cateBox{
                width:95px;
                height:25px;
                margin-top:15px;
                background-color:#FFA0A0;
                border-radius:15px;
            }
            .MemberBox{
                width:273px;
                height:30px;
                margin-top:15px;
                background-color:#707070;
                border-radius:15px;
            }
            .ExplainBox{
                width:1284px;
                height:90px;
                display:flex;
                margin-top:11px;
                .explain_label{
                    width:621px;
                    height:100%;
                    margin-right:42px;
                    background-color:#A3A7A3;
                    border-radius:15px;
                }
            }
            .cntBox{
                width:250px;
                height:25px;
                margin-top:17px;
                background-color:#0FA0A0;
                border-radius:15px;
            }
       
        }
        .BtnBox{
            margin-left:auto;
            margin-right:72px;
            order:2;
            .likeBox{
                width:95px;
                height:29px;
                margin-left:auto;
                margin-right:0px;
                margin-top:15px;
                background-color:#FFD6D6;
                border-radius:15px;
            }
            .modifyBox{
                width:183px;
                height:45px;
                margin-left:auto;
                margin-right:0px;
                margin-top:37px;
                background-color:#D6D6D6;
                border-radius:15px;
            }
            .timeBox{
                width:147px;
                height:55px;
                margin-left:auto;
                margin-right:0px;
                margin-top:43px;
                background-color:#D6D6D6;
                border-radius:15px;
            }
    }

`
const Header = styled.div`
    width:1920px;
    height:237px;
    background-color:#EFEFEF;
    display:flex;
`
const GroupHeaderBox = styled.div`
    width: 100%;
    display: flex;
    padding-left: 30px;
    .profileBox{
        width: max-content;
        .parentBox{
            display: flex;
            cursor: default;
            .grandparent{
                width: 15px;
                height: 15px;
                margin-top: 22px;
                margin-right: 10px;
                opacity: 0.55;
                transform: rotate(90deg);
                cursor: pointer;
            }
            .parent{
                margin-left: 10px;
                margin-top: 17px;
                font-size: 20px;
                font-weight: 300;
                color: #707070;
                cursor: pointer;
           }    
        }
    }
    .ExplainBox{
        margin-left:10px;
        position:relative;
        .title{
            width:max-content;
            height:30px;
            color:#707070;
            font-size:20px;
            font-weight:500;
            font-family:Noto Sans KR;
            text-align:left;
            line-height:25px;
            margin-top:15px;
        }
        .board{
            margin-left:50px;
            .creater{
                width:max-content;
                height:30px;
                margin-top:5px;
                font-size:17px;
                font-weight:500;
                color:#707070;
                text-align:left;
                line-height:29px;
            }
            .explanationRegion{
                
                display:flex;
                height:90px;
                font-size:17px;
                color:#707070;
                line-height:30px;
                margin-top:10px;
                .explaination{
                    width:500px;
                    margin-right:41px;
                    word-wrap:break-word;
                    overflow:hidden;
                }
            }
        }
        .CountView{
            width:300px;
            height:22px;
            position:absolute;
            display:flex;
            left:231px;
            bottom:0px;
            .countItem{
                height:100%;
                display:flex;
                margin-right: 20px;
                .count_label{
                    width: max-content;
                    height:100%
                    margin-left:5px;
                }
            } 
        }
    }

    .ButtonRegion{

        margin-left:auto;
        margin-right:72px;
        cursor:pointer;

        .ButtonItem{
            width: max-content;
            height: 30px;
            display: flex;
            margin-top: 10px;

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
`
//const MiniIcon = styled.div`
//    width:17px;
//    height:17px;
//    background-image: ${props => `url(${props.imageURL})`};
//    background-position:center center;
//    background-size:contain;
//    background-repeat:no-repeat;
//    opacity:${props => props.opacity};
//`
const NormalIcon = styled.div`
    width: 35px;
    height: 35px;
    margin-left: 5px;
    background-image: ${props => `url(${props.imageURL})`};
    background-position:center center;
    background-size:contain;
    background-repeat:no-repeat;
    opacity:${props => props.opacity};

`
const ThumbnailBox = styled.div`
        width:170px;
        height:170px;
        margin-left:14px;
        margin-top:9px;
        border-radius:15px;
        background-color:#D6D6D6;
        background-repeat:no-repeat;
        background-size:cover;
        background-position:center center;
        background-image:${props => `url(${props.imageURL})`};
`
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
`
const GroupInfoData = {
    userName: "name",
    child_update_time: "0",
    create_time: "0",
    img: { l_img: noimg },
    title: "title",
    parentName: "parent",
    parentId: "",
    grand_parentTitle: "grand_parent",
    grand_parentGroup: "grand_group",
    url: "URL",
    category: "CATEGORY",
    designer: "DESIGNER",
    view: 0,
    design: 0,
    description: "Description"
};

class GroupInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { joinDialog: false, likeDialog: false, forkDialog: 0, manager: false };
        this.needLogin = this.needLogin.bind(this);
        this.like = this.like.bind(this);
        this.handleMoreViewDescription = this.handleMoreViewDescription.bind(this);
        this.gotoGroupModify = this.gotoGroupModify.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.gotoGroup = this.gotoGroup.bind(this);
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
        window.location.href = href + 'modifygroup/' + this.props.GroupInfo.uid;
    }
    changeEditMode() {
        this.setState({ manager: !this.state.manager });
        this.props.handleSwitchMode();
    }
    render() {
        console.log(this.props.GroupInfo);
        const group_user_id = this.props.GroupInfo && this.props.GroupInfo.user_id;
        const user_id = this.props.userInfo && this.props.userInfo.uid;

        const LoadingGroupInfo = () => {
            return (
                <LoadingBox>
                    <div>
                        <div className="titleBox" />
                        <div className="thumbnailBox" />
                    </div>
                    <div className="InfoBox">
                        <div className="cateBox" />
                        <div className="MemberBox" />
                        <div className="ExplainBox">
                            <div className="explain_label" />
                            <div className="explain_label" />
                        </div>
                        <div className="cntBox" />
                    </div>
                    <div className="BtnBox">
                        <div className="likeBox" />
                        <div className="modifyBox" />
                        <div className="timeBox" />
                    </div>
                </LoadingBox>)
        }

        const GroupInfo = (props) => {
            let info = GroupInfoData;
            let parentName = null;
            if (props.GroupInfo !== 0) {
                info = props.GroupInfo;
                if (info.parentName != null) {
                    parentName = info.parentName && info.parentName.slice(0, 14);
                    parentName += info.parentName && info.parentName.length > 14 ? " ... " : "";
                }
            }
            const { manager } = this.state;
            const isEditor = group_user_id === user_id;
            const { like } = this.props;

            console.log("info:", info);
            return (
                <GroupHeaderBox>
                    <div className="profileBox">
                        {parentName &&
                            <div className="parentBox">
                                {info.grand_parentTitle &&
                                    <React.Fragment>
                                        <img onClick={() => this.gotoGroup(info.grand_parentId)} src={dots} alt={dots} title={info.grand_parentTitle} className="grandparent" /> <Arrow />
                                    </React.Fragment>}
                                {info.parentName &&
                                    <React.Fragment>
                                        <div onClick={() => this.gotoGroup(info.parentId)} className="parent" title={info.parentName}>{parentName}</div><Arrow />
                                    </React.Fragment>}
                            </div>}
                    </div>

                    <div className="ExplainBox">
                        <div className="title"><TextFormat txt={info.title} /></div>
                        <div style={{ display: "flex" }}>
                            <ThumbnailBox imageURL={info && info.img && info.img.l_img ? info.img.l_img : noimg} />
                            <div className="board">
                                <div className="creater">개설자 : {info.userName && info.userName.slice(0, 32)}</div>
                                <div className="explanationRegion">
                                    <div className="explaination">
                                        {info.explanation ? info.explanation.slice(0, 200) : `${info.userName}님의 "${info.title}" 그룹입니다.`}
                                    </div>
                                    <div className="explaination">
                                        {info.explanation && info.explanation.slice(200, 400)}
                                        {info.explanation && info.explanation.length > 400 && <React.Fragment>...</React.Fragment>}
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "#EFEFEF", width: "200px", marginTop: "19px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                        <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(info.view || 0)}</div>
                                    </div>
                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                        <div><img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} /></div>
                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(info.like || 0)}</div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ marginTop: "5px" }}><img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55", marginTop: "10px" }} /></div>
                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px', marginTop: "4px" }}>{NumberFormat(info.design || 0 + info.group || 0)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ButtonRegion">
                        {isEditor ?
                            <React.Fragment>
                                <div className="Join_label">
                                    <JoinGroupContainer />
                                </div>
                                <div className="ButtonItem" onClick={this.gotoGroupModify}>
                                    <div className="button_text_label">그룹 정보 수정하기</div>
                                    <NormalIcon imageURL={iEdit} opacity={0.5} />
                                </div>
                                <div className="ButtonItem" onClick={this.changeEditMode}>
                                    <div className="button_text_label">{manager ? "관리모드 종료" : "그룹 관리하기"}</div>
                                    <NormalIcon imageURL={iINOUT} opacity={0.5} />
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div className="Join_label">
                                    <JoinGroupContainer />
                                </div>
                                <div className="ButtonItem" onClick={this.like}>
                                    <div className="button_text_label">관심 그룹 {like ? "취소하기" : "등록하기"}</div>
                                    <NormalIcon opacity={like ? "1" : "0.45"} imageURL={thumbup} />
                                </div>
                            </React.Fragment>}
                        <div className="time_label">
                            <div>최근 업데이트 {info && DateFormat(info.child_update_time)}</div>
                            <div>{info && DateFormat(info.create_time)} 등록</div>
                        </div>
                    </div>
                </GroupHeaderBox >
            )
        }
        const info = this.props.GroupInfo
        return (
            <React.Fragment>
                {
                    this.state.likeDialog &&
                    <PopupBox><div className="message_label">관심 그룹으로 등록되었습니다.<br />마이페이지에서 확인 가능합니다.</div></PopupBox>
                }
                < Header > {info ? <GroupInfo GroupInfo={info} /> : <LoadingGroupInfo />}</Header >
            </React.Fragment >)
    }
}

export default GroupInfoComponent;

// const JoinModal = () => {
//     const title = this.props.GroupInfo && this.props.GroupInfo.title;
//     return (
//         this.state.showPopup === 1 &&
//         <CustomModal>
//             <div onClick={() => this.handleShowPopup(-1)} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
//                 <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} />
//             </div>
//             <div style={{
//                 marginTop: "31.5px", marginLeft: "62.5px", width: "394px", height: "69px", textAlign: "center", fontWeight: "500",
//                 fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#707070", opacity: "1"
//             }}>
//                 {title && title.slice(0, 20)}<br />
//                 가입 신청을 하시겠습니까?</div>
//             <div onClick={() => this.handleShowPopup(-1)} style={{
//                 cursor: "pointer", marginTop: "31px", marginLeft: "210px", width: "130px", height: "29px",
//                 textAlign: "center", fontWeight: "500", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", letterSpacing: "0",
//                 color: "#FF0000", opacity: "1", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000"
//             }}>
//                 네, 가입합니다.</div>
//         </CustomModal>
//     );
// }
// const JoinCancelModal = () => {
//     const title = this.props.GroupInfo.title;
//     return (
//         this.state.showPopup === 2 &&
//         <div style={{ zIndex: "950", position: "fixed", top: "255px", left: "618px", width: "576px", height: "200px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #000000", borderRadius: "5px", opacity: "1" }}>
//             <div onClick={() => this.handleShowPopup(-1)} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
//                 <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} />
//             </div>
//             <div style={{
//                 marginTop: "31.5px", marginLeft: "62.5px", width: "394px", height: "69px", textAlign: "center", fontWeight: "500",
//                 fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#707070", opacity: "1"
//             }}>{title && title.slice(0, 20)}<br />가입 신청을 취소 하시겠습니까?</div>
//             <div onClick={() => this.handleShowPopup(-1)} style={{
//                 cursor: "pointer", marginTop: "31px", marginLeft: "210px", width: "130px", height: "29px",
//                 textAlign: "center", fontWeight: "500", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", letterSpacing: "0",
//                 color: "#FF0000", opacity: "1", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000"
//             }}>네, 취소합니다.</div>
//         </div>
//     );
// }
import React, { Component } from 'react'
import styled from 'styled-components';
import IconView from "source/IconView"
import iEdit from "source/edit.png"
import iINOUT from "source/inout.svg"
import thumbup from "source/baseline_thumb_up_black_48dp_2x.png"

import JoinGroupContainer from "containers/Groups/JoinGroupContainer";
import dots from "source/baseline_more_vert_black_48dp.png";
import noimg from "source/noimg.png";
import DateFormat from "modules/DateFormat";
import TextFormat from "modules/TextFormat";
import NumberFormat from "modules/NumberFormat";

import Cross from "components/Commons/Cross"

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

const Arrow = styled.div`
    width: 12px;
    height: 14px;
    bacgkground: #707070;
    opacity: 0.55;
    border-left: 14px solid #707070;
    border-bottom: 6px solid transparent;
    border-top: 6px solid transparent;
`;

class GroupInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { joinDialog: false, likeDialog: false, forkDialog: 0, manager: false };
        this.needLogin = this.needLogin.bind(this);
        this.like = this.like.bind(this);
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

    handleMoreViewDescription = (description) => {
        alert(description);
    }
    gotoGroupModify = () => {
        let href = window.location.href.substring(0, window.location.href.search("groupDetail"));
        window.location.href = href + 'modifygroup/' + this.props.GroupInfo.uid;
    }
    changeEditMode = () => {
        this.setState({ manager: !this.state.manager });
        this.props.handleSwitchMode();
    }
    render() {
        console.log(this.props.GroupInfo);
        const group_user_id = this.props.GroupInfo && this.props.GroupInfo.user_id;
        const user_id = this.props.userInfo && this.props.userInfo.uid;

        const LoadingGroupInfo = () => {
            return (
                <div style={{ opacity: ".5", marginLeft: "65px", display: "flex", width: "100%" }}>
                    <div>
                        <div style={{ marginTop: "15px", width: "197px", height: "29px", backgroundColor: "#707070", borderRadius: "15px" }} />
                        <div style={{ marginLeft: "14px", marginTop: "9px", width: "170px", height: "170px", backgroundColor: "#D6D6D6", borderRadius: "15px" }} />
                    </div>
                    <div style={{ marginLeft: "51px" }}>
                        <div style={{ marginTop: "15px", width: "95px", height: "25px", backgroundColor: "#FFA0A0", borderRadius: "15px" }} />
                        <div style={{ marginTop: "15px", width: "273px", height: "30px", backgroundColor: "#707070", borderRadius: "15px" }} />
                        <div style={{ marginTop: "11px", width: "621px", height: "90px", backgroundColor: "#A3A7A3", borderRadius: "15px" }} />
                        <div style={{ marginTop: "17px", width: "250px", height: "25px", backgroundColor: "#0FA0A0", borderRadius: "15px" }} />
                    </div>
                    <div style={{ marginLeft: "42px" }}>
                        <div style={{ marginTop: "15px", width: "95px", height: "25px", borderRadius: "15px" }} />
                        <div style={{ marginTop: "15px", width: "273px", height: "30px", borderRadius: "15px" }} />
                        <div style={{ marginTop: "11px", width: "621px", height: "90px", backgroundColor: "#A3A7A3", borderRadius: "15px" }} />
                        <div style={{ marginTop: "17px", width: "250px", height: "25px", borderRadius: "15px" }} />
                    </div>
                    <div style={{ marginLeft: "auto", marginRight: "72px", order: "2" }}>
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "15px", width: "95px", height: "29px", backgroundColor: "#FFD6D6", borderRadius: "15px" }} />
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "37px", width: "183px", height: "45px", backgroundColor: "#D6D6D6", borderRadius: "15px" }} />
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "43px", width: "147px", height: "55px", backgroundColor: "#D6D6D6", borderRadius: "15px" }} />
                    </div>
                </div>)
        }
        const JoinModal = () => {
            const title = this.props.GroupInfo && this.props.GroupInfo.title;

            return (
                this.state.showPopup == 1 &&
                <div style={{ zIndex: "950", position: "fixed", top: "255px", left: "618px", width: "576px", height: "200px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #000000", borderRadius: "5px", opacity: "1" }}>
                    <div onClick={() => this.handleShowPopup(-1)} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
                        <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} />
                    </div>
                    <div style={{
                        marginTop: "31.5px", marginLeft: "62.5px", width: "394px", height: "69px", textAlign: "center", fontWeight: "500",
                        fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#707070", opacity: "1"
                    }}>
                        {title && title.slice(0, 20)}<br />
                        가입 신청을 하시겠습니까?</div>
                    <div onClick={() => this.handleShowPopup(-1)} style={{
                        cursor: "pointer", marginTop: "31px", marginLeft: "210px", width: "130px", height: "29px",
                        textAlign: "center", fontWeight: "500", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", letterSpacing: "0",
                        color: "#FF0000", opacity: "1", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000"
                    }}>
                        네, 가입합니다.</div>
                </div>

            );
        }
        const JoinCancelModal = () => {
            const title = this.props.GroupInfo.title;
            return (
                this.state.showPopup === 2 &&
                <div style={{ zIndex: "950", position: "fixed", top: "255px", left: "618px", width: "576px", height: "200px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #000000", borderRadius: "5px", opacity: "1" }}>
                    <div onClick={() => this.handleShowPopup(-1)} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
                        <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} />
                    </div>
                    <div style={{
                        marginTop: "31.5px", marginLeft: "62.5px", width: "394px", height: "69px", textAlign: "center", fontWeight: "500",
                        fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#707070", opacity: "1"
                    }}>{title && title.slice(0, 20)}<br />가입 신청을 취소 하시겠습니까?</div>
                    <div onClick={() => this.handleShowPopup(-1)} style={{
                        cursor: "pointer", marginTop: "31px", marginLeft: "210px", width: "130px", height: "29px",
                        textAlign: "center", fontWeight: "500", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", letterSpacing: "0",
                        color: "#FF0000", opacity: "1", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000"
                    }}>네, 취소합니다.</div>
                </div>
            );
        }
        const GroupInfo = (props) => {
            let info = GroupInfoData;
            let parentName = null;
            if (props.GroupInfo !== 0) {
                info = props.GroupInfo;
                if (info.parentName != null) {
                    parentName = info.parentName && info.parentName.slice(0, 14);
                    parentName += info.parentName && info.parentName.length > 14 ? "..." : "";
                }
            }
            const { manager } = this.state;
            const isEditor = group_user_id === user_id;
            const { like } = this.props;

            return (
                <div style={{ paddingLeft: "65px", width: "100%", display: "flex" }}>
                    <div style={{ width: "max-content" }}>
                        {parentName &&
                            <div style={{ display: "flex", cursor: "default" }}>
                                {info.grand_parentTitle && <><img src={dots} title={info.grand_parentTitle} style={{ height: "15px", width: "15px", transform: "rotate(90deg)", marginTop: "22px", opacity: "0.55" }} /><Arrow style={{ marginLeft: "10px", marginTop: "22px" }} /></>}
                                {info.parentName && <><div style={{ marginLeft: "10px", marginTop: "17px", fontSize: "20px", fontWeight: "300", color: "#707070", width: "max-content" }}>{parentName}</div><Arrow style={{ marginLeft: "10px", marginTop: "22px" }} /></>}
                            </div>}
                    </div>

                    <div >
                        <div style={{ marginLeft: "10px" }}>
                            <div style={{ marginTop: "15px", width: "max-content", height: "29px", color: "#707070", fontSize: "20px", textAlign: "left", lineHeight: "25px", fontFamily: "Noto Sans KR", fontWeight: "500" }}><TextFormat txt={info.title} /></div>
                            <div style={{ display: "flex" }}>
                                <div style={{
                                    marginLeft: "14px", marginTop: "9px", width: "170px", height: "170px", borderRadius: "15px",
                                    backgroundColor: "#D6D6D6", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center",
                                    backgroundImage: info && info.img && info.img.l_img ? `url(${info.img.l_img})` : `url(${noimg})`
                                }} />
                                <div style={{ marginLeft: "50px" }}>
                                    <div style={{ marginTop: "5px", fontSize: "15px", width: "max-content", height: "30px", color: "#707070", lineHeight: "29px", fontSize: "17px", textAlign: "left", fontWeight: "500" }}>개설자 : {info.userName && info.userName.slice(0, 32)}</div>
                                    <div style={{ marginTop: "10px", height: "90px", display: "flex", fontSize: "17px", color: "#707070", lineHeight: "30px" }}>
                                        <div style={{ width: "621px" }}>
                                            {info.explanation ? info.explanation.slice(0, 200) : `${info.userName}님의 "${info.title}" 그룹입니다.`}
                                        </div>
                                        <div style={{ marginLeft: "41px", width: "max-content" }}>
                                            {info.explanation && info.explanation.slice(200, 400)}
                                            {info.explanation && info.explanation.length > 400 && <>...</>}
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: "#EFEFEF", width: "200px", marginTop: "19px", marginLeft: "17px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                                        <div id="count-view" style={{ display: "flex", marginRight: "22px", cursor: "default" }}>
                                            <div><IconView width="17.24px" height="11.41px" fill="#707070" /></div>
                                            <div style={{ marginLeft: "5.85px", fontSize: "15px", width: "max-content", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{NumberFormat(info.view || 0)}</div>
                                        </div>
                                        <div id="count-like" style={{ display: "flex", marginRight: "0px", cursor: "default" }}>
                                            <div><i style={{ color: "#707070", fontSize: "14px" }} className="material-icons">thumb_up</i></div>
                                            <div style={{ marginLeft: "6px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{NumberFormat(info.like || 0)}</div>
                                        </div>
                                        <div id="count-childs" style={{ display: "flex", cursor: "default" }}>
                                            <div><i style={{ color: "#707070", fontSize: "17px" }} className="material-icons">library_books</i></div>
                                            <div style={{ marginLeft: "5px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{NumberFormat(info.design || 0 + info.group || 0)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginLeft: "auto", marginRight: "72px" }}>
                        {isEditor ?
                            <>
                                <div style={{ display: "flex", marginTop: "25px", cursor: "pointer" }} onClick={this.gotoGroupModify}>
                                    <div style={{ marginLeft: "auto", width: "150px", height: "25px", fontWeight: "300", fontSize: "17px", fontFamily: "Noto Sans KR", textAlign: "right", lineHeight: "40px", color: "#707070" }}>그룹 정보 수정하기</div>
                                    <div style={{ height: "30px", width: "40px", opacity: "1", background: `transparent url(${iEdit})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
                                </div>
                                <div style={{ display: "flex", marginTop: "35px", cursor: "pointer" }} onClick={this.changeEditMode}>
                                    <div style={{ marginLeft: "auto", width: "98px", height: "25px", fontWeight: "300", fontSize: "17px", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: manager ? "#FF0000" : "#707070" }}>{manager ? "관리모드 종료" : "그룹 관리하기"}</div>
                                    <div style={{ height: "30px", width: "40px", opacity: manager ? "0.1" : ".6", background: `transparent url(${iINOUT})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
                                </div>
                            </>
                            :
                            <>
                                <div style={{
                                    marginLeft: "auto", marginRight: "0px", marginTop: "15px",
                                    width: "79px", height: "29px",
                                    fontSize: "20px", color: "#FF0000", cursor: "pointer"
                                }}>
                                    <JoinGroupContainer />
                                </div>
                                <div onClick={this.like} style={{ marginLeft: "auto", marginRight: "0px", marginTop: "37px", marginBottom: "43px", width: "183px", height: "45px", display: "flex", cursor: "pointer" }}>
                                    <div style={{ width: "133px", height: "25px", marginTop: "10px", fontWeight: "300", fontSize: "17px", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>관심 그룹 {like ? "취소하기" : "등록하기"}</div>
                                    <div style={{ height: "45px", width: "45px", marginLeft: "5px", opacity: like ? "1" : "0.45", background: `transparent url(${thumbup})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
                                </div>
                            </>
                        }
                        <div style={{ marginTop: "46px", marginLeft: "auto", marginRight: "0px", width: "max-content", height: "55px", textAlign: "right", lineHeight: "30px", fontWeight: "300", fontSize: "17px", fontFamily: "Noto Sans KR", color: "#707070", letterSpacing: "0" }}>
                            <div>최근 업데이트 {info && DateFormat(info.child_update_time)}</div>
                            <div>{info && DateFormat(info.create_time)} 등록</div>
                        </div>
                    </div>
                </div >
            )
        }
        const info = this.props.GroupInfo
        return (
            <React.Fragment>
                {
                    this.state.likeDialog &&
                    <div style={{
                        position: "absolute", top: "47px", left: "763px", width: "396px", height: "138px",
                        background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #000000", borderRadius: "5px", opacity: "1"
                    }}>
                        <div style={{
                            marginTop: "31.5px", marginLeft: "62.5px", width: "273px", height: "69px", fontFamily: "Noto Sans KR",
                            fontSize: "20px", lineHeight: "40px", textAlign: "center", fontWeight: "500", color: "#707070"
                        }}>관심 그룹으로 등록되었습니다.<br />마이페이지에서 확인 가능합니다.
                 </div>
                    </div>
                }
                {this.state.joinDialog == false ? <JoinModal /> : <JoinCancelModal />}
                <div style={{ width: "1920px", height: "237px", backgroundColor: "#EFEFEF", display: "flex" }}>
                    {info ? <GroupInfo GroupInfo={info} /> : <LoadingGroupInfo />}
                </div >
            </React.Fragment >)
    }
}

export default GroupInfoComponent
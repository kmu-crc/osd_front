import React, { Component } from 'react'
import IconView from "source/IconView"
import iEdit from "source/edit.png"
import thumbup from "source/baseline_thumb_up_black_48dp_2x.png"
import noimg from "source/noimg.png"
import DateFormat from "modules/DateFormat"
import iDelete from "source/deleteItem.png"

import { Modal } from "semantic-ui-react";


const GroupInfoData = { title: "TITLE", url: "URL", category: "CATEGORY", designer: "DESIGNER", view: 0, like: 0, design: 0, description: "Description" }
class GroupInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { isJoin: false, showPopup: false, joinDialog: false, joinCancelDialog: false };
        this.handleRequestJoinGroup = this.handleRequestJoinGroup.bind(this);
    }

    handleRequestJoinGroup() {
        if (this.state.showPopup == false) // 팝업띄우기
        {
            if (this.state.isJoin == false) // 가입 신청
            {
                this.setState({ showPopup: !this.state.showPopup, joinDialog: true, joinCancelDialog: false })
            }
            else // 가입 취소
            {
                this.setState({ showPopup: !this.state.showPopup, joinDialog: false, joinCancelDialog: true })
            }

        }
        else // 팝업 닫기
        {
            this.setState({ showPopup: !this.state.showPopup, joinDialog: false, joinCancelDialog: false })
        }
    }
    handleMoreViewDescription = (description) => {
        alert(description)
    }
    gotoGroupModify = () => {
        let href = window.location.href.substring(0, window.location.href.search("groupDetail"))
        window.location.href = href + 'modifygroup/' + this.props.GroupInfo.uid;
    }
    render() {
        console.log("GroupProps", this.props)
        const group_user_id = this.props.GroupInfo && this.props.GroupInfo.user_id;
        const user_id = this.props.userInfo && this.props.userInfo.uid;

        const GroupInfo = (props) => {
            const info = props.GroupInfo || GroupInfoData
            return (
                <div style={{ marginLeft: "65px", display: "flex", width: "100%" }}>
                    <div>
                        <div style={{ marginTop: "15px", width: "220px", height: "29px", color: "#707070", fontSize: "20px", textAlign: "left", lineHeight: "25px", fontFamily: "Noto Sans KR", fontWeight: "500" }}>{info.title && info.title.slice(0, 14)}{info.title && info.title.length > 14 ? "..." : ""}</div>
                        <div style={{
                            marginLeft: "14px", marginTop: "9px", width: "170px", height: "170px", borderRadius: "15px",
                            backgroundColor: "#D6D6D6", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center",
                            backgroundImage: info && info.img && info.img.l_img ? `url(${info.img.l_img})` : `url(${noimg})`
                        }} />
                    </div>
                    <div style={{ marginLeft: "51px" }}>
                        <div style={{ marginTop: "15px", width: "95px", height: "25px", color: "#FF0000", lineHeight: "25px", fontSize: "17px", textAlign: "left", fontWeight: "300" }}>{/*info.category*/}</div>
                        <div style={{ marginTop: "15px", width: "273px", height: "30px", color: "#707070", lineHeight: "29px", fontSize: "20px", textAlign: "left", fontWeight: "500" }}>개설자 : {info.userName && info.userName.slice(0, 16)}</div>
                        <div style={{ marginTop: "11px", height: "90px", display: "flex", fontSize: "17px", color: "#707070", lineHeight: "30px" }}>
                            <div style={{ width: "621px" }}>
                                {info.description ? info.description.slice(0, 200) : `${info.userName}님의 "${info.title}" 그룹입니다.`}
                            </div>
                            <div style={{ marginLeft: "41px", width: "621px" }}>
                                {info.description && info.description.slice(200, 400)}
                                {info.description && info.description.length > 400 && <>...</>
                                /* <div style={{ fontSize: "13px", cursor: "pointer", color: "#FF0000" }} onClick={() => this.handleMoreViewDescription(info.description)}>더보기</div> */}
                            </div>
                        </div>
                        <div style={{ marginTop: "17px", width: "250px", height: "25px" }}>
                            <div style={{ marginTop: "19px", marginLeft: "17px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                                <div style={{ display: "flex", marginRight: "22px" }}>
                                    <div><IconView width="17.24px" height="11.41px" fill="#707070" /></div>
                                    <div style={{ marginLeft: "5.85px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{info.view}</div>
                                </div>
                                <div style={{ display: "flex", marginRight: "0px" }}>
                                    <div><i style={{ color: "#707070", fontSize: "14px" }} className="material-icons">thumb_up</i></div>
                                    <div style={{ marginLeft: "6px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{info.like}</div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div><i style={{ color: "#707070", fontSize: "17px" }} className="material-icons">library_books</i></div>
                                    <div style={{ marginLeft: "5px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{info.design}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {group_user_id == user_id ? // 그룹 수정 권한 있음
                        <div style={{ position: "relative", width: "160px", height: "100%", marginLeft: "100px", order: "2", fontFamily: "Noto Sans KR" }}>
                            <div style={{ position: "absolute", width: "98px", height: "25px", top: "40px", fontWeight: "300", fontSize: "17px", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>그룹 수정하기</div>
                            <div onClick={this.gotoGroupModify} style={{ position: "absolute", height: "30px", width: "40px", top: "40px", left: "113px", opacity: ".55", background: `transparent url(${iEdit})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
                            <div style={{ position: "absolute", top: "169px", height: "55px", fontWeight: "300", fontSize: "17px", lineHeight: "30px", fontFamily: "Noto Sans KR", color: "#707070", letterSpacing: "0", textAlign: "right" }}>
                                최근 업데이트 {info && DateFormat(info.child_update_time)}<br />
                                {info && DateFormat(info.create_time)} 등록
                        </div>
                        </div>
                        :// 그룹 수정 권한 없음
                        <div style={{ marginLeft: "auto", marginRight: "72px", order: "2", fontFamily: "Noto Sans KR" }}>
                            <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "15px", width: "79px", height: "29px", fontSize: "20px", color: "#FF0000" }} onClick={this.handleRequestJoinGroup}>가입 신청</div>
                            <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "37px", width: "183px", height: "45px", display: "flex" }}>
                                <div style={{ width: "133px", height: "25px", marginTop: "10px", fontWeight: "300", fontSize: "17px", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>관심 그룹 등록하기</div>
                                <div style={{ height: "45px", width: "45px", marginLeft: "5px", opacity: ".55", background: `transparent url(${thumbup})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
                            </div>
                            <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "43px", width: "147px", height: "55px", fontWeight: "300", fontSize: "17px", lineHeight: "30px", fontFamily: "Noto Sans KR", color: "#707070", letterSpacing: "0", textAlign: "right" }}>
                                최근 업데이트 {info && DateFormat(info.child_update_time)}<br />
                                {info && DateFormat(info.create_time)} 등록
                        </div>
                        </div>
                    }
                </div>
            )
        }
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
            return (
                <Modal open={this.state.showPopup} style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
                    <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.props.GroupInfo.title}<br />가입 신청을 하시겠습니까?</div>
                    <div style={{ width: "100%", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", textDecoration: "underline", color: "#FF0000" }}>네, 신청합니다</div>
                    <div onClick={this.handleRequestJoinGroup} style={{
                        position: "absolute", right: "-50px", top: "0px", width: "22px", height: "22px",
                        backgroundImage: `url(${iDelete})`, backgroundSize: "cover", backgroundPosition: "center center",
                    }}>
                    </div>
                </Modal>
            );
        }
        const JoinCancelModal = () => {
            return (
                <Modal open={this.state.showPopup} style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
                    <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.props.GroupInfo.title}<br />가입 신청을 취소하시겠습니까?</div>
                    <div style={{ width: "100%", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", textDecoration: "underline", color: "#FF0000" }}>네, 취소합니다</div>
                    <div onClick={this.handleRequestJoinGroup} style={{
                        position: "absolute", right: "-50px", top: "0px", width: "22px", height: "22px",
                        backgroundImage: `url(${iDelete})`, backgroundSize: "cover", backgroundPosition: "center center",
                    }}>
                    </div>
                </Modal>

            );
        }
        const info = this.props.GroupInfo
        return (
            <React.Fragment>
                {this.state.isJoin == false ? <JoinModal /> : <JoinCancelModal />}
                <div style={{ width: "1920px", height: "237px", backgroundColor: "#EFEFEF", display: "flex" }}>
                    {info ? <GroupInfo GroupInfo={info} /> : <LoadingGroupInfo />}
                </div >
            </React.Fragment>)
    }
}

export default GroupInfoComponent

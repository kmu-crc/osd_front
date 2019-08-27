import React, { Component } from "react"
import styled from "styled-components"

import TextFormat from 'modules/formats/TextFormat'

const AlarmList = styled.div`
    display: ${props => props.display};
    z-index: 999;
    position: absolute;
    pointer-events: auto;
    top: 50.5px;
    left: ${props => props.left + "px"};
    z-index: 904;
    height: 550px;
    width: 365px;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    font-family: Noto Sans KR;
    
    .list::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    .list::-webkit-scrollbar-thumb {
    background: rgba(112, 112, 112, 0.45) !important;
    }
    
    
  .list {
      padding-left: 15px;
      padding-right: 36px;
      padding-bottom: 5px;
      height: 490px;
      overflow-y: hidden;
    &:hover{
        overflow-y: scroll;
    }

    
}`;
const ListItem = styled.div`
    display:flex;
    flex-direction:column;
    opacity: ${props => props.confirm ? 0.5 : 1};
    width: 340px;
    display: flex;
    height: 118px;
    border-bottom: 1px solid #B7B7B7;
    &:hover {
        background-color: #EFEFEF;
        opacity: 0.95;
    }
`
const userinfo = {
    alarmLeft: "1512px",
}
class Alarm extends Component {
    state = {
        profile: false,
        active: false,
        keyword: null,
        msg: null,
        top: 0, left: 0,
        alarmLeft: userinfo.alarmLeft,
    }
    myRef = React.createRef()
    openAlarmList = (e) => {
        document.addEventListener("mousedown", this.checkClickOutside)
        const top = e.clientY + 10
        const left = e.clientX - (e.clientX + 150 > window.screenLeft ? 250 : 175)
        this.setState({ active: true, top: top, left: left })
    }
    checkClickOutside = (e) => {
        if (this.myRef.current === null) return
        if (!this.myRef.current.contains(e.target)) {
            this.setState({ active: false, top: 0, left: 0 })
            document.removeEventListener("mousedown", this.checkClickOutside)
        }
    }
    // onAlarmHandler = e => {
    //     if (e.type === "blur" && !this.alarm.contains(e.relatedTarget)) {
    //         this.setState({ active: false });
    //     }
    // }
    // openAlarmHandler = e => {
    //     this.setState({ active: !this.state.active });
    // }

    alarmConfirm = (uid, alarmID) => {
        this.props.handleAlarmConfirm(uid, alarmID)
    }

    allAlarmConfirm = () => {
        alert('초대받은 디자인 및 그룹에 대한 알람을 제외한 모든 알람들을 읽음으로 표시합니다.')
        this.props.handleAllAlarmConfirm(this.props.uid)
    }

    getLink = item => {
        let link = ``;
        if (item.type === "MESSAGE") {
            link = `/message/${item.from_user_id}/${item.fromUser}`
        } else if (item.type === "DESIGN") {
            link = `/designDetail/${item.content_id}`
            if (item.kinds === "INVITE") {
                link = `/myPage/join/invited`
            }
        } else if (item.type === "GROUP") {
            link = `/groupDetail/${item.content_id}`
        }
        return link
    }

    getMessageText = item => {
        let msg = ""
        const from = item.from //? TextSlicer(item.from, 4) : "유저"
        const to = item.to //? TextSlicer(item.to, 4) : "유저"
        const title = item.title //? TextSlicer(item.title, 16) : item.type === "DESIGN" ? "디자인" : "그룹"
        if (item.type === "DESIGN") {
            if (item.kinds === "INVITE") {
                msg = `${from}님이 이 디자인에 초대하였습니다.`
            } else if (item.kinds === "REQUEST") {
                msg = `${from}님이 가입요청을 하였습니다.`
            } else if (item.kinds === "INVITE_TRUE") {
                msg = `${to}님이 ${from}님의 초대를 수락했습니다.`
            } else if (item.kinds === "REQUEST_TRUE") {
                msg = `${to}님이 이 디자인의 멤버가 되었습니다.`
            } else if (item.kinds === "GETOUT") {
                msg = `${title}에서 탈퇴되셨습니다.`
            } else if (item.kinds === "REFUSE") {
                msg = `${from}님이 가입요청을 거절하였습니다.`
            } else if (item.kinds === "INVITE_REJECT") {
                msg = `${from}님이 초대를 거절하였습니다.`
            } else if (item.kinds === "LIKE") {
                msg = `${from}님께서 디자인을 좋아합니다.`
            } else if (item.kinds === "COMMENT") {
                msg = `${from}님이 디자인에 댓글을 달았습니다.`
            } else if (item.kinds === "CARD_COMMENT") {
                msg = `${from}님이 디자인 카드에 댓글을 달았습니다.`
            } else if (item.kinds === "COMMENT_COMMENT") {
                msg = `${to}님의 디자인 댓글에 답변이 달렸습니다.`
            }
        } else if (item.type === "GROUP") {
            if (item.kinds === "JOIN") {
                msg = `${from}님이 이 그룹에서 활동하길 원합니다.`
            } else if (item.kinds === "JOIN_withDESIGN") {
                msg = `${from}님이 이 그룹에서 활동하길 원합니다.`
            } else if (item.kinds === "JOIN_withGROUP") {
                msg = `${from}님이 이 그룹에서 활동하길 원합니다.`
            } else if (item.kinds === "JOINSUCCESS") {
                msg = `${to}님이 그룹에 가입되었습니다.`
            } else if (item.kinds === "JOINREFUSE") {
                msg = `${to}님의 그룹가입요청이 거절되었습니다.`
            } else if (item.kinds === "GROUP_GETOUT") {
                msg = `${to}님께서 그룹에서 탈퇴되셨습니다.`
            } else if (item.kinds === "LIKE") {
                msg = `${from}님의 이 그룹을 좋아합니다.`
            }
        }
        return msg;
    }

    showButton = (item) => {
        const type = item.type, kinds = item.kinds, confirm = item.confirm
        if (confirm === 1) return false
        return (type === "DESIGN" && (kinds === "INVITE" || kinds === "REQUEST")) || (type === "GROUP" && (kinds === "JOIN_withDESIGN" || kinds === "JOIN_withGROUP" || kinds === "JOIN"))
    }

    accept = (e, item) => {
        e.stopPropagation()
        if (item.type === "DESIGN") {
            if (item.kinds === "REQUEST" || item.kinds === "INVITE") {
                if (window.confirm(item.kinds === "REQUEST" ? "가입을 승인하시겠습니까?" : "초대를 수락하시겠습니까?")) {
                    this.props.AcceptDesignRequest(item.content_id, item.kinds === "REQUEST" ? item.from_user_id : item.user_id, this.props.token)
                        .then(res => {
                            if (res.data && res.data.success) {
                                alert(item.kinds === "REQUEST" ? "승인되었습니다." : "초대를 수락되었습니다.");
                                this.alarmConfirm(item.uid)
                            } else {
                                alert("다시 시도해주세요.");
                            }
                        })
                        .catch((err) => alert(err + '와 같은 이유로 승인하는데 실패하였습니다. 관리자에게 문의하시기 바랍니다.'))
                }
            }
        }
        else if (item.type === "GROUP") {
            if (item.kinds === "JOIN_withDESIGN") {
                if (window.confirm("가입을 승인하시겠습니까?")) {
                    this.props.UpdateDesignInGroupRequest(item.content_id, item.sub_content_id)
                        .then(res => {
                            if (res.data && res.data.success) {
                                this.alarmConfirm(item.uid)
                                alert("승인되었습니다. 해당페이지로 이동합니다.")
                                this.props.history.push(this.getLink(item))
                            } else { alert("다시 시도해주세요.") }
                        }).catch((err) => alert(err + '와 같은 이유로 승인하는데 실패하였습니다. 관리자에게 문의하시기 바랍니다.'))
                }
            } else if (item.kinds === "JOIN_withGROUP") {
                if (window.confirm("가입을 승인하시겠습니까?")) {
                    this.props.UpdateGroupInGroupRequest(item.content_id, item.sub_content_id)
                        .then(res => {
                            if (res.data && res.data.success) {
                                alert("승인되었습니다.")
                                this.alarmConfirm(item.uid)
                            } else { alert("다시 시도해주세요.") }
                        }).catch((err) => alert(err + '와 같은 이유로 승인하는데 실패하였습니다. 관리자에게 문의하시기 바랍니다.'))
                }
            }
        }
    }

    reject = (e, item) => {
        e.stopPropagation()
        if (item.type === "DESIGN") {
            if (item.kinds === "REQUEST" || item.kinds === "INVITE") {
                if (window.confirm(item.kinds === "REQUEST" ? "가입요청을 거절하시겠습니까?" : "초대를 거절하시겠습니까?")) {
                    this.props.GetoutDesignRequest(item.content_id, item.kinds === "REQUEST" ? item.from_user_id : item.user_id, this.props.token,
                        item.kinds === "REQUEST" ? "DesignRefuse" : "DesignInviteReject")
                        .then(res => {
                            if (res.data && res.data.success) {
                                alert(item.kinds === "REQUEST" ? "요청을 거절하였습니다." : "초대를 거절하였습니다.");
                                this.alarmConfirm(item.uid)
                            } else {
                                alert("다시 시도해주세요.");
                            }
                        })
                        .catch((err) => alert(err + `와 같은 이유로 거절하는데 실패하였습니다. 관리자에게 문의하시기 바랍니다.`))
                }
            }
        } else if (item.type === "GROUP") {
            if (item.kinds === "JOIN_withDESIGN") {
                if (window.confirm("가입요청을 거절하시겠습니까?")) {
                    this.props.DeleteDesignInGroupRequest(item.content_id, item.sub_content_id)
                        .then(res => {
                            if (res.data && res.data.success) {
                                this.alarmConfirm(item.uid)
                                alert(`거절하셨습니다.`)
                            } else {
                                alert(`다시 시도해주세요.`)
                            }
                        })
                        .catch((err) => alert(err + `와 같은 이유로 거절하는 데 실패하였습니다. 관리자에게 문의하시기 바랍니다.`))
                }
            } else if (item.kinds === "JOIN_withGROUP") {
                if (window.confirm("가입요청을 거절하시겠습니까?")) {
                    this.props.DeleteGroupInGroupRequest(item.content_id, item.sub_content_id)
                        .then(res => {
                            if (res.data && res.data.success) {
                                this.alarmConfirm(item.uid)
                                alert(`거절하셨습니다.`)
                            } else {
                                alert(`다시 시도해주세요.`)
                            }
                        })
                        .catch((err) => alert(err + `와 같은 이유로 거절하는 데 실패하였습니다. 관리자에게 문의하시기 바랍니다.`))
                }
            }
        }
    }
    getLikeCount = (item, alarms) => {
        let count = 0, returnType = "";
        alarms.list.map(alarmItem => {
            if ((item.content_id === alarmItem.content_id) && (item.type === "DESIGN")) {
                count++;
                returnType = "DESIGN"
            }
            else if ((item.content_id === alarmItem.content_id) && (item.type === "GROUP")) {
                count++;
                returnType = "GROUP"
            }
        })
        return [returnType, count];
    };

    render() {
        const alarms = this.props.alarm;
        console.log(alarms);
        return (
            <>{this.state.active &&
                <AlarmList display={"block"} ref={this.myRef} top={this.state.top} left={userinfo.alarmLeft}>
                    <div style={{ zIndex: "999", display: "flex", lineHeight: "25px", marginBottom: "11.5px", fontSize: "17px", color: "#707070", fontWeight: "300" }}>
                        <div style={{ zIndex: "999", cursor: "pointer", width: "214px", borderRadius: "0 25px 0 0", backgroundColor: "#FFFFFF", marginTop: "13px", marginLeft: "183px" }}>
                            모두 읽음으로 표시하기
                        </div>
                    </div>
                    <div className="list">
                        {alarms.list.map(item => {
                            const alarmtype = this.showButton(item);
                            const alarmKind = item.kinds;
                            let designCount = 0, groupCount = 0, countObj, msg;

                            msg = this.getMessageText(item);
                            if (item.kinds === "LIKE") {
                                countObj = this.getLikeCount(item, alarms);
                                countObj[0] === "DESIGN" ? designCount = countObj[1] : groupCount = countObj[1];
                                console.log(countObj[1]);
                                if (designCount !== 0) {
                                    msg = designCount === 1 ? `${item.from}님께서 디자인을 좋아합니다.` : `${item.from}님 외에${designCount - 1}명이 디자인을 좋아합니다.`;
                                }
                                else {
                                    msg = groupCount === 1 ? `${item.from}님께서 그룹을 좋아합니다.` : `${item.from}님 외에${groupCount - 1}명이 디자인을 좋아합니다.`;
                                }
                            }

                            return (
                                <ListItem confirm={item.confirm} key={item.uid}>
                                    <div style={{ fontSize: "17px", fontWeight: "300", paddingTop: "16.5px", width: "325px", position: "relative" }}><TextFormat txt={msg} /></div>
                                    <div style={{ height: "19px", lineHeight: "16px", marginTop: "9px", position: "relative" }}>
                                        <div style={{ display: "flex", justifyContent: "space-start" }}>
                                            <div style={{ background: `url(${item.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center", width: "50px", height: "50px", borderRadius: "15%" }} />
                                            <div style={{ display: "flex" }}>
                                                {alarmtype ?
                                                    (<>
                                                        <div style={{ paddingLeft: "15px", paddingTop: "12.5px", opacity: "1", fontSize: "17px", fontWeight: '500', width: "190px" }}><TextFormat txt={item.title} /></div>
                                                        <div style={{ display: "flex", justifyContent: "space-start", position: "absolute", paddingLeft: "200px", paddingTop: "25px", fontSize: "17px", fontWeight: "500" }}>
                                                            <div style={{ cursor: "pointer", color: "#FF0000" }}>승인</div>
                                                            <div style={{ cursor: "pointer", marginLeft: "10px" }}>거절</div>
                                                        </div>
                                                    </>)
                                                    :
                                                    (alarmKind !== "COMMENT"
                                                        ? <div style={{ paddingLeft: "15px", paddingTop: "12.5px", fontSize: "17px", fontWeight: '500', width: "225px" }}><TextFormat txt={item.title} /></div>
                                                        : <div style={{ paddingLeft: "15px", paddingTop: "12.5px", fontSize: "17px", fontWeight: "300", width: "240px" }}><TextFormat txt={item.reply_preview} /></div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </ListItem>)
                        })}
                    </div>
                </AlarmList>}
                <div style={{ width: "100%", height: "100%", cursor: "pointer", display: "flex" }} onClick={this.openAlarmList} >
                    <div style={{ width: "48px", position: "absolute" }}>
                        {alarms && <div style={{ zIndex: "998", position: "absolute", left: "50%", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "red" }} />}
                        <i style={{ zIndex: "997", opacity: ".9", fontSize: "34px" }} className="material-icons" onClick={this.openList}>notifications</i>
                    </div>
                </div>
            </>
        )
    }
}
export default Alarm


import React, { Component } from "react"
import { connect } from "react-redux"
import { Icon } from "semantic-ui-react"
import styled from "styled-components"
import StyleGuide from "StyleGuide"
import DateFormat from "modules/DateFormat"
import NumberFormat from "modules/NumberFormat"
import TextSlicer from "modules/TextSlicer"
import { AcceptDesignRequest, GetoutDesignRequest } from "actions/Designs/JoinDesign"
import { GetWaitingGroupRequest, GetWaitingDesignRequest, UpdateDesignInGroupRequest, UpdateGroupInGroupRequest, DeleteGroupInGroupRequest, DeleteDesignInGroupRequest } from "actions/Group"

const Btn = styled.button`
  padding: 0.75em 1.5em;
  width: 50%;
  font-size: 11px;
  border-radius: 5px;
  color: white;
  margin-top: 1px;
  margin-right: 1px;
  background-color: ${StyleGuide.color.geyScale.scale5};
  border: 1px solid ${StyleGuide.color.geyScale.scale5};
  &:hover{
    background-color: ${StyleGuide.color.geyScale.scale7};
    border: 1px solid ${StyleGuide.color.geyScale.scale7};
  }
`

const AlarmLabel = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  background-color: red;
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  vertical-align: middle;
  padding-top: 2px;
  transform: scale(0.6);
  -ms-transform: scale(0.6);
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
`;

const AlarmDropDown = styled.ul`
  position: absolute;
  min-height: 50px;
  max-height: 300px;
  width: 320px;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 60px;
  left: 0;
  background-color: white;
  transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
`;

// padding: 10px 20px;
const AlarmItem = styled.li`
border-bottom: 1px solid #222;
text-align: left;
position: relative;
box-sizing: border-box;
padding: 2px 2px 1px 2px;
display: flex;
.time {
  position: absolute;
  top: 10px;
  right: 20px;
}
:hover{
  background-color:${StyleGuide.color.geyScale.scale1};
}
div { 
}
h4 {
  font-size: 9pt;
  text-align: center;
}
&:last-child {
  border-bottom: 0;
}
&.confirm {
  display: flex;
  flexDirection: row;
  justify-content: left;
  h5 {
    font-size: 10pt;
    color: ${StyleGuide.color.geyScale.scale6};
  }
  color: ${StyleGuide.color.geyScale.scale5};
}  
&.unconfirm {
  display: flex;
  flexDirection: row;
  justify-content: left;
}
`;

class Alarm extends Component {
  state = {
    active: false
  }

  onAlarmHandler = e => {
    if (e.type === "blur" && !this.alarm.contains(e.relatedTarget)) {
      this.setState({ active: false });
    }
  }

  openAlarmHandler = e => {
    this.setState({ active: !this.state.active });
  }

  alarmConfirm = id => {
    this.props.socket.emit("confirm", { uid: this.props.uid, alarmId: id });
  }

  allAlarmConfirm = () => {
    alert('초대받은 디자인 및 그룹에 대한 알람을 제외한 모든 알람들을 읽음으로 표시합니다.')
    this.props.socket.emit("allConfirm", { user_id: this.props.uid })
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
    const from = item.from ? TextSlicer(item.from, 4) : "유저"
    const to = item.to ? TextSlicer(item.to, 4) : "유저"
    const title = item.title ? TextSlicer(item.title, 16) : item.type === "DESIGN" ? "디자인" : "그룹"
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
        msg = `${from}님이 이 디자인을 좋아합니다.`
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
    return (type === "DESIGN" && (kinds === "INVITE" || kinds === "REQUEST")) || (type === "GROUP" && (kinds === "JOIN_withDESIGN" || kinds === "JOIN_withGROUP"))
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

  render() {
    // console.log(this.props, "props")
    return (
      <button type="button" style={{ height: "60px" }} onClick={this.openAlarmHandler} onBlur={this.onAlarmHandler} ref={ref => (this.alarm = ref)} >
        <Icon name="alarm" />
        {this.props.noti.count > 0 && (
          <AlarmLabel>{NumberFormat(this.props.noti.count)}</AlarmLabel>
        )}
        {this.state.active && (
          <AlarmDropDown>
            {this.props.noti.list == null || this.props.noti.list.length === 0 ? (
              <AlarmItem>
                <div style={{ width: "2%", backgroundColor: "blue" }}>&nbsp;</div>
                <div style={{ paddingLeft: "5px" }}><Icon name="calendar outline" /></div>
                <div><h4>알람이 없습니다.</h4></div>
              </AlarmItem>
            ) : (
                <div>
                  {this.props.noti.count > 1 &&
                    <AlarmItem style={{ display: "flex", flexDirection: "row", justifyContent: "left" }} onClick={this.allAlarmConfirm}>
                      <div style={{ width: "2%", backgroundColor: "red" }}>&nbsp;</div>
                      <div><Icon name="check square" /></div>
                      <div><h4>모두읽음처리</h4></div>
                    </AlarmItem>
                  }
                  {this.props.noti.list.map((item, index) => {
                    const alarmtype = this.showButton(item)
                    return (
                      <AlarmItem key={index} className={item.confirm ? "confirm" : "unconfirm"} onClick={() => alarmtype ? null : this.alarmConfirm(item.uid)}>
                        <div style={item.confirm ? { width: "1%", backgroundColor: "#EAA" } : { backgroundColor: "red" }}>&nbsp;</div>
                        <div style={{ paddingLeft: "3px" }} >
                          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "left" }}>
                            <div>
                              {item.kinds === "LIKE" ? <Icon name="heart" size="small" /> : <Icon name="bell outline" />}
                            </div>
                            <div>
                              <h5>{TextSlicer(item.title, 28)}</h5>
                            </div>
                          </div>
                          <div style={{ height: "45px", display: "flex" }}>
                            <div style={{
                              width: "45px", borderRadius: "15%", borderRight: "0.5px solid gray", borderBottom: "0.5px solid black",
                              backgroundPosition: "center", backgroundSize: "center", backgroundImage: `url(${item.thumbnail})`
                            }}>&nbsp;</div>
                            <div style={{ verticalAlign: "middle", paddingLeft: "3px" }}>
                              <div style={{ width: "100%", fontSize: "9pt" }}>{this.getMessageText(item)}</div>
                              <div style={{ display: "flex" }}>
                                <div style={{ fontSize: "9pt", color: "#960A0E" }}>{DateFormat(item.create_time)}</div>
                                {alarmtype &&
                                  <div style={{ position: "absolute", right: "0", display: "flex" }}>
                                    <Btn size="tiny" onClick={e => this.accept(e, item)}>승인</Btn>
                                    <Btn size="tiny" onClick={e => this.reject(e, item)}>거절</Btn>
                                  </div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </AlarmItem>
                    )
                  })}
                </div>
              )
            }
          </AlarmDropDown>
        )}
      </button>
    )
  }
}
const mapDisaptchToProps = (dispatch) => {
  return {
    AcceptDesignRequest: (design_id, member_id, token) => {
      return dispatch(AcceptDesignRequest(design_id, member_id, token))
    },
    UpdateDesignInGroupRequest: (id, design_id) => {
      return dispatch(UpdateDesignInGroupRequest(id, design_id))
    },
    UpdateGroupInGroupRequest: (id, group_id) => {
      return dispatch(UpdateGroupInGroupRequest(id, group_id))
    },
    GetWaitingDesignRequest: (id, sort) => {
      return dispatch(GetWaitingDesignRequest(id, sort))
    },
    GetWaitingGroupRequest: (id, sort) => {
      return dispatch(GetWaitingGroupRequest(id, sort))
    },
    GetoutDesignRequest: (id, member_id, token, refuse) => {
      return dispatch(GetoutDesignRequest(id, member_id, token, refuse))
    },
    DeleteDesignInGroupRequest: (id, design_id) => {
      return dispatch(DeleteDesignInGroupRequest(id, design_id))
    },
    DeleteGroupInGroupRequest: (id, group_id) => {
      return dispatch(DeleteGroupInGroupRequest(id, group_id))
    }
  }
}
export default connect(null, mapDisaptchToProps)(Alarm)

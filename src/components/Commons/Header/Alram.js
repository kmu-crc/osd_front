import React, { Component } from "react"
import { Grid, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import StyleGuide from "StyleGuide"
import DateFormat from "modules/DateFormat"
import NumberFormat from "modules/NumberFormat"
import TextFormat from "modules/TextFormat"
import TextSlicer from "modules/TextSlicer"


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
justify-content: space-between;
.time {
  position: absolute;
  top: 10px;
  right: 20px;
}
h4 {
  font-size: 9pt;
  text-align: center;
}
&:last-child {
  border-bottom: 0;
}
&.confirm {
  h5 {
    background-color: #F1F1F3;
    display: flex;
    justify-content: space-between;
    color: ${StyleGuide.color.geyScale.scale5};
  }
  color: ${StyleGuide.color.geyScale.scale4};
}  
&.unconfirm {
  h5 {
    background-color: #F1F1F3;
    display: flex;
    justify-content: space-between;
  }
}
`;

class Alram extends Component {
  state = {
    active: false
  }

  onAlarmHandler = e => {
    if (e.type === "blur" && !this.alram.contains(e.relatedTarget)) {
      this.setState({ active: false });
    }
  }

  openAlarmHandler = e => {
    this.setState({ active: !this.state.active });
  }

  alramConfirm = id => {
    this.props.socket.emit("confirm", { uid: this.props.uid, alramId: id });
  }

  allAlarmConfirm = () => {
    // console.log("ALL", this.props)
    alert('초대받은 디자인 및 그룹에 대한 알람을 제외한 모든 알람들을 읽음으로 표시합니다.')
    this.props.socket.emit("allConfirm", { user_id: this.props.uid })
    //console.log(this.props, "!!!")
    this.props.getNoti
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
        msg = `${to}님이 이 디자인의 멤버가 되었습니다.`
      } else if (item.kinds === "REQUEST_TRUE") {
        msg = `${to}님이 이 디자인의 멤버가 되었습니다.`
      } else if (item.kinds === "GETOUT") {
        msg = `${title}에서 탈퇴되셨습니다.`
      } else if (item.kinds === "REFUSE") {
        msg = `${from}님이 가입요청을 거절하였습니다.`
      } else if (item.kinds === "INVITE_REJECT") {
        msg = `${from}이 초대를 거절하였습니다.`
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
        msg = `${from}님이 그룹에 가입요청을 하셨습니다.`
      } else if (item.kinds === "JOINSUCCESS") {
        msg = `${to}님이 그룹에 가입되었습니다.`
      } else if (item.kinds === "JOINREFUSE") {
        msg = `${to}님의 그룹가입요청이 거절되었습니다.`
      } else if (item.kinds === "LIKE") {
        msg = `${from}님의 이 그룹을 좋아합니다.`
      }
    }

    return msg;
  }

  render() {
    return (
      <button type="button" style={{ height: "60px" }} onClick={this.openAlarmHandler} onBlur={this.onAlarmHandler} ref={ref => (this.alram = ref)} >
        <Icon name="alarm" />
        {this.props.noti.count > 0 && (
          <AlarmLabel>{NumberFormat(this.props.noti.count)}</AlarmLabel>
        )}
        {this.state.active && (
          <AlarmDropDown>
            {this.props.noti.list == null || this.props.noti.list.length === 0 ? (
              <AlarmItem>알람이 없습니다.</AlarmItem>
            ) : (
                <div>
                  {this.props.noti.count > 0 &&
                    <AlarmItem onClick={this.allAlarmConfirm}><Icon name="check square outline" /><h4 >모두읽음처리</h4></AlarmItem>
                  }
                  {this.props.noti.list.map((item, index) => {
                    return (
                      <AlarmItem key={index} className={item.confirm ? "confirm" : "unconfirm"} onClick={() => this.alramConfirm(item.uid)} >
                        <Link onClick={this.forceUpdate} style={{ lineHeight: "1" }} to={this.getLink(item)}>
                          <h5 style={{width:"100%"}}>
                            <TextFormat txt={item.title} chars={30} /><TextFormat txt={DateFormat(item.create_time)} />
                          </h5>
                          <TextFormat txt={this.getMessageText(item)} />
                        </Link>
                      </AlarmItem>)
                  })}
                  </div>
              )}
          </AlarmDropDown>
        )}
      </button>
    )
  }
}

export default Alram;

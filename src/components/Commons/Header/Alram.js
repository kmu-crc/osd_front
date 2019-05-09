import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import socketIOClient from "socket.io-client";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";

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
  top: 60px;
  left: 0;
  background-color: white;
  width: 300px;
  transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
`;

const AlarmItem = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid #181818;
  text-align: left;
  position: relative;
  box-sizing: border-box;
  line-height: 1;
  & > a {
    line-height: 1 !important;
  }
  .time {
    position: absolute;
    top: 10px;
    right: 20px;
    line-height: 1;
  }
  h4 {
    width: 80%;
    line-height: 1;
  }
  &:last-child {
    border-bottom: 0;
  }
  &.confirm {
    h4 {
      color: ${StyleGuide.color.geyScale.scale5};
    }
    color: ${StyleGuide.color.geyScale.scale4};
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
    this.props.socket.emit("allConfirm", {user_id: this.props.uid})
    console.log(this.props,"!!!")
    this.props.getNoti
  }

  getLink = item => {
    let link = ``;
    if ( item.type === "MESSAGE" ){
      link = `/message/${item.from_user_id}/${item.fromUser}`
    } else if ( item.type === "DESIGN" ) {
      link = `/designDetail/${item.content_id}`
      if(item.kinds === "INVITE") {
        link = `/myPage/join/invited`
      } 
    } else if ( item.type === "GROUP" ) {
      link = `/groupDetail/${item.content_id}`
    }
    return link
  }

  getMessageText = item => {
    let msg = ""
    if(item.type === "MESSAGE"){
      msg = "새 메시지가 도착했습니다."
    } else if (item.type === "DESIGN") {
      if(item.kinds === "INVITE") {
        msg = "디자인 초대가 왔습니다."
      } else if (item.kinds === "REQUEST"){
        msg = "디자인 가입요청이 있습니다."
      } else if (item.kinds === "INVITE_TRUE"){
        msg = `${item.fromUser}님이 멤버가 되었습니다.`
      } else if (item.kinds === "REQUEST_TRUE"){
        msg = `${item.title}의 멤버가 되었습니다.`
      } else if (item.kinds === "GETOUT"){
        msg = `${item.title}디자인에서 탈퇴되셨습니다.`
      } else if (item.kinds === "REFUSE"){
        msg = `멤버요청을 거절하였습니다.`
      } else if (item.kinds === "INVITE_REJECT"){
        msg = `초대를 거절하였습니다.`
      } else if (item.kinds === "LIKE") {
        msg = `좋아요가 눌렸습니다.`
      } else if (item.kinds === "COMMENT") {
        msg = `디자인에 댓글이 달렸습니다.`
      } else if (item.kinds === "CARD_COMMENT") {
        msg = `디자인 카드에 댓글이 달렸습니다.`
      } else if (item.kinds === "COMMENT_COMMENT"){
        msg = `댓글에 답변이 달렸습니다.`
      }
    } else if (item.type === "GROUP") {
      if(item.kinds === "JOIN"){
        msg = `그룹에 새 가입요청이 있습니다.`
      } else if(item.kinds === "JOINSUCCESS"){
        msg = `그룹에 가입이 승인되었습니다.`
      } else if(item.kinds === "JOINREFUSE"){
        msg = `그룹활동이 거절되었습니다.`
      } else if (item.kinds === "LIKE") {
        msg = `좋아요가 눌렸습니다.`
      }
    }
    return msg;
  }

  render() {
    return (
      <button
        type="button"
        style={{ height: "60px" }}
        onClick={this.openAlarmHandler}
        onBlur={this.onAlarmHandler}
        ref={ref => (this.alram = ref)}
      >
        <Icon name="alarm" />
        {this.props.noti.count > 0 && (
          <AlarmLabel>{NumberFormat(this.props.noti.count)}</AlarmLabel>
        )}
        {this.state.active && (
          <AlarmDropDown>
            { this.props.noti.list == null || this.props.noti.list.length === 0? (
              <AlarmItem>알람이 없습니다.</AlarmItem>
            ) : (
              <div>
                {this.props.noti.count>0&&<AlarmItem onClick={this.allAlarmConfirm}><h4>모두읽음표시</h4></AlarmItem>}
              {this.props.noti.list.map((item, index) => {
                  return (
                  <AlarmItem key={index} className={item.confirm ? "confirm" : null} onClick={() => this.alramConfirm(item.uid)} >
                    <Link onClick = {this.forceUpdate} to={this.getLink(item)}>
                      <h4><TextFormat txt={item.title}/></h4>
                      <TextFormat txt={this.getMessageText(item)}/>
                      <span className="time">{DateFormat(item.create_time)}</span>
                    </Link>
                  </AlarmItem>)
              })}</div>
            )}
          </AlarmDropDown>
        )}
      </button>
    )
  }
}

export default Alram;

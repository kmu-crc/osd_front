import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import socketIOClient from "socket.io-client";
import DateFormat from "modules/DateFormat";

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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  };

  onAlarmHandler = e => {
    if (e.type === "blur" && !this.alram.contains(e.relatedTarget)) {
      this.setState({ active: false });
    }
  };

  openAlarmHandler = e => {
    this.setState({ active: !this.state.active });
  };

  alramConfirm = id => {
    this.props.socket.emit("confirm", { uid: this.props.uid, alramId: id });
  };

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
          <AlarmLabel>{this.props.noti.count}</AlarmLabel>
        )}
        {this.state.active && (
          <AlarmDropDown>
            {this.props.noti.list.length === 0 && this.props.noti.list == null ? (
              <AlarmItem>알람이 없습니다.</AlarmItem>
            ) : (
              this.props.noti.list.map((item, index) => {
                return (
                  <AlarmItem
                    key={index}
                    className={item.confirm ? "confirm" : null}
                    onClick={() => this.alramConfirm(item.uid)}
                  >
                    <Link
                      to={
                        item.type === "MESSAGE"
                          ? "/message"
                          : item.type === "DESIGN"
                            ? item.kinds === "INVITE"
                              ? `/myPage/join/invited`
                              : `/designDetail/${item.content_id}`
                            : null
                      }
                    >
                      <h4>{item.title}</h4>
                      { item.type === "MESSAGE"
                        ? "새 메시지가 도착했습니다."
                        : item.type === "DESIGN"
                          ? item.kinds === "INVITE"
                            ? `디자인 초대가 왔습니다.`
                            : item.kinds === "REQUEST"
                              ? `디자인 가입요청이 있습니다.`
                              : item.kinds === "INVITE_TRUE"
                                ? `${item.fromUser}님이 맴버가 되었습니다.`
                                : item.kinds === "REQUEST_TRUE"
                                ? `${item.title}의 맴버가 되었습니다.`
                                : item.kinds === "REFUSE"
                                ? `맴버요청을 거절하셨습니다.`
                                : ``
                          : null}
                      <span className="time">
                        {DateFormat(item.create_time)}
                      </span>
                    </Link>
                  </AlarmItem>
                );
              })
            )}
          </AlarmDropDown>
        )}
      </button>
    );
  }
}

export default Alram;

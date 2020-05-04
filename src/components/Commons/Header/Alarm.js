import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import TextSlicer from "modules/TextSlicer"

// const Btn = styled.button`
//   padding: 0.75em 1.5em;
//   width: 50%;
//   font-size: 11px;
//   border-radius: 5px;
//   color: white;
//   margin-top: 1px;
//   margin-right: 1px;
//   background-color: ${StyleGuide.color.geyScale.scale5};
//   border: 1px solid ${StyleGuide.color.geyScale.scale5};
//   &:hover{
//     background-color: ${StyleGuide.color.geyScale.scale7};
//     border: 1px solid ${StyleGuide.color.geyScale.scale7};
//   }
// `;
const AlarmDropDown = styled.ul`
  position: absolute;
  min-height: max-content;
  max-height: 300px;
  border-radius:5px;
  width: 320px;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 90px;
  right: 60px;
  background-color: white;
  padding:10px;
  // transform: translateX(-50%);
  // -ms-transform: translateX(-50%);
  box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
  border:1px solid #EFEFEF;
  z-index: 999;
`;
const AlarmItem = styled.li`
  border-bottom: 1px solid #222;
  text-align: left;
  position: relative;
  box-sizing: border-box;
  // padding: 2px 2px 1px 2px;
  padding:10px;
  display: flex;
  .time {
    position: absolute;
    top: 10px;
    right: 20px;
  }
  :hover{
    background-color:${StyleGuide.color.geyScale.scale1};
  }
  div {}
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
const RedCircle = styled.div`
  position: absolute;
  font-size: 8px;
  margin-left: 20px;
  line-height: 12px;
  text-align: center;
  color: #FFF;
  width: 15px;
  height: 15px;
  background: #F00;
  border-radius: 50%;
`;

export default class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.onAlarmHandler = this.onAlarmHandler.bind(this);
    this.openAlarmHandler = this.openAlarmHandler.bind(this);
    this.alarmConfirm = this.alarmConfirm.bind(this);
    this.allAlarmConfirm = this.allAlarmConfirm.bind(this);
    this.getLink = this.getLink.bind(this);
    this.getMessageText = this.getMessageText.bind(this);
    this.showButton = this.showButton.bind(this);
    this.parseAlarms = this.parseAlarms.bind(this);
  };
  onAlarmHandler = e => {
    if (e.type === "blur" && !this.alarm.contains(e.relatedTarget)) {
      this.setState({ active: false });
    }
  };
  openAlarmHandler = e => {
    this.setState({ active: !this.state.active });
  };
  alarmConfirm = id => {
    this.props.socket.emit("confirm", { uid: this.props.userInfo.uid, alarmId: id });
    window.location.reload();
  };
  allAlarmConfirm = () => {
    alert('모든 알림들을 읽음으로 표시합니다.');
    this.props.socket.emit("allConfirm", { user_id: this.props.userInfo.uid });
    window.location.reload();
  };
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
  };
  getMessageText = item => {
    let msg = ""
    console.log(item);
    const from = item.detail && item.detail.fromName && item.detail.fromName.nick_name ? TextSlicer(item.detail.fromName.nick_name, 5) : "유저";
    const name = item.detail && item.detail.itemName && item.detail.itemName.title ? TextSlicer(item.detail.itemName.title, 6) : "이름없음";
    // const to = item.detail && item.detail.toName && item.detail.toName.nick_name ? TextSlicer(item.detail.toName.nick_name, 5) : "유저"
    switch (item.type) {
      case "ITEM_PURCHASED_TO_EXPERT": msg = `${from}님이 아이템을 구매하였습니다.`; break;
      case "ITEM_PURCHASED_TO_USER": msg = `아이템'${name}'을 구매하였습니다`; break;
      default:
        msg = `정의되지 않은 알림입니다.`;
    }
    return msg;
  };
  showButton = (item) => {
    const type = item.type, kinds = item.kinds, confirm = item.confirm
    if (confirm === 1) return false
    return (type === "DESIGN" && (kinds === "INVITE" || kinds === "REQUEST")) || (type === "GROUP" && (kinds === "JOIN_withDESIGN" || kinds === "JOIN_withGROUP"))
  };
  parseAlarms = (items) => {
    items.map(item => {
      item.detail = item.content && JSON.parse(item.content);
      return item;
    });
    return items;
  };
  componentDidUpdate(prevProps) {
    if (this.props.alarms !== prevProps.alarms) {
      return true;
    }
  }
  render() {
    // console.log(this.props, "props");
    const { alarms } = this.props;
    const unread = (alarms && alarms.length > 0 && alarms.filter(item => item.confirm === 0).length) || 0;
    const converted = this.parseAlarms(alarms);
    // console.log(converted);
    return (
      <button type="button" style={{ background: "none", border: "none", outline:"none"}} onClick={this.openAlarmHandler} onBlur={this.onAlarmHandler} ref={ref => (this.alarm = ref)} >
        {/* {this.props.children} */}
        <Icon className="grey alarm" size="large" />
        {unread > 0 ?
          <RedCircle>
            <div style={{ width: "4", height: "12px" }}>{NumberFormat(unread)}</div>
          </RedCircle> : null}
        {this.state.active && (
          <AlarmDropDown>
            {alarms == null || alarms.length === 0 ? (
              <AlarmItem>
                {/* <div style={{ width: "2%", backgroundColor: "blue" }}>&nbsp;</div> */}
                <div style={{ paddingLeft: "5px" }}><Icon name="calendar outline" /></div>
                <div><h4>알림이 없습니다.</h4></div>
              </AlarmItem>
            ) : (
                <div>
                  {unread > 0 &&
                    <AlarmItem style={{ display: "flex", flexDirection: "row", justifyContent: "left" }} onClick={this.allAlarmConfirm}>
                      <div style={{ width: "2%", backgroundColor: "red" }}>&nbsp;</div>
                      <div><Icon name="check square" /></div>
                      <div><h4>모두읽음처리</h4></div>
                    </AlarmItem>
                  }
                  {converted && converted.length > 0 && converted.map((item, index) => {
                    const alarmtype = this.showButton(item)
                    return (
                      <AlarmItem key={index} className={item.confirm ? "confirm" : "unconfirm"} onClick={() => alarmtype ? null : this.alarmConfirm(item.uid)}>
                        <div style={item.confirm ? { width: "1%", backgroundColor: "#EAA" } : { backgroundColor: "red" }}>&nbsp;</div>
                        <div style={{ paddingLeft: "3px" }} >
                          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "left" }}>
                            {/* <div> */}
                            {/* {item.kinds === "LIKE" ? <Icon name="heart" size="small" /> : <Icon name="bell outline" />} */}
                            {/* </div> */}
                            <div>
                              {/* <h5>{TextSlicer(item.title, 28)}</h5> */}
                            </div>
                          </div>
                          <div style={{ height: "45px", display: "flex" }}>
                            {/* <div style={{ */}
                            {/* width: "45px", borderRadius: "15%", borderRight: "0.5px solid gray", borderBottom: "0.5px solid black", */}
                            {/* backgroundPosition: "center", backgroundSize: "center", backgroundImage: `url(${item.thumbnail})` */}
                            {/* }}>&nbsp;</div> */}
                            <div style={{ verticalAlign: "middle", paddingLeft: "3px" }}>
                              <div style={{ width: "100%", fontSize: "9pt" }}>{this.getMessageText(item)}</div>
                              <div style={{ display: "flex" }}>
                                <div style={{ fontSize: "9pt", color: "#960A0E" }}>{DateFormat(item.create_time)}</div>
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

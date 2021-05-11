import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import TextSlicer from "modules/TextSlicer"
import noimg from "source/noimg.png";
import { alert } from "components/Commons/Alert/Alert";
import market_style from "market_style";

const CustomIcon =styled.div`
border:1px solid #efefef;
min-width:${props => props.width}px;
max-width:${props => props.width}px;
min-height:${props => props.height}px;
max-height:${props => props.height}px;
background-image:url(${props=>props.imgURL});
background-repeat: no-repeat;
background-size: cover;
padding:${props => props.padding}px;
margin-right:${props=>props.marginRight==null?"13":props.marginRight}px;
margin-left:${props=>props.marginLeft==null?"13":props.marginLeft}px;
display:${props=>props.isNon===true?"none":"block"}
`
const AlarmDropDown = styled.ul`
  position: absolute;
  min-height: max-content;
  max-height: 350px;
  border-radius:5px;
  width: 320px;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 50px;
  right: 255px;
  background-color: white;
  padding:10px;
  // transform: translateX(-50%);
  // -ms-transform: translateX(-50%);
  box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
  border:1px solid #EFEFEF;
  z-index: 999;

`;
const AllAlarmRead=styled.li`
    border-bottom: 1px solid #efefef;
    text-align: left;
    position: relative;
    padding:12px 5px 12px 5px;
    display: flex;
    height:max-content;
    .allread{
      width:100%;
      display:flex;
      justify-content:flex-end;
      .text{
        font-size: ${market_style.font.size.mini2};
      }
    }
`
const AlarmItem = styled.li`
  border-bottom: 1px solid #efefef;
  text-align: left;
  position: relative;
  padding:12px 5px 12px 5px;
  display: flex;
  height:100px;
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
    font-size: ${market_style.font.size.tiny1};
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
      font-size: ${market_style.font.size.tiny2};
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
  // line-height: 12px;
  // text-align: center;
  min-width:15px;
  min-height:15px;
  max-width:15px;
  max-height:15px;
  color: #FFF;
  font-size: 6px;
  background: #F00;
  border-radius: 50%;
  padding:3px 3px;
  displat:flex;
  justify-content:center;
  align-items:center;
  margin-left:20px;
  position:absolute;
  .text__{
    
  }
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
  alarmConfirm = (id,url) => {
    this.props.socket.emit("confirm", { uid: this.props.userInfo.uid, alarmId: id });
    console.log(url);
    if(url == null){
      window.location.reload();
    }else{
      window.location.href=url;
    }
  };
  allAlarmConfirm = async() => {
    await alert('모든 알림들을 읽음으로 표시합니다.');
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
    console.log(item.detail);
    const from = item.detail && item.detail.fromName && item.detail.fromName.nick_name ? TextSlicer(item.detail.fromName.nick_name, 5) : "유저";
    const name = item.detail && item.detail.itemName && item.detail.itemName.title ? TextSlicer(item.detail.itemName.title, 6) : "이름없음";
    // const to = item.detail && item.detail.toName && item.detail.toName.nick_name ? TextSlicer(item.detail.toName.nick_name, 5) : "유저"
    switch (item.type) {
      case "ITEM_PURCHASED_TO_EXPERT": msg = `${from}님이 아이템을 구매하였습니다.`; break;
      case "ITEM_PURCHASED_TO_USER": msg = `아이템'${name}'을 구매하였습니다`; break;
      case "ITEM_REQUEST_TO_DESIGNER": msg = `${from}님이 디자인을 의뢰하였습니다`; break;
      case "ITEM_REQUEST_TO_MAKER": msg = `${from}님이 제작을 의뢰하였습니다`; break;
      case "ITEM_RESPONSE_TO_DESIGNER": msg = `${from}님이 디자인 의뢰에 응답하였습니다`; break;
      case "ITEM_RESPONSE_TO_MAKER": msg = `${from}님이 제작 의뢰에 응답하였습니다`; break;
      case "ITEM_QUESTION_TO_OWNER": msg = `${from}님이 '${name}'을 문의하였습니다`; break;
      case "ITEM_REVIEW_TO_OWNER": msg = `${from}님이 '${name}'에 리뷰를 작성하였습니다`; break;
      case "ITEM_LIKE_TO_DESIGNER": msg = `${from}님이 디자이너님을 좋아합니다`; break;
      case "ITEM_LIKE_TO_MAKER": msg = `${from}님이 메이커님을 좋아합니다`; break;
      case "ITEM_LIKE_TO_OWNER": msg = `${from}님이 ${name}을 좋아합니다`; break;
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
        {unread > 0 ?
          <RedCircle>
            <div className="text__">{NumberFormat(unread)}</div>
          </RedCircle> : null}
        <Icon className="grey alarm" size="large" />

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
                    <AllAlarmRead style={{ display: "flex", flexDirection: "row", justifyContent: "left" }} onClick={this.allAlarmConfirm}>
                      {/* <div style={{ width: "2%", backgroundColor: "red" }}>&nbsp;</div>
                      <div><Icon name="check square" /></div> */}
                      <div className="allread"><div className="text">모두읽음처리</div></div>
                    </AllAlarmRead>
                  }
                  {converted && converted.length > 0 && converted.map((item, index) => {
                    const alarmtype = this.showButton(item)
                    const alarmItem = JSON.parse(item.content);
                    let imgURL = noimg;
                    let locationURL = null;
                    switch(item.type){
                      case "ITEM_PURCHASED_TO_EXPERT":
                      case "ITEM_PURCHASED_TO_USER":
                      case "ITEM_QUESTION_TO_OWNER": 
                        locationURL = "/productDetail/"+item.detail.itemId;
                        break;
                      case "ITEM_RESPONSE_TO_DESIGNER":
                      case "ITEM_REQUEST_TO_DESIGNER": 
                        locationURL = "/designerDetail/"+item.to;
                        break;
                      case "ITEM_RESPONSE_TO_MAKER": 
                      case "ITEM_REQUEST_TO_MAKER": 
                        locationURL = "/makerDetail/"+item.to;
                        break;
                      default:
                        locationURL = null;
                        break;
                    }
                    switch (item.type) {
                      case "ITEM_PURCHASED_TO_EXPERT": 
                      case "ITEM_QUESTION_TO_OWNER": 
                      case "ITEM_PURCHASED_TO_USER":
                      case "ITEM_LIKE_TO_OWNER": 
                        imgURL=alarmItem==null?noimg:alarmItem.itemThumbnail==null?noimg:alarmItem.itemThumbnail.m_img; 
                        break;
                      case "ITEM_RESPONSE_TO_DESIGNER":
                      case "ITEM_RESPONSE_TO_MAKER": 
                        imgURL=alarmItem==null?noimg:alarmItem.toThumbnail==null?noimg:alarmItem.toThumbnail.m_img; 
                        break;
                      case "ITEM_REQUEST_TO_DESIGNER": 
                      case "ITEM_REQUEST_TO_MAKER": 
                      case "ITEM_REVIEW_TO_OWNER": 
                      case "ITEM_LIKE_TO_DESIGNER": 
                      case "ITEM_LIKE_TO_MAKER":
                        imgURL=alarmItem==null?noimg:alarmItem.fromThumbnail==null?noimg:alarmItem.fromThumbnail.m_img; 
                        break;
                      default:
                        imgURL = noimg;
                    }
                    return (
                      <AlarmItem key={index} className={item.confirm ? "confirm" : "unconfirm"} onClick={() => alarmtype ? null : this.alarmConfirm(item.uid,locationURL)}>
                        <div style={item.confirm ? { width: "1%", height:"12px", backgroundColor: "#EAA" } : { width: "1%", height:"12px", backgroundColor: "red" }}>&nbsp;</div>
                        <div style={{ paddingLeft: "3px" }} >
                          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "left" }}>
                            <div>
                            </div>
                          </div>
                          <div style={{height: "100%", display: "flex" }}>
                            <div style={{ verticalAlign: "middle", paddingLeft: "3px", display:"flex", flexDirection:"column",alignItems:"space-between",justifyContent:"space-between" }}>
                              <div style={{ width: "100%", fontSize: market_style.font.size.tiny1 }}>{this.getMessageText(item)}</div>
                              <div style={{display: "flex" }}>
                                <div style={{ fontSize: market_style.font.size.tiny1, color: "#960A0E" }}>{DateFormat(item.create_time)}</div>
                              </div>
                            </div>
                            {/* { item.type=="ITEN_REQUEST_TO_DESIGNER"||
                            item.type=="ITEN_REQUEST_TO_MAKER"?
                            <React.Fragment>
                              <ResponseMsg width={72} height={72}>
                                <div onClick={()=>{window.location.href=item.type==ITEN_REQUEST_TO_DESIGNER?"":"";}} style={{fontSize:"13px",color:"red"}}>의뢰 응답</div>
                              </ResponseMsg>
                            </React.Fragment>
                            : */}
                              <CustomIcon imgURL={imgURL} width={72} height={72}/>
                            {/* } */}
                            
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

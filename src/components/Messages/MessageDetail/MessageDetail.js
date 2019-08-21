import React, { Component } from "react";
import styled from "styled-components";
import thumbnail from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import TextFormat from "modules/TextFormat";

const MsgSectionBoard=styled.div`
position:relative;
width: 1259px;
height: 602.5px;
flex-direction:column;
justify-content:flex-end;
overflow:hidden;
&:hover {
overflow-y: scroll;

}`

const MsgReceivedBox ={position:"relative",width:"100%",marginBottom:"32px",float:"bottom"}
const MsgReceivedBubble ={display:"inline-block",width:"571px",padding:"13px 25px 13px 20px",
                         borderRadius:"20px",backgroundColor:"#FFFFFF"}
const MsgReceivedBubbleText = {width:"526px",
                        fontSize:"17px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",textAlign:"left",lineHeight:"25px"}
const MsgReceivedTimeText={position:"absolute",width:"150px",height:"25px",left:"593px",bottom:"0px",
                            fontSize:"17px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"100",textAlign:"left"}

const MsgSentBox ={position:"relative",width:"100%",marginBottom:"32px",textAlign:"right"}
const MsgSentBubble ={display:"inline-block",width:"571px",padding:"16px 25px 10px 20px",
                         borderRadius:"20px",backgroundColor:"#FFFFFF"}
const MsgSentBubbleText = {width:"526px",
                        fontSize:"17px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"500",textAlign:"left",lineHeight:"25px"}
const MsgSentTimeText={position:"absolute",width:"80px",height:"25px",display:"inline-block",right:"593px",bottom:"0px",
                            fontSize:"17px",fontFamily:"Noto Sans KR",color:"#707070",fontWeight:"100",textAlign:"right"}
     
function CheckedTime(date){
  let updateT = new Date(date);
  let today = new Date();
   //today = today.getTime() + 32400000;
   const diff = today - updateT;

  const m = 30;
  const diffMin = parseInt((diff / 1000) / 3600 * 60, 10); // N분 전
  const diffHour = parseInt((diff / 1000) / 3600, 10); // N시간 전
  const diffDay = parseInt(diffHour / 24, 10); // N일 전
  const diffMon = parseInt(diffDay/m, 10);

  let updateMin = updateT.getMinutes();
  let updateHour = updateT.getHours();

  const ampm = updateHour<12?"오전":"오후";
  updateHour = updateHour%12;
  const updateMinT = updateMin<10?"0"+updateMin.toString():updateMin.toString();
  const updateHourT = updateHour<10?"0"+updateHour.toString():updateHour.toString();

  const dateTime = ampm+updateHourT+":"+updateMinT;

  console.log(updateT+","+today);

  if (diffHour < 1) {
    return `${dateTime}`;
  } else if (1 <= diffHour && diffDay < 1) { // 하루 전까지
    return `${diffHour}시간 전`;
  } else if (1 <= diffDay && diffDay < m) { // 한달 전까지
    return `${diffDay}일 전`;
  } else if (11 >= diffMon &&m <= diffDay) { // 한달 이후부터
    return `${diffMon}달 전`;
  } else if(12 <= diffMon){
    let year = diffMon/12.0;
    if(year - year.toFixed(0) === 0)
      return `${year}년 전`;
    else
      return `${year.toFixed(1)}년 전`;
  } 
}
                            
function MsgReceiveBox(props)
{
    return(
        <div style={MsgReceivedBox}>
            <div style={MsgReceivedBubble}>
                <div style={MsgReceivedBubbleText}>
                {props.msgText}
                </div>                
            </div>
                <div style={MsgReceivedTimeText}>{props.updateTime}</div>
        </div>
    );
}
function MsgSendBox(props)
{
    return(
    <div style={MsgSentBox}>        
        <div style={MsgSentTimeText}>
        {props.updateTime}
        </div>
        <div style={MsgSentBubble}>
            <div style={MsgSentBubbleText}>{props.msgText}</div>                
        </div>
    </div>

    );
}


function LoadMessage(props)
{
  console.log("LoadMessage****************");
  console.log(props);
  if(props.isMyMsg==true)
  {
    return(<MsgSendBox msgText={props.msgText} updateTime={props.updateTime}/>);
  }
  else
  {
    return(<MsgReceiveBox msgText={props.msgText} updateTime={props.updateTime}/>);
  }
}
class MessageDetail extends Component {
 
  constructor(props)
  {
    super(props);
    this.handleLog = this.handleLog.bind(this);
    this.state={render:true}
  }
  componentDidMount() {
     this.props.GetMyMsgDetailRequest(this.props.token, this.props.id);
  }

  componentWillUnmount() {
    this.props.GetMyMessageDetailClear();
  }
  handleLog()
  {
    console.log(this.props);
    //this.props.GetMyMsgDetailRequest(this.props.token, this.props.id);
  }

  render() {
    const list = this.props.MessageDetail;
    const myId = this.props.userInfo.uid;

    const arrMsg = list.map(item=>{
      let isMyMsg=true;
      if(item.from_user_id!=myId)isMyMsg = false;
      return(
          <React.Fragment key={item.uid}>
          <LoadMessage isMyMsg={isMyMsg} msgText={item.message} updateTime={CheckedTime(item.create_time)}/>
          </React.Fragment>
      );
    })

    return (
      <MsgSectionBoard onClick = {this.handleLog}>
        {arrMsg}
      </MsgSectionBoard>
    );
  }
}

export default MessageDetail;

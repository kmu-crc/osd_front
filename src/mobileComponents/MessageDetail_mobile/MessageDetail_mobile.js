import React, { Component } from "react";
import styled from "styled-components";
import thumbnail from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import TextFormat from "modules/TextFormat";
import Socket from "modules/socket";
// import host from "config";
import market_style from "market_style";

// css styling
const MsgContent = styled.div`
  display:flex;
  flex-direction:column;
  *{
    font-family:Noto Sans KR;
  }
  & .ui.comments .comment {
    width:100% !important;
    position: relative;
    overflow:hidden;
    word-wrap:break;
    padding:0px;
  }
  & .ui.comments .comment.my {
    text-align: right;
  }
  & .ui.comments .comment .avatar {
    position: absolute;
    left: 0;
    width: 38px;
    height: 38px;
  }

  & .ui.comments .comment.my .avatar{
    left: inherit;
    right: 0;
  }

  & .ui.comments .comment.my>.avatar~.content {
    margin-left: inherit;
    margin-right: 3.5rem;
  }

  & .ui.comments .comment .content .text{
    max-width:500px;
    word-wrap:break;
    background-color: #E9E9E9;
    padding: 4px 20px;
    box-sizing: border-box;
    border-radius: 20px;
    display: inline-block;
  }

  & .ui.comments .comment.my .content .text{
    background-color: #707070;
    color: #FFF;
    text-align: left;
  }

  & .ui.comments .comment .content .author{
    display: block;
  }

  & .ui.comments .comment .content.my .author{
    text-align: right;
  }

  & .ui.comments .comment .content .wrapper.my{
    display: flex;
    flex-direction:column;
    align-items: flex-end;
  }
  & .ui.comments .comment .content .wrapper{
    display: flex;
    flex-direction:column;
    align-items: flex-start;
  }
  & .ui.comments .comment .content .wrapper .metadata1{
    width:max-content;
    margin-bottom: 3px;
    color: #444;
    font-size:${market_style.font.size.mini2};
    margin-left:10px;
  }
  & .ui.comments .comment .content .wrapper .metadata2{
    width:max-content;
    margin-bottom: 3px;
    color: #444;
    font-size:${market_style.font.size.mini2};
    margin-right:10px;
  }
`;


class MessageDetail_mobile extends Component {
  state = {
    list_v1: [],
    myId_v1: null,
    test: [],
  }
  componentDidMount() {
    // var divdiv = document.getElementById("comments");
    this.props.GetMyMsgDetailRequest(this.props.token, this.props.id);
    try {
      // Socket.emit("INIT", this.props.userInfo.uid)
      Socket.on("getNewMsg", (msgList, groupId) => {
        if (groupId === this.props.targetUid) {
          this.setState({ list_v1: msgList }) // get
        }
        else {
          this.setState({ list_v1: [] });
        }
        // let obj = document.getElementById("ui comments");
        // obj.setAttribute("scrollTop", obj.scrollHeight); 
        // console.log(obj.scrollTop);
      });
    } catch (err) {
      console.log(err);
    }
  }
  componentWillUnmount() {
    this.props.GetMyMessageDetailClear();
  }
  scrollToBottom = () => { this.dummy.scrollIntoView({ behavior: "auto" }); }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const list = this.state.list_v1.length > 0 ? this.state.list_v1 : this.props.MessageDetail;

    console.log("list======", list);
    // console.log("v1 : " + this.state.list_v1.length);
    // console.log("listlist : " + this.props.MessageDetail.length);
    const myId = this.props.userInfo.uid;
    return (
      <MsgContent>
        <div className={"ui comments"} id="comments" ref={ref => this.list = ref}>
          <div style={{ bottom: "0px" }}>
            {list && list.map(item =>{
              
               const createtime = new Date(item.create_time);
               const week = ["일", "월", "화", "수", "목", "금", "토"];
               const msgTime = createtime.getFullYear() + "."
               + (createtime.getMonth() + 1) + "."
               + createtime.getDate()
               + "(" + week[createtime.getDay()] + ")"
               + (createtime.getHours() <= 12 && createtime.getHours() >= 6 ? "오전" : "오후")
               + (createtime.getHours() <= 9 ? '0' + createtime.getHours() : createtime.getHours())
               + ":" + (createtime.getMinutes() <= 9 ? '0' + createtime.getMinutes() : createtime.getMinutes())
              return(
                <div className={item.from_user_id === myId ? "comment my" : "comment"} key={item.uid}>
                  <div className={item.from_user_id === myId ? "content my" : "content"}>
                    <div className={item.from_user_id === myId ? "wrapper my" : "wrapper"} >
                      < div className="text">{item.message.split("\n").map((line, i) => { return (<span key={i} dangerouslySetInnerHTML={{ __html: `${line}` }}/>) })}</div>
                      {item.from_user_id === myId && <div className="metadata2">{msgTime}</div>}
                      {item.from_user_id !== myId && <div className="metadata1"><div>{msgTime}</div></div>}
                    </div>
                  </div>
                </div>
              )
            }
            )}
          </div>
          <div ref={el => this.dummy = el}></div>
        </div>
      </MsgContent>
    );
  }
}

export default MessageDetail_mobile;

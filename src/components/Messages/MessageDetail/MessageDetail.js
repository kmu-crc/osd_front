import React, { Component } from "react";
import styled from "styled-components";
import thumbnail from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import TextFormat from "modules/TextFormat";
import Socket from "modules/socket";
import host from "config";

// css styling
const MsgContent = styled.div`
  & .ui.comments .comment {
    position: relative;
    padding: 0.3rem 0;
    overflow:auto;
  }
  & .ui.comments .comment.my {
    padding: 0.3rem 0;
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
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 3px;
    display: inline-block;
  }

  & .ui.comments .comment.my .content .text{
    background-color: #444;
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
    justify-content: flex-end;
  }
  & .ui.comments .comment .content .wrapper{
    display: flex;
    justify-content: flex-start;
  }
  & .ui.comments .comment .content .wrapper .metadata{
    margin-bottom: 0;
    align-self: flex-end;
    color: #444;
    font-size: 9pt;
  }
`;


class MessageDetail extends Component {
  state = {
    list_v1 : [],
    myId_v1 : null,
    test : [],
  }
  componentDidMount() {
    var divdiv = document.getElementById("comments");
    this.props.GetMyMsgDetailRequest(this.props.token, this.props.id);
    try{
      Socket.emit("INIT", this.props.userInfo.uid)
      Socket.on("getNewMsg", (msgList, groupId)=> {
        if(groupId == this.props.targetUid){
          this.setState({list_v1 : msgList}) // get
        }
        else{
          this.setState({list_v1:[]});
        }
        // let obj = document.getElementById("ui comments");
        // obj.setAttribute("scrollTop", obj.scrollHeight); 
        // console.log(obj.scrollTop);
      });
    } catch(err){
      console.log(err);
    }
  }

  componentWillUnmount() {
    this.props.GetMyMessageDetailClear();
  }
  shouldComponentUpdate(nextProps) {
    var divdiv = document.getElementById("comments");
    divdiv.scrollIntoView(false);
    return true;
  }


  render() {
    const list = this.state.list_v1.length > 0 ?  this.state.list_v1 : this.props.MessageDetail;
    const myId = this.props.userInfo.uid;
    return (
      <MsgContent>

        <div className="ui comments" id="comments" ref={ref => this.list = ref}>
          <div style={{bottom:"0px"}}>
            {list.map(item => (
              <div className={item.from_user_id === myId ? "comment my" : "comment"} key={item.uid}>
                {item.from_user_id !== myId && <div className="avatar"> <img src={item.s_img ? item.s_img : thumbnail} alt="profile" /></div>}
                <div className={item.from_user_id === myId ? "content my" : "content"}>
                  {item.from_user_id !== myId && <a className="author"><TextFormat txt={item.nick_name} chars={12} /></a>}
                  <div className={item.from_user_id === myId ? "wrapper my" : "wrapper"} >
                    {item.from_user_id === myId && <div className="metadata">{DateFormat(item.create_time)}</div>}
                    < div className="text">{item.message.split("\n").map((line, i) => { return (<span key={i}> {line} <br /></span>) })}</div>
                    {item.from_user_id !== myId && <div className="metadata"><div>{DateFormat(item.create_time)}</div></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MsgContent>
    );
  }
}

export default MessageDetail;

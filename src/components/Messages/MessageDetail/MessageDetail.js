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
  & .ui.comments .comment {
    width:100% !important;

    position: relative;
    padding: 0.3rem 0;
    overflow:hidden;
    word-wrap:break;
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
    max-width:500px;
    word-wrap:break;
    background-color: #E6E6E6;
    padding: 10px;
    padding-left:20px;
    padding-right:20px;
    box-sizing: border-box;
    border-radius: 20px;
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
    width:max-content;
    margin-bottom: 10px;
    margin-right:10px;
    margin-left:10px;
    align-self: flex-end;
    color: #444;
    font-size:${market_style.font.size.tiny1};
    
  }
`;


class MessageDetail extends Component {
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
    console.log("v1 : " + this.state.list_v1.length);
    // console.log("listlist : " + this.props.MessageDetail.length);
    const myId = this.props.userInfo.uid;
    return (
      <MsgContent>
        <div className={"ui comments"} id="comments" ref={ref => this.list = ref}>
          <div style={{ bottom: "0px" }}>
            {list && list.map(item => (
              <div className={item.from_user_id === myId ? "comment my right" : "comment left"} key={item.uid}>
                {item.from_user_id !== myId && <div className="avatar"> <img style={{width:"45px",height:"45px",borderRadius:"25px"}} src={item.s_img ? item.s_img : thumbnail} alt="profile" /></div>}
                <div className={item.from_user_id === myId ? "content my" : "content"}>
                  {/* {item.from_user_id !== myId && <a className="author"><TextFormat txt={item.nick_name} chars={12} /></a>} */}
                  {item.from_user_id !== myId && <TextFormat cursor={true} txt={item.nick_name} chars={12} />}
                  <div className={item.from_user_id === myId ? "wrapper my" : "wrapper"} >
                    {item.from_user_id === myId && <div className="metadata">{DateFormat(item.create_time)}</div>}
                    {/* < div className="text">{item.message.split("\n").map((line, i) => { return (<span key={i}> {line} <br /></span>) })}</div> */}
                    < div className="text">{item.message.split("\n")&&item.message.split("\n").map((line, i) => { return (<span key={i} dangerouslySetInnerHTML={{ __html: `${line}` }}/>) })}</div>

                    {item.from_user_id !== myId && <div className="metadata"><div>{DateFormat(item.create_time)}</div></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div ref={el => this.dummy = el}></div>
        </div>
      </MsgContent>
    );
  }
}

export default MessageDetail;

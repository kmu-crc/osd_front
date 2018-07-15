import React, { Component } from "react";
import styled from "styled-components";

// css styling
const  MsgContent = styled.div`
  // & .comment.my {
  //   float: right;
  // }
`;

class MessageDetail extends Component {
  componentDidMount(){
    this.props.GetMyMsgDetailRequest(this.props.token, this.props.id);
  }

  componentWillUnmount() {
    this.props.GetMyMessageDetailClear();
  }

  render(){
    const list = this.props.MessageDetail;
    const myId = this.props.userInfo.uid;

    return(
      <MsgContent>
        <div className="ui comments">
          {list.map(item => (
            <div className={item.from_user_id === myId ? "comment my" : "comment"} key={item.uid}>
              <div className="avatar">
                <img src={item.s_img? item.s_img : null} alt="profile" />
              </div>
              <div className="content">
                <a className="author">{item.nick_name}</a>
                <div className="metadata">
                  <div>{item.create_time.split("T")[0]}</div>
                </div>
                <div className="text">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      </MsgContent>
    );
  }
}

export default MessageDetail;

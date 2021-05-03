import React, { Component } from 'react';
import DateFormat from "modules/DateFormat";
import Socket from "modules/socket";
import { FormInput } from "components/Commons/FormItem";
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";

import { Container, Wrapper, Peers, Chatting, SendMessageTextarea, Face } from "./style"

//현 문제 : 특정 채팅방에 접속한 뒤 다른 채팅방에 접속한 직 후에 알람의 제어가 꼬인다. 
let test = 1; //보낼 사람이 변경됐을 때 알람의 수를 제어하기 위한 변수. 같은 채팅방에서 메세지를 보내면 test가 증가되고 채팅방을 변경하면 test가 1로 초기화 된다. 
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailClicked: false,
      msgId: -1,
      selectId: null,
      selectName: null,
      openMember: false,
      friendList: [],
      render: true,
      connectedCheck: false,//채팅을 받는 당사자가 접속돼있는지, 아닌지 판별하는 변수
      textmsg: "",
      searchform: "",
    }
    this.handleChange = this.handleChange.bind(this);
  }


  async componentDidMount() {
    Socket.on("connectedCheck", (sendingUserId) => {
      ++test;
      console.log(test);
      if (this.state.selectId === sendingUserId) {
        this.setState({ connectedCheck: true });
      } else {
        this.setState({ connectedCheck: false });
      }
      this.props.CheckConnectedResponse(
        this.props.token,
        {
          "checkData": this.state.connectedCheck,
          "count": test,
        }, sendingUserId);
    })
    await this.props.GetMyMsgListRequest(this.props.token)
      .then(async (res) => {
        if (res.MsgList && res.MsgList.length > 0) {
          let arr = [];
          arr = res.MsgList.map(list => { return (list.friend_id) })
          await this.setState({
            friendList: arr
          });
        }
      });
    if (this.props.id && this.props.name) {
      let id = parseInt(this.props.id, 10);
      this.selectMember({
        email: null,
        nick_name: this.props.name,
        uid: id
      })
      Socket.on("init", () => {
        console.log("giveit")
        this.setState({ render: true })
      })
    }
  }

  getValue = (value) => {
    this.setState({
      openMember: true
    });
    if (!value) {
      this.setState({
        openMember: false
      });
      return;
    }
    this.setState({ searchform: value });
    this.props.SearchMemberRequest(null, { key: value }, this.props.token);
  }

  selectMember = async (data) => {
    await this.setState({
      render: false
    });
    const index = this.state.friendList.indexOf(data.uid);
    if (index === -1) {
      await this.setState({
        selectId: data.uid,
        selectName: data.nick_name,
        openMember: false,
        img: data.s_img,
        msgId: -1,
        render: true,
      });
    } else {
      await this.setState({
        selectId: data.uid,
        selectName: data.nick_name,
        img: data.s_img,
        openMember: false,
        msgId: this.props.MessageList[index].uid,
        render: true,
      });
    }
    document.getElementById("sendMsgBox").focus();
  }

  setMsgId = async (group_id, user_id, user_name, img) => {
    test = 1; //보낼 사람이 바뀔 때 test를 1로 초기화 
    await this.setState({
      msgId: group_id,
      selectId: user_id,
      selectName: user_name,
      img: img,
      openMember: false,
      render: false
    });
    this.setState({
      render: true
    });
    setTimeout(async () => {
      await this.props.GetMyMsgListRequest(this.props.token)
      this.setState({ render: true });
      // this.scrollToBottom();
    }, 250)
  }

  comfirmMsgAlarm = (from) => {
    // Socket.emit("confirmMsgAlarm", { uid: this.props.userInfo, fromID: from })
  }
  sendText = async (event) => {
    event.preventDefault();
    const innerHtmlValue = document.getElementById("sendMsgBox").innerHTML;
    if (this.state.selectId == null || innerHtmlValue == null || innerHtmlValue.trim().length === 0) return;
    this.props.SendMessageRequest(this.props.token, { message: innerHtmlValue }, this.state.selectId)
      .then(async res => {
        if (res.data && res.data.success === true) {
          await this.props.GetMyMsgListRequest(this.props.token);
          await this.setState({ textmsg: "", msgId: res.data.groupId, render: false });
        }
        this.setState({ render: true });
        this.props.history.replace("/message");
      })
  }
  handleChange = (event) => {
    this.setState({ textmsg: event.target.value });
  }
  render() {
    const { isDetailClicked } = this.state;
    const { MessageList, /*userInfo*/ } = this.props;

    return (
      <Container>
        <Wrapper>
          <Peers>
            {/* <div className="self"> <Face img={userInfo && userInfo.thumbnail && userInfo.thumbnail.m_img} /> <div style={{ marginLeft: "15px" }}> <div>{userInfo.nickName}</div> <div>{userInfo.email}</div> </div> <div style={{ marginLeft: "auto" }}><i className="edit icon" /></div> </div> */}

            <div className="searchBox">
              <div className="searchRow">
                <div className="heading"><div>대화상대 검색</div></div>
                <FormInput style={{ borderRadius: "20px", outline: "none", border: "none", width: "380px", height: "29px", paddingLeft: "10px" }}
                  type="text" name="search" placeholder="찾고자 하는 회원의 닉네임을 입력해 주세요." validates={["MinLength2"]} getValue={this.getValue} value={this.state.searchform} />
              </div>
              <div style={this.state.openMember ? { display: "block" } : { display: "none" }}>
                {this.props.members && this.props.members.map((item, index) => {
                  return (<div className="memberBox" key={`member${index}`} onClick={() => this.selectMember(item)}>{item.email}</div>);
                })}
              </div >
            </div>

            {MessageList.length > 0 ? (
              <div className="list">
                {MessageList
                  .sort((a, b) => new Date(b.update_time).getTime() - new Date(a.update_time).getTime())
                  // .filter(peer => !this.state.selectId ? peer : this.state.selectId === peer.to_user_id || this.state.selectId === peer.from_user_id)
                  .map(peer =>
                    <div className={`person ${this.state.selectId !== this.props.userInfo.uid && (this.state.selectId === peer.to_user_id || this.state.selectId === peer.from_user_id) ? "active" : ""}`} key={peer.uid} onClick={() => this.setMsgId(peer.uid, peer.friend_id, peer.friend_name, peer.s_img)}>
                      <Face img={peer.s_img} />
                      <div className="middle">
                        <div className="name">{peer.friend_name}</div>
                        <div className="last-message" dangerouslySetInnerHTML={{ __html: peer.message }}></div>
                      </div>
                      <div className="date">
                        <div className="sent-date">{DateFormat(peer.update_time)}</div>
                        <div className="checker">{peer.noti > 0 ? `(${peer.noti})` : ``}</div>
                      </div>
                    </div>)}
              </div>
            ) : (<div>대화상대목록이 없습니다.</div>)}
          </Peers>

          <Chatting className={isDetailClicked ? "expand" : ""}>
            {/* <div className="folding">
              <div className="arrow"></div>
            </div> */}
            {this.state.selectId ? (
              <React.Fragment>
                <div className="status">
                  <Face img={this.state.img} />
                  <div className="nick">{this.state.selectName}</div>
                  <div className={`circle `}></div>
                  {/* ${!this.state.connectedCheck ? "active" : ""} */}
                </div>
                <div className="chat-list">
                  {this.state.render &&
                    <MessageDetailContainer id={this.state.msgId} targetUid={this.state.selectId} />}
                </div>
                <div className="chat-input">
                  {this.state.render && <React.Fragment>
                    <div className="border"></div>
                    <div className="input-wrapper line">
                      {/* <div className="input-style"><input style={{ border: "none", outline: "none" }} name="textmsg" value={this.state.textmsg} onChange={this.handleChange} /></div> */}
                      <SendMessageTextarea contentEditable="true" id="sendMsgBox">
                      </SendMessageTextarea>
                      <div className="button-style">
                        <button type="button" style={{ outline: "none", border: "none" }} onClick={this.sendText}><div style={{ color: "white" }}>전송</div></button></div>
                    </div>
                  </React.Fragment>}
                </div>
              </React.Fragment>
            ) : <div>화면 왼쪽에 있는 대화상대 목록에서 대화상대를 선택해주세요.<br />
            (You have to choose person to talk in peer list left.)</div>}
          </Chatting>

          {/* <ProfileDetail className={isDetailClicked ? "expand" : ""}/> */}
        </Wrapper>
      </Container >
    )
  }
}

export default MessageList;

import React from 'react';
import styled from "styled-components";
import host from "config";
import { alert } from "components/Commons/Alert/Alert";
import io from "socket.io-client";
import who from "source/thumbnail.png";
// import exiticon from "source/exiticon.svg";
import downicon from "source/saveicon.svg";
import isEqual from 'lodash/isEqual';

const DateBox = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  margin-top:10px;
  margin-bottom:10px;
  .date{
    width:max-content;
    height:20px;
    font-size:13px;
    color:#707070;
  }
`;
const MyMessage = styled.div`
  *{
    color:#707070;
  }
  max-width:100%;
  width: max-content;
  margin-left: auto;
  position:relative;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  margin-bottom:10px   
  .userName {
    margin-left: auto;
    width: max-content;
    font-size: 11px;
    font-weight: 500;
  }
  .chat-logs {
    padding:15px; 
    height:370px;
    overflow-y: scroll;
  }
  .messageWrapper {
    display:flex;
    margin-right:24px;
    .message {
      margin-left:8px;
      font-size:13px;
      overflow: hidden;
      width: max-content;
      max-width:206px;
      height:max-content;
      word-wrap: break-word;
      padding: 6px 14px;
      border-radius: 20px;
      background-color: #707070;
      color: white;
      text-align: left;
      white-space: pre-wrap;
    }
    .wrapper{
      width:min-content;
      min-height:100%;
      display:flex;
      margin-left:7px;
      flex-direction:column;
      justify-content:flex-end;
      align-items:flex-end;
    }
    .count {
      height:13px;
      font-size:9px;
      color:red;
    }
    .time{
      width:max-content;
      height:13px;
      font-size:9px;
      margin-bottom:3px;
    }
  }
`;
const Me = (data) => {
  let updateT = new Date(data.create_time);
  let updateMin = updateT.getMinutes();
  let updateHour = updateT.getHours();
  const ampm = updateHour < 12 ? "오전 " : "오후 ";
  updateHour = updateHour % 12;
  const updateMinT = updateMin < 10 ? "0" + updateMin.toString() : updateMin.toString();
  const updateHourT = updateHour < 10 ? "0" + updateHour.toString() : updateHour.toString();

  const dateTime = ampm + updateHourT + ":" + updateMinT;
  return (
    <MyMessage >
      <div className="messageWrapper">
        <div className="wrapper">
          <div className="count">{data.count > 0 ? data.count : ""}</div>
          <div className="time">{dateTime}</div>
        </div>
        <div className="message" >
          {data.message}</div>
      </div>
    </MyMessage>);
};
const YouMessage = styled.div`
  *{
    color:#707070;
  }
  max-width:100%;
  position:relative;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  padding-left:24px;

  .userName {
    min-width:max-content;
    font-size:11px;
    font-weight:500;
  }
  .messageWrapper {
    display: flex;
    margin-bottom:8px;
    .thumbnail {
      background-image: url(${props => props.thumbnail});
      min-width: 32px;
      min-height: 32px;
      max-width: 32px;
      max-height: 32px;
      background-size: cover;
      background-position: center center;
      border-radius: 50%;
    }
    .message {
      margin-left:8px;
      font-size:13px;
      overflow: hidden;
      width: max-content;
      max-width:206px;
      height:max-content;
      word-wrap: break-word;
      padding: 6px 14px;
      border-radius: 20px;
      background-color: white;
      color: #707070;
      text-align: left;
      white-space: pre-wrap;
    }
    .messageOverlay {
      margin-left:40px;
      font-size:13px;
      overflow: hidden;
      width: max-content;
      max-width:206px;
      height:max-content;
      word-wrap: break-word;
      padding: 6px 14px;
      border-radius: 20px;
      background-color: white;
      color: #707070;
      text-align: left;
      white-space: pre-wrap;
    }
    .wrapper{
      width:min-content;
      min-height:100%;
      display:flex;
      margin-left:7px;
      flex-direction:column;
      justify-content:flex-end;
    }
    .count {
      height:13px;
      font-size:9px;
      color:red;
    }
    .time{
      width:max-content;
      height:13px;
      font-size:9px;
      margin-bottom:2px;
    }
  }
  
`;
// new styled
const Shape = styled.div`
  background-image:url(${props => props.imgURL});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  width:${props => props.width == null ? "100%" : `${props.width}px`};
  height:${props => props.height == null ? "100%" : `${props.height}px`};
  opacity:1;
`;
const Chatting = styled.div`
  background-color: #EFEFEF;
  width: 100%;
  height: 100%;

  .displayflex { display: flex;};
  .Hcentering { justify-content: center;};
  .Vcentering { align-items: center};
  .Vend { align-items: flex-end;};
  .fontRed { color: red;};
  .fontGray { color: #707070;};
  .opacityHalf { opacity: 0.7;};
  .margintiny { margin: 10px;};

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 61px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
  }
  .content {
    position: fixed;
    top: 61px;
    bottom: 80px;
    left: 0;
    right: 0;
    background-color: ivory;
  }

  .headerBox{
    width: 100%;
    height: 100%;
    background-color: #EFEFEF;
    box-shadow: 0px 0px 5px 0px #ABABAB;
    position: relative;
  }
  .exitButton{
    height: 100%;
    width: min-content;
    position: absolute;
    padding-left: 10px;
    left: 0;
    top: 0;
  }
  .downloadButton{
    height: 100%;
    width: min-content;
    position: absolute;
    padding-right: 15px;
    padding-bottom: 15px;
    right: 0;
    top: 0;
  }

  .scroll {
    height: 100%;
    background-color: #EFEFEF;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .chatBody{
    position: relative;  
    height: auto;
    border: 1px solid black;  
    overflow: hidden;
  }
  .chatBody:after {
    content: "";
    background-color: #EFEFEF;
    // background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=');
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    position: absolute;
    z-index: -1;   
  }
  .chatInput {
    border-top: 1px solid #707070;
    background-color: #EFEFEF;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .chatSubmit {
    background-color: red;
    box-shadow: none;
    border: none;
    border-radius: 10px;
    color: white;
    // margin-top: 6px;
    margin-left: 12px;
    width: 64px;
    height: 50px; 
    font-size: 13px;
    &.disabled {
      background-color: gray;
    }
  }
  .chat-submit {  
    position: absolute;
    bottom: 3px;
    right: 10px;
    background: #CD202D;
    box-shadow: none;
    border: none;
    border-radius: 50%;
    color: white;
    margin-top: 6px;
    margin-left: 12px;
    width: 35px;
    height: 35px;  
  }
  .chat-logs {
    // padding:15px; 
    // min-height:460px;
    border: 1px solid blue;
    height: 100%;
    overflow-y: visible;
  }
  .chat-logs::-webkit-scrollbar-track {
	  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	  background-color: #F5F5F5;
  }
  .chat-logs::-webkit-scrollbar {
	  width: 5px;  
	  background-color: #F5F5F5;
  }
  .chat-logs::-webkit-scrollbar-thumb {
	  background-color: #5A5EB9;
  }
  @media only screen and (max-width: 500px) {
    .chat-logs {
          height:40vh;
      }
  }
  .newchat {
    padding: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #EFEFEF;
    border: 1px solid #707070;
    border-radius: 15px;
    color: #707070;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    z-index: 99;
  }
`;
const Ghostspace = styled.div`
  height: ${props => props.height}px;
`;
const ChatArea = styled.textarea`
    width: 100%;
    height: 58px;
    border-radius: 10px;
    resize: none;
    background-color: white;
    border: none;
    padding: 10px;
`;
const YouOverlay = (data) => {

  let updateT = new Date(data.create_time);
  let updateMin = updateT.getMinutes();
  let updateHour = updateT.getHours();
  const ampm = updateHour < 12 ? "오전 " : "오후 ";
  updateHour = updateHour % 12;
  const updateMinT = updateMin < 10 ? "0" + updateMin.toString() : updateMin.toString();
  const updateHourT = updateHour < 10 ? "0" + updateHour.toString() : updateHour.toString();

  const dateTime = ampm + updateHourT + ":" + updateMinT;

  // console.log(dateTime);
  return (<YouMessage thumbnail={data.thumbnail || who}>
    <div className="messageWrapper">
      <div className="messageOverlay" >
        {data.message}</div>
      <div className="wrapper">
        <div className="count">{data.count > 0 ? data.count : ""}</div>
        <div className="time">{dateTime}</div>
      </div>
    </div>
  </YouMessage>)
};
const You = (data) => {
  let updateT = new Date(data.create_time);
  let updateMin = updateT.getMinutes();
  let updateHour = updateT.getHours();
  const ampm = updateHour < 12 ? "오전 " : "오후 ";
  updateHour = updateHour % 12;
  const updateMinT = updateMin < 10 ? "0" + updateMin.toString() : updateMin.toString();
  const updateHourT = updateHour < 10 ? "0" + updateHour.toString() : updateHour.toString();

  const dateTime = ampm + updateHourT + ":" + updateMinT;
  // console.log(data);
  return (<YouMessage thumbnail={data.thumbnail || who}>
    <div className="userName">
      {data.memberName || "디자인맴버"}
    </div>
    <div className="messageWrapper">
      <div className="thumbnail" ></div>
      <div className="message" >
        {data.message}</div>
      <div className="wrapper">
        <div className="count">{data.count > 0 ? data.count : ""}</div>
        <div className="time">{dateTime}</div>
      </div>
    </div>
  </YouMessage>)
};
function isOpen(ws) { return ws.readyState === ws.OPEN }
class Chat extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = { page: 0, chat: [], newchat: null, empty: true, ghostspace: null }
    // variable
    this.serviceIP = `${host}/webrtcPeerChat`;
    // functions
    this.sendMessage = this.sendMessage.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.requestChat = this.requestChat.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scroll = React.createRef();
  };
  componentDidMount() {
    window.addEventListener('focus', () => {
      // const scroll = document.getElementById('scroll');
      // alert(scroll.scrollTop);
    });
    window.addEventListener('load', () => {
      window.resizeTo(496, 650);
    });
    if (this.props.userInfo == null) {
      alert("사용자 정보가 없으면 입장하실 수 없습니다.");
      this.closeChat();
      window.close();
      return;
    }
    try {
      // SOCKET CONNECTION
      this.socket = io.connect(
        this.serviceIP, {
        // path: '/webrtc',
        query: {
          'roomNum': this.props.id,
          'memberName': this.props.userInfo.nickName,
          'memberId': this.props.userInfo.uid,
          'thumbnail': this.props.userInfo.thumbnail.s_img
        }
      });
      this.socket.on('read', data => {
        // console.log('on read', data);
        const copy = [...this.state.chat];
        data && data.length > 0 ? data.map(chat => {
          const idx = copy.findIndex(x => x.uid === chat.chat_msg_id);
          if (idx > 0) {
            copy[idx].count = chat.count;
          }
        }) :
          copy && copy.length > 0 && copy.map(chat => {
            chat.count = 0;
          })
        this.setState({ chat: copy });
      });
      this.socket.on('chat', data => {
        const thumbnail = this.props.DesignDetail.member &&
          this.props.DesignDetail.member.find(mem => mem.user_id === data.user_id) &&
          this.props.DesignDetail.member.find(mem => mem.user_id === data.user_id).thumbnail.s_img;
        data.thumbnail = thumbnail;
        // console.log('on chat', data);
        const copy = [...this.state.chat];
        copy.push(data);
        this.setState({ chat: copy });
        let scrollbar = document.getElementById("scroll");
        // if (scrollbar.scrollHeight - scrollbar.scrollTop <= 100 || data.user_id === this.props.userInfo.uid) {
        scrollbar.scrollTop = scrollbar.scrollHeight;
        //  } else {
        // this.setState({ newchat: data });
        // }
      });
      this.socket.on('load', async data => {
        console.log('on load', data);
        if (!data) {
          return;
        }

        const { messages, isMore } = data;
        await this.setState({ isMore: isMore });

        if (messages && messages.length > 0) {
          const copy = [];
          messages.reverse();
          messages.map(chat => { copy.push(chat) });

          if (this.state.chat && this.state.chat.length > 0) {
            this.state.chat.map(chat => { copy.push(chat) });
          }
          await this.setState({ chat: copy });
          let scrollbar = document.getElementById("scroll");
          if (scrollbar == null) return;
          if (this.state.page < 1) {
            scrollbar.scrollTop = scrollbar.scrollHeight;
          } else {
            scrollbar.scrollTop = 125;
          }
          await this.setState({ page: this.state.page + 1 });
          if (scrollbar.scrollTop == 0) {
            try {
              if (isOpen(this.socket))
                this.socket.emit('read');
            } catch (e) {
              console.error(e);
            }
          }
        }

      });
      this.socket.on('disconnect', () => {
        alert('채팅서버와 연결이 끊겼습니다.');
        window.location.reload(false);
      });
      this.socket.on('save-chat', data => {
        let d = new Date();
        let dformat = `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
        this.downloadTextFile(
          data.map(chat => {
            return `${chat.nick_name}(${chat.create_time}):\r\n${chat.message}\r\n`;
          }), `chatlog-${this.props.DesignDetail.title}-${dformat}.txt`)
      });


    }
    catch (e) {
      console.error(e);
    }
    this.requestChat();
  };
  downloadTextFile(text, name) {
    const a = document.createElement('a')
    const type = name.split('.').pop()
    a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` }))
    a.download = name
    a.click()
  };
  requestChat() {
    try {
      if (isOpen(this.socket))
        this.socket.emit('load', { page: this.state.page, design_id: this.props.id }, () => {
          console.log('request ', this.state.page);
        });
    } catch (e) {
      console.error(e);
    }
  };
  sendMessage(chatinput) {
    if (chatinput.value.trim() !== "") {
      this.setState({ empty: true });
      try {
        if (isOpen(this.socket)) {
          this.socket.emit("chat", { message: chatinput.value });
        }
      } catch (e) {
        console.error(e);
      };
      chatinput.value = "";
    }
  };
  saveChatLog() {
    try {
      if (isOpen(this.socket))
        this.socket.emit('save-chat', { design_id: this.props.DesignDetail.uid });
    } catch (e) {
      console.error(e);
    }
  };
  closeChat() {
    window.open('', '_self').close();
  };
  handleScroll(event) {
    // console.log('scroll');

    if (event.target.scrollTop === 0) {
      this.requestChat();
      return;
    }
    let scrollbar = document.getElementById("scroll");

    // console.log(scrollbar.scrollHeight, scrollbar.scrollTop,
    //   scrollbar.scrollHeight - scrollbar.scrollTop);

    if (scrollbar.scrollHeight - scrollbar.scrollTop <= 460) {
      try {
        if (isOpen(this.socket)) {
          this.socket.emit("read");
        }
        this.setState({ newchat: null })
      } catch (e) {
        console.error(e);
      }
    };
  };

  async componentDidUpdate(props, state) {
    if (isEqual(this.state.chat, state.chat) === false) {
      const scroll = document.getElementsByClassName('chat-element');
      const height_scroll = document.getElementById('scroll').clientHeight;
      let height_chatelement = 0;
      Object.values(scroll).forEach(element => {
        height_chatelement += element.clientHeight;
      });
      // const ghostspace = height_scroll - (height_chatelement);
      if (this.state.isMore && height_chatelement < height_scroll) {
        //   // document.getElementById('scroll').style.justifyContent = "flex-end";
        //   // if (this.state.isMore) {
        await this.requestChat();
        setTimeout(() => {
          let scrollbar = document.getElementById("scroll");
          scrollbar.scrollTop = scrollbar.scrollHeight;

        }, 500); // 0.5sec.
        //   // }
      } else {
        //   // document.getElementById('scroll').style.justifyContent = "flex-start";
        //   // this.requestChat();
      }
    }
  }

  render() {
    let beforeChat = -1;
    let nowChat = -1;
    let beforeDate = new Date();
    let nowDate = new Date();
    const { empty, newchat, chat, ghostspace } = this.state;
    const TITLE_MAX_LENGTH = 30;
    return (<Chatting>

      {/* NEW CHAT */}
      {newchat
        ? <div
          className="newchat"
          onClick={() => {
            let scroll = document.getElementById("scroll");
            scroll.scrollTop = scroll.scrollHeight;
            this.setState({ newchat: null });
          }}
        >
          새로운 메시지:
          {newchat.message.length > TITLE_MAX_LENGTH
            ? newchat.message.slice(0, TITLE_MAX_LENGTH) + "..."
            : newchat.message}
        </div>
        : null}


      {/* HEADER */}
      <div className="header">
        <div className="headerBox displayflex Hcentering Vcentering">
          {/* <div onClick={() => this.closeChat()} className="exitButton displayflex Hcentering Vcentering"> */}
          {/* <Shape imgURL={exiticon} width={15} height={15} /> */}
          {/* </div> */}
          <div>
            <div className="fontRed">{(this.props.DesignDetail && this.props.DesignDetail.title) || "디자인"}</div>
          </div>
          <div onClick={() => this.saveChatLog()} className="downloadButton displayflex Hcentering Vend">
            <Shape imgURL={downicon} width={25} height={25} />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">
        <div onScroll={this.handleScroll} id="scroll"
          className="scroll"
        >
          {/* <div>&nbsp;</div> */}

          {chat && chat.length > 0 &&
            chat.map((chat, index) => {

              beforeChat = nowChat;
              nowChat = chat.user_id;
              beforeDate = new Date(nowDate);
              nowDate = new Date(chat.create_time);

              const year = nowDate.getFullYear();
              const month = nowDate.getMonth() + 1;
              const day = nowDate.getDate();

              let date = year + "년 " + month + "월 " + day + "일";

              // <br/> to new-line
              // console.log("1:message:", chat.message)
              chat.message = chat.message.replaceAll("<br/>", "\r\n");
              // console.log("2:message:", chat.message)
              return (
                <div className="chat-element" key={"uid" + chat.uid.toString() + ",idx:" + index.toString()}>

                  {beforeDate.getDate() != nowDate.getDate() ||
                    beforeDate.getMonth() != nowDate.getMonth() ||
                    beforeDate.getDate() != nowDate.getDate() ?
                    <DateBox>
                      <div className="date">
                        {date}
                      </div>
                    </DateBox>
                    : null
                  }
                  <div>
                    {this.props.userInfo.uid === chat.user_id
                      ? Me(chat)
                      : beforeChat == chat.user_id ? YouOverlay(chat) : You(chat)}
                  </div>
                </div>)
            })}

          {ghostspace ? <Ghostspace height={ghostspace} /> : null}

        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="chatInput">
          <ChatArea
            type="text"
            id="chat-input"
            placeholder="문자를 입력하세요.(줄바꿈: 쉬프트+엔터)"
            className='chatdata'
            autoComplete="off"
            onKeyDown={e => {
              // send
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const chatinput = document.getElementById('chat-input');
                // console.log("message:", chatinput.value.trim() === "");
                if (chatinput.value.trim() !== "") {
                  this.sendMessage(chatinput);
                  chatinput.value = "";
                  this.setState({ empty: true });
                }
              }
            }}
            onChange={e => {
              const chatinput = e.target;
              this.setState({ empty: chatinput.value.trim().length > 0 ? false : true });
            }}
            autoComplete="off"
          />

          {empty ?
            <button disabled className="chatSubmit disabled" id="chat-submit">
              <div>보내기</div>
            </button>
            :
            <button onClick={() => this.sendMessage(document.getElementById('chat-input'))} className="chatSubmit" id="chat-submit">
              <div>보내기</div>
            </button>}
        </div>
      </div>

    </Chatting>);
  }
}

export default Chat;

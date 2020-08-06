import React from 'react';
import styled from "styled-components";
import host from "config";
import { alert } from "components/Commons/Alert/Alert";
import io from "socket.io-client";

const Wrapper = styled.div`
  // height: 100%;
  background: #EFEFEF;      
  .center-text {
    display: flex;
    flex: 1;
    flex-direction: column; 
    justify-content: center;
    align-items: center;  
    height: 100%;
  }
`;
const ChatBox = styled.div`
    // display:none;
    // bottom: 50px;  
    // min-height: 600px;
    // max-width: 85vw;
    background: #efefef;
    position: fixed;
    top: 3px;
    left: 3px;

    width: 99%;
    min-width: 500px;
    max-height: 100vh;
    border-radius: 5px;  
    box-shadow: 0px 5px 35px 9px #ccc;
    
  .chat-box-toggle {
    float: right;
    margin-right: 15px;
    span {
      cursor: pointer;
    }
  }
  .chat-box-header {
    background: #CD202D;
    height: 70px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px; 
    color: white;
    text-align: center;
    font-size: 20px;
    padding-top: 17px;
  }
  .chat-box-body {
    position: relative;  
    height: 370px;  
    height: auto;
    border: 1px solid #ccc;  
    overflow: hidden;
  }
  .chat-box-body:after {
    content: "";
    background-color: #EFEFEF;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=');
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height:100%;
    position: absolute;
    z-index: -1;   
  }
  .chat-input {
    background: #f4f7f9;
    width: 100%; 
    position: relative;
    height: 47px;  
    padding-top: 10px;
    padding-right: 50px;
    padding-bottom: 10px;
    padding-left: 15px;
    border: none;
    resize: none;
    outline: none;
    border: 1px solid #ccc;
    color: #888;
    border-top: none;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    overflow: hidden;  
    input {
      width: 100%;
      height: 100%;
      border: none;
      background: #f4f7f9;
    }
  }
  .chat-input > form {
      margin-bottom: 0;
  }
  .chat-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #ccc;
  }
  .chat-input::-moz-placeholder { /* Firefox 19+ */
    color: #ccc;
  }
  .chat-input:-ms-input-placeholder { /* IE 10+ */
    color: #ccc;
  }
  .chat-input:-moz-placeholder { /* Firefox 18- */
    color: #ccc;
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
    padding:15px; 
    height:370px;
    overflow-y:scroll;
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
  .chat-msg.user > .msg-avatar img {
    width:45px;
    height:45px;
    border-radius:50%;
    float:left;
    width:15%;
  }
  .chat-msg.self > .msg-avatar img {
    width:45px;
    height:45px;
    border-radius:50%;
    float:right;
    width:15%;
  }
  .cm-msg-text {
    background:white;
    padding:10px 15px 10px 15px;  
    color:#666;
    max-width:75%;
    float:left;
    margin-left:10px; 
    position:relative;
    margin-bottom:20px;
    border-radius:30px;
  }
  .chat-msg {
    clear:both;    
  }
  .chat-msg.self > .cm-msg-text {  
    float:right;
    margin-right:10px;
    background: #5A5EB9;
    color:white;
  }
  .cm-msg-button>ul>li {
    list-style:none;
    float:left;
    width:50%;
  }
  .cm-msg-button {
      clear: both;
      margin-bottom: 70px;
  }
  .newchat {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #EFEFEF;
    border: 1px solid #707070;
    border-radius: 15px;
    color: #707070;
    font-weight: 500;
    font-size: 16px;
  }
`;
const MyMessage = styled.div`
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
  .messageWrapper {
    display:flex;
    .message {
      margin-top:5px;
      overflow:hidden;
      width:max-content;
      word-wrap:break-word;
      padding:10px;
      border-radius:10px;
      background-color:#EFEFEF;
      color:#707070;
      text-align:left;
    }
    .count {

    }
  }
`;
const Me = (data) => {
  return (
    <MyMessage key={data.uid}>
      <div className="userName">
        {data.memberName || "나"}
      </div>
      <div className="messageWrapper">
        <div className="count">
          {data.count > 0 ? data.count : ""}</div>
        <div className="message">
          {data.message}</div>
      </div>
    </MyMessage>);
};
const YouMessage = styled.div`
  max-width:100%;
  position:relative;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  margin-bottom:10px   
  .userName {
    min-width:max-content;
    font-size:11px;
    font-weight:500;
  }
  .messageWrapper {
    display:flex;
    .message {
      margin-top:5px;
      overflow:hidden;
      width:max-content;
      word-wrap:break-word;
      padding:10px;
      border-radius:10px;
      background-color:#EFEFEF;
      color:#707070;
      text-align:left;
    }
    .count {

    }
  }
`;
const You = (data) => {
  return (<YouMessage key={data.uid}>
    <div className="userName">
      {data.memberName || "다른사람"}
    </div>
    <div className="messageWrapper">
      <div className="message">
        {data.message}</div>
      <div className="count">
        {data.count > 0 ? data.count : ""}</div>
    </div>
  </YouMessage>)
};
class Chat extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = { page: 0, chat: [], newchat: null, }

    // variable
    this.serviceIP = `${host}/webrtcPeerChat`;

    // functions
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessageEnter = this.sendMessageEnter.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.requestChat = this.requestChat.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  };
  componentDidMount() {
    window.addEventListener('focus', () => {
      // const scroll = document.getElementById('scroll');
      // alert(scroll.scrollTop);
    })

    if (this.props.userInfo == null) {
      alert("사용자 정보가 없으면 입장하실 수 없습니다.");
      this.closeChat();
      window.close();
      return;
    }
    // socket connection
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
    try {
      this.socket.on('chat', data => {
        // state method
        const copy = [...this.state.chat];
        copy.push(data);
        this.setState({ chat: copy });
        let scrollbar = document.getElementById("scroll");
        // alert(`${scrollbar.scrollTop}, ${scrollbar.scrollHeight}`);
        if (scrollbar.scrollHeight - scrollbar.scrollTop < 450 || data.user_id === this.props.userInfo.uid) {
          scrollbar.scrollTop = scrollbar.scrollHeight;
        } else {
          this.setState({ newchat: data });
        }
      });
      this.socket.on('load', data => {
        if (data && data.length > 0) {
          console.log("chats", data);
          const copy = [];
          data.reverse();
          data.map(chat => {
            copy.push(chat);
          })
          if (this.state.chat && this.state.chat.length > 0) {
            this.state.chat.map(chat => { copy.push(chat); })
          }
          this.setState({ chat: copy });
          let scrollbar = document.getElementById("scroll");
          if (this.state.page < 1) {
            scrollbar.scrollTop = scrollbar.scrollHeight;
          } else {
            scrollbar.scrollTop = 125;
          }
          this.setState({ page: this.state.page + 1 });
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
      this.socket.on('read', (data) => {
        const copy = [...this.state.chat];
        copy.map(chat => {
          if (chat.count > 0 && chat.user_id !== data.user_id) {
            chat.count -= 1;
          }
          return chat;
        })
        this.setState({ chat: copy });
      })
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
      this.socket.emit('load', { page: this.state.page, design_id: this.props.id }, () => {
        console.log('request load chat');
      });
    } catch (e) {
      console.error(e);
    }
  };
  sendMessage() {
    let message = document.getElementById('chat-input');
    try {
      this.socket.emit('chat', {
        message: message.value
      }, () => {
        console.log(`message : ${message.value}`);
      })
    } catch (e) {
      console.error(e);
    }
    message.value = '';
  };
  sendMessageEnter() {
    if (window.event.keyCode == 13) {
      let message = document.getElementById('chat-input')
      try {
        this.socket.emit('chat', { message: message.value }, () => {
          console.log(`message : ${message.value}`)
        });
      } catch (e) {
        console.error(e);
      }
      message.value = ''
    }
  };
  saveChatLog() {
    try {
      this.socket.emit('save-chat', { design_id: this.props.DesignDetail.uid });
    } catch (e) {
      console.error(e);
    }
  }
  closeChat() {
    window.open('', '_self').close();
  };
  handleScroll(event) {
    if (event.target.scrollTop === 0) {
      this.requestChat();
    }
    let scrollbar = document.getElementById("scroll");
    if (scrollbar.scrollHeight - scrollbar.scrollTop <= 370) {
      try {
        this.socket.emit("read");
        this.setState({ newchat: null })
      } catch (e) {
        console.error(e);
      }
    };
  }

  render() {
    return (
      <Wrapper>
        <ChatBox>
          <div className="chat-box-header">
            {(this.props.DesignDetail && this.props.DesignDetail.title) || "디자인"} 채팅방

            <span className="chat-box-toggle">
              <span onClick={() => this.saveChatLog()}>
                <i className="massive material-icons">save</i>
              </span>
              <span onClick={() => this.closeChat()}>
                <i className="big material-icons">close</i>
              </span>
            </span>
          </div>

          <div className="chat-box-body">
            <div className="chat-box-overlay">
            </div>
            <div onScroll={this.handleScroll} id='scroll' className="chat-logs">
              <div className='chat'>
                <div id="output">
                  {this.state.chat && this.state.chat.length > 0 && this.state.chat.map(chat => {
                    return this.props.userInfo.uid === chat.user_id ? Me(chat) : You(chat);
                  })}
                </div>
              </div>
              {this.state.newchat ?
                <div className="newchat" onClick={() => {
                  let scroll = document.getElementById("scroll");
                  scroll.scrollTop = scroll.scrollHeight;
                  this.setState({ newchat: null });
                }}>{this.state.newchat.message}</div>
                : null}
            </div>
          </div>

          <div className="chat-input">
            <input
              type="text"
              id="chat-input"
              placeholder="Send a message..."
              className='chatdata'
              onKeyDown={this.sendMessageEnter}
            />
            <button onClick={this.sendMessage} className="chat-submit" id="chat-submit">
              <i className="material-icons">send</i>
            </button>
            {/* design owner notice button */}
            {/* <button class="chat-submit" id="chat-submit">
              <i class="material-icons">announcement</i>
            </button> */}
          </div>

        </ChatBox>

      </Wrapper >
    );
  }
}

export default Chat;

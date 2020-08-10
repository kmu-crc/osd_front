import React, { Component } from 'react';
import io from 'socket.io-client'
import styled from 'styled-components'
import { Icon } from "semantic-ui-react";
import host from "config";

const ChatBox = styled.div`
  border-radius:10px;
  overflow:hidden;
  width:100%;
  height:100%;
  .title{
    background-color: red;
    padding: 10px;
    .text{
      color: #fff;
    }
  }
`

class Chat extends Component {
  constructor(props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
    this.sendMessageEnter = this.sendMessageEnter.bind(this)
    this.chattingLog = this.chattingLog.bind(this)
    // 메세지를 보내주는 주된 함수의 바인딩
    this.serviceIP = `${host}/webrtcPeerChat`
    //socket 초기화
    this.socket = null
  }
  sendMessageEnter() {
    if (window.event.keyCode == 13) {
      var message = document.getElementById('message')
      this.socket.emit('chat', {
        message: message.value
      }, () => {
        console.log(`message : ${message.value}`)
      })
      message.value = ''
    }
  }

  sendMessage() {
    var message = document.getElementById('message')

    this.socket.emit('chat', {
      message: message.value
    }, () => {
      console.log(`message : ${message.value}`)
    })

    message.value = ''

  }
  // server.js와의 통신을 통해 메세지를 보내는 주된 함수

  chattingLog() {
    this.socket.emit('log')
  }
  downloadTextFile(text, name) {
    const a = document.createElement('a')
    const type = name.split('.').pop()
    a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` }))
    a.download = name
    a.click()
  }


  componentDidMount() {
    console.log(this.props)
    this.socket = io.connect(
      //ngrok 서버를 통해 socket 연결이 됨
      this.serviceIP,
      {
        // path: '/webrtc/socket.io',
        query: { 'roomNum': this.props.id, 'memberName': this.props.mem.nickName, 'memberId': this.props.mem.uid, 'thumbnail': this.props.mem.thumbnail.s_img }
      }
    )

    this.socket.on('chat', data => {
      // alert("!");
      console.log('data send', data);
      const Tests = () => {
        return (
          <div className="msgBox">
            {data.memberName}
          </div>
        )
      }
      const output = document.getElementById('output');
      // output.innerHTML += `<p> <strong>` + data.memberName + ': </strong>' + data.message + `</p>`
      const IsMine = this.socket.id === data.socketID ?
        `
          <div style="
          max-width:100%;
          position:relative;
          overflow:hidden;
          display:flex;
          flex-direction:column;
          align-items:flex-end;
          margin-bottom:10px;
          justify-content:flex-end; ">   
              <div style="
              font-size:12px;
              min-width:max-content;
              font-weight:500;">
              ${data.memberName}
              </div>
              <div style="
              margin-top:5px;
              overflow:hidden;
              width:max-content;
              max-width:80%;
              word-break:break-all;
              word-wrap:break-word;
              padding:10px;
              border-radius:10px;
              background-color:#EFEFEF;
              color:#707070;
              text-align:right">
              ${data.message}
              </div>
          </div>
          `
        :
        `
          <div style="
          max-width:100%;
          position:relative;
          overflow:hidden;
          display:flex;
          flex-direction:column;
          margin-bottom:10px;">   
              <div style="
              min-width:max-content;
              font-size:11px;
              font-weight:500;">
              ${data.memberName}
              </div>
              <div style="
              margin-top:5px;
              overflow:hidden;
              width:max-content;
              max-width:80%;
              word-break:break-all;
              word-wrap:break-word;
              padding:10px;
              border-radius:10px;
              background-color:#EFEFEF;
              color:#707070;
              text-align:left">
              ${data.message}
              </div>
          </div>
          `;
      console.log(Tests);
      output.innerHTML += IsMine;
      var scrollbar = document.getElementById("scroll")
      scrollbar.scrollTop = scrollbar.scrollHeight;
    })

    var num = 1
    //server.js에서 보내주는 데이터를 받아 출력
    this.socket.on('log', (data) => {
      this.downloadTextFile(data, `text${num}.txt`)
      num++
    })
    this.socket.on('banned', () => {
      alert("이미 접속중입니다.");
      window.history.back();
    })
  }

  render() {
    return (
      <React.Fragment>
        <ChatBox>
          <div className="title"><h3>opensource design</h3></div>
          <div className='inputbutton'>
            <button className="customButton" id="screenshare">
              <Icon color="grey" size="large" className="share alternate square" />화면공유</button>
            <button className="customButton marginLeft" id="localvideo">
              <Icon color="grey" size="large" className="video" />local video</button>
            <button className="customButton marginLeft" id="chattinglog" onClick={this.chattingLog}>
              <Icon color="grey" size="large" className="file alternate outline" />채팅 로그</button>
            <div id="outputLog"></div>
          </div>
          <div id='scroll' className='chat'>
            <div id="output"></div>
          </div>

          <div className='inputbox'>
            <input id="message" type="text" className='chatdata' onKeyDown={this.sendMessageEnter} placeholder="message" />
          </div>
        </ChatBox>
      </React.Fragment>
    )
  }
}
export default Chat
import React from 'react';
import styled from "styled-components";
import host from "config";
import { alert } from "components/Commons/Alert/Alert";
import io from "socket.io-client";
import who from "source/thumbnail.png";
import { Icon } from "semantic-ui-react";
import exiticon from "source/exiticon.svg";
import downicon from "source/saveicon.svg";

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
const Wrapper = styled.div`
*{
  font-family:Noto Sans CJK KR;
}
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
  // .chat-input {
  //   background: #f4f7f9;
  //   width: 100%; 
  //   position: relative;
  //   height: 47px;  
  //   padding-top: 10px;
  //   padding-right: 50px;
  //   padding-bottom: 10px;
  //   padding-left: 15px;
  //   border: none;
  //   resize: none;
  //   outline: none;
  //   border: 1px solid #ccc;
  //   color: #888;
  //   border-top: none;
  //   border-bottom-right-radius: 5px;
  //   border-bottom-left-radius: 5px;
  //   overflow: hidden;  
  //   input {
  //     width: 100%;
  //     height: 100%;
  //     border: none;
  //     background: #f4f7f9;
  //   }
  // }
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
    *{
      border:1px solid black;
    }
    border: 1px solid red;
    padding:15px; 
    height:370px;
    overflow-y: scroll;
    .dateBox{
      border:1px solid black;
      width:100%;
      display:flex;
      justify-content:center;
      margin-top:10px;
      margin-bottom:10px;
      .date{
        border:1px solid black;
  
        width:max-content;
        height:20px;
        font-size:13px;
      }
    }
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
        <div className="message" style={{ whiteSpace: "pre-wrap" }}>
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
/// new styled
const Shape = styled.div`
  background-image:url(${props => props.imgURL});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  width:${props => props.width == null ? "100%" : `${props.width}px`};
  height:${props => props.height == null ? "100%" : `${props.height}px`};
  opacity:1;
`
const Chatting = styled.div`
  background-color:#EFEFEF;
  width:496px;
  height:600px;
  min-height:100%;
  .displayflex{display:flex;};
  .Hcentering{justify-content:center;};
  .Vcentering{align-items:center};
  .Vend{align-items:flex-end;};
  .fontRed{color:red;};
  .fontGray{color:#707070;};
  .opacityHalf{opacity:0.7;};
  .margintiny{margin:10px;}
  .headerBox{
    width:100%;
    height:61px;
    background-color:#EFEFEF;
    box-shadow: 0px 0px 5px 0px #ABABAB;
    position:relative;
  }
  .exitButton{
    height:100%;
    width:min-content;
    position:absolute;
    padding-left:10px;
    left:0;
    top:0;
  }
  .downloadButton{
    height:100%;
    width:min-content;
    position:absolute;
    padding-right:5px;
    padding-bottom:3px;
    right:0;
    top:0;
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
  .chatInput{
    *{
      // border:1px solid black;
    }
    border-top:1px solid #707070;
    width:100%;
    height:80px;
    display:flex;
    justify-content:center;
    align-items:center;
    }
  .chatSubmit{
    background-color: red;
    box-shadow: none;
    border: none;
    border-radius: 10px;
    color: white;
    margin-top: 6px;
    margin-left: 12px;
    width: 64px;
    height: 50px; 
    font-size:13px;
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
    min-height:460px;
    overflow-y: scroll;
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
  }

  .ghost-space {
    height: 40px;
    // background-color: red;
  }
  `
const ChatArea = styled.textarea`
    width:384px;
    height:58px;
    border-radius:10px;
    resize:none;
    background-color:white;
    border:none;
    padding:10px;
  `
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
      <div className="messageOverlay">
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
      <div className="message">
        {data.message}</div>
      <div className="wrapper">
        <div className="count">{data.count > 0 ? data.count : ""}</div>
        <div className="time">{dateTime}</div>
      </div>
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
    window.addEventListener('resize', () => {
      window.self.resizeTo(496, 650);
    }, false);
    window.addEventListener('load', () => {
      window.resizeTo(496, 650);
    }, false);

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
        // console.log('on chat', data);
        const copy = [...this.state.chat];
        copy.push(data);
        this.setState({ chat: copy });
        let scrollbar = document.getElementById("scroll");
        if (scrollbar.scrollHeight - scrollbar.scrollTop <= 520 || data.user_id === this.props.userInfo.uid) {
          scrollbar.scrollTop = scrollbar.scrollHeight;
        } else {
          this.setState({ newchat: data });
        }
      });
      this.socket.on('load', data => {
        if (data && data.length > 0) {
          //console.log("on load", data);
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
          if (scrollbar.scrollTop == 0) {
            try {
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
      this.socket.emit('load', { page: this.state.page, design_id: this.props.id }, () => {
        console.log('request ', this.state.page);
      });
    } catch (e) {
      console.error(e);
    }
  };
  sendMessage() {
    let message = document.getElementById('chat-input');
    if (message.value.trim() == "") { alert("내용을 입력해주세요"); return; }

    try {
      this.socket.emit('chat', {
        message: message.value
      }, () => {
        // console.log(`message : ${message.value}`);
      })
    } catch (e) {
      console.error(e);
    }
    message.value = null;
  };
  sendMessageEnter(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      let message = document.getElementById('chat-input')
      if (message.value.trim() == "") return;
      // console.log("message:", message.value)
      var str = document.getElementById("chat-input").value;
      str = str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      document.getElementById("chat-input").value = str;
      console.log(document.getElementById("chat-input").value, str)
      try {
        this.socket.emit(
          'chat', { message: str },
          // 'chat', { message: message.value },
          () => {
            // console.log(`message : ${message.value}`)
          });
      } catch (e) {
        console.error(e);
      }
      message.value = null;
      event.preventDefault();
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
        this.socket.emit("read");
        this.setState({ newchat: null })
      } catch (e) {
        console.error(e);
      }
    };
  }
  render() {
    let beforeChat = -1;
    let nowChat = -1;
    let beforeDate = new Date();
    let nowDate = new Date();
    return (
      <Chatting>
        <div className="headerBox displayflex Hcentering Vcentering">
          <div onClick={() => this.closeChat()} className="exitButton displayflex Hcentering Vcentering">
            <Shape imgURL={exiticon} width={15} height={15} />
          </div>
          <div onClick={() => this.saveChatLog()} className="downloadButton displayflex Hcentering Vend">
            <Shape imgURL={downicon} width={15} height={15} />
          </div>
          <div>
            <div className="fontRed">{(this.props.DesignDetail && this.props.DesignDetail.title) || "디자인"}</div>
          </div>
        </div>

        <div className="chat-box-body">
          <div onScroll={this.handleScroll} id='scroll' className="chat-logs">
            {this.state.chat &&
              this.state.chat.length > 0 &&
              this.state.chat.map((chat, index) => {

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
                  <div key={"uid" + chat.uid.toString() + ",idx:" + index.toString()}>

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
                  </div>
                )
              })}
            {this.state.chat && this.state.chat.length <= 10 ? <div className="ghost-space">&nbsp;</div> : null}
          </div>
        </div>
        {this.state.newchat ?
          <div className="newchat" onClick={() => {
            let scroll = document.getElementById("scroll");
            scroll.scrollTop = scroll.scrollHeight;
            this.setState({ newchat: null });
          }}>새로운 메시지: {this.state.newchat.message.length > 30 ? this.state.newchat.message.slice(0, 30) + "..." : this.state.newchat.message}</div>
          : null}

        <div className="chatInput">
          <ChatArea
            type="text"
            id="chat-input"
            placeholder="문자를 입력하세요.(줄바꿈: 쉬프트+엔터)"
            className='chatdata'
            autoComplete="off"
            onKeyDown={this.sendMessageEnter}
            autoComplete="off"
          />
          <button onClick={this.sendMessage} className="chatSubmit" id="chat-submit">
            <div>보내기</div>
          </button>
        </div>

      </Chatting>);
  }
}

export default Chat;

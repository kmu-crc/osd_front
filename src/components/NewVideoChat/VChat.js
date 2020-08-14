import React, { Component } from 'react';
import styled from "styled-components";
import Video from "./video";
import ScrollContainer from 'react-indiana-drag-scroll'

// 
// Usage
// class Example extends Component {
//   render () {
//     return (
//       
//     )
//   }
// }

const VideoChatContainer = styled.div`
  background-color: bgba(0, 0, 0, 1.0);
  // *{border: 1px solid red;}
`;
const ButtonBarContainer = styled.div`
  margin-top: 13px;
  padding-left: 25px;
  padding-right: 16px;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: rows;
  justify-content: space-between; 

  .btn {
    cursor: pointer;
    text-align: center;

    &.chat {
      width: 51px;
      background: transparent;
    }
    &.share {
      width: 103px;
      height: 35px;
      border-radius: 36px;
      background: rgba(125, 125, 125, 0.5);
      padding: 8px 25px;
    }
    &.exit {
      width: 64px;
      height: 32px;
      border-radius: 32px;
      background: rgba(255, 0, 0, 1.0);
      padding: 6px 12px;
    }    
  }
  .txt {
    color: rgba(255, 255, 255, 1.0);
    width: max-content;
    // border: 1px solid black;
  }
`;
const BigVideoScreen = styled.div`
`;
const VideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 16px;
  left: 15px;
  width: 1249px; //100%;
  // background-color: green;

  .me {

  }
  .others {
    position: relative;
    margin-left: 10px;
    width: 980px;
    .memeber-count {
      margin-left: auto;
      margin-top: 30px;
      width: 72px;
      height: 26px;
      border-radius: 36px;
      background-color: rgba(125, 125, 125, 0.5);
      text-align: center;
      color: white;
      font-familiy: Noto Sans KR;
      font-weight: 300;
      font-size: 11px;
      line-height: 15px;
      padding: 5px 7px;
    }
    .inner {
      width: 100%;
      overflow: hidden;
      position: absolute;
      display: flex;
      flex-direction: row;
      // background-color: blue;
      height: 77px;
      bottom: 0px;
      .peer {
        transform: translate(0, 10px);
        margin-right: 14px;
      }
    }
  }
`;

// position: absolute;
// bottom: 0px;
// left: 284px;
// display: flex;
// overflow-x: auto;
// overflow-y: hidden;
// flex-direction: row;
// background-color: white;
// width: 980px;

// .peer {
//   width: max-content;
//   display: flex;
// }
class VChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "me",
      peers: [
        { screen: "camera", nick_name: "안녕 나는 김철수1", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수2", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수3", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수4", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수5", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수6", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수7", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수8", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수9", thumbnail: null },
        { screen: "camera", nick_name: "안녕 나는 김철수10", thumbnail: null },]
    }
  }


  render = () => (<VideoChatContainer>
    {/* top */}
    <ButtonBarContainer>
      <div className='btn chat'>
        <span className='txt'>채팅</span>
      </div>
      <div className='btn share'>
        <span className='txt'>화면공유</span>
      </div>
      <div className='btn exit'>
        <span className='txt'>나가기</span>
      </div>

    </ButtonBarContainer>

    {/* middle*/}
    <BigVideoScreen>
      ...
    </BigVideoScreen>

    {/* bottom*/}
    <VideosContainer>
      <div className="me" onClick={() => this.setState({ selected: "me" })}>
        <Video
          itsMe={true} nick_name={this.props.userInfo.nick_name || "디자인 멤버"} />
      </div>

      <div className="others">
        <div className="memeber-count">
          참여자 9/10
        </div>
        <ScrollContainer vertical={false} className="inner scroll-container">
          {this.state.peers &&
            this.state.peers.length > 0 &&
            this.state.peers.map((peer, idx) =>
              <div
                className="peer"
                key={idx + peer.nick_name}
                onClick={() => this.setState({ selected: idx })}>

                <Video
                  {...peer}
                  itsMe={false}
                  selected={idx === this.state.selected} />
              </div>
            )}
        </ScrollContainer>
        {/* </div> */}
      </div>

    </VideosContainer>

  </VideoChatContainer>)
}

export default VChat;


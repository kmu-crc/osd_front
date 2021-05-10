import React, { Component } from 'react';
import DateFormat from "modules/DateFormat";
import Socket from "modules/socket";
import { FormInput } from "components/Commons/FormItem";
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
// import Button from "components/Commons/Button";
// import NumberFormat from 'modules/NumberFormat';
// import TextSlicer from 'modules/TextSlicer'
import market_style from "market_style";
import styled from "styled-components";
import who from "source/thumbnail.png";

// CSS STYLING
const Container = styled.div`
  display:flex;
  justify-content:center;
  margin-top: 35px;
  margin-bottom:100px;
  padding:0px 30px;
  width: 100%;
  
  .line{
    display: flex;
    flex-direction: row;
  }
`;
const Wrapper = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-start;
  border-radius: 20px;
  box-shadow: 5px 5px 10px #00000029;
  overflow:hidden;
`;
const Peers = styled.div`
  cursor: default;
  background: #F9F9F9;
  padding: 25px ;
  .self {
    padding:25px;
    border-radius:20px;
    background-color:#fff;
    display: flex;
    flex-direction: row;
    .me {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
    }
  }
  .searchBox{
    align-items:center;
    padding-top:25px;
    padding-bottom:25px;
    position:relative;
    .searchRow{
      display:flex;
      flex-wrap:wrap;
      .search-input{
        width:355px !important; 
        background-color:white;
        border:none;
        outline:none;
        padding:5px;
      }
    }
    .search-list{
      position:absolute !important;
      width:100% !important; 
      background-color:white;
      border-radius:5px;
      padding:0px 5px 5px 5px;
      box-shadow: 5px 5px 10px #00000029;
    }
    .heading{
      margin-right:10px;
      margin-bottom:5px;
      display:flex;
      align-items:center;
    }
    .memberBox{
      width:100%;
      border-radius:10px;
      border:1px solid white;
      padding:5px;
      margin-top:5px;
      background-color:#E6E6E6;
      cursor:pointer;
    }
    
  }
  .list {
    font-family: Noto Sans KR;
    dipsplay: flex;
    flex-direction: column;
    height: 650px;
    overflow: hidden;
    :hover {
    overflow: auto;
    }
    .person {
      *{cursor:pointer;}
      max-height:100px;
      margin-bottom:5px;
      background-color:#FBFBFB;
      border:1px solid #E6E6E6;
      border-radius:20px;
      padding: 25px;

      :hover {
        background: #F0F0F0;
      }
      &.active {
        background: #F0F0F0;
      }
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      flex-direction: row;
     .middle {
        width: 250px;
        margin-left: 5px;
        .name {
          color: #7F7F7F;
          font-weight: 500;
        }
        .last-message {
          height:20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .last-date{
          display:none;
        }
      }
      .date {
        width: 75px;
        margin-left: auto;
        margin-right: 15px;
        .sent-date {
          text-align: right;
          margin-left: auto;
          margin-right: 10px;
        }

        .checker {
        }
      }
    }
  }
  @media only screen and (min-width : 700px) and (max-width:1000px) {
    width:max-content;
    .searchBox{
      .searchRow{
        .search-input{
          width:100% !important;
        }
      }
    }
    .list{
      .person{
        padding:10px; 
        .middle{
          width:max-content;
          .name{
            width:100px;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  @media only screen and (min-width : 500px) and (max-width:700px) {
    width:max-content;
    padding:10px;
    .searchBox{
      .searchRow{
        .search-input{
          width:100% !important;
        }  
      }
    }
    .list{
      .person{
        width:max-content;
        padding:5px;
        .middle{
          width:max-content;
          .name{
            width:50px;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;
          }
          .last-message{display:none;}
          .last-date{
            display:block;
          }
        }    
      }
      .date{
        display:none;
      }
    }
  }
`;
const Chatting = styled.div`
  background: #FFFFFF;
  border-left:1px solid #E6E6E6;
  padding:25px;
  font-family: Noto Sans KR;
  width: 100%;
  &.expand {
    border-radius: 0;
  }
  .status {
    background-color:#F9F9F9;
    border-radius:0px 20px 0px 0px;
    border:1px solid #E9E9E9;
    display: flex;
    flex-direction: row;
    padding:25px;
    width:100%;
    .nick {
      margin-left: 5px;
      font-size:${market_style.font.size.small2};
      font-weight: 500;
    }
    .circle {
      margin-left: 5px;
      width: 10px;
      height: 10px;
      border: 1px solid gray;
      background-color: gray;
      border-radius: 50%;
      &.active {
        background-color: #00FF00;
        border: 1px solid #00FF00;
      }
    }
  }
  .chat-list {
    margin-top: 15px;
    height: 75%;
    overflow:hidden;
  }
  .chat-input {
    margin-top: 15px;
    .border{
      border-bottom: 1px solid gray;
    }
    .input-wrapper {
      margin-top: 15px;
      .input-style {
        display:flex;
        justify-content:center;
        align-items:center;
        width: 90%;
        background: #F0F0F0;
        border-radius: 25px 0 0 25px; 
        input {
          width: 100%;
          padding-left: 10px;
          border: none;
          background: transparent;
        }
      }
      .button-style{
        min-width:60px;
        min-height:40px;
        background-color: red;
        width: 35px;
        height: 35px;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align: center;
        border-radius: 0px 20px 20px 0px;
        button{
          border: none;
          background: transparent;

        }
      }
    }
  }
  &:hover{
    .chat-list{
      overflow:auto;
    }
  }
  @media only screen and (min-width : 700px) and (max-width:1000px) {
    padding:15px;
  }
  @media only screen and (min-width : 500px) and (max-width:700px) {
    padding:10px;
  }
`;
const SendMessageTextarea = styled.div`
  width:95%;
  max-height:40px;
  min-height:40px;
  font-size:${market_style.font.size.mini2};
  text-align:left;
  line-height:27px;
  background-color:#dddddd;
  resize:none;
  border:none;
  outline:none;
  padding:5px;
  overflow:auto;
  @media only screen and (min-width : 780px) and (max-width:1440px) {

  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    height:100%;
  }
`;
//const ProfileDetail = styled.div`
//  width: 100px;
//  background: #F9F9F9;
//  display: none;
//  &.expand {
//    display: block;
//    border-radius: 0 25px 25px 0;
//  }
//
//`;
const Face = styled.div`
  background-image: url(${props => props.img ? props.img : who});
  min-width: 45px;
  min-height: 45px;
  max-width: 45px;
  max-height: 45px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;


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
                <FormInput className="search-input"
                  type="text" name="search" placeholder={window.innerWidth > 700 ? "찾고자 하는 회원의 닉네임을 입력해 주세요." : "닉네임 검색"} validates={["MinLength2"]} getValue={this.getValue} value={this.state.searchform} />
              </div>
              <div className="search-list" style={this.state.openMember ? { display: "block" } : { display: "none" }}>
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
                        <div className="last-date">{DateFormat(peer.update_time)}</div>

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

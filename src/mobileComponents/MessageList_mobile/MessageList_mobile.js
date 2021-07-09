
import React, { Component } from 'react';
import DateFormat from "modules/DateFormat";
import Socket from "modules/socket";
import { FormInput_mobile } from "components/Commons/FormItem";
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
// import Button from "components/Commons/Button";
// import NumberFormat from 'modules/NumberFormat';
// import TextSlicer from 'modules/TextSlicer'
import styled, { keyframes } from "styled-components";
import market_style from "market_style";
import who from "source/thumbnail.png";
import Zoom from "source/baseline_search_black_48dp.png";

const Face = styled.div`
    min-width:49px;
    min-height:49px;
    max-width:49px;
    max-height:49px;
    border-radius:50%;
    margin-right:10px;
    background-image: url(${props => props.img ? props.img : who});
`;

const Wrapper_ = styled.div`
*{
  font-family:Noto Sans KR;
}
   padding:12px 10px;
   .header{
        .search{
          width:100%;
          display:flex;
          align-items:center;
        }
        .search_label{
          min-width:102px;
          color:#707070;
          font-weight:500;
          font-size:${market_style.font.size.small1};
        }
        .search_input{
          width:100%;
          position:relative;
        }
        .search_list{
          position:absolute !important;
          width:95% !important; 
          background-color:white;
          border-radius:5px;
          padding:0px 5px 5px 5px;
          box-shadow: 5px 5px 10px #00000029;
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
        .zoomicon{
          position:absolute;
          top:2px;
          right:10px;
          width:20px;
          height:20px;
          opacity: .2;
        }
   }
   .peerlist{
      width:100%;
      padding:8px 0px;
      .peer{
        width:100%;
        height:79px;
        background-color:#F8F8F8;
        border-radius:10px;
        padding:15px 10px;
        margin-top:10px;
        display:flex;
        align-items:center;
      }
      .info{
        width:100%;
        height:49px;
        .name{
          width:100%;
          display:flex;
          justify-content:space-between;
          align-items:center;
          .text{
            font-size:${market_style.font.size.small1};
            font-weight:500;
            color:black;
          }
          .last-date{
            font-size:${market_style.font.size.mini2};
            font-weight:200;
            color:black;
          }
        }
        .talk{
          font-size:${market_style.font.size.small1};
          font-weight:300;
          collor:black;
          margin-top:5px;
          width:100%;
          height:22px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
   }
   
`
const slide = keyframes`
  0% {
    left:-249px;
    opacity:0.5;

  }
  100% {
    left:0px;
    opacity:1;

  }
`;
const Detail = styled.div`
*{
  font-family:Noto Sans KR;
}
  display:${props=>props.visible==true?"block":"none"};
  z-index:997;
  position:fixed;
  width:${window.innerWidth}px;
  height:${window.innerHeight-100}px;
  opacity:0.5;
  animation-name: ${slide};
  animation-duration:1s;
  animation-direction:${props=>props.visible == true?"alternate":"reverse"};
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
  background-color:white;
  padding:10px 10px;
  .close{
    font-family:Noto Sans KR;
    font-size:${market_style.font.size.small1};
    font-weight:300;
    position:absolute;
    top:15px;
    right:20px;
  }
    .peer{
      width:100%;
      height:79px;
      background-color:#F8F8F8;
      border-radius:10px;
      padding:15px 10px;
      display:flex;
      align-items:center;
    }
    .name{
      width:100%;
      display:flex;
      align-items:center;
      .text{
        font-size:${market_style.font.size.small1};
        font-weight:500;
        color:black;
      }
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
    .send{
      width:100%;
      min-height:31px;
      display:flex;
      bottom:0px;
    }
    .sendButton{
      min-width:58px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:20px;
      font-family:${market_style.font.size.small1};
      font-weight:500;
      background-color:#FF3838;
      border:none;
      outline:none;
    }
    .chat-list{
      width:100%;
      height:500px;
      border:1px solid #eaeaea;
      border-radius:10px;
      box-shadow: 2px 2px 5px #00000029;
      margin-top:10px;
      padding:20px 10px;
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .chat{
      width:100%;
      overflow-y:auto;
      height:100%;
      margin-bottom:20px;
      padding:0px 10px;
    }
`

const SendMessageTextarea = styled.div`
  width:100%;
  max-height:31px;
  min-height:31px;
  font-size:${market_style.font.size.mini2};
  text-align:left;
  line-height:27px;
  background-color:#E9E9E9;
  resize:none;
  border:none;
  border-radius:10px;
  outline:none;
  padding:5px;
  overflow:auto;
  margin-right:10px;
`;
let test = 1; 
class MessageList_mobile extends Component {
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
      connectedCheck: false,
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
   
    test = 1; 
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
      // window.location.href="/message/"+group_id;
    }, 250)
  }

  comfirmMsgAlarm = (from) => {
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
    const { MessageList,  } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
          <Detail visible={this.state.selectId==null?false:true}>
                <div className="close" onClick={()=>this.setState({selectId:null})}>x</div>
                <div className="peer">
                  <Face img={this.state.img} />
                  <div className="nick">{this.state.selectName}</div>
                  <div className={`circle `}/>
                </div>
                <div className="chat-list">
                  <div className="chat">
                  {this.state.render &&
                    <MessageDetailContainer id={this.state.msgId} targetUid={this.state.selectId} />}
                  </div>
                  {this.state.render && <React.Fragment>
                    <div className="send">
                      <SendMessageTextarea contentEditable="true" id="sendMsgBox"/>
                      <button type="button" className="sendButton" onClick={this.sendText}><div style={{ color: "white" }}>전송</div></button>
                  </div>
                  </React.Fragment>}
                </div>
          </Detail>
          <Wrapper_>
          <div className="header">
            <div className="search">
                <div className="search_label">대화상대 검색</div>
                <div className="search_input">
                <FormInput_mobile
                          type="text" name="search" placeholder={"회원의 닉네임을 입력해주세요"} validates={["MinLength2"]} getValue={this.getValue} value={this.state.searchform} />            <img alt="icon" src={Zoom} id="searchBox" className="zoomicon" onClick={this.onClickSearch}/>
                </div>
            </div>
              <div className="search_list" style={this.state.openMember ? { display: "block" } : { display: "none" }}>
                {this.props.members && this.props.members.map((item, index) => {
                  return (<div className="memberBox" key={`member${index}`} onClick={() => this.selectMember(item)}>{item.email}</div>);
                })}
              </div >
          </div>
          <div className="peerlist">
              {MessageList
              .sort((a, b) => new Date(b.update_time).getTime() - new Date(a.update_time).getTime())
              .map(peer =>
                <div className="peer" key={peer.uid} onClick={() => this.setMsgId(peer.uid, peer.friend_id, peer.friend_name, peer.s_img)}>
                  <Face img={peer.s_img} />
                  <div className="info">
                    <div className="name">
                      <div className="text">{peer.friend_name}</div>
                      <div className="last-date">{DateFormat(peer.update_time)}</div>
                    </div>
                    <div className="talk" dangerouslySetInnerHTML={{ __html: peer.message }}/>
                  </div>
                </div>
                )
                }
          </div>
          </Wrapper_>



        
      </React.Fragment>
    )
  }
}

export default MessageList_mobile;

                  {/* <div className="middle">
                    <div className="name">{peer.friend_name}</div>
                    <div className="last-message" dangerouslySetInnerHTML={{ __html: peer.message }}></div>
                    <div className="last-date">{DateFormat(peer.update_time)}</div>

                  </div>
                  <div className="date">
                    <div className="sent-date">{DateFormat(peer.update_time)}</div>
                    <div className="checker">{peer.noti > 0 ? `(${peer.noti})` : ``}</div>
                  </div> */}
{/* <Container>
<Wrapper>
  <Peers>
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
    {this.state.selectId ? (
      <React.Fragment>
        <div className="status">
          <Face img={this.state.img} />
          <div className="nick">{this.state.selectName}</div>
          <div className={`circle `}></div>
        </div>
        <div className="chat-list">
          {this.state.render &&
            <MessageDetailContainer id={this.state.msgId} targetUid={this.state.selectId} />}
        </div>
        <div className="chat-input">
          {this.state.render && <React.Fragment>
            <div className="border"></div>
            <div className="input-wrapper line">
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
</Wrapper>
</Container > */}
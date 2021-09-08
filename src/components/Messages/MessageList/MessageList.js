import React from 'react';
import plusImg from "source/message_find_person_plus_mark.svg";
import sendImg from "source/msg_send_btn.svg";
import noface from "source/thumbnail.png";

import styled from "styled-components";
import { Icon } from "semantic-ui-react";

import SearchMemberContainer from "containers/Commons/SearchMemberContainer/SearchMemberContainer"
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import Socket from "modules/Socket"

// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";


const Wrapper = styled.div`
  margin-top: ${90 + 25}px;
  margin-left: ${100 + 29}px;
  
  display: flex;
  flex-direction: row;

`;
const Peers = styled.div`
  // 
  width: 270px;
  height: 850px;
  background-color: #E9E9E9;
  display: flex;
  flex-direction: column;

  .header {
    width: 270px;
    height: 65px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 16px;
    padding-left: 24px;
    position: relative;

    .title {
      width: max-content;
      height: 28px;
      text-align: center;
      font-weight: medium;
      font-size: 20px;
      line-height: 28px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #4F4F4F;
      opacity: 1;
    }
    .plus {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .list {
    width: 265px;
    height: 100%;
    overflow: hidden scroll;
    padding: 5px;
    margin-right: 5px;
    margin-bottom: 5px;

    // scroll
    ::-webkit-scrollbar-track { background-color: transparent; }
    ::-webkit-scrollbar-track { background-color: transparent; }
    ::-webkit-scrollbar-thumb { background-color: transparent; }
    :hover{
      ::-webkit-scrollbar-track { background-color: transparent; }
      ::-webkit-scrollbar { width: 5px;  background-color: transparent; }
      ::-webkit-scrollbar-thumb { background-color: #FF0000; }
    }
  }
`;
const PlusIcon = styled.div`
  width: 65px;
  height: 65px;
  color: #707070;
  background: url(${plusImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 1.0;
  :hover {
    opacity: 0.5;
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
    display:${props => props.isSelectMsg === true ? "none" : "flex"}
  }
`;
const Person = styled.div`
  width: 277px;
  height: 90px;

  display: flex;
  flex-direction: row;
  
  &.selected { background-color: rgba(255,255,255,0.53); }

  // *{ border:1px solid red; }

  :hover {
    background-color: rgba(255,255,255,0.3);
    &.selected { background-color: rgba(255,255,255,0.53); }
  }
  .pic {
    position: relative;
    padding-top: 18px;
    padding-left: 22px;
    padding-right: 22px;
     
    .count {
      position: absolute;
      left: 60%;
      top: 20%;
      width: 22px;
      height: 22px;
      border-radius: 100%;
      text-align: center;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 500;
      line-height: 22px;
    }
    .thumbnail {
      width: 57px;
      height: 57px;
      background-image: url(${props => props.face});
      background-position: center center;
      background-size: cover;
      border-radius: 100%;
      border: 1px solid #912525;
      box-shadow: 7px 7px 1px 1px rgba(0, 0, 0, .1);
    }
  }
  .text {
    margin-top: 17px;
    margin-right: 7px;
    width: 169px; // width: 100%;
    height: 73px;
    display: flex;
    flex-direction: column;
    .nick {
      width: 100%;
      height: 19px;
      text-align: left;
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #4F4F4F;
      opacity: 1;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .recent { 
      margin-top: 3px;
      width: 100%;
      height: 19px;
      text-align: left;
      font-weight: medium;
      font-size: 14px;
      line-height: 19px;
      font-family: Noto Sans KR;
      letter-spacing: 0px;
      color: #4F4F4F;
      opacity: 1;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
 
    }
  }
`;
const MessageDetail = styled.div`

  margin-left: 23px;

  width: 1450px;
  height: 850px;

  background-color: #E9E9E9; 
  position: relative;

  .header {
    left: 25px;
    top: 16px;
    position: absolute;
    height: 27px;
    width: max-content;
    z-index: 1000;

    .title { 
      height: 27px;
      width: max-content;
      max-width: 800px;
      text-align: center;
      font-weight: medium;
      font-size: 20px;
      line-height: 27px;
      font-family: Noto Sans KR;
      letter-spacing: 0px;
      color: #4F4F4F;
      opacity: 1;

      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
    }
  }
  .messages {
    height: 100%;
    padding: 13px 17px 20px 37px;

    .list {
      height: 691px;
    }
    .send-wrap {
      width: 100%;
      height: 159px;
      border-top: 2px solid #707070;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .not-selected {
    padding-top: 25%;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
    color #4A4A4A;
  }
`;
const SendMessageTextarea = styled.div`
  width: 90%;
  height: 119px;
  background-color: #E9E9E9;
  resize: none;
  border: none;
  outline: none;
  padding: 20px;
  overflow: auto;

  text-align: left;
  font-weight: 300;
  font-size: 25px;
  line-height: 36px;
  font-family: Spoqa Han Sans Neo;
  letter-spacing: 0px;
  color: #4F4F4F;
  opacity: 1;
  // scroll
  ::-webkit-scrollbar-track { background-color: transparent; }
  ::-webkit-scrollbar-track { background-color: transparent; }
  ::-webkit-scrollbar-thumb { background-color: transparent; }
  :hover{
    ::-webkit-scrollbar-track { background-color: transparent; }
    ::-webkit-scrollbar { width: 5px;  background-color: transparent; }
    ::-webkit-scrollbar-thumb { background-color: #4F4F4F; }
  }
`;
const SendArrowButton = styled.div`

  margin-top: 52px;
  margin-right: 18px;

  width: 55px;
  height: 55px;
  background-image: url(${sendImg});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  cursor: pointer;
`;
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.innerWidth > 1920 ? 1920 : window.innerWidth,
      // msgValue: '',
      msgId: -1,
      selectId: null,
      selectName: null,
      openMember: false,
      showSearch: false,
      friendList: [],
      render: true,
      memberSearch: false,
    };
    // this.handleChangeMsgValue = this.handleChangeMsgValue.bind(this);
    // this.initMsgValue = this.initMsgValue.bind(this);
    this.handleClickSend = this.handleClickSend.bind(this);
    this.handleSelectMsgSummary = this.handleSelectMsgSummary.bind(this);
    this.handleOpenMember = this.handleOpenMember.bind(this);
    this.handleClickSearchMemberItem = this.handleClickSearchMemberItem.bind(this);
    this.handleCloseMember = this.handleCloseMember.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.getValue = this.getValue.bind(this);
  }
  async componentDidMount() {
    window.addEventListener("resize", this.handleResize);
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
        email: null, nick_name: this.props.name, uid: id
      })
      try {
        Socket.on("reload_msglist", () => {
          this.setState({ render: true })
        })
      } catch (err) {
        console.error(err);
      }
    }
    if (this.props.id && this.props.name) {
      this.setMsgId(-1, this.props.id, this.props.name)
    }
    if (this.props.ChatRooms && this.props.ChatRooms.length > 0) {
      for (let i = 0; i < this.props.ChatRooms.length; i++) {
        if (this.props.ChatRooms[i].count != null) {
          this.setMsgId(this.props.ChatRooms[i].uid, this.props.ChatRooms[i].friend_id, this.props.ChatRooms[i].friend_name);
          break;
        }
      }
    }
    document.getElementById("sendMsgBox") && document.getElementById("sendMsgBox").focus();
  }
  shouldComponentUpdate(nextProps) {
    setTimeout(() => { }, 100);
    if (JSON.stringify(this.props.id) !== JSON.stringify(nextProps.id)) {
      if (nextProps.id && nextProps.name) {
        let id = parseInt(nextProps.id, 10);
        this.selectMember({
          email: null,
          nick_name: nextProps.name,
          uid: id
        });
      }
    }
    return true;
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
    this.props.SearchMemberRequest(null, { key: value }, this.props.token);
  }
  selectMember = async (data) => {
    await this.setState({
      render: false
    });
    const index = this.state.friendList.indexOf(data.uid);
    console.log(this.state, this.props.MessageList, index);
    if (index === -1) {
      this.setState({
        selectId: data.uid,
        selectName: data.nick_name,
        openMember: false,
        msgId: -1,
        render: true
      });
    } else {
      this.setState({
        selectId: data.uid,
        selectName: data.nick_name,
        openMember: false,
        msgId: this.props.MessageList[index].uid,
        render: true
      });
    }
    // console.log("1111111111" + this.state.selectId);
  }
  setMsgId = async (group_id, user_id, user_name) => {
    await this.setState({
      msgId: group_id,
      selectId: user_id,
      selectName: user_name,
      openMember: false,
      render: false
    });
    this.setState({ render: true });
    await this.handleCloseMember();
    await document.getElementById("sendMsgBox") && await document.getElementById("sendMsgBox").focus();
  }
  onSubmitForm = async (data) => {
    if (this.state.selectId === null) {
      await alert("받는 사람을 지정해주세요.", "확인")
      return
    }
    // let msg = ``;
    const innerHtmlValue = document.getElementById("sendMsgBox").innerHTML;
    console.log(innerHtmlValue);

    if (innerHtmlValue === "") {
      await alert("텍스트를 입력해주세요.", "확인");
      return;
    }

    this.props.SendMessageRequest(this.props.token, { message: innerHtmlValue }, this.state.selectId)
      .then(async res => {
        if (res.data && res.data.success === true) {
          await this.props.GetMyMsgListRequest(this.props.token)
          await this.setState({ msgId: res.data.groupId, render: false });
        }
        this.setState({ render: true });
        this.props.history.replace("/message");
      });


    document.getElementById("sendMsgBox").innerHTML = "";
    // this.initMsgValue();
  }
  // handleChangeMsgValue(event) {
  //   this.setState({ msgValue: event.target.value })
  // }
  // initMsgValue() {
  //   this.setState({ msgValue: "" })
  // }
  handleClickSend() {
    console.log(this.props);
  }
  handleSelectMsgSummary(select_id, select_name, msgID) {
    this.setState(state => ({ selectId: select_id, selectName: select_name, msgId: msgID }));
  }
  handleOpenMember() {
    this.setState({ showSearch: !this.state.showSearch });
  }
  handleClickSearchMemberItem(id, name, event) {
    this.setMsgId(-2, id, name);
    this.setState({ memberSearch: false });
  }
  handleCloseMember() {
    this.setState({ showSearch: false })
  }
  handleResize() {
    const w = window.innerWidth > 1920 ? 1920 : window.innerWidth;
    this.setState({ w: w });
  }

  // member search(+) button
  searchRef = React.createRef();
  checkClickOutSideMemberSearch = event => {

    console.log(
      event,
      this.searchRef.current,
      event.target);

    if (this.searchRef.current === null) return;
    if (!this.searchRef.current.contains(event.target)) {
      document.removeEventListener("mousedown", this.checkClickOutSideMemberSearch);
      this.setState({ memberSearch: false })
    }
  }
  openMemberSearch = event => {
    document.addEventListener("mousedown", this.checkClickOutSideMemberSearch);
    this.setState({ memberSearch: true })
  }

  // added
  onClickPerson = async (uid, fid, fname) => {
    const { userInfo, token } = this.props;
    await userInfo &&
      await this.props.GetMyChatRoomsListRequest(token);
    await this.setMsgId(uid, fid, fname);
  }

  render() {
    // const { w } = this.state;
    const maxH = 869 + 25 + 48 + 8 + 55;
    const H = window.innerHeight < maxH ? window.innerHeight - 200 : 869;
    console.log(this.props, this.state)
    return (<React.Fragment>
      <Wrapper>

        <Peers>
          <div className="header">
            <div className="title">받은 메세지함</div>
            <div className="plus">
              <PlusIcon
                isSelectMsg={this.state.msgId == -1 ? false : true}
                onClick={this.openMemberSearch} />
            </div>
          </div>
          {/* <div onClick={() => { this.setMsgId(-1, this.props.id, this.props.name) }} className="mobilelistIcon"><Icon className="unordered list" size="big" color="grey" /></div> */}
          {this.state.memberSearch &&
            (<SearchMemberBox ref={this.searchRef}>
              <SearchMemberContainer inputWidth={100} marginLeft={0} id="searchRect" addMemberItem={this.handleClickSearchMemberItem} />
            </SearchMemberBox>)}

          <div className="list">
            {this.props.ChatRooms
              && this.props.ChatRooms.map((item, index) =>
                <Person
                  key={index}
                  face={item.thumbnail || noface}
                  className={this.state.msgId === item.uid ? "selected" : ""}
                  onClick={(e) => this.onClickPerson(item.uid, item.friend_id, item.friend_name)}
                >

                  <div className="pic">
                    {item.count > 0
                      ? <div style={{ backgroundColor: "red" }} className="count">
                        {item.count > 99 ? 99 : item.count}
                      </div>
                      : null}
                    <div className="thumbnail" />
                  </div>

                  <div className="text">
                    <div className="nick">{item.friend_name}</div>

                    <div className="recent"
                      dangerouslySetInnerHTML={{
                        __html: item.recent && item.recent.indexOf("<img") != -1
                          ? `<Icon className="picture" size="mini"/>사진첨부`
                          : item.recent && item.recent.replace(/<br\/>/g, "")
                      }} />

                  </div>
                </Person>)}
          </div>
        </Peers>

        <MessageDetail>
          {this.state.msgId !== -1
            ? <React.Fragment>
              {/* title */}
              <div className="header">
                <div className="title">
                  {this.state.selectName}
                </div>
              </div>

              {/* content */}
              <div className="messages">
                <div className="list">
                  {this.state.render && <MessageDetailContainer height={691} repaint={this.state.render} id={this.state.msgId} />}
                </div>
                <div className="send-wrap">
                  <SendMessageTextarea contentEditable={true} id="sendMsgBox" />
                  <SendArrowButton onClick={this.onSubmitForm} />
                </div>
              </div>

            </React.Fragment>
            : <div className="not-selected">
              오른쪽 목록에서 대화상대를 선택하시면 상대방과의 <br />
              대화내용을 보실 수 있습니다.
            </div>}
        </MessageDetail>

      </Wrapper>

    </React.Fragment >);
  }
}

export default Messages;

/*
       <MainBox>
          <div className="mainBanner bg_gray">
            <div className="label font_big font_bold">메시지함</div>
          </div>
          <div className="mainContent flexBox justifyContent">
            <div className="wrapper border_radius">
              <RoomListBox isSelectMsg={this.state.msgId === -1 ? false : true}>
                <div className="header">
                  <div className="header-item fixed">
                    <div className="fitBox font_big font_bold">받은 메시지함</div>
                    <PlusIcon   /></div>
                  
                <div className="roomList">
                  <SummaryList id="searchRect">
                    {this.props.ChatRooms && this.props.ChatRooms.length > 0 &&
                      this.props.ChatRooms.map(chat => chat.recent != null ?
                        <div key={chat.uid} onClick={async () => { await this.props.userInfo && await this.props.GetMyChatRoomsListRequest(this.props.token); await this.setMsgId(chat.uid, chat.friend_id, chat.friend_name) }}>
                          <SummaryItem noti={chat.count && chat.count > 0} opacityON={this.state.selectId === chat.friend_id} s_img={chat.thumbnail || noImage} friend_name={chat.friend_name} message={chat.recent} />
                        </div> : null)}
                  </SummaryList>
                </div>
              </RoomListBox>
              <WhiteBox />
              <ChatBox isSelectMsg={this.state.msgId == -1 ? false : true}>
                <div className="header"><div className="fitBox font_big font_bold">{this.state.selectName}</div></div>
                <div className="wrapper">
                  <div className="content">
                    {this.state.render && <MessageDetailContainer height={H - (64 + 196)} repaint={this.state.render} id={this.state.msgId} />}
                  </div>
                  <div className="send">
                    <div className="sendBox">
                      <SendMessageTextarea contentEditable="true" id="sendMsgBox">
                      </SendMessageTextarea>
                    </div>
                    <SendButton className="cursor_pointer">
                      <div className="sendButton_label">전송하기</div></SendButton>
                  </div>
                </div>
              </ChatBox>
            </div>
          </div>
        </MainBox>
*/
const MainBox = styled.div`
  width:100%;
  height:${window.innerHeight * 0.8}px;
  min-height:600px;
  margin-top:10px;
  margin-bottom:20px;
  *{
    // border:1px solid black;
    font-family:Noto Sans KR;
    color:#707070;
  }
  .flexBox_column{display:flex;flex-direction:column;}
  .flexBox_row{display:flex;}
  .content_center{justify-content:center;}
  .items_center{align-items:center;}
  .bg_gray{background-color:#EFEFEF}
  .font_big{font-size:20px};
  .font_middle{font-size:18px;}
  .font_small{font-size:16px;}
  .font_mini{font-size:12px;}
  .cursor_pointer{cursor:pointer;}
  .font_fit{font-weight:300;}
  .font_bold{font-weight:500;}
  .border_radius{border-radius:25px;}
  .fitBox{width:max-content;height:max-content;}

  .mainBanner{
    width:100%;
    height:40px;
    display:flex;
    justify-content:center;
    align-items:center;

    .label{
      min-width:90%;
    }
  }
  .mainContent{
    width:100%;
    height:100%;
    margin-top:25px;
    display:flex;
    justify-content:center;
    position:relative;
  }
  .wrapper{
    width:90%;
    height:100%;
    display:flex;
    overflow:hidden;
  }
  .mobilelistIcon{
    padding:0px 5px;
    width:50px;
    height:50px;
    display:none;
    justify-content:center;
    align-items:center;
  }
  @media only screen and (min-width : 500px) and (max-width:1024px) {
    margin-top:50px;
    .wrapper{
      height:98%;
      flex-direction:column;
    }
  }
  @media only screen and (min-width : 0px) and (max-width:500px) {
    
    // border:1px solid black;
    min-height:500px;
    margin-top:100px;
    .wrapper{
      height:90%;
      flex-direction:column;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
    min-height:300px;
    margin-bottom:0px;
    height:${window.innerHeight * 0.7}px;
    .mobilelistIcon{
      display:flex;
    }
    .mainBanner{
      display:none;
    }
    .wrapper{
      width:100%;
      height:100%;
    }
  }
`;
const RoomListBox = styled.div`
    width:25%;
    min-width:375px;
    height:100%;
    background-color:#EFEFEF;
    padding:25px 40px;
    z-index:500;
    .header{
      width:100%;
      display:flex;
      justify-content:space-between;
      align-items:center;
      position:relative;

      .header-item{
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
      }
      // .fixed{
      //   position:fixed;
      // }
      .opacity_trans{opacity:0;}
    }
    .roomList{
      width:100%;
      height:100%;
    }
    @media only screen and (min-width : 500px) and (max-width:1024px) {
      padding:10px 40px;
      width:100%;
      height:40%;
      overflow:hidden;
    }
    @media only screen and (min-width : 0px) and (max-width:500px) {
      padding:5px 40px;
      width:100%;
      height:40%;
      overflow:hidden;
    }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
      height:${props => props.isSelectMsg === true ? "60px" : "100%"};
      overflow:hidden;
  }
`;
const WhiteBox = styled.div`
    width:1%;
    min-width:5px;
    height:100%;
    background-color:white;
    @media only screen and (min-width : 500px) and (max-width:1024px) {
      width:100%;
      height:1%;
    }
    @media only screen and (min-width : 0px) and (max-width:500px) {
      width:100%;
      height:1%;
    }
`;
const ChatBox = styled.div`
    // *{
    //   border:1px solid black;
    // }
    width:74%;
    height:100%;
    background-color:#EFEFEF;
    position:relative;
    display:flex;
    flex-direction:column;
    .header{
      margin-top:25px;
      margin-left:40px;
      width:100%;
      height:50px;
      display:flex;
      align-items:center;
    }
    .wrapper{
      width:100%;
      height:100%;
      // border:1px solid blue;
    }
    .content{
      width:100%;
      height:75%;
      display:flex;
      justify-content:center;
      padding:0px 2%;
    }
    .send{
      position:absolute;
      bottom:0px;
      width:100%;
      height:25%;
      display:flex;
      justify-content:center;
      .sendBox{
        min-width:90%;
        height:100%;
        border-top:1px solid #707070;
        background-color:#dddddd;
      }
    }
    @media only screen and (min-width : 500px) and (max-width:1024px) {
      width:100%;
      min-height:70%;
      .send{
        absolute:fixed;
        height:25%;
      }
    }
    @media only screen and (min-width : 0px) and (max-width:500px) {
      width:100%;
      min-height:70%;
      .send{
        absolute:fixed;
        height:25%;
      }
    }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
      and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
        display:${props => props.isSelectMsg === true ? "flex" : "none"}
        .content{
          padding: 0px 5%;
        }
        .header{
          margin-top:0px;
        }
    }
  `

const SearchMemberBox = styled.div`
  width:100%;
  height:max-content;
  // position:absolute;
  // top:50px;
  z-index:900;
`;

const SendButton = styled.div`
  min-width:10%;
  height:100%;
  background-color:white;
  border:1px solid #EFEFEF;
  border-radius:0px 0px 25px 0px;
  border-top:1px solid #707070;
  display:flex;
  justify-content:center;
  align-items:center;
  &:hover{
    opacity:0.7;
  }
  .sendButton_label{
    font-family:Noto Sans KR;
    font-size:18px;
    font-weight:500;
    color:#707070;
  }
`;

const SummaryList = styled.div`
  width:100%;
  height:100%;
  position:relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top:15px;
  padding-bottom:50px;
  &:hover {
    overflow-y:overlay;
  }
  @media only screen and (min-width : 500px) and (max-width:1024px) {
    padding-top:5px;

  }
  @media only screen and (min-width : 0px) and (max-width:500px) {
    padding-top:5px;
    overflow-y:auto;
  }
`;
const SummaryItemBox = styled.div`
  *{
    cursor:pointer;
  }
  cursor:pointer;
  position:relative;
  // overflow:hidden;
  width:100%;
  height:70px;
  margin-bottom:30px;
  opacity:${props => props.isSelect === true ? 1 : 0.5};
  display:flex;
  .summary_box{
    width:75%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding:10px;
  }
  .summary_Name{
    width:100%;
    height:29px;
    font-size:17px;
    font-weight:500;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:left;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  .summary_message{
    width:100%;
    height:28px;
    font-size:17px;
    font-weight:100;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:left;
    line-height:29px;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  @media only screen and (min-width : 500px) and (max-width:1024px) {
    padding-top:5px;
    margin-bottom:0px;
    height:max-content;
    .summary_message{
      // display:none;
    }
  }
  @media only screen and (min-width : 0px) and (max-width:500px) {
    padding-top:5px;
    margin-bottom:0px;
    height:max-content;
    .summary_message{
      display:none;
    }
  }
`;
const SummaryIcon = styled.div`
  min-width:70px;
  min-height:70px;
  max-width:70px;
  max-height:70px;
  border-radius:50%;
  background:url(${props => props.imageURL});
  background-size:cover;
  background-position:center center;
  .noti{
    width:10px;
    height:10px;
    background-color:#FF0000;
    border-radius:50%;
  }
  @media only screen and (min-width : 0px) and (max-width:500px) {
    min-width:35px;
    min-height:35px;
    max-width:35px;
    max-height:35px;
  }
`;

function SummaryItem(props) {
  return (
    <SummaryItemBox isSelect={props.opacityON}>
      <SummaryIcon imageURL={props.s_img}>
        {props.noti ? <div className="noti" /> : undefined}
      </SummaryIcon>
      <div className="summary_box">
        <div className="summary_Name">{props.friend_name}</div>
        {
          props.message && props.message.indexOf("<img") != -1 ?
            <div className="summary_message">
              <Icon className="picture" size="large" />사진첨부
            </div>
            :
            <div className="summary_message"
              dangerouslySetInnerHTML={{ __html: props.message && props.message.indexOf("<img") != -1 ? `<Icon className="picture" size="mini"/>사진첨부` : props.message.replace(/<br\/>/g, "") }} />
        }
        {/* <div className="summary_message" 
        dangerouslySetInnerHTML={{ __html: props.message && props.message.indexOf("<img")!=-1? `<Icon className="picture" size="mini"/>사진첨부`: props.message.replace(/<br\/>/g, "") }}/> */}
      </div>
    </SummaryItemBox>);
}

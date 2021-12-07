import React from 'react';
import noImage from "source/thumbnail.png";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import new_logo_plus2 from "source/new_logo_plus2.svg";
import opendesign_style from "opendesign_style";
import sendImg from "source/msg_send_btn.svg";
import Socket from "modules/Socket";
import SearchForm from "components/Header/SearchForm";
import SearchMemberContainer from "containers/Commons/SearchMemberContainer/SearchMemberContainer";
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import Cross from "components/Commons/Cross";

// import { confirm } from "components/Commons/Confirm/Confirm";
// import { alert } from "components/Commons/Alert/Alert";

const Wrapper = styled.div`
  // *{border:1px solid red;}

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .search {
    margin: auto;
    margin-top: 9px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .close-box {
    width: max-content;
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px; 
  }
`;
const MessageListWrapper = styled.div`
  margin: auto;
  margin-top: 8px;
  width: 344px;
  height: 95vh;
  background-color: #E9E9E9;
  
  .header {
    width: 100%;
    height: 65px;
    align-items: center;
    justify-content: space-between;

    .text {
      margin-left: 56px;
      height: 28px;
      text-align: center;
      font-weight: medium;
      font-size: 20px;
      line-height: 28px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #4F4F4F;
    }
    .plus {
      margin-left: auto;
      margin-right: 12px;
      background-image: url(${new_logo_plus2});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      width: 65px;
      height: 65px;
    }
  }
`;
const SummaryList = styled.div`
  width: 100%;
  // height: 500px;
  height: ${window.innerHeight - 200}px;
  position: relative;
  overflow-y: overlay;
  overflow-x: hidden;

  ::-webkit-scrollbar-track {
	  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	  // background-color: red;
	  background-color: transparent;
  }
  ::-webkit-scrollbar {
	  width: 3px;  
	  // background-color: red;
	  // background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
	  background-color: red;
  }
`;
const SummaryIcon = styled.div`
  min-width:57px;
  min-height:57px;
  max-width:57px;
  max-height:57px;
  border-radius:50%;
  background:url(${props => props.imageURL});
  background-color:white;
  background-size:cover;
  background-position:center center;
  box-shadow: 8px 8px 6px #00000029;
  .noti {
    position: absolute;
    left: 60px;
    width: 22px;
    height: 22px;
    background-color: #F00;
    border-radius: 100%;
    color: white;
    text-align: center;
    font-weight: 500;
  }
`;
const SummaryItemBox = styled.div`
  *{
    cursor:pointer;
  }
  cursor:pointer;
  position:relative;
  width:100%;
  opacity:${props => props.isSelect === true ? 1 : 0.5};
  display:flex;
  padding:15px 21px;
  .summary_box{
    width:75%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding-left:22px;
  }
  .summary_Name{
    width:100%;
    height:19px;
    font-size:14px;
    font-weight:500;
    font-family:Spoqa Han Sans Neo;
    color:#4F4F4F;
    text-align:left;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  .summary_message{
    width:100%;
    height:22px;
    font-size:14px;
    font-weight:200;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:left;
    line-height:19px;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  @media only screen and (min-width : 0px) and (max-width:1024px) {
    padding-top:5px;
    margin-bottom:0px;
    height:max-content;
    .summary_message{
      // display:none;
    }
  }
  &:hover{
    background-color:rgb(255,255,255,0.53);
  }
`;
const SummaryItem = (props) =>
  <SummaryItemBox isSelect={props.opacityON}>
    <SummaryIcon imageURL={props.s_img}>
      {props.noti ? <div className="noti" >{props.noti > 99 ? 99 : props.noti}</div> : undefined}
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
  </SummaryItemBox>;
const SearchMemberBox = styled.div`
  width: 300px;
  padding-left:10px;
  padding-right:10px;
  height:max-content;
  position:absolute;
  top:50px;
  z-index:900;
`;
const SendMessageTextarea = styled.div`
  height: 75%;
  font-size: 18px;
  text-align: left;
  line-height: 27px;
  background-color: #EFEFEF;
  resize: none;
  border: none;
  outline: none;
  padding: 5px;
  overflow: auto;
`;
const MessageDetailWrapper = styled.div`
  position: absolute;
  top: ${8 + 9 + 22}px;
  left: 9px;
  width: ${window.innerWidth - (8 * 2)}px;
  height: ${window.innerHeight - 80}px;
  background-color: #E9E9E9;
  display:flex;
  flex-direction:column;
  .close-box {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .header {
    width: 100%;
    height: 29px;
    text-align: center;
    font-weight: medium;
    font-size: 20px;
    line-height: 29px;
    font-family: Noto Sans KR;
    letter-spacing: 0px;
    color: #4F4F4F;
    
  }
  .wrapper{
    width:100%;
    height: 95%;
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
    height:20%;
    display:flex;
    // justify-content:center;
    padding: 10px 10px;
    .sendBox{
      min-width:100%;
      height:100%;
      border-top:1px solid #707070;
      background-color:#EFEFEF;
    }
    .sendButton_wrap{
      position:absolute;
      display:flex;
      align-items:center;
      min-width:55px;
      max-width:55px;
      max-height:130px;
      height:100%;
      right:3%;
    }
    .sendButton{
      min-width:55px;
      min-height:55px;
      max-width:55px;
      max-height:55px;
      cursor:pointer;
      background-image:url(${sendImg});
      background-size:contain;
    }
  }
`;



export default class MessagesListMobile extends React.Component {
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
  async handleClickSearchMemberItem(id, name, event) {
    // this.setMsgId(-2, id, name);
    let room_id = -2;
    await this.props.ChatRooms && this.props.ChatRooms.length > 0 &&
      this.props.ChatRooms.map(chat => {
        if (chat.friend_id == id && chat.friend_name == name) {
          room_id = chat.uid;
        }
      }
      )
    await this.props.userInfo && await this.props.GetMyChatRoomsListRequest(this.props.token); await this.setMsgId(room_id, id, name);
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

  render() {
    return (<Wrapper>

      <div className="search">
        <SearchForm formWidth={199} visible={1} transparent={false} />
      </div>

      <MessageListWrapper>

        {/* header */}
        <div className="header flex-row">
          <div className="text">받은 메세지함</div>
          <a
            // isSelectMsg={this.state.msgId == -1 ? false : true}
            onClick={this.openMemberSearch}>
            <div className="plus" />
          </a>
          {this.state.memberSearch &&
            (<SearchMemberBox ref={this.searchRef}>
              <SearchMemberContainer
                inputWidth={100} marginLeft={0} id="searchRect"
                addMemberItem={this.handleClickSearchMemberItem} />
            </SearchMemberBox>)}
        </div>

        {/* list */}
        <SummaryList id="searchRect">
          {this.props.ChatRooms && this.props.ChatRooms.length > 0 &&
            this.props.ChatRooms.map(chat => chat.recent != null ?
              <div key={chat.uid} onClick={async () => { await this.props.userInfo && await this.props.GetMyChatRoomsListRequest(this.props.token); await this.setMsgId(chat.uid, chat.friend_id, chat.friend_name) }}>
                <SummaryItem noti={chat.count} opacityON={this.state.selectId === chat.friend_id} s_img={chat.thumbnail || noImage} friend_name={chat.friend_name} message={chat.recent} />
              </div> : null)}
        </SummaryList>

      </MessageListWrapper>

      {this.state.msgId != -1
        ? <MessageDetailWrapper>
          <div className="close-box" onClick={() => this.setState({ msgId: -1 })} >
            <Cross angle={45} color={"#707070"} weight={3} width={22} height={22} />
          </div>
          <div className="header">
            {this.state.selectName}

          </div>

          <div className="wrapper">
            <div className="content">
              {this.state.render
                && <MessageDetailContainer
                  height={window.innerHeight - (300)}
                  repaint={this.state.render}
                  id={this.state.msgId} />}
            </div>

            <div className="send">
              <div className="sendBox">
                <SendMessageTextarea
                  contentEditable="true"
                  id="sendMsgBox" />
              </div>
              <div className="sendButton_wrap">
                <div
                  className="sendButton"
                  onClick={this.onSubmitForm} />
              </div>
            </div>
          </div>
        </MessageDetailWrapper>
        : null}

    </Wrapper >);
  }
};
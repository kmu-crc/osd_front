
import React from 'react';
import plusImg from "source/plus_cross_gray.png";
import noImage from "source/thumbnail.png"
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

import SearchMemberContainer from "containers/Commons/SearchMemberContainer/SearchMemberContainer"
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import Socket from "modules/Socket"

// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import { MyMenu, MyProfile } from 'components/MyDetail';

const Wrapper = styled.div`
  margin-top: 90px;
  margin-left: 100px;

  display: flex;
  flex-direction: row;

  padding-left: 29px;
  padding-top: 25px;

  // .top-margin { margin-top: 25px; }
  // .space-0{ margin-left: 41px; }
  // .space-1{ margin-left: 48px; }
  // .space-2{ margin-left: 22px; border-right: 1px solid #707070; }
  // .space-3{ margin-left: 58px; }
`;
const MainBox = styled.div`
  width: 100%;
  height: ${window.innerHeight * 0.8}px;
  min-height: 600px;
  *{
    // border: 1px solid black;
    font-family: Noto Sans KR;
    color: #707070;
  }
  .flexBox_column{ display: flex; flex-direction: column; }
  .flexBox_row{ display: flex; }
  .content_center{ justify-content: center; }
  .items_center{ align-items: center; }
  .bg_gray{ background-color: #EFEFEF; }
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
    width: 100%;
    height: 40px;
    display: flex;
    // justify-content: center;
    // align-items: center;

    .label {
      width: max-content;
      height: 40px;
      text-align: center;
      font-weight: medium;
      font-size: 28px;
      line-height: 40px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #000000;
      opacity: 1;
    }
  }
  .mainContent{
    width:100%;
    height:100%;
    // margin-top:25px;
    display:flex;
    // justify-content:center;
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
      height:90%;
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
    padding: 16px 18px;
    z-index:500;

    .title {
      width: 126px;
      height: 27px;
      text-align: center;
      font-weight: medium;
      font-size: 20px;
      line-height: 27px;
      font-family: Noto Sans KR;
      letter-spacing: 0px;
      color: #4F4F4F;
      opacity: 1;
    }
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
      // margin-left:40px;
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
`;
const SearchMemberBox = styled.div`
  width:100%;
  height:max-content;
  position:absolute;
  top:50px;
  z-index:900;
`;
const PlusIcon = styled.div`
  width: 50px;
  height: 50px;
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
const SendMessageTextarea = styled.div`
  max-width:100%;
  min-width:100%;
  height:100%;
  font-size:18px;
  // font-weight:500;
  // color:#707070;
  text-align:left;
  line-height:27px;
  background-color:#dddddd;
  resize:none;
  border:none;
  outline:none;
  padding:20px;
  overflow:auto;
  @media only screen and (min-width : 780px) and (max-width:1440px) {

  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    height:100%;
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
    border: 1px solid red;
    cursor: pointer;
  }
  cursor: pointer;
  position:relative;
  // overflow:hidden;
  width: 100%;
  height: 57px;
  margin-bottom: 30px;
  margin-right: 23px;
  margin-top: 4px;

  // opacity: ${props => props.isSelect === true ? 1 : 0.5};
  &.is_selected {
    background: #FFFFFF; // 0% 0% no-repeat padding-box;
    opacity: 0.53;
  }
  display: flex;
  
  .summary_box{
    width:75%;
    height:100%;
    margin-left: 23px;
    // display:flex;
    // flex-direction:column;
    // justify-content:space-between;
    // padding:10px;
  }
  .summary_Name{
    width: 100%;
    height: 19px;
    text-align: center;
    font-weight: medium;
    font-size: 14px;
    line-height: 19px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #4F4F4F;
    opacity: 1;
    text-align:left;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  .summary_message{
    width:100%;
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
  min-width: 57px;
  min-height: 57px;
  max-width: 57px;
  max-height: 57px;
  border-radius: 100%;
  background: url(${props => props.imageURL});
  background-size: cover;
  background-position: center center;
  border: 1px solid Maroon;
  position: relative;

  .noti {
    width: 25px;
    height: 25px;
    background-color: #FF0000;
    border-radius: 100%;
    text-align: center;
    color: white;
    position: absolute;
    right: -10%;
    top: -10%;
  }
  @media only screen and (min-width : 0px) and (max-width:500px) {
    min-width: 35px;
    min-height: 35px;
    max-width: 35px;
    max-height: 35px;
  }
`;

function SummaryItem(props) {
  return (
    <SummaryItemBox className={props.opacityON ? "is_selected" : ""}>
      <SummaryIcon imageURL={props.s_img}>
        {props.noti ? <div className="noti" >{props.noti}</div> : undefined}
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
              dangerouslySetInnerHTML={{ __html: props.message && props.message.indexOf("<img") != -1 ? `<Icon className="picture" />사진첨부` : props.message.replace(/<br\/>/g, "") }} />
        }
        {/* <div className="summary_message" 
        dangerouslySetInnerHTML={{ __html: props.message && props.message.indexOf("<img")!=-1? `<Icon className="picture" size="mini"/>사진첨부`: props.message.replace(/<br\/>/g, "") }}/> */}
      </div>
    </SummaryItemBox>);
};


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

  render() {
    // const { w } = this.state;
    const { userInfo, MyDetail, Count, ChatRooms } = this.props;

    console.log({ userInfo, MyDetail, Count, ChatRooms });

    const maxH = 869 + 25 + 48 + 8 + 55
    const H = window.innerHeight < maxH ? window.innerHeight - 200 : 869

    return (<Wrapper >

      {/* <div className="space-0 top-margin">&nbsp;</div>
      <div className="top-margin">
        <MyMenu
          Count={Count}
          tab={"message"}
          changeTab={this.changeTab}
          nickName={(userInfo && userInfo.nickName) || "회원"}
        />
      </div>

      <div className="space-1 top-margin">&nbsp;</div>
      <div className="top-margin">
        <MyProfile
          Count={Count}
          tab={"message"}
          changeTab={this.changeTab}
          userInfo={userInfo}
          MyDetail={MyDetail}
        />
      </div>

      <div className="space-2 top-margin">&nbsp;</div>

      <div className="space-3 top-margin">&nbsp;</div>
      <div className="top-margin"> */}

      <MainBox>
        {/* <div className="mainBanner">
          <div className="label font_big font_bold">메세지</div>
        </div> */}
        <div className="mainContent flexBox">
          <div className="wrapper">
            <RoomListBox isSelectMsg={this.state.msgId === -1 ? false : true}>
              <div className="header">
                <div className="header-item fixed">
                  <div className="title">받은 메세지함</div>
                  <PlusIcon isSelectMsg={this.state.msgId == -1 ? false : true} onClick={this.openMemberSearch} /></div>
                <div onClick={() => { this.setMsgId(-1, this.props.id, this.props.name) }} className="mobilelistIcon"><Icon className="unordered list" size="big" color="grey" /></div>
                {this.state.memberSearch &&
                  (<SearchMemberBox ref={this.searchRef}>
                    <SearchMemberContainer inputWidth={100} marginLeft={0} id="searchRect" addMemberItem={this.handleClickSearchMemberItem} />
                  </SearchMemberBox>)}
              </div>
              <div className="roomList">
                <SummaryList id="searchRect">
                  {ChatRooms && ChatRooms.length > 0 &&
                    ChatRooms.map(chat => chat.recent != null ?
                      <div key={chat.uid}
                        onClick={async () => {
                          await userInfo && await this.props.GetMyChatRoomsListRequest(this.props.token);
                          await this.setMsgId(chat.uid, chat.friend_id, chat.friend_name);
                        }}>
                        <SummaryItem
                          noti={chat.count}
                          opacityON={this.state.selectId === chat.friend_id}
                          s_img={chat.thumbnail || noImage}
                          friend_name={chat.friend_name}
                          message={chat.recent}
                        />
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
                  <SendButton className="cursor_pointer" onClick={this.onSubmitForm}>
                    <div className="sendButton_label">전송하기</div></SendButton>
                </div>
              </div>
            </ChatBox>
          </div>
        </div>
      </MainBox>
      {/* </div> */}

    </Wrapper>);
  }
};

export default Messages;

// const MessageBox = styled.div`
//   width:91%;
//   height:100%;
//   background-color:#EFEFEF;
//   border-radius:25px;
//   display:flex;
//   justify-contnet:flex-start;
//   flex-direction:row;
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//       flex-direction:column;
//   }
// `
// const NavSection = styled.div`
//   min-width:400px;
//   width:25%;
//   height:100%;
//   display:flex;
//   flex-direction:column;
//   overflow:hidden;
//   .NavHeader{
//     width:100%;
//     height:8.5%;
//     padding-left:54px;
//     padding-right:20px;
//     display:flex;
//     justify-content:space-between;
//     align-items:flex-end;
//     .Nav_label{
//       height:50px;
//       line-height:50px;
//       font-size:20px;
//       font-family:Noto Sans KR;
//       font-weight:500;
//       color:#707070;
//     }
//     }
//   }
//   .NavContent{
//     height:91.5%;
//     width:100%;
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {

//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//       width:100%;
//       height:35%;
//       .NavHeader{
//         height:50px;
//       }
//       .NavContent{
//         height:90%;
//       }
//   }
// `
// const WhiteLine = styled.div`
//   min-width:7px;
//   height:100%;
//   background-color:white;
//   @media only screen and (min-width : 780px) and (max-width:1440px) {

//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     max-height:7px;
//     min-height:7px;
//     width:100%;
//   }
// `
// const AsideSection = styled.div`
//   width:100%;
//   height:100%;
//   display:flex;
//   flex-direction:column;
//   .asideHeader{
//     width:100%;
//     height:8%;
//     padding-left:54px;
//     padding-right:20px;
//     display:flex;
//     justify-content:space-between;
//     align-items:flex-end;
//     .asideHeader_label{
//       height:50px;
//       line-height:50px;
//       font-size:20px;
//       font-family:Noto Sans KR;
//       font-weight:500;
//       color:#707070;
//     }
//   }
//   .asideContent{
//     width:100%;
//     height:69%;
//     display:flex;
//     justify-content:center;
//     .aside_messageList{
//       width:94%;
//       height:100%;
//     }
//   }
//   .asideSend{
//     padding-bottom:26px;
//     width:100%;
//     height:25%;
//     display:flex;
//     justify-content:center;
//     .sendBox{
//       width:85%;
//       height:100%;
//       border-top:1px solid #707070;
//       background-color:#dddddd;
//     }
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     .asideHeader{
//       height:50px;
//     }
//     .asideContent{
//       height:100%;
//     }
//   }
// `



// import React from 'react';
// import styled from "styled-components";

// import plusImg from "source/plus_cross_gray.png";
// import noface from "source/thumbnail.png"
// import { Icon } from "semantic-ui-react";
// import SearchMemberContainer from "containers/Commons/SearchMemberContainer/SearchMemberContainer";
// import Socket from "modules/Socket";
// // import { confirm } from "components/Commons/Confirm/Confirm";
// import { alert } from "components/Commons/Alert/Alert";
// import opendesign_style from "opendesign_style";

// import { MyMenu, MyProfile } from 'components/MyDetail';
// import MessageDetailContainer from "containers/Messages/MessageDetailContainer";


// const Title = styled.div`
//   margin-left: 59px;
//   width: 78px;
//   height: 40px;
//   text-align: center;
//   font-size: 28px;
//   line-height: 40px;
//   font-weight: medium;
//   font-family: Spoqa Han Sans Neo;
//   letter-spacing: 0px;
//   color: #000000;
//   opacity: 1;
// `;
// const Peers = styled.div`
//   padding: 16px 11px 16px 18px;
//   width: 270px;
//   height: 851px;
//   background-color: #E9E9E9;
//   overflow-y: scroll;

//   .title {
//     margin-bottom: 22.5px;
//     width: 126px;
//     height: 27px;
//     text-align: center;
//     font-weight: medium;
//     font-size: 20px;
//     line-height: 27px;
//     font-family: Noto Sans KR;
//     letter-spacing: 0px;
//     color: #4F4F4F;
//     opacity: 1;
//   }

//   // scroll
//   // width
//   ::-webkit-scrollbar {
//     padding: 10px;
//     width: 7px;
//   }
//   // track
//   ::-webkit-scrollbar-track {
//     background: rgba(233, 233, 233, 0.2);
//   }
//   // handle
//   ::-webkit-scrollbar-thumb {
//     background: #F00;
//   }
//   // handle on hover
//   ::-webkit-scrollbar-thumb:hover {
//     background: #F00000;
//   }
// `;
// const Wrapper = styled.div`
//   margin-left: 100px;
//   margin-top: ${90 + 24}px;
//     *{border: 1px solid blue;}

//   display: flex;
//   flex-direction: row;

//   .space-0 {
//     margin-left: 41px;
//   }
//   .space-1 {
//       margin-left: 48px;
//   }
//   .space-2 { 
//       margin-left: 39px;
//       margin-top: 62px;
//       width: 0px;
//       height: 871px;
//       border-left: 2px solid #CCCCCC;
//       opacity: 1;
//   }

//   .wrapper{
//     .title {
//       // margin-top: 24px;
//       width: 78px;
//       height: 40px;
//       text-align: center;
//       font-weight: medium;
//       font-size: 28px;
//       line-height: 40px;
//       font-family: Spoqa Han Sans Neo;
//       letter-spacing: 0px;
//       color: #000000;
//       opacity: 1;
//     }
//     .peer-and-message {
//       display: flex;
//       flex-direction: row;

//       .peers { }
//       .message { }
//     }
//   }
// `;
// const MessageDetail = styled.div`
//   // margin-left: 23px;
//   width: 788px;
//   height: 851px;
//   display: flex;
//   flex-direction: row;
//   border: 1px solid green;
//   background: #E9E9E9 0% 0% no-repeat padding-box;
//   opacity: 1;
// `;
// const Peer = styled.div`
//   height: 90px;
//   display: flex;
//   flex-direction: row;
//   .face {
//     background-image: url(${prop => prop.face});
//     background-position: 50% 50%;
//     background-size: cover;
//     border-radius: 100%;
//     width: 57px;
//     height: 57px;
//     border: 1px solid red;
//   }
//   .text{}
// `;
// const chats = [
//   { read: true, owner: true, date: "오전 10:11", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
//   { read: true, owner: false, date: "오후 12:35", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
//   { read: true, owner: false, date: "오후 12:35", content: "s3" },
//   { read: false, owner: true, date: "오후 4:13", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
// ];

// class Messages extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   };

//   render() {
//     const { userInfo, Count, MyDetail } = this.props;
//     console.log("PROPS:", this.props);

//     return (<Wrapper>
//       <div className="space-0" >&nbsp;</div>

//       {/* mymenu */}
//       <MyMenu
//         tab={"message"}
//         // changeTab={this.changeTab}
//         Count={Count}
//         nickName={(userInfo && userInfo.nickName) || "회원"} />

//       {/* myprofile */}
//       <div className="space-1" >&nbsp;</div>
//       <MyProfile
//         userInfo={userInfo}
//         MyDetail={MyDetail}
//       // tab={tab}
//       // Count={Count}
//       // changeTab={this.changeTab}
//       />

//       {/* temp */}
//       <div className="space-2">&nbsp;</div>
//       <div className="wrapper">

//         {/* title */}
//         <div className="title">
//           메세지
//         </div>

//         {/* peers and message-detail */}
//         <div className="peer-and-message">
//           <div className="peers">
//             <Peers>
//               <div className="title">받은 메세지함</div>

//               {this.props.ChatRooms.map((room, index) =>

//                 <Peer face={room.thumbnail || noface} key={index} >

//                   <div>
//                     {room.count
//                       ? <div className="count">{room.count}</div>
//                       : null}
//                     <div className="face">&nbsp;</div>
//                   </div>

//                   <div>
//                     <div>
//                       {room.firend_name}
//                     </div>
//                     <div>
//                       {room.recent}
//                     </div>
//                   </div>
//                 </Peer>
//               )}
//             </Peers>
//           </div>

//           <div className="message">
//             {/* 메시지 */}
//             <MessageDetail>
//               <div className="title">국민대 CRC</div>

//               {<MessageDetailContainer
//                 // height={H - (64 + 196)}
//                 repaint={this.state.render}
//                 id={19}
//               />}
//               <div className="detail">
//                 {chats.map((chat, index) =>
//                   <div key={index}>

//                   </div>)}
//               </div>
//               <div className="input"></div>

//             </MessageDetail>

//           </div>

//         </div>
//       </div>

//     </Wrapper >);
//   }
// }

// export default Messages;

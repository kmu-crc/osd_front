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
    height:${window.innerHeight*0.7}px;
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
`
const RoomListBox = styled.div`
    width:25%;
    min-width:375px;
    height:100%;
    background-color:#EFEFEF;
    padding:25px 40px;
    z-index:900;
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
      height:${props => props.isSelectMsg == true ? "60px" : "100%"};
      overflow:hidden;
  }
`
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
`
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
        width:100%;
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
        display:${props => props.isSelectMsg == true ? "flex" : "none"}
        .content{
          padding: 0px 5%;
        }
        .header{
          margin-top:0px;
        }
    }
  `
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
const SearchMemberBox = styled.div`
  width:100%;
  height:max-content;
  position:absolute;
  top:50px;
  z-index:900;
`
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
    display:${props => props.isSelectMsg == true ? "none" : "flex"}
  }
`
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
const SendButton = styled.div`
  width:117px;
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
`
const SendMessageTextarea = styled.textarea`
  width:95%;
  height:100%;
  font-size:18px;
  font-weight:500;
  color:#707070;
  text-align:left;
  line-height:27px;
  background-color:#dddddd;
  resize:none;
  border:none;
  outline:none;
  padding:20px;
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
        <div className="summary_message">{props.message && props.message.replace(/<br\/>/g, "")}</div>
      </div>
    </SummaryItemBox>);
}


class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.innerWidth > 1920 ? 1920 : window.innerWidth,
      msgValue: '',
      msgId: -1,
      selectId: null,
      selectName: null,
      openMember: false,
      showSearch: false,
      friendList: [],
      render: true,
      memberSearch: false,
    };
    this.handleChangeMsgValue = this.handleChangeMsgValue.bind(this);
    this.handleClickSend = this.handleClickSend.bind(this);
    this.handleSelectMsgSummary = this.handleSelectMsgSummary.bind(this);
    this.handleOpenMember = this.handleOpenMember.bind(this);
    this.handleClickSearchMemberItem = this.handleClickSearchMemberItem.bind(this);
    this.initMsgValue = this.initMsgValue.bind(this);
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
      Socket.on("reload_msglist", () => {
        this.setState({ render: true })
      })
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
    let msg = ``;
    if (this.state.msgValue && this.state.msgValue.length > 0) {
      msg = this.state.msgValue.replace(/\n/g, "<br/>");
    } else {
      await alert("텍스트를 입력해주세요.", "확인");
      return;
    }

    this.props.SendMessageRequest(this.props.token, { message: msg }, this.state.selectId)
      .then(async res => {
        if (res.data && res.data.success === true) {
          await this.props.GetMyMsgListRequest(this.props.token)
          await this.setState({ msgId: res.data.groupId, render: false });
        }
        this.setState({ render: true });
        this.props.history.replace("/message");
      });
    this.initMsgValue();
  }
  handleChangeMsgValue(event) {
    this.setState({ msgValue: event.target.value })
  }
  initMsgValue() {
    this.setState({ msgValue: "" })
  }
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
    this.setMsgId(-1, id, name);
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
    const maxH = 869 + 25 + 48 + 8 + 55
    const H = window.innerHeight < maxH ? window.innerHeight - 200 : 869
    return (
      <React.Fragment>
        <MainBox>
          <div className="mainBanner bg_gray">
            <div className="label font_big font_bold">메시지함</div>
          </div>
          <div className="mainContent flexBox justifyContent">
            <div className="wrapper border_radius">
              <RoomListBox isSelectMsg={this.state.msgId == -1 ? false : true}>
                <div className="header">
                  <div className="header-item fixed">
                    <div className="fitBox font_big font_bold">받은 메시지함</div>
                    <PlusIcon isSelectMsg={this.state.msgId == -1 ? false : true} onClick={this.handleOpenMember} /></div>
                  <div onClick={() => { this.setMsgId(-1, this.props.id, this.props.name) }} className="mobilelistIcon"><Icon className="unordered list" size="big" color="grey" /></div>
                  {this.state.showSearch &&
                    (<SearchMemberBox>
                      <SearchMemberContainer inputWidth={100} marginLeft={0} id="searchRect" addMemberItem={this.handleClickSearchMemberItem} />
                    </SearchMemberBox>)}
                </div>
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
                      <SendMessageTextarea id="sendMsgBox" type="textarea" onChange={this.handleChangeMsgValue} value={this.state.msgValue} /></div>
                    <SendButton className="cursor_pointer" onClick={this.onSubmitForm}>
                      <div className="sendButton_label">전송하기</div></SendButton>
                  </div>
                </div>
              </ChatBox>
            </div>
          </div>
        </MainBox>
      </React.Fragment>
    );
  }
}

export default Messages;


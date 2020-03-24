import React from 'react';
import plusImg from "source/plus_cross_gray.png";
import noImage from "source/thumbnail.png"
import styled from "styled-components";

import SearchMemberContainer from "containers/Commons/SearchMemberContainer/SearchMemberContainer"
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import Socket from "modules/Socket"

const MainBox = styled.div`
width:100%;
height:870px;
display:flex;
flex-direction:column;
  .mainBanner{
    width:100%;
    height:48px;
    display:flex;
    margin-top:8px;
    background-color:#EFEFEF;
    padding:10px 65px;
    .mainBanner_label{
      font-size:20px;
      font-weight:500;
      font-family:Noto Sans KR;
      color:#707070;
    }
  }
  .mainContent{
    width:100%;
    height:100%;
    margin-top:26px;
    display:flex;
    justify-content:center;
  }
`
const MessageBox = styled.div`
  width:91%;
  height:100%;
  background-color:#EFEFEF;
  border-radius:25px;
  display:flex;
  justify-contnet:flex-start;
  flex-direction:row;
  @media only screen and (min-width : 780px) and (max-width:1440px) {

  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
      flex-direction:column;
  }
`
const NavSection = styled.div`
  min-width:300px;
  width:25%;
  height:100%;
  display:flex;
  flex-direction:column;
  .NavHeader{
    width:100%;
    height:8.5%;
    padding-left:54px;
    padding-right:20px;
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    .Nav_label{
      height:50px;
      line-height:50px;
      font-size:20px;
      font-family:Noto Sans KR;
      font-weight:500;
      color:#707070;
    }
    }
  }
  .NavContent{
    height:91.5%;
    width:100%;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {

  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
      width:100%;
      height:35%;
      .NavHeader{
        height:50px;
      }
      .NavContent{
        height:90%;
      }

  }
`
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
`
const WhiteLine = styled.div`
  min-width:7px;
  height:100%;
  background-color:white;
  @media only screen and (min-width : 780px) and (max-width:1440px) {

  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    max-height:7px;
    min-height:7px;
    width:100%;
  }
`
const AsideSection = styled.div`

  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  .asideHeader{
    width:100%;
    height:8%;
    padding-left:54px;
    padding-right:20px;
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    .asideHeader_label{
      height:50px;
      line-height:50px;
      font-size:20px;
      font-family:Noto Sans KR;
      font-weight:500;
      color:#707070;
    }
  }
  .asideContent{
    width:100%;
    height:69%;
    display:flex;
    justify-content:center;
    .aside_messageList{
      width:94%;
      height:100%;
    }
  }
  .asideSend{
    padding-bottom:26px;
    width:100%;
    height:25%;
    display:flex;
    justify-content:center;
    .sendBox{
      width:85%;
      height:100%;
      border-top:1px solid #707070;
      background-color:#dddddd;
    }
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {

  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    .asideHeader{
      height:50px;
    }
    .asideContent{
      height:100%;
    }

  }
`
const SendButton = styled.div`
  width:117px;
  height:100%;
  background-color:white;
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
  height:147px;
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
  height:100%;
  padding-top:14px;
  padding-left:54px;
  overflow-y: hidden;
  &:hover {
    overflow-y:overlay;
  }
`;
const SummaryItemBox = styled.div`

  position:relative;
  overflow:hidden;
  width:336px;
  height:70px;
  margin-bottom:30px;
  opacity:${props => props.isSelect === true ? 1 : 0.5};
  .summary_Name{
    width:244px;
    height:29px;
    position:absolute;
    left:92px;
    font-size:17px;
    font-weight:500;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:left;
    line-height:29px;
  }
  .summary_message{
    overflow:hidden;
    width:200px;
    height:28px;
    position:absolute;
    left:92px;
    bottom:3px;
    font-size:17px;
    font-weight:100;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:left;
    line-height:29px;
  }
`;
const SummaryIcon = styled.div`
  width:70px;
  height:70px;
  position:absolute;
  left:0px;
  top:0px;
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
`;

function SummaryItem(props) {
  return (
    <SummaryItemBox isSelect={props.opacityON}>
      <SummaryIcon imageURL={props.s_img}>
        {props.noti ? <div className="noti" /> : undefined}
      </SummaryIcon>
      <div className="summary_Name">{props.friend_name}</div>
      <div className="summary_message">{props.message}</div>
    </SummaryItemBox>);
}


class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { w: window.innerWidth > 1920 ? 1920 : window.innerWidth, msgValue: '', msgId: -1, selectId: null, selectName: null, openMember: false, showSearch: false, friendList: [], render: true };
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
    document.getElementById("box").focus();
  }
  shouldComponentUpdate(nextProps) {
    setTimeout(() => {
      //this.list._reactInternalFiber.child.stateNode.scrollTop = this.list._reactInternalFiber.child.stateNode.scrollHeight;
    }, 100);
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
    console.log("1111111111" + this.state.selectId);
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
    setTimeout(async () => {
      await this.props.GetMyChatRoomsListRequest(this.props.token);
      this.setState({ render: true });
    }, 250)
  }
  onSubmitForm = async (data) => {
    if (this.state.selectId === null) {
      alert("받는 사람을 지정해주세요.")
      return
    }
    this.props.SendMessageRequest(this.props.token, { message: this.state.msgValue }, this.state.selectId)
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
  handleOpenMember(event) {
    const isOpen = this.state.showSearch;
    this.setState(state => ({ showSearch: !isOpen }));
  }
  handleClickSearchMemberItem(id, name) {
    this.setMsgId(-1, id, name);

  }
  handleCloseMember(event) {
    if (event.target.id !== "searchRect") {
      this.setState({ showSearch: false })
    }
  }
  handleResize() {
    const w = window.innerWidth > 1920 ? 1920 : window.innerWidth;
    this.setState({ w: w });
  }
  render() {
    // const { w } = this.state;
    const maxH = 869 + 25 + 48 + 8 + 55
    const H = window.innerHeight < maxH ? window.innerHeight - 200 : 869
    return (
      <React.Fragment>
        <MainBox>
          <div className="mainBanner">
            <div className="mainBanner_label">메시지함</div>
          </div>
          <div className="mainContent">
            <MessageBox>
              <NavSection >
                <div className="NavHeader">
                  <div className="Nav_label">받은 메세지함</div>
                  <PlusIcon onClick={this.handleOpenMember} />
                </div>
                <div className="NavContent">
                  {this.state.showSearch &&
                    (<div>
                      {this.state.hideSearch === true ? null :
                        <SearchMemberContainer id="searchRect" addMemberItem={this.handleClickSearchMemberItem} />}
                    </div>)}

                  <SummaryList id="searchRect">
                    {this.props.ChatRooms && this.props.ChatRooms.length > 0 &&
                      this.props.ChatRooms.map(chat =>
                        <div key={chat.uid} onClick={() => this.setMsgId(chat.uid, chat.friend_id, chat.friend_name)}>
                          <SummaryItem noti={chat.count && chat.count > 0} opacityON={this.state.selectId === chat.friend_id} s_img={chat.thumbnail || noImage} friend_name={chat.friend_name} message={chat.recent} />
                        </div>)}
                  </SummaryList>
                </div>
              </NavSection>
              <WhiteLine />
              <AsideSection>
                <div className="asideHeader"><div className="asideHeader_label">{this.state.selectName}</div></div>
                <div className="asideContent">
                  <div className="aside_messageList">
                    {this.state.render && <MessageDetailContainer height={H - (64 + 196)} repaint={this.state.render} id={this.state.msgId} />}
                  </div>
                </div>
                <div className="asideSend">
                  <div className="sendBox"><SendMessageTextarea id="box" type="textarea" onChange={this.handleChangeMsgValue} value={this.state.msgValue} /></div>
                  <SendButton onClick={this.onSubmitForm}><div className="sendButton_label">전송하기</div></SendButton>
                </div>
              </AsideSection>
            </MessageBox>
          </div>
        </MainBox>
      </React.Fragment>
    );
  }
}

export default Messages;

// const Wrapper = styled.div`
//   // width: ${props => props.width}px;
//   width:100%;
// `;
// const MainBanner = styled.div`
//   width: ${props => props.width}px;
//   height: 48px;
//   display: flex;
//   margin-top: 8px;
//   padding-left: 65px;  
//   align-items: center;
//   background-color: #EFEFEF;
//   .title {
//     font-size: 20px;
//     font-weight: 500;
//     font-family: Noto Sans KR;
//     color: #707070;
//   }
// `;
// const MainBox=styled.div`
//   margin-top:25px;
//   margin-left:85px;
//   margin-right:85px;
//   border-radius:25px;
//   background:#EFEFEF;
//   display:flex;
//   height:724px;
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//       flex-direction:column;
//       height:75%;
//       overflow-y:scroll;
//     }
//     @media only screen and (min-width : 360px) and (max-width:780px) {
//       flex-direction:column;
//       height:75%;

//     }
// `
// const SummaryList = styled.div`
//   height:794px;
//   margin-top:14px;
//   padding-left:54px;
//   overflow-y: hidden;
//   &:hover {
//     overflow-y:overlay;
//   }
// `;
// const BoardBox=styled.div`
//   width:100%;
//   padding-left:25px;
//   border:2px solid green;
// `;
// const AsideSection = styled.div`
//     border:3px solid blue;
//     width: 25%;
//     min-width:230px;
//     height: 100%;
//     overflow: hidden;
//     margin-right: 7px;
//     border-radius: 25px 0 0 25px;
//     background-color: #EFEFEF;
//     .asideHeader{
//       height: 75px;
//       position: relative;
//       overflow: hidden;
//     }
//     .asideTitle{
//       position: absolute;
//       width: 303px;
//       height: 30px;
//       left: 54px;
//       top: 33px;
//       font-size: 20px;
//       font-family: Noto Sans KR;
//       color: #707070;
//       font-weight: 500;
//       text-align: left;
//       line-height: 30px;
//     }
//     .plusIcon{
//       width: 45px;
//       height: 45px;
//       position: absolute;
//       right: 20px;
//       bottom: 5px;
//       color: #707070;
//       background: url(${plusImg});
//       background-size: contain;
//       background-repeat: no-repeat;
//       background-position: center center;
//       opacity: 1.0;
//       :hover {
//         opacity: 0.5;
//       }
//     }
//     @media only screen and (min-width : 780px) and (max-width:1440px) {
//       flex-direction:column;
//       width:100%;
//       height:300px;
//       overflow-y:scroll;
//     }
//     @media only screen and (min-width : 360px) and (max-width:780px) {
//       flex-direction:column;
//       width:100%;
//       height:300px;
//       overflow-y:scroll;
//     }
// `;
// const SummaryItemBox = styled.div`
//   position:relative;
//   overflow:hidden;
//   width:336px;
//   height:70px;
//   margin-bottom:30px;
//   opacity:${props => props.isSelect === true ? 1 : 0.5};
//   .summary_Name{
//     width:244px;
//     height:29px;
//     position:absolute;
//     left:92px;
//     font-size:17px;
//     font-weight:500;
//     font-family:Noto Sans KR;
//     color:#707070;
//     text-align:left;
//     line-height:29px;
//   }
//   .summary_message{
//     width:244px;
//     height:28px;
//     position:absolute;
//     left:92px;
//     bottom:3px;
//     font-size:17px;
//     font-weight:100;
//     font-family:Noto Sans KR;
//     color:#707070;
//     text-align:left;
//     line-height:29px;
//   }
// `;
// const SummaryIcon = styled.div`
//   width:70px;
//   height:70px;
//   position:absolute;
//   left:0px;
//   top:0px;
//   border-radius:50%;
//   background:url(${props => props.imageURL});
//   background-size:cover;
//   background-position:center center;
//   .noti{
//     width:10px;
//     height:10px;
//     background-color:#FF0000;
//     border-radius:50%;
//   }
// `;
// const MainBoard = styled.div`
//   display: inline-block;
//   oveflow: hidden;
//   width: 90%;
//   padding-left: 26px;
//   padding-right: 23px;
//   border-radius: 0px 25px 25px 0px;
//   background-color: #EFEFEF;
// }`;
// const BoardHeaderBox = styled.div`
//   height: 69px;
//   position: relative;
//   overflow: hidden;
//   .boardHeaderText {
//     position: absolute;
//     width: 244px;
//     height: 29px;
//     bottom: 5px;
//     margin-left:30px;
//     line-height: 29px;
//     font-size: 20px;
//     font-weight: 500;
//     font-family: Noto Sans KR;
//     color: #707070;
//   }
// `;
// const SendTypingBox = styled.div`
//   border:2px solid red;
//   width:100%;
//   height: 197px;
//   display: flex;
//   margin-right: 23px;
//   .sendButton {
//     width: 117px;
//     height: 170px;
//     border-radius: 0px 0px 25px 0px;
//     background-color: #FFFFFF;
//     font-size: 18px;
//     font-weight: 500;
//     font-family: Noto Sans KR;
//     text-align: center;
//     line-height: 170px;
//     cursor: pointer;
//   }
// `;
// const DivisionLine = styled.div`
//   border-top:1px solid #707070;
//   width: 100%;
// `;
// const SendMessageTextarea = styled.textarea`
//   width:100%;
//   height:147px;
//   margin-right:50px;
//   font-size:18px;
//   font-weight:500;
//   color:#707070;
//   text-align:left;
//   line-height:27px;
//   background-color:#EFEFEF;
//   resize:none;
//   border:none;
//   outline:none;
//   padding:20px;
// `;

//const MessageSectionSendBtn = {
//  position: "absolute", width: "117px", height: "170px", right: "0px",
//  borderRadius: "0px 0px 25px 0px", backgroundColor: "#FFFFFF",
//  fontSize: "18px", fontFamily: "Noto Sans KR", color: "#707070", fontWeight: "500", textAlign: "center", lineHeight: "170px",
//};


{/* <Wrapper onClick={this.handleCloseMember}>
<MainBanner width={w} >
  <div className="title">메시지함</div>
</MainBanner>

<MainBox>
  <AsideSection>
    <div className="asideHeader" id="searchRect">
      <div className="asideTitle" id="searchRect">받은 메시지함</div>
      <div className="plusIcon" id="searchRect" onClick={this.handleOpenMember}>
      </div>
    </div>
    {this.state.showSearch &&
      (<React.Fragment>
        {this.state.hideSearch === true ? null :
          <SearchMemberContainer id="searchRect" addMemberItem={this.handleClickSearchMemberItem} />}
      </React.Fragment>)}
    <SummaryList id="searchRect">{arrSummaryList}</SummaryList>
  </AsideSection>
  <div style={{border:"3.5px solid white"}}></div>
  <MainBoard>
    <BoardHeaderBox>
      <div className="boardHeaderText">{this.state.selectName}</div>
    </BoardHeaderBox>
    <BoardBox >
      {this.state.render && <MessageDetailContainer height={H - (64 + 196)} repaint={this.state.render} id={this.state.msgId} />}
      <DivisionLine />
    </BoardBox>
    <SendTypingBox>
      <SendMessageTextarea type="textarea" onChange={this.handleChangeMsgValue} value={this.state.msgValue}></SendMessageTextarea>
      <div className="sendButton" onClick={this.onSubmitForm}>전송하기</div>
    </SendTypingBox>
  </MainBoard>
</MainBox>
</Wrapper>); */}

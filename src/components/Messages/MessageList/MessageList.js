import React from 'react';
import plusImg from "source/plus_cross_gray.png";
import noImage from "source/thumbnail.png"
import styled from "styled-components";

import SearchMemverContainer from "containers/Commons/SearchMemberContainer/SearchMemberContainer"
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import Socket from "modules/Socket"


const SummaryList = styled.div`
  height:794px;
  margin-top:14px;
  padding-left:54px;
  overflow-y: hidden;
  &:hover {
    overflow-y:overlay;
  }
`;

const MainBanner = styled.div`
  width:100%;
  height:48px;
  display:flex;
  align-items:center;
  margin-top:8px;
  padding-left:65px;  
  background-color:#EFEFEF;
  .title{
    font-size:20px;
    font-weight:500;
    font-family:Noto Sans KR;
    color:#707070;
  }

`
const MainSection = styled.div`
  width:1750px;
  height:869px;
  margin:26px 0px 27px 65px;
`
const AsideSection = styled.div`
    width:445px;
    height:100%;
    display:inline-block;
    overflow:hidden;
    margin-right:7px;
    border-radius:25px 0 0 25px;
    background-color:#EFEFEF;
    .asideHeader{
      height:75px;
      position:relative;
      overflow:hidden;
    }
    .asideTitle{
      position:absolute;
      width:303px;
      height:30px;
      left:54px;
      top:33px;
      font-size:20px;
      font-family:Noto Sans KR;
      color:#707070;
      font-weight:500;
      text-align:left;
      line-height:30px;
    }
    .plusIcon{
      width: 45px;
      height: 45px;
      position: absolute;
      right: 20px;
      bottom: 5px;
      color: #707070;
      background: url(${plusImg});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      opacity: 1.0;
      :hover {
        opacity:0.5;
      }
    }
`

const SummaryItemBox = styled.div`
    position:relative;
    overflow:hidden;
    width:336px;
    height:70px;
    margin-bottom:30px;
    opacity:${props => props.isSelect == true ? 1 : 0.5};
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
      width:244px;
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
`
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
`
const MainBoard = styled.div`
    display: inline-block;
    oveflow: hidden;
    width: 1298px;
    height: 100%;
    padding-left: 26px;
    padding-right: 23px;
    border-radius: 0px 25px 25px 0px;
    background-color: #EFEFEF;
    .boardHeaderBox {
        height: 69px;
        position: relative;
        overflow: hidden;
        .boardHeaderText {
          position: absolute;
          width: 244px;
          height: 29px;
          bottom: 5px;
          line-height: 29px;
          font-size: 20px;
          font-weight: 500;
          font-family: Noto Sans KR;
          color: #707070;
        }
    }
    .sendTypingBox {
        height: 197px;  
        position: relative;
        overflow: hidden;
    }
    .sendButton {
        width: 117px;
        height: 170px;
        position: absolute;
        right: 0px;
        border-radius: 0px 0px 25px 0px;
        background-color: #FFFFFF;
        font-size: 18px;
        font-weight: 500;
        font-family: Noto Sans KR;
        text-align: center;
        line-height: 170px;
        cursor: pointer;
    }
`
const DivisionLine = styled.div`
    border-top:1px solid #707070;
`
const SendMessageTextarea = styled.textarea`
  width:1091px;
  height:147px;
  position:absolute;
  top:24px;
  font-size:18px;
  font-weight:500;
  color:#707070;
  text-align:left;
  line-height:27px;
  background-color:#EFEFEF;
  resize:none;
  border:none;
  outline:none;
`

const MessageSectionSendBtn = {
  position: "absolute", width: "117px", height: "170px", right: "0px",
  borderRadius: "0px 0px 25px 0px", backgroundColor: "#FFFFFF",
  fontSize: "18px", fontFamily: "Noto Sans KR", color: "#707070", fontWeight: "500", textAlign: "center", lineHeight: "170px",
};

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
    this.state = { msgValue: '', msgId: -1, selectId: null, selectName: null, openMember: false, showSearch: false, friendList: [], render: true };
    this.handleChangeMsgValue = this.handleChangeMsgValue.bind(this);
    this.handleClickSend = this.handleClickSend.bind(this);
    this.handleSelectMsgSummary = this.handleSelectMsgSummary.bind(this);
    this.handleOpenMember = this.handleOpenMember.bind(this);
    this.handleClickSearchMemberItem = this.handleClickSearchMemberItem.bind(this);
    this.initMsgValue = this.initMsgValue.bind(this);
    this.handleCloseMember = this.handleCloseMember.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  async componentDidMount() {
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
      await this.props.GetMyMsgListRequest(this.props.token)
      this.setState({ render: true })
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
    if (event.target.id != "searchRect") {
      this.setState({ showSearch: false })
    }
  }
  render() {
    let arrSummaryList = [];
    if (this.props.MessageList.length > 0) {
      console.log("message-list", this.props.MessageList);
      arrSummaryList = this.props.MessageList.map((item, index) => {
        let SelectedItem = false;
        if (this.state.selectId == item.friend_id) SelectedItem = true;
        return (
          <div key={index} onClick={() => this.setMsgId(item.uid, item.friend_id, item.friend_name)}>
            <SummaryItem noti={item.noti && item.noti > 0} s_img={item.s_img == null ? noImage : item.s_img} friend_name={item.friend_name} message={item.message} opacityON={SelectedItem} />
          </div>
        )
      });
    }
    arrSummaryList.reverse();

    return (
      <div onClick={this.handleCloseMember}>
        <MainBanner>
          <div className="title">메시지함</div>
        </MainBanner>
        <MainSection>
          <AsideSection>
            <div className="asideHeader" id="searchRect">
              <div className="asideTitle" id="searchRect">받은 메시지함</div>
              <div className="plusIcon" id="searchRect" onClick={this.handleOpenMember}>
              </div>
            </div>
            {this.state.showSearch && (
              <React.Fragment>
                {
                  this.state.hideSearch == true ?
                    null :
                    <SearchMemverContainer id="searchRect" addMemberItem={this.handleClickSearchMemberItem} />
                }
              </React.Fragment>)
            }
            <SummaryList id="searchRect">
              {arrSummaryList}
            </SummaryList>
          </AsideSection>

          <MainBoard>
            <div className="boardHeaderBox">
              <div className="boardHeaderText">{this.state.selectName}</div>
            </div>

            <div>
              {this.state.render &&
                <MessageDetailContainer repaint={this.state.render} id={this.state.msgId} />}
              <DivisionLine />
            </div>

            <div className="sendTypingBox">
              <SendMessageTextarea type="textarea" onChange={this.handleChangeMsgValue} value={this.state.msgValue}></SendMessageTextarea>
              <div className="sendButton" onClick={this.onSubmitForm}>전송하기</div>
            </div>
          </MainBoard>

        </MainSection>
      </div>
    );
  }
}

export default Messages;

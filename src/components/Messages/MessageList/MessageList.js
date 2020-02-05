import React, { Component } from 'react';
import styled from 'styled-components';
import who from "source/thumbnail.png";
import FormDataToJson from "modules/FormDataToJson";
import DateFormat from "modules/DateFormat";
import Socket from "modules/socket";

import StyleGuide from "StyleGuide";
import { FormField } from "components/Commons/FormField";
import ValidateForm from "components/Commons/ValidateForm";
import { FormTextArea } from "components/Commons/FormItem";
import { FormInput } from "components/Commons/FormItem";
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import Button from "components/Commons/Button";
import NumberFormat from 'modules/NumberFormat';
import TextSlicer from 'modules/TextSlicer'

// CSS STYLING
const Container = styled.div`
// *{ border: 1px solid red;}
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-start;
  .chatting {
    width: 750px;
  }
  .profile-detail {

  }
`;
const Peers = styled.div`
  cursor: default;
  background: #F9F9F9;
  border-radius: 25px 0 0 25px;
  padding: 25px 10px 25px 10px;
  .self {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .me {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
    }
  }
  .list {
    font-family: Noto Sans KR;
    dipsplay: flex;
    flex-direction: column;
    height: 750px;
    // overflow: hidden;
    // :hover {
    overflow-y: scroll;
    // }
    .person {
      padding: 5px;
      :hover {
        background: #F0F0F0;
      }
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      .pic {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-size: cover;
        background-position: center center;
      }
      .middle {
        width: 250px;
        margin-left: 5px;
        .name {
          color: #628DFF;
          font-weight: 500;
        }
        .last-message {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
`;

//현 문제 : 특정 채팅방에 접속한 뒤 다른 채팅방에 접속한 직 후에 알람의 제어가 꼬인다. 
let test = 1; //보낼 사람이 변경됐을 때 알람의 수를 제어하기 위한 변수. 같은 채팅방에서 메세지를 보내면 test가 증가되고 채팅방을 변경하면 test가 1로 초기화 된다. 
class MessageList extends Component {
  state = {
    isDetailClicked: false,
    msgId: -1,
    selectId: null,
    selectName: null,
    openMember: false,
    friendList: [],
    render: true,
    connectedCheck: false,//채팅을 받는 당사자가 접속돼있는지, 아닌지 판별하는 변수
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

  // shouldComponentUpdate(nextProps) {
  //   setTimeout(() => {
  //     this.list._reactInternalFiber.child.stateNode.scrollTop = this.list._reactInternalFiber.child.stateNode.scrollHeight;
  //   }, 100);
  //   if (JSON.stringify(this.props.id) !== JSON.stringify(nextProps.id)) {
  //     if (nextProps.id && nextProps.name) {
  //       let id = parseInt(nextProps.id, 10);
  //       this.selectMember({
  //         email: null,
  //         nick_name: nextProps.name,
  //         uid: id
  //       });
  //     }
  //   }
  //   return true;
  // }

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
  }

  setMsgId = async (group_id, user_id, user_name) => {
    test = 1; //보낼 사람이 바뀔 때 test를 1로 초기화 
    await this.setState({
      msgId: group_id,
      selectId: user_id,
      selectName: user_name,
      openMember: false,
      render: false
    });
    this.setState({
      render: true
    });
    setTimeout(async () => {
      await this.props.GetMyMsgListRequest(this.props.token)
      this.setState({ render: true })
    }, 250)
  }

  comfirmMsgAlarm = (from) => {
    Socket.emit("confirmMsgAlarm", { uid: this.props.userInfo, fromID: from })
  }

  onSubmitForm = async (data) => {
    if (this.state.selectId === null) {
      alert("받는 사람을 지정해주세요.");
      return
    }
    this.props.SendMessageRequest(this.props.token, FormDataToJson(data), this.state.selectId)
      .then(async res => {
        if (res.data && res.data.success === true) {
          await this.props.GetMyMsgListRequest(this.props.token)
          await this.setState({
            msgId: res.data.groupId,
            render: false
          });
        }
        this.setState({
          render: true
        });
        this.props.history.replace("/message");
      })
  }

  render() {
    console.log(this.props);
    const { isDetailClicked } = this.state;
    const { MessageList, userInfo } = this.props;
    return (
      <Container>
        <Wrapper>
          <Peers>
            <div className="self">
              <div>
                <img src={userInfo && userInfo.thumbnail && userInfo.thumbnail.m_img} className="me" /></div>
              <div>
                <div>{userInfo.nickName}</div>
                <div>{userInfo.email}</div>
              </div>
              <div><i className="edit icon" /></div>
            </div>
            {MessageList.length ? (
              <div className="list">
                {MessageList.map(peer =>
                  <div className="person" key={peer.uid}>
                    <div>
                      <img src={peer.s_img || who} className="pic" /></div>
                    <div className="middle">
                      <div className="name">{peer.friend_name}</div>
                      <div className="last-message">{peer.message}</div>
                    </div>
                    <div className="date">
                      <div className="sent-date">{DateFormat(peer.update_time)}</div>
                      <div className="checker">{!peer.noti ? "" : "√"}</div>
                    </div>
                  </div>)}
              </div>
            ) : (<div>no data</div>)}
          </Peers>


          <div className="chatting">
            chatting-room
          </div>

          {isDetailClicked ? <div className="profile-detail"></div> : null}
        </Wrapper>
      </Container>
    )
  }
/* <Container>
<Wrapper padded={false} columns={2}>
  <Grid.Row>
    <ListContainer widescreen={5} largeScreen={5} computer={6} tablet={16} mobile={16}>
      <SearchMember>
        <div className="heading">멤버 검색</div>
        <FormInput type="text" name="search" placeholder="찾고자 하는 회원의 닉네임을 입력해 주세요." validates={["MinLength2"]} getValue={this.getValue} />
        <MemberList style={this.state.openMember ? { display: "block" } : { display: "none" }}>
          {this.props.members && this.props.members.map((item, index) => {
            return (<MemberListItem key={`member${index}`} onClick={() => this.selectMember(item)}>{item.email}</MemberListItem>);
          })}
        </MemberList>
      </SearchMember>
      <div className="heading">내 메시지함</div>
      {msgList.length > 0 ?
        <ul className="myMsgList">
          {msgList.sort((a, b) => {
            return new Date(b.update_time).getTime() - new Date(a.update_time).getTime();
          }).map(msg => (
            <MsgList key={msg.uid} onClick={() => this.setMsgId(msg.uid, msg.friend_id, msg.friend_name)}>
              <div className="profile">
                <span>{msg.friend_name}</span>
              </div>
              <div className="update">
                최근 메시지 {DateFormat(msg.update_time)}
                {msg.noti > 0 && <AlarmLabel>{NumberFormat(msg.noti)}</AlarmLabel>}
              </div>
            </MsgList>
          ))
          }
        </ul>
        : <div>메시지없음</div>
      }
    </ListContainer>
    <ContentContainer widescreen={11} largeScreen={11} computer={10} tablet={16} mobile={16}>
      <div style={{
        height: "50px", fontWeight: "bold", color: `${StyleGuide.color.sub.bule.dark}`,
        fontSize: `${StyleGuide.font.size.heading4}`, display: "flex"
      }}>
        {this.state.selectName && (TextSlicer(this.state.selectName, 16) + "님과의 대화")}
      </div>
      <DetailWrapper style={{ maxHeight: "250px" }} ref={ref => this.list = ref}>
        {this.state.render &&
          <MessageDetailContainer id={this.state.msgId} targetUid={this.state.selectId} />
        }
      </DetailWrapper>
      <SendingMsg style={{ height: "50px" }}>
        {this.state.render &&
          <ValidateForm onSubmit={this.onSubmitForm} className="ui reply form">
            <FormField name="message" validates={["required"]} RenderComponent={FormTextArea} />
            <Button type="submit">
              보내기
            </Button>
          </ValidateForm>
        }
      </SendingMsg>
    </ContentContainer>
  </Grid.Row>
</Wrapper>
</Container>
)
} */}
export default MessageList;


// import React, { Component } from 'react';
// import styled from 'styled-components';
// import { Grid } from "semantic-ui-react";
// import { FormField } from "components/Commons/FormField";
// import ValidateForm from "components/Commons/ValidateForm";
// import { FormTextArea } from "components/Commons/FormItem";
// import FormDataToJson from "modules/FormDataToJson";
// import StyleGuide from "StyleGuide";
// import ContentBox from "components/Commons/ContentBox";
// import { FormInput } from "components/Commons/FormItem";
// import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
// import Button from "components/Commons/Button";
// import DateFormat from "modules/DateFormat";
// import Socket from "modules/socket"
// import NumberFormat from 'modules/NumberFormat';
// import TextSlicer from 'modules/TextSlicer'

// // css styling
// const Container = styled(ContentBox)`
// @media only screen and (max-width: 991px) and (min-width: 768px){
//   & .ui.grid>.row{
//     margin-left: 6.25% !important;
//   }
//   }
// `;
// const Wrapper = styled(Grid)`
//   width: 100%;
//   &.ui.grid {
//     margin-top: 1rem;
//     margin-bottom: 1rem;
//     margin-left: 0rem;
//     margin-right: 0rem;
//   }
//   &.ui.grid > .row > .column {
//     padding: 1.5rem;
//   }
// `;
// const ListContainer = styled(Grid.Column)`
//   border-right: 1px solid rgba(0,0,0,0.15);
//   box-shadow: 0 0 5px rgba(0,0,0,0.25);
//   & .heading {
//     font-size: ${StyleGuide.font.size.heading4};
//     color: ${StyleGuide.color.gey.dark};
//     margin-bottom: 20px;
//   }
//   & label {
//     font-size: ${StyleGuide.font.size.heading4};
//     color: ${StyleGuide.color.gey.dark};
//   }
//   & input {
//     width: 80%;
//     height: 30px;
//     margin: 5px 0 10px;
//   }
//   & .myMsgList {
//     max-height: 300px;
//     overflow-y: scroll;
//   }
// `;

// const MsgList = styled.li`
//   width: 100%;
//   height: 50px;
//   cursor: pointer;
//   margin: 0.3rem 0;
//   display: flex;
//   & .profile {
//     width: 50px;
//     height: 50px;
//     border-radius: 50% 50%;
//     overflow: hidden;
//     position: relative;
//     background-color: ${StyleGuide.color.sub.bule.light};
//     color: #fff;
//     float: left;
//     & span {
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 100%;
//       text-align: center;
//     }
//   }
//   & .update {
//     color: ${StyleGuide.color.geyScale.scale5};
//     font-weight: 400;
//     padding: 1rem;
//     display: flex;
//   }
//   &:hover .update {
//     font-weight: bold;
//   }
//   &::after {
//     content: "";
//     display: block;
//     clear: both;
//   }
// `;
// const ContentContainer = styled(Grid.Column)`
//   border-right: 1px solid rgba(0,0,0,0.15);
//   box-shadow: 0 0 5px rgba(0,0,0,0.25);
//   padding: 1rem;
//   & .ui.form .field {
//     margin-bottom: 1rem;
//   }
//   & .ui.form .field textarea:not([rows]) {
//     min-height: 2rem;
//   }
// `;
// const SendingMsg = styled.div``;
// const SearchMember = styled.div`
//   margin-bottom: 30px;
//   & input {
//     border: 1px solid ${StyleGuide.color.geyScale.scale3};
//     background-color: ${StyleGuide.color.geyScale.scale1};
//     padding: 0 1rem;
//     width: 100%;
//     box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
//   }
// `;
// const MemberList = styled.ul`
//   width: 100%;
//   padding: 0.5rem;
//   min-height: 100px;
//   max-height: 300px;
//   overflow-Y: scroll;
//   box-sizing: border-box;
//   border: 1px solid #181818;
//   border-radius: 3px;
// `;
// const MemberListItem = styled.li`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #181818;
//   border-radius: 3px;
//   margin-bottom: 5px;
// `;
// const DetailWrapper = styled.div`
//   background-color: #F0F0F0;
//   min-height: 250px;
//   max-height: 600px;
//   padding: 0rem 0rem 0rem 0rem;
//   overflow-y: scroll;
//   position: relative;
//   & p {
//     text-align: center;
//     position: absolute;
//     top: 40%;
//     left: 50%;
//     transform: translateX(-50%);
//   }
// `;
// const AlarmLabel = styled.div`
//   width: 30px;
//   height: 30px;
//   color: white;
//   background-color: red;
//   border-radius: 15px;
//   line-height: 30px;
//   text-align: center;
//   font-size: 16px;
//   vertical-align: middle;
//   padding-top: 2px;
//   transform: scale(0.6);
//   -ms-transform: scale(0.6);
//   transform-origin: 0 0;
//   -ms-transform-origin: 0 0;
// `;

// //현 문제 : 특정 채팅방에 접속한 뒤 다른 채팅방에 접속한 직 후에 알람의 제어가 꼬인다. 
// let test = 1; //보낼 사람이 변경됐을 때 알람의 수를 제어하기 위한 변수. 같은 채팅방에서 메세지를 보내면 test가 증가되고 채팅방을 변경하면 test가 1로 초기화 된다. 
// class MessageList extends Component {
//   state = {
//     msgId: -1,
//     selectId: null,
//     selectName: null,
//     openMember: false,
//     friendList: [],
//     render: true,
//     connectedCheck: false,//채팅을 받는 당사자가 접속돼있는지, 아닌지 판별하는 변수
//   }

//   async componentDidMount() {
//     Socket.on("connectedCheck", (sendingUserId) => {
//       ++test;
//       console.log(test);
//       if (this.state.selectId === sendingUserId) {
//         this.setState({ connectedCheck: true });
//       } else {
//         this.setState({ connectedCheck: false });
//       }
//       this.props.CheckConnectedResponse(
//         this.props.token,
//         {
//           "checkData": this.state.connectedCheck,
//           "count": test,
//         }, sendingUserId);
//     })
//     await this.props.GetMyMsgListRequest(this.props.token)
//       .then(async (res) => {
//         if (res.MsgList && res.MsgList.length > 0) {
//           let arr = [];
//           arr = res.MsgList.map(list => { return (list.friend_id) })
//           await this.setState({
//             friendList: arr
//           });
//         }
//       });
//     if (this.props.id && this.props.name) {
//       let id = parseInt(this.props.id, 10);
//       this.selectMember({
//         email: null,
//         nick_name: this.props.name,
//         uid: id
//       })
//       Socket.on("init", () => {
//         console.log("giveit")
//         this.setState({ render: true })
//       })
//     }
//   }

//   shouldComponentUpdate(nextProps) {
//     setTimeout(() => {
//       this.list._reactInternalFiber.child.stateNode.scrollTop = this.list._reactInternalFiber.child.stateNode.scrollHeight;
//     }, 100);
//     if (JSON.stringify(this.props.id) !== JSON.stringify(nextProps.id)) {
//       if (nextProps.id && nextProps.name) {
//         let id = parseInt(nextProps.id, 10);
//         this.selectMember({
//           email: null,
//           nick_name: nextProps.name,
//           uid: id
//         });
//       }
//     }
//     return true;
//   }

//   getValue = (value) => {
//     this.setState({
//       openMember: true
//     });
//     if (!value) {
//       this.setState({
//         openMember: false
//       });
//       return;
//     }
//     this.props.SearchMemberRequest(null, { key: value }, this.props.token);
//   }

//   selectMember = async (data) => {
//     await this.setState({
//       render: false
//     });
//     const index = this.state.friendList.indexOf(data.uid);
//     if (index === -1) {
//       this.setState({
//         selectId: data.uid,
//         selectName: data.nick_name,
//         openMember: false,
//         msgId: -1,
//         render: true
//       });
//     } else {
//       this.setState({
//         selectId: data.uid,
//         selectName: data.nick_name,
//         openMember: false,
//         msgId: this.props.MessageList[index].uid,
//         render: true
//       });
//     }
//   }

//   setMsgId = async (group_id, user_id, user_name) => {
//     test = 1; //보낼 사람이 바뀔 때 test를 1로 초기화 
//     await this.setState({
//       msgId: group_id,
//       selectId: user_id,
//       selectName: user_name,
//       openMember: false,
//       render: false
//     });
//     this.setState({
//       render: true
//     });
//     setTimeout(async () => {
//       await this.props.GetMyMsgListRequest(this.props.token)
//       this.setState({ render: true })
//     }, 250)
//   }

//   comfirmMsgAlarm = (from) => {
//     Socket.emit("confirmMsgAlarm", { uid: this.props.userInfo, fromID: from })
//   }

//   onSubmitForm = async (data) => {
//     if (this.state.selectId === null) {
//       alert("받는 사람을 지정해주세요.");
//       return
//     }
//     this.props.SendMessageRequest(this.props.token, FormDataToJson(data), this.state.selectId)
//       .then(async res => {
//         if (res.data && res.data.success === true) {
//           await this.props.GetMyMsgListRequest(this.props.token)
//           await this.setState({
//             msgId: res.data.groupId,
//             render: false
//           });
//         }
//         this.setState({
//           render: true
//         });
//         this.props.history.replace("/message");
//       })
//   }

//   render() {
//     const msgList = this.props.MessageList
//     return (
//       <Container>
//         <Wrapper padded={false} columns={2}>
//           <Grid.Row>
//             <ListContainer widescreen={5} largeScreen={5} computer={6} tablet={16} mobile={16}>
//               <SearchMember>
//                 <div className="heading">멤버 검색</div>
//                 <FormInput type="text" name="search" placeholder="찾고자 하는 회원의 닉네임을 입력해 주세요." validates={["MinLength2"]} getValue={this.getValue} />
//                 <MemberList style={this.state.openMember ? { display: "block" } : { display: "none" }}>
//                   {this.props.members && this.props.members.map((item, index) => {
//                     return (<MemberListItem key={`member${index}`} onClick={() => this.selectMember(item)}>{item.email}</MemberListItem>);
//                   })}
//                 </MemberList>
//               </SearchMember>
//               <div className="heading">내 메시지함</div>
//               {msgList.length > 0 ?
//                 <ul className="myMsgList">
//                   {msgList.sort((a, b) => {
//                     return new Date(b.update_time).getTime() - new Date(a.update_time).getTime();
//                   }).map(msg => (
//                     <MsgList key={msg.uid} onClick={() => this.setMsgId(msg.uid, msg.friend_id, msg.friend_name)}>
//                       <div className="profile">
//                         <span>{msg.friend_name}</span>
//                       </div>
//                       <div className="update">
//                         최근 메시지 {DateFormat(msg.update_time)}
//                         {msg.noti > 0 && <AlarmLabel>{NumberFormat(msg.noti)}</AlarmLabel>}
//                       </div>
//                     </MsgList>
//                   ))
//                   }
//                 </ul>
//                 : <div>메시지없음</div>
//               }
//             </ListContainer>
//             <ContentContainer widescreen={11} largeScreen={11} computer={10} tablet={16} mobile={16}>
//               <div style={{
//                 height: "50px", fontWeight: "bold", color: `${StyleGuide.color.sub.bule.dark}`,
//                 fontSize: `${StyleGuide.font.size.heading4}`, display: "flex"
//               }}>
//                 {this.state.selectName && (TextSlicer(this.state.selectName, 16) + "님과의 대화")}
//               </div>
//               <DetailWrapper style={{ maxHeight: "250px" }} ref={ref => this.list = ref}>
//                 {this.state.render &&
//                   <MessageDetailContainer id={this.state.msgId} targetUid={this.state.selectId} />
//                 }
//               </DetailWrapper>
//               <SendingMsg style={{ height: "50px" }}>
//                 {this.state.render &&
//                   <ValidateForm onSubmit={this.onSubmitForm} className="ui reply form">
//                     <FormField name="message" validates={["required"]} RenderComponent={FormTextArea} />
//                     <Button type="submit">
//                       보내기
//                     </Button>
//                   </ValidateForm>
//                 }
//               </SendingMsg>
//             </ContentContainer>
//           </Grid.Row>
//         </Wrapper>
//       </Container>
//     )
//   }
// }

// export default MessageList;

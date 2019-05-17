import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Icon, Form } from "semantic-ui-react";
import { FormField } from "components/Commons/FormField";
import ValidateForm from "components/Commons/ValidateForm";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import { FormInput } from "components/Commons/FormItem";
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import Button from "components/Commons/Button";
import DateFormat from "modules/DateFormat";
import TextFormat from 'modules/TextFormat';
import Socket from "modules/socket"
import NumberFormat from 'modules/NumberFormat';

// css styling
const Container = styled(ContentBox)`
@media only screen and (max-width: 991px) and (min-width: 768px){
  & .ui.grid>.row{
    margin-left: 6.25% !important;
  }
  }
`;

const Wrapper = styled(Grid)`
  width: 100%;
  &.ui.grid {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0rem;
    margin-right: 0rem;
  }
  &.ui.grid > .row > .column {
    padding: 1.5rem;
  }
`;

const ListContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  & .heading {
    font-size: ${StyleGuide.font.size.heading4};
    color: ${StyleGuide.color.gey.dark};
    margin-bottom: 20px;
  }
  & label {
    font-size: ${StyleGuide.font.size.heading4};
    color: ${StyleGuide.color.gey.dark};
  }
  & input {
    width: 80%;
    height: 30px;
    margin: 5px 0 10px;
  }
  & .myMsgList {
    max-height: 300px;
    overflow-y: scroll;
  }
`;

const MsgList = styled.li`
  width: 100%;
  height: 50px;
  cursor: pointer;
  margin: 0.3rem 0;
  display: flex;
  & .profile {
    width: 50px;
    height: 50px;
    border-radius: 50% 50%;
    overflow: hidden;
    position: relative;
    background-color: ${StyleGuide.color.sub.bule.light};
    color: #fff;
    float: left;
    & span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
    }
  }
  & .update {
    color: ${StyleGuide.color.geyScale.scale5};
    font-weight: 400;
    padding: 1rem;
    display: flex;
  }
  &:hover .update {
    font-weight: bold;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ContentContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  padding: 1rem;
  & .ui.form .field {
    margin-bottom: 1rem;
  }
  & .ui.form .field textarea:not([rows]) {
    min-height: 2rem;
  }
`;

const SendingMsg = styled.div`
`;

const SearchMember = styled.div`
  margin-bottom: 30px;
  & input {
    border: 1px solid ${StyleGuide.color.geyScale.scale3};
    background-color: ${StyleGuide.color.geyScale.scale1};
    padding: 0 1rem;
    width: 100%;
    box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
  }
`;

const MemberList = styled.ul`
  width: 100%;
  padding: 0.5rem;
  min-height: 100px;
  max-height: 300px;
  overflow-Y: scroll;
  box-sizing: border-box;
  border: 1px solid #181818;
  border-radius: 3px;
`;

const MemberListItem = styled.li`
  width: 100%;
  padding: 10px;
  border: 1px solid #181818;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const DetailWrapper = styled.div`
  background-color: ${StyleGuide.color.geyScale.scale1};
  height: 780px;
  padding: 1rem 1rem 2rem 1rem;
  overflow-y: scroll;
  position: relative;
  & p {
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }
  & .head {
    height: 50px;
    font-weight: bold;
    color: ${StyleGuide.color.sub.bule.dark};
    font-size: ${StyleGuide.font.size.heading4};
  }
`;
const AlarmLabel = styled.div`
  width: 30px;
  height: 30px;
  color: white;
  background-color: red;
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  vertical-align: middle;
  padding-top: 2px;
  transform: scale(0.6);
  -ms-transform: scale(0.6);
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
`;
class MessageList extends Component {
  state = {
    msgId: -1,
    selectId: null,
    selectName: null,
    openMember: false,
    friendList: [],
    render: true,
  }

  async componentDidMount() {
    await this.props.GetMyMsgListRequest(this.props.token)
      .then(async (res) => {
        if (res.MsgList && res.MsgList.length > 0) {
          let arr = [];
          res.MsgList.map(list => {
            arr.push(list.friend_id);
          });
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
      Socket.on("reload_msglist", () => {
        console.log("giveit")
        this.setState({ render: true })
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    setTimeout(() => {
      this.list._reactInternalFiber.child.stateNode.scrollTop = this.list._reactInternalFiber.child.stateNode.scrollHeight;
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
  }

  setMsgId = async (group_id, user_id, user_name) => {
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
    }, 500)
  }

  comfirmMsgAlarm = (from) => {
    Socket.emit("confirmMsgAlarm", { uid: this.props.userInfo, fromID: from })
  }

  onSubmitForm = async (data) => {
    if (this.state.selectId === null) {
      alert("받는 사람을 지정해주세요.");
      return;
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
    const msgList = this.props.MessageList
    return (
      <Container>
        <Wrapper padded={false} columns={2}>
          <Grid.Row>
            <ListContainer widescreen={8} largeScreen={8} computer={8} tablet={16} mobile={16}>
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
            <ContentContainer widescreen={8} largeScreen={8} computer={8} tablet={16} mobile={16}>
              <DetailWrapper ref={ref => this.list = ref}>
                {this.state.selectName &&
                  <div className="head" style={{ display: "flex" }}><TextFormat txt={this.state.selectName} chars={12} />님과의 대화</div>
                }
                {this.state.render &&
                  <MessageDetailContainer id={this.state.msgId} />
                }
              </DetailWrapper>
              <SendingMsg>
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
    );
  }
}

export default MessageList;

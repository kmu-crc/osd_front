import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header, Grid, Form, Modal } from "semantic-ui-react";
import Button from "components/Commons/Button";
import StyleGuide from "StyleGuide";
import UserImg from "source/thumbnail.png";
import PxtoRem from "modules/PxtoRem";
import { AsyncInput } from "components/Commons/FormItems";

const ModalContent = styled(Modal.Content)`
  & .ui.grid {
    margin: 0;
  }
  & ul {
    margin: 1rem 0 2rem 0;
  }
  & .newMember {
    & > button {
      float: right;
      width: 10%;
      height: 38px;
      padding: 0;
      margin-right: 1rem;
    }
    &::after {
      clear: both;
      display: block;
      content: "";
    }
  }
`;

const FormHeader = styled(Header)`
  position: relative;
  padding-right: 2.5rem !important;
  @media only screen and (max-width: 991px) {
    padding-bottom: 2rem !important;
  }
  &::after {
    position: absolute;
    display: inline-block;
    content: "";
    height: 20px;
    width: 100%;
    border-bottom: 3px solid ${StyleGuide.color.geyScale.scale5};
    bottom: 10px;
    left: 0;

    @media only screen and (min-width: 992px) {
      width: 1px;
      display: block;
      position: absolute;
      right: 2rem;
      top: 50%;
      left: initial;
      bottom: initial;
      transform: translateY(-50%);
      border-bottom: 0;
      border-right: 3px solid #191919;
    }
  }
`;

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: ${StyleGuide.font.size.paragraph};
  font-weight: 700;
  text-transform: none;
`;

const MemberItem = styled.div`
  width: ${PxtoRem(35)};
  height: ${PxtoRem(35)};
  border-radius: ${PxtoRem(17.5)};
  border: 1px solid #fff;
  margin-left: ${PxtoRem(-5)};
  float: left;
  position: relative;
  background-position: center;
  background-size: cover;
  background-color: ${StyleGuide.color.geyScale.scale5};
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  i.icon {
    text-align: center;
    width: 100%;
    font-size: ${PxtoRem(20)};
    line-height: ${PxtoRem(35)};
    margin: 0 auto;
    font-weight: bold
    color: ${StyleGuide.color.geyScale.scale9};
    &::before {
      margin: 0;
    }
  }
  &:first-child {
    margin-left: 0;
  }
`;

const MemberlistItem = styled.div`
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  &:hover,
  &:active,
  &:focus {
    background-color: ${StyleGuide.color.geyScale.scale4};
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .nickName {
    display: inline-block;
    margin-left: 0.5rem;
    line-height: ${PxtoRem(35)};
    width: ${PxtoRem(80)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  & button {
    float: right;
    display: block;
  }
`;

class ModifyDesignMember extends Component {

  componentDidMount(){
    this.props.DesignWaitingListRequest(this.props.match.params.id, this.props.token);
  }

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
  };

  getMember = data => {
    this.props.SearchMemberRequest(this.props.match.params.id, {key: data}, this.props.token);
  }

  getoutMember = (flag, id) => {
    if (this.props.DesignDetail.user_id === id) {
      alert("팀장은 탈퇴할 수 없습니다.");
      return;
    }
    const msg = flag === "DesignGetout" ? "이 회원을 탈퇴 처리 하시겠습니까?":"가입을 거절하시겠습니까?";
    const confirm = window.confirm(msg);
    if(!confirm) return;
    
    this.props.GetoutDesignRequest(this.props.match.params.id, id, this.props.token, flag)
      .then(res => {
        if (res.data && res.data.success) {
          if (flag === "DesignGetout") {
            alert("탈퇴 처리되었습니다.");
            this.props.GetDesignDetailRequest(this.props.match.params.id, this.props.token)
            .then(this.props.GetDesignCountRequest(this.props.match.params.id));
          } else if(flag==="DesignRefuse"){
            alert("가입 요청을 거절하였습니다.");
            this.props.DesignWaitingListRequest(this.props.match.params.id, this.props.token);
          }
        } else {
          alert("다시 시도해주세요.");
        }
      });
  }

  acceptMember = (id) => {
    const confirm = window.confirm("가입을 승인하시겠습니까?");
    if (confirm) {
      this.props.AcceptDesignRequest(this.props.match.params.id, id, this.props.token)
      .then(res => {
        if (res.data && res.data.success) {
          alert("승인되었습니다.");
          this.props.GetDesignDetailRequest(this.props.match.params.id, this.props.token)
          .then(this.props.GetDesignCountRequest(this.props.match.params.id))
          .then(this.props.DesignWaitingListRequest(this.props.match.params.id, this.props.token));
        } else {
          alert("다시 시도해주세요.");
        }
      });
    } else {
      return;
    }
  }

  joinMember = () => {
    const data = this.state.member.value;
    this.props.JoinDesignRequest(this.props.match.params.id, data, 1, this.props.token)
    .then(res => {
      if (res.data && res.data.success) {
        alert("가입 요청을 보냈습니다.");
        this.props.GetDesignDetailRequest(this.props.match.params.id, this.props.token);
      } else {
        alert("다시 시도해주세요.");
      }
    });
  }

  render() {
    const currentDesign = this.props.DesignDetail;

    return (
      <ModalContent>
        {currentDesign.length === 0 ?
        <div></div>
        :
        <Grid>
          <Grid.Column mobile={16} computer={4}>
            <FormHeader as="h2">멤버 관리</FormHeader>
          </Grid.Column>
          <Grid.Column mobile={16} computer={12}>
            <Form.Group widths="equal">
              <Label>현재 멤버</Label>
              <ul>
                {currentDesign.member && currentDesign.member.length > 0
                ? currentDesign.member.map((mem, i) =>
                  <li key={i}>
                    <MemberlistItem>
                      <MemberItem style={{backgroundImage: mem.thumbnail
                                  ? `url(${mem.thumbnail.s_img})`
                                  : `url(${UserImg})`}}/>
                      {" "}
                      <span className="nickName">{mem.nick_name}</span>
                      <Button size="small" onClick={() => this.getoutMember("DesignGetout", mem.user_id)}>탈퇴</Button>
                    </MemberlistItem>
                  </li>
                )
                : <li>멤버가 없습니다.</li>
                }
              </ul>
            </Form.Group>
            <Form.Group widths="equal">
              <Label>가입 신청중인 멤버</Label>
              <ul>
                {this.props.WaitingList.length > 0
                ? this.props.WaitingList.map((mem, i) =>
                  <li key={i}>
                    <MemberlistItem>
                      <MemberItem style={{backgroundImage: mem.s_img
                                  ? `url(${mem.s_img})`
                                  : `url(${UserImg})`}}/>
                      {" "}
                      <span className="nickName">{mem.nick_name}</span>
                      <Button size="small" onClick={() => this.getoutMember("DesignRefuse", mem.user_id)}>거절</Button>
                      <Button size="small" onClick={() => this.acceptMember(mem.user_id)}>승인</Button>
                    </MemberlistItem>
                  </li>
                )
                : <li>가입 신청중인 멤버가 없습니다.</li>
                }
              </ul>
            </Form.Group>
            <Form.Group widths="equal" className="newMember">
              <Label>새 멤버 초대</Label>
              <AsyncInput
                name="member"
                getValue={this.onChangeValue}
                asyncFn={this.getMember}
                list={this.props.members}
              />
              <Button size="small" onClick={this.joinMember}>초대</Button>
            </Form.Group>
          </Grid.Column>
        </Grid>
        }
        </ModalContent>
    );
  }
}
export default ModifyDesignMember;

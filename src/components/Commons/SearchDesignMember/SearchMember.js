import React, { Component } from "react";
import { FormInput } from "components/Commons/FormItem";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

const MemberItem = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background-color: #4D5256;
  color: #F8FAFB;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
`
const DeleteBtn = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  font-size: 12px;
  color: white;
  margin-left: 5px;
`
const MemberWrap = styled.div`
  margin-top: 1rem;
`
const SearchWrap = styled.div`
  position: relative;
  &.searchRect {
    display: inline-block;
    width:100%;
    .form-input {
      border:none;
      background: #EFEFEF;
      width: 85%;
      height: 30px;
      font-size: 18px;
      margin-top: 15px;
      margin-left: 50px;
    }
  }
`;
const MemberList = styled.ul`
  display: ${props => props.display};
  width: 353px;
  margin-left: 50px;
  padding: 0.5rem;
  min-height: 0px;
  max-height: 300px;
  overflow-Y: scroll;
  box-sizing: border-box;
  border: 1px solid #707070;
  background: #EFEFEF;
  border-radius: 3px;
  z-index: 999;
`;
const MemberListItem = styled.li`
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 5px;
`;

class SearchMember extends Component {
  state = { member: [], open: false, listOpen: false, }
  componentDidMount() {
    if (this.props.originalMember) {
      this.setState({ member: this.props.originalMember });
    }
  }

  getValue = (value) => {
    this.setState({ open: true });
    if (!value) {
      this.setState({ open: false });
      return;
    }
    this.props.SearchMemberRequest(null, { key: value }, this.props.token).then(data => { })
  }

  addMember = async (data) => {
    this.getValue("");
    this.props.addMember && this.props.addMember(data.email, data.s_img, data.nick_name, data.uid);
  }
  closeList = () => { this.setState({ open: false }); }
  onChangeInput() { this.setState({ listOpen: true }); }
  deleteMember = (index) => {
    let newArray = [...this.state.member];
    newArray.splice(index, 1);
    this.setState({ member: newArray });
    this.returnData();
  }

  returnData = () => {
    setTimeout(() => {
      if (this.props.onChangeMembers) this.props.onChangeMembers(this.state.member);
    }, 100)
  }
  render() {
    return (
      <SearchWrap className="searchRect">
        <FormInput className="form-input" type="text" name="search" placeholder=" 찾고자 하는 회원의 닉네임을 입력해 주세요." validates={this.props.validates} getValue={this.getValue} />
        <MemberList display={this.state.open ? "block" : "none"}>
          {this.props.members && this.props.members.map((item, index) => {
            return (<MemberListItem key={`member${index}`} onClick={() => this.addMember(item)}>{item.email}</MemberListItem>);
          })}
        </MemberList>
        <MemberWrap className="searchRect">
          {this.state.member.map((data, index) => {
            return (<MemberItem className="searchRect" key={index}>
              {data.nick_name}
              <span>
                <DeleteBtn className="searchRect" type="button" onClick={() => this.deleteMember(index)}>
                  <Icon className="searchRect" name="remove" />
                </DeleteBtn>
              </span>
            </MemberItem>)
          })}
        </MemberWrap>
      </SearchWrap>
    );
  }
}

export default SearchMember;

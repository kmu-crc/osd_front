import React, { Component } from "react";
import { FormInput } from "components/Commons/FormItem";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import market_style from "market_style";

const MemberItem = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background-color: #4d5256;
  color: #f8fafb;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size:${market_style.font.size.mini1};
  `
const DeleteBtn = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  font-size:${market_style.font.size.mini1};
  color: white;
  margin-left: 5px;
`
const MemberWrap = styled.div`
  margin-top: 1rem;
`

const SearchWrap = styled.div`
  width:100%;
  height:100%;
  position: relative;
  .form_item{
    outline:none;
  }
`

const MemberList = styled.ul`
  width: 100%;
  padding: 0.5rem;
  min-height: 100px;
  max-height: 300px;
  overflow-Y: scroll;
  box-sizing: border-box;
  border: 1px solid #181818;
  border-radius: 3px;
  background-color:white;
  position:absolute;
`

const MemberListItem = styled.li`
  width: 100%;
  padding: 10px;
  border: 1px solid #181818;
  border-radius: 3px;
  margin-bottom: 5px;
  background-color:#efefef;
  cursor:pointer;
  &:hover{
    backgroun-color:#eaeaea;
  }
`

class SearchMember extends Component {
  constructor(props){
    super(props);
    this.state = {
      member:[],open:false,
    }; 
    this.onClickEvent  = this.onClickEvent.bind(this);
  }
  componentDidMount() {
    if (this.props.originalMember) {
      this.setState({
        member: this.props.originalMember
      });
    }
      window.addEventListener("click", this.onClickEvent, false);
  }
  componentWillUnmount(){
      window.removeEventListener("click", this.onClickEvent, true);
  }
  onClickEvent(event){
     if(event.target.id!="thisRgn"){
      this.setState({open:false});
     }
  }
  getValue = (value) => {
    console.log("get:", value);
    this.setState({ open: true });
    if (!value) {
      this.setState({ open: false });
      return;
    }
    this.props.SearchMemberRequest(null, { key: value }, this.props.token).then(data => {

    })
  }

  addMember = async (data) => {
    let is_only = true;
    if (this.state.member.length > 0) {
      for (let item of this.state.member) {
        if (item.uid === data.uid) {
          is_only = await false;
          break;
        }
      }
    }
    if (is_only) {
      this.setState({
        member: [...this.state.member, data],
        open: false
      });
      this.returnData();
    }
  }
  closeList = () => {
    console.log("close")
    this.setState({ open: false });
  }

  deleteMember = (index) => {
    let newArray = [...this.state.member];
    newArray.splice(index, 1);
    this.setState({
      member: newArray
    });
    this.returnData();
  }

  returnData = () => {
    setTimeout(() => {
      if (this.props.onChangeMembers) this.props.onChangeMembers(this.state.member);
    }, 100)
  }
  render() {
    return (
      <SearchWrap id="thisRgn">
        <FormInput id="thisRgn" className="form_item" type="text" name="search" placeholder="찾고자 하는 회원의 닉네임을 입력해 주세요." validates={this.props.validates} getValue={this.getValue} />
        <MemberList id="thisRgn" style={this.state.open ? { display: "block" } : { display: "none" }}>
          {this.props.members && this.props.members.map((item, index) => {
            return (<MemberListItem id="thisRgn" key={`member${index}`} onClick={() => this.addMember(item)}>{item.email}</MemberListItem>);
          })}
        </MemberList>
        <MemberWrap>
          {this.state.member.map((data, index) => {
            // console.log(data);
            return (<MemberItem key={index}>
              {data.nick_name}
              <span>
                <DeleteBtn type="button" onClick={() => this.deleteMember(index)}>
                  <Icon name="remove" />
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

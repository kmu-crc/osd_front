import React, { Component } from "react";
import { FormInput } from "components/Commons/FormItem";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";



const MemberItem = styled.div`
  display: inline-block;
  padding: 10px 10px;
  background-color: #4d5256;
  color: #f8fafb;
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
`

const MemberList = styled.ul`
  width: 353px;
  margin-left: 50px;
  padding: 0.5rem;
  min-height: 0px;
  max-height: 300px;
  overflow-Y: scroll;
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  box-shadow:0px 2px 10px 2px rgba(0,0,0,0.1);
`

const MemberListItem = styled.li`
  width: 100%;
  padding: 10px;
  background:#EFEFEF;
  color:#707070;
  border-radius: 10px;
  margin-bottom: 5px;
`

class SearchMember extends Component {
  state = {
    member: [],
    open: false
  }

  componentDidMount() {
    if (this.props.originalMember) {
      this.setState({
        member: this.props.originalMember
      });
    }
  }

  getValue = (value) => {
    console.log("get", value);
    this.setState({open: true});
    if(!value) {
      this.setState({open: false});
      return;
    }
    this.props.SearchMemberRequest(null,{ key: value }, this.props.token).then(data => {

    })
  }

  addMember = async (data) => {
    console.log("ADDMEMBER:",data)
    this.props.addMemberItem && this.props.addMemberItem(data.uid,data.nick_name);
    //let is_only = true;
    // if(this.state.member.length > 0) {
    //   for( let item of this.state.member){
    //     if(item.uid === data.uid){
    //       is_only = await false;
    //       break;
    //     }
    //   }
    // }
    // if(is_only){
    //   this.setState({
    //     member: [...this.state.member, data],
    //     open: false
    //   });
    //   this.returnData();
    // }
  }
  closeList = () => {
    console.log("close")
    this.setState({open: false});
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
      if(this.props.onChangeMembers) this.props.onChangeMembers(this.state.member);
    }, 100)
  }
  render() {
    return (
      <SearchWrap id = "searchRect" style={{display:"inline-block"}}>
        <FormInput  id = "searchRect" type="text" 
        style={{boxShadow:"0px 2px 10px 2px rgba(0,0,0,0.1)",borderRadius:"10px",paddingLeft:"10px" ,outline:"none",border:"none",width:"353px",height:"40px",fontSize:"18px",marginLeft:"50px",}} 
        name="search" placeholder="찾고자 하는 회원의 닉네임을 입력해 주세요." validates={this.props.validates} getValue={this.getValue}/>
        <MemberList  id = "searchRect" style={this.state.open ? {display: "block"} : {display: "none"}}>
          {this.props.members && this.props.members.map((item, index) => {
            return (<MemberListItem key={`member${index}`} onClick={() => this.addMember(item)}>{item.email}</MemberListItem>);
          })}
        </MemberList>
        <MemberWrap  id = "searchRect">
          {this.state.member.map((data, index) => {
            console.log(data);
            return (<MemberItem  id = "searchRect" key={index}>
              {data.nick_name}
              <span>
                <DeleteBtn  id = "searchRect" type="button" onClick={() => this.deleteMember(index)}>
                  <Icon  id = "searchRect" name="remove" />
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

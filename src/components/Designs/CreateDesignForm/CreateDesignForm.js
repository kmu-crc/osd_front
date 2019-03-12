import React, { Component } from "react";
import Button from "components/Commons/Button";
import styled from "styled-components";
import { Header, Grid, Form, Icon } from "semantic-ui-react";
import { FormInput, FormThumbnail, FormCheckBox, AsyncInput, FormSelect } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";
import copyObject from "modules/CopyObject/CopyObject";

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 70px;
  margin-bottom: 30px;
  border-radius: 3px;
  @media only screen and (min-width: 1200px) {
    padding: 70px 100px 0 100px;
  }
  & .field label {
    margin: 0 0 0.8rem 0;
    display: block;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
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
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

const SearchMember = styled.div`
  margin-bottom: 30px;
  & input {
    border: 1px solid ${StyleGuide.color.geyScale.scale3};
    padding: 1 1rem;
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
  border: 1px solid ${StyleGuide.color.geyScale.scale3};
  border-radius: 3px;
  box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
`;

const MemberListItem = styled.li`
  width: 100%;
  padding: 10px;
  border: 1px solid ${StyleGuide.color.geyScale.scale3};
  border-radius: 3px;
  margin-bottom: 5px;

  .email {
    font-size: ${StyleGuide.font.size.paragraph};
    color: ${StyleGuide.color.geyScale.scale7};
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .name {
    font-size: ${StyleGuide.font.size.small};
    color: ${StyleGuide.color.geyScale.scale5};
  }
`;

const AddList = styled.div`
  position: relative;
  margin-top: 1rem;
  width: 100%;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const AddItem = styled.div`
  font-size: ${StyleGuide.font.size.small};
  background-color: ${StyleGuide.color.geyScale.scale7};
  color: white;
  width: auto;
  display: inline-block;
  padding: 0.5em 1em;
  margin-right: 1em;
  margin-bottom: 10px;
  border-radius: 3px;
  position: relative;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  font-size: 12px;
  color: white;
  margin-left: 5px;
  i.icon {
    margin: 0;
  }
`;

class CreateDesignForm extends Component {
  state = {
    msgId: -1,
    selectId: null,
    selectName: null,
    openMember: false,
    friendList: [],
    render: true,
    value: [],
    target: null,
    validates: [],
    textValue: "",
    members: [],
    render: false,
    top: false

  }

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
  };

  liveCheck = (target) => {
    FormControl(this.state[target]);
  };

  onSubmit = async e => {
    e.preventDefault();
    this.state.member.value = JSON.stringify(this.state.member.value);
    ValidationGroup(this.state, false).then(data => {
      console.log("성공", data);
      this.props.setLoader();
      this.props.CreateDesignRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          this.props.history.push(`/designDetail/${res.design_id}`);
        } else {
          alert("다시 시도해주세요");
          this.state.member.value = JSON.parse(this.state.member.value);
          this.props.setLoader();
        }
      });
    }).catch(e => {
      console.log("실패", e);
      this.state.member.value = JSON.parse(this.state.member.value);
    });
  };

  getMember = data => {
    this.props.SearchMemberRequest(null, {key: data}, this.props.token);
  }


  getValue = value => {
    this.setState({
      openMember: true
    });

    if(!value) {
      this.setState({
        openMember: false
      });
      return;
    }
    this.props.SearchMemberRequest(null, { key: value.value }, this.props.token);
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

  addMember = async (data, index) => {
    console.log("add");
    let newArr = [...this.state.value];
    let newMembers = [...this.state.members];
    newMembers.splice(index, 1);
    newArr.push(data);
    await this.setState({ value: newArr, members: newMembers });
    this.returnData();
  };

  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  deleteItem = async (data, index) => {
    let newArr = [...this.state.value];
    newArr.splice(index, 1);
    let newMembers = await this.createNewMember(newArr, this.props.list);
    console.log(newMembers);
    await this.setState({ value: newArr, members: newMembers });
    this.returnData();
  };

  createNewMember = async (arr, origin) => {
    console.log("creaeNewMember", arr, origin);
    if (origin && origin.length > 0) {
      let newArr = [...origin];
      if (arr && arr.length > 0) {
        for (let item of arr) {
          for (let i = 0; i < origin.length; i++) {
            console.log(item.uid, newArr[i].uid);
            if (item.uid === newArr[i].uid) {
              console.log("index", i);
              await newArr.splice(i, 1);
              i = 0;
              break;
            }
          }
        }
      }
      return newArr;
    } else {
      return [];
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FromFieldCard>
          <Grid>
            <Grid.Column mobile={16} computer={4}>
              <FormHeader as="h2">디자인 정보</FormHeader>
            </Grid.Column>
            <Grid.Column mobile={16} computer={12}>
              <Form.Group widths="equal" className="clearFix">
                <Label>디자인 제목</Label>
                <FormInput
                  name="title"
                  maxLength="100"
                  placeholder="디자인의 제목을 입력해주세요. (100자 이내)"
                  getValue={this.onChangeValue}
                  validates={["Required"]}
                  onBlur={()=>{this.liveCheck("title")}}
                />
              </Form.Group>
              <Form.Group widths="equal" className="clearFix">
                <Label>디자인 설명</Label>
                <FormInput
                  name="explanation"
                  maxLength="1000"
                  placeholder="디자인 설명을 입력해주세요. (1000자 이내)"
                  getValue={this.onChangeValue}
                />
              </Form.Group>
              <Form.Group widths="equal" className="clearFix">
                <Label>썸네일 등록</Label>
                <FormThumbnail
                  name="thumbnail"
                  placeholder="썸네일 등록"
                  getValue={this.onChangeValue}
                  onChange={()=>{this.liveCheck("thumbnail")}}
                  validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
                />
              </Form.Group>
              <Form.Group widths="equal" className="clearFix">
                <Label>카테고리</Label>
                <FormSelect
                  selection={true}
                  options={this.props.cate1}
                  name="category_level1"
                  getValue={this.onChangeValue}
                  onChange={()=>this.props.GetCategoryLevel2Request(this.state.category_level1.value)}
                />
                <FormSelect
                  selection={true}
                  options={this.props.cate2}
                  name="category_level2"
                  getValue={this.onChangeValue}
                />
              </Form.Group>
              <Form.Group widths="equal" className="clearFix">
                <SearchMember>
                  <Label>멤버 초대</Label>
                  <FormInput type="text" name="search" placeholder="찾고자 하는 회원의 닉네임을 입력해 주세요." validates={["MinLength2"]} getValue={this.getValue}/>
                  <MemberList style={this.state.openMember ? {display: "block"} : {display: "none"}}>
                    {this.props.members && this.props.members.map((item, index) => {
                      return (<MemberListItem key={`member${index}`} onClick={() => this.addMember(item,index)}>
                      <p className="email">{item.email}</p>
                      <p className="name">{item.nick_name}</p>
                      </MemberListItem>);
                    })}
                  </MemberList>
                </SearchMember>
              </Form.Group>
            <AddList>
              {this.state.value.constructor.name === "Array" &&
                this.state.value.length > 0 &&
                this.state.value.map((item, index) => {
                  return (
                    <AddItem key={`additem${index}`}>
                      {item.nick_name}
                      <DeleteBtn
                        type="button"
                        onClick={() => this.deleteItem(item, index)}
                      >
                        <Icon name="close" />
                      </DeleteBtn>
                    </AddItem>
                  );
                })}
            </AddList>

            </Grid.Column>
          </Grid>
        </FromFieldCard>
        <FromFieldCard>
          <Grid>
            <Grid.Column mobile={16} computer={4}>
              <FormHeader as="h2">라이센스</FormHeader>
            </Grid.Column>
            <Grid.Column mobile={16} computer={12}>
              <Form.Group widths={4}>
                <FormCheckBox
                  name="is_commercial"
                  placeholder="상업적 이용 가능"
                  getValue={this.onChangeValue}
                  value={true}
                />
                <FormCheckBox
                  name="is_display_creater"
                  placeholder="원작자 표시"
                  getValue={this.onChangeValue}
                  value={true}
                />
                <FormCheckBox
                  name="is_modify"
                  placeholder="수정 가능"
                  getValue={this.onChangeValue}
                  value={true}
                />
              </Form.Group>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
        <Button type="submit">등록</Button>
      </form>
    );
  }
}

export default CreateDesignForm;

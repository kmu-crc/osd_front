import React, { Component } from "react";
import Button from "components/Commons/Button";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
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

class CreateDesignForm extends Component {

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

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FromFieldCard>
          <Grid>
            <Grid.Column mobile={16} computer={4}>
              <FormHeader as="h2">디자인 정보</FormHeader>
            </Grid.Column>
            <Grid.Column mobile={16} computer={12}>
              <Form.Group widths="equal">
                <Label>디자인 제목</Label>
                <FormInput
                  name="title"
                  placeholder="디자인의 제목을 입력해주세요."
                  getValue={this.onChangeValue}
                  validates={["Required"]}
                  onBlur={()=>{this.liveCheck("title")}}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Label>디자인 설명</Label>
                <FormInput
                  name="explanation"
                  placeholder="디자인 설명을 입력해주세요."
                  getValue={this.onChangeValue}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Label>썸네일 등록</Label>
                <FormThumbnail
                  name="thumbnail"
                  placeholder="썸네일 등록"
                  getValue={this.onChangeValue}
                  onChange={()=>{this.liveCheck("thumbnail")}}
                  validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
                />
              </Form.Group>
              <Form.Group widths="equal">
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
              <Form.Group widths="equal">
                <Label>멤버 초대</Label>
                <AsyncInput
                  name="member"
                  getValue={this.onChangeValue}
                  asyncFn={this.getMember}
                  list={this.props.members}
                />
              </Form.Group>
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

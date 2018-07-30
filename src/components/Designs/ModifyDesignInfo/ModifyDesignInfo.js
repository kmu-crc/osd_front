import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import Button from "components/Commons/Button";
import { FormInput, FormThumbnail, FormCheckBox, AsyncInput, FormSelect } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import Loading from "components/Commons/Loading";
import StyleGuide from "StyleGuide";

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

const InfoWrapper = styled.div`
  & .formWrap {
    background-color: white;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    border-top-left-radius: 0;
    width: 100%;
    padding: 70px;
    margin-bottom: 30px;
    @media only screen and (min-width: 1200px) {
      padding: 70px 100px 0 100px;
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
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

class ModifyDesignInfo extends Component {

  componentWillMount() {
    this.props.GetDesignDetailRequest(this.props.match.params.id, this.props.token)
    .then(data => {
      console.log(data);
      this.props.GetCategoryLevel2Request(data.DesignDetail.category_level1);
    });
  }

  liveCheck = (target) => {
    FormControl(this.state[target]);
  };

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
  };

  returnToMemberFormat = (arr) => {
    let list = [];
    if (arr !== null) {
      arr.map(user => {
        const userInfo = {
          uid: user.user_id,
          nick_name: user.nick_name
        }
        list.push(userInfo);
      });
    }
    return list;
  }

  getMember = data => {
    this.props.SearchMemberRequest({key: data}, this.props.token);
  }

  onSubmit = async e => {
    e.preventDefault();
    this.state.member.value = JSON.stringify(this.state.member.value);
    ValidationGroup(this.state, false).then(data => {
      console.log("성공", data);
      this.props.setLoader();
      this.props.UpdateDesignInfoRequest(data, this.props.DesignDetail.uid, this.props.token)
      .then(data => {
        if (data.res.success) {
          this.props.history.push(`/designDetail/${data.res.design_id}`);
        } else {
          alert("다시 시도해주세요");
          this.props.setLoader();
        }
      });
    }).catch(e => {
      console.log("실패", e);
      this.state.member.value = JSON.parse(this.state.member.value);
    });
  };

  render() {
    const currentDesign = this.props.DesignDetail;

    return (
      <InfoWrapper>
        {currentDesign.length === 0 ?
        <div></div>
        :
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
                    getValue={this.onChangeValue}
                    validates={["Required"]}
                    onBlur={()=>{this.liveCheck("title")}}
                    value={currentDesign.title}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Label>디자인 설명</Label>
                  <FormInput
                    name="explanation"
                    getValue={this.onChangeValue}
                    value={currentDesign.explanation}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Label>썸네일 수정</Label>
                  <FormThumbnail
                    name="thumbnail"
                    placeholder="썸네일 수정"
                    getValue={this.onChangeValue}
                    onChange={()=>{this.liveCheck("thumbnail")}}
                    image={currentDesign.img && currentDesign.img.m_img}
                    validates={["OnlyImages", "MaxFileSize(10000000)"]}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Label>카테고리</Label>
                  <FormSelect
                    selection={true}
                    options={this.props.category1}
                    name="category_level1"
                    getValue={this.onChangeValue}
                    onChange={()=>this.props.GetCategoryLevel2Request(this.state.category_level1.value)}
                    value={currentDesign.category_level1}
                  />
                  <FormSelect
                    selection={true}
                    options={this.props.category2}
                    name="category_level2"
                    getValue={this.onChangeValue}
                    value={currentDesign.category_level2}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Label>멤버추가</Label>
                  <AsyncInput
                    name="member"
                    getValue={this.onChangeValue}
                    asyncFn={this.getMember}
                    list={this.props.members}
                    value={this.returnToMemberFormat(currentDesign.member)}
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
                    placeholder="상업적 이용"
                    getValue={this.onChangeValue}
                    value={currentDesign.is_commercial}
                  />
                  <FormCheckBox
                    name="is_display_creater"
                    placeholder="원작자 표시"
                    getValue={this.onChangeValue}
                    value={currentDesign.is_display_creater}
                  />
                  <FormCheckBox
                    name="is_modify"
                    placeholder="수정 가능"
                    getValue={this.onChangeValue}
                    value={currentDesign.is_modify}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
          </FromFieldCard>
          <Button type="submit">수정</Button>
        </form>
        }
        </InfoWrapper>
    );
  }
}
export default ModifyDesignInfo;

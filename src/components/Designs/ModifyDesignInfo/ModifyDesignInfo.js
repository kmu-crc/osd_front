import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import {
  FormCheckBox,
  FormInput,
  FormTextArea,
  FormFile,
  FormSelect
} from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import FileUploader from "components/Commons/FileUploader";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import SearchMemberContainer from "containers/Commons/SearchMemberContainer";
import Loading from "components/Commons/Loading";
import StyleGuide from "StyleGuide";

const InfoWrapper = styled.div`
  padding: 70px;
  margin-bottom: 30px;
  @media only screen and (min-width: 1200px) {
    padding: 70px 100px 0 100px;
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
class ModifyDesignInfo extends Component {
  state = {
    members: [],
    loading: false
  }

  componentWillMount() {
    this.props.GetDesignDetailRequest(this.props.match.params.id, this.props.token)
    .then(data => {
      this.props.GetCategoryLevel2Request(data.DesignDetail.category_level1);
    }).then(() => {
      this.setState({
        members: this.returnToMemberFormat(this.props.DesignDetail.member)
      });
    });
  }

  onChangeCategory1 = async value => {
    await this.props.GetCategoryLevel2Request(value);
  };

  onChangeMembers = (data) => {
    if (data.length === 0) {
      const userInfo = [{
        uid: this.props.DesignDetail.user_id,
        nick_name: this.props.DesignDetail.userName
      }];
      this.setState({
        members: userInfo
      });
    } else {
      this.setState({
        members: data
      });
    }
  }

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
    console.log(list);
    return list;
  }

  onSubmitForm = async (data) => {
    await this.setState({
      loading: true
    });

    data.delete("search");
    if(this.state.members !== []){
      data.append("members", JSON.stringify(this.state.members));
    }
    this.props.UpdateDesignInfoRequest(data, this.props.DesignDetail.uid, this.props.token)
    .then(data => {
      if (data.res.success === true) {
        alert("정보가 수정되었습니다.");
        this.props.history.push(`/designDetail/${this.props.DesignDetail.uid}`);
      } else {
        alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      }
    });
  }

  render() {
    const currentDesign = this.props.DesignDetail;
    
    return (
      <InfoWrapper>
        {currentDesign.length === 0 ?
        <div></div>
        :
        <ValidateForm onSubmit={this.onSubmitForm} enctype="multipart/form-data">
          <div>
            <Grid>
              <Grid.Column mobile={16} computer={4}>
                <FormHeader as="h2">디자인 정보</FormHeader>
              </Grid.Column>
              <Grid.Column mobile={16} computer={12}>
                <Form.Group widths="equal">
                  <FormField
                    name="title"
                    label="디자인 제목"
                    placeholder="디자인의 제목을 입력해주세요."
                    type="text"
                    value={currentDesign.title}
                    validates={["required"]}
                    RenderComponent={FormInput}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <FormField
                    name="explanation"
                    placeholder="디자인 설명을 입력해주세요."
                    label="디자인 설명"
                    value={currentDesign.explanation}
                    RenderComponent={FormTextArea}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <FormField
                    name="thumbnail"
                    placeholder="썸네일을 변경하려면 클릭하세요"
                    label="썸네일"
                    RenderComponent={FormFile}
                    // validates={["ThumbnailSize"]}
                  />
                </Form.Group>
                <Form.Group widths={2}>
                    <FormField
                      name="category_level1"
                      selection={true}
                      getValue={this.onChangeCategory1}
                      options={this.props.category1}
                      label="카테고리"
                      value={currentDesign.category_level1}
                      RenderComponent={FormSelect}
                    />
                    <FormField
                      name="category_level2"
                      selection={true}
                      options={this.props.category2}
                      label="카테고리2"
                      value={currentDesign.category_level2}
                      RenderComponent={FormSelect}
                    />
                  </Form.Group>
                <Form.Group widths="equal">
                  <FormField
                    label="멤버추가"
                    RenderComponent={SearchMemberContainer}
                    validates={["MinLength2"]}
                    onChangeMembers={this.onChangeMembers}
                    originalMember={this.returnToMemberFormat(currentDesign.member)}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
          </div>
          <div>
            <Grid>
              <Grid.Column mobile={16} computer={4}>
                <FormHeader as="h2">라이센스</FormHeader>
              </Grid.Column>
              <Grid.Column mobile={16} computer={12}>
                <Form.Group widths={4}>
                  <FormField
                    name="is_commercial"
                    label="상업적 이용"
                    placeholder="허가"
                    checked={currentDesign.is_commercial === 1 ? "1" : "0"}
                    RenderComponent={FormCheckBox}
                  />
                  <FormField
                    name="is_display_creater"
                    label="원작자 표시"
                    placeholder="필수"
                    checked={currentDesign.is_display_creater === 1 ? "1" : "0"}
                    RenderComponent={FormCheckBox}
                  />
                  <FormField
                    name="is_modify"
                    label="수정 가능"
                    placeholder="허가"
                    checked={currentDesign.is_modify === 1 ? "1" : "0"}
                    RenderComponent={FormCheckBox}
                  />
                  <FormField
                    name="is_public"
                    label="디자인 공개 여부"
                    placeholder="공개"
                    checked={currentDesign.is_public === 1 ? "1" : "0"}
                    RenderComponent={FormCheckBox}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
            <Button type="submit">수정</Button>
          </div>
        </ValidateForm>
        }
        {this.state.loading && <Loading/>}
        </InfoWrapper>
    );
  }
}
export default ModifyDesignInfo;

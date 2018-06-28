import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import {
  FormCheckBox,
  FormInput,
  FormTextArea,
  FormFile,
  FormRadio
} from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import CheckBoxFieldContainer from "containers/Commons/CheckBoxFieldContainer";
import FileUploader from "components/Commons/FileUploader";
import ValidateForm from "components/Commons/ValidateForm";
import SearchMemberContainer from "containers/Commons/SearchMemberContainer";
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
  render() {
    const currentDesign = this.props.DesignDetail;
    console.log(currentDesign);
    
    return (
      <div>
        {currentDesign.length === 0 ?
        <div></div>
        :
        <ValidateForm onSubmit={this.onSubmitForm}>
          <FromFieldCard>
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
                    placeholder="썸네일 이미지를 등록하세요."
                    label="썸네일"
                    RenderComponent={FormFile}
                    validates={["required", "ThumbnailSize"]}
                  />
                </Form.Group>
                <CheckBoxFieldContainer {...this.props}/>
                <Form.Group widths="equal">
                  <FormField
                    label="멤버추가"
                    RenderComponent={SearchMemberContainer}
                    validates={["MinLength2"]}
                    onChangeMembers={this.props.onChangeMembers}
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
                  <FormField
                    name="is_commercial"
                    label="상업적 이용"
                    placeholder="허가"
                    checked={currentDesign.is_commercial === 1 ? true : 0}
                    RenderComponent={FormCheckBox}
                  />
                  <FormField
                    name="is_display_creater"
                    label="원작자 표시"
                    placeholder="필수"
                    checked={currentDesign.is_display_creater === 1 ? true : 0}
                    RenderComponent={FormCheckBox}
                  />
                  <FormField
                    name="is_modify"
                    label="수정 가능"
                    placeholder="허가"
                    checked={currentDesign.is_modify === 1 ? true : 0}
                    RenderComponent={FormCheckBox}
                  />
                  <FormField
                    name="is_public"
                    label="디자인 공개 여부"
                    placeholder="공개"
                    checked={currentDesign.is_public === 1 ? true : 0}
                    RenderComponent={FormCheckBox}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
          </FromFieldCard>
        </ValidateForm>
        }
        </div>
    );
  }
}
export default ModifyDesignInfo;

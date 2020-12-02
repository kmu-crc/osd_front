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
import SearchMemberContainer from "containers/Commons/SearchMemberContainer";
import opendesign_style from "opendesign_style";

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
  & .field[name="is_public"] {
    display: none;
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
    border-bottom: 3px solid ${opendesign_style.color.grayScale.scale5};
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

class CreateDesingFormContent extends Component {
  state = {
    currentValue: "1"
  };
  onChangeRadio = value => {
    this.setState({ currentValue: value });
  };
  render() {
    const BlogContent = () => {
      return (
        <FromFieldCard>
          <Grid>
            <Grid.Column mobile={16} computer={4}>
              <FormHeader as="h2">디자인 정보</FormHeader>
            </Grid.Column>
            <Grid.Column mobile={16} computer={12}>
              <FormField
                name="design_file"
                label="디자인 파일"
                placeholder="디자인 이미지를 등록해 주세요."
                validates={["required", "onlyImages"]}
                RenderComponent={FileUploader}
                onChange={this.props.onChangeDesing}
              />
              <FormField
                name="source_file"
                label="소스 파일"
                placeholder="작업 소스파일을 등록해 주세요."
                validates={["required"]}
                RenderComponent={FileUploader}
                onChange={this.props.onChangeSource}
              />
            </Grid.Column>
          </Grid>
        </FromFieldCard>
      );
    };
    return (
      <div>
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
                  validates={["required"]}
                  RenderComponent={FormInput}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <FormField
                  name="explanation"
                  placeholder="디자인 설명을 입력해주세요."
                  label="디자인 설명"
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
              <CheckBoxFieldContainer />
              <Form.Group widths="equal">
                <FormField
                  label="맴버추가"
                  RenderComponent={SearchMemberContainer}
                  validates={["MinLength2"]}
                  onChangeMembers={this.props.onChangeMembers}
                />
              </Form.Group>
              <div className="field">
                <label>템플릿</label>
                <Form.Group>
                  <FormField
                    name="is_project"
                    placeholder="블로그 형태"
                    value="0"
                    currentValue={this.state.currentValue}
                    onChange={this.onChangeRadio}
                    RenderComponent={FormRadio}
                  />
                  <FormField
                    name="is_project"
                    placeholder="단계가지는 디자인 형태"
                    value="1"
                    currentValue={this.state.currentValue}
                    onChange={this.onChangeRadio}
                    RenderComponent={FormRadio}
                  />
                </Form.Group>
              </div>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
        {this.state.currentValue === "0" && <BlogContent />}
        <FromFieldCard>
          <Grid>
            <Grid.Column mobile={16} computer={4}>
              <FormHeader as="h2">라이센스<sup style={{ color: "red" }}>*</sup></FormHeader>
            </Grid.Column>
            <Grid.Column mobile={16} computer={12}>
              <Form.Group widths={4}>
                <FormField
                  name="is_commercial"
                  label="상업적 이용"
                  placeholder="허가"
                  checked="1"
                  RenderComponent={FormCheckBox}
                />
                <FormField
                  name="is_display_creater"
                  label="원작자 표시"
                  placeholder="필수"
                  checked="1"
                  RenderComponent={FormCheckBox}
                />
                <FormField
                  name="is_modify"
                  label="수정 가능"
                  placeholder="허가"
                  checked="1"
                  RenderComponent={FormCheckBox}
                />
                {/* <FormField
                  name="is_public"
                  label="디자인 공개 여부"
                  placeholder="공개"
                  checked="1"
                  RenderComponent={FormCheckBox}
                /> */}
              </Form.Group>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
      </div>
    );
  }
}
export default CreateDesingFormContent;

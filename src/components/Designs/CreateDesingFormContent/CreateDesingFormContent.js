import React, { Component } from 'react';
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import { FormCheckBox, FormInput, FormTextArea, FormFile, FormRadio } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import CheckBoxFieldContainer from "containers/Commons/CheckBoxFieldContainer";
import FileUploader from "components/Commons/FileUploader";

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  padding: 40px;
  margin-bottom: 30px;
`
const FormHeader = styled(Header) `
  position: relative;
  padding-right: 2.5rem !important;
  &::after{
    position: absolute;
    display: block;
    right: 2rem;
    content: "";
    height: 20px;
    border-right: 3px solid #191919;
    top: 50%;
    transform: translateY(-50%);
  }
`
class CreateDesingFormContent extends Component {
  state = {
    currentValue: "0"
  }
  onChangeRadio = (value) => {
    this.setState({ currentValue: value });
  }
  render() {
    const BlogContent = () => {
      console.log("설마");
      return (
        <FromFieldCard>
          <Grid>
            <Grid.Column width={4}>
              <FormHeader as="h2">디자인 정보</FormHeader>
            </Grid.Column>
            <Grid.Column width={12}>
              <FormField name="design_file" label="디자인 파일" placeholder="디자인 이미지를 등록해 주세요." validates={["required", "onlyImages"]} RenderComponent={FileUploader} onChange={this.props.onChangeDesing} />
              <FormField name="source_file" label="소스 파일" placeholder="작업 소스파일을 등록해 주세요." validates={["required"]} RenderComponent={FileUploader} onChange={this.props.onChangeSource} />
            </Grid.Column>
          </Grid>
        </FromFieldCard>
      )
    }
    return (
      <div>
        <FromFieldCard>
          <Grid>
            <Grid.Column width={4}>
              <FormHeader as="h2">디자인 정보</FormHeader>
            </Grid.Column>
            <Grid.Column width={12}>
              <Form.Group widths="equal">
                <FormField name="title" label="디자인 제목" placeholder="디자인의 제목을 입력해주세요." type="text" validates={["required"]} RenderComponent={FormInput} />
              </Form.Group>
              <Form.Group widths="equal">
                <FormField name="explanation" placeholder="디자인 설명을 입력해주세요." label="디자인 설명" RenderComponent={FormTextArea} />
              </Form.Group>
              <Form.Group widths="equal">
                <FormField name="thumbnail" placeholder="섬네일 이미지를 등록하세요." label="섬네일" RenderComponent={FormFile} validates={["required", "ThumbnailSize"]} />
              </Form.Group>
              <CheckBoxFieldContainer />
              <div className="field">
                <label>템프릿</label>
                <Form.Group>
                  <FormField name="is_project" placeholder="블로그 형태" value="0" currentValue={this.state.currentValue} onChange={this.onChangeRadio} RenderComponent={FormRadio} />
                  <FormField name="is_project" placeholder="프로젝트 형태" value="1" currentValue={this.state.currentValue} onChange={this.onChangeRadio} RenderComponent={FormRadio} />
                </Form.Group>
              </div>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
        {this.state.currentValue === "0" && <BlogContent />}
        <FromFieldCard>
          <Grid>
            <Grid.Column width={4}>
              <FormHeader as="h2">라이센스</FormHeader>
            </Grid.Column>
            <Grid.Column width={12}>
              <Form.Group widths={4}>
                <FormField name="is_commercial" label="상업적 이용" placeholder="허가" RenderComponent={FormCheckBox} />
                <FormField name="is_display_creater" label="원작자 표시" placeholder="필수" RenderComponent={FormCheckBox} />
                <FormField name="is_modify" label="수정 가능" placeholder="허가" RenderComponent={FormCheckBox} />
                <FormField name="is_public" label="디자인 공개 여부" placeholder="공개" RenderComponent={FormCheckBox} />
              </Form.Group>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
      </div>
    );
  }
}
export default CreateDesingFormContent;

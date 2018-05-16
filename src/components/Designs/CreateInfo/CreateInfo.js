import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import { FormCheckBox, FormInput, FormTextArea, FormSelect } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  padding: 40px;
  margin-bottom: 30px;
`
const FormHeader = styled(Header)`
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

class CreateInfo extends Component{
  render(){
    return(
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
            {/* <FileField name="thumbnail" placeholder="섬네일 이미지를 등록하세요." label="섬네일"/> */}
          </Form.Group>
          <Form.Group widths={2}>
            <FormField name="category_level1" options={[{ text: "디자인", value: 1 }, { text: "스마트", value: 2 }]} label="카테고리" validates={["required"]} RenderComponent={FormSelect}/>
            <FormField name="category_level2" options={[{ text: "시각", value: 1 }, { text: "패션", value: 2 }]} label="카테고리2" validates={["required"]} RenderComponent={FormSelect}/>
          </Form.Group>
        </Grid.Column>
      </Grid>
    </FromFieldCard>
    <FromFieldCard>
    <Grid>
      <Grid.Column width={4}>
          <FormHeader as="h2">라이센스</FormHeader>
        </Grid.Column>
        <Grid.Column width={12}>
        <Form.Group widths={4}>
            <FormField name="is_copy" label="상업적 이용" placeholder="허가" RenderComponent={FormCheckBox}/>
            <FormField name="is_display_creater" label="원작자 표시" placeholder="필수" RenderComponent={FormCheckBox} />
            <FormField name="is_modify" label="수정 가능" placeholder="허가" RenderComponent={FormCheckBox} />
            <FormField name="is_share" label="디자인 공개 여부" placeholder="공개" RenderComponent={FormCheckBox} />
          </Form.Group>
        </Grid.Column>
    </Grid>
    </FromFieldCard>
      </div>
    );
  }
}

export default CreateInfo;

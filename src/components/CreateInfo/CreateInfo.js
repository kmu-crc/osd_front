import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { InputField, TextAreaField, SelectField, FileField, CheckBoxField } from "../commons/FormField";

const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  padding: 40px;
  margin-bottom: 30px;
`

class CreateInfo extends Component{
  render(){
    return(
      <div>
<FromFieldCard>
      <Grid divided={true}>
        <Grid.Column width={3}>
          <Header as="h2">디자인 정보</Header>
        </Grid.Column>
        <Grid.Column width={13}>
          <Form.Group widths="equal">
            <InputField name="title" label="디자인 제목" placeholder="디자인의 제목을 입력해주세요." type="text" validates={["required"]} />
          </Form.Group>
          <Form.Group widths="equal">
            <TextAreaField type="text" name="explanation" placeholder="디자인 설명을 입력해주세요." label="디자인 설명" />
          </Form.Group>
          <Form.Group  widths="equal">
            <FileField name="thumbnail" placeholder="섬네일 이미지를 등록하세요." label="섬네일"/>
          </Form.Group>
          <Form.Group widths={2}>
            <SelectField name="category_level1" options={[{ text: "디자인", value: 1 }, { text: "스마트", value: 2 }]} label="카테고리" placeholder="카테고리를 골라주세요." validates={["required"]} />
            <SelectField name="category_level2" options={[{ text: "시각", value: 1 }, { text: "패션", value: 2 }]} label="카테고리2" placeholder="카테고리2를 골라주세요." validates={["required"]} />
          </Form.Group>
        </Grid.Column>
      </Grid>
    </FromFieldCard>
    <FromFieldCard>
    <Grid divided={true}>
    <Grid.Column width={3}>
          <Header as="h2">라이센스</Header>
        </Grid.Column>
        <Grid.Column width={13}>
        <Form.Group widths={4}>
            <CheckBoxField name="is_copy" label="상업적 이용" placeholder="허가" />
            <CheckBoxField name="is_display_creater" label="원작자 표시" placeholder="필수" />
            <CheckBoxField name="is_modify" label="수정 가능" placeholder="허가" />
            <CheckBoxField name="is_share" label="디자인 공개 여부" placeholder="공개" />
          </Form.Group>
        </Grid.Column>
    </Grid>
    </FromFieldCard>
      </div>
    );
  }
}

export default CreateInfo;

import React, { Component } from 'react';
import { Form, Grid } from "semantic-ui-react";
import { InputField, TextAreaField, SelectField, CheckBoxField } from "../commons/FormField";
import ValidateForm from "../commons/ValidateForm";
import ProfileImage from "../users/ProfileImage";

class UserDetailFrom extends Component {
  componentWillMount(){
    this.props.GetCategoryLevel1Request();
  };
  onSubmitHandler = (data) => {
    this.props.InsertUserDetailRequest(data, this.props.token).then( data => {
      
    })
  }
  onChangeCategory1 = (value) => {
    this.props.GetCategoryLevel2Request(value);
  }
  render() {
    return (
      <ValidateForm onSubmit={this.onSubmitHandler} enctype="multipart/form-data">
        <Grid padded={false}>
          <Grid.Column width={4}>
            <ProfileImage />
          </Grid.Column>
          <Grid.Column width={12}>
            <TextAreaField type="text" name="about_me" placeholder="자기소개를 적어주세요." label="자기소개" />
            <Form.Group unstackable widths={2}>
              <SelectField name="category_level1" getValue={this.onChangeCategory1} options={this.props.category1} label="카테고리" placeholder="카테고리를 골라주세요." validates={["required"]} />
              <SelectField name="category_level2" options={this.props.category2} label="카테고리2" placeholder="카테고리2를 골라주세요." validates={["required"]} />
            </Form.Group>
            <CheckBoxField name="is_designer" label="디자이너 활동 여부" placeholder="디자이너로 활동하시겠습니까?"/>
            <button type="submit">등록</button>
          </Grid.Column>
        </Grid>
      </ValidateForm>
    );
  }
}

export default UserDetailFrom;

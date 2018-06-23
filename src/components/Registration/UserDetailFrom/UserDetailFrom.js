import React, { Component } from "react";
import { Form, Grid } from "semantic-ui-react";
import {
  FormCheckBox,
  FormTextArea,
  FormSelect
} from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import ValidateForm from "components/Commons/ValidateForm";
import ProfileImage from "components/Users/ProfileImage";

class UserDetailFrom extends Component {
  componentWillMount() {
    this.props.GetCategoryLevel1Request();
  }
  onSubmitHandler = data => {
    this.props.InsertUserDetailRequest(data, this.props.token).then(data => {
      console.log(data);
    });
  };
  onChangeCategory1 = value => {
    this.props.GetCategoryLevel2Request(value);
  };
  render() {
    return (
      <ValidateForm
        onSubmit={this.onSubmitHandler}
        enctype="multipart/form-data"
      >
        <Grid padded={false}>
          <Grid.Column width={4}>
            <ProfileImage />
          </Grid.Column>
          <Grid.Column width={12}>
            <FormField
              name="about_me"
              placeholder="자기소개를 적어주세요."
              label="자기소개"
              RenderComponent={FormTextArea}
            />
            <Form.Group widths={2}>
              <FormField
                name="category_level1"
                selection={true}
                getValue={this.onChangeCategory1}
                options={this.props.category1}
                label="카테고리"
                RenderComponent={FormSelect}
              />
              <FormField
                name="category_level2"
                selection={true}
                options={this.props.category2}
                label="카테고리2"
                RenderComponent={FormSelect}
              />
            </Form.Group>
            <FormField
              name="is_designer"
              placeholder="디자이너로 활동하시겠습니까?"
              label="디자이너 활동 여부"
              RenderComponent={FormCheckBox}
            />
            <button type="submit">등록</button>
          </Grid.Column>
        </Grid>
      </ValidateForm>
    );
  }
}

export default UserDetailFrom;

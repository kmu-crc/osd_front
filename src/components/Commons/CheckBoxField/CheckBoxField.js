import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { FormField } from "components/Commons/FormField";
import { FormSelect } from "components/Commons/FormItem";
class CheckBoxField extends Component {
  onChangeCategory1 = value => {
    this.props.GetCategoryLevel2Request(value);
  };
  render() {
    return (
      <Form.Group widths={2}>
        <FormField
          selection={true}
          name="category_level1"
          getValue={this.onChangeCategory1}
          options={this.props.category1}
          label="카테고리"
          RenderComponent={FormSelect}
        />
        <FormField
          selection={true}
          name="category_level2"
          options={this.props.category2}
          label="카테고리2"
          RenderComponent={FormSelect}
        />
      </Form.Group>
    );
  }
}
export default CheckBoxField;

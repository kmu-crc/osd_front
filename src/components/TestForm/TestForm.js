import React, { Component } from 'react';
import styled from "styled-components";
import ValidateForm from "components/Commons/ValidateForm";
import { FormCheckBox, FormInput, FormTextArea, FormFile } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import FileUploader from "components/Commons/FileUploader";
import host from "config";
import FormDataToJson from "modules/FormDataToJson";

const FormBox = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px;
`

class TestForm extends Component {
  state = {
    images: []
  }
  onSubmit = (data) => {
    console.log(data);
    data.delete("designs[]");
    this.state.images.map( item => {
      data.append("designs[]", item, item.name);
    });
    const formData = FormDataToJson(data);
    console.log("testFormData : ", formData);
    // fetch(`${host}/users/test`, {  method: "POST", body: data })
    //   .then(function (res) {
    //     return res.json();
    //   })
    //   .then(function (res) {
    //     console.log("insert detail", res);
    //   }).catch((error) => {
    //     console.log("insert detail err", error);
    //   })
  }
  addImages = (images) => {
    console.log("images", images);
    this.setState({images})
  }
  render() {
    return (
      <FormBox>
        <ValidateForm onSubmit={this.onSubmit}>
          <FormInput type="text" name="email" placeholder="id를 입력해주세요." validates={["required"]}/>
          <FormCheckBox name="check" placeholder="id를 입력해주세요."/>
          <FormTextArea name="textarea" placeholder="id를 입력해주세요."/>
          <FileUploader name="designs" placeholder="디자인을 등록해 주세요." onChange={this.addImages} validates={["required"]}/>
          <FormFile name="thumbnail" placeholder="file" validates={["required"]}/>
          <FormField name="test" placeholder="테스트입니다." type="text" label="test" RenderComponent={FormInput}/>
          <button type="submit">전송</button>
        </ValidateForm>
      </FormBox>
    );
  }
}

export default TestForm;

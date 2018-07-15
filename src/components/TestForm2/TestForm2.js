import React, { Component } from "react";
import styled from "styled-components";
import {
  FormInput,
  FormRadio,
  FormCheckBox,
  FormSelect,
  FormFile,
  FormThumbnail
} from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";

const FormBox = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

class TestForm extends Component {
  state = {
    is_complete: {
      value: "0"
    }
  };

  addImages = images => {
    console.log("images", images);
    this.setState({ images });
  };

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  liveCheck = (target) => {
    FormControl(this.state[target]);
  };

  onSubmit = e => {
    e.preventDefault();
    ValidationGroup(this.state, true)
      .then(data => {
        console.log("성공", data);
      })
      .catch(e => {
        console.log("실패");
      });
  };
  render() {
    return (
      <FormBox>
        <form onSubmit={this.onSubmit}>
          <FormInput
            name="email"
            placeholder="email을 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "IsEmail", "CheckEmail"]}
            onBlur={()=>{this.liveCheck("email")}}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "MinLength(2)", "MaxLength(5)", "NotBlank"]}
            onBlur={()=>{this.liveCheck("password")}}
          />
          <FormRadio
            name="is_complete"
            placeholder="선택"
            value="0"
            getValue={this.onChangeValue}
            currentValue={this.state.is_complete.value}
          />
          <FormRadio
            name="is_complete"
            placeholder="선택"
            value="1"
            getValue={this.onChangeValue}
            currentValue={this.state.is_complete.value}
          />
          <FormCheckBox
            name="is_public"
            placeholder="공유허가"
            getValue={this.onChangeValue}
            validates={["Checked"]}
          />
          <FormSelect
            options={[{text: "전체", value: 0}, {text: "의상", value: 1}]}
            name="category"
            getValue={this.onChangeValue}
            value="1"
          />
          <FormFile
            name="thumbnail"
            placeholder="이미지를 선택해주세요."
            getValue={this.onChangeValue}
          />
          <FormThumbnail
            name="images"
            placeholder="이미지를 등록해주세요."
            getValue={this.onChangeValue}
            onChange={()=>{this.liveCheck("images")}}
            validates={["Required", "OnlyImages", "MaxFileSize(1000)"]}
          />
          <button type="submit">전송</button>
        </form>
      </FormBox>
    );
  }
}

export default TestForm;

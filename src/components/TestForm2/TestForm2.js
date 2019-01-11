import React, { Component } from "react";
import styled from "styled-components";
import {
  FormInput,
  FormRadio,
  FormCheckBox,
  FormSelect,
  //FormFile,
  FormThumbnail,
  MultiUpload,
  AsyncInput
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

  getMember = data => {
    this.props.SearchMemberRequest({key: data}, this.props.token);
  }

  onSubmit = e => {
    e.preventDefault();
    ValidationGroup(this.state)
      .then(data => {
        console.log("성공", data);
        fetch("http://localhost:8080/design/createDesign", { headers: { "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjI4LCJlbWFpbCI6ImtqaDAxMDIzMjFAbmF2ZXIuY29tIiwibmlja05hbWUiOiJrd29uIiwiaXNBZG1pbiI6MCwiaXNEZXRhaWwiOnRydWUsImlhdCI6MTUzMTgwMjUzOSwiZXhwIjoxNTMyNDA3MzM5LCJpc3MiOiJvcGVuZGVzaWduLmNvbSIsInN1YiI6InVzZXJJbmZvIn0.hZmAWRX4SZLDg3-74xeNeDm7ss87c1kn8KOHxcARWIA"}, method: "POST", body: data })
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
          {/* <FormFile
            name="thumbnail"
            placeholder="이미지를 선택해주세요."
            getValue={this.onChangeValue}
          /> */}
          <FormThumbnail
            name="thumbnail"
            placeholder="썸네일 등록"
            getValue={this.onChangeValue}
            validates={["Required", "OnlyImages", "MaxFileSize(100000)"]}
          />
          <MultiUpload
            name="design_file"
            placeholder="파일을 선택해주세요."
            getValue={this.onChangeValue}
            validates={["Required", "MaxFileSize(100000)"]}
          />
          <AsyncInput
            name="member"
            getValue={this.onChangeValue}
            asyncFn={this.getMember}
            list={this.props.members}
            />
          <button type="submit">전송</button>
        </form>
      </FormBox>
    );
  }
}

export default TestForm;

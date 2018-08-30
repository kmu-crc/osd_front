import React, { Component } from "react";
import { Form, Grid } from "semantic-ui-react";
//import {
//   FormCheckBox,
//   FormTextArea,
//   FormSelect
// } from "components/Commons/FormItem";
//import { FormField } from "components/Commons/FormField";
//import ValidateForm from "components/Commons/ValidateForm";
import styled from "styled-components";
import Button from "components/Commons/Button";
import ProfileImage from "components/Users/ProfileImage";
import { FormInput, FormSelect, FormCheckBox, FormThumbnail } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import Loading from "components/Commons/Loading";

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

class UserDetailFrom extends Component {
  state = {
    loading: false
  }

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

  onSubmit = async e => {
    console.log(this.state);
    e.preventDefault();
    ValidationGroup(this.state, false).then(async data => {
      console.log("성공", data);
      await this.setState({
        loading: true
      });
      this.props.InsertUserDetailRequest(data, this.props.token)
      .then(data => {
        if (data.res && data.res.success) {
          this.props.history.push(`/`);
        } else {
          alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
      });
    }).catch(e => {
      console.log("실패", e);
      this.setState({
        loading: false
      });
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} encType="multipart/form-data">
        <Grid padded={false}>
          <Grid.Column width={4}>
            <Label>썸네일 등록</Label>
            <FormThumbnail
              name="thumbnail"
              placeholder="썸네일 등록"
              getValue={this.onChangeValue}
              onChange={()=>{this.liveCheck("thumbnail")}}
              validates={["OnlyImages", "MaxFileSize(10000000)"]}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Label>자기소개</Label>
            <FormInput
              name="about_me"
              placeholder="자기소개를 입력해주세요."
              getValue={this.onChangeValue}
            />
            <Form.Group widths={2}>
              <Label>카테고리</Label>
              <FormSelect
                selection={true}
                options={this.props.category1}
                name="category_level1"
                getValue={this.onChangeValue}
                onChange={()=>this.props.GetCategoryLevel2Request(this.state.category_level1.value)}
              />
              <FormSelect
                selection={true}
                options={this.props.category2}
                name="category_level2"
                getValue={this.onChangeValue}
              />
            </Form.Group>
            <Label>디자이너 활동 여부</Label>
            <FormCheckBox
              name="is_designer"
              placeholder="디자이너로 활동하시겠습니까?"
              getValue={this.onChangeValue}
              value={true}
            />
            <Button type="button" onClick={this.onSubmit}>등록</Button>
          </Grid.Column>
        </Grid>
        {this.state.loading && <Loading/>}
      </form>
    );
  }
}

export default UserDetailFrom;

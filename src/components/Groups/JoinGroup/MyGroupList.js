import React, { Component } from "react";
import { FormField } from "components/Commons/FormField";
import { FormSelect } from "components/Commons/FormItem";
import ValidateForm from "components/Commons/ValidateForm";
import Button from "components/Commons/Button";
import FormDataToJson from "modules/FormDataToJson";
import styled from "styled-components";

const Btn = styled(Button)`
  margin-right: 5px;
`;

class MyGroupList extends Component {
  componentWillMount(){
    console.log(this.props);
    this.props.GetMyGroupListRequest(this.props.token, this.props.match.params.id).then(data => {
      console.log(data);
    })
  }
  handleSubmit = (data) => {
    let formData = FormDataToJson(data);
    this.props.GroupJoinGroupRequest(formData, this.props.token, this.props.match.params.id)
    .then(data => {
      this.props.handleCloseModal();
    })
  }
  render() {
    return(
      <ValidateForm onSubmit={this.handleSubmit}>
        <FormField name="join_group" label="내 그룹 리스트" selection={true} options={this.props.groupList} RenderComponent={FormSelect} getValue={this.getValue}/>
        <Btn type="submit">등록</Btn>
        <Btn type="button" onClick={this.props.handleCloseModal}>닫기</Btn>
      </ValidateForm>
    );
  }
}

export default MyGroupList;

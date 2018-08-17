import React, { Component } from "react";
import { FormField } from "components/Commons/FormField";
import { FormMultiSelect } from "components/Commons/FormItem";
import ValidateForm from "components/Commons/ValidateForm";
import Button from "components/Commons/Button";
import FormDataToJson from "modules/FormDataToJson";
import styled from "styled-components";

const Btn = styled(Button)`
  margin-right: 5px;
`;

class MyGroupList extends Component {
  state = {
    joinList: []
  }

  componentWillMount(){
    this.props.GetMyGroupListRequest(this.props.token, this.props.match.params.id);
  }

  handleSubmit = (data) => {
    this.props.GroupJoinGroupRequest({"join_group": this.state.joinList}, this.props.token, this.props.match.params.id)
    .then(data => {
      this.props.handleCloseModal();
    });
  }

  getValue = data => {
    this.setState({
      joinList: data
    });
  }

  render() {
    return(
      <ValidateForm onSubmit={this.handleSubmit}>
        <FormField name="join_group" label="내 그룹 리스트" options={this.props.groupList} RenderComponent={FormMultiSelect} getValue={this.getValue}/>
        <Btn type="submit">등록</Btn>
        <Btn type="button" onClick={this.props.handleCloseModal}>닫기</Btn>
      </ValidateForm>
    );
  }
}

export default MyGroupList;

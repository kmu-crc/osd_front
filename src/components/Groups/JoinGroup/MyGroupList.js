import React, { Component } from "react";
import { FormField } from "components/Commons/FormField";
import { FormMultiSelect } from "components/Commons/FormItem";
import ValidateForm from "components/Commons/ValidateForm";
import Button from "components/Commons/Button";
import styled from "styled-components";

const Btn = styled(Button)`
  margin-right: 5px;
  margin-top: 1rem;
`;

class MyGroupList extends Component {
  state = {
    joinList: []
  }

  componentWillMount(){
    this.props.GetMyGroupListRequest(this.props.token, this.props.match.params.id);
  }

  handleSubmit = (data) => {
    const list = this.state.joinList;
    if (list.length > 0) {
      this.props.GroupJoinGroupRequest({"join_group": this.state.joinList}, this.props.token, this.props.match.params.id)
      .then(data => {
        this.props.handleCloseModal();
      });
    } else {
      return;
    }
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
        <Btn type="submit">가입 신청</Btn>
        <Btn type="button" onClick={this.props.handleCloseModal}>취소</Btn>
      </ValidateForm>
    );
  }
}

export default MyGroupList;

import React, { Component } from "react";
import { FormMultiSelect } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import ValidateForm from "components/Commons/ValidateForm";
import Button from "components/Commons/Button";
import styled from "styled-components";

const Btn = styled(Button)`
  margin-right: 5px;
  margin-top: 1rem;
`;

class MyExistGroup extends Component {
  state = {
    existList: []
  }

  componentWillMount(){
    this.props.GetMyExistGroupListRequest(this.props.token, this.props.id);
  }

  handleSubmit = async (data) => {
    const list = this.state.existList;
    if (list.length > 0) {
      list.map(async (id, i) => {
        await this.props.DeleteGroupInGroupRequest(this.props.id, id)
        .then(res => {
          if (res.data && res.data.success === true) {
            this.props.GetGroupCountRequest(this.props.id)
            .then(this.props.GetGroupInGroupRequest(this.props.id, 0, null));
          }
        })
        .catch(err => {
          console.error(err);
        });
      });
      this.props.handleCloseModal();
    } else {
      return;
    }
  }

  getValue = (data) => {
    this.setState({existList: data});
  }

  render() {
    return(
      <ValidateForm onSubmit={this.handleSubmit}>
        <FormField name="exist_group" label="가입된 / 신청 중인 내 그룹" options={this.props.MyGroupList} RenderComponent={FormMultiSelect} getValue={this.getValue}/>
        <Btn type="button" onClick={this.props.handleCloseModal}>취소</Btn>
        <Btn type="submit">가입 취소</Btn>
      </ValidateForm>
    );
  }
}

export default MyExistGroup;

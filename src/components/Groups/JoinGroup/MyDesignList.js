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

class MyDesignList extends Component {
  state = {
    joinList: []
  }

  componentWillMount(){
    this.props.GetMyDesignListRequest(this.props.token, this.props.match.params.id);
  }

  handleSubmit = (data) => {
    const list = this.state.joinList;
    if (list.length > 0) {
      this.props.JoinGroupRequest({"join_design": this.state.joinList}, this.props.token, this.props.match.params.id)
      .then(data => {
        this.props.handleCloseModal();
      });
    } else {
      return;
    }
  }

  getValue = (data) => {
    this.setState({joinList: data});
  }

  render() {
    return(
      <ValidateForm onSubmit={this.handleSubmit}>
        <FormField name="join_design" label="내 디자인 리스트" options={this.props.designList} RenderComponent={FormMultiSelect} getValue={this.getValue}/>
        <Btn type="submit">가입 신청</Btn>
        <Btn type="button" onClick={this.props.handleCloseModal}>취소</Btn>
      </ValidateForm>
    );
  }
}

export default MyDesignList;

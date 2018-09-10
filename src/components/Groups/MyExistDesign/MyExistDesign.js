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

class MyExistDesign extends Component {
  state = {
    existList: []
  }

  componentWillMount(){
    this.props.GetMyExistDesignListRequest(this.props.token, this.props.id);
  }

  handleSubmit = async (data) => {
    const list = this.state.existList;
    if (list.length > 0) {
      list.map(async (id, i) => {
        await this.props.DeleteDesignInGroupRequest(this.props.id, id)
        .catch(err => {
          console.log(err);
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
        <FormField name="exist_design" label="가입된 / 신청 중인 내 디자인" options={this.props.MyDesignList} RenderComponent={FormMultiSelect} getValue={this.getValue}/>
        <Btn type="submit">가입 취소</Btn>
        <Btn type="button" onClick={this.props.handleCloseModal}>취소</Btn>
      </ValidateForm>
    );
  }
}

export default MyExistDesign;

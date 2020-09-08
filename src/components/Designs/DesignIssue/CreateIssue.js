import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Header, Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput, FormTextArea } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";
import { Link } from "react-router-dom";

// css styling

const FromFieldCard = styled.div`
  margin-top: 20px; 
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.1);
  border-radius: 3px;
  padding: 40px;
  margin-bottom: 60px;
`;

const FormHeader = styled(Header)`
  position: relative;
  padding-right: 2.5rem !important;
  &::after{
    position: absolute;
    display: block;
    right: 2rem;
    content: "";
    height: 20px;
    border-right: 3px solid #191919;
    top: 50%;
    transform: translateY(-50%);
  }
`;

class CreateIssue extends Component {
  onSubmitForm = (data) => {
    this.props.CreateDesignIssueRequest(FormDataToJson(data), this.props.match.params.id, this.props.token)
    .then(data => {
      this.props.history.push(`/designDetail/${this.props.match.params.id}/issue`);
    });
  }

  render(){
    return(
      <ValidateForm onSubmit={this.onSubmitForm}>
        <FromFieldCard>
          <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <FormHeader as="h2">새로운 이슈 등록</FormHeader>
            </Grid.Column>
            <Grid.Column width={12}>
              <FormField name="title" label="이슈 제목" type="text" placeholder="제목을 입력해주세요." validates={["required"]} RenderComponent={FormInput} />
              <FormField name="content" label="내용" placeholder="내용을 입력해주세요." validates={["required"]} RenderComponent={FormTextArea} />
              <Button type="submit" onClick={this.props.handleClick}>등록하기</Button>
            </Grid.Column>
          </Grid.Row></Grid>
        </FromFieldCard>
      </ValidateForm>
    );
  }
}

export default CreateIssue;
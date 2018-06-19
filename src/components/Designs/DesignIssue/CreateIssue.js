import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Header, Radio, Form, Button } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput, FormTextArea, FormRadio } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import FormDataToJson from "modules/FormDataToJson";

// css styling
const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  padding: 40px;
  margin-bottom: 30px;
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
  state = {
    complete: false
  }

  setComplete = () => {
    this.setState({
      complete: !this.state.complete
    });
  }
  onSubmitForm = (data) => {
    console.log(FormDataToJson(data));
    this.props.CreateDesignIssueRequest(FormDataToJson(data), this.props.match.params.id, this.props.token)
    .then(data => {
      console.log("CreateDesignIssueRequest", data);
      this.props.history.push(`/designDetail/${this.props.match.params.id}/issue`);
    });
  }

  render(){
    const id = this.props.match.params.id;
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
              {/* <FormField name="is_complete" label="완료" RenderComponent={FormRadio} value={this.state.complete} onChange={this.setComplete}/> */}
              <Button type="submit" onClick={this.props.handleClick}>등록</Button>
            </Grid.Column>
          </Grid.Row></Grid>
        </FromFieldCard>
      </ValidateForm>
    );
  }
}

export default CreateIssue;
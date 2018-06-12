import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Header, Radio, Form } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput, FormTextArea } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";

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
              <Form.Group widths="equal">
                <FormField name="title" label="이슈 제목" type="text" placeholder="제목을 입력해주세요." validates={["required"]} RenderComponent={FormInput} />
              </Form.Group>
              <Form.Group widths="equal">
                <FormField name="explanation" label="내용" placeholder="내용을 입력해주세요." RenderComponent={FormTextArea} />
              </Form.Group>
              <div className="checkDone">
                <span>진행중</span>
                <Radio toggle />
                <span>완료</span>
              </div>
              <Form.Field>
                <button type="submit" className="ui button" onClick={this.props.handleClick}>등록</button>
              </Form.Field>
            </Grid.Column>
          </Grid.Row></Grid>
        </FromFieldCard>
      </ValidateForm>
    );
  }
}

export default CreateIssue;
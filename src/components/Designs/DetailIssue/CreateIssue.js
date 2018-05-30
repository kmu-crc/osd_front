import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { Grid, Header } from "semantic-ui-react";

// css styling
const IssueWrapper = styled(Grid)`
  min-width: 660px;
  position: relative;
  background-color: #fff;
  &.ui.grid {
    padding: 10px 20px 40px;
  }
  & h2.ui.header {
    font-size: 1.4rem;
  }
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

const CreateForm = styled(Form)`
  &.ui.form {
    padding: 0 40px 0 20px;
  }
  &.ui.form .field {
    margin-bottom: 20px;
  }
  & .field.checkDone {
    display: inline;
    float: left;
    margin-right: 10px;
  }
`;

class CreateIssue extends Component {
  render(){
    return(
      <IssueWrapper>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <FormHeader as="h2">새로운 이슈 등록</FormHeader>
          </Grid.Column>
          <Grid.Column width={12}>
            <CreateForm as="form">
              <Form.Field>
                <label>제목</label>
                <Form.Input placeholder="제목을 입력해주세요." />
              </Form.Field>
              <Form.Field>
                <label>내용</label>
                <Form.TextArea placeholder="내용을 입력해주세요." />
              </Form.Field>
              <Form.Checkbox className="checkDone"></Form.Checkbox>
              <label>완료</label>
              <Form.Field>
                <button type="submit" className="ui button" onClick={this.props.handleClick}>등록</button>
                <button type="submit" className="ui button" onClick={this.props.goBack}>목록</button>
              </Form.Field>
            </CreateForm>
          </Grid.Column>
        </Grid.Row>
      </IssueWrapper>
    );
  }
} 

export default CreateIssue;
import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";

// css styling
const IssueWrapper = styled(Grid)`
  min-width: 660px;
  position: relative;
  background-color: #fff;
  &.ui.grid {
    padding: 10px 20px 40px;
  }
`;

class CreateIssue extends Component {
  render(){
    return(
      <IssueWrapper>
        <Form>
          <Form.Field>
            <label>제목</label>
            <Form.Input placeholder="제목을 입력해주세요." />
          </Form.Field>
          <Form.Field>
            <Form.Checkbox>
              <Form.Input type="checkbox" className="hidden" tabIndex="0" />
            </Form.Checkbox>
            <label>완료</label>
          </Form.Field>
          <Form.Field>
            <label>내용</label>
            <Form.TextArea placeholder="내용을 입력해주세요." />
          </Form.Field>
          <Form.Button onClick={this.props.handleClick}>등록</Form.Button>
        </Form>
      </IssueWrapper>
    );
  }
} 

export default CreateIssue;
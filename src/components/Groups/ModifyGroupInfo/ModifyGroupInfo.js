import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Header, Form } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput, FormTextArea, FormFile } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import SearchMemberContainer from "containers/Commons/SearchMemberContainer";

// css styling
const FromFieldCard = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  padding: 40px;
  margin-bottom: 30px;
`;

const FormHeader = styled(Header) `
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

class ModifyGroupInfo extends Component {
  componentDidMount(){
    // 그룹 정보 수정 페이지를 새로고침 했을 때도 그룹 정보가 떠야 하나?
  }
  render(){
    return(
      <ValidateForm onSubmit={this.onSubmitForm}>
        <FromFieldCard>
          <Grid>
            <Grid.Column width={4}>
              <FormHeader as="h2">정보 수정</FormHeader>
            </Grid.Column>
            <Grid.Column width={12}>
              <Form.Group widths="equal">
                <FormField name="title" label="그룹 이름" type="text" validates={["required"]} RenderComponent={FormInput} />
              </Form.Group>
              <Form.Group widths="equal">
                <FormField name="explanation" label="그룹 설명" RenderComponent={FormTextArea} />
              </Form.Group>
              <Form.Group widths="equal">
                <FormField name="thumbnail" label="썸네일 수정" RenderComponent={FormFile} validates={["required", "ThumbnailSize"]} />
              </Form.Group>
              <Form.Group widths="equal">
                <FormField label="그룹장 변경" RenderComponent={SearchMemberContainer} validates={["MinLength2"]} onChangeMembers={this.props.onChangeMembers}/>
              </Form.Group>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
      </ValidateForm>
    );
  }
}

export default ModifyGroupInfo;

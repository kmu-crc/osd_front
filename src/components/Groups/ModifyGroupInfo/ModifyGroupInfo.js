import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Header, Form, Button } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput, FormTextArea, FormFile } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
//import SearchMemberContainer from "containers/Commons/SearchMemberContainer";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding: 0!important;
  & .ui.form {
    width: 100%;
  }
  & .submitBtn {
    position: absolute;
    top: -40px;
    left: 0;
  }
`;

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
  state = {
    title: this.props.GroupDetail.title,
    explanation: this.props.GroupDetail.explanation,
    user_id: this.props.GroupDetail.user_id
  }

  onSubmitForm = (data) => {
    this.props.UpdateGroupRequest(this.props.id, data, this.props.token)
    .then(data => {
      this.props.history.push("/group");
    });
  }

  deleteGroup = () => {
    this.props.DeleteGroupRequest(this.props.id, this.props.token)
    .then(data => {
      this.props.history.push("/group");
    });
  }

  render(){
    return(
      <Wrapper>
        <ValidateForm onSubmit={this.onSubmitForm}>
          <FromFieldCard>
            <Grid>
              <Grid.Column width={4}>
                <FormHeader as="h2">정보 수정</FormHeader>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form.Group widths="equal">
                  <FormField name="title" label="그룹 이름" type="text" validates={["required"]} 
                             value={this.state.title} 
                             RenderComponent={FormInput} />
                </Form.Group>
                <Form.Group widths="equal">
                  <FormField name="explanation" label="그룹 설명" 
                             value={this.state.explanation}
                             RenderComponent={FormTextArea} />
                </Form.Group>
                <Form.Group widths="equal">
                  <FormField name="thumbnail" label="썸네일 수정" RenderComponent={FormFile} validates={["ThumbnailSize"]} />
                </Form.Group>
                {/* <Form.Group widths="equal">
                  <FormField name="user_id" label="그룹장 변경" 
                             value={this.state.user_id}
                             RenderComponent={SearchMemberContainer} 
                             onChangeMembers={this.props.onChangeMembers}/>
                </Form.Group> */}
                <div>
                  <Button type="button" onClick={this.deleteGroup}>그룹 삭제</Button>
                </div>
              </Grid.Column>
            </Grid>
          </FromFieldCard>
          <Button className="submitBtn" type="submit">확인</Button>
        </ValidateForm>
      </Wrapper>
    );
  }
}

export default ModifyGroupInfo;

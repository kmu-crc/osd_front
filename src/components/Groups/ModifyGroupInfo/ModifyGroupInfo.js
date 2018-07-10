import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Header, Form } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput, FormTextArea, FormFile } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import Loading from "components/Commons/Loading";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding: 0!important;
  & .ui.form {
    width: 100%;
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
    user_id: this.props.GroupDetail.user_id,
    loading: false
  }

  onSubmitForm = async (data) => {
    await this.setState({
      loading: true
    });

    this.props.UpdateGroupRequest(this.props.id, data, this.props.token)
    .then(res => {
      if (res.data.success === true) {
        alert("정보가 수정되었습니다.");
        this.props.history.push("/group");
      } else {
        alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      }
    });
  }

  deleteGroup = () => {
    const confirm = window.confirm("그룹을 삭제하시겠습니까?");
    if (confirm) {
      this.props.DeleteGroupRequest(this.props.id, this.props.token)
      .then(data => {
        this.props.history.push("/group");
      });
    } else {
      return;
    }
  }

  render(){
    return(
      <Wrapper>
        <ValidateForm onSubmit={this.onSubmitForm} enctype="multipart/form-data">
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
                  <FormField name="thumbnail" label="썸네일 수정" RenderComponent={FormFile}  />
                </Form.Group>
                <div>
                  <Button type="button" onClick={this.deleteGroup}>그룹 삭제</Button>
                </div>
              </Grid.Column>
            </Grid>
          </FromFieldCard>
          <Button className="submitBtn" type="submit">수정</Button>
        </ValidateForm>
        {this.state.loading && <Loading/>}
      </Wrapper>
    );
  }
}

export default ModifyGroupInfo;

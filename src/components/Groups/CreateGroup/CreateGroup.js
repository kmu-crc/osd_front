import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Header, Grid, Form, Button } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput, FormTextArea, FormFile } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import mainSlide from "source/mainSlide.jpg";

// css styling

const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 300px;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const Title = styled.div`
  width: 100%;
  color: white;
  position: absolute;
  text-align: center;
  top: 40%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  h1 {
    color: ${StyleGuide.color.geyScale.scale0};
    font-size: ${StyleGuide.font.size.heading1};
    font-weight: bold;
  }
`;

const Wrapper = styled(ContentBox)`
  margin-top: -70px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
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

class CreateGroup extends Component {
  onSubmitForm = (data) => {
    console.log(data);
    this.props.CreateNewGroupRequest(data, this.props.token).then(data => {
      console.log("CreateNewGroupRequest", data);
      // this.props.history.push(`/groupDetail/${data.id}/group/null`)
      this.props.history.push(`/groupDetail/${data.id}`);
    });
  }
  render(){
    return(
      <div>
        <ImgWrapper>
          <Title><h1>새 그룹 등록</h1></Title>
        </ImgWrapper>
        <Wrapper>
          <ValidateForm onSubmit={this.onSubmitForm}>
            <FromFieldCard>
              <Grid>
                <Grid.Column width={4}>
                  <FormHeader as="h2">그룹 정보</FormHeader>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Form.Group widths="equal">
                    <FormField name="title" label="그룹 이름" type="text" placeholder="그룹의 이름을 입력해주세요." validates={["required"]} RenderComponent={FormInput} />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <FormField name="explanation" label="그룹 설명" placeholder="그룹 설명을 입력해주세요." RenderComponent={FormTextArea} />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <FormField name="thumbnail" label="썸네일 등록" placeholder="섬네일을 등록해주세요." RenderComponent={FormFile} validates={["required", "ThumbnailSize"]} />
                  </Form.Group>
                </Grid.Column>
              </Grid>
            </FromFieldCard>
            <Button type="submit">등록</Button>
          </ValidateForm>
        </Wrapper>
      </div>
    );
  }
}

export default CreateGroup;

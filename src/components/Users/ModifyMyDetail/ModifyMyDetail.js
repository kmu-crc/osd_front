import React, { Component } from "react";
import styled from 'styled-components';
import { Grid, Form, Button, Header } from "semantic-ui-react";
import { OverlapField, FormField } from "components/Commons/FormField";
import { FormInput, FormCheckBox, FormTextArea, FormSelect } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import ValidateForm from "components/Commons/ValidateForm";
import ProfileImage from "components/Users/ProfileImage";


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
  & .profileImg {
    margin-bottom: 3rem;
  }
  & .two.fields {
    margin-top: 3rem;
  }
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

class ModifyMyDetail extends Component {
  state = {
    nickName: this.props.MyDetail.nick_name,
    aboutMe: this.props.MyDetail.about_me
  }

  componentWillMount() {
    this.props.GetCategoryLevel1Request();
  }

  onChangeCategory1 = value => {
    this.props.GetCategoryLevel2Request(value);
  };

  handleSubmit = (data) => {
    console.log(data);
    //data.password = data.password.toString();
    this.props.UpdateUserDetailRequest(data, this.props.token)
    .then(res=> {
      if (res.success === true) {
        alert("정보가 수정되었습니다.");
        this.props.history.push("");
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <ValidateForm onSubmit={this.handleSubmit} enctype="multipart/form-data">
          <FromFieldCard>
            <Grid>
              <Grid.Column width={4}>
                <FormHeader as="h2">내 정보 수정</FormHeader>
              </Grid.Column>
              <Grid.Column width={12}>
                <div className="profileImg">
                  <ProfileImage />
                </div>
                <FormField
                  name="nick_name"
                  type="text"
                  label="닉네임 변경"
                  value={this.state.nickName}
                  validates={["required", "NotSpecialCharacters", "checkNickName"]}
                  RenderComponent={FormInput}
                />
                <FormField
                  name="about_me"
                  label="자기소개 변경"
                  value={this.state.aboutMe}
                  RenderComponent={FormTextArea}
                />
                <OverlapField
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="password 변경"
                  validates={["required"]}
                />
                <Form.Group widths={2}>
                  <FormField
                    name="category_level1"
                    selection={true}
                    getValue={this.onChangeCategory1}
                    options={this.props.category1}
                    label="카테고리"
                    validates={["required"]}
                    RenderComponent={FormSelect}
                  />
                  <FormField
                    name="category_level2"
                    selection={true}
                    options={this.props.category2}
                    label="카테고리2"
                    validates={["required"]}
                    RenderComponent={FormSelect}
                  />
                </Form.Group>
                <FormField
                  name="is_designer"
                  placeholder="디자이너로 활동하시겠습니까?"
                  label="디자이너 활동 여부"
                  checked={this.props.MyDetail.is_designer}
                  RenderComponent={FormCheckBox}
                />
              </Grid.Column>
            </Grid>
          </FromFieldCard>
          <Button type="submit">수정</Button>
        </ValidateForm>
      </Wrapper>
    );
  }
}

export default ModifyMyDetail;

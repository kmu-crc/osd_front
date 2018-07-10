import React, { Component } from "react";
import styled from 'styled-components';
import { Grid, Form, Button, Header } from "semantic-ui-react";
import { OverlapField, FormField } from "components/Commons/FormField";
import { FormInput, FormCheckBox, FormTextArea, FormSelect } from "components/Commons/FormItem";
// import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import ValidateForm from "components/Commons/ValidateForm";
import ProfileImage from "components/Users/ProfileImage";
import mainSlide from "source/mainSlide.jpg";
import Loading from "components/Commons/Loading";

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
  // width: 100%;
  // padding: 0!important;
  // & .ui.form {
  //   width: 100%;
  // }
  // & .submitBtn {
  //   position: absolute;
  //   top: -40px;
  //   left: 0;
  // }
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
  @media only screen and (max-width: 991px) {
    padding-bottom: 2rem !important;
  }
  &::after {
    position: absolute;
    display: inline-block;
    content: "";
    height: 20px;
    width: 100%;
    border-bottom: 3px solid ${StyleGuide.color.geyScale.scale5};
    bottom: 10px;
    left: 0;

    @media only screen and (min-width: 992px) {
      width: 1px;
      display: block;
      position: absolute;
      right: 2rem;
      top: 50%;
      left: initial;
      bottom: initial;
      transform: translateY(-50%);
      border-bottom: 0;
      border-right: 3px solid #191919;
    }
  }
`;

class ModifyMyDetail extends Component {
  state = {
    loading: false
  }

  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token)
    .then(data => {
      this.props.GetCategoryLevel2Request(data.MyDetail.category_level1);
    });
  }

  onChangeCategory1 = async value => {
    await this.props.GetCategoryLevel2Request(value);
  };

  handleSubmit = async (data) => {
    await this.setState({
      loading: true
    });

    this.props.UpdateUserDetailRequest(data, this.props.token)
    .then(res=> {
      if (res.success === true) {
        alert("정보가 수정되었습니다.");
        this.props.history.push("/");
      } else {
        alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      }
    });
  }

  render() {
    const myInfo = this.props.MyDetail;

    return (
      <div>
       <ImgWrapper>
          <Title><h1>내 정보 수정</h1></Title>
        </ImgWrapper>
        {myInfo.length !== 0 &&
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
                      value={myInfo.nick_name}
                      validates={["required", "NotSpecialCharacters", "checkNickName"]}
                      RenderComponent={FormInput}
                    />
                    <FormField
                      name="about_me"
                      label="자기소개 변경"
                      value={myInfo.about_me}
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
                        value={myInfo.category_level1}
                        RenderComponent={FormSelect}
                      />
                      <FormField
                        name="category_level2"
                        selection={true}
                        options={this.props.category2}
                        label="카테고리2"
                        value={myInfo.category_level2}
                        RenderComponent={FormSelect}
                      />
                    </Form.Group>
                    <FormField
                      name="is_designer"
                      placeholder="디자이너로 활동하시겠습니까?"
                      label="디자이너 활동 여부"
                      checked={myInfo.is_designer === 1? "1" : "0"}
                      RenderComponent={FormCheckBox}
                    />
                  </Grid.Column>
                </Grid>
              </FromFieldCard>
              <Button type="submit">수정</Button>
            </ValidateForm>
          </Wrapper>
        }
        {this.state.loading && <Loading/>}
      </div>
    );
  }
}

export default ModifyMyDetail;

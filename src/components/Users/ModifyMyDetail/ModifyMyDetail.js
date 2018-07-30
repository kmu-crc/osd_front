import React, { Component } from "react";
import styled from 'styled-components';
import { Grid, Form, Header } from "semantic-ui-react";
// import { OverlapField, FormField } from "components/Commons/FormField";
// import { FormInput, FormCheckBox, FormTextArea, FormSelect } from "components/Commons/FormItem";
// import FormDataToJson from "modules/FormDataToJson";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
// import ValidateForm from "components/Commons/ValidateForm";
// import ProfileImage from "components/Users/ProfileImage";
import mainSlide from "source/mainSlide.jpg";
import Loading from "components/Commons/Loading";
import Button from "components/Commons/Button";
import { FormInput, FormSelect, FormCheckBox, FormThumbnail } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";

// css styling

const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
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
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
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

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
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

  // onChangeCategory1 = async value => {
  //   await this.props.GetCategoryLevel2Request(value);
  // };

  // handleSubmit = async (data) => {
  //   await this.setState({
  //     loading: true
  //   });

  //   this.props.UpdateUserDetailRequest(data, this.props.token)
  //   .then(res=> {
  //     if (res.success === true) {
  //       alert("정보가 수정되었습니다.");
  //       this.props.history.push("/");
  //     } else {
  //       alert("다시 시도해주세요");
  //       this.setState({
  //         loading: false
  //       });
  //     }
  //   });
  // }

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  liveCheck = (target) => {
    FormControl(this.state[target]);
  };

  samePwCheck = () => {
    FormControl({
      value: [this.state.password.value, this.state.password2.value],
      target: this.state.password2.target,
      validates: this.state.password2.validates
    });
  }

  onSubmit = async e => {
    await this.setState({
      loading: true
    });

    e.preventDefault();
    let formData = this.state;
    delete formData.password2;
    ValidationGroup(formData, false).then(data => {
      console.log("성공", data);
      this.props.UpdateUserDetailRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          alert("정보가 수정되었습니다.");
          this.props.history.push(`/`);
        } else {
          alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
      });
    }).catch(e => {
      console.log("실패", e);
      alert("다시 시도해주세요");
      this.setState({
        loading: false
      });
    });
  };

  render() {
    const myInfo = this.props.MyDetail;

    return (
      <div>
       <ImgWrapper>
          <Title><h1>내 정보 수정</h1></Title>
        </ImgWrapper>
        {myInfo.length !== 0 &&
          <Wrapper>
            <form onSubmit={this.onSubmit} encType="multipart/form-data">
              <FromFieldCard>
                <Grid padded={false}>
                  <Grid.Column width={4}>
                    <Label>썸네일 등록</Label>
                    <FormThumbnail
                      name="thumbnail"
                      placeholder="썸네일 등록"
                      getValue={this.onChangeValue}
                      onChange={()=>{this.liveCheck("thumbnail")}}
                      validates={["OnlyImages", "MaxFileSize(10000000)"]}
                      image={myInfo.profileImg}
                    />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Label>닉네임 변경</Label>
                    <FormInput
                      name="nick_name"
                      value={myInfo.nick_name}
                      getValue={this.onChangeValue}
                      validates={["required", "NotSpecialCharacters", "checkNickName"]}
                      onBlur={()=>{this.liveCheck("nick_name")}}
                    />
                    <Label>자기소개 변경</Label>
                    <FormInput
                      name="about_me"
                      value={myInfo.about_me}
                      placeholder="자기소개를 입력해주세요."
                      getValue={this.onChangeValue}
                    />
                    <Label>비밀번호 변경</Label>
                    <FormInput
                      name="password"
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      getValue={this.onChangeValue}
                      validates={["Required", "NotBlank"]}
                      onBlur={()=>{this.liveCheck("password")}}
                    />
                    <Label>비밀번호 확인</Label>
                    <FormInput
                      name="password2"
                      type="password"
                      placeholder="비밀번호를 다시 한번 입력해주세요."
                      getValue={this.onChangeValue}
                      validates={["SamePassword"]}
                      onBlur={this.samePwCheck}
                    />
                    <Form.Group widths={2}>
                      <Label>카테고리</Label>
                      <FormSelect
                        selection={true}
                        options={this.props.category1}
                        name="category_level1"
                        value={myInfo.category_level1}
                        getValue={this.onChangeValue}
                        onChange={()=>this.props.GetCategoryLevel2Request(this.state.category_level1.value)}
                      />
                      <FormSelect
                        selection={true}
                        options={this.props.category2}
                        name="category_level2"
                        value={myInfo.category_level2}
                        getValue={this.onChangeValue}
                      />
                    </Form.Group>
                    <Label>디자이너 활동 여부</Label>
                    <FormCheckBox
                      name="is_designer"
                      placeholder="디자이너로 활동하시겠습니까?"
                      getValue={this.onChangeValue}
                      value={myInfo.is_designer}
                    />
                  </Grid.Column>
                </Grid>
              </FromFieldCard>
              <Button type="button" onClick={this.onSubmit}>수정</Button>
            </form>
          </Wrapper>
        }
        {this.state.loading && <Loading/>}
      </div>
    );
  }
}

export default ModifyMyDetail;

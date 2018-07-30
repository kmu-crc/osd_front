import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Grid } from "semantic-ui-react";
import Button from "components/Commons/Button";
// import ValidateForm from "components/Commons/ValidateForm";
// import { FormInput, FormTextArea, FormFile } from "components/Commons/FormItem";
// import { FormField } from "components/Commons/FormField";
import { FormInput, FormThumbnail } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import mainSlide from "source/mainSlide.jpg";
import Loading from "components/Commons/Loading";

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
    font-size: ${StyleGuide.font.size.heading2};
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
  padding: 70px;
  margin-bottom: 30px;
  border-radius: 3px;
  @media only screen and (min-width: 1200px) {
    padding: 70px 100px 70px 100px;
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


class CreateGroup extends Component {
  // state = {
  //   loading: false
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

  onSubmit = async e => {
    // await this.setState({
    //   loading: true
    // });

    e.preventDefault();
    ValidationGroup(this.state, false).then(data => {
      console.log("성공", data);
      this.props.CreateNewGroupRequest(data, this.props.token)
      .then(res => {
        this.props.history.push(`/groupDetail/${res.id}`);
      });
    }).catch(e => {
      console.log("실패", e);
    });
  };

  render(){
    return(
      <div>
        <ImgWrapper>
          <Title><h1>새 그룹 등록</h1></Title>
        </ImgWrapper>
        <Wrapper>
          <form onSubmit={this.onSubmit}>
            <FromFieldCard>
              <Grid>
                <Grid.Column mobile={16} computer={4}>
                  <FormHeader as="h2">그룹 정보</FormHeader>
                </Grid.Column>
                <Grid.Column mobile={16} computer={12}>
                  <Label>그룹 이름</Label>
                  <FormInput
                    name="title"
                    placeholder="그룹의 이름을 입력해주세요."
                    getValue={this.onChangeValue}
                    validates={["Required"]}
                    onBlur={()=>{this.liveCheck("title")}}
                  />
                  <Label>그룹 설명</Label>
                  <FormInput
                    name="explanation"
                    placeholder="그룹 설명을 입력해주세요."
                    getValue={this.onChangeValue}
                  />
                  <Label>썸네일 등록</Label>
                  <FormThumbnail
                    name="thumbnail"
                    placeholder="썸네일을 등록해주세요."
                    getValue={this.onChangeValue}
                    onChange={()=>{this.liveCheck("thumbnail")}}
                    validates={["Required", "OnlyImages", "MaxFileSize(10000)"]}
                  />
                </Grid.Column>
              </Grid>
            </FromFieldCard>
            <Button type="submit">등록</Button>
          </form>
        </Wrapper>
        {/* {this.state.loading && <Loading/>} */}
      </div>
    );
  }
}

export default CreateGroup;

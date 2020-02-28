import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Grid } from "semantic-ui-react";
import Button from "components/Commons/Button";
// import ValidateForm from "components/Commons/ValidateForm";
// import { FormInput, FormTextArea, FormFile } from "components/Commons/FormItem";
// import { FormField } from "components/Commons/FormField";
import { FormInput, FormThumbnail,FormDropBox } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";
// import ContentBox from "components/Commons/ContentBox";
// import mainSlide from "source/mainSlide.jpg";
import Loading from "components/Commons/Loading";

// css styling
const category = [
  {text:"특허권",value:0},
  {text:"디자인권",value:1},
  {text:"기술자문",value:2},
  {text:"기술상담",value:3},
  {text:"경험",value:4},
  {text:"정보/데이터",value:5},
  {text:"아이디어/노하우",value:6},
  {text:"제작품",value:7},
];
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
  state = {
    loading: false
  }

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
    e.preventDefault();
    ValidationGroup(this.state, false).then(async data => {
      console.log("성공", data);
      await this.setState({
        loading: true
      });
      return;
      this.props.CreateNewGroupRequest(data, this.props.token)
      .then(res => {
        this.props.history.push(`/groupDetail/${res.id}`);
      });
    }).catch(e => {
      console.log("실패", e);
      this.setState({
        loading: false
      });
    });
  };

  render(){
    return(
      <div>
          <form onSubmit={this.onSubmit}>
            <FromFieldCard>
              <Grid>
                <Grid.Column mobile={16} computer={4}>
                  <FormHeader as="h2">갤러리 정보</FormHeader>
                </Grid.Column>
                <Grid.Column mobile={16} computer={12}>
                <Label>썸네일 등록</Label>
                  <FormThumbnail
                    name="thumbnail"
                    placeholder="썸네일 등록"
                    getValue={this.onChangeValue}
                    onChange={()=>{this.liveCheck("thumbnail")}}
                    validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
                  />
                  <Label>갤러리 이름</Label>
                  <FormInput
                    name="title"
                    placeholder="갤러리의 이름을 입력해주세요."
                    getValue={this.onChangeValue}
                    validates={["Required"]}
                    onBlur={()=>{this.liveCheck("title")}}
                  />
                  <Label>갤러리 카테고리</Label>
                  <FormDropBox
                    options={category}
                  />
                  <Label>갤러리 설명</Label>
                  <FormInput
                    name="explanation"
                    placeholder="갤러리의 설명을 입력해주세요."
                    getValue={this.onChangeValue}
                  />

                </Grid.Column>
              </Grid>
            </FromFieldCard>
            <Button type="submit">등록</Button>
          </form>
        {this.state.loading && <Loading/>}
      </div>
    );
  }
}

export default CreateGroup;

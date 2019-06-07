import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Grid, Header, Form } from "semantic-ui-react";
import Button from "components/Commons/Button";
import { FormInput, FormThumbnail } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl";
import StyleGuide from "StyleGuide";
import Loading from "components/Commons/Loading";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding: 0!important;
  & .ui.form {
    width: 100%;
  }
  & button {
    margin-right: 5px;
  }
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

class ModifyGroupInfo extends Component {
  state = {
    loading: false
  }

  onChangeValue = async data => {
    let obj = {};
    if(data.target){
      obj[data.target.name] = data;
    }
    await this.setState(obj);
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
      this.props.UpdateGroupRequest(this.props.id, data, this.props.token)
      .then(res => {
        if (res.data && res.data.success === true) {
          alert("정보가 수정되었습니다.");
          this.props.history.push(`/groupDetail/${this.props.id}`);
        } else {
          alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
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
      <Wrapper>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <FromFieldCard>
            <Grid>
              <Grid.Column mobile={16} computer={4}>
                <FormHeader as="h2">정보 수정</FormHeader>
              </Grid.Column>
              <Grid.Column mobile={16} computer={12}>
                <Form.Group widths="equal">
                  <Label>그룹 이름</Label>
                  <FormInput
                    value={this.props.GroupDetail.title}
                    name="title"
                    placeholder="그룹 이름을 입력해주세요"
                    getValue={this.onChangeValue}
                    validates={["Required"]}
                    onBlur={()=>{this.liveCheck("title")}}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Label>그룹 설명</Label>
                  <FormInput
                    value={this.props.GroupDetail.explanation}
                    name="explanation"
                    placeholder={this.props.GroupDetail.explanation}
                    getValue={this.onChangeValue}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Label>썸네일 수정</Label>
                  <FormThumbnail
                    name="thumbnail"
                    placeholder="썸네일 수정"
                    getValue={this.onChangeValue}
                    image={this.props.GroupDetail.img && this.props.GroupDetail.img.m_img}
                    onChange={()=>{this.liveCheck("thumbnail")}}
                    validates={["OnlyImages", "MaxFileSize(10000000)"]}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid>
          </FromFieldCard>
          <Button className="submitBtn" type="submit">수정</Button>
          <Link to={`/groupDetail/${this.props.id}`}>
            <Button type="button">취소</Button>
          </Link>
        </form>
        {this.state.loading && <Loading/>}
      </Wrapper>
    );
  }
}

export default ModifyGroupInfo;

import React, { Component } from "react";
import { Grid } from "semantic-ui-react"
import styled from 'styled-components';
import StyleGuide from "StyleGuide";
import mainSlide from "source/mainSlide.jpg";
import ContentBox from "components/Commons/ContentBox";
import { FormFile, FormInput, FormCheckBox, FormTag, FormTextArea } from "components/Commons/FormItems";
import Button from "components/Commons/Button";

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
const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
`;

class CreateDesignerBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, };
  };
  onChangeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.type === "checkbox" && e.target.checked);
  };
  onSubmit = e => {
    e.preventDefault();
    let data = { ...this.state };
    delete data.loading;
    console.log("data:", data);
    this.props.CreateDesignerBoardRequest &&
      this.props.CreateDesignerBoardRequest(data, this.props.token)
        .then(rst => alert(rst))
        .catch(e => alert(e));
    this.setState({ loading: false });
  };

  render() {
    return (<React.Fragment>
      <ImgWrapper>
        <Title><h1>글쓰기</h1></Title>
      </ImgWrapper>
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <FromFieldCard>
            <Grid>
              <Grid.Column mobile={16} computer={12}>

                <Label>제목</Label>
                <FormInput name="title" placeholder="디자이너 설명을 입력해주세요." getValue={this.onChangeValue} />

                <Label>내용</Label>
                <FormTextArea name="content" placeholder="디자이너 설명을 입력해주세요." getValue={this.onChangeValue} />

                <Label>파일첨부</Label>
                <FormFile name="file" getValue={this.onChangeValue} />

                <Label>태그</Label>
                <FormTag name="tag" getValue={this.onChangeValue} placeholder="태그를 입력해주세요(한글10자 영문20자 이내)" />

                <Label>공개여부</Label>
                <FormCheckBox items="비공개" name="private" getValue={this.onChangeValue} />

              </Grid.Column>
            </Grid>
          </FromFieldCard>
          <div style={{ width: "max-content", marginLeft: "auto" }}>
            <Button color="Primary" type="submit">등록하기</Button>
          </div>
        </form>
      </Wrapper>
    </React.Fragment>);
  }
}

export default CreateDesignerBoard;

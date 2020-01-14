import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import styled from 'styled-components';
import StyleGuide from "StyleGuide";
import mainSlide from "source/mainSlide.jpg";
import ContentBox from "components/Commons/ContentBox";
import { FormDropBox, FormFile, FormInput, FormCheckBox, FormTag, FormTextArea } from "components/Commons/FormItems";
import Button from "components/Commons/Button";
import Loading from "components/Commons/Loading";

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
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeTag = v => {
    alert("tag!");
    this.setState({ tag: v });
  }
  onChangedPrivate = checkbox => {
    this.setState({ private: checkbox.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let data = { ...this.state, writer: this.props.userInfo.uid, type: "designer" };
    delete data.loading;
    console.log(data);
    this.props.CreateDesignerBoardArticleRequest &&
      this.props.CreateDesignerBoardArticleRequest(data, this.props.token)
        .catch(e => alert(e));
    this.setState({ loading: false });
  };

  render() {
    return (<React.Fragment>
      {this.state.loading ? <Loading /> : null}

      <ImgWrapper>
        <Title><h1>글쓰기</h1></Title>
      </ImgWrapper>

      <Wrapper>
        <FromFieldCard>
          <Grid>
            <Grid.Column mobile={16} computer={16}>
              <Label>제목</Label>
              <FormInput name="title" placeholder="설명을 입력해주세요." getValue={this.onChangeValue} />
              <Label>카테고리</Label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormDropBox
                  selection={true} name="category_level1"
                  getValue={this.onChangeValue}
                  options={this.props.category1}
                // onChange={()=>{}}
                />&nbsp;&nbsp;
                  {this.state.category_level1 ?
                  <FormDropBox
                    selection={true} name="category_level2"
                    getValue={this.onChangeValue}
                    options={this.props.category2} /> : null}
              </div>
              <Label>내용</Label>
              <FormTextArea name="content" placeholder="내용을 입력해주세요." getValue={this.onChangeValue} />

              <Label>파일첨부</Label>
              <FormFile name="file" getValue={this.onChangeValue} />

              <Label>태그</Label>
              <FormTag name="tag" getValue={this.onChangeTag} placeholder="태그를 입력해주세요(한글10자 영문20자 이내)" />

              <Label>비공개여부</Label>
              <FormCheckBox name="private" value={false} getValue={this.onChangedPrivate} placeholder="비공개" />

            </Grid.Column>
          </Grid>
        </FromFieldCard>
        <div style={{ width: "max-content", marginLeft: "auto" }}>
          <Button color="Primary" onClick={this.onSubmit} type="submit">등록하기</Button>
        </div>
      </Wrapper>
    </React.Fragment>);
  }
}

export default CreateDesignerBoard;

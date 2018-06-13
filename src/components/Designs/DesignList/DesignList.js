import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import mainSlide from "source/mainSlide.jpg";
import StyleGuide from "StyleGuide";

// css styling

const Wrapper = styled.div`
  width: 100%;
  & ul {
    margin-top: 30px;
  }
`;

const MenuContainer = styled(Grid) `
  font-size: 13px;
  & .sorting {
    text-align: right;
  }
  & .ui.default.dropdown:not(.button)>.text,
  & .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  &.ui.grid > .row {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 250px;
  position: relative;
  &::after{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const Title = styled.div`
  width: 100%;
  color: white;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  h1{
    font-size: ${StyleGuide.font.size.heading1};
    font-weight: bold;
  }
`

const MenuWrap = styled.div`
  background-color: white;
  margin-bottom: 30px;
  border-top: 1px solid rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);
`

class DesignList extends Component {
  state = {
    rendering: true
  }

  changeState = () => {
    this.setState({
      rendering: false
    });
    setTimeout(() => {
      this.setState({
        rendering: true
      });
    }, 200);
  } // state 값 업데이트를 통해 컴포넌트 새로 렌더링함

  componentWillUnmount() {
    console.log("ya");
  }

  cate1Change = (value) => {
    console.log("카테고리");
    this.props.history.replace(`/design/${this.props.sort}/${value}`);
  }

  cate2Change = (value) => {
    this.props.history.replace(`/design/${this.props.sort}/${this.props.cate1}/${value}`);
    this.changeState();
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/design/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.changeState();
  }

  render() {
    const { sort, cate1, cate2 } = this.props;
    return (
      <div>
        <ImgWrapper>
          <Title>
            <h1>디자인</h1>
            <p>오픈디자인은 여러 디자이너들의 작품을 쉽게 공유하고 참고 할 수 있습니다.</p>
          </Title>
        </ImgWrapper>
        <MenuWrap>
          <ContentBox>
            <Wrapper>
              <MenuContainer devided="vertically" padded={true}>
                <Grid.Row>
                  <CategoryContainer widescreen={8} largeScreen={8} computer={8} tablet={10} mobile={11} handleCate1={this.cate1Change} handleCate2={this.cate2Change} />
                  <Sorting widescreen={8} largeScreen={8} computer={8} tablet={5} mobile={4} handleChange={this.sortChange} placeholder={sort} />
                </Grid.Row>
              </MenuContainer>
            </Wrapper>
          </ContentBox>
        </MenuWrap>
        <ContentBox>
          <Wrapper>
            {this.state.rendering && sort && cate1 && cate2 &&
              <ScrollDesignListContainer sort={sort} cate1={cate1} cate2={cate2} />}
          </Wrapper>
        </ContentBox>
      </div>
    );
  }
}

export default DesignList;

import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollDesignListContainer from "containers/Designs/ScrollDesignListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import design_bg from "source/design_bg.jpg";
import StyleGuide from "StyleGuide";

// css styling

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  & ul {
    margin-top: 30px;
  }
`;

const Content = styled(ContentBox)`
// @media only screen and (max-width: 991px) and (min-width: 768px){
//   & .ui.grid>.row{
//     margin-left: 6.25% !important;
//   }
//   }
@media only screen and (max-width: 1200px) and (min-width: 992px){
  & .ui.grid>.row{
    margin-left: 6.25% !important;
  }
  }
`;

const MenuContainer = styled(Grid) `
  font-size: 1rem;
  & .sorting {
    text-align: right;
  }
  & .ui.default.dropdown:not(.button)>.text,
  & .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  &.ui.grid > .row {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }
`;

const ImgWrapper = styled.div`
  background-image: url(${design_bg});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
  position: relative;
  &::after{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
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
    color: ${StyleGuide.color.geyScale.scale0};
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const MenuWrap = styled.div`
  background-color: white;
  margin-bottom: 30px;
  border-top: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 1px 1px ${StyleGuide.color.geyScale.scale3};
`;

class DesignList extends Component {
  state = {
    rendering: true
  }

  changeState = async () => {
    await this.setState({
      rendering: false
    });
    await this.setState({
      rendering: true
    });
  } // state 값 업데이트를 통해 컴포넌트 새로 렌더링함

  cate1Change = (value, value2) => {
    this.props.history.replace(`/design/${this.props.sort}/${value}/null`);
    this.changeState();
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
        {/* <ImgWrapper>
          <Title>
            <h1>디자인</h1>
            <p>여러 디자이너들의 작품을 쉽게 공유하고 참고할 수 있습니다.</p>
          </Title>
        </ImgWrapper> */}
        <MenuWrap>
          <Content>
            <Wrapper>
              <MenuContainer devided="vertically" padded={true}>
                <Grid.Row>
                  <CategoryContainer widescreen={8}
                                     largeScreen={8}
                                     computer={8}
                                     tablet={10}
                                     mobile={11}
                                     handleCate1={this.cate1Change}
                                     handleCate2={this.cate2Change}
                                     cate1={this.props.cate1}
                                     cate2={this.props.cate2}
                                     />
                  <Sorting widescreen={8}
                           largeScreen={8}
                           computer={8}
                           tablet={6}
                           mobile={5}
                           handleChange={this.sortChange}
                           placeholder={sort} />
                </Grid.Row>
              </MenuContainer>
            </Wrapper>
          </Content>
        </MenuWrap>
        <Content>
          <Wrapper>
            {this.state.rendering &&
              <ScrollDesignListContainer sort={sort} cate1={cate1} cate2={cate2} />}
          </Wrapper>
        </Content>
      </div>
    );
  }
}

export default DesignList;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import Design from "components/Designs/Design";
import Designer from "components/Designers/Designer";

import open_bg from "source/open_bg.jpg";
import easy_bg from "source/easy_bg.jpg";
import together_bg from "source/together_bg.jpg";


// css styling

const ImgWrapper = styled.div`
  background-image: url(${open_bg});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 400px;
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
  }
  &.esay, &.together{
    background-position: center 20%;
  }
`;

const TextWrapper = styled(ContentBox) `
  padding-bottom: 50px;
`;

const HowToUse = styled(Grid) `
& button {
  display: block;
  border: 1px solid #f00;
  background-color: #fff;
  padding: 7px 18px;
  color: #f00;
  border-radius: 3px;
}
margin-bottom: 50px !important;
`;

const SliderBox = styled(ContentBox) `
  height: 100%;
`;

const Slider = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  color: white;
`;

const SliderContent = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  h1 {
    color: ${StyleGuide.color.geyScale.scale0};
    font-size: ${StyleGuide.font.size.heading1};
    margin-bottom: 1rem;
  }
  p{
    line-height: 1.4;
  }
`;

const Content = styled(ContentBox)`
@media only screen and (max-width: 991px) and (min-width: 768px){
  & .ui.grid>.row{
    margin-left: 6.25% !important;
  }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 4rem 0;
`;

const ListContainer = styled(Grid)`
  &.ui.grid > .row {
    color: ${StyleGuide.color.geyScale.scale7};
    font-size: ${StyleGuide.font.size.heading3};
    margin: 1rem 0;
  }
`;


class Main extends Component {
  render() {
    return (
      <div>
        <ImgWrapper>
          <SliderBox>
            <Slider>
              <SliderContent>
                <h1>
                  디자인이 쉬워진다.<br />
                  오픈디자인
                </h1>
                <p>오픈디자인과 함께라면 디자인이 쉬워집니다. <br />다른 디자이너의 디자인을 참고하여 나만의 디자인을 만들어 보세요.</p>
              </SliderContent>
            </Slider>
          </SliderBox>
        </ImgWrapper>
        <TextWrapper>
          <Content>
            <Wrapper>
              <ListContainer textAlign="center" padded={true} as="ul">
                <Grid.Row>인기 디자인 추천</Grid.Row>
                <Grid.Row>
                  {this.props.DesignList.length > 0 &&
                    this.props.DesignList.map(design => (
                      <Grid.Column key={design.uid}
                                  mobile={16} tablet={5} computer={4} 
                                  largeScreen={2} widescreen={2} className="largeCustom">
                        <Design data={design}/>
                      </Grid.Column>
                    ))
                  }
                </Grid.Row>
              </ListContainer>
              <ListContainer textAlign="center" padded={true} as="ul">
                <Grid.Row>인기 디자이너 추천</Grid.Row>
                <Grid.Row>
                  {this.props.DesignerList.length > 0 &&
                    this.props.DesignerList.map(designer => (
                      <Grid.Column key={designer.uid}
                                  mobile={16} tablet={5} computer={4} 
                                  largeScreen={2} widescreen={2} className="largeCustom">
                        <Designer data={designer}/>
                      </Grid.Column>
                    ))
                  }
                </Grid.Row>
              </ListContainer>
            </Wrapper>
          </Content>
            <HowToUse textAlign="center">
              <Grid.Row>
                <h3>오픈디자인 서비스에 대해 더 궁금하신가요?</h3>
              </Grid.Row>
              <button>홍보 영상 보러가기</button>
            </HowToUse>
        </TextWrapper>
      </div>
    );
  }
}

export default Main;





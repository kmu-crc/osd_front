import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import designer_bg from "source/designer_bg.jpg";
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
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
`;

const MenuContainer = styled(Grid)`
  & .sorting {
    text-align: right;
    line-height: 50px;
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
  background-image: url(${designer_bg});
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


class DesignerList extends Component {
  state = {
    rendering: true
  }

  changeState = () => {
    this.setState({
      rendering: false
    });
    setTimeout(()=>{
      this.setState({
        rendering: true
      });
    }, 200);
  }

  cate1Change = (value, value2) => {
    this.props.history.replace(`/designer/${this.props.sort}/${value}/null`);
    this.changeState();
  }

  cate2Change = (value) => {
    this.props.history.replace(`/designer/${this.props.sort}/${this.props.cate1}/${value}`);
    this.changeState();
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/designer/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.changeState();
  }

  render(){
    const {sort, cate1, cate2} = this.props;
    return(
      <div>
        {/* <ImgWrapper>
          <Title>
            <h1>디자이너</h1>
            <p>오픈디자인은 다양한 분야에서 활동하는 디자이너들의 디자인 공유를 지향합니다.</p>
          </Title>
        </ImgWrapper> */}
        <MenuWrap>
          <Content>
            <Wrapper>
              <MenuContainer devided="vertically" padded={true} columns={2}>
                <Grid.Row stretched={false}>
                  <CategoryContainer widescreen={8}
                                     largeScreen={8}
                                     computer={8}
                                     tablet={10}
                                     mobile={11}
                                     handleCate1={this.cate1Change}
                                     handleCate2={this.cate2Change}
                                     cate1={this.props.cate1}
                                     cate2={this.props.cate2}/>
                  <Sorting widescreen={8}
                           largeScreen={8}
                           computer={8}
                           tablet={5}
                           mobile={4}
                           handleChange={this.sortChange}
                           placeholder={sort}/>
                </Grid.Row>
              </MenuContainer>
            </Wrapper>
          </Content>
        </MenuWrap>
        <Content>
          <Wrapper>
            {this.state.rendering &&
            <ScrollDesignerListContainer sort={sort} cate1={cate1} cate2={cate2}/>}
          </Wrapper>
        </Content>
      </div>
    );
  }
}

export default DesignerList;

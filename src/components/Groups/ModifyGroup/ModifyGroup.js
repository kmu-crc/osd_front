import React, { Component } from 'react';
import styled from 'styled-components';
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import mainSlide from "source/mainSlide.jpg";
import ModifyGroupInfoContainer from "containers/Groups/ModifyGroupInfoContainer";

// css styling

const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 300px;
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

class ModifyGroup extends Component {
  render(){
    return(
      <div>
        <ImgWrapper>
          <Title><h1>그룹 정보 수정</h1></Title>
        </ImgWrapper>
        <Wrapper>
          <ModifyGroupInfoContainer {...this.props}/>
        </Wrapper>
      </div>
    );
  }
}

export default ModifyGroup;

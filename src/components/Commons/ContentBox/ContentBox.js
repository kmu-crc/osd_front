import React, { Component } from 'react';
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const Container = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 767px) and (min-width: 320px){
    padding: 0 20px;
    width: ${StyleGuide.gridContent.mobile};
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    width: ${StyleGuide.gridContent.tablet};
  }
  @media only screen and (min-width: 992px){
    width: ${StyleGuide.gridContent.computer};
  }
  @media only screen and (max-width: 1919px) and (min-width: 1200px){
    width: ${StyleGuide.gridContent.largeScreen};
  }
  @media only screen and (min-width: 1920px){
    width: ${StyleGuide.gridContent.largeScreen};
  }
`

class ContentBox extends Component {
  render() {
    return(
      <Container className={this.props.className}>
        {this.props.children}
      </Container>
    );
  }
}

export default ContentBox;

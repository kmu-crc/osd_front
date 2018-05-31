import React, { Component } from 'react';
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 767px) and (min-width: 320px){
    width: 320px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    width: 768px;
  }
  @media only screen and (min-width: 992px){
    width: 992px;
  }
  @media only screen and (max-width: 1399px) and (min-width: 1200px){
    width: 1200px;
  }
  @media only screen and (max-width: 1699px) and (min-width: 1400px){
    width: 1400px;
  }
  @media only screen and (max-width: 1919px) and (min-width: 1700px){
    width: 1700px;
  }
  @media only screen and (min-width: 1920px){
    width: 1800px;
  }
`

class ContentBox extends Component {
  render() {
    return(
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export default ContentBox;

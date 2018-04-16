import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Route } from 'react-router-dom';
import CreateInfo from '../CreateInfo';
import CreateAuth from '../CreateAuth';

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  min-width: 660px;
  padding: 20px 30px;
`;

const Container = styled.div`
  width: 100%;
  margin: auto;
  background-color: #F9F9F9;
  height: 600px;
`;

const Header = styled.h2`
  font-weight: 400;
  padding-left: 50px;
  color: #D7382C;
`

const TapContainer = styled.div`
  width: 25%;
  float: left;
  padding-top: 20px;
  @media (max-width: 768px) {
    display: none;
  }
  & ul {
    display: block;
    width: 85%;
    margin: auto;
    border-top: 20px solid #000;
    border-bottom: 20px solid #000;
    list-style: none;
    background-color: #1E1E1E;
    border-radius: 6px;
    padding: 0;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  }
  & li {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-top: 0.7px solid #383838;
    border-bottom: 0.7px solid #383838;
    padding-left: 30px;
    font-weight: 200;
    &: hover {
      background-color: #2c2c2c;
    }
    & a {
      color: #fff;
    }
  }
`;

const RouterContainer = styled.div`
  float: left;
  padding-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: 75%;
  }
`;

class CreateDesign extends Component {
  render(){
    return(
      <Wrapper>
        <Header>새 디자인 생성</Header>
        <Container>
          <TapContainer>
            <ul>
              <li><Link to="/createDesign">디자인 정보 입력</Link></li>
              <li><Link to="/createDesign/auth">권한 설정</Link></li>
            </ul>
          </TapContainer>
          <RouterContainer>
            <Route exact path="/createDesign" component={CreateInfo} />
            <Route path="/createDesign/auth" component={CreateAuth} />
          </RouterContainer>
          <div className="clear"></div>
        </Container>
      </Wrapper>
    );
  }
}

export default CreateDesign;
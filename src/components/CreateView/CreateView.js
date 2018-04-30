import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// css styling

const Wrapper = styled.div`
  width: 100%;
  min-width: 660px;
  min-height: 600px;
  padding: 20px 30px 80px;
  background-color: #f9f9f9;
`;

const Header = styled.h2`
  font-weight: 400;
  padding-left: 50px;
  color: #D7382C;
`;

const Container = styled.form`
  width: 80%;
  margin: auto;
  padding: 20px 0;
  position: relative;
  & .red {
    position: absolute;
    bottom: -60px;
    left: 50%;
    margin-left: -44px;
  }
`;

const List = styled.div`
  width: 100%;
  height: 60px;
  &:nth-of-type(2) {
    height: 110px;
  }
  & label {
    font-size: 18px;
    display: block;
    line-height: 60px;
    text-align: left;
    float: left;
    width: 130px;
  }
  & input {
    height: 30px;
    width: 70%;
    margin-top: 10px;
    float: left;
  }
  & .text {
    height: 80px;
  }
  & .file {
    width: 40%;
  }
  & button {
    padding: 3px 8px;
    font-size: 18px;
    background-color: #e9e9e9;
    color: #343434;
    margin-top: 10px;
    margin-left: 10px;
  }
`;

class CreateView extends Component {
  render(){
    return(
      <Wrapper>
        <Header>대표 디자인 등록</Header>
        <Container>
          <List>
            <label>작품명</label>
            <input placeholder="작품명을 입력해 주세요(최대 16자)"/>
          </List>
          <List>
            <label>작품 설명</label>
            <input className="text" placeholder="작품 설명을 입력해주세요"/>
          </List>
          <List>
            <label>작품 업로드</label>
            <input className="file"/>
            <button>+</button>
          </List>
          <List>
            <label>소스 파일 업로드</label>
            <input className="file"/>
            <button>+</button>
          </List>
          <button className="red"><Link to="/designDetail/1">등록</Link></button>
        </Container>
      </Wrapper>
    );
  }
}

export default CreateView;


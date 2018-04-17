import React, { Component } from 'react';
import styled from 'styled-components';

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

class CreateGroup extends Component {
  render(){
    return(
      <Wrapper>
        <Header>새 그룹 생성</Header>
        <Container>
          <List>
            <label>그룹 이름</label>
            <input placeholder="그룹 이름을 입력해주세요(최대 16자)"/>
          </List>
          <List>
            <label>그룹 설명</label>
            <input className="text" placeholder="그룹 설명을 입력해주세요"/>
          </List>
          <List>
            <label>썸네일 업로드</label>
            <input className="file"/>
            <button>+</button>
          </List>
          <button className="red">그룹 생성</button>
        </Container>
      </Wrapper>
    );
  }
}

export default CreateGroup;
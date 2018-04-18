import React, { Component } from 'react';
import styled from 'styled-components';
import Design from "../Design";

// css styling

const Wrapper = styled.div`
  width: 100%;
  min-width: 660px;
  min-height: 600px;
  padding: 20px 30px;
  background-color: #f9f9f9;
`;

const Header = styled.h2`
  font-weight: 400;
  padding-left: 50px;
  color: #D7382C;
`;

const Container = styled.div`
  margin: auto;
  width: 90%;
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

const Waiting = styled.div`
  width: 100%;
  & ul {
    margin: 100px auto 0;
    min-width: 660px;
    @media (min-width: 768px) and (max-width: 960px) {
      width: 660px;
    }
    @media (min-width: 960px) and (max-width: 1200px) {
      width: 880px;
    }
    @media (min-width: 1200px) and (max-width: 1320px) {
      width: 1100px;
    }
    @media (min-width: 1320px) {
      width: 1320px;
    }
  }
`;

const Accepted = styled.div`
  width: 100%;
  & ul {
    margin: 100px auto 0;
    min-width: 660px;
    @media (min-width: 768px) and (max-width: 960px) {
      width: 660px;
    }
    @media (min-width: 960px) and (max-width: 1200px) {
      width: 880px;
    }
    @media (min-width: 1200px) and (max-width: 1320px) {
      width: 1100px;
    }
    @media (min-width: 1320px) {
      width: 1320px;
    }
  }
`;

class ModifyGroup extends Component {
  render(){
    return(
      <Wrapper>
        <Header>내 그룹 수정</Header>
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
              <label>썸네일 수정</label>
              <input className="file"/>
              <button>+</button>
            </List>
        </Container>
        <Waiting>
          <h3>가입 신청중인 디자인</h3>
          {/* <ul>
            {list.map(design =>
              <Design key={design.uid} design={design}/>
            )}
            <div className="clear"></div>
          </ul> */}
          <h3>가입 신청중인 그룹</h3>
          {/* <ul>
            {list.map(group =>
              <Group key={group.uid} group={group}/>
            )}
            <div className="clear"></div>
          </ul> */}
        </Waiting>
        <Accepted>
          <h3>가입된 디자인 리스트</h3>
            {/* <ul>
              {list.map(design =>
                <Design key={design.uid} design={design}/>
              )}
              <div className="clear"></div>
            </ul> */}
            <h3>가입된 그룹 리스트</h3>
            {/* <ul>
              {list.map(group =>
                <Group key={group.uid} group={group}/>
              )}
              <div className="clear"></div>
            </ul> */}
        </Accepted>
      </Wrapper>
    );
  }
}

export default ModifyGroup;
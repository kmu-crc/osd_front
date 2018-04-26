import React, { Component } from 'react';
import styled from 'styled-components';

// css styling

const FormContainer = styled.div`
  padding: 30px 50px 80px 50px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 5px #c7c7c7;
  & h3 {
    font-size: 24px;
  }
  @media (max-width: 960px) {
    margin-right: 0;
  }
  @media (min-width: 960px) {
    margin-right: 80px;
  }
`;

const List = styled.div`
  width: 100%;
  height: 60px;
  & label {
    font-size: 18px;
    display: block;
    width: 20%;
    line-height: 60px;
    text-align: left;
    float: left;
  }
  & > label {
    min-width: 120px;
  }
`;

const AuthCheck = styled.div`
  float: left;
  & label {
    display: inline;
    width: 80px;
    text-align: right;
    font-size: 15px;
  }
  & input {
    width: 20px;
    float: left;
    margin-right: 40px;
    margin-top: 22px;
  }
`;

 const MainBtn = styled.button`
    padding: 7px 25px;
    border-radius: 30px;
    background-color: #EB3324;
    border: none;
    color: #fff;
    font-size: 14px;
    position: absolute;
    bottom: 30px;
    right: 50%;
    margin-right: -43px;
    &:hover{
      background-color: #CD4533;
    }
 `;


class CreateAuth extends Component {
  render(){
    return(
        <FormContainer>
          <form>
            <h3>권한 설정</h3>
              <List>
                <label>라이센스</label>
                <AuthCheck>
                  <label>수정 가능</label>
                  <input type="checkbox"/>
                  <label>상업적 이용</label>
                  <input type="checkbox"/>
                  <label>원작자 표시</label>
                  <input type="checkbox"/>
                </AuthCheck>
              </List>
              <div className="clear"></div>
              <List>
                <label>디자인 공개 여부</label>
                <AuthCheck>
                  <label>공개</label>
                  <input type="checkbox" checked/>
                </AuthCheck>
                <div className="clear"></div>
              </List>
            <MainBtn>완료</MainBtn>
          </form>
      </FormContainer>
    );
  }
}

export default CreateAuth;
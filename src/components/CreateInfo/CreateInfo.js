import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


// css styling

const FormContainer = styled.div`
  padding: 30px 50px 80px 50px
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 5px #c7c7c7;
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
  & button {
    padding: 6px 12px;
    font-size: 18px;
    background-color: #e9e9e9;
    color: #343434;
    margin-top: 10px;
    margin-left: 10px;
  }
  & label {
    display: block;
    width: 20%;
    line-height: 60px;
    text-align: left;
    float: left;
    min-width: 88px;
  }
  & select {
    width: 20%;
    height: 30px;
    margin-top: 15px;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  width: 75%;
  height: 30px;
  margin-top: 10px;
  float: left;
`;

const FileInput = styled.input`
  width: 50%;
  float: left;
  height: 30px;
  margin-top: 10px;
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
    &:hover {
      background-color: #CD4533;
    }
 `;


class CreateInfo extends Component{
  render(){
    return(
        <FormContainer>
          <form>
            <List>
              <label>디자인 제목</label>
              <Input placeholder="디자인 제목을 입력해 주세요.(최대 20자)"/>
            </List>
            <List>
              <label>디자인 설명</label>
              <Input placeholder="내용을 입력해 주세요."/>
            </List>
            <List>
              <label>썸네일 업로드</label>
              <FileInput />
              <button>+</button>
            </List>
            <List>
              <label>카테고리</label>
              <select>
                <option>의상</option>
                <option>자동차</option>
                <option>웹</option>
              </select>
              <select>
                <option>의상</option>
                <option>자동차</option>
                <option>웹</option>
              </select>
            </List>
            <List>
              <label>멤버추가</label>
              <select>
                <option></option>
              </select>
            </List>
            <MainBtn><Link to="/createDesign/template">NEXT</Link></MainBtn>
          </form>
        </FormContainer>
    );
  }
}

export default CreateInfo;
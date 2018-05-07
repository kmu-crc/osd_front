import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


// css styling

const FormContainer = styled.div`
  width: 80%;
  margin: auto;
  background-color: #fff;
  & .mainInfo, & .authInfo {
    padding: 20px 30px 20px 40px;
    box-shadow: 0 1px 5px #c7c7c7;
  }
  & .authInfo {
    margin-top: 10px;
  }
`;

const List = styled.div`
  width: 100%;
  height: 60px;
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

class CreateInfo extends Component{
  render(){
    return(
        <FormContainer>
          <form>
            <div className="mainInfo">
              <h3>디자인 정보 입력</h3>
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
                <FileInput type="file" />
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
            </div>
            <div className="authInfo">
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
                    <input type="checkbox"/>
                  </AuthCheck>
                  <div className="clear"></div>
                </List>
              </div>
          </form>
      </FormContainer>
    );
  }
}

export default CreateInfo;
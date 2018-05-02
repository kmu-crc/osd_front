import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// css styling

const FormContainer = styled.div`
  width: 80%;
  margin: auto;
  background-color: #fff;
  padding: 20px 30px 20px 40px;
  box-shadow: 0 1px 5px #c7c7c7;
`;

const List = styled.div`
  width: 100%;
  height: 60px;
  & button {
    padding: 3px 8px;
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
  & input {
    width: 75%;
    height: 30px;
    margin-top: 10px;
    float: left;
  }
  & input.file {
    width: 50%;
  }
`;

class CreateView extends Component {
  render(){
    return(
        <FormContainer>
          <form>
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
          </form>
      </FormContainer>
    );
  }
}

export default CreateView;
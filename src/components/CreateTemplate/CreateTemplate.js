import React, { Component } from "react";
import styled from "styled-components";
import Project from "./project.png";
import Design from "./design.png";
import { Link } from "react-router-dom";

// css styling

const FormContainer = styled.div`
  padding: 30px 50px 80px 50px
  position: relative;
  margin-right: 80px;
  background-color: #fff;
  box-shadow: 0 1px 5px #c7c7c7;
  & h4 {
    margin-bottom: 50px;
  }
`;

const TemplateList = styled.div`
  width: 100%;
  & div {
    width: 50%;
    float: left;
    text-align: center;
  }
  & label {
    margin-right: 5px;
    font-size: 18px;
  }
  & img {
    width: 150px;
    height: auto;
    display: block;
    margin: 10px auto 0;
  }
 `;

 const Clear = styled.h2`
  display: block;
  clear: both;
  
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


class Template extends Component{
  render(){
    return(
        <FormContainer>
          <form>
            <TemplateList>
              <h4>원하는 템플릿을 선택해 주세요.</h4>
              <div>
                <label>디자인형</label>
                <input type="checkbox"/>
                <img src={Design} alt="design" />
              </div>
              <div>
                <label>프로젝트형</label>
                <input type="checkbox"/>
                <img src={Project} alt="project" />
              </div>
              <Clear></Clear>
            </TemplateList>
            <MainBtn><Link to="/createDesign/auth">NEXT</Link></MainBtn>
          </form>
        </FormContainer>
    );
  }
}

export default Template;
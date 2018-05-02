import React, { Component } from "react";
import styled from "styled-components";
import CreateInfo from "../CreateInfo";
import CreateView from "../CreateView";
import { Container, Row } from "../Grid";
import { Link } from "react-router-dom";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  min-width: 660px;
  padding: 20px 30px 90px;
  position: relative;
`;

const Header = styled.h2`
  font-weight: 400;
  padding-left: 50px;
  color: #D7382C;
`;

const RouterContainer = Container.extend`
`;

const CheckTemp = styled.div`
  width: 80%;
  margin: 20px auto;
  & h3 {
    float: left;
  }
  & input {
    float: left;
    width: 20px;
    height: 20px;
    margin: 20px 0 0 10px;
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
  bottom: 0px;
  right: 50%;
  margin-right: -43px;
  &:hover {
    background-color: #CD4533;
  }
`;

class CreateDesign extends Component {
  state = {
    isDesign: false
  };

  onDesignActive = (e) => {
    this.setState({
      isDesign: !(this.state.isDesign)
    });
  }

  render(){
    return(
      <Wrapper>
        <Header>새 디자인 등록</Header>
        <RouterContainer>
          <CreateInfo/>
          <CheckTemp>
            <h3>작품을 바로 업로드하시겠습니까?</h3>
            <input type="checkbox" onChange={this.onDesignActive}/>
            <Row/>
          </CheckTemp>
          {this.state.isDesign === true &&
            <CreateView/>
          }
        </RouterContainer>
        <div className="clear"></div>
        {this.state.isDesign === true? 
        <MainBtn><Link to="/designDetail/1">완료</Link></MainBtn>
        : <MainBtn><Link to="/designDetail/4">완료</Link></MainBtn> }
      </Wrapper>
    );
  }
}

export default CreateDesign;
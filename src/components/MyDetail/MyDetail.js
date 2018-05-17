import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Icon, Header } from "semantic-ui-react";

// css styling
const Wrapper = styled.div`
  min-width: 660px;
  padding: 20px 0;
  position: relative;
  & .ui.grid {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const HeadContainer = styled.div`
  width: 20%;
  background-color: e9e9e9;
  float: left;
`;

const MenuContainer = styled(Grid)`
  width: 80%;
  float: left;
`;


class MyDetail extends Component {

  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
    this.props.GetMyDesignListRequest(this.props.token, "design", null);
    this.props.GetMyGroupListRequest(this.props.token, "group", null);
  }
  render(){
    let MyInfo = this.props.MyDetail;
    let MyDesign = this.props.MyDesign;
    return(
      <Wrapper>
        <Header as="h1">마이페이지</Header>
        <Container>
          <HeadContainer>유저정보</HeadContainer>
          <MenuContainer>컨텐츠정보</MenuContainer>
          <div className="clear"></div>
        </Container>
      </Wrapper>
    );
  }
}

export default MyDetail;

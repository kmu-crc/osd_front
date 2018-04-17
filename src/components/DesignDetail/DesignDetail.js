import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import DetailView from "../DetailView";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 30px;
  & h3 {
    min-width: 300px;
    float: left;
    font-size: 24px;
    margin-right: 50px;
  }
  & .explanation {
    width: 800px;
    margin: 20px 5px 40px;
  }
`;

const SubInfo = styled.div`
  color: #EB3324;
  font-size: 13px;
  float: left;
  margin-top: 30px;
  & span {
    margin-right: 5px;
  }
`;

const Count = styled.div`
  & span {
    float: left;
    margin-right: 30px;
    color: dimgray;
    font-weight: 400;
    font-size: 13px;
    padding-left: 20px;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const NaviTab = styled.div`
  margin: 0 auto;
  border-bottom: 2px solid #191919;
  overflow: hidden;
  transition: border 250ms ease;
  & ul {
    margin: 0;
    padding: 0;
    padding-left: 48px;
    overflow: hidden;
    float: left;
  }
  & li {
    display: block;
    float: right;
    padding: 10px 24px 8px;
    background-color: #FFF;
    margin-right: 46px;
    z-index: 2;
    position: relative;
    cursor: pointer;
    color: #191919;
    transition: all 250ms ease;
  }
  & li:before, & li:after {
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 44px;
    background-color: #FFF;
    transition: all 250ms ease;
    border-top: 1px solid #f2f2f2;
  }
  & li:before {
    right: -24px;
    transform: skew(30deg, 0deg);
    box-shadow: rgba(0,0,0,.1) 3px 2px 5px, inset rgba(255,255,255,.09) -1px 0;
  }
  & li:after {
    left: -24px;
    transform: skew(-30deg, 0deg);
    box-shadow: rgba(0,0,0,.1) -3px 2px 5px, inset rgba(255,255,255,.09) 1px 0;
  }
  & li.active, & li.active:before, & li.active:after {
    background-color: #191919;
    color: #fff;
    border-top: none;
  }
`;

const Container = styled.div`
  min-height: 500px;
  background-color: #f2f2f2;
`;

class DesignDetail extends Component {
  render(){
    let designDetail = this.props.DesignDetail;
    return(
      <div>
      {designDetail.length !== 0 &&
        <Wrapper>
          <h3>{designDetail.title}</h3>
          <SubInfo>
            <span>{designDetail.categoryName.name} /</span>
            <span>팀원 {designDetail.count.member_count}명</span>
          </SubInfo>
          <div className="clear"></div>
          <Count>
            <span>{designDetail.count.total_view_count}</span>
            <span>{designDetail.count.like_count}</span>
            <span>{designDetail.children_count["count(*)"]}</span>
            <div className="clear"></div>
          </Count>
          <div className="explanation">{designDetail.explanation}</div>
          <TabContainer>
            <NaviTab>
              <ul>
                <li><Link to="issue">ISSUE</Link></li>
                <li><Link to="step">STEP</Link></li>
                <li className="active"><Link to="view">VIEW</Link></li>
                <div className="clear"></div>
              </ul>
            </NaviTab>
            <Container>
              <Route path="/designDetail" component={DetailView}/>
              {/* <Route path="step" component={DetailStep}/>
              <Route path="issue" component={DetailIssue}/> */}
            </Container>
          </TabContainer>
        </Wrapper>
      }
      </div>
    );
  }
}

export default DesignDetail;
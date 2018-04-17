import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";

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
`;

const NaviTab = styled.ul`
  width: 360px;
  & li {
    width: 120px;
    float: left;
  }
`;

const Container = styled.div`
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
              <li><Link to="view">VIEW</Link></li>
              <li><Link to="step">STEP</Link></li>
              <li><Link to="issue">ISSUE</Link></li>
            </NaviTab>
            <Container>
              {/* <Route path="view" component={DetailView}/>
              <Route path="step" component={DetailStep}/>
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
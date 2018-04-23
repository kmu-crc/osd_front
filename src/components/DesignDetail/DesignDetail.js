import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Columns } from "../Grid";
import DesignDetailViewContainer from "../../containers/DesignDetailViewContainer";
import DesignDetailStepContainer from "../../containers/DesignDetailStepContainer";
import DesignDetailIssueContainer from "../../containers/DesignDetailIssueContainer";

// css styling

const Wrapper = Container.extend`
  min-width: 660px;
  padding: 20px 0;
  position: relative;
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

const BtnWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  width: 140px;
  text-align: center;
  & button {
    padding: 7px 18px;
    border-radius: 3px;
  }
  & .long {
    background-color: #f2f2f2;
    font-size: 13px;
    margin-bottom: 5px;
  }
`;

const BtnManage = styled.div`
  margin-bottom: 10px;
  & button {
    background-color: #a4a4a4;
    font-size: 12px;
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const TabContainer = Container.extend`
  padding: 0 20px;
  position: relative;
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

const Content = styled.div`
  min-height: 300px;
`;

class DesignDetail extends Component {
  state = {
    activeTab: 0
  };

  changeActive = (e) => {
    let target = e.target;
    const tabNum = target.parentNode.children.length;
    for (var i = 0; i < tabNum; i++) {
      target.parentNode.children[i].className = "";
      target.className = "active";
    }
    this.setState({
      activeTab: target.getAttribute("id")
    });
  };

  render(){
    let designDetail = this.props.DesignDetail;
    return(
      <div>
      {designDetail.length !== 0 &&
        <Wrapper container={true}>
          <h3>{designDetail.title}</h3>
          <SubInfo>
            <span>{designDetail.categoryName.name} /</span>
            <span>팀원 {designDetail.count.member_count}명</span>
          </SubInfo>
          <Row/>
          <Count>
            <span>{designDetail.count.total_view_count}</span>
            <span>{designDetail.count.like_count}</span>
            <span>{designDetail.children_count["count(*)"]}</span>
            <Row/>
          </Count>
          <div className="explanation">{designDetail.explanation}</div>
          <BtnWrapper>
            <BtnManage>
              <button><Link to="">수정</Link></button>
              <button>삭제</button>
            </BtnManage>
            <button className="long"><Link to="">파생디자인 생성</Link></button>
            <button className="long"><Link to="">원본디자인 보기</Link></button>
          </BtnWrapper>
          <TabContainer>
            <NaviTab>
              <ul>
                <li onClick={this.changeActive} id="2">ISSUE</li>
                <li onClick={this.changeActive} id="1">STEP</li>
                <li className="active" onClick={this.changeActive} id="0">VIEW</li>
              </ul>
            </NaviTab>
            <Content>
              {this.state.activeTab == 0? <DesignDetailViewContainer id={designDetail.uid}/> 
              : this.state.activeTab == 1? <DesignDetailStepContainer id={designDetail.uid}/> 
              : <DesignDetailIssueContainer id={designDetail.uid}/>}
            </Content>
          </TabContainer>
        </Wrapper>
      }
      </div>
    );
  }
}

export default DesignDetail;
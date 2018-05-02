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
`;

const HeadContainer = styled.div`
  min-height: 100px;
  font-size: 13px;
  padding: 20px 30px 10px;
  border-bottom: 1px solid #e6ebf1;
  & .explanation {
    padding: 20px 10px 10px;
  }
  & button.btnIssue {
    float: right;
    width: 100px;
    margin-right: 282px;
    padding: 5px 0;
    margin-top: 10px;
    background: transparent;
    border-radius: 3px;
  }
`;

const Title = Columns.extend`
  float: left;
  font-size: 24px;
  font-weight: bold;
`;

const SubInfo = styled.div`
  border: 1px solid rgba(27,31,35,0.35);
  float: right;
  border-radius: 3px;
  & span {
    color: dimgray;
    font-weight: 400;
    float: left;
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  & span.text {
    border-right: 1px solid rgba(27,31,35,0.35);
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);
    width: 60px;
    font-weight: bold;
  }
  & span.number {
    border-right: 1px solid rgba(27,31,35,0.35);
    width: 40px;
  }
  & span.more {
    width: 80px;
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);
    cursor: pointer;
    font-weight: bold;
    position: relative;
  }
  & span.more:hover {
    background-image: linear-gradient(-180deg, #eff3f6 0%, #eff3f6 100%);
  }
`;

const Cate = Columns.extend`
  margin-top: 15px;
  font-size: 13px;
  & span {
    margin-right: 15px;
    max-width: 33%;
  }
  & .cate {
    color: #EB3324;
    margin-right: 30px;
  }
`;

const BtnModal = styled.ul`
  position: absolute;
  top: 35px;
  left: 0;
  text-align: left;
  width: 140px;
  border: 1px solid rgba(27,31,35,0.15);
  box-shadow: 0 3px 12px rgba(27,31,35,0.15);
  border-radius: 3px;
  font-weight: normal;
  background-color: #fff;
  z-index: 2;
  & li {
    padding: 0 10px;
  }
  & li:hover {
    background-image: linear-gradient(-180deg, #eff3f6 0%, #eff3f6 100%);
  }
  & li.activeStep {
    color: #EB3324;
  }
`;

const TabContainer = styled.div`
`;

const Content = styled.div`
  min-height: 300px;
`;

class DesignDetail extends Component {
  state = {
    activeMoreBtn: false,
    activeIssue: false
  };

  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id);
  }

  onActiveMoreBtn = (e) => {
    this.setState({
      activeMoreBtn: !(this.state.activeMoreBtn)
    });
  }

  onActiveStep = () => {
    alert("스텝 기능을 사용하시겠습니까? 템플릿을 변경한 후에는 이전으로 돌아갈 수 없습니다. (현재 등록된 디자인은 저장됩니다)");
    // 확인 누르면 api 요청 보내서 isProject = 1로 바꿔야 함!
  }

  onActiveIssue = (e) => {
    this.setState({
      activeIssue: !(this.state.activeIssue)
    });
    if (this.state.activeIssue === true) {
      e.target.innerHTML = "★ 공지보기";
    } else if (this.state.activeIssue === false) {
      e.target.innerHTML = "★ 공지닫기";
    }
  }

  render(){
    let designDetail = this.props.DesignDetail;
    return(
      <div>
      {designDetail.length !== 0 &&
        <Wrapper container={true}>
          <HeadContainer>
            <Title xs={4} sm={4} width={6}>{designDetail.title}</Title>
            <SubInfo>
              <span className="text">조회수</span>
              <span className="number">{designDetail.count.total_view_count}</span>
              <span className="text">좋아요</span>
              <span className="number">{designDetail.count.like_count}</span>
              <span className="text">파생</span>
              <span className="number">{designDetail.children_count["count(*)"]}</span>
              <span className="more" onClick={this.onActiveMoreBtn}>더보기 +
                {this.state.activeMoreBtn === true && 
                  <BtnModal>
                    <li>파생디자인 생성</li>
                    <li>원본디자인 보기</li>
                    <li>수정</li>
                    <li>삭제</li>
                    {designDetail.isProject == 0 &&
                    <li className="activeStep" onClick={this.onActiveStep}>프로젝트형으로 변경</li>
                    }
                  </BtnModal>
                }
              </span>
              <Row/>
            </SubInfo>
            <Row/>
            <Cate xs={4} sm={4} width={6}>
              <span className="cate">{designDetail.categoryName.name}</span>
              <span className="owner">:) {designDetail.userName}</span>
              <span className="member">:) {designDetail.count.member_count}명</span>
            </Cate>
            <button className="btnIssue" onClick={this.onActiveIssue}>★ 공지보기</button>
            <Row/>
            <div className="explanation">{designDetail.explanation}</div>
          </HeadContainer>
          <TabContainer>
            <Content>
              {this.state.activeIssue === true? <DesignDetailIssueContainer id={this.props.id} />
              : designDetail.isProject == 1? <DesignDetailStepContainer id={this.props.id}/>
              : <DesignDetailViewContainer id={this.props.id}/>}
            </Content>
          </TabContainer>
        </Wrapper>
      }
      </div>
    );
  }
}

export default DesignDetail;
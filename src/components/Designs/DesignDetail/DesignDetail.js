import React, { Component } from "react";
import styled from "styled-components";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer";
import DesignDetailIssueContainer from "containers/Designs/DesignDetailIssueContainer";
import { Grid, Icon } from "semantic-ui-react";

// css styling

const Wrapper = styled.div`
  min-width: 660px;
  padding: 20px 0;
  position: relative;
  & .ui.grid {
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

const HeadContainer = styled(Grid)`
  min-height: 100px;
  font-size: 13px;
  border-bottom: 1px solid #e6ebf1;
  & button.btnIssue {
    margin-left: 10px;
    width: 80px;
    height: 24px;
    margin-top: 6px;
    background: transparent;
    border-radius: 3px;
    font-size: 13px;
  }
  & .title {
    font-size: 24px;
    font-weight: bold;
  }
  & .explanation {
    margin-top: 20px;
  }
`;

const Cate = styled.div`
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
    width: 70px;
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
  min-height: 300px;
  position: relative;
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
    // 확인 누르면 api 요청 보내서 is_project = 1로 바꿔야 함!
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
    let count;
    if (designDetail.count != null) {
      count = designDetail.count;
    } else {
      count = {
        total_view_count: 0,
        member_count: 0,
        like_count: 0
      };
    }
    return(
      <div>
      {designDetail.length !== 0 &&
        <Wrapper>
          <HeadContainer divided="vertically" padded={true}>
            <Grid.Row columns={2}>
              <Grid.Column computer={8} tablet={6} mobile={6}>
                <h3 className="title">{designDetail.title}
                  <button className="btnIssue" onClick={this.onActiveIssue}>★ 공지보기</button>
                </h3>
                <Cate>
                  <span className="cate">{designDetail.categoryName}</span>
                  <span className="owner">
                    <Icon name="user" size="mini"></Icon>
                    {designDetail.userName}
                  </span>
                  <span className="member">
                    <Icon name="group" size="mini"></Icon>
                    {count.member_count}명
                  </span>
                </Cate>
                <div className="explanation">{designDetail.explanation}</div>
              </Grid.Column>
              <Grid.Column computer={8} tablet={10} mobile={10}>
                <SubInfo>
                <span className="text">
                  <Icon name="unhide" color="grey" size="mini"></Icon>
                  조회수
                </span>
                <span className="number">{count.total_view_count}</span>
                <span className="text">
                  <Icon name="heart" color="grey" size="mini"></Icon>
                  좋아요
                </span>
                <span className="number">{count.like_count}</span>
                <span className="text">
                  <Icon name="window restore" color="grey" size="mini"></Icon>
                  파생
                </span>
                <span className="number">{designDetail.children_count["count(*)"]}</span>
                <span className="more" onClick={this.onActiveMoreBtn}>더보기 +
                  {this.state.activeMoreBtn === true &&
                    <BtnModal>
                      <li>파생디자인 생성</li>
                      <li>원본디자인 보기</li>
                      <li>수정</li>
                      <li>삭제</li>
                    </BtnModal>
                  }
                </span>
              </SubInfo>
              </Grid.Column>
            </Grid.Row>
          </HeadContainer>
          <TabContainer>
            {this.state.activeIssue === true? <DesignDetailIssueContainer id={this.props.id} />
            : designDetail.is_project == 1? <DesignDetailStepContainer id={this.props.id}/>
            : <DesignDetailViewContainer goStep={this.onActiveStep} id={this.props.id}/>}
          </TabContainer>
        </Wrapper>
      }
      </div>
    );
  }
}

export default DesignDetail;

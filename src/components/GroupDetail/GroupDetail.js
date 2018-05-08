import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import { Row } from "../Grid";

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


class GroupDetail extends Component {
  state = {
    activeMoreBtn: false,
    activeIssue: false
  };

  componentDidMount() {
    this.props.GetGroupDetailRequest(this.props.id);
  }

  onActiveMoreBtn = (e) => {
    this.setState({
      activeMoreBtn: !(this.state.activeMoreBtn)
    });
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
    const groupDetail = this.props.GroupDetail;
    return(
      <div>
        {groupDetail.length !== 0 && 
          <Wrapper>
            <HeadContainer divided="vertically" padded={true}>
              <Grid.Row columns={2}>
                <Grid.Column computer={8} tablet={6} mobile={6}>
                  <h3 className="title">{groupDetail.title}
                    <button className="btnIssue" onClick={this.onActiveIssue}>★ 공지보기</button>
                  </h3>
                  <Row/>
                  <Cate>
                    <span className="owner">
                      <Icon name="user" size="tiny"></Icon>
                      {groupDetail.user_id}
                    </span>
                    <span className="member">
                      <Icon name="group" size="tiny"></Icon>
                      {groupDetail.count.member}명
                    </span>
                  </Cate>
                  <div className="explanation">{groupDetail.explanation}</div>
                </Grid.Column>
                <Grid.Column computer={8} tablet={10} mobile={10}>
                  <SubInfo>
                  <span className="text">
                    <Icon name="heart" color="grey" size="tiny"></Icon>
                    좋아요
                  </span>
                  <span className="number">{groupDetail.count.like}</span>
                  <span className="text">
                    <Icon name="window restore" color="grey" size="tiny"></Icon>
                    디자인수
                  </span>
                  <span className="number">{groupDetail.count.design}</span>
                  <span className="more" onClick={this.onActiveMoreBtn}>더보기 +
                    {this.state.activeMoreBtn === true && 
                      <BtnModal>
                        <li>가입신청</li>
                        <li>수정</li>
                        <li>삭제</li>
                      </BtnModal>
                    }
                  </span>
                  <Row/>
                </SubInfo>
                </Grid.Column>
              </Grid.Row>
            </HeadContainer>
            <TabContainer>
            </TabContainer>
          </Wrapper>
        }
      </div>
    );
  }
}

export default GroupDetail;






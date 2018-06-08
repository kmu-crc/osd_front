import React, { Component } from "react";
import styled from "styled-components";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer";
import DesignDetailIssueContainer from "containers/Designs/DesignDetailIssueContainer";
import { Grid, Icon, Modal } from "semantic-ui-react";
import ContentBox from "components/Commons/ContentBox";
import { Link, Route } from "react-router-dom";

// css styling

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 20px 0;
  position: relative;
`;

const HeadContainer = styled(Grid) `
  min-height: 100px;
  font-size: 13px;
  & button.ui.button {
    font-size: 13px;
    font-weight: 400;
  }
  & .title {
    font-size: 1.8rem;
    font-weight: bold;
  }
  & .explanation {
    margin-top: 20px;
  }
  & .issueBtn {
    margin-left: 10px;
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
  float: right;
  margin-right: 5px;
  & .ui.basic.label {
    font-weight: 400;
    font-size: 13px;
    color: rgba(0,0,0,.6);
  }
  & .ui.basic.button:hover,
    .ui.basic.buttons .button:hover {
      background-color: transparent;
  }
`;

const MoreBtn = styled.button`
  position: relative;
  float: right;
`;

const ModalContent = styled(Modal) `
  &.ui.modal.btnModal {
    position: absolute;
    top: 145px;
    right: 5px;
    text-align: left;
    width: 140px;
  }
  &.ui.modal > .content {
    padding: 0;
  }
  & li {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  & li:hover {
    background-image: linear-gradient(-180deg, #eff3f6 0%, #eff3f6 100%);
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

  componentWillUnmount() {
    this.props.DesignDetailResetRequest();
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
    const target = e.target;
    this.setState({
      activeIssue: !(this.state.activeIssue)
    });
    if (this.state.activeIssue === true) {
      target.textContent = "★ 공지보기";
    } else if (this.state.activeIssue === false) {
      target.textContent = "★ 공지닫기";
    }
  }

  render() {
    let designDetail = this.props.DesignDetail;
    let user = this.props.userInfo;
    let count;
    if (designDetail.count != null) {
      count = designDetail.count;
    } else {
      count = {
        view_count: 0,
        member_count: 0,
        like_count: 0
      };
    }
    const ButtonModal = () => {
      return (
        <ModalContent className="btnModal"
          open={this.state.activeMoreBtn} onClose={this.onActiveMoreBtn}
          dimmer={false}
          closeOnDocumentClick={true}>
          <Modal.Content as="ul">
            <li>파생디자인 생성</li>
            <li className={designDetail.parent_design != null ? "able" : "disable"}>원본디자인 보기</li>
            {user && user.uid === designDetail.user_id && <li>수정</li>}
            {user && user.uid === designDetail.user_id && <li>삭제</li>}
          </Modal.Content>
        </ModalContent>
      );
    }
    return (
      <div>
        {designDetail.length !== 0 &&
          <ContentBox>
            <Wrapper>
              <HeadContainer divided="vertically" padded={true}>
                <Grid.Row columns={2}>
                  <Grid.Column computer={8} tablet={6} mobile={6}>
                    <h3 className="title">{designDetail.title}
                      <Link to={this.state.activeIssue === false ? this.props.match.url + "/issue" : this.props.match.url}
                        onClick={this.onActiveIssue}>
                        <button className="ui button issueBtn">★ 공지보기</button>
                      </Link>
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
                    <MoreBtn className="ui teal button more" onClick={this.onActiveMoreBtn}>
                      더보기 +
                  <ButtonModal />
                    </MoreBtn>
                    <SubInfo>
                      <div className="ui right labeled button">
                        <button className="ui basic button" tabIndex="0">
                          <Icon name="unhide" size="mini"></Icon>
                          조회수
                    </button>
                        <div className="ui left pointing basic label">{count.view_count}</div>
                      </div>
                      <div className="ui right labeled button">
                        <button className="ui basic button" tabIndex="0">
                          <Icon name="heart" size="mini"></Icon>
                          좋아요
                    </button>
                        <div className="ui left pointing basic label">{count.like_count}</div>
                      </div>
                      <div className="ui right labeled button">
                        <button className="ui basic button" tabIndex="0">
                          <i aria-hidden="true" className="fork icon"></i>
                          파생
                    </button>
                        <div className="ui left pointing basic label">{designDetail.children_count["count(*)"]}</div>
                      </div>
                    </SubInfo>
                  </Grid.Column>
                </Grid.Row>
              </HeadContainer>
              <TabContainer>
                <Route exact path="/designDetail/:id"
                  component={designDetail.is_project == 1 ? DesignDetailStepContainer
                    : DesignDetailViewContainer} />
                <Route exact path={this.props.match.url + "/issue"} component={DesignDetailIssueContainer} />
              </TabContainer>
            </Wrapper>
          </ContentBox>
        }
      </div>
    );
  }
}

export default DesignDetail;

import React, { Component } from "react";
import styled from "styled-components";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer";
import DesignIssue from "components/Designs/DesignIssue/DesignIssue";
import { Grid, Icon, Modal } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import { Link, Route } from "react-router-dom";
import CreateDesignIssueContainer from "containers/Designs/CreateDesignIssueContainer";
import ModifyIssueDetailContainer from "containers/Designs/ModifyIssueDetailContainer";
import StyleGuide from "StyleGuide";

// css styling

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  & .VDNBH {
    position: relative;
  }
`;

const HeaderBackground = styled.div`
  width: 100%;
  background-color: ${StyleGuide.color.geyScale.scale1};
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale3};
`

const HeadContainer = styled(Grid)`
  &.ui.grid {
    margin: 0;
    padding: 1rem 0 3rem;
    min-height: 100px;
    font-size: ${StyleGuide.font.size.paragraph};
  }
  &.ui.grid > .row > .column {
    padding: 0;
  }
  & button.ui.button {
    font-size: ${StyleGuide.font.size.paragraph};
    font-weight: 400;
    color: #fff;
    background: ${StyleGuide.color.sub.bule.light};
    &:hover {
      border: 0;
      background: ${StyleGuide.color.sub.bule.basic};
    }
  }
  & .title {
    font-size: ${StyleGuide.font.size.heading3};
    font-weight: bold;
  }
  & .explanation {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

const Cate = styled.div`
  font-size: ${StyleGuide.font.size.paragraph};
  & span {
    margin-right: 15px;
    max-width: 33%;
  }
  & .cate {
    color: ${StyleGuide.color.main.basic};
    margin-right: 30px;
  }
`;

const SubInfo = styled.div`
  float: right;
  margin-right: 5px;
  & .ui.basic.label {
    font-weight: 400;
    font-size: ${StyleGuide.font.size.paragraph};
    color: ${StyleGuide.color.geyScale.scale7};
  }
  & .ui.button {
    cursor: initial;
  }
  & .like .ui.button {
    cursor: pointer;
  }
  & .ui.basic.button:hover,
    .ui.basic.buttons .button:hover {
      background-color: transparent !important;
      box-shadow: 0 0 0 1px rgba(34,36,38,.15) inset;
  }
  & .like .ui.basic.button:hover {
    background-color: ${StyleGuide.color.gey.light} !important;
  }
`;

const MoreBtn = styled(Button)`
  position: relative;
  float: right;
`;

const ModalContent = styled(Modal) `
  &.ui.modal.btnModal {
    position: absolute;
    top: 105px;
    right: 7vw;
    text-align: left;
    width: 140px;
  }
  &.ui.modal > .content {
    padding: 0;
  }
  & li {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  & li:hover {
    background-image: linear-gradient(-180deg, #eff3f6 0%, #eff3f6 100%);
  }
`;

const TabMenu = styled.ul`
  position: absolute;
  display: flex;
  bottom: -1px;
  color: ${StyleGuide.color.geyScale.scale7};
  & li {
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  & li.active {
    background-color: #F8FAFB;
    border: 1px solid ${StyleGuide.color.geyScale.scale3};
    border-bottom: 0;
    border-top: 2px solid ${StyleGuide.color.geyScale.scale3};
    color: ${StyleGuide.color.sub.bule.dark};
  }
`;

const TabContainer = styled.div`
  min-height: 300px;
  position: relative;
  margin-top: 20px;
`;


class DesignDetail extends Component {
  state = {
    activeMoreBtn: false
  };

  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token); // 디자인에 대한 정보
    this.props.UpdateDesignViewRequest(this.props.id)
    .then(this.props.GetDesignCountRequest(this.props.id)); // 디자인 조회수 업데이트 후 카운트 정보 가져옴
    if (this.props.token) {
      this.props.GetLikeDesignRequest(this.props.id, this.props.token);
    } // 로그인 한 경우 좋아요 했는지 여부 가져오기
  }

  componentWillUnmount() {
    this.props.DesignDetailResetRequest();
  }

  onActiveMoreBtn = (e) => {
    this.setState({
      activeMoreBtn: !(this.state.activeMoreBtn)
    });
  }

  updateLike = () => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (this.props.like === true) {
      this.props.UnlikeDesignRequest(this.props.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.GetLikeDesignRequest(this.props.id, this.props.token)
          .then(this.props.GetDesignCountRequest(this.props.id))
        }
      });
    } else {
      this.props.LikeDesignRequest(this.props.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.GetLikeDesignRequest(this.props.id, this.props.token)
          .then(this.props.GetDesignCountRequest(this.props.id))
        } 
      });
    }
  }

  deleteDesign = () => {
    const confirm = window.confirm("디자인을 삭제하시겠습니까?");
    if (confirm) {
      this.props.DeleteDesignRequest(this.props.id, this.props.token)
      .then(this.props.history.push("/design"));
    } else {
      return;
    }
  }

  render() {
    const designDetail = this.props.DesignDetail;
    const user = this.props.userInfo;
    const count = this.props.Count;

    const ButtonModal = () => {
      return (
        <ModalContent className="btnModal"
          open={this.state.activeMoreBtn} onClose={this.onActiveMoreBtn}
          dimmer={false}
          closeOnDocumentClick={true}>
          <Modal.Content as="ul">
            <li>파생디자인 생성</li>
            <li className={designDetail.parent_design != null ? "able" : "disable"}>원본디자인 보기</li>
            {user && user.uid === designDetail.user_id && 
            <Link to={`/designModify/${this.props.id}`}><li>수정</li></Link>
            }
            {user && user.uid === designDetail.user_id && <li onClick={this.deleteDesign}>삭제</li>}
          </Modal.Content>
        </ModalContent>
      );
    }
    return (
      <div>
        {designDetail.length !== 0 &&
          <Wrapper>
            {/* --------------- 상단 디자인에 대한 정보 및 카운트 정보 ---------------  */}
            <HeaderBackground>
              <ContentBox>
                <HeadContainer divided="vertically" padded={true}>
                  <Grid.Row columns={2}>
                    <Grid.Column computer={8} tablet={6} mobile={6}>
                      <h3 className="title">{designDetail.title}</h3>
                      <div className="explanation">{designDetail.explanation}</div>
                      <Cate>
                        <span className="cate">
                          {designDetail.categoryName? designDetail.categoryName : "전체"}
                        </span>
                        <span className="owner">
                          <Icon name="user"></Icon>
                          {designDetail.userName}
                        </span>
                        <span className="member">
                          <Icon name="group"></Icon>
                          {count.member_count}명
                        </span>
                      </Cate>
                    </Grid.Column>
                    <Grid.Column computer={8} tablet={10} mobile={10}>
                      <MoreBtn color="Primary" className="ui button more" onClick={this.onActiveMoreBtn}>
                        더보기 +
                      <ButtonModal />
                      </MoreBtn>
                      <SubInfo>
                        <div className="ui right labeled button">
                          <button className="ui basic button" tabIndex="0">
                            <Icon name="unhide"></Icon>
                            조회수
                      </button>
                          <div className="ui left pointing basic label">{count.view_count}</div>
                        </div>
                        <div className="ui right labeled button like">
                        {this.props.like === true 
                        ? <button className="ui basic button" onClick={this.updateLike}>
                          <Icon name="heart"></Icon>
                          좋아요 취소
                          </button>
                        : <button className="ui basic button" onClick={this.updateLike}>
                          <Icon name="heart"></Icon>
                          좋아요
                          </button>
                        }
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
                <TabMenu>
                  <Link to={`/designDetail/${this.props.id}`}>
                    <li className={this.props.history.location.pathname.indexOf("issue") === -1 ? "active" : ""}>
                    컨텐츠
                    </li>
                  </Link>
                  <Link to={`/designDetail/${this.props.id}/issue`}>
                    <li className={this.props.history.location.pathname.indexOf("issue") !== -1 ? "active" : ""}>
                    이슈
                    </li>
                  </Link>
                </TabMenu>
              </ContentBox>
            </HeaderBackground>
            {/* --------------- 하단 이슈/뷰/스텝 페이지 렌더링 ---------------  */}
            <ContentBox>
              <TabContainer>
                <Route exact path={"/designDetail/:id"}
                        component={designDetail.is_project == 1 ? DesignDetailStepContainer
                                                                : DesignDetailViewContainer} />
                <Route exact path={"/designDetail/:id/issue/:issue_id?"} 
                        component={DesignIssue} />
                <Route exact path={"/designDetail/:id/createissue"} 
                        component={CreateDesignIssueContainer} />
                <Route exact path={"/designDetail/:id/issue/:issue_id/modify"}
                        component={ModifyIssueDetailContainer} />
              </TabContainer>
            </ContentBox>
          </Wrapper>
        }
      </div>
    );
  }
}

export default DesignDetail;

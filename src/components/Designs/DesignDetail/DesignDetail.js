import React, { Component } from "react";
import styled, { css } from "styled-components";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer";
// import DesignIssue from "components/Designs/DesignIssue/DesignIssue";
import { Grid, Icon, Modal } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import { Link, Route } from "react-router-dom";
// import CreateDesignIssueContainer from "containers/Designs/CreateDesignIssueContainer";
// import ModifyIssueDetailContainer from "containers/Designs/ModifyIssueDetailContainer";
import StyleGuide from "StyleGuide";
import PxtoRem from "modules/PxtoRem";

// css styling

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  & .VDNBH {
    position: relative;
  }
`;

const HeadContainer = styled(Grid)`
  position: relative;
  z-index: 10;
  &.ui.grid {
    margin: 0;
    font-size: ${StyleGuide.font.size.paragraph};
  }
  &.ui.grid > .row {
    padding: 0;
  }
  &.ui.grid > .row > .column {
    padding: 0;
    position: relative;
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


const TabContainer = styled.div`
  min-height: 300px;
  position: relative;
  margin-top: 20px;
`;

// 새로운 header
const HeaderWrap = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  background-color: ${StyleGuide.color.geyScale.scale1};
  .designHeaderCol {
    margin-top: ${PxtoRem(60)} !important;
    &:last-child {
      @media only screen and (max-width: 767px) and (min-width: 320px) {
        margin-top: ${PxtoRem(0)} !important;
      }
    }
    @media only screen and (max-width: 991px) and (min-width: 768px) {
      height: ${PxtoRem(190)};
    }
    @media only screen and (min-width: 992px) {
      height: ${PxtoRem(160)};
    }
  }
`;

const BgHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  height: ${PxtoRem(220)};
  @media only screen and (max-width: 767px) and (min-width: 320px) {
    height: ${PxtoRem(200)};
  }
  @media only screen and (max-width: 991px) and (min-width: 768px) {
    height: ${PxtoRem(250)};
  }
  color: white;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    ${props =>
      props.img
        ? css`
             {
              background-image: url(${props.img.l_img});
            }
          `
        : null};
    opacity: 0.3;
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-filter: blur(7px);
    -moz-filter: blur(7px);
    -o-filter: blur(7px);
    -ms-filter: blur(7px);
    filter: blur(7px);
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const DesignInfoCard = styled.div`
  width: 100%;
  position: relative;
  @media only screen and (max-width: 767px) and (min-width: 320px) {
    background-color: white;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${PxtoRem(10)};
    padding: ${PxtoRem(15)} ${PxtoRem(15)};
  };
  &::after{
    display: block;
    content: "";
    clear: both;
  }
`;

const DesignTitle = styled.h2`
  font-size: ${StyleGuide.font.size.heading2};
  color: white;
  @media only screen and (max-width: 767px) and (min-width: 320px) {
    color: ${StyleGuide.color.geyScale.scale9};
  }
`;

const DesignExplanation = styled.div`
  h3 {
    font-size: ${StyleGuide.font.size.heading4};
    color: white;
    @media only screen and (max-width: 767px) and (min-width: 320px) {
      color: ${StyleGuide.color.geyScale.scale9};
    }
  }
  p {
    font-size: ${StyleGuide.font.size.paragraph};
    color: ${StyleGuide.color.geyScale.scale2};
    word-break: break-all;
    @media only screen and (max-width: 767px) and (min-width: 320px) {
      color: ${StyleGuide.color.geyScale.scale6};
    }
  }
`;

const ThumbnailImg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: ${PxtoRem(250)};
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-color: gray;
  border-radius: 3px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  ${props =>
    props.img
      ? css`
           {
            background-image: url(${props.img.l_img});
          }
        `
      : null};
  @media only screen and (max-width: 767px) and (min-width: 320px) {
    margin: 0 auto;
    height: ${PxtoRem(200)};
    margin-bottom: ${PxtoRem(10)};
    position: relative;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px) {
    height: ${PxtoRem(170)};
  }
  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    height: ${PxtoRem(200)};
  }
`;

const DesignInfo = styled.div`
  width: 100%;
  padding-top: ${PxtoRem(20)};
  padding-bottom: ${PxtoRem(20)};
  background-color: ${StyleGuide.color.geyScale.scale1};
`;

const DesignSubInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${PxtoRem(60)};
  @media only screen and (max-width: 767px) and (min-width: 320px) {
    padding: 0 ${PxtoRem(20)};
  }
`;

const CreateDate = styled.div`
  line-height: ${PxtoRem(60)};
  color: ${StyleGuide.color.geyScale.scale1};
  span {
    color: white;
    font-weight: bold;
  }
`;

const SideMenuBtn = styled.div`
  position: absolute;
  right: 0;
  width: ${PxtoRem(50)};
  & > button {
    line-height: ${PxtoRem(60)};
    background-color: transparent;
    border: 0;
    width: ${PxtoRem(50)};
    text-align: right;
    padding: 0;
    outline: 0;
    i.icon {
      color: white;
      margin-right: 0;
      &::after {
        margin-right: 0;
      }
    }
  }
`;

const SideMenu = styled.ul`
  display: block;
  position: absolute;
  width: ${PxtoRem(150)};
  text-align: center;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
  background-color: white;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    &:last-child {
      border: 0;
    }
    & button {
      width: 100%;
      line-height: ${PxtoRem(45)};
      background-color: transparent;
      text-align: center;
      border: 0;
      padding: 0;
      outline: 0;
    }
  }
`;

const CounterWrap = styled.div`
  width: 100%;
  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    margin-top: ${PxtoRem(30)};
  }
  @media only screen and (min-width: 1200px) {
    margin-top: ${PxtoRem(80)};
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const CounterItem = styled.div`
  width: 32.3333%;
  margin-right: 1.5%;
  float: left;
  text-align: center;
  padding: ${PxtoRem(10)};
  background-color: white;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  i.icon {
    margin: 0 auto;
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  &:last-child {
    margin-right: 0;
  }
  &.likeBtn{
    cursor: pointer;
  }
  .title {
    font-size: ${StyleGuide.font.size.paragraph};
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }
  .count {
    font-size: ${StyleGuide.font.size.small};
  }
`;

const InfoItem = styled.div`
  float: left;
  width: 33.3333%;
  margin-bottom: ${PxtoRem(20)};
  h3{
    padding-left: 1rem;
    margin-bottom: ${PxtoRem(5)};
    position: relative;
    &::before{
      display: block;
      content: "";
      position: absolute;
      width: ${PxtoRem(4)};
      height: 95%;
      background-color: ${StyleGuide.color.geyScale.scale7};
      left: 0;
      top: 0;
    }
  }
  @media only screen and (max-width: 767px) and (min-width: 320px) {
    width: 100%;
  }
`;

class DesignDetail extends Component {
  state = {
    activeMoreBtn: false
  };

  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token); // 디자인에 대한 정보
    this.props
      .UpdateDesignViewRequest(this.props.id)
      .then(this.props.GetDesignCountRequest(this.props.id)); // 디자인 조회수 업데이트 후 카운트 정보 가져옴
    if (this.props.token) {
      this.props.GetLikeDesignRequest(this.props.id, this.props.token);
    } // 로그인 한 경우 좋아요 했는지 여부 가져오기
  }

  componentWillUnmount() {
    this.props.DesignDetailResetRequest();
  }

  onActiveMoreBtn = e => {
    if (e.type === "click") {
      this.setState({
        activeMoreBtn: !this.state.activeMoreBtn
      });
    }
  };

  onCloseMoreBtn = e => {
    if (
      e.type === "blur" &&
      !this.MoreBtn._reactInternalFiber.child.stateNode.contains(
        e.relatedTarget
      )
    ) {
      this.setState({
        activeMoreBtn: false
      });
    }
    if (e.type === "click") {
      this.setState({
        activeMoreBtn: false
      });
    }
  };

  updateLike = () => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (this.props.like === true) {
      this.props
        .UnlikeDesignRequest(this.props.id, this.props.token)
        .then(data => {
          if (data.success === true) {
            this.props
              .GetLikeDesignRequest(this.props.id, this.props.token)
              .then(this.props.GetDesignCountRequest(this.props.id));
          }
        });
    } else {
      this.props
        .LikeDesignRequest(this.props.id, this.props.token)
        .then(data => {
          if (data.success === true) {
            this.props
              .GetLikeDesignRequest(this.props.id, this.props.token)
              .then(this.props.GetDesignCountRequest(this.props.id));
          }
        });
    }
  };

  deleteDesign = () => {
    const confirm = window.confirm("디자인을 삭제하시겠습니까?");
    if (confirm) {
      this.props
        .DeleteDesignRequest(this.props.id, this.props.token)
        .then(this.props.history.push("/design"));
    } else {
      return;
    }
  };

  render() {
    const designDetail = this.props.DesignDetail;
    const user = this.props.userInfo;
    const count = this.props.Count;

    const CountBox = () => {
      return (
        <CounterWrap>
          <CounterItem>
            <span className="title">조회수</span>
            <Icon name="unhide" />
            <p className="count">{count.view_count}</p>
          </CounterItem>
          {this.props.like === true ? (
            <CounterItem className="likeBtn" onClick={this.updateLike}>
              <span className="title">좋아요</span>
              <Icon name="heart" color="red" />
              <p className="count">{count.like_count}</p>
            </CounterItem>
          ) : (
            <CounterItem className="likeBtn" onClick={this.updateLike}>
              <span className="title">좋아요</span>
              <Icon name="heart outline" />
              <p className="count">{count.like_count}</p>
            </CounterItem>
          )}
          <CounterItem>
            <span className="title">파생</span>
            <Icon name="fork" />
            <p className="count">{designDetail.children_count["count(*)"]}</p>
          </CounterItem>
        </CounterWrap>
      );
    };
    const SubMenuCompo = () => {
      return (
        <SideMenu>
          <li>
            <Link
              to={`/designModify/${this.props.id}`}
              onClick={this.onCloseMoreBtn}
            >
              <button>수정</button>
            </Link>
          </li>
          <li style={{
              display: designDetail.is_team ? "block" : "none"
            }}>
            <button onClick={this.deleteDesign}>
              삭제
            </button>
          </li>
          <li>
            <button onClick={this.onCloseMoreBtn}>파생디자인 생성</button>
          </li>
          <li
            style={{
              display: designDetail.parent_design ? "block" : "none"
            }}
          >
            <button onClick={this.onCloseMoreBtn}>원본디자인 보기</button>
          </li>
        </SideMenu>
      );
    };
    return (
      <div>
        {designDetail.length !== 0 && (
          <Wrapper>
            {/* 새로운 디자인 header */}
            <HeaderWrap>
              <BgHeader img={designDetail.img} />
              <ContentBox>
                <HeadContainer padded={true}>
                  <Grid.Row>
                    <Grid.Column
                      className="designHeaderCol"
                      mobile={16}
                      tablet={6}
                      computer={6}
                    >
                      <ThumbnailImg img={designDetail.img} />
                    </Grid.Column>
                    <Grid.Column
                      tablet={1}
                      computer={1}
                      only="tablet computer"
                    />
                    <Grid.Column
                      className="designHeaderCol"
                      mobile={16}
                      tablet={9}
                      computer={9}
                    >
                      <DesignInfoCard>
                        <DesignTitle>{designDetail.title}</DesignTitle>
                        <DesignExplanation>
                          <p>
                            {designDetail.explanation
                              ? designDetail.explanation
                              : "설명없음"}
                          </p>
                        </DesignExplanation>
                      </DesignInfoCard>
                    </Grid.Column>
                  </Grid.Row>
                </HeadContainer>
                <DesignSubInfo>
                  <HeadContainer padded={true}>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <CreateDate>
                          <span>작성일: </span>
                          {designDetail.create_time.split("T")[0]}
                        </CreateDate>
                      </Grid.Column>
                      <Grid.Column width={8} textAlign="right">
                        <SideMenuBtn
                          tabIndex="1"
                          onBlur={this.onCloseMoreBtn}
                          ref={ref => (this.MoreBtn = ref)}
                        >
                          <button onClick={this.onActiveMoreBtn}>
                            <Icon name="ellipsis vertical" />
                          </button>
                          {this.state.activeMoreBtn ? <SubMenuCompo /> : null}
                        </SideMenuBtn>
                      </Grid.Column>
                    </Grid.Row>
                  </HeadContainer>
                </DesignSubInfo>
              </ContentBox>
              <DesignInfo>
                <ContentBox>
                  <HeadContainer padded={true}>
                    <Grid.Row>
                      <Grid.Column computer={6} only="computer">
                        <CountBox />
                      </Grid.Column>
                      <Grid.Column computer={1} only="computer" />
                      <Grid.Column mobile={16} tablet={16} computer={9}>
                        <DesignInfoCard>
                          <InfoItem>
                            <h3>작성자</h3>
                            <p>{designDetail.userName}</p>
                          </InfoItem>
                          <InfoItem>
                            <h3>카테고리</h3>
                            <p>
                              {designDetail.categoryName
                                ? designDetail.categoryName
                                : "전체"}
                            </p>
                          </InfoItem>
                          <InfoItem>
                            <h3>맴버</h3>
                            <p>{count.member_count}명</p>
                          </InfoItem>
                        </DesignInfoCard>
                        <HeadContainer padded={true}>
                          <Grid.Row>
                            <Grid.Column only="tablet mobile">
                              <CountBox />
                            </Grid.Column>
                          </Grid.Row>
                        </HeadContainer>
                      </Grid.Column>
                    </Grid.Row>
                  </HeadContainer>
                </ContentBox>
              </DesignInfo>
              <ContentBox>
                {/* <TabMenu>
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
                </TabMenu> */}
              </ContentBox>
            </HeaderWrap>
            {/* --------------- 하단 이슈/뷰/스텝 페이지 렌더링 ---------------  */}
            <ContentBox>
              <TabContainer>
                {designDetail.is_project == 1 ? (
                  <DesignDetailStepContainer id={this.props.id} />
                ) : (
                  <DesignDetailViewContainer
                    id={this.props.id}
                    history={this.props.history}
                  />
                )}
              </TabContainer>
            </ContentBox>
          </Wrapper>
        )}
      </div>
    );
  }
}

export default DesignDetail;

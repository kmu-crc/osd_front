import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
import MyDesignContainer from "containers/MyPage/MyDesignContainer";
import MemberDesignContainer from "containers/MyPage/MemberDesignContainer";
import MyGroupContainer from "containers/MyPage/MyGroupContainer";
import MyLikeDesignContainer from "containers/MyPage/MyLikeDesignContainer";
import MyLikeDesignerContainer from "containers/MyPage/MyLikeDesignerContainer";
import MyInvitedContainer from "containers/MyPage/MyInvitedContainer";
// import MyInvitingContainer from "containers/MyPage/MyInvitingContainer";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import profile from "source/thumbnail.png";

// css styling

const Wrapper = styled(Grid)`
  width: 100%;
  &.ui.grid {
    margin-top: 2rem;
    margin-bottom: 5rem;
    margin-left: 0rem;
    margin-right: 0rem;
  }
  &.ui.grid > .row,
  &.ui.grid > .row > .column {
    padding: 0;
  }
  & .edit {
    margin-bottom: 5px;
  }
  & .contentRow {
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  }
`;

const HeadContainer = styled(Grid.Column)`
  background-color: ${StyleGuide.color.geyScale.scale1};
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
`;

const ProfileSection = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 1rem;
  & .imgContainer {
    width: 100%;
    height: 140px;
  }
  & .imgContainer > div {
    width: 140px;
    height: 140px;
    margin: auto;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
    overflow: hidden;
    background-position: 50%;
    background-size: cover;
  }
  & .title {
    min-height: 40px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    padding: 10px 0;
  }
  & .category {
    min-height: 20px;
    text-align: center;
    color: #EB3324;
  }
`;

const CountSection = styled.div`
  padding: 1rem 2rem;
  & .list {
    height: 24px;
    width: 100%;
    font-size: 13px;
  }
  & .list span {
    float: right;
    font-size: 18px;
  }
`;

const InfoSection = styled.div`
  padding: 1rem;
  & .explanation {
    font-size: 13px;
  }
`;

const TabContainer = styled(Grid.Column)`
  background-color: white;
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  & .columns {
    padding: 0 20px;
  }
  & .ui.default.dropdown:not(.button) > .text,
  & .ui.dropdown:not(.button) > .default.text {
    color: inherit;
  }
`;

const Head = styled(Grid)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  &.ui.grid > .row {
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
  }
  & ul.mainOption {
    font-size: 1.2rem;
    font-weight: 500;
    & li {
      padding-right: 4rem;
    }
  }
  &.ui.grid > .row > ul.column {
    line-height: 38px;
    padding-left: 2rem;
  }
  & li {
    float: left;
    text-align: center;
    cursor: pointer;
    padding-right: 2rem;
  }
  & li:hover {
    font-weight: 500;
  }
  & li.onSelected {
    color: red;
    position: relative;
  }
  & li.onBold {
    font-weight: bold;
  }
`;

const MiniContentBox = styled.div`
  margin: 0 auto;
  padding: 20px 0;

  @media only screen and (max-width: 767px) and (min-width: 320px){
    padding: 0 20px;
    width: 320px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    width: 450px;
  }
  @media only screen and (min-width: 992px){
    width: 440px;
  }
  @media only screen and (max-width: 1919px) and (min-width: 1200px){
    width: 760px;
  }
  @media only screen and (min-width: 1920px){
    width: 1100px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    .ui.grid > .row{
      margin-left: 6.25% !important;
    }
  }
  @media only screen and (max-width: 1919px) and (min-width: 1200px){
    .ui.grid > .row{
      margin-left: 6.25% !important;
    }
  }
`;

class MyDetail extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
  }

  typeChange = e => {
    const target = e.target;
    let url = `/myPage${target.id}`;
    this.props.history.replace(url);
  };

  type2Change = e => {
    const target = e.target;
    let url = `/myPage/${this.props.type}${target.id}`;
    this.props.history.replace(url);
  }

  render() {
    let MyInfo = this.props.MyDetail;
    let count;
    if (MyInfo.count != null) {
      count = MyInfo.count;
    } else {
      count = {
        total_like: 0,
        total_design: 0,
        total_group: 0,
        total_view: 0
      };
    }

    const ContentPage = () => {
      if (this.props.MyDetail.length && this.props.MyDetail.length === 0) {
        return <div />;
      } else {
        return (
          <div>
            {this.props.type2 === "group"
            ? <MyGroupContainer token={this.props.token}/>
            : this.props.type2 === "teamDesign"
            ? <MemberDesignContainer token={this.props.token} uid={MyInfo.uid}/>
            : <MyDesignContainer token={this.props.token}/>
            }
          </div>
        );
      }
    };

    const LikePage = () => {
      if (this.props.MyDetail.length && this.props.MyDetail.length === 0) {
        return <div />;
      } else {
        return (
          <div>
            {this.props.type2 === "designer"
            ? <MyLikeDesignerContainer token={this.props.token}/>
            : <MyLikeDesignContainer token={this.props.token}/>
            }
          </div>
        )
      }
    }

    const JoinPage = () => {
      if (this.props.MyDetail.length && this.props.MyDetail.length === 0) {
        return <div />;
      } else {
        return (
          <MyInvitedContainer token={this.props.token} history={this.props.history}/>
        );
      }
    }

    const ContentOption = [
      { text: "내 디자인", value: "design", default: null },
      { text: "내가 속한 디자인", value: "teamDesign", default: "teamDesign" },
      { text: "내 그룹", value: "group", default: "group" }
    ];

    const LikeOption = [
      { text: "디자인", value: "design", default: null },
      { text: "디자이너", value: "designer", default: "designer" },
    ];


    return (
      <div>
        {MyInfo !== null && (
          <ContentBox>
            <Wrapper padded={false} columns={2}>
              <Grid.Row className="edit">
                <Link to="/myModify">
                  <Button>내 정보 수정</Button>
                </Link>
              </Grid.Row>
              {/* ------------------------ 좌측 프로필 섹션 -------------------------- */}
                <Grid.Row className="contentRow">
                  <HeadContainer mobile={16} tablet={16} computer={5} largeScreen={4}>
                    <ProfileSection>
                      <div className="imgContainer">
                        <div style={MyInfo.profileImg
                         ? {backgroundImage: `url(${MyInfo.profileImg.m_img})`}
                         : {backgroundImage: `url(${profile})`}}>
                        </div>
                      </div>
                      <div className="title">
                        <h3>{MyInfo.nick_name}</h3>
                      </div>
                      <div className="category">{MyInfo.categoryName? MyInfo.categoryName : "전체"}</div>
                      <InfoSection>
                        <h4>소개</h4>
                        <p className="explanation">{MyInfo.about_me}</p>
                      </InfoSection>
                    </ProfileSection>
                    <CountSection>
                      <div className="list">
                        <Icon name="signup" color="grey" size="tiny"/>
                        등록한 디자인
                        <span>{count.total_design}</span>
                      </div>
                      <div className="list">
                        <Icon name="window restore" color="grey" size="tiny"/>
                        등록한 그룹
                        <span>{count.total_group}</span>
                      </div>
                      <div className="list">
                        <Icon name="user" color="grey" size="tiny"/>
                        내 조회수
                        <span>{count.total_view}</span>
                      </div>
                      <div className="list">
                        <Icon name="heart" color="grey" size="tiny"/>
                        내가 받은 좋아요
                        <span>{count.total_like}</span>
                      </div>
                    </CountSection>
                  </HeadContainer>
                  {/* ------------------------ 우측 카드 렌더링 섹션 -------------------------- */}
                  <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
                    <Head padded={true}>
                      <Grid.Row>
                        <Grid.Column as="ul" className="mainOption">
                          <li id="/content"
                              className={this.props.type === "content" || this.props.type === null? "onSelected" : ""}
                              onClick={this.typeChange}>
                            내 컨텐츠
                          </li>
                          <li id="/join"
                              className={this.props.type === "join" ? "onSelected" : ""}
                              onClick={this.typeChange}>
                            내가 받은 초대
                          </li>
                          <li id="/like"
                              className={this.props.type === "like" ? "onSelected" : ""}
                              onClick={this.typeChange}>
                            내 좋아요
                          </li>
                          <div className="clear" />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column as="ul">
                          {this.props.type === "like"
                          ? LikeOption.map((item, i) => (
                            <li key={i} id={`/${item.value}`} className={this.props.type2 === item.value? "onBold" : this.props.type2 === item.default? "onBold" : ""} onClick={this.type2Change}>
                            {item.text}
                            </li>
                          ))
                          : this.props.type === "join"
                          ? <div></div>
                          : ContentOption.map((item, i) => (
                            <li key={i} id={`/${item.value}`} className={this.props.type2 === item.value? "onBold" : this.props.type2 === item.default? "onBold" : ""} onClick={this.type2Change}>
                            {item.text}
                            </li>
                          ))
                          }
                        </Grid.Column>
                      </Grid.Row>
                    </Head>
                    <MiniContentBox>
                      <Route path="/myPage/:type?/:type2?"
                             component={this.props.type === "join" ? JoinPage
                                        : this.props.type === "like" ? LikePage
                                        : ContentPage}
                      />
                    </MiniContentBox>
                  </TabContainer>
                </Grid.Row>
            </Wrapper>
          </ContentBox>
        )}
      </div>
    );
  }
}

export default MyDetail;

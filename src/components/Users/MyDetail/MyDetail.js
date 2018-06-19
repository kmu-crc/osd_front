import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import MyDesignContainer from "containers/MyPage/MyDesignContainer";
import MyGroupContainer from "containers/MyPage/MyGroupContainer";
import MyLikeDesignContainer from "containers/MyPage/MyLikeDesignContainer";
import MyLikeDesignerContainer from "containers/MyPage/MyLikeDesignerContainer";
import ContentBox from "components/Commons/ContentBox";
import ModifyMyDetailContainer from "containers/MyPage/ModifyMyDetailContainer/ModifyMyDetailContainer";

// css styling
const Container = styled.div`
  width: 95%;
  margin: auto;
`;

const Wrapper = styled(Grid)`
  width: 100%;
  &.ui.grid {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0rem;
    margin-right: 0rem;
  }
  &.ui.grid > .row,
  &.ui.grid > .row > .column {
    padding: 0;
  }
  & .edit {
    height: 30px;
    margin-bottom: 5px;
  }
  & .edit button {
    padding: 7px 14px;
    border-radius: 3px;
  }
  & .contentRow {
    border-radius: 3px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

const HeadContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.25); */
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
  border-radius: 0 3px 3px 0;
  & .columns {
    padding: 0 20px;
  }
  & .ui.default.dropdown:not(.button) > .text,
  .ui.dropdown:not(.button) > .default.text {
    color: inherit;
  }
`;

const Head = styled(Grid)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  &.ui.grid > .row {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  & ul {
    line-height: 38px;
  }
  & li {
    float: left;
    padding: 0 30px;
    text-align: center;
    cursor: pointer;
  }
  & li:hover {
    font-weight: 500;
  }
  & li.onSelected {
    color: red;
    position: relative;
  }
`;

const MyContentBox = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 767px) and (min-width: 320px) {
    width: 470px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px) {
    width: 450px;
  }
  @media only screen and (min-width: 992px) {
    width: 450px;
  }
  @media only screen and (min-width: 1200px){
    width: 650px
  }
`;

class MyDetail extends Component {
  state = {
    editMode: false
  }

  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
  }

  typeChange = e => {
    let url = "/myPage" + e.target.id;
    this.props.history.replace(url, { token: this.props.token });
  };

  setEditMyDetail = () => {
    this.setState({
      editMode: !this.state.editMode
    });
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

    const ContainerPage = () => {
      if (this.props.MyDetail.length && this.props.MyDetail.length === 0) {
        return <div />;
      } else {
        return <MyDesignContainer token={this.props.token} />;
      }
    };

    return (
      <div>
        {MyInfo !== null && (
          <Container>
            <Wrapper padded={false} columns={2}>
              <Grid.Row className="edit">
                <button onClick={this.setEditMyDetail}>내 정보 수정</button>
              </Grid.Row>
              {/* ------------------------ 좌측 프로필 섹션 -------------------------- */}
              {this.state.editMode
              ? <ModifyMyDetailContainer {...this.props}/>
              :
                <Grid.Row className="contentRow">
                  <HeadContainer mobile={16} tablet={16} computer={5} largeScreen={4}>
                    <ProfileSection>
                      <div className="imgContainer">
                        <div>
                          {MyInfo.thumbnailUrl ? (
                            <img src={MyInfo.thumbnailUrl} alt="프로필 이미지" />
                          ) : (
                            "등록된 이미지 없음"
                          )}
                        </div>
                      </div>
                      <div className="title">
                        <h3>{MyInfo.nick_name}</h3>
                      </div>
                      <div className="category">{MyInfo.categoryName}</div>
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
                    <InfoSection>
                      <h4>소개</h4>
                      <p className="explanation">{MyInfo.explanation}</p>
                    </InfoSection>
                  </HeadContainer>
                  {/* ------------------------ 우측 카드 렌더링 섹션 -------------------------- */}
                  <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
                    <Head padded={true}>
                      <Grid.Row>
                        <Grid.Column as="ul">
                          <li id="/design" 
                              className={this.props.type === "design" || this.props.type === null? "onSelected" : ""}
                              onClick={this.typeChange}>
                            내 디자인
                          </li>
                          <li id="/group" 
                              className={this.props.type === "group" ? "onSelected" : ""}
                              onClick={this.typeChange}>
                            내 그룹
                          </li>
                          <li id="/likeDesign"
                              className={this.props.type === "likeDesign" ? "onSelected" : ""}
                              onClick={this.typeChange}>
                            관심 디자인
                          </li>
                          <li id="/likeDesigner"
                              className={this.props.type === "likeDesigner" ? "onSelected" : ""}
                              onClick={this.typeChange}>
                            관심 디자이너
                          </li>
                          <div className="clear" />
                        </Grid.Column>
                      </Grid.Row>
                    </Head>
                    <MyContentBox>
                      <Route path="/myPage/:type?"
                            component={this.props.type === "likeDesigner" ? MyLikeDesignerContainer
                                        : this.props.type === "likeDesign" ? MyLikeDesignContainer
                                        : this.props.type === "group" ? MyGroupContainer
                                        : ContainerPage}
                      />
                    </MyContentBox>
                  </TabContainer>
                </Grid.Row>
              }
            </Wrapper>
          </Container>
        )}
      </div>
    );
  }
}

export default MyDetail;

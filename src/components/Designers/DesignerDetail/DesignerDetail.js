import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import MyDesignInDesignerContainer from "containers/Designer/MyDesignInDesignerContainer";
import DesignInDesignerContainer from "containers/Designer/DesignInDesignerContainer";
import LikeInDesignerContainer from "containers/Designer/LikeInDesignerContainer";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import profile from "source/thumbnail.png";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";

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
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  background-color: ${StyleGuide.color.geyScale.scale1};
`;

const ProfileSection = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.15);
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
    border: 1px solid rgba(0,0,0,0.25);
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
  & .btnContainer {
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
    & button {
      padding: 0.75em 1.6em;
      border: 0;
      &:focus {
        outline: 0;
      }
    }
    & .likeBtn {
      background: ${StyleGuide.color.sub.bule.light};
      &:hover {
        border: 0;
        background: ${StyleGuide.color.sub.bule.basic};
      }
    }
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
  & .ui.default.dropdown:not(.button)>.text, .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
`;

const Head = styled(Grid)`
  border-bottom: 1px solid rgba(0,0,0,0.25);
  &.ui.grid > .row {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  & ul {
    line-height: 38px;
  }
  & li {
    float: left;
    width: 120px;
    text-align: center;
    cursor: pointer;
    font-weight: normal;
  }
  & li:hover {
    font-weight: 500;
  }
  & li.onSelected {
    color: red;
    position: relative;
    font-weight: bold;
  }
`;

const MiniContentBox = styled.div`
  margin: 0 auto;
  padding-top: 20px;
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


class DesignerDetail extends Component {
  componentWillMount() {
    this.props.GetDesignerDetailRequest(this.props.id); // 디자이너 디테일 정보
    this.props.GetDesignerCountRequest(this.props.id); // 디자이너 count 정보
    if (this.props.token) {
      this.props.GetLikeDesignerRequest(this.props.id, this.props.token); // token 값 있을때만 뜨는 좋아요 정보
    }
  }

  typeChange = (e) => {
    let url = "/designerDetail/"+this.props.id+"/"+e.target.id;
    this.props.history.replace(url);
  }

  updateLike = () => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (this.props.like === true) {
      this.props.UnlikeDesignerRequest(this.props.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.GetLikeDesignerRequest(this.props.id, this.props.token)
          .then(this.props.GetDesignerCountRequest(this.props.id))
        }
      });
    } else {
      this.props.LikeDesignerRequest(this.props.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.GetLikeDesignerRequest(this.props.id, this.props.token)
          .then(this.props.GetDesignerCountRequest(this.props.id))
        }
      });
    }
  }

  render(){
    const designerDetail = this.props.DesignerDetail;
    const count = this.props.Count;
    // console.log(designerDetail);

    return(
      <div>
        {designerDetail.length !== 0 &&
          <ContentBox>
            <Wrapper padded={false} columns={2}>
              <Grid.Row className="edit">
              { (this.props.userInfo && (this.props.userInfo.uid === designerDetail.uid))?
                <Link to="/myModify"><Button>내 정보 수정</Button></Link>
                : <div></div>
              }
              </Grid.Row>
              <Grid.Row className="contentRow">
                <HeadContainer mobile={16} tablet={16} computer={5} largeScreen={4}>
                  <ProfileSection>
                    <div className="imgContainer">
                      <div style={designerDetail.thumbnailUrl
                         ? {backgroundImage: `url(${designerDetail.thumbnailUrl.m_img})`}
                         : {backgroundImage: `url(${profile})`}}>
                      </div>
                    </div>
                    <div className="title">
                      <h3><TextFormat txt={designerDetail.nick_name}/></h3>
                    </div>
                    <div className="category">
                      <TextFormat txt={designerDetail.categoryName? designerDetail.categoryName : "전체"}/>
                    </div>
                    <InfoSection>
                      <h4>소개</h4>
                      <p className="explanation">
                      <TextFormat lines={3} txt={designerDetail.about_me}/></p>
                    </InfoSection>
                    <div className="btnContainer">
                      {this.props.like === true
                      ? <Button color="Primary" onClick={this.updateLike}>좋아요 취소</Button>
                      : <Button className="likeBtn" onClick={this.updateLike}>좋아요</Button>
                      }
                      <Link to={`/message/${this.props.id}/${designerDetail.nick_name}`}><Button color="Solid">메시지보내기</Button></Link>
                    </div>
                  </ProfileSection>
                  <CountSection>
                    <div className="list">
                      <Icon name="signup" color="grey" size="tiny"></Icon> 등록한 디자인
                      <span>{NumberFormat(count.total_design)}</span>
                    </div>
                    <div className="list">
                      <Icon name="heart" color="grey" size="tiny"></Icon> 받은 좋아요
                      <span>{NumberFormat(count.total_like)}</span>
                    </div>
                    <div className="list">
                      <Icon name="user" color="grey" size="tiny"></Icon> 받은 조회수
                      <span>{NumberFormat(count.total_view)}</span>
                    </div>
                  </CountSection>
                </HeadContainer>
                <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
                  <Head devided="vertically" padded={true}>
                    <Grid.Row>
                      <Grid.Column as="ul">
                        <li id="my"
                            className={this.props.type === "my" || this.props.type === null? "onSelected" : ""}
                            onClick={this.typeChange}>등록한 디자인</li>
                        <li id="design"
                            className={this.props.type === "design"? "onSelected" : ""}
                            onClick={this.typeChange}>참여 디자인</li>
                        <li id="like"
                            className={this.props.type === "like"? "onSelected" : ""}
                            onClick={this.typeChange}>관심 디자인</li>
                        <div className="clear"></div>
                      </Grid.Column>
                    </Grid.Row>
                  </Head>
                  <MiniContentBox>
                    <Route path="/designerDetail/:id/:type?"
                           component={this.props.type === "like"
                                      ? LikeInDesignerContainer
                                      : this.props.type === "design"
                                      ? DesignInDesignerContainer
                                      : MyDesignInDesignerContainer}/>
                  </MiniContentBox>
                </TabContainer>
              </Grid.Row>
            </Wrapper>
          </ContentBox>
        }
      </div>
    );
  }
}

export default DesignerDetail;

import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import DesignInDesignerContainer from "containers/Designer/DesignInDesignerContainer";
import LikeInDesignerContainer from "containers/Designer/LikeInDesignerContainer";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";

// css styling

const Wrapper = styled(Grid)`
  width: 100%;
  &.ui.grid {
    margin-top: 1rem;
    margin-bottom: 3rem;
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
    border-radius: 3px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  }
`;

const HeadContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  margin-botto: 5px;
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
  }
  & .imgContainer > div img {
    width: auto;
    height: 100%;
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
    width: 100px;
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

const MiniContentBox = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  @media only screen and (max-width: 500px) and (min-width: 320px){
    width: 100%;
  }
  @media only screen and (max-width: 767px) and (min-width: 501px){
    width: 400px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    width: 700px;
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    .ui.grid > .row{
      margin-left: 6.25% !important;
    }
  }
  @media only screen and (min-width: 992px){
    width: 420px;
  }
  @media only screen and (max-width: 1399px) and (min-width: 1200px){
    width: 825px;
  }
  @media only screen and (max-width: 1699px) and (min-width: 1400px){
    width: 825px;
  }
  @media only screen and (max-width: 1919px) and (min-width: 1700px){
    width: 825px;
  }
  @media only screen and (min-width: 1920px){
    width: 825px;
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
                      <div>{designerDetail.thumbnailUrl? <img src={designerDetail.thumbnailUrl.s_img} alt="프로필 이미지"/> : "등록된 이미지 없음"}</div>
                    </div>
                    <div className="title">
                      <h3>{designerDetail.nick_name}</h3>
                    </div>
                    <div className="category">
                      {designerDetail.categoryName? designerDetail.categoryName : "전체"}
                    </div>
                    <div className="btnContainer">
                      {this.props.like === true 
                      ? <Button className="red" onClick={this.updateLike}>좋아요 취소</Button>
                      : <Button className="red" onClick={this.updateLike}>좋아요</Button>
                      }
                      <Link to="/message"><Button>메시지보내기</Button></Link>
                    </div>
                  </ProfileSection>
                  <CountSection>
                    <div className="list">
                      <Icon name="signup" color="grey" size="tiny"></Icon> 등록한 디자인
                      <span>{count.total_design}</span>
                    </div>
                    <div className="list">
                      <Icon name="heart" color="grey" size="tiny"></Icon> 좋아요
                      <span>{count.total_like}</span>
                    </div>
                    <div className="list">
                      <Icon name="user" color="grey" size="tiny"></Icon> 조회수
                      <span>{count.total_view}</span>
                    </div>
                  </CountSection>
                  <InfoSection>
                    <h4>소개</h4>
                    <p className="explanation">{designerDetail.about_me}</p>
                  </InfoSection>
                </HeadContainer>
                <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
                  <Head devided="vertically" padded={true} columns={2}>
                    <Grid.Row>
                      <Grid.Column as="ul">
                        <li id="design"
                            className={this.props.type === "design" || this.props.type === null? "onSelected" : ""}
                            onClick={this.typeChange}>등록 디자인</li>
                        <li id="like"
                            className={this.props.type === "like"? "onSelected" : ""}
                            onClick={this.typeChange}>관심 디자인</li>
                        <div className="clear"></div>
                      </Grid.Column>
                    </Grid.Row>
                  </Head>
                  <MiniContentBox>
                    <Route path="/designerDetail/:id/:type?"
                           component={this.props.type === "like"? LikeInDesignerContainer : DesignInDesignerContainer}/>
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

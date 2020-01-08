import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import profile from "source/thumbnail.png";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";
import mainSlide from "source/mainSlide.jpg";

// css styling
const Wrapper = styled(ContentBox)`
  margin-top: -85px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`;
const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;
const Title = styled.div`
  width: 100%;
  color: white;
  position: absolute;
  text-align: center;
  top: 40%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  h1 {
    color: ${StyleGuide.color.geyScale.scale0};
    font-size: ${StyleGuide.font.size.heading2};
    font-weight: bold;
  }
`;
const ProfileSection = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.15);
  padding: 1rem;
  & .imgContainer {
    margin-left: auto;
    margin-right: auto;
    width: max-content;
  }
  & .imgContainer .profile {
    width: 200px;
    height: 200px;
    margin: auto;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.25);
    background-image: url(${props => props.img});
    overflow: hidden;
    background-position: 50%;
    background-size: cover;
  }
  & .title {
    margin-left: auto;
    margin-right: auto;
    width: max-content;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
  }
  & .category {
    font-size: 20px;
    min-height: 20px;
    text-align: center;
    color: #EB3324;
  }
  & .buttons{
    padding: 0px;
    position: absolute;
    margin-top: -195px;
    margin-left: 215px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const CountSection = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 2rem;
  & .list {
    height: 24px;
    width: max-content;
    margin: 0 10px;
  }
`;
const Section = styled.div`
  margin-left: 20px;
  padding: 1rem;
  & .text{
    font-size: 16px;
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
const TagItem = styled.div``;
const BoardItem = styled.div``;
const CommentItem = styled.div``;

class DesignerDetail extends Component {
  componentWillMount() {
    this.props.GetDesignerDetailRequest(this.props.id); // 디자이너 디테일 정보
    this.props.GetDesignerCountRequest(this.props.id); // 디자이너 count 정보
    if (this.props.token) {
      this.props.GetLikeDesignerRequest(this.props.id, this.props.token); // token 값 있을때만 뜨는 좋아요 정보
    }
  }

  typeChange = (e) => {
    let url = "/designerDetail/" + this.props.id + "/" + e.target.id;
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

  render() {
    const { DesignerDetail, Count } = this.props;

    if (DesignerDetail == null) return <div>No data.</div>

    return (<React.Fragment>
      <ImgWrapper>
        <Title><h1>디자이너 정보</h1></Title>
      </ImgWrapper>

      <Wrapper>
        <ContentBox>
          <Grid.Row>
            <TabContainer mobile={16} tablet={16} computer={16} largeScreen={16}>
              <ProfileSection img={DesignerDetail.thumbnailUrl ? DesignerDetail.thumbnailUrl.m_img : profile}>
                <div className="imgContainer">
                  <div className="profile" />
                  <div className="buttons" >
                    <Link to={`/message/${this.props.id}/${DesignerDetail.nick_name}`}><Icon name="envelope" color="blue" size="big" title="해당 디자이너에게 메시지를 보냅니다." />메시지</Link>
                    <div>
                      <Icon name="heart" color={this.props.like ? "red" : "grey"} onClick={this.updateLike} size="big" title="관심있는 디자이너로 등록됩니다." />좋아요
                  </div>
                  </div>
                </div>

                <div className="title">
                  <div>
                    <h1><TextFormat txt={DesignerDetail.nick_name} /></h1>
                  </div>
                  <div style={{ marginLeft: "7px" }}>
                    {(this.props.userInfo && (this.props.userInfo.uid === DesignerDetail.uid)) ? <Link to="/myModify"><Icon name="edit" color="grey" size="small" title="내 정보 수정" /></Link> : null}
                  </div>
                </div>

                <div className="category">
                  <TextFormat txt={DesignerDetail.categoryName ? DesignerDetail.categoryName : "전체"} />
                </div>

                <CountSection>
                  <div className="list">
                    <Icon name="signup" color="grey" size="big" title="등록한 디자인" />
                    <span>{NumberFormat(Count.total_design || 0)}</span>
                  </div>
                  <div className="list">
                    <Icon name="heart" color="grey" size="big" title="받은 좋아요" />
                    <span>{NumberFormat(Count.total_like || 0)}</span>
                  </div>
                  <div className="list">
                    <Icon name="user" color="grey" size="big" title="조회수" />
                    <span>{NumberFormat(Count.total_view || 0)}</span>
                  </div>
                </CountSection>

              </ProfileSection>
            </TabContainer>
          </Grid.Row>
        </ContentBox>

        <div style={{ marginTop: "10px" }} />

        <ContentBox>
          <Grid.Row>
            <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
              <Section>
                <h4>평가</h4>
                <div className="text"><TextFormat lines={3} txt={DesignerDetail.rate || "평가"} /></div>
                <div className="text">{!DesignerDetail.comment ? "" : DesignerDetail.comment.map(item => <CommentItem key={item.uid}>{item.value}</CommentItem>)}</div>
              </Section>

            </TabContainer>
          </Grid.Row>
        </ContentBox>

        <div style={{ marginTop: "10px" }} />

        <ContentBox>
          <Grid.Row>
            <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
              <Section>
                <h4>소개</h4>
                <div className="text">
                  <TextFormat lines={3} txt={DesignerDetail.about_me} /></div>
              </Section>
              <Section>
                <h4>거주지역</h4>
                <div className="text">
                  <TextFormat lines={3} txt={DesignerDetail.location || "*거주지역*"} /></div>
              </Section>
              <Section>
                <h4>전문분야</h4>
                <div className="text">
                  <TextFormat lines={3} txt={DesignerDetail.categoryName || "*카테고리*"} /></div>
                <div className="text">
                  {!DesignerDetail.tag ? "" : DesignerDetail.tag.map(item => <TagItem key={item.uid}>{item.value}</TagItem>)}</div>
              </Section>
              <Section>
                <h4>디자인경험</h4>
                <div className="text">
                  <TextFormat lines={3} txt={DesignerDetail.experience || "*경험*"} /></div>
              </Section>
              <Section>
                <h4>디자인 상품</h4>
                <div className="text">
                  <TextFormat lines={3} txt={DesignerDetail.product || "*상품*"} /></div>
              </Section>

              <Section>
                <h4>디자인 의뢰</h4>
                <div className="text">
                  <Link to={`/requestToDesigner/${DesignerDetail.uid}`}><Button>의뢰하기</Button></Link>
                </div>
              </Section>

              <Section>
                <h4>디자이너 게시판</h4>
                <div className="text">{!DesignerDetail.board ? "" : DesignerDetail.board.map(item => <BoardItem key={item.uid}>{item.value}</BoardItem>)}</div>
              </Section>

            </TabContainer>
          </Grid.Row >
        </ContentBox >

      </Wrapper>

    </React.Fragment >);
  }
}

export default DesignerDetail;

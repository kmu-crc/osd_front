import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import profile from "source/thumbnail.png";
import TextFormat from "modules/TextFormat";
import RequestCommentContainer from "./RequestDetailCommentContainer";
import NumberFormat from "modules/NumberFormat";
import DateFormat from "modules/DateFormat";

// CSS STYLING
const Wrapper = styled(ContentBox)`
  margin-top: 35px;
  margin-bottom: 100px;
  position: relative;
  z-index: 3;
`;
const ProfileSection = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.15);
  padding: 1rem;
  display: flex;
  flex-direction: row;
  & .profile {
    width: 35px;
    height: 35px;
    margin: auto;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.25);
    overflow: hidden;
    background-size: cover;
    background-position: 50%;
    background-image: url(${props => props.img});
  }
  & .title {
    margin-left: auto;
    margin-right: auto;
    width: max-content;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
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

class Viewer extends Component {
  render() {
    if (!this.props.content) return <div>글 내용이 없습니다.</div>;
    return (<div>
      <h4>내용</h4>
      {this.props.content}
    </div>);
  }
};
class Detail extends Component {
  render() {
    console.log("props:", this.props);
    const { Detail } = this.props;

    if (Detail == null) return <div>No data.</div>

    const Navigation = () => {
      return <ContentBox>
        <Grid.Row>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to={`/request`}><Button>목록</Button></Link>
          </div>
        </Grid.Row>
      </ContentBox>
    };
    const Contents = () => {
      return <ContentBox>
        <Grid.Row>
          <TabContainer mobile={16} tablet={16} computer={16} largeScreen={16}>
            {/* header */}
            <div style={{ borderBottom: "1px dashed gray", padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div>{Detail.title || "제목"} | {Detail.categoryName || "분야"}</div>
              <div>{DateFormat(Detail.update_time) || "업데이트시간"}</div>
            </div>
            <ProfileSection img={Detail.thumbnailUrl ? Detail.thumbnailUrl.m_img : profile}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="profile" />
                <div className="title"><TextFormat txt={Detail.nick_name || "작성자"} /></div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <div><Icon className="eye" />&nbsp;{NumberFormat(Detail.view || 0)}</div>
                <div><Icon className="like" />&nbsp;{NumberFormat(Detail.likes || 0)}</div>
              </div>
            </ProfileSection>

            {/* body */}
            <Section>
              <Viewer content={Detail.content} />
            </Section>

          </TabContainer>
        </Grid.Row>
      </ContentBox>
    };

    return (<React.Fragment>
      <Wrapper>
        <Navigation />
        <div style={{ marginTop: "10px" }} />
        <Contents />
        <ContentBox>
          <Grid.Row>
            <TabContainer>
              <Section>
                <h4>댓글</h4>
                <RequestCommentContainer id={this.props.id} />
              </Section>
            </TabContainer>
          </Grid.Row>
        </ContentBox>
        <div style={{ marginTop: "10px" }} />
        <Navigation />
      </Wrapper>
    </React.Fragment >);
  }
}

export default Detail;


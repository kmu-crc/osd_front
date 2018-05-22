import React, { Component } from "react";
import { NavLink, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import DesignInDesignerContainer from "containers/Designer/DesignInDesignerContainer";
import LikeInDesignerContainer from "containers/Designer/LikeInDesignerContainer";

// css styling

const Container = styled.div`
  width: 95%;
  margin: auto;
  min-width: 660px;
`;

const Wrapper = styled(Grid)`
  width: 100%;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
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
`;

const HeadContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
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
  & .btnContainer {
    height: 60px;
    text-align: center;
    line-height: 60px;
    & button {
      margin-left: 10px;
      margin-right: 10px;
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

const ContentBox = styled.div`
  width: 100%;
  padding: 0 3rem;
`;


class DesignerDetail extends Component {
  state = {
    id: this.props.id,
  };

  componentWillMount() {
    this.props.GetDesignerDetailRequest(this.props.id);
  }

  typeChange = (e) => {
    const target = document.getElementsByClassName("onSelected")[0];
    target.setAttribute("class", "");
    e.target.setAttribute("class", "onSelected");
    let url = "/designerDetail/"+this.props.id+"/"+e.target.id;
    this.props.history.replace(url);
  }

  render(){
    let designerDetail = this.props.DesignerDetail;
    let count;
    if (designerDetail.count != null) {
      count = designerDetail.count;
    } else {
      count = {
        total_like: 0,
        total_design: 0,
        total_group: 0,
        total_view: 0
      };
    }

    return(
      <div>
        {designerDetail.length !== 0 &&
          <Container>
            <Wrapper padded={false} columns={2}>
              <Grid.Row className="edit">
              { (this.props.userInfo && (this.props.userInfo.uid === designerDetail.uid))? 
                <button>내 정보 수정</button> 
                : <div></div>
              }
              </Grid.Row>
              <Grid.Row>
                <HeadContainer width={4}>
                  <ProfileSection>
                    <div className="imgContainer">
                      <div>{designerDetail.thumbnailUrl? designerDetail.thumbnailUrl : "등록된 이미지 없음"}</div>
                    </div>
                    <div className="title">
                      <h3>{designerDetail.nick_name}</h3>
                    </div>
                    <div className="category">
                      {designerDetail.categoryName}
                    </div>
                    <div className="btnContainer">
                      <button className="red">좋아요</button>
                      <button className="red">메시지보내기</button>
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
                    <p className="explanation">{designerDetail.explanation}</p>
                  </InfoSection>
                </HeadContainer>
                <TabContainer width={12}>
                  <Head devided="vertically" padded={true} columns={2}>
                    <Grid.Row>
                      <Grid.Column as="ul">
                        <li id="design" className="onSelected" onClick={this.typeChange}>디자인</li>
                        <li id="like" onClick={this.typeChange}>좋아요한 디자인</li>
                        <div className="clear"></div>
                      </Grid.Column>
                    </Grid.Row>
                  </Head>
                  <ContentBox>
                    <Route path="/designerDetail/:id/:type?" 
                           component={this.props.type === "like"? LikeInDesignerContainer : DesignInDesignerContainer}/>
                  </ContentBox>
                </TabContainer>
              </Grid.Row>
            </Wrapper>
          </Container>
        }
      </div>
    );
  }
}

export default DesignerDetail;
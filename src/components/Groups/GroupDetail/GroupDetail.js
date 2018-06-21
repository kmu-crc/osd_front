import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import ModifyGroupInfoContainer from "containers/Groups/ModifyGroupInfoContainer";
import JoinGroupContainer from "containers/Groups/JoinGroupContainer";
import ModifyJoinList from "components/Groups/ModifyJoinList";
import CurrentJoinList from "components/Groups/CurrentJoinList/CurrentJoinList";
import Button from "components/Commons/Button";

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
  & button.edit {
    padding: 7px 14px;
    border-radius: 3px;
  }
  & .contentRow {
    box-shadow: 3px 3px 3px rgba(0,0,0,0.3);
  }
  & .btnContainer {
    height: 35px;
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
  & .imgContainer > div img {
    width: auto;
    height: 100%
  }
  & .title {
    min-height: 80px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    padding: 10px 0;
  }
  & .issueContainer {
    min-height: 30px;
    line-height: 30px;
    font-weight: bold;
  }
  & .btnContainer {
    text-align: center;
    & button {
      margin: .5rem 1rem;
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


class GroupDetail extends Component {
  state = {
    editGroupInfoMode: false,
    editMode: false
  };

  componentWillMount() {
    const url = `/groupDetail/${this.props.id}`;
    this.props.history.replace(url);
    // 어떤 페이지를 마지막으로 새로고침 했더라도 새로고침 후에는 기본 설정으로 돌아감
  }

  componentDidMount() {
    console.log("work");
    this.props.GetGroupDetailRequest(this.props.id); // 그룹에 대한 디테일 정보
    if (this.props.token) {
      this.props.GetLikeGroupRequest(this.props.id, this.props.token); // token 값 있을때만 뜨는 좋아요 정보
    }
  }

  setEditGroupInfoMode = () => {
    this.setState({
      editGroupInfoMode: !this.state.editGroupInfoMode
    });
  }

  setEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  updateLike = () => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    }
    if (this.props.like === true) {
      this.props.UnlikeGroupRequest(this.props.id, this.props.token)
      .then(data => {
        console.log(data);
        if (data.success === true) {
          this.props.GetLikeGroupRequest(this.props.id, this.props.token);
        }
      });
    } else {
      this.props.LikeGroupRequest(this.props.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.GetLikeGroupRequest(this.props.id, this.props.token);
        } 
      });
    }
  }

  render(){
    let groupDetail = this.props.GroupDetail;
    let count;
    if (groupDetail.count != null) {
      count = groupDetail.count;
    } else {
      count = {
        member: 0,
        like: 0,
        design: 0,
        group: 0
      };
    }

    return(
      <div>
        {groupDetail.length !== 0 &&
          <Container>
            <Wrapper padded={false} columns={2}>
            { this.props.userInfo && (this.props.userInfo.uid === groupDetail.user_id) && 
              <Grid.Row>
                { !this.state.editGroupInfoMode 
                ? <div className="btnContainer">
                    <Button className="edit" onClick={this.setEditGroupInfoMode}>
                      정보 수정
                    </Button>
                    <Button className="edit" onClick={this.setEditMode}>
                      가입 관리
                    </Button>
                  </div>
                : <div className="btnContainer"></div>
                }
              </Grid.Row>
            }
              {/* ------------------------ 좌측 프로필 섹션 -------------------------- */}
            {this.state.editGroupInfoMode 
            ? <ModifyGroupInfoContainer {...this.props}/> 
            : 
              <Grid.Row className="contentRow">
                <HeadContainer mobile={16} tablet={4} computer={4}>
                  <ProfileSection>
                    <div className="imgContainer">
                      <div>{groupDetail.img? <img src= {groupDetail.img.m_img} alt="그룹 이미지"/> : "등록된 이미지 없음"}</div>
                    </div>
                    <div className="title">
                      <h3>{groupDetail.title}</h3>
                    </div>
                    <div className="issueContainer">
                      {groupDetail.issue == null? "공지가 없습니다" : groupDetail.issue.title}
                    </div>
                    <div className="btnContainer">
                      {this.props.like === true 
                      ? <Button className="red" onClick={this.updateLike}>좋아요 취소</Button>
                      : <Button className="red" onClick={this.updateLike}>좋아요</Button>
                      }
                      <JoinGroupContainer />
                    </div>
                  </ProfileSection>
                  <CountSection>
                    <div className="list">
                      <Icon name="signup" color="grey" size="tiny"></Icon> 디자인 수
                      <span>{count.design}</span>
                    </div>
                    <div className="list">
                      <Icon name="window restore" color="grey" size="tiny"></Icon> 그룹 수
                      <span>{count.group}</span>
                    </div>
                    <div className="list">
                      <Icon name="user" color="grey" size="tiny"></Icon> 그룹장
                      <span>{groupDetail.userName}</span>
                    </div>
                    <div className="list">
                      <Icon name="heart" color="grey" size="tiny"></Icon> 좋아요
                      <span>{count.like}</span>
                    </div>
                  </CountSection>
                  <InfoSection>
                    <h4>소개</h4>
                    <p className="explanation">{groupDetail.explanation}</p>
                  </InfoSection>
                </HeadContainer>

                {/* ------------------------ 우측 카드 렌더링 섹션 -------------------------- */}
                {this.state.editMode
                ? <ModifyJoinList {...this.props}/>
                : <CurrentJoinList {...this.props}/>
                }
              </Grid.Row>
            }   
            </Wrapper>
          </Container>
        }
      </div>
    );
  }
}

export default GroupDetail;

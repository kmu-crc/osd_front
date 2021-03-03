import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import ModifyGroupInfoContainer from "containers/Groups/ModifyGroupInfoContainer";
import JoinGroupContainer from "containers/Groups/JoinGroupContainer";
import ModifyJoinList from "components/Groups/ModifyJoinList";
import CurrentJoinList from "components/Groups/CurrentJoinList/CurrentJoinList";
import Button from "components/Commons/Button";
import eximg from "source/myPage.jpeg";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";
import DateFormat from "modules/DateFormat";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import TextFormat from "modules/TextFormat";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
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
  & button.edit {
    margin-right: 5px;
  }
  & .contentRow {
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  }
  & .btnContainer {
    margin: 5px 0;
  }
`;

const HeadContainer = styled(Grid.Column)`
  background-color: ${StyleGuide.color.geyScale.scale1};
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
    background-size: cover;
  }
  & .title {
    min-height: 80px;
    font-weight: bold;
    font-size:${market_style.font.size.giant1};
    text-align: center;
    padding: 10px 0;
  }
  & .likeBtnContainer {
    display: flex;
    justify-content: space-around;
    & button:focus {
      outline: 0;
    }
    & .likeBtn {
      border: 0;
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
    font-size:${market_style.font.size.mini2};
  }
  & .list span {
    float: right;
    font-size:${market_style.font.size.normal1};
  }
`;

const InfoSection = styled.div`
  padding: 1rem;
  & .explanation {
    font-size:${market_style.font.size.mini2};
  }
`;

const IssueContainer = styled.div`
  padding: 1rem 2rem;
  & .addIssue {
    background-color: transparent;
    border: 0;
    padding: 7px;
  }
  & ul .issueTitle {
    font-weight: bold;
  }
  & ul .issueDate {
    font-size:${market_style.font.size.small1};
    margin: 0 5px;
    font-weight: lighter;
    color: ${StyleGuide.color.geyScale.scale5};
  }
  & button {
    margin-top: 5px;
    margin-right: 5px;
    padding: 0.5rem 1rem;
  }
  & ul li {
    margin: 10px 0;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    & .deleteIssue {
      background-color: transparent;
      border: 0;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  & .ui.form {
    margin-bottom: 10px;
    & input {
      height: 30px;
    }
  }
`;


class GroupDetail extends Component {
  state = {
    editMode: false,
    editIssue: false
  };

  componentWillMount() {
    const url = `/groupDetail/${this.props.id}`;
    this.props.history.replace(url);
    // 어떤 페이지를 마지막으로 새로고침 했더라도 새로고침 후에는 기본 설정으로 돌아감
  }

  componentDidMount() {
    this.props.GetGroupDetailRequest(this.props.id); // 그룹에 대한 디테일 정보
    this.props.GetGroupCountRequest(this.props.id); // 그룹 count 정보
    if (this.props.token) {
      this.props.GetLikeGroupRequest(this.props.id, this.props.token); // token 값 있을때만 뜨는 좋아요 정보
    }
  }

  setEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  updateLike = async() => {
    if (!this.props.token) {
      await alert("로그인을 해주세요.");
      return;
    }
    if (this.props.like === true) {
      this.props.UnlikeGroupRequest(this.props.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.GetLikeGroupRequest(this.props.id, this.props.token)
          .then(this.props.GetGroupCountRequest(this.props.id))
        }
      });
    } else {
      this.props.LikeGroupRequest(this.props.id, this.props.token)
      .then(data => {
        if (data.success === true) {
          this.props.GetLikeGroupRequest(this.props.id, this.props.token)
          .then(this.props.GetGroupCountRequest(this.props.id))
        }
      });
    }
  }

  setEditIssue = () => {
    this.setState({
      editIssue: !this.state.editIssue
    });
  }

  onSubmitForm = (data) => {
    this.props.CreateGroupIssueRequest(FormDataToJson(data), this.props.id, this.props.token)
    .then(res => {
      if (res.data && res.data.success === true) {
        this.props.GetGroupDetailRequest(this.props.id);
        this.setState({
          editIssue: false
        });
      }
    });
  }

  deleteIssue = (id) => {
    this.props.DeleteGroupIssueRequest(this.props.id, id, this.props.token)
    .then(res => {
      if (res.data && res.data.success === true) {
        this.props.GetGroupDetailRequest(this.props.id);
      }
    });
  }

  render(){
    const groupDetail = this.props.GroupDetail;
    const count = this.props.Count;
    const user = this.props.userInfo;

    const EditIssue = () => {
      return(
        <ValidateForm onSubmit={this.onSubmitForm}>
          <FormInput name="title" className="issueInput" validates={["required"]}/>
          <Button type="submit" size="small">추가하기</Button>
          <Button onClick={this.setEditIssue} size="small">취소하기</Button>
        </ValidateForm>
      );
    }

    return(
      <div>
        {groupDetail.length !== 0 &&
          <ContentBox>
            <Wrapper padded={false} columns={2}>
            {this.props.userInfo && (this.props.userInfo.uid === groupDetail.user_id) &&
              <Grid.Row>
                <div className="btnContainer">
                  <Link to={`/groupDetail/${this.props.id}/modify`}>
                    <Button className="edit">
                      수정하기
                    </Button>
                  </Link>
                  <Button className="edit" color={this.state.editMode? "Solid" : null} onClick={this.setEditMode}>
                    {this.state.editMode? "확인" : "가입 관리"}
                  </Button>
                </div>
              </Grid.Row>
            }
            {/* ------------------------ 좌측 프로필 섹션 -------------------------- */}
              <Grid.Row className="contentRow">
                <HeadContainer mobile={16} tablet={16} computer={5} largeScreen={4}>
                  <ProfileSection>
                    <div className="imgContainer">
                      <div style={groupDetail.img
                         ? {backgroundImage: `url(${groupDetail.img.m_img})`}
                         : {backgroundImage: `url(${eximg})`}}></div>
                    </div>
                    <div className="title">
                      <h3>{groupDetail.title}</h3>
                    </div>
                    <InfoSection>
                      <h4>소개</h4>
                      <p className="explanation">{groupDetail.explanation}</p>
                    </InfoSection>
                    <div className="likeBtnContainer">
                      {this.props.like === true
                      ? <Button color="Primary" onClick={this.updateLike}>
                          좋아요
                          <Icon name="heart" color="red" />
                        </Button>
                      : <Button className="likeBtn" onClick={this.updateLike}>
                          좋아요
                          <Icon name="heart outline" />
                        </Button>
                      }
                      <JoinGroupContainer/>
                    </div>
                  </ProfileSection>
                  <IssueContainer>
                    <h4>
                      공지
                      {user && user.uid === groupDetail.user_id &&
                      <button className="addIssue" onClick={this.setEditIssue}><Icon name="plus" color="black" size="small"/></button>
                      }
                    </h4>
                    {this.state.editIssue && <EditIssue/>}
                    <div>
                      <ul>
                        {groupDetail.issue !== null &&
                          groupDetail.issue.map(issue => (
                            <li key={issue.uid}>
                              <div className="issueTitle">{issue.title}
                                <div className="issueDate">{DateFormat(issue.create_time)}</div>
                              </div>
                              {user && user.uid === groupDetail.user_id &&
                              <button className="deleteIssue" onClick={() => this.deleteIssue(issue.uid)}>
                                <i aria-hidden="true" className="trash alternate icon"></i>
                              </button>
                              }
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </IssueContainer>
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
                      <Icon name="user" color="grey" size="tiny"></Icon> 개설자
                      <span><Link to={`/designerDetail/${groupDetail.user_id}`}>
                        <TextFormat txt={groupDetail.userName} chars={10}/>
                      </Link></span>
                    </div>
                    <div className="list">
                      <Icon name="heart" color="grey" size="tiny"></Icon> 좋아요
                      <span>{count.like}</span>
                    </div>
                  </CountSection>
                </HeadContainer>

                {/* ------------------------ 우측 카드 렌더링 섹션 -------------------------- */}
                {this.state.editMode
                ? <ModifyJoinList {...this.props}/>
                : <CurrentJoinList {...this.props}/>
                }
              </Grid.Row>
            </Wrapper>
          </ContentBox>
        }
      </div>
    );
  }
}

export default GroupDetail;

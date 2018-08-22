import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import JoinGroupContainer from "containers/Groups/JoinGroupContainer";
import ModifyJoinListNew from "components/Groups/ModifyJoinListNew";
import ModifyExistListNew from "components/Groups/ModifyExistListNew";
import CurrentJoinListNew from "components/Groups/CurrentJoinListNew";
import Button from "components/Commons/Button";
import eximg from "source/myPage.jpeg";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";

// css styling

const Wrapper = styled.div`
  width: 100%;
`;

const InfoContainer = styled(Grid)`
  width: 100%;
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale3};
  &.ui.grid {
    margin: 2rem 0 0 0;
  }
  &.ui.grid > .row,
  &.ui.grid > .row > .column {
    padding: 1rem 0;
  }
  & .title {
    font-size: ${StyleGuide.font.size.heading4};
    padding: 1rem 0 !important;
  }
  & .explanation {
    margin-bottom: 1rem;
  }
  & .owner, & .date {
    float: left;
    margin-right: 1rem;
  }
  & .owner:after {
    display: block;
    content: "";
    clear: both;
  }
  & .btnWrap {
    text-align: right;
  }
`;

const BtnContainer = styled.div`
  float: right;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
  & button {
    margin-left: .3rem;
  }
`;

class GroupDetailNew extends Component {
  state = {
    editMode: false,
    joinEditMode: false
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

  updateLike = () => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
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

  render(){
    const groupDetail = this.props.GroupDetail;
    const user = this.props.userInfo;
    return(
      <div>
        {groupDetail.length !== 0 &&
          <ContentBox>
            <Wrapper>
            {/* ------------------------ 상단 프로필 섹션 -------------------------- */}
            <InfoContainer>
              <Grid.Row className="title">{groupDetail.title}</Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={9}>
                  <div className="explanation">{groupDetail.explanation}</div>
                  <div className="date">최근 업데이트 : {groupDetail.update_time.split("T")[0]}</div>
                  <div className="owner">그룹장 : {groupDetail.userName}</div>
                </Grid.Column>
                <Grid.Column className="btnWrap" width={7}>
                  {user && (user.uid === groupDetail.user_id) &&
                  <div className="btnContainer">
                    <Link to={`/groupDetail/${this.props.id}/modify`}>
                      <Button className="edit" size="small">수정</Button>
                    </Link>
                    <Button className="edit" size="small" onClick={()=>this.setState({editMode: !this.state.editMode})}>관리</Button>
                  </div>
                  }
                  <BtnContainer>
                    {this.props.like === true
                    ? <Button color="Primary" onClick={this.updateLike}>좋아요 취소 ({this.props.Count.like})</Button>
                    : <Button className="likeBtn" onClick={this.updateLike}>좋아요 ({this.props.Count.like})</Button>
                    }
                    {user && (user.uid === groupDetail.user_id)
                    ? <Button className="edit" color="Solid" onClick={()=>this.setState({joinEditMode: !this.state.joinEditMode})}>
                        가입 신청 관리
                      </Button>
                    : <JoinGroupContainer/>
                    }
                  </BtnContainer>
                </Grid.Column>
              </Grid.Row>
            </InfoContainer>
            {/* ------------------------ 하단 카드 렌더링 섹션 -------------------------- */}
            {this.state.joinEditMode
            ? <ModifyJoinListNew {...this.props}/>
            : this.state.editMode
            ? <ModifyExistListNew {...this.props}/>
            : <CurrentJoinListNew {...this.props}/>
            }
            </Wrapper>
          </ContentBox>
        }
      </div>
    );
  }
}

export default GroupDetailNew;

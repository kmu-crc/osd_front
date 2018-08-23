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
import PxtoRem from "modules/PxtoRem";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 30px;
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
    font-size: ${StyleGuide.font.size.heading3};
    padding: 1rem 1rem 0 0 !important;
    & span {
      line-height: 1.2;
      cursor: pointer;
      margin-right: 5px;
    }
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

const SideMenuBtn = styled.div`
  position: absolute;
  right: 0;
  top: -5px;
  width: ${PxtoRem(50)};
  font-size: 1rem;
  & > button {
    line-height: ${PxtoRem(60)};
    background-color: transparent;
    border: 0;
    width: ${PxtoRem(50)};
    text-align: right;
    padding: 0;
    outline: 0;
    i.icon {
      margin-right: 0;
      &::after {
        margin-right: 0;
      }
    }
  }
`;

const SideMenu = styled.ul`
  display: block;
  position: absolute;
  width: ${PxtoRem(150)};
  text-align: center;
  bottom: 0;
  right: 0;
  z-index: 2;
  transform: translateY(100%);
  background-color: white;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    &:last-child {
      border: 0;
    }
    & button {
      width: 100%;
      line-height: ${PxtoRem(45)};
      background-color: transparent;
      text-align: center;
      border: 0;
      padding: 0;
      outline: 0;
    }
  }
`;

class GroupDetailNew extends Component {
  state = {
    editMode: false,
    activeMoreBtn: false
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

  onActiveMoreBtn = e => {
    if (e.type === "click") {
      this.setState({
        activeMoreBtn: !this.state.activeMoreBtn
      });
    }
  };

  onCloseMoreBtn = e => {
    if (
      e.type === "blur" &&
      !this.MoreBtn._reactInternalFiber.child.stateNode.contains(
        e.relatedTarget
      )
    ) {
      this.setState({
        activeMoreBtn: false
      });
    }
    if (e.type === "click") {
      this.setState({
        activeMoreBtn: false
      });
    }
  };

  render(){
    const groupDetail = this.props.GroupDetail;
    const user = this.props.userInfo;

    const SubMenuCompo = () => {
      return (
        <SideMenu>
          <li>
            <Link to={`/groupDetail/${this.props.id}/modify`}>
              <button>수정</button>
            </Link>
          </li>
        </SideMenu>
      );
    };

    return(
      <div>
        {groupDetail.length !== 0 &&
          <ContentBox>
            <Wrapper>
            {/* ------------------------ 상단 프로필 섹션 -------------------------- */}
            <InfoContainer>
              <Grid.Row className="title">
                <span><a href={`/groupDetail/${groupDetail.parentId}`}>{groupDetail.parentName && groupDetail.parentName + " > "}</a></span>
                <span><a href={`/groupDetail/${groupDetail.uid}`}>{groupDetail.title}</a></span>
                {user && (user.uid === groupDetail.user_id) &&
                  <SideMenuBtn tabIndex="1"
                               onBlur={this.onCloseMoreBtn}
                               ref={ref => (this.MoreBtn = ref)}>
                    <button onClick={this.onActiveMoreBtn}>
                      <Icon name="ellipsis vertical" />
                    </button>
                    {this.state.activeMoreBtn? <SubMenuCompo /> : null}
                  </SideMenuBtn>
                }
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={9}>
                  <div className="explanation">{groupDetail.explanation}</div>
                  <div className="date">최근 업데이트 : {groupDetail.update_time.split("T")[0]}</div>
                  <div className="owner">그룹장 : {groupDetail.userName}</div>
                </Grid.Column>
                <Grid.Column className="btnWrap" width={7}>
                {this.state.editMode
                ? <BtnContainer>
                    <Button className="edit" color="Solid" onClick={()=>this.setState({editMode: !this.state.editMode})}>확인</Button>
                  </BtnContainer>
                : <BtnContainer>
                    {this.props.like === true
                    ? <Button color="Primary" onClick={this.updateLike}>좋아요 취소 ({this.props.Count.like})</Button>
                    : <Button className="likeBtn" onClick={this.updateLike}>좋아요 ({this.props.Count.like})</Button>
                    }
                    <JoinGroupContainer/>
                    {user && (user.uid === groupDetail.user_id) &&
                    <Button className="edit" color="Solid" onClick={()=>this.setState({editMode: !this.state.editMode})}>
                        가입 관리
                      </Button>
                    }
                  </BtnContainer>
                }
                </Grid.Column>
              </Grid.Row>
            </InfoContainer>
            {/* ------------------------ 하단 카드 렌더링 섹션 -------------------------- */}
            {this.state.editMode
            ? <div>
                <ModifyJoinListNew {...this.props}/>
                <ModifyExistListNew {...this.props}/>
              </div>
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

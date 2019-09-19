import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import Button from "components/Commons/Button";
import eximg from "source/myPage.jpeg";
import { AcceptDesignRequest, GetoutDesignRequest } from "redux/modules/design";
import { GetMyInvitedListRequest } from "redux/modules/personal";

// css styling
const List = styled.li`
  height: 80px;
  width: 100%;
  position: relative;
  margin: 1rem 0;
  cursor: pointer;
  &:hover, &:focus {
    background-color: ${opendesign_style.color.grayScale.scale1};
  }
`;

const BoxWrap = styled.div`
  height: 100%;
  width: 100%;
  & .img {
    width: 25%;
    height: 100%;
    overflow: hidden;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    float: left;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -15px;
`;

const TextPart = styled.div`
  padding: 0 20px;
  font-size: ${opendesign_style.font.size.paragraph};
  float: left;
  width: 50%;
  & .title {
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${opendesign_style.color.grayScale.scale7};
    font-size: 16px;
  }
  & .userName {
    line-height: 1.35;
    margin: 5px 0;
    color: ${opendesign_style.color.grayScale.scale6};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .cate {
    color: ${opendesign_style.color.main.basic};
    font-weight: 300;
    font-size: ${opendesign_style.font.size.small};
  }
`;

const Nodata = styled.p`
  text-align: center;
`;

class MyInvitedContainer extends Component {
  componentDidMount() {
    this.props.GetMyInvitedListRequest(this.props.token);
  }

  getoutMember = (e, id) => {
    e.stopPropagation();
    const confirm = window.confirm("가입을 거절하시겠습니까?");
    if (confirm) {
      this.props.GetoutDesignRequest(id, this.props.userInfo.uid, this.props.token, "DesignInviteReject")
      .then(res => {
        if (res.data && res.data.success) {
          alert("가입 요청을 거절하였습니다.");
          this.props.GetMyInvitedListRequest(this.props.token);
        } else {
          alert("다시 시도해주세요.");
        }
      });
    } else {
      return;
    }
  }

  acceptMember = (e, id) => {
    e.stopPropagation();
    const confirm = window.confirm("가입을 승인하시겠습니까?");
    if (confirm) {
      this.props.AcceptDesignRequest(id, this.props.userInfo.uid, this.props.token)
      .then(res => {
        if (res.data && res.data.success) {
          alert("승인되었습니다.");
          this.props.GetMyInvitedListRequest(this.props.token);
        } else {
          alert("다시 시도해주세요.");
        }
      });
    } else {
      return;
    }
  }

  goLink = (id) => {
    this.props.history.push(`/designDetail/${id}`);
  }

  render(){
    return(
      <div>
        {this.props.list.length > 0?
          <ul>
            {this.props.list.map((design, i) => (
              <List onClick={() => this.goLink(design.uid)} key={i}>
                <BoxWrap>
                  <div className="img" style={design.thumbnailUrl? {backgroundImage: `url(${design.thumbnailUrl.m_img})`} : {backgroundImage: `url(${eximg})`}}></div>
                  <TextPart>
                    <div className="title">{design.title}</div>
                      {design.is_project === 1
                      ? <div className="userName">{design.userName}님의 프로젝트</div>
                      : <div className="userName">{design.userName}님의 작품</div>
                      }
                    <div className="cate">{design.categoryName? design.categoryName : "전체"}</div>
                  </TextPart>
                </BoxWrap>
                <ButtonWrap>
                  <Button size="small" onClick={(e) => this.acceptMember(e, design.uid)}>승인</Button>
                  <Button size="small" onClick={(e) => this.getoutMember(e, design.uid)}>거절</Button>
                </ButtonWrap>
              </List>
            ))}
          </ul>
        : <Nodata>받은 초대가 없습니다.</Nodata>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.MyJoin.status.InvitedList,
    userInfo: state.Authentication.status.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyInvitedListRequest: (token) => {
      return dispatch(GetMyInvitedListRequest(token))
    },
    AcceptDesignRequest: (id, memberId, token) => {
      return dispatch(AcceptDesignRequest(id, memberId, token))
    },
    GetoutDesignRequest: (id, memberId, token, refuse) => {
      return dispatch(GetoutDesignRequest(id, memberId, token, refuse))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvitedContainer);

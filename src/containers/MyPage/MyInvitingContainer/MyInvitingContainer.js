import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import Button from "components/Commons/Button";
import eximg from "source/myPage.jpeg";
import { GetoutDesignRequest } from "actions/Designs/JoinDesign";
import { GetMyInvitingListRequest } from "actions/Users/MyDetail";

// css styling
const List = styled.li`
width: 100%;
  position: relative;
  height: 80px;
  margin: 1rem 0;
  &:hover, &:focus {
    background-color: ${opendesign_style.color.grayScale.scale1};
  }
  cursor: pointer;
`;

const BoxWrap = styled.div`
  width: 100%;
  height: 100%;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  `;
const BoxImg = styled.div`
  width: 25%;
  height: 100%;
  overflow: hidden;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  float: left;
`;

const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -15px;
`;

const TextPart = styled.div`
  width: 50%;
  padding: 0 20px;
  font-size: ${opendesign_style.font.size.paragraph};
  float: left;
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

class MyInvitingContainer extends Component {
  componentDidMount() {
    this.props.GetMyInvitingListRequest(this.props.token);
  }

  getoutMember = (e, id) => {
    e.stopPropagation();
    const confirm = window.confirm("가입 신청을 취소하시겠습니까?");
    if (confirm) {
      this.props.GetoutDesignRequest(id, this.props.userInfo.uid, this.props.token)
        .then(res => {
          if (res.data && res.data.success) {
            // alert("가입 신청이 취소되었습니다.");
            this.props.GetMyInvitingListRequest(this.props.token);
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

  render() {
    return (
      <div>
        {this.props.list.length > 0 ?
          <ul>
            {this.props.list.map((design, i) => (
              <List onClick={() => this.goLink(design.uid)} key={i}>
                <BoxWrap>
                  <BoxImg img={design.thumbnailUrl ? design.thumbnailUrl.m_img : eximg} />
                  <TextPart>
                    <div className="title">{design.title}</div>
                    {design.is_project === 1
                      ? <div className="userName">{design.userName}님의 프로젝트</div>
                      : <div className="userName">{design.userName}님의 작품</div>
                    }
                    <div className="cate">{design.categoryName ? design.categoryName : "전체"}</div>
                  </TextPart>
                </BoxWrap>
                <ButtonWrap>
                  <Button size="small" onClick={(e) => this.getoutMember(e, design.uid)}>신청 취소</Button>
                </ButtonWrap>
              </List>
            ))}
          </ul>
          : <Nodata>가입 신청한 내역이 없습니다.</Nodata>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.MyJoin.status.InvitingList,
    userInfo: state.Authentication.status.userInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyInvitingListRequest: (token) => {
      return dispatch(GetMyInvitingListRequest(token))
    },
    GetoutDesignRequest: (id, memberId, token, refuse) => {
      return dispatch(GetoutDesignRequest(id, memberId, token, refuse))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvitingContainer);


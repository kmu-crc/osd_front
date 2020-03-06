import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import NumberFormat from "modules/NumberFormat";
import PointFormat from "modules/PointFormat";

import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
// import { geturl } from 'config';
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  border: 1px solid transparent;
  width: 247px;
  height: 335px;
  background: transparent;//#FFFFFF;
  font-family: Noto Sans KR;
  // div{border:1px solid red;}
  cursor: pointer;
`;
const ItemPic = styled.div`
  width: 247px;
  height: 206px;
  background: transparent;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top: 8px;
  width: 100%;
  .title {
    font-weight: 500;
    font-size: 17px;
    text-align: left;
    line-height: 25px;
  }
  .author {
    margin-top: 8px;
    font-weight: 300;
    font-size: 12px;
    text-align: left;
    line-height: 18px;
  }
`;
const NumberWrapper = styled.div`
  margin-top: 23px;
  display: flex;
  flex-direction: row;
  .price {
    font-weight: 500;
    font-size: 17px;
    text-align: left;
    line-height: 25px;
  }
  .score {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    font-weight: 300;
    font-size: 15px;
    text-align: left;
    line-height: 22px;
  }
`;
const PrivateLabel = styled.div`
  position: absolute;
  right: 10px;
  bottom: 110px;
  width: max-content;
  padding: 5px 10px;
  background-color: gray;
  color: white;
  border-radius: 15px;
`;
const empty = { thumbnail: '', title: '로딩중...', userName: "로딩중...", price: 999, unit: 'won', score: 4.0, reviews: 999 };
class Item extends Component {
  Keeper = () => {
    const item = this.props.data;
    if (item.uid) {
      const yours = item.members && item.members.filter(mem => mem.user_id === this.props.userInfo && this.props.userInfo.uid);
      if (item.private && !yours) {
        alert("비공개!");
        return;
      } else {
        window.location.href = `/productDetail/${item.uid}`;
      }
    }
    // () => item.uid ? item.private ? alert("비공개!") : null : alert("이 아이템의 상세내용을 가져올 수 없습니다.")
  }
  render() {
    const item = this.props.data || empty;
    return (
      // const ItemContent = () =>
      <Wrapper onClick={this.Keeper}>
        {/* picture */}
        <ItemPic img={(item && item.thumbnail) || noimg} />
        {/* text */}
        <TextWrapper>
          <div className="title"><TextFormat txt={item.title} /></div>
          <div className="author"><TextFormat txt={item.userName} /></div>
        </TextWrapper>
        {/* numbers */}
        <NumberWrapper>
          <div className="price">{PointFormat(item.price/1000 || 0)}천원</div>
          <div className="score">
            {Star(item.score + 0.5)}({NumberFormat(item.reviews)})
          </div>
        </NumberWrapper>
        {item.custom && item.isPurchased === 0 ?
          <PrivateLabel onClick={() => this.props.confirm(item.payment_id)}>
            <div>구매확인</div>
          </PrivateLabel> : null}
        {/* {item.private ? <PrivateLabel>비공개</PrivateLabel> : null} */}
      </Wrapper>
      // item.uid ?
      // <NavLink to={"/productDetail/" + item.uid}>
      // <ItemContent />
      // </NavLink>
      // : <ItemContent />
    )
  }
}

export default Item;

import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import NumberFormat from "modules/NumberFormat";
import PointFormat from "modules/PointFormat";
import { Rating } from 'semantic-ui-react'

import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
import customimg from "source/toolbox.png";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";


const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  width: 310;
  height: 356px;
  padding:20px 15px;
  position: relative;
  border: 0.5px solid #EAEAEA;
  border-radius: 20px;
  box-shadow: 3px 3px 5px #4141411A;
  background: transparent;
  font-family: Noto Sans KR;
  cursor: pointer;
`;
const ItemPic = styled.div`
  min-width: 280px;
  min-height: 250px;
  max-width: 280px;
  max-height: 250px;
  font-size:30px;
  font-weight:500;
  color:white;
  background-color:#EFEFEF;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top:10px;
  width: 100%;
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  .title {
    width:170px;
    height:27px;
    color:#000000;
    font-weight: 500;
    font-size:${market_style.font.size.normal1};
    text-align: left;
  }
  .author {
    width:100px;
    height:22px;
    display: flex;
    justify-content:flex-end;
    color:#707070;
    font-weight: 400;
    font-size:${market_style.font.size.small1};
  }
`;
const TypeWrapper = styled.div`
  height:23px;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:flex-end;
`
const NumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  margin-top:10px;
  .price {
    font-weight: 500;
    font-size:${market_style.font.size.small1};
    text-align: left;
  }
  .score {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    font-weight: 300;
    font-size:${market_style.font.size.small1};
    text-align: left;
  }
  .avg{
    font-weight: 300;
    font-size:${market_style.font.size.tiny3};
    text-align: left;
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
const TypeText = styled.div`
font-size:${market_style.font.size.tiny1};
font-weight:100;
  color:red;
`
const StatusTape = styled.div`
  position: absolute;
  bottom: 100px;
  width: 50px;
  height: 25px;
  font-size: 19px;
  font-weight: 500;
  line-height: 23px;
  color: red;
  background-color: white;
`;
const empty = { thumbnail: '', title: '로딩중...', userName: "로딩중...", price: 999, unit: 'won', score: 4.0, reviews: 999 };
class Item extends Component {
  Keeper = () => {
    const item = this.props.data;
    if (item.uid) {
      const yours = item.members && item.members.filter(mem => mem.user_id === this.props.userInfo && this.props.userInfo.uid);
      if (item.private && !yours) {
        // alert("비공개!");
        return;
      } else {
        window.location.href = `/productDetail/${item.uid}`;
      }
    }
    // () => item.uid ? item.private ? alert("비공개!") : null : alert("이 아이템의 상세내용을 가져올 수 없습니다.")
  }
  render() {
    const item = this.props.data || empty;
    const date = new Date(item.create_time).getFullYear() + '/' + (parseInt(new Date(item.create_time).getMonth(), 10) + 1) + '/' + new Date(item.create_time).getDate();
    const img = item ? item.thumbnail : noimg;
    console.log(this.props);
    const RenderingStar = () => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rating name="score" icon='star' defaultRating={parseInt(item.score, 10) || 0} maxRating={5} disabled />
          <div className="avg">({item.avg})</div>
        </div>)
    }
    return (
      // const ItemContent = () =>
      <Wrapper onClick={this.Keeper}>
        {/* status tape */}
        {item.status === "SOLD_OUT" ? <StatusTape>{item.type === 8 ? "마감" : "매진"}</StatusTape> : null}
        {/* picture */}
        <ItemPic img={img} />
        {/* text */}
        <TextWrapper>
          <div className="title"><TextFormat txt={item.title} /></div>
          <div className="author">
            <TextFormat txt={item.userName} />
            {/* <div className="date">{date}</div> */}
          </div>
        </TextWrapper>
        {/* numbers */}
        {/* <TypeWrapper>
        <TypeText>
          {item.type===0?"디자인":null}
          {item.type===1?"프로젝트":null}
          {item.type===2?"기술자문/상담":null}
          {item.type===3?"경험":null}
          {item.type===4?"정보/데이터":null}
          {item.type===5?"아이디어/노하우":null}
          {item.type===6?"지적재산권":null}
          {item.type===7?"제작품":null}
        </TypeText>
        </TypeWrapper> */}
        <NumberWrapper>
          <div className="price">{PointFormat(item.price / (parseInt(item.price) > 9999 ? 10000 : 1000) || 0)}{parseInt(item.price) > 9999 ? "만 point" : " point"}</div>
          <div className="score">
            {/* {Star(item.score + 0.5)}({NumberFormat(item.reviews)}) */}
            <RenderingStar />
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

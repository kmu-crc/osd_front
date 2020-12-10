import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import NumberFormat from "modules/NumberFormat";
import PointFormat from "modules/PointFormat";
import { Rating } from 'semantic-ui-react'

import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
import customimg from "source/toolbox.png";

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
  font-size:30px;
  font-weight:500;
  color:white;
  background-color:#EFEFEF;
  display:flex;
  justify-content:center;
  align-items:center;
  // background: transparent;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    font-weight: 300;
    font-size: 12px;
    text-align: left;
    line-height: 18px;
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
  // margin-top: 23px;
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
const TypeText = styled.div`
  font-size:9px;
  font-weight:100;
  color:red;
`
const empty = { thumbnail: '', title: '로딩중...', userName: "로딩중...", price: 999, unit: 'won', score: 4.0, reviews: 999 };
class Sales extends Component {
  Keeper = () => {
    const item = this.props.data;
    if (item.uid) {
      const yours = item.members && item.members.filter(mem => mem.user_id === this.props.userInfo && this.props.userInfo.uid);
      if (item.private && !yours) {
        // alert("비공개!");
        return;
      } else {
        window.location.href = `/productPurchase/${item.uid}/${item.payment_id}`;
      }
    }
    // () => item.uid ? item.private ? alert("비공개!") : null : alert("이 아이템의 상세내용을 가져올 수 없습니다.")
  }
  render() {
    console.log(this.props);
    const item = this.props.data || empty;
    const date = new Date(item.create_time).getFullYear() + '/' + new Date(item.create_time).getMonth() + '/' + new Date(item.create_time).getDate();
    const img = item ? item.thumbnail : noimg;
    // console.log(this.props);
    const RenderingStar = ()=>{
      return <Rating name="score" icon='star' defaultRating={parseInt(item.score,10)||0} maxRating={5} disabled />
    }
    return (
      // const ItemContent = () =>
      <Wrapper onClick={this.Keeper}>
        {/* picture */}
        <ItemPic img={img} />
        {/* text */}
        <TextWrapper>
          <div className="title"><TextFormat txt={item.title} /></div>
          <div className="author">
            <TextFormat txt={item.userName} />
            <div className="date">{date}</div>
          </div>
        </TextWrapper>
        {/* numbers */}
        <TypeWrapper>
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
        </TypeWrapper>
        <NumberWrapper>
          <div className="price">{PointFormat(item.price / (parseInt(item.price)>9999?10000:1) || 0)}{parseInt(item.price)>9999?"만 point":" point"}</div>
          <div className="score">
            {/* {Star(item.score + 0.5)}({NumberFormat(item.reviews)}) */}
            <RenderingStar/>
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

export default Sales;

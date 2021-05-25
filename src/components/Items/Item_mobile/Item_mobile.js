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
  width:172px;
  height:241px;
  box-shadow: 2px 2px 5px #00000029;
  border-radius:10px;
  border:1px solid #eaeaea;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:13px 12px;
  *{
    cursor:pointer;
  }
  .thumbnail{
    width:152px;
    height:140px;
    background-image: url(${props=>props.img});
    background-size : cover;
  }
  .title{
    width:100%;
    height:22px;
    margin-top:5px;
    font-size:${market_style.font.size.small1};
    font-weight:800;
    text-align:center;
  }
  .summaryBox{
    width:100%;
    height:19px;
    display:flex;
    align-items:center;
    margin-top:5px;
    justify-content:center;
    font-size:${market_style.font.size.mini2};
    .owner{
      width:max-content;
      max-width:70px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size:${market_style.font.size.small1};
    }
    .line{
      margin-right:10px;
      margin-left:10px;
    }
  }
  .point{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:${market_style.font.size.small1};
    font-weight:800;
    margin-top:5px;
  }
`

const empty = { thumbnail: '', title: '로딩중...', userName: "로딩중...", price: 999, unit: 'won', score: 4.0, reviews: 999 };
class Item_mobile extends Component {
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
    const date = new Date(item.create_time).getFullYear() + '/' + (parseInt(new Date(item.create_time).getMonth(),10)+1) + '/' + new Date(item.create_time).getDate();
    const img = item ? item.thumbnail : noimg;
    console.log(this.props);
    const RenderingStar = ()=>{
      return( 
      <div style={{display:"flex", alignItems:"center"}}>
      <Rating name="score" size='mini' icon='star' defaultRating={parseInt(item.score,10)||0} maxRating={5} disabled />
      {/* <div className="avg">({item.avg})</div> */}
      </div>)
    }
    return (
      <Wrapper img={img} onClick={this.Keeper}>
        <div className="thumbnail"/>
        <div className="title"><TextFormat txt={item.title} /></div>
        <div className="summaryBox">
          <div className="owner">{item.userName}</div>
          <div className="line">|</div>
          <RenderingStar/>
        </div>
        <div className="point">
        {PointFormat(item.price / (parseInt(item.price)>9999?10000:1000) || 0)}{parseInt(item.price)>9999?"만 point":" point"}
        </div>
      </Wrapper>
    )
  }
}

export default Item_mobile;
{/* <Wrapper onClick={this.Keeper}>
<ItemPic img={img} />
<TextWrapper>
  <div className="title"><TextFormat txt={item.title} /></div>
  <div className="author">
    <TextFormat txt={item.userName} />
  </div>
</TextWrapper>
<NumberWrapper>
  <div className="price">{PointFormat(item.price / (parseInt(item.price)>9999?10000:1000) || 0)}{parseInt(item.price)>9999?"만 point":" point"}</div>
  <div className="score">
    <RenderingStar/>
  </div>
</NumberWrapper>
{item.custom && item.isPurchased === 0 ?
  <PrivateLabel onClick={() => this.props.confirm(item.payment_id)}>
    <div>구매확인</div>
  </PrivateLabel> : null}
</Wrapper> */}
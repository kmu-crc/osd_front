import React, { Component } from 'react';
import styled from 'styled-components';
import PointFormat from "Admin/Commons/PointFormat/PointFormat";
import { Rating } from 'semantic-ui-react'

import TextFormat from 'Admin/Commons/TextFormat/TextFormat';
import noimg from "source/noimg.png";
//         <div
//             onClick={() => handle(uid)}
//             style={{
//                 cursor: "pointer",
//                 padding: "5px 10px",
//                 marginLeft: "auto",
//                 width: "max-content",
//                 color: "white",
//                 backgroundColor: "red",
//                 borderRadius: "15px",
//             }}>삭제</div>
const Wrapper = styled.div`
  *{
    cursor:move;
  }
  position: relative;
  border: 1px solid transparent;
  width: 247px;
  height: 335px;
  background: transparent;//#FFFFFF;
  font-family: Noto Sans KR;
  margin-right:20px;
  margin-top:20px;
  background-color:white;
  .board{
    padding-left:5px;
    padding-right:5px;
  }
`;
const HotBtn = styled.div`
*{
  cursor:pointer;
}
  cursor:pointer;
  position:absolute;
  left:5px;
  top:5px;
  display:flex;
  padding:5px 10px;
  justify-content:center;
  align-items:center;
  width:max-content;
  color:white;
  background-color:orange;
  border-radius:15px;
`
const DeleteHotBtn = styled.div`
*{
  cursor:pointer;
}
  cursor:pointer;
  position:absolute;
  right:5px;
  top:5px;
  display:flex;
  padding:5px 10px;
  justify-content:center;
  align-items:center;
  width:max-content;
  color:white;
  background-color:red;
  border-radius:15px;
`
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
  render() {
    const item = this.props.data || empty;
    const date = new Date(item.create_time).getFullYear() + '/' + new Date(item.create_time).getMonth() + '/' + new Date(item.create_time).getDate();
    const img = item ? item.thumbnail : noimg;
    console.log(this.props);
    const RenderingStar = () => {
      return <Rating name="score" icon='star' defaultRating={parseInt(item.score, 10) || 0} maxRating={5} disabled />
    }
    return (
      // const ItemContent = () =>
      <Wrapper>
        {/* picture */}
        {this.props.isHotBtn ? <HotBtn onClick={() => this.props.handleTop(item.uid)}>{this.props.hotLabel}</HotBtn> : null}
        <DeleteHotBtn onClick={() => this.props.handleDel(item)}><div>{this.props.removeLabel || "삭제"}</div></DeleteHotBtn>
        <ItemPic img={img} />
        <div className="board">
          <TextWrapper>
            <div className="title"><TextFormat txt={item.title} /></div>
            <div className="author">
              <TextFormat txt={item.userName} />
              <div className="date">{date}</div>
            </div>
          </TextWrapper>
          {/* numbers */}
          <NumberWrapper>
            <div className="price">{PointFormat(item.price / (parseInt(item.price) > 9999 ? 10000 : 1000) || 0)}{parseInt(item.price) > 9999 ? "만원" : "천원"}</div>
            <div className="score">
              <RenderingStar />
            </div>
          </NumberWrapper>
          {item.custom && item.isPurchased === 0 ?
            <PrivateLabel onClick={() => this.props.confirm(item.payment_id)}>
              <div>구매확인</div>
            </PrivateLabel> : null}
        </div>
        {/* text */}

      </Wrapper>
    )
  }
}

export default Item;

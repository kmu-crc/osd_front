import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import NumberFormat from "modules/NumberFormat";
import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
// import { geturl } from 'config';
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  border: 1px solid transparent;
  width: 247px;
  height: 335px;
  background: transparent;//#FFFFFF;
  font-family: Noto Sans KR;
  // div{border:1px solid red;}
  cursor: default;
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
  .rate {
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

const empty = { thumbnail: '', title: '로딩중...', userName: "로딩중...", price: 999, unit: 'won', rate: 4.0, reviews: 999 };
class Item extends Component {
  render() {
    const item = this.props.data || empty;
    return (
      <Wrapper>
        <NavLink to={"/productDetail/" + item.uid}>
          {/* picture */}
          <ItemPic img={(item && item.thumbnail) || noimg} />
          {/* text */}
          <TextWrapper>
            <div className="title"><TextFormat txt={item.title} /></div>
            <div className="author"><TextFormat txt={item.userName} /></div>
          </TextWrapper>
          {/* numbers */}
          <NumberWrapper>
            <div className="price">{NumberFormat(item.price) || 0} won</div>
            <div className="rate">
              {Star(item.rate + 0.5)}({NumberFormat(item.reviews)})
          </div>
          </NumberWrapper>
        </NavLink>
      </Wrapper>
    )
  }
}

export default Item;

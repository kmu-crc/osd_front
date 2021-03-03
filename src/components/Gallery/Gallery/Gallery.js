import React, { Component } from 'react';
import styled from 'styled-components';
// import Star from "components/Commons/Star";
// import NumberFormat from "modules/NumberFormat";
// import PointFormat from "modules/PointFormat";

import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
// import { geturl } from 'config';
// import { NavLink } from "react-router-dom";
import market_style from "market_style";

const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  box-shadow: 5px 5px 10px #00000029;
  
  width: 247px;
  height: 247px;
//   height: 335px;
  background: transparent;//#FFFFFF;
  border-radius:20px;
  overflow:hidden;
  font-family: Noto Sans KR;
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
  padding-left:10px;
  .title {
    font-weight: 500;
    font-size:${market_style.font.size.small3};
    text-align: left;
    line-height: 25px;
  }
  .author {
    margin-top: 8px;
    font-weight: 300;
    font-size:${market_style.font.size.small1};
    text-align: left;
    line-height: 18px;
  }
`;
const empty = { thumbnail: '', group_id: null, user_id: null, nick_name: "", title: '로딩중...', description: '로딩중...' };
class Gallery extends Component {
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this);
  }
  onClickCard(event) {
    window.location.href = "/galleryDetail/" + this.props.data.uid;
  }
  render() {

    const item = this.props.data || empty;
    return (
      <Wrapper onClick={this.onClickCard}>
        {/* picture */}
        <ItemPic img={(item && item.thumbnail) || noimg} />
        {/* text */}
        <TextWrapper>
          <div className="title"><TextFormat txt={item.title || "...로딩중"} /></div>
        </TextWrapper>
      </Wrapper>
    )
  }
}

export default Gallery;

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
  box-shadow: 3px 3px 5px #4141411A;
  border:1px solid #eaeaea;
  width: 172px;
  height: 190px;
  background: transparent;
  border-radius:10px;
  overflow:hidden;
  font-family: Noto Sans KR;
  cursor: pointer;
  padding:13px;
`;
const ItemPic = styled.div`
  width: 152px;
  height: 140px;
  background: transparent;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top: 3px;
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  .title {
    height:25px;
    font-weight: 500;
    font-size:${market_style.font.size.mini2};
    text-align: left;
  }
  .author {
    margin-top: 8px;
    font-weight: 300;
    font-size:${market_style.font.size.mini2};
    text-align: left;
    line-height: 18px;
  }
`;
const empty = { thumbnail: '', group_id: null, user_id: null, nick_name: "", title: '로딩중...', description: '로딩중...' };
class Gallery_mobile extends Component {
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

export default Gallery_mobile;

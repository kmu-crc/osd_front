import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import { Rating } from 'semantic-ui-react'
import market_style from "market_style";

const Wrapper = styled.div`
  width:430px;
  height:113px;
  display:flex;
  color:#707070;
  font-size:${market_style.font.size.mini2};
  margin-right:20px;
  margin-bottom:20px;
  .content{
    width:100%;
    height:100%;
    margin-left:10px;
    .row{
      width: max-content;
      margin-bottom: 15x;
    }
    .text_{
      margin-bottom: 10px;
      overflow:hidden;
      text-overflow:ellipsis;
      word-wrap:break-word;
    }
  }
  cursor:pointer;
  :hover{ background-color: #EFEFEF;}
`;
const Thumbnail = styled.div`
  min-width:130px;
  min-height:113px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
  background-size: cover;
  background-position: center center;
`;

class Review extends Component {
  render() {
    const item = this.props.data;
    const RenderingStar = ()=>{
      return <Rating name="score" size="tiny" icon='star' defaultRating={parseInt(item.score,10)||0} maxRating={5} disabled/>
    }
    return (
    <Wrapper onClick={() => this.props.handler(item)}>
      <Thumbnail imageURL={item.m_img} />
      <div className="content">
        <div className="row"><RenderingStar/></div>
        <div className="row">{item.nick_name}</div>
        <div className="text_">{item.comment && item.comment.slice(0, 64)}{item.comment && item.comment.length > 64 ? "..." : ""}</div>
      </div>
    </Wrapper>)
  }
}

export default Review;

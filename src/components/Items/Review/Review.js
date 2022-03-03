import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import { Rating } from 'semantic-ui-react'
import market_style from "market_style";

const Wrapper = styled.div`
  width:600px;
  height:113px;
  display:flex;
  color:#707070;
  margin-right:30px;
  margin-bottom:20px;
  .wrapper{
    display:flex;
    .line{
      margin-bottom: 10x;
      font-size:${market_style.font.size.small1};
    }
    .marginRight{
      margin-right:49px;
    }
    .nick_{
      width:max-content;
      max-width:100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .content{
    width:100%;
    height:100%;
    margin-left:10px;
    .row{
      width: max-content;
      margin-bottom: 10x;
      font-size:${market_style.font.size.small1};
    }
    .text_{
      // border:1px solid black;
      margin-top:28px;
      // margin-bottom: 10px;
      overflow:hidden;
      text-overflow:ellipsis;
      word-wrap:break-word;
      font-size:${market_style.font.size.mini2};
    }
  }
  cursor:pointer;
  :hover{ background-color: #EFEFEF;}
`;
const Thumbnail = styled.div`
  min-width:150px;
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
        <div className="wrapper">
        <div className="nick_ line marginRight">{item.nick_name}</div>
        <div className="row"><RenderingStar/></div>
        </div>
        <div className="text_">{item.comment && item.comment.slice(0, 64)}{item.comment && item.comment.length > 64 ? "..." : ""}</div>
      </div>
    </Wrapper>)
  }
}

export default Review;

import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import { Rating } from 'semantic-ui-react'

const Wrapper = styled.div`

  min-width:600px;
  max-width:600px;
  height:150px;
  margin-right:50px;
  margin-bottom:30px;
  display:flex;
  .content{
    width:100%;
    height:100%;
    padding: 10px 30px;
    .row{
      width: max-content;
      margin-bottom: 15px;
    }
    .row2{
      margin-bottom: 15px;
    }
  }
  cursor:pointer;
  :hover{ background-color: #EFEFEF;}
`;
const Thumbnail = styled.div`
  width:150px;
  height:150px;
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
      return <Rating name="score" icon='star' defaultRating={parseInt(item.score,10)||0} maxRating={5} disabled size="huge" />
    }
    return (<Wrapper onClick={() => this.props.handler(item)}>
      <Thumbnail imageURL={item.m_img} />
      <div className="content">
        <div className="row"><RenderingStar/></div>
        <div className="row">{item.nick_name}</div>
        <div className="row2">{item.comment && item.comment.slice(0, 64)}{item.comment && item.comment.length > 64 ? "..." : ""}</div>
      </div>
    </Wrapper>)
  }
}

export default Review;

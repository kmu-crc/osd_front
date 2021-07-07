import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import profile from "source/thumbnail.png";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";
import market_style from "market_style";

const Wrapper = styled.div`
  width:150px;
  height:204px;
  border-radius:10px;
  border:1px solid #eaeaea;
  box-shadow: 2px 2px 5px #00000029;
  padding:10px;
  display:flex;
  flex-direction:column;
  align-items:cemter;
  .face{
    width:130px;
    height:130px;
    min-height:22px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    background-image: url(${props=>props.face});
    background-size:cover;
    border-radius:50%;
  }
  .nickName{
    width:100%;
    font-size:${market_style.font.size.small1};
    font-weight:500;
    color:black;
    text-align:center;
    margin-top:5px;
  } 
  .bottomBox{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:5px;
    .category{
      font-size:${market_style.font.size.small1};
    }
    .line{
      margin-left:10px;
      margin-right:10px;
    }
  }
`

const empty = {
  nick_name: "Loading", categoryName: "카테고리",
  items: 300, likes: 5000000,
  create_time: "2020-01-01T00:00:01.000Z",
  update_time: "2020-01-01T00:00:01.000Z",
};

class Expert_mobile extends Component {
  constructor(props){
    super(props);
    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem(event){
    const type = this.props.data.type||this.props.type;
    type==="designer"?
    window.location.href="/designerDetail/"+this.props.data.user_id
    :
    window.location.href="/makerDetail/"+this.props.data.user_id;
    console.log(this.props);
  }
  render() {
    const expert = this.props.data || empty;
    // console.log(expert);
    return (
      <Wrapper face={(expert && expert.m_img) || profile} onClick={this.onClickItem}>
        <div className="face"/>
        <div className="nickName">{expert.nick_name}</div>
        <div className="bottomBox">
        <div className="category"><TextFormat txt={expert.categoryName || "전체"} chars={32} /></div>
        <div className="line">|</div>
        <div className="like"><Icon className="heart" size="small" color="red" />{NumberFormat(expert.likeCount) || 0}</div>
        </div>
      </Wrapper>
    );
  }
}

export default Expert_mobile;
        // <Profile face={(expert && expert.m_img) || profile}>
        //   <div className="profile_img"/>
        // </Profile>
        // <TextWrapper>
        //   <div className="nick">{expert.nick_name}</div>
        //   <div className="category"><TextFormat txt={expert.categoryName || "전체"} chars={32} /></div>
        // </TextWrapper>
        // <Counter>
        //   <div className="items">
        //     {NumberFormat(expert.itemCount) || 0}개의 아이템&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        //   <div className="likes">{/*♥*/}
        //   &nbsp;&nbsp;&nbsp;&nbsp;<Icon className="heart" size="small" color="red" />{NumberFormat(expert.likeCount) || 0}</div>
        // </Counter>
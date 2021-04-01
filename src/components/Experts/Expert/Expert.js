import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import profile from "source/thumbnail.png";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";
import market_style from "market_style";

const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  border: 1px solid transparent;
  width: 240px;
  height: 310px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #4141411A;
  border: 0.5px solid #EAEAEA;
  border-radius: 20px;
  opacity: 1;
  cursor:pointer;
  padding:10px;
`;
const Profile = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  .profile_img{
    min-width: 220px;
    min-height: 220px;
    max-width: 220px;
    max-height: 220px;
    background: transparent;
    background-image: url(${props => props.face});
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
  
  }
`;
const TextWrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  .nick {
    margin-top:5px;
    text-align:center;
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    // padding:2px 0px;
    font-weight: 500;
    font-size:${market_style.font.size.normal1};
    color: #060000;
  }
  .category {
    margin-top:2px;
    font-weight: 500;
    font-size:${market_style.font.size.small1};
    color: #FF0000;
  }
`;
const Counter = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  margin-left: auto;
  margin-top: 2px;
  margin-right: auto;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #000000;

  .items {
    text-align: center;
    font-size:${market_style.font.size.mini2};
    font-weight: 300;
    line-height: 18px;
  }
  .v-line {
    margin-left: 10.5px;
    margin-right: 10.5px;
    width: 0px;
    height: 11px;
    border: 0.5px solid #707070;
  }
  .likes {
    text-align: left;
    font-size:${market_style.font.size.mini2};
    font-weight: 300;
    line-height: 18px;
    .heart{
      margin-right:10px;
    }
  }
`;

const empty = {
  nick_name: "Loading", categoryName: "카테고리",
  items: 300, likes: 5000000,
  create_time: "2020-01-01T00:00:01.000Z",
  update_time: "2020-01-01T00:00:01.000Z",
};

class Expert extends Component {
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
      <Wrapper onClick={this.onClickItem}>
        {/* profile */}
        <Profile face={(expert && expert.m_img) || profile}>
          <div className="profile_img"/>
        </Profile>
        {/* text */}
        <TextWrapper>
          <div className="nick">{expert.nick_name}</div>
          <div className="category"><TextFormat txt={expert.categoryName || "전체"} chars={32} /></div>
        </TextWrapper>
        {/* counter */}
        <Counter>
          <div className="items">
            {NumberFormat(expert.itemCount) || 0}개의 아이템&nbsp;&nbsp;&nbsp;&nbsp;|</div>
          {/* <div className="v-line" /> */}
          <div className="likes">{/*♥*/}
          &nbsp;&nbsp;&nbsp;&nbsp;<Icon className="heart" size="small" color="red" />{NumberFormat(expert.likeCount) || 0}</div>
        </Counter>
      </Wrapper>
    );
  }
}

export default Expert;

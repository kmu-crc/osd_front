import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import profile from "source/thumbnail.png";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";

const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  border: 1px solid transparent;
  width: 250px;
  height: 300px;
  background: #FFFFFF;
  box-shadow: 5px 5px 5px #0000001A;
  border-radius: 20px;
  cursor:pointer;
  padding:7px 25px;
`;
const Profile = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  .profile_img{
    min-width: 200px;
    min-height: 200px;
    max-width: 200px;
    max-height: 200px;
    background: transparent;
    background-image: url(${props => props.face});
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
  
  }
`;
const TextWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  font-family: Noto Sans KR;
  text-align: center;
  letter-spacing: 0;
  .nick {
    margin-top:8px;
    font-weight: 500;
    font-size: 13px;
    color: #060000;
  }
  .category {
    margin-top: 5px;
    font-weight: 500;
    font-size: 11px;
    color: #FF0000;
  }
`;
const Counter = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  margin-left: auto;
  margin-top: 10px;
  margin-right: auto;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #000000;

  .items {
    text-align: center;
    font-size: 11px;
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
    font-size: 11px;
    font-weight: 500;
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
          <div className="nick"><TextFormat txt={expert.nick_name} chars={32} /></div>
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

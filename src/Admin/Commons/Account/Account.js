import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import profile from "source/thumbnail.png";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "Admin/Commons/TextFormat/TextFormat.js";

const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  margin-right:15px;
  margin-top:15px;
  border: 1px solid transparent;
  width: 247px;
  height: 322px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  cursor:pointer;
  position:relative;

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
const Profile = styled.div`
  width: 164px;
  height: 164px;
  margin-top: 25px;
  margin-left: 42px;
  background: transparent;
  background-image: url(${props => props.face});
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;
const TextWrapper = styled.div`
  margin-top: 19px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  font-family: Noto Sans KR;
  text-align: center;
  letter-spacing: 0;
  .nick {
    font-weight: 500;
    font-size: 17px;
    color: #060000;
    line-height: 25px;
  }
  .category {
    margin-top: 5px;
    font-weight: 300;
    font-size: 12px;
    line-height: 18px;
    color: #FF0000;
  }
`;
const Counter = styled.div`

  margin-top: 35px;
  display: flex;
  flex-direction: row;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #000000;

  .items {
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
  }
  .v-line {
    margin-left: 10.5px;
    margin-right: 10.5px;
    width: 0px;
    height: 16px;
    border: 0.5px solid #707070;
  }
  .likes {
    text-align: left;
    font-size: 12px;
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

class Account extends Component {
  constructor(props){
    super(props);
   }
  render() {
    const account = this.props.data || empty;
    const img = account&&account.imgURL;
    console.log(this.props.data);
    return (
      <Wrapper>
        {/* profile */}
      {this.props.isHotBtn?<HotBtn onClick={()=>this.props.handleTop(account.uid)}>{this.props.hotLabel}</HotBtn>:null}
      <DeleteHotBtn onClick={()=>this.props.handleDel(account.uid)}>{this.props.removeLabel}</DeleteHotBtn>
        <Profile face={(img && img.m_img) || account.m_img || profile} />
        {/* text */}
        <TextWrapper>
          <div className="nick"><TextFormat txt={account.nick_name} chars={32} /></div>
          <div className="category"><TextFormat txt={account.categoryName || "전체"} chars={32} /></div>
        </TextWrapper>
        {/* counter */}
        <Counter>
          <div className="items">
            {NumberFormat(account.itemCount) || 0}개의 아이템</div>
          <div className="v-line" />
          <div className="likes">{/*♥*/}
            <Icon className="heart" size="small" color="red" />{NumberFormat(account.likeCount) || 0}</div>
        </Counter>
      </Wrapper>
    );
  }
}

export default Account;

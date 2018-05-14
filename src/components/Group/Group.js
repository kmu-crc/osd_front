import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import eximg from "../../source/eximg.jpeg";
import { Grid, Icon } from "semantic-ui-react";

// css styling

const Groupli = styled.li`
  width: 90%;
  height: 140px;
  margin: 0 auto 30px;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
  font-size: 13px;
  &:hover {
    border-bottom: 0.5px solid dimgray;
  }
`;

const GroupImg = styled.div`
  float: left;
  width: 15%;
  height: 100%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const GroupInfo = styled.div`
  width: 45%;
  float: left;
  padding: 10px 20px;
  & .title {
    margin: 5px 0;
    font-size: 18px;
    font-weight: bold;
  }
  & .date {
    color: dimgray;
    font-weight: 400;
    font-size: 12px;
  }
  & .owner {
    float: left;
  }
  & .owner span {
    margin-right: 15px;
  }
`;

const Count = styled.div`
  float: right;
  & div {
    float: left;
    width: 40px;
    color: grey;
  }
  & .clear {
    clear: both;
    display: block;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 10px;
  & button {
    font-size: 12px;
    padding: 4px 15px;
    margin-right: 10px;
  }
`;

const ThumbImg = styled.div`
  width: 40%;
  height: 100%;
  float: left;
  & .imgBox {
    float: left;
    width: 30%;
    height: 120px;
    background-color: #f2f2f2;
    margin: 10px 5px;
  }
  & p {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 60px;
  }
`;


class Group extends Component {
  render(){
    let group = this.props.group;
    return(
      <NavLink to={"/groupDetail/"+group.uid}>
        <Groupli>
          <GroupImg>
            <img src={eximg} alt=""/>
          </GroupImg>
          <GroupInfo>
            <div className="date">{(group.create_time).split("T")[0]} 개설</div>
            <div className="title">{group.title}</div>
            <div className="owner">
              <span>그룹장: {group.userName}</span>
              <span>멤버수 : {group.member? group.member : 0}</span>
            </div>
            <Count>
              <div>
                <Icon name="heart" color="grey" size="mini"></Icon>
                {group.like? group.like : 0}
              </div>
              <div>
                <Icon name="signup" color="grey" size="mini"></Icon>
                {group.design? group.design : 0}
              </div>
              <div>
                <Icon name="window restore" color="grey" size="mini"></Icon>
                0
              </div>
              <div className="clear"></div>
            </Count>
            <div className="clear"></div>
            <ButtonWrap>
              <button className="red">가입신청</button>
              <button className="red">관리</button>
            </ButtonWrap>
          </GroupInfo>
          {group.designTop3.length > 0 ? 
            <ThumbImg>
            {group.designTop3.map(design => 
              <div className="imgBox" key={design.uid}><img src={design.s_img} alt=""/></div>
            )}
            <div className="clear"></div>
            </ThumbImg>
            :
            <ThumbImg><p>등록된 디자인이 없습니다.</p></ThumbImg>
          }
          <div className="clear"></div>
        </Groupli>
      </NavLink>
    );
  }
}

export default Group;

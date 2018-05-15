import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import eximg from "../../source/eximg.jpeg";
import { Grid, Icon } from "semantic-ui-react";

// css styling

const Groupli = styled.li`
  width: 100%;
  height: 160px;
  margin: 0 auto 15px;
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
  width: 140px;
  height: 140px;
  border-radius: 50% 50%;
  margin: 10px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const GroupInfo = styled.div`
  width: 45%;
  height: 100%;
  float: left;
  padding: 10px 20px;
  position: relative;
  & .title {
    margin: 10px 0;
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

const SubWrap = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
`;

const Count = styled.div`
  float: left;
  & div {
    float: left;
    width: 40px;
    color: black;
    margin-right: 3px;
  }
  & .clear {
    clear: both;
    display: block;
  }
`;

const ButtonWrap = styled.div`
  float: left;
  & button {
    font-size: 12px;
    padding: 4px 15px;
    margin-right: 10px;
  }
`;

const ThumbImg = styled.div`
  width: 40%;
  height: 100%;
  float: right;
  & .imgBox {
    float: right;
    width: 30%;
    height: 140px;
    background-color: #f2f2f2;
    margin: 10px 10px 10px 0px;
  }
  & p {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 60px;
  }
`;


class Group extends Component {
  refresh = (e) => {
    Component.forceUpdate();
  }
  render(){
    let group = this.props.group;
    let user = this.props.user;
    return(
      <NavLink to={"/groupDetail/"+group.uid} onClick={this.refresh}>
        <Groupli>
          <GroupImg>
            <img src={eximg} alt=""/>
          </GroupImg>
          <GroupInfo>
            <div className="date">{(group.create_time).split("T")[0]} 개설</div>
            <div className="title">{group.title}</div>
            <div className="owner">
              <span>그룹장: {group.userName}</span>
            </div>
            <div className="clear"></div>
            <SubWrap>
              <ButtonWrap>
                { (user != null && user.uid !== group.user_id) && <button className="red">가입신청</button> }
                { (user != null && user.uid === group.user_id ) && <button className="red">관리</button> }
              </ButtonWrap>
              <Count>
                <div>
                  <Icon name="heart" color="black" size="mini"></Icon>
                  {group.like? group.like : 0}
                </div>
                <div>
                  <Icon name="signup" color="black" size="mini"></Icon>
                  {group.design? group.design : 0}
                </div>
                <div>
                  <Icon name="window restore" color="black" size="mini"></Icon>
                  0
                </div>
                <div className="clear"></div>
              </Count>
            </SubWrap>
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

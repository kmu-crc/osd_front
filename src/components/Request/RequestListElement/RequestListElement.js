import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import profile from "source/thumbnail.png";
// import { Icon } from "semantic-ui-react";
// import StyleGuide from "StyleGuide";
// import TextFormat from "modules/TextFormat";
import NumberFormat from "modules/NumberFormat";
import DateFormat from "modules/DateFormat";

// CSS STYLING
const ListElement = styled.div`
  width: 100%;
  margin: 0 auto 0.9rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: flex;
  fiex-direction: row;
  cursor: default;
  .status-box{
    width: max-content;
    height: 25px;
    line-height: 15px;
    font-family: Noto Sans KR;
    font-weight: 500;
    padding: 3px 5px 2px 5px;
    border-radius: 15px;
    margin-right: 5px;
    &.request {
      background: hotpink;
      color: white;
    }
    &.estimate {
      margin-left: 35px;
      background: blue;
      color: white;
    }
  }
`;
const ThumbnailWriter = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-size: cover;
  background-image: url(${props => props.src ? props.src.m_img : profile});
`;

class DesignerBoardElement extends Component {
  render() {
    const item = this.props.data;
    console.log("item:", item);
    // const Element = () =>

    return (
      <NavLink to={"/requestDetail/" + item.uid}>
        <ListElement>
          {/* no.*/}
          {/* <div style={{ marginRight: "15px" }}>{item.uid}</div> */}
          {/* title */}
          <div style={{ marginRight: "15px", display: "flex", flexDirection: "row" }}>
            {item.status === "request"
              ? <div className="status-box request">의뢰</div>
              : item.status === "estimate" ?
                <div className="status-box estimate">견적</div> : " "}

            {item.title || "글 제목"}</div>
          {/* writer */}
          <div style={{ marginLeft: "auto", marginRight: "15px", display: "flex" }}>
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          {/* date */}
          <div style={{ marginRight: "15px" }}>{DateFormat(item.create_time)}</div>
          {/* view */}
          <div style={{ marginRight: "15px" }}>{NumberFormat(item.views || 0)}</div>
          {/* like */}
          <div style={{ marginRight: "15px" }}>{NumberFormat(item.likes || 0)}</div>
        </ListElement>
      </NavLink>

      // item.private === 0 ?
      // <Element />
      // : <Element />
    );
  }
}
// uid: 1
// client_id: 1
// expert_id: null
// title: "zxcv"
// category_level1: 2
// category_level2: 3
// tag: "zxcv,qwer,asdf"
// price: 123
// content: "adsfkjhfk"
// amount: null
// location: "a;lsfk"
// type: "designer"
// resale: null
// ownership: "1"
// offline_consultation: "0"
// status: "request"
// group_id: 1
// sort_in_group: 0
// nick_name: "develop"

export default DesignerBoardElement;

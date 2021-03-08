import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import profile from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
// import { Icon } from "semantic-ui-react";
// import StyleGuide from "StyleGuide";
// import TextFormat from "modules/TextFormat";
// import NumberFormat from "modules/NumberFormat";
// import { Icon } from "semantic-ui-react";
import market_style from "market_style";

// CSS STYLING
const ListElement = styled.div`
  margin: 0 auto 0.9rem;
  // margin-left: ${props => props.left || 0}px;
  font-size:${market_style.font.size.small1};
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
  // width:100%;
  .non-status-box{
    margin-left:5px;
  }
  .status-box{
    min-width: 80px;
    line-height: 15px;
    font-family: Noto Sans KR;
    font-weight: 500;
    padding: 7px 15px 7px 15px;
    border-radius: 15px;
    margin-right: 10px;
    display:flex;
    justify-content:center;
    align-itmes:center;
    &.request {
      background: hotpink;
      color: white;
    }
    &.response {
      // margin-left: 5px;
      background: blue;
      color: white;
    }
    &.completed {
      background: gray;
      color: white;
    }
  }
  .title_{
    min-width:67%;
    display:flex;
    align-items:center;
    padding:5px;
    cursor:pointer;
  }
  .writer{
    min-width:10%;
    display:flex;
    align-items:center;
    padding:5px;
    overflow:hidden;
    cursor:pointer;
  }
  .date{
    min-width:20%;
    display:flex;
    align-items:center;
    padding:5px;
    overflow:hidden;
  }
`;
const ThumbnailWriter = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-size: contain;
  background-image: url(${props => props.src ? props.src : profile});
  margin-right:10px;
`;

class PaymentListElement extends Component {
  render() {
    const item = this.props.data;
    console.log("item:", item);
    // const Element = () =>
    
    return (
      // <NavLink to={"/productPurchase/" +item.item_id+"/"+ item.uid}>
        <ListElement left={item.status === "response" ? 25 : 0}>
          <NavLink to={"/productPurchase/" +item.item_id+"/"+ item.uid} className="title_" style={{  display: "flex", flexDirection: "row" }}>
            {item.payment_title || "글 제목"}
          </NavLink>
          {
            item.status==="response"?
            <div className="writer">
              <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.s_img} /></div>
              <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          :
          <div className="writer">
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.s_img} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          }
          
          {/* date */}
          <div className="date">{DateFormat(item.create_time)}</div>
        </ListElement>
      // </NavLink>
    );
  }
}
export default PaymentListElement;

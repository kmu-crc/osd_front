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
  width:100%;
  height:38px;
  border:1px solid #EFEFEF;
  margin-bottom:10px;
  display:flex;
  align-items:center;
  padding-left:50px;
  padding-right:50px;
  .title_{
    width:80%;
    min-width:max-content;
    font-family:Noto Sans KR,Bold;
    font-size:15px;
  }
  .writer_{
    width:15%;
    min-width:max-content;
    margin-right:5%;
    font-family:Noto Sans KR,Medium;
    font-size:13px;
    display:flex;
  }
  .date{
    width:5%;
    min-width:max-content;
    font-family:Noto Sans KR,Medium;
    font-size:13px;
  }
  @media only screen and (min-width: 500px) and (max-width: 740px) {
    padding-left:20px;
    padding-right:20px;
  }
`;
const ThumbnailWriter = styled.div`
  width: 23px;
  height: 23px;
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
            <div className="writer_">
              <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.s_img} /></div>
              <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          :
          <div className="writer_">
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

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import profile from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import reicon from "source/arrow_rere.png";
import market_style from "market_style";
import arrow from "source/arrow_reply.svg";
const Content = styled.div`
  width:100%;
  border-bottom:1px solid #eaeaea;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:8px 10px;
  .title{
    width:60%;
    min-width:60px;
    font-size:${market_style.font.size.small1};
    font-weight:500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:black;
    margin-right:5%;
  }
  .reply{
    min-width:max-content;
    color:#C1C1C1;
    margin-right:10px;
    font-weight:500;
  }
  .reply_icon{
    padding-bottom:5px;
    margin-right:7px;
  }
  .sub{
    min-width:151px;
    display:flex;
    align-items:center;
    .writer{
      margin-left:5px;
      width:60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size:${market_style.font.size.mini2};
    }
    .date{
      width:40px;
      margin-left:14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size:${market_style.font.size.mini2};
    }
  }
`
const ThumbnailWriter = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-size: contain;
  background-image: url(${props => props.src ? props.src : profile});
  margin-right:10px;
`;
class RequestListElement_mobile extends Component {
  render() {
    const item = this.props.data;
    const userLink = this.props.type=="designer"?"/designerDetail/"+item.uid
                    :this.props.type=="maker"?"/makerDetail/"+item.uid
                    :this.props.type=="payment"?"/productPurchase/"+item.item_id+"/"+item.uid
                    :this.props.type=="request"?"/requestDetail/"+item.uid
                    :null;
    console.log(userLink)
    return (
      <React.Fragment>
        <Link  style={{  display: "flex", flexDirection: "row" }} to={userLink}>
        <Content>
          {
            item.status == "request"?
            <div className="reply">{item.type=="designer"?"디자인":"제작"}의뢰</div>
            :
            item.status == "response"?
            <React.Fragment>
            <img className="reply_icon" src={arrow}/>
            <div className="reply">{item.type=="designer"?"디자인":"제작"}응답</div> 
            </React.Fragment>
            :null  
          }
          <div className="title">{item.title||item.payment_title || "글 제목"}</div>
          <div className="sub">
            <ThumbnailWriter src={item.imgURL||item.s_img} />
            <div className="writer">{item.nick_name}</div>
            <div className="date">{DateFormat(item.create_time)}</div>
          </div>
        </Content>
        </Link>
      </React.Fragment>
    );
  }
}

export default RequestListElement_mobile;
{/* <ListElement left={item.status === "response" ? 25 : 0}>
<NavLink  className="title_" style={{  display: "flex", flexDirection: "row" }} to={"/requestDetail/" + item.uid}>
{item.completed === 1 && item.status === "request" ?
  <div className="status-box_wrapper"><div className="status-box completed" >완료</div></div> : null}
{item.status === "normal"
  ? <div className="non-status-box"/>
  : item.status === "request"
    ? <div className="status-box_wrapper"><div className="status-box request">{item.type === 'maker' ? '제작' : '디자인'} 의뢰</div></div>
    : item.status === "response" ?
      <React.Fragment>
      <div className="status-box_wrapper">
      <CustomIcon width={25} height={25} imgURL={reicon}/>
        <div className="status-box response">
        {item.type === 'maker' ? '제작' : '디자인'} 응답</div></div>
      </React.Fragment>: ""}
      
      <div className="text">{item.title || "글 제목"}</div>
      </NavLink>
{
item.status==="response"?
<NavLink className="response_" to={userLink}>
      <div ><ThumbnailWriter src={item.imgURL} /></div>
      <div className="nick">{item.nick_name}</div>
</NavLink>
:
<div className="writer">
<div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
<div className="nick">{item.nick_name}</div>
</div>
}
<div className="date">{DateFormat(item.create_time)}</div>
</ListElement> */}
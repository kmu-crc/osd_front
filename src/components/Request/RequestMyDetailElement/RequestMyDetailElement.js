import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import profile from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import reicon from "source/re_.svg";
import market_style from "market_style";

// import { Icon } from "semantic-ui-react";
// import StyleGuide from "StyleGuide";
// import TextFormat from "modules/TextFormat";
// import NumberFormat from "modules/NumberFormat";
// import { Icon } from "semantic-ui-react";

const CustomIcon =styled.div`
width:${props => props.width}px;
height:${props => props.height}px;
background-image:url(${props=>props.imgURL});
background-repeat: no-repeat;
background-size: contain;
padding:${props => props.padding}px;
margin-right:${props=>props.marginRight==null?"13":props.marginRight}px;
margin-left:${props=>props.marginLeft==null?"13":props.marginLeft}px;
display:${props=>props.isNon==true?"none":"block"}
`
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
  .non-status-box{
    margin-left:5px;
  }
  .status-box{
    min-width: 80px;
    line-height: 15px;
    font-family: Noto Sans KR;
    font-weight: 500;
    padding: 4px 18px 4px 18px;
    border-radius: 15px;
    margin-right: 10px;
    display:flex;
    justify-content:center;
    align-itmes:center;
    &.request {
      font-size:${market_style.font.size.mini2};
      background: red;
      color: white;
    }
    &.response {
      font-size:${market_style.font.size.mini2};
      border:1px solid #363636;
      color: #363636;
    }
    &.completed {
      font-size:${market_style.font.size.mini2};
      background: gray;
      color: white;
    }
  }
  .title_{
    width:75%;
    font-family:Noto Sans KR,Bold;
    font-size:15px;
    .text{
      cursor:pointer;
    }
  }
  .writer_{
    width:15%;
    font-family:Noto Sans KR,Medium;
    font-size:13px;
    display:flex;
  }
  .response_{
    width:15%;
    display:flex;
    align-items:center;
    overflow:hidden;
    cursor:pointer;
  }
  .date{
    width:10%;
    font-family:Noto Sans KR,Medium;
    font-size:13px;
    text-align:right;
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


class RequestMyDetailElement extends Component {
  render() {
    const item = this.props.data;
    console.log("item:", item);
    // const Element = () =>
    const userLink = item.type=="designer"?"/designerDetail/"+item.expert_id:"/makerDetail/"+item.expert_id;
    console.log(userLink);
    return (
      <React.Fragment>
        <ListElement left={item.status === "response" ? 25 : 0}>
          
          <NavLink  className="title_" style={{  display: "flex", flexDirection: "row"}} to={"/requestDetail/" + item.uid}>
            {item.completed === 1 && item.status === "request" ?
              <div className="status-box completed" >완료</div> : null}
              
            {item.status === "normal"
              ? <div className="non-status-box"/>
              : item.status === "request"
                ? <div className="status-box request">{item.type === 'maker' ? '제작' : '디자인'} 의뢰</div>
                : item.status === "response" ?
                  <React.Fragment>
                  <CustomIcon width={25} height={25} imgURL={reicon}/>
                  <div className="status-box response">
                    {item.type === 'maker' ? '제작' : '디자인'} 응답</div> 
                  </React.Fragment>: ""}
                  
                  <div className="text">{item.title || "글 제목"}</div>
            </NavLink>
          {
            item.status==="response"?
            <NavLink className="response_" to={userLink}>
                  <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
                  <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
            </NavLink>
          :
          <div className="writer_">
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          }
          <div className="date">{DateFormat(item.create_time)}</div>
        </ListElement>
      </React.Fragment>
    );
  }
}
export default RequestMyDetailElement;

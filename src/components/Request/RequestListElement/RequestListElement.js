import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import profile from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import reicon from "source/arrow_rere.png";
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
margin-right:${props=>props.marginRight==null?"10":props.marginRight}px;
margin-left:${props=>props.marginLeft==null?"0":props.marginLeft}px;
display:${props=>props.isNon==true?"none":"block"}
`

// CSS STYLING
const ListElement = styled.div`
  width:100%;
  height:36px;
  border: 1px solid #eaeaea;
  margin-top:10px;
  padding:6px 54px 6px 54px;
  display:flex;
  .non-status-box{
    margin-left:5px;
  }
  .status-box_wrapper{
    display:flex;
    width:158px;
  }
  .status-box{
    width:max-content;
    padding:3px 18px 2px 18px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:18px;
    font-size:${market_style.font.size.mini2};
    &.request {
      background: red;
      color: white;
    }
    &.response {
      // margin-left: 5px;
      border:1px solid #FF0000;
      color: #363636;
    }
    &.completed {
      background: gray;
      color: white;
    }
  }
  .title_{
    min-width:83%;
    display:flex;
    align-items:center;
    padding:5px;
    font-weight:700;
    color:black;
    font-size:${market_style.font.size.small1};
    .text{
      cursor:pointer;
    }
  }
  .writer{
    min-width:12%;
    display:flex;
    align-items:center;
    overflow:hidden;
  }
  .response_{
    min-width:12%;
    display:flex;
    align-items:center;
    overflow:hidden;
    cursor:pointer;
  }
  .date{
    min-width:3%;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:5px;
    overflow:hidden;
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

class DesignerBoardElement extends Component {
  render() {
    const item = this.props.data;
    console.log("item:", item);
    // const Element = () =>
    const userLink = item.type=="designer"?"/designerDetail/"+item.expert_id:"/makerDetail/"+item.expert_id;
    console.log(userLink);
    return (
      <React.Fragment>
        <ListElement left={item.status === "response" ? 25 : 0}>
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
          {/* </div> */}
                  </NavLink>
          {/* writer */}
          {/* {item.status === "normal"
          ?
          <div className="writer">
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          : item.status === "request"
          ?
          <div className="writer">
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          : item.status === "response" ?
          <div className="writer">
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          } */}
          {
            item.status==="response"?
            <NavLink className="response_" to={userLink}>
                  <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
                  <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
            </NavLink>
          :
          <div className="writer">
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          }
          
          {/* date */}
          <div className="date">{DateFormat(item.create_time)}</div>
          {/* view */}
          {/* <div style={{ marginRight: "15px" }}>{NumberFormat(item.views || 0)}</div> */}
          {/* like */}
          {/* <div style={{ marginRight: "15px" }}>{NumberFormat(item.likes || 0)}</div> */}
        </ListElement>
      {/* // </NavLink> */}
      </React.Fragment>
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

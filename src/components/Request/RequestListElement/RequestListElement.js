import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import profile from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import reicon from "source/re_.svg";
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
  margin: 0 auto 0.9rem;
  // margin-left: ${props => props.left || 0}px;
  font-size: 15px;
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
      background: red;
      color: white;
    }
    &.response {
      // margin-left: 5px;
      border:1px solid #363636;
      color: #363636;
    }
    &.completed {
      background: gray;
      color: white;
    }
  }
  .title_{
    min-width:77%;
    display:flex;
    align-items:center;
    padding:5px;
    padding-left:27px;
    .text{
      cursor:pointer;
    }
  }
  .writer{
    min-width:10%;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
  }
  .response_{
    min-width:10%;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    cursor:pointer;
  }
  .date{
    min-width:10%;
    display:flex;
    justify-content:center;
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

class DesignerBoardElement extends Component {
  render() {
    const item = this.props.data;
    console.log("item:", item);
    // const Element = () =>
    const userLink = item.type=="designer"?"/designerDetail/"+item.expert_id:"/makerDetail/"+item.expert_id;
    console.log(userLink);
    return (
      <React.Fragment>
      {/* // <NavLink to={"/requestDetail/" + item.uid}> */}
        <ListElement left={item.status === "response" ? 25 : 0}>
        <NavLink  className="title_" style={{  display: "flex", flexDirection: "row" }} to={"/requestDetail/" + item.uid}>
          {/* <div className="title_" style={{  display: "flex", flexDirection: "row" }}> */}
            {item.completed === 1 && item.status === "request" ?
              <div className="status-box completed" >완료</div> : null}
              
            {item.status === "normal"
              ? <div className="non-status-box"/>
              // <div className="status-box"></div>
              : item.status === "request"
                ? <div className="status-box request">{item.type === 'maker' ? '제작' : '디자인'} 의뢰</div>
                : item.status === "response" ?
                  <React.Fragment>
                  <CustomIcon width={25} height={25} imgURL={reicon}/>
                  <div className="status-box response">
                    {item.type === 'maker' ? '제작' : '디자인'} 응답</div> 
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

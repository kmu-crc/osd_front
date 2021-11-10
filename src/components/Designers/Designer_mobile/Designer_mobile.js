import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/thumbnail.png"

import iForked from "source/baseline_library_books_black_48dp.png"
import iForkedWhite from "source/baseline_library_books_white_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import iThumbUpWhite from "source/thumbup_icon_white.png"
import IconView from "source/IconView"

//formats
import NumberFormat from "modules/NumberFormat"
import TextFormat from "modules/TextFormat"
import DateFormat from "modules/DateFormat"

import { geturl } from "config"
import opendesign_css from "opendesign_style";
import Icon from '@material-ui/core/Icon';

const DesignerCard = styled.div`
  width:335px;
  height:124px;
  max-width:335px;
  height:124px;
  display:flex;
  align-items:center;
  .thumbnail{
    width:124px;
    height:124px;
    min-width:124px;
    min-height:124px;
    border-radius:50%;
    border:1px solid #7a7a7a;
    position:absolute;
    background-color:white;
    background-image:url(${props=>props.url});
    background-size:contain;
    background-position:center;
  }
  .info{
    width:100%;
    height:100px;
    border-radius:12px;
    display:flex;
    .blankBox{min-width:62px;height:100%;}
    .contentBox{
      // *{font-family:Spoqa Han Sans Neo;}
      width:100%;
      height:100%;
      background-color:#7a7a7a;
      border-radius:12px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;

      padding:10px 10px 10px 67px;
      .topBox{
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
        .nickname{ font-size:12px; font-weight:500; color:white; }
        .update{ font-size:10px; font-weight:300; color:white; }
      }
      .description{
        width:100%;
        min-height:40px;
  
        font-size:10px;
        color:white;
        line-height:18px;
        overflow:hidden;
        text-overflow: ellipsis; 
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 라인수 */	
        -webkit-box-orient: vertical; 
        word-wrap:break-word;
        }
        .bottomBox{
          .count{
            display:flex;
            align-items:center;
            margin-top:4px;
            color:white;
            .wrap{height:20px;display:flex;align-items:center;font-size:9px;margin-right:5px;}
            .icon{width:13px;height:13px;opacity:0.5;margin-right:3px;margin-left:3px;}  
            
          }
        }
    }
  }
`

//styled

class Designer_mobile extends Component {
  state = { data: this.props.data };

  gotoDesignerDetailPage = (where, event) => {
    const id = event.target.id
    if (id === "") {
      window.location.href = geturl() + `/designerDetail/${where}`;
    }
  }
  render() {
    // console.log(this.state.data);
    const designer = this.state.data;
    const tiny = window.innerWidth <= opendesign_css.resolutions.SmallMaxWidth;
    const img = (designer && designer.imgURL != null) ? designer.imgURL.l_img : noimg;

    return (<React.Fragment>
        <DesignerCard url={img} onClick={event => this.gotoDesignerDetailPage(designer.uid, event)}>
          <div className="thumbnail"/>
          <div className="info">
            <div className="blankBox"/>
            <div className="contentBox">
                <div className="topBox">
                  <div className="nickname"><TextFormat tip width="100%" txt={designer.nick_name} single /></div>
                  <div className="update">{DateFormat(designer.update_time)}</div>
                </div>
                <div className="description">{designer.about_me}</div>
                <div className="bottomBox">
                    <div className="count">
                        <div className="wrap">
                          <Icon style={{ fontSize: "10px", color:"white" }}>visibility</Icon>
                          {NumberFormat(designer.total_view == null ? 0 : designer.total_view)}         
                        </div>
                        <div className="wrap">
                          <Icon style={{ fontSize: "10px", color:"white" }}>favorite_border</Icon>
                          {NumberFormat(designer.total_like == null ? 0 : designer.total_like)}
                        </div>
                        <div className="wrap">
                          <Icon style={{ fontSize: "10px", color:"white" }}>share</Icon>
                          {NumberFormat(designer.total_group == null || designer.total_design == null ? 0 : designer.total_group + designer.total_design)}
                        </div>
                      {/* <IconView width="6px" height="6px" fill="white" />
                      <div className="text">{NumberFormat(designer.total_view == null ? 0 : designer.total_view)}</div>
                      <img className="icon" alt="icon" src={iThumbUpWhite} />
                      <div className="text">{NumberFormat(designer.total_like == null ? 0 : designer.total_like)}</div>
                      <img className="icon" alt="icon" src={iForkedWhite} />
                      <div className="text">{NumberFormat(designer.total_group == null || designer.total_design == null ? 0 : designer.total_group + designer.total_design)}</div> */}
                    </div>
                </div>
            </div>
          </div>
        </DesignerCard>
      </React.Fragment>)
  }
}
export default Designer_mobile
// {tiny ?
//   <DesignerTiny img={img} onClick={event => this.gotoDesignerDetailPage(designer.uid, event)}>
//     <div className="innerbox">
//       <div className="design-title">
//         <TextFormat tip width="100%" txt={designer.nick_name} single />
//       </div>
//       <div className="user-update-wrapper">
//         <div style={{ width: "max-content" }}>
//           {DateFormat(designer.update_time)}
//         </div>
//       </div>
//     </div>
//     <div className="counter">
//       <div className="view-count">
//         <IconView width="22px" height="11px" fill="#FFFFFF" opacity="1" />
//         {NumberFormat(designer.total_view)}
//       </div>
//       <div className="like-count">
//         <img alt="icon" src={iThumbUpWhite} />
//         {NumberFormat(designer.total_like)}
//       </div>
//       <div className="fork-count">
//         <img alt="icon" src={iForkedWhite} />
//         {NumberFormat(designer.total_design || 0 + designer.total_group || 0)}
//       </div>
//     </div>
//   </DesignerTiny>
//   :
//   <DesignerComp img={img} onClick={(event) => this.gotoDesignerDetailPage(designer.uid, event)}>
//     <div className="ImageBox" />
//     <div className="TextBox">
//       <div className="userName">
//         <TextFormat txt={designer.nick_name} width={"max-content"} /></div>
//       <div className="description">
//         <TextFormat height={30} txt={designer.about_me} backgroundColor="#EFEFEF" width={"max-content"} /></div>
//       <div className="update">
//         {DateFormat(designer.update_time)}</div>
//       <div className="cate">
//         {designer.level3_name || designer.level2_name || designer.level1_name || "전체"}</div>
//       <div className="counter">
//         <div className="view">
//           <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
//           <div className="text">{NumberFormat(designer.total_view == null ? 0 : designer.total_view)}</div>
//         </div>
//         <div className="like" >
//           <div><img alt="icon" src={iThumbUp} /></div>
//           <div className="text">{NumberFormat(designer.total_like == null ? 0 : designer.total_like)}</div>
//         </div>
//         <div className="child">
//           <div><img alt="icon" src={iForked} /></div>
//           <div className="text">{NumberFormat(designer.total_group == null || designer.total_design == null ? 0 : designer.total_group + designer.total_design)}</div>
//         </div>
//       </div>
//     </div>
//   </DesignerComp>
// }




// const DesignerComp = styled.div`
//     width: 587px;
//     height: 150px;
//     font-family: Noto Sans KR;
//     cursor: pointer;

//     *{
//       cursor:pointer;
//     }

//     .ImageBox{
//       position: absolute;
//       width: 150px;
//       height: 150px;
//       border-radius: 50%;
//       border: 1.5px solid #EFEFEF;
//       background-color: #D6D6D6;
//       background-size: cover;
//       cursor: cursor;
//       z-index: 1;

//       background-image: url(${prop => prop.img});
//       background-position: center;
//       background-size: cover;
//     }
//     .TextBox{
//       width: 500px;
//       height: 130px;
//       position: relative;
//       background-color: #EFEFEF;
//       border-radius: 15px 15px 15px 15px;
//       left: 65px;
//       top: 8px;
//     }
//     .userName{
//       top: 19px;
//       left: 114px;
//       position: absolute;
//       max-width: 300px;
//       color: #707070;
//       font-size: 20px;
//       font-weight: bold;
//       background-color: #EFEFEF;
//     }
//     .update{
//       top: 20px;
//       right: 22px;
//       position: absolute;
//       width: 75px;
//       color: #707070;
//       font-size: 15px;
//       text-align: right;
//       font-weight: light;
//       background-color: #EFEFEF;
//     }
//     .description{
//       top: 56px;
//       left: 114px;
//       position: absolute;
//       max-width: 350px;
//       line-height: 20px;
//       overflow: hidden;
//       color: #707070;
//       font-size: 20px;
//       font-weight: 100;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       background-color: #EFEFEF;
//     }
//     .cate{
//       position: absolute;
//       top: 95px;
//       right: 22px;
//       height: 30px;
//       max-width: 190px;
//       width: max-content;
//       color: #FF0000;
//       font-weight: 300;
//       font-size: 20px;
//       text-align: right;
//       background-color: #EFEFEF;
//     }
//     .counter{
//       position: absolute;
//       top: 0px;
//       left: 0px;
//       display: flex;
//       margin-top: 95px;
//       margin-left: 110px;
//       justify-content: space-start;
//       background-color: #EFEFEF;
//       .view {
//           display: flex;
//           margin-right: 10px;
//           .text {
//               width: 40px;
//               margin-left: 5px;
//               font-size: 15px;
//           }
//       }
//       .like {
//           display: flex;
//           margin-right: 10px;
//           img {
//               width: 15px;
//               height: 15px;
//               opacity: 0.55;
//           }   
//           .text{
//               width: 40px;
//               margin-left: 5px;
//               font-size: 15px;
//           }
//       }
//       .child {
//           display: flex;
//           img {
//               width: 19px;
//               height: 19px;
//               opacity: 0.55;
//           }
//           .text{
//               width: 40px;
//               margin-left: 5px;
//               font-size: 15px;
//           }
//       }
//     }
//     animation: fadein 2s;
//     -moz-animation: fadein 2s; /* Firefox */
//     -webkit-animation: fadein 2s; /* Safari and Chrome */
//     -o-animation: fadein 2s; /* Opera */
//     @keyframes fadein {
//       from {
//           opacity:0;
//       }
//       to {
//           opacity:1;
//       }
//     }
//     @-moz-keyframes fadein { /* Firefox */
//       from {
//           opacity:0;
//       }
//       to {
//           opacity:1;
//       }
//     }
//     @-webkit-keyframes fadein { /* Safari and Chrome */
//       from {
//           opacity:0;
//       }
//       to {
//           opacity:1;
//       }
//     }
//     @-o-keyframes fadein { /* Opera */
//       from {
//           opacity:0;
//       }
//       to {
//           opacity: 1;
//       }
//     }
// `;
// const DesignerTiny = styled.div`
// *{
//     cursor:pointer;
//   }
//   cursor:pointer;
//   position: relative;
//   z-index: 700;
//   width: 330px;
//   height: 330px;
//   border-radius: 15px;
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center center;
//   background-image: url(${props => props.img});
//   color: white;
//   font-size: 20px;
//   font-family: "Noto Sans KR";
//   .cover {
//     z-index: 701;
//     position: absolute;
//     border-radius: 15px;
//     background-image: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(32,32,32, 0.7)100%); 
//     width: 330px;
//     height: 330px;
//   }
//   .categoryName {
//     z-index: 703;
//     position: absolute;
//     margin-left: 180px;
//     margin-top: 285px;
//     width: 130px;
//     height: 40px;
//     color: #FF0000;
//     font-size: 20px;
//     font-weight: 400;
//     text-align: right;
//     text-shadow:2px 2px 6px rgb(80,80,80,1);
//   }
//   .innerbox {
//     z-index: 703;
//     position: absolute;
//     width: 274.08px;
//     color: #FFFFFF;
//     line-height: 40px;
//     height: 35px;
//     font-family: Noto Sans KR;
//     margin-left: 25px;
//     margin-top: 201px;
//     .design-title {
//       font-size: 20px;
//       font-weight: 700;
//       text-shadow:2px 2px 6px gray;
//       display: flex;
//       justify-content: space-between;
//     }
//     .update-time { 
//       margin-top: 5px;
//       font-weight: 300;
//       border: 1px solid red;
//       width: max-content;
//       height: 25px;
//       font-size: 17px;
//       font-family: Noto Sans KR;
//       text-shadow:2px 2px 6px gray;
//       line-height: 25px;
//       text-align: right;
//     }
//     .user-name {
//       font-size: 20px;
//       font-weight: 300;
//       text-shadow:2px 2px 6px gray;
//     }  
//     .user-update-wrapper {
//       width: 285px;
//       display: flex;
//       justify-content: space-between;
//       text-shadow: 2px 2px 2px gray;
//     }
//   }

//   .counter {
//     z-index: 703;
//     position: absolute;
//     left: 24.92px;
//     top: 286px;
//     display: flex;
//     justify-content: space-start;
//     width: 291px;
//     height: 22px;
//     text-align: left;
//     line-height: 40px;
//     font-size: 15px;
//     font-weight: 500;
//     align-items: center;
//   }
//   .view {
//     z-index: 703;
//     margin-right: 4.25px;
//   }
//   .view-count {
//     z-index: 703;
//     margin-right: 6px;
//     text-shadow: 2px 2px 2px gray;
//   }
//   .like {
//     z-index: 703;
//     margin-right: 4px;
//      img{
//       width: 13px;
//       height: 13px;
//     }
//   } 
//   .like-count {
//     z-index: 703;
//     margin-right: 6px;
//     text-shadow: 2px 2px 2px gray;
//     img{
//         width: 15px;
//         height: 15px;
//     }
//   }
//   .fork {
//     z-index: 703;
//     margin-right: 4px;
//     img {
//       width: 22px;
//       height: 11px;
//     }
//   }
//   .fork-count {
//     z-index: 703;
//     margin-right: 0px;
//     text-shadow: 2px 2px 2px gray;
//     img {
//       width: 15px;
//       height: 15px;
//     }
//   }
// `;
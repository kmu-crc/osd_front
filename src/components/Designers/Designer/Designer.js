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
import new_logo_view from "source/new_logo_view.svg";
import new_logo_favorite from "source/new_logo_favorite.svg";
import new_logo_share from "source/new_logo_share.svg";
import new_logo_note from "source/new_logo_note.svg";
import new_logo_heart_red from "source/new_logo_heart_red.svg";

//styled
const Designer_card = styled.div`
  width:252px;
  height:390px;
  box-shadow: 8px 8px 8px #0000002B;
  cursor:pointer;
  display:flex;
  flex-direction:column;
  .thumbnailBox{
    display:flex;
    justify-content:center;
  }
  .thumbnail{
    min-width:232px;
    min-height:232px;
    max-width:232px;
    max-height:232px;
    border-radius:50%;
    object-fit:cover;
    border:1px solid #eaeaea;

  }
  .wrap_{width:100%;}
  .title{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:19px;
  }
  .content_{
    width:100%;
    .updateTime{
      width:100%;
      height:15px;
      font-size:10px;

    }
    .about_me{
      margin-top:5px;
      line-height:10px;
      font-size:10px;
      height:20px;
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2; 
      -webkit-box-orient: vertical;
    }
  }
  .ellipsis{
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  .infoBox{
    width:100%;
    // height:148px;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding:8px 12px 12px 12px;
  }
  .
  .designer_name{
    width:180px;
    height:27px;
    font-size:18px;
    font-family:SpoqaHanSans;
    font-weight:bold;
    font-weight:500;
    color:#000000;
  }
  .category_name{
    font-size:10px;
    font-family:SpoqaHanSans;
    color:#777777;
  }
  .spaceBetween{
    width:100%;
    display:flex;
    justify-content:space-between;
  }
  .marginTop{margin-top:12px;}  
  .item_count{
    font-size:12px;
    font-family:SpoqaHanSans;
    color:#454545;
  }
  .like_count{
    font-size:12px;
    font-family:SpoqaHanSans;
    font-weight:400;
    color:#454545;
  }

  .counter{
      width:100%;
      display:flex;
      align-items:center;
      .icon{
        width:20px;
        height:20px;
        object-fit:cover;
        margin-right:6px;
      }
      .text{
        width:36px;
        text-align:left;
        font-size:16px;
        margin-right:20px;
        font-family:SpoqaHanSans;
        font-weight:Regular;
        text-align:right;
      }
  }
`

class Designer extends Component {
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

    return (
    <React.Fragment>
      <Designer_card onClick={event => this.gotoDesignerDetailPage(designer.uid, event)}>
        <img src={img} className="thumbnail"/>
          <div className="infoBox">
          <div className="wrap_">
            <div className="title">
              <div className="designer_name ellipsis">{designer.nick_name}</div>
              <div className="category_name">{designer.level3_name || designer.level2_name || designer.level1_name || "전체"}</div>
            </div>
            <div className="content_">
              <div className="updateTime">{DateFormat(designer.update_time)}</div>
              <div className="about_me">{designer.about_me}</div>
            </div>
          </div>
          {/* <div className="spaceBetween marginTop">
            <div className="item_count">{NumberFormat(designer.total_design || 0 + designer.total_group || 0)}개의 디자인</div>
            <div className="like_count">♡ {NumberFormat(designer.total_like)}</div>
          </div> */}
          <div className="counter">
                <img className="icon" src={new_logo_view}/>
                <div className="text">{NumberFormat(designer.total_view == null ? 0 : designer.total_view)}</div>
                <img className="icon" src={new_logo_heart_red}/>
                <div className="text">{NumberFormat(designer.total_like == null ? 0 : designer.total_like)}</div>
                <img className="icon" src={new_logo_share}/>
                <div className="text">{NumberFormat(designer.total_group == null || designer.total_design == null ? 0 : designer.total_group + designer.total_design)}</div>
          </div>
        </div>
      </Designer_card>
    </React.Fragment>)
  }
}
export default Designer
{/* <Designer_card onClick={event => this.gotoDesignerDetailPage(designer.uid, event)}>
<div className="thumbnailBox">
  <img src={img} className="thumbnail"/>
</div>
<div className="infoBox">
  <div className="designer_name">{designer.nick_name}</div>
  <div className="category_name">{designer.level3_name || designer.level2_name || designer.level1_name || "전체"}</div>
  <div className="spaceBetween marginTop">
    <div className="item_count">{NumberFormat(designer.total_design || 0 + designer.total_group || 0)}개의 디자인</div>
    <div className="like_count">♡ {NumberFormat(designer.total_like)}</div>
  </div>
</div>
</Designer_card> */}
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
//         <TextFormat txt={designer.about_me} backgroundColor="#EFEFEF" width={"max-content"} /></div>
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
//       width: 527px;
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
//       max-width: 385px;
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
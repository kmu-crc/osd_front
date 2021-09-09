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
  min-width:252px;
  min-height:390px;
  max-width:252px;
  max-height:390px;
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
    font-family:Spoqa Han Sans;
    font-weight:bold;
    font-weight:500;
    color:#000000;
  }
  .category_name{
    font-size:10px;
    font-family:Spoqa Han Sans;
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
    font-family:Spoqa Han Sans;
    color:#454545;
  }
  .like_count{
    font-size:12px;
    font-family:Spoqa Han Sans;
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
        font-family:Spoqa Han Sans;
        font-weight:Regular;
        text-align:right;
      }
  }
`

class MyDesigner extends Component {
  state = { data: this.props.data };

  gotoDesignerDetailPage = (where, event) => {
    const id = event.target.id
    if (id === "") {
      window.location.href = geturl() + `/designerDetail/${where}`;
    }
  }
  render() {
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
export default MyDesigner
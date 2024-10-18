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
    background-image:url(${props => props.url});
    background-size:cover;
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
      // window.location.href = geturl() + `/designerDetail/${where}`;
      window.location.href = `/designerDetail/${where}`;
    }
  }
  render() {
    // console.log(this.state.data);
    const designer = this.state.data;
    const tiny = window.innerWidth <= opendesign_css.resolutions.SmallMaxWidth;
    const img = (designer && designer.imgURL != null) ? designer.imgURL.l_img : noimg;

    return (<React.Fragment>
      <DesignerCard url={img} onClick={event => this.gotoDesignerDetailPage(designer.uid, event)}>
        <div className="thumbnail" />
        <div className="info">
          <div className="blankBox" />
          <div className="contentBox">
            <div className="topBox">
              <div className="nickname"><TextFormat tip width="100%" txt={designer.nick_name} single /></div>
              <div className="update">{DateFormat(designer.update_time)}</div>
            </div>
            <div className="description">{designer.about_me}</div>
            <div className="bottomBox">
              <div className="count">
                <div className="wrap">
                  <Icon style={{ fontSize: "10px", color: "white" }}>visibility</Icon>
                  {NumberFormat(designer.total_view == null ? 0 : designer.total_view)}
                </div>
                <div className="wrap">
                  <Icon style={{ fontSize: "10px", color: "white" }}>favorite_border</Icon>
                  {NumberFormat(designer.total_like == null ? 0 : designer.total_like)}
                </div>
                <div className="wrap">
                  <Icon style={{ fontSize: "10px", color: "white" }}>share</Icon>
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

export default Designer_mobile;

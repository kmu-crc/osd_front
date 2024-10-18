  import React, { Component } from 'react';
  import noimg from "source/noimg.png";
  import iForked from "source/baseline_library_books_black_48dp.png"
  import iForkedWhite from "source/baseline_library_books_white_48dp.png"
  import iThumbUp from "source/thumbup_icon_black.png"
  import iThumbUpWhite from "source/thumbup_icon_white.png"
  import IconView from "source/IconView"
  import DateFormat from "modules/DateFormat";
  import TextFormat from "modules/TextFormat";
  import NumberFormat from "modules/NumberFormat";
  import styled from 'styled-components';
  import { geturl } from "config";
  import opendesign_css from "opendesign_style";

  import new_logo_view from "source/new_logo_view.svg";
  import new_logo_favorite from "source/new_logo_favorite.svg";
  import new_logo_share from "source/new_logo_share.svg";
  import new_logo_note from "source/new_logo_note.svg";

  const GroupCard = styled.div`
    width:536px;
    max-height:191px;
    min-height:191px;
    display:flex;
    box-shadow: 8px 8px 8px #4141411A;
    border:1px solid #eaeaea;
    cursor:pointer;
    .title_{
      width:100%;
      max-width:150px;
      height:26px;
      // display:flex;
      align-items:center;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
    }
    .row{
      max-width:190px;
      width:100%;
      height:100%;
    }
    .thumbnail{
      width:193px;
      height:191px;
      object-fit:cover;
      border:1px solid #eaeaea;
    }
    .infoBox{
      width:100%;
      max-width:343px;
      height:100%;
      padding:11px;
    }
    .info_wrapper{
    }
    .summary{
      min-height:140px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .flexEnd{
      display:flex;
      justify-content:flex-end;
    }
    .spacebetween{
      display:flex;
      justify-content:space-between;
      // align-items:center;
    }
    .ellipsis{
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
    }
    .imageBox{
      margin-top:22px;
      min-width:120px;
      max-width:120px;
      height:120px;
      display:flex;
      flex-wrap:wrap;
      .mini_thumbnail{
        width:56px;
        height:56px;
        object-fit:cover;
      }
      .marginRight{margin-right:8px;}
    }
    .asset_wrapper{
      width:100%;
      height:22px;
      display:flex;
      align-items:center;
      .asset_icon{
        width:13px;
        height:13px;
        object-fit:cover;
        margin-right:5px;
      }
      .asset_num{
        font-size:12px;
        font-family:Spoqa Han Sans;
        font-weight:Regular;
        margin-right:13px;
      }
    }
    .fontSize1{font-size:19px;}
    .fontSize2{font-size:10px;}

    .marginTop1{margin-top:8px;}
    .marginTop2{margin-top:78px;}
  `

  class MyGroup extends Component {
    handleGotoDetail = (where, event) => {
      const id = event.target.id
      if (id === "") {
        window.location.href = geturl() + `/groupDetail/${where}`;
      }
    }
    render() {
      const defaultVal = { title: "타이틀", nick_name: "닉네임" };
      const group = this.props.data;
      if (group.title === "") {
        group.title = defaultVal.title;
      }
      if (group.nick_name === undefined) {
        group.nick_name = defaultVal.nick_name;
      }
      var four_child = [null, null, null, null];
      if (group.children) {
        for (var i = 0; i < 4; i++) {
          four_child[i] = group.children[i]
        }
      }
      four_child.reverse();

      const tiny = window.innerWidth <= opendesign_css.resolutions.SmallMaxWidth;
      const img = (group.thumbnailUrl && group.thumbnailUrl.l_img) ? group.thumbnailUrl.l_img : noimg;

      return (
        <React.Fragment>
          <GroupCard onClick={event => this.handleGotoDetail(group.group_id || group.uid, event)}>
            <img src={img} className="thumbnail"/>
            <div className="infoBox">
              <div className="spacebetween">
                <div className="title_ fontSize1 ellipsis">{group.title}</div>
                <div className="fontSize2">{DateFormat(group.child_update_time)}</div>
              </div>
              {/* <div className="spacebetween">
              </div> */}
              <div className="spacebetween flexEnd info_wrapper">
                <div className="summary" >
                    <div className="row fontSize2 ellipsis" style={{height:"20px"}}>{group.explanation}</div>
                    <div>
                    <div className="fontSize2">{group.nick_name}</div>
                    <div className="asset_wrapper">
                      <img src={new_logo_view} className="asset_icon"/>
                      <div className="asset_num">{NumberFormat(group.view || 0)}</div>
                      <img src={new_logo_favorite} className="asset_icon"/>
                      <div className="asset_num">{NumberFormat(group.like || 0)}</div>
                      <img src={new_logo_note} className="asset_icon"/>
                      <div className="asset_num">{NumberFormat(group.design || 0 + group.group || 0)}</div>
                    </div>
                    </div>
                </div>
                <div className="imageBox">
                {four_child.map((child, index) =>
                    <img src={child && child.m_img}
                      className={`mini_thumbnail ${index%2==0?"marginRight":null}`}
                      id={`child-${index}`}
                      key={index} />
                  )}
                  </div>
              </div>
            </div>
          </GroupCard>
        </React.Fragment>
      )
    }
  }
  export default MyGroup

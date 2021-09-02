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
    width:850px;
    height:200px;
    display:flex;
    border:1px solid #eaeaea;
    cursor:pointer;
    background-color:#E0E0E0;
    box-shadow: 8px 8px 8px #4141411A;
    .title_{
      width:100%;
      max-width:200px;
      height:26px;
      align-items:center;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
      margin-bottom:8px;
    }
    .row{
      max-width:647px;
      width:100%;
    }
    .spacebetween{
      width:100%;
      display:flex;
      justify-content:space-between;
    }
    .thumbnail{
      width:193px;
      height:100%;
      object-fit:cover;
      border:1px solid #eaeaea;
    }
    .infoBox{
      width:100%;
      max-width:647px;
      height:120px;
      padding:13px;
    }
    .summary{
      display:flex;
      flex-direction:column;
    }
    .flexEnd{
      height:120px;
      display:flex;
      justify-content:flex-end;
    }
    .info{
      height:147px;
    }
    .vertical{
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .ellipsis{
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
    }
    .bottomWrapper{
      width:100%;
      height:50px;
      display:flex;
      justfiy-content:space-between;
      align-items:flex-end;
      padding-bottom:10px;
    }
    .imageBox{
      width:250px;
      height:50px;
      display:flex;
      justify-content:flex-end;
      .mini_thumbnail{
        width:50px;
        height:50px;
        object-fit:cover;
      }
      .marginLeft{margin-left:11px;}
    }
    .asset_wrapper{
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
        font-family:SpoqaHanSans;
        font-weight:Regular;
        margin-right:13px;
      }
    }
    .fontSize1{font-size:19px;}
    .fontSize2{font-size:10px;}

    .marginTop1{margin-top:8px;}
    .marginTop2{margin-top:78px;}
  `

  class Group extends Component {
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
              <div className="vertical info">
                <div>
                  <div className="row fontSize2 ellipsis">{group.explanation}</div>
                </div>
                <div className="bottomWrapper" style={{display:"flex",justifyContent:"space-between"}}>
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
                  <div className="imageBox">
                          {four_child.map((child, index) =>
                              {
                                return(
                                  child&&
                                  <img src={child && child.m_img}
                                  className="mini_thumbnail marginLeft"
                                  id={`child-${index}`}
                                  key={index} />  
                                )                                
                              }
                            )}
                    </div>
                </div>
                {/* <div className="summary flexEnd">
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
                <div className="imageBox">
                {four_child.map((child, index) =>
                    <img src={child && child.m_img}
                      className={`mini_thumbnail marginRight}`}
                      id={`child-${index}`}
                      key={index} />
                  )}
                  </div> */}
              </div>
            </div>
          </GroupCard>
        </React.Fragment>
      )
    }
  }
  export default Group
  {/* <GroupCard  onClick={event => this.handleGotoDetail(group.group_id || group.uid, event)}>
  <img src={img} className="thumbnail"/>
  <div className="infoBox">
    <div className="group_name">{group.title}</div>
    <div className="category_name">{group.nick_name}</div>
    <div className="spaceBetween marginTop">
      <div className="item_count">{group.view}개의 디자인</div>
      <div className="like_count">♡{group.like}</div>
    </div>
  </div>
  </GroupCard> */}

  // {tiny ?
  //   <GroupTiny img={img} onClick={event => this.handleGotoDetail(group.group_id || group.uid, event)}>
  //     <div className="innerbox">
  //       <div className="design-title">
  //         <TextFormat tip width="100%" txt={group.title} single />
  //       </div>
  //       <div className="user-update-wrapper">
  //         <div style={{ width: "200px" }}>
  //           <TextFormat tip txt={group.nick_name} width="100%" />
  //         </div>
  //         <div style={{ width: "max-content" }}>
  //           {DateFormat(group.child_update_time)}
  //         </div>
  //       </div>
  //     </div>
  //     <div className="counter">
  //       <div className="view-count">
  //         <IconView width="22px" height="11px" fill="#FFFFFF" opacity="1" />
  //         {NumberFormat(group.view)}
  //       </div>
  //       <div className="like-count">
  //         <img alt="icon" src={iThumbUpWhite} />
  //         {NumberFormat(group.like)}
  //       </div>
  //       <div className="fork-count">
  //         <img alt="icon" src={iForkedWhite} />
  //         {NumberFormat(group.design || 0 + group.group || 0)}
  //       </div>
  //     </div>
  //   </GroupTiny>
  //   :
  //   <GroupElement thumbnail={img} >
  //     <div
  //       className="cover"
  //       onClick={event => this.handleGotoDetail(group.group_id || group.uid, event)}>
  //     </div>
  //     <div id="children" className="children">
  //       {four_child.map((child, index) =>
  //         <ChildElement
  //           img={child && child.m_img}
  //           id={`child-${index}`}
  //           key={index} />
  //       )}
  //     </div>
  //     <div className="thumbnail" />
  //     <div>
  //       <div className="text-area">
  //         <div className="title">
  //           <TextFormat id="title" backgroundColor="#EFEFEF" txt={group.title} />
  //           <div id="update" className="update">{DateFormat(group.child_update_time)}</div>
  //         </div>
  //         <div id="description" className="description">
  //           {group.explanation}
  //         </div>
  //         <div id="whosgroup" className="owner">
  //           <TextFormat chars={14} txt={group.userName} id="userName" />님의 그룹</div>
  //       </div>
  //       <div className="icon-and-count">
  //         <div className="view">
  //           <div>
  //             <IconView width="22px" height="11px" fill="#000000" opacity="0.55" />
  //           </div>
  //           <div className="count">
  //             {NumberFormat(group.view || 0)}
  //           </div>
  //         </div>
  //         <div className="like">
  //           <div>
  //             <img alt="icon" src={iThumbUp} />
  //           </div>
  //           <div className="count">
  //             {NumberFormat(group.like || 0)}
  //           </div>
  //         </div>
  //         <div className="child">
  //           <div className="fork-img">
  //             <img alt="icon" src={iForked} />
  //           </div>
  //           <div className="count">
  //             {NumberFormat(group.design || 0 + group.group || 0)}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </GroupElement>
  // }

  // const GroupElement = styled.div`
  //   cursor: pointer;
  //   display: flex;
  //   height: 230px;
  //   width: 902px;
  //   border-radius: 15px;
  //   background-color: #EFEFEF;

  //   .cover {
  //     cursor: pointer;
  //     position: absolute;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 100;
  //   };
  //   .children {
  //     position: absolute;
  //     display: flex;
  //     margin-left: 587px;
  //     margin-top: 137px;
  //     width: 295px;
  //   }
  //   .thumbnail {
  //     border: 2px solid #EFEFEF;
  //     height: 230px;
  //     width: 230px;
  //     border-radius: 15px;
  //     background-color: #D6D6D6;
  //     background-repeat: no-repeat;
  //     background-size: cover;
  //     background-position: center center;
  //     background-image: url(${props => props.thumbnail});
  //   }
  //   .icon-and-count {
  //     background-color: #EFEFEF;
  //     width: 200px;
  //     margin-top: 19px;
  //     margin-left: 17px;
  //     height: 22px;
  //     display: flex;
  //     justify-content: space-start;
  //     text-align: left;
  //     line-height: 40px;
  //     font-size: 15px;
  //     font-weight: 500;
  //     align-items: center;
  //   }
  //   .view {
  //     display: flex;
  //     margin-right: 20px;
  //     .count {
  //       color: #707070;
  //       margin-left: 5px;
  //       width: max-content;
  //       font-size: 15px;
  //     }
  //   }
  //   .child {
  //     display: flex;
  //     .fork-img {
  //         margin-top: 5px;
  //         img {
  //             width: 19px;
  //             height: 19px;
  //             opacity: 0.55;
  //             margin-top: 10px;
  //         }
  //     }
  //     .count {
  //         color: #707070;
  //         margin-left: 5px;
  //         width: max-content;
  //         font-size: 15px;
  //         margin-top: 4px;
  //     }
  //   }
  //   .like {
  //     display: flex;
  //     margin-right: 20px;
  //     img {
  //       width: 15px;
  //       height: 15px;
  //       opacity: 0.55;
  //     }
  //     .count {
  //       color: #707070;
  //       margin-left: 5px;
  //       width: max-content;
  //       font-size: 15px;
  //     }
  //   }
  //   .text-area {
  //     margin-top: 19px;
  //     width: 655px;
  //     margin-left: 17px;
  //     font-family: Noto Sans KR;
      
  //     .title {
  //       height: 40px;
  //       line-height: 40px;
  //       width: 100%;
  //       color: #707070;
  //       text-align: left;
  //       font-weight: 700;
  //       font-size: 20px;
  //       display: flex;
  //       justify-content: space-between;
  //       .update {
  //         background-color: #EFEFEF;
  //         width: 150px;
  //         text-align: right;
  //         padding-right: 27px;
  //         font-size: 15px;
  //         font-weight: 300;
  //         color: #707070
  //       }
  //     }
  //     .description {
  //       background-color: #EFEFEF;
  //       line-height: 35px;
  //       height: 69px;
  //       text-align: left;
  //       font-weight: 100;
  //       font-size: 20px;
  //       width: 516px;
  //       word-wrap: break-word;
  //       overflow: hidden;
  //       white-space: pre-wrap;
  //       text-overflow: ellipsis;
  //     }
  //     .owner {
  //       background-color: #EFEFEF;
  //       width: max-content;
  //       max-width: 275px;
  //       line-height: 40px;
  //       text-align: left;
  //       font-weight: 300;
  //       font-size: 20px;
  //       cursor: default;
  //       display: flex;
  //     }
  //   }
  // `;
  // const GroupTiny = styled.div`
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
  // const ChildElement = styled.div`
  //   background-image: url(${props => props.img});
  //   background-size: cover;
  //   background-position: center center;
  //   margin-right: 5px;
  //   height: 70px;
  //   width: 70px;
  //   border-radius: 15px;
  //   background-color: ${props => props.img ? "#D6D6D6" : "#EFEFEF"};
  // `;
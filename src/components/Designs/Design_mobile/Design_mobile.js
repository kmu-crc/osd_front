import React, { Component } from 'react'
import styled from 'styled-components'

import forked from "source/forked.svg"
import iForked from "source/forked_icon_white.png"
import iThumbUp from "source/thumbup_icon_white.png"
import IconView from "source/IconView"
import noimg from "source/noimg.png"

import DateFormat from "modules/DateFormat"
import TextFormat from "modules/TextFormat"
import NumberFormat from "modules/NumberFormat"
import { geturl } from "config"
import Icon from '@material-ui/core/Icon';

const DesignCard = styled.div`
  width: 100px;
  height:137px;
  border-radius:12px;
  display:flex;
  flex-direction:column;
  background-color:#7A7A7A;
  box-shadow: 0px 3px 6px #00000029;
  position: relative;

  .thumbnail{
    width:100px;
    height:100px;
    min-width:100px;
    min-height:100px;
    border:1px solid #7A7A7A;
    background-color:white;
    background-image:url(${props => props.url});
    background-position:center;
    background-size:cover;
    border-radius:12px;
    box-shadow: 0px 3px 6px #00000029;

  }
  .forked {
    position: absolute;
    top: 0px;
    right: 5px;
    width: 16px;
    height: 35px;
    background-image: url(${forked});
    background-size: cover;
  }
  .info{
    *{
      color:white;
    }
    width:100%;
    padding-left:6px;
    padding-right:6px;
    .title{
      width:100%;
      height:14px;
      font-family:Spoqa Han Sans Neo;
      font-size:10px;
      font-weight:500;
      color:white;
    }
    .count{
      display:flex;
      align-items:center;
      margin-top:2px;
      .wrap{height:20px;display:flex;align-items:center;font-size:9px;margin-right:5px;}
      .icon{width:13px;height:13px;opacity:0.5;margin-right:3px;margin-left:3px;}  
      
    }
  }
`
const DesignEmpty = {
  title: "타이틀", userName: "개설자", categoryName: "분야",
  like_count: 0, children_count: 0, view_count: 0,
  thumbnailUrl: { m_img: null },
}

class Design_mobile extends Component {
  gotoDetailPage = () => {
    // window.location.href = geturl() + "/designDetail/" + this.props.data.uid
    window.location.href = `/designDetail/${this.props.data.uid}`;
  }
  state = { data: this.props.data || DesignEmpty }
  shouldComponentUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({ data: nextProps.data });
    }
    return true;
  }
  render() {
    const data = this.state.data
    const thumbnail = data.thumbnailUrl
    const isForked = this.props.forked || data.parent_design;
    return (
      <React.Fragment>
        <DesignCard onClick={this.gotoDetailPage} url={(thumbnail === null ? noimg : thumbnail.l_img === null ? noimg : thumbnail.l_img)}>
          {isForked && <div className="forked" />}
          <div className="thumbnail" />
          <div className="info">
            <div className="title"><TextFormat tip width="100%" txt={data.title} single /></div>
            <div className="count">
              <div className="wrap">
                <Icon style={{ fontSize: "10px", color: "white" }}>visibility</Icon>
                {NumberFormat(data.view_count)}
              </div>
              <div className="wrap">
                <Icon style={{ fontSize: "10px", color: "white" }}>favorite_border</Icon>
                {NumberFormat(data.like_count)}
              </div>
              <div className="wrap">
                <Icon style={{ fontSize: "10px", color: "white" }}>share</Icon>
                {NumberFormat(data.children_count) || 0}
              </div>
              {/* <IconView width="6px" height="6px" fill="white" />
                  <div className="text">{NumberFormat(data.view_count)}</div>
                  <img className="icon" alt="icon" src={iThumbUp} />
                  <div className="text">{NumberFormat(data.like_count)}</div>
                  <img className="icon" alt="icon" src={iForked} />
                  <div className="text">{NumberFormat(data.children_count) || 0}</div> */}
            </div>
          </div>
        </DesignCard>
      </React.Fragment>
    )
  }
}
export default Design_mobile
// {
//   this.props.empty == null?
//   <DesignElement onClick={this.gotoDetailPage} img={(thumbnail === null ? noimg : thumbnail.l_img === null ? noimg : thumbnail.l_img)}>
//   {isForked && <div className="forked" />}
//   <div className="categoryName">{data.categoryName}</div>
//   <div className="innerbox">
//     <div className="design-title">
//       <TextFormat tip width="100%" txt={data.title} single />
//     </div>
//     <div className="user-update-wrapper">
//       <div style={{ textShadow: "1px 1px 2px #707070", fontWeight: "500", fontSize: "1.25rem", width: "200px" }}>
//         <TextFormat tip txt={data.userName} width="100%" />
//       </div>
//       <div style={{ textShadow: "2px 2px 6px gray", fontSize: "1.15rem", width: "max-content" }}>
//         {DateFormat(data.update_time)}
//       </div>
//     </div>
//   </div>
//   <div className="counter">
//     <div className="view"><IconView width="22px" height="11px" fill="white" /></div>
//     <div className="view-count">{NumberFormat(data.view_count)}</div>
//     <div className="like"><img alt="icon" src={iThumbUp} /></div>
//     <div className="like-count">{NumberFormat(data.like_count)}</div>
//     <div className="fork"><img alt="icon" src={iForked} /></div>
//     <div className="fork-count">{NumberFormat(data.children_count) || 0}</div>
//   </div>
// </DesignElement >
// :
// <DesignElement_empty/>
// }
//return (
//  <NavLink to={"/designDetail/" + design.uid}><Designli></Designli></NavLink>
//)


// import React, { Component } from 'react'
// import styled from 'styled-components'

// import forked from "source/forked.svg"
// import iForked from "source/forked_icon_white.png"
// import iThumbUp from "source/thumbup_icon_white.png"
// import IconView from "source/IconView"
// import noimg from "source/noimg.png"

// import DateFormat from "modules/DateFormat"
// import TextFormat from "modules/TextFormat"
// import NumberFormat from "modules/NumberFormat"
// import { geturl } from "config"

// import new_logo_view from "source/new_logo_view.svg";
// import new_logo_favorite from "source/new_logo_favorite.svg";
// import new_logo_share from "source/new_logo_share.svg";

// const DesignCard = styled.div`
//   *{
//     font-family:Spoqa Han Sans Neo;
//     color:black;
//   }
//   width:307px;
//   height:450px;
//   box-shadow: 8px 8px 8px #4141411A;
//   border: 0.5px solid #eaeaea;
//   cursor:pointer; 
//   position:relative;
//   overflow:hidden;
//   .share_cover{
//     position:absolute;
//     top:-22px;
//     right:0px;
//     width: 28px;
//     height: 76px;
//     transform: matrix(-0.71, 0.71, -0.71, -0.71, 0, 0);
//     background: #1262AB 0% 0% no-repeat padding-box;
//     box-shadow: 0px 3px 6px #00000029;
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     .share_icon{
//       width:15px;
//       height:17px;
//       filter: invert(100%);
//       transform: rotate(225deg); 
//     }
//   }
//   .thumbnail{
//     width:100%;
//     height:287px;
//     border: 0.5px solid #eaeaea;
//     object-fit:cover;
//   }
//   .info{
//     width:100%;
//     padding:11px 21px 21px 21px;
//   }
//   .spaceBetween{
//     width:100%;
//     display:flex;
//     align-items:center;
//     justify-content:space-between;
//     margin-bottom:5px;
//   }
//   .title{
//     width:200px;
//     white-space: nowrap; 
//     overflow: hidden; 
//     text-overflow: ellipsis; 
//     font-size:31px;
//     font-weight:600;
//     height:49px;
//     line-height:49px;
//     // display:flex;
//     // align-items:center;
//   }
//   .date{
//     color:#707070;
//     font-size:15px;
//   }
//   .designer{
//     font-size:14px;
//   }

//   .asset_wrapper{
//     width:100%;
//     height:30px;
//     display:flex;
//     align-items:center;
//     margin-top:24px;
//     .asset_icon{
//       width:25px;
//       height25px;
//       object-fit:cover;
//     }
//     .asset_text{
//       min-width:40px;
//       font-size:16px;
//       padding-left:10px;
//     }
//   }
// `

// const DesignEmpty = {
//   title: "타이틀", userName: "개설자", categoryName: "분야",
//   like_count: 0, children_count: 0, view_count: 0,
//   thumbnailUrl: { m_img: null },
// }

// class Design extends Component {
//   gotoDetailPage = () => {
//     window.location.href = geturl() + "/designDetail/" + this.props.data.uid
//   }
//   state = { data: this.props.data || DesignEmpty }
//   shouldComponentUpdate(nextProps) {
//     if (this.props.data !== nextProps.data) {
//       this.setState({ data: nextProps.data });
//     }
//     return true;
//   }
//   render() {
//     const data = this.state.data
//     const thumbnail = data.thumbnailUrl
//     const isForked = this.props.forked || data.parent_design;
//     return (
//       <React.Fragment>
//              <DesignCard  onClick={this.gotoDetailPage}>
//                {
//                  isForked&&
//                <div className="share_cover">
//                <img className="share_icon" alt="icon" src={new_logo_share} />
//                </div>
//                }
//                <img src={(thumbnail === null ? noimg : thumbnail.l_img === null ? noimg : thumbnail.l_img)} className="thumbnail"/>
//                <div className="info">
//                  <div className="spaceBetween">
//                    <div className="title">{data.title}</div>
//                    <div className="date">{DateFormat(data.update_time)}</div>
//                  </div>
//                  <div className="designer">{data.userName}</div>
//                  <div className="asset_wrapper">
//                    <img src={new_logo_view} className="asset_icon"/><div className="asset_text">{NumberFormat(data.view_count)}</div>
//                    <img src={new_logo_favorite} className="asset_icon"/><div className="asset_text">{NumberFormat(data.like_count)}</div>
//                    <img src={new_logo_share} className="asset_icon"/><div className="asset_text">{NumberFormat(data.children_count) || 0}</div>
//                  </div>
//                </div>
//              </DesignCard>
//       </React.Fragment>
//     )
//   }
// }
// export default Design
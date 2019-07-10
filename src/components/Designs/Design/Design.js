import React, { Component } from 'react'
import styled from 'styled-components'
// import { NavLink } from 'react-router-dom'
// import StyleGuide from "opendesign_style"

import forked from "source/forked.svg"
import iForked from "source/forked_icon_white.png"
import iThumbUp from "source/thumbup_icon_white.png"
import IconView from "source/IconView"

// css 
const DesignElement = styled.div`
    min-width:330px;
    min-height:330px;
    width: 330px;
    height: 330px;
    border-radius: 15px;
    background-image: linear-gradient(#E8E8E8, #808080);
    margin-right: 63px; 
    color: white;
    font-size: 20px;
    font-family: "Noto Sans KR";
    .forked {
      position: absolute;
      margin-left: 266px;
      margin-top: 0px;
      width: 32.63px;
      height: 70.48px;
      background-image: url(${forked});
    }
    .not{
      position: relative;
      margin-left: 263.93px;
      margin-top: 0px;
      width: 32.63px;
      height: 70.48px;
    }
`
class Design extends Component {

  render() {
    const isForked = this.props.forked

    return (
      <DesignElement >
        {isForked && <div className="forked" />}
        <div style={{ position: "absolute", marginLeft: "262px", marginTop: "285px", width: "37px", height: "40px", fontSize: "20px", fontWeight: "300", color: "#FF0000" }}>패션</div>
        <div style={{ width: "167px", lineHeight: "40px", height: "69px", fontFamily: "Noto Sans KR", marginLeft: "25px", marginTop: "201px" }}>
          <div style={{ fontSize: "20px", fontWeight: "700" }}>캡스톤 디자인 2019</div>
          <div style={{ fontSize: "20px", fontWeight: "300" }}>진아</div>
        </div>
        <div style={{ marginLeft: "24.92px", marginTop: "14px", display: "flex", justifyContent: "space-start", width: "291px", height: "22px", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
          <div style={{ marginRight: "4.25px" }}><IconView width="13.83px" height="9.16px" fill="white" /></div>
          <div style={{ marginRight: "6px" }}>220</div>
          <div style={{ marginRight: "4px" }}><img alt="icon" style={{ width: "10px", height: "10px" }} src={iThumbUp} /></div>
          <div style={{ marginRight: "6px" }}>220</div>
          <div style={{ marginRight: "4px" }}><img alt="icon" style={{ width: "13px", height: "13px" }} src={iForked} /></div>
          <div style={{ marginRight: "0px" }}>220</div>
        </div>
      </DesignElement>
    )
  }
}
export default Design
// class Design extends Component {
//   render() {
//     let design = this.props.data;
//     // console.log("design", design)
//     return (
//       <NavLink to={"/designDetail/" + design.uid}>
//         <Designli>
//           <ImgPart style={design.thumbnailUrl ? { backgroundImage: `url(${design.thumbnailUrl.m_img})` } : { backgroundImage: `url(${noimg})` }}>
//             {design.parent_design === null
//               ? null
//               : <div className="icon-span">
//                 <i className="icon fork large icon-fork" />
//               </div>
//             }
//           </ImgPart>
//           <TextPart>
//             <div className="title">{design.title}</div>
//             {design.is_project === 1
//               ? <div className="userName" style={{ display: "flex", justifyContent: "space-between" }}>{design.userName}님의 프로젝트</div>
//               : <div className="userName" style={{ display: "flex" }}>{design.userName}님의 작품</div>
//             }
//             <div className="cate">
//               {design.categoryName ? design.categoryName : "전체"}
//               <span className="update">
//                 {design.update_time}
//               </span>
//             </div>
//           </TextPart>
//           <Count>
//             <div>
//               <Icon name="unhide"/>
//               {design.view_count ? design.view_count : 0}
//             </div>
//             <div>
//               <Icon name="heart" />
//               {design.like_count ? design.like_count : 0}
//             </div>
//             <div>
//               <Icon name="fork" />
//               {design.children_count ? design.children_count : 0}
//             </div>
//           </Count>
//         </Designli>
//       </NavLink>
//     )
//   }
// }

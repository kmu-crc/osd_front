import React, { Component } from 'react'
import styled from 'styled-components'
// import { NavLink } from 'react-router-dom'
// import StyleGuide from "opendesign_style"

import forked from "source/forked.svg"
import iForked from "source/forked_icon_white.png"
import iThumbUp from "source/thumbup_icon_white.png"
import IconView from "source/IconView"
import noimg from "source/noimg.png"

import DateFormat from "modules/DateFormat"
import TextFormat from "modules/TextFormat"

// CSS 
const DesignElement = styled.div`
  border: 1px solid #FFFFFF;
  position: relative;
  z-index:700;
  width: 330px;
  height: 330px;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.img});
  color: white;
  font-size: 20px;
  font-family: "Noto Sans KR";
  .cover {
    cursor: pointer;
    z-index: 701;
    position: absolute;
    border-radius: 15px;
    background-image: linear-gradient(rgba(0,0,0, 0), rgba(64,64,64, 0.4), rgba(32,32,32, 1));
    width: 330px;
    height: 330px;
  }
  .forked {
    position: absolute;
    margin-left: 266px;
    margin-top: 0px;
    width: 32.63px;
    height: 70.48px;
    background-image: url(${forked});
  }
`;

const DesignEmpty = {
  title: "타이틀", userName: "개설자", categoryName: "분야",
  like_count: 0, children_count: 0, view_count: 0,
  thumbnailUrl: { m_img: null },
}

class Design extends Component {
  gotoDetailPage = () => {
    window.location.href = "/designDetail/" + this.props.data.uid
  }
  state = { data: this.props.data || DesignEmpty }
  render() {
    const data = this.state.data
    const thumbnail = data.thumbnailUrl
    const isForked = this.props.forked || data.parent_design;
    return (
      <DesignElement img={(thumbnail === null ? noimg : thumbnail.m_img === null ? noimg : thumbnail.m_img)}>
        <div className="cover" onClick={this.gotoDetailPage} />
        {isForked && <div className="forked" />}
        <div style={{ zIndex: "703", position: "absolute", textAlign: "right", marginLeft: "180px", marginTop: "285px", width: "120px", height: "40px", fontSize: "20px", fontWeight: "300", color: "#FF0000", cursor: "default" }}>{data.categoryName}</div>
        <div style={{ zIndex: "703", position: "absolute", width: "274.08px", color: "#FFF", lineHeight: "40px", height: "69px", fontFamily: "Noto Sans KR", marginLeft: "25px", marginTop: "201px" }}>
          <div style={{ fontSize: "20px", fontWeight: "700", display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "100%" }}>
              <TextFormat width="100%" txt={data.title} />
              {/* {data.title.substr(0, 16)}{data.title.length > 16 && "..."} */}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: "20px", fontWeight: "300", cursor: "pointer" }}>
              {data.userName}</div>
            <div style={{ marginTop: "5px", fontWeight: "300", width: "65px", height: "25px", fontSize: "17px", lineHeight: "25px", textAlign: "right", fontFamily: "Noto Sans KR", cursor: "default" }} >
              {DateFormat(data.update_time)}</div>
          </div>
        </div>
        <div style={{ zIndex: "703", marginLeft: "24.92px", marginTop: "280px", display: "flex", justifyContent: "space-start", width: "291px", height: "22px", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
          <div style={{ zIndex: "703", marginRight: "4.25px" }}><IconView width="22px" height="11px" fill="white" /></div>
          <div style={{ zIndex: "703", marginRight: "6px", cursor: "default" }}>{data.view_count}</div>
          <div style={{ zIndex: "703", marginRight: "4px" }}><img alt="icon" style={{ width: "11px", height: "11px" }} src={iThumbUp} /></div>
          <div style={{ zIndex: "703", marginRight: "6px", cursor: "default" }}>{data.like_count}</div>
          <div style={{ zIndex: "703", marginRight: "4px" }}><img alt="icon" style={{ width: "22px", height: "11px" }} src={iForked} /></div>
          <div style={{ zIndex: "703", marginRight: "0px", cursor: "default" }}>{data.children_count || 0}</div>
        </div>
      </DesignElement>
    )
  }
}
export default Design

//return (
//  <NavLink to={"/designDetail/" + design.uid}><Designli></Designli></NavLink>
//)

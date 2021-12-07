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

const DesignCard = styled.div`
  width: 160px;
  height:160px;
  border-radius:12px;
  box-shadow: 0px 3px 6px #00000029;
  border:1px solid #7A7A7A;
  background-color:white;
  background-image:url(${props=>props.url});
  background-position:center;
  background-size:cover;
  padding:8px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  .title{
    width:100%;
    font-size:12px;
    font-weight:500;
    color:white;
    text-shadow:2px 2px 6px black;
  }
  .bottomBox{
    width:100%;
    display:flex;
    justify-content:space-between;
    .categoryName{
      width:40px;
      font-size:9px;
      font-weight:400;
      color:red;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
      text-shadow:2px 2px 6px black;
    }
    .nickname{
      width:40px;
      font-size:9px;
      font-weight:400;
      color:white;
      text-align:right;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
      text-shadow:2px 2px 6px black;
    }
  }
  
`
const DesignEmpty = {
  title: "타이틀", userName: "개설자", categoryName: "분야",
  like_count: 0, children_count: 0, view_count: 0,
  thumbnailUrl: { m_img: null },
}

class Design_mobile_my extends Component {
  gotoDetailPage = () => {
    window.location.href = geturl() + "/designDetail/" + this.props.data.uid
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
        <DesignCard onClick={this.gotoDetailPage}  url={(thumbnail === null ? noimg : thumbnail.l_img === null ? noimg : thumbnail.l_img)}>
          <div className="title"><TextFormat tip width="100%" txt={data.title} single /></div>
          <div className="bottomBox">
            <div className="categoryName">{data.categoryName}</div>
            <div className="nickname"><TextFormat tip txt={data.userName} width="100%" /></div>
          </div>
        </DesignCard>
      </React.Fragment>
    )
  }
}
export default Design_mobile_my

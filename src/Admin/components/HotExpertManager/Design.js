import React, { Component } from 'react'
import styled from 'styled-components'

import forked from "source/forked.svg"
import noimg from "source/noimg.png"

const TextFormatContainer = styled.div`
  padding: 0 0 0 0; 
  cursor: default;
  overflow: hidden; 
  text-overflow: ellipsis;
  width: ${props => props.width + "%" || "max-content"};
  background-color: ${props => props.backgroundColor || "transparent"};
  &.multi {
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.lines || "none"};
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  &.single {
    white-space: nowrap;
  }
  .wrapper {
    z-index: 999;
    position: absolute;
    display: flex;
    visibility: hidden;
  }
  .tip-txt {
    display: none;
    width: max-content;
    background-color: #707070;
    color: #EFEFEF;
    text-align: center;
    border-radius: 6px;
    padding: 5px 3px;
    // margin-top: -5px;
    font-size: 14px;
  }
  :hover {
    .wrapper {
        visibility: visible;
    }
    .tip-txt {
        display: block;
    }
  }
`;
class TextFormat extends Component {
    render() {
        const { backgroundColor, width, txt, id, lines, chars/*, tip*/ } = this.props;
        return (
            <TextFormatContainer
                backgroundColor={backgroundColor}
                width={width}
                title={txt}
                id={id}
                lines={lines}
                className={lines ? "multi" : "single"}>

                {chars ? (txt && txt.length < chars ? txt : txt && txt.slice(0, chars - 3) + "...") : txt}

                {/* {tip ? <div className="wrapper">
          <div className="tip-txt">{txt}</div>
        </div> : null} */}
            </TextFormatContainer>)
    }
}

// CSS 
const DesignElement = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  z-index: 700;
  width: 150px;
  height: 150px;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.img});
  color: white;
  font-size: 20px;
  font-family: "Noto Sans KR";
  cursor: default;
  .cover {
    cursor: default;
    z-index: 701;
    position: absolute;
    border-radius: 15px;
    background-image: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(32,32,32, 0.7)100%); 
    width: 150px;
    height: 150px;
  }
  .forked {
    position: absolute;
    margin-left: 276px;
    margin-top: 0px;
    width: 32.63px;
    height: 70.48px;
    background-image: url(${forked});
  }
  .categoryName {
    z-index: 703;
    position: absolute;
    margin-left: 180px;
    margin-top: 285px;
    width: 70px;
    height: 20px;
    color: #FF0000;
    font-size: 20px;
    font-weight: 400;
    text-align: right;
    text-shadow:2px 2px 6px rgb(80,80,80,1);
    cursor: default;
  }
  .innerbox {
    z-index: 703;
    position: absolute;
    width: 274.08px;
    color: #FFFFFF;
    line-height: 40px;
    height: 35px;
    font-family: Noto Sans KR;
    margin-left: 25px;
    margin-top: 201px;
    .design-title {
      font-size: 20px;
      font-weight: 700;
      text-shadow:2px 2px 6px gray;
      display: flex;
      justify-content: space-between;
    }
    .update-time { 
      margin-top: 5px;
      font-weight: 300;
      border: 1px solid red;
      width: max-content;
      height: 25px;
      font-size: 17px;
      font-family: Noto Sans KR;
      text-shadow:2px 2px 6px gray;
      line-height: 25px;
      text-align: right;
      cursor: default;
    }
    .user-name {
      font-size: 20px;
      font-weight: 300;
      text-shadow:2px 2px 6px gray;
      cursor: default;
    }  
    .user-update-wrapper {
      width: 285px;
      display: flex;
      justify-content: space-between;
    }
  }

  .counter {
    z-index: 703;
    position: absolute;
    left: 24.92px;
    top: 286px;
    display: flex;
    justify-content: space-start;
    width: 291px;
    height: 22px;
    text-align: left;
    line-height: 40px;
    font-size: 15px;
    font-weight: 500;
    align-items: center;
  }
  .view {
    z-index: 703;
    margin-right: 4.25px;
  }
  .view-count {
    z-index: 703;
    margin-right: 6px;
    cursor: default;
  }
  .like {
    z-index: 703;
    margin-right: 4px;
    img{
      width: 13px;
      height: 13px;
    }
  } 
  .like-count {
    z-index: 703;
    margin-right: 6px;
    cursor: default;
  }
  .fork {
    z-index: 703;
    margin-right: 4px;
    img {
      width: 22px;
      height: 11px;
    }
  }
  .fork-count {
    z-index: 703;
    margin-right: 0px;
    cursor: default;
  }
`;

const DesignEmpty = {
    title: "타이틀", userName: "개설자", categoryName: "분야",
    like_count: 0, children_count: 0, view_count: 0,
    thumbnailUrl: { m_img: null },
}

class Design extends Component {
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
            <DesignElement img={(thumbnail === null ? noimg : thumbnail.m_img === null ? noimg : thumbnail.m_img)}>
                {isForked && <div className="forked" />}
                <div className="innerbox">
                    <div className="design-title">
                        <TextFormat tip width="100%" txt={data.title} single />
                    </div>
                    <div className="user-update-wrapper">
                        <div style={{ width: "200px" }}>
                            <TextFormat tip txt={data.userName} width="100%" />
                        </div>
                    </div>
                </div>
            </DesignElement>
        )
    }
}
export default Design


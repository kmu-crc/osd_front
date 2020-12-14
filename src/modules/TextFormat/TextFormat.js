import React, { Component } from "react";
import styled from "styled-components";

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

export default TextFormat

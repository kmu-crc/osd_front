import React, { Component } from "react";
import styled from "styled-components";

const TextFormatContainer = styled.div`
  padding: 0 0 0 0; 
  cursor: pointer;
  overflow: hidden; 
  text-overflow: ellipsis;
  width: ${props => props.width || "max-content"};
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
`;
class TextFormat extends Component {
  render() {
    const { backgroundColor, width, txt, id, lines, chars } = this.props;
    return (
      <TextFormatContainer backgroundColor={backgroundColor} width={width} title={txt} id={id} lines={lines} className={lines ? "multi" : "single"}>
        {chars ? (txt&&txt.length < chars ? txt : txt&&txt.slice(0, chars - 3) + "...") : txt}
      </TextFormatContainer>)
  }
}

export default TextFormat

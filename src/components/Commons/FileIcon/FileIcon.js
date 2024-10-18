import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

const FileWrap = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: #e9e9e1;
  width: 50px;
  height: 70px;
  margin-right: 1rem;
  position: relative;
  &::before {
    display: block;
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 0 0 3px;
    border-width: 10px;
    box-sizing: border-box;
    border-top: 7.5px solid white;
    border-right: 7.5px solid white;
    border-left: 7.5px solid #d9d7cb;
    border-bottom: 7.5px solid #d9d7cb;
  }
  i.icon{
    font-size: 20px;
    text-align: center;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    width: auto;
  }
  .fileName {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 22px;
    line-height: 22px;
    background-color: #f4b400;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    color: white;
  }
`;
class FileIcon extends React.Component {
  render() {
    // console.log("FileWrap:", this.props);
    return (
      <FileWrap>
        <Icon name="code" />
        <div className="fileName">{this.props.extension.toUpperCase()}</div>
      </FileWrap>
    );
  }
}

export default FileIcon;

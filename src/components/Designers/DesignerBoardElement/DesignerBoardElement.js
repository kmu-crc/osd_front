import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import profile from "source/thumbnail.png";
import { Icon } from "semantic-ui-react";
import StyleGuide from "StyleGuide";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";

// CSS STYLING
const ListElement = styled.div`
  width: 100%;
  margin: 0 auto 0.9rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: flex;
  fiex-direction: row;
`;
const ThumbnailWriter = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-size: cover;
  background-image: url(${props => props.src ? props.src.m_img : profile});
`;

class DesignerBoardElement extends Component {
  render() {
    const item = this.props.data;
    console.log("item:", item);
    return (
      <NavLink to={"/designerBoardDetail/" + item.uid}>
        <ListElement>
          {/* no.*/}
          <div style={{ marginRight: "15px" }}>{item.uid}</div>
          {/* title */}
          <div style={{ marginRight: "15px" }}>{item.title || "글 제목"}</div>
          {/* writer */}
          <div style={{ marginLeft: "auto", marginRight: "15px", display: "flex" }}>
            <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
            <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
          </div>
          {/* date */}
          <div style={{ marginRight: "15px" }}>{item.create_time}</div>

          {/* view */}
          <div style={{ marginRight: "15px" }}>{item.view || 0}</div>

          {/* like */}
          <div style={{ marginRight: "15px" }}>{item.like || 0}</div>

          {/* func.*/}
          <div>{/* <Icon size="small" className="icon edit" /> */}</div>

        </ListElement>
      </NavLink>
    );
  }
}

export default DesignerBoardElement;

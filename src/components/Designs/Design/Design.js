import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import eximg from "source/myPage.jpeg";
import StyleGuide from "StyleGuide";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";
// css styling

const Designli = styled.li`
  width: 100%;
  margin: 0 auto 2rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  text-align: left;
  list-style-type: none;
`;

const ImgPart = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 3px 3px;
  div.icon-span{
    border-radius: 15%;
    background-color:#FFF;
    width: 23px;
    height: 23px;
    box-shadow: 0px 0.2px ${StyleGuide.color.geyScale.scale7};
  }
  i.icon-fork{
    color: ${StyleGuide.color.main.dark};
  }
`;

const TextPart = styled.div`
  padding: 10px 10px;
  font-size: ${StyleGuide.font.size.paragraph};
  & .title {
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    color: ${StyleGuide.color.geyScale.scale7};
    font-size: 16px;
  }
  & .userName {
    line-height: 1.35;
    margin: 5px 0;
    color: ${StyleGuide.color.geyScale.scale6};
  }
  & .cate {
    color: ${StyleGuide.color.main.basic};
    font-weight: 300;
    font-size: ${StyleGuide.font.size.small};
  }
  & .update {
    color: ${StyleGuide.color.geyScale.scale7};
    padding-left : 10px;
    float: right;
  }
`;

const Count = styled.div`
  background-color: #fff;
  padding: 5px 10px;
  color: ${StyleGuide.color.geyScale.scale6};
  border-top: 1px solid ${StyleGuide.color.geyScale.scale1};
  font-weight: 400;
  font-size: 12px;
  & div {
    float: left;
    padding-right: 10px;
  }
  &::after{
    display: block;
    content: "";
    clear: both;
  }
  & .fork{
    transform: translateY(25%) rotate(90deg);
  }
`;

class Design extends Component {
  render() {
    let design = this.props.data;
    console.log("design", design)
    return (
      <NavLink to={"/designDetail/" + design.uid}>
        <Designli>
          <ImgPart style={design.thumbnailUrl ? { backgroundImage: `url(${design.thumbnailUrl.m_img})` } : { backgroundImage: `url(${eximg})` }}>
            {design.parent_design === null
              ? null
              : <div className="icon-span">
                <i className="icon fork large icon-fork" />
              </div>
            }
          </ImgPart>
          <TextPart>
            <div className="title"><TextFormat txt={design.title} /></div>
            {design.is_project === 1
              ? <div className="userName" style={{ display: "flex", justifyContent: "space-between" }}><TextFormat style={{ flex: "1" }} txt={design.userName} chars={9} /><div style={{ flex: "1" }}>님의 프로젝트</div></div>
              : <div className="userName" style={{ display: "flex" }}><TextFormat txt={design.userName} chars={10} /> 님의 작품</div>
            }
            <div className="cate">
              {design.categoryName ? design.categoryName : "전체"}
              <span className="update">
                {DateFormat(design.update_time)}
              </span>
            </div>
          </TextPart>
          <Count>
            <div>
              <Icon name="unhide"/>
              {design.view_count ? NumberFormat(design.view_count) : 0}
            </div>
            <div>
              <Icon name="heart" />
              {design.like_count ? NumberFormat(design.like_count) : 0}
            </div>
            <div>
              <Icon name="fork" />
              {design.children_count ? NumberFormat(design.children_count) : 0}
            </div>
          </Count>
        </Designli>
      </NavLink>
    );
  }
}

export default Design;

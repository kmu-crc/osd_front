import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/thumbnail.png"

import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import IconView from "source/IconView"

//formats
import NumberFormat from "modules/formats/NumberFormat"
import TextFormat from "modules/formats/TextFormat"
import DateFormat from "modules/DateFormat"

//styled
const DesignerComp = styled.div`
    font-family: Noto Sans KR;
    height: 150px;
    width: 587px;

    .ImageBox{
        width: 150px;
        height: 150px;
        background-color: #D6D6D6;
        border-radius: 50%;
        position: absolute;
        background-size:cover;
        border: 1.5px solid #EFEFEF;
        z-index:1;
    }
    .TextBox{
        width: 527px;
        height: 130px;
        background-color: #EFEFEF;
        border-radius: 15px 15px 15px 15px;
        position: relative;
        left:65px;
        top:8px;
    }
    .userName{
        top: 19px;
        left: 114px;
        font-size: 20px;
        position: absolute;
        color: #707070;
        font-weight: bold;
        max-width: 300px;
        background-color: #EFEFEF;
    }
    .update{
        position: absolute;
        top: 20px;
        right: 10px;
        width: 75px;
        background-color: #EFEFEF;
        color: #707070;
        font-weight: light;
        font-size: 15px;
        text-align: right;
    }
    .description{
        top: 56px;
        left: 114px;
        font-size: 20px;
        line-height: 20px;
        max-width: 385px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        color: #707070;
        font-weight: 100;
        background-color: #EFEFEF;
    }
    .cate{
        position: absolute;
        top: 95px;
        right: 10px;
        height: 30px;
        max-width: 190px;
        width: max-content;
        color: #FF0000;
        font-weight: 300;
        font-size: 20px;
        text-align: right;
        background-color: #EFEFEF;
    }
    .counter{
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        margin-top: 95px;
        margin-left: 110px;
        justify-content: space-start;
        background-color: #EFEFEF;
    }
`;

class Designer extends Component {
    state = { data: this.props.data };
    gotoDesignerDetailPage = (event) => {
        const id = event.target.id
        if (id) {
            window.location.href = "/designerDetail/"
        }
    }
    render() {
        const designer = this.state.data;
        return (
            <DesignerComp onClick={(event) => this.gotoDesignerDetailPage(event)}>
                <div id="designer-face" className="ImageBox" style={designer.imgURL ? { backgroundImage: `url(${designer.imgURL.m_img})` } : { backgroundImage: `url(${noimg})` }}></div>
                <div id="designer-area" className="TextBox">
                    <div className="userName">{designer.nick_name}</div>
                    <div className="description"><TextFormat txt={designer.about_me} backgroundColor="#EFEFEF" width={"max-content"} /></div>
                    <div className="update">{DateFormat(designer.update_time)}</div>
                    <div className="cate">{designer.categoryName || "전체"}</div>
                    <div className="counter">
                        <div className="view" style={{ display: "flex" }}>
                            <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
                            <div style={{ marginLeft: "5px", width: "40px", fontSize: '15px' }}>{NumberFormat(designer.total_view)}</div>
                        </div>
                        <div className="like" style={{ display: "flex", marginLeft: "10px" }}>
                            <div><img alt="icon" src={iThumbUp} style={{ width: "11px", height: "11px", opacity: "0.55" }} /></div>
                            <div style={{ marginLeft: "5px", width: "40px", fontSize: '15px' }}>{NumberFormat(designer.total_like)}</div>
                        </div>
                        <div className="child" style={{ display: "flex", marginLeft: "10px" }}>
                            <div><img alt="icon" src={iForked} style={{ width: "21px", height: "21px", opacity: "0.55" }} /></div>
                            <div style={{ marginLeft: "5px", width: "40px", fontSize: '15px' }}>{NumberFormat(designer.total_group)}</div>
                        </div>
                    </div>
                </div>
            </DesignerComp>
        )
    }
}
export default Designer
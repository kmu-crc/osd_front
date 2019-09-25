import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/thumbnail.png"

import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import IconView from "source/IconView"

//formats
import NumberFormat from "modules/NumberFormat"
import TextFormat from "modules/TextFormat"
import DateFormat from "modules/DateFormat"

import { geturl } from "config"

//styled
const DesignerComp = styled.div`
    width: 587px;
    height: 150px;
    font-family: Noto Sans KR;
    cursor: pointer;

    .ImageBox{
        position: absolute;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1.5px solid #EFEFEF;
        background-color: #D6D6D6;
        background-size: cover;
        cursor: pointer;
        z-index: 1;
    }
    .TextBox{
        width: 527px;
        height: 130px;
        position: relative;
        background-color: #EFEFEF;
        border-radius: 15px 15px 15px 15px;
        left: 65px;
        top: 8px;
    }
    .userName{
        top: 19px;
        left: 114px;
        position: absolute;
        max-width: 300px;
        color: #707070;
        font-size: 20px;
        font-weight: bold;
        background-color: #EFEFEF;
    }
    .update{
        top: 20px;
        right: 22px;
        position: absolute;
        width: 75px;
        color: #707070;
        font-size: 15px;
        text-align: right;
        font-weight: light;
        background-color: #EFEFEF;
    }
    .description{
        top: 56px;
        left: 114px;
        position: absolute;
        max-width: 385px;
        line-height: 20px;
        overflow: hidden;
        color: #707070;
        font-size: 20px;
        font-weight: 100;
        white-space: nowrap;
        text-overflow: ellipsis;
        background-color: #EFEFEF;
    }
    .cate{
        position: absolute;
        top: 95px;
        right: 22px;
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
        .view {
            display: flex;
            margin-right: 10px;
            .text {
                width: 40px;
                margin-left: 5px;
                font-size: 15px;
            }
        }
        .like {
            display: flex;
            margin-right: 10px;
            img {
                width: 15px;
                height: 15px;
                opacity: 0.55;
            }   
            .text{
                width: 40px;
                margin-left: 5px;
                font-size: 15px;
            }
        }
        .child {
            display: flex;
            img {
                width: 19px;
                height: 19px;
                opacity: 0.55;
            }
            .text{
                width: 40px;
                margin-left: 5px;
                font-size: 15px;
            }
        }
    }
`;

class Designer extends Component {
    state = { data: this.props.data };

    gotoDesignerDetailPage = (where, event) => {
        const id = event.target.id
        if (id === "") {
            window.location.href = geturl() + `/designerDetail/${where}`;
        }
    }
    render() {
        const designer = this.state.data;
        return (
            <DesignerComp onClick={(event) => this.gotoDesignerDetailPage(designer.uid, event)}>
                <div className="ImageBox" style={{ backgroundImage: `url(${designer && designer.imgURL != null ? designer.imgURL.m_img : noimg})`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                <div className="TextBox">
                    <div className="userName">{designer.nick_name}</div>
                    <div className="description"><TextFormat txt={designer.about_me} backgroundColor="#EFEFEF" width={"max-content"} /></div>
                    <div className="update">{DateFormat(designer.update_time)}</div>
                    <div className="cate">{designer.categoryName || "전체"}</div>
                    <div className="counter">
                        <div className="view">
                            <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
                            <div className="text">{NumberFormat(designer.total_view == null ? 0 : designer.total_view)}</div>
                        </div>
                        <div className="like" >
                            <div><img alt="icon" src={iThumbUp} /></div>
                            <div className="text">{NumberFormat(designer.total_like == null ? 0 : designer.total_like)}</div>
                        </div>
                        <div className="child">
                            <div><img alt="icon" src={iForked} /></div>
                            <div className="text">{NumberFormat(designer.total_group == null || designer.total_design == null ? 0 : designer.total_group + designer.total_design)}</div>
                        </div>
                    </div>
                </div>
            </DesignerComp>
        )
    }
}
export default Designer
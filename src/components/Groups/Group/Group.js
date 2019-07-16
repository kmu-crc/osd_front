import React, { Component } from 'react'
import styled from "styled-components"

import noimg from "source/noimg.png"
import forked from "source/forked.svg"
import iForked from "source/forked_icon_black.png"
import iThumbUp from "source/thumbup_icon_black.png"
// import iView from "source/view.svg"
import IconView from "source/IconView"

const GroupComp = styled.div`
    min-width:902px;
    min-height:230px;
    width: 902px;
    height: 230px;
    border-radius: 15px;
    background-color: #EFEFEF;
    margin-right: 96px; 
    color: #707070;
    font-size: 20px;
    font-family: "Noto Sans KR";
    display: flex;

    .thumbnail-box {
        top: 0px;
        width: 230px;
        height: 230px;
        border-radius: 15px;
        background-color: #D6D6D6;
        background-position: center center;
        background-size: cover;
        &.mini {
            width: 70px;
            height: 70px;
            margin-right: 5px;
        }
    }
    .content-box {
        width: 586.08px;
        height: 209.93px;
        margin: 0 0;
        margin-left: 53.92px;
        padding: 0 0;
    }
}
.category {
    position: absolute;
    margin-left: 763px;
    margin-top: 14px;
    font-size: 20px;
    line-height: 29px;
    text-align: left;
    color: #FF0000;
}
.forked {
    position: absolute;
    margin-left: 553.01px;
    margin-top: 0px;
    width: 32.63px;
    height: 70.48px;
    background-image: url(${forked});
}
`;
const group_info = {
    title:"캡스톤",
    groupDescription:"로렌 입섬 도얼 쓋 어멧",
    owner: "진아",
    view_count:0,
    like_count:0,
    children_count: 0,
    thumbnail:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8c591282228133.5d1a240959aed.jpg",
}
class Group extends Component {
    state = {data:group_info};
    render() {
        const group = this.state.data;
        return (
            <GroupComp>
                {/* <div className="category">패션</div> */}
                <div className="thumbnail-box" style={{ backgroundImage: `url(${group.thumbnail}),url(${noimg})` }} />
                <div style={{ position: "absolute", display: "flex", marginLeft: "575px", marginTop: "139.93px" }}><div className="thumbnail-box mini" /><div className="thumbnail-box mini" /><div className="thumbnail-box mini" /><div className="thumbnail-box mini" /></div>
                <div className="content-box" >
                    {/* <div className="forked" /> */}
                    <div style={{ marginTop: "23px", marginLeft: "0.08px", width: "167px", fontWeight: "700" }}>{group.title}</div>
                    <div style={{ marginTop: "11px", marginLeft: "0.08px", width: "516px", lineHeight: "35px", height: "69px", fontWeight: "100" }}>{group.groupDescription}</div>
                    <div style={{ marginTop: "21px", marginLeft: "0.08px", width: "291px", fontWeight: "300" }}>{group.owner}님의 그룹</div>
                    <div style={{ marginTop: "17px", display: "flex", justifyContent: "space-start", width: "291px", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                        <div style={{ marginRight: "4.25px" }}><IconView width="13.83px" height="9.16px" fill="black" opacity="0.55" /></div>
                        <div style={{ marginRight: "8px" }}>{group.view_count}</div>
                        <div style={{ marginRight: "4.25px" }}><img alt="icon" style={{ opacity: "0.55", width: "12px", height: "12px" }} src={iThumbUp} /></div>
                        <div style={{ marginRight: "8px" }}>{group.like_count}</div>
                        <div style={{ marginRight: "4.25px" }}><img alt="icon" style={{ opacity: "0.55", width: "13px", height: "13px" }} src={iForked} /></div>
                        <div>{group.children_count}</div>
                    </div>
                </div>
            </GroupComp >
        )
    }
}

export default Group
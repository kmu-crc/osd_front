import React, { Component } from 'react';
import noimg from "source/noimg.png";
import IconView from 'source/IconView';
import DateFormat from "modules/DateFormat";
import TextFormat from "modules/TextFormat";
import NumberFormat from "modules/NumberFormat";
import styled from 'styled-components';

const GroupElement = styled.div`
    display: flex;
    height: 230px;
    width: 902px;
    border-radius: 15px;
    background-color: #EFEFEF;
`

class Group extends Component {
    handleGotoDetail = (where, event) => {
        const id = event.target.id
        if (id === "") {
            let href = window.location.href.substring(0, window.location.href.search(`groupDetail`)) + `groupDetail/${where}`
            window.location.href = href
        }
    }
    render() {
        const defaultVal = { title: "타이틀", nick_name: "닉네임" };
        const group = this.props.data;
        if (group.title === "") {
            group.title = defaultVal.title;
        }
        if (group.nick_name === undefined) {
            group.nick_name = defaultVal.nick_name;
        }
        var four_child = [null, null, null, null];
        if (group.children) {
            for (var i = 0; i < 4; i++) {
                four_child[i] = group.children[i]
            }
        }
        return (
            <GroupElement onClick={(event) => { this.handleGotoDetail(group.uid, event) }} >
                {/*group.design > 0 || group.group > 0 ? (*//*) : (<></>)*/}
                <div id="children" style={{ position: "absolute", display: "flex", marginLeft: "587px", marginTop: "137px", width: "295px" }}>
                    {four_child.map((child, index) => {
                        return (child
                            ? <div id={`child-${index}`} key={index} style={{ backgroundImage: `url(${child.m_img})`, backgroundSize: "cover", backgroundPosition: "center center", marginRight: "5px", height: "70px", width: "70px", borderRadius: "15px", backgroundColor: "#D6D6D6" }} />
                            : <div id={`child-${index}`} key={index} style={{ marginRight: "5px", height: "70px", width: "70px", borderRadius: "15px", backgroundColor: "#D6D6D6" }} />)
                    })}
                </div>
                <div style={{ border: "2px solid #EFEFEF", height: "230px", width: "230px", borderRadius: "15px", backgroundColor: "#D6D6D6", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", backgroundImage: group.thumbnailUrl && group.thumbnailUrl.m_img ? `url(${group.thumbnailUrl.m_img})` : `url(${noimg})` }} />
                <div>
                    <div style={{ marginTop: "19px", width: "655px", marginLeft: "17px", fontFamily: "Noto Sans KR" }}>
                        <div style={{ lineHeight: "40px", textAlign: "left", fontWeight: "700", fontSize: "20px", display: "flex", justifyContent: "space-between" }}>
                            <TextFormat id="title" backgroundColor="#EFEFEF" txt={group.title} />
                            <div id="update" style={{ backgroundColor: "#EFEFEF", width: "75px", textAlign: "right", paddingRight: "7px", fontSize: "15px", fontWeight: "300", color: "#707070" }}>{DateFormat(group.child_update_time)}</div>
                        </div>
                        <div id="description" style={{ backgroundColor: "#EFEFEF", lineHeight: "35px", height: "69px", textAlign: "left", fontWeight: "100", fontSize: "20px", width: "516px", whiteSpace: "pre-wrap" }}>{group.explanation || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore"}</div>
                        <div id="whosgroup" style={{ backgroundColor: "#EFEFEF", width: "max-content", maxWidth: "275px", lineHeight: "40px", textAlign: "left", fontWeight: "300", fontSize: "20px", cursor: "default", display: "flex" }}><TextFormat chars={32} txt={group.nick_name} id="userName" />님의 그룹</div>
                    </div>
                    <div style={{ backgroundColor: "#EFEFEF", width: "200px", marginTop: "19px", marginLeft: "17px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                        <div id="count-view" style={{ display: "flex", marginRight: "22px", cursor: "default" }}>
                            <div><IconView width="17.24px" height="11.41px" fill="#707070" /></div>
                            <div style={{ marginLeft: "5.85px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{NumberFormat(group.view || 0)}</div>
                        </div>
                        <div id="count-like" style={{ display: "flex", marginRight: "0px", cursor: "default" }}>
                            <div><i style={{ color: "#707070", fontSize: "14px" }} className="material-icons">thumb_up</i></div>
                            <div style={{ marginLeft: "6px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{NumberFormat(group.like || 0)}</div>
                        </div>
                        <div id="count-childs" style={{ display: "flex", cursor: "default" }}>
                            <div><i style={{ color: "#707070", fontSize: "17px" }} className="material-icons">library_books</i></div>
                            <div style={{ marginLeft: "5px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{NumberFormat(group.design || 0 + group.group || 0)}</div>
                        </div>
                    </div>
                </div>
            </GroupElement>
        )
    }
}
export default Group

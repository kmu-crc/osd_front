import React, { Component } from 'react';
import noimg from "source/noimg.png";
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import IconView from "source/IconView"
import DateFormat from "modules/DateFormat";
import TextFormat from "modules/TextFormat";
import NumberFormat from "modules/NumberFormat";
import styled from 'styled-components';
import { geturl } from "config";

const GroupElement = styled.div`
    cursor:pointer;
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
            window.location.href = geturl() + `/groupDetail/${where}`;
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
        four_child.reverse();
        return (
            <GroupElement >
                    {/**클릭 이벤트 */}
                    <div onClick={(event) => { this.handleGotoDetail(group.uid, event) }} style={{cursor:"pointer",position:"absolute",width:"100%",height:"100%",zIndex:"100"}}></div>
                   
                   
                    <div id="children" style={{ position: "absolute", display: "flex", marginLeft: "587px", marginTop: "137px", width: "295px" }}>
                    {four_child.map((child, index) => {
                        return (child
                            ? <div id={`child-${index}`} key={index} style={{ backgroundImage: `url(${child.m_img})`, backgroundSize: "cover", backgroundPosition: "center center", marginRight: "5px", height: "70px", width: "70px", borderRadius: "15px", backgroundColor: "#D6D6D6" }} />
                            : <div id={`child-${index}`} key={index} style={{  marginRight: "5px", height: "70px", width: "70px", borderRadius: "15px", backgroundColor: "#EFEFEF" }} />)
                    })}
                </div>
                <div  style={{  border: "2px solid #EFEFEF", height: "230px", width: "230px", borderRadius: "15px", backgroundColor: "#D6D6D6", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", backgroundImage: group.thumbnailUrl && group.thumbnailUrl.m_img ? `url(${group.thumbnailUrl.m_img})` : `url(${noimg})` }} />
                <div >
                    <div style={{marginTop: "19px", width: "655px", marginLeft: "17px", fontFamily: "Noto Sans KR" }}>
                        <div style={{ height:"40px",lineHeight: "40px", width:"100%",
                        color:"#707070",textAlign: "left", fontWeight: "700", fontSize: "20px", display: "flex", justifyContent: "space-between" }}>
                            <TextFormat  id="title" backgroundColor="#EFEFEF" txt={group.title} />
                            <div id="update" style={{ backgroundColor: "#EFEFEF", width: "150px", textAlign: "right", paddingRight: "27px", fontSize: "15px", fontWeight: "300", color: "#707070" }}>{DateFormat(group.child_update_time)}</div>
                        </div>
                        <div id="description" style={{ backgroundColor: "#EFEFEF", lineHeight: "35px", height: "69px", textAlign: "left", fontWeight: "100", fontSize: "20px", width: "516px", 
                               wordWrap:"break-word",overflow:"hidden", whiteSpace: "pre-wrap",textOverflow:"ellipsis" }}>{group.explanation}</div>
                        <div id="whosgroup" style={{ backgroundColor: "#EFEFEF", width: "max-content", maxWidth: "275px", lineHeight: "40px", textAlign: "left", fontWeight: "300", fontSize: "20px", cursor: "default", display: "flex" }}><TextFormat chars={32} txt={group.nick_name} id="userName" />님의 그룹</div>
                    </div>
                    <div style={{ backgroundColor: "#EFEFEF", width: "200px", marginTop: "19px", marginLeft: "17px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                        <div className="view" style={{ display: "flex",marginRight:"20px" }}>
                            <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
                            <div style={{color:"#707070", marginLeft: "5px", width: "40px", fontSize: '15px' }}>{NumberFormat(group.view || 0)}</div>
                        </div>
                        <div className="like" style={{ display: "flex", marginRight: "20px" }}>
                            <div><img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} /></div>
                            <div style={{ color:"#707070",marginLeft: "5px", width: "40px", fontSize: '15px' }}>{NumberFormat(group.like || 0)}</div>
                        </div>
                        <div className="child" style={{ display: "flex" }}>
                            <div style={{marginTop:"5px"}}><img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55",marginTop:"10px" }} /></div>
                            <div style={{color:"#707070", marginLeft: "5px", width: "40px", fontSize: '15px',marginTop:"4px" }}>{NumberFormat(group.design || 0 + group.group || 0)}</div>
                        </div>
                    </div>
                </div>
            </GroupElement>
        )
    }
}
export default Group

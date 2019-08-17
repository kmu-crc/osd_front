import React, { Component } from 'react'
import noimg from "source/noimg.png"
import IconView from 'source/IconView'

class Group extends Component {
    handleGotoDetail = (where) => {
        window.location.href = `groupDetail/${where}`
    }
    render() {
        const group = this.props.data
        var four_child = [null, null, null, null]
        if (group.children) {
            for (var i = 0; i < 4; i++) {
                four_child[i] = group.children[i]
            }
        }
        return (
            <div style={{ display: "flex", height: "230px", width: "902px", borderRadius: "15px", backgroundColor: "#EFEFEF" }}>
                {/*group.design > 0 || group.group > 0 ? (*/
                    <div style={{ position: "absolute", display: "flex", marginLeft: "587px", marginTop: "137px", width: "295px" }}>
                        {four_child.map((child, index) => {
                            return (child
                                ? <div key={index} style={{ backgroundImage: `url(${child.m_img})`, backgroundSize: "cover", backgroundPosition: "center center", marginRight: "5px", height: "70px", width: "70px", borderRadius: "15px", backgroundColor: "#D6D6D6" }} />
                                : <div key={index} style={{ marginRight: "5px", height: "70px", width: "70px", borderRadius: "15px", backgroundColor: "#D6D6D6" }} />)
                        })}
                    </div>
                    /*) : (<></>)*/}
                <div onClick={() => { this.handleGotoDetail(group.uid) }} style={{ cursor: "pointer", height: "230px", width: "230px", borderRadius: "15px", backgroundColor: "#D6D6D6", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", backgroundImage: group.thumbnailUrl && group.thumbnailUrl.m_img ? `url(${group.thumbnailUrl.m_img})` : `url(${noimg})` }} />
                <div>
                    <div style={{ marginTop: "19px", width: "655px", marginLeft: "17px", fontFamily: "Noto Sans KR" }}>
                        <div style={{ lineHeight: "40px", textAlign: "left", fontWeight: "700", fontSize: "20px", display: "flex", justifyContent: "space-between" }}>{group.title.substring(0, 32)}<p style={{ width: "75px", textAlign: "left", fontSize: "15px", fontWeight: "300", color: "#707070" }}>{group.child_update_time.substring(0, 5)}</p></div>
                        <div style={{ lineHeight: "35px", height: "69px", textAlign: "left", fontWeight: "100", fontSize: "20px", width: "516px", whiteSpace: "pre-wrap" }}>{group.explanation || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore"}</div>
                        <div style={{ lineHeight: "40px", textAlign: "left", fontWeight: "300", fontSize: "20px" }}>{group.nick_name}님의 그룹</div>
                    </div>
                    <div style={{ marginTop: "19px", marginLeft: "17px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                        <div style={{ display: "flex", marginRight: "22px" }}>
                            <div><IconView width="17.24px" height="11.41px" fill="#707070" /></div>
                            <div style={{ marginLeft: "5.85px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{group.view || 0}</div>
                        </div>
                        <div style={{ display: "flex", marginRight: "0px" }}>
                            <div><i style={{ color: "#707070", fontSize: "14px" }} className="material-icons">thumb_up</i></div>
                            <div style={{ marginLeft: "6px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{group.like || 0}</div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div><i style={{ color: "#707070", fontSize: "17px" }} className="material-icons">library_books</i></div>
                            <div style={{ marginLeft: "5px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{group.design || 0 + group.group || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Group

import React, { Component } from 'react'
import styled from 'styled-components';
import IconView from "source/IconView"
import thumbup from "source/baseline_thumb_up_black_48dp_2x.png"

import dots from "source/baseline_more_vert_black_48dp.png";
import noimg from "source/noimg.png"
import DateFormat from "modules/DateFormat"


const GroupInfoData = {
    title: "TITLE",
    parentName:"parentname",
    parentId:"",
    grand_parentName:"grand_name",
    grand_parentGroup:"grand_group",
    url: "URL",
    category: "CATEGORY",
    designer: "DESIGNER",
    view: 0,
    like: 0,
    design: 0,
    description: "Description"

};

const Arrow = styled.div`
    width: 12px;
    height: 14px;
    bacgkground: #707070;
    opacity: 0.55;
    border-left: 14px solid #707070;
    border-bottom: 6px solid transparent;
    border-top: 6px solid transparent;
`
//transform: rotate()
class GroupInfoComponent extends Component {



    handleRequestJoinGroup() {
        alert("JOIN!")
    }
    handleMoreViewDescription = (description) => {
        alert(description)
    }
    render() {
        const GroupInfo = (props) => {
            //const info = props.GroupInfo || GroupInfoData
            const info = GroupInfoData;
            return (
                <div style={{ marginLeft: "65px", display: "flex", width: "100%" ,fontFamily: "Noto Sans KR"}}>
                    <div style={{display:"flex"}}>
                        {info.parentName ?
                            info.grand_parentName ?
                                <>
                                    <div><img src={dots} style={{height:"15px", width:"15px",transform: "rotate(90deg)", marginTop:"22px", opacity:"0.55" }}/></div>
                                    <Arrow style={{marginLeft:"10px", marginTop:"22px"}}/>
                                    <div style={{marginLeft:"10px",marginTop:"14px", fontSize:"20px", fontWeight:"300", color:"#707070"}}>{info.parentName}</div>
                                    <Arrow style={{marginLeft:"10px", marginTop:"22px"}}/>
                                </>
                                :
                                <>
                                    <div style={{marginTop:"14px", fontSize:"20px", fontWeight:"300", color:"#707070"}}>{info.parentName}</div>
                                    <Arrow style={{marginLeft:"10px", marginTop:"22px"}}/>
                                </>
                            :
                            {/*<div></div>*/}
                        }
                        <div style={{marginLeft:"10px"}}>
                            <div style={{ marginTop: "15px", width: "220px", height: "29px", color: "#707070", fontSize: "20px", textAlign: "left", lineHeight: "25px", fontFamily: "Noto Sans KR", fontWeight: "500" }}>{info.title && info.title.slice(0, 14)}{info.title && info.title.length > 14 ? "..." : ""}</div>

                            <div style={{
                                marginLeft: "14px", marginTop: "9px", width: "170px", height: "170px", borderRadius: "15px",
                                backgroundColor: "#D6D6D6", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center",
                                backgroundImage: info && info.img && info.img.l_img ? `url(${info.img.l_img})` : `url(${noimg})`
                            }} />
                        </div>
                    </div>






                    <div style={{ marginLeft: "51px" }}>
                        <div style={{ marginTop: "15px", width: "95px", height: "25px", color: "#FF0000", lineHeight: "25px", fontSize: "17px", textAlign: "left", fontWeight: "300" }}>{/*info.category*/}</div>
                        <div style={{ marginTop: "15px", width: "273px", height: "30px", color: "#707070", lineHeight: "29px", fontSize: "20px", textAlign: "left", fontWeight: "500" }}>개설자 : {info.userName && info.userName.slice(0, 16)}</div>
                        <div style={{ marginTop: "11px", height: "90px", display: "flex", fontSize: "17px", color: "#707070", lineHeight: "30px" }}>
                            <div style={{ width: "621px" }}>
                                {info.description ? info.description.slice(0, 200) : `${info.userName}님의 "${info.title}" 그룹입니다.`}
                            </div>
                            <div style={{ marginLeft: "41px", width: "621px" }}>
                                {info.description && info.description.slice(200, 400)}
                                {info.description && info.description.length > 400 && <>...</>
                                /* <div style={{ fontSize: "13px", cursor: "pointer", color: "#FF0000" }} onClick={() => this.handleMoreViewDescription(info.description)}>더보기</div> */}
                            </div>
                        </div>
                        <div style={{ marginTop: "17px", width: "250px", height: "25px" }}>
                            <div style={{ marginTop: "19px", marginLeft: "17px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
                                <div style={{ display: "flex", marginRight: "22px" }}>
                                    <div><IconView width="17.24px" height="11.41px" fill="#707070" /></div>
                                    <div style={{ marginLeft: "5.85px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{info.view}</div>
                                </div>
                                <div style={{ display: "flex", marginRight: "0px" }}>
                                    <div><i style={{ color: "#707070", fontSize: "14px" }} className="material-icons">thumb_up</i></div>
                                    <div style={{ marginLeft: "6px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{info.like}</div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div><i style={{ color: "#707070", fontSize: "17px" }} className="material-icons">library_books</i></div>
                                    <div style={{ marginLeft: "5px", fontSize: "15px", width: "34px", height: "22px", lineHeight: "40px", textAlign: "left", fontWeight: "500", color: "#707070" }}>{info.design}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginLeft: "auto", marginRight: "72px", order: "2", fontFamily: "Noto Sans KR" }}>
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "15px", width: "79px", height: "29px", fontSize: "20px", color: "#FF0000" }} onClick={this.handleRequestJoinGroup}>가입 신청</div>
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "37px", width: "183px", height: "45px", display: "flex" }}>
                            <div style={{ width: "133px", height: "25px", marginTop: "10px", fontWeight: "300", fontSize: "17px", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>관심 그룹 등록하기</div>
                            <div style={{ height: "45px", width: "45px", marginLeft: "5px", opacity: ".55", background: `transparent url(${thumbup})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
                        </div>
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "43px", width: "147px", height: "55px", fontWeight: "300", fontSize: "17px", lineHeight: "30px", fontFamily: "Noto Sans KR", color: "#707070", letterSpacing: "0", textAlign: "right" }}>
                            최근 업데이트 {info && DateFormat(info.child_update_time)}<br />
                            {info && DateFormat(info.create_time)} 등록
                        </div>
                    </div>
                </div>
            )
        }
        const LoadingGroupInfo = () => {
            return (
                <div style={{ opacity: ".5", marginLeft: "65px", display: "flex", width: "100%" }}>
                    <div>
                        <div style={{ marginTop: "15px", width: "197px", height: "29px", backgroundColor: "#707070", borderRadius: "15px" }} />
                        <div style={{ marginLeft: "14px", marginTop: "9px", width: "170px", height: "170px", backgroundColor: "#D6D6D6", borderRadius: "15px" }} />
                    </div>
                    <div style={{ marginLeft: "51px" }}>
                        <div style={{ marginTop: "15px", width: "95px", height: "25px", backgroundColor: "#FFA0A0", borderRadius: "15px" }} />
                        <div style={{ marginTop: "15px", width: "273px", height: "30px", backgroundColor: "#707070", borderRadius: "15px" }} />
                        <div style={{ marginTop: "11px", width: "621px", height: "90px", backgroundColor: "#A3A7A3", borderRadius: "15px" }} />
                        <div style={{ marginTop: "17px", width: "250px", height: "25px", backgroundColor: "#0FA0A0", borderRadius: "15px" }} />
                    </div>
                    <div style={{ marginLeft: "42px" }}>
                        <div style={{ marginTop: "15px", width: "95px", height: "25px", borderRadius: "15px" }} />
                        <div style={{ marginTop: "15px", width: "273px", height: "30px", borderRadius: "15px" }} />
                        <div style={{ marginTop: "11px", width: "621px", height: "90px", backgroundColor: "#A3A7A3", borderRadius: "15px" }} />
                        <div style={{ marginTop: "17px", width: "250px", height: "25px", borderRadius: "15px" }} />
                    </div>
                    <div style={{ marginLeft: "auto", marginRight: "72px", order: "2" }}>
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "15px", width: "95px", height: "29px", backgroundColor: "#FFD6D6", borderRadius: "15px" }} />
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "37px", width: "183px", height: "45px", backgroundColor: "#D6D6D6", borderRadius: "15px" }} />
                        <div style={{ marginLeft: "auto", marginRight: "0px", marginTop: "43px", width: "147px", height: "55px", backgroundColor: "#D6D6D6", borderRadius: "15px" }} />
                    </div>
                </div>)
        }
        const info = this.props.GroupInfo
        return (<div style={{ width: "1920px", height: "237px", backgroundColor: "#EFEFEF", display: "flex" }}>
            {info ? <GroupInfo GroupInfo={info} /> : <LoadingGroupInfo />}
        </div >)
    }
}

export default GroupInfoComponent

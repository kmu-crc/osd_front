import React, { Component } from 'react'
// import styled from 'styled-components'
import SelectBox from "components/Commons/SelectBox"
import Checkbox from "components/Commons/CheckBox"

const category1 = [{ id: 0, value: "대분류" },
{ id: 1, value: "패션" },
{ id: 2, value: "제품" },
{ id: 3, value: "커뮤니케이션" },
{ id: 4, value: "공간" },
{ id: 5, value: "엔터테인먼트" },
{ id: 6, value: "소프트웨어" },
{ id: 7, value: "새분야" }]
class MyInfoModifyPage extends Component {
    state = { nick: true }
    _demo_switchNickOp = () => {
        this.setState({ nick: !this.state.nick })
    }
    _demo_goReturnPrevPage = () => {
        window.history.go(-1)
    }
    render() {
        return (<>
            <div style={{ width: "1920px", display: "block", height: "48px", marginTop: "8px", backgroundColor: "#EFEFEF" }}>
                <div style={{
                    display: "inline-block", marginLeft: "65px", marginTop: "9px", width: "92px", height: "29px",
                    fontFamily: "Noto Sans KR", fontWeight: "500", textAlign: "left", lineHeight: "29px", color: "#707070", fontSize: "20px"
                }}>마이페이지</div>
            </div>
            <form>
                <div style={{ marginLeft: "157px", marginTop: "100px", width: "1544px", fontFamily: "Noto Sans KR" }}>
                    {/* profile */}
                    <div style={{ width: "1544px" }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }}>프로필 사진</div>
                            <div style={{ marginLeft: "67px", width: "280px", height: "280px", borderRadius: "50%", backgroundColor: "#EFEFEF" }} />
                            <div style={{ marginLeft: "60px", marginTop: "199px" }}>
                                <div style={{ width: "63px", height: "25px", cursor: "pointer" }}>
                                    <div style={{
                                        fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000"
                                    }}>찾아보기</div></div>
                                <div style={{ width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }}>
                                    프로필 사진은 대표적으로 보이게 되는 사진으로, JPG/<br />JPEG/PNG 파일을 등록 가능합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* nick */}
                    <div style={{ marginTop: "86px", width: "1544px" }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "117px", width: "56px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>닉네임</div>
                            <div style={{
                                width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "27px",
                                fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
                            }} >
                                <input type="text" style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="닉네임을 입력하세요." />
                            </div>
                            <div style={{ marginTop: "16px", marginLeft: "27.5px", fontSize: "17px", fontWeight: "300", lineHeight: "25px", color: "#707070", width: "230px", height: "25px" }}>
                                {this.state.nick ? <div onClick={this._demo_switchNickOp}>사용 가능한 닉네임입니다.</div> :
                                    <div style={{ color: "#FF0000" }} onClick={this._demo_switchNickOp}>사용 하실 수 없는 닉네임입니다.</div>}
                            </div>
                        </div>
                    </div>
                    {/* introduction */}
                    <div style={{ marginTop: "50px", display: "flex" }}>
                        <div style={{ width: "75px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>자기소개</div>
                        <div style={{ width: "1080.5px", height: "189px", marginLeft: "98px", backgroundColor: "#EFEFEF", borderRadius: "27px", marginTop: "14px", }}>
                            <textarea style={{
                                width: "1026.5px", height: "152px", outline: "none", border: "none", resize: "none", fontSize: "20px", backgroundColor: "#EFEFEF",
                                color: "#707070", marginTop: "22px", marginLeft: "27px", marginBottom: "15px", marginRight: "27px"
                            }} placeholder="자기소개를 입력하세요." />
                        </div>
                    </div>
                    {/* pw */}
                    <div style={{ marginTop: "38px", display: "flex" }}>
                        <div style={{ width: "75px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>비밀번호</div>
                        <div style={{
                            marginLeft: "98px", marginTop: "9px",
                            width: "1080.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "27px",
                            fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
                        }} >
                            <input type="password" style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "1024.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="비밀번호를 입력하세요." />
                        </div>
                    </div>
                    {/* pw verify */}
                    <div style={{ marginTop: "55px", display: "flex" }}>
                        <div style={{ width: "115px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>비밀번호 확인</div>
                        <div style={{
                            marginLeft: "52px",
                            width: "1080.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "27px",
                            fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070"
                        }} >
                            <input type="password" style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "1024.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="비밀번호를 입력하세요." />
                        </div>
                    </div>
                    {/* category */}
                    <div style={{ marginTop: "51px", display: "flex" }}>
                        <div style={{ width: "74px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>카테고리</div>
                        <div style={{ marginLeft: "98px", marginTop: "4px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "27px" }} ><SelectBox items={category1} /></div>
                        <div style={{ marginLeft: "64.5px", marginTop: "4px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "27px" }} ><SelectBox items={category1} /></div>
                    </div>
                    {/* as designer */}
                    <div style={{ marginTop: "69px" }}>
                        <div style={{ width: "157px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>디자이너 활동 여부</div>
                        <div style={{ marginTop: "24px", marginLeft: "172px", width: "708px", height: "29px", padding: "0px", display: "flex" }}>
                            <Checkbox txt="네, 디자이너로 활동하겠습니다!" /></div>
                    </div>
                    {/* submit */}
                    <div style={{ marginTop: "56px", marginLeft: "1470px", marginBottom: "156px" }}>
                        <div
                            onClick={this._demo_goReturnPrevPage}
                            style={{ width: "74px", height: "29px", lineHeight: "29px", color: "#FF0000", fontSize: "20px", borderBottom: "1.5px solid #FF0000", fontWeight: "500", cursor: "pointer" }}>등록하기</div></div>
                </div>
            </form>
        </>)
    }
}

export default MyInfoModifyPage 

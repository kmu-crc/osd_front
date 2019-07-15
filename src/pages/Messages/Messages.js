import React, { Component } from 'react'
import plus from "source/plus_cross_gray.png"
import jina from "source/jina.png"
import styled from "styled-components"
const List = styled.div`
    margin-top: 14.09px;
    width: 365px;
    height: 738px;
    overflow: hidden;
    &:hover {
        overflow-y: scroll;
    }
`
const TextArea = styled.textarea`
padding-top: 13px;
padding-right: 30px;
background-color: #EFEFEF;
border: none;
resize: none;
width: 1091px;
height: 147px;
font-size: 18px;
line-height: 27px;
font-weight: 500;
text-align: left;
color: #707070;
&:focus{
    outline: 1px solid #707070;
}
`
class Messages extends Component {
    render() {
        const Peer = () => {
            return (
                <div style={{ width: "336px", marginBottom: "30px", display: "flex" }}>
                    <div style={{ width: "70px", height: "70px", background: `url(${jina})`, backgroundSize: "cover", backgroundPosition: "center center" }} />
                    <div style={{ width: "244px", height: "70px", marginLeft: "22px" }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "123px", height: "29px", fontSize: "17px", color: "#707070", textAlign: "left", fontWeight: "500", marginRight: "22px" }}>진아진아진아</div>
                            <div style={{ marginTop: "3px", width: "99px", height: "23px", fontSize: "14px", color: "#707070", textAlign: "left", fontWeight: "300" }}>최근 활동:8분 전</div>
                        </div>
                        <div style={{ width: "244px", height: "28px", marginTop: "10px", fontSize: "17px", color: "#707070", textAlign: "left", fontWeight: "300" }}>아 감사합니다!</div>
                    </div>
                </div>
            )
        }
        return (<>
            <div style={{ width: "1920px", display: "block", height: "48px", backgroundColor: "#EFEFEF" }}>
                <div style={{
                    display: "inline-block", marginLeft: "65px", marginTop: "9px", width: "74px", height: "29px",
                    fontFamily: "Noto Sans KR", fontWeight: "500", textAlign: "left", lineHeight: "29px", color: "#707070", fontSize: "20px"
                }}>메시지함</div>
            </div>
            <div style={{ width: "1750px", height: "869px", marginTop: "25px", marginLeft: "85px", marginBottom: "28px", display: "flex" }}>
                <div style={{ width: "445px", backgroundColor: "#EFEFEF", borderRadius: "25px 0 0 25px", paddingLeft: "54px" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{
                            width: "303px", height: "30px", marginTop: "34px", fontFamily: "Noto Sans KR",
                            fontWeight: "500", textAlign: "left", fontSize: "20px", lineHeight: "29px", color: "#707070"
                        }}>받은 메시지함</div>
                        <div style={{
                            width: "50.91px", height: "50.91px", marginLeft: "20px", marginTop: "25px",
                            background: `url(${plus})`, backgroundSize: "cover", backgroundPosition: "center center"
                        }} />
                    </div>
                    {/* <div style={{ marginTop: "14.09px", width: "336px", height: "738px", overflowY: "auto" }}> */}
                    <List>
                        <Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer />
                    </List>
                    {/* </div> */}
                </div>
                <div style={{ width: "7px", backgroundColor: "#FFFFFF" }}></div>
                <div style={{ width: "1298px", backgroundColor: "#EFEFEF", borderRadius: "0px 25px 25px 0px", paddingLeft: "27px" }}>
                    <div style={{ width: "123px", height: "29px", marginTop: "36px", fontWeight: "500", fontSize: "20px", lineHeight: "29px", color: "#707070" }}>진아진아진아</div>
                    <div style={{ width: "99px", height: "23px", marginTop: "5px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", color: "#707070" }}>최근 활동:8분 전</div>
                    <div>
                        <div >
                            {/* received */}
                            <div style={{
                                marginTop: "311px",
                                width: "571px", height: "57px", backgroundColor: "#FFFFFF", borderRadius: "25px", marginBottom: "4px",
                                paddingTop: "16px", paddingRight: "25px", paddingBottom: "18px", paddingLeft: "20px"
                            }}>
                                <div style={{ width: "526px", height: "23px", fontSize: "17px", fontWeight: "500", textAlign: "left", lineHeight: "25px", color: "#707070" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        </div>
                            </div>
                            {/* sent */}
                            <div style={{
                                width: "571px", height: "139px", backgroundColor: "#FFFFFF", borderRadius: "25px", marginBottom: "4px"
                                , paddingTop: "16px", paddingRight: "25px", paddingBottom: "18px", paddingLeft: "20px"
                                , marginLeft: "677px", marginBottom: "70px"
                            }}>
                                <div style={{ width: "526px", height: "105px", fontSize: "17px", fontWeight: "500", lineHeight: "25px", textAlign: "left", color: "#707070" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                </div>
                            </div>
                        </div>
                        <div style={{ marginRight: "23px", borderTop: "1px solid #707070", display: "flex" }}>
                            <div style={{ width: "1091px", height: "170px", marginTop: "10px", marginRight: "10px" }}>
                                <TextArea >
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </TextArea>
                            </div>
                            <div style={{ width: "117px", height: "170px", backgroundColor: "#FFFFFF", borderRadius: "0 0 25px 0", display: "table" }}>
                                <div style={{ display: "table-cell", verticalAlign: "middle", textAlign: "center", width: "68px", height: "33px", fontSize: "18px", cursor: "pointer", lineHeight: "27px", color: "#707070" }}>
                                    전송하기
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Messages

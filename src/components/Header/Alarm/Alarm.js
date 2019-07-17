import React, { Component } from 'react'
import styled from 'styled-components'
import alarm from "source/alarm.png"

const AlarmContainer = styled.div`
    z-index:989;
    cursor: pointer;
    background: url(${alarm});
    width: 34px;
    height: 34px;
    background-size: 100% 100%;
    opacity: .5; 
    background-repeat: no-repeat;
    background-position: center center;
    border: none;
`
const AlarmLabel = styled.div`
    position: absolute;
    opacity: 100%;
    top: ${props => props.top};
    left: ${props => props.left};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: red;
`
const AlarmList = styled.div`
  display: ${props => props.display};
  z-index: 1000;
  position: absolute;
  pointer-events: auto;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  z-index: 904;
  height: 634px;
  width: 424px;
  border-radius: 25px;
  border: 1px solid #FF0000;
  background-color: #FFFFFF;
  font-family: Noto Sans KR;
  .list {
      margin-top: 36px;
      padding-left: 36px;
      padding-right: 36px;
      padding-bottom: 5px;
      height: 520px;
      overflow-y: hidden;
    &:hover{
        overflow-y: scroll;
        }
    }
`
const ListItem = styled.div`
        opacity: ${props => props.confirm ? 0.5 : 1};
        width: 351px;
        display: flex;
        height: 70px;
        margin-bottom: 15px;
        border-bottom: 1px solid #B7B7B7;
        &:hover {
            background-color: #EFEFEF;
            opacity: 0.95;
        }
`
const ALARM = {
    list: [
        { uid: 0, quest: true, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/de28da48192867.5891272d2dd95.jpg", date: "3시간 전", message_code: "님이 이 디자인에 초대하였습니다.", from: "진아진아진아" },
        { uid: 1, quest: true, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/bb380d81730827.5d1e1805aa11d.png", date: "3시간 전", message_code: "님이 그룹가입신청을 하였습니다.", from: "진아진아진아" },
        { uid: 2, quest: false, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/6aa1af48192867.58912f833de55.jpg", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 3, quest: false, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/5bdefb48192867.58912f8340811.jpg", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 4, quest: false, confirm: true, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/61f04381730827.5d1e1805a8c42.png", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 5, quest: false, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/2ace3981543905.5d034f109b630.png", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 6, quest: false, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/a7017e74391183.5c2e4cf28b286.png", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
    ]
}
const MESSAGES = {
    list: [
        { uid: 0, confirm: true, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/de28da48192867.5891272d2dd95.jpg", date: "3시간 전", message_code: "님이 메시지를 보냈습니다.", from: "진아진아진아" },
        { uid: 1, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/6aa1af48192867.58912f833de55.jpg", date: "3시간 전", message_code: "님이 메시지를 보냈습니다.", from: "진아진아진아" },
        { uid: 2, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/5bdefb48192867.58912f8340811.jpg", date: "3시간 전", message_code: "님이 메시지를 보냈습니다.", from: "진아진아진아" },
        { uid: 3, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/61f04381730827.5d1e1805a8c42.png", date: "3시간 전", message_code: "님이 메시지를 보냈습니다.", from: "진아진아진아" },
        { uid: 4, confirm: true, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/bb380d81730827.5d1e1805aa11d.png", date: "3시간 전", message_code: "님이 메시지를 보냈습니다.", from: "진아진아진아" },
        { uid: 5, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/2ace3981543905.5d034f109b630.png", date: "3시간 전", message_code: "님이 메시지를 보냈습니다.", from: "진아진아진아" },
        { uid: 6, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/a7017e74391183.5c2e4cf28b286.png", date: "3시간 전", message_code: "님이 메시지를 보냈습니다.", from: "진아진아진아" },
    ]
}
class Alarm extends Component {
    state = { open: false, top: 0, left: 0, mode: "alarm" }
    openAlarmList = (e) => {
        document.addEventListener("mousedown", this.checkClickOutside)
        const top = e.clientY + 10
        const left = e.clientX - (e.clientX + 150 > window.screenLeft ? 250 : 175)
        this.setState({ open: true, top: top, left: left })
    }
    switchMode = (mode) => {
        this.setState({ mode: mode })
    }
    myRef = React.createRef()
    checkClickOutside = (e) => {
        if (this.myRef.current === null) return
        if (!this.myRef.current.contains(e.target)) {
            this.setState({ open: false, top: 0, left: 0 })
            document.removeEventListener("mousedown", this.checkClickOutside)
        }
    }
    render() {
        // alarm has two mode - alarm and message
        const { mode } = this.state
        const alarms = ALARM
        const messages = MESSAGES
        return (
            <>
                {this.state.open &&
                    <AlarmList ref={this.myRef} top={this.state.top} left={this.state.left}>
                        <div style={{ display: "flex", height: "58px", fontSize: "17px", color: "#707070", fontWeight: "500" }}>
                            <div style={{ cursor: "pointer", width: "210px", borderRadius: "25px 0 0 0", backgroundColor: mode === "alarm" ? "#FFFFFF" : "#F8F8F8" }} onClick={() => this.switchMode("alarm")}>
                                <div style={{ marginTop: "13px", marginLeft: "33px" }} >알림</div></div>
                            <div style={{ cursor: "pointer", width: "214px", borderRadius: "0 25px 0 0", backgroundColor: mode === "message" ? "#FFFFFF" : "#F8F8F8" }} onClick={() => this.switchMode("message")}>
                                <div style={{ marginTop: "13px", marginLeft: "28px" }} >메시지</div></div>
                        </div>
                        <div className="list">
                            {mode === "alarm" ? (
                                alarms.list.map(item => {
                                    return (<ListItem confirm={item.confirm} key={item.uid}>
                                        <div style={{ background: `url(${item.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center", width: "45px", height: "45px", borderRadius: "15%" }} />
                                        <div style={{ height: "19px", width: "290px", lineHeight: "16px", marginLeft: "22px" }}>
                                            <div style={{ fontSize: "16px", fontWeight: "500" }}>{item.from}{item.message_code}</div>
                                            <div style={{ width: "100%", float: "right", marginTop: "16px", fontSize: "13px", fontWeight: "300", display: "flex", justifyContent: "space-between" }}>
                                                <div>{item.date}</div>
                                                <div style={{ display: "flex" }}>
                                                    {item.quest && !item.confirm ?
                                                        (<>
                                                            <div style={{ cursor: "pointer", margin: "auto 0", color: "#FF0000", borderBottom: "1px solid red" }}>승인</div>
                                                            <div style={{ cursor: "pointer", marginLeft: "10px", borderBottom: "1px solid #707070" }}>거절</div>
                                                        </>)
                                                        : (<></>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </ListItem>)
                                })) : (
                                    messages.list.map(item => {
                                        return (<ListItem confirm={item.confirm} key={item.uid}>
                                            <div style={{ background: `url(${item.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center", width: "45px", height: "45px", borderRadius: "50%" }} />
                                            <div style={{ height: "19px", width: "290px", lineHeight: "16px", marginLeft: "22px" }}>
                                                <div style={{ fontSize: "16px", fontWeight: "500" }}>{item.from}{item.message_code}</div>
                                                <div style={{ marginTop: "16px", fontSize: "13px", fontWeight: "300" }}>{item.date}</div>
                                            </div>
                                        </ListItem>)
                                    })
                                )}
                        </div>
                    </AlarmList>}
                {alarms && <AlarmLabel top={10} left={1200} />}
                <AlarmContainer id="alarm" onClick={this.openAlarmList} />
            </>
        )
    }
}

export default Alarm

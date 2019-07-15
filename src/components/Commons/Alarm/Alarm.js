import React, { Component } from 'react'
import styled from 'styled-components'
import alarm from "source/alarm.png"

const AlarmContainer = styled.div`
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
  height: 630px;
  width: 420px;
  border-radius: 15px;
  border: 1px solid #FF0000;
  background-color: #FFFFFF;
  color: #707070;
  font-size: 20px;
  font-weight: 500;
  padding: 15px;
`;
// border: 1px solid blue;
const UserMenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 32px;
  padding-left: 13px;
  padding-right: 13px;
  line-height: 30px;
  text-align: left;
  &:hover {}
`;

const ALARM = {
    list: [
        { uid: 0, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/de28da48192867.5891272d2dd95.jpg", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 1, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/6aa1af48192867.58912f833de55.jpg", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 2, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/5bdefb48192867.58912f8340811.jpg", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 3, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/61f04381730827.5d1e1805a8c42.png", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 4, confirm: true, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/bb380d81730827.5d1e1805aa11d.png", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 5, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/2ace3981543905.5d034f109b630.png", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
        { uid: 6, confirm: false, thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/a7017e74391183.5c2e4cf28b286.png", date: "3시간 전", message_code: "님이 좋아요를 눌렀습니다.", from: "진아진아진아" },
    ]
}
class Alarm extends Component {
    state = { open: false, top: 0, left: 0 }
    openAlarmList = (e) => {
        document.addEventListener("mousedown", this.checkClickOutside)
        const top = e.clientY + 10
        const left = e.clientX - (e.clientX + 150 > window.screenLeft ? 250 : 175)
        this.setState({ open: true, top: top, left: left })
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
        // const { alarms } = this.props
        const alarms = ALARM
        return (
            <>
                {this.state.open && <AlarmList ref={this.myRef} top={this.state.top} left={this.state.left}>
                    <div style={{ display: "flex" }}>
                        <div>알림</div><div>메시지</div>
                    </div>
                    <div style={{ height: "520px", overflowY: "scroll" }}>
                        {alarms.list.map(item => {
                            return (
                                <div style={{ height: "75px", marginBottom: "25px", borderBottom: "1px solid #EFEFEF" }} key={item.uid}><img src={item.thumbnail} style={{ width: "45px", height: "45px", borderRadius: "15%" }} />{item.from}{item.message_code}<br />{item.date}</div>
                            )
                        })
                        }
                    </div>
                </AlarmList>}
                {alarms && <AlarmLabel top={10} left={1200}/>}
                <AlarmContainer id="alarm" onClick={this.openAlarmList} />
            </>
        )
    }
}

export default Alarm

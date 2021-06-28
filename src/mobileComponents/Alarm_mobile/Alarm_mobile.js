import React, { Component } from "react"
import { Icon } from "semantic-ui-react"
import TextSlicer from "modules/TextSlicer"
import { alert } from "components/Commons/Alert/Alert"
import { AlarmWrapper, NewAlarmCircle, AlarmModal } from "./style"
import Cross from "components/Commons/Cross"


export default class Alarm_mobile extends Component {
    constructor(props) {
        super(props);
        this.state = { alarm_list: false };
        this.onAlarmHandler = this.onAlarmHandler.bind(this);
        this.openAlarmHandler = this.openAlarmHandler.bind(this);
        this.alarmConfirm = this.alarmConfirm.bind(this);
        this.allAlarmConfirm = this.allAlarmConfirm.bind(this);
        this.getLink = this.getLink.bind(this);
        this.getMessageText = this.getMessageText.bind(this);
        this.showButton = this.showButton.bind(this);
        this.parseAlarms = this.parseAlarms.bind(this);
    };
    onAlarmHandler = e => {
        if (e.type === "blur" && !this.alarm.contains(e.relatedTarget)) {
            this.setState({ alarm_list: false });
        }
    };
    openAlarmHandler = _e => {
        this.setState({ alarm_list: !this.state.alarm_list });
    };
    alarmConfirm = (id, url) => {
        this.props.socket.emit("confirm", { uid: this.props.userInfo.uid, alarmId: id });
        console.log(url);
        if (url == null) {
            window.location.reload();
        } else {
            window.location.href = url;
        }
    };
    allAlarmConfirm = async () => {
        await alert('모든 알림들을 읽음으로 표시합니다.');
        this.props.socket.emit("allConfirm", { user_id: this.props.userInfo.uid });
        window.location.reload();
    };
    getLink = item => {
        let link = ``;
        if (item.type === "MESSAGE") {
            link = `/message/${item.from_user_id}/${item.fromUser}`
        } else if (item.type === "DESIGN") {
            link = `/designDetail/${item.content_id}`
            if (item.kinds === "INVITE") {
                link = `/myPage/join/invited`
            }
        } else if (item.type === "GROUP") {
            link = `/groupDetail/${item.content_id}`
        }
        return link
    };
    getMessageText = item => {
        let msg = ""
        console.log(item.detail);
        const from = item.detail && item.detail.fromName && item.detail.fromName.nick_name ? TextSlicer(item.detail.fromName.nick_name, 5) : "유저";
        const name = item.detail && item.detail.itemName && item.detail.itemName.title ? TextSlicer(item.detail.itemName.title, 6) : "이름없음";
        // const to = item.detail && item.detail.toName && item.detail.toName.nick_name ? TextSlicer(item.detail.toName.nick_name, 5) : "유저"
        switch (item.type) {
            case "ITEM_PURCHASED_TO_EXPERT": msg = `${from}님이 아이템을 구매하였습니다.`; break;
            case "ITEM_PURCHASED_TO_USER": msg = `아이템'${name}'을 구매하였습니다`; break;
            case "ITEM_REQUEST_TO_DESIGNER": msg = `${from}님이 디자인을 의뢰하였습니다`; break;
            case "ITEM_REQUEST_TO_MAKER": msg = `${from}님이 제작을 의뢰하였습니다`; break;
            case "ITEM_RESPONSE_TO_DESIGNER": msg = `${from}님이 디자인 의뢰에 응답하였습니다`; break;
            case "ITEM_RESPONSE_TO_MAKER": msg = `${from}님이 제작 의뢰에 응답하였습니다`; break;
            case "ITEM_QUESTION_TO_OWNER": msg = `${from}님이 '${name}'을 문의하였습니다`; break;
            case "ITEM_REVIEW_TO_OWNER": msg = `${from}님이 '${name}'에 리뷰를 작성하였습니다`; break;
            case "ITEM_LIKE_TO_DESIGNER": msg = `${from}님이 디자이너님을 좋아합니다`; break;
            case "ITEM_LIKE_TO_MAKER": msg = `${from}님이 메이커님을 좋아합니다`; break;
            case "ITEM_LIKE_TO_OWNER": msg = `${from}님이 ${name}을 좋아합니다`; break;
            default:
                msg = `정의되지 않은 알림입니다.`;
        }
        return msg;
    };
    showButton = (item) => {
        const type = item.type, kinds = item.kinds, confirm = item.confirm
        if (confirm === 1) return false
        return (type === "DESIGN" && (kinds === "INVITE" || kinds === "REQUEST")) || (type === "GROUP" && (kinds === "JOIN_withDESIGN" || kinds === "JOIN_withGROUP"))
    };
    parseAlarms = (items) => {
        items.map(item => {
            item.detail = item.content && JSON.parse(item.content);
            return item;
        });
        return items;
    };
    onCloseModal = () => {
        this.setState({ alarm_list: false })
    }

    componentDidUpdate(prevProps) {
        if (this.props.alarms !== prevProps.alarms) {
            return true;
        }
    }

    render() {
        const { alarms } = this.props
        const { alarm_list } = this.state
        const unread = (alarms && alarms.length > 0 && alarms.filter(item => item.confirm === 0).length) || 0

        // console.log( ,window.innerWidth,document.documentElement.clientHeight, window.innerHeight)


        // const converted = this.parseAlarms(alarms);
        // console.log(this.props)
        const dummy = [
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" },
            { message: "아이템 '...'을 구매하였습니다.", date: "5일 전" }
        ]

        return (
            <React.Fragment>

                <AlarmWrapper onClick={this.openAlarmHandler} onBlur={this.onAlarmHandler}>

                    {unread
                        ? <NewAlarmCircle>
                            <p className="count">{unread}</p>
                        </NewAlarmCircle>
                        : null}

                    <Icon className="grey alarm" size="large" />

                </AlarmWrapper>

                <AlarmModal open={alarm_list} onClose={this.onCloseModal}>

                    <div className="top-menu-bar">
                        {/* 다 읽음으로 표시 버튼 <div className="menu-box"></div> */}
                        <div className="close-box">
                            <Cross onClick={this.onCloseModal} angle={45} color={"#707070"} weight={1} width={19} height={19} />
                        </div>
                    </div>

                    <div className="alarm-list">
                        {dummy.map((item, idx) =>
                            <div key={idx} className="element">
                                <div className="bar" />
                                <div className="text">
                                    <div className="message"> {item.message} </div>
                                    <div className="date"> {item.date} </div>
                                </div>
                            </div>
                        )}
                    </div>

                </AlarmModal>

            </React.Fragment>)
    }
}


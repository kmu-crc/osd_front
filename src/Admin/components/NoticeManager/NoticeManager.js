import React, { Component } from 'react'
import host from 'config'
import DatePicker from 'react-date-picker'
import { Icon } from 'semantic-ui-react'

function dateFormat(date) {
    let newDate = new Date(date)
    return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
}
class NoticeList extends Component {
    handleClicked = (id) => {
        this.props.selected(id)
    }
    handleDelete = (id) => {
        this.props.delete(id)
    }
    handleNewNoti = () => {
        this.props.newnoti()
    }
    render() {
        const list = this.props.list
        return (<div>
            <div onClick={this.handleNewNoti} ><Icon name="plus circle" size="large" /> + ADD NEW NOTICE + click here!</div>
            {list &&
                (list.map(item =>
                    <div key={item.uid} style={{ cursor: "pointer", display: "flex" }} >
                        <div style={{ display: "flex" }} onClick={() => this.handleClicked(item.uid)}>
                            <div>제목:{item.title}|&nbsp;&nbsp;&nbsp;</div>
                            <div>기간:{dateFormat(item.start_time)} ~ {dateFormat(item.expiry_time)}</div>
                        </div>
                        <div><input type="button" value="del" onClick={() => this.handleDelete(item.uid)} /></div>
                    </div>))
                // : (<div>no data</div>)
            }
        </div>)
    }
}
class NoticeForm extends Component {
    state = { detail: null }
    submit = () => {
        let form_data = this.refs.notice_form
        const op = form_data.uid.value === "" ? "add" : "edit"
        let data = {}
        data.uid = op === "add" ? null : form_data.uid.value
        data.title = form_data.title.value
        data.type = form_data.type.value
        data.start_time = new Date(this.state.detail.start_time)
        data.expiry_time = new Date(this.state.detail.expiry_time)
        data.content = form_data.content.value && form_data.content.value.replace(/\n/g, "<br/>");
        data.start_time = `${data.start_time.getFullYear()}-${data.start_time.getMonth() + 1}-${data.start_time.getDate()}`
        data.expiry_time = `${data.expiry_time.getFullYear()}-${data.expiry_time.getMonth() + 1}-${data.expiry_time.getDate()}`
        if (data.title.trim().length === 0) { alert('제목입력!'); return }
        if (data.type.trim().length === 0) { alert('형식선택!'); return }
        if (data.start_time === null) { alert('시작일 선택!'); return }
        if (data.expiry_time === null) { alert('종료일 선택!'); return }
        if (data.content.trim().length === 0) { alert('내용입력!'); return }
        op === "edit" ? this.props.editnoti(data) : this.props.addnoti(data)
        this.props.cancel()
    }
    cancel = () => {
        this._setDetail(null)
        this.props.cancel()
    }
    _setDetail(detail) {
        this.setState({ detail: detail })
    }
    componentDidMount() {
        // console.log(this.props.detail)
        this._setDetail(this.props.detail)
    }
    componentWillReceiveProps(nextProps) {
        // console.log("nextP", nextProps.detail && nextProps.detail[0])
        nextProps.detail && this._setDetail(nextProps.detail[0])
    }
    handleStartDateChange = (date) => {
        let detail = this.state.detail
        detail.start_time = date
        detail.expiry_time = date
        this.setState({ detail })
        console.log(detail)
    }
    handleEndDateChange = (date) => {
        let sDate = new Date(this.state.detail.start_time).getTime()
        let eDate = new Date(date).getTime()
        console.log(eDate)
        let detail = this.state.detail
        detail.expiry_time = date
        if (sDate > eDate)
            detail.expiry_time = this.state.detail.start_time
        this.setState({ detail })
    }
    handleChange = (event) => {
        let detail = this.state.detail
        detail[event.target.name] = event.target.value
        this.setState({ detail })
    }
    render() {
        const detail = this.state.detail
        const startDate = detail && this.state.detail.start_time ? new Date(this.state.detail.start_time) : null
        const endDate = detail && this.state.detail.expiry_time ? new Date(this.state.detail.expiry_time) : null
        return (
            detail ?
                <div>
                    <form ref="notice_form">
                        <input name="uid" value={detail.uid} onChange={this.handleChange} hidden />
                        <div>
                            <div><label>제목:</label></div>
                            <div><input name="title" onChange={this.handleChange} value={detail.title} /></div>
                        </div>
                        <div>
                            <div><label>기간:</label></div>
                            <div>
                                시작일자:<DatePicker name="start" onChange={this.handleStartDateChange} value={startDate} minDate={new Date()} />00:00부터<br />
                                종료일자:<DatePicker name="end" onChange={this.handleEndDateChange} value={endDate} minDate={new Date()} />23:59까지
                            </div>
                        </div>
                        <div>
                            <div><label>형식:</label></div>
                            <div>
                                <input name="type" type="radio" value="div" checked disabled />div(현재는 div만 가능)
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>내용:</label>
                            </div>
                            <div>
                                <textarea name="content" onChange={this.handleChange} value={detail.content} />
                            </div>
                        </div>
                    </form>
                    <button onClick={this.submit}>{detail.uid ? "수정" : "추가"}</button>
                    <button onClick={this.cancel}>취소</button>
                </div> : <div>no data</div>
        )
    }
}
class NoticeManager extends Component {
    state = { detail: null, list: [] }
    componentDidMount() {
        this._getNotices()
    }
    _getNotices = () => {
        return fetch(`${host}/admins/getNoticeList`, { headers: { 'Content-Type': 'application/json' }, method: "GET" })
            .then(response => { return response.json() })
            .then(data => { console.log("data", data); this.setState({ list: data.list }) })
            .catch(error => { console.log("err", error) })
    }
    _deleteNotice = (id, token) => {
        return fetch(`${host}/admins/${id}/deleteNotice/`, { headers: { 'x-access-token': token }, method: "POST" })
            .then((response) => { return response.json() })
            .then((res) => { console.log(res.success) })
            .catch((error) => { console.log(error) })
    }
    _updateNoticeDetail = (data, token) => {
        return fetch(`${host}/admins/updateNotice`, { headers: { 'x-access-token': token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then((response) => { return response.json() })
            .then((res) => { console.log(res.success) })
            .catch((error) => { console.log(error) })
    }
    _insertNotice = (data, token) => {
        return fetch(`${host}/admins/insertNotice`, { headers: { 'x-access-token': token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then((response) => { return response.json() })
            .then((res) => { console.log(res.success) })
            .catch((error) => { console.log(error); })
    }
    newnoti = () => { this.setState({ detail: [{ title: "", content: "" }] }) }
    selected = (id) => { this.setState({ detail: this.state.list.filter(item => item.uid === id) }) }
    cancel = () => { this._getNotices(); this.setState({ detail: null }) }
    delete = async (id) => {
        const yes = window.confirm('A U sure?')
        if (yes === false) return
        await this._deleteNotice(id, this.props.admin_token)
        this._getNotices()
    }
    addNotice = (data) => {
        this._insertNotice(data, this.props.admin_token)
            .then(() => alert("입력완료"))
            .catch(error => alert(error + "입력실패"))
    }
    editNotce = (data) => {
        this._updateNoticeDetail(data, this.props.admin_token)
    }
    render() {
        const detail = this.state.detail && this.state.detail[0]
        const list = this.state.list
        return (
            <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                {detail
                    ? <NoticeForm detail={detail} cancel={this.cancel} editnoti={this.editNotce} addnoti={this.addNotice} />
                    : <NoticeList list={list} newnoti={this.newnoti} selected={this.selected} delete={this.delete} />
                }
            </div>)
    }
}
export default NoticeManager

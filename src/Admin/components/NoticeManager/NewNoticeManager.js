import React, { Component } from "react"
import host from "config"
function newDate(date) {
    let ymd = date.split('T')[0]
    // let hm_ = date.split('T')[1].split('.')[0]
    return `${ymd}`//(${hm_})`
}
class NoticeList extends Component {
    handleClicked = (id) => {
        this.props.selected(id)
    }
    handleDelete = (id) => {
        this.props.delete(id)
    }
    render() {
        const list = this.props.list
        return (<div>
            {list ? (
                list.map(item =>
                    <div key={item.uid} style={{ cursor: "pointer", display: "flex" }} >
                        <div style={{ display: "flex" }} onClick={() => this.handleClicked(item.uid)}>
                            <div>{item.title}|</div>
                            <div>{item.content}|</div>
                            <div>{newDate(item.start_time)} ~ {newDate(item.expiry_time)}</div>
                        </div>
                        <div><input type="button" value="del" onClick={() => this.handleDelete(item.uid)} /></div>
                    </div>))
                : (<div>no data</div>)
            }
        </div>)
    }
}
class NoticeForm extends Component {
    state = {
        mode: null, // null, "ADD", "EDIT"
        detail: null
    }
    newNotice = () => {
        this.setState({ detail: this.state.detail === null ? { title: "new", content: "" } : null })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (JSON.stringify(this.props.detail) !== JSON.stringify(nextProps.detail) || this.state.detail !== nextState.detail)
    }
    onChange = (event) => (value) => {
        const target = event.currentTarget
        alert(target)
    }
    onSubmit = (data) => {
        const form = data
        if (form.title.trim().length === 0) { }
        if (form.content.trim().length === 0) { }
    }
    onCancel = (mode) => {
        if (mode === "ADD")
            this.setState({ detail: null })
        else if (mode === "EDIT")
            this.props.selected()
        mode = null
        console.log(this.props.detail, this.state.detail)
    }
    render() {
        const item = this.props.detail ? this.props.detail[0] : null || this.state.detail
        const mode = this.state.detail === null ? "EDIT" : "ADD"
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {item ? (
                        <div>
                            <div>
                                <label>제목</label>
                                <input type="text" onChange={this.onChange} value={item.title} />
                            </div>
                            <div>
                                <label>형식</label>
                                <input type="radio" name="type" value="div" /> div <input type="radio" name="type" value="window" /> window &nbsp;&nbsp;&nbsp;
                            </div>
                            <div> [ ] notice date: start - end </div>
                            <div>...</div>
                            <div>
                                <label>내용</label>
                            </div>
                            <div>
                                <input type="text" onChange={this.onChange} value={item.content} />
                                <input type="submit" value={item.uid ? "수정" : "추가"} /><input type="button" value="취소" onClick={() => this.onCancel(mode)} />
                            </div>

                        </div>
                    ) : (<div onClick={this.newNotice} > 클릭하여 새롭게 추가할 수 있습니다.</div>)}
                </form>
            </div>
        )
    }
}
class NewNoticeForm extends Component {
    state = {
        edit: null,
        detail: null, prev_detail: null
    }
    submit = () => {
        const form = this.refs.notice_form
        console.log(form.title.value, this.state.detail.uid)
    }
    cancel = () => {
        this._setDetail(null)
    }
    _setDetail(detail) {
        // console.log("_setDetail", detail === null)
        this.setState({ edit: detail === null ? null : true, detail: detail, prev_detail: detail })
    }
    componentDidMount() {
        this._setDetail(this.props.detail)
    }
    componentWillReceiveProps(nextProps) {
        // console.log("nextP", nextProps.detail && nextProps.detail[0])
        nextProps.detail && this._setDetail(nextProps.detail[0])
    }
    newNotice = () => this._setDetail({ detail: { title: "", content: "" } })
    handleChange = (event) => {
        console.log(event.target.name, event.target.value)
        let detail = this.state.detail
        detail[event.target.name] = event.target.value
        this.setState({ detail })
        // detail[event.target.name] = event.target.value
    }
    render() {
        const mode = this.state.edit
        const detail = this.state.detail
        return (
            <div>
                {mode ? (
                    <div>
                        <form ref="notice_form">
                            제목<input name="title" onChange={this.handleChange} value={detail.title} />
                            내용<input name="content" onChange={this.handleChange} value={detail.content} />
                        </form>
                        <button onClick={this.submit}> 추가</button>
                        <button onClick={this.cancel}> 취소</button>
                    </div>
                ) : (
                        <div onClick={this.newNotice}> ADD NEW ONE</div>
                    )}
            </div>
        )
    }
}
class NoticeManager extends Component {
    state = {
        selected: null,
        list: []
    }
    componentDidMount() {
        this._getNotices()
    }

    // get notice list
    _getNotices = () => {
        return new Promise((resolve, reject) => {
            fetch(`${host}/admins/getNoticeList`, { headers: { 'Content-Type': 'application/json' }, method: "GET" })
                .then((response) => { return response.json() })
                .then((data) => { console.log(data); this.setState({ list: data.list }) })
                .catch((error) => { console.log("err", error) })
        })
    }
    //details

    // remove
    _deleteNotice = (id, token) => {
        return new Promise((resolve, reject) => {
            fetch(`${host}/admins/${id}/deleteNotice/`, { headers: { 'x-access-token': token }, method: "POST" })
                .then((response) => { return response.json() })
                .then((res) => { resolve(res.success) })
                .catch((error) => { console.log(error); reject(error) })
        })
    }
    //update
    _updateNoticeDetail = (data, token) => {
        return new Promise((resolve, reject) => {
            fetch(`${host}/admins/updateNotice`, { headers: { 'x-access-token': token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
                .then((response) => { return response.json() })
                .then((res) => { resolve(res.success) })
                .catch((error) => { console.log(error); reject(error) })
        })
    }
    //insert
    _insertNotice = (data, token) => {
        return new Promise((resolve, reject) => {
            fetch(`${host}/admins/insertNotice`, { headers: { 'x-access-token': token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
                .then((response) => { return response.json() })
                .then((res) => { resolve(res.success) })
                .catch((error) => { console.log(error); reject(error) })
        })
    }
    // selected notice item
    selectedNotice = (id) => {
        const selected = this.state.list.filter(item => item.uid === id)
        // console.log("selected", selected)
        this.setState({ selected: selected })
    }
    //this._getNoticeDetail(id).then(newSelected => this.setState({ selected: newSelected })) }
    // delete notice item
    deleteNotice = async (id) => {
        const yes = window.confirm('A U sure?')
        if (yes === false) return
        await this._deleteNotice(id, this.props.admin_token)
        this._getNotices()
    }
    insertNotice = (data) => {
        this._insertNotice(data, this.props.admin_token)
            .then(() => alert("입력완료"))
            .catch(error => alert(error + "입력실패"))
    }
    updateNotce = (data) => {
        this._updateNoticeDetail(data, this.props.admin_token)
    }
    render() {
        const list = this.state.list
        const selected = this.state.selected
        console.log(selected)
        return (
            <div style={{ display: "flex" }}>
                {selected === null ?
                    (
                        <div> notice-list
                    <NoticeList list={list} selected={this.selectedNotice} delete={this.deleteNotice} />
                        </div>
                    ) : (
                        <div> notice detail form
                    <NewNoticeForm detail={selected} />
                        </div>
                    )}
            </div>
        )
    }
}

export default NoticeManager

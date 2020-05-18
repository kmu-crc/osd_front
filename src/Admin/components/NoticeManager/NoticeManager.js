import React, { Component } from 'react'
import host from 'config'
import DatePicker from 'react-date-picker'
import { Icon } from 'semantic-ui-react'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";

const EditorWrapper = styled.div`
width:100%;
.ck-editor__editable_inline {
    min-width:100%;
    min-height: ${props => props.height || 70}px;
}
`
const MainBox = styled.div`
    width:100%;
    padding:30px;
    .titleBox{
        width:100%;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin-bottom:10px;
    }
    .bold{
        font-weight:500;
    }
    .font_big{
        font-size:25px;
    }
    .contentsBox{
        width:100%;
        display:flex;
        align-items:center;
        flex-direction:column;
        .label_small{min-width:10%;}
        .label_middle{width:20%}
        .label_big{width:60%;}
        .contents_title{
            width:80%;
            min-width:500px;
            padding:5px 0px;
            border-top:2px solid #848484;
            border-bottom:1px solid #BDBDBD;
            display:flex; 
            align-items:center;
        }
        .contents_piece{
            width:80%;
            min-width:500px;
            padding:10px 0px;
            border-bottom:1px solid #BDBDBD;
            display:flex; 
            align-items:center;
        }
        .writeButtonBox{
            width:80%;
            height:30px;
            display:flex;
            justify-content:flex-end;
            margin-bottom:10px;
            margin-top:10px;s
        }
        .margin_right{
            margin-right:10px;
        }
        .cursor_pointer{
            cursor:pointer;
        }

    }
    .inner_Box{
        width:98%;
        display:flex;
        align-items:center;
    }
`
const Button = styled.div`
    width:${props => props.width == null ? "max-content" : props.width + "%"};
    min-width:max-content;
    height:max-content;
    padding:5px;
    border-radius:5px;
    background-color:${props => props.backgroundColor == null ? "white" : props.backgroundColor};
    color:${props => props.fontColor == null ? "gray" : props.fontColor};
    cursor:pointer;
    margin-left:10px;
    box-shadow: 0px 1px 5px 1px rgba(0,0,0,0.1);

`
const InputText = styled.input.attrs({ type: "text" })`
    width:${props => props.width == null ? "98%" : props.width + "px"};
    height${props => props.height == null ? "98%" : props.height + "px"}px;
    border-radius:5px;
    background-color:#EFEFEF;
    border:none;
    outline:none;
    padding:10px;
`


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
        return (
            // <div>
            //     <div style={{cursor:"pointer"}} onClick={this.handleNewNoti} ><Icon name="plus circle" size="large" /> + ADD NEW NOTICE + click here!</div>
            //     {list &&
            //         (list.map(item =>
            //             <div key={item.uid} style={{ cursor: "pointer", display: "flex" }} >
            //                 <div style={{ display: "flex" }} onClick={() => this.handleClicked(item.uid)}>
            //                     <div>제목:{item.title}|&nbsp;&nbsp;&nbsp;</div>
            //                     <div>기간:{dateFormat(item.start_time)} ~ {dateFormat(item.expiry_time)}</div>
            //                 </div>
            //                 <div><input type="button" value="del" onClick={() => this.handleDelete(item.uid)} /></div>
            //             </div>))
            //     }
            // </div>
            <MainBox>
                <div className="titleBox"><div className="bold font_big">공지사항</div></div>
                <div className="contentsBox">
                    <div className="writeButtonBox">
                        <Button onClick={this.handleNewNoti} width="15" backgroundColor="#707070" fontColor="white">공지사항 작성</Button>
                    </div>
                    <div className="contents_title">
                        <div className="label_small bold">번호</div>
                        <div className="label_big bold">제목</div>
                        <div className="label_middle bold">공지기간</div>
                        <div className="label_small bold"></div>
                    </div>
                    {
                        list &&
                        list.map((item) => {
                            return (
                                <div key={item.uid} className="contents_piece">
                                    <div className="label_small">{item.uid}</div>
                                    <div className="label_big cursor_pointer" onClick={() => this.handleClicked(item.uid)}>{item.title}</div>
                                    <div className="label_middle">{dateFormat(item.start_time)} ~ {dateFormat(item.expiry_time)}</div>
                                    <div className="label_small bold">
                                        <Button width="100" onClick={() => this.handleDelete(item.uid)} ><div>삭제</div></Button>
                                    </div>
                                </div>
                            )
                        })

                    }

                </div>
            </MainBox>
        )
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
        // data.type = form_data.type.value
        data.start_time = this.state.detail.start_time ? new Date(this.state.detail.start_time) : new Date();
        data.expiry_time = this.state.detail.expiry_time ? new Date(this.state.detail.expiry_time) : new Date();
        // data.content = form_data.content.value && form_data.content.value.replace(/\n/g, "<br/>");
        data.content = this.state.detail["content"];
        data.start_time = `${data.start_time.getFullYear()}-${data.start_time.getMonth() + 1}-${data.start_time.getDate()}`
        data.expiry_time = `${data.expiry_time.getFullYear()}-${data.expiry_time.getMonth() + 1}-${data.expiry_time.getDate()}`
        if (data.title.trim().length === 0) { alert('제목입력!'); return }
        // if (data.type.trim().length === 0) { alert('형식선택!'); return }
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
    handleeditChange = (value) => {
        let detail = this.state.detail
        detail["content"] = value;
        this.setState({ detail })
    }
    render() {
        const detail = this.state.detail
        const startDate = detail && this.state.detail.start_time ? new Date(this.state.detail.start_time) : null
        const endDate = detail && this.state.detail.expiry_time ? new Date(this.state.detail.expiry_time) : null
        return (
            detail ?
                <MainBox>
                    <form ref="notice_form">
                        <input name="uid" value={detail.uid} onChange={this.handleChange} hidden />
                        <div className="titleBox"><div className="bold font_big">공지사항</div></div>
                        <div className="contentsBox">
                            <div className="writeButtonBox" />
                            <div className="contents_title">
                                <div className="label_small bold">제목</div>
                                <InputText name="title" onChange={this.handleChange} value={detail.title} />
                            </div>
                            <div className="contents_piece">
                                <div className="label_small bold">공지기간</div>
                                <div className="inner_Box">
                                    <div className="margin_right">시작일자</div>
                                    <div className="margin_right">
                                        <DatePicker name="start" onChange={this.handleStartDateChange} value={startDate} minDate={new Date()} />
                                    </div>
                                    <div className="margin_right">~</div>
                                    <div className="margin_right">종료일자</div>
                                    <div className="margin_right">
                                        <DatePicker name="end" onChange={this.handleEndDateChange} value={endDate} minDate={new Date()} />
                                    </div>
                                </div>
                            </div>
                            <div className="contents_piece">
                                <div className="label_small bold">내용</div>
                                <div className="inner_Box">
                                    <EditorWrapper height={300}>
                                        <CKEditor
                                            // name="content"
                                            editor={ClassicEditor}
                                            data={this.state.detail["content"]}
                                            onInit={editor => { editor.editing.view.focus(); }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.handleeditChange(data);
                                            }}
                                            onBlur={(event, editor) => { console.log('Blur.', event, editor); }}
                                            onFocus={(event, editor) => { console.log('Focus.', editor); }} />
                                    </EditorWrapper>
                                </div>
                            </div>
                            <div className="writeButtonBox">
                                <Button onClick={this.cancel} width="15" backgroundColor="white" fontColor="#707070">취소</Button>
                                <Button onClick={this.submit} width="15" backgroundColor="#707070" fontColor="white">{detail.uid ? "수정" : "추가"}</Button>
                            </div>
                        </div>
                    </form>

                </MainBox>
                :
                <div>no data</div>
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

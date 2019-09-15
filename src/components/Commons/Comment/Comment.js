import React, { Component, Fragment } from 'react';
import noface from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = { reply: false, targetId: undefined, this_comment: "", this_reply: "", ing: false };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.reset = this.reset.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.reply = this.reply.bind(this);
        this.undoReply = this.undoReply.bind(this);
        this.undoComment = this.undoComment.bind(this);
        this.requestReply = this.requestReply.bind(this);
        this.requestComment = this.requestComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.removeReply = this.removeReply.bind(this);
    }
    onChangeValue(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value, ing: true });
        setTimeout(() => { this.setState({ ing: false }) }, 750);
    };
    reset() {
        this.setState({ reply: false, targetId: undefined, this_comment: "", this_reply: "", ing: false });
    }
    checkPermission() {
        if (this.props.my == null) {
            alert("로그인 해주세요.");
            return false;
        }
        return true
    }
    reply(itemId) { this.setState({ reply: true, targetId: itemId }); };
    undoReply() { this.setState({ reply: false, this_reply: "" }); };
    undoComment() { this.setState({ this_comment: "" }); };
    requestReply(where) {
        if (this.checkPermission() === false)
            return;
        this.props.comment({ comment: this.state.this_reply, d_flag: where });
        this.reset();
    };
    requestComment() {
        if (this.checkPermission() === false)
            return;
        if (this.state.this_comment.length > 0)
            this.props.comment({ comment: this.state.this_comment, d_flag: null });
        this.reset();
    };
    removeComment(commentId) {
        const comm = this.props.comments.find(comm => { return (comm.uid === commentId) });
        if (comm.replies && comm.replies.length > 0) {
            alert("답변이 있는 댓글은 삭제할 수 없습니다.");
        }
        else {
            this.props.removeComment(commentId);
        }
    };
    removeReply(commentId) {
        this.props.removeComment(commentId);
    };

    render() {
        const { reply, this_comment, this_reply } = this.state;
        const { comments, my } = this.props;
        const myface = my && my.thumbnail && my.thumbnail.s_img !== null ? my.thumbnail.s_img : noface
        console.log("my:", my, this.props, this.state);
        return (<React.Fragment>
            {comments && comments.length > 0 && comments.map((item, index) => {
                const face = item && item.s_img ? item.s_img : noface
                return (<Fragment key={item.nick_name + index}>
                    <div style={{ display: "flex", marginBottom: "30px" }}>
                        <div style={{ width: "58px", height: "58px", backgroundImage: `url(${face})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%" }} />
                        <div style={{ marginLeft: "24px" }}>
                            <div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>{item.nick_name}</div>
                            <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>{item.comment}</div>
                        </div>
                        <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                            <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>{DateFormat(item.create_time)}</div>
                            {!reply && <div onClick={() => this.reply(item.uid)} style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>답글 달기</div>}
                            {item.user_id === my.uid && <div onClick={() => this.removeComment(item.uid)} style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>삭제하기</div>}
                        </div>
                    </div>
                    {item.replies && item.replies.length > 0 && item.replies.map((repli, repli_index) => {
                        const repli_face = repli && repli.s_img !== null ? repli.s_img : noface
                        return (
                            <div key={repli.uid + repli_index} style={{ marginLeft: "80px" }}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "40px", height: "40px", backgroundImage: `url(${repli_face})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%" }} />
                                    <div style={{ marginLeft: "24px", marginTop: "3px" }}><div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>{repli.nick_name}</div></div>
                                </div>
                                <div style={{ marginLeft: "55px", display: "flex" }}>
                                    <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>{repli.comment}</div>
                                    <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>{DateFormat(repli.create_time)}</div>
                                    {repli.user_id === my.uid && <div onClick={() => this.removeReply(repli.uid)} style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>삭제하기</div>}
                                </div>
                            </div>)
                    })}
                    {reply && item.uid === this.state.targetId && <React.Fragment>
                        <div style={{ width: "max-content", marginLeft: "80px", marginBottom: "30px" }}>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "40px", height: "40px", backgroundImage: `url(${myface})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%" }} />
                                <div style={{ marginLeft: "24px", marginTop: "3px" }}><div style={{ fontSize: "15px", lineHeight: "22px", color: "#707070", fontWeight: "500", fontFamily: "Noto Sans KR" }}>{this.state.ing ? "답글 다는 중..." : my.nickName}</div></div>
                            </div>
                            <div style={{ marginLeft: "55px", marginBottom: "15px", display: "flex" }}>
                                <textarea value={this_reply || ""} onChange={this.onChangeValue} name="this_reply"
                                    style={{
                                        minWidth: "450px", width: "650px", height: "29px", padding: "7px", outline: "none", border: "none", resize: "none",
                                        color: "#707070", fontWeight: "300", fontFamily: "Noto Sans KR", lineHeight: "22px",
                                        background: "#EFEFEF", backgroundRepeat: "no-repeat", borderRadius: "5px"
                                    }} />
                                <div onClick={() => this.requestReply(item.uid)} style={{ marginLeft: "18px", width: "max-content", height: "22px", fontSize: "15px", fontWeight: "500", textAlign: "left", color: "#707070", cursor: "pointer", letterSpacing: "0" }}>게시</div>
                                <div onClick={this.undoReply} style={{ marginLeft: "18px", width: "max-content", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>취소</div>
                            </div>
                        </div>
                    </React.Fragment>}
                </Fragment>)
            })}
            <div style={{ width: "max-content", display: "flex", marginBottom: "30px" }}>
                <div style={{ width: "58px", height: "58px", backgroundImage: `url(${myface})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", borderRadius: "50%" }} />
                <div style={{ marginLeft: "24px" }}>
                    <textarea value={this_comment || ""} onChange={this.onChangeValue} name="this_comment"
                        style={{
                            minWidth: "650px", width: "750px", height: "58px", padding: "7px", outline: "none", border: "none", resize: "none",
                            color: "#707070", fontWeight: "300", fontFamily: "Noto Sans KR", lineHeight: "22px",
                            background: "#EFEFEF", backgroundRepeat: "no-repeat", borderRadius: "5px"
                        }} />
                </div>
                <div style={{ marginLeft: "26px", marginTop: "41px", display: "flex" }}>
                    <div onClick={this.requestComment} style={{ marginLeft: "18px", width: "max-content", height: "22px", fontSize: "15px", fontWeight: "500", textAlign: "left", color: "#707070", cursor: "pointer", letterSpacing: "0" }}>게시</div>
                    <div onClick={this.undoComment} style={{ marginLeft: "18px", width: "max-content", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>취소</div>
                </div>
            </div>
        </React.Fragment>)
    }
}

export default Comment;

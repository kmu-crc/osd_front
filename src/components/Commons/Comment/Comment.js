import React, { Component, Fragment } from 'react';
import noface from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";

class Comment extends Component {
    state = { reply: false, targetId: undefined, this_comment: "", this_reply: "", ing: false };
    onChangeValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value, ing: true });
        setTimeout(() => { this.setState({ ing: false }) }, 750);
    };
    reply = (itemId) => { this.setState({ reply: true, targetId: itemId }); };
    undoReply = () => { this.setState({ reply: false, this_reply: "" }); };
    undoComment = () => { this.setState({ this_comment: "" }); };
    requestReply = (data) => { this.props.reply(data); };
    requestComment = (data) => { this.props.comment(data); };
    removeReply = (commentId) => { this.props.removeReply(commentId); };
    removeComment = (commentId) => {
        const comm = this.props.comments.find(comm => { return (comm.uid === commentId) });
        if (comm.replies && comm.replies > 0) {
            alert("답변이 있는 댓글은 삭제할 수 없습니다.");
        }
        else {
            this.props.removeComment(commentId);
        }
    };

    render() {
        const { reply, this_comment, this_reply } = this.state;
        const { comments, my } = this.props;
        return (<>
            {comments && comments.length > 0 && comments.map((item, index) => {
                return (<Fragment key={item.nick_name + index}>
                    <div style={{ display: "flex", marginBottom: "30px" }}>
                        <div style={{ width: "58px", height: "58px", backgroundImage: `url(${item.s_img || noface})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%" }} />
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
                        return (
                            <div key={repli.uid + repli_index} style={{ marginLeft: "80px" }}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "40px", height: "40px", backgroundImage: `url(${repli.thumbnail ==null? repli.thumbnail.s_img : noface})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%" }} />
                                    <div style={{ marginLeft: "24px", marginTop: "3px" }}><div style={{ fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR" }}>{repli.nick_name}</div></div>
                                </div>
                                <div style={{ marginLeft: "55px", display: "flex" }}>
                                    <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: "300", fontFamily: "Noto Sans KR" }}>{repli.comment}</div>
                                    <div style={{ height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070" }}>{DateFormat(repli.create_time)}</div>
                                    {repli.user_id === my.uid && <div onClick={() => this.removeReply(item.uid)} style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>삭제하기</div>}
                                </div>
                            </div>
                        )
                    })}
                    {reply && item.uid === this.state.targetId && <>
                        <div style={{ marginLeft: "80px", marginBottom: "30px" }}>
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "40px", height: "40px", backgroundImage: `url(${my.thumbnail ==null? my.thumbnail.s_img : noface})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", marginTop: "8px", borderRadius: "50%" }} />
                                <div style={{ marginLeft: "24px", marginTop: "3px" }}><div style={{ fontSize: "15px", lineHeight: "22px", color: "#707070", fontWeight: "500", fontFamily: "Noto Sans KR" }}>{this.state.ing ? "답글 다는 중..." : my.nickName}</div></div>
                            </div>
                            <div style={{ marginLeft: "55px", display: "flex" }}>
                                <textarea value={this_reply || ""} onChange={this.onChangeValue} name="this_reply"
                                    style={{
                                        minWidth: "750px", height: "29px", padding: "7px", outline: "none", border: "none", resize: "none",
                                        color: "#707070", fontWeight: "300", fontFamily: "Noto Sans KR", lineHeight: "22px",
                                        background: "#EFEFEF", backgroundRepeat: "no-repeat", borderRadius: "5px"
                                    }} />
                                <div onClick={this.requestReply} style={{ marginLeft: "18px", letterSpacing: "0", width: "28px", height: "22px", fontSize: "15px", fontWeight: "500", textAlign: "left", color: "#707070", cursor: "pointer" }}>게시</div>
                                <div onClick={this.undoReply} style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>취소</div>
                            </div>
                        </div>
                    </>}
                </Fragment>)
            })}
            <div style={{ display: "flex", marginBottom: "30px" }}>
                <div style={{ width: "58px", height: "58px", backgroundImage: `url(${my.thumbnail ==null? my.thumbnail.s_img : noface})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "50%", backgroundColor: "#D6D6D6", borderRadius: "50%" }} />
                <div style={{ marginLeft: "24px" }}>
                    <textarea value={this_comment || ""} onChange={this.onChangeValue} name="this_comment"
                        style={{
                            minWidth: "750px", height: "58px", padding: "7px", outline: "none", border: "none", resize: "none",
                            color: "#707070", fontWeight: "300", fontFamily: "Noto Sans KR", lineHeight: "22px",
                            background: "#EFEFEF", backgroundRepeat: "no-repeat", borderRadius: "5px"
                        }} />
                </div>
                <div style={{ display: "flex" }}>
                    <div onClick={this.requestComment} style={{ marginLeft: "18px", letterSpacing: "0", width: "28px", height: "22px", fontSize: "15px", fontWeight: "500", textAlign: "left", color: "#707070", cursor: "pointer" }}>게시</div>
                    <div onClick={this.undoComment} style={{ marginLeft: "18px", height: "22px", fontSize: "15px", fontWeight: "300", textAlign: "left", color: "#707070", cursor: "pointer" }}>취소</div>
                </div>
            </div>
        </>)
    }
}

export default Comment;

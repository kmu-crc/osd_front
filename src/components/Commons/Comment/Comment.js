import React, { Component } from 'react';
import styled from "styled-components";
import noface from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";

const CommentBox = styled.div`
    // div { border:1px solid red; };
    *{
        font-family: Noto Sans KR;
        font-weight: 500;
        font-size: 16px;
        color: #707070;
    }
`;
const Comments = styled.div`
    margin-bottom: 10px;
`;
const CommentInner = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    &.reply {
        margin-left: 55px;
    };
    .face {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-image: url(${props => props.face});
    };

    .text-wrapper {
        margin-left: 10px;
        width: max-content;
        min-width: 150px;
        max-width: 560px;
        .nick {
            display: flex;
            flex-direction: row;
            font-size: 18px;
            font-weight: 500;
            .name {
                width: max-content;
            };
            .create-time {
                margin-left: auto;
                margin-right: 10px;
                width: max-content;
                font-size: 13px;
                font-weight: 500;
            };
        };
        .comment {
            min-width: 120px;
            width: max-content;
            font-weight: 300;
            font-size: 16px;
            max-width: 560px;
            background-color: white;
        };
    };

    .button-wrapper {
        display: flex;
        flex-direction: row;
        margin-top: 14px;
        margin-left: 7px;
        .reply {
            width: max-content;
            height: 16px;
            font-size: 14px;
            font-weight: 500;
            line-height: 14px;
            margin-left: 5px;
            pointer: default;
            background-color: #EFEFEF;
        }
        .del {
            width: max-content;
            font-size: 13px;
            font-weight: 500;
            margin-left: 5px;
            color: red;
            pointer: default;
        }
    };
`;
const CommentInputTextContainer = styled.div`
   margin-bottom: 30px;
   margin-top: 15px;
   margin-left: 15px;
   display: flex;
    &.reply {
        margin-left: 50px;
    }
   .face {
       width: 58px;
       height: 58px;
       background-image: url(${props => props.face});
       background-repeat: no-repeat;
       background-size: cover;
       background-position: 50%;
       background-color: #D6D6D6;
       border-radius: 50%;
   }
   .wrapper {
       margin-left: 24px;
        .writing {
            font-size: 15px;
            line-height: 22px;
            color: #707070;
            font-weight: 500;
            font-family: Noto Sans KR;
        }
       textarea {
           width: 560px;
           min-width: 100px;
           height: 100%;
           padding: 7px;
           outline: none;
           border: none;
           resize: none;
           color: #707070;
           font-size: 20px;
           font-weight: 300;
           font-family: Noto Sans KR;
           line-height: 22px;
           background: #EFEFEF;
           background-repeat: no-repeat;
           border-radius: 5px;
       }
   }
   .another-wrapper { 
       margin-left: auto;
       margin-right: 20px;
       margin-top: 41px;
       display: flex;
       // border: 1px solid red;
       textarea {
           width: 560px;
           min-width: 100px;
           height: 100%;
           padding: 7px;
           outline: none;
           border: none;
           resize: none;
           color: #707070;
           font-size: 20px;
           font-weight: 300;
           font-family: Noto Sans KR;
           line-height: 22px;
           background: #EFEFEF;
           background-repeat: no-repeat;
           border-radius: 5px;
       }
       .submit {
           width: max-content;
           height: 22px;
           margin-left: 18px;
           font-size: 20px;
           font-weight: 500;
           text-align: left;
           color: #707070;
           cursor: pointer;
           letter-spacing: 0;
       }
       .cancel {
           width: max-content;
           height: 22px;
           margin-left: 18px;
           font-size: 20px;
           font-weight: 300;
           text-align: left;
           color: #707070;
           cursor: pointer;
       }
   }
`;
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
    };
    onChangeValue(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value, ing: true });
        setTimeout(() => { this.setState({ ing: false }) }, 750);
    };
    reset() {
        this.setState({ reply: false, targetId: undefined, this_comment: "", this_reply: "", ing: false });
    };
    checkPermission() {
        if (this.props.my == null) {
            alert("로그인 해주세요.");
            return false;
        }
        return true
    };
    reply(itemId) {
        if (this.checkPermission() === false) {
            return;
        }
        this.setState({ reply: true, targetId: itemId });
    };
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
        if (window.confirm("선택하신 댓글을 삭제하시겠습니까?") === false) {
            return;
        }
        const comm = this.props.comments.find(comm => { return (comm.uid === commentId) });
        if (comm.replies && comm.replies.length > 0) {
            alert("답변이 있는 댓글은 삭제할 수 없습니다.");
        }
        else {
            this.props.removeComment(commentId);
        }
    };
    removeReply(commentId) {
        if (window.confirm("선택하신 댓글을 삭제하시겠습니까?") === false) {
            return;
        }
        this.props.removeComment(commentId);
    };

    render() {
        const { reply, this_comment, this_reply } = this.state;
        const { comments, my } = this.props;
        const myface = my && my.thumbnail && my.thumbnail.s_img !== null ? my.thumbnail.s_img : noface;

        return (<CommentBox>
            {comments && comments.length > 0 && comments.map((item, index) => {
                const face = item && item.s_img ? item.s_img : noface;
                return (<Comments key={item.nick_name + index}>
                    {/* comments */}
                    <CommentInner face={face} >
                        <div className="face" />
                        <div className="text-wrapper">
                            <div className="nick">
                                <div className="name">{item.nick_name}</div>
                                <div className="create-time">({DateFormat(item.create_time)})</div>
                            </div>
                            <div className="comment">{item.comment}</div>
                        </div>
                        <div className="button-wrapper">
                            {!reply && <div onClick={() => this.reply(item.uid)} className="reply">답글달기</div>}
                            {my && my.uid === item.user_id && <div onClick={() => this.removeComment(item.uid)} className="del">삭제하기</div>}
                        </div>
                    </CommentInner>

                    {/* replies of comment */}
                    {item.replies && item.replies.length > 0 && item.replies.map((repli, repli_index) => {
                        const repli_face = repli && repli.s_img !== null ? repli.s_img : noface
                        return (<CommentInner className="reply" key={repli.uid + repli_index} face={repli_face}>
                            <div className="face" />
                            <div className="text-wrapper">
                                <div className="nick">
                                    <div className="nick">{repli.nick_name}</div>
                                    <div className="create-time">({DateFormat(item.create_time)})</div>
                                </div>
                                <div className="comment">{repli.comment}</div>
                            </div>
                            <div className="button-wrapper">
                                {my && my.uid === repli.user_id && <div onClick={() => this.removeReply(repli.uid)} className="del">삭제하기</div>}
                            </div>
                        </CommentInner>)
                    })}

                    {/* input-text of replie */}
                    {reply && item.uid === this.state.targetId &&
                        <CommentInputTextContainer className="reply" face={myface}>
                            {/* <div className="face" /> */}
                            <div className="wrapper">
                                <div className="writing" >{this.state.ing ? "답글 다는 중..." : my.nickName}</div>
                                <textarea value={this_reply || ""} onChange={this.onChangeValue} name="this_reply" />
                            </div>
                            <div className="another-wrapper">
                                <div className="submit" onClick={() => this.requestReply(item.uid)}>게시</div>
                                <div className="cancel" onClick={this.undoReply}>취소</div>
                            </div>
                        </CommentInputTextContainer>}
                </Comments>)
            })}

            {/* input-text of comment */}
            <CommentInputTextContainer face={myface}>
                <div className="face" />
                <div className="wrapper">
                    <textarea value={this_comment || ""} onChange={this.onChangeValue} name="this_comment" />
                </div>
                <div className="another-wrapper">
                    <div className="submit" onClick={this.requestComment}>게시</div>
                    <div className="cancel" onClick={this.undoComment}>취소</div>
                </div>
            </CommentInputTextContainer>
        </CommentBox >)
    }
};

export default Comment;


//import React, { Component, Fragment } from 'react';
//import noface from "source/thumbnail.png";
//import DateFormat from "modules/DateFormat";
//import styled from "styled-components";
//
//const CommentBox = styled.div``
//const CommentContainer = styled.div`
//    display: flex; 
//    margin-left: 15px;
//    margin-bottom: 30px;
//    .face {
//        width: 58px;
//        height: 58px;
//        background-image: url(${ props => props.face});
//        background-repeat: no-repeat;
//        background-size: cover;
//        background-position: 50%;
//        background-color: #D6D6D6;
//        margin-top: 8px;
//        border-radius: 50%;
//    }
//    .text-wrapper {
//        margin-left: 24px;
//    }
//    .nick {
//        font-size: 20px;
//        font-weight: 500;
//        font-family: Noto Sans KR;
//    }
//    .comment {
//        margin-top: 8px;
//        font-size: 20px;
//        font-weight: 300;
//        font-family: Noto Sans KR;
//        line-height:30px;
//        word-break: break-all;
//    }
//    .button-wrapper {
//        width: max-content;
//        margin-left: 26px;
//        margin-top: 41px;
//        display: flex;
//        align-items: flex-end;
//    }
//    .create-time {
//        width: max-content;
//        height: 22px;
//        font-size: 15px;
//        font-weight: 300;
//        text-align: left;
//        color: #707070;
//    }
//    .reply {
//        width: max-content;
//        margin-left: 18px;
//        height: 22px;
//        font-size: 15px;
//        font-weight: 300;
//        text-align: left;
//        color: #707070;
//        cursor: pointer;
//    }
//    .del {
//        width: max-content;
//        margin-left: 18px;
//        height: 22px;
//        font-size: 15px;
//        font-weight: 300;
//        text-align: left;
//        color: #707070;
//        cursor: pointer;
//    }
//`;
//const RepliesContainer = styled.div`
//    display: flex; 
//    margin-bottom: 30px;
//    margin-left:80px;
//    .wrapper {
//        display: flex;
//    }
//    .reply-face {
//        width: 45px;
//        height: 45px;
//        background-image: url(${props => props.face});
//        background-repeat: no-repeat;
//        background-size: cover;
//        background-position: 50%;
//        background-color: #D6D6D6;
//        border-radius: 50%;
//    }
//    .reply-nick-wrapper {
//        margin-left: 15px;
//        margin-top: 3px;
//    }
//    .reply-nick {
//        font-size: 20px;
//        font-weight: 500;
//        font-family: Noto Sans KR;
//        margin-top:5px;
//    }
//    .wrapper-another {
//        margin-left: 55px
//        display: flex;
//    }
//    .button-wrapper {
//        margin-left: 26px;
//        margin-top: 41px;
//        display: flex;
//        align-items:flex-end;
//    }
//    .reply-comment {
//        margin-right: 8px;
//        font-size: 20px;
//        font-weight: 300;
//        font-family: Noto Sans KR;
//        line-height: 35px;
//        word-break: break-all;
//    }
//    .reply-create-time {
//        margin-top:5px;
//        height: 22px;
//        font-size: 15px;
//        font-weight: 300;
//        text-align: left;
//        color: #707070;
//    }
//    .reply-del {
//        margin-left: 18px;
//        height: 22px;
//        font-size: 15px;
//        font-weight: 300;
//        text-align: left;
//        color: #707070;
//        cursor: pointer;
//    }
//`;
//const RepliesInputTextContainer = styled.div`
//    width: max-content;
//    margin-left: 80px;
//    margin-bottom: 30px;
//    .wrapper {
//        display: flex;
//        .face {
//            width: 40px;
//            height: 40px;
//            margin-top: 8px;
//            border-radius: 50%;
//            background-image: url(${props => props.face});
//            background-repeat: no-repeat;
//            background-size: cover;
//            background-position: 50%;
//            background-color: #D6D6D6;
//        }
//        .writing-wrapper {
//            margin-left: 24px;
//            margin-top: 3px;
//        }
//        /    }
//    .another-wrapper {
//        margin-left: 55px;
//        margin-bottom: 15px;
//        display: flex;
//        textarea {
//            min-width: 450px;
//            height: 29px;
//            padding: 7px;
//            outline: none;
//            border: none;
//            border-radius: 5px;
//            color: #707070;
//            font-size: 20px;
//            font-weight: 300;
//            font-family: Noto Sans KR;
//            line-height: 22px;
//            background: #EFEFEF;
//            background-repeat: no-repeat;
//            resize: none;
//        }
//        .submit {
//            width: max-content;
//            height: 22px;
//            margin-left: 25px;
//            color: #707070;
//            font-size: 17px;
//            font-weight: 500;
//            text-align: left;
//            cursor: pointer;
//            letter-spacing: 0;
//        }
//        .cancel {
//            width: max-content;
//            height: 22px;
//            margin-left: 18px;
//            color: #707070;
//            font-size: 17px;
//            font-weight: 300;
//            text-align: left;
//            cursor: pointer;
//        }
//    }
//`;

//class Comment extends Component {
//    constructor(props) {
//        super(props);
//        this.state = { reply: false, targetId: undefined, this_comment: "", this_reply: "", ing: false };
//        this.onChangeValue = this.onChangeValue.bind(this);
//        this.reset = this.reset.bind(this);
//        this.checkPermission = this.checkPermission.bind(this);
//        this.reply = this.reply.bind(this);
//        this.undoReply = this.undoReply.bind(this);
//        this.undoComment = this.undoComment.bind(this);
//        this.requestReply = this.requestReply.bind(this);
//        this.requestComment = this.requestComment.bind(this);
//        this.removeComment = this.removeComment.bind(this);
//        this.removeReply = this.removeReply.bind(this);
//    }
//    onChangeValue(event) {
//        const name = event.target.name;
//        const value = event.target.value;
//        this.setState({ [name]: value, ing: true });
//        setTimeout(() => { this.setState({ ing: false }) }, 750);
//    };
//    reset() {
//        this.setState({ reply: false, targetId: undefined, this_comment: "", this_reply: "", ing: false });
//    }
//    checkPermission() {
//        if (this.props.my == null) {
//            alert("로그인 해주세요.");
//            return false;
//        }
//        return true
//    }
//    reply(itemId) {
//        if (this.checkPermission() === false) {
//            return;
//        }
//        this.setState({ reply: true, targetId: itemId });
//    };
//    undoReply() { this.setState({ reply: false, this_reply: "" }); };
//    undoComment() { this.setState({ this_comment: "" }); };
//    requestReply(where) {
//        if (this.checkPermission() === false)
//            return;
//        this.props.comment({ comment: this.state.this_reply, d_flag: where });
//        this.reset();
//    };
//    requestComment() {
//        if (this.checkPermission() === false)
//            return;
//        if (this.state.this_comment.length > 0)
//            this.props.comment({ comment: this.state.this_comment, d_flag: null });
//        this.reset();
//        console.log(this.props, "?");
//    };
//    removeComment(commentId) {
//        if (window.confirm("선택하신 댓글을 정말로 삭제하시겠습니까?") === false) {
//            return;
//        }
//        const comm = this.props.comments.find(comm => { return (comm.uid === commentId) });
//        if (comm.replies && comm.replies.length > 0) {
//            alert("답변이 있는 댓글은 삭제할 수 없습니다.");
//        }
//        else {
//            this.props.removeComment(commentId);
//        }
//    };
//    removeReply(commentId) {
//        if (window.confirm("선택하신 댓글을 정말로 삭제하시겠습니까?") === false) {
//            return;
//        }
//        this.props.removeComment(commentId);
//    };
//
//    render() {
//        const { reply, this_comment, this_reply } = this.state;
//        const { comments, my } = this.props;
//        const myface = my && my.thumbnail && my.thumbnail.s_img !== null ? my.thumbnail.s_img : noface
//        console.log("my:", comments, my, this.props, this.state);
//        return (<CommentBox>
//            {comments && comments.length > 0 && comments.map((item, index) => {
//                const face = item && item.s_img ? item.s_img : noface
//                return (<Fragment key={item.nick_name + index}>
//                    <CommentContainer face={face}>
//                        <div className="face" />
//                        <div className="text-wrapper">
//                            <div className="nick">{item.nick_name}</div>
//                            <div className="comment">{item.comment}</div>
//                        </div>
//                        <div className="button-wrapper">
//                            <div className="create-time">{DateFormat(item.create_time)}</div>
//                            {!reply && <div onClick={() => this.reply(item.uid)} className="reply">답글 달기</div>}
//                            {my && item.user_id === my.uid && <div onClick={() => this.removeComment(item.uid)} className="del">삭제하기</div>}
//                        </div>
//                    </CommentContainer>
//
//                    {item.replies && item.replies.length > 0 && item.replies.map((repli, repli_index) => {
//                        const repli_face = repli && repli.s_img !== null ? repli.s_img : noface
//                        return (<RepliesContainer key={repli.uid + repli_index} face={repli_face}>
//                            <div className="wrapper">
//                                <div className="reply-face" />
//                                <div className="reply-nick-wrapper">
//                                    <div className="reply-nick">{repli.nick_name}</div>
//                                    <div className="reply-comment" >{repli.comment}</div>
//                                </div>
//                            </div>
//                            <div className="button-wrapper" >
//                                {/* <div className="reply-comment">{repli.comment}</div> */}
//                                <div className="reply-create-time" >{DateFormat(repli.create_time)}</div>
//                                {my && repli.user_id === my.uid && <div onClick={() => this.removeReply(repli.uid)} className="reply-del">삭제하기</div>}
//                            </div>
//                        </RepliesContainer>)
//                    })}
//                    {reply && item.uid === this.state.targetId && <React.Fragment>
//                        <RepliesInputTextContainer face={myface}>
//                            <div className="wrapper">
//                                <div className="face" />
//                                <div className="writing-wrapper"><div className="writing" >{this.state.ing ? "답글 다는 중..." : my.nickName}</div></div>
//                            </div>
//                            <div className="another-wrapper">
//                                <textarea value={this_reply || ""} onChange={this.onChangeValue} name="this_reply" />
//                                <div className="submit" onClick={() => this.requestReply(item.uid)} >게시</div>
//                                <div className="cancel" onClick={this.undoReply} >취소</div>
//                            </div>
//                        </RepliesInputTextContainer>
//                    </React.Fragment>}
//                </Fragment>)
//            })}
//
//            <CommentInputTextContainer face={myface}>
//                <div className="face" />
//                <div className="wrapper">
//                    <textarea value={this_comment || ""} onChange={this.onChangeValue} name="this_comment" />
//                </div>
//                <div className="another-wrapper">
//                    <div className="submit" onClick={this.requestComment}>게시</div>
//                    <div className="cancel" onClick={this.undoComment}>취소</div>
//                </div>
//            </CommentInputTextContainer>
//        </CommentBox>)
//    }
//}
//
//export default Comment;
//
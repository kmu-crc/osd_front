import React, { Component } from 'react';
import styled from "styled-components";
import noface from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";

const CommentBox = styled.div`
    *{
        font-family: Noto Sans KR;
        font-weight: 500;
        font-size: 16px;
        color: #707070;
    }
`;
const Comments = styled.div`
    margin-bottom: 20px;
`;
const CommentInner = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    &.reply {
        margin-left: 55px;
    };
    .face {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-image: url(${props => props.face});
        background-size: cover;
        border: 1px solid #EFEFEF;
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
        margin-left: 7px;
        .reply {
            width: max-content;
            height: 16px;
            font-size: 14px;
            font-weight: 500;
            margin-left: 5px;
            cursor: pointer;
       }
        .del {
            width: max-content;
            font-size: 13px;
            font-weight: 500;
            margin-left: 5px;
            color: red;
            cursor: pointer;
        }
    };
`;
const CommentInputTextContainer = styled.div`
   margin-bottom: 30px;
   margin-top: 15px;
//    margin-left: 15px;
   display: flex;
    &.reply {
        margin-left: 50px;
    }
   .face {
       width: 58px;
       height: 58px;
       min-width: 58px;
       min-height: 58px;
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
        if (this.state.this_reply.length > 0) {
            const comment = this.state.this_reply.replace(/\n/g, "<br/>");
            this.props.comment({ comment: comment, d_flag: where });
        }
        // this.props.comment({ comment: this.state.this_reply, d_flag: where });
        this.reset();
    };
    requestComment() {
        if (this.checkPermission() === false)
            return;
        if (this.state.this_comment.length > 0) {
            const comment = this.state.this_comment.replace(/\n/g, "<br/>");
            this.props.comment({ comment: comment, d_flag: null });
        }
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
                                <div className="button-wrapper">
                                    {!reply && <div onClick={() => this.reply(item.uid)} className="reply">답글달기</div>}
                                    {my && my.uid === item.user_id && <div onClick={() => this.removeComment(item.uid)} className="del">삭제하기</div>}
                                </div>
                            </div>
                            <div className="comment"
                                dangerouslySetInnerHTML={{ __html: item.comment }}></div>
                            {/* <div className="comment">{item.comment}</div> */}
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
                                <div className="comment" dangerouslySetInnerHTML={{ __html: repli.comment }}></div>
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


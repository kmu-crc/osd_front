import React, { Component } from 'react';
import styled, { keyframes } from "styled-components";
import noface from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";

import opendesign_style from "opendesign_style"

const CommentBox = styled.div`
    *{
        font-family:Spoqa Han Sans Neo;
    }
`;
const blinker = keyframes`
  0% {
    background-color: #fffafa; 
  }
  50% {
    background-color: #FFFFFF; 
  }
  100% {
    background-color: #fffafa; 
  }
`;
const Comments = styled.div`
    min-height: 50px;
    width:100%;
`;
const CommentInner = styled.div`
width:100%;
display:flex;
padding-bottom:15px;
.face{
    min-width:40px;
    min-height:40px;
    max-width:40px;
    max-height:40px;
    border-radius:50%;
    background-color:white;
    background-image: url(${props => props.face});
    background-size: cover;
    background-position:center;
    box-shadow: 8px 8px 6px #00000029;  
}
.flex{display:flex;}
.text-wrapper {
    margin-left: 15px;
    width: 100%;
    .nick{
        display:flex;
        justify-content:space-between;
        margin-bottom:5px;
        .name{font-size:15px;font-weight:700;}
        .create-time{font-size:15px;font-weight:400;}
    }
}

.button-wrapper {
    display: flex;
    *{
        font-family:Spoqa Han Sans Neo;
        font-size:12px;
        color:black;
    }
    .reply {
        color:#707070;
        width: max-content;
        cursor: pointer;
   }
    .del {
        color: red;
        cursor: pointer;
        margin-left:5px;
    }
};
&.blinking {
    animation: ${blinker} 1.15s 5;
  }
&.reply {
    padding-left: 20px;
  };

`;
const CommentInputTextContainer = styled.div`
   height:max-content;
   display: flex;
   width:100%;
   padding-bottom:15px;
    &.reply {
        padding-left: 55px;
    }
    .body_wrap{
        width:100%;
    }
    .header{
        width:100%;
        display:flex;
        justify-content:space-between;
        margin-bottom:5px;
    }
    .writeBox {
        font-size: 15px;
        font-weight:700;
        font-weight: 700;
    }
    .face {
        min-width: 40px;
        min-height: 40px;
        max-width: 40px;
        max-height: 40px;
        border-radius: 50%;
        background-image: url(${props => props.face});
        background-size: cover;
        background-position:center;
        border: 1px solid #EFEFEF;
        box-shadow: 8px 8px 6px #00000029;  
        margin-right:15px;
    };

   .wrapper {
       width: 100%;

       textarea {
           max-width:100%;
           width: 100%;
           height: 100%;
           padding: 7px;
           outline: none;
           border: none;
           resize: none;
           color: #707070;
           font-size: 12px;
           font-weight: 300;
           font-family: Noto Sans KR;
           line-height: 22px;
           background: #EFEFEF;
           background-repeat: no-repeat;
           border-radius: 5px;
       }
       .marginBottom{
           margin-bottom:30px;
       }
   }
   .flex_Input{
       width: 100%;
       display: flex;
       flex-direction:column;
   }
   .another-wrapper { 
       display: flex;
       align-items:center;
       .button{
           font-size:12px;
           font-weight:500;
           margin-left:10px;
       }
       .red{color:red;}
       .grey{color:grey;}
   }

`;
class Comment_mobile extends Component {
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
    async checkPermission() {
        if (this.props.my == null) {
            await alert("로그인 해주세요.", "확인");
            return false;
        }
        return true
    };
    async reply(itemId) {
        if (await this.checkPermission() === false) {
            return;
        }
        this.setState({ reply: true, targetId: itemId });
    };
    undoReply() { this.setState({ reply: false, this_reply: "" }); };
    undoComment() { this.setState({ this_comment: "" }); };
    async requestReply(where) {
        if (await this.checkPermission() === false)
            return;
        if (this.state.this_reply.length > 0) {
            const comment = this.state.this_reply.replace(/\n/g, "<br/>");
            this.props.comment({ comment: comment, d_flag: where });
        }
        // this.props.comment({ comment: this.state.this_reply, d_flag: where });
        this.reset();
    };
    async requestComment() {
        if (await this.checkPermission() === false)
            return;
        if (this.state.this_comment.length > 0) {
            const comment = this.state.this_comment.replace(/\n/g, "<br/>");
            this.props.comment({ comment: comment, d_flag: null });
        }
        this.reset();
    };
    async removeComment(commentId) {
        if (await confirm("선택하신 댓글을 삭제하시겠습니까?", "예", "아니오") === false) {
            return;
        }
        const comm = this.props.comments.find(comm => { return (comm.uid === commentId) });
        if (comm.replies && comm.replies.length > 0) {
            await alert("답변이 있는 댓글은 삭제할 수 없습니다.", "확인");
        }
        else {
            this.props.removeComment(commentId);
        }
    };
    async removeReply(commentId) {
        if (await confirm("선택하신 댓글을 삭제하시겠습니까?", "예", "아니오") === false) {
            return;
        }
        this.props.removeComment(commentId);
    };

    render() {
        const { reply, this_comment, this_reply } = this.state;
        const { comments, my, disabledReply, disabledBlink } = this.props;
        const myface = my && my.thumbnail && my.thumbnail.s_img !== null ? my.thumbnail.s_img : noface;

        return (<CommentBox>
            {comments && comments.length > 0 && comments.map((item, index) => {
                const face = item && item.s_img ? item.s_img : noface;
                return (

                    <Comments key={item.nick_name + index}>
                        {/* comments */}
                        <CommentInner face={face} className={!disabledBlink && item.read === 0 ? "blinking" : ""} >

                            <div className="face" />
                            <div className="text-wrapper">
                                <div className="nick">
                                    <div className="flex">
                                        <div className="name">{item.nick_name}</div>
                                        <div className="create-time">({DateFormat(item.create_time)})</div>
                                    </div>
                                    <div className="button-wrapper">
                                        {!disabledReply && !reply && <div onClick={() => this.reply(item.uid)} className="reply">답글달기</div>}
                                        {my && my.uid === item.user_id && <div onClick={() => this.removeComment(item.uid)} className="reply del">삭제하기</div>}
                                    </div>
                                </div>
                                <div className="comment"
                                    dangerouslySetInnerHTML={{ __html: item.comment }}></div>
                            </div>
                        </CommentInner>

                        {/* replies of comment */}
                        {item.replies && item.replies.length > 0 && item.replies.map((repli, repli_index) => {
                            const repli_face = repli && repli.s_img !== null ? repli.s_img : noface
                            return (<CommentInner className={!disabledBlink && repli.read === 0 ? "reply blinking" : "reply"} key={repli.nick_name + repli.uid + repli_index} face={repli_face} >
                                <div className="face" />
                                <div className="text-wrapper">
                                    <div className="nick">
                                        <div className="flex">
                                            <div className="nick">{repli.nick_name}</div>
                                            <div className="create-time">({DateFormat(item.create_time)})</div>
                                        </div>
                                        <div className="button-wrapper">
                                            {my && my.uid === repli.user_id && <div onClick={() => this.removeReply(repli.uid)} className="del">삭제하기</div>}
                                        </div>
                                    </div>
                                    <div className="comment" dangerouslySetInnerHTML={{ __html: repli.comment }}></div>
                                </div>

                            </CommentInner>
                            )
                        })}

                        {/* input-text of replie */}
                        {reply && item.uid === this.state.targetId &&
                            <React.Fragment>
                                <CommentInputTextContainer className="reply" style={{ flexDirection: "column" }} face={myface}>
                                    <div className="header">
                                        <div className="writeBox" >{this.state.ing ? "답글 다는 중..." : my.nickName}</div>
                                        <div className="another-wrapper">
                                            <div className="button red" onClick={() => this.requestReply(item.uid)}>게시</div>
                                            <div className="button grey" onClick={this.undoReply}>취소</div>
                                        </div>
                                    </div>
                                    <div className="flex_Input">
                                        <div className="wrapper ">
                                            <textarea value={this_reply || ""} onChange={this.onChangeValue} name="this_reply" />
                                        </div>

                                    </div>
                                </CommentInputTextContainer>
                            </React.Fragment>
                        }
                    </Comments>)
            })
            }

            {/* input-text of comment */}
            <CommentInputTextContainer face={myface}>
                <div className="face" />
                <div className="body_wrap">
                    <div className="header">
                        <div className="writeBox">{my && my.nickName}</div>
                        <div className="another-wrapper">
                            <div className="button red" onClick={this.requestComment}>게시</div>
                            <div className="button grey" onClick={this.undoComment}>취소</div>
                        </div>
                    </div>
                    <div className="flex_Input">
                        <div className="wrapper">
                            <textarea value={this_comment || ""} onChange={this.onChangeValue} name="this_comment" />
                        </div>
                    </div>
                </div>
            </CommentInputTextContainer>
        </CommentBox >)
    }
};

export default Comment_mobile;


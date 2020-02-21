import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";

const Page = styled.div`
    width: max-content;
    margin-top: 87px;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    font-weight: 500;
    text-aglin: left;
    display: flex;
    flex-direction: row;
    line-height: 27px;
    color: #707070;
    .number{
      margin-right: 10px;
    }
    .this{
      color: red;
    }
    .another {}
    .more {}
`;
const ReplyPrefix = styled.div`
    width: max-content;
    padding: 3px 6px 3px 6px;
    border-radius: 25px;
    margin-left: 25px;
    margin-right: 5px;
    background: blue;
    color: white;
`;

class ItemQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reply: false,
            targetId: null,
            this_comment: "",
            this_reply: "",
            page: 0,
            // ing: false
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.reset = this.reset.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.reply = this.reply.bind(this);
        this.undoReply = this.undoReply.bind(this);
        this.undoComment = this.undoComment.bind(this);
        this.requestAnswer = this.requestAnswer.bind(this);
        this.requestQuestion = this.requestQuestion.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.removeReply = this.removeReply.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    onChangeValue(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value, ing: true });
        setTimeout(() => { this.setState({ ing: false }) }, 750);
    };
    reset() {
        this.setState({
            reply: false,
            targetId: null,
            this_comment: "",
            this_reply: "",
            // ing: false 
        });
    };
    checkPermission() {
        if (this.props.userInfo == null) {
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
    requestAnswer(origin) {
        if (this.checkPermission() === false)
            return;
        this.props.request({ comment: this.state.this_reply, group_id: origin.group_id, sort_in_group: origin.sort_in_group });
        this.reset();
    };
    requestQuestion() {
        if (this.checkPermission() === false)
            return;
        if (this.state.this_comment.length > 0)
            this.props.request({ comment: this.state.this_comment, group_id: null });
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
    handleKeyDown(event) {
        // ;
    };
    getData(page) {
        this.setState({ page: page });
        this.props.getData(page);
    };

    render() {
        const { question, userInfo, total, user_id } = this.props;
        const { reply, this_reply, this_comment, page } = this.state;
        const master = user_id === (userInfo && userInfo.uid);

        const Question = (props) => {
            // console.log(props);
            return (
                <div className="line element-reply">
                    {!props.itsmine && props.sort_in_group === 0 && master ?
                        <div onClick={() => this.reply(props.uid)}>[답변하기]</div> : null}
                    {/* {props.itsmine && !master ?<div >[삭제하기]</div> : null} */}
                    <div className="line">
                        {props.is_question ? "" : <ReplyPrefix>판매자 답변</ReplyPrefix>}
                        {props.comment}</div>
                    <div style={{ width: "max-content", marginLeft: "auto" }}>{props.nick_name}</div>
                    <div style={{ width: "max-content", marginLeft: "75px" }}>{DateFormat(props.create_time)}</div>
                </div>
            )
        }

        return (<React.Fragment>
            {master ?
                null
                : <div className="line" style={{ marginTop: "34px", }}>
                    <div className="input-wrapper">
                        <textarea
                            value={this_comment || ""}
                            onChange={this.onChangeValue}
                            name="this_comment"
                            onKeyDown={this.handleKeyDown} />
                    </div>
                    <div className="button" onClick={this.requestQuestion} >
                        <div className="text" >문의하기</div></div>
                </div>}
            <div>
                {question && question.length > 0 ?
                    question.map((item, index) =>
                        <div key={index}>
                            <Question
                                {...item}
                                key={index}
                                itsmine={item.user_id === (userInfo && userInfo.uid)}
                                is_question={item.sort_in_group === 0}
                            />
                            {reply && item.uid === this.state.targetId ?
                                <div className="line" style={{ marginTop: "34px", }}>
                                    <div className="input-wrapper">
                                        <textarea
                                            value={this_reply || ""}
                                            onChange={this.onChangeValue}
                                            name="this_reply"
                                            onKeyDown={this.handleKeyDown} />
                                    </div>
                                    <div className="button" onClick={() => this.requestAnswer(item)} >
                                        <div className="text" >답변하기</div></div>
                                </div> : null}
                        </div>) : null}
            </div>
            <Page>
                {total
                    ? Array(parseInt((total / 10) + 1, 10)).fill().map((_, i) =>
                        <div key={i} onClick={() => this.getData(i)} className={page === i ? "this number" : "another number"}> {i + 1}</div>)
                    : (<React.Fragment>&nbsp;</React.Fragment>)}
            </Page>
        </React.Fragment >)
    }
}
export default ItemQuestion;
import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import reply from "source/reply_.svg";

const HRLine = styled.div`
    width:100%;
    height:${props=>props.height}px;
    background-color:#d6d6d6;
    margin-top:${props=>props.marginTop}px;
`
const Icon = styled.div`
        width:25px;
        height:22px;
        background-image: url(${reply});
        margin-left:117px;
        margin-right:12px;
`
const ReplyBox= styled.div`
*{
    font-size:17px;
}
    width:100%;
    height:61px;
    // border-bottom:1px solid #efefef;
    display:flex;
    align-items:center;
    cursor:pointer;
    .number{
        text-align:center;
        min-width:96px;
        margin-right:20px;
    }
    .comment{
        display:flex;
        width:100%;
        margin-right:35px;
        .commentText{
            margin-top:5px;
        }
    }
    .nickname{
        min-width:100px;
        margin-right:35px;
        text-align:right;
    }
    .createtime{
        min-width:100px;
        margin-right:35px;
        margin-left:35px;
    }

`
const Page = styled.div`
    width: max-content;
    margin-top: 35px;
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
//const QuestionForm = styled.textarea`
//    width:100%;
//    outline:none;
//`
const ReplyForm = styled.textarea`
        width:100%;
        height:80px;
        outline:none;
        resize:none;
        border-radius:10px;
        background-color:#efefef;
        border:none;
        padding:20px;
        font-size:17px;
`
const AnswerBox = styled.div`
    display:flex;
    margin-bottom:25px;
    padding-left:110px;
    padding-right:50px;
`
const AnswerForm = styled.textarea`
        width:100%;
        height:63px;
        outline:none;
        resize:none;
        border-radius:10px;
        background-color:#efefef;
        border:none;
        padding:20px;
        font-size:17px;
`
const QuestionButton = styled.div`
    display:flex;
    min-width:109px;
    justify-content:center;
    align-items:center;
    border:1px solid red;
    margin-left:13px;
    cursor:pointer;
    color:red;
    .quest{
        font-weight:500;
        font-size:20px
    }
    
`
const ReplyPrefix = styled.div`
    width: max-content;
    padding: 3px 6px 3px 6px;
    border-radius: 25px;
    margin-left: 25px;
    margin-right: 5px;
    background: blue;
    color: white;
`;
const ReplyButton = styled.div`
    width:max-content;
    height:100%;
    border:1px solid red;
    border-radius:20px;
    margin-right:12px;
    padding:4px 11px;
    display:flex;
    justify-content:center;
    align-items:center;
    .text{
        color:red;
    }
`
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
    async checkPermission() {
        if (this.props.userInfo == null) {
           await alert("로그인 해주세요.");
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
    async removeComment(commentId) {
        if (await confirm("선택하신 댓글을 삭제하시겠습니까?") === false) {
            return;
        }
        const comm = this.props.comments.find(comm => { return (comm.uid === commentId) });
        if (comm.replies && comm.replies.length > 0) {
            await alert("답변이 있는 댓글은 삭제할 수 없습니다.");
        }
        else {
            this.props.removeComment(commentId);
        }
    };
    async removeReply(commentId) {
        if (await confirm("선택하신 댓글을 삭제하시겠습니까?") === false) {
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
        let countNum = 0;//question&&question.length>0?question.length:0;
        question && question .length > 0 && question.forEach(element=> {
            if(element.sort_in_group==0)countNum++;
        });

        const Question = (props) => {
            // console.log(props);
            return (
                <React.Fragment>
                    <HRLine height={1}/>
                
                <ReplyBox>
                    {props.is_question==true?<div className="number">{props.numbering}</div>:null}

                    {!props.itsmine && props.sort_in_group === 0 && master ?
                        <div onClick={() => this.reply(props.uid)}><ReplyButton><div className="text">답변</div></ReplyButton></div> : null}
                    {/* {props.itsmine && !master ?<div >[삭제하기]</div> : null} */}
                    <div className="comment">
                        {props.is_question ? "" : <Icon/>}
                        <div className="commentText">{props.comment}</div></div>
                    <div className="nickname">{props.nick_name}</div>
                    <div className="createtime">
                            {
                                new Date(props.create_time).getFullYear()+"."
                                +((new Date(props.create_time).getMonth()+1)<10?'0'+(new Date(props.create_time).getMonth()+1):(new Date(props.create_time).getMonth()+1))+"."
                                +(new Date(props.create_time).getDate()<10?'0'+new Date(props.create_time).getDate():new Date(props.create_time).getDate())
                            }
                    </div>
                </ReplyBox>
                </React.Fragment>
            )
        }
        return (<React.Fragment>
            {master ?
                null
                : <div className="line" style={{ marginTop: "34px", }}>
                    {/* <div className="input-wrapper"> */}
                        <ReplyForm
                            value={this_comment || ""}
                            onChange={this.onChangeValue}
                            name="this_comment"
                            onKeyDown={this.handleKeyDown} />
                    {/* </div> */}
                    <QuestionButton onClick={this.requestQuestion} >
                        <div className="quest" >문의</div></QuestionButton>
                </div>}
            <HRLine height={2} marginTop={25}/>
            <div>
                {question && question.length > 0 ?
                    question.map((item, index) =>{
                        // reply?countNum:countNum--;
                        countNum=reply&&item.uid == this.state.targetId?countNum:countNum--;
                        return(
                        <div key={index}>
                            <Question
                                numbering={countNum--}
                                {...item}
                                key={index}
                                itsmine={item.user_id === (userInfo && userInfo.uid)}
                                is_question={item.sort_in_group === 0}
                            />
                            {reply && item.uid === this.state.targetId ?
                                <AnswerBox>
                                    {/* <div className="input-wrapper"> */}
                                        <AnswerForm
                                            value={this_reply || ""}
                                            onChange={this.onChangeValue}
                                            name="this_reply"
                                            onKeyDown={this.handleKeyDown} />
                                    {/* </div> */}
                                    <QuestionButton onClick={() => this.requestAnswer(item)} >
                                        <div className="text" >답변</div></QuestionButton>
                                </AnswerBox> : null}
                            </div>)}) : null}
                            <HRLine height={1} marginTop={0}/>
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
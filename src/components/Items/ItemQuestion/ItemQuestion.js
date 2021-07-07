import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import reply from "source/reply_.svg";
import Cross from "components/Commons/Cross";
import { Modal } from 'semantic-ui-react';
import market_style from "market_style";
import { Pagination } from 'semantic-ui-react'

const NoPage = styled.div`
    width:100%;
    height:100px;
    display:flex;
    justify-content:center;
    align-items:center;
`
const HRLine = styled.div`
    width:100%;
    height:${props=>props.height}px;
    background-color:#d6d6d6;
    margin-top:${props=>props.marginTop}px;
`
const PageBox = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
`
const Icon = styled.div`
        width:30px;
        height:22px;
        background-image: url(${reply});
        margin-left:117px;
        margin-right:12px;
`
const ReplyBox= styled.div`
*{
    font-size:${market_style.font.size.small1};
}
    width:100%;
    height:42px;
    display:flex;
    align-items:center;
    cursor:pointer;
    .number{
        min-width:35px;
        margin-right:10px;
    }
    .comment{
        display:flex;
        width:100%;
        margin-right:10px;
        overflow:hidden;
        .commentText{
            width:100%;
            height:26px;
            margin-top:5px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

    }
    .nickname{
        min-width:100px;
        margin-right:20px;
        text-align:right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .createtime{
        min-width:max-content;
        margin-left:0px;
    }
    &:hover{
        .comment{
            .commentText{
                color:red;
            }
        }
    }
    @media only screen and (max-width: 1000px) and (min-width: 500px){
        .number{
            min-width:50px;
        }
        .nickname{
            min-width:50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right:15px;
        }
        .createtime{
            text-align:right;
            margin-left:0px;
        }
    }


`
const CommentDetail = styled.div`
    width:100%;
    display:flex;
    .common{
        font-size:${market_style.font.size.small1};
        background-color:#EEEEEE;
        color:#707070;
        padding:20px 15px;
        border-radius:10px;
        width:100%;
        height:max-content;
        margin-bottom:10px;
    }   
    .org{
        margin-left:92px;
    }
    .reply{
        margin-left:150px;
    }
`
const Page = styled.div`
    width: max-content;
    margin-top: 35px;
    margin-left: auto;
    margin-right: auto;
    font-size:${market_style.font.size.normal3};
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
        height:60px;
        outline:none;
        resize:none;
        border-radius:10px;
        background-color:#efefef;
        border:none;
        padding:20px;
        font-size:${market_style.font.size.small3};
        white-space:pre;
`
const AnswerBox = styled.div`
    display:flex;
    margin-bottom:25px;
    padding-left:90px;
    // padding-right:50px;
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
        font-size:${market_style.font.size.small3};
        white-space:pre;
`
const QuestionButton = styled.div`
    display:flex;
    min-width:109px;
    justify-content:center;
    align-items:center;
    border:1px solid red;
    margin-left:20px;
    cursor:pointer;
    color:red;
    .quest{
        font-weight:500;
        font-size:${market_style.font.size.small1};
    }
    @media only screen and (max-width: 1000px) and (min-width: 500px){
        min-width:60px;
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
const Dialog = styled(Modal)`
    width: 850px;
    height:max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    border-radius: 20px;
    opacity: 1;
    padding:24px;
    .close-box {
        width: 100%;
        cursor: pointer;
        display:flex;
        justify-content:flex-end;
        position: relative;
    }
    .wrapper{
        width:100%;
        .modal_comment{
            font-size:${market_style.font.size.small3};
        }
    }
    `
class ItemQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            open_id:null,
            modal_comment:"",
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
        this.onClickEvent=this.onClickEvent.bind(this);
    }
    componentDidMount(){
        // window.addEventListener("click", this.onClickEvent, false);
    }
    componentWillUnmount(){
        // window.removeEventListener("click", this.onClickEvent, true);
    }
    async onClickEvent(event){
        // if(event.target.id=="designer"||event.target.id=="maker"||event.target.id=="request"||event.target.id=="product")return;
        // if(event.target.id != "answer"&&event.target.id!="this_reply"){
        //     await this.setState({reply:false});
        // }
   }
    onChangeValue(event) {
        const name = event.target.name;
        const id = event.target.id;
        let value = event.target.value;
        // value=value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        // console.log(value);
        // const value = window.document.getElementById(id).value;
        // console.log(value);
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
    undoComment() { this.setState({ this_comment: "" });};
    requestAnswer(origin) {

        if (this.checkPermission() === false)
            return;
        this.props.request({ comment: this.state.this_reply.replace(/(?:\r\n|\r|\n)/g, '<br/>'), group_id: origin.group_id, sort_in_group: origin.sort_in_group });
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
        const { question, userInfo, total, user_id, replyCount } = this.props;
        const { reply, this_reply, this_comment, page } = this.state;
        const master = user_id === (userInfo && userInfo.uid);
        let countNum = 0;//question&&question.length>0?question.length:0;
        question && question .length > 0 && question.forEach(element=> {
            if(element.sort_in_group==0)countNum++;
        });
        const lastPage = parseInt((this.props.total+replyCount) / 10, 10);
        countNum = total-this.state.page*10+replyCount;

        const Question = (props) => {
            return (
                <React.Fragment>
                   
                <HRLine height={1}/>
                <ReplyBox onClick={() => {props.openModal(props.comment);this.setState({open_id:this.state.open_id==props.uid?null:props.uid});}}>
                    {props.is_question==true?<div className="number">{String(props.numbering).padStart(2,'0')}</div>:null}

                    {!props.itsmine && props.sort_in_group === 0 && master ?
                        <div onClick={() => this.reply(props.uid)}><ReplyButton id="answer"><div id="answer" className="text">답변</div></ReplyButton></div> : null}
                    {/* {props.itsmine && !master ?<div >[삭제하기]</div> : null} */}
                    <div className="comment"   >
                        {props.is_question ? "" : <Icon/>}
                        {/* <div className="commentText">{props.comment}</div></div> */}
                        {
                            props.comment.length>50?
                            <div className="commentText">{props.comment.replaceAll('<br/>',' ').substring(0,50)+'...'}</div>
                            :
                            <div className="commentText">{props.comment.replaceAll('<br/>',' ')}</div>
                        }
                        {/* {
                            props.comment.length>50?
                            :
                        }
                        <div className="commentText" dangerouslySetInnerHTML={{ __html: `${props.comment}` }}/> */}
                    </div>
                    <div className="nickname">{props.nick_name}</div>
                    <div className="createtime">
                            {
                                new Date(props.create_time).getFullYear()+"."
                                +((new Date(props.create_time).getMonth()+1)<10?'0'+(new Date(props.create_time).getMonth()+1):(new Date(props.create_time).getMonth()+1))+"."
                                +(new Date(props.create_time).getDate()<10?'0'+new Date(props.create_time).getDate():new Date(props.create_time).getDate())
                            }
                    </div>
                    
                </ReplyBox>
               
                {
                            this.state.open_id==props.uid?
                            <React.Fragment>
                                <CommentDetail>
                                    <div className={`common ${props.sort_in_group==0?"org":"reply"}`} dangerouslySetInnerHTML={{ __html: `${props.comment}`}}/>
                                </CommentDetail>
                            </React.Fragment>
                            :
                            null
                }
                </React.Fragment>
            )
        }
        return (<React.Fragment>

            {master ?
                null
                : <div style={{ marginTop: "5px",marginBottom:"15px",display:"flex" }}>
                    {/* <div className="input-wrapper"> */}
                        <ReplyForm
                            id="this_comment"
                            value={this_comment || ""}
                            onChange={this.onChangeValue}
                            name="this_comment"
                            onKeyDown={this.handleKeyDown} />
                    {/* </div> */}
                    <QuestionButton onClick={this.requestQuestion} >
                        <div className="quest" >문의</div></QuestionButton>
                </div>}
            {/* <HRLine height={2} marginTop={25}/> */}
            <div>
                {question && question.length > 0 ?
                    question.map((item, index) =>{
                        console.log(total-this.state.page*10);
                        return(
                        <div key={index} >
                            <Question
                                // numbering={item.sort_in_group==0?countㅋNum--:countNum}
                                numbering={item.sort_in_group==0?countNum--:countNum}
                                {...item}
                                key={index}
                                itsmine={item.user_id === (userInfo && userInfo.uid)}
                                is_question={item.sort_in_group === 0}
                                openModal={(comment)=>{this.setState({open:true,modal_comment:comment});}}
                            />
                            {reply && item.uid === this.state.targetId ?
                                <AnswerBox id="answer">
                                    {/* <div className="input-wrapper"> */}
                                        <AnswerForm
                                            id="this_reply"
                                            value={this_reply || ""}
                                            onChange={this.onChangeValue}
                                            name="this_reply"
                                            onKeyDown={this.handleKeyDown} />
                                    {/* </div> */}
                                    <QuestionButton id="answer" onClick={() => this.requestAnswer(item)} >
                                        <div className="text" id="answer" >답변</div></QuestionButton>
                                </AnswerBox> : null}
                            </div>)}) 
                            :
                            <NoPage>
                                등록된 게시글이 없습니다
                            </NoPage>}
            </div>
            <PageBox>
            { (total+replyCount) >10?
                        <Pagination
                        activePage={this.state.page}
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={lastPage + 1}
                        secondary
                        onPageChange={(event, { activePage }) => {
                            this.getData(activePage-1);
                        }}
                      />:null
              }
            </PageBox>
            {/* {total>10?
            <Page>
                {total
                    ? Array(parseInt((total / 10) + 1, 10)).fill().map((_, i) =>
                        <div style={{cursor:"pointer"}} key={i} onClick={() => {this.getData(i)}} className={page === i ? "this number" : "another number"}> {i + 1}</div>)
                    : (<React.Fragment>&nbsp;</React.Fragment>)}
            </Page>:null} */}
            {/* <Dialog open={this.state.open}>
                    <div className="close-box">
                        <Cross angle={45} color={"#707070"} weight={1} width={15} height={15} onClick={()=>{this.setState({open:false})}}/>
                    </div>
                    <div className="wrapper">
                        <div className="modal_comment" dangerouslySetInnerHTML={{__html:this.state.modal_comment}}/>
                    </div>
            </Dialog> */}
        </React.Fragment >)
    }
}
export default ItemQuestion;
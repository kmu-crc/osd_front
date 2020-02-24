import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";
import Star from "components/Commons/Star";

const Reviews = styled.div`
//   border:1px solid black;
  width: 468px;
  height: 1478px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 10px;
  .title {
    font-weight: 500;
    font-size:15px;
    margin-right:20px;
  }
  .line{
      display:flex;
    //   border:1px solid red;
    //   justify-content:center;
      padding:10px;
  }
  .rate{
      display:flex;
  }
`;
const ReviewForm = styled.textarea`
  padding:10px;
  resize:none;
  width:100%;
  height:100px;
  border:1px solid #E6E6E6;
  outline:none;
  border-radius:10px;
`
const ScoreForm = styled.input.attrs({type:"number"})`
        min-width:50px;
        height:100%;
        outline:none;
        border:1px solid #E6E6E6;
        border-radius:10px;
`
const WriteReview = styled.div`
// *{
//     border:1px solid black;
// }
  margin-bottom:10px;
  .form{
      width:100%;
      padding:10px;
  }
  .contents{
      display:flex;
      justify-content:space-between;
      padding-left:10px;
      padding-right:10px;
      .score{

      }
      .buttonBox{
          .button{
              width:100px;
              padding:10px;
              border-radius:20px;
              background-color:#707070;
              display:flex;
              justify-content:center;
              align-items:center;
              cursor:pointer;
              .text{
                  color:white;
              }
          }

      }
  }

`
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

const ReviewPiece = styled.div`
    display:flex;
    border:1px solid #E9E9E9;
    background-color:#E6E6E6;
    border-radius:20px;
    padding:10px;
    margin-bottom:10px;
    .pics{
        width:100px;
        height:100px;
        border:1px solid #E6E6E6;
        background-color:white;
        margin-right:20px;
    }
    .contents{
        .rate{
            font-size:15px;
            margin-bottom:5px;
        }
        .comment{
            font-size:17px;
            margin-bottom:5px;
        }
        .nickname{
            font-size:12px;
        }

    }
`
const CreateReview = styled.div`
    // *{
    //     border:1px solid black;
    // }
    // border:1px solid black;
    width:100%;
    height:30px;
    margin-bottom:10px;
    display:flex;
    justify-content:center;
    .button{
        width:80%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:20px;
        background-color:#707070;
        cursor:pointer;
    }
    .font{
        font-size:15px;
        color:white;
    }
`

class ItemReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reply: false,
            targetId: null,
            this_comment: "",
            this_reply: "",
            page: 0,
            review_writing: false,
            review_selected: -1,
            score: 0,
            // ing: false
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.reset = this.reset.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.reply = this.reply.bind(this);
        this.undoReply = this.undoReply.bind(this);
        this.undoComment = this.undoComment.bind(this);
        this.requestAnswer = this.requestAnswer.bind(this);
        this.requestReview = this.requestReview.bind(this);
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
    async reset() {
        console.log("change review writing");

        await this.setState({
            reply: false,
            targetId: null,
            this_comment: "",
            this_reply: "",
            page: 0,
            review_writing: false,
            review_selected: -1,
            score: 0,
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
    requestReview(id) {
        if (this.checkPermission() === false)
            return;
        if (this.state.this_comment.length > 0)
            this.props.request({ score: this.state.score > 5 ? 5 : this.state.score, comment: this.state.this_comment, payment_id: id });
        console.log("change review writing");
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
        console.log(this.state);
        const { review, payment, userInfo, total, score, user_id } = this.props;
        const { reply, this_reply, this_comment, page } = this.state;
        const master = user_id === (userInfo && userInfo.uid);

        const Review = (props) => {
            return (
                // <div className="line element-reply">
                //     {!props.itsmine && props.sort_in_group && master ?
                //         <div onClick={() => this.reply(props.uid)}>[답변하기]</div> : null}
                //     {/* {props.itsmine && !master ?<div >[삭제하기]</div> : null} */}
                //     <div className="line">
                //         {props.is_review ? "" : <ReplyPrefix>판매자 답변</ReplyPrefix>}
                //         {props.comment}</div>
                //     <div style={{ width: "max-content", marginLeft: "auto" }}>{props.nick_name}</div>
                //     <div style={{ width: "max-content", marginLeft: "15px" }}>{props.sort_in_group === 0 ? Star(props.score) : null}</div>
                //     <div style={{ width: "max-content", marginLeft: "75px" }}>{DateFormat(props.create_time)}</div>
                // </div>
                <ReviewPiece>
                    <div className="pics" />
                    <div>
                        <div className="score">{Star(props.score)}({props.score})</div>
                        <div className="comment">{props.comment}</div>
                        <div className="nickname">{props.nick_name}</div>
                    </div>
                </ReviewPiece>
            )
        }

        return (<React.Fragment>
            <Reviews>
                <div className="line">
                    <div className="title">리뷰</div>
                    <div className="score">{Star(score)}({total})</div>
                </div>
                {!master ?
                    payment && payment.length > 0 ?
                        payment.map((pay, index) => {
                            console.log(pay);
                            return <div key={index} onClick={() => this.setState({ review_selected: index, review_writing: true })}>
                                {(this.state.review_writing && this.state.review_selected) === index ?
                                    <WriteReview>
                                        <div className="form">
                                            <ReviewForm
                                             value={this_comment || ""}
                                             onChange={this.onChangeValue}
                                             name="this_comment"
                                             onKeyDown={this.handleKeyDown}
                                             />
                                        </div>
                                        <div className="contents">
                                            <div className="score">
                                            <ScoreForm
                                                style={{ width: "25px" }}
                                                value={this.state.score || 0}
                                                onChange={this.onChangeValue}
                                                name="score" />
                                            </div>
                                            <div className="buttonBox">
                                                <div className="button" onClick={() => this.requestReview(pay.uid)} >
                                                <div className="text" >리뷰작성</div></div>
                                            </div>
                                        </div>
                                    </WriteReview>
                                    : 
                                        <CreateReview>
                                            <div className="button"><div className="font">리뷰 작성하기</div></div>
                                        </CreateReview>
                                    }
                            </div>
                        }) : null
                    : null}


                <div>
                    {review && review.length > 0 ?
                        review.map((item, index) =>
                            <div key={index}>
                                <Review
                                    {...item}
                                    key={index}
                                    itsmine={item.user_id === (userInfo && userInfo.uid)}
                                    is_review={item.sort_in_group === 0}
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
            </Reviews>
        </React.Fragment >)
    }
}
export default ItemReview;
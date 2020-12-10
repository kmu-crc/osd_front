import React, { Component } from 'react';
import styled from 'styled-components';
// import DateFormat from "modules/DateFormat";
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import { Rating } from 'semantic-ui-react'
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import ReviewDetailModal from "components/Commons/ReviewDetailModal";
import WriteReviewModal from "components/Commons/WriteReviewModal"

const Reviews = styled.div`
  background: #FFFFFF;
  opacity: 1;
  padding: 10px;
  .header{
      display:flex;
      align-items:center;
      justify-content:space-between;
    .wrapper{
        display:flex;
        .title{
            font-size:20px;
            font-family:Noto Sans KR, Medium;
            margin-right:29px;
        }  
        .score{
            font-size:15px;
            font-family:Noto Sans KR, Light;
            font-weight:200;
        }    
    }
    .button{

    }
  }
  .hrLine{
      width:100%;
      height:2px;
      background-color:#d6d6d6;
      margin-top:19px;
      margin-bottom:17px;
  }
  .reviewContent{
    display:flex;
    flex-wrap:wrap;
    .piece{
        width:46%;
    }
    .marginInfo{
        margin-right:98px;
        margin-bottom:30px;
    }
    .blank{
        width:100%;
        height:90px;
        display:flex;
        justify-content:center;
        align-items:center;
    }
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
const ReviewButton=styled.div`
  width:110px;
  height:43px;
  border:1px solid red;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  .text{
      font-size:20px;
      color:red;
  }
`
//const ScoreForm = styled.input.attrs({ type: "number" })`
//        min-width:50px;
//        height:100%;
//        outline:none;
//        border:1px solid #E6E6E6;
//        border-radius:10px;
//`
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
        // display:flex;
        // align-items:flex-end;
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
    margin-top: 45px;
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
//const ReplyPrefix = styled.div`
//    width: max-content;
//    padding: 3px 6px 3px 6px;
//    border-radius: 25px;
//    margin-left: 25px;
//    margin-right: 5px;
//    background: blue;
//    color: white;
//`;

const ReviewPiece = styled.div`
    cursor:pointer;
    width:100%;
    display:flex;
    border-radius:20px;
    .pics{
        min-width: 80px;
        min-height: 80px;
        max-width: 80px;
        max-height: 80px;
        border: 1px solid #E6E6E6;
        margin-right: 20px;
        background-color: white;
        background-image: url(${props => props.img});
        background-size: cover;
        background-repeat: none;
    }
    .comment{
        height:100%;
        display:flex;
        align-items:center;
    }
    ._contents{
        width:100%;
        display:flex;
        flex-direction:column;
        .header{
            display:flex;
            justify-content:space-between;
            .leftbox{
                display:flex;
                .nickname{
                    font-family:Noto Sans CJK KR, Regular;
                    font-size:15px;
                }
                .score{
                    margin-left:15px;
                }

            }
            .createTime{
                font-family:Noto Sans CJK KR, Regular;
                font-size:15px;
            }
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
            totalscore:0,
            // ing: false
            reviewDetail:false,
            writeReview:false,
            detail:null,
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
        this.handleRate = this.handleRate.bind(this);
    }
    async componentWillUpdate(nextProps){
        if(this.props.score !== nextProps.score){
            await this.setState({totalscore:nextProps.score});
            return true;
        }
    }
    handleRate(e, { rating, maxRating }) {
        this.setState({ score: rating });
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
    requestReview(id,comment,score,thumbnail) {
        console.log(id,comment,score,thumbnail);
        if (this.checkPermission() === false)
            return;
        if (comment.length > 0)
            this.props.request({ score:score, comment: comment, payment_id: id, thumbnail:thumbnail});
        this.setState({writeReview:false})
        console.log("change review writing");
        this.reset();
        this.props.refresh && this.props.refresh();
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
        console.log(this.props);
        const { review, payment, userInfo, total, score, user_id } = this.props;
        const { reply, this_reply, this_comment, page } = this.state;
        const master = user_id === (userInfo && userInfo.uid);
        const avgScore = this.props.score;
        let reviewCount=0;
        const TotalScore = ()=>{
            return <Rating name="score" icon='star' size="tiny" defaultRating={parseInt(this.state.totalscore,10)} maxRating={5} disabled />
        }
        const Review = (props) => {
            console.log(props)
            const thumbnail_list = props.thumbnail!=null?props.thumbnail.split(","):[];
            return (
                <ReviewPiece onClick={() => {this.setState({detail:props,reviewDetail:true})}} img={thumbnail_list[0] || noimg}>
                    {thumbnail_list.length<=0?null:<div className="pics" />}
                    <div className="_contents">
                        <div className="header">
                            <div className="leftbox">
                                <div className="nickname">{props.nick_name}</div>
                                <div className="score">
                                    <Rating name="score" icon='star' defaultRating={parseInt(props.score,10)||0} maxRating={5} disabled />
                                </div>
                            </div>
                        <div className="createTime">
                            {
                                    new Date(props.create_time).getFullYear()+"."
                                +((new Date(props.create_time).getMonth()+1)<10?'0'+(new Date(props.create_time).getMonth()+1):(new Date(props.create_time).getMonth()+1))+"."
                                +(new Date(props.create_tㅔime).getDate()<10?'0'+new Date(props.create_time).getDate():new Date(props.create_time).getDate())
                            }
                        </div>
                        </div>
                        <div className="comment">
                            {props.comment && props.comment.slice(0, 100)}
                            {props.comment && props.comment.length > 100 ? "..." : ""}</div>
                    </div>
                </ReviewPiece>
            )
        }
        console.log(this.props);
        return (<React.Fragment>
            <ReviewDetailModal 
                open={this.state.reviewDetail}
                close={() => this.setState({ reviewDetail: false })}
                detail={this.state.detail}
            />
            <WriteReviewModal 
                open={this.state.writeReview}
                close={() => this.setState({ writeReview: false })}
                modify={this.state.detail}
                requestReview = {(uid,comment,score,thumbnail_list) => this.requestReview(uid,comment,score,thumbnail_list)}
                payment_id={payment&&payment.length>0&&payment[0].uid}
                {...this.props}
            />
            {/* <WriteReviewModal open={this.state.writeReview} close={() => this.setState({ writeReview: false })}/> */}
            <Reviews>
                <div className="header">
                    <div className="wrapper">
                        <div className="title">리뷰</div>
                        <div className="score">총점(리뷰수):<TotalScore/>({total})</div>
                    </div>
                    <div className="button">
                        {
                            !master ?
                            payment && payment.length > 0 ?
                            <ReviewButton onClick={()=>{this.setState({writeReview:true})}}>
                                <div className="text">리뷰 쓰기</div>
                            </ReviewButton> 
                            :
                            null
                            :
                            null
                        }
                    </div>
                </div>
                <div className="hrLine"/>


                <div className="reviewContent">
                    {review && review.length > 0 ?
                        review.map((item, index) =>{
                            reviewCount++;
                            const styleinfo = reviewCount%2==1?"piece marginInfo":"piece";
                            return(
                            <div  className={styleinfo} key={index}>
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
                                            <div className="text" >답변</div></div>
                                    </div> : null}
                                </div>)}) : <div className="blank">작성된 리뷰가 없습니다.</div>}
                </div>
                {total>10?
                <Page>
                    {total
                        ? Array(parseInt((total / 10) + 1, 10)).fill().map((_, i) =>
                            <div style={{cursor:"pointer"}} key={i} onClick={() => this.getData(i)} className={page === i ? "this number" : "another number"}> {i + 1}</div>)
                        : (<React.Fragment>&nbsp;</React.Fragment>)}
                </Page>    
                :null
                }
            </Reviews>
        </React.Fragment >)
    }
}
export default ItemReview;
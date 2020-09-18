import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";
import { Rating } from 'semantic-ui-react'

const TextArea = styled.textarea`
    width:100%;
    height:384px;
    padding:20px;
    font-family:Noto Sans CJK KR, Regular;
    font-size:20px;
    font-weight:300;
    margin-left:20px;
    border:1px solid #efefef;
    border-radius:10px;
    outline:none;
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
const WriteDialog=styled(Modal)`
    width: 850px;
    height:max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    border-radius: 20px;
    opacity: 1;
    padding:24px;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .buttonbox{
        margin-top:26px;
        width:100%;
        display:flex;
        justify-content:center;
    }
     .close-box {
        width: 100%;
        cursor: pointer;
        display:flex;
        justify-content:flex-end;
        position: relative;
    }
    ._wrapper{

        margin-right:26px;
        margin-left:26px;
    .starscore{
        width:100%;
        margin-top:26px;
        margin-bottom:13px;
    }
    .basicInfo{
        width:100%;
        display:flex;
        justify-content:space-between;
        .left{
            display:flex;
            .nickName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-right:10px;
            }
            .productName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-left:10px;
            }
        }
        .right{
            .create_time{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
            }
        }

    }
    .review-content{
        width:100%;
        display:flex;
        margin-top:19px;
        .pic{
            min-width:378px;
            min-height:384px;
            max-width:378px;
            max-height:384px;
            border:1px solid #d6d6d6;
            background-color: #e6e6e6;
            background-image: url(${props => props.img});
            background-size:cover;
            border-radius:5px;
            display:flex;
            justify-content:center;
            align-items:center;
            .picText{
                color:white;
            }
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:20px;
            font-weight:300;
            margin-left:20px;
            
        }
    }
    
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
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 

     .close-box {
        width: 100%;
        cursor: pointer;
        display:flex;
        justify-content:flex-end;
        position: relative;
    }
    ._wrapper{

        margin-right:26px;
        margin-left:26px;
    .starscore{
        width:100%;
        margin-top:26px;
        margin-bottom:13px;
    }
    .basicInfo{
        width:100%;
        display:flex;
        justify-content:space-between;
        .left{
            display:flex;
            .nickName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-right:10px;
            }
            .productName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-left:10px;
            }
        }
        .right{
            .create_time{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
            }
        }

    }
    .review-content{
        width:100%;
        display:flex;
        margin-top:19px;
        .pic{
            min-width:378px;
            min-height:384px;
            max-width:378px;
            max-height:384px;
            background-image: url(${props => props.img});
            background-size:cover;
            border-radius:5px;
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:20px;
            font-weight:300;
            margin-left:20px;
            
        }
    }
    
    }
`;

class WriteReviewModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            thumbnail_url:"",
            thumbnail_name:"",
            comment:"",
            score:0,
        }
        this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
        this.handleOnChangeComment = this.handleOnChangeComment.bind(this);
        this.handleOnChangeScore = this.handleOnChangeScore.bind(this);
    }
    handleOnChangeComment(event){
        this.setState({comment:event.target.value});
    }
    handleOnChangeScore(e, { rating, maxRating }) {
        this.setState({ score: rating });
    }
    handleOnChangeThumbnail(event) {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
          this.setState({ thumbnail_url: reader.result, thumbnail_name: file.name })
        }
        if (event.target.files[0]) {
          reader.readAsDataURL(file);
        }
    };
    render() {
        console.log(this.props);
        const RenderStar = () => {
            return <Rating size="tiny" name="score" icon='star' defaultRating={parseInt(5, 10)} maxRating={5} disabled />
          }
        return (
            <React.Fragment>
                    <WriteDialog open={this.props.open} onClose={this.props.close} img={this.state.thumbnail_url}>
                    <div className="close-box" onClick={this.props.close}>
                        <Cross angle={45} color={"#707070"} weight={1} width={15} height={15} />
                    </div>
                    <div className="_wrapper">
                    <div className="starscore">
                        <Rating name="score" icon='star' onRate={this.handleOnChangeScore} value={this.state.score || 0} maxRating={5} />
                    </div>
                    <div className="basicInfo">
                        <div className="left">
                            {/* <div className="nickName">{detail.nick_name}</div> */}
                            {/* <div>|</div> */}
                            {/* <div className="productName">{detail.title}</div> */}
                        </div>
                    </div>
                    <div className="review-content">
                        <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" accept="image/*" />
                        <label htmlFor="file">
                            <div className="pic"><div className="picText">{this.state.thumbnail_url==null?"":"클릭하여 이미지를 첨부하세요"}</div></div>
                        </label>
                        <TextArea onChange={this.handleOnChangeComment}/>
                    </div>
                    </div>
                    <div className="buttonbox">
                        <ReviewButton onClick={()=>{this.props.requestReview(this.props.payment_id,this.state.comment,this.state.score,this.state.thumbnail_url,this.state.thumbnail_name)}}><div className="text">리뷰 쓰기</div></ReviewButton>
                    </div>
                </WriteDialog>
            </React.Fragment>
        )
    }
}

export default WriteReviewModal;

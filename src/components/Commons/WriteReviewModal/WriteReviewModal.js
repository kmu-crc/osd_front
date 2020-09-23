import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";
import { Rating } from 'semantic-ui-react'
import { FileUploadRequest } from "actions/Uploads";

const AddPic = styled.div`
    min-width:${props=>props.width}px;
    min-height:${props=>props.height}px;
    max-width:${props=>props.width}px;
    max-height:${props=>props.height}px;

    margin-right:${props=>props.marginRight==null?0:props.marginRight}px;

    border:1px solid #d6d6d6;
    background-color: #e6e6e6;
    background-image: url(${props => props.img});
    background-size:cover;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    .text{
        font-size:15px;
        color:white;
    }
`
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
        .pic_list{
            min-width:378px;
            min-height:384px;
            max-width:378px;
            max-height:384px;
            display:flex;
            align-items:center;
            flex-direction:column;
            .mini_pic_list{
                width:100%;
                height:90px;
                margin-top:10px;
                display:flex;
                // justify-content:center;
            }
        }
        .pic{
            min-width:378px;
            min-height:284px;
            max-width:378px;
            max-height:284px;
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
        .pic_list{
            width:100px;
            height:100px;
            // min-width:378px;
            // min-height:384px;
            // max-width:378px;
            // max-height:384px;
            // display:flex;
            // flex-direction:column;
            // justify-content:center;
        }
        .pic{
            min-width:278px;
            min-height:284px;
            max-width:278px;
            max-height:284px;
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
            // thumbnail_url:"",
            // thumbnail_name:"",
            thumbnail:[],
            files:[],
            comment:"",
            score:0,
            result:[],
        }
        this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
        this.handleOnChangeComment = this.handleOnChangeComment.bind(this);
        this.handleOnChangeScore = this.handleOnChangeScore.bind(this);
        this.onClickWriteReview = this.onClickWriteReview.bind(this);
    }
    handleOnChangeComment(event){
        this.setState({comment:event.target.value});
    }
    handleOnChangeScore(e, { rating, maxRating }) {
        this.setState({ score: rating });
    }
    handleOnChangeThumbnail(event,index) {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
        const thumbnail_url=reader.result;
         if(this.state.thumbnail&&this.state.thumbnail.length<=0){
             this.setState({thumbnail:this.state.thumbnail.concat(thumbnail_url),files:this.state.files.concat(file)});
         }else{
             console.log(index);
            let thumbnail_list = this.state.thumbnail;
            let file_list = this.state.files;
            thumbnail_list.splice(index,1,thumbnail_url);
            file_list.splice(index,1,file);
            this.setState({thumbnail:thumbnail_list,files:file_list});
         }
        }
        if (event.target.files[0]) {
          reader.readAsDataURL(file);
        }
    };
    async onClickWriteReview(event){

        // let list = [];
        const list = await Promise.all(this.state.thumbnail.map(async(item,index)=>{
            if(item.indexOf("https://s3")==-1){
                    const file = this.state.files[index];
                    const s3path = await FileUploadRequest([file]);
                    return s3path.path;
            }else{
                    return item;
            }
        }));
        this.props.requestReview(this.props.payment_id,this.state.comment,this.state.score,list.join());
        // if(this.state.thumbnail&&this.state.thumbnail.length>0){
        //     new Promise((resolve)=>{this.state.thumbnail.forEach(async(item,index)=>{
        //         const file = this.state.files[index];
        //         // if(item.indexOf("https://s3")==-1){
        //             const s3path = await FileUploadRequest([file]);
        //             await list.push(s3path.path);
        //             console.log("######"+index);
        //             // await this.setState({result:this.state.result.concat(s3path.path)});
        //         // }else{
        //             // await list.push(item);
        //             // console.log("@@@@@"+index);
        //             // await this.setState({result:this.state.result.concat(item)});
        //         // }
        //     }
        //     )
        //     resolve(true);
        // }).then(()=>console.log(list));  
        // }
        // await this.state.thumbnail&&this.state.thumbnail.length>0&&
        //     this.state.thumbnail.forEach(async(item,index)=>{
        //         const file = this.state.files[index];
        //         if(item.indexOf("https://s3.")==-1){
        //             const s3path = await FileUploadRequest([file]);
        //             await list.concat(s3path.path);
        //         }else{
        //             await list.concat(item);
        //         }
        //     })
        // this.props.requestReview(this.props.payment_id,this.state.comment,this.state.score,list.join());
    }
    render() {
        console.log(this.state);
        const RenderStar = () => {
            return <Rating size="tiny" name="score" icon='star' defaultRating={parseInt(5, 10)} maxRating={5} disabled />
          }
        let imgCount=0;
        return (
            <React.Fragment>
                    <WriteDialog open={this.props.open} onClose={this.props.close}>
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
                        <div className="pic_list">
                        <input hidden onChange={(event)=>this.handleOnChangeThumbnail(event,0)} id="file" type="file" accept="image/*" />
                        <label htmlFor="file">
                            <AddPic width={378} height={284} img={this.state.thumbnail.length>0?this.state.thumbnail[0]:null}>
                                <div className="text">{this.state.thumbnail.length>0?"이미지 첨부":null}</div>
                            </AddPic>
                        </label>
                        <div className="mini_pic_list">
                                {
                                this.state.thumbnail&&
                                this.state.thumbnail.length>0?
                                this.state.thumbnail.map((item,index)=>{
                                    return(
                                        <div key={index}>
                                            <input hidden onChange={(event)=>this.handleOnChangeThumbnail(event,index)} id={`file${index}`}type="file" accept="image/*" />
                                            <label onClick={()=>{console.log(imgCount)}} htmlFor={`file${index}`}>
                                                <AddPic width={90} height={90} marginRight={5} img={item}/>
                                            </label>
                                        </div>
                                    );
                                })
                                :   
                                null                         
                            }
                            {
                                this.state.thumbnail&&
                                this.state.thumbnail.length>=4?
                                null
                                :
                                <React.Fragment>
                                <input hidden 
                                    onChange={(event)=>this.handleOnChangeThumbnail(event,this.state.thumbnail&&this.state.thumbnail.length<0?0:this.state.thumbnail.length)} 
                                    id={`addfile`}type="file" accept="image/*" />
                                <label htmlFor={`addfile`}>
                                <AddPic width={90} height={90} marginRight={5}>
                                    <div className="text">+</div>
                                </AddPic>
                                </label>
                                </React.Fragment>
                            }

                        </div>

                        </div>
                        <TextArea onChange={this.handleOnChangeComment}/>
                    </div>
                    </div>
                    <div className="buttonbox">
                        <ReviewButton onClick={this.onClickWriteReview}><div className="text">리뷰 쓰기</div></ReviewButton>
                        {/* ;this.props.requestReview(this.props.payment_id,this.state.comment,this.state.score,this.state.thumbnail.join())} */}
                    </div>
                </WriteDialog>
            </React.Fragment>
        )
    }
}

export default WriteReviewModal;

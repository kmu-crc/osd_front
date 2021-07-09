import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";
import { Rating } from 'semantic-ui-react'
import { FileUploadRequest } from "actions/Uploads";
import market_style from "market_style";

const AddPic = styled.div`
    min-width:${props=>props.width}px;
    min-height:${props=>props.height}px;
    max-width:${props=>props.width}px;
    max-height:${props=>props.height}px;

    margin-right:${props=>props.marginRight==null?0:props.marginRight}px;

    background-color: #efefef;
    background-image: url(${props => props.img});
    background-size:cover;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
    cursor:pointer;
    border:1px solid #eaeaea;
    .deleteButton{
        display:none;
        z-index:999;
    }
    .text{
        font-size:${market_style.font.size.normal3};
        color:#afafaf;
    }
    &:hover{
        .deleteButton{
            display:block;
            width:18px;
            height:18px;
            border-radius:11px;
            color:white;
            background-color:#afafaf;
            padding:4px 3px;
            position:absolute;
            right:-5px;
            top:-5px;
    
        }
    }
`
const TextArea = styled.textarea`
    width:100%;
    height:234px;
    padding:20px;
    font-family:Noto Sans CJK KR, Regular;
    font-size:${market_style.font.size.mini2};
    font-weight:300;
    color:#afafaf;
    border:1px solid #efefef;
    border-radius:10px;
    outline:none;
    margin-top:10px;
    background-color:#efefef;
`
const ReviewButton=styled.div`
  width:150px;
  height:30px;
  background-color:red;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  .text{
    font-size:${market_style.font.size.small1};
      color:white;
  }
`
const WriteDialog=styled(Modal)`
    width:1000px;
    // height: 634px !important;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    border-radius: 20px !important;
    opacity: 1;
    padding:30px 50px;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .buttonbox{
        margin-top:20px;
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
        width:100%;
    .header{
        display:flex;
        justify-content:center;
        margin-bottom:20px;
        .mainImg{
                border:0.5px solid #eaeaea;
                width:130px;
                height:130px;
                background-image: url(${props => props.img});
                background-size: contain;
                background-repeat:no-repeat;
                background-position: center center;
                margin-right:20px;
            }
            .explainBox{
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                .basic{
                    font-size:${market_style.font.size.small1};
                    display:flex;
                    align-items:center;
                    margin-bottom:5px;
                }
                .boldText{
                    font-weight:500;
                }

            }
    }
    .hrLine{
        height:2px;
        width:100%;
        background-color:#d6d6d6;
        margin-top:16px;
        margin-bottom:18px;
    }
    .basicInfo{
        width:100%;
        display:flex;
        justify-content:space-between;
        .left{
            display:flex;
            .nickName{
                font-size:${market_style.font.size.samll1};
                font-family:Noto Sans CJK KR, Regular;
                margin-right:10px;
            }
            .productName{
                font-size:${market_style.font.size.samll1};
                font-family:Noto Sans CJK KR, Regular;
                margin-left:10px;
            }
        }
        .right{
            .create_time{
                font-size:${market_style.font.size.samll1};
                font-family:Noto Sans CJK KR, Regular;
            }
        }

    }
    .review-content{
        width:100%;
        display:flex;
        .mini_pic_list{
            width:100%;
            height:max-content;
            display:flex;
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
            font-size:${market_style.font.size.normal3};
            font-weight:300;
            margin-left:20px;
            
        }
    }
    
    }

`

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
    componentDidUpdate(nextProps){

        if(this.props.detail!=nextProps.detail){
            const { detail } = this.props;
            const thumbnail_list = detail&&detail.thumbnail&&detail.thumbnail.length>0?
            detail.thumbnail.split(","):[];

            this.setState({
                thumbnail:detail.thumbnail_list,
                score:detail.score,
                comment:detail.comment
            })
    
        }
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
        console.log(this.props.payment_id,this.state.comment,this.state.score);
        // let list = [];
        let list = await Promise.all(this.state.thumbnail.map(async(item,index)=>{
            console.log(item);
            if(item.indexOf("https://s3")==-1){
                    const file = this.state.files[index];
                    const s3path = await FileUploadRequest([file]);
                    console.log(s3path);
                    return s3path.path;
            }else{
                    return item;
            }
        }));

        // return;
        this.props.requestReview(this.props.payment_id,this.state.comment,this.state.score,list.join())
        this.setState({
            thumbnail:[],
            files:[],
            comment:"",
            score:0,
            result:[],
        })
    }
    render() {

        const RenderStar = () => {
            return <Rating size="tiny" name="score" icon='star' defaultRating={parseInt(5, 10)} maxRating={5} disabled />
          }
        let imgCount=0;
        return (
            <React.Fragment>
                    <WriteDialog open={this.props.open} onClose={this.props.close} img={this.props.ItemDetail&&this.props.ItemDetail.thumbnail&&this.props.ItemDetail.thumbnail.l_img}>
                    <div className="close-box" onClick={this.props.close}>
                        <Cross angle={45} color={"#707070"} weight={1} width={23} height={23} />
                    </div>
                    <div className="_wrapper">
                        <div className="header">
                                <div className="mainImg"/>
                                <div className="explainBox">
                                    <div>
                                    <div className="basic boldText">별점을 선택해주세요</div>
                                    <div className="basic">
                                        <Rating size="huge" name="score" icon='star' onRate={this.handleOnChangeScore} value={this.state.score || 0} maxRating={5} />
                                        ({this.state.score})
                                    </div>
                                    </div>
                                    <div className="basic boldText">{this.props.ItemDetail.title}</div>
                                </div>
                        </div>
                    <div className="review-content">
                        <div className="mini_pic_list">
                                {
                                this.state.thumbnail&&
                                this.state.thumbnail.length>0?
                                this.state.thumbnail.map((item,index)=>{
                                    return(
                                        <React.Fragment>
                                            <input hidden onChange={(event)=>this.handleOnChangeThumbnail(event,index)} id={`file${index}`}type="file" accept="image/*" />
                                            <label onClick={()=>{console.log(imgCount)}} htmlFor={`file${index}`}>
                                                <AddPic key={index} width={130} height={130} marginRight={15} img={item}>
                                                    <div className="deleteButton"
                                                    onClick={async(e)=>{
                                                        e.preventDefault();
                                                        let copy = [...this.state.thumbnail];
                                                        copy.splice(index, 1);
                                                        await this.setState({ thumbnail: copy });
                                                    }}
                                                    ><Cross angle={45} color={"white"} weight={2} width={10} height={10} /></div>
                                                </AddPic>
                                            </label>
                                        </React.Fragment>
                                    );
                                })
                                :   
                                null                         
                            }
                            {
                                this.state.thumbnail&&
                                this.state.thumbnail.length>=5?
                                null
                                :
                                <React.Fragment>
                                <input hidden 
                                    onChange={(event)=>this.handleOnChangeThumbnail(event,this.state.thumbnail&&this.state.thumbnail.length<0?0:this.state.thumbnail.length)} 
                                    id={`addfile`}type="file" accept="image/*" />
                                <label htmlFor={`addfile`}>
                                <AddPic width={130} height={130} marginRight={15}>
                                    {/* <div className="deleteButton"><Cross angle={45} color={"white"} weight={2} width={10} height={10} /></div> */}
                                    <div className="text">+</div>
                                    <div>사진 추가하기</div>
                                </AddPic>
                                </label>
                                </React.Fragment>
                            }

                        </div>

                        </div>
                        <TextArea value={this.state.comment} placeholder="리뷰를 작성해주세요" onChange={this.handleOnChangeComment}/>
                    </div>
                    <div className="buttonbox">
                        <ReviewButton onClick={this.onClickWriteReview}><div className="text">작성 완료</div></ReviewButton>
                        {/* ;this.props.requestReview(this.props.payment_id,this.state.comment,this.state.score,this.state.thumbnail.join())} */}
                    </div>
                </WriteDialog>
            </React.Fragment>
        )
    }
}

export default WriteReviewModal;

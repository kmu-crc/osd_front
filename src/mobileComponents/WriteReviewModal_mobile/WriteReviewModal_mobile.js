import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";
import { Rating } from 'semantic-ui-react'
import { FileUploadRequest } from "actions/Uploads";
import market_style from "market_style";

const WriteDialogMobile = styled(Modal)`

    width:100%;
    padding:13px 10px 20px 10px;
    .header_{
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .title{
            font-size:${market_style.font.size.small1};
            font-weight:500;
            color:black;
        }
    }
    .close{
        width:25px;
        height:25px;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .mini_pic_list{
        width:100%;
        height:max-content;
        display:flex;
        overflow-y:scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    .hrline{
        width:100%;
        border:1px solid #EFEFEF;
        margin-top:12px;
    }
    .mini_pic_list::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
    .buttonBox{
        width:100%;
        margin-top:20px;
        .okButton{
            background-color:red;
            width:100%;
            height:35px;
            border-radius:10px;
            display:flex;
            justify-content:center;
            align-items:center;
            color:white;
            font-weight:500;
            font-size:${market_style.font.size.small1};
        }
    }
    .infoBox{
        width:100%;
        padding:20px 36px 20px 36px;
        display:flex;
        justify-content:center;
        .mainImg{
            width:100px;
            height:100px;
            background-color:#EEEEEE;
            background-image: url(${props => props.img});
            background-size: cover;
            background-repeat:no-repeat;
            background-position: center center;
            margin-right:30px;
        }
        .textbox{
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            .star_text{
                font-size:${market_style.font.size.small1};
                font-weight:400;
                color:black;
                margin-bottom:5px;
            }   
            .score_text{
                font-size:${market_style.font.size.mini2};
                font-weight:400;
                color:black;
            }
            .item_name{
                font-size:${market_style.font.size.small1};
                font-weight:300;
                color:black;
            } 
        }
    }
`
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
        margin-bottom:20px;
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
    height:188px;
    padding:5px 15px;
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
class WriteReviewModal_mobile extends Component {
    constructor(props){
        super(props);
        this.state = {
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
                <WriteDialogMobile open={this.props.open} onClose={this.props.close} img={this.props.ItemDetail&&this.props.ItemDetail.thumbnail&&this.props.ItemDetail.thumbnail.l_img}>
                    <div className="header_">
                        <div className="close"/>
                        <div className="title">리뷰 등록</div>
                        <div className="close" onClick={this.props.close}><Cross angle={45} color={"#707070"} weight={1} width={23} height={23} /></div>
                    </div>
                    <div className="hrline"/>
                    <div className="infoBox">
                        <div className="mainImg"/>
                        <div className="textbox">
                            <div>
                                <div className="star_text">별점을 선택해주세요</div>
                                <div className="score_text">
                                <Rating size="big" name="score" icon='star' onRate={this.handleOnChangeScore} value={this.state.score || 0} maxRating={5} />
                                ({this.state.score})
                                </div>
                            </div>
                            <div className="item_name">
                `               {this.props.ItemDetail.title}
                            </div>
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
                                <AddPic key={index} width={100} height={100} marginRight={15} img={item}>
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
                <AddPic width={100} height={100} marginRight={15}>
                    <div className="text">+</div>
                    <div>사진 추가하기</div>
                </AddPic>
                </label>
                </React.Fragment>
                }
            </div>
            </div>
            <TextArea placeholder="리뷰를 작성해주세요" onChange={this.handleOnChangeComment}/>
            <div className="buttonBox">
                <div className="okButton" onClick={this.onClickWriteReview}>작성완료</div>
            </div>
            </WriteDialogMobile>
            </React.Fragment>
        )
    }
}

export default WriteReviewModal_mobile;
{/* <WriteDialog open={this.props.open} onClose={this.props.close} img={this.props.ItemDetail&&this.props.ItemDetail.thumbnail&&this.props.ItemDetail.thumbnail.l_img}>
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
                <div className="text">+</div>
                <div>사진 추가하기</div>
            </AddPic>
            </label>
            </React.Fragment>
        }

    </div>

    </div>
    <TextArea placeholder="리뷰를 작성해주세요" onChange={this.handleOnChangeComment}/>
</div>
<div className="buttonbox">
    <ReviewButton onClick={this.onClickWriteReview}><div className="text">작성 완료</div></ReviewButton>
</div>
</WriteDialog> */}
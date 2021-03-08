import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";
import { Rating } from 'semantic-ui-react'
import arrow from "source/rightarrow.svg";
import market_style from "market_style";
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
        font-size:${market_style.font.size.samll1};
        color:white;
    }
`
const CustomButton = styled.div`
    min-width:${props=>props.width}px;
    min-height:${props=>props.height}px;
    max-width:${props=>props.width}px;
    max-height:${props=>props.height}px;
    background-image: url(${props => props.img});
    background-size:cover;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    transform:rotate(${props=>props.rotate==null?0:props.rotate}deg);
    .text{
        font-size:${market_style.font.size.samll1};
        color:white;
    }
`
const TextArea = styled.textarea`
    width:100%;
    height:100%;
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
        margin-top:19px;
        .pic{
            min-width:378px;
            min-height:384px;
            max-width:378px;
            max-height:384px;
            background-image: url(${props => props.img});
            background-size:cover;
            border-radius:5px;
            margin-right:20px;
        }
        .pic_list{
            border:1px solid black;
            width:100%;
            min-height:384px;
            max-height:384px;
            overflow-y:hidden;
            display:flex;
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:${market_style.font.size.normal3};
            font-weight:300;    
            line-height:20px;        
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
    .flex_column{
        flex-direction:column;
    }
    .review-content{

        width:100%;
        display:flex;
        flew-wrap:wrap;
        margin-top:19px;
        position:relative;
        .pic_list{
            width:100%;
            min-height:384px;
            max-height:384px;
            overflow:hidden;
            display:flex;
            scroll-behavior:smooth;
            .btn{
                display:none;
            }   
        }
        .pic{
            min-width:378px;
            min-height:384px;
            max-width:378px;
            max-height:384px;
            background-image: url(${props => props.img});
            background-size:cover;
            border-radius:5px;
            margin-right:20px;
            border:1px solid #efefef;
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:${market_style.font.size.normal3};
            font-weight:300;   
            margin-top:16px;     
            line-height:29px;            
        }
    }
    
    }

    &:hover{
        .review-content{
            .pic_list{
                .btn{
                    display:block;
                }
            }
        }
    }
`;

class ReviewDetailModal extends Component {
    render() {
        const { detail } = this.props;
        console.log(detail);
        const thumbnail_list = detail&&detail.thumbnail&&detail.thumbnail.length>0?
        detail.thumbnail.split(","):[];
        const RenderStar = () => {
            return <Rating size="tiny" name="score" icon='star' defaultRating={parseInt(this.props&&this.props.detail&&this.props.detail.score, 10)} maxRating={5} disabled />
          }
        return (
            <React.Fragment>
                    <Dialog open={this.props.open} onClose={this.props.close} img={detail&&detail.thumbnail_url || noimg}>
                    <div className="close-box" onClick={this.props.close}>
                        <Cross angle={45} color={"#707070"} weight={1} width={15} height={15} />
                    </div>
                    <div className="_wrapper">
                    <div className="starscore">
                    <RenderStar />
                    </div>
                    <div className="basicInfo">
                        <div className="left">
                            <div className="nickName">{detail&&detail.nick_name}</div>
                            <div>|</div>
                            <div className="productName">{detail&&detail.title}</div>
                        </div>
                        <div className="right">
                            <div className="create_time">
                                {
                                    new Date(detail&&detail.create_time).getFullYear()+"."
                                    +((new Date(detail&&detail.create_time).getMonth()+1)<10?'0'+(new Date(detail&&detail.create_time).getMonth()+1):(new Date(detail&&detail.create_time).getMonth()+1))+"."
                                    +(new Date(detail&&detail.create_time).getDate()<10?'0'+new Date(detail&&detail.create_time).getDate():new Date(detail&&detail.create_time).getDate())
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`review-content ${thumbnail_list.length>1?"flex_column":null}`}>
                        {thumbnail_list.length>0?<div id="pic_list" className="pic_list">
                            {
                                thumbnail_list.map((item,index)=>{
                                    return(<AddPic key={index} width={378} height={384} img={item} marginRight={34}/>);
                                })
                            }
                            {thumbnail_list.length>=3?<span className="btn"><CustomButton rotate={180}  onClick={()=>{document.getElementById("pic_list").scrollBy(document.getElementById("pic_list").scrollLeft-800,0)}} img={arrow} width={29} height={59} style={{position:"absolute",left:"0px",top:"160px"}}/></span>:null}
                            {thumbnail_list.length>=3?<span className="btn"><CustomButton  onClick={()=>{document.getElementById("pic_list").scrollBy(document.getElementById("pic_list").scrollLeft+400,0)}} img={arrow} width={29} height={59} style={{position:"absolute",right:"0px",top:"160px"}}/></span>:null}
                        </div>:thumbnail_list.length==0?null:<AddPic  width={378} height={384} img={thumbnail_list[0]}/>}
                        <div className="comment">
                            {detail&&detail.comment}
                        </div>
                    </div>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default ReviewDetailModal;

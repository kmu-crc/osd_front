import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";
import { Rating } from 'semantic-ui-react'
import arrow from "source/review_arrow.svg";
import market_style from "market_style";
const AddPic = styled.div`
    min-width:${props=>props.width}px;
    min-height:${props=>props.height}px;
    max-width:${props=>props.width}px;
    max-height:${props=>props.height}px;
    width:100%;
    margin-right:${props=>props.marginRight==null?0:props.marginRight}px;
    background-color: #e6e6e6;
    background-image: url(${props => props.img});
    background-size:cover;
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid #eaeaea;
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
const Dialog = styled(Modal)`
    width: 1000px;
    min-width:300px;
    height:max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    opacity: 1;
    padding:13px 10px 20px 10px !important;
    border-radius:10px !important;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .row{
        width:100%;
        display:flex;
        justify-content:center;
        margin-top:20px;
    }
    .marginRight{margin-right:15px;}
    .red{background-color:#FF3838;}
    .grey{background-color:grey;}
    .button{
        width:160px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;
        font-size:${market_style.font.size.small1};
        font-weight:500;
        border-radius:10px;
    }
     .close-box {
        cursor: pointer;
        width:100%;
        display:flex;
        justify-content:flex-end;
        margin-bottom:15px;
    }
    .basicInfo{
        width:100%;
        display:flex;
        justify-content:space-between;
        margin-bottom:8px;
        .info{
            max-width:200px;
            font-size:${market_style.font.size.small1};
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
    }
    .update{
        width:100%;
        font-size:${market_style.font.size.mini2};
        display:flex;
        justify-content:flex-end;
        color:#707070;
        margin-bottom:10px;
    }
    .flex_column{
        flex-direction:column;
    }
    .grad1{
        opacity:0.5;
        background: transparent linear-gradient(270deg, #FFFFFF00 0%, #FFFFFF95 50%, #FFFFFF 100%) 0% 0% no-repeat padding-box;    
    }
    .grad2{
        opacity:0.5;
        background: transparent linear-gradient(90deg, #FFFFFF00 0%, #FFFFFF95 50%, #FFFFFF 100%) 0% 0% no-repeat padding-box;    
    }
    .review-content{
        width:100%;
        display:flex;
        flew-wrap:wrap;
        position:relative;
        overflow:hidden;
        .maxContent{
            width:max-content;
        }
        .width100{
            width:100%;
        }
        .pic_list{
            min-width:100%;
            overflow:hidden;
            display:flex;
            scroll-behavior:smooth;
            margin-bottom:10px;
            .btn{
                display:block;
            }   
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:${market_style.font.size.small1};
            font-weight:300; 
            margin-top:10px;             
        }
        .margin1{
        }
        .margin2{
            margin-top:10px;
        }
        .margin3{
            margin-left:20px;
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
                        <Cross angle={45} color={"#707070"} weight={1} width={20} height={20} />
                    </div>
                    <div className="basicInfo">
                    <RenderStar />
                    <div className="info">
                        {detail&&detail.nick_name}&nbsp;
                        |&nbsp;
                        {detail&&detail.title}
                    </div>
                    </div>
                    <div className="update">
                                {
                                    new Date(detail&&detail.create_time).getFullYear()+"."
                                    +((new Date(detail&&detail.create_time).getMonth()+1)<10?'0'+(new Date(detail&&detail.create_time).getMonth()+1):(new Date(detail&&detail.create_time).getMonth()+1))+"."
                                    +(new Date(detail&&detail.create_time).getDate()<10?'0'+new Date(detail&&detail.create_time).getDate():new Date(detail&&detail.create_time).getDate())
                                }
                    </div>
                    {/* 
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
                    </div> */}
                    <div className={`review-content ${thumbnail_list.length>1?"flex_column":null}`}>
                        {thumbnail_list.length>0?<div id="pic_list" className={`pic_list ${thumbnail_list.length==0?"width100":thumbnail_list.length>1?"width100":"maxContent"}`}>
                            {
                                thumbnail_list.length<=1?
                                thumbnail_list.map((item,index)=>{
                                    console.log("this.props",item);
                                    return(<AddPic key={index} width={336} height={336} img={item} marginRight={20}/>);
                                })
                                :
                                thumbnail_list.map((item,index)=>{
                                    console.log("this.props",item);
                                    return(<AddPic key={index} width={180} height={180} img={item} marginRight={20}/>);
                                })
                            }
                            {thumbnail_list.length>=2?
                            <div className="grad1"  style={{position:"absolute",width:"60px",height:"100%"}}>
                                <CustomButton width={10} height={20} rotate={180}  
                                             onClick={()=>{document.getElementById("pic_list").scrollBy(document.getElementById("pic_list").scrollLeft-800,0)}} 
                                             img={arrow} style={{position:"absolute",left:"10px",top:"80px"}}/>
                            </div>
                            :null}
                            {
                            thumbnail_list.length>=2?
                            <div className="grad2" style={{position:"absolute",right:"0px",width:"60px",height:"100%"}}>
                                <CustomButton width={10} height={20}  
                                onClick={()=>{document.getElementById("pic_list").scrollBy(document.getElementById("pic_list").scrollLeft+400,0)}} 
                                img={arrow}  style={{ position:"absolute",right:"10px",top:"80px"}}/>
                                </div>
                            :null}
                        </div>:thumbnail_list.length==0?null:<AddPic  width={300} height={300}img={thumbnail_list[0]}/>}
                        
                    </div>
                    <div className={`comment ${thumbnail_list.length==0?"margin1":thumbnail_list.length>1?"margin2":"margin3"}`}>
                            {detail&&detail.comment}
                    </div>

                </Dialog>
            </React.Fragment>
        )
    }
}

export default ReviewDetailModal;

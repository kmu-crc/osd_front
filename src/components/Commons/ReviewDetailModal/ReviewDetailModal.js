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
    min-width:${props => props.width}px;
    min-height:${props => props.height}px;
    max-width:${props => props.width}px;
    max-height:${props => props.height}px;

    margin-right:${props => props.marginRight == null ? 0 : props.marginRight}px;
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
    min-width:${props => props.width}px;
    min-height:${props => props.height}px;
    max-width:${props => props.width}px;
    max-height:${props => props.height}px;
    background-image: url(${props => props.img});
    background-size:cover;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    transform:rotate(${props => props.rotate == null ? 0 : props.rotate}deg);
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
    border-radius: 20px !important;
    opacity: 1;
    padding:30px 50px !important;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 

     .close-box {
        cursor: pointer;
        position:absolute;
        right:50px;
        top:25px;
    }
    .starscore{
        width:100%;
        margin-bottom:10px;
    }
    .basicInfo{
        width:100%;
        display:flex;
        justify-content:space-between;
        margin-bottom:30px;
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
        position:relative;
        .maxContent{
            width:max-content;
        }
        .width100{
            width:100%;
        }
        .pic_list{
            min-width:350px;
            min-height:350px;
            max-height:350px;
            overflow:hidden;
            display:flex;
            scroll-behavior:smooth;
            .btn{
                display:none;
            }   
        }
        .pic{
            min-width:350px;
            min-height:350px;
            max-width:350px;
            max-height:350px;
            background-image: url(${props => props.img});
            background-size:cover;
            border-radius:5px;
            margin-right:20px;
            border:1px solid #efefef;
            
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:${market_style.font.size.small1};
            font-weight:300;   
            line-height:29px;            
        }
        .margin1{
        }
        .margin2{
            margin-top:20px;
        }
        .margin3{
            margin-left:20px;
        }
    }
    
    }

    .buttonBox{
        display:flex;
        justify-content:center;
        margin-top:10px;
        .redBtn{
            color:red;
            text-decoration:underline;
            font-size:${market_style.font.size.small1};
            margin-right:5px;
        }
        .deleteBtn{
            color:#707070;
            text-decoration:underline;
            font-size:${market_style.font.size.small1};
            margin-left:5px;
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
        const thumbnail_list = detail && detail.thumbnail && detail.thumbnail.length > 0 ?
            detail.thumbnail.split(",") : [];
        const RenderStar = () => {
            return <Rating size="tiny" name="score" icon='star' defaultRating={parseInt(this.props && this.props.detail && this.props.detail.score, 10)} maxRating={5} disabled />
        }
        return (
            <React.Fragment>
                <Dialog open={this.props.open} onClose={this.props.close} img={detail && detail.thumbnail_url || noimg}>
                    <div className="close-box" onClick={this.props.close}>
                        <Cross angle={45} color={"#707070"} weight={1} width={20} height={20} />
                    </div>
                    <div className="starscore">
                        <RenderStar />
                    </div>
                    <div className="basicInfo">
                        <div className="left">
                            <div className="nickName">{detail && detail.nick_name}</div>
                            <div>|</div>
                            <div className="productName">{detail && detail.title}</div>
                        </div>
                        <div className="right">
                            <div className="create_time">
                                {
                                    new Date(detail && detail.create_time).getFullYear() + "."
                                    + ((new Date(detail && detail.create_time).getMonth() + 1) < 10 ? '0' + (new Date(detail && detail.create_time).getMonth() + 1) : (new Date(detail && detail.create_time).getMonth() + 1)) + "."
                                    + (new Date(detail && detail.create_time).getDate() < 10 ? '0' + new Date(detail && detail.create_time).getDate() : new Date(detail && detail.create_time).getDate())
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`review-content ${thumbnail_list.length > 1 ? "flex_column" : null}`}>
                        {thumbnail_list.length > 0 ? <div id="pic_list" className={`pic_list ${thumbnail_list.length == 0 ? "width100" : thumbnail_list.length > 1 ? "width100" : "maxContent"}`}>
                            {
                                thumbnail_list.map((item, index) => {
                                    console.log("this.props", item);
                                    return (<AddPic key={index} width={350} height={350} img={item} marginRight={20} />);
                                })
                            }
                            {thumbnail_list.length >= 3 ? <span className="btn"><CustomButton rotate={180} onClick={() => { document.getElementById("pic_list").scrollBy(document.getElementById("pic_list").scrollLeft - 800, 0) }} img={arrow} width={29} height={59} style={{ position: "absolute", left: "0px", top: "160px" }} /></span> : null}
                            {thumbnail_list.length >= 3 ? <span className="btn"><CustomButton onClick={() => { document.getElementById("pic_list").scrollBy(document.getElementById("pic_list").scrollLeft + 400, 0) }} img={arrow} width={29} height={59} style={{ position: "absolute", right: "0px", top: "160px" }} /></span> : null}
                        </div> : thumbnail_list.length == 0 ? null : <AddPic width={378} height={384} img={thumbnail_list[0]} />}
                        <div className={`comment ${thumbnail_list.length == 0 ? "margin1" : thumbnail_list.length > 1 ? "margin2" : "margin3"}`}>
                            {detail && detail.comment}
                        </div>
                    </div>
                    {/* <div className="buttonBox">
                            <div className="redBtn">수정하기</div>
                            <div className="deleteBtn">삭제하기</div>
                    </div> */}
                </Dialog>
            </React.Fragment>
        )
    }
}

export default ReviewDetailModal;

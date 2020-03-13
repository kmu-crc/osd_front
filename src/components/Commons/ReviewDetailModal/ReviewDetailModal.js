import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";

const Dialog = styled(Modal)`
    width: 850px;
    height: 450px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    border-radius: 45px;
    opacity: 1;

    margin-top: 50px !important;
    margin-bottom: 50px !important;

    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 

   .close-box {
        width: max-content;
        cursor: pointer;
        position: relative;
        margin-left: auto;
        margin-right: 10px;
        margin-top: 10px; 
    }

    .review-content {
        padding: 35px;
        display: flex;
        flex-direction: row;

        .img{
            width: 250px;
            height: 250px;
            border-radius: 25px;
            background-repeat: none;
            background-size: cover;
            background-image: url(${props => props.img});
        }
        .text-wrapper{
            width: 530px;
            margin-left: 35px;
            font-family: Noto Sans KR;
            font-size: 26px;
            color: #707070;
            .nickname { }
            .comment { margin-top: 15px; }
            .score { margin-top: 15px; }
        }
    }
`;

class ReviewDetailModal extends Component {
    render() {
        const { detail } = this.props;
        console.log(detail);
        return (
            <Dialog open={this.props.open} onClose={this.props.close} img={detail.m_img || noimg}>
                <div className="close-box" onClick={this.props.close}>
                    <Cross angle={45} color={"#000000"} weight={3} width={33} height={33} />
                </div>
                <div className="review-content">
                    <div className="img"></div>
                    <div className="text-wrapper">
                        <div className="score">{Star(detail.score, 26)}</div>
                        <div className="nickname">{detail.nick_name}</div>
                        <div className="comment">{detail.comment}</div>
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default ReviewDetailModal;

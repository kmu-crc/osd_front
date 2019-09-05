import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import arrow from "source/arrow.svg";
import Cross from "components/Commons/Cross";
import DateFormat from "modules/DateFormat";
import {
    GetDesignBoardRequest, GetCardDetailRequest,
    UpdateCardTitleRequest, UpdateCardContentRequest, UpdateCardImagesRequest, UpdateCardSourcesRequest,
    DeleteDesignCardRequest
} from "redux/modules/design";
import CardSourceDetailContainer from 'containers/Designs/CardSourceDetailContainer';
import CardComment from './CardComment';

const CardDialog = styled(Modal)`
    min-width: 1530px;
    height: max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    opacity: 1;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .content{
        padding: 45px;
        line-height: 17px;
        border: 1px dashed red;
    }
`
class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = { sroll: false };
        // this.moveCard = this.moveCard.bind(this);
    }
    componentDidMount() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }

    onSubmit = () => { }
    onClose = () => { this.props.close() }
    render() {
        console.log("card-data:", this.props)
        const card = this.props.card || { title: "사용자 메뉴얼 디자인 등록 01", userName: "진아진아진아" }
        const movablePrev = this.props.row > 0
        const movableNext = this.props.row < this.props.maxRow - 1
        return (
            <>
                <CardDialog open={this.props.open} onClose={this.onClose}>
                    {movablePrev && <div style={{ width: "115px", height: "813.28px", position: "absolute", left: "0%", marginLeft: "-195px", marginTop: "75.7px", borderRadius: "0px 10px 10px 0px", backgroundColor: "#FFFFFF" }} />}
                    {movablePrev && <div style={{ width: "14px", height: "47px", position: "absolute", left: "0%", marginTop: "409.81px", marginLeft: "-47px", backgroundImage: `url(${arrow})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                    {movableNext && <div style={{ width: "115px", height: "813.28px", position: "absolute", left: "100%", marginLeft: "80px", marginTop: "75.7px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#FFFFFF" }} />}
                    {movableNext && <div style={{ width: "14px", height: "47px", position: "absolute", left: "100%", marginTop: "409.81px", marginLeft: "33px", backgroundImage: `url(${arrow})`, WebkitTransform: "rotate(180deg)", transform: "rotate(180deg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                    <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "-32.07px", marginLeft: "111.85px" }}>
                        <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} />
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", height: "29px", marginLeft: "52px", marginTop: "29.78px" }}>
                            <div style={{ fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px" }}>{card.title}</div>
                            <div style={{ fontFamily: "Noto Sans KR", fontSize: "17px", color: "#707070", fontWeight: "900", lineHeight: "29px", marginRight: "75px" }}>{this.props.editor ? <><i>수정</i></> : ""}</div>
                        </div>
                        {card.first_img &&
                            <div style={{ marginLeft: "52px", marginTop: "29.78px" }}>
                                <div style={{ fontFamily: "Noto Sans KR", fontSize: "16px", color: "#707070", fontWeight: "500" }}>썸네일</div>
                                <div style={{ marginTop: "15px", marginLeft: "25px" }}><img style={{ borderRadius: "15px", width: "250px", height: "250px" }} src={card.first_img.m_img} alt="first-image" /></div>
                            </div>}
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "29px", paddingLeft: "52px", marginTop: "30px" }}>
                            <div style={{ fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "300", lineHeight: "29px" }}>{card.nick_name}</div>
                            <div style={{ fontFamily: "Noto Sans KR", fontSize: "17px", color: "#707070", fontWeight: "300", lineHeight: "29px", marginRight: "75px" }}>업데이트&nbsp;:&nbsp;{DateFormat(card.update_time)}</div>
                        </div>
                        <div style={{ width: "1492px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "30.5px", paddingRight: "25px" }}><div style={{ borderBottom: "1px solid #707070", width: "1400px" }} /></div>
                        <div className="content" >
                            <CardSourceDetailContainer edit={this.props.edit} uid={card.uid} />
                        </div>
                        <div style={{ width: "1492px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "30.5px", paddingRight: "25px" }}><div style={{ borderBottom: "1px solid #707070", width: "1400px" }} /></div>
                        <div style={{ marginLeft: "45px" }}><h3>댓글</h3></div>
                        <div style={{ width: "1400px", border: "1px solid red", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "15px" }}>
                            <CardComment designId={this.props.design_id} cardId={this.props.card.uid} my={this.props.userInfo} />
                        </div>
                        <div style={{ marginTop: "75px" }}></div>
                    </div>
                    {/* </div> */}
                </CardDialog>
                <div style={{ width: "250px", height: "250px", backgroundColor: "white", borderRadius: "15px" }}></div>
            </>)
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.Authentication.status.userInfo,
        token: state.Authentication.status.token,
        detail: state.DesignCard.status.DesignDetailStepCard,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        UpdateCardTitleRequest: (data, token, id) => {
            return dispatch(UpdateCardTitleRequest(data, token, id));
        },
        UpdateCardContentRequest: (data, token, id) => {
            return dispatch(UpdateCardContentRequest(data, token, id));
        },
        UpdateCardImagesRequest: (data, token, id) => {
            return dispatch(UpdateCardImagesRequest(data, token, id));
        },
        UpdateCardSourcesRequest: (data, token, id) => {
            return dispatch(UpdateCardSourcesRequest(data, token, id));
        },
        DeleteDesignCardRequest: (board_id, card_id, token) => {
            return dispatch(DeleteDesignCardRequest(board_id, card_id, token));
        },
        GetDesignBoardRequest: (id) => {
            return dispatch(GetDesignBoardRequest(id));
        },
        GetCardDetailRequest: id => {
            return dispatch(GetCardDetailRequest(id));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardModal));

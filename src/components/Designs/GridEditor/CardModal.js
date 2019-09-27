import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import styled from 'styled-components';
import arrow from "source/arrow.svg";
import Cross from "components/Commons/Cross";
import DateFormat from "modules/DateFormat";
import {
    GetDesignDetailRequest,
    UpdateCardSourceRequest,
    GetDesignBoardRequest, GetCardDetailRequest, UpdateDesignTime,
    UpdateCardTitleRequest, UpdateCardContentRequest, UpdateCardImagesRequest,
    DeleteDesignCardRequest
} from "redux/modules/design";
import CardSourceDetailContainer from 'containers/Designs/CardSourceDetailContainer';
import CardComment from './CardComment';
import { FormThumbnailEx } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";

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
        margin-left: auto;
        line-height: 17px;
    }
    .prevPane {
        width: 115px;
        height: 813.28px;
        position: absolute;
        left: 0%;
        margin-left: -195px;
        margin-top: 75.7px;
        border-radius: 0px 10px 10px 0px;
        background-color: #FFFFFF;
    }
    .prevArrow {
        width: 14px;
        height: 47px;
        position: absolute;
        left: 0%;
        margin-top: 409.81px;
        margin-left: -47px;
        background-image: url(${arrow});
        background-repeat: no-repeat;
        background-size: cover;
    }
    .nextPane {
        width: 115px;
        height: 813.28px;
        position: absolute;
        left: 100%;
        margin-left: 80px;
        margin-top: 75.7px;
        border-radius: 10px 0px 0px 10px;
        background-color: #FFFFFF;
    }
    .nextArrow {
        width: 14px;
        height: 47px;
        position: absolute;
        left: 100%;
        margin-top: 409.81px;
        margin-left: 33px;
        background-image: url(${arrow});
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .close-box {
        position: absolute;
        left: 100%;
        margin-top: -32.07px;
        margin-left: 111.85px;
    }
    .content-wrapper {
        position: relative;
        .card-header-first {
            display: flex;
            justify-content: space-between;
            height: 29px;
            margin-top: 29.78px;
            margin-left: 52px;
            .header-title {
                font-family: Noto Sans KR;
                font-size: 20px;
                color: #707070;
                font-weight: 500;
                line-height: 29px;
            }
            .header-edit-button {
                font-family: Noto Sans KR;
                font-size: 17px;
                color: #707070;
                font-weight: 900;
                line-height: 29px;
                margin-right: 75px;
                .edit-btn {
                    border: none;
                    background: none;
                    width: max-content;
                    height: 40px;
                    line-height: 40px;
                    color: #FF0000;
                    padding-bottom: 1.5px;
                    border-bottom: 1.5px solid #FF0000;
                    font-size: 20px;
                    font-weight: 500;
                    font-family: Noto Sans KR;
                    text-align: left;
                    cursor: pointer;
                }
                .cancel-btn {
                    margin-left: 25px;
                    border: none;
                    background: none;
                    width: max-content;
                    height: 40px;
                    line-height: 40px;
                    color: #707070;
                    padding-bottom: 1.5px;
                    border-bottom: 1.5px solid #707070;
                    font-size: 20px;
                    font-weight: 500;
                    font-family: Noto Sans KR;
                    text-align: left;
                    cursor: pointer;
                }
            }
        }
        .card-header-second {
            width: 100%;
            height: 29px;
            display: flex;
            justify-content: space-between;
            padding-left: 52px;
            margin-top: 30px;
            .nick-name{
                font-size: 20px;
                color: #707070;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;   
            }
            .update-time{
                margin-right: 75px;
                color: #707070;
                font-size: 17px;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;
            }
        }
    }
    .content-border{
        width: 1492px;
        height: 29px;
        font-family: Noto Sans KR;
        font-size: 20px;
        color: #707070;
        font-weight: 500;
        line-height: 29px;
        margin-left: 52px;
        margin-top: 30.5px;
        padding-right: 25px;
        .border-line {
            border-bottom: 1px solid #707070;
            width: 1400px;
        }
    }
    .comment-title {
        margin-left: 45px;
    }
    .comment-wrapper {
        width: 1400px;
        margin-left: 52px;
        margin-top: 15px;
        margin-bottom: 75px;
        color: #707070;
        font-size: 20px;
        font-weight: 500;
        font-family: Noto Sans KR;
        line-height: 29px;
    }
`
const EditCardHeaderContainer = styled.div`
    .edit-header-container {
        display: flex;
        margin-top: 35.5px;
        margin-left: 125.5px;
        .edit-card-info {
            width: max-content;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
    }
    .edit-header-thumbnail {
        display: flex;
        margin-top: 56px;
        margin-left: 200.5px;
        .thumbnail-txt {
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }

    }
    .edit-header-title {
        display: flex;
        margin-top: 75px;
        margin-left: 200.5px;
        .title-txt {
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
        .title-input-container{
            margin-left: 31px;
            width: 505.5px;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
        }
        .title-input-style{
            border-radius: 5px;
            width: 100%;
            border: none;
            background: transparent;
            font-size: 20px;
            font-weight: 500;
            color: #707070;
            height: 100%;
            padding: 16px 23px 16px 23px;
        }
    }
    .edit-header-description{
        display: flex;
        margin-top: 75px;
        margin-left: 200.5px;
        .description-txt{
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
        .description-input-container{
            margin-left: 31px;
            width: 505.5px;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
        }
        .description-input-style{
            border-radius: 5px;
            width: 100%;
            border: none;
            background: transparent;
            font-size: 20px;
            font-weight: 500;
            color: #707070;
            height: 100%;
            padding: 16px 23px 16px 23px;
        }
    }
    .edit-header-button-container{
        padding-left: 1305px;
        .edit-header-submit-button {
            border: none;
            background: none;
            width: max-content;
            height: 40px;
            line-height: 40px;
            color: #FF0000;
            padding-bottom: 1.5px;
            border-bottom: 1.5px solid #FF0000;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            cursor: pointer;
        }
        .edit-header-cancel-button {
            margin-left: 10px;
            border: none;
            background: none;
            width: max-content;
            height: 40px;
            line-height: 40px;
            color: #707070;
            padding-bottom: 1.5px;
            border-bottom: 1.5px solid #707070;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            cursor: pointer;
        }
    }
`;
const BlankSpace = styled.div`
    width: 250px;
    height: 250px;
    background-color: "white";
    borderRadius: 15px
`;
class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = { sroll: false, edit: false, title: "", content: "" }
    }
    onChangeValueThumbnail = async data => {
        let obj = {};
        if (data.target) {
            obj[data.target.name] = data;
            await this.setState(obj);
        }
    }
    onChangeTitle = event => {
        if (event.target) {
            this.setState({ title: event.target.value });
        }
    }
    onChangeContent = event => {
        if (event.target) {
            this.setState({ content: event.target.value });
        }
    }
    handleHeaderSubmit = (event) => {
        event.preventDefault();
        let files = null;
        // new card 
        ValidationGroup(this.state, false)
            .then(data => {
                files = data && data.files;
                console.log("submit:", files, this.state)
                let thumbnail = { img: files && files[0].value, file_name: files && files[0].name };
                const pack = { title: this.state.title, thumbnail: thumbnail, content: this.state.content, data: { deleteContent: [], newContent: [], updateContent: [] } };
                console.log("pack:", pack, this.props.card);//return;
                this.props.UpdateCardSourceRequest(pack, this.props.card.uid, this.props.token)
                    .then(() => { this.props.UpdateDesignTime(this.props.designId, this.props.token) })
                    .then(() => { this.props.GetDesignDetailRequest(this.props.designId, this.props.token) })
                    .then(() => { this.props.GetDesignBoardRequest(this.props.designId) })
                    .then(() => { this.onClose() })
                    .catch(err => alert(err + ''));
            }).catch(err => alert(err + ''));
        this.setState({ edit: !this.state.edit })
    }
    componentDidMount() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
    onCloseEditMode = () => { this.setState({ edit: false }) };
    onChangeEditMode = () => { this.setState({ edit: this.state.edit }) };
    removeCard = e => {
        e.stopPropagation();
        const confirm = window.confirm("컨텐츠를 삭제하시겠습니까?");
        if (confirm) {
            this.props.DeleteDesignCardRequest(this.props.boardId, this.props.card.uid, this.props.token)
                .then(async () => {
                    await this.setState({ edit: false });
                    this.props.GetDesignBoardRequest(this.props.designId);
                    this.onClose();
                });
        }
    };
    onClose = () => { this.props.close() }
    render() {

        console.log("this.props.cardmodal", this.props);
        const imgURL = this.props.card && this.props.card.first_img == null ? null : this.props.card.first_img.s_img;

        const card = this.props.card || { title: "사용자 메뉴얼 디자인 등록 01", userName: "진아진아진아" }
        const { isTeam, edit } = this.props;
        const movablePrev = this.props.row > 0
        const movableNext = this.props.row < this.props.maxRow - 1
        return (
            <React.Fragment>
                <CardDialog open={this.props.open} onClose={this.onClose}>
                    {movablePrev && <div className="prevPane" />}
                    {movablePrev && <div className="prevArrow"></div>}
                    {movableNext && <div className="nextPane" />}
                    {movableNext && <div className="nextArrow"></div>}

                    <div className="close-box" onClick={this.onClose} >
                        <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} /></div>

                    <div className="content-wrapper" >
                        {this.state.edit === false
                            ? <React.Fragment>
                                <div className="card-header-first">
                                    <div className="header-title">{card.title}</div>
                                    <div className="header-edit-button" >
                                        {this.props.edit ?
                                            <React.Fragment>
                                                <button className="edit-btn" onClick={() => this.setState({ edit: !this.state.edit, title: card.title, content: card.content })} >수정</button>
                                                <button className="cancel-btn" onClick={(event) => this.removeCard(event)} >삭제</button>
                                            </React.Fragment> : undefined}
                                    </div>
                                </div>
                                <div className="card-header-second" >
                                    <div className="nick-name">{card.nick_name}</div>
                                    <div className="update-time">업데이트&nbsp;:&nbsp;{DateFormat(card.update_time)}</div>
                                </div>
                            </React.Fragment>
                            : <EditCardHeaderContainer>
                                <div className="edit-header-container">
                                    <div className="edit-card-info">카드정보 수정</div>
                                </div>
                                <div className="edit-header-thumbnail">
                                    <div className="thumbnail-txt">썸네일 사진</div>
                                    <FormThumbnailEx style={{ width: "210px", height: "210px", marginLeft: "30px", borderRadius: "10px", backgroundColor: "#EFEFEF" }}
                                        name="thumbnail" image={imgURL} placeholder="썸네일 등록" getValue={this.onChangeValueThumbnail} validates={["OnlyImages", "MaxFileSize(10000000)"]} />
                                </div>
                                <div className="edit-header-title">
                                    <div className="title-txt">컨텐츠 제목</div>
                                    <div className="title-input-container">
                                        <input className="title-input-style" name="title" onChange={this.onChangeTitle} value={this.state.title} maxLength="20" placeholder="제목을 입력해주세요." />
                                    </div>
                                </div>
                                <div className="edit-header-description">
                                    <div className="description-txt">컨텐츠 설명</div>
                                    <div className="description-input-container">
                                        <input className="description-input-style" name="content" onChange={this.onChangeContent} value={this.state.content} maxLength="20" placeholder="제목을 입력해주세요." />
                                    </div>
                                </div>
                                <div className="edit-header-button-container">
                                    <button className="edit-header-submit-button" onClick={this.handleHeaderSubmit} >적용하기</button>
                                    <button className="edit-header-cancel-button" onClick={() => this.setState({ edit: !this.state.edit })}>취소</button>
                                </div>
                            </EditCardHeaderContainer>}

                        <div className="content-border"><div className="border-line" /></div>
                        <div className="content" >
                            <CardSourceDetailContainer uid={card.uid} isTeam={isTeam} edit={edit && this.state.edit}
                                isCancel closeEdit={this.onCloseEditMode} openEdit={this.onChangeEditMode} />
                        </div>

                        <div className="content-border"><div className="border-line" /></div>
                        <div className="comment-title"><h3>댓글</h3></div>
                        <div className="comment-wrapper">
                            <CardComment designId={this.props.design_id} cardId={this.props.card.uid} my={this.props.userInfo} />
                        </div>
                    </div>
                    {/* </div> */}
                </CardDialog>
                <BlankSpace />
            </React.Fragment>)
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
        UpdateCardSourceRequest: (data, card_id, token) => {
            return dispatch(UpdateCardSourceRequest(data, card_id, token));
        },
        UpdateCardTitleRequest: (data, token, id) => {
            return dispatch(UpdateCardTitleRequest(data, token, id));
        },
        UpdateCardContentRequest: (data, token, id) => {
            return dispatch(UpdateCardContentRequest(data, token, id));
        },
        UpdateCardImagesRequest: (data, token, id) => {
            return dispatch(UpdateCardImagesRequest(data, token, id));
        },
        DeleteDesignCardRequest: (board_id, card_id, token) => {
            return dispatch(DeleteDesignCardRequest(board_id, card_id, token));
        },
        GetDesignBoardRequest: (id) => {
            return dispatch(GetDesignBoardRequest(id));
        },
        GetCardDetailRequest: id => {
            return dispatch(GetCardDetailRequest(id));
        },
        UpdateDesignTime: (id) => {
            return dispatch(UpdateDesignTime(id));
        },
        GetDesignDetailRequest: (id, token) => {
            return dispatch(GetDesignDetailRequest(id, token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);

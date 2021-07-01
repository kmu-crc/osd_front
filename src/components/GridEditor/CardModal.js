import React, { Component } from 'react';
import { connect } from "react-redux";

import { GetDesignDetailRequest, } from "actions/Design";
import {
    UpdateCardImagesRequest, UpdateCardContentRequest, UpdateCardTitleRequest,
    GetCardDetailRequest
} from "actions/Designs/DesignCard";
import { GetDesignBoardRequest, } from "actions/Designs/DesignBoard";
import { UpdateDesignTime } from "actions/Designs/UpdateDesign";
import { UpdateCardSourceRequest, DeleteItemCardRequest } from "actions/Item";

import CardSourceDetailContainer from 'containers/Items/CardSourceDetailContainer';

import DateFormat from "modules/DateFormat";
import Cross from "components/Commons/Cross";
import { FormThumbnailEx } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
import Loading from "components/Commons/Loading";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import { Icon } from 'semantic-ui-react'

import { EditCardHeaderContainer, CardDialog, ContentBorder,/*CommentWrapper,*/ } from "./style";

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = { sroll: false, edit: false, isEditing: false, title: "", description: "", content: [], modifyresult: false, private: false }
        this.handlerModifyContent = this.handlerModifyContent.bind(this);
    };
    handlerModifyContent() {
        this.setState({ modifyresult: true });
    }
    componentDidMount() {
        const { card } = this.props;
        this.setState({ thumbnail: card.thumbnail, title: card.title, description: card.description, private: card.private == true ? true : false });
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.card !== this.props.card) {
            // await alert("card");
            return true
        }
    }
    onChangeValueThumbnail = async data => {
        let obj = {}
        if (data.target) {
            obj[data.target.name] = data
            await this.setState(obj)
        }
    }

    onChangeTitle = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onChangeDescription = event => {
        if (event.target) {
            this.setState({ description: event.target.value })
        }
    }

    handleHeaderSubmit = passingContent => {
        let files = null
        ValidationGroup(this.state, false)
            .then(async data => {

                files = data && data.files;
                // let thumbnail = { img: files && files[0].value, file_name: files && files[0].name };
                const pack = {
                    private: this.state.private,
                    title: this.state.title,
                    // thumbnail: files && thumbnail, 
                    files: files,
                    description: this.state.description,
                    data: {
                        deleteContent: passingContent.deleteContent || [],
                        newContent: passingContent.newContent || [],
                        updateContent: passingContent.updateContent || []
                    }
                };

                await this.props.UpdateCardSourceRequest(pack, this.props.card.uid, this.props.token)
                    .then(this.props.GetItemStepsRequest(this.props.itemId, this.props.token))
                    .catch(async err => await alert(err + '와 같은 이유로 카드수정에 실패하셨습니다. 관리자에게 문의해주시기 바랍니다.'));
                this.onClose();
            }).catch(async err => await alert(err + '와 같은 이유로 카드수정에 실패하셨습니다. 관리자에게 문의해주시기 바랍니다.'));
        this.setState({ edit: !this.state.edit })
    };
    onOnlyCloseEditMode = async () => {
        this.setState({ edit: false });
    }
    onCloseEditMode = async () => {
        if (this.props.card.title == this.state.title &&
            this.props.card.description == this.state.description &&
            this.props.card.thumbnail == this.state.thumbnail &&
            this.state.modifyresult == false) {
            this.setState({ edit: false });
        } else if (await confirm("수정된 사항이 저장되지 않습니다. 계속 하시겠습니까?")) {
            this.setState({ edit: false });
        }
    };
    onChangeEditMode = () => {
        this.setState({ edit: this.state.edit })
    };
    removeCard = async e => {
        e.stopPropagation();
        if (await confirm("컨텐츠를 삭제하시겠습니까?")) {
            this.props.DeleteItemCardRequest(this.props.itemId, this.props.card.uid, this.props.token)
                .then(res => {
                    if (res.success) {
                        this.props.GetItemStepsRequest(this.props.itemId, this.props.token);
                        this.setState({ edit: false });
                        this.onClose();
                    }
                })
                .catch(async err => await alert(err))
        }
    };
    onClose = async (event) => {
        // 예외
        if (this.props.card.title == this.state.title &&
            this.props.card.description == this.state.description &&
            this.props.card.thumbnail == this.state.thumbnail &&
            this.state.modifyresult == false) {
            await this.setState({ sroll: false, edit: false, title: "", content: "" });
            this.props.close();
            return;
        } else if (this.state.edit && !await confirm("수정된 사항이 저장되지 않습니다. 계속 하시겠습니까?")) {
            return;
        }
        await this.setState({ sroll: false, edit: false, title: "", content: "" });
        this.props.close();
    };
    render() {
        const { card } = this.props;

        return (
            card
                ? <CardDialog open={this.props.open} onClose={this.onClose}>

                    {this.state.loading && <Loading />}

                    <div className="content-wrapper" >
                        {this.state.edit
                            ? <EditCardHeaderContainer>
                                <div className="edit-header-container">
                                    <div className="edit-card-info">
                                        <div onClick={() => { this.setState({ private: !this.state.private }) }}
                                            className={`icon_style ${this.state.private == true ? "borderRed" : "borderGrey"}`}>
                                            <Icon size='mini' name={`${this.state.private == true ? "lock" : "lock open"}`} color={`${this.state.private == true ? "red" : "grey"}`} />
                                        </div>컨텐츠 정보수정
                                    </div>
                                    <div onClick={this.onClose} className="close_">
                                        <Cross angle={45} color={"#000000"} weight={1} width={14} height={14} />
                                    </div>
                                </div>
                                <div className="hrline" />
                                <div className="edit-header-thumbnail">
                                    <div className="thumbnail-txt">이미지</div>
                                    <FormThumbnailEx style={{ marginBottom: "0px", width: "200px", height: "200px", borderRadius: "10px", backgroundColor: "#EFEFEF" }}
                                        name="thumbnail" image={this.state.thumbnail} placeholder="썸네일 등록" getValue={this.onChangeValueThumbnail} validates={["OnlyImages", "MaxFileSize(10000000)"]} />
                                </div>
                                <div className="edit-header-title">
                                    <div className="title-txt">제목</div>
                                    <input className="title-input-style" name="title" onChange={this.onChangeTitle} value={this.state.title} maxLength="20" placeholder="제목을 입력해주세요." />
                                </div>
                                <div className="edit-header-description marginBottom">
                                    <div className="description-txt">설명</div>
                                    <input className="description-input-style" name="description" onChange={this.onChangeDescription} value={this.state.description} maxLength="1000" placeholder="설명을 입력해주세요." />
                                </div>
                            </EditCardHeaderContainer>
                            :
                            <div className="card-header-first">
                                <div className="header-title">{card.title}</div>
                                <div className="header-update">
                                    <div className="update_">(업데이트&nbsp;:&nbsp;{DateFormat(card.update_time)})</div>
                                    <div onClick={this.onClose} className="close_">
                                        <Cross angle={45} color={"#000000"} weight={1} width={14} height={14} />
                                    </div>
                                </div>
                            </div>}

                        <ContentBorder />

                        <div className="content">
                            <CardSourceDetailContainer
                                bought={this.props.bought}
                                isTeam={this.props.isTeam}
                                submit={this.handleHeaderSubmit}
                                handleCancel={this.onCloseEditMode}
                                handleCloseEdit={this.onOnlyCloseEditMode}
                                edit={this.state.edit}
                                card={card}
                                cardId={card.uid}
                                closeEdit={this.onCloseEditMode}
                                openEdit={this.onChangeEditMode}
                                handlerModifyContent={this.handlerModifyContent}
                                isCancel
                                mode="project"
                                isModify={
                                    (this.props.card.private == this.state.private &&
                                        this.props.card.title == this.state.title &&
                                        this.props.card.description == this.state.description &&
                                        this.props.card.thumbnail == this.state.thumbnail &&
                                        this.state.modifyresult == false)}
                            />
                        </div>
                        {/* edit:{String(this.props.edit)}<br />
                            isEditing:{String(this.state.isEditing)} */}
                        {this.props.edit && this.state.isEditing == false ?
                            <div className="modifyRgn">
                                <div className="redBtn" onClick={() => this.setState({ edit: !this.state.edit, isEditing: !this.state.isEditing, title: card.title, content: card.content })}>수정하기</div>
                                <div className="greyBtn" onClick={(event) => this.removeCard(event)}>삭제하기</div>
                            </div>
                            :
                            null}
                    </div>
                </CardDialog>

                : <div>{card}loading</div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    detail: state.ItemContent.status.ItemContent,
})

const mapDispatchToProps = dispatch => ({
    // GetItemStepsRequest: (id, token) => dispatch(GetItemStepsRequest(id, token)),
    DeleteItemCardRequest: (board_id, card_id, token) => dispatch(DeleteItemCardRequest(board_id, card_id, token)),
    UpdateCardSourceRequest: (data, card_id, token) => dispatch(UpdateCardSourceRequest(data, card_id, token)),
    UpdateCardTitleRequest: (data, token, id) => dispatch(UpdateCardTitleRequest(data, token, id)),
    UpdateCardContentRequest: (data, token, id) => dispatch(UpdateCardContentRequest(data, token, id)),
    UpdateCardImagesRequest: (data, token, id) => dispatch(UpdateCardImagesRequest(data, token, id)),
    GetDesignDetailRequest: (id, token) => dispatch(GetDesignDetailRequest(id, token)),
    UpdateDesignTime: (id, token) => dispatch(UpdateDesignTime(id, token)),
    GetCardDetailRequest: id => dispatch(GetCardDetailRequest(id)),
    GetDesignBoardRequest: (id) => dispatch(GetDesignBoardRequest(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);

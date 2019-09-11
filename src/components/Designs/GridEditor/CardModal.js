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
import { FormInput } from "components/Commons/FormItem";
import { FormControl, ValidationGroup } from "modules/FormControl";

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
    }
`
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
        const card = this.props.card || { title: "사용자 메뉴얼 디자인 등록 01", userName: "진아진아진아" }
        const { isTeam, edit } = this.props;
        const movablePrev = this.props.row > 0
        const movableNext = this.props.row < this.props.maxRow - 1
        return (
            <React.Fragment>
                <CardDialog open={this.props.open} onClose={this.onClose}>
                    {movablePrev && <div style={{ width: "115px", height: "813.28px", position: "absolute", left: "0%", marginLeft: "-195px", marginTop: "75.7px", borderRadius: "0px 10px 10px 0px", backgroundColor: "#FFFFFF" }} />}
                    {movablePrev && <div style={{ width: "14px", height: "47px", position: "absolute", left: "0%", marginTop: "409.81px", marginLeft: "-47px", backgroundImage: `url(${arrow})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                    {movableNext && <div style={{ width: "115px", height: "813.28px", position: "absolute", left: "100%", marginLeft: "80px", marginTop: "75.7px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#FFFFFF" }} />}
                    {movableNext && <div style={{ width: "14px", height: "47px", position: "absolute", left: "100%", marginTop: "409.81px", marginLeft: "33px", backgroundImage: `url(${arrow})`, WebkitTransform: "rotate(180deg)", transform: "rotate(180deg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                    <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "-32.07px", marginLeft: "111.85px" }}>
                        <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} />
                    </div>
                    <div style={{ position: "relative" }}>
                        {this.state.edit === false
                            ? <React.Fragment>
                                <div style={{ display: "flex", justifyContent: "space-between", height: "29px", marginLeft: "52px", marginTop: "29.78px" }}>
                                    <div style={{ fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px" }}>{card.title}</div>
                                    <div style={{ fontFamily: "Noto Sans KR", fontSize: "17px", color: "#707070", fontWeight: "900", lineHeight: "29px", marginRight: "75px" }}>
                                        {this.props.edit ?
                                            <React.Fragment>
                                                <button onClick={() => this.setState({ edit: !this.state.edit, title: card.title, content: card.content })} style={{ border: "none", background: "none", width: "max-content", height: "40px", lineHeight: "40px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>수정</button>
                                                <button onClick={(event) => this.removeCard(event)} style={{ marginLeft: "25px", border: "none", background: "none", width: "max-content", height: "40px", lineHeight: "40px", color: "#707070", paddingBottom: "1.5px", borderBottom: "1.5px solid #707070", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>삭제</button>
                                            </React.Fragment> : undefined}
                                    </div>
                                </div>
                                {card.content &&
                                    <div style={{ display: "flex", justifyContent: "flex-start", height: "29px", marginLeft: "52px", marginTop: "29.78px" }}>
                                        <div style={{ fontFamily: "Noto Sans KR", fontSize: "16px", color: "#707070", fontWeight: "500" }}>설명</div>
                                        <div style={{ marginLeft: "25px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px" }}>{card.content}</div>
                                    </div>}
                                {card.first_img &&
                                    <div style={{ marginLeft: "52px", marginTop: "29.78px" }}>
                                        <div style={{ fontFamily: "Noto Sans KR", fontSize: "16px", color: "#707070", fontWeight: "500" }}>썸네일</div>
                                        <div style={{ marginTop: "15px", marginLeft: "25px" }}><img style={{ borderRadius: "15px", width: "200px", height: "200px" }} src={card.first_img.m_img} alt="first-image" /></div>
                                    </div>}
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "29px", paddingLeft: "52px", marginTop: "30px" }}>
                                    <div style={{ fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "300", lineHeight: "29px" }}>{card.nick_name}</div>
                                    <div style={{ fontFamily: "Noto Sans KR", fontSize: "17px", color: "#707070", fontWeight: "300", lineHeight: "29px", marginRight: "75px" }}>업데이트&nbsp;:&nbsp;{DateFormat(card.update_time)}</div>
                                </div>
                            </React.Fragment>
                            : <React.Fragment>
                                <div style={{ display: "flex", marginTop: "35.5px", marginLeft: "125.5px" }}><div style={{ width: "max-content", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>카드정보 수정</div></div>
                                <div style={{ display: "flex", marginTop: "56px", marginLeft: "200.5px" }}>
                                    <div style={{ width: "97px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>썸네일 사진</div>
                                    <div></div>
                                    <FormThumbnailEx
                                        name="thumbnail"
                                        style={{ marginLeft: "30px", width: "210px", height: "210px", backgroundColor: "#EFEFEF", borderRadius: "10px" }}
                                        placeholder="썸네일 등록" getValue={this.onChangeValueThumbnail} validates={["OnlyImages", "MaxFileSize(10000000)"]}
                                    />
                                </div>
                                <div style={{ display: "flex", marginTop: "75px", marginLeft: "200.5px" }}>
                                    <div style={{ width: "97px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>
                                        컨텐츠 제목
                    </div>
                                    <div style={{ marginLeft: "31px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", }}>
                                        <input name="title" onChange={this.onChangeTitle} value={this.state.title} style={{ borderRadius: "5px", width: "100%", border: "none", background: "transparent", fontSize: "20px", fontWeight: "500", color: "#707070", height: "100%", padding: "16px 23px 16px 23px" }} name="title" maxLength="20" placeholder="제목을 입력해주세요." />
                                    </div>
                                </div>
                                <div style={{ display: "flex", marginTop: "75px", marginLeft: "200.5px" }}>
                                    <div style={{ width: "97px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>
                                        컨텐츠 설명
                    </div>
                                    <div style={{ marginLeft: "31px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", }}>
                                        <input name="content" onChange={this.onChangeContent} value={this.state.content} style={{ borderRadius: "5px", width: "100%", border: "none", background: "transparent", fontSize: "20px", fontWeight: "500", color: "#707070", height: "100%", padding: "16px 23px 16px 23px" }} name="title" maxLength="20" placeholder="제목을 입력해주세요." />
                                    </div>
                                </div>
                                <div style={{ marginLeft: "auto", marginRight: "75pd" }}>
                                    <button onClick={this.handleHeaderSubmit} style={{ border: "none", background: "none", width: "max-content", height: "40px", lineHeight: "40px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>적용하기</button>
                                    <button onClick={() => this.setState({ edit: !this.state.edit })} style={{ border: "none", background: "none", width: "max-content", height: "40px", lineHeight: "40px", color: "#707070", paddingBottom: "1.5px", borderBottom: "1.5px solid #707070", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>취소</button>
                                </div>
                            </React.Fragment>}

                        <div style={{ width: "1492px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "30.5px", paddingRight: "25px" }}><div style={{ borderBottom: "1px solid #707070", width: "1400px" }} /></div>
                        <div style={{ marginLeft: "auto" }} className="content" >
                            <CardSourceDetailContainer uid={card.uid} isTeam={isTeam} edit={edit && this.state.edit}
                                isCancel closeEdit={this.onCloseEditMode} openEdit={this.onChangeEditMode} />
                        </div>
                        <div style={{ width: "1492px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "30.5px", paddingRight: "25px" }}><div style={{ borderBottom: "1px solid #707070", width: "1400px" }} /></div>
                        <div style={{ marginLeft: "45px" }}><h3>댓글</h3></div>
                        <div style={{ width: "1400px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "15px" }}>
                            <CardComment designId={this.props.design_id} cardId={this.props.card.uid} my={this.props.userInfo} />
                        </div>
                        <div style={{ marginTop: "75px" }}></div>
                    </div>
                    {/* </div> */}
                </CardDialog>
                <div style={{ width: "250px", height: "250px", backgroundColor: "white", borderRadius: "15px" }}></div>
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

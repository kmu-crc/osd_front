import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { UpdateDesignSourceRequest, UpdateCardSourceRequest, CreateDesignCardRequest, GetDesignBoardRequest, GetDesignDetailRequest, UpdateDesignTime } from "redux/modules/design";
import { ValidationGroup } from "modules/FormControl";
import { FormThumbnailExMobile as FormThumbnailEx } from "components/Commons/FormItems";
import { CardSourceDetailMobile as CardSourceDetail } from "components/Designs/CardSourceDetail";
import Loading from "components/Commons/Loading";
import Cross from "components/Commons/Cross";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";

const NewCardDialogWrapper = styled(Modal)`
    margin-top: 50px !important;
    margin-bottom: 66px !important;
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
    .content {
        padding: 0px 25px;
        margin-left: auto;
        line-height: 17px;
        .title {
            font-family: Noto Sans KR;
            font-size: 20px;
            color: #707070;
            font-weight: 500;
            line-height: 29px;
            margin-bottom:16px;
        }
    }
    .close-box {
        width: max-content;
        cursor: pointer;
        position: relative;
        margin-left: auto;
        margin-right: 10px;
        margin-top: 10px;
    }
    .content-wrapper {
        position: relative;
        .card-header-first {
            display: flex;  
            justify-content: space-between;
            height: 29px;
            margin-top: 30px;
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
            div{ border:1px solid red; };
            border: 1px solid red;
            height: 29px;
            display: flex;
            justify-content: flex-start;//space-between;
            padding-left: 52px;
            margin-top: 30px;
            .contents {
                font-size: 20px;
                color: #707070;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;   
            }
            .nick-name {
                width: max-content;
                margin-left: auto;
                margin-right: 5px;
                font-size: 20px;
                color: #707070;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;   
            }
            .update-time {
                width: max-content;
                margin-right: 75px;
                color: #707070;
                font-size: 17px;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;
            }
        }
    }
`;
const ContentBorder = styled.div`
    height: 21px;
    font-family: Noto Sans KR;
    font-size: 20px;
    color: #707070;
    font-weight: 500;
    line-height: 29px;
    margin-left: 50px;
    margin-top: 30px;
    padding-right: 25px;
    .border-line {
        border-bottom: 1px solid #707070;
    }
`;
const EditCardHeaderContainer = styled.div`
    .edit-header-container {
        display: flex;
        margin-top: 15px;
        margin-left: 5px;
        .edit-card-info {
            width: max-content;
            height: 29px;
            font-size: 20px;
            font-weight: 700;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
    }
    .subtitle-txt{
            width: max-content;
            height: 22px;
            font-size: 15px;
            font-weight: 700;
            font-family: Noto Sans KR;
            text-align: right;
            color: #707070;   
    }
    .edit-header-thumbnail {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        margin-left: 15px;
    }
    .txt {
        padding-left: 15px;
        margin-bottom: 5px;
        width: 100%;
        height: 22px;
        font-size: 17px;
        font-weight: 700;
        font-family: Noto Sans KR;
        text-align: left;
        color: #707070;   
    }
    .edit-header-title {
        width: ${window.innerWidth - 35}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;

        .title-input-container{
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
            padding: 5px 15px;
        }
    }
    .edit-header-description {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 26px;
        .description-input-container {
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
        }
        .description-input-style {
            border-radius: 5px;
            width: 100%;
            border: none;
            background: transparent;
            font-size: 20px;
            font-weight: 500;
            color: #707070;
            height: 100%;
            padding: 5px 15px;
        }
    }
    .edit-header-button-container {
        width: max-content;
        margin-left: auto;
        margin-right: 25px;
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
    .private-box-toggle {
        min-width:150px;
        position: absolute;
        top: 0px;
        right: 0px;
        width: max-content;
        display:flex;
        jusitfy-content:flex-start;
        align-items:center;
        .icon-wrapper {
            min-width:50px;
            min-height:50px;
            max-width:50px;
            max-height:50px;
            border-radius: 50%;
            background-color: #707070;
            display:flex;
            justify-content:center;
            align-items:center;
            margin-right:10px;
            &.lock {
                background-color: #FF0000;
            }
            &.unlock {
                background-color: #707070;
            }
            i {
                color: white;
            }
        }
    }
`;


class NewCardModal extends Component {
    state = {
        loading: false, scroll: false, edit: false, title: "", content: "", hook: false,
        card_content: { deleteContent: [], newContent: [], updateContent: [] },
        closed: false, isEdited: false,
        private: false,
    };
    onClose = async () => {
        if (this.state.isEdited || this.state.title !== "" || this.state.content !== "") {
            if (!await confirm("작성한 내용이 저장되지 않습니다. 창을 닫으시겠습니까?", "예", "아니오")) {
                return;
            }
        }
        this.props.close();
    };
    handleUpdate = (obj) => {
        const modified = JSON.stringify(obj.content) !== JSON.stringify(obj.origin);
        this.setState({ isEdited: modified });
    };
    onChangeValueThumbnail = async data => {
        let obj = {};
        if (data.target) {
            obj[data.target.name] = data;
            await this.setState(obj);
        }
    };
    onChangeTitle = event => {
        if (event.target) {
            this.setState({ title: event.target.value });
        }
    };
    onChangeContent = event => {
        if (event.target) {
            this.setState({ content: event.target.value });
        }
    };
    handleResetHook = async () => {
        await this.setState({ hook: false });
    };
    submit = async (obj) => {

        let files = null;
        if (!this.state.title || this.state.title === "") {
            await alert("컨텐츠의 제목을 입력하세요.", "확인");
            return;
        }
        // new card
        await ValidationGroup(this.state, false)
            .then(async data => {
                files = await data && data.files;
                await this.props.CreateDesignCardRequest({ title: this.state.title }, this.props.designId, this.props.boardId, this.props.token)
                    .then(async (res) => {
                        if (res.success) {
                            // and get new card id
                            // directly update contents stored tempolarly
                            const card_id = res.card;
                            let thumbnail = files ? { img: files && files[0].value, file_name: files && files[0].name } : null;

                            this.props.UpdateCardSourceRequest({
                                title: this.state.title, thumbnail: thumbnail, content: this.state.content, private: this.state.private,
                                data: { deleteContent: [], newContent: obj.newContent, updateContent: [] }
                            }, card_id, this.props.token)
                                .then(() => { this.props.UpdateDesignTime(this.props.designId, this.props.token) })
                                .then(() => { this.props.GetDesignDetailRequest(this.props.designId, this.props.token) })
                                .then(() => { this.props.GetDesignBoardRequest(this.props.designId) })
                                .then(async () => {
                                    await this.setState({ loading: false });
                                })
                                .catch(err => alert(err + '와 같은 이유로 작업을 완료할 수 없습니다.'));
                        } else {
                            await alert("새로운 카드를 추가하는데 실패했습니다. 잠시후 다시 시도해주세요.", "확인");
                        }
                    });
            });
        this.props.close();
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.state.title) {
            await alert("컨텐츠의 제목을 입력하세요.", "확인");
            return;
        }
        await this.setState({ loading: true, hook: true });
    };
    render() {
        const { hook } = this.state;
        return (<React.Fragment>
            <NewCardDialogWrapper open={this.props.open} onClose={this.onClose}>
                <div className="close-box"
                    onClick={this.onClose} >
                    <Cross angle={45} color={"#000000"} weight={3} width={33} height={33} />
                </div>
                {this.state.loading && <Loading />}

                <div className="content-wrapper">
                    <EditCardHeaderContainer>
                        <div className="private-box-toggle" >
                            <div className={`icon-wrapper ${this.state.private ? "lock" : "unlock"}`} onClick={() => this.setState({ private: !this.state.private })}>
                                {this.state.private
                                    ? <i className="lock big icon" />
                                    : <i className="unlock big icon" />}
                                {/* {card.private !== 1 ? */}
                                {/* } */}
                            </div>
                            <div>
                                {this.state.private ? "비공개" : "공개"}
                            </div>
                        </div>


                        <div className="edit-header-container">
                            <div className="edit-card-info">새 컨텐츠</div>
                        </div>
                        <div className="edit-header-thumbnail">
                            <div className="subtitle-txt">썸네일</div>
                            <FormThumbnailEx
                                name="thumbnail"
                                placeholder="썸네일 등록"
                                getValue={this.onChangeValueThumbnail}
                                validates={["OnlyImages", "MaxFileSize(10000000)"]}
                                style={{
                                    width: "156px",
                                    height: "156px",
                                    backgroundColor: "#EFEFEF",
                                    borderRadius: "10px"
                                }} />
                        </div>
                        <div className="edit-header-title">
                            <div className="txt">제목</div>
                            <div className="title-input-container">
                                <input className="title-input-style" name="title" onChange={this.onChangeTitle} maxLength="20" placeholder="제목을 입력해주세요." />
                            </div>
                        </div>
                        <div className="edit-header-description">
                            <div className="txt">설명</div>
                            <div className="description-input-container">
                                <input className="description-input-style" name="content" onChange={this.onChangeContent} maxLength="1000" placeholder="설명을 입력해주세요." />
                            </div>
                        </div>
                    </EditCardHeaderContainer>

                    <ContentBorder>
                        <div className="border-line" />
                    </ContentBorder>

                    <div className="content" >
                        <div className="title">내용</div>
                        <CardSourceDetail
                            {...this.props}
                            uid={"new"}
                            isTeam={true}
                            edit={true}
                            handleUpdate={this.handleUpdate}
                            closed={this.state.closed}
                            handleClosed={this.handleClosed}
                            handleCancel={this.onClose}//this.handleCancel}
                            closeEdit={this.onCloseEditMode}
                            openEdit={this.onChangeEditMode}
                            hook={hook}
                            handleResetHook={this.handleResetHook}
                            upDateRequest={this.submit} />
                    </div>
                </div>
            </NewCardDialogWrapper>
        </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Authentication.status.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        CreateDesignCardRequest: (data, design_id, board_id, token) => {
            return dispatch(CreateDesignCardRequest(data, design_id, board_id, token));
        },
        GetDesignBoardRequest: (id) => {
            return dispatch(GetDesignBoardRequest(id));
        },
        GetDesignDetailRequest: (id, token) => {
            return dispatch(GetDesignDetailRequest(id, token));
        },
        UpdateCardSourceRequest: (data, card_id, token) => {
            return dispatch(UpdateCardSourceRequest(data, card_id, token));
        },
        UpdateDesignSourceRequest: (data, card_id, token) => {
            return dispatch(UpdateDesignSourceRequest(data, card_id, token));
        },
        UpdateDesignTime: (id) => {
            return dispatch(UpdateDesignTime(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardModal);

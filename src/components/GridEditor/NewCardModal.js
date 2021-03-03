import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'semantic-ui-react'
import { connect } from "react-redux";

import { GetDesignDetailRequest } from "actions/Design";
import { GetDesignBoardRequest, } from "actions/Designs/DesignBoard";

import { CreateItemCardRequest, UpdateCardSourceRequest, GetItemStepsRequest } from "actions/Item";

import { ValidationGroup } from "modules/FormControl";
import { FormThumbnailEx } from "components/Commons/FormItems";
// import CardSourceDetailContainer from 'containers/Items/CardSourceDetailContainer';
import CardSourceDetail from "components/Items/ItemDetail/CardSourceDetail";
import Loading from "components/Commons/Loading";
import Cross from "components/Commons/Cross";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const NewCardDialogWrapper = styled(Modal)`
    margin-top: 50px !important;
    margin-bottom: 50px !important;
    height: max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    opacity: 1;
    min-width:85%;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .content {
        padding: 45px;
        margin-left: auto;
        line-height: 17px;
        .title {
            font-family: Noto Sans KR;
            font-size:${market_style.font.size.normal3};
            color: #707070;
            font-weight: 500;
            line-height: 29px;
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
                font-size:${market_style.font.size.normal3};
                color: #707070;
                font-weight: 500;
                line-height: 29px;
            }
            .header-edit-button {
                font-family: Noto Sans KR;
                font-size:${market_style.font.size.small3};
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
                    font-size:${market_style.font.size.normal3};
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
                    font-size:${market_style.font.size.normal3};
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
                font-size:${market_style.font.size.normal3};
                color: #707070;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;   
            }
            .nick-name {
                width: max-content;
                margin-left: auto;
                margin-right: 5px;
                font-size:${market_style.font.size.normal3};
                color: #707070;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;   
            }
            .update-time {
                width: max-content;
                margin-right: 75px;
                color: #707070;
                font-size:${market_style.font.size.small3};
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;
            }
        }
    }
`;
const ContentBorder = styled.div`
    height: 29px;
    font-family: Noto Sans KR;
    font-size:${market_style.font.size.normal3};
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
        margin-left: 45px;
        .edit-card-info {
            width: max-content;
            height: 29px;
            font-size:${market_style.font.size.normal3};
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
    }
    .edit-header-thumbnail {
        display: flex;
        margin-top: 25px;
        margin-left: 65px;
        .thumbnail-txt {
            width: max-content;
            height: 29px;
            font-size:${market_style.font.size.normal3};
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: right;
            line-height: 40px;
            color: #707070;
        }

    }
    .edit-header-title {
        display: flex;
        margin-top: 15px;
        margin-left: 65px;
        .title-txt {
            width: 97px;
            height: 29px;
            font-size:${market_style.font.size.normal3};
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: right;
            line-height: 40px;
            color: #707070;
        }
        .title-input-container{
            margin-left: 31px;
            width: 500px;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
        }
        .title-input-style{
            border-radius: 5px;
            width: 100%;
            border: none;
            background: transparent;
            font-size:${market_style.font.size.normal3};
            font-weight: 500;
            color: #707070;
            height: 100%;
            padding: 16px 23px 16px 23px;
        }
    }
    .edit-header-description {
        display: flex;
        margin-top: 15px;
        margin-left: 65px;
        .description-txt {
            width: 97px;
            height: 29px;
            font-size:${market_style.font.size.normal3};
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: right;
            line-height: 40px;
            color: #707070;
        }
        .description-input-container {
            margin-left: 31px;
            width: 505px;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
        }
        .description-input-style {
            border-radius: 5px;
            width: 100%;
            border: none;
            background: transparent;
            font-size:${market_style.font.size.normal3};
            font-weight: 500;
            color: #707070;
            height: 100%;
            padding: 16px 23px 16px 23px;
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
            font-size:${market_style.font.size.normal3};
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
            font-size:${market_style.font.size.normal3};
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

class NewCardModal extends Component {
    state = {
        loading: false, scroll: false, edit: false, title: "", description: "", hook: false,
        content: [],
    };
    handleCancel = async(obj) => {
        if (obj.length > 0 || this.state.title !== "" || this.state.content !== "") {
            if (!await confirm("작업중인 데이터는 저장되지 않습니다. 그래도 하시겠습니까?")) {
                return;
            }
        }
        this.onClose();
    };
    onClose = () => {
        this.props.close();
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
    onChangeDescription = event => {
        if (event.target) {
            this.setState({ description: event.target.value });
        }
    };
    saveTemporary = async (obj) => {
        await this.setState({ card_content: obj });
        this.submit();
    };
    handleResetHook = async () => {
        await this.setState({ hook: false });
    };
    submit = async () => {
        if (!this.state.title || this.state.title === "") {
            await alert("컨텐츠의 제목을 입력하세요.");
            return;
        }
        // new card
        let files = null;
        this.setState({ loading: true });
        await ValidationGroup(this.state, false)
            .then(async data => {
                files = await data && data.files;
                // let thumbnail = files ? { img: files && files[0].value, file_name: files && files[0].name } : null;

                await this.props.CreateItemCardRequest({ title: this.state.title, order: this.props.row.order }, this.props.itemId, this.props.row.id, this.props.token)
                    .then(async res => {
                        console.log(res);
                        if (res.success) {
                            const card_id = res.card;
                            const send_data = {
                                title: this.state.title,
                                files: files,
                                // thumbnail: thumbnail, 
                                description: this.state.description,
                                data: { deleteContent: [], newContent: this.state.content, updateContent: [] }
                            };
                            this.props.UpdateCardSourceRequest(send_data, card_id, this.props.token)
                                .then(async () => {
                                    await this.setState({ loading: false });
                                    await this.props.GetItemStepsRequest(this.props.itemId, this.props.token);
                                    this.onClose();
                                })
                                .catch(async err => await alert(err + '와 같은 이유로 작업을 완료할 수 없습니다.'));
                        } else {
                            await alert("새로운 카드를 추가하는데 실패했습니다. 잠시후 다시 시도해주세요.");
                        }
                    })
                    .catch(async err => await alert(err));
            });
    };
    handleCapture = (data) => {
        this.setState({ content: data });
    }
    render() {
        const { hook } = this.state;
        return (
            <React.Fragment>
                <NewCardDialogWrapper open={this.props.open} onClose={this.props.close}>
                    {this.state.loading && <Loading />}

                    <div className="close-box" onClick={this.onClose} >
                        <Cross angle={45} color={"#000000"} weight={3} width={33} height={33} />
                    </div>

                    <div className="content-wrapper">
                        <EditCardHeaderContainer>
                            <div className="edit-header-container">
                                <div className="edit-card-info">새 컨텐츠</div>
                            </div>
                            <div className="edit-header-thumbnail">
                                <div className="thumbnail-txt">썸네일</div>
                                <FormThumbnailEx name="thumbnail" placeholder="썸네일 등록" getValue={this.onChangeValueThumbnail} validates={["OnlyImages", "MaxFileSize(10000000)"]}
                                    style={{ marginLeft: "30px", width: "210px", height: "210px", backgroundColor: "#EFEFEF", borderRadius: "10px" }} />
                            </div>
                            <div className="edit-header-title">
                                <div className="title-txt">제목</div>
                                <div className="title-input-container">
                                    <input className="title-input-style" name="title" onChange={this.onChangeTitle} maxLength="20" placeholder="제목을 입력해주세요." />
                                </div>
                            </div>
                            <div className="edit-header-description">
                                <div className="description-txt">설명</div>
                                <div className="description-input-container">
                                    <input className="description-input-style" name="description" onChange={this.onChangeDescription} maxLength="1000" placeholder="설명을 입력해주세요." />
                                </div>
                            </div>
                        </EditCardHeaderContainer>

                        <ContentBorder><div className="border-line" /></ContentBorder>
                        <div className="content" >
                            <div className="title">내용</div>
                            <div className="content" >
                                <CardSourceDetail
                                    mode="project"
                                    fromNewCardModal={this.handleCapture}
                                    submit={this.submit}
                                    content={this.state.content || []}
                                    {...this.props}
                                    uid={"new"}
                                    isTeam={true}
                                    edit={true}
                                    handleCancel={this.handleCancel}
                                    closeEdit={this.onCloseEditMode}
                                    openEdit={this.onChangeEditMode}
                                    hook={hook}
                                    handleResetHook={this.handleResetHook}
                                    upDateRequest={this.saveTemporary} />
                            </div>
                        </div>
                    </div>
                    {/* <div onClick={this.submit}>click!</div> */}
                </NewCardDialogWrapper>
                <BlankSpace />
            </React.Fragment >
        )
    }
}
const mapStateToProps = (state) => ({
    token: state.Authentication.status.token,
    ItemDetail: state.ItemDetail.status.ItemDetail,
});

const mapDispatchToProps = (dispatch) => ({
    CreateItemCardRequest: (data, id, list_id, token) => dispatch(CreateItemCardRequest(data, id, list_id, token)),
    UpdateCardSourceRequest: (data, card_id, token) => dispatch(UpdateCardSourceRequest(data, card_id, token)),
    GetItemStepsRequest: (id, token) => dispatch(GetItemStepsRequest(id, token)),

    GetDesignBoardRequest: (id) => dispatch(GetDesignBoardRequest(id)),
    GetDesignDetailRequest: (id, token) => dispatch(GetDesignDetailRequest(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCardModal);

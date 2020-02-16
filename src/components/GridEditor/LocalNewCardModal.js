import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'semantic-ui-react'
import { ValidationGroup } from "modules/FormControl";
import { FormThumbnailEx } from "components/Commons/FormItems";
import CardSourceDetail from 'components/Designs/CardSourceDetail';
import Loading from "components/Commons/Loading";
import Cross from "components/Commons/Cross";

const NewCardDialogWrapper = styled(Modal)`
    margin-top: 50px !important;
    margin-bottom: 50px !important;
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
        padding: 45px;
        margin-left: auto;
        line-height: 17px;
        .title {
            font-family: Noto Sans KR;
            font-size: 20px;
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
    height: 29px;
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
        margin-left: 45px;
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
        margin-top: 25px;
        margin-left: 65px;
        .thumbnail-txt {
            width: max-content;
            height: 29px;
            font-size: 20px;
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
            font-size: 20px;
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
            font-size: 20px;
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
            font-size: 20px;
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
            font-size: 20px;
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

export class LocalNewCardModal extends Component {
    state = {
        loading: false, scroll: false, edit: false, title: "", content: "", hook: false,
        card_content: { deleteContent: [], newContent: [], updateContent: [] }
    };
    handleCancel = (obj) => {
        if (obj.length > 0 || this.state.title != "" || this.state.content != "") {
            if (!window.confirm("작업중인 데이터는 저장되지 않습니다. 그래도 하시겠습니까?")) {
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
    onChangeContent = event => {
        if (event.target) {
            this.setState({ content: event.target.value });
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
            alert("컨텐츠의 제목을 입력하세요.");
            await this.setState({ loading: false });
            return;
        }
        // new card
        let files = null;
        await ValidationGroup(this.state, false)
            .then(async data => {
                files = await data && data.files;
                let thumbnail = files ? { img: files && files[0].value, file_name: files && files[0].name } : null;
                this.props.return && this.props.return({
                    card: { title: this.state.title, order: this.props.cardOrder, boardId: this.props.boardId },
                    content: {
                        title: this.state.title, thumbnail: thumbnail, content: this.state.content,
                        data: {
                            deleteContent: this.state.card_content.deleteContent,
                            newContent: this.state.card_content.newContent,
                            updateContent: this.state.card_content.updateContent
                        }
                    }
                })
                await this.setState({ loading: false });
                this.onClose();
            }
            );
    };
    render() {
        const { content } = this.props.content;
        return (
            <React.Fragment>
                <NewCardDialogWrapper open={this.props.open} onClose={this.props.close}>
                    <div className="close-box" onClick={this.onClose} >
                        <Cross angle={45} color={"#000000"} weight={3} width={33} height={33} />
                    </div>

                    {this.state.loading && <Loading />}

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
                                    <input className="description-input-style" name="content" onChange={this.onChangeContent} maxLength="1000" placeholder="설명을 입력해주세요." />
                                </div>
                            </div>
                        </EditCardHeaderContainer>

                        <ContentBorder>
                            <div className="border-line" />
                        </ContentBorder>

                        <div className="content" >
                            <div className="title">내용</div>
                            {/* <React.Fragment>
                                {content.length > 0 && content.map((item, index) =>
                                    <Controller
                                        maxOrder={content.length - 1}
                                        key={index}
                                        type={item.type}
                                        item={item}
                                        order={index}
                                        deleteItem={this.deleteItem}
                                        name={`content${index}`}
                                        getValue={this.onChangValue} />)}

                                <AddController
                                    type="INIT"
                                    order={content.length > 0 ? content.length : 0}
                                    name="addBasic"
                                    getValue={this.onAddValue} />

                            </React.Fragment> */}

                        </div>

                    </div>

                </NewCardDialogWrapper>
                <BlankSpace />
            </React.Fragment >)
    }
}

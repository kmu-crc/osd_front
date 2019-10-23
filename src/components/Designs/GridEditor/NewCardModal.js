import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { UpdateDesignSourceRequest, UpdateCardSourceRequest, CreateDesignCardRequest, GetDesignBoardRequest, GetDesignDetailRequest, UpdateDesignTime } from "redux/modules/design";
import { ValidationGroup } from "modules/FormControl";
import { FormThumbnailEx } from "components/Commons/FormItems";
import CardSourceDetail from 'components/Designs/CardSourceDetail';
import Loading from "components/Commons/Loading";
import Cross from "components/Commons/Cross";

const NewCardDialog = styled(Modal)`
    min-width: 1777px;
    height: 850px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border-radius: 5px;
    opacity: 1;
    .close-box {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor:pointer;
    }
    
    .title-wrapper {
        display: flex;
        margin-top: 15px;
        margin-left: 125.5px;
        .title {
            width: 80px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
    }
    .thumbnail-wrapper {
        display: flex;
        margin-top: 25px;
        margin-left: 200.5px;
        .title {
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070
        }
    }
    .content-title-wrapper {
        display: flex;
        margin-left: 200.5px;
        .title {
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
        .wrapper {
            margin-left: 31px;
            width: max-content;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
            & input { 
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
    }
    .content-description-wrapper {
        display: flex;
        margin-top: 25px;
        margin-left: 200.5px;
        .title {
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
        .wrapper {
            margin-left: 31px;
            width: 505.5px;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
            & input {
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
    }

    .card-source-wrapper {
        display: flex;
        margin-top: 25px;
        margin-left: 200.5px;
        .title {
            width: 38px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
        .card-detail-scroll {
            font-size: 24px;
            overflow: hidden scroll;
            margin-left: 90px;
            width: 1200px;
            height: 250px;
            background-color: #EFEFEF;
            border-radius: 5px;
            border: 5px solid #EFEFEF;
        }
    }
    .submit-button-wrapper {
        margin-top: 14px;
        margin-left: 0px;
        .wrapper {
            width: 100px;
            height: 40px;
            margin-left: auto;
            margin-top: 24px;
            margin-right: 80.5px;
            line-height: 40px;
            color: #FF0000;
            padding-bottom: 1.5px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            cursor: pointer;
        }
        & button {
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
    }
`;
const ButtonContainer = styled.div`
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
  .content-edit-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-edit-button {
    width: max-content;
    padding: 7px;
    padding-bottom: 1px;
    border: none;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
  .content-add-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-add-button {
    width: max-content;
    border: none;
    padding: 7px;
    padding-bottom: 1px;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
`;
const EditorBottonWrapper = styled.div`
    width: max-content;
    margin: auto;
    margin-top: 10px;
    padding: 15px;
    background: #FFFFFF;
    border-radius: 25px;
    z-index: 907;
    .submit {
      margin-left: 5px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #FF0000;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
    .cancel {
      margin-left: 10px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
`;
class NewCardModal extends Component {
    state = {
        loading: false, scroll: false, edit: false, title: "", content: "", hook: false,
        card_content: { deleteContent: [], newContent: [], updateContent: [] }
    };
    handleCancel = () => {
        this.onClose();
    }
    onClose = () => {
        this.props.close();
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
    saveTemporary = async (obj) => {
        await this.setState({ card_content: obj });
        this.submit();
    }
    handleResetHook = async () => {
        await this.setState({ hook: false });
    }
    submit = async () => {
        let files = null;
        // new card
        await ValidationGroup(this.state, false)
            .then(async data => {
                files = await data && data.files;
                await this.props.CreateDesignCardRequest({ title: this.state.title, order: this.props.order }, this.props.designId, this.props.boardId, this.props.token)
                    .then((res) => {
                        console.log("3:", res.success, this.state.card_content);
                        if (res.success) {
                            // and get new card id
                            // directly update contents stored tempolarly
                            const card_id = res.card;
                            let thumbnail = files ? { img: files && files[0].value, file_name: files && files[0].name } : null;
                            this.props.UpdateCardSourceRequest({
                                title: this.state.title, thumbnail: thumbnail, content: this.state.content,
                                data: { deleteContent: this.state.card_content.deleteContent, newContent: this.state.card_content.newContent, updateContent: this.state.card_content.updateContent }
                            }, card_id, this.props.token)
                                .then(() => { this.props.UpdateDesignTime(this.props.designId, this.props.token) })
                                .then(() => { this.props.GetDesignDetailRequest(this.props.designId, this.props.token) })
                                .then(() => { this.props.GetDesignBoardRequest(this.props.designId) })
                                .then(async () => {
                                    await this.setState({ loading: false });
                                    this.onClose();
                                })
                                .catch(err => alert(err + '와 같은 이유로 작업을 완료할 수 없습니다.'));
                        } else {
                            alert("새로운 카드를 추가하는데 실패했습니다. 잠시후 다시 시도해주세요.");
                        }
                    });
            });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.state.title) {
            alert("컨텐츠의 제목을 입력하세요.");
            return;
        }
        await this.setState({ loading: true, hook: true });
    }
    render() {
        const { hook } = this.state;
        return (<NewCardDialog open={this.props.open} onClose={this.props.close}>
            {/* {this.state.loading && <Loading />} */}

            <div onClick={this.onClose} className="close-box" >
                <Cross angle={45} color={"#000000"} weight={3} width={45} height={45} />
            </div>

            <div className="title-wrapper">
                <div className="title">새 컨텐츠</div>
            </div>

            <div className="thumbnail-wrapper">
                <div className="title">썸네일 사진</div>
                <FormThumbnailEx name="thumbnail" placeholder="썸네일 등록" getValue={this.onChangeValueThumbnail} validates={["OnlyImages", "MaxFileSize(10000000)"]}
                    style={{ marginLeft: "30px", width: "210px", height: "210px", backgroundColor: "#EFEFEF", borderRadius: "10px" }} />
            </div>

            <div className="content-title-wrapper">
                <div className="title">컨텐츠 제목</div>
                <div className="wrapper">
                    <input name="title" onChange={this.onChangeTitle} maxLength="20" placeholder="제목을 입력해주세요." /></div>
            </div>

            <div className="content-description-wrapper">
                <div className="title">컨텐츠 설명</div>
                <div className="wrapper">
                    <input name="content" onChange={this.onChangeContent} maxLength="20" placeholder="설명을 입력해주세요." /></div>
            </div>

            <div className="card-source-wrapper">
                <div className="title">내용</div>
                <div className="card-detail-scroll" >
                    <CardSourceDetail {...this.props} uid={undefined} isTeam={this.props.isTeam} edit={true} closeEdit={this.onCloseEditMode} openEdit={this.onChangeEditMode} hook={hook} handleResetHook={this.handleResetHook} upDateRequest={this.saveTemporary} />
                </div>
            </div>
            <ButtonContainer >
                <EditorBottonWrapper>
                    <button onClick={this.handleSubmit} className="submit" type="button">
                        <i className="icon outline save" />생성</button>
                    <button onClick={this.handleCancel} className="cancel" type="button">
                        <i className="icon trash" />취소</button>
                </EditorBottonWrapper>
            </ButtonContainer>
            {/*<div className="submit-button-wrapper">
                <div className="wrapper">
                    <button onClick={this.handleSubmit} >생성하기</button>
                </div>
            </div> */}
        </NewCardDialog >)
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

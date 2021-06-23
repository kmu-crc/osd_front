import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'semantic-ui-react'
import { connect } from "react-redux";

import { GetDesignDetailRequest } from "actions/Design";
import { GetDesignBoardRequest, } from "actions/Designs/DesignBoard";

import { CreateItemCardRequest, UpdateCardSourceRequest, GetItemStepsRequest } from "actions/Item";

import { ValidationGroup } from "modules/FormControl";
import { FormThumbnailEx } from "components/Commons/FormItems";
import { FormThumbnailEx_mini } from "components/Commons/FormItems";
import CardSourceDetail from "components/Items/ItemDetail/CardSourceDetail";
import Loading from "components/Commons/Loading";
import Cross from "components/Commons/Cross";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const NewCardDialog = styled(Modal)`
    width:100%;
    border-radius:10px !important;
    padding:15px 10px;
    .row{
        width:100%;
    }
    .flex{display:flex;}
    .alignCenter{align-items:center;}
    .justifyCenter{justify-content:center;}
    .justifyBetween{justify-content:space-between;}
    .marginTop1{margin-top:10px;}
    .lock{
        min-width:25px;
        min-height:25px;
        border-radius:50%;
        background-color:#AFAFAF;
        margin-right:10px;
    }
    .title_{
        height:max-content;
        font-size:${market_style.font.size.small1};
        font-weight:600;
        color:black;
    }
    .hrline{
        border:1px solid #EFEFEF;
        margin-top:12px;
        margin-bottom:20px;
    }
    .label{
        min-width:78px;
        font-size:${market_style.font.size.small1};
        font-weight:500;
        color:#707070;
    }
`
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.small};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 5px 15px 4px 15px;
  font-weight:300;
`;
class NewCardModal_mobile extends Component {
    state = {
        loading: false, scroll: false, edit: false, title: "", description: "", hook: false,
        content: [],
    };
    handleCancel = async (obj) => {
        if ((obj != null && typeof obj === "object" && obj.length > 0) || this.state.title !== "" || this.state.content !== "") {
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
                <NewCardDialog open={this.props.open} onClose={this.props.close}>
                    <div className="row flex alignCenter justifyBetween">
                        <div className="flex">
                            {/* <div className="lock"/> */}
                            <div className="title_">새 컨텐츠</div>  
                        </div>  
                        <Cross onClick={this.onClose} angle={45} color={"#000000"} weight={1} width={25} height={25} />
                    </div>
                    <div className="row hrline"/>
                    <div className="row flex">
                        <div className="label">썸네일</div>
                        <FormThumbnailEx_mini name="thumbnail" placeholder="썸네일 등록" getValue={this.onChangeValueThumbnail} validates={["OnlyImages", "MaxFileSize(10000000)"]} />
                    </div>
                    <div className="row flex alignCenter">
                        <div className="label">제목</div>
                        <InputText className="input-style" name="title" onChange={this.onChangeTitle} maxLength="20" placeholder="제목을 입력해주세요." />
                    </div>
                    <div className="row flex alignCenter marginTop1">
                        <div className="label">설명</div>
                        <InputText className="input-style" name="description" onChange={this.onChangeDescription} maxLength="1000" placeholder="설명을 입력해주세요." />
                    </div>
                    <div className="row hrline marginTop1"/>
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
                </NewCardDialog>
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
    GetDesignBoardRequest: (id) => dispatch(GetDesignBoardRequest(id)),
    GetDesignDetailRequest: (id, token) => dispatch(GetDesignDetailRequest(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCardModal_mobile);

{/* <NewCardDialogWrapper open={this.props.open} onClose={this.props.close}>
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
</NewCardDialogWrapper>
<BlankSpace /> */}
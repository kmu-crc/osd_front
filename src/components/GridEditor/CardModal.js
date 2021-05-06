import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import styled from 'styled-components';
import arrow from "source/arrow.svg";
import Cross from "components/Commons/Cross";
import DateFormat from "modules/DateFormat";
import { GetDesignDetailRequest, } from "actions/Design";
import {
    UpdateCardImagesRequest, UpdateCardContentRequest, UpdateCardTitleRequest,
    GetCardDetailRequest
} from "actions/Designs/DesignCard";
import { GetDesignBoardRequest, } from "actions/Designs/DesignBoard";
import { UpdateDesignTime } from "actions/Designs/UpdateDesign";

import { UpdateCardSourceRequest, DeleteItemCardRequest } from "actions/Item";
import CardSourceDetailContainer from 'containers/Items/CardSourceDetailContainer';

import { FormThumbnailEx } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
import TextFormat from 'modules/TextFormat';
import Loading from "components/Commons/Loading";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import { Icon } from 'semantic-ui-react'
import market_style from "market_style";

// import CardComment from './CardComment';
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"
// import {confirmAlert} from "react-confirm-alert";
const ContentBorder = styled.div`
    width:100%;
    border:1px solid #EFEFEF;
    margin-top:10px;
    margin-bottom:10px;
`;
const CommentWrapper = styled.div`
   .comment-title {
       margin-left: 45px;
   }
   .comment-body{
       margin-left: 52px;
       margin-top: 15px;
       color: #707070;
       font-size:${market_style.font.size.normal3};
       font-weight: 500;
       font-family: Noto Sans KR;
       line-height: 29px;
   }
`;
const CardDialog = styled(Modal)`
    width:100% !important;
    max-width:1000px !important;
    border-radius:20px !important; 
    padding:30px 50px !important;
    margin-bottom:30px !important;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .content{
        width:100%;
    }
    .modifyRgn{
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        .redBtn{
            cursor:pointer;
            color:red;
            font-size:${market_style.font.size.small1};
            text-decoration:underline;
            margin-right:20px;
        }
        .greyBtn{
            cursor:pointer;
            color:#707070;
            font-size:${market_style.font.size.small1};
            text-decoration:underline;
        }
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
        width: max-content;
        cursor: pointer;
        position: relative;
        margin-left: auto;
        margin-right: 10px;
        margin-top: 10px; 
    }
    .content-wrapper {
        position: relative;
        .card-header-first{
           width:100%; 
           display:flex;
           justify-content:space-between;
           align-items:center;
           .header-title{
                width:50%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size:${market_style.font.size.normal1};
           }
           .header-update{
               display:flex;
               align-items:center;
               .update_{
                   font-size:${market_style.font.size.mini2};
               }
               .close_{
                   margin-left:50px;
                   cursor:pointer;
               }
           }
        }
        // .card-header-first {
        //     border:1px solid red;
        //     *{
        //         border:1px solid black;
        //     }
        //     display: flex;
        //     justify-content: space-between;
        //     height: 29px;
        //     margin-top: 30px;
        //     margin-left: 52px;
        //     .header-title {
        //         font-family: Noto Sans KR;
        //         font-size:${market_style.font.size.normal3};
        //         color: #707070;
        //         font-weight: 500;
        //         line-height: 29px;
        //     }
        //     .header-edit-button {
        //         font-family: Noto Sans KR;
        //         font-size:${market_style.font.size.small3};
        //         color: #707070;
        //         font-weight: 900;
        //         line-height: 29px;
        //         margin-right: 75px;
        //         .edit-btn {
        //             border: none;
        //             background: none;
        //             width: max-content;
        //             height: 40px;
        //             line-height: 40px;
        //             color: #FF0000;
        //             padding-bottom: 1.5px;
        //             border-bottom: 1.5px solid #FF0000;
        //             font-size:${market_style.font.size.normal3};
        //             font-weight: 500;
        //             font-family: Noto Sans KR;
        //             text-align: left;
        //             cursor: pointer;
        //         }
        //         .cancel-btn {
        //             margin-left: 25px;
        //             border: none;
        //             background: none;
        //             width: max-content;
        //             height: 40px;
        //             line-height: 40px;
        //             color: #707070;
        //             padding-bottom: 1.5px;
        //             border-bottom: 1.5px solid #707070;
        //             font-size:${market_style.font.size.normal3};
        //             font-weight: 500;
        //             font-family: Noto Sans KR;
        //             text-align: left;
        //             cursor: pointer;
        //         }
        //     }
        // }
        // .card-header-second {
        //     width: 100%;
        //     height: 29px;
        //     display: flex;
        //     justify-content: flex-start;
        //     padding-left: 52px;
        //     margin-top: 30px;
        //     .contents {
        //         font-size:${market_style.font.size.normal3};
        //         color: #707070;
        //         font-weight: 300;
        //         font-family: Noto Sans KR;
        //         line-height: 29px;   
        //     }
        //     .nick-name {
        //         width: max-content;
        //         margin-left: auto;
        //         margin-right: 5px;
        //         font-size:${market_style.font.size.normal3};
        //         color: #707070;
        //         font-weight: 300;
        //         font-family: Noto Sans KR;
        //         line-height: 29px;   
        //     }
        //     .update-time {
        //         width: max-content;
        //         margin-right: 75px;
        //         color: #707070;
        //         font-size:${market_style.font.size.small3};
        //         font-weight: 300;
        //         font-family: Noto Sans KR;
        //         line-height: 29px;
        //     }
        // }
    }
`
const EditCardHeaderContainer = styled.div`
   .edit-header-container {
       width:100%;
       display: flex;
       justify-content:space-between;
       align-items:center;
       .edit-card-info {
           display:flex;
           width: max-content;
           font-size:${market_style.font.size.normal1};
           font-weight: 500;
           font-family: Noto Sans KR;
           text-align: left;
           color: #707070;
           .icon_style{
               width:20px;
               height:20px;
               border-radius:50%;
               background-color:white;
               display:flex;
               justify-content:center;
               align-items:center;
               margin-right:10px;
               padding-left:3px;
               cursor:pointer;
           }
           .borderRed{
               border:1px solid red;
           }
           .borderGrey{
               border:1px solid #707070;
           }
       }
       .close_{
        margin-left:50px;
        cursor:pointer;
        }
   }
   .hrline{
       width:100%;
       border:1px solid #efefef;
       margin-top:10px;
   }
   .marginTop{
       margin-top:30px;
   }
   .marginBottom{
       margin-bottom:30px;
   }
   .edit-header-thumbnail {
       display: flex;
       margin-top: 14px;

       .thumbnail-txt {
            min-width: 91px;
            font-size:${market_style.font.size.small1};
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            color: #707070;
            // margin-right:20px;
       }

   }
   .edit-header-title {
       display: flex;
       margin-top:30px;
       display:flex;
       align-items:center;
       .title-txt {
           width: 91px;
           font-size:${market_style.font.size.small1};
           font-weight: 500;
           font-family: Noto Sans KR;
           text-align: left;
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
           border-radius: 10px;
           width: 600px;
           font-size:${market_style.font.size.small1};
           font-weight: 400;
           color: black;
           padding: 7px 15px;
           background-color:#E9E9E9;
           outline:none;
           border:none;
       }
   }
   .edit-header-description{
        display: flex;
        margin-top:30px;
        display:flex;
        align-items:center;
       .description-txt{
            width: 91px;
            font-size:${market_style.font.size.small1};
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            color: #707070;
       }
       .description-input-container{
           margin-left: 31px;
           width: 505px;
           height: 56px;
           background-color: #EFEFEF;
           border-radius: 5px;
       }
       .description-input-style{
            border-radius: 10px;
            width: 600px;
            font-size:${market_style.font.size.small1};
            font-weight: 400;
            color: black;
            padding: 7px 15px;
            background-color:#E9E9E9;
            outline:none;
            border:none;
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
class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = { sroll: false, edit: false, isEditing:false, title: "", description: "", content: [], modifyresult:false,private:false }
        this.handlerModifyContent = this.handlerModifyContent.bind(this);
    };
    handlerModifyContent(){
        this.setState({modifyresult:true});
    }
    componentDidMount() {

        const { card } = this.props;
        this.setState({ thumbnail: card.thumbnail, title: card.title, description: card.description,private:card.private==true?true:false });
    };
    async componentDidUpdate(prevProps) {
        if (prevProps.card !== this.props.card) {
            await alert("card");
            return true;
        }
    };
    onChangeValueThumbnail = async data => {
        let obj = {};
        if (data.target) {
            obj[data.target.name] = data;
            await this.setState(obj);
        }
    };
    onChangeTitle = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.title);
    };
    onChangeDescription = event => {
        if (event.target) {
            this.setState({ description: event.target.value });
        }
    };
    handleHeaderSubmit = passingContent => {
        console.log("20200312", passingContent, this.state);
        let files = null;
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
                // console.log(pack);
                // return;
                await this.props.UpdateCardSourceRequest(pack, this.props.card.uid, this.props.token)
                    .then(this.props.GetItemStepsRequest(this.props.itemId, this.props.token))
                    .catch(async err => await alert(err + '와 같은 이유로 카드수정에 실패하셨습니다. 관리자에게 문의해주시기 바랍니다.'));
                this.onClose();
            }).catch(async err => await alert(err + '와 같은 이유로 카드수정에 실패하셨습니다. 관리자에게 문의해주시기 바랍니다.'));
        this.setState({ edit: !this.state.edit })
    };
    onOnlyCloseEditMode = async()=>{
        this.setState({ edit: false });
    }
    onCloseEditMode = async() => {
        if(this.props.card.title==this.state.title&&
            this.props.card.description==this.state.description&&
            this.props.card.thumbnail==this.state.thumbnail&&
            this.state.modifyresult==false)
        {
            this.setState({ edit: false });
        }else if(await confirm("수정된 사항이 저장되지 않습니다. 계속 하시겠습니까?")) {
            this.setState({ edit: false });
        }
        // console.log(this.props.card)
        
        // if ((this.state.title !== this.props.card.title) || (this.state.content !== this.props.card.content)) {
        //     if (!await confirm("변경된 내용이 저장되지 않습니다. 계속하시겠습니까?")) {
        //         return;
        //     }
        // }
        
    };
    onChangeEditMode = () => {
        this.setState({ edit: this.state.edit })
    };
    removeCard = async e => {
        e.stopPropagation();
        // const confirm = window.confirm("컨텐츠를 삭제하시겠습니까?");
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
        if(this.props.card.title==this.state.title&&
            this.props.card.description==this.state.description&&
            this.props.card.thumbnail==this.state.thumbnail&&
            this.state.modifyresult==false)
        {
                await this.setState({ sroll: false, edit: false, title: "", content: "" });
                this.props.close();
                return;
        }else if(this.state.edit && !await confirm("수정된 사항이 저장되지 않습니다. 계속 하시겠습니까?")) {
            return;
        }
        await this.setState({ sroll: false, edit: false, title: "", content: "" });
        this.props.close();
    };
    render() {
        const { card } = this.props;
        console.log(this.state, this.props);

        return (
            !card ? (
                <div>{card}loading</div>
            ) :
                <React.Fragment>
                    <div style={{ zIndex: 100 }}>
                        <CardDialog open={this.props.open} onClose={this.onClose}>
                        {/* <div className="close-box" onClick={this.onClose} >
                            <Cross angle={45} color={"#000000"} weight={3} width={33} height={33} />
                        </div> */}
                            {this.state.loading && <Loading />}
                        <div className="content-wrapper" >
                            {this.state.edit
                                ? <React.Fragment>
                                    <EditCardHeaderContainer>
                                        <div className="edit-header-container">
                                            <div className="edit-card-info">
                                            <div onClick={()=>{this.setState({private:!this.state.private})}} 
                                                className={`icon_style ${this.state.private == true?"borderRed":"borderGrey"}`}>
                                                <Icon size='mini' name={`${this.state.private==true?"lock":"lock open"}`} color={`${this.state.private==true?"red":"grey"}`}/>
                                            </div>컨텐츠 정보수정
                                            </div>
                                            <div onClick={this.onClose} className="close_">
                                                <Cross angle={45} color={"#000000"} weight={1} width={14} height={14} />
                                            </div>
                                        </div>
                                        <div className="hrline"/>
                                        <div className="edit-header-thumbnail">
                                            <div className="thumbnail-txt">이미지</div>
                                            <FormThumbnailEx style={{ marginBottom:"0px",width: "200px", height: "200px", borderRadius: "10px", backgroundColor: "#EFEFEF" }}
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
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className = "card-header-first">
                                        <div className="header-title">{card.title}</div>
                                        <div className="header-update">
                                            <div className="update_">(업데이트&nbsp;:&nbsp;{DateFormat(card.update_time)})</div>
                                            <div onClick={this.onClose} className="close_">
                                                <Cross angle={45} color={"#000000"} weight={1} width={14} height={14} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="card-header-first">
                                        <div className="header-title">{card.title}</div>
                                        <div className="header-edit-button">
                                            {this.props.edit ?
                                                <React.Fragment>
                                                    <button className="edit-btn" onClick={() => this.setState({ edit: !this.state.edit, title: card.title, content: card.content })} >수정하기</button>
                                                    <button className="cancel-btn" onClick={(event) => this.removeCard(event)} >삭제하기</button>
                                                </React.Fragment> : undefined}
                                        </div>
                                    </div>
                                    <div className="card-header-second" >
                                        <div className="contents"><TextFormat txt={card.content || ""} chars={25} /></div>
                                        <div className="nick-name">{card.nick_name}</div>
                                        <div className="update-time">(업데이트&nbsp;:&nbsp;{DateFormat(card.update_time)})</div>
                                    </div> */}
                                </React.Fragment>}

                            <ContentBorder/>

                            <div className="content">
                                <CardSourceDetailContainer
                                    bought={this.props.bought}
                                    isTeam={this.props.isTeam}
                                    submit={this.handleHeaderSubmit}
                                    handleCancel={this.onCloseEditMode}
                                    handleCloseEdit = {this.onOnlyCloseEditMode}
                                    edit={this.state.edit}
                                    card={card}
                                    cardId={card.uid}
                                    closeEdit={this.onCloseEditMode}
                                    openEdit={this.onChangeEditMode}
                                    handlerModifyContent={this.handlerModifyContent}
                                    isCancel
                                    mode="project"
                                    isModify={
                                        this.props.card.private==this.state.private&&
                                        this.props.card.title==this.state.title&&
                                        this.props.card.description==this.state.description&&
                                        this.props.card.thumbnail==this.state.thumbnail&&
                                        this.state.modifyresult==false}
                                />
                            </div>
                            {
                                this.props.edit&&this.state.isEditing==false?
                                <div className="modifyRgn">
                                    <div className="redBtn" onClick={() => this.setState({ edit: !this.state.edit,isEditing:!this.state.isEditing, title: card.title, content: card.content })}>수정하기</div>
                                    <div className="greyBtn" onClick={(event) => this.removeCard(event)}>삭제하기</div>
                                </div>
                                :
                                null
                            }
                        </div>
                        </CardDialog>
                        <BlankSpace />
                    </div>
                </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    detail: state.ItemContent.status.ItemContent,
});

const mapDispatchToProps = dispatch => ({
    DeleteItemCardRequest: (board_id, card_id, token) => dispatch(DeleteItemCardRequest(board_id, card_id, token)),
    // GetItemStepsRequest: (id, token) => dispatch(GetItemStepsRequest(id, token)),

    UpdateCardSourceRequest: (data, card_id, token) => { return dispatch(UpdateCardSourceRequest(data, card_id, token)); },
    UpdateCardTitleRequest: (data, token, id) => { return dispatch(UpdateCardTitleRequest(data, token, id)); },
    UpdateCardContentRequest: (data, token, id) => { return dispatch(UpdateCardContentRequest(data, token, id)); },
    UpdateCardImagesRequest: (data, token, id) => { return dispatch(UpdateCardImagesRequest(data, token, id)); },
    GetDesignBoardRequest: (id) => { return dispatch(GetDesignBoardRequest(id)); },
    GetCardDetailRequest: id => { return dispatch(GetCardDetailRequest(id)); },
    UpdateDesignTime: (id, token) => { return dispatch(UpdateDesignTime(id, token)); },
    GetDesignDetailRequest: (id, token) => { return dispatch(GetDesignDetailRequest(id, token)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);

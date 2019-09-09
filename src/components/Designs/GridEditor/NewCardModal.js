import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { UpdateCardSourceRequest, CreateDesignCardRequest, GetDesignBoardRequest, GetDesignDetailRequest, UpdateDesignTime } from "redux/modules/design";
import { ValidationGroup } from "modules/FormControl";
import { FormThumbnailEx } from "components/Commons/FormItems";
import CardSourceDetail from 'components/Designs/CardSourceDetail';

const NewCardDialog = styled(Modal)`
    min-width: 1777px;
    height: 1350px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border-radius: 5px;
    opacity: 1;
`;
class NewCardModal extends Component {
    state = { scroll: false, edit: false, title: "", content: "", card_content: { deleteContent: [], newContent: [], updateContent: [] } };
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
    saveTemporary = (obj) => {
        this.setState({ card_content: obj });
        console.log("save:", this.state);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let files = null;
        // new card 
        ValidationGroup(this.state, false)
            .then(data => {
                files = data && data.files;
                console.log("submit:", files, this.state)
                this.props.CreateDesignCardRequest({ title: this.state.title, order: this.props.order }, this.props.designId, this.props.boardId, this.props.token)
                    .then((res) => {
                        if (res.success) {
                            const card_id = res.card;
                            let thumbnail = { img: files && files[0].value, file_name: files && files[0].name };
                            const pack = { title: this.state.title, thumbnail: thumbnail, data: this.state.card_content, content: this.state.content };
                            console.log(pack);//return;
                            this.props.UpdateCardSourceRequest(pack, card_id, this.props.token)
                                .then(() => { this.props.UpdateDesignTime(this.props.designId, this.props.token) })
                                .then(() => { this.props.GetDesignDetailRequest(this.props.designId, this.props.token) })
                                .then(() => { this.props.GetDesignBoardRequest(this.props.designId) })
                                .then(() => { this.onClose() })
                                .catch(err => alert(err));
                        } else {
                            alert("새로운 카드를 추가하는데 실패했습니다. 잠시후 다시 시도해주세요.");
                        }
                    });
            })
        // and get new card id
        // directly update contents stored tempolarly
    }
    render() {
        return (<NewCardDialog open={this.props.open} onClose={this.props.close}>
            <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
                <Cross angle={45} color={"#FFFFFF"} weight={3} width={45} height={45} />
            </div>
            <div style={{ display: "flex", marginTop: "35.5px", marginLeft: "125.5px" }}><div style={{ width: "80px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>새 컨텐츠</div></div>
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
                    <input name="title" onChange={this.onChangeTitle} style={{ borderRadius: "5px", width: "100%", border: "none", background: "transparent", fontSize: "20px", fontWeight: "500", color: "#707070", height: "100%", padding: "16px 23px 16px 23px" }} name="title" maxLength="20" placeholder="제목을 입력해주세요." />
                </div>
            </div>
            <div style={{ display: "flex", marginTop: "75px", marginLeft: "200.5px" }}>
                <div style={{ width: "97px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>
                    컨텐츠 설명
                    </div>
                <div style={{ marginLeft: "31px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", }}>
                    <input name="content" onChange={this.onChangeContent} style={{ borderRadius: "5px", width: "100%", border: "none", background: "transparent", fontSize: "20px", fontWeight: "500", color: "#707070", height: "100%", padding: "16px 23px 16px 23px" }} name="title" maxLength="20" placeholder="제목을 입력해주세요." />
                </div>
            </div>
            <div style={{ display: "flex", marginTop: "75px", marginLeft: "200.5px" }}>
                <div style={{ width: "38px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>내용</div>
                <div className="card-detail-scroll" style={{ fontSize: "24px", overflow: "hidden scroll", marginLeft: "90px", width: "1248.5px", height: "526px", backgroundColor: "#EFEFEF", borderRadius: "5px", border: "5px solid #EFEFEF" }}>
                    <CardSourceDetail
                        {...this.props}
                        uid={undefined}
                        isTeam={this.props.isTeam}
                        edit={this.state.edit}
                        closeEdit={this.onCloseEditMode}
                        openEdit={this.onChangeEditMode}
                        upDateRequest={this.saveTemporary} />
                </div>
            </div>
            <div style={{ marginTop: "14px", marginLeft: "0px" }}>
                <div style={{ width: "100px", height: "40px", marginLeft: "auto", marginTop: "24px", marginRight: "80.5px", lineHeight: "40px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>
                    <button onClick={this.handleSubmit} style={{ border: "none", background: "none", width: "max-content", height: "40px", lineHeight: "40px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>생성하기</button>
                </div>
            </div>
            {/*<CardSourceDetail
        //  {...this.props}
        //  uid={this.props.uid}
        //  isTeam={this.props.isTeam}
        //  edit={true}
        //  closeEdit={this.props.closeEdit}
        //  openEdit={this.props.openEdit}
        //  upDateRequest={this.onSubmit}
        ///>*/}
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
        UpdateDesignTime: (id) => {
            return dispatch(UpdateDesignTime(id));
        },
        UpdateCardSourceRequest: (data, card_id, token) => {
            return dispatch(UpdateCardSourceRequest(data, card_id, token));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardModal);

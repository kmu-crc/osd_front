import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
import { connect } from "react-redux";
import { CreateDesignCardRequest, GetDesignBoardRequest, GetDesignDetailRequest, UpdateDesignTime } from "redux/modules/design";
// import CreateCard from "components/Designs/CreateCard";
//import { FormInput, FormTextArea } from "components/Commons/FormItem";
import { FormInput } from "components/Commons/FormItem";

// import { FormControl, ValidationGroup } from "modules/FormControl";
import { FormThumbnailEx } from "components/Commons/FormItems";
import CardSourceDetailContainer from 'containers/Designs/CardSourceDetailContainer';

const NewCardDialog = styled(Modal)`
    min-width: 1777px;
    height: 1224px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border-radius: 5px;
    opacity: 1;
`;
class NewCardModal extends Component {
    state = { scroll: false, edit: false };
    onClose = () => {
        this.props.close();
    }
    render() {
        return (<NewCardDialog open={this.props.open} onClose={this.props.close}>
            <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
                <Cross angle={45} color={"#FFFFFF"} weight={3} width={45} height={45} />
            </div>
            <form onSubmit={this.handleSumit} ref={ref => (this.form = ref)}>
                <div style={{ display: "flex", marginTop: "35.5px", marginLeft: "125.5px" }}><div style={{ width: "80px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>새 컨텐츠</div></div>
                <div style={{ display: "flex", marginTop: "56px", marginLeft: "200.5px" }}>
                    <div style={{ width: "97px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>썸네일 사진</div>
                    <FormThumbnailEx
                        name="first_img"
                        style={{ marginLeft: "30px", width: "210px", height: "210px", backgroundColor: "#EFEFEF", borderRadius: "10px" }}
                        placeholder="썸네일 등록" getValue={this.onChangeValue} onChange={() => { this.liveCheck("first_img") }} validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
                    />
                </div>
                <div style={{ display: "flex", marginTop: "75px", marginLeft: "200.5px" }}>
                    <div style={{ width: "97px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>
                        컨텐츠 제목
                    </div>
                    <div style={{ marginLeft: "31px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", }}>
                        <FormInput style={{ borderRadius: "5px", width: "100%", border: "none", background: "transparent", fontSize: "20px", fontWeight: "500", color: "#707070", height: "100%", padding: "16px 23px 16px 23px" }} name="title" maxLength="20" placeholder="제목을 입력해주세요." getValue={this.onChangeValue} validates={["Required"]} />
                    </div>
                </div>
                <div style={{ display: "flex", marginTop: "75px", marginLeft: "200.5px" }}>
                    <div style={{ width: "38px", height: "29px", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", lineHeight: "40px", color: "#707070" }}>내용</div>
                    <div className="card-detail-scroll" style={{ fontSize: "24px", overflow: "hidden scroll", marginLeft: "90px", width: "1248.5px", height: "526px", backgroundColor: "#EFEFEF", borderRadius: "5px", border: "5px solid #EFEFEF" }}>
                        <CardSourceDetailContainer uid={undefined} isTeam={this.props.isTeam} edit={this.state.edit} closeEdit={this.onCloseEditMode} openEdit={this.onChangeEditMode} />
                        {/* <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ width: "116px", height: "29px", marginTop: "24px", lineHeight: "29px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>파일 첨부하기</div>
                            <div style={{ width: "134px", height: "29px", marginLeft: "67px", marginTop: "24px", lineHeight: "29px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>텍스트 첨부하기</div>
                        </div> */}
                    </div>
                </div>
                <div style={{ marginTop: "14px", marginLeft: "0px" }}>
                    <div style={{ width: "100px", height: "40px", marginLeft: "auto", marginTop: "24px", marginRight: "80.5px", lineHeight: "40px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>
                        <button type="submit" style={{ border: "none", background: "none", width: "max-content", height: "40px", lineHeight: "40px", color: "#FF0000", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>생성하기</button>
                    </div>
                </div>
            </form>
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardModal);

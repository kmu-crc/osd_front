import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'


const EditStepDialog = styled(Modal)`
    max-width: 849px;
    height: 295px;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px #FF0000;
`;
class EditStepModal extends Component {
    state = { title: "", where: null }
    onChange = (event) => {
        const target = event.target
        this.setState({ [target.name]: target.value })
    }
    onSubmit = () => {
        if (!this.state.title) {
            this.props.close();
            return;
        }
        if (this.state.title === this.props.title) {
            alert("제목이 변경되지 않았습니다.");
            return;
        }
        let data = this.state;
        this.props.EditStep(data);
    }
    onClose = () => {
        this.props.close()
    }
    removeStep = (event) => {
        event.stopPropagation();
        const step = this.props.steps.find(step => { return (step.uid === this.props.where) });
        if (step.cards && step.cards.length > 0) {
            alert("카드가 존재하는 단계는 삭제할 수 없습니다.");
            return;
        }
        const confirm = window.confirm("단계를 삭제하시겠습니까?");
        if (confirm) {
            this.props.RemoveStep(step.uid)
        }
        this.onClose();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({ title: nextProps.title, where: nextProps.where });
            return true;
        }
    }
    render() {
        // console.log("edit modal:", this.state, this.props);
        return (<EditStepDialog open={this.props.open} closeOnDimmerClick={false} onClose={this.onClose}>
            <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
                <Cross angle={45} color={"#FFFFFF"} weight={2} width={32.36} height={32.36} />
            </div>
            <div style={{ width: "max-content", height: "29px", lineHeight: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left", marginTop: "43.5px", marginLeft: "109.5px" }}>단계이름 수정</div>
            <div style={{ display: "flex", width: "575.5px", marginTop: "40px", marginLeft: "109.5px" }}>
                <div style={{ width: "40px", height: "29px", lineHeight: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left" }}>제목</div>
                <div style={{ width: "505.5px", height: "56px", borderRadius: "5px", marginLeft: "34px", backgroundColor: "#EFEFEF" }}>
                    <input name="title" onChange={this.onChange} style={{ width: "100%", height: "100%", paddingTop: "16px", paddingRight: "10px", paddingBottom: "16px", paddingLeft: "10px", border: "none", backgroundColor: "transparent" }} value={this.state.title || ""} />
                </div>
            </div>
            <div style={{ display: "flex", width: "576px", marginLeft: "auto", marginRight: "75px", marginTop: "38px" }}>
                <div onClick={this.onSubmit} style={{ marginLeft: "auto", textAlign: "middle", color: "#FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", lineHeight: "29px", borderBottom: "1.5px solid #FF0000", cursor: "pointer" }}>수정하기</div>
                <div onClick={(event) => this.removeStep(event)} style={{ marginLeft: "25px", width: "max-content", border: "none", background: "none", height: "40px", lineHeight: "40px", color: "#707070", paddingBottom: "1.5px", borderBottom: "1.5px solid #707070", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }}>삭제</div>
            </div>
        </EditStepDialog >)
    }
};

export default EditStepModal;
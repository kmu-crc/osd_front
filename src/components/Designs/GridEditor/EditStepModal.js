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
    .close-box {
        position: absolute;
        left: 100%;
        margin-top: 7.32px;
        margin-left: 34.32px;
    }
    .edit-step-name-title {
        width: max-content;
        height: 29px;
        line-height: 29px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        margin-top: 43.5px;
        margin-left: 109.5px;
    }
    .edit-step-name-content-container {
        display: flex;
        width: 575.5px;
        margin-top: 40px;
        margin-left: 109.5px;
        .edit-step-name-content-title {
            width: 40px;
            height: 29px;
            color: #707070;
            line-height:52px;
            font-family: Noto Sans KR;
            font-size: 20px;
            font-weight: 500;
            text-align: left;
        }
        .edit-step-name-content-input-wrapper {
            width: 505.5px;
            height: 56px;
            margin-left: 34px;
            border-radius: 5px;
            background-color: #EFEFEF;
        }
        .edit-step-name-content-input-style {
            width: 100%;
            height: 100%;
            padding-top: 16px;
            padding-left: 10px;
            padding-bottom: 16px;
            padding-right: 10px;
            border: none;
            background-color: transparent;
            font-family:Noto Sans KR;
            font-size:20px;
            font-weight:300;
        }
    }
    .edit-step-name-button-container {
        display: flex;
        width: 576px;
        margin-left: auto;
        margin-right: 75px;
        margin-top: 38px;

        .edit-step-name-button-submit {
            margin-left: auto;
            text-align: middle;
            color: #FF0000;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            line-height: 40px;
            border-bottom: 1.5px solid #FF0000;
            border:1px splid black;
            cursor: pointer;
        }
        .edit-step-name-button-cancel {
            margin-left: 25px;
            width: max-content;
            border: none;
            background: none;
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
    removeStep = (event, steps, where) => {
        event.stopPropagation();
        const step = steps.find(step => { return (step.uid === parseInt(where, 10)) });
        if (step && step.cards && step.cards.length > 0) {
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
        return (<EditStepDialog open={this.props.open} closeOnDimmerClick={false} onClose={this.onClose}>
            <div onClick={this.onClose} className="close-box">
                <Cross angle={45} color={"#FFFFFF"} weight={2} width={32.36} height={32.36} />
            </div>
            <div className="edit-step-name-title">단계이름 수정</div>
            <div className="edit-step-name-content-container">
                <div className="edit-step-name-content-title">제목</div>
                <div className="edit-step-name-content-input-wrapper">
                    <input className="edit-step-name-content-input-style" name="title" onChange={this.onChange} value={this.state.title || ""} />
                </div>
            </div>
            <div className="edit-step-name-button-container">
                <div className="edit-step-name-button-submit" onClick={this.onSubmit} >수정하기</div>
                <div className="edit-step-name-button-cancel" onClick={(event) => this.removeStep(event, this.props.steps, this.state.where)} >삭제</div>
            </div>
        </EditStepDialog >)
    }
};

export default EditStepModal;
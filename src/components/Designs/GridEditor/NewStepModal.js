import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'


const NewStepDialog = styled(Modal)`
    max-width: 849px;
    height: 295px;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px #FF0000;
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
`
class NewStepModal extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "" };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    onChange(event) {
        const target = event.target
        this.setState({ [target.name]: target.value })
    }
    onSubmit() {
        if (!this.state.title) {
            return;
        }
        let data = this.state;
        const step = this.props.DesignDetailStep;
        if (step && step.length > 0) {
            data.order = step.length;
        } else {
            data.order = 0;
        }
        this.props.newStep(data);
        this.onClose();
    }
    onClose() {
        this.setState({ title: "" });
        this.props.close();
    }
    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }
    render() {
        return (<NewStepDialog onKeyDown={this.handleKeyDown} open={this.props.open} onClose={this.onClose}>
            <div onClick={this.onClose} style={{ position: "absolute", width: "max-content", top: "10px", right: "15px" }}>
                <Cross angle={45} color={"#000000"} weight={2} width={32} height={32} />
            </div>
            <div style={{ width: "62px", height: "29px", lineHeight: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left", marginTop: "43.5px", marginLeft: "109.5px" }}>새 단계</div>
            <div style={{ display: "flex", width: "575.5px", marginTop: "40px", marginLeft: "109.5px" }}>
                <div style={{ width: "40px", height: "29px", lineHeight: "52px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left" }}>제목</div>
                <div style={{ width: "505.5px", height: "56px", borderRadius: "5px", marginLeft: "34px", backgroundColor: "#EFEFEF" }}>
                    <input name="title" onChange={this.onChange} autoFocus="true" style={{ width: "100%", height: "100%", paddingTop: "16px", paddingRight: "10px", paddingBottom: "16px", paddingLeft: "10px", border: "none", backgroundColor: "transparent", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300" }} value={this.state.title} />
                </div>
            </div>
            <div className="edit-step-name-button-container">
                <div className="edit-step-name-button-submit" onClick={this.onSubmit} >생성하기</div>
                <div className="edit-step-name-button-cancel" onClick={this.onClose} >취소</div>
            </div>
        </NewStepDialog>)
    }
}

export default NewStepModal;
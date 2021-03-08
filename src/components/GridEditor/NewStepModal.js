import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
import market_style from "market_style";

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 576px;
    min-width: 230px;
    margin-top: 40px;
    margin-left: 110px;
    @media only screen and (min-width: 0px) and (max-width: 680px) {
        margin-left: 25px;
    }
    .title {
        width: 50px;
        line-height: 52px;
        margin-right: 10px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size:${market_style.font.size.normal3};
        font-weight: 500;
        text-align: left;
    }
    .wrapper {
        width: 510px;
        height: 56px;
        border-radius: 5px;
        margin-left: auto;
        margin-right: 25px;
        background-color: #EFEFEF;
        .input-tag {
            width: 100%;
            height: 100%;
            padding-top: 16px;
            padding-right: 10px;
            padding-bottom: 16px;
            padding-left: 10px;
            border: none;
            background-color: transparent;
            font-size:${market_style.font.size.normal3};
            font-family: Noto Sans KR;
            font-weight: 300;
            outline:none;
        }
        @media only screen and (min-width: 0px) and (max-width: 680px) {
            width: 200px;
            margin-left: 15px;
        }
    }
`;
const TitleWrapper = styled.div`
    width: 62px;
    height: 29px;
    line-height: 29px;
    color: #707070;
    font-family: Noto Sans KR;
    font-size:${market_style.font.size.normal3};
    font-weight: 500;
    text-align: left;
    margin-top: 45px;
    margin-left: 110px;
    @media only screen and (min-width: 0px) and (max-width: 680px) {
        margin-left: 50px;
    }
`;
const NewStepDialog = styled(Modal)`
    min-width: 320px;
    max-width: 849px;
    height: 295px;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px #FF0000;
    .close-box {
        position: absolute;
        width: max-content;
        top: 10px;
        right: 15px;
    }
    .edit-step-name-button-container {
        display: flex;
        margin-top: 38px;

        .edit-step-name-button-submit {
            margin-left: auto;
            text-align: middle;
            color: #FF0000;
            font-size:${market_style.font.size.normal3};
            font-weight: 500;
            font-family: Noto Sans KR;
            line-height: 40px;
            border-bottom: 1.5px solid #FF0000;
            border:1px splid black;
            cursor: pointer;
        }
        .edit-step-name-button-cancel {
            margin-left: 25px;
            margin-right: 75px;
            width: max-content;
            border: none;
            background: none;
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
        const step = this.props.steps;
        if (step && step.length > 0) {
            data.order = step.length;
        } else {
            data.order = 0;
        }
        this.props.newStep({ where: step ? step.length : 0, title: this.state.title });
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
            <div onClick={this.onClose} className="close-box">
                <Cross angle={45} color={"#000000"} weight={2} width={32} height={32} />
            </div>
            <TitleWrapper>새 단계</TitleWrapper>
            <InputWrapper>
                <div className="title">제목</div>
                <div className="wrapper">
                    <input className="input-tag" name="title" onChange={this.onChange} autoComplete="off" autoFocus={true} value={this.state.title} />
                </div>
            </InputWrapper>
            <div className="edit-step-name-button-container">
                <div className="edit-step-name-button-submit" onClick={this.onSubmit} >생성하기</div>
                <div className="edit-step-name-button-cancel" onClick={this.onClose} >취소하기</div>
            </div>
        </NewStepDialog>)
    }
}

export default NewStepModal;
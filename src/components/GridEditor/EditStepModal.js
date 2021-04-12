import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
// import {confirmAlert} from "react-confirm-alert";
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
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
        }
        @media only screen and (min-width: 0px) and (max-width: 680px) {
            width: 200px;
            margin-left: 15px;
        }
    }
`;
const TitleWrapper = styled.div`
    width: 120px;
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
const StepDialog = styled(Modal)`
        min-width: 320px;
        max-width: 800px;
        height: 203px;
        border-radius: 20px !important;
        background-color: #FFFFFF;
        box-shadow: 5px 5px 10px #00000029;
        padding:20px 33px;
        .header_{
            width:100%;
            display:flex;
            justify-content:space-between;
            align-items:center;
            .header_text{
                font-size:${market_style.font.size.normal1};
                font-weight:500;
                color:black;
            }
            .blankbox{
                width:28px;
            }
        }
        .row{
            width:100%;
            display:flex;
            align-items:center;
            margin-top:30px;
            margin-bottom:40px;
            .label_{
                width:78px;
                font-family:Noto Sans KR,Bold;
                font-size:${market_style.font.size.small1};
            }
            .input_style{
                width:100%;
                height:31px;
                background-color:#e9e9e9;
                border-radius:10px;
                padding:5px 20px;
                border:none;
                outline:none;
            }
        }
        .button_container{
            width:100%;
            display:flex;
            justify-content:center;
            align-items:center;
            .btn_Style{
                width:150px;
                height:30px;
                display:flex;
                justify-content:center;
                align-items:center;
                margin:0px 10px;
                cursor:pointer;
            }
            .red{
                background-color:red;
                color:white;
            }
            .white{
                background-color:white;
                border:1px solid #707070;
                color:#707070;
            }
        }
    // min-width: 320px;
    // max-width: 849px;
    // height: 295px;
    // border-radius: 5px;
    // background-color: #FFFFFF;
    // box-shadow: 0px 3px 6px #FF0000;
    // .close-box {
    //     position: absolute;
    //     width: max-content;
    //     top: 10px;
    //     right: 15px;
    // }
    // .edit-step-name-button-container {
    //     display: flex;
    //     margin-top: 38px;

    //     .edit-step-name-button-submit {
    //         margin-left: auto;
    //         text-align: middle;
    //         color: #FF0000;
    //         font-size:${market_style.font.size.normal3};
    //         font-weight: 500;
    //         font-family: Noto Sans KR;
    //         line-height: 40px;
    //         border-bottom: 1.5px solid #FF0000;
    //         border:1px splid black;
    //         cursor: pointer;
    //     }
    //     .edit-step-name-button-cancel {
    //         margin-left: 25px;
    //         margin-right: 75px;
    //         width: max-content;
    //         border: none;
    //         background: none;
    //         height: 40px;
    //         line-height: 40px;
    //         color: #707070;
    //         padding-bottom: 1.5px;
    //         border-bottom: 1.5px solid #707070;
    //         font-size:${market_style.font.size.normal3};
    //         font-weight: 500;
    //         font-family: Noto Sans KR;
    //         text-align: left;
    //         cursor: pointer;
    //     }
    // }
`;

class EditStepModal extends Component {
    state = { uid: this.props.uid || null, title: this.props.title, where: this.props.where }
    onChange = (event) => {
        const target = event.target
        this.setState({ [target.name]: target.value })
    }
    onSubmit = async() => {
        if (!this.state.title) {
            this.props.close();
            return;
        }
        if (this.state.title === this.props.title) {
            await alert("제목이 변경되지 않았습니다.");
            return;
        }
        this.props.EditStep({ uid: this.state.uid, title: this.state.title, where: this.state.where });
    }
    onClose = () => {
        this.props.close()
    }
    removeStep = async (event, steps, where) => {
        event.stopPropagation();
        const step = steps.find(step => step.uid === parseInt(where, 10));
        if (step && step.cards && step.cards.length > 0) {
            await alert("카드가 존재하는 단계는 삭제할 수 없습니다.");
            return;
        }
        // const confirm = window.confirm("단계를 삭제하시겠습니까?");
        if (await confirm("단계를 삭제하시겠습니까?")) {
            this.props.RemoveStep(step.uid)
        }
        // confirmAlert(options("단계를 삭제하시겠습니까?",()=>{this.props.RemoveStep(step.uid)},event));

        this.onClose();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.setState({ title: nextProps.title, where: nextProps.where });
            return true;
        }
    }
    render() {
        return (
            <StepDialog onKeyDown={this.handleKeyDown} open={this.props.open} onClose={this.onClose}>
                <div className="header_">
                    <div className="blankbox"/>
                    <div className="header_text">새 단계</div>
                    <div className="blankbox" onClick={this.onClose}>
                        <Cross style={{cursor:"pointer"}} angle={45} color={"#000000"} weight={1} width={20} height={20}/>
                    </div>
                </div>
                <div className="row">
                        <div className="label_">제목</div>
                        <input className="input_style" name="title" onChange={this.onChange} autoComplete="off" value={this.state.title || ""} />
                </div>
                <div className="button_container">
                    <div className="btn_Style red" onClick={this.onSubmit}>수정하기</div>
                    <div className="btn_Style white" onClick={(event) => this.removeStep(event, this.props.steps, this.state.where)} >삭제하기</div>
                </div>
                {/* <div onClick={this.onClose} className="close-box">
                    <Cross angle={45} color={"#000000"} weight={2} width={32} height={32} />
                </div>
                <TitleWrapper>단계이름 수정</TitleWrapper>
                <InputWrapper>
                    <div className="title">제목</div>
                    <div className="wrapper">
                        <input className="input-tag" name="title" onChange={this.onChange} autoComplete="off" value={this.state.title || ""} />
                    </div>
                </InputWrapper>
                <div className="edit-step-name-button-container">
                    <div className="edit-step-name-button-submit" onClick={this.onSubmit} >수정하기</div>
                    <div className="edit-step-name-button-cancel" onClick={(event) => this.removeStep(event, this.props.steps, this.state.where)} >삭제하기</div>
                </div> */}
            </StepDialog>
        )
    }
};

export default EditStepModal;
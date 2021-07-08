import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const NewStepDialog = styled(Modal)`
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
`;

const NewStepDialog_mobile = styled(Modal)`
    margin:0px 10px;
    width:100%;
    height:162px;
    border-radius:10px !important;
    padding:20px 10px;
    .title{
        width:100%;
        text-align:center;
        font-size:${market_style.font.size.small1};
        color:black;
    }
    .blankbox{
        position:absolute;
        right:10px;
        top:15px;
    }
    .marginBottom{
        margin-bottom:20px;
    }
    .row{
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .label{
        width:48px;
        font-size:${market_style.font.size.small1};
        font-weight:500;
    }
    .input_style{
        width:100%;
        height:31px;
        border-radius:10px;
        font-family:Noto Sans KR;
        font-size:${market_style.font.size.mini2};
        background-color:#E9E9E9;
        outline:none;
        border:0px;
        padding: 5px 20px 4px 20px ;
    }
    .button{
        width:160px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:${market_style.font.size.small1};
        font-weight:500;
        border-radius:10px;
    }
    .red{
        background-color:red;
        color:white;
    }
    .grey{
        background-color:#707070;
        color:white;
    }
    .marginRight{
        margin-right:15px;
    }
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
            <React.Fragment>
                {
                    window.innerWidth>=500?
                    <NewStepDialog onKeyDown={this.handleKeyDown} open={this.props.open} onClose={this.onClose}>
                    <div className="header_">
                        <div className="blankbox"/>
                        <div className="header_text">단계 이름 수정</div>
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
                    </NewStepDialog>
                    :
                    <NewStepDialog_mobile onKeyDown={this.handleKeyDown} open={this.props.open} onClose={this.onClose}>
                    <div className="title marginBottom">단계 이름 수정</div>
                    <div className="blankbox" onClick={this.onClose}>
                        <Cross style={{cursor:"pointer"}} angle={45} color={"#000000"} weight={1} width={20} height={20}/>
                    </div>
                    <div className="row marginBottom">
                        <div className="label">제목</div>
                        <input className="input_style" name="title" onChange={this.onChange} autoComplete="off" value={this.state.title || ""} />
                    </div>
                    <div className="row">
                        <div onClick={this.onSubmit} className="button red marginRight">수정하기</div>
                        <div onClick={(event) => this.removeStep(event, this.props.steps, this.state.where)}  className="button grey">삭제하기</div>
                    </div>
                    </NewStepDialog_mobile>
                }
            </React.Fragment>

        )
    }
};

export default EditStepModal;
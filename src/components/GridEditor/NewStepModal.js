import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
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
        return (
        <React.Fragment>
            {
                window.innerWidth>=500?
                <NewStepDialog onKeyDown={this.handleKeyDown} open={this.props.open} onClose={this.onClose}>
                <div className="header_">
                    <div className="blankbox"/>
                    <div className="header_text">새 단계</div>
                    <div className="blankbox" onClick={this.onClose}>
                        <Cross style={{cursor:"pointer"}} angle={45} color={"#000000"} weight={1} width={20} height={20}/>
                    </div>
                </div>
                <div className="row">
                        <div className="label_">제목</div>
                        <input className="input_style" name="title" onChange={this.onChange} autoComplete="off" autoFocus={true} value={this.state.title} />
                </div>
                <div className="button_container">
                    <div className="btn_Style red" onClick={this.onSubmit}>등록하기</div>
                    <div className="btn_Style white" onClick={this.onClose}>취소하기</div>
                </div>
                </NewStepDialog>
                :
                <NewStepDialog_mobile onKeyDown={this.handleKeyDown} open={this.props.open} onClose={this.onClose}>
                    <div className="title marginBottom">새 단계</div>
                    <div className="blankbox" onClick={this.onClose}>
                        <Cross style={{cursor:"pointer"}} angle={45} color={"#000000"} weight={1} width={20} height={20}/>
                    </div>
                    <div className="row marginBottom">
                        <div className="label">제목</div>
                        <input className="input_style" name="title" onChange={this.onChange} autoComplete="off" autoFocus={true} value={this.state.title} />
                    </div>
                    <div className="row">
                        <div onClick={this.onSubmit} className="button red marginRight">등록하기</div>
                        <div  onClick={this.onClose} className="button grey">취소하기</div>
                    </div>
                </NewStepDialog_mobile>
            }
        </React.Fragment>        
        )
    }
}

export default NewStepModal;
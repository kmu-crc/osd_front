import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal, Dropdown } from 'semantic-ui-react';


const ReOrderStepDialog = styled(Modal)`
   min-width: 320px;
   max-width: 849px;
   border-radius: 5px;
   background-color: #FFFFFF;
   box-shadow: 0px 3px 6px #FF0000;
   padding: 15px;

   .close-box {
     position: absolute;
     width: max-content;
     top: 10px;
     right: 15px;
   }
   
    .body{
        font-size: 16px;
        font-family: Noto Sans KR;
        color: #707070;
        font-weight: 500;

        .txt {
            font-size: 2 rem;
            margin-top: 10px;
        }
        .current {
            width: max-content;
            padding: 10px 5px;
            background-color: orange;
            color: white;
            margin-left: auto;
            margin-right: 10px;
        }
        .dropdown {
            width: max-content;
            margin-left: auto;
        }
        .info {
            color: red;
            font-weight: 300;
            font-size: .9 rem;
        }
    }

   .footer-buttons {
     display: flex;
     margin-top: 10px;

      .submit {
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
      .cancel {
        margin-left: 25px;
        margin-right: 25px;
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
const DropDownWrapper = styled(Dropdown)`
  height: 56px;
  border-radius: 5px;
  font-size: 1.2 rem;
  background-color: #EFEFEF !important;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 10px;
`;

class StepReOrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = { target: null }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.move = this.move.bind(this);
    }
    onChange(event, { value }) {
        this.setState({ target: { value }.value });
    }
    move(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    }
    onSubmit() {
        const { current, options } = this.props;
        const { target } = this.state;
        const newary = [...options];

        this.move(newary, current, target);
        let jobs = [];
        newary.forEach((element, idx) => {
            if (element.value !== idx) {
                jobs.push({ uid: element.uid, neworder: idx });
            }
        });
        this.props.reorder(jobs);
        this.onClose();
    }

    onClose() {
        this.props.close();
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    render() {
        const { title, options, open, current } = this.props;
        const { target } = this.state;
        // console.log(options);

        return (<ReOrderStepDialog
            onKeyDown={this.handleKeyDown}
            open={open}
            onClose={this.onClose}>

            <div className="close-box"
                onClick={this.onClose}>
                <Cross angle={45} color={"#000000"} weight={2} width={32} height={32} />
            </div>

            <div className="header">
                {title}이동
            </div>

            <div className="body">
                <div className="txt">현재 위치:</div>
                <div className="current">{current}</div>
                <div className="txt">이동할 위치:</div>
                <div className="dropdown">
                    <DropDownWrapper
                        onChange={this.onChange}
                        options={options}
                        selection
                        name="dropdown1"
                        ref="dropdown1"
                        value={target}
                        placeholder="위치선택" />

                    <div className="info">
                        *이동할 위치를 선택해주세요.</div>
                </div>
            </div>

            <div className="footer-buttons">
                <div className="submit"
                    onClick={this.onSubmit} >
                    저장 </div>
                <div className="cancel"
                    onClick={this.onClose} >
                    취소 </div>
            </div>
        </ReOrderStepDialog>)
    }
}

export default StepReOrderModal;
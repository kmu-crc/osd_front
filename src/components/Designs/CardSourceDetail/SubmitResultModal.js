import React, { Component } from "react";
import styled from "styled-components";
import { Modal } from 'semantic-ui-react'
import Cross from "components/Commons/Cross";

const ModalBox = styled(Modal)`
    width: 873px;
    height: 500px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    opacity: 1;
    position: relative;
    padding: 50px;

    .close-box {
        width: max-content;
        cursor: pointer;
        position: absolute;
        top: 16px;
        right: 16px; 
      }
`

class SubmitResultModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    {/* 
            avg_memory: "0"
            avg_time: "0"
            code: "zxcvxzcv"
            create_date: "2020-12-21T04:36:55.000Z"
            language_id: 1
            message: "main.c:1:1: error: expected ‘=’, ‘,’, ‘;’, ‘asm’ or ‘__attribute__’ at end of input↵ zxcvxzcv↵ ^~~~~~~~↵"
            order: null
            problem_id: 3
            result: "C"
            uid: 50
            user_id: 762
    */}
    const { avg_memory, avg_time, create_date, language_id, message, problem_id, result, uid, user_id } = this.props;
    return (
      <ModalBox open={this.props.open} onClose={this.props.close}>
        <div className="close-box" onClick={this.props.close}>
          <Cross angle={45} color={"#707070"} weight={2} width={25} height={25} />
        </div>
        {avg_memory}
        <br />{avg_time}
        <br />{create_date}
        <br />{language_id}
        <br />{message}
        <br />{problem_id}
        <br />{result}
        <br />{uid}
        <br />{user_id}
      </ModalBox>
    );
  }
}
export default SubmitResultModal;

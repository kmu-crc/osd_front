import React, { Component } from 'react';
import styled from 'styled-components';
import { alert } from "components/Commons/Alert/Alert";
import ButtonOSD from "./ButtonOSD";
import NoticeDialog from "./NoticeDialog";
import BoardDialog from "./BoardDialog";
import ExportExcelFile from './ExportExcelFile';
import host from "config";

const Wrapper = styled.div`
  display: flex;
  font-size: 16px;

  .more {
      margin-left: 25px;
      font-size: 1.2rem;
      color: #F00;
      cursor: pointer;
  }
  .new-notice {
    margin-left: 15px;
    font-size: 0.9rem;
    background-color: #F00;
    border-radius: 10px;
    cursor: pointer; 
    color: white;
    font-weight: 500;
    padding: 2px 5px;
    line-height: 1rem;
  }
`;

export default class GroupNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dialog
      notice: false,
      board: false,
      // export 
      submitStatus: false,
      data: null,
    }
  }
  closeNoticeDialog = () => {
    this.setState({ notice: false });
  }
  closeBoardDialog = () => {
    this.setState({ board: false });
  }
  getExportFile = () => {
    const url = `${host}/group/getSubmitStatus/${this.props.GroupDetail.uid}`;
    fetch(url, {
      headers: { 'Content-Type': 'application/json', "x-access-token": this.props.token },
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        const newdata = data.data.map(content => {
          content.problem_name = JSON.parse(content.content).name;
          delete content.content;
          content.submit_result = content.submit ? content.submit.result === "S" ? "성공" : "실패" : "미제출";
          if (content.submit) {
            const t = content.submit.create_date.split(/[- T Z :]/);
            content.submit_date = `${t[0]}-${t[1]}-${t[2]} ${(parseInt(t[3], 10) + 9).toPrecision(2)}:${t[4]}:${t[5]}`;
          } else {
            content.submit_date = "미제출";
          }
          delete content.submit;
          return content;
        });
        // console.log(newdata);
        // // first sorting - design_id
        // const sorted = newdata.sort((a, b) => (a.design_id > b.design_id) ? 1 : -1)
        //   // second sorting - board_order
        //   .sort((a, b) => (a.board_order > b.board_order) ? 1 : -1)
        //   // third sorting - card_order
        //   .sort((a, b) => (a.card_order > b.card_order) ? 1 : -1);
        // console.log(sorted);
        this.setState({ data: newdata });
        this.setState({ submitStatus: true });
      })
      .catch(e => {
        console.error(e);
      })
  }


  render() {
    const { GroupDetail, userInfo, hasProgrammingDesign } = this.props;
    const { /*dialog*/notice, board, /**/submitStatus, data } = this.state;
    const user_id = userInfo && userInfo.uid;
    console.log(this.props);
    return (<React.Fragment>
      {notice
        ? <NoticeDialog user_id={user_id} group_owner_id = {GroupDetail.user_id}  token={this.props.token} group_id={GroupDetail.uid} open={notice} close={this.closeNoticeDialog} />
        : null}
      {board
        ? <BoardDialog userInfo={userInfo} token={this.props.token} group_id={GroupDetail.uid} open={board} close={this.closeBoardDialog} />
        : null}
      {submitStatus
        ? <ExportExcelFile title={GroupDetail.title} group={GroupDetail} data={data} />
        : null}

      <Wrapper>

        <ButtonOSD onClick={() => this.setState({ notice: true })}>공지사항</ButtonOSD>
        <ButtonOSD onClick={() => this.setState({ board: true })}>게시판</ButtonOSD>

        {user_id === GroupDetail.user_id && hasProgrammingDesign
          ? <ButtonOSD onClick={this.getExportFile}>제출현황보기</ButtonOSD>
          : null}
      </Wrapper>

    </React.Fragment>
    )
  }
};

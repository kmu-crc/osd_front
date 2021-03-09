import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react'
import Cross from "components/Commons/Cross";
import TextController from "components/Designs/CardSourceDetail/TextControllerPlus.js";
import GroupNoticeListContainer from "containers/Groups/GroupNoticeListContainer";
import GroupBoardListContainer from "containers/Groups/GroupBoardListContainer";
import opendesign_style from "opendesign_style";
import host from "config";
import ExportExcelFile from "./ExportExcelFile";
import {
  CreateGroupBoardRequest,
  UpdateGroupBoardRequest,
  DeleteGroupBoardRequest,
  GetGroupBoardRequest,
} from "redux/modules/group";
import noface from "source/thumbnail.png";

// import React, { Component } from 'react';
// import styled from 'styled-components';
import DateFormat from "modules/DateFormat";
import {
  GetBoardCommentRequest,
  CreateGroupBoardCommentRequest,
  UpdateGroupBoardCommentRequest,
  DeleteGroupBoardCommentRequest,
} from "redux/modules/group";
import { confirm } from 'components/Commons/Confirm/Confirm';
import Comment from 'components/Commons/Comment';
import { alert } from "components/Commons/Alert/Alert";

class BoardCommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: [], };
  }
  refresh = (group_id, board_id) => {
    GetBoardCommentRequest(group_id, board_id)
      .then(comment => {
        this.setState({ comment: comment.data });
      })
      .catch(e => {
        console.error(e);
      });
  }
  componentDidMount() {
    const { group_id, board_id } = this.props;
    this.refresh(group_id, board_id);
  }
  comment = (data) => {
    const { group_id, board_id, token } = this.props;
    const obj = { comment: data.comment, parent: data.d_flag }
    CreateGroupBoardCommentRequest(obj, group_id, board_id, token)
      .then((result) => {
        if (result.success)
          this.refresh(group_id, board_id);
        else throw result.success
      })
      .catch(_ => alert("댓글달기를 하지 못하였습니다."));
  }
  removecomment = (id) => {
    const { group_id, board_id, token } = this.props;
    console.log(id, group_id, board_id, token);
    DeleteGroupBoardCommentRequest(id, group_id, board_id, token)
      .then((result) => {
        if (result.success)
          this.refresh(group_id, board_id);
        else throw result.success
      })
      .catch(_ => alert("댓글을 지우지 못하였습니다."));
  }
  editcomment = (data) => {
    const { group_id, board_id, token } = this.props;
    UpdateGroupBoardCommentRequest(data, group_id, board_id, token)
      .then((result) => {
        if (result.success)
          this.refresh(group_id, board_id);
        else throw result.success
      })
      .catch(_ => alert("댓글을 수정하지 못하였습니다."));
  }

  render() {
    let parentComments = [];
    let comments = [];
    const { comment } = this.state;
    if (comment && comment.length > 0) {
      parentComments = comment.filter(item => item.parent == null);
      comments = parentComments.map(parent => {
        let replies = comment.filter(item => item.parent === parent.uid);
        return { ...parent, replies };
      })
    }
    console.log(comments);
    return (<div>
      <Comment
        comments={comments}
        my={this.props.userInfo}
        comment={this.comment}
        removeComment={this.removecomment} />
      {/* {comment && comment.length > 0 */}
      {/* ? comment.map(item => <div key={item.uid}>{item.comment}</div>) */}
      {/* : ""} */}
    </div>)
  }
}

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
const NoticeModal = styled(Modal)`
    padding-top: 57px;
    padding-left: 63px;
    padding-right: 63px;
    width: 936px;
    min-height: 506px;

    .close-box {
      cursor:pointer;
      position: absolute;
      right: 18px;
      top: 18px;
      width: 14px;
      height: 14px;
    }

    .header-txt {
      display: flex;
      margin-bottom: 18px;

      h2 {
        font-size: 20px;
        width: max-content;
        height: 29px;
        text-align: left;
        font: normal normal medium 20px/35px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
      }

      .left {
        margin-left: auto;
        margin-right: 25px;
      }
      .new-notice {
        font-size: 0.9rem;
        background-color: #F00;
        border-radius: 10px;
        cursor: pointer; 
        color: white;
        font-weight: 500;
        padding: 5px 10px;

      }
    }
    .body-container {
        width: 810px;
        .bold {
            font-weight: 500;
        }
        .inputText{
            width: 350px;
            margin-left: 67px;
            padding-left: 22px;
            padding-right: 22px;
            font-size: 20px;
            font-weight:300;
            font-family:Noto Sans KR;
            line-height:29px;
            color:#707070;
            border:none;
            border-radius:5px;
            outline:none;
            background-color:#EFEFEF;
          }
        .title-container {
            display: flex;

            margin-bottom: 35px;
        }
    }
    .header-edit-button {
      margin-left: auto;
      margin-right: 10px;
      width: max-content;
      font-family: Noto Sans KR;
      font-size: 17px;
      color: #707070;
      font-weight: 900;
      line-height: 29px;
      .edit-btn {
        border: none;
        background: none;
        width: max-content;
        height: 40px;
        line-height: 40px;
        color: #FF0000;
        padding-bottom: 1.5px;
        border-bottom: 1.5px solid #FF0000;
        font-size: 20px;
        font-weight: 500;
        font-family: Noto Sans KR;
        text-align: left;
        cursor: pointer;
      }
      .cancel-btn {
        margin-left: 25px;
        border: none;
        background: none;
        width: max-content;
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
    .button-container {
        display: flex;
        text-align: center;
        width: 100%;
        justify-content: flex-end;
        margin-top: 25px;

        .submit {
            border-radius: 10px;
            padding: 10px;
            background-color: red;
            color: white;
            width: 75px;
            margin-left: 10px;
            cursor: default;
        }
        .cancel {
            border-radius: 10px;
            padding: 10px;
            background-color: #707070;
            color: white;
            width: 75px;
            margin-left: 10px;
            cursor: default;
        }
    }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
    and (max-width : ${1024}px) { 
        min-width:100%;
     }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) { 
        min-width:100%;
     }
`;

class GroupNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeDialog: false,
      noticeDetail: false,
      newNoticeDialog: false,
      editNoticeDialog: false,

      //
      notice: this.props.lastest,
      // new-notice
      "notice-title": "",
      "notice-content": "",
      reloadnoticecontainer: 0,
      // new-board
      "board-title": "",
      "board-content": "",
      reloadboardcontainer: 0,

      // mode
      edit: "view", //"edit"

      // export data
      data: null,
    }
    this.requestNewNotice = this.requestNewNotice.bind(this);
    this.requestEditNotice = this.requestEditNotice.bind(this);
    this.requestDelNotice = this.requestDelNotice.bind(this);
    this.onChangeNoticeContent = this.onChangeNoticeContent.bind(this);
    this.onChangeBoardContent = this.onChangeBoardContent.bind(this);
    this.getExportFile = this.getExportFile.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.lastest != prevProps.lastest) {
      this.setState({ notice: this.props.lastest });
    }
  }
  onChangeNoticeContent(data) {
    this.setState({ "notice-content": data.content });
  }
  onChangeBoardContent(data) {
    this.setState({ "board-content": data.content });
  }
  getExportFile() {
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
        this.setState({ data: newdata })
      })
      .catch(e => {
        console.error(e);
      })
  }
  requestDelNotice(notice_id) {
    this.props.DeleteGroupNoticeRequest &&
      this.props.token &&
      this.props.DeleteGroupNoticeRequest(this.props.token, { notice_id: notice_id })
        .then((data) => {
          this.setState({ reloadnoticecontainer: (this.state.reloadnoticecontainer + 1) % 100 });
          this.props.init && this.props.init();
          // alert("공지사항이 삭제되었습니다.");
        })
        .catch(() => {
          alert("삭제하지 못하였습니다.");
        });
    this.setState({
      editNoticeDialog: false,
      noticeDialog: true,
      noticeDetail: false,
      newNoticeDialog: false,
      editNoticeDialog: false,
    });
  }
  requestEditNotice() {
    if (
      this.state.notice.title === this.state["notice-title"] &&
      this.state.notice.content === this.state["notice-content"]
    ) {
      alert("변경된 사항이 없습니다.");
      return;
    }
    const obj = { notice_id: this.state.notice.uid, title: this.state["notice-title"], content: this.state["notice-content"] };
    this.props.UpdateGroupNoticeRequest &&
      this.props.token &&
      this.props.UpdateGroupNoticeRequest(this.props.token, obj)
        .then(() => {
          this.setState({ reloadnoticecontainer: (this.state.reloadnoticecontainer + 1) % 100 });
          this.props.init && this.props.init();
          // alert("공지사항 수정을 완료하였습니다.");
        })
        .catch(() => {
          alert("작성을 실패하였습니다.");
        });

    this.setState({
      noticeDialog: false,
      noticeDetail: false,
      newNoticeDialog: false,
      editNoticeDialog: false,
      notice: null,
      "notice-title": "",
      "notice-content": ""
    });
  }
  requestNewNotice() {
    if (this.state["notice-title"] === "") {
      alert("공지사항의 제목을 입력해주세요.");
      return;
    }
    if (this.state["notice-content"] === "") {
      alert("공지사항의 내용을 입력해주세요.");
      return;
    }
    const obj = { group_id: this.props.id, title: this.state["notice-title"], content: this.state["notice-content"] };

    this.props.CreateGroupNoticeRequest &&
      this.props.token &&
      this.props.CreateGroupNoticeRequest(this.props.token, obj)
        .then(() => {
          this.setState({ reloadnoticecontainer: (this.state.reloadnoticecontainer + 1) % 100 });
          this.props.init && this.props.init();
          // alert("공지사항 작성을 완료하였습니다.");
        })
        .catch(() => {
          alert("작성을 실패하였습니다.");
        });

    this.setState({
      newNoticeDialog: false,
      noticeDialog: true,
      "notice-title": "",
      "notice-content": ""
    })
  }
  requestNewBoard() {
    if (this.state["board-title"] === "") {
      alert("글의 제목을 입력해주세요.");
      return;
    }
    if (this.state["board-content"] === "") {
      alert("글의 내용을 입력해주세요.");
      return;
    }
    if (this.props.userInfo == null || this.props.token == null) {
      return;
    }
    const obj = { user_id: this.props.userInfo.uid, title: this.state["board-title"], content: this.state["board-content"] };

    CreateGroupBoardRequest(obj, this.props.id, this.props.token)
      .then(() => {
        this.setState({ reloadboardcontainer: (this.state.reloadboardcontainer + 1) % 100 });
      })
      .catch(() => {
        alert("작성에 실패하였습니다.");
      });

    this.setState({
      newBoardDialog: false,
      boardDialog: true,
      "board-title": "",
      "board-content": ""
    })
  }
  requestDelBoard(board_id) {
    if (!(this.props.token && this.props.userInfo && board_id)) {
      return;
    }
    DeleteGroupBoardRequest(this.props.id, board_id, this.props.token)
      .then(result => {
        console.log(result);
        if (result.success) {
          this.setState({ reloadboardcontainer: (this.state.reloadboardcontainer + 1) % 100 });
        } else {
          throw result.success;
        }
      })
      .catch(_ => {
        alert("삭제하지 못하였습니다.");
      });
    this.setState({
      editBoardDialog: false,
      boardDialog: true,
      boardDetail: false,
      newBoardDialog: false,
      editBoardDialog: false,
    });
  }
  requestEditBoard() {
    if (!(this.props.token && this.props.userInfo && this.state.board)) {
      return;
    }

    if (
      this.state.board.title === this.state["board-title"] &&
      this.state.board.content === this.state["board-content"]
    ) {
      alert("변경된 사항이 없습니다.");
      return;
    }
    const obj = { title: this.state["board-title"], content: this.state["board-content"] };

    UpdateGroupBoardRequest(obj, this.props.id, this.state.board.uid, this.props.token)
      .then((result) => {
        if (result.success) {
          this.setState({ reloadboardcontainer: (this.state.reloadboardcontainer + 1) % 100 });
        } else {
          throw result.success;
        }
      })
      .catch((_) => {
        alert("작성을 실패하였습니다.");
      });

    this.setState({
      boardDialog: true,
      boardDetail: false,
      newBoardDialog: false,
      editBoardDialog: false,
      board: null,
      "board-title": "",
      "board-content": ""
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.lastest !== this.props.lastest) {
      return true;
    }
  }


  render() {
    const { lastest, count, GroupDetail, userInfo, hasProgrammingDesign } = this.props;
    const user_id = userInfo && userInfo.uid;

    return (<React.Fragment>

      {/*  */}
      {this.state.noticeDialog
        ? <NoticeModal
          open={this.state.noticeDialog}
          onClose={() => this.setState({ noticeDialog: false })}>

          <div className="close-box" onClick={() => this.setState({ noticeDialog: false })} >
            <Cross angle={45} color={"#707070"} weight={2} width={14} height={14} />
          </div>

          <div className="header-txt">
            <h2>전체</h2>
            <div className="left">
              {user_id === this.props.GroupDetail.user_id ?
                <div
                  className="new-notice"
                  onClick={() => { this.setState({ newNoticeDialog: true }) }}>
                  공지사항</div> : null}
            </div>
          </div>

          <div className="body-container">
            <GroupNoticeListContainer
              id={this.props.id} open={(detail) => {
                this.setState({ noticeDetail: true, notice: detail })
              }} reload={this.state.reloadnoticecontainer} />
          </div>
        </NoticeModal>
        : null}

      {/*  */}
      {this.state.noticeDetail
        ? <NoticeModal open={this.state.noticeDetail} onClose={() => this.setState({ noticeDetail: false })}>
          <div className="close-box" onClick={() => this.setState({ noticeDetail: false })} >
            <Cross angle={45} color={"#000000"} weight={3} width={20} height={20} />
          </div>

          {this.props.userInfo && (this.props.userInfo.uid === this.props.GroupDetail.user_id)
            ? <div className="header-edit-button">
              <React.Fragment>
                <button
                  className="edit-btn"
                  onClick={() =>
                    this.setState({
                      editNoticeDialog: !this.state.editNoticeDialog,
                      "notice-title": this.state.notice.title,
                      "notice-content": this.state.notice.content,
                      // title: .title,
                      // content: .content
                    })}>수정</button>

                <button className="cancel-btn"
                  onClick={() =>
                    // alert(this.state.notice.uid)}
                    this.requestDelNotice(this.state.notice.uid)}
                >삭제</button>
              </React.Fragment>
            </div>
            : null}
          <Modal.Content>
            <div>
              <h2>{this.state.notice.title}</h2>
            </div>
            <div className="body-container">
              <hr />
              <div dangerouslySetInnerHTML={{ __html: this.state.notice.content }}></div>
            </div>
          </Modal.Content>
        </NoticeModal>
        : null}

      {this.state.newNoticeDialog
        ? <NoticeModal
          open={this.state.newNoticeDialog} onClose={() => this.setState({ newNoticeDialog: false })}>
          <div className="close-box" onClick={() => this.setState({ newNoticeDialog: false })} >
            <Cross angle={45} color={"#000000"} weight={3} width={20} height={20} />
          </div>
          <div className="header-txt"><p style={{ fontSize: "24px", fontWeight: "500", color: "#707070", fontFamily: "Noto Sans KR", }}>공지사항 등록하기</p></div>
          <Modal.Content>
            {/* <div className="header-txt"> */}
            {/* <h4>새로운 공지사항을 등록합니다.</h4> */}
            {/* </div> */}
            <div className="body-container">
              <div className="title-container">
                <div>
                  <h3 style={{ color: "#707070" }}>제목</h3>
                </div>
                <input
                  type="text" className="inputText"
                  value={this.state["notice-title"]}
                  onChange={event =>
                    this.setState({ "notice-title": event.target.value })} />
              </div>
              <div>
                <TextController
                  item={{ content: "" }}
                  getValue={(data) =>
                    this.onChangeNoticeContent(data)} />
              </div>
            </div>
            <div className="button-container">
              <div onClick={() => this.requestNewNotice()}
                className="submit">
                등록</div>
              <div onClick={() => this.setState({ newNoticeDialog: false, "notice-title": "", "notice-content:": "" })}
                className="cancel">
                취소</div>
            </div>
          </Modal.Content>
        </NoticeModal>
        : null}

      {this.state.editNoticeDialog
        ? <NoticeModal
          open={this.state.editNoticeDialog}
          onClose={() => this.setState({ newNoticeDialog: false })}>

          <div className="close-box" onClick={() => this.setState({ newNoticeDialog: false })} >
            <Cross angle={45} color={"#000000"} weight={3} width={20} height={20} />
          </div>

          <div className="header-txt">
            <p style={{ fontSize: "24px", fontWeight: "500", color: "#707070", fontFamily: "Noto Sans KR", }}>공지사항 수정하기</p>
          </div>

          <Modal.Content>
            {/* <div className="header-txt"> */}
            {/* <h4>새로운 공지사항을 등록합니다.</h4> */}
            {/* </div> */}
            <div className="body-container">
              <div className="title-container">
                <div>
                  <h3 style={{ color: "#707070" }}>제목</h3>
                </div>
                <input
                  type="text" className="inputText"
                  value={this.state["notice-title"]}
                  onChange={event =>
                    this.setState({ "notice-title": event.target.value })} />
              </div>
              <div>
                <TextController
                  item={{ content: this.state["notice-content"] }}
                  getValue={(data) =>
                    this.onChangeNoticeContent(data)} />
              </div>
            </div>
            <div className="button-container">
              <div onClick={() => this.requestEditNotice()}
                className="submit">
                수정</div>
              <div onClick={() => this.setState({ editNoticeDialog: false, "notice-title": "", "notice-content:": "" })}
                className="cancel">
                취소</div>
            </div>
          </Modal.Content>
        </NoticeModal>
        : null}

      {/* * * * *
      *  BOARD  *
      * * * * * */}
      {this.state.boardDialog
        ? <React.Fragment>
          <NoticeModal
            open={this.state.boardDialog}
            onClose={() => this.setState({ boardDialog: false })}>

            <div className="close-box" onClick={() => this.setState({ boardDialog: false })} >
              <Cross angle={45} color={"#707070"} weight={2} width={14} height={14} />
            </div>

            <div className="header-txt">
              <h2>그룹 게시판</h2>
              <div className="left">
                {this.props.userInfo ?
                  <div
                    className="new-notice"
                    onClick={() => { this.setState({ newBoardDialog: true, boardDialog: false }) }}>
                    글 작성
                    </div> : null}
              </div>
            </div>

            <div className="body-container">
              <GroupBoardListContainer id={this.props.id} open={(detail) => {
                this.setState({ boardDialog: false, boardDetail: true, board: detail })
              }} reload={this.state.reloadboardcontainer} />
            </div>
          </NoticeModal>
        </React.Fragment>
        : null}

      {this.state.boardDetail
        ? <NoticeModal open={this.state.boardDetail} onClose={() => this.setState({ boardDialog: true, boardDetail: false })}>
          <div className="close-box" onClick={() => this.setState({ boardDialog: true, boardDetail: false })} >
            <Cross angle={45} color={"#000000"} weight={3} width={20} height={20} />
          </div>

          {this.props.userInfo && (this.props.userInfo.uid === this.state.board.user_id)
            ? <div className="header-edit-button">
              <React.Fragment>
                <button
                  className="edit-btn"
                  onClick={() =>
                    this.setState({
                      editBoardDialog: !this.state.editBoardDialog,
                      "board-title": this.state.board.title,
                      "board-content": this.state.board.content,
                    })}>수정</button>

                <button className="cancel-btn"
                  onClick={async () => {
                    let AUSure = false;
                    if (this.state.board.comments > 0) {
                      AUSure = confirm("글에 있는 댓글도 지워집니다. 계속 진행하시겠습니까?", "삭제", "취소");
                      if (AUSure) { } else { return; }
                    }
                    this.requestDelBoard(this.state.board.uid);
                  }}>삭제</button>

              </React.Fragment>
            </div>
            : null}
          <Modal.Content>
            <div>
              <h2>{this.state.board.title}</h2>
              <div style={{ display: "flex", flexDirection: "row", color: "#707070" }}>
                <div style={{ height: "25px", lineHeight: "25px", textAlignment: "center", display: "flex", flexDirection: "row", }}>
                  작성자:
                  <div style={{ width: "25px", height: "25px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPoision: "center center", background: `url(${this.state.board.thumbnail || noface})`, backgroundColor: "#707070", borderRadius: "100%", }} />
                  {this.state.board.nick_name}
                </div>
                <div style={{ marginLeft: "auto", }}>
                  {this.state.board.create_time === this.state.board.update_time
                    ? `${DateFormat(this.state.board.create_time)}에 작성`
                    : `${DateFormat(this.state.board.update_time)}에 편집`}
                </div>
              </div>
            </div>
            <hr />
            <div className="body-container">
              <h4>내용</h4>
              <div
                style={{ color: "#707070", fontSize: "1rem", backgroundColor: "#FAFAFA", overflowY: "auto", minHeight: "35%", width: "95%", }}
                dangerouslySetInnerHTML={{ __html: this.state.board.content }} />
            </div>
            <hr />
            <div>
              <h4>댓글</h4>
              <div style={{ overflowY: "auto" }}>
                <BoardCommentContainer
                  token={this.props.token}
                  userInfo={this.props.userInfo}
                  group_id={this.props.id}
                  board_id={this.state.board.uid} />
              </div>
            </div>
          </Modal.Content>
        </NoticeModal>
        : null}

      {this.state.editBoardDialog
        ? <NoticeModal
          open={this.state.editBoardDialog}
          onClose={() => this.setState({ editBoardDialog: false, boardDialog: true })}>

          <div className="close-box" onClick={() => this.setState({ editBoardDialog: false, boardDialog: true })} >
            <Cross angle={45} color={"#000000"} weight={3} width={20} height={20} />
          </div>

          <div className="header-txt">
            <p style={{ fontSize: "24px", fontWeight: "500", color: "#707070", fontFamily: "Noto Sans KR", }}>글 수정하기</p>
          </div>

          <Modal.Content>
            <div className="body-container">
              <div className="title-container">
                <div>
                  <h3 style={{ color: "#707070" }}>제목</h3>
                </div>
                <input
                  type="text"
                  className="inputText"
                  value={this.state["board-title"]}
                  onChange={event => this.setState({ "board-title": event.target.value })} />
              </div>
              <div>
                <TextController
                  item={{ content: this.state["board-content"] }}
                  getValue={(data) => this.onChangeBoardContent(data)} />
              </div>
            </div>
            <div className="button-container">
              <div onClick={() => this.requestEditBoard()}
                className="submit">
                수정</div>
              <div onClick={() => this.setState({ boardDialog: true, editBoardDialog: false, "board-title": "", "board-content:": "" })}
                className="cancel">
                취소</div>
            </div>
          </Modal.Content>
        </NoticeModal>
        : null}

      {this.state.newBoardDialog
        ? <NoticeModal
          open={this.state.newBoardDialog} onClose={() => this.setState({ newBoardDialog: false, boardDialog: true })}>
          <div className="close-box" onClick={() => this.setState({ newBoardDialog: false, boardDialog: true })} >
            <Cross angle={45} color={"#000000"} weight={3} width={20} height={20} />
          </div>
          <div className="header-txt">
            <p style={{ fontSize: "24px", fontWeight: "500", color: "#707070", fontFamily: "Noto Sans KR", }}>그룹 게시판 글 작성</p></div>
          <Modal.Content>
            <div className="body-container">
              <div className="title-container">
                <div>
                  <h3 style={{ color: "#707070" }}>제목</h3>
                </div>
                <input
                  type="text" className="inputText"
                  value={this.state["board-title"]}
                  onChange={event =>
                    this.setState({ "board-title": event.target.value })} />
              </div>
              <div>
                <TextController
                  item={{ content: "" }}
                  getValue={(data) =>
                    this.onChangeBoardContent(data)} />
              </div>
            </div>
            <div className="button-container">
              <div className="submit" onClick={() => this.requestNewBoard()}>
                등록</div>
              <div className="cancel" onClick={() => this.setState({ "board-title": "", "board-content:": "", newBoardDialog: false, boardDialog: true })}>
                취소</div>
            </div>
          </Modal.Content>
        </NoticeModal>
        : null}

      <Wrapper>
        {lastest ?
          <React.Fragment>
            <div onClick={() => this.setState({ noticeDetail: true, notice: lastest })}>
              <div style={{ display: "flex", cursor: "pointer" }}>
                <i className="icon announcement" style={{ fontSize: "20px" }}></i>
                {/* <p style={{ fontWeight: "900" }}>[공지]</p> */}
                <p style={{ marginLeft: "10px" }}>{lastest.title}</p>
              </div>
            </div>

            {count > 1
              ? <div onClick={() => this.setState({ noticeDialog: true })}
                className="more"><p>[더보기]</p></div>
              : null}

          </React.Fragment>
          : null}

        {user_id === GroupDetail.user_id
          ? <div
            className="new-notice"
            onClick={() => { this.setState({ newNoticeDialog: true }) }}>
            <p style={{ color: "white" }}>공지사항</p>
          </div> : null}
        {user_id === GroupDetail.user_id && hasProgrammingDesign && this.state.data == null ?
          <div
            className="new-notice"
            onClick={this.getExportFile}>
            <p style={{ color: "white" }}>제출현황 보기</p>
          </div>
          : null}

        {this.state.data
          ? <ExportExcelFile data={this.state.data} />
          : null}

        {<div
          className="new-notice"
          onClick={() => this.setState({ boardDialog: true })} >
          <p style={{ color: "white" }}>게시판</p>
        </div>}
      </Wrapper>


    </React.Fragment>
    )
  }
};

export default GroupNotice

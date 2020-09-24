import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react'
import Cross from "components/Commons/Cross";
import TextController from "components/Designs/CardSourceDetail/TextControllerPlus.js";
import GroupNoticeListContainer from "containers/Groups/GroupNoticeListContainer";
import opendesign_style from "opendesign_style";

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
     height: 20px;
     background-color: #F00;
     border-radius: 10px;
     cursor: pointer; 
     color: white;
     font-weight: 500;
     padding: 0px 5px;
  }
`;
const NoticeModal = styled(Modal)`
    padding-top: 57px;
    padding-left: 63px;
    padding-right: 63px;
    width: 936px;
    height: 506px;

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
        width: 37px;
        height: 29px;
        text-align: left;
        font: normal normal medium 20px/35px Noto Sans CJK KR;
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

      //
      notice: this.props.lastest,
      // new-notice
      "notice-title": "",
      "notice-content": "",
      reloadnoticecontainer: 0,

    }
    this.requestNewNotice = this.requestNewNotice.bind(this);
    this.onChangeNoticeContent = this.onChangeNoticeContent.bind(this);

  }
  onChangeNoticeContent(data) {
    this.setState({ "notice-content": data.content });
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
          alert("공지사항 작성을 완료하였습니다.");
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
  render() {
    const { lastest, count, GroupDetail, userInfo } = this.props;
    const user_id = userInfo && userInfo.uid;
    console.log('groupnotice.js:,', this.props);
    return (
      <React.Fragment>
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
                    새 공지사항 등록하기</div> : null}
              </div>
            </div>

            <div className="body-container">
              <GroupNoticeListContainer id={this.props.id} open={(detail) => {
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
            <div className="header-edit-button">
              {this.props.edit ?
                <React.Fragment>
                  {/* <button className="edit-btn" onClick={() => this.setState({ edit: !this.state.edit, title: card.title, content: card.content })} >수정</button> */}
                  {/* <button className="cancel-btn" onClick={(event) => this.removeCard(event)} >삭제</button> */}
                </React.Fragment> : null}
            </div>
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


        <Wrapper>

          {lastest ?
            <React.Fragment>
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => this.setState({ noticeDetail: true })}>
                <i className="icon announcement" style={{ fontSize: "20px" }}></i>
                {/* <p style={{ fontWeight: "900" }}>[공지]</p> */}
                <p style={{ marginLeft: "10px" }}>{lastest.title}</p>
              </div>

              {count > 1
                ? <div onClick={() => this.setState({ noticeDialog: true })}
                  className="more">[더보기]</div>
                : null}

            </React.Fragment>
            : null}

          {user_id === GroupDetail.user_id ?
            <div
              className="notice-box new-notice"
              onClick={() => { this.setState({ newNoticeDialog: true }) }}>
              새 공지사항 등록하기</div> : null}


        </Wrapper>
      </React.Fragment>
    )
  }
}
export default GroupNotice

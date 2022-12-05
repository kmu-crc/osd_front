import React, { Component } from "react";
import thumbup from "source/thumbup_icon_black.png";
import email from "source/email_black.png";
import iEdit from "source/edit.png";
// import forked from "source/forked.svg";
import noimg from "source/noimg.png";
import noface from "source/thumbnail.png";
// import IconView from "source/IconView";
import Cross from "components/Commons/Cross";
import styled from "styled-components";
import TextFormat from "modules/TextFormat";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import { geturl } from "config";
import { Modal } from "semantic-ui-react";
import DesignMemberContainer from "containers/Designs/DesignMemberContainer";
import DesignComment from "components/Designs/GridEditor/DesignComment";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import { YesIHaveReadNewComment } from "redux/modules/design";
// import { Icon } from 'semantic-ui-react';
import opendesign_style from "opendesign_style";
// import vChatIcon from "source/video-chat-icon.png";
import Socket from "modules/Socket";
// import Loading from 'components/Commons/Loading';
import GotoDetail from "components/Commons/GotoDetail";

import new_logo_view from "source/new_logo_view.svg";
// import new_logo_favorite from "source/new_logo_favorite.svg";
import iconLike from "source/mypage_icon_like.svg";
// import new_logo_share from "source/new_logo_share.svg";
import new_logo_note from "source/new_logo_note.svg";

// import CCL1 from "source/ccl-1.png";
import CCL2 from "source/ccl-2.png";
import CCL3 from "source/ccl-3.png";
import CCL4 from "source/ccl-4.png";
import CCL5 from "source/ccl-5.png";

import new_logo_chat from "source/new_logo_chat.svg";
import new_logo_msg from "source/new_logo_msg.svg";

const Wrapper = styled.div`
  padding-top: 42px;
  padding-left: 38px;
`;
const ChatWrapper = styled.div`
  width: 100%;
  max-width: 1740px;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .row {
    display: flex;
  }
  .icon_wrap {
    margin-left: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .icon {
    width: 66px;
    height: 66px;
    object-fit: contain;
  }
  .icon_black {
    filter: invert(100%);
  }
  .icon_label {
    font-size: 17px;
    font-family: Spoqa Han Sans Neo;
    font-weight: Medium;
  }
`;
const DesignHeader = styled.div`
  width: 100%;
  max-width: 1740px;
  min-width: ${1000 - 38 * 2}px;
  height: 307px;
  border: 1px solid #b7b7b7;
  box-shadow: 8px 8px 8px #4141411a;
  display: flex;

  .ellipsis {
    display: -webkit-box;
    min-width: 300px;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .thumbnail {
    max-width: 307px;
    min-width: 307px;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    position: relative;
  }

  .infoBox {
    padding: 12px 22px 12px 22px;
    width: 100%;
    min-width: 500px;
    .design_name {
      max-width: 1000px;
      width: 100%;
      height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 41px;
      color: black;
      font-size: 31px;
      font-family: Noto Sans KR;
      font-weight: Bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 41px;
    }
    .row {
      width: 100%;
      display: flex;
    }
    .detail_height {
      height: 190px;
    }
    .column {
      flex-direction: column;
    }
    .red_label {
      font-size: 14px;
      color: red;
      margin-top: 12px;
    }
    .black_label {
      font-size: 14px;
      color: black;
      margin-top: 12px;
    }
    .pointer {
      cursor: pointer;
    }
    .left_box {
      width: 145px;
      height: 100%;
      margin-right: 10px;
    }
    .right_box {
      max-width: 900px;
      width: 100%;
      height: 100%;
    }
  }
  .bottom_box {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
    .asset_icon {
      max-width: 29px;
      max-height: 29px;
      object-fit: contain;
    }
    .asset_text {
      width: max-content;
      max-width: 40px;
      margin-left: 8px;
      margin-right: 16px;
      font-family: Spoqa Han Sans;
      font-size: 19px;
      font-weight: 400;
    }
  }
  .menuBox {
    width: 100%;
    max-width: 180px;
    min-width: 180px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 11px;
    .pointer {
      cursor: pointer;
    }
    .button_wrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 5px;
    }
    .fork_label {
      height: 28px;
      font-family: Spoqa Han Sans Neo;
      font-weight: Bold;
      font-size: 20px;
      color: red;
      text-align: right;
      line-height: 28px;
    }
    .black_label {
      font-family: Spoqa Han Sans Neo;
      font-weight: Bold;
      font-size: 14px;
      color: black;
    }
    .icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
      margin-left: 10px;
    }
    .ssl {
      width: 20px;
      height: 20px;
      object-fit: contain;
      margin-left: 5px;
    }
    .date {
      text-align: right;
      margin-top: 5px;
    }
  }
  .parent-title {
    // border: 1px dashed blue;
    width: max-content; // 100%;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  // responsive
  @media only screen and (min-width: 500px) and (max-width: 1300px) {
    .thumbnail {
      width: 100%;
      min-width: 150px;
      object-fit: contain;
    }
  }
`;

const ListItem = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  // width: 365px;
  // height: 85px;
  display: flex;
  border-bottom: 1px solid #b7b7b7;
  color: #707070;
  &:hover {
    background-color: #efefef;
    opacity: 0.9;
  }
  .wrapper {
    cursor: pointer;
    display: flex;
    .design-thumbnail {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      background-image: url(${(props) => props.img});
      background-size: cover;
      background-position: center;
    }
    .design-title {
      margin-left: 16px;
      font-size: 17px;
    }
  }
  @media only screen and (min-width: ${opendesign_style.resolutions
      .SmallMinWidth}px) and (max-width: ${opendesign_style.resolutions
      .SmallMaxWidth}px) {
    padding: 0px;
  }
`;
const DesignMemberListElement = styled.div`
  width: max-content;
  padding: 5px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 15px;
  background: #efefef;
  align-items: center;
  display: flex;
  cursor: pointer;
  .face {
    background-image: url(${(props) => props.face});
    background-size: cover;
    background-position: center;
    background-color: #d6d6d6;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .nick-name {
    width: max-content;
    height: 29px;
    margin-top: 1px;
    margin-left: 10px;
    color: #707070;
    font-size: 20px;
    text-align: left;
    font-weight: 500;
    font-family: Noto Sans KR;
    line-height: 29px;
  }
  .star {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    background-color: none;
    &i {
      margin-left: auto;
      margin-right: auto;
      color: #707070;
    }
  }
`;
const LikeDialogContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
  .likeDialog {
    width: 396px;
    height: 138px;
    box-shadow: 0px 3px 6px #000000;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .txt {
      width: 273px;
      height: max-content;
      text-align: center;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
      font-family: Noto Sans KR;
      line-height: 40px;
    }
  }
  @media only screen and (min-width: ${opendesign_style.resolutions
      .SmallMinWidth}px) and (max-width: ${opendesign_style.resolutions
      .SmallMaxWidth}px) {
    .likeDialog {
      width: 90%;
    }
  }
`;
const DesignMemberModalContainer = styled(Modal)`
  max-width: 1200px;
  width: 100% !important;
  margin-bottom: 100px;
  .close-box {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 5px;
  }
`;
const DesignCommentModalContainer = styled(Modal)`
  max-width: 1200px;
  width: 100% !important;

  min-height: 450px;
  border-radius: 0px !important;
  padding: 23px 65px 51px 65px !important;
  margin-bottom: 100px;

  .close-box {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .header-txt {
    height: 52px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 37px;
    font-family: Spoqa Han Sans Neo;
    font-weight: Medium;
    margin-bottom: 32px;
  }
  .body-container {
    width: 100%;
  }
  @media only screen and (min-width: ${opendesign_style.resolutions
      .SmallMaxWidth}px) and (max-width: ${1024}px) {
    min-width: 100%;
  }
  @media only screen and (min-width: ${opendesign_style.resolutions
      .SmallMinWidth}px) and (max-width: ${opendesign_style.resolutions
      .SmallMaxWidth}px) {
    min-width: 100%;
    padding: 15px !important;
  }
`;

const MemberContainer = styled(Modal)`
  max-width: 1200px;
  width: 100% !important;
  border-radius: 0px !important;
  padding: 23px 65px 51px 65px;

  .close-box {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .header-txt {
    height: 52px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 37px;
    font-family: Spoqa Han Sans Neo;
    font-weight: Medium;
    margin-bottom: 32px;
  }
  .body-container {
    width: 100%;
  }
  @media only screen and (min-width: ${opendesign_style.resolutions
      .SmallMaxWidth}px) and (max-width: ${1024}px) {
    min-width: 100%;
  }
  @media only screen and (min-width: ${opendesign_style.resolutions
      .SmallMinWidth}px) and (max-width: ${opendesign_style.resolutions
      .SmallMaxWidth}px) {
    min-width: 100%;
  }
`;

function isOpen(ws) {
  return ws.readyState === ws.OPEN;
}
class DesignInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posX: -1,
      posY: -1,
      w: window.innerWidth > 1920 ? 1920 : window.innerWidth,
      likeDialog: false,
      forkDialog: 0,
      memberDialog: false,
      forkDesignList: false,
      memberList: false,
      comment: false,
      isSeeMore: false,
      // chat
      liveVC: false,
      already: false,
      msg_cnt: 0,
    };
    this.like = this.like.bind(this);
    this.needLogin = this.needLogin.bind(this);
    this.forkDesign = this.forkDesign.bind(this);
    this.joinMember = this.joinMember.bind(this);
    this.getMemberList = this.getMemberList.bind(this);
    this.getDesignComment = this.getDesignComment.bind(this);
    this.onMoveForkDesign = this.onMoveForkDesign.bind(this);
  }
  memberRef = React.createRef();
  forkRef = React.createRef();

  // open member list not master
  openMemberList = (e) => {
    document.addEventListener("mousedown", this.checkClickOutSideMemberList);
    const top = e.clientY + 10;
    const left = e.clientX - (e.clientX + 150 > window.screenLeft ? 250 : 175);
    this.setState({ memberList: true, posY: top, posX: left });
  };
  checkClickOutSideMemberList = (e) => {
    if (this.memberRef.current === null) return;

    if (!this.memberRef.current.contains(e.target)) {
      this.setState({ memberList: false, posY: 0, posX: 0 });
      document.removeEventListener(
        "mousedown",
        this.checkClickOutSideMemberList
      );
    }
  };
  // open fork list not master
  openForkList = (e) => {
    this.props.ForkDesignListRequest(this.props.DesignDetail.uid);
    document.addEventListener("mousedown", this.checkClickOutSideForkList);
    const top = e.clientY + 10;
    const left = e.clientX - (e.clientX + 150 > window.screenLeft ? 250 : 175);
    this.setState({ forkDesignList: true, posY: top, posX: left });
  };
  checkClickOutSideForkList = (e) => {
    if (this.forkRef.current === null) return;

    if (!this.forkRef.current.contains(e.target)) {
      this.setState({ forkDesignList: false, posY: 0, posX: 0 });
      document.removeEventListener("mousedown", this.checkClickOutSideForkList);
    }
  };

  handleResize = () => {
    this.setState({ w: window.innerWidth > 1920 ? 1920 : window.innerWidth });
  };
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    if (this.props.valid) {
      try {
        if (isOpen(Socket))
          Socket.emit("design-init-for-vchat", {
            design: this.props.id,
            user: this.props.userInfo.uid,
          });
        Socket.on("vchat-on-air", (data) => {
          this.setState({ liveVC: data });
          Socket.on("check-new-message-count", (data) => {
            console.log("check new msg cnt", data);
            this.setState({ msg_cnt: data });
          });
        });
        Socket.on("vchat-was-finished", () => {
          this.setState({ liveVC: false });
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  onMoveForkDesign(designID) {
    window.location.href = "/designDetail/" + designID;
  }
  async needLogin() {
    await alert("로그인 해주세요.", "확인");
  }
  closeMemberList() {
    this.setState({ memberList: false });
  }
  closeForkList() {
    this.setState({ forkDesignList: false });
  }
  joinMember = async () => {
    if (!this.props.userInfo || !this.props.token) {
      await alert("로그인 해주세요.", "확인");
    } else if (this.props.DesignDetail.waitingStatus === 1) {
      await alert("가입 대기중인 디자인입니다.", "확인");
    } else {
      const data = [{ uid: this.props.userInfo.uid }];
      if (
        await confirm(
          "해당 디자인에 멤버로 가입 신청하시겠습니까?",
          "예",
          "아니오"
        )
      ) {
        this.props
          .JoinDesignRequest(this.props.id, data, 0, this.props.token)
          .then((res) => {
            if (res && res.data && res.data.success) {
              // alert("가입 신청이 완료되었습니다.");
              this.props.GetDesignDetailRequest(
                this.props.id,
                this.props.token
              );
            } else {
              alert("다시 시도해주세요");
            }
          });
      }
    }
  };
  async forkDesign() {
    if (this.props.userInfo === null) {
      return this.needLogin();
    }
    if (!this.props.userInfo.is_designer) {
      //console.log("userinfo", this.props.userInfo.is_designer)
      await alert(
        "디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.",
        "확인"
      );
      return this.props.history.push("/myModify");
    }
    if (
      (await confirm(
        `${this.props.DesignDetail.title.slice(0, 16)}${
          this.props.DesignDetail.title.length > 16 ? "..." : ""
        })
        파생 디자인을 생성하시겠습니까?`,
        "확인"
      )) === true
    ) {
      await this.setState({ forkDialog: 1 });
      this.doFork();
    }
  }
  async like() {
    if (!this.props.userInfo) {
      this.needLogin();
      return;
    }
    if (this.props.like) {
      //dislike
      this.props
        .UnlikeDesignRequest(this.props.id, this.props.token)
        .then(() => {
          this.props.GetDesignDetailRequest(this.props.id, this.props.token);
        })
        .then(() => {
          this.props.GetLikeDesignRequest(this.props.id, this.props.token);
        })
        .then(() => {
          this.props.GetDesignCountRequest(this.props.id);
        });
    } else {
      await this.setState({ likeDialog: true });
      this.props
        .LikeDesignRequest(this.props.id, this.props.token)
        .then(() => {
          this.props.GetDesignDetailRequest(this.props.id, this.props.token);
        })
        .then(() => {
          this.props.GetLikeDesignRequest(this.props.id, this.props.token);
        })
        .then(() => {
          this.props.GetDesignCountRequest(this.props.id);
        });
      setTimeout(() => {
        this.setState({ likeDialog: false });
      }, 1500);
    }
  }
  gotoDesignModify = () => {
    let href = window.location.href.substring(
      0,
      window.location.href.search("designDetail")
    );
    window.location.href = href + "designModify/" + this.props.DesignDetail.uid;
  };
  async doFork() {
    this.props
      .ForkDesignRequest(
        this.props.DesignDetail.uid,
        this.props.userInfo.uid,
        this.props.token
      )
      .then(async () => {
        await this.setState({ forkDialog: 2 });
        setTimeout(() => {
          this.closeFork();
          this.moveDegisnForked();
        }, 1500);
      })
      .catch((err) => {
        alert(err);
      });
  }
  async closeFork() {
    await this.setState({ forkDialog: 0 });
  }
  moveDegisnForked = () => {
    //alert(this.props.new_design_id);
    if (this.props.new_design_id) {
      this.props.history.push("/designModify/" + this.props.new_design_id);
    }
  };
  sendMessage(user_id, nick_name) {
    if (this.props.userInfo === null) {
      return this.needLogin();
    }
    // let href = window.location.href.substring(0, window.location.href.search("designDetail"))
    window.location.href = "/message/" + user_id + "/" + nick_name;
  }
  goParentDesign = (parent) => {
    window.location.href = geturl() + `/designDetail/${parent}`;
  };
  getDesignComment() {
    this.setState({ comment: true });
  }
  getMemberList() {
    this.setState({ memberList: true });
  }

  async onClosedCommentModal() {
    if (
      this.props.isMyDesign &&
      this.props.CountDesignComment &&
      this.props.CountDesignComment > 0
    ) {
      await YesIHaveReadNewComment(this.props.id, this.props.token);
      this.props.GetCountDesignCommentRequest(this.props.id);
    }
    this.setState({ comment: false });
  }

  checkMember = () => {
    if (!this.props.userInfo) {
      this.needLogin();
      return false;
    }
    if (this.props.DesignDetail && this.props.DesignDetail.member) {
      const found = this.props.DesignDetail.member.filter(
        (mem) => mem.user_id === this.props.userInfo.uid
      );
      if (found.length === 0) {
        alert("이 디자인의 멤버가 아닙니다.");
        return false;
      }
    }
    return true;
  };
  openVideoChat = () => {
    if (this.checkMember() === false) return;

    const url = `${geturl()}/vchat2?auth=${this.props.token}&room=${
      this.props.DesignDetail.uid
    }`;
    const options = `toolbar=no,status=no,menubar=no,resizable=0,location=no,scrollbars=no,\
        top=0,left=0,width=${window.screen.width / 4},height=${
      (window.screen.height - 100) / 4
    }`;
    this.vchatwindow = window.open(url, "vchat", options);
    // this.vchatwindow.postMessage("TITLE", "*");
    //try {
    //    if (this.state.liveVC === false) {
    //        // if (this.props.userInfo.uid === this.props.DesignDetail.user_id) {
    //        // if (isOpen(Socket))
    //        // Socket.emit('invited-member-to-vchat', { user_id: this.props.userInfo.uid, design_id: this.props.DesignDetail.uid })
    //        // }
    //    }
    //} catch (e) {
    //    console.error(e);
    //}
  };

  openChat = () => {
    if (this.checkMember() === false) return;

    const url = geturl() + `/chat/${this.props.DesignDetail.uid}`;
    const options = `toolbar=no,status=no,menubar=no,resizable=no,location=no,top=100,left=100,width=496,height=600,scrollbars=no`;
    this.chatwindow = window.open(url, "chat", options);
    // console.log(this.chatwindow.closed);
    // this.chatwindow.addEventListener('close', () => {
    //     alert("chat closed :)");
    //     console.log(this.chatwindow.closed);
    // })
  };

  render() {
    const {
      userInfo,
      isMyDesign,
      editor,
      DesignDetail,
      Count,
      like,
      WaitingList,
      // CountDesignComment,
    } = this.props;
    // const { w } = this.state;
    const thumbnail =
      (DesignDetail && DesignDetail.img && DesignDetail.img.l_img) || noimg;
    console.log(DesignDetail);

    const MemberModal = () => {
      return (
        <DesignMemberModalContainer
          open={isMyDesign && this.state.memberList}
          closeOnDimmerClick={false}
          onClose={() => this.setState({ memberList: false })}
        >
          <div
            className="close-box"
            onClick={() => this.setState({ memberList: false })}
          >
            <Cross
              angle={45}
              color={"#707070"}
              weight={3}
              width={35}
              height={35}
            />
          </div>
          <Modal.Content>
            <DesignMemberContainer
              mine={isMyDesign}
              DesignDetail={DesignDetail}
            />
          </Modal.Content>
        </DesignMemberModalContainer>
      );
    };

    const DesignCommentModal = () => {
      return (
        <DesignCommentModalContainer
          open={this.state.comment}
          onClose={() => this.onClosedCommentModal()}
        >
          <div
            className="close-box"
            onClick={() => this.onClosedCommentModal()}
          >
            <Cross
              angle={45}
              color={"#000000"}
              weight={3}
              width={35}
              height={35}
            />
          </div>
          {/* <Modal.Content> */}
          <div className="header-txt">댓글</div>
          <div className="body-container">
            <DesignComment
              designId={parseInt(this.props.id, 10)}
              requestDesignDetail={this.props.GetDesignCountRequest}
            />
          </div>
          {/* </Modal.Content> */}
        </DesignCommentModalContainer>
      );
    };
    const MemberListModal = () => {
      return (
        <MemberContainer
          open={this.state.memberList}
          onClose={() => this.setState({ memberList: false })}
        >
          {/* <DesignMemberList ref={this.memberRef} top={this.state.posY} left={this.state.posX} > */}
          <div
            className="close-box"
            onClick={() => this.setState({ memberList: false })}
          >
            <Cross angle={45} width={30} height={30} />
          </div>
          <div className="header-txt">디자인 멤버 목록</div>
          <div
            className="list"
            style={{ display: "flex", width: "100%", flexWrap: "wrap" }}
          >
            {DesignDetail.member &&
              DesignDetail.member.length > 0 &&
              DesignDetail.member.map((mem, i) => (
                <DesignMemberListElement
                  face={mem.thumbnail ? mem.thumbnail.s_img : noface}
                  key={i}
                >
                  <div className="face" />
                  <div className="nick-name">
                    <GotoDetail type="designer" id={mem.user_id}>
                      {mem.nick_name}
                    </GotoDetail>
                  </div>
                  {DesignDetail.user_id === mem.user_id && (
                    <div title={"팀장"}>
                      <i className="star icon" />
                    </div>
                  )}
                </DesignMemberListElement>
              ))}
          </div>
          {/* </DesignMemberList> */}
        </MemberContainer>
      );
    };

    const ForkDesignListModal = () => {
      return (
        <DesignCommentModalContainer
          open={this.state.forkDesignList}
          onClose={() => this.setState({ forkDesignList: false })}
        >
          <div
            className="close-box"
            onClick={() => this.setState({ forkDesignList: false })}
          >
            <Cross
              angle={45}
              color={"#000000"}
              weight={3}
              width={30}
              height={30}
            />
          </div>

          <div className="header-txt">파생된 디자인</div>

          <div style={{ overflowY: "auto" }}>
            {this.props.forkDesignList &&
              this.props.forkDesignList.map((item, idx) => {
                return (
                  <ListItem key={item + idx} img={item.p_s_img}>
                    <div
                      className="wrapper"
                      onClick={() => this.onMoveForkDesign(item.uid)}
                    >
                      <div className="design-thumbnail" />
                      <div className="design-title">
                        <TextFormat txt={item.title} chars={23} />
                        <div>
                          <GotoDetail type="designer" id={item.user_id}>
                            {item.nick_name}
                          </GotoDetail>
                        </div>
                      </div>
                    </div>
                  </ListItem>
                );
              })}
          </div>
        </DesignCommentModalContainer>
      );
    };

    const LikeDialogModal = () => {
      return (
        <LikeDialogContainer>
          <div className="likeDialog">
            <div className="txt">
              관심 디자인으로 등록되었습니다.
              <br />내 정보에서 확인 가능합니다.
            </div>
          </div>
        </LikeDialogContainer>
      );
    };
    return (
      <React.Fragment>
        {this.state.memberList ? <MemberModal /> : null}
        {this.state.comment ? <DesignCommentModal /> : null}
        {this.state.likeDialog ? <LikeDialogModal /> : null}
        {this.state.forkDesignList ? <ForkDesignListModal /> : null}

        {!isMyDesign && this.state.memberList && <MemberListModal />}

        <Wrapper>
          <DesignHeader>
            <div className="thumbnail">
              <img alt="thumbnail" className="thumbnail" src={thumbnail} />
            </div>
            <div className="infoBox">
              <div title={DesignDetail.title} className="design_name">
                {DesignDetail.title}
              </div>
              <div className="row detail_height">
                <div className="left_box">
                  <div className="row column">
                    <div
                      className="row black_label pointer"
                      style={{ cursor: "pointer" }}
                      onClick={this.openMemberList}
                    >
                      <div className="parent-title">
                        {DesignDetail.userName}
                      </div>

                      {(DesignDetail.member &&
                        DesignDetail.member.length > 1) ||
                      (WaitingList && WaitingList.length > 0) ? (
                        <div style={{ width: "75px" }}>
                          {DesignDetail.member && DesignDetail.member.length > 1
                            ? `외 ${(
                                DesignDetail.member.length - 1
                              ).toString()}명`
                            : null}
                          {WaitingList && WaitingList.length > 0 ? (
                            <div style={{ fontSize: "10px", color: "red" }}>
                              new!
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    {DesignDetail.parent_design && (
                      <div
                        className="red_label pointer"
                        onClick={() =>
                          this.goParentDesign(DesignDetail.parent_design)
                        }
                      >
                        <div
                          className="parent-title"
                          title={DesignDetail.parent_title}
                        >
                          {DesignDetail.parent_title}
                        </div>
                        에서 파생됨
                      </div>
                    )}

                    <div className="red_label pointer">
                      {DesignDetail.children_count["count(*)"] > 0 && (
                        <div onClick={this.openForkList}>
                          파생된 디자인&nbsp;
                          <span className="font_red">
                            {DesignDetail.children_count["count(*)"]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className="red_label pointer"
                      onClick={this.getDesignComment}
                    >
                      덧글 작성
                    </div>
                  </div>
                </div>
                <div className="right_box">
                  <div className="row column">
                    <div className="red_label">{DesignDetail.categoryName}</div>
                    <div className="black_label ellipsis">
                      {DesignDetail.explanation}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom_box">
                <img alt="icon" src={new_logo_view} className="asset_icon" />
                <div className="asset_text">
                  {NumberFormat(Count.view_count || 0)}
                </div>
                {/* <img src={new_logo_favorite} className="asset_icon" /> */}
                <img alt="icon" src={iconLike} className="asset_icon" />
                <div className="asset_text">
                  {NumberFormat(Count.like_count || 0)}
                </div>
                <img alt="icon" src={new_logo_note} className="asset_icon" />
                <div className="asset_text">
                  {NumberFormat(Count.comment_count || 0)}
                </div>
              </div>
            </div>
            <div className="menuBox">
              <div>
                <div
                  className="fork_label pointer"
                  onClick={() => this.forkDesign()}
                >
                  파생디자인 생성
                </div>
                {editor === false ? (
                  DesignDetail && DesignDetail.waitingStatus === 1 ? (
                    <div className="fork_label pointer">
                      <div>가입승인 대기중</div>
                    </div>
                  ) : (
                    <div className="fork_label pointer">
                      <div onClick={this.joinMember}>멤버 가입 신청</div>
                    </div>
                  )
                ) : null}

                <div className="button_wrap">
                  {isMyDesign === true ? (
                    <div
                      className="button_wrap pointer"
                      onClick={this.gotoDesignModify}
                    >
                      디자인 수정하기
                      <img alt="icon" src={iEdit} className="icon" />
                    </div>
                  ) : (
                    <div className="button_wrap pointer" onClick={this.like}>
                      관심 디자인 {like ? "취소하기" : "등록하기"}
                      <img
                        alt="icon"
                        src={thumbup}
                        className="icon"
                        style={{ opacity: `${like ? 1 : 0.5}` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="button_wrap">
                  {isMyDesign !== true ? (
                    <div
                      className="button_wrap pointer"
                      onClick={() =>
                        this.sendMessage(
                          DesignDetail.user_id,
                          DesignDetail.userName
                        )
                      }
                    >
                      {" "}
                      메시지 보내기{" "}
                      <img
                        alt="icon"
                        src={email}
                        className="icon icon_black"
                      />{" "}
                    </div>
                  ) : null}
                </div>
                <div className="button_wrap">
                  <a
                    rel="license"
                    href="http://creativecommons.org/licenses/by/4.0/"
                  >
                    <img alt="icon" className="ssl" src={CCL2} />
                    <img alt="icon" className="ssl" src={CCL3} />
                    {DesignDetail && DesignDetail.is_modify === false ? (
                      <img alt="icon" className="ssl" src={CCL4} />
                    ) : null}
                    {DesignDetail && DesignDetail.is_commercial === false ? (
                      <img alt="icon" className="ssl" src={CCL5} />
                    ) : null}
                  </a>
                </div>
                <div className="date">
                  최근 업데이트 {DateFormat(DesignDetail.update_time)}
                </div>
                <div className="date">
                  등록일자{" "}
                  {DesignDetail &&
                    new Date(DesignDetail.create_time)
                      .toLocaleDateString("ko-KR")
                      .substring(
                        0,
                        new Date(DesignDetail.create_time).toLocaleDateString(
                          "ko-KR"
                        ).length - 1
                      )}
                </div>
              </div>
            </div>
          </DesignHeader>

          {userInfo &&
          userInfo.uid &&
          DesignDetail &&
          /*DesignDetail.is_project === 1 && */ DesignDetail.member.length >
            1 ? (
            <ChatWrapper>
              <div className="row">
                <div
                  title="디자인 멤버들과 화상회의를 시작합니다."
                  className="icon_wrap"
                  onClick={this.openVideoChat}
                >
                  <img alt="icon" src={new_logo_msg} className="icon" />
                  <div className="icon_label">화상회의</div>
                </div>
                <div
                  title="디자인 멤버들과 채팅을 시작합니다."
                  className="icon_wrap"
                  onClick={this.openChat}
                >
                  <img alt="icon" src={new_logo_chat} className="icon" />
                  <div className="icon_label">채팅</div>
                </div>
              </div>
            </ChatWrapper>
          ) : null}
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default DesignInfo;

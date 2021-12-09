import React, { Component } from "react"
import styled from "styled-components";
import DesignInfoMobile from "components/Designs/DesignInfoMobile";
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
import Loading from "components/Commons/Loading";

const Wrapper = styled.div`
  .marginLeflt {
    margin-left: 38px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;


class DesignDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { isMyDesign: false, editor: false, tab: "info" };
  }

  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      .then(async () => {
        if (this.props.userInfo === null) this.setState({ isMyDesign: false });
        else if (this.props.userInfo.uid === this.props.DesignDetail.user_id) {
          this.props.DesignWaitingListRequest(this.props.id, this.props.token);
          this.props.GetCountDesignCommentRequest(this.props.id);
          this.setState({ isMyDesign: true });
        }
        else {
          this.setState({ isMyDesign: false });
        }
        await this.setState({ editor: this.checkEditorPermission() });
      }); // 디자인에 대한 정보
    this.props.UpdateDesignViewRequest(this.props.id)
      .then(this.props.GetDesignCountRequest(this.props.id)); // 디자인 조회수 업데이트 후 카운트 정보 가져옴
    if (this.props.token) {
      this.props.GetLikeDesignRequest(this.props.id, this.props.token);
    } // 로그인 한 경우 좋아요 했는지 여부 가져오기
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.DesignDetail !== nextProps.DesignDetail) {
      return true;
    }
  }

  checkEditorPermission() {
    return (
      this.props.userInfo &&
        this.props.DesignDetail &&
        this.props.DesignDetail.member &&
        this.props.DesignDetail.member.find(peer => { return peer.user_id === this.props.userInfo.uid }) ? true : false);
  }

  render() {

    const { DesignDetail: detail } = this.props;

    return (<Wrapper>
      {detail && detail.uid
        ? <React.Fragment>
          {/* design info */}
          <DesignInfoMobile {...this.props} {...this.state} />

          {/* design detail */}
          {detail && detail.is_project === 1
            ? <DesignDetailStepContainer
              design={detail}
              {...this.state} />
            : <div className="marginLeft">
              <DesignDetailViewContainer
                id={this.props.id}
                {...this.state}
                history={this.props.history} />
            </div>}
        </React.Fragment>
        : <Loading />}
    </Wrapper>)
  }
}

export default DesignDetail;



// <DesignHeader>
// <div className="thumbnail">
//     <img className="thumbnail" src={thumbnail} />
// </div>
// <div className="infoBox">
//     <div className="design_name">
//         {DesignDetail.title}
//     </div>
//     <div className="row detail_height">
//         <div className="left_box">
//             <div className="row column">
//                 <div className="row black_label pointer" style={{ cursor: "pointer" }} onClick={this.openMemberList} >

//                     <div className="parent-title">{DesignDetail.userName}</div>

//                     {(DesignDetail.member && DesignDetail.member.length > 1) || (WaitingList && WaitingList.length > 0)
//                         ? <div style={{ width: "75px", }}>
//                             {(DesignDetail.member && DesignDetail.member.length > 1)
//                                 ? `외 ${(DesignDetail.member.length - 1).toString()}명`
//                                 : null}
//                             {WaitingList && WaitingList.length > 0
//                                 ? <div style={{ fontSize: "10px", color: "red" }}>new!</div>
//                                 : null}
//                         </div>
//                         : null}
//                 </div>

//                 {DesignDetail.parent_design &&
//                     <div className="red_label pointer" onClick={() => this.goParentDesign(DesignDetail.parent_design)}>
//                         <div className="parent-title" title={DesignDetail.parent_title}>
//                             {DesignDetail.parent_title}
//                         </div>에서 파생됨
//                     </div>}

//                 <div className="red_label pointer">
//                     {DesignDetail.children_count["count(*)"] > 0 &&
//                         <div onClick={this.openForkList}>
//                             파생된 디자인&nbsp;<span className="font_red">{DesignDetail.children_count["count(*)"]}</span>
//                         </div>}
//                 </div>
//                 <div className="red_label pointer" onClick={this.getDesignComment}>덧글 작성</div>
//             </div>
//         </div>
//         <div className="right_box">
//             <div className="row column">
//                 <div className="red_label">{DesignDetail.categoryName}</div>
//                 <div className="black_label ellipsis">{DesignDetail.explanation}</div>
//             </div>
//         </div>
//     </div>
//     <div className="bottom_box">
//         <img src={new_logo_view} className="asset_icon" />
//         <div className="asset_text">{NumberFormat(Count.view_count || 0)}</div>
//         {/* <img src={new_logo_favorite} className="asset_icon" /> */}
//         <img src={iconLike} className="asset_icon" />
//         <div className="asset_text">{NumberFormat(Count.like_count || 0)}</div>
//         <img src={new_logo_note} className="asset_icon" />
//         <div className="asset_text">{NumberFormat(Count.comment_count || 0)}</div>
//     </div>
// </div>
// <div className="menuBox">
//     <div>
//         <div className="fork_label pointer" onClick={() => this.forkDesign()}>파생디자인 생성</div>
//         {editor === false ? DesignDetail && DesignDetail.waitingStatus === 1 ?
//             <div className="fork_label pointer">
//                 <div>가입승인 대기중</div>
//             </div>
//             :
//             <div className="fork_label pointer">
//                 <div onClick={this.joinMember}>멤버 가입 신청</div>
//             </div>
//             :
//             null
//         }

//         <div className="button_wrap">
//             {isMyDesign === true ?
//                 <div className="button_wrap pointer" onClick={this.gotoDesignModify} >
//                     디자인 수정하기
//                     <img src={iEdit} className="icon" />
//                 </div>
//                 :
//                 <div className="button_wrap pointer" onClick={this.like}>
//                     관심 디자인 {like ? "취소하기" : "등록하기"}
//                     <img src={thumbup} className="icon" />
//                 </div>
//             }

//         </div>
//     </div>
//     <div>
//         <div className="button_wrap">
//             {isMyDesign !== true
//                 ? <div
//                     className="button_wrap pointer"
//                     onClick={() => this.sendMessage(DesignDetail.user_id, DesignDetail.userName)}
//                 > 메시지 보내기 <img src={email} className="icon icon_black" /> </div>
//                 : null}
//         </div>
//         <div className="button_wrap">
//             <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
//                 <img className="ssl" src={CCL2} />
//                 <img className="ssl" src={CCL3} />
//                 {DesignDetail && DesignDetail.is_modify == false ? <img className="ssl" src={CCL4} /> : null}
//                 {DesignDetail && DesignDetail.is_commercial == false ? <img className="ssl" src={CCL5} /> : null}
//             </a>
//         </div>
//         <div className="date">최근 업데이트 {DateFormat(DesignDetail.update_time)}</div>
//         <div className="date">등록일자 {DesignDetail && new Date(DesignDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(DesignDetail.create_time).toLocaleDateString('ko-KR').length - 1)}</div>
//     </div>
// </div>
// </DesignHeader>

// {(DesignDetail && /*DesignDetail.is_project === 1 && */DesignDetail.member.length > 1)
// ? <ChatWrapper>
//     <div className="row">
//         <div
//             title="디자인 멤버들과 화상회의를 시작합니다."
//             className="icon_wrap" onClick={this.openVideoChat}>
//             <img src={new_logo_msg} className="icon" />
//             <div className="icon_label">화상회의</div>
//         </div>
//         <div
//             title="디자인 멤버들과 채팅을 시작합니다."
//             className="icon_wrap" onClick={this.openChat}>
//             <img src={new_logo_chat} className="icon" />
//             <div className="icon_label">채팅</div>
//         </div>
//     </div>
// </ChatWrapper>
// : null}
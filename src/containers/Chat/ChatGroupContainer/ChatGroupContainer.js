import React, { Component } from "react"
import { connect } from "react-redux"
import Chat from "components/ChatGroup/ChatGroup"
import { GetGroupDetailRequest, GetGroupMemberRequest, CheckInvitedUserRequest } from "redux/modules/group";

class ChatGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: false, group: {} }
  }
  close = (msg) => {
    msg && alert(msg)
    window.open('', '_self').close();
    window.history.go(-1); // 주소 입력창으로 접근 시 뒤로가기 해야하기 때문에 추가됨.
  }
  componentDidMount() {
    if (this.props.id == null) {
      this.close("올바른 접근이 아닙니다.")
    }
    if (this.props.userInfo == null) {
      this.close("로그인 후 가능합니다.")
    }
    this.props.token &&
      this.props.GetGroupDetailRequest(this.props.id)//, this.props.token)
        .then(data => {

          if (data && Object.entries(data).length === 0) {
            this.close("그룹 정보가 잘못되었습니다.");
          }

          GetGroupMemberRequest(this.props.id)
            .then(async mem => {
              const ismember = mem.filter(m => m.user_id === this.props.userInfo.uid).length > 0;
              const invited = await CheckInvitedUserRequest(this.props.id, this.props.token);
              if (ismember || (invited.result || false)) {
                data.member = mem;
                this.setState({ group: data, valid: true });
              }
              else {
                this.close("채팅방에 입장하실 수 없습니다.");
              }
            });
        });

  }
  render() {
    return this.state.valid && this.props.userInfo
      ? <Chat {...this.props} group={this.state.group} />
      : <div>인증 중입니다.</div>
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  GroupDetail: state.Group.status.GroupDetail,
});

const mapDispatchToProps = (dispatch) => ({
  GetGroupDetailRequest: (id) => dispatch(GetGroupDetailRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroupContainer);

import React, { Component } from "react"
import { connect } from "react-redux"
import Chat from "components/Chat/Chat"
import { GetDesignDetailRequest, } from "redux/modules/design";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: false, design: {} }
  }
  close = (msg) => {
    msg && alert(msg)
    window.open('', '_self').close()
  }
  componentDidMount() {
    if (this.props.id == null) {
      this.close("올바른 접근이 아닙니다.")
    }
    if (this.props.userInfo == null) {
      this.close("로그인 후 가능합니다.")
    }
    this.props.token &&
      this.props.GetDesignDetailRequest(this.props.id, this.props.token)
        .then(data => {
          if (data && data.member) {
            const found = data.member.filter(mem => mem.user_id === this.props.userInfo.uid)
            if (found.length === 0) {
              this.close("회원이 아닙니다.")
            }
            this.setState({ design: data });
            this.setState({ valid: true });
            console.log('validated');
          } else {
            this.close("디자인정보가 잘못되었습니다.");
          }
        })
  }
  render() {
    return this.state.valid && this.props.userInfo
      ? <Chat {...this.props} />
      : <div>인증 중입니다.</div>
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  DesignDetail: state.Design.status.DesignDetail,
});

const mapDispatchToProps = (dispatch) => ({
  GetDesignDetailRequest: (id, token) => {
    return dispatch(GetDesignDetailRequest(id, token))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);

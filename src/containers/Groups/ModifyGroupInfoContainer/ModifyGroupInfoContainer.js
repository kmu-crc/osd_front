import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest, UpdateGroupRequest } from "actions/Group";
import ModifyGroupInfo from "components/Groups/ModifyGroupInfo";

class ModifyGroupInfoContainer extends Component {
  state = {
    isAuthor: false
  }
  componentDidMount() {
    this.props.GetGroupDetailRequest(this.props.id, this.props.token)
      .then(() => {
        if (this.props.userInfo.uid !== this.props.GroupDetail.user_id) {
          alert("이 그룹에 대한 수정권한이 없습니다. 이전페이지로 돌아갑니다.")
          this.props.history.go(-1)
        } else { this.setState({ isAuthor: true }) }
      })
  }

  render() {
    return (
      <div>
        {this.state.isAuthor ? (
          <ModifyGroupInfo {...this.props} />
        ) : (
            <p style={{ color: "#FFF" }}>수정권한을 확인 중 입니다.</p>
          )}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    GroupDetail: state.GroupDetail.status.GroupDetail,
    userInfo: state.Authentication.status.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupDetailRequest: (id) => {
      return dispatch(GetGroupDetailRequest(id))
    },
    UpdateGroupRequest: (id, data, token) => {
      return dispatch(UpdateGroupRequest(id, data, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  GetLastestGroupNoticeRequest, GetTotalCountGroupNoticeRequest,
  CreateGroupNoticeRequest, UpdateGroupNoticeRequest, DeleteGroupNoticeRequest
} from "redux/modules/group";
import GroupNotice from "components/Groups/GroupNotice"

class GroupNoticeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, lastest: "" };
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }
  init() {
    GetTotalCountGroupNoticeRequest(this.props.id)
      .then(data => {
        if (data.success) {
          this.setState({ count: data.data });
        }
      })
      .catch(err => {
        console.error(err);
      })
    GetLastestGroupNoticeRequest(this.props.id)
      .then(data => {
        if (data.success) {
          this.setState({ lastest: data.data });
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <React.Fragment>
        <GroupNotice
          {...this.props} {...this.state}
          init={this.init}
          CreateGroupNoticeRequest={CreateGroupNoticeRequest}
          UpdateGroupNoticeRequest={UpdateGroupNoticeRequest}
          DeleteGroupNoticeRequest={DeleteGroupNoticeRequest}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    GroupDetail: state.Group.status.GroupDetail,
  }
}


export default connect(mapStateToProps, null)(GroupNoticeContainer)

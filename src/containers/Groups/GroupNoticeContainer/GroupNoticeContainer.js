import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  // GetLastestGroupNoticeRequest, GetTotalCountGroupNoticeRequest,
  // CreateGroupNoticeRequest, UpdateGroupNoticeRequest, DeleteGroupNoticeRequest,
  checkHaveProgrammingDesign
} from "redux/modules/group";
import GroupNotice from "components/Groups/GroupNotice"

class GroupNoticeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { /*count: 0, lastest: "",*/ hasProgrammingDesign: false };
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }
  init() {
    // GetTotalCountGroupNoticeRequest(this.props.id)
    //   .then(data => {
    //     if (data.success) {
    //       this.setState({ count: data.data });
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   })
    // GetLastestGroupNoticeRequest(this.props.id)
    //   .then(data => {
    //     if (data.success) {
    //       this.setState({ lastest: data.data });
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   })
    checkHaveProgrammingDesign(this.props.id, this.props.token)
      .then(res => this.setState({ hasProgrammingDesign: res }))
      .catch(e => console.error(e));

  }

  render() {
    const { hasProgrammingDesign } = this.state;
    return (<GroupNotice
      hasProgrammingDesign={hasProgrammingDesign}
      {...this.props}
    />)
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

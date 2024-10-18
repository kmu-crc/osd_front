import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  // GetLastestGroupNoticeRequest, GetTotalCountGroupNoticeRequest,
  // CreateGroupNoticeRequest, UpdateGroupNoticeRequest, DeleteGroupNoticeRequest,
  checkHaveProgrammingDesign,
  GetHaveGroupInDesignRequest,
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
    // GetHaveGroupInDesignRequest(this.props.token,396)
    // .then((data)=>{
    //   console.log(data);
    // });
  }
  init() {
    checkHaveProgrammingDesign(this.props.id, this.props.token)
      .then(res => this.setState({ hasProgrammingDesign: res }))
      .catch(e => console.error(e));

  }

  render() {
    const { hasProgrammingDesign } = this.state;
    console.log("=====",this.props);
    return (<GroupNotice
      hasProgrammingDesign={hasProgrammingDesign}
      GetHaveGroupInDesignRequest={GetHaveGroupInDesignRequest}
      {...this.props}
    />)
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    GroupDetail: state.Group.status.GroupDetail,
    SubmitStatus: state.Group.status.SubmitStatus,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     GetHaveGroupInDesignRequest: (token,group_id) => {
//       return dispatch(GetHaveGroupInDesignRequest(token,group_id));
//     }
//   };
// };
export default connect(mapStateToProps, null)(GroupNoticeContainer)

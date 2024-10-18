import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignMember from "components/Designs/ModifyDesignMember";
import {
  AcceptDesignRequest, JoinDesignRequest,
  DesignWaitingToAcceptListRequest, DesignWaitingListRequest,
  GetoutDesignRequest, GetDesignDetailRequest, GetDesignCountRequest
} from "redux/modules/design";
import { SearchMemberRequest } from "redux/modules/search";

class DesignMemberContainer extends Component {
  render() {
    return (
      <ModifyDesignMember {...this.props} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    DesignDetail: state.Design.status.DesignDetail,
    members: state.Search.status.members,
    WaitingList: state.Design.status.WaitingList,
    WaitingToAcceptList: state.Design.status.WaitingToAcceptList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token));
    },
    SearchMemberRequest: (id, data, token) => {
      return dispatch(SearchMemberRequest(id, data, token));
    },
    AcceptDesignRequest: (id, memberId, token) => {
      return dispatch(AcceptDesignRequest(id, memberId, token));
    },
    JoinDesignRequest: (id, data, flag, token) => {
      return dispatch(JoinDesignRequest(id, data, flag, token));
    },
    GetoutDesignRequest: (id, memberId, token, refuse) => {
      return dispatch(GetoutDesignRequest(id, memberId, token, refuse));
    },
    DesignWaitingToAcceptListRequest: (id, token) => {
      return dispatch(DesignWaitingToAcceptListRequest(id, token));
    },
    DesignWaitingListRequest: (id, token) => {
      return dispatch(DesignWaitingListRequest(id, token));
    },
    GetDesignCountRequest: (id) => {
      return dispatch(GetDesignCountRequest(id))
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignMemberContainer));

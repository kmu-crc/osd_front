import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignMember from "components/Designs/ModifyDesignMember";
import { GetDesignDetailRequest, GetDesignCountRequest } from "actions/Design";
import { SearchMemberRequest } from "actions/Commons/Search";
import { JoinDesignRequest, AcceptDesignRequest, GetoutDesignRequest, DesignWaitingListRequest } from "actions/Designs/JoinDesign";

class DesignMemberContainer extends Component {
  render() {
    return(
      <ModifyDesignMember {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    DesignDetail: state.DesignDetail.status.DesignDetail,
    members: state.Search.status.members,
    WaitingList: state.DesignWaitingList.status.WaitingList
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
    DesignWaitingListRequest: (id, token) => {
      return dispatch(DesignWaitingListRequest(id, token));
    },
    GetDesignCountRequest: (id) => {
      return dispatch(GetDesignCountRequest(id))
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignMemberContainer));

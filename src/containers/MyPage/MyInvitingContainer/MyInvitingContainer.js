import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetoutDesignRequest } from "actions/Designs/JoinDesign";
import { GetMyInvitingListRequest } from "actions/Users/MyDetail";

class MyInvitingContainer extends Component {
  render(){
    return(
      <div>내가 보낸 초대</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.MyJoin.status.InvitingList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyInvitingListRequest: (token) => {
      return dispatch(GetMyInvitingListRequest(token))
    },
    GetoutDesignRequest: (id, memberId, token) => {
      return dispatch(GetoutDesignRequest(id, memberId, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvitingContainer);


import React, { Component } from 'react';
import { connect } from "react-redux";
import { AcceptDesignRequest, GetoutDesignRequest } from "actions/Designs/JoinDesign";
import { GetMyInvitedListRequest } from "actions/Users/MyDetail";

class MyInvitedContainer extends Component {
  render(){
    return(
      <div>내가받은초대</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.MyJoin.status.InvitedList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyInvitedListRequest: (token) => {
      return dispatch(GetMyInvitedListRequest(token))
    },
    AcceptDesignRequest: (id, memberId, token) => {
      return dispatch(AcceptDesignRequest(id, memberId, token))
    },
    GetoutDesignRequest: (id, memberId, token) => {
      return dispatch(GetoutDesignRequest(id, memberId, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvitedContainer);

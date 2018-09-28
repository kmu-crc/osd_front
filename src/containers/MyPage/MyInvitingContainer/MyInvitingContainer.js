import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetoutDesignRequest } from "actions/Designs/JoinDesign";
import { GetMyInvitingListRequest } from "actions/Users/MyDetail";

class MyInvitingContainer extends Component {
  componentDidMount(){
    this.props.GetMyInvitingListRequest(this.props.token);
  }

  render(){
    return(
      <div>
        {this.props.list.length > 0
        ? this.props.list.map((design, i) => (
          <li key={i}>{design.title}</li>
        ))
        : <div>가입 신청한 디자인이 없습니다.</div>
        }
      </div>
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


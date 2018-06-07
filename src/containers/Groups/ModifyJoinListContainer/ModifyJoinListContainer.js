import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { GetGroupDetailRequest } from "actions/Group";
// import ModifyGroupInfo from "components/Groups/ModifyGroupInfo";

class ModifyJoinListContainer extends Component {
  render() {
    return(
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // GroupDetail: state.GroupDetail.status.GroupDetail,
    // userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyJoinListContainer);

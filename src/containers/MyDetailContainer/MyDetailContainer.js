import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, GetMyDesignListRequest, GetMyGroupListRequest } from "../../actions/MyDetail";
import MyDetail from "../../components/MyDetail";

class MyDetailContainer extends Component {

  render() {
    return(
      <div>
        <MyDetail {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.MyDetail.status.MyDetail,
    MyDesign: state.MyDetail.status.MyDesign,
    MyGroup: state.MyDetail.status.MyGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token));
    },
    GetMyDesignListRequest: (token, type, sort) => {
      return dispatch(GetMyDesignListRequest(token, type, sort));
    },
    GetMyGroupListRequest: (token, type, sort) => {
      return dispatch(GetMyGroupListRequest(token, type, sort));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer);

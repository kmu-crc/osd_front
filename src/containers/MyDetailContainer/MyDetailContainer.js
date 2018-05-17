import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, GetMyDesignListRequest, GetMyGroupListRequest, GetMyLikeListRequest } from "../../actions/MyDetail";
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
    MyGroup: state.MyDetail.status.MyGroup,
    MyLike: state.MyDetail.status.MyLike
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
    },
    GetMyLikeListRequest: (token, type, sort) => {
      return dispatch(GetMyLikeListRequest(token, type, sort));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer);

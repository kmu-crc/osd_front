import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, GetMyDesignListRequest } from "actions/MyDetail";
import MyDetail from "components/MyDetail";

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
    MyDesign: state.MyDetail.status.MyDesign
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token));
    },
    GetMyDesignListRequest: (token) => {
      return dispatch(GetMyDesignListRequest(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer);

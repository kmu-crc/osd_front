import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest } from "actions/Users/MyDetail";
// import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "actions/Categorys";
import { UpdateUserDetailRequest } from "actions/Users/UserInfo";
import { SecessionRequest } from "actions/Registration/secession";
import ModifyMyDetail from "components/Users/ModifyMyDetail";

class ModifyMyDetailContainer extends Component {
  render() {
    return(
      <ModifyMyDetail {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.MyDetail.status.MyDetail,
    token: state.Authentication.status.token,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token));
    },
    // GetCategoryLevel1Request: () => {
    //   return dispatch(GetCategoryLevel1Request());
    // },
    // GetCategoryLevel2Request: (id) => {
    //   return dispatch(GetCategoryLevel2Request(id));
    // },
    UpdateUserDetailRequest: (data, token) => {
      return dispatch(UpdateUserDetailRequest(data, token));
    },
    SecessionRequest: (token) => {
      return dispatch(SecessionRequest(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMyDetailContainer);

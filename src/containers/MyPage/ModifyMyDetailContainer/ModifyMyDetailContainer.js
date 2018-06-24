import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest } from "actions/Users/MyDetail";
import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "actions/Categorys";
import { UpdateUserDetailRequest } from "actions/Users/UserInfo";
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
    category1: state.Categorys.status.level1,
    category2: state.Categorys.status.level2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token));
    },
    GetCategoryLevel1Request: () => {
      return dispatch(GetCategoryLevel1Request());
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    },
    UpdateUserDetailRequest: (data, token) => {
      return dispatch(UpdateUserDetailRequest(data, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMyDetailContainer);

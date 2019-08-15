import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserDetailForm from "components/Registration/UserDetailFrom";
import { InsertUserDetailRequest } from "redux/modules/personal";
import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "redux/modules/category";

class UpdateUserInfoContainer extends Component {
  render() {
    return (
      <UserDetailForm {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    category1: state.Categorys.status.level1,
    category2: state.Categorys.status.level2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    InsertUserDetailRequest: (data, token) => {
      return dispatch(InsertUserDetailRequest(data, token));
    },
    GetCategoryLevel1Request: () => {
      return dispatch(GetCategoryLevel1Request());
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoContainer));

import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import UserDetailForm from "components/Registration/UserDetailFrom";
import { InsertUserDetailRequest, GetMyDetailRequest, UpdateUserDetailRequest } from "redux/modules/personal"
import { GetCategoryAllRequest } from "redux/modules/category"
import ModifyMyDetail from "components/Users/ModifyMyDetail"
class UpdateUserInfoContainer extends Component {

  componentDidMount() {
    this.props.GetCategoryAllRequest();
    this.props.GetMyDetailRequest(this.props.token);
  }
  render() {
    //console.log("this.props:upaderUserIfno", this.props)
    return (
      <ModifyMyDetail {...this.props} />
      // <UserDetailForm {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.Personal.status.MyDetail,
    token: state.Authentication.status.token,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    category3: state.Category.status.category3,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    InsertUserDetailRequest: (data, token) => {
      return dispatch(InsertUserDetailRequest(data, token));
    },
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest())
    },
    UpdateUserDetailRequest: (data, token) => {
      return dispatch(UpdateUserDetailRequest(data, token))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoContainer));

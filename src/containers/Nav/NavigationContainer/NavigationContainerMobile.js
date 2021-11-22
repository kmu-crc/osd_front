import React, { Component } from 'react'
import NavigationMobile from "containers/Nav/Navigation/NavigationMobile";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInRequest, SignOutRequest, CheckEmailRequest, GetDevNoticeRequest } from "redux/modules/auth"
import { GetCategoryAllRequest } from "redux/modules/category";
import { FindPwRequest } from "redux/modules/account";


class NavigationContainer extends Component {
    render() {
        return (<NavigationMobile {...this.props} style={{ margin: "0 auto" }} />)
    }
};

const mapStateTopProps = (state) => ({
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    category3: state.Category.status.category3,
    CheckEmail: state.Authentication.checkStatus.checkEmail,
    status: state.Account.FindPw.status,
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo,
    isLoggedIn: state.Authentication.status.isLoggedIn,
    devNoticeStatus: state.Authentication.devNotice.status,
    devNotice: state.Authentication.devNotice.notice,
});
const mapDispatchToProps = (dispatch) => ({
    SignInRequest: (data) => dispatch(SignInRequest(data)),
    SignOutRequest: () => dispatch(SignOutRequest()),
    FindPwRequest: (data) => dispatch(FindPwRequest(data)),
    CheckEmailRequest: (email) => dispatch(CheckEmailRequest(email)),
    GetDevNoticeRequest: (token) => dispatch(GetDevNoticeRequest(token)),
    GetCategoryAllRequest: () => dispatch(GetCategoryAllRequest()),
});

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(NavigationContainer))

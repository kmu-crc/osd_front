import React, { Component } from 'react'
import Header from "components/Header/Header"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInRequest, SignOutRequest, CheckEmailRequest, GetDevNoticeRequest } from "redux/modules/auth"
import { FindPwRequest } from "redux/modules/account";


class HeaderContainer extends Component {
    render() {
        return (
            <Header {...this.props} style={{ margin: "0 auto" }} />
        )
    }
};

const mapStateTopProps = (state) => ({
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
});

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(HeaderContainer))

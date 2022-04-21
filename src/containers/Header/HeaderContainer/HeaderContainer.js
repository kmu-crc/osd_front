import React, { Component } from 'react'
import Header from "components/Header/Header"
import HeaderMobile from "components/Header/Header_mobile";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInRequest, SignOutRequest, CheckEmailRequest, CheckTokenRequest, GetDevNoticeRequest } from "redux/modules/auth"
import { FindPwRequest } from "redux/modules/account";
import { isMobile, TokenName } from "constant";
import { SetSession, GetSession } from "modules/Sessions";

class HeaderContainer extends Component {
    componentDidMount() {
        this.props.token && setInterval(() => this.check(), 1000);
    }

    check = () => {
        this.props.CheckTokenRequest(this.props.token).then(data => {
            if (data && data.type === "AUTH_CHECK_TOKEN_FAILURE") {
                window.document.location.reload();
            }
        });
    }

    render() {
        return (
            isMobile()
                ? <HeaderMobile {...this.props} />
                : <Header {...this.props} style={{ margin: "0 auto" }} />
        );
    };
};

const mapStateTopProps = (state) => ({
    CheckEmail: state.Authentication.checkStatus.checkEmail,
    token: state.Authentication.status.token,
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
    CheckTokenRequest: (token) => dispatch(CheckTokenRequest(token)),
});

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(HeaderContainer))

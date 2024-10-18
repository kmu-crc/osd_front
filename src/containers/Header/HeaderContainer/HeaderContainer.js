import React, { Component } from 'react'
import Header from "components/Header/Header"
import HeaderMobile from "components/Header/Header_mobile";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInRequest, SignOutRequest, CheckEmailRequest, CheckTokenRequest, GetDevNoticeRequest } from "redux/modules/auth"
import { FindPwRequest } from "redux/modules/account";
import { ms10Mins, msMin, ms10Secs, msSec, msHour, isMobile, } from "constant";
import { alert } from "components/Commons/Alert/Alert";

class HeaderContainer extends Component {
    componentDidMount() {
        this.props.token && this.checkwithterm();
    }

    notify = async (text) => {
        await alert(text);
        // style: {
        // zIndex: "1",
        // textAlign: "center",
        // fontSize: "1.25rem",
        // height: "20px",
        // background: "linear-gradient(to right, #FAb09b, #96c93d)",
        // },
    };

    checkwithterm = () => {
        this.props.CheckTokenRequest(this.props.token)
            .then(data => {
                console.log("check:", data.info.exp);
                if (data && data.type === "AUTH_CHECK_TOKEN_FAILURE") {
                    window.document.location.reload();
                    return;
                }

                // const tempDay = 24 * 60 * 60 * 1000;
                const now = new Date().getTime() //+ tempDay;
                const exp = (data.info.exp) * 1000;
                const term = exp - now;

                let nextTimeOffset = msHour;
                //if (term <= 0) {
                //    // this.notify("토큰만료");
                //    console.log("check:", "토큰만료")
                //    window.document.location.reload();
                //}
                //else 
                // if (msHour < term < msHour * 24) {
                // this.notify("곧, 세션만료일입니다. 세션갱신을 위해 다시 로그인해주세요!");
                // }
                if (term < msHour) {
                    nextTimeOffset = ms10Mins;
                }
                else if (term < ms10Mins) {
                    nextTimeOffset = msMin;
                }
                else if (term < msMin) {
                    nextTimeOffset = ms10Secs;
                } else {
                    // nextTimeOffset = msSec;
                }
                console.log("check:", nextTimeOffset);
                setTimeout(() => this.checkwithterm(), nextTimeOffset);
            });
    }

    render() {
        return (<>
            {isMobile()
                ? <HeaderMobile {...this.props} />
                : <Header {...this.props} style={{ margin: "0 auto" }} />
            }</>
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

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(HeaderContainer));

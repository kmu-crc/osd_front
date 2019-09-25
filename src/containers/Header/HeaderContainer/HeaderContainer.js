import React, { Component } from 'react'
import Header from "components/Header/Header"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInRequest, SignOutRequest,CheckEmailRequest } from "redux/modules/auth"
import { FindPwRequest } from "redux/modules/account";


class HeaderContainer extends Component {
    render() {
        //console.log("HC:", this.props)
        return (
            <Header {...this.props} style={{margin:"0 auto"}}/>
        )
    }
}
const mapStateTopProps = (state) => {
    return {
        CheckEmail: state.Authentication.checkStatus.checkEmail,
        status: state.Account.FindPw.status,
        valid: state.Authentication.status.valid,
        userInfo: state.Authentication.status.userInfo,
        isLoggedIn: state.Authentication.status.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignInRequest: (data) => {
            return dispatch(SignInRequest(data))
        },
        SignOutRequest: () => {
            return dispatch(SignOutRequest())
        },
        FindPwRequest: (data) => {
            return dispatch(FindPwRequest(data))
        },
        CheckEmailRequest: (email) => {
            return dispatch(CheckEmailRequest(email))
        }
    }
}

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(HeaderContainer))

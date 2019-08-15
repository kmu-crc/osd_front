import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SignNav from "components/Header/SignNav/SignNav"
import { SignInRequest, SignOutRequest } from "redux/modules/auth"

class SignNavContainer extends Component {
    render() {
        return (
            <SignNav {...this.props} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.Authentication.status.userInfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignInRequest: (data) => {
            return dispatch(SignInRequest(data))
        },
        SignOutRequest: () => {
            return dispatch(SignOutRequest())
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignNavContainer))
// export default SignNavContainer
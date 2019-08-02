import React, { Component } from 'react'
import Header from "components/Header/Header"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInRequest } from "redux/modules/auth"

class HeaderContainer extends Component {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}
const mapStateTopProps = (state) => {
    return {
        userInfo: state.auth.status.userInfo,
        isSignedIn: state.auth.status.isSignedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignInRequest: (data) => {
            return dispatch(SignInRequest(data))
        }
    }
}

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(HeaderContainer))

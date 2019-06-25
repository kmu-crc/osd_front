import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export default function CheckAuth(Components) {
    class AuthenticatedComponent extends Component {
        state = {
            valid: false
        }
        render() {
            return this.state.valid || <Components {...this.props} /> // <Dimmer active> <Loader /> </Dimmer>
        }
    }
    // const mapStateToProps = (state) => {
    // return {
    // state
    // }
    // }
    // const mapDispatchToProps = (dispatch) => {
    // return {
    // dispatch
    // }
    // }
    // return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent))
    return withRouter(AuthenticatedComponent)
}
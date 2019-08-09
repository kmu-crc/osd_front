import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SignOutRequest, CheckTokenRequest } from "redux/modules/auth";
import { SetSession, GetSession } from "modules/Sessions";
// import { Dimmer, Loader } from "semantic-ui-react";
// import { SetActive } from "actions/OpenDesign";

export default function CheckAuth(Components) {
    class AuthenticatedComponent extends Component {
        state = {
            valid: false
        }
        componentWillMount() {
            this.checkAuth()
        }
        componentDidUpdate(nextProps) {
            if (this.props.token !== nextProps.token) {
                this.checkAuth()
            }
        }

        checkAuth() {
            if (this.props.token !== null) {
                // console.log("token:", this.props.token)
                SetSession("opendesign_token", this.props.token)
            }
            GetSession("opendesign_token").then(token => {
                this.props.CheckTokenRequest(token).then(data => {
                    if (data.info) {
                        if (!data.info.isDetail) {
                            if (this.props.location.pathname === "/inserUserDetail") {
                                this.setState({ valid: true })
                            } else {
                                this.props.history.push("/inserUserDetail")
                            }
                        } else {
                            this.setState({ valid: true })
                        }
                    } else {
                        this.setState({ valid: true })
                    }
                })
            }).catch(data => {
                this.props.SignOutRequest()
                this.setState({ valid: false })
            })
        }

        render() {
            // console.log(this.props.userInfo, "userInfo")
            // return this.state.valid ? 
            return <Components {...this.props} />
            //  : <Dimmer active><Loader /></Dimmer>
        }
    }
    const mapStateToProps = (state) => {
        return {
            token: state.auth.status.token,
            valid: state.auth.status.valid,
            userInfo: state.auth.status.userInfo,
            // isActive: state.OpenDesign.isActive
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            CheckTokenRequest: (token) => {
                return dispatch(CheckTokenRequest(token))
            },
            SignOutRequest: () => {
                return dispatch(SignOutRequest())
            },
            // SetActive: (active) => {
            // return dispatch(SetActive(active))
            // }
        }
    }
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent))
}

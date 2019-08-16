import host from "config"
import update from "react-addons-update"
import { SetSession } from "modules/Sessions"


const AUTH_SIGNIN = "AUTH_SIGNIN"
const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS"
const AUTH_SIGNIN_FAILURE = "AUTH_SIGNIN_FAILURE"
const AUTH_SIGNIN_IS_NOT_MEMBER = "AUTH_SIGNIN_IS_NOT_MEMBER"
const AUTH_SIGNIN_IS_NOT_PASSWORD = "AUTH_SIGNIN_IS_NOT_PASSWORD"
const AUTH_SIGNOUT = "AUTH_SIGNOUT"
const AUTH_SIGNUP = "AUTH_SIGNUP"
const AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS"
const AUTH_SIGNUP_FAILURE = "AUTH_SIGNUP_FAILURE"
const FIND_PW = "FIND_PW"
const FIND_PW_SUCCESS = "FIND_PW_SUCCESS"
const FIND_PW_FAILURE = "FIND_PW_FAILURE"


const FindPw = () => ({ type: FIND_PW })
const FindPwSuccess = (res) => ({ type: FIND_PW_SUCCESS, message: res.message })
const FindPwFailure = (err) => ({ type: FIND_PW_FAILURE, message: err.message })
const SignIn = () => ({ type: AUTH_SIGNIN })
const SignInIsNotMember = () => ({ type: AUTH_SIGNIN_IS_NOT_MEMBER, success: false })
const SignInIsNotPassword = () => ({ type: AUTH_SIGNIN_IS_NOT_PASSWORD, success: false })
const SignInSuccess = (token) => ({ type: AUTH_SIGNIN_SUCCESS, token: token })
const SignInFailure = () => ({ type: AUTH_SIGNIN_FAILURE, success: false })
const SignOut = () => ({ type: AUTH_SIGNOUT })
const SignUp = () => ({ type: AUTH_SIGNUP })
const SignUpSuccess = () => ({ type: AUTH_SIGNUP_SUCCESS })
const SignUpFailure = () => ({ type: AUTH_SIGNUP_FAILURE })


const initialState = {
    FindPw: { status: "INIT" },
    signUp: { status: "INIT" },
    status: { success: false, massege: null }
    // ,status: { message: "" }
}


export default function Account(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case AUTH_SIGNIN:
            return update(state, {
                signIn: {
                    status: { $set: "WAITING" }
                }
            })
        case AUTH_SIGNIN_SUCCESS:
            return update(state, {
                signIn: {
                    status: { $set: "SUCCESS" }
                }
            })
        case AUTH_SIGNIN_FAILURE:
            return update(state, {
                signIn: {
                    status: { $set: "FAILURE" }
                }
            })
        case AUTH_SIGNIN_IS_NOT_MEMBER:
            return update(state, {
                signIn: {
                    status: { $set: "NOTMEMBER" }
                }
            })
        case AUTH_SIGNIN_IS_NOT_PASSWORD:
            return update(state, {
                signIn: {
                    status: { $set: "NOTMATCHINGPASSWORD" }
                }
            })
        case AUTH_SIGNUP:
            return update(state, {
                signUp: {
                    status: { $set: "WAITING" }
                }
            })
        case AUTH_SIGNUP_SUCCESS:
            return update(state, {
                signUp: {
                    status: { $set: "SUCCESS" }
                }
            })
        case AUTH_SIGNUP_FAILURE:
            return update(state, {
                signUp: {
                    status: { $set: "FAILURE" }
                }
            })
        case FIND_PW:
            return update(state, {
                FindPw: {
                    status: { $set: "WAITING" }
                },
                status: {
                    message: { $set: "" }
                }
            })
        case FIND_PW_SUCCESS:
            return update(state, {
                FindPw: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    message: { $set: action.message }
                }
            })
        case FIND_PW_FAILURE:
            return update(state, {
                signFindPwIn: {
                    status: { $set: "FAILURE" }
                },
                status: {
                    message: { $set: action.message }
                }
            })
        default:
            return state
    }
}


export function SignUpRequest(data) {
    return (dispatch) => {
        dispatch(SignUp())
        return fetch(`${host}/users/signUp`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then(function (res) {
                return res.json()
            })
            .then(function (res) {
                if (res.success) {
                    SetSession("opendesign_token", res.token)
                }
                return dispatch(SignUpSuccess())
            }).catch((error) => {
                return dispatch(SignUpFailure())
            })
    }
}
export function SignOutRequest() {
    return (dispatch) => {
        return dispatch(SignOut())
    }
}
export function SignInRequest(data) {
    return (dispatch) => {
        dispatch(SignIn())
        return fetch(`${host}/users/signIn`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then(function (res) {
                console.log("res", res)
                return res.json()
            })
            .then(function (res) {
                if (res.isMember && res.isPassword) {
                    SetSession("opendesign_token", res.token)
                    return dispatch(SignInSuccess())
                } else {
                    if (!res.isMember) {
                        return dispatch(SignInIsNotMember())
                    } else if (!res.isPassword) {
                        return dispatch(SignInIsNotPassword())
                    }
                }
            })
            .catch((error) => {
                return dispatch(SignInFailure())
            })
    }
}
export function FindPwRequest(data) {
    return (dispatch) => {
        dispatch(FindPw())

        return fetch(`${host}/users/findPw`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then(function (res) {
                return res.json()
            })
            .then(function (res) {
                dispatch(FindPwSuccess(res))
            }).catch((error) => {
                dispatch(FindPwFailure(error))
            })
    }
}


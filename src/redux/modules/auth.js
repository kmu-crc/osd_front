import host from "config"
import update from 'react-addons-update'
import { SetSession } from "modules/Sessions"

// actions
const SIGN_IN_REQUEST = "opendesign/auth/SIGN-IN-REQUEST"
const SIGN_IN_SUCCESS = "opendesign/auth/SIGN-IN-SUCCESS"
const SIGN_IN_FAILURE = "opendesign/auth/SIGN-IN-FAILURE"
const SIGN_IN_IS_NOT_MEMBER = "opendesign/auth/SIGN-IN-IS-NOT-MEMBER"
const SIGN_IN_IS_NOT_PASSWORD = "opendesign/auth/SIGN-IN-IS-NOT-PASSWORD"

const CHECK_TOKEN_REQUEST = "opendesign/auth/CHECK-TOKEN-REQUEST"
const CHECK_TOKEN_SUCCESS = "opendesign/auth/CHECK-TOKEN-SUCCESS"
const CHECK_TOKEN_FAILURE = "opendesign/auth/CHECK-TOKEN-FAILURE"
const CHECK_EMAIL_REQUEST = "opendesign/auth/CHECK-EMAIL-REQUEST"
const CHECK_EMAIL_SUCCESS = "opendesign/auth/CHECK-EMAIL-SUCCESS"
const CHECK_EMAIL_FAILURE = "opendesign/auth/CHECK-EMAIL-FAILURE"
const CHECK_NICKNAME_REQUEST = "opendesign/auth/CHECK-NICKNAME-REQUEST"
const CHECK_NICKNAME_SUCCESS = "opendesign/auth/CHECK-NICKNAME-SUCCESS"
const CHECK_NICKNAME_FAILURE = "opendesign/auth/CHECK-NICKNAME-FAILURE"

const SIGN_OUT = "opendesign/auth/SIGN-OUT-REQUEST"

// const SIGN_UP_REQUEST = "opendesign/auth/SIGN-UP-REQUEST"
// const SIGN_UP_SUCCESS = "opendesign/auth/SIGN-UP-SUCCESS"
// const SIGN_UP_FAILURE = "opendesign/auth/SIGN-UP-FAILURE"

// action creators
export const SignIn = () => ({ type: SIGN_IN_REQUEST })
export const SignInSuccess = (token) => ({ type: SIGN_IN_SUCCESS, success: true, token: token })
export const SignInFailure = () => ({ type: SIGN_IN_FAILURE, success: false })
export const SignInIsNotMember = () => ({ type: SIGN_IN_IS_NOT_MEMBER, success: false })
export const SignOut = () => ({ type: SIGN_OUT })
export const SignInIsNotPassword = () => ({ type: SIGN_IN_IS_NOT_PASSWORD, success: false })
export const CheckNickName = () => ({ type: CHECK_NICKNAME_REQUEST })
export const CheckNickNameSuccess = () => ({ type: CHECK_NICKNAME_SUCCESS, checkNickname: true })
export const CheckNickNameFailure = err => ({ type: CHECK_NICKNAME_FAILURE, checkNickname: false, error: err })
export const CheckEmail = () => ({ type: CHECK_EMAIL_REQUEST })
export const CheckEmailSuccess = () => ({ type: CHECK_EMAIL_SUCCESS, checkEmail: true })
export const CheckEmailFailure = (err) => ({ type: CHECK_EMAIL_FAILURE, checkEmail: false, error: err })

export const CkeckToken = () => ({ type: CHECK_TOKEN_REQUEST })
export const CkeckTokenSuccess = (info, token) => ({ type: CHECK_TOKEN_SUCCESS, info, token })
export const CkeckTokenFailure = () => ({ type: CHECK_TOKEN_FAILURE })


// initial state
const initialState = {
    signIn: { status: "INIT" },
    status: { valid: false, userInfo: null, isSignedIn: false, success: false, token: null, message: null },
    check: { status: "INIT" },
    checkStatus: { checkEmail: false, checkNickname: false }
}

// reducer
export default function auth(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case SIGN_IN_REQUEST:
            return update(state, { signIn: { status: { $set: "WAITING" } } })
        case SIGN_IN_SUCCESS:
            return update(state, { signIn: { status: { $set: "SUCCESS" } } })
        case SIGN_IN_FAILURE:
            return update(state, { signIn: { status: { $set: "FAILURE" } } })
        case SIGN_IN_IS_NOT_MEMBER:
            return update(state, { signIn: { status: { $set: "NOTMEMBER" } } })
        case SIGN_IN_IS_NOT_PASSWORD:
            return update(state, { signIn: { status: { $set: "NOTMATCHINGPASSWORD" } } })
        case CHECK_TOKEN_REQUEST:
            return update(state, { status: { isSignedIn: { $set: true } } })
        case CHECK_TOKEN_SUCCESS:
            return update(state, { status: { userInfo: { $set: action.info }, token: { $set: action.token }, valid: { $set: true } } })
        case CHECK_TOKEN_FAILURE:
            return update(state, { status: { valid: { $set: false }, isSignedIn: { $set: false }, userInfo: { $set: null }, token: { $set: null } } })
        case CHECK_EMAIL_REQUEST:
            return update(state, { check: { status: { $set: "WAITING" } } })
        case CHECK_EMAIL_SUCCESS:
            return update(state, { check: { status: { $set: "SUCCESS" } }, checkStatus: { checkEmail: { $set: action.checkEmail } } })
        case CHECK_EMAIL_FAILURE:
            return update(state, { check: { status: { $set: "FAILURE" } }, checkStatus: { checkEmail: { $set: action.checkEmail } } })
        case CHECK_NICKNAME_REQUEST:
            return update(state, { check: { status: { $set: "WAITING" } } })
        case CHECK_NICKNAME_SUCCESS:
            return update(state, { check: { status: { $set: "SUCCESS" } }, checkStatus: { checkNickNAme: { $set: action.checkNickNAme } } })
        case CHECK_NICKNAME_FAILURE:
            return update(state, { check: { status: { $set: "FAILURE" } }, checkStatus: { checkNickNAme: { $set: action.checkNickNAme } } })
        case SIGN_OUT:
            return update(state, { status: { valid: { $set: false }, isSignedIn: { $set: false }, token: { $set: null }, userInfo: { $set: null } } })
        default:
            return state
    }
}

// api actions
export function SignInRequest(data) {
    return (dispatch) => {
        dispatch(SignIn())
        const url = `${host}/users/signIn`
        return fetch(url, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then(res => {
                console.log("res", res)
                return res.json()
            })
            .then(res => {
                console.log("res", res)
                if (res.isMember && res.isPassword) {
                    // SetSession("opendesign_token", res.token);
                    return dispatch(SignInSuccess(res.token))
                } else {
                    if (!res.isMember) {
                        return dispatch(SignInIsNotMember())
                    } else if (!res.isPassword) {
                        return dispatch(SignInIsNotPassword())
                    }
                }
            }).catch(error => {
                return dispatch(SignInFailure())
            })
    }
}

export function CheckTokenRequest(token) {
    return (dispatch) => {
        dispatch(CkeckToken())
        return fetch(`${host}/users/check`, { headers: { 'x-access-token': token, 'Content-Type': 'application/json' } })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    return dispatch(CkeckTokenSuccess(res.info, token))
                } else {
                    SetSession("opendesign_token", null);
                    return dispatch(CkeckTokenFailure())
                }
            })
            .catch(err => {
                SetSession("opendesign_token", null);
                dispatch(CkeckTokenFailure())
            })
    }
}

export function CheckEmailRequest(email) {
    return (dispatch) => {
        dispatch(CheckEmail())
        return fetch(`${host}/users/checkEmail`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(email) })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    return dispatch(CheckEmailSuccess())
                } else {
                    return dispatch(CheckEmailFailure(res.error))
                }
            })
            .catch(err => dispatch(CheckEmailFailure()))
    }
}

export function CheckNickNameRequest(NickName) {
    return (dispatch) => {
        dispatch(CheckNickName())
        return fetch(`${host}/users/checkNickName`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(NickName) })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    return dispatch(CheckNickNameSuccess())
                } else {
                    return dispatch(CheckNickNameFailure(res.error))
                }
            })
            .catch(err => dispatch(CheckNickNameFailure()))
    }
}

export function SignOutRequest() {
    return (dispatch) => {
        return dispatch(SignOut())
    }
}


import * as types from './AcionTypes';
import axios from 'axios';

export function loginRequest(userEmail, password) {
    return (dispatch) => {
        dispatch(login());

        return axios.post("http://localhost:7777/api/user/login", { userEmail, password }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                dispatch(loginSuccess(response.data.token));
            }).catch((error) => {
                dispatch(loginFailure());
            })
    }
};

export function login() {
    return {
        type: types.AUTH_LOGIN
    }
};

export function loginSuccess(token) {
    return {
        type: types.AUTH_LOGIN_SUCCESS,
        token : token
    }
};

export function loginFailure() {
    return {
        type: types.AUTH_LOGIN_FAILURE
    }
}

export function getStatusRequest(token) {
    return (dispatch) => {
        dispatch(getStatus());
        return axios.get('http://localhost:7777/api/user/check', { headers: { 'x-access-token': token, 'Content-Type': 'application/json' } })
            .then((response) => {
                return dispatch(getStatusSuccess(response.data.info.userEmail, token));
            }).catch((error) => {
                dispatch(getStatusFailure());
            });
    };
}

export function getStatus() {
    return {
        type: types.AUTH_GET_STATUS
    };
}

export function getStatusSuccess(userEmail, token) {
    return {
        type: types.AUTH_GET_STATUS_SUCCESS,
        userEmail : userEmail,
        token : token
    };
}

export function getStatusFailure() {
    return {
        type: types.AUTH_GET_STATUS_FAILURE
    };
}

export function getStatusValueFunc(){
    return (dispatch) => {
        return Promise.resolve(dispatch(getStatusValue()));
    }
}

export function getStatusValue(){
    return {
        type: types.AUTH_GET_STATUS_VALUE
    }
}

export function getLogoutsRequest() {
    return (dispatch) => {
        return Promise.resolve(dispatch(getLogout()));
    };
}

export function getLogout() {
    return {
        type: types.AUTH_LOGOUT
    };
}

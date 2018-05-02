
import * as types from "./ActionTypes";

export function SignUpRequest(data) {
  return (dispatch) => {
    dispatch(SignUp());

    return fetch("http://localhost:8080/users/signUp", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        dispatch(SignUpSuccess(res));
      }).catch((error) => {
        dispatch(SignUpFailure());
      })
  }
};

export function SignUp() {
  return {
    type: types.AUTH_SIGNUP
  }
};

export function SignUpSuccess() {
  return {
    type: types.AUTH_SIGNUP_SUCCESS
  }
};

export function SignUpFailure() {
  return {
    type: types.AUTH_SIGNUP_FAILURE
  }
};

export function SignInRequest(data) {
  return (dispatch) => {
    dispatch(SignIn());

    return fetch("http://localhost:8080/users/signIn", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        console.log("res", res);
        return res.json();
      })
      .then(function (res) {
        if (res.isMember && res.isPassword) {
          return dispatch(SignInSuccess(res.token));
        } else {
          if (!res.isMember) {
            return dispatch(SignInIsNotMember())
          } else if (!res.isPassword) {
            return dispatch(SignInIsNotPassword())
          }
        };
      }).catch((error) => {
        return dispatch(SignInFailure());
      })
  }
};

export function SignIn() {
  return {
    type: types.AUTH_SIGNIN
  }
};

export function SignInIsNotMember() {
  return {
    type: types.AUTH_SIGNIN_IS_NOT_MEMBER,
    success: false,
  }
};

export function SignInIsNotPassword() {
  return {
    type: types.AUTH_SIGNIN_IS_NOT_PASSWORD,
    success: false,
  }
}

export function SignInSuccess(token) {
  return {
    type: types.AUTH_SIGNIN_SUCCESS,
    token: token
  }
};

export function SignInFailure() {
  return {
    type: types.AUTH_SIGNIN_FAILURE,
    success: false
  }
};
export function FBSignUpRequest(data) {
  return (dispatch) => {
    dispatch(FBSignUp());

    return fetch("http://localhost:8080/users/FBSignUp", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        if (res.success) {
          return dispatch(FBSignInSuccess(res.token));
        } else {
          return dispatch(FBSignUpOverlapMember(res.error))
        }
      }).catch((error) => {
        return dispatch(FBSignInFailure());
      })
  }
};

export function FBSignUp() {
  return {
    type: types.AUTH_FBSIGNUP
  }
};

export function FBSignUpOverlapMember(err) {
  return {
    type: types.AUTH_FBSIGNUP_OVERLAP_MEMBER,
    success: false,
    message: err
  }
};

export function FBSignUpSuccess(token) {
  return {
    type: types.AUTH_FBSIGNUP_SUCCESS,
    token: token
  }
};

export function FBSignUpFailure() {
  return {
    type: types.AUTH_FBSIGNUP_FAILURE
  }
};

export function FBSignInRequest(data) {
  return (dispatch) => {
    dispatch(FBSignIn());

    return fetch("http://localhost:8080/users/FBSignIn", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        if (res.isMember) {
          return dispatch(FBSignInSuccess(res.token));
        } else {
          return dispatch(FBSignInIsNotMember())
        }
      }).catch((error) => {
        return dispatch(FBSignInFailure());
      })
  }
};

export function FBSignIn() {
  return {
    type: types.AUTH_FBSIGNIN
  }
};

export function FBSignInIsNotMember() {
  return {
    type: types.AUTH_FBSIGNIN_IS_NOT_MEMBER,
    success: false,
  }
};

export function FBSignInSuccess(token) {
  return {
    type: types.AUTH_FBSIGNIN_SUCCESS,
    token: token
  }
};

export function FBSignInFailure() {
  return {
    type: types.AUTH_FBSIGNIN_FAILURE
  }
};

export function CheckTokenRequest(token) {
  return (dispatch) => {
    dispatch(CkeckToken());
    return fetch("http://localhost:8080/users/check", { headers: { 'x-access-token': token, 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CkeckTokenSuccess(res.info, token));
        } else {
          return dispatch(CkeckTokenFailure());
        }
      })
      .catch(err => dispatch(CkeckTokenFailure()));
  };
};

export function CkeckToken() {
  return {
    type: types.AUTH_CHECK_TOKEN
  }
};

export function CkeckTokenSuccess(info, token) {
  return {
    type: types.AUTH_CHECK_TOKEN_SUCCESS,
    info,
    token
  }
};

export function CkeckTokenFailure() {
  return {
    type: types.AUTH_CHECK_TOKEN_FAILURE
  }
};


export function SignOutRequest() {
  return (dispatch) => {
    return dispatch(SignOut());
  };
};

export function SignOut() {
  return {
    type: types.AUTH_SIGNOUT
  }
};

export function CheckEmailRequest(email) {
  return (dispatch) => {
    dispatch(CheckEmail());
    return fetch("http://localhost:8080/users/checkEmail", { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify({email}) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CheckEmailSuccess());
        } else {
          return dispatch(CheckEmailFailure(res.error));
        }
      })
      .catch(err => dispatch(CheckEmailFailure()));
  };
};

export function CheckEmail() {
  return {
    type: types.AUTH_CHECK_EMAIL
  }
};

export function CheckEmailSuccess() {
  return {
    type: types.AUTH_CHECK_EMAIL_SUCCESS,
    checkEmail: true
  }
};


export function CheckEmailFailure(err) {
  return {
    type: types.AUTH_CHECK_EMAIL_FAILURE,
    checkEmail: false,
    error: err
  }
};


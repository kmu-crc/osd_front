import host from "config"
import update from 'react-addons-update'

const GET_DESIGN_COMMENT = "GET_DESIGN_COMMENT";
const GET_DESIGN_COMMENT_SUCCESS = "GET_DESIGN_COMMENT_SUCCESS";
const GET_DESIGN_COMMENT_FAILURE = "GET_DESIGN_COMMENT_FAILURE";
const CREATE_DESIGN_COMMENT = "CREATE_DESIGN_COMMENT";
const CREATE_DESIGN_COMMENT_SUCCESS = "CREATE_DESIGN_COMMENT_SUCCESS";
const CREATE_DESIGN_COMMENT_FAILURE = "CREATE_DESIGN_COMMENT_FAILURE";
const DELETE_DESIGN_COMMENT = "DELETE_DESIGN_COMMENT";
const DELETE_DESIGN_COMMENT_SUCCESS = "DELETE_DESIGN_COMMENT_SUCCESS";
const DELETE_DESIGN_COMMENT_FAILURE = "DELETE_DESIGN_COMMENT_FAILURE";

const GET_CARD_COMMENT = "GET_CARD_COMMENT"
const GET_CARD_COMMENT_SUCCESS = "GET_CARD_COMMENT_SUCCESS"
const GET_CARD_COMMENT_FAILURE = "GET_CARD_COMMENT_FAILURE"
const CREATE_CARD_COMMENT = "CREATE_CARD_COMMENT"
const CREATE_CARD_COMMENT_SUCCESS = "CREATE_CARD_COMMENT_SUCCESS"
const CREATE_CARD_COMMENT_FAILURE = "CREATE_CARD_COMMENT_FAILURE"
const DELETE_CARD_COMMENT = "DELETE_CARD_COMMENT"
const DELETE_CARD_COMMENT_SUCCESS = "DELETE_CARD_COMMENT_SUCCESS"
const DELETE_CARD_COMMENT_FAILURE = "DELETE_CARD_COMMENT_FAILURE"

const GET_COUNT_DESIGN_COMMENT = "GET_COUNT_DESIGN_COMMENT";
const GET_COUNT_DESIGN_COMMENT_SUCCESS = "GET_COUNT_DESIGN_COMMENT_SUCCESS";
const GET_COUNT_DESIGN_COMMENT_FAILURE = "GET_COUNT_DESIGN_COMMENT_FAILURE";

const GetCardComment = () => ({ type: GET_CARD_COMMENT })
const GetCardCommentSuccess = data => ({ type: GET_CARD_COMMENT_SUCCESS, CardComment: data })
const GetCardCommentFailure = error => ({ type: GET_CARD_COMMENT_FAILURE })
const CreateCardComment = () => ({ type: CREATE_CARD_COMMENT })
const CreateCardCommentSuccess = res => ({ type: CREATE_CARD_COMMENT_SUCCESS, data: res })
const CreateCardCommentFailure = error => ({ type: CREATE_CARD_COMMENT_FAILURE })
const DeleteCardComment = () => ({ type: DELETE_CARD_COMMENT })
const DeleteCardCommentSuccess = res => ({ type: DELETE_CARD_COMMENT_SUCCESS, data: res })
const DeleteCardCommentFailure = error => ({ type: DELETE_CARD_COMMENT_FAILURE })
const GetDesignComment = () => { return { type: GET_DESIGN_COMMENT }; };
const GetDesignCommentSuccess = data => { return { type: GET_DESIGN_COMMENT_SUCCESS, Comment: data }; };
const GetDesignCommentFailure = error => { return { type: GET_DESIGN_COMMENT_FAILURE }; };
const CreateDesignComment = () => { return { type: CREATE_DESIGN_COMMENT }; };
const CreateDesignCommentSuccess = res => { return { type: CREATE_DESIGN_COMMENT_SUCCESS, data: res }; };
const CreateDesignCommentFailure = error => { return { type: CREATE_DESIGN_COMMENT_FAILURE }; };
const DeleteDesignComment = () => { return { type: DELETE_DESIGN_COMMENT }; };
const DeleteDesignCommentSuccess = res => { return { type: DELETE_DESIGN_COMMENT_SUCCESS, data: res }; };
const DeleteDesignCommentFailure = error => { return { type: DELETE_DESIGN_COMMENT_FAILURE }; };

const GetCountDesignComment = () => ({ type: GET_COUNT_DESIGN_COMMENT, });
const GetCountDesignCommentSuccess = (res) => ({ type: GET_COUNT_DESIGN_COMMENT_SUCCESS, Count: res });
const GetCountDesignCommentFailure = (error) => ({ type: GET_COUNT_DESIGN_COMMENT_FAILURE, error: error });

const initialState = {
    GetCardComment: { status: "INIT" },
    CreateCardComment: { status: "INIT" },
    DeleteCardComment: { status: "INIT" },
    GetDesignComment: { status: "INIT" },
    CreateDesignComment: { status: "INIT" },
    DeleteDesignComment: { status: "INIT" },
    CountDesignComment: { status: "INIT" },
    status: { Comment: [], CardComment: [], CountDesignComment: 0 }
};

export function DesignComment(state, action) {
    if (typeof state === "undefined")
        state = initialState
    switch (action.type) {
        case GET_DESIGN_COMMENT:
            return update(state, {
                CreateDesignComment: {
                    status: { $set: "WATTING" }
                }
            });
        case GET_DESIGN_COMMENT_SUCCESS:
            return update(state, {
                CreateDesignComment: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    Comment: { $set: action.Comment }
                }
            });
        case GET_DESIGN_COMMENT_FAILURE:
            return update(state, {
                CreateDesignComment: {
                    status: { $set: "FAILURE" }
                }
            });
        case CREATE_DESIGN_COMMENT:
            return update(state, {
                CreateDesignComment: {
                    status: { $set: "WATTING" }
                }
            });
        case CREATE_DESIGN_COMMENT_SUCCESS:
            return update(state, {
                CreateDesignComment: {
                    status: { $set: "SUCCESS" }
                }
            });
        case CREATE_DESIGN_COMMENT_FAILURE:
            return update(state, {
                CreateDesignComment: {
                    status: { $set: "FAILURE" }
                }
            });
        case DELETE_DESIGN_COMMENT:
            return update(state, {
                DeleteDesignComment: {
                    status: { $set: "WATTING" }
                }
            });
        case DELETE_CARD_COMMENT_SUCCESS:
            return update(state, {
                DeleteDesignComment: { status: { $set: "SUCCESS" } }
            })
        case DELETE_DESIGN_COMMENT_FAILURE:
            return update(state, {
                DeleteDesignComment: { status: { $set: "FAILURE" } }
            })
        case GET_CARD_COMMENT:
            return update(state, {
                CreateCardComment: { status: { $set: "WATTING" } }
            });
        case GET_CARD_COMMENT_SUCCESS:
            return update(state, {
                CreateCardComment: { status: { $set: "SUCCESS" } }, status: { CardComment: { $set: action.CardComment } }
            });
        case GET_CARD_COMMENT_FAILURE:
            return update(state, { CreateCardComment: { status: { $set: "FAILURE" } } });
        case CREATE_CARD_COMMENT:
            return update(state, { CreateCardComment: { status: { $set: "WATTING" } } });

        case GET_COUNT_DESIGN_COMMENT:
            return update(state, { CountDesignComment: { status: { $set: "WATTING" } } });
        case GET_COUNT_DESIGN_COMMENT_SUCCESS:
            return update(state, {
                CountDesignComment: { status: { $set: "SUCCESS" } },
                status: { CountDesignComment: { $set: action.Count } }
            });
        case GET_COUNT_DESIGN_COMMENT_FAILURE:
            return update(state, { CountDesignComment: { status: { $set: "FAILURE" } } });
        default:
            return state;
    }
};


export const CreateDesignCommentRequest = (data, design_id, token) => {
    return dispatch => {
        dispatch(CreateDesignComment());
        console.log("request", data);
        return fetch(
            `${host}/design/designDetail/${design_id}/createDetailComment`,
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            }
        )
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                return dispatch(CreateDesignCommentSuccess(res));
            })
            .catch(error => {
                console.log("insert issue err", error);
                return dispatch(CreateDesignCommentFailure(error));
            });
    };
};
export const DeleteDesignCommentRequest = (
    design_id,
    comment_id,
    token
) => {
    return dispatch => {
        dispatch(DeleteDesignComment());
        return fetch(
            `${host}/design/designDetail/${design_id}/deleteDetailComment/${comment_id}`,
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                },
                method: "DELETE"
            }
        )
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                return dispatch(DeleteDesignCommentSuccess(res));
            })
            .catch(error => {
                console.log("insert issue err", error);
                return dispatch(DeleteDesignCommentFailure(error));
            });
    };
};
export const GetCardCommentRequest = (design_id, card_id) => {
    return dispatch => {
        dispatch(GetCardComment());
        return fetch(
            `${host}/design/designDetail/${design_id}/getCardComment/${card_id}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET"
            }
        )
            .then(function (res) {
                return res.json();
            })
            .then(res => {
                console.log("card-data:", res);
                return dispatch(GetCardCommentSuccess(res.data));
            })
            .catch(error => {
                console.log("get card comment err", error);
                return dispatch(GetCardCommentFailure(error));
            });
    };
}
export const CreateCardCommentRequest = (data, design_id, card_id, token) => {
    return dispatch => {
        dispatch(CreateCardComment());
        console.log("request", data);
        return fetch(
            `${host}/design/designDetail/${design_id}/createCardComment/${card_id}`,
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            }
        )
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                return dispatch(CreateCardCommentSuccess(res));
            })
            .catch(error => {
                console.log("insert issue err", error);
                return dispatch(CreateCardCommentFailure(error));
            });
    };
}
export const DeleteCardCommentRequest = (
    design_id,
    card_id,
    comment_id,
    token
) => {
    return dispatch => {
        dispatch(DeleteCardComment());
        return fetch(
            `${host}/design/designDetail/${design_id}/deleteCardComment/${card_id}/${comment_id}`,
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                },
                method: "DELETE"
            }
        )
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                return dispatch(DeleteCardCommentSuccess(res));
            })
            .catch(error => {
                console.log("insert issue err", error);
                return dispatch(DeleteCardCommentFailure(error));
            });
    };
}
export const GetDesignCommentRequest = (design_id) => {
    return dispatch => {
        dispatch(GetDesignComment());
        return fetch(
            `${host}/design/designDetail/${design_id}/getDetailComment`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET"
            }
        )
            .then(function (res) {
                return res.json();
            })
            .then(res => {
                return dispatch(GetDesignCommentSuccess(res.data));
            })
            .catch(error => {
                console.log("get card comment err", error);
                return dispatch(GetDesignCommentFailure(error));
            });
    };
};
export const GetCountDesignCommentRequest = (design_id) => {
    return dispatch => {
        dispatch(GetCountDesignComment());
        const url = `${host}/design/designDetail/${design_id}/getCountComment`;
        return fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "GET"
        })
            .then(res => res.json())
            .then(res => dispatch(GetCountDesignCommentSuccess(res.data)))
            .catch(error => {
                console.log("get count of design comment err", error);
                return dispatch(GetCountDesignCommentFailure(error));
            });
    };
};

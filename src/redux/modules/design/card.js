import host from "config"
import update from "react-addons-update"



const CREATE_BOARD = "CREATE_BOARD"
const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS"
const CREATE_BOARD_FAILURE = "CREATE_BOARD_FAILURE"
const UPDATE_BOARD = "UPDATE_BOARD"
const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS"
const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE"
const DELETE_BOARD = "DELETE_BOARD"
const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS"
const DELETE_BOARD_FAILURE = "DELETE_BOARD_FAILURE"
const GET_BOARD = "GET_BOARD"
const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS"
const GET_BOARD_FAILURE = "GET_BOARD_FAILURE"

const CREATE_CARD = "CREATE_CARD"
const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS"
const CREATE_CARD_FAILURE = "CREATE_CARD_FAILURE"
const GET_CARD = "GET_CARD"
const GET_CARD_SUCCESS = "GET_CARD_SUCCESS"
const GET_CARD_FAILURE = "GET_CARD_FAILURE"
const GET_CARD_DETAIL = "GET_CARD_DETAIL"
const GET_CARD_DETAIL_SUCCESS = "GET_CARD_DETAIL_SUCCESS"
const GET_CARD_DETAIL_FAILURE = "GET_CARD_DETAIL_FAILURE"
const UPDATE_CARD_TITLE = "UPDATE_CARD_TITLE"
const UPDATE_CARD_TITLE_SUCCESS = "UPDATE_CARD_TITLE_SUCCESS"
const UPDATE_CARD_TITLE_FAILURE = "UPDATE_CARD_TITLE_FAILURE"
const UPDATE_CARD_CONTENT = "UPDATE_CARD_CONTENT"
const UPDATE_CARD_CONTENT_SUCCESS = "UPDATE_CARD_CONTENT_SUCCESS"
const UPDATE_CARD_CONTENT_FAILURE = "UPDATE_CARD_CONTENT_FAILURE"
const UPDATE_CARD_IMAGES = "UPDATE_CARD_IMAGES"
const UPDATE_CARD_IMAGES_SUCCESS = "UPDATE_CARD_IMAGES_SUCCESS"
const UPDATE_CARD_IMAGES_FAILURE = "UPDATE_CARD_IMAGES_FAILURE"
const UPDATE_CARD_SOURCES = "UPDATE_CARD_SOURCES"
const UPDATE_CARD_SOURCES_SUCCESS = "UPDATE_CARD_SOURCES_SUCCESS"
const UPDATE_CARD_SOURCES_FAILURE = "UPDATE_CARD_SOURCES_FAILURE"
const DELETE_CARD = "DELETE_CARD"
const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS"
const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE"
const UPDATE_DESIGN_FILE = "UPDATE_DESIGN_FILE"
const UPDATE_DESIGN_FILE_SUCCESS = "UPDATE_DESIGN_FILE_SUCCESS"
const UPDATE_DESIGN_FILE_FAILURE = "UPDATE_DESIGN_FILE_FAILURE"
const UPDATE_DESIGN_SOURCE = "UPDATE_DESIGN_SOURCE"
const UPDATE_DESIGN_SOURCE_SUCCESS = "UPDATE_DESIGN_SOURCE_SUCCESS"
const UPDATE_DESIGN_SOURCE_FAILURE = "UPDATE_DESIGN_SOURCE_FAILURE"
const DESIGN_SOURCE_RESET = "DESIGN_SOURCE_RESET"
const GET_DESIGN_SOURCE = "GET_DESIGN_SOURCE"
const GET_DESIGN_SOURCE_SUCCESS = "GET_DESIGN_SOURCE_SUCCESS"
const GET_DESIGN_SOURCE_FAILURE = "GET_DESIGN_SOURCE_FAILURE"


const CreateBoard = () => ({ type: CREATE_BOARD })
const CreateBoardSuccess = (res) => ({ type: CREATE_BOARD_SUCCESS, success: res.success })
const CreateBoardFailure = (error) => ({ type: CREATE_BOARD_FAILURE, success: error.success })
const GetBoard = () => ({ type: GET_BOARD })
const GetBoardSuccess = (res) => ({ type: GET_BOARD_SUCCESS, success: res.success, list: res.list })
const GetBoardFailure = (error) => ({ type: GET_BOARD_FAILURE, success: error.success })
const UpdateBoard = () => ({ type: UPDATE_BOARD })
const UpdateBoardSuccess = (res) => ({ type: UPDATE_BOARD_SUCCESS, success: res.success })
const UpdateBoardFailure = (error) => ({ type: UPDATE_BOARD_FAILURE, success: error.success })
const DeleteBoard = () => ({ type: DELETE_BOARD })
const DeleteBoardSuccess = (res) => ({ type: DELETE_BOARD_SUCCESS, success: res.success })
const DeleteBoardFailure = (error) => ({ type: DELETE_BOARD_FAILURE, success: error.success })
const CreateCard = () => ({ type: CREATE_CARD })
const CreateCardSuccess = res => ({ type: CREATE_CARD_SUCCESS, success: res.success, card: res.card_id })
const CreateCardFailure = error => ({ type: CREATE_CARD_FAILURE, success: error.success })
const GetCard = id => ({ type: GET_CARD, id })
const GetCardSuccess = (res, id) => ({ type: GET_CARD_SUCCESS, success: res.success, list: res.list, id })
const GetCardFailure = error => ({ type: GET_CARD_FAILURE, success: error.success })
const GetCardDetail = () => ({ type: GET_CARD_DETAIL })
const GetCardDetailSuccess = res => ({ type: GET_CARD_DETAIL_SUCCESS, success: res.success, detail: res.detail })
const GetCardDetailFailure = error => ({ type: GET_CARD_DETAIL_FAILURE, success: error.success })
const UpdateCardTitle = id => ({ type: UPDATE_CARD_TITLE, id })
const UpdateCardTitleSuccess = (res, id) => ({ type: UPDATE_CARD_TITLE_SUCCESS, success: res.success, list: res.list, id })
const UpdateCardTitleFailure = error => ({ type: UPDATE_CARD_TITLE_FAILURE, success: error.success })
const UpdateCardContent = id => ({ type: UPDATE_CARD_CONTENT, id })
const UpdateCardContentSuccess = (res, id) => ({ type: UPDATE_CARD_CONTENT_SUCCESS, success: res.success, list: res.list, id })
const UpdateCardContentFailure = error => ({ type: UPDATE_CARD_CONTENT_FAILURE, success: error.success })
const UpdateCardImages = id => ({ type: UPDATE_CARD_IMAGES })
const UpdateCardImagesSuccess = res => ({ type: UPDATE_CARD_IMAGES_SUCCESS, success: res.success })
const UpdateCardImagesFailure = error => ({ type: UPDATE_CARD_IMAGES_FAILURE, success: error.success })
const UpdateCardSources = id => ({ type: UPDATE_CARD_SOURCES })
const UpdateCardSourcesSuccess = res => ({ type: UPDATE_CARD_SOURCES_SUCCESS, success: res.success })
const UpdateCardSourcesFailure = error => ({ type: UPDATE_CARD_SOURCES_FAILURE, success: error.success })
const DeleteCard = () => ({ type: DELETE_CARD })
const DeleteCardSuccess = res => ({ type: DELETE_CARD_SUCCESS, success: res.success })
const DeleteCardFailure = error => ({ type: DELETE_CARD_FAILURE, success: error.success })
const UpdateDesignSource = () => ({ type: UPDATE_DESIGN_SOURCE })
const UpdateDesignSourceSuccess = res => ({ type: UPDATE_DESIGN_SOURCE_SUCCESS, data: res })
const UpdateDesignSourceFailure = error => ({ type: UPDATE_DESIGN_SOURCE_FAILURE })
const GetDesignSource = () => ({ type: GET_DESIGN_SOURCE })
const GetDesignSourceSuccess = res => ({ type: GET_DESIGN_SOURCE_SUCCESS, data: res.list })
const GetDesignSourceFailure = error => ({ type: GET_DESIGN_SOURCE_FAILURE })
const DesignSourceReset = () => ({ type: DESIGN_SOURCE_RESET, data: [] })


const initialState = {
    DesignDetailStep: { status: "INIT" },
    UpdateDesignFile: { status: "INIT" },
    DesignSourceDetail: { status: "INIT" },
    DesignSourceEdit: { status: "INIT" },
    DesignDetailStepCard: { status: "INIT" },
    status: { DesignDetailStepCard: {}, DesignDetailStep: [], allData: null, content: [], origin: [] }
}

export function DesignCard(state, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        case UPDATE_DESIGN_SOURCE:
            return update(state, {
                DesignSourceEdit: {
                    status: { $set: "WATTING" }
                }
            });
        case UPDATE_DESIGN_SOURCE_SUCCESS:
            return update(state, {
                DesignSourceEdit: {
                    status: { $set: "SUCCESS" }
                }
            });
        case UPDATE_DESIGN_SOURCE_FAILURE:
            return update(state, {
                DesignSourceEdit: {
                    status: { $set: "FAILURE" }
                }
            });
        case GET_DESIGN_SOURCE:
            return update(state, {
                DesignSourceDetail: {
                    status: { $set: "WATTING" }
                }
            });
        case GET_DESIGN_SOURCE_SUCCESS:
            return update(state, {
                DesignSourceDetail: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    content: { $set: action.data },
                    origin: { $set: action.data }
                }
            });
        case GET_DESIGN_SOURCE_FAILURE:
            return update(state, {
                DesignSourceDetail: {
                    status: { $set: "FAILURE" }
                },
                status: {
                    content: { $set: [] },
                    origin: { $set: [] }
                }
            });
        case UPDATE_DESIGN_FILE:
            return update(state, {
                UpdateDesignFile: {
                    status: { $set: "WATTING" }
                }
            })
        case UPDATE_DESIGN_FILE_SUCCESS:
            return update(state, {
                UpdateDesignFile: {
                    status: { $set: "SUCCESS" }
                }
            })
        case UPDATE_DESIGN_FILE_FAILURE:
            return update(state, {
                UpdateDesignFile: {
                    status: { $set: "FAILURE" }
                }
            })
        case GET_BOARD:
            return update(state, {
                DesignDetailStep: { $set: "WATING" }
            })
        case GET_BOARD_SUCCESS:
            return update(state, {
                DesignDetailStep: { $set: "SUCCESS" },
                status: { DesignDetailStep: { $set: action.list } }
            })
        case GET_BOARD_FAILURE:
            return update(state, {
                DesignDetailStep: { $set: "FAILURE" },
                status: { DesignDetailStep: { $set: [] } }
            })
        case GET_CARD_DETAIL:
            return update(state, {
                DesignDetailStepCard: { $set: "WATING" }
            })
        case GET_CARD_DETAIL_SUCCESS:
            return update(state, {
                DesignDetailStepCard: { $set: "SUCCESS" },
                status: { DesignDetailStepCard: { $set: action.detail } }
            })
        case GET_CARD_DETAIL_FAILURE:
            return update(state, {
                DesignDetailStepCard: { $set: "FAILURE" },
                status: { DesignDetailStepCard: { $set: {} } }
            })
        default:
            return state
    }
}

export const BringAllDataRequest = design_id => {
    return dispatch => {
        return fetch(`${host}/design/designDetail/bringAllData/${design_id}`, { method: "GET" })
        // .then(functi)
    }
}
export function DesignSourceResetRequest() {
    return (dispatch) => {
        dispatch(DesignSourceReset())
    }
}
export const GetDesignSourceRequest = id => {
    return dispatch => {
        dispatch(GetDesignSource());
        return fetch(`${host}/design/designDetail/getCardSource/${id}`, {
            method: "GET"
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                return dispatch(GetDesignSourceSuccess(res));
            })
            .catch(error => {
                //console.log("insert issue err", error);
                return dispatch(GetDesignSourceFailure(error));
            });
    };
}
export const FileUploadRequest = file => {
    return new Promise(async (resolve, reject) => {
        const formData = new FormData();
        await formData.append('source', file[0]);
        console.log(formData);
        fetch(`${host}/upload/tmp`, {
            header: { 'Content-Type': 'multipart/form-data' },
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => resolve(data || null))
            .catch(err => reject(err));
    });
}
export const UpdateCardSourceRequest = (data, card_id, token) => {
    return async dispatch => {
        dispatch(UpdateDesignSource());
        //console.log("request", data);
        return fetch(`${host}/design/designDetail/updateCardAllData_temp/${card_id}`, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => dispatch(UpdateDesignSourceSuccess(res)))
            .catch(error => dispatch(UpdateDesignSourceFailure(error)))
    };
}
export const UpdateDesignSourceRequest = (data, card_id, token) => {
    return dispatch => {
        dispatch(UpdateDesignSource());
        //console.log("request", data);
        return fetch(`${host}/design/designDetail/updateCardSource_temp/${card_id}`, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                return dispatch(UpdateDesignSourceSuccess(res));
            })
            .catch(error => {
                //console.log("insert issue err", error);
                return dispatch(UpdateDesignSourceFailure(error));
            });
    };
}
export const DeleteDesignBoardRequest = (id, board_id, token) => {
    return (dispatch) => {
        dispatch(DeleteBoard());
        return fetch(`${host}/design/designDetail/${id}/deleteBoard/${board_id}`, { headers: { "x-access-token": token, 'Content-Type': 'application/json' }, method: "DELETE" })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(DeleteBoardSuccess(res));
            }).catch((error) => {
                //console.log("DeleteDesignBoardRequest err", error);
                return dispatch(DeleteBoardFailure(error));
            })
    }
}
export const UpdateDesignBoardRequest = (id, token, data) => {
    return (dispatch) => {
        dispatch(UpdateBoard());
        return fetch(`${host}/design/designDetail/updateBoard/${id}`, { headers: { "x-access-token": token, 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(data) })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(UpdateBoardSuccess(res));
            }).catch((error) => {
                //console.log("UpdateDesignBoardRequest err", error);
                return dispatch(UpdateBoardFailure(error));
            });
    };
}
export const GetDesignBoardRequest = (id) => {
    const url = `${host}/design/designDetail/${id}/getBoardList`
    console.log(url);
    return (dispatch) => {
        dispatch(GetBoard());
        return fetch(url, { headers: { 'Content-Type': 'application/json' }, method: "GET" })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                return dispatch(GetBoardSuccess(res));
            }).catch((error) => {
                return dispatch(GetBoardFailure(error));
            });
    };
}
export const CreateDesignBoardRequest = (data, design_id, token) => {
    return (dispatch) => {
        dispatch(CreateBoard());
        //console.log("request", data);
        return fetch(`${host}/design/designDetail/${design_id}/createBoard`, { headers: { "x-access-token": token, 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(data) })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                //console.log("insert detail", res.desing_id);
                return dispatch(CreateBoardSuccess(res));
            }).catch((error) => {
                //console.log("insert detail err", error);
                return dispatch(CreateBoardFailure(error));
            });
    };
}
export const CreateDesignCardRequest = (data, design_id, board_id, token) => {
    return dispatch => {
        dispatch(CreateCard());
        //console.log("request", data);
        return fetch(
            `${host}/design/designDetail/${design_id}/${board_id}/createCard`,
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
                //console.log("insert detail", res);
                return dispatch(CreateCardSuccess(res));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(CreateCardFailure(error));
            });
    };
}
export const DeleteDesignCardRequest = (board_id, card_id, token) => {
    return dispatch => {
        dispatch(DeleteCard());
        return fetch(
            `${host}/design/designDetail/deleteCard/${board_id}/${card_id}`,
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
                console.log(res);
                return dispatch(DeleteCardSuccess(res));
            })
            .catch(error => {
                //console.log("DeleteDesignCardRequest err", error);
                return dispatch(DeleteCardFailure(error));
            });
    };
}
export const GetCardDetailRequest = id => {
    return dispatch => {
        dispatch(GetCardDetail());
        return fetch(`${host}/design/designDetail/getCardDetail/${id}`, {
            headers: { "Content-Type": "application/json" },
            method: "GET"
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(GetCardDetailSuccess(res));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(GetCardDetailFailure(error));
            });
    };
}
export const GetDesignCardRequest = (id, board_id) => {
    return dispatch => {
        dispatch(GetCard(board_id));
        return fetch(`${host}/design/designDetail/${id}/${board_id}/getCardList`, {
            headers: { "Content-Type": "application/json" },
            method: "GET"
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(GetCardSuccess(res, board_id));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(GetCardFailure(error));
            });
    };
}
export const UpdateCardTitleRequest = (data, token, id) => {
    return dispatch => {
        dispatch(UpdateCardTitle());
        console.log(data);
        return fetch(`${host}/design/designDetail/updateCardTitle/${id}`, {
            headers: { "x-access-token": token, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(UpdateCardTitleSuccess(res));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(UpdateCardTitleFailure(error));
            });
    };
}
export const UpdateCardContentRequest = (data, token, id) => {
    return dispatch => {
        dispatch(UpdateCardContent());
        return fetch(`${host}/design/designDetail/updateCardContent/${id}`, {
            headers: { "x-access-token": token, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(UpdateCardContentSuccess(res));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(UpdateCardContentFailure(error));
            });
    };
}
export const UpdateCardImagesRequest = (data, token, id) => {
    return dispatch => {
        dispatch(UpdateCardImages());
        return fetch(`${host}/design/designDetail/updateCardImages/${id}`, {
            headers: { "x-access-token": token },
            method: "POST",
            body: data
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(UpdateCardImagesSuccess(res));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(UpdateCardImagesFailure(error));
            });
    };
}
export const UpdateCardSourcesRequest = (data, token, id) => {
    return dispatch => {
        dispatch(UpdateCardSources());
        return fetch(`${host}/design/designDetail/updateCardSources/${id}`, {
            headers: { "x-access-token": token },
            method: "POST",
            body: data
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(res);
                return dispatch(UpdateCardSourcesSuccess(res));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(UpdateCardSourcesFailure(error));
            });
    };
}

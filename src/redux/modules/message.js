import host from "config"
import update from "react-addons-update"


//
const GET_MY_MSG_LIST = "GET_MY_MSG_LIST"
const GET_MY_MSG_LIST_SUCCESS = "GET_MY_MSG_LIST_SUCCESS"
const GET_MY_MSG_LIST_FAILURE = "GET_MY_MSG_LIST_FAILURE"
const GET_MY_MSG_DETAIL = "GET_MY_MSG_DETAIL"
const GET_MY_MSG_DETAIL_SUCCESS = "GET_MY_MSG_DETAIL_SUCCESS"
const GET_MY_MSG_DETAIL_FAILURE = "GET_MY_MSG_DETAIL_FAILURE"
const GET_MY_MSG_DETAIL_CLEAR = "GET_MY_MSG_DETAIL_CLEAR"
const SEND_MESSAGE = "SEND_MESSAGE"
const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS"
const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE"


//
const GetMyMsgList = () => ({ type: GET_MY_MSG_LIST })
const GetMyMsgListSuccess = (data) => ({ type: GET_MY_MSG_LIST_SUCCESS, MsgList: data })
const GetMyMsgListFailure = () => ({ type: GET_MY_MSG_LIST_FAILURE })
const GetMyMsgDetail = () => ({ type: GET_MY_MSG_DETAIL })
const GetMyMsgDetailSuccess = (data) => ({ type: GET_MY_MSG_DETAIL_SUCCESS, MsgDetail: data })
const GetMyMsgDetailFailure = () => ({ type: GET_MY_MSG_DETAIL_FAILURE })
export const GetMyMessageDetailClear = () => ({ type: GET_MY_MSG_DETAIL_CLEAR, MsgDetail: [] })
const SendMessage = () => ({ type: SEND_MESSAGE })
const SendMessageSuccess = (data) => ({ type: SEND_MESSAGE_SUCCESS, data })
const SendMessageFailure = () => ({ type: SEND_MESSAGE_FAILURE })


//
const initialState = {
    SendMessage: { status: "INIT" },
    GetMsgDetail: { status: "INIT" },
    GetMsgList: { status: "INIT" },
    status: { MsgList: [], MsgDetail: [] }
}


//
export default function Message(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case SEND_MESSAGE:
            return update(state, {
                SendMessage: {
                    status: { $set: "WATTING" }
                }
            })
        case SEND_MESSAGE_SUCCESS:
            return update(state, {
                SendMessage: {
                    status: { $set: "SUCCESS" }
                }
            })
        case SEND_MESSAGE_FAILURE:
            return update(state, {
                SendMessage: {
                    status: { $set: "FAILURE" }
                }
            })
        case GET_MY_MSG_LIST:
            return update(state, {
                GetMsgList: {
                    status: { $set: "WATTING" }
                }
            })
        case GET_MY_MSG_LIST_SUCCESS:
            return update(state, {
                GetMsgList: {
                    status: { $set: "SUCCESS" }
                }, status: { MsgList: { $set: action.MsgList } }
            })
        case GET_MY_MSG_LIST_FAILURE:
            return update(state, {
                GetMsgList: { status: { $set: "FAILURE" } }
            })
        case GET_MY_MSG_DETAIL:
            return update(state, {
                GetMsgDetail: { status: { $set: "WATTING" } }
            })
        case GET_MY_MSG_DETAIL_SUCCESS:
            return update(state, {
                GetMsgDetail: { status: { $set: "SUCCESS" } },
                status: { MsgDetail: { $set: action.MsgDetail } }
            })
        case GET_MY_MSG_DETAIL_FAILURE:
            return update(state, {
                GetMsgDetail: { status: { $set: "FAILURE" } }
            })
        case GET_MY_MSG_DETAIL_CLEAR:
            return update(state, {
                status: { MsgDetail: { $set: action.MsgDetail } }
            })
        default:
            return state
    }
}


//
export function SendMessageRequest(token, data, id) {
    return (dispatch) => {
        dispatch(SendMessage())
        return fetch(`${host}/users/sendMsg/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "post",
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("message sending >>", data)
            if (!data) {
                console.log("no detail message")
                data = []
            }
            return dispatch(SendMessageSuccess(data))
        }).catch((error) => {
            console.log("err", error)
            return dispatch(SendMessageFailure())
        })
    }
}
export function GetMyMsgListRequest(token) {
    return (dispatch) => {
        dispatch(GetMyMsgList())
        return fetch(`${host}/users/msgList`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("message list data >>", data)
            if (!data) {
                console.log("no message")
                data = []
            }
            return dispatch(GetMyMsgListSuccess(data))
        }).catch((error) => {
            dispatch(GetMyMsgListFailure())
            console.log("err", error)
        })
    }
}
export function GetMyMsgDetailRequest(token, id) {
    return (dispatch) => {
        dispatch(GetMyMsgDetail())
        return fetch(`${host}/users/msgDetail/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("message detail data >>", data)
            if (!data) {
                console.log("no detail message")
                data = []
            }
            return dispatch(GetMyMsgDetailSuccess(data))
        }).catch((error) => {
            dispatch(GetMyMsgDetailFailure())
            console.log("err", error)
        })
    }
}
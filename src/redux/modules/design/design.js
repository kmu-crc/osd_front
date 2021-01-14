import host from "config"
import update from "react-addons-update"

// action types
const GET_DESIGN_DETAIL = "GET_DESIGN_DETAIL"
export const DESIGN_NOT_FOUND = "DESIGN_NOT_FOUND"
const GET_DESIGN_COUNT = "GET_DESIGN_COUNT"
const DESIGN_DETAIL_RESET = "DESIGN_DETAIL_RESET"
const GET_DESIGN_DETAIL_VIEW = "GET_DESIGN_DETAIL_VIEW"
const GET_DESIGN_DETAIL_STEP = "GET_DESIGN_DETAIL_STEP"
const GET_DESIGN_DETAIL_STEP_CARD = "GET_DESIGN_DETAIL_STEP_CARD"
const DESIGN_DETAIL_VIEW_RESET = "DESIGN_DETAIL_VIEW_RESET"
const GET_LIKE_DESIGN = "GET_LIKE_DESIGN"
const GET_LIKE_DESIGN_SUCCESS = "GET_LIKE_DESIGN_SUCCESS"
const GET_LIKE_DESIGN_FAILURE = "GET_LIKE_DESIGN_FAILURE"
const LIKE_DESIGN = "LIKE_DESIGN"
const LIKE_DESIGN_SUCCESS = "LIKE_DESIGN_SUCCESS"
const LIKE_DESIGN_FAILURE = "LIKE_DESIGN_FAILURE"
const UNLIKE_DESIGN = "UNLIKE_DESIGN"
const UNLIKE_DESIGN_SUCCESS = "UNLIKE_DESIGN_SUCCESS"
const UNLIKE_DESIGN_FAILURE = "UNLIKE_DESIGN_FAILURE"
const UPDATE_DESIGN_VIEW = "UPDATE_DESIGN_VIEW"
const CHANGE_TO_PROJECT = "CHANGE_TO_PROJECT"
const CHANGE_TO_PROJECT_SUCCESS = "CHANGE_TO_PROJECT_SUCCESS"
const CHANGE_TO_PROJECT_FAILURE = "CHANGE_TO_PROJECT_FAILURE"
const GET_WAITING_LIST = "GET_WAITING_LIST"
const GET_WAITING_LIST_SUCCESS = "GET_WAITING_LIST_SUCCESS"
const GET_WAITING_LIST_FAILURE = "GET_WAITING_LIST_FAILURE"
const GET_WAITING_TO_ACCEPT_LIST = "GET_WAITING_TO_ACCEPT_LIST"
const GET_WAITING_TO_ACCEPT_LIST_SUCCESS = "GET_WAITING_TO_ACCEPT_LIST_SUCCESS"
const GET_WAITING_TO_ACCEPT_LIST_FAILURE = "GET_WAITING_TO_ACCEPT_LIST_FAILURE"
const JOIN_DESIGN = "JOIN_DESIGN"
const JOIN_DESIGN_SUCCESS = "JOIN_DESIGN_SUCCESS"
const JOIN_DESIGN_FAILURE = "JOIN_DESIGN_FAILURE"
const ACCEPT_DESIGN = "ACCEPT_DESIGN"
const ACCEPT_DESIGN_SUCCESS = "ACCEPT_DESIGN_SUCCESS"
const ACCEPT_DESIGN_FAILURE = "ACCEPT_DESIGN_FAILURE"
const GETOUT_DESIGN = "GETOUT_DESIGN"
const GETOUT_DESIGN_SUCCESS = "GETOUT_DESIGN_SUCCESS"
const GETOUT_DESIGN_FAILURE = "GETOUT_DESIGN_FAILURE"
const CREATE_DESIGN = "CREATE_DESIGN"
const CREATE_DESIGN_SUCCESS = "CREATE_DESIGN_SUCCESS"
const CREATE_DESIGN_FAILURE = "CREATE_DESIGN_FAILURE"
const FORK_DESIGN = "FORK_DESIGN"
const FORK_DESIGN_SUCCESS = "FORK_DESIGN_SUCCESS"
const FORK_DESIGN_FAILURE = "FORK_DESIGN_FAILURE"
const FORK_DESIGN_LIST = "FORK_DESIGN_LIST"
const FORK_DESIGN_LIST_SUCCESS = "FORK_DESIGN_LIST_SUCCESS"
const FORK_DESIGN_LIST_FAILURE = "FORK_DESIGN_LIST_FAILURE"
const UPDATE_DESIGN_INFO = "UPDATE_DESIGN_INFO"
const UPDATE_DESIGN_INFO_SUCCESS = "UPDATE_DESIGN_INFO_SUCCESS"
const UPDATE_DESIGN_INFO_FAILURE = "UPDATE_DESIGN_INFO_FAILURE"
const DELETE_DESIGN = "DELETE_DESIGN"
const DELETE_DESIGN_SUCCESS = "DELETE_DESIGN_SUCCESS"
const DELETE_DESIGN_FAILURE = "DELETE_DESIGN_FAILURE"

// initial state
const initialState = {
    LikeDesign: { status: "INIT" },
    DesignForked: { status: "INIT" },
    DesignDetail: { status: "INIT" },
    UpdateDesignInfo: { status: "INIT" },
    DesignDetailView: { status: "INIT" },
    WaitingList: { status: 'INIT' },
    WaitingToAcceptList: { status: 'INIT' },
    status: {
        Message: "", list: null, like: false, new_design_id: null,
        WaitingList: [], WaitingToAcceptList: [],
        DesignDetail: [], DesignDetailView: [], DesignForked: [],
        Count: { like_count: 0, member_count: 0, card_count: 0, view_count: 0 }
    }
}

// action creator
const CreateDesign = () => ({ type: CREATE_DESIGN })
const DesignNotFound = () => ({ type: DESIGN_NOT_FOUND, DesignDetail: { status: DESIGN_NOT_FOUND } })
const CreateDesignSuccess = (res) => ({ type: CREATE_DESIGN_SUCCESS, success: res.success, design_id: res.design_id })
const CreateDesignFailure = (error) => ({ type: CREATE_DESIGN_FAILURE, success: error.success })
const DeleteDesign = () => ({ type: DELETE_DESIGN })
const DeleteDesignSuccess = (res) => ({ type: DELETE_DESIGN_SUCCESS, success: res.success })
const DeleteDesignFailure = (error) => ({ type: DELETE_DESIGN_FAILURE, success: error.success })
const UpdateDesignInfo = () => ({ type: UPDATE_DESIGN_INFO })
const UpdateDesignInfoSuccess = (res) => ({ type: UPDATE_DESIGN_INFO_SUCCESS, res })
const UpdateDesignInfoFailure = (error) => ({ type: UPDATE_DESIGN_INFO_FAILURE, data: error })
const ForkDesign = () => ({ type: FORK_DESIGN })
const ForkDesignSuccess = (new_design_id) => ({ type: FORK_DESIGN_SUCCESS, new_design_id })
const ForkDesignFailure = () => ({ type: FORK_DESIGN_FAILURE })
const JoinDesign = () => ({ type: JOIN_DESIGN })
const JoinDesignSuccess = (data) => ({ type: JOIN_DESIGN_SUCCESS, data })
const JoinDesignFailure = () => ({ type: JOIN_DESIGN_FAILURE })
const AcceptDesign = () => ({ type: ACCEPT_DESIGN })
const AcceptDesignSuccess = (data) => ({ type: ACCEPT_DESIGN_SUCCESS, data })
const AcceptDesignFailure = () => ({ type: ACCEPT_DESIGN_FAILURE })
const GetoutDesign = () => ({ type: GETOUT_DESIGN })
const GetoutDesignSuccess = (data) => ({ type: GETOUT_DESIGN_SUCCESS, data })
const GetoutDesignFailure = () => ({ type: GETOUT_DESIGN_FAILURE })
const ForkDesignList = () => ({ type: FORK_DESIGN_LIST })
const ForkDesignListSuccess = (list) => ({ type: FORK_DESIGN_LIST_SUCCESS, list })
const ForkDesignListFailure = () => ({ type: FORK_DESIGN_LIST_FAILURE })
const DesignWaitingList = () => ({ type: GET_WAITING_LIST })
const DesignWaitingListSuccess = (data) => ({ type: GET_WAITING_LIST_SUCCESS, list: data })
const DesignWaitingListFailure = () => ({ type: GET_WAITING_LIST_FAILURE, list: [] })
const DesignWaitingToAcceptList = () => ({ type: GET_WAITING_TO_ACCEPT_LIST })
const DesignWaitingToAcceptListSuccess = (data) => ({ type: GET_WAITING_TO_ACCEPT_LIST_SUCCESS, list: data })
const DesignWaitingToAcceptListFailure = () => ({ type: GET_WAITING_TO_ACCEPT_LIST_FAILURE, list: [] })
const GetDesignDetailStepCard = (data) => ({ type: GET_DESIGN_DETAIL_STEP_CARD, DesignDetailStepCard: data })
const GetLikeDesign = () => ({ type: GET_LIKE_DESIGN })
const GetLikeDesignSuccess = (data) => ({ type: GET_LIKE_DESIGN_SUCCESS, like: data })
const GetLikeDesignFailure = (data) => ({ type: GET_LIKE_DESIGN_FAILURE, like: data })
const LikeDesign = () => ({ type: LIKE_DESIGN })
const LikeDesignSuccess = () => ({ type: LIKE_DESIGN_SUCCESS })
const LikeDesignFailure = () => ({ type: LIKE_DESIGN_FAILURE })
const UnlikeDesign = () => ({ type: UNLIKE_DESIGN })
const UnlikeDesignSuccess = () => ({ type: UNLIKE_DESIGN_SUCCESS })
const UnlikeDesignFailure = () => ({ type: UNLIKE_DESIGN_FAILURE })
const ChangeToProject = () => ({ type: CHANGE_TO_PROJECT })
const ChangeToProjectSuccess = (data) => ({ type: CHANGE_TO_PROJECT_SUCCESS, data: data })
const ChangeToProjectFailure = () => ({ type: CHANGE_TO_PROJECT_FAILURE })
const GetDesignDetail = (data) => ({ type: GET_DESIGN_DETAIL, DesignDetail: data })
const DesignDetailReset = () => ({ type: DESIGN_DETAIL_RESET, DesignDetail: [] })
const GetDesignCount = (data) => ({ type: GET_DESIGN_COUNT, Count: data })
const UpdateDesignView = () => ({ type: UPDATE_DESIGN_VIEW })
const GetDesignDetailView = (data) => ({ type: GET_DESIGN_DETAIL_VIEW, DesignDetailView: data })
const DesignDetailViewReset = () => ({ type: DESIGN_DETAIL_VIEW_RESET, DesignDetailView: [] })
const GetDesignDetailStep = (data) => ({ type: GET_DESIGN_DETAIL_STEP, DesignDetailStep: data })

// reducer
export function Design(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case FORK_DESIGN:
            return update(state, { status: { DesignForked: { $set: "WAIT_FORK" } } })
        case FORK_DESIGN_SUCCESS:
            return update(state, { status: { DesignForked: { $set: "SUCCESS_FORK" }, new_design_id: { $set: action.new_design_id }, Message: { $set: action.message } } })
        case FORK_DESIGN_FAILURE:
            return update(state, { status: { DesignForked: { $set: "FAILURE_FORK" } } })
        case FORK_DESIGN_LIST:
            return update(state, { status: { DesignForked: { $set: "WAIT_FORK_LIST" } } })
        case FORK_DESIGN_LIST_SUCCESS:
            return update(state, { status: { DesignForked: { $set: "SUCCESS_FORK_LIST" }, list: { $set: action.list }, Message: { $set: action.message } } })
        case FORK_DESIGN_LIST_FAILURE:
            return update(state, { status: { DesignForked: { $set: "FAILURE_FORK_LIST" } } })
        case GET_LIKE_DESIGN:
            return update(state, { LikeDesign: { status: { $set: "WATTING" } } });
        case GET_LIKE_DESIGN_SUCCESS:
            return update(state, { LikeDesign: { status: { $set: "SUCCESS" } }, status: { like: { $set: action.like } } });
        case GET_LIKE_DESIGN_FAILURE:
            return update(state, { LikeDesign: { status: { $set: "FAILURE" } }, status: { like: { $set: action.like } } });
        case LIKE_DESIGN:
            return update(state, { LikeDesign: { status: { $set: "WATING" } } });
        case LIKE_DESIGN_SUCCESS:
            return update(state, { LikeDesign: { status: { $set: "SUCCESS" } } });
        case LIKE_DESIGN_FAILURE:
            return update(state, { LikeDesign: { status: { $set: "FAILURE" } } });
        case UNLIKE_DESIGN:
            return update(state, { LikeDesign: { status: { $set: "WATING" } } });
        case UNLIKE_DESIGN_SUCCESS:
            return update(state, { LikeDesign: { status: { $set: "SUCCESS" } } });
        case UNLIKE_DESIGN_FAILURE:
            return update(state, { LikeDesign: { status: { $set: "FAILURE" } } });
        case DESIGN_NOT_FOUND:
            return update(state, { DesignDetail: { status: { $set: DESIGN_NOT_FOUND } }, })
        case GET_WAITING_LIST:
            return update(state, {
                WaitingList: { status: { $set: "WAITING" } }
            })
        case GET_WAITING_LIST_SUCCESS:
            return update(state, {
                status: { WaitingList: { $set: action.list } },
                WaitingList: { status: { $set: "SUCCESS" } }
            })
        case GET_WAITING_LIST_FAILURE:
            return update(state, {
                status: { WaitingList: { $set: action.list } },
                WaitingList: { status: { $set: "FAILURE" } }
            })
        case GET_WAITING_TO_ACCEPT_LIST:
            return update(state, {
                WaitingToAcceptList: { status: { $set: "WAITING" } }
            })
        case GET_WAITING_TO_ACCEPT_LIST_SUCCESS:
            return update(state, {
                status: { WaitingToAcceptList: { $set: action.list } },
                WaitingToAcceptList: { status: { $set: "SUCCESS" } }
            })
        case GET_WAITING_TO_ACCEPT_LIST_FAILURE:
            return update(state, {
                status: { WaitingToAcceptList: { $set: action.list } },
                WaitingToAcceptList: { status: { $set: "FAILURE" } }
            })
        case UPDATE_DESIGN_INFO:
            return update(state, {
                UpdateDesignInfo: { status: { $set: "WATTING" } }
            })
        case UPDATE_DESIGN_INFO_SUCCESS:
            return update(state, {
                UpdateDesignInfo: { status: { $set: "SUCCESS" } }
            })
        case UPDATE_DESIGN_INFO_FAILURE:
            return update(state, {
                UpdateDesignInfo: { status: { $set: "FAILURE" } }
            })
        case GET_DESIGN_DETAIL:
            return update(state, {
                DesignDetail: { status: { $set: action.type } },
                status: { DesignDetail: { $set: action.DesignDetail } }
            })
        case DESIGN_DETAIL_RESET:
            return update(state, {
                status: { DesignDetail: { $set: action.DesignDetail } }
            })
        case GET_DESIGN_COUNT:
            return update(state, {
                status: { Count: { $set: action.Count } }
            })
        case GET_DESIGN_DETAIL_VIEW:
            return update(state, {
                status: {
                    DesignDetailView: { $set: action.DesignDetailView }
                }
            });
        case DESIGN_DETAIL_VIEW_RESET:
            return update(state, {
                status: {
                    DesignDetailView: { $set: action.DesignDetailView }
                }
            });
        default:
            return state
    }
}

// API
export function GetDesignDetailStepCardRequest(id, card_id) {
    return (dispatch) => {
        return fetch(`${host}/design/designDetail/` + id + "/cardDetail/" + card_id, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("design Detail Card data >>", data)
            if (!data || data.length === 0) {
                //console.log("no data")
                return
            } else {
                return dispatch(GetDesignDetailStepCard(data))
            }
        }).catch((error) => {
            console.error("err", error)
        })
    }
}
export function DesignDetailViewResetRequest() {
    return (dispatch) => {
        dispatch(DesignDetailViewReset())
    }
}
export function GetDesignDetailViewRequest(id, token) {
    return (dispatch) => {
        if (token == null) {
            token = ""
        }
        return fetch(`${host}/design/designDetail/${id}/view`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get",
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("design Detail View data >>", data)
            if (!data || data.length === 0) {
                //console.log("no data")
                data = []
            }
            return dispatch(GetDesignDetailView(data))
        }).catch((error) => {
            console.error("err", error)
        })
    }
}
export function UpdateDesignViewRequest(id) {
    return (dispatch) => {
        return fetch(`${host}/design/updateViewCount/${id}`, {
            headers: { "Content-Type": "application/json" },
            method: "post"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("increase view count >>", data)
            if (!data) {
                //console.log("no data")
            }
            dispatch(UpdateDesignView())
        }).catch((error) => {
            console.error("err", error)
        })
    }
}
export function GetDesignCountRequest(id) {
    return (dispatch) => {
        return fetch(`${host}/design/getCount/${id}`, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("design count >>", data)
            if (!data) {
                //console.log("no data")
                data = {
                    like_count: 0, member_count: 0, card_count: 0, view_count: 0
                }
            }
            dispatch(GetDesignCount(data))
        }).catch((err) => {
            // alert("디자인 정보를 가져오지 못했습니다. 메인페이지로 돌아갑니다.");
            window.location.href = '/notfound';
            console.error("err", err)
        })
    }
}
export function DesignDetailResetRequest() {
    return (dispatch) => {
        dispatch(DesignDetailReset())
    }
}
export function GetDesignDetailRequest(id, token) {
    return (dispatch) => {
        if (token === null || token === undefined) {
            token = ""
        }
        const url = `${host}/design/designDetail/${id}`
        return fetch(url, {
            headers: { "Content-Type": "application/json", "x-access-token": token }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("design Detail data >>", data)
            if (!data || (Object.entries(data).length === 0 && data.constructor === Object)) {
                //console.log("no data")
                data = []
                return dispatch(DesignNotFound())
            }
            dispatch(GetDesignDetail(data));
            return data;
        }).catch((error) => {
            console.error("err", error)
        })
    }
}
export function GetDesignDetailStepRequest(id) {
    return (dispatch) => {
        return fetch(`${host}/design/designDetail/` + id + "/step", {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("design Detail Step data >>", data)
            if (!data) {
                //console.log("no data")
                return
            } else {
                dispatch(GetDesignDetailStep(data))
            }
        }).catch((error) => {
            console.error("err", error)
        })
    }
}
export function ChangeToProjectRequest(id, token) {
    return (dispatch) => {
        dispatch(ChangeToProject())
        return fetch(`${host}/Design/changeToProject/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "post"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("change request >>>", data)
            dispatch(ChangeToProjectSuccess(data))
            return data
        }).catch((error) => {
            console.error("err", error)
            ChangeToProjectFailure(error)
        })
    }
}
export function UnlikeDesignRequest(id, token) {
    return (dispatch) => {
        dispatch(UnlikeDesign())
        return fetch(`${host}/Design/unlike/${id}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "post"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("unlike >>>", data)
            if (!data) {
                //console.log("no data")
            }
            dispatch(UnlikeDesignSuccess(data))
            return data
        }).catch((error) => {
            console.error("err", error)
            UnlikeDesignFailure(error)
        })
    }
}
export function LikeDesignRequest(id, token) {
    return (dispatch) => {
        dispatch(LikeDesign())
        return fetch(`${host}/Design/like/${id}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "post"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("like >>>", data)
            if (!data) {
                //console.log("no data")
            }
            dispatch(LikeDesignSuccess())
            return data
        }).catch((error) => {
            console.error("err", error)
            LikeDesignFailure(error)
        })
    }
}
export function GetLikeDesignRequest(id, token) {
    return (dispatch) => {
        dispatch(GetLikeDesign())
        return fetch(`${host}/Design/getLike/${id}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("Design like >>", data)
            if (!data) {
                //console.log("no like info")
                data = false
            }
            dispatch(GetLikeDesignSuccess(data.like))
        }).catch((error) => {
            console.error("err", error)
            GetLikeDesignFailure(false)
        })
    }
}
export function DesignWaitingToAcceptListRequest(id, token) {
    return (dispatch) => {
        dispatch(DesignWaitingToAcceptList())
        return fetch(`${host}/design/designDetail/${id}/waitingListAccept`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("list >>>", data.data)
            if (!data) {
                //console.log("no data")
            }
            return dispatch(DesignWaitingToAcceptListSuccess(data.data))
        }).catch((error) => {
            console.error("err", error)
            return dispatch(DesignWaitingToAcceptListFailure(error))
        });
    }
}
export function DesignWaitingListRequest(id, token) {
    return (dispatch) => {
        dispatch(DesignWaitingList())
        return fetch(`${host}/design/designDetail/${id}/waitingList`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            //console.log("list >>>", data.data)
            if (!data) {
                //console.log("no data")
            }
            return dispatch(DesignWaitingListSuccess(data.data))
        }).catch((error) => {
            console.error("err", error)
            return dispatch(DesignWaitingListFailure(error))
        })
    }
}
export function JoinDesignRequest(id, data, flag, token) {
    return (dispatch) => {
        dispatch(JoinDesign());
        return fetch(`${host}/design/designDetail/${id}/joinDesign/${flag}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "post",
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            //console.log("가입신청 >>>", data);
            if (!data) {
                //console.log("no data");
            }
            return dispatch(JoinDesignSuccess(data));
        }).catch((error) => {
            console.error("err", error);
            return dispatch(JoinDesignFailure(error));
        });
    }
}
export function CreateDesignRequest(data, token) {
    return (dispatch) => {
        dispatch(CreateDesign());
        return fetch(`${host}/design/createDesign`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                //console.log("insert detail", res.desing_id);
                return dispatch(CreateDesignSuccess(res));
            }).catch((error) => {
                //console.log("insert detail err", error);
                return dispatch(CreateDesignFailure(error));
            })
    }
}
export function GetoutDesignRequest(id, memberId, token, refuse) {
    return (dispatch) => {
        dispatch(GetoutDesign());
        return fetch(`${host}/Design/designDetail/${id}/getoutDesign/${memberId}/${refuse}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "delete"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            //console.log("디자인 탈퇴 >>>", data);
            if (!data) {
                //console.log("no data");
            }
            return dispatch(GetoutDesignSuccess(data));
        }).catch((error) => {
            console.error("err", error);
            return dispatch(GetoutDesignFailure(error));
        });
    }
}
export function AcceptDesignRequest(id, memberId, token) {
    return (dispatch) => {
        dispatch(AcceptDesign());
        const url = `${host}/Design/designDetail/${id}/acceptDesign/${memberId}`
        console.log(url, token)
        return fetch(url, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': token
            }, method: "post"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data) {
                //console.log("no data");
            }
            //console.log("가입승낙 >>>", data);
            return dispatch(AcceptDesignSuccess(data));
        }).catch((error) => {
            console.error("err", error);
            return dispatch(AcceptDesignFailure(error));
        });
    }
}
export function ForkDesignRequest(design_id, user_id, token) {
    return (dispatch) => {
        dispatch(ForkDesign())
        return fetch(`${host}/design/forkDesign/${design_id}/${user_id}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "GET"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (data.success) {
                return dispatch(ForkDesignSuccess(data.new_design_id))
                // return ForkDesignFailure(data)
            }
            return dispatch(ForkDesignFailure())
        }).catch((error) => {
            console.error("err", error)
            return ForkDesignFailure()
        })
    }
}
export function ForkDesignListRequest(design_id, token) {
    return (dispatch) => {
        dispatch(ForkDesignList())
        return fetch(`${host}/design/forkDesignList/${design_id}`, {
            headers: { "Content-Type": "application/json" }, method: "post"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (data.success) {
                // console.log("DATA", data)
                return dispatch(ForkDesignListSuccess(data.list))
            }
            return dispatch(ForkDesignListFailure())
        }).catch((error) => {
            console.error("err", error)
            return dispatch(ForkDesignListFailure())
        })
    }
}
export function UpdateDesignInfoRequest(data, id, token) {
    return dispatch => {
        dispatch(UpdateDesignInfo());
        return fetch(`${host}/design/updateDesignInfo/${id}/${data.user_id}`, {
            headers: { "x-access-token": token, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                //console.log("update design", res);
                return dispatch(UpdateDesignInfoSuccess(res));
            })
            .catch(error => {
                //console.log("insert detail err", error);
                return dispatch(UpdateDesignInfoFailure(error));
            });
    }
}
export function UpdateDesignTime(id, token) {
    const url = `${host}/design/updateDesignTime/${id}`;
    //console.log("update-time:", url);
    return dispatch => {
        dispatch(UpdateDesignInfo());
        return fetch(url, {
            headers: { "x-access-token": token, "Content-Type": "application/json" },
            method: "POST"
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                //console.log("update designTIME", res);
                return dispatch(UpdateDesignInfoSuccess(res));
            })
            .catch(err => {
                //console.log("time update err", err);
                return dispatch(UpdateDesignInfoFailure(err));
            });
    }
}
export function DeleteDesignRequest(id, token) {
    return (dispatch) => {
        dispatch(DeleteDesign());
        return fetch(`${host}/design/deleteDesign/${id}`, {
            headers: { "x-access-token": token },
            method: "DELETE"
        }).then(res => {
            return res.json();
        }).then(res => {
            //console.log("design deleted", res);
            return dispatch(DeleteDesignSuccess(res));
        }).catch((error) => {
            console.error(error);
            return dispatch(DeleteDesignFailure(error));
        });
    }
}
export function YesIHaveReadNewComment(id, token) {
    return new Promise((resolve, reject) => {
        const url = `${host}/design/designDetail/${id}/confirmDesignComment/`;
        fetch(url, {
            headers: { "x-access-token": token }, method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                //console.log("success confirm design comment", res); 
                resolve(true)
            })
            .catch((error) => { console.error(error); reject(error) });
    })
}
export function CheckInvitedUserRequest(id, token) {
    return new Promise((resolve, reject) => {
        const url = `${host}/design/${id}/video-chat/check-invited`;
        fetch(url, {
            headers: { "x-access-token": token },
            method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                // console.log("check result", res);
                resolve(res);
            }).catch(error => {
                console.error(error);
                reject(false);
            });
    });
}
export function InvitedUserRequest(id, token, data) {
    return new Promise((resolve/*, reject*/) => {
        const url = `${host}/design/${id}/video-chat/invite-user`;
        fetch(url, {
            headers: { "x-access-token": token },
            method: "POST",
            body: JSON.stringify({ to_user_id: data })
        })
            .then(res => res.json())
            .then(res => {
                resolve(res);
            }).catch(error => {
                // reject(error);
                throw error;
            });
    });
}
export function CancelInvitedUserRequest(id, token) {
    return new Promise((resolve, reject) => {
        const url = `${host}/design/${id}/video-chat/cancel-invited-user`;
        fetch(url, {
            headers: { "x-access-token": token },
            method: "POST",
        })
            .then(res => res.json())
            .then(res => {
                resolve(res);
            }).catch(error => {
                console.error(error);
                reject(false);
            });
    });
}
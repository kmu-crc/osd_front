import host from "config"
import update from "react-addons-update"


const GET_MY_DETAIL = "GET_MY_DETAIL"
const GET_MY_DESIGN = "GET_MY_DESIGN"
const GET_MY_DESIGN_CLEAR = "GET_MY_DESIGN_CLEAR"
const MY_DESIGN_FAIL = "MY_DESIGN_FAIL"
const GET_MY_GROUP = "GET_MY_GROUP"
const GET_MY_GROUP_CLEAR = "GET_MY_GROUP_CLEAR"
const MY_GROUP_FAIL = "MY_GROUP_FAIL"
const GET_MY_LIKE_DESIGN = "GET_MY_LIKE_DESIGN"
const GET_MY_LIKE_DESIGN_CLEAR = "GET_MY_LIKE_DESIGN_CLEAR"
const MY_LIKE_DESIGN_FAIL = "MY_LIKE_DESIGN_FAIL"
const GET_MY_LIKE_GROUP = "GET_MY_LIKE_GROUP"
const GET_MY_LIKE_GROUP_CLEAR = "GET_MY_LIKE_GROUP_CLEAR"
const GET_MY_LIKE_DESIGNER = "GET_MY_LIKE_DESIGNER"
const GET_MY_LIKE_DESIGNER_CLEAR = "GET_MY_LIKE_DESIGNER_CLEAR"
const MY_LIKE_DESIGNER_FAIL = "MY_LIKE_DESIGNER_FAIL"
const GET_MY_INVITED_LIST = "GET_MY_INVITED_LIST"
const GET_MY_INVITED_LIST_SUCCESS = "GET_MY_INVITED_LIST_SUCCESS"
const GET_MY_INVITED_LIST_FAILURE = "GET_MY_INVITED_LIST_FAILURE"
const GET_MY_INVITING_LIST = "GET_MY_INVITING_LIST"
const GET_MY_INVITING_LIST_SUCCESS = "GET_MY_INVITING_LIST_SUCCESS"
const GET_MY_INVITING_LIST_FAILURE = "GET_MY_INVITING_LIST_FAILURE"
const INSERT_USER_DETAIL = "INSERT_USER_DETAIL"
const INSERT_USER_DETAIL_SUCCESS = "INSERT_USER_DETAIL_SUCCESS"
const INSERT_USER_DETAIL_FAILURE = "INSERT_USER_DETAIL_FAILURE"
const UPDATE_USER_DETAIL = "UPDATE_USER_DETAIL"
const UPDATE_USER_DETAIL_SUCCESS = "UPDATE_USER_DETAIL_SUCCESS"
const UPDATE_USER_DETAIL_FAILURE = "UPDATE_USER_DETAIL_FAILURE"


const GetMyDetail = (data) => ({ type: GET_MY_DETAIL, MyDetail: data })
const GetMyDesignList = (data) => ({ type: GET_MY_DESIGN, MyDesign: data })
const MyDesignListClear = (data) => ({ type: GET_MY_DESIGN_CLEAR, MyDesign: data, MyDesignAdded: [] })
const MyDesignListFail = () => ({ type: MY_DESIGN_FAIL, MyDesign: [], MyDesignAdded: [] })
const GetMyGroupList = (data) => ({ type: GET_MY_GROUP, MyGroup: data })
const MyGroupListClear = (data) => ({ type: GET_MY_GROUP_CLEAR, MyGroup: data, MyGroupAdded: [] })
const MyGroupListFail = () => ({ type: MY_GROUP_FAIL, MyGroup: [], MyGroupAdded: [] })
const GetMyLikeDesign = (data) => ({ type: GET_MY_LIKE_DESIGN, MyLikeDesign: data })
const MyLikeDesignClear = (data) => ({ type: GET_MY_LIKE_DESIGN_CLEAR, MyLikeDesign: data, MyLikeDesignAdded: [] })
const MyLikeDesignFail = () => ({ type: MY_LIKE_DESIGN_FAIL, MyLikeDesign: [], MyLikeDesignAdded: [] })
const GetMyLikeGroup = (data) => ({type:GET_MY_LIKE_GROUP, MyLikeGroup:data})
const GetMyLikeGroupClear = (data) => ({type:GET_MY_LIKE_GROUP_CLEAR, MyLikeGroup:data, MyLikeGroupAdded:[]})

const GetMyLikeDesigner = (data) => ({ type: GET_MY_LIKE_DESIGNER, MyLikeDesigner: data })
const MyLikeDesignerClear = (data) => ({ type: GET_MY_LIKE_DESIGNER_CLEAR, MyLikeDesigner: data, MyLikeDesigneRAdded: [] })
const MyLikeDesignerFail = () => ({ type: MY_LIKE_DESIGNER_FAIL, MyLikeDesigner: [], MyLikeDesigneRAdded: [] })
const GetMyInvitedList = () => ({ type: GET_MY_INVITED_LIST })
const GetMyInvitedListSuccess = (data) => ({ type: GET_MY_INVITED_LIST_SUCCESS, list: data })
const GetMyInvitedListFailure = () => ({ type: GET_MY_INVITED_LIST_FAILURE, list: [] })
const GetMyInvitingList = () => ({ type: GET_MY_INVITING_LIST })
const GetMyInvitingListSuccess = (data) => ({ type: GET_MY_INVITING_LIST_SUCCESS, list: data })
const InsertUserDetail = () => ({ type: INSERT_USER_DETAIL })
const InsertUserDetailSuccess = (res) => ({ type: INSERT_USER_DETAIL_SUCCESS, res })
const InsertUserDetailFailure = () => ({ type: INSERT_USER_DETAIL_FAILURE })
const UpdateUserDetail = () => ({ type: UPDATE_USER_DETAIL })
const UpdateUserDetailSuccess = () => ({ type: UPDATE_USER_DETAIL_SUCCESS, success: true })
const UpdateUserDetailFailure = () => ({ type: UPDATE_USER_DETAIL_FAILURE, success: false })
const GetMyInvitingListFailure = () => ({ type: GET_MY_INVITING_LIST_FAILURE, list: [] })

export default function Personal(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case INSERT_USER_DETAIL:
            return update(state, {
                userInfo: {
                    status: { $set: "WAITING" }
                }
            })
        case INSERT_USER_DETAIL_SUCCESS:
            return update(state, {
                userInfo: {
                    status: { $set: "SUCCESS" }
                }
            })
        case INSERT_USER_DETAIL_FAILURE:
            return update(state, {
                userInfo: {
                    status: { $set: "FAILURE" }
                }
            })
        case GET_MY_INVITED_LIST:
            return update(state, {
                MyJoin: {
                    status: { $set: "INIT" }
                }
            })
        case GET_MY_INVITED_LIST_SUCCESS:
            return update(state, {
                status: {
                    InvitedList: { $set: action.list }
                },
                MyJoin: {
                    status: { $set: "SUCCESS" }
                }
            })
        case GET_MY_INVITED_LIST_FAILURE:
            return update(state, {
                status: {
                    InvitedList: { $set: action.list }
                },
                MyJoin: {
                    status: { $set: "FAILURE" }
                }
            })
        case GET_MY_INVITING_LIST:
            return update(state, {
                MyJoin: {
                    status: { $set: "INIT" }
                }
            })
        case GET_MY_INVITING_LIST_SUCCESS:
            return update(state, {
                status: {
                    InvitingList: { $set: action.list }
                },
                MyJoin: {
                    status: { $set: "SUCCESS" }
                }
            })
        case GET_MY_INVITING_LIST_FAILURE:
            return update(state, {
                status: {
                    InvitingList: { $set: action.list }
                },
                MyJoin: {
                    status: { $set: "FAILURE" }
                }
            })
        case GET_MY_DETAIL:
            return update(state, {
                status: {
                    MyDetail: { $set: action.MyDetail }
                }
            })
        case GET_MY_DESIGN:
            return update(state, {
                status: {
                    MyDesign: { $set: action.MyDesign },
                    MyDesignAdded: { $push: action.MyDesign }
                }
            })
        case GET_MY_DESIGN_CLEAR:
            return update(state, {
                status: {
                    MyDesign: { $set: action.MyDesign },
                    MyDesignAdded: { $set: action.MyDesign }
                }
            })
        case MY_DESIGN_FAIL:
            return update(state, {
                status: {
                    MyDesign: { $set: action.MyDesign },
                    MyDesignAdded: { $set: action.MyDesignAdded }
                }
            })
        case GET_MY_GROUP:
            return update(state, {
                status: {
                    MyGroup: { $set: action.MyGroup },
                    MyGroupAdded: { $push: action.MyGroup }
                }
            })
        case GET_MY_GROUP_CLEAR:
            return update(state, {
                status: {
                    MyGroup: { $set: action.MyGroup },
                    MyGroupAdded: { $set: action.MyGroup }
                }
            })
        case MY_GROUP_FAIL:
            return update(state, {
                status: {
                    MyGroup: { $set: action.MyGroup },
                    MyGroupAdded: { $set: action.MyGroupAdded }
                }
            })
        case GET_MY_LIKE_DESIGN:
            return update(state, {
                status: {
                    MyLikeDesign: { $set: action.MyLikeDesign },
                    MyLikeDesignAdded: { $push: action.MyLikeDesign }
                }
            })
        case GET_MY_LIKE_DESIGN_CLEAR:
            return update(state, {
                status: {
                    MyLikeDesign: { $set: action.MyLikeDesign },
                    MyLikeDesignAdded: { $set: action.MyLikeDesign }
                }
            })
        case MY_LIKE_DESIGN_FAIL:
            return update(state, {
                status: {
                    MyLikeDesign: { $set: action.MyLikeDesign },
                    MyLikeDesignAdded: { $set: action.MyLikeDesignAdded }
                }
            })
        case GET_MY_LIKE_DESIGNER:
            return update(state, {
                status: {
                    MyLikeDesigner: { $set: action.MyLikeDesigner },
                    MyLikeDesignerAdded: { $push: action.MyLikeDesigner }
                }
            })
        case GET_MY_LIKE_DESIGNER_CLEAR:
            return update(state, {
                status: {
                    MyLikeDesigner: { $set: action.MyLikeDesigner },
                    MyLikeDesignerAdded: { $set: action.MyLikeDesigner }
                }
            })
        case MY_LIKE_DESIGNER_FAIL:
            return update(state, {
                status: {
                    MyLikeDesigner: { $set: action.MyLikeDesigner },
                    MyLikeDesignerAdded: { $set: action.MyLikeDesignerAdded }
                }
            })
        default:
            return state
    }
}


const initialState = {
    MyJoin: { status: "INIT" },
    userInfo: { status: "INIT" },
    MyDetail: { status: "INIT" },
    status: {
        InvitedList: [],
        InvitingList: [],
        MyDetail: [],
        MyDesign: [], MyDesignAdded: [],
        MyGroup: [], MyGroupAdded: [],
        MyLikeDesign: [], MyLikeDesignAdded: [],
        MyLikeDesigner: [], MyLikeDesignerAdded: [],
        MyLikeGroup:[], MyLikeGroupAdded: [],
    }
}


// 내 기본 정보 불러오기
export function GetMyDetailRequest(token) {
    return (dispatch) => {
        return fetch(`${host}/users/myPage`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {
            return response.json()
        }).then((data) => {
            if (!data) {
                console.log("no data")
                data = []
            }
            return dispatch(GetMyDetail(data))
        }).catch((error) => {
            console.log("err", error)
        })
    }
}
// 내 디자인 리스트 불러오기
export function GetMyDesignListRequest(token, page) {
    return (dispatch) => {
        return fetch(`${host}/users/myPage/design/${page}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {
            return response.json()
        }).then((data) => {
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(MyDesignListClear(data))
                return
            }
            dispatch(GetMyDesignList(data))
        }).catch((error) => {
            dispatch(MyDesignListFail())
            console.log("err", error)
        })
    }
}
// 내 그룹 리스트 불러오기
export function GetMyGroupListRequest(token, page) {
    return (dispatch) => {
        return fetch(`${host}/users/myPage/group/${page}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {
            return response.json()
        }).then((data) => {
            console.log("my group list data >>", data)
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(MyGroupListClear(data))
                return
            }
            dispatch(GetMyGroupList(data))
        }).catch((error) => {
            dispatch(MyGroupListFail())
            console.log("err", error)
        })
    }
}
// 내 좋아요 디자인 불러오기
export function GetMyLikeDesignRequest(token, page) {
    return (dispatch) => {
        return fetch(`${host}/users/myPage/likeDesign/${page}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {

            return response.json()
        }).then((data) => {
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(MyLikeDesignClear(data))
                return
            }
            console.log(`${host}/users/myPage/likeDesign/${page}`);
            dispatch(GetMyLikeDesign(data))
        }).catch((error) => {
            dispatch(MyLikeDesignFail())
            console.log("err", error)
        })
    }
}

export function GetMyLikeGroupRequest(token, page) {
    return (dispatch) => {
        return fetch(`${host}/users/myPage/likeDesign/${page}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {

            return response.json()
        }).then((data) => {
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                //dispatch(MyLikeGroupClear(data))
                return
            }
            console.log(`${host}/users/myPage/likeDesign/${page}`);
            dispatch(GetMyLikeDesign(data))
        }).catch((error) => {
            dispatch(MyLikeDesignFail())
            console.log("err", error)
        })
    }
}


// 내 좋아요 디자이너 불러오기
export function GetMyLikeDesignerRequest(token, page) {
    return (dispatch) => {
        return fetch(`${host}/users/myPage/likeDesigner/${page}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {
            return response.json()
        }).then((data) => {
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(MyLikeDesignerClear(data))
                return
            }
            console.log(data);
            dispatch(GetMyLikeDesigner(data))
        }).catch((error) => {
            dispatch(MyLikeDesignerFail())
            console.log("err", error)
        })
    }
}
// 내가 받은 초대 리스트 가져오기
export function GetMyInvitedListRequest(token) {
    return (dispatch) => {
        dispatch(GetMyInvitedList())
        return fetch(`${host}/users/myPage/invited`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {
            return response.json()
        }).then((data) => {
            console.log("my invited list data >>", data)
            if (!data) {
                console.log("no data")
                data = []
            }
            dispatch(GetMyInvitedListSuccess(data))
        }).catch((error) => {
            dispatch(GetMyInvitedListFailure())
            console.log("err", error)
        })
    }
}
// 내가 보낸 가입 신청 리스트 가져오기
export function GetMyInvitingListRequest(token) {
    return (dispatch) => {
        dispatch(GetMyInvitingList())
        return fetch(`${host}/users/myPage/inviting`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            method: "get"
        }).then(response => {
            return response.json()
        }).then((data) => {
            console.log("my inviting list data >>", data)
            if (!data) {
                console.log("no data")
                data = []
            }
            dispatch(GetMyInvitingListSuccess(data))
        }).catch((error) => {
            dispatch(GetMyInvitingListFailure())
            console.log("err", error)
        })
    }
}
export function InsertUserDetailRequest(data, token) {
    return (dispatch) => {
        dispatch(InsertUserDetail())

        return fetch(`${host}/users/insertDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
            .then(function (res) {
                return res.json()
            })
            .then(function (res) {
                console.log("insert detail", res)
                return dispatch(InsertUserDetailSuccess(res))
            }).catch((error) => {
                console.log("insert detail err", error)
                return dispatch(InsertUserDetailFailure())
            })
    }
}
export function UpdateUserDetailRequest(data, token) {
    return (dispatch) => {
        dispatch(UpdateUserDetail())
        return fetch(`${host}/users/modifyDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) }).then(function (res) {
            return res.json()
        }).then(function (res) {
            console.log("update detail", res)
            if (res.success === true) {
                return dispatch(UpdateUserDetailSuccess())
            }
            return dispatch(UpdateUserDetailFailure())
        }).catch((error) => {
            console.log("update detail err", error)
            return dispatch(UpdateUserDetailFailure())
        })
    }
}
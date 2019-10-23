import host from "config"
import update from "react-addons-update"

// designer like
const GET_LIKE_DESIGNER = "GET_LIKE_DESIGNER"
const GET_LIKE_DESIGNER_SUCCESS = "GET_LIKE_DESIGNER_SUCCESS"
const GET_LIKE_DESIGNER_FAILURE = "GET_LIKE_DESIGNER_FAILURE"
const LIKE_DESIGNER = "LIKE_DESIGNER"
const LIKE_DESIGNER_SUCCESS = "LIKE_DESIGNER_SUCCESS"
const LIKE_DESIGNER_FAILURE = "LIKE_DESIGNER_FAILURE"
const UNLIKE_DESIGNER = "UNLIKE_DESIGNER"
const UNLIKE_DESIGNER_SUCCESS = "UNLIKE_DESIGNER_SUCCESS"
const UNLIKE_DESIGNER_FAILURE = "UNLIKE_DESIGNER_FAILURE"
const GET_DESIGNER_DETAIL = "GET_DESIGNER_DETAIL"
const GET_DESIGNER_COUNT = "GET_DESIGNER_COUNT"
const GET_MY_DESIGN_IN_DESIGNER = "GET_MY_DESIGN_IN_DESIGNER"
const GET_MY_DESIGN_IN_DESIGNER_CLEAR = "GET_MY_DESIGN_IN_DESIGNER_CLEAR"
const MY_DESIGN_IN_DESIGNER_FAIL = "MY_DESIGN_IN_DESIGNER_FAIL"
const GET_DESIGN_IN_DESIGNER = "GET_DESIGN_IN_DESIGNER"
const GET_DESIGN_IN_DESIGNER_CLEAR = "GET_DESIGN_IN_DESIGNER_CLEAR"
const DESIGN_IN_DESIGNER_FAIL = "DESIGN_IN_DESIGNER_FAIL"
const GET_LIKE_IN_DESIGNER = "GET_LIKE_IN_DESIGNER"
const GET_LIKE_IN_DESIGNER_CLEAR = "GET_LIKE_IN_DESIGNER_CLEAR"
const LIKE_IN_DESIGNER_FAIL = "LIKE_IN_DESIGNER_FAIL"

const GET_LIKE_GROUP_IN_DESIGNER = "GET_LIKE_GROUP_IN_DESIGNER";
const GET_LIKE_GROUP_IN_DESIGNER_CLEAR = "GET_LIKE_GROUP_IN_DESIGNER_CLEAR";
const GET_LIKE_GROUP_IN_DESIGNER_FAIL = "GET_LIKE_GROUP_IN_DESIGNER_FAIL";

const GET_LIKE_DESIGNER_IN_DESIGNER = "GET_LIKE_DESIGNER_IN_DESIGNER";
const GET_LIKE_DESIGNER_IN_DESIGNER_CLEAR = "GET_LIKE_DESIGNER_IN_DESIGNER";
const GET_LIKE_DESIGNER_IN_DESIGNER_FAIL = "GET_LIKE_DESIGNER_IN_DESIGNER_FAIL";

const GET_GROUP_IN_DESIGNER = "GET_GROUP_IN_DESIGNER"
const GET_GROUP_IN_DESIGNER_CLEAR = "GET_GROUP_IN_DESIGNER_CLEAR";
const GET_GROUP_IN_DESIGNER_FAIL = "GET_GROUP_IN_DESIGNER_FAIL"
// action creator

const GetDesignerDetail = (data) => ({ type: GET_DESIGNER_DETAIL, DesignerDetail: data })
const GetDesignerCount = (data) => ({ type: GET_DESIGNER_COUNT, Count: data })
const GetMyDesignInDesigner = (data) => ({ type: GET_MY_DESIGN_IN_DESIGNER, MyDesignInDesigner: data })
const MyDesignInDesignerClear = (data) => ({ type: GET_MY_DESIGN_IN_DESIGNER_CLEAR, MyDesignInDesigner: data, MyDesignInDesignerAdded: [] })
const MyDesignInDesignerFail = () => ({ type: MY_DESIGN_IN_DESIGNER_FAIL, MyDesignInDesigner: [], MyDesignInDesignerAdded: [] })
const GetDesignInDesigner = (data) => ({ type: GET_DESIGN_IN_DESIGNER, DesignInDesigner: data })
const DesignInDesignerClear = (data) => ({ type: GET_DESIGN_IN_DESIGNER_CLEAR, DesignInDesigner: data, DesignInDesignerAdded: [] })
const DesignInDesignerFail = () => ({ type: DESIGN_IN_DESIGNER_FAIL, DesignInDesigner: [], DesignInDesignerAdded: [] })
const GetLikeInDesigner = (data) => ({ type: GET_LIKE_IN_DESIGNER, LikeInDesigner: data })
const LikeInDesignerClear = (data) => ({ type: GET_LIKE_IN_DESIGNER_CLEAR, LikeInDesigner: data, LikeInDesignerAdded: [] })
const LikeInDesignerFail = () => ({ type: LIKE_IN_DESIGNER_FAIL, LikeInDesigner: [], LikeInDesignerAdded: [] })
const GetLikeDesigner = (data) => ({ type: GET_LIKE_DESIGNER })
const GetLikeDesignerSuccess = (data) => ({ type: GET_LIKE_DESIGNER_SUCCESS, like: data })
const GetLikeDesignerFailure = (data) => ({ type: GET_LIKE_DESIGNER_FAILURE, like: data })
const LikeDesigner = () => ({ type: LIKE_DESIGNER })
const LikeDesignerSuccess = () => ({ type: LIKE_DESIGNER_SUCCESS })
const LikeDesignerFailure = () => ({ type: LIKE_DESIGNER_FAILURE })
const UnlikeDesigner = () => ({ type: UNLIKE_DESIGNER })
const UnlikeDesignerSuccess = () => ({ type: UNLIKE_DESIGNER_SUCCESS })
const UnlikeDesignerFailure = () => ({ type: UNLIKE_DESIGNER_FAILURE })
const GetLikeDesignerInDesigner = (data) => ({ type: GET_LIKE_DESIGNER_IN_DESIGNER, LikeDesignerInDesigner: data });
const GetLikeDesignerInDesignerClear = (data) => ({ type: GET_LIKE_DESIGNER_IN_DESIGNER_CLEAR, LikeDesignerInDesigner: data, LikeDesignerInDesignerAdded: [] });
const GetLikeDesignerInDesignerFail = () => ({ type: GET_LIKE_DESIGNER_IN_DESIGNER_FAIL, LikeDesignerInDesigner: [], LikeDesignerInDesignerAdded: [] });
const GetLikeGroupInDesigner = (data) => ({ type: GET_LIKE_GROUP_IN_DESIGNER, LikeGroupInDesigner: data });
const GetLikeGroupInDesignerClear = (data) => ({ type: GET_LIKE_GROUP_IN_DESIGNER_CLEAR, LikeGroupInDesigner: data, LikeGroupInDesignerAdded: [] });
const GetLikeGroupInDesignerFail = () => ({ type: GET_LIKE_GROUP_IN_DESIGNER_FAIL, LikeGroupInDesigner: [], LikeGroupInDesignerAdded: [] });
const GetGroupInDesigner = (data) => ({ type: GET_GROUP_IN_DESIGNER, GroupInDesigner: data });
const GetGroupInDesignerClear = (data) => ({ type: GET_GROUP_IN_DESIGNER_CLEAR, GroupInDesigner: data, GroupInGroupAdded: [] });
const GetGroupInDesignerFail = () => ({ type: GET_GROUP_IN_DESIGNER_FAIL, GroupInDesigner: [], GroupInGroupAdded: [] });



const initialState = {
    DesignerDetail: { status: "INIT" },
    DesignerList: { status: "INIT" },
    LikeDesigner: { status: "INIT" },
    status: {
        DesignerDetail: [],
        Count: { total_like: 0, total_design: 0, total_group: 0, total_view: 0 },
        like: false,
        MyDesignInDesigner: [],
        MyDesignInDesignerAdded: [],
        DesignInDesigner: [],
        DesignInDesignerAdded: [],
        LikeInDesigner: [],
        LikeInDesignerAdded: [],
        DesignerList: [],
        DesignerListAdded: [],
        DesignerCount: 0,
        LikeGroupInDesigner: [],
        LikeGroupInDesignerAdded: [],
        LikeDesignerInDesigner: [],
        LikeDesignerInDesignerAdded: [],
        GroupInDesigner: [],
        GroupInDesignerAdded: [],
    }
}


export function Designer(state, action) {
    if (typeof state === "undefined")
        state = initialState
    switch (action.type) {
        case GET_LIKE_DESIGNER:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "WATTING" }
                }
            })
        case GET_LIKE_DESIGNER_SUCCESS:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    like: { $set: action.like }
                }
            })
        case GET_LIKE_DESIGNER_FAILURE:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "FAILURE" }
                },
                status: {
                    like: { $set: action.like }
                }
            })

        case LIKE_DESIGNER:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "WATING" }
                }
            })
        case LIKE_DESIGNER_SUCCESS:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "SUCCESS" }
                }
            })
        case LIKE_DESIGNER_FAILURE:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "FAILURE" }
                }
            })
        case UNLIKE_DESIGNER:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "WATING" }
                }
            })
        case UNLIKE_DESIGNER_SUCCESS:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "SUCCESS" }
                }
            })
        case UNLIKE_DESIGNER_FAILURE:
            return update(state, {
                LikeDesigner: {
                    status: { $set: "FAILURE" }
                }
            })
        case GET_DESIGNER_DETAIL:
            return update(state, {
                status: {
                    DesignerDetail: { $set: action.DesignerDetail }
                }
            })
        case GET_DESIGNER_COUNT:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        case GET_DESIGN_IN_DESIGNER:
            return update(state, {
                status: {
                    DesignInDesigner: { $set: action.DesignInDesigner },
                    DesignInDesignerAdded: { $push: action.DesignInDesigner }
                }
            })
        case GET_DESIGN_IN_DESIGNER_CLEAR:
            return update(state, {
                status: {
                    DesignInDesigner: { $set: action.DesignInDesigner },
                    DesignInDesignerAdded: { $set: action.DesignInDesigner }
                }
            })
        case DESIGN_IN_DESIGNER_FAIL:
            return update(state, {
                status: {
                    DesignInDesigner: { $set: action.DesignInDesigner },
                    DesignInDesignerAdded: { $set: action.DesignInDesignerAdded }
                }
            })
        case GET_GROUP_IN_DESIGNER:
            return update(state, {
                status: {
                    GroupInDesigner: { $set: action.GroupInDesigner },
                    GroupInDesignerAdded: { $push: action.GroupInDesigner },
                }
            })

        case GET_GROUP_IN_DESIGNER_CLEAR:
            return update(state, {
                status: {
                    GroupInDesigner: { $set: action.GroupInDesigner },
                    GroupInDesignerAdded: { $set: action.GroupInDesigner },
                }
            })
        case GET_GROUP_IN_DESIGNER_FAIL:
            return update(state, {
                status: {
                    GroupInDesigner: { $set: action.GroupInDesigner },
                    GroupInDesignerAdded: { $set: action.GroupInDesignerAdded },
                }
            })
        case GET_LIKE_IN_DESIGNER:
            return update(state, {
                status: {
                    LikeInDesigner: { $set: action.LikeInDesigner },
                    LikeInDesignerAdded: { $push: action.LikeInDesigner }
                }
            })
        case GET_LIKE_IN_DESIGNER_CLEAR:
            return update(state, {
                status: {
                    LikeInDesigner: { $set: action.LikeInDesigner },
                    LikeInDesignerAdded: { $set: action.LikeInDesigner }
                }
            })
        case LIKE_IN_DESIGNER_FAIL:
            return update(state, {
                status: {
                    LikeInDesigner: { $set: action.LikeInDesigner },
                    LikeInDesignerAdded: { $set: action.LikeInDesignerAdded }
                }
            })

        case GET_LIKE_GROUP_IN_DESIGNER:
            return update(state, {
                status: {
                    LikeGroupInDesigner: { $set: action.LikeGroupInDesigner },
                    LikeGroupInDesignerAdded: { $push: action.LikeGroupInDesigner },

                }
            })
        case GET_LIKE_GROUP_IN_DESIGNER_CLEAR:
            return update(state, {
                status: {
                    LikeGroupInDesigner: { $set: action.LikeGroupInDesigner },
                    LikeGroupInDesignerAdded: { $set: action.LikeGroupInDesigner },

                }
            })
        case GET_LIKE_GROUP_IN_DESIGNER_FAIL:
            return update(state, {
                status: {
                    LikeGroupInDesigner: { $set: action.LikeGroupInDesigner },
                    LikeGroupInDesignerAdded: { $set: action.LikeGroupInDesignerAdded },

                }
            })

        case GET_LIKE_DESIGNER_IN_DESIGNER:
            return update(state, {
                status: {
                    LikeDesignerInDesigner: { $set: action.LikeDesignerInDesigner },
                    LikeDesignerInDesignerAdded: { $push: action.LikeDesignerInDesigner }

                }
            })
        case GET_LIKE_DESIGNER_IN_DESIGNER_CLEAR:
            return update(state, {
                status: {
                    LikeDesignerInDesigner: { $set: action.LikeDesignerInDesigner },
                    LikeDesignerInDesignerAdded: { $set: action.LikeDesignerInDesigner }

                }
            })
        case GET_LIKE_DESIGNER_IN_DESIGNER_FAIL:
            return update(state, {
                status: {
                    LikeDesignerInDesigner: { $set: action.LikeDesignerInDesigner },
                    LikeDesignerInDesignerAdded: { $set: action.LikeDesignerInDesignerAdded }

                }
            })
        case GET_MY_DESIGN_IN_DESIGNER:
            return update(state, {
                status: {
                    MyDesignInDesigner: { $set: action.MyDesignInDesigner },
                    MyDesignInDesignerAdded: { $push: action.MyDesignInDesigner }
                }
            })
        case GET_MY_DESIGN_IN_DESIGNER_CLEAR:
            return update(state, {
                status: {
                    MyDesignInDesigner: { $set: action.MyDesignInDesigner },
                    MyDesignInDesignerAdded: { $set: action.MyDesignInDesigner }
                }
            })
        case MY_DESIGN_IN_DESIGNER_FAIL:
            return update(state, {
                status: {
                    MyDesignInDesigner: { $set: action.MyDesignInDesigner },
                    MyDesignInDesignerAdded: { $set: action.MyDesignInDesignerAdded }
                }
            })
        default:
            return state
    }
}


// 디자이너가 좋아요 한 디자인 가져오기
export function GetLikeInDesignerRequest(id, page) {
    return (dispatch) => {
        return fetch(`${host}/designer/designerDetail/` + id + "/like/" + page, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("designer's like list data >>", data)
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(LikeInDesignerClear(data))
                return
            }
            dispatch(GetLikeInDesigner(data))
        }).catch((error) => {
            dispatch(LikeInDesignerFail())
            console.log("err", error)
        })
    }
}
// 디자이너의 참여 리스트 가져오기
export function GetDesignInDesignerRequest(id, page) {
    return (dispatch) => {
        return fetch(`${host}/designer/designerDetail/` + id + "/design/" + page, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("designer's design list data >>", data)
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(DesignInDesignerClear(data))
                return
            }
            dispatch(GetDesignInDesigner(data))
        }).catch((error) => {
            dispatch(DesignInDesignerFail())
            console.log("err", error)
        })
    }
}
// 디자이너가 속한 그룹 가져오기
export function GetGroupInDesignerRequest(id, page) {
    return (dispatch) => {
        return fetch(`${host}/designer/designerDetail/${id}/inGroup/${page}`, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(GetGroupInDesignerClear(data))
                return
            }
            dispatch(GetGroupInDesigner(data))
        }).catch((error) => {
            dispatch(GetGroupInDesignerFail())
            console.log("err", error)
        })
    }
}
//디자이너가 좋아요 누른 그룹 가졍기
export function GetLikeGroupInDesignerRequest(id, page) {
    return (dispatch) => {
        return fetch(`${host}/designer/designerDetail/` + id + "/likeGroup/" + page, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data) {
                console.log(`${host}/designer/designerDetail/` + id + "/likeGroup/" + page + "1111");

                console.log("no data")
                data = []
            }
            if (page === 0) {
                console.log(`${host}/designer/designerDetail/` + id + "/likeGroup/" + page + "2222");
                dispatch(GetLikeGroupInDesignerClear(data))
                return
            }

            dispatch(GetLikeGroupInDesigner(data))
        }).catch((error) => {
            dispatch(GetLikeGroupInDesignerFail())
            console.log("err", error)
        })
    }
}
//디자이너가 좋아요 누른 디자이너 가져오기
export function GetLikeDesignerInDesignerRequest(id, page) {
    return (dispatch) => {
        return fetch(`${host}/designer/designerDetail/` + id + "/likeDesigner/" + page, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(GetLikeDesignerInDesignerClear(data))
                return
            }
            dispatch(GetLikeDesignerInDesigner(data))
        }).catch((error) => {
            dispatch(GetLikeDesignerInDesignerFail())
            console.log("err", error)
        })
    }
}

// 디자이너의 디자인 리스트 가져오기
export function GetMyDesignInDesignerRequest(id, page) {
    const sql = `${host}/designer/designerDetail/${id}/allDesignDesigner/${page}`;
    console.log("sql:", sql);
    // const sql = `${host}/designer/designerDetail/` + id + "/myDesign/" + page
    console.log(sql);
    return (dispatch) => {
        return fetch(sql, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("designer's design list data >>", data)
            if (!data) {
                console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(MyDesignInDesignerClear(data))
                return
            }
            dispatch(GetMyDesignInDesigner(data))
        }).catch((error) => {
            dispatch(MyDesignInDesignerFail())
            console.log("err", error)
        })
    }
}
// 로그인 했을때 내 좋아요 정보 가져오기
export function GetLikeDesignerRequest(id, token) {
    return (dispatch) => {
        dispatch(GetLikeDesigner())
        return fetch(`${host}/Designer/getLike/${id}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("Designer like >>", data)
            if (!data) {
                console.log("no like info")
                data = false
            }
            dispatch(GetLikeDesignerSuccess(data.like))
        }).catch((error) => {
            console.log("err", error)
            GetLikeDesignerFailure(false)
        })
    }
}
// 디자이너 좋아요 하기
export function LikeDesignerRequest(id, token) {
    return (dispatch) => {
        dispatch(LikeDesigner())
        return fetch(`${host}/Designer/like/${id}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "post"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("like >>>", data);
            if (!data) {
                console.log("no data")
            }
            dispatch(LikeDesignerSuccess())
            return data
        }).catch((error) => {
            console.log("err", error)
            LikeDesignerFailure(error)
        })
    }
}
// 디자이너 좋아요 취소하기
export function UnlikeDesignerRequest(id, token) {
    return (dispatch) => {
        dispatch(UnlikeDesigner())
        return fetch(`${host}/Designer/unlike/${id}`, {
            headers: { "Content-Type": "application/json", 'x-access-token': token },
            method: "post"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("unlike >>>", data)
            if (!data) {
                console.log("no data")
            }
            dispatch(UnlikeDesignerSuccess(data))
            return data
        }).catch((error) => {
            console.log("err", error)
            UnlikeDesignerFailure(error)
        })
    }
}
export function GetDesignerDetailRequest(id) {
    return (dispatch) => {
        return fetch(`${host}/designer/designerDetail/` + id, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("designer Detail data >>", data)
            if (!data) {
                console.log("no data")
                data = []
            }
            dispatch(GetDesignerDetail(data))
        }).catch((error) => {
            console.log("err", error)
        })
    }
}
export function GetDesignerCountRequest(id) {
    return (dispatch) => {
        return fetch(`${host}/designer/getCount/${id}`, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data) {
                console.log("no data")
                data = { total_like: 0, total_group: 0, total_design: 0, total_favorite: 0, total_view: 0 };
            }
            dispatch(GetDesignerCount(data))
        }).catch((err) => {
            console.log("err", err)
        })
    }
}
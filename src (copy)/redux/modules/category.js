import host from "config"
import update from "react-addons-update"

// actions
const LIST_SUCCESS = "opendesign/category/GET_LIST_SUCCESS"
const LIST_FAILURE = "opendesign/category/GET_LIST_FAILURE"

// action creators
export const GetCategoryListSuccess = (cate1, cate2) => ({ type: LIST_SUCCESS, category1: cate1, category2: cate2 })
export const GetCategoryListFailure = () => ({ type: LIST_FAILURE })

// initial state
const initialState = {
    category: { status: "INIT" },
    status: { category1: [], category2: [] }
}

// reducer
export default function category(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case LIST_SUCCESS:
            return update(state, {
                category: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    category1: { $set: action.category1 },
                    category2: { $set: action.category2 }
                }
            })
        case LIST_FAILURE:
            return update(state, {
                category: {
                    status: { $set: "FAILURE" }
                }
            })
        default:
            return state
    }
}

// api actions
export function GetCategoryListRequest() {
    return (dispatch) => {
        return fetch(`${host}/categorys/getCategoryAll`, { method: "GET" })
            .then((res) => {
                return res.json()
            }).then(function (res) {
                let category1 = res.data.category1.map(data => {
                    return { text: data.name, value: data.uid }
                })
                category1.unshift({ text: "전체", value: 0 })
                let category2 = []
                category2 = res.data.category2.map(data => {
                    let arr = data.map(item => {
                        return { text: item.name, value: item.uid, parent: item.parents_id }
                    })
                    arr.unshift({ text: "전체", value: 0 })
                    return (arr)
                })
                category2.unshift([{ text: "전체", value: 0 }])
                return dispatch(GetCategoryListSuccess(category1, category2))
            }).catch((error) => {
                console.log(error)
                return dispatch(GetCategoryListFailure())
            })
    }
}

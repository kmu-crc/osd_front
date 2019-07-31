import * as types from "actions/ActionTypes";
import host from "config";

export function GetCategoryListRequest() {
    // console.log("GetCategoryListRequest")
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
                    let arr = data.map(item => { return { text: item.name, value: item.uid, parent: item.parents_id } })
                    arr.unshift({ text: "전체", value: 0 })
                    return (arr)
                });
                category2.unshift([{ text: "전체", value: 0 }])
                return dispatch(GetCategoryListSuccess(category1, category2))
            }).catch((error) => {
                console.log(error)
                return dispatch(GetCategoryListFailure())
            })
    }
}

export function GetCategoryListSuccess(cate1, cate2) {
    return {
        type: types.GET_CATEGORY_LIST_SUCCESS,
        category1: cate1,
        category2: cate2
    }
}

export function GetCategoryListFailure() {
    return {
        type: types.GET_CATEGORY_LIST_FAILURE
    }
}

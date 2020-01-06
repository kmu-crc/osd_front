import * as types from "actions/ActionTypes";
import host from "config";

export function GetCategoryAllRequest() {
  return (dispatch) => {
    dispatch(GetCategoryAll());
    return fetch(`${host}/categorys/getCategoryAll`, { method: "GET" })
      .then(res => res.json())
      .then(res => {
        let category1 = res.data.category1.map(data => {
          return { text: data.name, value: data.uid };
        });
        category1.unshift({ text: "전체", value: 0 });
        let category2 = [];
        category2 = res.data.category2.map(data => {
          let arr = data.map(item => { return { text: item.name, value: item.uid, parent: item.parents_id } })
          arr.unshift({ text: "전체", value: 0 })
          return (arr)
        });
        category2.unshift([{ text: "전체", value: 0 }]);
        return dispatch(GetCategoryAllSuccess(category1, category2));
      }).catch((error) => {
        console.log(error);
        return dispatch(GetCategoryAllFailure());
      });
  }
};

export function GetCategoryAll() {
  return {
    type: types.GET_CATEGORY_ALL
  }
};

export function GetCategoryAllSuccess(cate1, cate2) {
  return {
    type: types.GET_CATEGORY_ALL_SUCCESS,
    category1: cate1,
    category2: cate2
  }
};

export function GetCategoryAllFailure() {
  return {
    type: types.GET_CATEGORY_ALL_FAILURE
  }
};

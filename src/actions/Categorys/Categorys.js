import * as types from "actions/ActionTypes";
import host from "config";

export function GetCategoryAllRequest() {
  return (dispatch) => {
    dispatch(GetCategoryAll());
    const sql = `${host}/categorys/getCategoryAll`;
    return fetch(sql, { method: "GET" })
      .then(res => res.json())
      .then(res => {
        let category1 = res.data.category1.map(data => {
          return { text: data.name, value: data.uid };
        });
        category1.unshift({ text: "전체", value: 0 });
        let category2 = [];
        category2 = res.data.category2.map(cate2 => ({ text: cate2.name, value: cate2.value, parent: cate2.parents_id }))
        // res.data.category2.map(data => {
        //   let arr = data.map(item => { return { text: item.name, value: item.uid, parent: item.parent } })
        //   arr.unshift({ text: "전체", value: 0 })
        //   return (arr)
        // });
        // category2.unshift([{ text: "전체", value: 0 }]);
        return dispatch(GetCategoryAllSuccess(category1, category2));
      }).catch((error) => {
        console.log(error);
        return dispatch(GetCategoryAllFailure());
      });
  }
};

const GetCategoryAll = () => ({ type: types.GET_CATEGORY_ALL });
const GetCategoryAllSuccess = (cate1, cate2) => ({ type: types.GET_CATEGORY_ALL_SUCCESS, category1: cate1, category2: cate2 });
const GetCategoryAllFailure = () => ({ type: types.GET_CATEGORY_ALL_FAILURE });

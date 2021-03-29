import * as types from "actions/ActionTypes";
import host from "config";

export function GetCategoryAllRequest() {
  return (dispatch) => {
    dispatch(GetCategoryAll());
    const url = `${host}/categorys/getCategoryAll`;
    return fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(res => {
        // console.log(res.data);
        const category1 = res.data.category1.map(data => ({ text: data.name, value: data.uid }));
        const category2 = res.data.category2.map(cate2 => ({ text: cate2.name, value: cate2.uid/*value*/, parent: cate2.parents_id }));
        const category3 = res.data.category3.map(cate3 => ({ text: cate3.name, value: cate3.uid/*value*/, parent: cate3.parents_id }));
        return dispatch(GetCategoryAllSuccess(category1, category2, category3));
      }).catch((error) => {
        console.log(error);
        return dispatch(GetCategoryAllFailure());
      });
  }
};

const GetCategoryAll = () => ({ type: types.GET_CATEGORY_ALL });
const GetCategoryAllSuccess = (cate1, cate2, cate3) => ({ type: types.GET_CATEGORY_ALL_SUCCESS, category1: cate1, category2: cate2, category3: cate3 });
const GetCategoryAllFailure = () => ({ type: types.GET_CATEGORY_ALL_FAILURE });

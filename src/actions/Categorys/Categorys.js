import * as types from "actions/ActionTypes";
import host from "config";

export function GetCategoryLevel1Request() {
  return (dispatch) => {
    dispatch(GetCategoryLevel1());

    return fetch(`${host}/categorys/getCategoryLevel1`, { method: "GET" })
      .then(function (res) {
        // console.log("res", res);
        return res.json();
      })
      .then(function (res) {
        console.log("cateogry1", res);
        let category = res.category.map(data => {
          return { text: data.name, value: data.uid };
        })
        category.unshift({ text: "전체", value: 0 });
        return dispatch(GetCategoryLevel1Success(category));
      }).catch((error) => {
        return dispatch(GetCategoryLevel1Failure());
      })
  }
};

export function GetCategoryLevel1() {
  return {
    type: types.GET_CATEGORY_LEVEL1
  }
};

export function GetCategoryLevel1Success(category) {
  return {
    type: types.GET_CATEGORY_LEVEL1_SUCCESS,
    category: category
  }
};

export function GetCategoryLevel1Failure() {
  return {
    type: types.GET_CATEGORY_LEVEL1_FAILURE
  }
};

export function GetCategoryLevel2Request(id) {
  return (dispatch) => {
    dispatch(GetCategoryLevel2());

    return fetch(`${host}/categorys/getCategoryLevel2/${id}`, { method: "GET" })
      .then(function (res) {
        // console.log("res", res);
        return res.json();
      })
      .then(function (res) {
        let category = res.category.map(data => {
          return { text: data.name, value: data.uid };
        });
        category.unshift({ text: "전체", value: 0 });
        return dispatch(GetCategoryLevel2Success(category));
      }).catch((error) => {
        return dispatch(GetCategoryLevel2Failure());
      })
  }
};

export function GetCategoryLevel2() {
  return {
    type: types.GET_CATEGORY_LEVEL2
  }
};

export function GetCategoryLevel2Success(category) {
  return {
    type: types.GET_CATEGORY_LEVEL2_SUCCESS,
    category: category
  }
};

export function GetCategoryLevel2Failure() {
  return {
    type: types.GET_CATEGORY_LEVEL2_FAILURE
  }
};

export function GetCategoryAllRequest() {
  return (dispatch) => {
    dispatch(GetCategoryAll());
    return fetch(`${host}/categorys/getCategoryAll`, { method: "GET" })
      .then((res) => {
        return res.json();
      }).then(function (res) {
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

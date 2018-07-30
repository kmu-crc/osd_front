import * as types from "actions/ActionTypes";
import host from "config";

export function GetCategoryLevel1Request() {
  return (dispatch) => {
    dispatch(GetCategoryLevel1());

    return fetch(`${host}/categorys/getCategoryLevel1`, { method: "GET" })
      .then(function (res) {
        console.log("res", res);
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
        console.log("res", res);
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

export function GetCategoryLevel2AllRequest(cate1) {
  return (dispatch) => {
    console.log(cate1);
    dispatch(GetCategoryLevel2All());
    cate1 && cate1.length > 0 && cate1.map(async (num, i) => {
      if (num.value === 0) {
        return;
      }
      return await fetch(`${host}/categorys/getCategoryLevel2/${num.value}`, { method: "GET" })
      .then(function (res) {
        console.log("res", res);
        return res.json();
      }).then(function (res) {
        let category = res.category.map(data => {
          return { text: data.name, value: data.uid, parent_id: data.parents_id };
        });
        return dispatch(GetCategoryLevel2AllSuccess(category));
      }).catch((error) => {
        console.log(error);
        return dispatch(GetCategoryLevel2AllFailure());
      });
    })

  }
};

export function GetCategoryLevel2All() {
  return {
    type: types.GET_CATEGORY_LEVEL2_ALL
  }
};

export function GetCategoryLevel2AllSuccess(category) {
  return {
    type: types.GET_CATEGORY_LEVEL2_ALL_SUCCESS,
    level2: category,
    level2List: []
  }
};

export function GetCategoryLevel2AllFailure() {
  return {
    type: types.GET_CATEGORY_LEVEL2_ALL_FAILURE
  }
};

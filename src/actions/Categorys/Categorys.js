import * as types from "actions/ActionTypes";

export function GetCategoryLevel1Request() {
  return (dispatch) => {
    dispatch(GetCategoryLevel1());

    return fetch("http://localhost:8080/categorys/getCategoryLevel1", { method: "GET" })
      .then(function (res) {
        console.log("res", res);
        return res.json();
      })
      .then(function (res) {
        console.log("cateogry1", res);
        let category = res.category.map( data => {
          return { text: data.name, value: data.uid };
        })
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

      return fetch(`http://localhost:8080/categorys/getCategoryLevel2/${id}`, { method: "GET" })
        .then(function (res) {
          console.log("res", res);
          return res.json();
        })
        .then(function (res) {
          let category = res.category.map( data => {
            return { text: data.name, value: data.uid };
          })
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

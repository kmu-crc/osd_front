import host from "config"
import update from "react-addons-update"

// get cagetgory level1
const GET_CATEGORY_LEVEL1 = "GET_CATEGORY_LEVEL1"
const GET_CATEGORY_LEVEL1_SUCCESS = "GET_CATEGORY_LEVEL1_SUCCESS"
const GET_CATEGORY_LEVEL1_FAILURE = "GET_CATEGORY_LEVEL1_FAILURE"
// get cagetgory level2
const GET_CATEGORY_LEVEL2 = "GET_CATEGORY_LEVEL2"
const GET_CATEGORY_LEVEL2_SUCCESS = "GET_CATEGORY_LEVEL2_SUCCESS"
const GET_CATEGORY_LEVEL2_FAILURE = "GET_CATEGORY_LEVEL2_FAILURE"
// get category level2 All
const GET_CATEGORY_ALL = "GET_CATEGORY_ALL"
const GET_CATEGORY_ALL_SUCCESS = "GET_CATEGORY_ALL_SUCCESS"
const GET_CATEGORY_ALL_FAILURE = "GET_CATEGORY_ALL_FAILURE"


const GetCategoryAll = () => ({ type: GET_CATEGORY_ALL })
const GetCategoryLevel1 = () => ({ type: GET_CATEGORY_LEVEL1 })
const GetCategoryLevel2 = () => ({ type: GET_CATEGORY_LEVEL2 })
const GetCategoryAllSuccess = (cate1, cate2, cate3) => ({ type: GET_CATEGORY_ALL_SUCCESS, category1: cate1, category2: cate2, category3: cate3 })
const GetCategoryLevel1Success = (category) => ({ type: GET_CATEGORY_LEVEL1_SUCCESS, category: category })
const GetCategoryLevel2Success = (category) => ({ type: GET_CATEGORY_LEVEL2_SUCCESS, category: category })
const GetCategoryAllFailure = () => ({ type: GET_CATEGORY_ALL_FAILURE })
const GetCategoryLevel1Failure = () => ({ type: GET_CATEGORY_LEVEL1_FAILURE })
const GetCategoryLevel2Failure = () => ({ type: GET_CATEGORY_LEVEL2_FAILURE })


const initialState = {
  category: { status: "INIT" },
  status: { level1: [], level2: [], category1: [], category2: [], category3:[] }
}


export default function Category(state, action) {
  if (typeof state === "undefined")
    state = initialState

  switch (action.type) {
    case GET_CATEGORY_ALL:
      return update(state, {
        category: { status: { $set: "WAITING" } }
      })
    case GET_CATEGORY_ALL_SUCCESS:
      return update(state, {
        category: { status: { $set: "SUCCESS" } },
        status: { category1: { $set: action.category1 }, category2: { $set: action.category2 }, category3: {$set:action.category3} }
      })
    case GET_CATEGORY_ALL_FAILURE:
      return update(state, {
        category: { status: { $set: "FAILURE" } }
      })
    case GET_CATEGORY_LEVEL1:
      return update(state, {
        category: { status: { $set: "WAITING" } }
      })
    case GET_CATEGORY_LEVEL1_SUCCESS:
      return update(state, {
        category: { status: { $set: "SUCCESS" } }, status: { level1: { $set: action.category } }
      })
    case GET_CATEGORY_LEVEL1_FAILURE:
      return update(state, {
        category: { status: { $set: "FAILURE" } }
      })
    case GET_CATEGORY_LEVEL2:
      return update(state, {
        category: { status: { $set: "WAITING" } }
      })
    case GET_CATEGORY_LEVEL2_SUCCESS:
      return update(state, {
        category: { status: { $set: "SUCCESS" } }, status: { level2: { $set: action.category } }
      })
    case GET_CATEGORY_LEVEL2_FAILURE:
      return update(state, {
        category: { status: { $set: "FAILURE" } }
      })
    default:
      return state
  }
}


export function GetCategoryAllRequest() {
  //console.log("GetAllCate")
  return (dispatch) => {
    dispatch(GetCategoryAll())
    return fetch(`${host}/categorys/getCategoryAll2`, { method: "GET" })
      .then((res) => {
        return res.json()
      }).then(function (res) {
        // console.log("========category",res.data);
        let category1 = res.data.category1.map(data => {
          return { text: data.name, value: data.uid }
        })
        let category2 = []
        category2 = res.data.category2.map(data => {
          let arr = data.map(item => { return { text: item.name, value: item.uid, parent: item.parents_id } })
          return (arr);
        });
        let category3 = []
        category3 = res.data.category3.map(data => {
          // console.log(data);
          if(data==null)return [];
          else{
            let arr = data.map(item => { return { text: item.name, value: item.uid, parent: item.parents_id } })
          return (arr);
          }
          // let arr = data.length>0?()=>{data.map(item => { return { text: item.name, value: item.uid, parent: item.parents_id } })
          // return (arr)}:[];
        });
        // category2.unshift([{ text: "전체", value: 0 }])
        console.log("cate1:", category1, "cate2:", category2,"cate3:",category3)
        return dispatch(GetCategoryAllSuccess(category1, category2, category3))
      }).catch((error) => {
        console.error(error)
        return dispatch(GetCategoryAllFailure())
      })
  }
}
export function GetCategoryLevel1Request() {
  return (dispatch) => {
    dispatch(GetCategoryLevel1())

    return fetch(`${host}/categorys/getCategoryLevel1`, { method: "GET" })
      .then(function (res) {
        // console.log("res", res)
        return res.json()
      })
      .then(function (res) {
        //console.log("cateogry1", res)
        let category = res.category.map(data => {
          return { text: data.name, value: data.uid }
        })
        category.unshift({ text: "전체", value: 0 })
        return dispatch(GetCategoryLevel1Success(category))
      }).catch((error) => {
        return dispatch(GetCategoryLevel1Failure())
      })
  }
}
export function GetCategoryLevel2Request(id) {
  return (dispatch) => {
    dispatch(GetCategoryLevel2())

    return fetch(`${host}/categorys/getCategoryLevel2/${id}`, { method: "GET" })
      .then(function (res) {
        // console.log("res", res)
        return res.json()
      })
      .then(function (res) {
        let category = res.category.map(data => {
          return { text: data.name, value: data.uid }
        })
        category.unshift({ text: "전체", value: 0 })
        return dispatch(GetCategoryLevel2Success(category))
      }).catch((error) => {
        return dispatch(GetCategoryLevel2Failure())
      })
  }
}
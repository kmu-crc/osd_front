import * as types from "actions/ActionTypes";
import host from "config";

// list
export function GetProductListRequest(page, sort, cate1, cate2, keyword) {
  return (dispatch) => {
    const sql = `${host}/product/list/${page}/${sort}/${cate1}/${cate2}/${keyword}`;
    return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch((page === 0) ? (ProductListClear(data || [])) : GetProductList(data || [])))
      .catch(error => dispatch(ProductListFail()))
  }
};
const GetProductList = data => { return { type: types.GET_PRODUCT_LIST, ProductList: data } };
const ProductListClear = data => { return { type: types.PRODUCT_LIST_CLEAR, ProductList: data, ProductListAdded: [] } };
const ProductListFail = () => { return { type: types.PRODUCT_LIST_FAIL, ProductList: [], ProductListAdded: [] } };
export function GetProductTotalCountRequest(cate1, cate2) {
  return (dispatch) => {
    const sql = `${host}/product/Count/${cate1}/${cate2}`;
    return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetProductTotalCount(data ? data["count(*)"] : 0)))
      .catch(error => dispatch(ProductTotalCountFail()))
  }
};
const GetProductTotalCount = data => { return { type: types.GET_PRODUCT_TOTAL_COUNT, Count: data } };
const ProductTotalCountFail = () => { return { type: types.GET_PRODUCT_TOTAL_COUNT_FAIL, Count: 0 } };

// detail
export function GetProductDetailRequest(id, token) {
  return (dispatch) => {
    const sql = `${host}/product/detail/${id}`;
    return fetch(sql, {
      headers: { "Content-Type": "application/json", "x-access-token": token || "" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetProductDetail(data)))
      .catch(error => console.log("err", error));
  }
};
const GetProductDetail = (data) => {
  console.log("GetProductDetail:",data);
  return { type: types.GET_PRODUCT_DETAIL, ProductDetail: data }
};
export function GetProductCountRequest(id) {
  return (dispatch) => {
    const sql = `${host}/product/getCount/${id}`;
    return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetDesignCount(data || { like_count: 0, member_count: 0, card_count: 0, view_count: 0 })))
      .catch(err => console.log("err", err));
  }
};
function GetDesignCount(data) { return { type: types.GET_PRODUCT_COUNT, Count: data } };

// update page-view count
export function UpdateProductViewRequest(id) {
  return (dispatch) => {
    const sql = `${host}/product/updateViewCount/${id}`;
    return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "POST" })
      .then(res => res.json())
      .then(data => dispatch(UpdateProductView()))
      .catch(error => console.log("err", error))
  }
}
const UpdateProductView = () => { return { type: types.UPDATE_PRODUCT_VIEW } };

export function GetDesignDetailView(data) {
  return {
    type: types.GET_DESIGN_DETAIL_VIEW,
    DesignDetailView: data
  }
};

export function DesignDetailViewResetRequest() {
  return (dispatch) => {
    dispatch(DesignDetailViewReset());
  }
};

export function DesignDetailViewReset() {
  return {
    type: types.DESIGN_DETAIL_VIEW_RESET,
    DesignDetailView: []
  }
};

// 로그인 했을때 내 좋아요 정보 가져오기 >>> 전체 디자인에 대한 좋아요
export function GetLikeProductRequest(id, token) {
  return (dispatch) => {
    dispatch(GetLikeProduct());
    const sql = `${host}/Design/getLike/${id}`;
    return fetch(sql, { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetLikeProductSuccess((data && data.like) || false)))
      .catch(error => GetLikeProductFailure(false));
  }
}
const GetLikeProduct = () => { return { type: types.GET_LIKE_PRODUCT } };
const GetLikeProductSuccess = data => { return { type: types.GET_LIKE_PRODUCT_SUCCESS, like: data } };
const GetLikeProductFailure = data => { return { type: types.GET_LIKE_DESIGN_FAILURE, like: data } };

// 디자인 좋아요 하기 >>> 전체 디자인에 대한 좋아요
export function LikeProductRequest(id, token) {
  const sql = `${host}/product/like/${id}`;
  return (dispatch) => {
    dispatch(LikeProduct());
    return fetch(sql, { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "POST" })
      .then(res => res.json())
      .then(data => { dispatch(LikeProductSuccess()); return data; })
      .catch(error => LikeProductFailure(error));
  }
}
const LikeProduct = () => { return { type: types.LIKE_PRODUCT } };
const LikeProductSuccess = () => { return { type: types.LIKE_PRODUCT_SUCCESS } };
const LikeProductFailure = () => { return { type: types.LIKE_PRODUCT_FAILURE } };

// 디자인 좋아요 취소하기 >>> 전체 디자인에 대한 좋아요
export function UnlikeProductRequest(id, token) {
  return (dispatch) => {
    dispatch(UnlikeProduct());
    const sql = `${host}/product/unlike/${id}`;
    return fetch(sql, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        dispatch(UnlikeProductSuccess());
        return data;
      }).catch(error => UnlikeProductFailure(error));
  }
}
const UnlikeProduct = () => { return { type: types.UNLIKE_PRODUCT } };
const UnlikeProductSuccess = () => { return { type: types.UNLIKE_PRODUCT_SUCCESS } };
const UnlikeProductFailure = () => { return { type: types.UNLIKE_PRODUCT_FAILURE } };

// 블로그형 디자인 -> 프로젝트형으로 변경
export function ChangeToProjectRequest(id, token) {
  return (dispatch) => {
    dispatch(ChangeToProject());
    return fetch(`${host}/Design/changeToProject/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("change request >>>", data);
      dispatch(ChangeToProjectSuccess(data));
      return data;
    }).catch((error) => {
      console.log("err", error);
      ChangeToProjectFailure(error);
    });
  }
}

export function ChangeToProject() {
  return {
    type: types.CHANGE_TO_PROJECT
  }
};

export function ChangeToProjectSuccess(data) {
  return {
    type: types.CHANGE_TO_PROJECT_SUCCESS,
    data: data
  }
};

export function ChangeToProjectFailure() {
  return {
    type: types.CHANGE_TO_PROJECT_FAILURE
  }
};  
//cart
export function addCartRequest(items,token){
  console.log("items",items);
  return (dispatch)=>{
    // dispatch(addCart());
    const url = `${host}/product/addCart`
    console.log(token);
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body:JSON.stringify(items)
    }).then((response)=>{
      console.log("response");
      return response.json();
    // }).then((res)=>{
    //   return dispatch(addCartSuccess());
    }).catch((error)=>{
      // dispatch(addCartFailure());
      console.log("error",error)
    })
  }
}

export function deleteCartItem(itemID,token){
  console.log("delete Select item",itemID);
  return (dispatch)=>{
    // dispatch(addCart());
    const url = `${host}/product/deleteSelectCart/${itemID}`
    console.log(token);
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE",
    }).then((response)=>{
      console.log("response");
      return response.json();
    // }).then((res)=>{
    //   return dispatch(addCartSuccess());
    }).catch((error)=>{
      // dispatch(addCartFailure());
      console.log("error",error)
    })
  }
}
export function deleteCartAllItem(user_id,token){
  console.log("delete all item",user_id);
  return (dispatch)=>{
    // dispatch(addCart());
    const url = `${host}/product/deleteAllCart/${user_id}`
    console.log(token);
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE",
    }).then((response)=>{
      console.log("response");
      return response.json();
    // }).then((res)=>{
    //   return dispatch(addCartSuccess());
    }).catch((error)=>{
      // dispatch(addCartFailure());
      console.log("error",error)
    })
  }
}

export function getCartListRequest(id) {
  console.log("id:::",id);
  return(dispatch)=>{
      const url = `${host}/product/getCartList/${id}`;
          return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json())
            .then(data => dispatch(getCartList(data)))
            .catch(error => dispatch(getCartListFailure()))
  }
};
const getCartList = data => {   return { type: types.GET_CART_LIST, CartList: data.list } };
const getCartListFailure = () => { return { type: types.GET_CART_LIST_FAILURE, CartList: null } };

// order
export function addOrderRequest(items,token){
  console.log("items",items);
  return (dispatch)=>{
    const url = `${host}/product/addOrder`
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body:JSON.stringify(items)
    }).then((response)=>{
      console.log("response");
      return response.json();
    }).catch((error)=>{
      console.log("error",error)
    })
  }
}

export function getOrderListRequest(id) {
  console.log("id:::",id);
  return(dispatch)=>{
      const url = `${host}/product/getOrderList/${id}`;
          return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
            .then(res => res.json())
            .then(data => dispatch(getOrderList(data)))
            .catch(error => dispatch(getOrderListFailure()))
  }
};
const getOrderList = data => {   return { type: types.GET_ORDER_LIST, OrderList: data.list } };
const getOrderListFailure = () => { return { type: types.GET_ORDER_LIST_FAILURE, OrderList: null } };

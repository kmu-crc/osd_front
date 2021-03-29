import * as types from "actions/ActionTypes";
import host from "config";


export function GetHaveInItemRequest(id, page) {
  return (dispatch) => {
    const url = `${host}/item/itemDetail/${id}/have/${page}`;
    return fetch(url,
      { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        dispatch(page === 0 ? HaveInItemClear(data || []) : GetHaveInItem(data || []))
      }
      )
      .catch(err => dispatch(HaveInItemFail()))
  }
};
const GetHaveInItem = (data) => ({ type: types.GET_HAVE_IN_ITEM, HaveInItem: data });
const HaveInItemClear = (data) => ({ type: types.GET_HAVE_IN_ITEM_CLEAR, HaveInItem: data, HaveInItemAdded: [] });
const HaveInItemFail = () => ({ type: types.HAVE_IN_ITEM_FAIL, HaveInItem: [], HaveInItemAdded: [] });
//  좋아요 한 아이템 가져오기
export function GetLikeInItemRequest(id, page) {
  return (dispatch) => {
    const url = `${host}/item/itemDetail/${id}/like/${page}`;
    return fetch(url,
      { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        dispatch(page === 0 ? LikeInItemClear(data || []) : GetLikeInItem(data || []))
      }
      )
      .catch(err => dispatch(LikeInItemFail()))
  }
};
const GetLikeInItem = (data) => ({ type: types.GET_LIKE_IN_ITEM, LikeInItem: data });
const LikeInItemClear = (data) => ({ type: types.GET_LIKE_IN_ITEM_CLEAR, LikeInItem: data, LikeInItemAdded: [] });
const LikeInItemFail = () => ({ type: types.LIKE_IN_ITEM_FAIL, LikeInItem: [], LikeInItemAdded: [] });
// list
export function GetProductListRequest(page, sort, cate1, cate2, cate3, keyword) {
  return (dispatch) => {
    const url = `${host}/item/list/${page}/${sort}/${cate1}/${cate2}/${cate3}/${keyword}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch((page === 0) ? (ProductListClear(data || [])) : GetProductList(data || []))
      })
      .catch(error => dispatch(ProductListFail()))
  }
};
const GetProductList = data => { return { type: types.GET_PRODUCT_LIST, ProductList: data } };
const ProductListClear = data => { return { type: types.PRODUCT_LIST_CLEAR, ProductList: data, ProductListAdded: [] } };
const ProductListFail = () => { return { type: types.PRODUCT_LIST_FAIL, ProductList: [], ProductListAdded: [] } };
export function GetProductTotalCountRequest(cate1, cate2, cate3) {
  return (dispatch) => {
    const url = `${host}/item/list-count/${cate1}/${cate2}/${cate3}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
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
    const url = `${host}/item/detail/${id}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token || "" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetProductDetail(data)))
      .catch(error => console.log("err", error));
  }
};
const GetProductDetail = (data) => {
  console.log("GetProductDetail:", data);
  return { type: types.GET_PRODUCT_DETAIL, ProductDetail: data }
};
//is buy
export function GetDidYouBuyItRequest(item_id, user_id) {
  return (dispatch) => {
    const url = `${host}/product/getBuyit/${item_id}/${user_id}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetDidYouBuyIt(data || { isbuy: false })))
      .catch(err => console.log("err", err));
  }
};
function GetDidYouBuyIt(data) { return { type: types.GET_DID_YOU_BUY_IT, isbuy: data } };
//
export function GetProductCountRequest(id) {
  return (dispatch) => {
    const url = `${host}/product/getCount/${id}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetDesignCount(data || { like_count: 0, member_count: 0, card_count: 0, view_count: 0 })))
      .catch(err => console.log("err", err));
  }
};
function GetDesignCount(data) { return { type: types.GET_PRODUCT_COUNT, Count: data } };

// update page-view count
export function UpdateProductViewRequest(id) {
  return (dispatch) => {
    const url = `${host}/product/updateViewCount/${id}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "POST" })
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
    const url = `${host}/item/getLikeItem/${id}`;
    return fetch(url, { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "GET" })
      .then(res =>
        res.json()
      )
      .then(data => {
        console.log("GetLikeProductRequest", data);
        dispatch(GetLikeProductSuccess((data && data.like) || false))
      }
      )
      .catch(error => GetLikeProductFailure(false));
  }
}
const GetLikeProduct = () => { return { type: types.GET_LIKE_PRODUCT } };
const GetLikeProductSuccess = data => { return { type: types.GET_LIKE_PRODUCT_SUCCESS, like: data } };
const GetLikeProductFailure = data => { return { type: types.GET_LIKE_PRODUCT_FAILURE, like: data } };

// 디자인 좋아요 하기 >>> 전체 디자인에 대한 좋아요
export function LikeProductRequest(id, token) {
  const url = `${host}/item/likeItem/${id}`;
  return (dispatch) => {
    dispatch(LikeProduct());
    return fetch(url, { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "POST" })
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
    const url = `${host}/item/unlikeItem/${id}`;
    return fetch(url, {
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
export function addCartRequest(items, token) {
  console.log("items", items);
  return (dispatch) => {
    // dispatch(addCart());
    const url = `${host}/product/addCart`
    console.log(token);
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(items)
    }).then((response) => {
      console.log("response");
      return response.json();
      // }).then((res)=>{
      //   return dispatch(addCartSuccess());
    }).catch((error) => {
      // dispatch(addCartFailure());
      console.log("error", error)
    })
  }
}

export function deleteCartItem(itemID, token) {
  console.log("delete Select item", itemID);
  return (dispatch) => {
    // dispatch(addCart());
    const url = `${host}/product/deleteSelectCart/${itemID}`
    console.log(token);
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE",
    }).then((response) => {
      console.log("response");
      return response.json();
      // }).then((res)=>{
      //   return dispatch(addCartSuccess());
    }).catch((error) => {
      // dispatch(addCartFailure());
      console.log("error", error)
    })
  }
}
export function deleteCartAllItem(user_id, token) {
  console.log("delete all item", user_id);
  return (dispatch) => {
    // dispatch(addCart());
    const url = `${host}/product/deleteAllCart/${user_id}`
    console.log(token);
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE",
    }).then((response) => {
      console.log("response");
      return response.json();
      // }).then((res)=>{
      //   return dispatch(addCartSuccess());
    }).catch((error) => {
      // dispatch(addCartFailure());
      console.log("error", error)
    })
  }
}

export function getCartListRequest(id) {
  console.log("id:::", id);
  return (dispatch) => {
    const url = `${host}/product/getCartList/${id}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(getCartList(data)))
      .catch(error => dispatch(getCartListFailure()))
  }
};
const getCartList = data => { return { type: types.GET_CART_LIST, CartList: data.list } };
const getCartListFailure = () => { return { type: types.GET_CART_LIST_FAILURE, CartList: null } };

// order
export function addOrderRequest(items, token) {
  console.log("items", items);
  return (dispatch) => {
    const url = `${host}/product/addOrder`
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(items)
    }).then((response) => {
      console.log("response");
      return response.json();
    }).catch((error) => {
      console.log("error", error)
    })
  }
}

export function getOrderListRequest(id) {
  console.log("id:::", id);
  return (dispatch) => {
    const url = `${host}/product/getOrderList/${id}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(getOrderList(data.data)))
      .catch(error => dispatch(getOrderListFailure()))
  }
};
const getOrderList = data => { return { type: types.GET_ORDER_LIST, OrderList: data.list } };
const getOrderListFailure = () => { return { type: types.GET_ORDER_LIST_FAILURE, OrderList: null } };



///////////////// 내 상품 목록 가져오기 
export function GetAllHaveInItemRequest(id, token) {
  console.log("id:::", id);
  return (dispatch) => {
    const url = `${host}/group/itemDetail/${id}/haveAll`;
    return fetch(url, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(GetAllHaveInItem(data.data))
      }
      )
      .catch(error => dispatch(AllHaveInItemFail()))
  }
};
const GetAllHaveInItem = (data) => ({ type: types.GET_ALL_HAVE_IN_ITEM, AllHaveInItem: data });
const AllHaveInItemFail = () => ({ type: types.ALL_HAVE_IN_ITEM_FAIL, AllHaveInItem: [] });


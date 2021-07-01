import * as types from "actions/ActionTypes";
import host from "config";

// list
export function GetProductListRequest(page, sort, cate1, cate2, keyword) {
  return (dispatch) => {
    const url = `${host}/product/list/${page}/${sort}/${cate1}/${cate2}/${keyword}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
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
    const url = `${host}/product/Count/${cate1}/${cate2}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetProductTotalCount(data ? data["count(*)"] : 0)))
      .catch(error => dispatch(ProductTotalCountFail()))
  }
};
const GetProductTotalCount = data => { return { type: types.GET_PRODUCT_TOTAL_COUNT, Count: data } };
const ProductTotalCountFail = () => { return { type: types.GET_PRODUCT_TOTAL_COUNT_FAIL, Count: 0 } };

// detail
export function GetItemDetailRequest(id, token) {
  return (dispatch) => {
    const url = `${host}/item/detail/${id}`;
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token || "" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetItemDetail(data)))
      .catch(error => console.error("err", error));
  }
};
const GetItemDetail = (details) => {
  return { type: types.GET_ITEM_DETAIL, ItemDetail: details }
};
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

// Get Content Header
export function GetContentHeaderRequest(payment, item, token) {
  return (dispatch) => {
    const url = `${host}/item/${item}/purchased-header/${payment}`;
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token || "" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetContentHeader(data && data.data)))
      .catch(error => console.error("err", error));
  }
};
const GetContentHeader = (headers) => ({ type: types.GET_CONTENT_HEADER, ContentHeader: headers });

// content
export function GetItemContentsRequest(id, token) {
  return (dispatch) => {
    const url = `${host}/item/detail/${id}/content`;
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token || "" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return dispatch(GetItemContent(data.contents || []))
      })
      .catch(error => console.log("err", error));
  }
}
const GetItemContent = (content) => {
  return { type: types.GET_ITEM_CONTENT, content: content }
};

// design source update
export const UpdateItemContentsRequest = (data, card_id, token) => {
  return dispatch => {
    dispatch(UpdateItemContents());
    const url = `${host}/item/detail/${card_id}/update`;
    console.log("request", url, data);
    return fetch(url, {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(UpdateItemContentsSuccess(res)))
      .catch(error => dispatch(UpdateItemContentsFailure((error))));
  };
};
const UpdateItemContents = () => ({
  type: types.UPDATE_ITEM_CONTENT
})
const UpdateItemContentsSuccess = res => ({
  type: types.UPDATE_ITEM_CONTENT_SUCCESS, data: res
})
const UpdateItemContentsFailure = error => ({
  type: types.UPDATE_ITEM_CONTENT_FAILURE, data: error
})

// get step
export function GetItemStepsRequest(id, token) {
  return (dispatch) => {
    const url = `${host}/item/detail/${id}/step`;
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token || "" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        return dispatch(GetItemStep(data.contents || []))
      })
      .catch(error => console.log("err", error));
  }
}
const GetItemStep = step => (
  { type: types.GET_ITEM_STEP, step: step }
)
// get step - new version
export function GetItemStepsRequest2(index, id, token) {
  return (dispatch) => {
    const url = `${host}/item/detail/${id}/step3`;
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token || "" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetItemStep_(index, data.contents || [])))
      .catch(error => console.log("err", error));
  }
}
const GetItemStep_ = (index, step) => ({ type: types.GET_ITEM_STEP, index: index, step: step })
export function ClearItemStepsRequest() {
  return (dispatch) => {
    return dispatch(ClearItemStep());
  }
}
const ClearItemStep = () => ({ type: types.CLEAR_ITEM_STEPS, });

// NEW LIST
export const CreateItemListRequest = (data, id, token) => {
  return (dispatch) => {
    dispatch(CreateStep());
    console.log("request", data);
    return fetch(`${host}/item/detail/${id}/createList`, { headers: { "x-access-token": token, 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(data) })
      .then(res => res.json())
      .then(res => res && dispatch(CreateStepSuccess(res)))
      .catch(error => {
        console.log("insert detail err", error);
        return dispatch(CreateStepFailure(error));
      });
  };
};
const CreateStep = () => ({ type: types.CREATE_BOARD });
const CreateStepSuccess = (res) => ({ type: types.CREATE_BOARD_SUCCESS, success: res.success });
const CreateStepFailure = (error) => ({ type: types.CREATE_BOARD_FAILURE, success: error.success, });
// DELETE LIST
export const DeleteItemListRequest = (id, list_id, token) => {
  return (dispatch) => {
    dispatch(DeleteItemList());
    return fetch(`${host}/item/detail/${id}/deleteList/${list_id}`, {
      headers: { "x-access-token": token, 'Content-Type': 'application/json' },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => res && dispatch(DeleteItemListSuccess(res)))
      .catch(error => dispatch(DeleteItemListFailure(error)));
  };
};
export const DeleteItemList = () => ({ type: types.DELETE_BOARD });
export const DeleteItemListSuccess = (res) => ({ type: types.DELETE_BOARD_SUCCESS, success: res.success });
export const DeleteItemListFailure = (error) => ({ type: types.DELETE_BOARD_FAILURE, success: error.success, });

// MODIFY LIST
export const UpdateItemListRequest = (id, list_id, token, data) => {
  return (dispatch) => {
    dispatch(UpdateItemList());
    console.log(data);
    return fetch(`${host}/item/detail/${id}/updateList/${list_id}`, {
      headers: { "x-access-token": token, 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(UpdateItemListSuccess(res)))
      .catch(error => dispatch(UpdateItemListFailure(error)));
  };
};
export const UpdateItemList = () => ({ type: types.UPDATE_BOARD });
export const UpdateItemListSuccess = (res) => ({ type: types.UPDATE_BOARD_SUCCESS, success: res.success });
export const UpdateItemListFailure = (error) => ({ type: types.UPDATE_BOARD_FAILURE, success: error.success, });
// MODIFY LIST HEADER
export const UpdateItemListHeaderRequest = (id, token, data) => {
  return (dispatch) => {
    dispatch(UpdateItemListHeader());
    return fetch(`${host}/item/detail/updateHeader/${id}`, {
      headers: { "x-access-token": token, 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(UpdateItemListHeaderSuccess(res)))
      .catch(error => dispatch(UpdateItemListHeaderFailure(error)));
  };
};
export const UpdateItemListHeader = () => ({ type: types.UPDATE_BOARD_HEADER });
export const UpdateItemListHeaderSuccess = (res) => ({ type: types.UPDATE_BOARD_HEADER_SUCCESS, success: res.success });
export const UpdateItemListHeaderFailure = (error) => ({ type: types.UPDATE_BOARD_HEADER_FAILURE, success: error.success, });
// CREATE LIST HEADER
export const CreateItemListHeaderRequest = (id, token) => {
  return (dispatch) => {
    dispatch(CreateItemListHeader());
    return fetch(`${host}/item/detail/createHeader/${id}`, {
      headers: { "x-access-token": token, 'Content-Type': 'application/json' },
      method: "POST", // body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(CreateItemListHeaderSuccess(res)))
      .catch(error => dispatch(CreateItemListHeaderFailure(error)));
  };
};
export const CreateItemListHeader = () => ({ type: types.CREATE_BOARD_HEADER });
export const CreateItemListHeaderSuccess = (res) => ({ type: types.CREATE_BOARD_HEADER_SUCCESS, success: res.success });
export const CreateItemListHeaderFailure = (error) => ({ type: types.CREATE_BOARD_HEADER_FAILURE, success: error.success, });

// NEW CARD
export const CreateItemCardRequest = (data, id, list_id, token) => {
  return dispatch => {
    dispatch(CreateItemCard());
    return fetch(`${host}/item/detail/${id}/${list_id}/createCard`, {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => { console.log(res); return res && dispatch(CreateItemCardSuccess(res)) })
      .catch(error => dispatch(CreateItemCardFailure(error)));
  };
}
const CreateItemCard = () => ({ type: types.CREATE_CARD });
const CreateItemCardSuccess = res => ({ type: types.CREATE_CARD_SUCCESS, success: res.success, card: res.card });
const CreateItemCardFailure = error => ({ type: types.CREATE_CARD_FAILURE, success: error.success });

// MODIFY CARD
export const UpdateCardSourceRequest = (data, card_id, token) => {
  return dispatch => {
    // console.log("DEBUG:", { data, card_id, token })
    dispatch(UpdateItemSource())
    return fetch(`${host}/item/detail/updateCardAllData/${card_id}`, {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => dispatch(UpdateItemSourceSuccess(res)))
      .catch(error => dispatch(UpdateItemSourceFailure(error)))
  }
}
export const UpdateItemSource = () => ({ type: types.UPDATE_ITEM_SOURCE });
export const UpdateItemSourceSuccess = res => ({ type: types.UPDATE_ITEM_SOURCE_SUCCESS, data: res });
export const UpdateItemSourceFailure = error => ({ type: types.UPDATE_ITEM_SOURCE_FAILURE, error: error });

// DELETE CARD
export const DeleteItemCardRequest = (id, card_id, token) => {
  return dispatch => {
    dispatch(DeleteItemCard());
    return fetch(`${host}/item/detail/${id}/deleteCard/${card_id}`, {
      headers: {
        "x-access-token": token, "Content-Type": "application/json"
      },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => res && dispatch(DeleteItemCardSuccess(res)))
      .catch(error => dispatch(DeleteItemCardFailure(error)));
  };
};
const DeleteItemCard = () => ({ type: types.DELETE_CARD });
const DeleteItemCardSuccess = res => ({ type: types.DELETE_CARD_SUCCESS, success: res.success });
const DeleteItemCardFailure = error => ({ type: types.DELETE_CARD_FAILURE, success: error.success });


// question
// get question-list
export const GetItemQuestionRequest = (id, page) => {
  return dispatch => {
    dispatch(GetItemQuestion());
    const url = `${host}/item/detail/${id}/question/${page}`;
    // console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => { console.log(data); dispatch(GetItemQuestionSuccess(data)) })
      .catch(error => dispatch(GetItemQuestionFailure(error)));
  };
};

const GetItemQuestion = () => ({
  type: types.GET_ITEM_QUESTION
});
const GetItemQuestionSuccess = data => ({
  type: types.GET_ITEM_QUESTION_SUCCESS, payload: data,
});
const GetItemQuestionFailure = error => ({
  type: types.GET_ITEM_QUESTION_FAILURE
});

// payment message
export const CreatePaymentMessageRequest = (data, id, token) => {
  return dispatch => {
    dispatch(CreatepaymentMessage());
    const url = `${host}/item/detail/${id}/paymentMessage`;
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(CreatePaymentMessageSuccess(res)))
      .catch(error => dispatch(CreatePaymentMessageFailure(error)));
  };
};

const CreatepaymentMessage = () => ({
  type: types.CREATE_PAYMENT_MESSAGE
});
const CreatePaymentMessageSuccess = res => ({
  type: types.CREATE_PAYMENT_MESSAGE_SUCCESS, data: res
});
const CreatePaymentMessageFailure = error => ({
  type: types.CREATE_PAYMENT_MESSAGE_FAILURE
});

export const DeletePaymentMessageRequest = (id, content_id, token) => {
  return dispatch => {
    dispatch(DeletePaymentMessage());
    const url = `${host}/item/detail/${id}/deletePaymentMessage/${content_id}`;
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => dispatch(DeletePaymentMessageSuccess(res)))
      .catch(error => dispatch(DeletePaymentMessageFailure(error)));
  };
};

const DeletePaymentMessage = () => ({
  type: types.DELETE_PAYMENT_MESSAGE
});
const DeletePaymentMessageSuccess = res => ({
  type: types.DELETE_PAYMENT_MESSAGE_SUCCESS, data: res
});
const DeletePaymentMessageFailure = error => ({
  type: types.DELETE_PAYMENT_MESSAGE_FAILURE
});

export const GetPaymentMessageRequest = (id, page) => {
  console.log(id);
  return dispatch => {
    dispatch(GetPaymentMessage());
    const url = `${host}/item/detail/${id}/paymentMessage/${page}`;
    // console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetPaymenetMessageSuccess(data)))
      .catch(error => dispatch(GetPaymentMessageFailure(error)));
  };
};

const GetPaymentMessage = () => ({
  type: types.GET_PAYMENT_MESSAGE
});
const GetPaymenetMessageSuccess = data => ({
  type: types.GET_PAYMENT_MESSAGE_SUCCESS, payload: data,
});
const GetPaymentMessageFailure = error => ({
  type: types.GET_PAYMENT_MESSAGE_FAILURE
});









// question or answer
export const CreateItemQuestionRequest = (data, id, token) => {
  return dispatch => {
    dispatch(CreateItemQuestion());
    const url = `${host}/item/detail/${id}/create-question`;
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(CreateItemQuestionSuccess(res)))
      .catch(error => dispatch(CreateItemQuestionFailure(error)));
  };
};

const CreateItemQuestion = () => ({
  type: types.CREATE_ITEM_QUESTION
});
const CreateItemQuestionSuccess = res => ({
  type: types.CREATE_ITEM_QUESTION_SUCCESS, data: res
});
const CreateItemQuestionFailure = error => ({
  type: types.CREATE_ITEM_QUESTION_FAILURE
});

// remove question or answer
export const DeleteItemQuestionRequest = (id, content_id, token) => {
  return dispatch => {
    dispatch(DeleteItemQuestion());
    const url = `${host}/item/detail/${id}/delete-question/${content_id}`;
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => dispatch(DeleteItemQuestionSuccess(res)))
      .catch(error => dispatch(DeleteItemQuestionFailure(error)));
  };
};

const DeleteItemQuestion = () => ({
  type: types.DELETE_ITEM_QUESTION
});
const DeleteItemQuestionSuccess = res => ({
  type: types.DELETE_ITEM_QUESTION_SUCCESS, data: res
});
const DeleteItemQuestionFailure = error => ({
  type: types.DELETE_ITEM_QUESTION_FAILURE
});

// REVIEWs
// get review-list
export const GetItemReviewRequest = (id, page) => {
  return dispatch => {
    dispatch(GetItemReview());
    const url = `${host}/item/detail/${id}/review/${page}`;
    // console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetItemReviewSuccess(data)))
      .catch(error => dispatch(GetItemReviewFailure(error)));
  };
};
const GetItemReview = () => ({
  type: types.GET_ITEM_REVIEW
});
const GetItemReviewSuccess = data => ({
  type: types.GET_ITEM_REVIEW_SUCCESS, payload: data,
});
const GetItemReviewFailure = error => ({
  type: types.GET_ITEM_REVIEW_FAILURE
});
// review or answer
export const CreateItemReviewRequest = (data, id, token) => {
  console.log(data, id);
  return dispatch => {
    dispatch(CreateItemReview());
    const url = `${host}/item/detail/${id}/create-review`;
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(CreateItemReviewSuccess(res)))
      .catch(error => dispatch(CreateItemReviewFailure(error)));
  };
};
const CreateItemReview = () => ({
  type: types.CREATE_ITEM_REVIEW
});
const CreateItemReviewSuccess = res => ({
  type: types.CREATE_ITEM_REVIEW_SUCCESS, data: res
});
const CreateItemReviewFailure = error => ({
  type: types.CREATE_ITEM_REVIEW_FAILURE
});
// remove review or answer
export const DeleteItemReviewRequest = (id, content_id, token) => {
  return dispatch => {
    dispatch(DeleteItemReview());
    const url = `${host}/item/detail/${id}/delete-review/${content_id}`;
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => dispatch(DeleteItemReviewSuccess(res)))
      .catch(error => dispatch(DeleteItemReviewFailure(error)));
  };
};
const DeleteItemReview = () => ({
  type: types.DELETE_ITEM_REVIEW
});
const DeleteItemReviewSuccess = res => ({
  type: types.DELETE_ITEM_REVIEW_SUCCESS, data: res
});
const DeleteItemReviewFailure = error => ({
  type: types.DELETE_ITEM_REVIEW_FAILURE
});



// get my upload item list
export const GetMyUploadItemRequest = (id, token, page) => {
  return dispatch => {
    const url = `${host}/item/getUploadItemList/${id}/${page}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      method: "GET"
    })
      .then(res => res.json())
      .then(data =>
        dispatch((page === 0)
          ? GetMyUploadItemClear(data ? data : [])
          : GetMyUploadItem(data ? data : [])))
      .catch(error => dispatch(GetMyUploadItemFailure()));
  };
};
const GetMyUploadItem = (data) => ({ type: types.GET_MY_UPLOAD_ITEM, MyUploadItem: data });
const GetMyUploadItemClear = (data) => ({ type: types.GET_MY_UPLOAD_ITEM_CLEAR, MyUploadItem: data, MyUploadItemAdded: [] });
const GetMyUploadItemFailure = () => ({ type: types.GET_MY_UPLOAD_ITEM_FAILURE, MyUploadItem: [], MyUploadItemAdded: [] });


// get my project item list
export const GetMyProjectItemRequest = (id, token, page) => {
  return dispatch => {
    const url = `${host}/item/getMyProjectItemList/${id}/${page}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      method: "GET"
    })
      .then(res => res.json())
      .then(data =>
        dispatch((page === 0)
          ? GetMyProjectItemClear(data ? data : [])
          : GetMyProjectItem(data ? data : [])))
      .catch(error => dispatch(GetMyProjectItemFailure()));
  };
};
const GetMyProjectItem = (data) => ({ type: types.GET_MY_PROJECT_ITEM, MyProjectItem: data });
const GetMyProjectItemClear = (data) => ({ type: types.GET_MY_PROJECT_ITEM_CLEAR, MyProjectItem: data, MyProjectItemAdded: [] });
const GetMyProjectItemFailure = () => ({ type: types.GET_MY_PROJECT_ITEM_FAILURE, MyProjectItem: [], MyProjectItemAdded: [] });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const UpdateItemRequest = (data, id, token) => {
  return dispatch => {
    dispatch(UpdateItem());
    return fetch(`${host}/item/update/${id}`, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        // console.log("update item result: ", res);
        return dispatch(UpdateItemSuccess(res));
      })
      .catch(error => {
        // console.log("insert detail result: ", error);
        return dispatch(UpdateItemFailure(error));
      });
  };
};
export const UpdateItem = () => ({ type: types.UPDATE_ITEM });
export const UpdateItemSuccess = res => ({ type: types.UPDATE_ITEM_SUCCESS, res });
export const UpdateItemFailure = error => ({ type: types.UPDATE_ITEM_FAILURE, error });

export const DeleteItemRequest = (id, token) => {
  return dispatch => {
    dispatch(DeleteItem());
    return fetch(`${host}/item/delete/${id}`, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE",
    })
      .then(res => res.json())
      .then(res => {
        // console.log("delete item result: ", res);
        return res && dispatch(DeleteItemSuccess(res));
      })
      .catch(error => {
        // console.log("delete error detail result: ", error);
        return dispatch(DeleteItemFailure(error));
      });
  };
};
export const DeleteItem = () => ({ type: types.DELETE_ITEM });
export const DeleteItemSuccess = res => ({ type: types.DELETE_ITEM_SUCCESS, res });
export const DeleteItemFailure = error => ({ type: types.DELETE_ITEM_FAILURE, error });



/////////////////////////////////////////////////////////////////////////////////////////////////////////////













// // Payment
// // get review-list
// export const GetItemReviewRequest = (id, page) => {
//   return dispatch => {
//     dispatch(GetItemReview());
//     const url = `${host}/item/detail/${id}/review/${page}`;
//     // console.log(url);
//     return fetch(url, {
//       headers: { "Content-Type": "application/json" },
//       method: "GET"
//     })
//       .then(res => res.json())
//       .then(data => dispatch(GetItemReviewSuccess(data)))
//       .catch(error => dispatch(GetItemReviewFailure(error)));
//   };
// };
// const GetItemReview = () => ({
//   type: types.GET_ITEM_REVIEW
// });
// const GetItemReviewSuccess = data => ({
//   type: types.GET_ITEM_REVIEW_SUCCESS, payload: data,
// });
// const GetItemReviewFailure = error => ({
//   type: types.GET_ITEM_REVIEW_FAILURE
// });
// // review or answer
// export const CreateItemReviewRequest = (data, id, token) => {
//   return dispatch => {
//     dispatch(CreateItemReview());
//     const url = `${host}/item/detail/${id}/create-review`;
//     return fetch(url, {
//       headers: { "x-access-token": token, "Content-Type": "application/json" },
//       method: "POST",
//       body: JSON.stringify(data)
//     })
//       .then(res => res.json())
//       .then(res => res && dispatch(CreateItemReviewSuccess(res)))
//       .catch(error => dispatch(CreateItemReviewFailure(error)));
//   };
// };
// const CreateItemReview = () => ({
//   type: types.CREATE_ITEM_REVIEW
// });
// const CreateItemReviewSuccess = res => ({
//   type: types.CREATE_ITEM_REVIEW_SUCCESS, data: res
// });
// const CreateItemReviewFailure = error => ({
//   type: types.CREATE_ITEM_REVIEW_FAILURE
// });
// // remove review or answer
// export const DeleteItemReviewRequest = (id, content_id, token) => {
//   return dispatch => {
//     dispatch(DeleteItemReview());
//     const url = `${host}/item/detail/${id}/delete-review/${content_id}`;
//     return fetch(url, {
//       headers: { "x-access-token": token, "Content-Type": "application/json" },
//       method: "DELETE"
//     })
//       .then(res => res.json())
//       .then(res => dispatch(DeleteItemReviewSuccess(res)))
//       .catch(error => dispatch(DeleteItemReviewFailure(error)));
//   };
// };
// const DeleteItemReview = () => ({
//   type: types.DELETE_ITEM_REVIEW
// });
// const DeleteItemReviewSuccess = res => ({
//   type: types.DELETE_ITEM_REVIEW_SUCCESS, data: res
// });
// const DeleteItemReviewFailure = error => ({
//   type: types.DELETE_ITEM_REVIEW_FAILURE
// });


// // update page-view count
// export function UpdateProductViewRequest(id) {
//   return (dispatch) => {
//     const url = `${host}/product/updateViewCount/${id}`;
//     return fetch(url, { headers: { "Content-Type": "application/json" }, method: "POST" })
//       .then(res => res.json())
//       .then(data => dispatch(UpdateProductView()))
//       .catch(error => console.log("err", error))
//   }
// }
// const UpdateProductView = () => { return { type: types.UPDATE_PRODUCT_VIEW } };
// export function GetDesignDetailView(data) {
//   return {
//     type: types.GET_DESIGN_DETAIL_VIEW,
//     DesignDetailView: data
//   }
// };
// export function DesignDetailViewResetRequest() {
//   return (dispatch) => {
//     dispatch(DesignDetailViewReset());
//   }
// };
// export function DesignDetailViewReset() {
//   return {
//     type: types.DESIGN_DETAIL_VIEW_RESET,
//     DesignDetailView: []
//   }
// };
// // 로그인 했을때 내 좋아요 정보 가져오기 >>> 전체 디자인에 대한 좋아요
// export function GetLikeProductRequest(id, token) {
//   return (dispatch) => {
//     dispatch(GetLikeProduct());
//     const url = `${host}/Design/getLike/${id}`;
//     return fetch(url, { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "GET" })
//       .then(res => res.json())
//       .then(data => dispatch(GetLikeProductSuccess((data && data.like) || false)))
//       .catch(error => GetLikeProductFailure(false));
//   }
// }
// const GetLikeProduct = () => { return { type: types.GET_LIKE_PRODUCT } };
// const GetLikeProductSuccess = data => { return { type: types.GET_LIKE_PRODUCT_SUCCESS, like: data } };
// const GetLikeProductFailure = data => { return { type: types.GET_LIKE_DESIGN_FAILURE, like: data } };
// // 디자인 좋아요 하기 >>> 전체 디자인에 대한 좋아요
// export function LikeProductRequest(id, token) {
//   const url = `${host}/product/like/${id}`;
//   return (dispatch) => {
//     dispatch(LikeProduct());
//     return fetch(url, { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "POST" })
//       .then(res => res.json())
//       .then(data => { dispatch(LikeProductSuccess()); return data; })
//       .catch(error => LikeProductFailure(error));
//   }
// }
// const LikeProduct = () => { return { type: types.LIKE_PRODUCT } };
// const LikeProductSuccess = () => { return { type: types.LIKE_PRODUCT_SUCCESS } };
// const LikeProductFailure = () => { return { type: types.LIKE_PRODUCT_FAILURE } };
// // 디자인 좋아요 취소하기 >>> 전체 디자인에 대한 좋아요
// export function UnlikeProductRequest(id, token) {
//   return (dispatch) => {
//     dispatch(UnlikeProduct());
//     const url = `${host}/product/unlike/${id}`;
//     return fetch(url, {
//       headers: { "Content-Type": "application/json", 'x-access-token': token },
//       method: "POST"
//     })
//       .then(res => res.json())
//       .then(data => {
//         dispatch(UnlikeProductSuccess());
//         return data;
//       }).catch(error => UnlikeProductFailure(error));
//   }
// }
// const UnlikeProduct = () => { return { type: types.UNLIKE_PRODUCT } };
// const UnlikeProductSuccess = () => { return { type: types.UNLIKE_PRODUCT_SUCCESS } };
// const UnlikeProductFailure = () => { return { type: types.UNLIKE_PRODUCT_FAILURE } };
// // 블로그형 디자인 -> 프로젝트형으로 변경
// export function ChangeToProjectRequest(id, token) {
//   return (dispatch) => {
//     dispatch(ChangeToProject());
//     return fetch(`${host}/Design/changeToProject/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": token
//       },
//       method: "post"
//     }).then((response) => {
//       return response.json();
//     }).then((data) => {
//       console.log("change request >>>", data);
//       dispatch(ChangeToProjectSuccess(data));
//       return data;
//     }).catch((error) => {
//       console.log("err", error);
//       ChangeToProjectFailure(error);
//     });
//   }
// }
// export function ChangeToProject() {
//   return {
//     type: types.CHANGE_TO_PROJECT
//   }
// };
// export function ChangeToProjectSuccess(data) {
//   return {
//     type: types.CHANGE_TO_PROJECT_SUCCESS,
//     data: data
//   }
// };
// export function ChangeToProjectFailure() {
//   return {
//     type: types.CHANGE_TO_PROJECT_FAILURE
//   }
// };
// //cart
// export function addCartRequest(items, token) {
//   console.log("items", items);
//   return (dispatch) => {
//     // dispatch(addCart());
//     const url = `${host}/product/addCart`
//     console.log(token);
//     return fetch(url, {
//       headers: { "x-access-token": token, "Content-Type": "application/json" },
//       method: "POST",
//       body: JSON.stringify(items)
//     }).then((response) => {
//       console.log("response");
//       return response.json();
//       // }).then((res)=>{
//       //   return dispatch(addCartSuccess());
//     }).catch((error) => {
//       // dispatch(addCartFailure());
//       console.log("error", error)
//     })
//   }
// }
// export function deleteCartItem(itemID, token) {
//   console.log("delete Select item", itemID);
//   return (dispatch) => {
//     // dispatch(addCart());
//     const url = `${host}/product/deleteSelectCart/${itemID}`
//     console.log(token);
//     return fetch(url, {
//       headers: { "x-access-token": token, "Content-Type": "application/json" },
//       method: "DELETE",
//     }).then((response) => {
//       console.log("response");
//       return response.json();
//       // }).then((res)=>{
//       //   return dispatch(addCartSuccess());
//     }).catch((error) => {
//       // dispatch(addCartFailure());
//       console.log("error", error)
//     })
//   }
// }
// export function deleteCartAllItem(user_id, token) {
//   console.log("delete all item", user_id);
//   return (dispatch) => {
//     // dispatch(addCart());
//     const url = `${host}/product/deleteAllCart/${user_id}`
//     console.log(token);
//     return fetch(url, {
//       headers: { "x-access-token": token, "Content-Type": "application/json" },
//       method: "DELETE",
//     }).then((response) => {
//       console.log("response");
//       return response.json();
//       // }).then((res)=>{
//       //   return dispatch(addCartSuccess());
//     }).catch((error) => {
//       // dispatch(addCartFailure());
//       console.log("error", error)
//     })
//   }
// }
// export function getCartListRequest(id) {
//   console.log("id:::", id);
//   return (dispatch) => {
//     const url = `${host}/product/getCartList/${id}`;
//     return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
//       .then(res => res.json())
//       .then(data => dispatch(getCartList(data)))
//       .catch(error => dispatch(getCartListFailure()))
//   }
// };
// const getCartList = data => { return { type: types.GET_CART_LIST, CartList: data.list } };
// const getCartListFailure = () => { return { type: types.GET_CART_LIST_FAILURE, CartList: null } };
// // order
// export function addOrderRequest(items, token) {
//   console.log("items", items);
//   return (dispatch) => {
//     const url = `${host}/product/addOrder`
//     return fetch(url, {
//       headers: { "x-access-token": token, "Content-Type": "application/json" },
//       method: "POST",
//       body: JSON.stringify(items)
//     }).then((response) => {
//       console.log("response");
//       return response.json();
//     }).catch((error) => {
//       console.log("error", error)
//     })
//   }
// }
// export function getOrderListRequest(id) {
//   console.log("id:::", id);
//   return (dispatch) => {
//     const url = `${host}/product/getOrderList/${id}`;
//     return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
//       .then(res => res.json())
//       .then(data => dispatch(getOrderList(data)))
//       .catch(error => dispatch(getOrderListFailure()))
//   }
// };
// const getOrderList = data => { return { type: types.GET_ORDER_LIST, OrderList: data.list } };
// const getOrderListFailure = () => { return { type: types.GET_ORDER_LIST_FAILURE, OrderList: null } };

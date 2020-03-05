import * as types from "actions/ActionTypes";
import host from "config";

// 갤러리
export function GetHaveInGalleryRequest(id, page) {
  return (dispatch) => {
    const sql = `${host}/gallery/gallerylist/${id}/${page}`;
    console.log(sql);
    return fetch(sql,
      { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data =>{console.log("data",data);
         dispatch(page === 0 ? HaveInGalleryClear(data || []) : GetHaveInGallery(data || []))
      }
         )
      .catch(err => dispatch(HaveInGalleryFail()))
  }
};
const GetHaveInGallery = (data) => ({ type: types.GET_HAVE_IN_GALLERY, HaveInGallery: data });
const HaveInGalleryClear = (data) => ({ type: types.GET_HAVE_IN_GALLERY_CLEAR, HaveInGallery: data, HaveInGalleryAdded: [] });
const HaveInGalleryFail = () => ({ type: types.HAVE_IN_GALLERY_FAIL, HaveInGallery: [], HaveInGalleryAdded: [] });

export function GetGalleryListDetailRequest(id, page) {
  return (dispatch) => {
    const sql = `${host}/gallery/galleryItemList/${id}/${page}`;
    console.log(sql);
    return fetch(sql,
      { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data =>{console.log("data",data);
         dispatch(page === 0 ? GetGalleryListDetailClear(data || []) : GetGalleryListDetail(data || []))
      }
         )
      .catch(err => dispatch(GetGalleryListDetailFailure()))
  }
}

const GetGalleryListDetail = (data) => ({ type: types.GET_GALLERY_LIST_DETAIL, HaveInGalleryItem: data });
const GetGalleryListDetailClear = (data) => ({ type: types.GET_GALLERY_LIST_DETAIL_CLEAR, HaveInGalleryItem: data, HaveInGalleryItemAdded: [] });
const GetGalleryListDetailFailure = () => ({ type: types.GET_GALLERY_LIST_DETAIL_FAIL, HaveInGalleryItem: [], HaveInGalleryItemAdded: [] });

export function GetGalleryDetailRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/gallery/galleryDetail/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("group Detail data >>", data);
      if (!data) {
        console.log("no data");
        data = [];
      }
      dispatch(GetGalleryDetail(data));
    }).catch((error) => {
      console.log("err", error);
    });
  }
};

export function GetGalleryDetail(data) {
  return {
    type: types.GET_GALLERY_DETAIL,
    galleryDetail: data
  }
};
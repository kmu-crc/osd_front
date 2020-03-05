import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GalleryList: { status: "INIT" },
  status: { 
    HaveInGallery: [],
    HaveInGalleryAdded: [],
    HaveInGalleryItem:[],
    HaveInGalleryItemAdded:[],
  }
};

export function GalleryList(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
        case types.GET_HAVE_IN_GALLERY:
          return update(state, {
            status: {
              HaveInGallery: { $set: action.HaveInGallery },
              HaveInGalleryAdded: { $push: action.HaveInGallery }
            }
          });
        case types.GET_HAVE_IN_GALLERY_CLEAR:
          return update(state, {
            status: {
              HaveInGallery: { $set: action.HaveInGallery },
              HaveInGalleryAdded: { $set: action.HaveInGallery }
            }
          });
        case types.HAVE_IN_GALLERY_FAIL:
          return update(state, {
            status: {
              HaveInGallery: { $set: action.HaveInGallery },
              HaveInGalleryAdded: { $set: action.HaveInGalleryAdded }
            }
          });
        case types.GET_GALLERY_LIST_DETAIL:
          return update(state, {
            status: {
              HaveInGalleryItem: { $set: action.HaveInGalleryItem },
              HaveInGalleryItemAdded: { $push: action.HaveInGalleryItem }
            }
          });
        case types.GET_GALLERY_LIST_DETAIL_CLEAR:
          return update(state, {
            status: {
              HaveInGalleryItem: { $set: action.HaveInGalleryItem },
              HaveInGalleryItemAdded: { $set: action.HaveInGalleryItem }
            }
          });
        case types.GET_GALLERY_LIST_DETAIL_FAIL:
          return update(state, {
            status: {
              HaveInGalleryItem: { $set: action.HaveInGalleryItem },
              HaveInGalleryItemAdded: { $set: action.HaveInGalleryItemAdded }
            }
          });
    default:
      return state;
  }
};

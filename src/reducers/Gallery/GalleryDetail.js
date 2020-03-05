import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    galleryDetail: {
      status: "INIT"
    },
    status: {
        galleryDetail: [],
    }
  };
  

export function GalleryDetail(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
        case types.GET_GALLERY_DETAIL:
          console.log(action);
          return update(state, {
            status: {
              galleryDetail: { $set: action.galleryDetail }
              }
            });
    default:
      return state;
  }
};

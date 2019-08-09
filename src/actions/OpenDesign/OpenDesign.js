import * as types from "actions/ActionTypes";

export const SetActive = (active) => {
  return {
    type: types.SET_ACTIVE,
    active
  };
};

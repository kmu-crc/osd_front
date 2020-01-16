import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  CartList: {
    status: "INIT"
  },
  status: {
    CartList: [],
  }
};

export function CartList(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_CART_LIST:
      console.log("CART==",action.CartList);
      return update(state,{
        status:{
        CartList:{ $set: action.CartList }}});
     case types.GET_CART_LIST_FAILURE:
        return update(state,{
          status:{
          CartList:{ $set: null}}});
    default:
      return state;
  }
};

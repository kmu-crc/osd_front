import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  OrderList: {
    status: "INIT"
  },
  status: {
    OrderList: [],
  }
};

export function OrderList(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_ORDER_LIST:
      console.log("CART==",action.OrderList);
      return update(state,{
        status:{
          OrderList:{ $set: action.OrderList }}});
     case types.GET_ORDER_LIST_FAILURE:
        return update(state,{
          status:{
            OrderList:{ $set: null}}});
    default:
      return state;
  }
};

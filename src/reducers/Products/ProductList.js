import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  ProductList: {
    status: 'INIT'
  },
  status: {
    ProductList: [],
    ProductListAdded: [],
    Count: 0
  }
};

export function ProductList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_PRODUCT_LIST:
      return update(state, {
        status: {
          ProductList: { $set: action.ProductList },
          ProductListAdded: { $push: action.ProductList }
        }
      });
    case types.PRODUCT_LIST_CLEAR:
      return update(state, {
        status: {
          ProductList: { $set: action.ProductList },
          ProductListAdded: { $set: action.ProductList }
        }
       });
    case types.PRODUCT_LIST_FAIL:
       return update(state, {
        status: {
          ProductList: { $set: action.ProductList },
          ProductListAdded: { $set: action.ProductListAdded }
        }
       });
    case types.GET_PRODUCT_TOTAL_COUNT:
       return update(state, {
         status: {
           Count: { $set: action.Count }
         }
       });
    case types.GET_PRODUCT_TOTAL_COUNT_FAIL:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    default:
      return state;
  }
};

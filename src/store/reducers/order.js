import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updatedObject(state, {
    purchased: false
  });
};

const purchaseStart = (state, action) => {
  return updatedObject(state, {
    loading: true
  });
};

const purchaseSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.id
  };

  return updatedObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseFail = (state, action) => {
  return updatedObject(state, {
    loading: false
  });
};

const fetchOrderStart = (state, action) => {
  return {
    ...state
  };
};

const fetchOrderSuccess = (state, action) => {
  return updatedObject(state, {
    loading: false,
    orders: action.orders
  });
};

const fetchOrderFail = (state, action) => {
  return updatedObject(state, {
    loading: false,
    orders: action.orders
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseFail(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStart(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;

import actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const initPurchase = (state, action) => {
  return updatedObject(state, { purchased: false });
};

const purchaseBurgerStarted = (state, action) => {
  return updatedObject(state, { loading: true });
};

const purchaseBurgerSucceeded = (state, action) => {
  const newOrder = updatedObject(action.orderData, {
    id: action.id,
  });
  return updatedObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updatedObject(state, { loading: false });
};

const fetchOrdersSucceeded = (state, action) => {
  return updatedObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersFailed = (state, action) => {
  return updatedObject(state, { loading: false });
};
const fetchOrdersStarted = (state, action) => {
  return updatedObject(state, { loading: true });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return initPurchase(state, action);
    case actionTypes.PURCHASE_BURGER_STARTED:
      return purchaseBurgerStarted(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCEEDED:
      return purchaseBurgerSucceeded(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.FETCH_ORDERS_SUCCEEDED:
      return fetchOrdersSucceeded(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    case actionTypes.FETCH_ORDERS_STARTED:
      return fetchOrdersStarted(state, action);
    default:
      return state;
  }
};

export default reducer;

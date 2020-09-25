import actionTypes from "../actions/actionTypes";
import { updatedObject } from "./utility";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return updatedObject(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_STARTED:
      return updatedObject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCEEDED:
      const newOrder = updatedObject(action.orderData, {
        id: action.id,
      });
      return updatedObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      });
    case actionTypes.PURCHASE_BURGER_FAILED:
      return updatedObject(state, { loading: false });
    case actionTypes.FETCH_ORDERS_SUCCEEDED:
      return updatedObject(state, { orders: action.orders, loading: false });
    case actionTypes.FETCH_ORDERS_FAILED:
      return updatedObject(state, { loading: false });
    case actionTypes.FETCH_ORDERS_STARTED:
      return updatedObject(state, { loading: true });
    default:
      return state;
  }
};

export default ordersReducer;

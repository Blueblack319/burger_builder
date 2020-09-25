import actionTypes from "../actions/actionTypes";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCEEDED:
      const newOrder = {
        ...action.orderData,
        orderId: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_SUCCEEDED:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default ordersReducer;

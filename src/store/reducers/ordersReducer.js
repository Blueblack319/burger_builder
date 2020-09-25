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
    case actionTypes.PURCHASE_BURGER_SUCCESSED:
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
    default:
      return state;
  }
};

export default ordersReducer;
